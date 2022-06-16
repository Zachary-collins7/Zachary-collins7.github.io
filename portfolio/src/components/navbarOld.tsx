import * as React from 'react';
import "./navbarOld.scss";

export interface INavBarOldProps {
}

export default function NavBarOld(props: INavBarOldProps) {
  return (
    <header>
      <nav className="nav">
        <input type="checkbox" id="nav-toggle" />
        <label id="nav-label" htmlFor="nav-toggle"></label>

        <div className="nav-logo"></div>
        <ul className="nav-items">
          <li className="nav-item"><a href="">Home</a></li>
          <li className="nav-item"><a href="">About</a></li>
          <li className="nav-item"><a href="">Projects</a></li>
          <li className="nav-item"><a href="">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}
