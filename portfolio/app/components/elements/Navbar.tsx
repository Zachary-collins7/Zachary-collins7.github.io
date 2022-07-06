import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styles from './navbar.module.scss';

export interface INavBarProps {
  animate?: boolean,
  children?: React.ReactNode
}

export default function NavBar({ animate = false, children }: INavBarProps) {
  const [offset, setOffset] = useState(0);
  const [lightMode, setLightMode] = useState(false);
  const [showNav, setShowNav] = useState(10000);
  const navHeight = 16 * 3;

  useEffect(() => {
    setShowNav(window.innerHeight - navHeight);
    const onScroll = () => setOffset(window.pageYOffset);

    // clean up code
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.querySelector("html")?.setAttribute(
      "data-theme", lightMode ? "light" : "dark")
  }, [lightMode])


  return (
    <header>
      <input type="checkbox" id="nav-toggle" className={styles.navToggle} />
      <label id="nav-label" htmlFor="nav-toggle" className={
        (!animate ? styles.fixed :
          offset >= showNav ? styles.fixed + " " + styles.animate 
            : offset >= showNav / 2 ? styles.fixed + " " + styles.hide + " " + styles.animate
              : offset >= navHeight ? styles.fixed + " " + styles.hide : "") + " " + styles.navLabel
      }>

        <nav className={styles.nav}>
          <div className={styles.navLogo} onClick={() => { setLightMode((cur) => !cur) }}></div>
          <ul className={styles.navItems}>
            {Array.isArray(children) ? children.map((child, index) => (
              <li key={index} className={styles.navItem}>
                {child}
              </li>
            )) : children}
          </ul>
        </nav>
      </label>
    </header>
  );
}
