import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import emailjs from 'emailjs-com';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb';
import { Trans } from 'react-i18next';
import '../styles/Contact.css';
import Button from '../components/Button';
import Parapraph from '../components/Text/Parapraph/Parapraph.tsx';
import Footer from '../components/Footer/Footer.tsx';
import Page from '../components/Page.tsx';
import Title from '../components/Text/Title/Title.tsx';

type FormValues = {
  name: string;
  email: string;
  message: string;
};

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>();
  const [isError, setIsError] = useState(false);

  const onSubmit: SubmitHandler<FormValues> = async data => {
    try {
      const templateParams = {
        from_name: data.name,
        to_name: 'Recipient Name', // Replace this with the actual recipient's name
        message: data.message,
        reply_to: data.email,
      };

      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID!,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID!,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY!
      );
      reset();
      setIsError(false);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setIsError(true);
    }
  };

  return (
    <>
      <Breadcrumb
        items={[
          { label: <Trans>navigation.home</Trans>, url: '/' },
          { label: <Trans>navigation.contact_page</Trans> },
        ]}
      />
      <Page className="main contact_page">
        <div id="contact_page_left">
          <Title>
            Let's start a
            <br />
            project together
          </Title>
          <br />
          <Parapraph>
            I’m always excited to connect and explore new opportunities. Whether
            you have a project in mind, want to collaborate, or just want to say
            hello, feel free to reach out.
          </Parapraph>
          <br />
          <div className="contact_info">
            <span className="contact_info_row">
              <b>Phone: </b>
              <a style={{ textDecoration: 'none' }} href="tel:+37368745434">
                +373 (68) 74-54-34
              </a>
            </span>
            <span className="contact_info_row">
              <b>Email: </b>
              <a href="mailto:inbox@cristianbrinza.com">
                inbox@cristianbrinza.com
              </a>
            </span>
            <span className="contact_info_row">
              <b>Location: </b>
              <span>Chisinau, Moldova Republic of</span>
            </span>
            <br />
            <span className="contact_info_row">
              <b>Office Hours: </b>{' '}
              <br className="contact_br_hide_on_desktop" />
              <span>Available Monday to Friday, 9 AM - 5 PM</span>
            </span>
            <span className="contact_info_row">
              <b>Response Time: </b>{' '}
              <br className="contact_br_hide_on_desktop" />
              <span>I usually respond within 1-3 hours</span>
            </span>
          </div>
        </div>
        <div id="contact_page_right">
          <form onSubmit={handleSubmit(onSubmit)} className="contact_form">
            <div className="form_group">
              <label htmlFor="name">
                <Trans>contact.name</Trans>
              </label>
              <input
                id="name"
                type="text"
                {...register('name', { required: 'Name is required' })}
                placeholder="Your Name"
              />
              {errors.name && (
                <span className="error_message">{errors.name.message}</span>
              )}
            </div>
            <div className="form_group">
              <label htmlFor="email">
                <Trans>contact.email</Trans>
              </label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Enter a valid email address',
                  },
                })}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <span className="error_message">{errors.email.message}</span>
              )}
            </div>
            <div className="form_group">
              <label htmlFor="message">
                <Trans>contact.message</Trans>
              </label>
              <textarea
                id="message"
                {...register('message', { required: 'Message is required' })}
                placeholder="Your Message"
                rows={5}
              />
              {errors.message && (
                <span className="error_message">{errors.message.message}</span>
              )}
            </div>

            {isSubmitSuccessful && !isError && (
              <span className="success_message">
                <Trans>contact.success_message</Trans>
              </span>
            )}
            {isError && (
              <span className="error_message">
                <Trans>contact.error_message</Trans>
              </span>
            )}

            <Button
              color="var(--theme_primary_color_white)"
              bgcolor="var(--theme_primary_color_black)"
              border="var(--theme_primary_color_black)"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Trans>contact.sending</Trans>
              ) : (
                <Trans>contact.send_message</Trans>
              )}
            </Button>

            <span style={{ fontSize: '12px', lineHeight: '12px' }}>
              By submitting this form, you acknowledge receipt of our company
              Privacy and policy.
            </span>
          </form>
        </div>
      </Page>
      <Footer />
    </>
  );
}
