import { useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/Button';
import './admin.css';

export default function Admin() {
  const { role, logout } = useAuth();
  const navigate = useNavigate();
  const { lang } = useParams();

  useEffect(() => {
    if (role !== 'admin') {
      // Redirect non-admin users to the login page
      navigate(`/${lang}/login`);
    }
  }, [role, lang, navigate]);

  const handleLogout = () => {
    logout();
    navigate(`/${lang}/login`);
  };

  return (
      <div className="admin-page">
        <header className="admin-header">
          <h1>Admin Panel</h1>
          <Button onClick={handleLogout}>Logout</Button>
        </header>

        <section className="admin-content">
          <h2>Welcome, Admin!</h2>
          <p>Here, you can manage various aspects of the application:</p>
          <ul>
            <li>Manage Users</li>
            <li>View Reports</li>
            <li>Manage Content</li>
            <li>Application Settings</li>
          </ul>
        </section>
      </div>
  );
}
