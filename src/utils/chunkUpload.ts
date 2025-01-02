// src/utils/chunkUpload.ts
import { AxiosProgressEvent } from 'axios';
import api from './api'; // your axios instance with baseURL, interceptors, etc.

interface ChunkUploadParams {
  file: File;
  uploadId: string;
  path: string;
  chunkSize?: number; // defaults to 5MB or 10MB
  concurrency?: number; // how many parallel chunk uploads
  onProgress?: (percent: number) => void;
}

/**
 * chunkUpload
 * Splits a file into chunks, uploads them concurrently, then calls /complete-upload to assemble them.
 */
export async function chunkUpload(params: ChunkUploadParams) {
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

  // We'll store how many bytes have been uploaded for each chunk
  const chunkProgress: number[] = Array(totalChunks).fill(0);

  // Helper to upload a single chunk
  async function uploadSingleChunk(
    blobPart: Blob,
    chunkIndex: number
  ): Promise<void> {
    // Name the chunk file on the client or let the server rename it
    const chunkFileName = `${file.name}-chunk-${chunkIndex}`;
    const formData = new FormData();
    formData.append('chunk', blobPart, chunkFileName);
    formData.append('chunkIndex', chunkIndex.toString());
    formData.append('totalChunks', totalChunks.toString());
    formData.append('fileName', file.name);
    formData.append('uploadId', uploadId);
    formData.append('path', path);

    await api.post('/share/upload-chunk', formData, {
      onUploadProgress: (evt: AxiosProgressEvent) => {
        if (evt.loaded && evt.total) {
          // evt.loaded is chunk-level progress
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

  // Create an array of chunk upload tasks
  const tasks = Array.from({ length: totalChunks }, (_, chunkIndex) => {
    const start = chunkIndex * chunkSize;
    const end = Math.min(start + chunkSize, totalSize);
    const chunkBlob = file.slice(start, end);
    // Return a function that, when called, uploads that chunk
    return () => uploadSingleChunk(chunkBlob, chunkIndex);
  });

  // A simple concurrency control
  const pool: Promise<void>[] = [];
  for (const task of tasks) {
    const p = task();
    pool.push(p);
    // If we hit concurrency limit, wait for one to finish
    if (pool.length >= concurrency) {
      await Promise.race(pool);
      // Remove settled promises
      for (let i = pool.length - 1; i >= 0; i--) {
        if (
          (pool[i] as any).status === 'fulfilled' ||
          (pool[i] as any).status === 'rejected'
        ) {
          pool.splice(i, 1);
        }
      }
    }
  }
  // Wait for remaining tasks
  await Promise.all(pool);

  // Finally, call /share/complete-upload
  await api.post('/share/complete-upload', { uploadId });
}
