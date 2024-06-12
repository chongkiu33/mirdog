"use client";

import React from 'react';
import Activity from './Activity';
import styles from './Archiv.module.css';

const activities = [
  {
    content: "ACTIVITY CONTENT",
    date: "24-03-14",
    description: "Theo Ouaki (b.1989) lives and works in Marseille, France. He studied at Marseille Fine Art and developed his career during residencies in Benin, Italy and Mexico.",
    artistName: "Artist's Name",
    tag: "Tag",
    imageUrl: "/image/LitFest22_Motivmathis_beutel_rgb-cut_q.jpg"
  },
  // 添加更多活动对象
];

const Archiv: React.FC = () => {
  return (
    <div className={styles.archiv}>
      {activities.map((activity, index) => (
        <>
        <Activity
          key={index}
          content={activity.content}
          date={activity.date}
          description={activity.description}
          artistName={activity.artistName}
          tag={activity.tag}
          imageUrl={activity.imageUrl}
        />
        <Activity
          key={index}
          content={activity.content}
          date={activity.date}
          description={activity.description}
          artistName={activity.artistName}
          tag={activity.tag}
          imageUrl={activity.imageUrl}
        />
        <Activity
          key={index}
          content={activity.content}
          date={activity.date}
          description={activity.description}
          artistName={activity.artistName}
          tag={activity.tag}
          imageUrl={activity.imageUrl}
        />

<Activity
          key={index}
          content={activity.content}
          date={activity.date}
          description={activity.description}
          artistName={activity.artistName}
          tag={activity.tag}
          imageUrl={activity.imageUrl}
        />
        </>
      ))}
    </div>
  );
};

export default Archiv;
