import React, { useState } from 'react';
import './TextField.css';
import Icon from '../../../components/Icon.tsx';

interface TextFieldProps {
  id: string;
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

const TextField: React.FC<TextFieldProps> = ({
                                               id,
                                               label,
                                               name,
                                               type = 'text',
                                               value,
                                               onChange,
                                               required = false,
                                               placeholder = '',
                                               className = '',
                                             }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
      <div className={`app_form_input ${className}`}>
        <input
            id={id}
            name={name}
            type={type === 'password' && !showPassword ? 'password' : 'text'}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder || label} // Label doubles as a placeholder
        />
        <label htmlFor={id}>{label}</label>
        {type === 'password' && (
            <div
                className="password-toggle-icon"
                onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                  <Icon type="pass_show" color="var(--theme_primary_color_white)" />
              ) : (
                  <Icon type="pass_hide" color="var(--theme_primary_color_white)" />
              )}
            </div>
        )}
      </div>
  );
};

export default TextField;
