import Breadcrumb from '../components/Breadcrumb/Breadcrumb.tsx';
import { useTranslation } from 'react-i18next';
import Title from '../components/Text/Title/Title.tsx';

export default function Resume() {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('navigation.home'), url: '/' },
    { label: t('navigation.resume_page') },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="main">
        <Title>Resume</Title>
      </div>
    </>
  );
}
