// src/components//PageLoading.tsx

import React from 'react';
import styles from './PageLoading.module.css';



const PageLoading: React.FC = () => {
    return (
        <div className={styles.page_page_loader_loader}>
            <div className={styles.page_loader_loader}>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
                <div className={styles.dot}></div>
            </div>
        </div>
    );
};

export default PageLoading;
