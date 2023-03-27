import styles from './ImageComponent.module.css';
import Image from 'next/image';
import { memo } from 'react';

const ImageComponent = ({ src }: { src: string }) => {
  return (
    <div className={styles.imageWrapper}>
      <Image
        src={src}
        alt="image"
        width={300}
        height={300}
        className={styles.image}
      ></Image>
    </div>
  );
};

export default memo(ImageComponent);
