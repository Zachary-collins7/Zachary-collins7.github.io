import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";

import {
  Outlet
} from 'react-router-dom';
import './App.scss';
import NavBar from './components/navbar';

const navLinks = [
  { title: "Home", url: "/" },
  { title: "Projects", url: "/projects" },
  { title: "About", url: "/about" },
  { title: "Contact", url: "/contact" }
]

function App() {
  // scroll to top on url change
  const { pathname } = useLocation(); 
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  
  return (
    <div style={{ userSelect: "none" }}>
      <NavBar animate links={navLinks} />
      <Outlet />
      <div style={{ textAlign: "center" }}>temp footer</div>
    </div>
  );
}

export default App;