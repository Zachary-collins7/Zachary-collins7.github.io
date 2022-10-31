import React, { useId } from "react";
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import styles from "./resume.module.scss";
import { NextSeo } from "next-seo";

interface staticProps {
    updatedAt: string;
}

export const getStaticProps: GetStaticProps<staticProps> = async (context) => {
    const updatedAt: string = new Date().toLocaleDateString();
    return {
        props: {
            updatedAt
        }, // will be passed to the page component as props
    }
}

const Resume = ({ updatedAt }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <>
            <NextSeo title="Resume" description="Web version of my Resume"/>
            <div className={styles.wrapper}>
                <div className={styles.footer}>
                    <a
                        href="https://github.com/Zachary-collins7/Zachary-collins7/blob/main/resume2022.pdf"
                        target="_blank"
                        rel="noopener noreferrer">
                        Download pdf version here
                    </a>
                    
                    <span>
                        Last updated: {updatedAt}
                    </span>
                </div>
                <header className={styles.header}>
                    <h1>Zachary Collins</h1>

                    <div className={styles.about}>
                        <p>
                            <i>Developer with 7 years of Programming experience.</i><br />

                            Portfolio: <a
                                href="http://zachary-collins7.github.io"
                                target="_blank"
                                rel="noopener noreferrer">
                                http://zachary-collins7.github.io
                            </a>
                            <span> | </span>
                            Github: <a
                                href="https://github.com/Zachary-collins7"
                                target="_blank"
                                rel="noopener noreferrer">
                                https://github.com/Zachary-collins7
                            </a>
                        </p>
                    </div>

                </header>

                <section className={styles.skills}>
                    <h2 className={styles.title}>Top Skills</h2>
                    <div className={styles.skillBlock}>
                        <div className={styles.skillsLeft}>
                            <ul>
                                <li><b>Programming Languages:</b> Python | Typescript/Javascript | Swift | PHP</li>
                                <li><b>Framework/Platforms:</b> ReactJS | NextJS | Laravel | SwiftUI | .NET</li>
                                <li><b>Databases:</b> MySQL | MongoDB |  MariaDB | Sqlite3</li>
                            </ul>
                        </div>
                        <div className={styles.skillSpacer}></div>
                        <div className={styles.skillsRight}>
                            <ul>
                                <li>
                                    <a href="mailto:zachary_collins@icloud.com">zachary_collins@icloud.com</a>
                                </li>
                                <li>
                                    <a href="tel:+1-918-574-4653">+1 (918) 574 4653</a>
                                </li>
                                <li>
                                    Durango CO, USA
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.title}>Personal Projects</h2>

                    <Project
                        title="Portfolio Website"
                        date="May 2022"
                        tools={["NextJS", "ReactJS", "Typescript", "SCSS", "NPM"]}>
                        <ul>
                            <li>
                                Deployed using NextJS static site generation to Github Pages (uses a work-tree deployment branch alongside the main branch)
                            </li>
                            <li>
                                Site features a fully decked-out SEO (including sitemap and robots.txt), color themes, Google Analytics, and a custom 404 page.
                            </li>
                            <li>
                                Uses SCSS modules (non-decorated) to prevent CSS class-name collisions.
                            </li>
                            <li>
                                Uses typescript for live type-checking and to give confidence in deployed code.
                            </li>
                        </ul>
                    </Project>
                </section>

                <section className={styles.experience}>
                    <h2 className={styles.title}>Professional Experience</h2>

                    <Project
                        title="Comcast – Python Developer III - Contract"
                        date="Aug 2022 – Oct 2022"
                        location="Durango, CO"
                        tools={["Python", "EC2", "Mysql", "MongoDB", "S3", "Oracle", 
                        "Postgresql", "DynamoDB", "Cassandra", "Memsql", "Teradata", "Redis"]}>
                        <ul>
                            <li>
                                Created a python project to create test connections to 10,000+ database nodes of various database types
                                (including: Mysql, Oracle, MongoDB, Postgresql) and report the results to a database. <br/>
                                - Collated the database nodes by host-name to prevent connecting to the same host multiple times. <br/>
                                - Utilized python libraries to multi-thread the connections to increase the speed of the test. <br/>
                                - Results were used to determine if a database was up and running, identify the user&apos;s query access across the schema,
                                and check if the internal password manager contained the correct credentials.
                            </li>
                            <li>
                                Converted the project to a pip installable package to promote reusability and ease of use across other projects.
                            </li>
                            <li>
                                Connection Data was delivered to a web application for users to view.
                                Users could flag columns to be profiled and the system would preform a set of queries to profile the specific flagged columns. 
                            </li>
                        </ul>
                    </Project>

                    <Project
                        title="Expert Ready – Developer"
                        date="Sept 2019 – Oct 2020"
                        location="Tulsa, OK"
                        tools={["Laravel", "PHP", "Docker", ".Net", "K6"]}>
                        <ul>
                            <li>
                                Designed and implemented an event processing system that eliminated monthly bugs and unified system management.
                                The system provided an 80% reduction in support tickets and a traceable log of events which aided development
                                and greatly improved the system&apos;s performance and reduced the number of support tickets.
                            </li>
                            <li>
                                Developed a data generation tool to migrate data tables to streamline the customer&apos;s workflow.
                                Streamlining reduced on-field table conversation and minimized user error.
                            </li>
                            <li>
                                Migrated customers to new deployment environments.
                                Learned and applied the end-to-end process of developing and deploying a web application
                                from environment initialization to DNS configuration.
                            </li>
                        </ul>
                    </Project>

                    <Project
                        title="ITRS Group – Intern"
                        date="May 2019 – Sept 2019"
                        location="Tulsa, OK"
                        tools={["Python", "Bash", "Nagios API", "Web API"]}>

                        <ul>
                            <li>
                                Head of Global Strategy mentored me about product competition and the Gartner Magic Quadrant.
                                Created &quot;battle cards&quot; comparing our product with competitors.
                            </li>
                            <li>
                                Designed and implemented a Nagios compatible plugin for OP5 Monitor. Utilized command-line options and comprehensive exception handling.
                            </li>
                            <li>
                                Created a scalable Docker stack implementing Nginx for load balancing containers running web servers.
                            </li>
                        </ul>
                    </Project>

                    <div className={styles.pgbr} />

                    <Project
                        title="Samp Innovations – Consultant"
                        date="May 2019 – July 2019"
                        location="Tulsa, OK"
                        tools={[".Net", "JS"]}>

                        <ul>
                            <li>
                                Worked on a .NET application to create a web form with client-side validation and inserted that data into an SQL database.
                            </li>
                        </ul>
                    </Project>

                    <Project
                        title="Oklahoma Aquarium – Consultant"
                        date="Feb 2019 – Jun 2019"
                        location="Jenks, OK"
                        tools={["Swift", "Objective C"]}>

                        <ul>
                            <li>
                                Designed and developed a mobile app for people touring the aquarium. Presented information about each fish through quizzes and prompts.
                            </li>
                        </ul>
                    </Project>

                </section>

                <section className={styles.experience}>
                    <h2 className={styles.title}>Robotics Experience</h2>

                    <Project
                        title="Robotics Experience – Team Leader/Lead Programmer"
                        date="2017 – 2020"
                        tools={["Java", "Python", "CAD"]}>
                        <ul>
                            <li>Lead FTC team 11572 - a team of 10 to design and create a robot.</li>
                            <li>Competed at the world level against 70+ countries.</li>
                            <li>Independently learned and applied control systems to autonomously complete challenges.</li>
                        </ul>
                    </Project>

                    <Project
                        title="Invited to MIT"
                        date="2018"
                        tools={["Python", "TensorFlow", "ROS"]}>
                        <ul>
                            <li>Completed a prerequisite programming/Linux course and was invited based on merit.</li>
                            <li>
                                MIT Department leads and partnered technology corporations mentored us through various control systems
                                and technologies.
                            </li>
                            <li>
                                Project-based learning allowed us to implement many modern technologies including
                                Event, State, and SLAM architectures, PID controllers, IMU, Lidar, and Stereoscopic cameras.
                            </li>
                        </ul>
                    </Project>
                </section>
            </div>
        </>
    );
}

export default Resume;


const Project = ({ title, date, location, children, tools }: {
    title: string,
    date: string,
    location?: string,
    children: React.ReactNode,
    tools: string[]
}) => {
    const projectId = useId();

    return (
        <>
            <article className={styles.project}>
                <header className={styles.projectHeader}>
                    <h6>
                        {title}
                        {location && (
                            <><br />{location}</>
                        )}
                    </h6>
                    <span>{date}</span>
                </header>

                <div className={styles.projectBody}>
                    {children}

                    {tools && tools.length !== 0 && <ul className={styles.projectTools}>
                        {tools.map((tool, idx) => (
                            <li key={idx}>{tool}</li>
                        ))}
                    </ul>}
                </div>
            </article>
        </>
    );
}