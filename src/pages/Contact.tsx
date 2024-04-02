import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Contact() {
  const {
    t,
    i18n: {},
  } = useTranslation();
  return (
    <div>
      <Navbar />
      <div className="page underwork">
        <h1 style={{ textAlign: 'center', color: 'var(--primary)' }}>
          Contact -{t('404.underwork')}
        </h1>
        <span style={{ color: 'var(--primary)' }}>{t('404.sorry')}</span>
      </div>
      <Footer />
    </div>
  );
}
