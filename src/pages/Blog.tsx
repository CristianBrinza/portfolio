import {Trans} from "react-i18next";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb.tsx";
import React from "react";
import Title from "../components/Text/Title/Title.tsx";

export default function Blog() {

    const breadcrumbItems = [
        { label: <Trans>navigation.home</Trans>, url: '/' },
        { label: <Trans>navigation.blog_page</Trans> },
    ];

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />

           <div className="main">
               <Title>Blog</Title>
           </div>
        </>
    );
}
