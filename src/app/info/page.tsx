
// src/app/info/page.tsx
import React from 'react';
import Image from 'next/image';
import styles from './info.module.css'; // 使用CSS模块

const InfoPage = () => {
  return (
    <div id="info" className={styles.info}>
      <div className={`${styles.infoblock} ${styles.logoimage}`}>
        <Image style={{ width: '100%' }} src="/logo2.svg" alt="Logo" width={500} height={500} />
      </div>
      <div className={`${styles.infoblock} ${styles.emailins}`}>
        ——&gt;Email<br />
        ——&gt;Instagram
      </div>
      <div className={`${styles.infoblock} ${styles.introduce}`}>
        <div id="designcompany" className={styles.designcompany}>
          Introduction of MIR DESIGN from a design company
        </div>
        <br /><br /><br />
        About the birth of MIR Design
        <br /><br /><br />
        The origin of MIR Design
        <br /><br /><br />
        MIR Design concept
        <br /><br /><br />
        Contact informationContact information
      </div>
    </div>
  );
};

export default InfoPage;
