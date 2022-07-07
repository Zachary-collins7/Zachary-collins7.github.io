import React from "react";
import styles from "./projectcard.module.scss";
import { Iproject } from "@api/portfolioApi";
import Button from "./Button";

export interface IProjectCardProps {
    project: Iproject;
}

export default function ProjectCard({ project }: IProjectCardProps) {
    const {
        title,
        description,
        image,
        hoverImage,
        url,
        githubUrl,
        date,
        featured,
        tags
    } = project;
    return (
        <>
            <div className={styles.cardWrapper}>
                <div className={styles.image}>
                    <img src={image} alt="" />
                </div>

                <div className={styles.about}>
                    <div className={styles.header}>
                        {featured && <div className={styles.featured}>Featured Project</div>}
                        {date && <div className={styles.date}>{date.toLocaleDateString()}</div>}
                    </div>

                    <h2>{title}</h2>

                    <div className={styles.content}>
                        <p dangerouslySetInnerHTML={{ __html: description }} />

                        <ul className={styles.tags}>
                            {tags.map((tag, idx) => (
                                <li key={idx} className={styles.tag}>
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    </div>


                    <div className={styles.links}>
                        {url ? (
                            <Button as='link' href={url} styleType="ghost">Check it out</Button>
                        ) : (
                            <Button as='button' styleType="ghost" disabled>Not hosted</Button>
                        )}

                        {githubUrl ? (
                            <Button as='link' href={githubUrl} styleType="tertiary">The code</Button>
                        ) : (
                            <Button as='button' styleType="tertiary" disabled>No github</Button>
                        )}
                    </div>

                </div>
            </div>
        </>
    )
}