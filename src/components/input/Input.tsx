import { FC } from 'react';
import Icon, { icons } from '../Icon.tsx';
import styles from './Input.module.css';

interface InputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon?: keyof typeof icons; // Make the icon prop optional
  name?: string;
  required?: boolean;
  className?: string;
}

const Input: FC<InputProps> = ({
  placeholder,
  value,
  onChange,
  icon,
  name,
  required = false,
  className = '',
}) => {
  return (
    <div className={`${styles.costume_input_block} ${className}`}>
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        required={required}
        className={styles.costume_input}
        onChange={e => onChange(e.target.value)}
      />
      {icon && (
        <Icon
          className={styles.costume_input_svg}
          type={icon}
          color="var(--theme_primary_color_darkest_gray)"
        />
      )}{' '}
      {/* Render Icon component only if icon is provided */}
    </div>
  );
};

export default Input;
