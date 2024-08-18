import React from "react";
import "./Hashtags.css"

const Hashtags = ({ tags }) => {
    return (
        <div className="hashtags">
            {tags.map((tag, index) => (
                <div key={index} className="hashtags_blocks">
                    #{tag}
                </div>
            ))}
        </div>
    );
};

export default Hashtags;
