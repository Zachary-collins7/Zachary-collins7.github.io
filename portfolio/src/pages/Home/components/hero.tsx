
import * as React from 'react';
import './hero.scss';

export interface IHeroProps {
}

export default function Hero (props: IHeroProps) {
  return (
      <div className="hero" id="mainHero">
          <img src="/images/hero1.min.webp" alt="Hero background" />

          <div className="background"></div>

          <div className="greeting">
              Hi,<br></br>
              I'm Zach
          </div>

          <div className="description">
              <div>Developer</div>
              <div>Maker</div>
              <div>3D Modeler</div>
          </div>
      </div>
  );
}
