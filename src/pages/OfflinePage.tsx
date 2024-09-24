// OfflinePage.tsx
import React from "react";
import { Link } from "react-router-dom";

const OfflinePage = () => {
    return (
        <div>
            <h1>You're Offline</h1>
            <p>It looks like you're not connected to the internet.</p>
            <Link to="/">Go back to Home</Link>
        </div>
    );
};

export default OfflinePage;
