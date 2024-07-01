import React from 'react';
import Image from 'next/image';
import styles from './Object.module.css';

export default function Object() {
  const images = [
    '/image/20object/3-Rocambolesk-2015-pot-with-lid-31-x-o30-cm-wvleeuwen-photo__def_image-scaled.jpg',
    '/image/20object/8a8fbd10-ed83-40c5-944c-30472c4e536d_sayhito_Natalia+Triantafylli_star2.jpg',
    '/image/20object/21-61-Byzantium-I-30x36x21-cm-800x518.jpg',
    '/image/20object/67ed6d10-19ef-4a38-993f-a94ea3fab128_sayhito_Natalia+Triantafylli_4+1+horses+vase.jpg',
    '/image/20object/210615_004-1-854x1280.jpg',
    '/image/20object/210617_02A7681-scaled-1-1920x1280.jpg',
    '/image/20object/429582352_420140020397196_8508968654313492964_n.jpg',
    '/image/20object/下载 (4) 2.jpg',
    '/image/20object/下载 (4).jpg',
    '/image/20object/AP-1-60x50x53cm.jpg',
    '/image/20object/Buds-42-x-34-x-40-cm-H-800x919.jpg',
    '/image/20object/C.R-Steel-Blue-with-Crystals-T.1324R.P.-kopie-1024x705.jpg',
    '/image/20object/Daphne-47-x-42-x-60-cm-H.-800x1067.jpg',
    '/image/20object/fischkoeppe-hochkant-849e5425.webp',
    '/image/20object/hasen-bueste-er-22-ee52635e.webp',
    '/image/20object/P1070650-e6c61fbd.webp',
    '/image/20object/Spine_SUJET3.webp',
    '/image/20object/UKB_Sissi_Vase_02-scaled-1-854x1280.jpg',
    '/image/20object/Watering_-200x150x120mm_정은_-2010_01-e1634367885219.jpg',
    '/image/20object/210615_008-scaled-1-1591x1280.jpg',
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