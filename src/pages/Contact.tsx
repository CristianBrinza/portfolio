import emailjs from '@emailjs/browser';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router';
import ArrowUpRight from '../components/ArrowUpRight/ArrowUpRight.tsx';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.tsx';
import Footer from '../components/Footer/Footer.tsx';
import { isSupportedLanguage } from '../seo/siteSeo.ts';
import styles from './Contact.module.css';

type FormValues = {
  email: string;
  message: string;
  name: string;
};

type SubmitStatus = 'error' | 'idle' | 'success';

type ContactDetailIconName = 'clock' | 'location' | 'phone' | 'reply';

function ContactDetailIcon({ name }: { name: ContactDetailIconName }) {
  const paths: Record<ContactDetailIconName, React.ReactNode> = {
    clock: (
      <>
        <circle cx="12" cy="12" r="8.25" />
        <path d="M12 7.5v4.85l3.15 1.9" />
      </>
    ),
    location: (
      <>
        <path d="M12 21s6-5.15 6-11a6 6 0 1 0-12 0c0 5.85 6 11 6 11Z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
    phone: (
      <path d="M8.1 4.35 10 8.6 7.8 10a15.25 15.25 0 0 0 6.2 6.2l1.4-2.2 4.25 1.9-.45 3.35a2 2 0 0 1-2.1 1.7C9.55 20.25 3.75 14.45 3.05 6.9a2 2 0 0 1 1.7-2.1l3.35-.45Z" />
    ),
    reply: (
      <>
        <path d="M5 6.75h14v9.5H9l-4 3v-12.5Z" />
        <path d="m8.25 10 3.75 2.7 3.75-2.7" />
      </>
    ),
  };

  return (
    <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        {paths[name]}
      </g>
    </svg>
  );
}

export default function Contact() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const routeLanguage = pathname.split('/').filter(Boolean)[0] ?? '';
  const language = isSupportedLanguage(routeLanguage) ? routeLanguage : 'en';
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
  } = useForm<FormValues>();
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');

  const onSubmit: SubmitHandler<FormValues> = async data => {
    try {
      setSubmitStatus('idle');
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS environment variables are not configured.');
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: data.name,
          message: data.message,
          reply_to: data.email,
          to_name: 'Recipient Name',
        },
        publicKey
      );
      reset();
      setSubmitStatus('success');
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('EmailJS Error:', error);
      }
      setSubmitStatus('error');
    }
  };

  const breadcrumbItems = [
    { label: t('navigation.home'), url: '/' },
    { label: t('contact_v2.breadcrumb') },
  ];

  const contactDetails = [
    {
      label: t('contact_v2.details.phone'),
      value: '+373 (68) 74-54-34',
      href: 'tel:+37368745434',
      icon: 'phone' as const,
    },
    {
      label: t('contact_v2.details.location'),
      value: t('contact_v2.details.location_value'),
      icon: 'location' as const,
    },
    {
      label: t('contact_v2.details.hours'),
      value: t('contact_v2.details.hours_value'),
      icon: 'clock' as const,
    },
    {
      label: t('contact_v2.details.response'),
      value: t('contact_v2.details.response_value'),
      icon: 'reply' as const,
    },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />

      <main className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroCopy}>
            <span>{t('contact_v2.hero.eyebrow')}</span>
            <h1>{t('contact_v2.hero.title')}</h1>
            <p>{t('contact_v2.hero.summary')}</p>
          </div>
        </header>

        <div className={styles.contactLayout}>
          <section
            aria-labelledby="contact-form-title"
            className={styles.formPanel}
          >
            <div className={styles.panelHeading}>
              <span>{t('contact_v2.form.eyebrow')}</span>
              <h2 id="contact-form-title">{t('contact_v2.form.title')}</h2>
              <p>{t('contact_v2.form.instruction')}</p>
            </div>

            <form
              aria-label={t('contact_v2.form.aria_label')}
              className={styles.form}
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="contact-name">
                    <span>{t('contact_v2.form.name')}</span>
                    <b aria-hidden="true">*</b>
                  </label>
                  <input
                    aria-invalid={Boolean(errors.name)}
                    aria-required="true"
                    id="contact-name"
                    placeholder={t('contact_v2.form.name_placeholder')}
                    required
                    type="text"
                    {...register('name', {
                      required: t('contact_v2.validation.name_required'),
                    })}
                  />
                  {errors.name && (
                    <span className={styles.errorMessage}>
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="contact-email">
                    <span>{t('contact_v2.form.email')}</span>
                    <b aria-hidden="true">*</b>
                  </label>
                  <input
                    aria-invalid={Boolean(errors.email)}
                    aria-required="true"
                    id="contact-email"
                    placeholder={t('contact_v2.form.email_placeholder')}
                    required
                    type="email"
                    {...register('email', {
                      pattern: {
                        message: t('contact_v2.validation.email_invalid'),
                        value: /^\S+@\S+$/i,
                      },
                      required: t('contact_v2.validation.email_required'),
                    })}
                  />
                  {errors.email && (
                    <span className={styles.errorMessage}>
                      {errors.email.message}
                    </span>
                  )}
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="contact-message">
                  <span>{t('contact_v2.form.message')}</span>
                  <b aria-hidden="true">*</b>
                </label>
                <textarea
                  aria-invalid={Boolean(errors.message)}
                  aria-required="true"
                  id="contact-message"
                  placeholder={t('contact_v2.form.message_placeholder')}
                  required
                  rows={5}
                  {...register('message', {
                    required: t('contact_v2.validation.message_required'),
                  })}
                />
                {errors.message && (
                  <span className={styles.errorMessage}>
                    {errors.message.message}
                  </span>
                )}
              </div>

              {submitStatus === 'success' && (
                <p className={styles.successMessage} role="status">
                  {t('contact_v2.status.success')}
                </p>
              )}
              {submitStatus === 'error' && (
                <p className={styles.errorMessage} role="alert">
                  {t('contact_v2.status.error')}
                </p>
              )}

              <div className={styles.formFooter}>
                <button disabled={isSubmitting} type="submit">
                  <span>
                    {isSubmitting
                      ? t('contact_v2.form.sending')
                      : t('contact_v2.form.send')}
                  </span>
                  <b aria-hidden="true">
                    <ArrowUpRight />
                  </b>
                </button>
                <p>
                  {t('contact_v2.form.privacy_prefix')}{' '}
                  <Link to={`/${language}/privacy`}>
                    {t('contact_v2.form.privacy_link')}
                  </Link>
                  .
                </p>
              </div>
            </form>
          </section>

          <aside
            aria-labelledby="contact-details-title"
            className={styles.detailsPanel}
          >
            <div className={styles.panelHeading}>
              <span>{t('contact_v2.details.eyebrow')}</span>
              <h2 id="contact-details-title">
                {t('contact_v2.details.title')}
              </h2>
            </div>

            <a
              className={styles.emailLink}
              href="mailto:inbox@cristianbrinza.com"
            >
              <span>inbox@cristianbrinza.com</span>
              <b aria-hidden="true">
                <ArrowUpRight />
              </b>
            </a>

            <dl className={styles.detailList}>
              {contactDetails.map(detail => (
                <div key={detail.label}>
                  <span className={styles.detailIcon}>
                    <ContactDetailIcon name={detail.icon} />
                  </span>
                  <div>
                    <dt>{detail.label}</dt>
                    <dd>
                      {detail.href ? (
                        <a href={detail.href}>{detail.value}</a>
                      ) : (
                        detail.value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </main>

      <Footer type="2" />
    </>
  );
}
