"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Activity.module.css';
import { Tween, Easing, update as tweenUpdate } from '@tweenjs/tween.js';

type ActivityProps = {
    content: string;
    date: string;
    description: string;
    artistName: string;
    tag: string;
    imageUrl: string;
    link: string;
};

const Activity: React.FC<ActivityProps> = ({ content, date, description, artistName, tag, imageUrl, link }) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const mousePos = useRef<{ y: number }>({ y: 0 });
    const connected = useRef<boolean>(false);
    const tweening = useRef<boolean>(false);

    const svgWidth = window.innerWidth; // 90vw 的像素值
    const viewBoxValue = `0 0 ${svgWidth} 300`;
    
    
    useEffect(() => {
        const svgElement = svgRef.current;
        const path = pathRef.current;
    
        // 锁定 svgWidth 为固定值
        const svgWidth = window.innerWidth; // 90vw 的像素值
        const viewBoxValue = `0 0 ${svgWidth} 150`;
    
        // 设置 viewBox 以确保一致性
        if (svgElement) {
            svgElement.setAttribute('viewBox', viewBoxValue);
        }
    
        const updateDimensions = () => {
            const y = mousePos.current.y*1 - 75*0.5 ;
    
            if (Math.abs(75 - y) > 75) {
                //connected.current = false;
                tweening.current = true;
                //if (svgElement) svgElement.style.cursor = 'default';
                snapBack(y);
            } else {
                if (path) path.setAttribute('d', `M5,75 Q${svgWidth / 2},${y} ${svgWidth},75`);
            }
        };
    
        const snapBack = (y: number) => {
            const tween = new Tween({ y})
                .to({ y: 75 }, 800)
                .easing(Easing.Elastic.Out)
                .onUpdate(({ y }) => {
                    if (path) path.setAttribute('d', `M5,75 Q${svgWidth / 2},${y} ${svgWidth},75`);
                })
                .onComplete(() => {
                    tweening.current = false;
                })
                .start();
        };
    
        const loop = (time: number) => {
            if (connected.current) updateDimensions();
            tweenUpdate(time);
            requestAnimationFrame(loop);
        };
    
        const mouseMoveHandler = (e: MouseEvent) => {
            if (svgElement) {
                const rect = svgElement.getBoundingClientRect();
                mousePos.current.y = e.clientY - rect.top;
            }
        };
    
        const mouseOverHandler = () => {
            if (!connected.current && !tweening.current) {
                connected.current = true;
                if (svgElement) svgElement.style.cursor = 'pointer';
            }
        };

        const mouseLeaveHandler = () => {
            if (connected.current) {
                connected.current = false;
                if (svgElement) svgElement.style.cursor = 'default';
            }
        };
    
        window.addEventListener('mousemove', mouseMoveHandler);
        svgElement?.addEventListener('mouseover', mouseOverHandler);
        svgElement?.addEventListener('mouseleave', mouseLeaveHandler);
    
        loop(0);
    
        return () => {
            window.removeEventListener('mousemove', mouseMoveHandler);
            if (svgElement) {
                svgElement.removeEventListener('mouseover', mouseOverHandler);
                svgElement.removeEventListener('mouseleave', mouseLeaveHandler);
            }
        };
    }, []);
    
    

   

    return (
        <Link href={link} className={styles.activityLink}>
            <div className={styles.activity}>
                <div className={styles.lineWrapper}>
                <svg ref={svgRef} className={styles.svg} viewBox={viewBoxValue}>
                    <path ref={pathRef} id="curve" d={`M5,75 Q${svgWidth / 2},75 ${svgWidth},75`} fill="none" stroke="#000" strokeWidth="2" />
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
        </Link>
    );
};

export default Activity;
