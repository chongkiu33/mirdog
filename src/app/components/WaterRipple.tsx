"use client";

import { useEffect, useRef } from 'react';
import * as PIXI from 'js/pixi.min.js';
import styles from './WaterRipple.module.css';

const WaterRipple = () => {
  const rippleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 动态加载Pixi.js脚本
    const script = document.createElement('script');
    script.src = '/js/pixi.min.js';
    script.onload = () => {
      // 确保Pixi.js脚本加载完成后进行初始化
      const PIXI = (window as any).PIXI;

      const app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0xFFFFFF, // 将背景颜色改为白色
      });

      if (rippleRef.current) {
        rippleRef.current.appendChild(app.view);
      }

      const resize = () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        background.width = window.innerWidth;
        background.height = window.innerHeight;
      };

      window.addEventListener('resize', resize);

      let background: PIXI.Sprite;

      app.loader.add('background', '/bg2.jpg').load((loader: any, resources: any) => {
        background = new PIXI.Sprite(resources.background.texture);
        background.width = app.screen.width;
        background.height = app.screen.height;
        app.stage.addChild(background);

        const displacementSprite = PIXI.Sprite.from('/filter_NRM.jpg');
        const displacementFilter = new PIXI.filters.DisplacementFilter(displacementSprite);

        displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
        app.stage.addChild(displacementSprite);

        displacementSprite.scale.x = 1;
        displacementSprite.scale.y = 1;

        background.filters = [displacementFilter];

        app.ticker.add(() => {
          displacementSprite.x += 1;
          if (displacementSprite.x > displacementSprite.width) displacementSprite.x = 0;
          displacementSprite.y += 1;
          if (displacementSprite.y > displacementSprite.height) displacementSprite.y = 0;
        });

        window.addEventListener('mousemove', (event) => {
          displacementSprite.x = event.clientX - displacementSprite.width / 2;
          displacementSprite.y = event.clientY - displacementSprite.height / 2;
        });
      });

      // 清理函数
      return () => {
        window.removeEventListener('resize', resize);
        app.destroy(true, { children: true, texture: true, baseTexture: true });
        if (rippleRef.current) {
          rippleRef.current.removeChild(app.view);
        }
      };
    };
    document.body.appendChild(script);

    // 清理函数
    return () => {
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <div ref={rippleRef} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1 }} />
      <img style={{ overflow: 'hidden', position: 'fixed', top: '20%', left: '0%', width: '100%', zIndex: -1 }} src='/mir.png' />
    </>
  );
};

export default WaterRipple;
