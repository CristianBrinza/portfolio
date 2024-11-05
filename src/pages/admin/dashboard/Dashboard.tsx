// src/pages/admin/dashboard/Dashboard.tsx

import React from 'react';
import AdminPage from "../../../components/AdminPage.tsx";

import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb.tsx";
import {Trans} from "react-i18next";
import AdminSideMenu from "../../../components/Admin/AdminSideMenu/AdminSideMenu.tsx";
import AdminNavbar from "../../../components/Admin/AdminNavbar/AdminNavbar.tsx";

const Dashboard: React.FC = () => {

    const breadcrumbItems = [
        { label: <Trans>navigation.home</Trans>, url: '/dashboard' },
        { label: 'Dashboard' },
    ];




    return (
        <div>
            <AdminNavbar/>
            <div className="admin_breadcrumb">
                <Breadcrumb items={breadcrumbItems}/>
            </div>
            <AdminPage>

                <AdminSideMenu>
                </AdminSideMenu>
                <div>
                    kk
                </div>
            </AdminPage>
        </div>
    );
};

export default Dashboard;
