"use client"; // 客户端渲染

import { useState, useEffect } from 'react';  // React 的 Hooks，用于状态管理和副作用处理
import { useRouter, usePathname } from 'next/navigation'; // 使用 next/navigation 获取路由和路径名
import Link from "next/link"; 
import { ReactNode } from "react";
import "../globals.css"; 
import Image from 'next/image';
import Loading from './Loading'; 

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => {
      // 延迟执行 setLoading(false)，以确保 Loading 组件处理完播放事件
      setTimeout(() => setLoading(false), 500);
    };

    router.events?.on('routeChangeStart', handleRouteChangeStart);
    router.events?.on('routeChangeComplete', handleRouteChangeComplete);
    router.events?.on('routeChangeError', handleRouteChangeComplete);

    return () => {
      router.events?.off('routeChangeStart', handleRouteChangeStart);
      router.events?.off('routeChangeComplete', handleRouteChangeComplete);
      router.events?.off('routeChangeError', handleRouteChangeComplete);
    };
  }, [pathname]);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

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
