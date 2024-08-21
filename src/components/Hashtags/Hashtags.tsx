import React from 'react';
import './Hashtags.css';

const Hashtags = ({ tags, className = '' }) => {
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
