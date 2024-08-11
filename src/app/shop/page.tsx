import Link from 'next/link';
import styles from './shop.module.css';

export default function Shopping() {
    return (
      <div className={styles.bigcontainer}>
        <div className={styles.textContainer}>Please Select the region</div>
      <div className={styles.container}>
        <Link className={styles.box} href="/shop/china">China</Link>
        <Link className={styles.box} href="/shop/europe">Europe</Link>
      </div>
      </div>
    );
  }