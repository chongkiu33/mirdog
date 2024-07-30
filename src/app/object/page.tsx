import React from 'react';
import Image from 'next/image';
import styles from './Object.module.css';

export default function Object() {
  const images = [
    '/image/20object/pic1.jpg',
    '/image/20object/pic2.jpg',
    '/image/20object/pic3.jpg',
    '/image/20object/pic4.jpg',
    '/image/20object/pic5.jpg',
    '/image/20object/pic6.jpg',
    '/image/20object/pic7.jpg',
    '/image/20object/pic8.jpg',
    '/image/20object/pic9.jpg',
    '/image/20object/pic10.jpg',
    '/image/20object/pic11.jpg',
    '/image/20object/pic12.jpg',
    '/image/20object/pic13.jpg',
    '/image/20object/pic14.jpg',
    '/image/20object/pic15.jpg',
    '/image/20object/pic16.jpg',
    '/image/20object/pic17.jpg',
    '/image/20object/pic18.jpg',
    '/image/20object/pic19.jpg',
    '/image/20object/pic20.jpg',
    
  ];

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        
          <div  className={`${styles.imageWrapper} ${styles.Wrapper1}`} >
            <Image src='/image/20object/pic1.jpg' alt=''  layout="responsive" width={200} height={300} className={`${styles.image} ${styles.pic1}`} />
          </div>

          <div  className={`${styles.imageWrapper} ${styles.Wrapper2}`} >
            <Image src='/image/20object/pic2.jpg' alt=''  layout="responsive" width={150} height={280} className={`${styles.image} ${styles.pic2}`} />
          </div>

          <div  className={`${styles.imageWrapper} ${styles.Wrapper3}`} >
            <Image src='/image/20object/pic3.jpg' alt=''  layout="responsive" width={200} height={300} className={`${styles.image} ${styles.pic3}`} />
          </div>

          <div  className={`${styles.imageWrapper} ${styles.Wrapper4}`} >
            <Image src='/image/20object/pic4.jpg' alt=''  layout="responsive" width={150} height={280} className={`${styles.image} ${styles.pic4}`} />
          </div>

          <div  className={`${styles.imageWrapper} ${styles.Wrapper5}`} >
            <Image src='/image/20object/pic5.jpg' alt=''  layout="responsive" width={150} height={280} className={`${styles.image} ${styles.pic5}`} />
          </div>

          <div  className={`${styles.imageWrapper} ${styles.Wrapper6}`} >
            <Image src='/image/20object/pic6.jpg' alt=''  layout="responsive" width={150} height={280} className={`${styles.image} ${styles.pic6}`} />
          </div>

          <div  className={`${styles.imageWrapper} ${styles.Wrapper7}`} >
            <Image src='/image/20object/pic7.jpg' alt=''  layout="responsive" width={150} height={280} className={`${styles.image} ${styles.pic7}`} />
          </div>

          <div  className={`${styles.imageWrapper} ${styles.Wrapper8}`} >
            <Image src='/image/20object/pic8.jpg' alt=''  layout="responsive" width={150} height={280} className={`${styles.image} ${styles.pic8}`} />
          </div>


          <div  className={`${styles.imageWrapper} ${styles.Wrapper9}`} >
            <Image src='/image/20object/pic9.jpg' alt=''  layout="responsive" width={150} height={280} className={`${styles.image} ${styles.pic9}`} />
          </div>

          <div  className={`${styles.imageWrapper} ${styles.Wrapper10}`} >
            <Image src='/image/20object/pic10.jpg' alt=''  layout="responsive" width={150} height={280} className={`${styles.image} ${styles.pic10}`} />
          </div>

          <div  className={`${styles.imageWrapper} ${styles.Wrapper11}`} >
            <Image src='/image/20object/pic11.jpg' alt=''  layout="responsive" width={150} height={280} className={`${styles.image} ${styles.pic11}`} />
          </div>
        
      </div>
    </div>
  );
}