import React, { useState } from 'react';
import { useAuth } from '../../context/AppAuthContext';
import { useActivePage } from '../../context/AppActivePageContext';
import Button from '../../../components/Button';
import TextField from '../../components/textfield/TextField';
import styles from './AppLogin.module.css';
import BodyClassManager from "../../components/BodyClassManager.tsx";
import Notification from "../../../components/Notification/Notification.tsx";
import MetaAndBodyManager from "../../components/MetaAndBodyManager.tsx";

const AppLogin: React.FC = () => {
  const { login } = useAuth();
  const { setActivePage } = useActivePage();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null); // Clear previous error messages

    try {
      await login(username, password); // Login via AuthContext
      setActivePage('home'); // Navigate to "home" on successful login
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('Invalid username or password.'); // Show error message
    }
  };

  return (
    <div className={styles.app_login}>
      <BodyClassManager className={styles.app_login_body} />
      <MetaAndBodyManager themeColor="#e40523" bodyBackgroundColor="var(--theme_primary_color_red)" />
      <div className={styles.app_login_form_block}>
        <form className={styles.app_login_form} onSubmit={handleSubmit}>
          <div className={styles.app_login_form_title}>Login</div>
          <TextField
            id="username"
            label="Username"
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className={styles.app_login_form_input}
          />

          <TextField
            id="password"
            label="Password"
            name="password"
            value={password}
            type="password"
            onChange={e => setPassword(e.target.value)}
            required
            className={styles.app_login_form_input}
          />

          {errorMessage && (  <Notification type="error">
            {errorMessage}
          </Notification>)}

          <Button className={styles.app_login_form_btn} type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AppLogin;
