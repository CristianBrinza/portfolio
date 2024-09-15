import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin.css';

export default function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to /login when the component loads
    navigate('/login');
  }, [navigate]);

  return <></>;
}
