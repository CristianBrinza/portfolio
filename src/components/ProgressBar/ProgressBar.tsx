// src/components/ProgressBar/ProgressBar.tsx

import React from 'react';
import './ProgressBar.css';

interface ProgressBarProps {
    progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
    return (
        <div className="progress_bar">
            <div
                className="progress_bar_fill"
                style={{ width: `${progress}%` }}
            ></div>
        </div>
    );
};

export default ProgressBar;
