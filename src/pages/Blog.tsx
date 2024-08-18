import {useTranslation} from "react-i18next";
import Breadcrumb from "../components/Breadcrumb.tsx";

export default function Blog() {
    const { t } = useTranslation();
    const breadcrumbItems = [
        { label: t('navigation.home'), url: '/' },
        { label: t('navigation.blog_page')},
    ];

    return (
        <>
            <Breadcrumb items={breadcrumbItems} />
            <br/>
            Blog
        </>
    );
}
