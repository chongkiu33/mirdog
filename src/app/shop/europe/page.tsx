import Product from '@/app/components/product/product';
import styles from './europeshop.module.css';

export default function Shopping() {
    return (
      <div className={styles.container}>
        <div className={styles.textContainer}>
            <div className={styles.material}>
                <div className={styles.textTitle}>Material</div>
                <div className={styles.textContent}>CategoryA</div>
                <div className={styles.textContent}>CategoryB</div>
                <div className={styles.textContent}>CategoryC</div>
            </div>
            <div className={styles.type}>
                <div className={styles.textTitle}>Type</div>
                <div className={styles.textContent}>CategoryA</div>
                <div className={styles.textContent}>CategoryB</div>
                <div className={styles.textContent}>CategoryC</div>
            </div>

            <div className={styles.artist}>
                <div className={styles.textTitle}>Artist</div>
                <div className={styles.textContent}>CategoryA</div>
                <div className={styles.textContent}>CategoryB</div>
                <div className={styles.textContent}>CategoryC</div>
            </div>
        </div>

        <div className={styles.productContainer}>
            <div className={styles.product}><Product /></div>
            <div className={styles.product}><Product /></div>
            <div className={styles.product}><Product /></div>
            <div className={styles.product}><Product /></div>
            <div className={styles.product}><Product /></div>
            <div className={styles.product}><Product /></div>
            <div className={styles.product}><Product /></div>
            <div className={styles.product}><Product /></div>
            <div className={styles.product}><Product /></div>
            <div className={styles.product}><Product /></div>
            <div className={styles.product}><Product /></div>
            <div className={styles.product}><Product /></div>
        </div>
        
      </div>
    );
  }