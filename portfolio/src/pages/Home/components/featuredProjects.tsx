import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import styles from "./featuredProjects.module.scss"
import { Iproject, getPojects } from "./../../../api/portforlioAPI";

export interface IfeaturedProjectsProps {
}


export default function FeacturedProjects(props: IfeaturedProjectsProps) {
    const [featuredProjects, setFeaturedPojects] = useState<Iproject[] | null>(null);

    useEffect(() => {
        getPojects()
            .then(projects => {
                const firstNFeaturedProjects = (n: number) => (projects || [])
                    .filter(({ featured }) => featured).slice(0, n);
                setFeaturedPojects(firstNFeaturedProjects(3));
            })
            .catch(err => console.error(`Error loading projects: ${err}`))
    }, [])
    
    return (
        <div className={styles.wrapper}>
            {featuredProjects && featuredProjects.map(({ title, description, image, tags }, idx) => {
                const dangerousHTML = {
                    __html: description
                }

                return (
                    <div className={styles.project} key={idx}>
                        <div className={styles.imageWrapper}>
                            <img src={image} alt={title} className={styles.projectImg} />
                        </div>
                        <div className={styles.projectAbout}>
                            <h3 className={styles.projectFeatured}>
                                Featured project
                            </h3>
                            <h2 className={styles.projectTitle}>
                                {title}
                            </h2>
                            <div className={styles.descriptionWrapper}>
                                <div className={styles.projectDescription}>
                                    <p className={styles.inner} dangerouslySetInnerHTML={dangerousHTML} />
                                </div>
                            </div>

                            <div className={styles.tags}>
                                <ul>
                                    {tags.map((tag, idx) => (
                                        <li key={idx}>{tag}</li>
                                    ))}
                                </ul>
                            </div>  
                        </div>
                    </div>
                )
            })}
            <div>
                <span>Check out more of my </span>
                <Button styleType="tertiary" as="link" to="/projects" noPadding>projects</Button>
            </div>
        </div>
    );
}