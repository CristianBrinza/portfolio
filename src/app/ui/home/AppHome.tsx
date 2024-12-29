import React from 'react';
import { useActivePage } from '../../context/AppActivePageContext';
import Button from '../../../components/Button';
import AppNavigation from "../../components/navigation/AppNavigation.tsx";
//import styles from "./AppHome.module.css";

const AppHome: React.FC = () => {
  const { setActivePage } = useActivePage();

  return (
    <div>
        <AppNavigation/>
      <h1>Home Page</h1>
      <Button onClick={() => setActivePage('profile')}>Go to Profile</Button>
    </div>
  );
};

export default AppHome;
