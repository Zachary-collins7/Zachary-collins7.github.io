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
                {/* <img src="/images/hero1.min.webp" alt="Hero background" /> */}

                <div className={styles.heroContent}>
                    <div className={styles.about}>
                        <h6>Hi, I'm Zach</h6>
                        <h1>Web Developer</h1>
                        <p>
                            Web/iOS developer with Agile Software Development skills and a passion for creating beautiful and functional apps.
                        </p>
                        <p>I'm currently working on <Button as='link' href="/" styleType="tertiary" noPadding>My Portfolio</Button> (this site)</p>

                        <div style={{ 
                            fontSize: '1rem',
                            display: 'flex',
                            gap: '1rem',
                         }}>
                            <Button as='link' href="/contact" styleType="primary">Hire me</Button>
                            <Button as='link' href="/projects" styleType="secondary">My projects</Button>
                        </div>
                    </div>
                    <div className={styles.image}>
                        <div className={styles.inner}></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Hero;