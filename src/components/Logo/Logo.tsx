import styles from './Logo.module.css';
import itim from '@/data/itimFont';
import Link from 'next/link';
import { memo } from 'react';
import { useReactiveVar } from '@apollo/client';
import { theme } from '@/reactive-var/theme';

// Logo Component
const Logo = () => {
  const currentTheme = useReactiveVar(theme);

  return (
    <Link data-theme={currentTheme} href={'/feed'} className={`${styles.logoWrapper} ${itim.className}`}>
      <span className={styles.firstHalf}>Q</span>
      <p className={styles.secondHalf}>Log</p>
    </Link>
  );
};

export default memo(Logo);
