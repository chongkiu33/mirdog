
"use client";
import { useEffect, useRef } from 'react';


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
        backgroundColor: 0x1099bb,
      });

      if (rippleRef.current) {
        rippleRef.current.appendChild(app.view);
      }

      app.loader.add('background', '/bg2.jpg').load((loader: any, resources: any) => {
        const background = new PIXI.Sprite(resources.background.texture);
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
    };
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return <div ref={rippleRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
};

export default WaterRipple;
