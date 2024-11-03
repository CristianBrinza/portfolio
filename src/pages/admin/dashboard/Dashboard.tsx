// src/pages/admin/dashboard/Dashboard.tsx

import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const Dashboard: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { lang } = useParams();
    const language = lang || 'en';

    const handleLogoff = () => {
        logout();
        navigate(`/${language}/login`);
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleLogoff}>Log Off</button>
        </div>
    );
};

export default Dashboard;
