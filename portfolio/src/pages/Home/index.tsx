import MainTemplate from '../../templates/mainTemplate';
import About from './components/about';
import Hero from './components/hero';
import Projects from './components/projects';
import Section from './components/section';
import './index.scss';


export interface IHomeIndexProps {
}

const projectData = [
    {
        title: "Portforlio",
        about: "about",
        image: "/images/hero1.webp"
    },
    {
        title: "Portforlio",
        about: "about",
        image: "/images/hero1.webp"
    }
]
// const sectionData = [
//     {
//         title: "About Me",
//         desc: "Self-taught",
//         desc2: "I enjoy solving challenging problems",
//         imageUrl: "https://source.unsplash.com/501x500/?code,computer,data,coding",
//         id: "about",
//         child: <>Below</>
//     }
// ]

export default function HomeIndex(props: IHomeIndexProps) {

    return (
        <MainTemplate>
            <Hero />

            <Section
                title={"About Me"}
                desc={"Self-taught"}
                desc2={"I enjoy solving challenging problems"}
                imageUrl={"https://source.unsplash.com/501x500/?code,computer,data,coding"}
                id="about"
            >
                below hero
            </Section>

            <Section
                title={"Projects"}
                desc={"Made by Me"}
                desc2={"Check them out"}
                imageUrl={"https://source.unsplash.com/502x500/?code,computer,data,coding"}
                id="projects"
            >
                <Projects projects={projectData}/>
            </Section>

            <Section
                title={"Contact"}
                desc={"Let's get in touch"}
                desc2={"Email me"}
                imageUrl={"https://source.unsplash.com/503x500/?code,computer,data,coding"}
                id="contact"
            >
                below hero
            </Section>
        </MainTemplate>
    );
}
