import React from 'react';
import { useActivePage } from '../../context/AppActivePageContext';
import Button from '../../../components/Button';
import AppMenu from '../../components/appmenu/AppMenu.tsx';
//import styles from "./AppHome.module.css";

const AppHome: React.FC = () => {
  const { setActivePage } = useActivePage();

  return (
    <div>
      <h1>Home Page</h1>
      <Button onClick={() => setActivePage('profile')}>Go to Profile</Button>
      <AppMenu />
    </div>
  );
};

export default AppHome;
