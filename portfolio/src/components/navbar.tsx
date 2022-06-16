import React, { useEffect, useState } from 'react';
import "./navbar.scss";

export interface INavBarProps {
  animate?: boolean
}

export default function NavBar({ animate = false }: INavBarProps) {
  const [offset, setOffset] = useState(0);
  const [lightMode, setLightMode] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);

    // clean up code
    window.removeEventListener('scroll', onScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.querySelector("html")?.setAttribute(
      "data-theme", lightMode ? "light" : "dark")
    console.log(document.querySelector("html"));
    
  }, [lightMode])

  const navHeight = 16 * 3;
  const showNav = window.innerHeight - navHeight;

  return (
    <header>
      <input type="checkbox" id="nav-toggle" />
      <label id="nav-label" htmlFor="nav-toggle" className={ 
        !animate ? "fixed" :
          offset >= showNav ? "fixed animate"
            : offset >= showNav / 2 ? "fixed hide animate"
              : offset >= navHeight ? "fixed hide" : ""
       }>
        
        <nav className="nav">
          <div className="nav-logo" onClick={() => { setLightMode((cur) => !cur) }}></div>
          <ul className="nav-items">
            <li className="nav-item"><a href="/">Home</a></li>
            <li className="nav-item"><a href="/about">About</a></li>
            <li className="nav-item"><a href="/projects">Projects</a></li>
            <li className="nav-item"><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </label>
    </header>
  );
}
