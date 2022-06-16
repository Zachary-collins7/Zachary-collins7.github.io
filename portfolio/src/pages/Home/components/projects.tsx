import * as React from 'react';
import { useState } from 'react';
import './projects.scss';


export interface IProjectsProps {
    projects?: {
        title: string,
        about: string,
        image: string
    }[]
}

export default function Projects({ projects }: IProjectsProps) {

    return (
        <div className="articles">
            {projects && projects.map(({ title, about, image }, idx) => {
                return (
                    <article key={idx}>
                        <div className="about">
                            <h2>{title}</h2>
                            <p>{about}</p>
                        </div>

                        <div className="img-wrapper">
                            <img src={image} alt={"Image for " + title} />
                        </div>
                    </article>
                )
            })}
        </div>
    );
}
