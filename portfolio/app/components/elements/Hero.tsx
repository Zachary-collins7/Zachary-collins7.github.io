import React from "react";
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import styles from "./hero.module.scss";
import Button from "./Button";

export interface IHeroProps {

}

const Hero = () => {
    return (
        <>
            <div className={styles.hero} id="mainHero">
                <img src="/images/hero1.min.webp" alt="Hero background" />

                <div className={styles.heroContent}>
                    <div className={styles.about}>
                        <h6>Hello, I'm Zach</h6>
                        <h1>I'm a web developer</h1>
                        <p>
                            I'm a full-stack developer with a passion for creating beautiful and functional websites.
                            I'm currently working on a new project called <a href="https://zachary-m.github.io/portfolio/">Portfolio</a>.
                        </p>
                    </div>
                    <div className={styles.headshot}>
                        Lorem ipsum in deserunt dolor occaecat cupidatat dolore sit ad duis consequat dolore commodo do est dolore dolore nulla esse incididunt sunt dolor consectetur ut ad exercitation eu sit exercitation ad eiusmod ea laboris culpa adipisicing sed laboris ex veniam culpa sit minim nulla occaecat id culpa nostrud ut in 
                    </div>
                </div>
            </div>
        </>
    );
}

export default Hero;