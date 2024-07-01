"use client";

import { useEffect } from "react";
import styles from "./Object.module.css";

const toPx = (x: number): string => `${Math.round(x)}px`;

const gResize = () => pgal.resize();

class PGObj {
  n: number;
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
  oxt: HTMLSpanElement;
  oxs: CSSStyleDeclaration;
  txt: string;
  obj: HTMLImageElement & { parent?: PGObj };
  obs: CSSStyleDeclaration;
  F: boolean;
  CF: number;
  sto: number[];

  constructor(n: number) {
    this.n = n;
    this.x = pgal.nw * 0.5 + pgal.zoom * (Math.random() - 0.5) * pgal.nw;
    this.y = pgal.nh * 0.5 + pgal.zoom * (Math.random() - 0.5) * pgal.nh;
    this.z = Math.round(n * (3000 / pgal.N));
    this.w = 200;
    this.h = 0; // will be calculated after this.obj is set
    this.oxt = pgal.span[n];
    this.oxs = this.oxt.style;
    this.txt = this.oxt.innerHTML;
    this.oxt.innerHTML = "";
    this.obj = pgal.img[n];
    this.obj.parent = this;
    this.obj.onclick = () => {
      this.click();
    };
    this.obj.ondrag = () => false;
    this.obs = this.obj.style; // Initialize here after this.obj is set
    this.oxt.style.zIndex = this.obj.style.zIndex = Math.round(
      1000000 - this.z
    ).toString();
    this.F = false;
    this.CF = 100;
    this.sto = [];

    // Initialize height now that this.obj is set
    this.h = this.obj.naturalHeight / this.obj.naturalWidth * 200;
  }

  anim() {
    const f = 700 + this.z - pgal.z;
    if (f > 0) {
      const d = 1000 / f;
      const X = pgal.nw * 0.5 + ((this.x - pgal.x - pgal.cx) * d);
      const Y = pgal.nh * 0.5 + ((this.y - pgal.y - pgal.cy) * d);
      const W = d * this.w * pgal.zoom;
      const H = d * this.h * pgal.zoom;
      this.obs.left = toPx(X - W * 0.5);
      this.obs.top = toPx(Y - H * 0.5);
      this.obs.width = toPx(W);
      this.obs.height = toPx(H);
      this.oxs.visibility =
        this.CF-- > 0 && Math.random() > 0.9 ? "hidden" : "visible";
      this.oxs.left = toPx(X - W * 0.5);
      this.oxs.top = toPx(Y + H * 0.5);
      if (pgal.zt - pgal.z < 20) {
        if (!this.F) {
          this.F = true;
          this.CF = Math.random() * 200;
          this.oxs.fontSize = toPx(1 + d * 20 * pgal.zoom);
          let T = "";
          const tn = this.txt.length;
          for (let i = 0; i < tn; i++) {
            T = T.concat(this.txt.charAt(i));
            this.sto[i] = window.setTimeout(() => {
              this.oxt.innerHTML = T;
            }, Math.round(f / 4) + 10 * i);
          }
        }
      } else {
        this.F = false;
        this.oxt.innerHTML = "";
      }
    } else {
      this.x = pgal.nw * 0.5 + pgal.zoom * (Math.random() - 0.5) * pgal.nw;
      this.y = pgal.nh * 0.5 + pgal.zoom * (Math.random() - 0.5) * pgal.nh;
      this.z += 3000;
      this.oxs.zIndex = this.obs.zIndex = Math.round(100000 - this.z).toString();
    }
  }

  cto() {
    let i = this.txt.length;
    while (i--) clearTimeout(this.sto[i]);
  }

  click() {
    let i = pgal.N;
    while (i--) pgal.O[i].cto();
    if (pgal.S !== this) {
      pgal.xt = this.x;
      pgal.yt = this.y;
      pgal.zt = this.z;
      pgal.S = this;
    } else {
      pgal.S = null;
      pgal.zt += 1000;
    }
  }
}

const pgal = {
  O: [] as PGObj[], // 存储所有图片对象的数组
  N: 0, // 图片的数量
  S: null as PGObj | null, // 当前选中的图片对象
  img: [] as (HTMLImageElement & { parent?: PGObj })[], // 所有图片元素的集合
  span: [] as HTMLSpanElement[], // 所有 span 元素的集合
  xm: 0, // 当前鼠标的 x 坐标
  ym: 0, // 当前鼠标的 y 坐标
  nx: 0, // 画廊元素的左边距
  ny: 0, // 画廊元素的上边距
  nw: 0, // 画廊元素的宽度
  nh: 0, // 画廊元素的高度
  cx: 0, // 画廊中心的 x 坐标
  cy: 0, // 画廊中心的 y 坐标
  zoom: 1, // 缩放比例
  x: 0, // 目标 x 坐标
  y: 0, // 目标 y 坐标
  z: -30000, // 目标 z 坐标，初始值为 -30000
  xt: 0, // 临时存储的目标 x 坐标
  yt: 0, // 临时存储的目标 y 坐标
  zt: 0, // 临时存储的目标 z 坐标
  rotationY: 0, // 画廊的 Y 轴旋转角度

  init: function () {
    this.cx = this.nw / 2;
    this.cy = this.nh / 2;
    this.img = Array.from(
      document.getElementById("gall")!.getElementsByTagName("img")
    ) as (HTMLImageElement & { parent?: PGObj })[];
    this.span = Array.from(
      document.getElementById("gall")!.getElementsByTagName("span")
    );
    this.N = this.img.length;
    for (let i = 0; i < this.N; i++) this.O[i] = new PGObj(i);
    this.run();
    this.O[0].click();
  },

  resize: function () {
    const o = document.getElementById("gall")!;
    this.nx = o.offsetLeft;
    this.ny = o.offsetTop;
    this.nw = o.offsetWidth;
    this.nh = o.offsetHeight;
    this.zoom = this.nh / 900;
  },

  run: function () {
    pgal.cx += (pgal.xm - pgal.cx) * 0.1;
    pgal.cy += (pgal.ym - pgal.cy) * 0.1;
    pgal.x += (pgal.xt - pgal.x) * 0.05;
    pgal.y += (pgal.yt - pgal.y) * 0.05;
    pgal.z += (pgal.zt - pgal.z) * 0.1;
    let i = pgal.N;
    while (i--) pgal.O[i].anim();
    setTimeout(pgal.run, 16);
  },
};

const Objects: React.FC = () => {
  useEffect(() => {
    const handleResize = () => gResize();
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousemove", (e: MouseEvent) => {
      pgal.xm = e.clientX - pgal.nx - pgal.nw * 0.5;
      pgal.ym = e.clientY - pgal.ny - pgal.nh * 0.5;
    });
    window.onload = () => {
      gResize();
      pgal.init();
    };

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.example} id="gall">
        {Array.from({ length: 20 }, (_, i) => (
          <img
            style={{ position: "absolute", overflow: "hidden" }}
            key={i}
            src={`/image/20object/pic${i + 1}.jpg`}
          />
        ))}
      </div>
    </div>
  );
};

export default Objects;
