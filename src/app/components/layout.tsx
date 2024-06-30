"use client"; // 客户端渲染

import { useState, useEffect } from 'react';  // React 的 Hooks，用于状态管理和副作用处理
import { useRouter, usePathname } from 'next/navigation'; // 使用 next/navigation 获取路由和路径名
import Link from "next/link"; // Link 是 Next.js 的链接组件，用于导航
import { ReactNode } from "react";
import "../globals.css"; // 导入全局CSS样式
import Image from 'next/image';
import Loading from './Loading'; // 导入Loading组件

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [loading, setLoading] = useState(false); // 表示当前是否处于加载状态
  const router = useRouter(); // 获取路由对象
  const pathname = usePathname(); // 获取当前路径名

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);

    // 监听路径变化
    handleRouteChangeStart(); // 初次加载时设置 loading 状态
    handleRouteChangeComplete(); // 路由变化完成时重置 loading 状态

    // 模拟加载过程
    setTimeout(() => {
      handleRouteChangeComplete();
    }, 500); // 假设加载过程持续 500ms

  }, [pathname]); // 依赖路径名变化

  useEffect(() => {
    if (pathname !== '/') { // 确保滚动隐藏效果在所有非主页的页面应用
      const handleScroll = () => {
        const logo = document.querySelector('.nav-image');
        const links = document.querySelectorAll('.nav-link');
        const scrollTop = window.scrollY;

        if (scrollTop > 50) { // Adjust the scroll value as needed
          if (logo) {
            logo.classList.add('shrunk');
          }
          if (links) {
            links.forEach((link, index) => {
              setTimeout(() => {
                link.classList.add('hidden');
              }, index * 100);
            });
          }
        } else {
          if (logo) {
            logo.classList.remove('shrunk');
          }
          if (links) {
            links.forEach((link, index) => {
              setTimeout(() => {
                link.classList.remove('hidden');
              }, index * 100);
            });
          }
        }
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [pathname]);

  return (
    <>
      {loading ? (
        <Loading onLoadingComplete={() => setLoading(false)} />
      ) : (
        <div>
          <nav className="navbar">
            <ul className="nav-list">
              <li className="nav-item logo-item">
                <Link href="/">
                  <Image src="/logo.svg" alt="Home" width={50} height={50} className="nav-image" />
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/archiv" className={`nav-link ${pathname === '/archiv' ? 'active' : pathname === '/' ? 'home-page' : ''}`}>Archiv</Link>
              </li>
              <li className="nav-item">
                <Link href="/object" className={`nav-link ${pathname === '/object' ? 'active' : pathname === '/' ? 'home-page' : ''}`}>Object</Link>
              </li>
              <li className="nav-item">
                <Link href="/info" className={`nav-link ${pathname === '/info' ? 'active' : pathname === '/' ? 'home-page' : ''}`}>Info</Link>
              </li>
              <li className="nav-item">
                <Link href="/shop" className={`nav-link ${pathname === '/shop' ? 'active' : pathname === '/' ? 'home-page' : ''}`}>Shop</Link>
              </li>
            </ul>
          </nav>
          <main>{children}</main>
        </div>
      )}
    </>
  );
}
