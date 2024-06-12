// src/app/components/Layout.tsx
"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { ReactNode } from "react";
import "../globals.css"; // 导入全局CSS样式
import Image from 'next/image';
import Loading from './Loading'; // 导入Loading组件

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true);
    const handleRouteChangeComplete = () => setLoading(false);

    handleRouteChangeStart();
    handleRouteChangeComplete();
  }, [pathname]);

  useEffect(() => {
    if (pathname === '/archiv') {
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
                <Link href="/archiv" className="nav-link">Archiv</Link>
              </li>
              <li className="nav-item">
                <Link href="/object" className="nav-link">Object</Link>
              </li>
              <li className="nav-item">
                <Link href="/info" className="nav-link">Info</Link>
              </li>
              <li className="nav-item">
                <Link href="/shop" className="nav-link">Shop</Link>
              </li>
            </ul>
          </nav>
          <main>{children}</main>
        </div>
      )}
    </>
  );
}
