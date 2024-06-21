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
    
    useEffect(() => {
        const svgElement = svgRef.current;
        const path = pathRef.current;

        const updateCurve = () => {
            const y = mousePos.current.y - (150 - mousePos.current.y) * 1.1;
            if (Math.abs(150 - y) > 100) {
                connected.current = false;
                tweening.current = true;
                if (svgElement) svgElement.style.cursor = 'default';
                snapBack(y);
            } else {
                if (path) path.setAttribute('d', `M10,150 Q${svgElement!.clientWidth / 2},${y} ${svgElement!.clientWidth - 10},150`);
            }
        };

        const snapBack = (y: number) => {
            const tween = new Tween({ y })
                .to({ y: 150 }, 800)
                .easing(Easing.Elastic.Out)
                .onUpdate(({ y }) => {
                    if (path) path.setAttribute('d', `M10,150 Q${svgElement!.clientWidth / 2},${y} ${svgElement!.clientWidth - 10},150`);
                })
                .onComplete(() => {
                    tweening.current = false;
                })
                .start();
        };

        const loop = (time: number) => {
            if (connected.current) updateCurve();
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

        window.addEventListener('mousemove', mouseMoveHandler);
        path?.addEventListener('mouseover', mouseOverHandler);

        loop(0);

        return () => {
            window.removeEventListener('mousemove', mouseMoveHandler);
            if (path) {
                path.removeEventListener('mouseover', mouseOverHandler);
            }
        };
    }, []);

    return (
        <Link href={link} className={styles.activityLink}>
            <div className={styles.activity}>
                <div className={styles.lineWrapper}>
                    <svg ref={svgRef} id="svg" viewBox="0 0 1400 300">
                        <path ref={pathRef} id="curve" d={`M10,150 Q700,150 1390,150`} fill="none" stroke="#000" strokeWidth="2" />
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
