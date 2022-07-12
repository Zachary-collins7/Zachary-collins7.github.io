import { getProjects, Iproject } from "@api/portfolioApi";
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
