import React from 'react';
import { useActivePage } from '../../context/AppActivePageContext';
import Button from '../../../components/Button';

const AppProfile: React.FC = () => {
  const { setActivePage } = useActivePage();

  return (
    <div>
      <h1>Profile Page</h1>
      <Button onClick={() => setActivePage('home')}>Go to home</Button>
    </div>
  );
};

export default AppProfile;
