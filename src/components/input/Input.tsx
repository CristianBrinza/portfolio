import { FC } from 'react';
import Icon, { icons } from '../Icon.tsx';
import styles from './Input.module.css';

interface InputProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  icon?: keyof typeof icons; // Make the icon prop optional
  name?: string;
  required?: boolean;
  className?: string;
  type?: string; // Add type as an optional prop
  min?: string; // Add min as an optional prop
  max?: string; // Add max as an optional prop
}

const Input: FC<InputProps> = ({
  placeholder,
  value,
  onChange,
  icon,
  name,
  required = false,
  className = '',
  type = 'text', // Default type to "text"
  min,
  max,
}) => {
  return (
    <div className={`${styles.costume_input_block} ${className}`}>
      <input
        type={type} // Use the type prop
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        className={styles.costume_input}
        onChange={e => onChange(e.target.value)}
        min={min} // Pass the min attribute
        max={max} // Pass the max attribute
      />
      {icon && (
        <Icon
          className={styles.costume_input_svg}
          type={icon}
          color="var(--theme_primary_color_darkest_gray)"
        />
      )}
    </div>
  );
};

export default Input;
