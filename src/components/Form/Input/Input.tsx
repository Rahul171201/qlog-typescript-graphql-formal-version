import styles from './Input.module.css';
import Image from 'next/image';
import lato from '@/data/latoFont';
import useInput from '@/hooks/useInput';

// Input Component
const Input = ({
  label,
  type,
  placeholder,
  name,
  image
}: {
  label: string;
  type: string;
  placeholder: string;
  name: string;
  image: string;
}) => {
  const { value, handleChange } = useInput('');

  return (
    <div className={`${styles.inputWrapper} ${lato.className}`}>
      <label htmlFor={label} className={styles.label}>
        {label}
      </label>
      <input
        id={label}
        type={type}
        placeholder={placeholder}
        className={styles.inputField}
        onChange={handleChange}
        value={value}
        required
        autoComplete="off"
        name={name}
      ></input>
      <Image
        src={image}
        alt="user-icon"
        width={20}
        height={20}
        className={styles.imageIcon}
      ></Image>
    </div>
  );
};

export default Input;
