//components/Breadcrumb.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Breadcrumb.css"

const Breadcrumb = ({ items }) => {
    return (
        <div className="breadcrumb">
            {items.map((item, index) => {
                const isLast = index === items.length - 1;
                return (
                    <span key={index}>
            {isLast ? (
                <span>{item.label}</span>
            ) : (
                <>
                    <Link to={item.url}>{item.label}</Link>
                    <span className="breadcrumb-separator"> / </span>
                </>
            )}
          </span>
                );
            })}
        </div>
    );
};

export default Breadcrumb;
