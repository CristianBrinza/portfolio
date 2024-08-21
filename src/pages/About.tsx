// src/pages/About.tsx
import React from 'react';
import Breadcrumb from '../components/Breadcrumb/Breadcrumb.tsx';
import { Trans } from 'react-i18next';
import Notification from '../components/Notification/Notification.tsx'; // Import Trans component

export default function About() {
  const breadcrumbItems = [
    { label: <Trans>navigation.home</Trans>, url: '/' },
    { label: <Trans>navigation.about_page</Trans> },
  ];

  return (
    <>
      <Breadcrumb items={breadcrumbItems} />
      <div className="main">
        <h1>About</h1>
        <Notification type="error" time={5000}>
          text text text text text text text text text text text text text text
          text text text text text text text text text text text text text text
          text
        </Notification>
        <Notification type="warning">
          {' '}
          text text text text text text text text text text
        </Notification>
        <Notification type="success">
          {' '}
          text text text text text text text text text text
        </Notification>
      </div>
    </>
  );
}
