import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  getConsentPreferences,
  OPEN_CONSENT_SETTINGS_EVENT,
  saveConsentPreferences,
  trackPageview,
  type ConsentPreferences,
} from '../../utils/consent';
import './ConsentBanner.css';

interface ConsentBannerProps {
  visible: boolean;
}

const EMPTY_PREFERENCES: ConsentPreferences = {
  analytics: false,
  marketing: false,
};

const ConsentBanner = ({ visible }: ConsentBannerProps) => {
  const { t, i18n } = useTranslation();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [initialPreferences] = useState(() => getConsentPreferences());
  const [showBanner, setShowBanner] = useState(initialPreferences === null);
  const [customizing, setCustomizing] = useState(false);
  const [hasSavedChoice, setHasSavedChoice] = useState(
    initialPreferences !== null
  );
  const [preferences, setPreferences] = useState<ConsentPreferences>(() =>
    initialPreferences
      ? {
          analytics: initialPreferences.analytics,
          marketing: initialPreferences.marketing,
        }
      : EMPTY_PREFERENCES
  );

  const activeLanguage = (i18n.resolvedLanguage ?? i18n.language ?? 'en')
    .split('-')[0]
    .toLowerCase();
  const language = ['en', 'ro', 'ru'].includes(activeLanguage)
    ? activeLanguage
    : 'en';

  useEffect(() => {
    const openSettings = () => {
      const savedPreferences = getConsentPreferences();
      setPreferences(
        savedPreferences
          ? {
              analytics: savedPreferences.analytics,
              marketing: savedPreferences.marketing,
            }
          : EMPTY_PREFERENCES
      );
      setHasSavedChoice(Boolean(savedPreferences));
      setCustomizing(true);
      setShowBanner(true);
    };

    window.addEventListener(OPEN_CONSENT_SETTINGS_EVENT, openSettings);
    return () =>
      window.removeEventListener(OPEN_CONSENT_SETTINGS_EVENT, openSettings);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!visible || !showBanner || !dialog) return;

    if (!dialog.open) dialog.showModal();
    window.requestAnimationFrame(() => dialog.focus({ preventScroll: true }));

    return () => {
      if (dialog.open) dialog.close();
    };
  }, [showBanner, visible]);

  const saveAndClose = (nextPreferences: ConsentPreferences) => {
    saveConsentPreferences(nextPreferences);
    setPreferences(nextPreferences);
    setHasSavedChoice(true);
    setShowBanner(false);
    setCustomizing(false);

    if (nextPreferences.analytics) {
      trackPageview(window.location.pathname, document.title);
    }
  };

  const acceptAll = () => saveAndClose({ analytics: true, marketing: true });
  const rejectAll = () => saveAndClose({ analytics: false, marketing: false });

  const handleCancel = (event: React.SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    if (customizing && hasSavedChoice) {
      setShowBanner(false);
      setCustomizing(false);
    }
  };

  if (!visible || !showBanner) return null;

  return createPortal(
    <dialog
      aria-describedby="consent-description"
      aria-labelledby="consent-title"
      className="consentDialog"
      onCancel={handleCancel}
      ref={dialogRef}
      tabIndex={-1}
    >
      <div className="consentBackdrop" aria-hidden="true" />
      <section className="consentPanel">
        <div className="consentAccent" aria-hidden="true" />

        {customizing ? (
          <PreferencesPanel
            hasSavedChoice={hasSavedChoice}
            onAcceptAll={acceptAll}
            onBack={() => setCustomizing(false)}
            onClose={() => {
              setShowBanner(false);
              setCustomizing(false);
            }}
            onRejectAll={rejectAll}
            onSave={() => saveAndClose(preferences)}
            preferences={preferences}
            privacyPath={`/${language}/privacy`}
            setPreferences={setPreferences}
          />
        ) : (
          <div className="consentOverview">
            <div className="consentCopy">
              <p className="consentEyebrow">{t('cookie_consent.eyebrow')}</p>
              <h2 id="consent-title">{t('cookie_consent.title')}</h2>
              <p id="consent-description">{t('cookie_consent.description')}</p>
              <Link
                className="consentPolicyLink"
                rel="noopener noreferrer"
                target="_blank"
                to={`/${language}/privacy`}
              >
                {t('cookie_consent.policy')} ↗
              </Link>
            </div>

            <div className="consentActions">
              <ConsentButton onClick={rejectAll} variant="secondary">
                {t('cookie_consent.reject_all')}
              </ConsentButton>
              <ConsentButton
                onClick={() => setCustomizing(true)}
                variant="secondary"
              >
                {t('cookie_consent.customize')}
              </ConsentButton>
              <ConsentButton onClick={acceptAll} variant="primary">
                {t('cookie_consent.accept_all')}
              </ConsentButton>
            </div>
          </div>
        )}
      </section>
    </dialog>,
    document.body
  );
};

type PreferencesPanelProps = {
  hasSavedChoice: boolean;
  onAcceptAll: () => void;
  onBack: () => void;
  onClose: () => void;
  onRejectAll: () => void;
  onSave: () => void;
  preferences: ConsentPreferences;
  privacyPath: string;
  setPreferences: Dispatch<SetStateAction<ConsentPreferences>>;
};

function PreferencesPanel({
  hasSavedChoice,
  onAcceptAll,
  onBack,
  onClose,
  onRejectAll,
  onSave,
  preferences,
  privacyPath,
  setPreferences,
}: PreferencesPanelProps) {
  const { t } = useTranslation();

  return (
    <div className="consentPreferences">
      <div className="consentPreferencesHeader">
        <button className="consentBack" onClick={onBack} type="button">
          ← {t('cookie_consent.back')}
        </button>
        {hasSavedChoice && (
          <button
            aria-label={t('cookie_consent.close')}
            className="consentClose"
            onClick={onClose}
            type="button"
          >
            ×
          </button>
        )}
      </div>

      <div className="consentPreferencesIntro">
        <div>
          <p className="consentEyebrow">{t('cookie_consent.settings')}</p>
          <h2 id="consent-title">{t('cookie_consent.manage_title')}</h2>
        </div>
        <p id="consent-description">{t('cookie_consent.manage_description')}</p>
      </div>

      <div
        aria-label={t('cookie_consent.categories_label')}
        className="consentCategories"
      >
        <ConsentCategory
          checked
          description={t('cookie_consent.necessary_description')}
          locked
          title={t('cookie_consent.necessary_title')}
        />
        <ConsentCategory
          checked={preferences.analytics}
          description={t('cookie_consent.analytics_description')}
          onChange={checked =>
            setPreferences(current => ({ ...current, analytics: checked }))
          }
          title={t('cookie_consent.analytics_title')}
        />
        <ConsentCategory
          checked={preferences.marketing}
          description={t('cookie_consent.marketing_description')}
          onChange={checked =>
            setPreferences(current => ({ ...current, marketing: checked }))
          }
          title={t('cookie_consent.marketing_title')}
        />
      </div>

      <div className="consentPreferencesFooter">
        <Link
          className="consentPolicyLink"
          rel="noopener noreferrer"
          target="_blank"
          to={privacyPath}
        >
          {t('cookie_consent.policy')} ↗
        </Link>
        <div className="consentActions consentPreferencesActions">
          <ConsentButton onClick={onRejectAll} variant="secondary">
            {t('cookie_consent.reject_all')}
          </ConsentButton>
          <ConsentButton onClick={onSave} variant="secondary">
            {t('cookie_consent.save')}
          </ConsentButton>
          <ConsentButton onClick={onAcceptAll} variant="primary">
            {t('cookie_consent.accept_all')}
          </ConsentButton>
        </div>
      </div>
    </div>
  );
}

type ConsentCategoryProps = {
  checked: boolean;
  description: string;
  locked?: boolean;
  onChange?: (checked: boolean) => void;
  title: string;
};

function ConsentCategory({
  checked,
  description,
  locked = false,
  onChange,
  title,
}: ConsentCategoryProps) {
  const { t } = useTranslation();

  return (
    <label className="consentCategory">
      <span className="consentCategoryIndex" aria-hidden="true">
        {locked
          ? '01'
          : title === t('cookie_consent.analytics_title')
            ? '02'
            : '03'}
      </span>
      <span className="consentCategoryCopy">
        <strong>{title}</strong>
        <span>{description}</span>
      </span>
      <span className="consentSwitch">
        <input
          checked={checked}
          disabled={locked}
          onChange={event => onChange?.(event.target.checked)}
          type="checkbox"
        />
        <span className="consentSwitchTrack" aria-hidden="true">
          <span />
        </span>
        <span className="consentSwitchState">
          {locked
            ? t('cookie_consent.always_on')
            : checked
              ? t('cookie_consent.on')
              : t('cookie_consent.off')}
        </span>
      </span>
    </label>
  );
}

type ConsentButtonProps = {
  children: string;
  onClick: () => void;
  variant: 'primary' | 'secondary';
};

function ConsentButton({ children, onClick, variant }: ConsentButtonProps) {
  return (
    <button
      className={`consentButton consentButton--${variant}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export default ConsentBanner;
