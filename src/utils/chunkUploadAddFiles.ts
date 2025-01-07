// src/utils/chunkUploadAddFiles.ts
import { AxiosProgressEvent } from 'axios';
import api from './api';

interface ChunkUploadParams {
    file: File;
    uploadId: string;
    path: string;
    chunkSize?: number;
    concurrency?: number;
    onProgress?: (percent: number) => void;
}

export async function chunkUploadAddFiles(params: ChunkUploadParams) {
    const {
        file,
        uploadId,
        path,
        chunkSize = 5 * 1024 * 1024,
        concurrency = 3,
        onProgress,
    } = params;

    const totalSize = file.size;
    const totalChunks = Math.ceil(totalSize / chunkSize);

    const chunkProgress: number[] = Array(totalChunks).fill(0);

    async function uploadSingleChunk(blobPart: Blob, chunkIndex: number) {
        const chunkFileName = `${file.name}-chunk-${chunkIndex}`;
        const formData = new FormData();
        formData.append('chunk', blobPart, chunkFileName);
        formData.append('chunkIndex', chunkIndex.toString());
        formData.append('totalChunks', totalChunks.toString());
        formData.append('fileName', file.name);
        formData.append('uploadId', uploadId);
        formData.append('path', path);  // "path" = the code in "Add Files" scenario

        await api.post('/add-files/upload-chunk', formData, {
            onUploadProgress: (evt: AxiosProgressEvent) => {
                if (evt.loaded && evt.total) {
                    chunkProgress[chunkIndex] = evt.loaded;
                    const sumBytes = chunkProgress.reduce((acc, val) => acc + val, 0);
                    const percent = Math.floor((sumBytes * 100) / totalSize);
                    if (onProgress) onProgress(percent);
                }
            },
            maxBodyLength: Infinity,
            maxContentLength: Infinity,
        });
    }

    const tasks = Array.from({ length: totalChunks }, (_, i) => {
        const start = i * chunkSize;
        const end = Math.min(start + chunkSize, totalSize);
        const chunkBlob = file.slice(start, end);
        return () => uploadSingleChunk(chunkBlob, i);
    });

    const pool: Promise<void>[] = [];
    for (const task of tasks) {
        const p = task();
        pool.push(p);
        if (pool.length >= concurrency) {
            await Promise.race(pool);
            for (let i = pool.length - 1; i >= 0; i--) {
                if ((pool[i] as any).status === 'fulfilled' || (pool[i] as any).status === 'rejected') {
                    pool.splice(i, 1);
                }
            }
        }
    }
    await Promise.all(pool);

    // Then finish
    await api.post('/add-files/complete-upload', { uploadId });
}
