import Breadcrumb from "../components/Breadcrumb/Breadcrumb.tsx";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import React from "react";

export default function Resume() {
    const { t } = useTranslation();
    const breadcrumbItems = [
        { label: t('navigation.home'), url: '/' },
        { label: t('navigation.resume_page')},
    ];

  return (
    <>
        <Breadcrumb items={breadcrumbItems} />
        <br/>
        Resume
    </>
  );
}
