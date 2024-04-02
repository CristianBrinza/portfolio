import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';

export default function About() {
  const {
    t,
    i18n: {},
  } = useTranslation();
  return (
    <div>
      <Navbar />
      <div className="page underwork">
        <h1 style={{ textAlign: 'center', color: 'var(--primary)' }}>
          About - {t('404.underwork')}
        </h1>
        <span style={{ color: 'var(--primary)' }}>{t('404.sorry')}</span>
      </div>
      <Footer />
    </div>
  );
}
