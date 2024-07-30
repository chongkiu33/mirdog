import styles from './shop.module.css';

export default function Shopping() {
    return (
      <div className={styles.bigcontainer}>
        <div className={styles.textContainer}>Please Select the region</div>
      <div className={styles.container}>
        <div className={styles.box}>China</div>
        <div className={styles.box}>Europe</div>
      </div>
      </div>
    );
  }