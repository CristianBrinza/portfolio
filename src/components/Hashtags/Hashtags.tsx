import React from 'react';
import './Hashtags.css';

interface HashtagsProps {
  tags: string[];
  className?: string;
}

const Hashtags: React.FC<HashtagsProps> = ({ tags, className = '' }) => {
  return (
    <div className={`hashtags ${className}`}>
      {tags.map((tag, index) => (
        <div key={index} className="hashtags_blocks">
          #{tag}
        </div>
      ))}
    </div>
  );
};

export default Hashtags;
