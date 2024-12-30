import React, { useEffect, useState } from 'react';
import AppMenu from '../../components/appmenu/AppMenu.tsx';
import styles from './AppStatus.module.css';

const AppStatus: React.FC = () => {
  const [statusCode, setStatusCode] = useState<number | null>(null);

  useEffect(() => {
    const checkBackendStatus = async () => {
      const backendStatusElement = document.getElementById('backend_status');
      if (!backendStatusElement) return;

      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND}/status`);

        setStatusCode(response.status); // Update the state with the status code

        if (response.status === 200) {
          backendStatusElement.style.backgroundColor = '#23d923'; // Set to green for success
        } else {
          backendStatusElement.style.backgroundColor = 'orange'; // Set to orange for non-200 statuses
        }
      } catch (error) {
        console.error('Error fetching backend status:', error);
        setStatusCode(null); // Set to null to indicate an error
        backendStatusElement.style.backgroundColor = 'red'; // Set to red for errors
      }
    };

    checkBackendStatus();
  }, []);

  return (
    <div className={styles.app_status}>
      <div className={styles.app_status_option_title}>Status</div>
      <div className={styles.app_status_blocks}>
        <div className={styles.app_status_block}>
          <span className={styles.app_status_block_title}>
            Portfolio Backend
          </span>
          <div className={styles.app_status_block_type} id="backend_status">
            {/* Status color will be applied dynamically */}
          </div>
          <span className={styles.app_status_block_code}>
            status code: <b>{statusCode !== null ? statusCode : 'Error'}</b>{' '}
            <br />
            health: []
          </span>
        </div>
      </div>

      <AppMenu />
    </div>
  );
};

export default AppStatus;
