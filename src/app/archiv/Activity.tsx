"use client";

import React from 'react';
import Image from 'next/image';
import styles from './Activity.module.css';

type ActivityProps = {
  content: string;
  date: string;
  description: string;
  artistName: string;
  tag: string;
  imageUrl: string;
};

const Activity: React.FC<ActivityProps> = ({ content, date, description, artistName, tag, imageUrl }) => {
  return (
    <div className={styles.activity}>
      <div className={styles.lineWrapper}>
        <svg className={styles.svgLine} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 1">
          <path d="M0 0.5 H100" stroke="black" strokeWidth="0.1"/>
        </svg>
      </div>
      <div className={styles.activityContent}>
        <div className={styles.activityHeader}>
          <h2>{content}</h2>
          <p>{date}</p>
        </div>
        <div className={styles.activityDescription}>
          <p>{description}</p>
        </div>
        <div className={styles.activityArtist}>
          <h3>{artistName}</h3>
          <p>{tag}</p>
        </div>
        <div className={styles.activityImage}>
          <Image src={imageUrl} alt="Activity Image" width={100} height={100} />
        </div>
      </div>
    </div>
  );
};

export default Activity;
