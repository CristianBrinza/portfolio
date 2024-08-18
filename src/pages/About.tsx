import Breadcrumb from "../components/Breadcrumb.tsx";
import {useTranslation} from "react-i18next";
import {Link} from "react-router-dom";
import React from "react";

export default function About() {
    const { t } = useTranslation();
    const breadcrumbItems = [
        { label: t('navigation.home'), url: '/' },
        { label: t('navigation.about_page')},
    ];

  return (
    <>
        <Breadcrumb items={breadcrumbItems} />
        <br/>
        About

        <Link to="/">{t('navbar.home')}</Link>
    </>
  );
}
