import { getProjects, Iproject } from "@api/portfolioApi";
import { log } from "console";
import { GetStaticProps } from 'next'
import React, { useEffect, useState } from "react";
import styles from "./featuredprojects.module.scss";
import ProjectCard from "./ProjectCard";

export interface IFeaturedProjectsProps {
}

export default function FeaturedProjects(props: IFeaturedProjectsProps) {
    const [featuredProjects, setFeaturedProjects] = useState<Iproject[]>([]);

    useEffect(() => {
        getProjects()
            .then(projects => {
                setFeaturedProjects(projects.filter(project => project.featured));
            })
    }, [])

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.projects}>
                    <div style={{
                        fontSize: "7vmin",
                        textAlign: "center"
                    }}>Featured Projects</div>
                    {featuredProjects && featuredProjects.map((project, idx) => (
                        <div key={idx}>
                            <ProjectCard project={project} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
