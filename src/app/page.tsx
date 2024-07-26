"use client"; // 客户端渲染
import Image from "next/image";
import WaterRipple from './components/WaterRipple';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const logo = document.querySelector('.nav-image') as HTMLElement;
      if (logo) {
        const { clientX } = event;
        const { innerWidth } = window;
        const rotation = (clientX / innerWidth) * 1080; // 计算旋转角度
        logo.style.transform = `rotate(${rotation}deg)`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <main style={{  overflow: 'hidden'}}>
      <WaterRipple />
      
    </main>
  );
}
