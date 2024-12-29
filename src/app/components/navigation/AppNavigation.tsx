import React from 'react';
import Button from '../../../components/Button';
import { useActivePage } from '../../context/AppActivePageContext.tsx';

const Navigation: React.FC = () => {
  const { setActivePage } = useActivePage();
  return (
    <div>
      <Button onClick={() => setActivePage('profile')}>Home</Button>
      {/* Example: More pages */}
      <Button onClick={() => setActivePage('profile')}>Profile</Button>
      <Button
        onClick={() => {
          setActivePage('login');
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Navigation;
