import React from 'react';
import styles from './Application.module.css';
import { AuthProvider } from './context/AppAuthContext';
import { ActivePageProvider } from './context/AppActivePageContext';
import PageRenderer from './components/AppPageRenderer.tsx';
import BodyClassManager from "./components/BodyClassManager.tsx";

const Application: React.FC = () => {
  return (
    <ActivePageProvider>
      <AuthProvider>
          <BodyClassManager className={styles.appBody} />
        <div className={styles.app}>
          <PageRenderer />
        </div>
      </AuthProvider>
    </ActivePageProvider>
  );
};

export default Application;
