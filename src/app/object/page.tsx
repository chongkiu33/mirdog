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
        {images.map((src, index) => (
          <div key={index} className={styles.imageWrapper}>
            <Image src={src} alt={`Image ${index + 1}`} layout="responsive" width={300} height={300} className={styles.image}/>
          </div>
        ))}
      </div>
    </div>
  );
}