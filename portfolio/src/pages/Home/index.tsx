import { useEffect } from 'react';
import FeaturedProjects from './components/featuredProjects';
import Hero from './components/hero';
import Section from './components/section';
import AboutSkills from './components/aboutSkills';
import styles from './index.module.scss';

export interface IHomeIndexProps {
}

const loudScrollTimer: () => NodeJS.Timer = () => {
    return setInterval(() => {
        if (window.scrollY === 0 || window.scrollY / window.innerHeight < 0.25) {
            document.querySelector("#mainHero")?.classList.toggle("loud");
        }
    }, 7000);
}

export default function HomeIndex(props: IHomeIndexProps) {
    useEffect(() => {
        const timer = loudScrollTimer();
        return () => clearInterval(timer);
    }, [])

    return (
        <div className={styles.wrapper}>
            <Hero />

            <Section title="Projects I Love" id="projects">
                <FeaturedProjects />
            </Section>

            <Section title="About" id="about">
                <AboutSkills />
            </Section>
        </div>
    );
}
