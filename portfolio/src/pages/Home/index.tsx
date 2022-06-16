import * as React from 'react';
import MainTemplate from '../../templates/mainTemplate';
import Hero from './components/hero';
import About from './components/about';
import Projects from './components/projects';

import './index.scss';
import ContactForm from './components/contact';

export interface IHomeIndexProps {
}

const projectsData = [
    {
        title: "Project1",
        about: "About desc",
        image: "https://source.unsplash.com/501x500/?code,computer,data,coding"
    },
    {
        title: "Project2",
        about: "About desc",
        image: "https://source.unsplash.com/502x500/?code,computer,data,coding"
    },
    {
        title: "Project3",
        about: "About desc",
        image: "https://source.unsplash.com/503x500/?code,computer,data,coding"
    }
]

export default function HomeIndex(props: IHomeIndexProps) {
    return (
        <MainTemplate>
            <Hero />

            <section>
                <div className="title">About</div>

                <div className="content">
                    <About />
                </div>
            </section>
            
            <section>
                <div className="title">Projects I Love</div>

                <div className="content">
                    <Projects projects={projectsData} />
                </div>
            </section>
            
            <section>
                <div className="title" id='contact'>Contact Me</div>

                <div className="content">
                    <ContactForm />
                </div>
            </section>
            
        </MainTemplate>
    );
}
