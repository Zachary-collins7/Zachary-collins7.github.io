import React from "react";
import styles from "./resume.module.scss";
import { Metadata } from "next";
import Phone from "./phone";

// Set the title of the page to be the post title, note that we no longer use
// e.g. next/head in app dir, and this can be async just like the server
// component
export async function generateMetadata({
    params: { updatedAt },
}: {
    params: { updatedAt: string };
}): Promise<Metadata> {
    return {
        title: "Zachary's Resume",
        description: "Web version of my Resume",
        openGraph: {
            images: [
                {
                    url: `${process.env.SITE_URL}/assets/images/resume-seo-image.webp`,
                    width: 1200,
                    height: 630,
                    alt: "Resume SEO Image",
                    type: "image/webp",
                },
                {
                    url: `${process.env.SITE_URL}/assets/images/resume-seo-image.webp`,
                    width: 1200,
                    height: 630,
                    alt: "Resume SEO Image",
                    type: "image/png",
                },
                {
                    url: `${process.env.SITE_URL}/assets/images/resume-seo-image.webp`,
                    width: 1200,
                    height: 630,
                    alt: "Resume SEO Image",
                    type: "image/jpeg",
                },
            ],
        },
    } as Metadata;
}

export default async function Resume() {
    const updatedAt: string = new Date().toLocaleDateString();

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.footer}>
                    <a
                        href="https://github.com/Zachary-collins7/Zachary-collins7/blob/main/Resume2023.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Download pdf
                    </a>

                    <span>Last updated: {updatedAt}</span>
                </div>
                <header className={styles.header}>
                    <h1>Zachary Collins</h1>

                    <div className={styles.about}>
                        <p>
                            <i>
                                Developer with 7 years of Programming experience
                                and a passion for creating
                            </i>
                            <br />
                            Portfolio:{" "}
                            <a
                                href={process.env.SITE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                thezacharycollins.com
                            </a>
                            <span> | </span>
                            Github:{" "}
                            <a
                                href="https://github.com/Zachary-collins7"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                github.com/Zachary-collins7
                            </a>
                        </p>
                    </div>
                </header>

                <section className={styles.skills}>
                    <h2 className={styles.title}>Top Skills</h2>
                    <div className={styles.skillBlock}>
                        <div className={styles.skillsLeft}>
                            <ul>
                                <li>
                                    <b>Programming Languages:</b> Python |
                                    Typescript | Swift | PHP
                                </li>
                                <li>
                                    <b>Framework/Platforms:</b> NextJS | ReactJS
                                    | SwiftUI | Laravel | .NET
                                </li>
                                <li>
                                    <b>Databases:</b> MySQL | MsSql | MongoDB |
                                    MariaDB | Sqlite3
                                </li>
                            </ul>
                        </div>
                        <div className={styles.skillSpacer}></div>
                        <div className={styles.skillsRight}>
                            <ul>
                                <li>
                                    <a href="mailto:zachary_collins@icloud.com">
                                        zachary_collins@icloud.com
                                    </a>
                                </li>
                                <li>
                                    <Phone />
                                </li>
                                <li>Durango CO, USA. 81301</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className={styles.experience}>
                    <h2 className={styles.title}>Professional Experience</h2>

                    <Project
                        title="Python Developer III - Comcast"
                        date="Aug 2022 - Aug 2023"
                        location="Durango, CO"
                        tools={[
                            "Python",
                            "Selenium",
                            "EC2",
                            "Postgresql",
                            "MongoDB",
                            "S3",
                        ]}
                    >
                        <ul>
                            <li>
                                Designed and developed a Python-based program to
                                connect to a diverse array of over 10,000
                                database servers while maintaining a high level
                                of security and performance.
                            </li>

                            <li>
                                Led team management and the design for a web
                                testing project that enabled comprehensive,
                                easy-to-write live tests for the team&apos;s
                                internal tools.
                            </li>

                            <li>
                                Actively engaged and collaborated with fellow
                                team members across teams to resolve various
                                operational challenges as they surfaced.
                            </li>
                        </ul>
                    </Project>

                    <Project
                        title="Developer - Expert Ready"
                        date="Sept 2019 - Oct 2020"
                        location="Tulsa, OK"
                        tools={["Laravel", "PHP", "Docker", ".Net", "K6"]}
                    >
                        <ul>
                            <li>
                                Designed and implemented an event processing
                                system that eliminated monthly bugs and unified
                                system management. The system provided an 80%
                                reduction in support tickets and a traceable log
                                of events which aided development and greatly
                                improved the system&apos;s performance and
                                reduced the number of support tickets.
                            </li>
                            {/* <li>
                                Developed a data generation tool to migrate data
                                tables to streamline the customer&apos;s
                                workflow. Streamlining reduced on-field table
                                conversation and minimized user error.
                            </li> */}
                            <li>
                                Migrated customers to new deployment
                                environments. Learned and applied the end-to-end
                                process of developing and deploying a web
                                application.
                            </li>
                        </ul>
                    </Project>

                    <Project
                        title="Intern - ITRS Group"
                        date="May 2019 - Sept 2019"
                        location="Tulsa, OK"
                        tools={["Python", "Bash", "Nagios API", "Web API"]}
                    >
                        <ul>
                            <li>
                                Head of Global Strategy mentored me about
                                product competition and the Gartner Magic
                                Quadrant. Created &quot;battle cards&quot;
                                comparing our product with competitors.
                            </li>
                            <li>
                                Designed and implemented a Nagios compatible
                                plugin for OP5 Monitor. Utilized command-line
                                options and comprehensive exception handling.
                            </li>
                            <li>
                                Created a scalable Docker stack implementing
                                Nginx for load balancing containers running web
                                servers.
                            </li>
                        </ul>
                    </Project>

                    <Project
                        title="Consultant - Samp Innovations"
                        date="May 2019 - July 2019"
                        location="Tulsa, OK"
                        tools={[".Net", "JS"]}
                    >
                        <ul>
                            <li>
                                Worked on a .NET application to create a web
                                form with client-side validation and inserted
                                that data into an SQL database.
                            </li>
                        </ul>
                    </Project>

                    <Project
                        title="Consultant - Oklahoma Aquarium"
                        date="Feb 2019 - Jun 2019"
                        location="Jenks, OK"
                        tools={["Swift", "Objective C"]}
                    >
                        <ul>
                            <li>
                                Designed and developed a mobile app for people
                                touring the aquarium. Presented information
                                about each fish through quizzes and prompts.
                            </li>
                        </ul>
                    </Project>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.title}>Personal Projects</h2>
                    <Project
                        title="Discord Bot"
                        date="Feb 2023"
                        tools={["Python", "GPT-3", "Selenium", "Discord-api"]}
                    >
                        <ul>
                            <li>
                                Created a discord bot to connect over 1,400
                                daily users of a game to resources and tools
                                provided by the game and the community.
                            </li>
                            {/* <li>
                                The bot uses Selenium to scrape the game&apos;s
                                website and uses Google Translate and GPT-3 to
                                translate the information into the user&apos;s
                                language.
                            </li> */}
                            <li>
                                Detailed logs are kept for each user to help
                                with debugging and to provide insight into how
                                the bot is being used. Logs are queried, sorted,
                                and displayed in a dashboard for easy viewing.{" "}
                                {/* <br />
                                <i>
                                    A Terms of Service and Privacy Policy are
                                    also provided to all users to comply with
                                    Discord&apos;s terms of service.
                                </i> */}
                            </li>
                        </ul>
                    </Project>
                    <Project
                        title="Portfolio Website"
                        date="May 2022"
                        tools={[
                            "NextJS",
                            "ReactJS",
                            "Typescript",
                            "SCSS",
                            // "NPM",
                        ]}
                    >
                        <ul>
                            <li>
                                Deployed using NextJS static site generation to
                                Github Pages (uses a work-tree deployment branch
                                alongside the main branch)
                            </li>
                            <li>
                                The Site features a fully decked-out SEO, color
                                themes, and Google Analytics.
                            </li>
                            <li>
                                Uses SCSS modules to prevent CSS class-name
                                collisions.
                            </li>
                            {/* <li>
                                Uses typescript for live type-checking and to
                                give confidence in deployed code.
                            </li> */}
                        </ul>
                    </Project>
                </section>

                <section className={styles.experience}>
                    <h2 className={styles.title}>Robotics Experience</h2>

                    <Project
                        title="Robotics Experience - Team Leader/Lead Programmer"
                        date="2017 - 2020"
                        tools={["Java", "Python", "CAD"]}
                    >
                        <ul>
                            <li>
                                Lead FTC team 11572 - a team of 10 to design and
                                create a robot.
                            </li>
                            <li>
                                Competed at the world level against 70+
                                countries.
                            </li>
                            <li>
                                Independently learned and applied control
                                systems to autonomously complete challenges.
                            </li>
                        </ul>
                    </Project>

                    <Project
                        title="MIT - Robotics Workshop"
                        date="2018"
                        tools={["Python", "TensorFlow", "ROS"]}
                    >
                        <ul>
                            <li>
                                Completed a prerequisite programming/Linux
                                course and was invited based on merit.
                            </li>
                            <li>
                                MIT Department leads and partnered technology
                                corporations mentored us through various control
                                systems and technologies.
                            </li>
                            <li>
                                Project-based learning allowed us to implement
                                many modern technologies including Event, State,
                                and SLAM architectures, PID controllers, IMU,
                                Lidar, and Stereoscopic cameras.
                            </li>
                        </ul>
                    </Project>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.title}>Education</h2>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "stretch",
                            flexWrap: "wrap",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                gap: "1rem",
                                flexWrap: "wrap",
                            }}
                        >
                            <div>
                                <b>University of Tulsa</b>
                                <br />
                                Computer Science
                                <br />
                                Aug 2020 - May 2021
                            </div>
                            <div
                                style={{
                                    width: "1px",
                                    height: "2.5em",
                                    backgroundColor: "rgb(170, 170, 170)",
                                }}
                            />
                            <div>
                                <b>Tulsa Community College</b>
                                <br />
                                Gen Eds
                                <br />
                                2018 - 2020
                            </div>
                            <div
                                style={{
                                    width: "1px",
                                    height: "2.5em",
                                    backgroundColor: "rgb(170, 170, 170)",
                                }}
                            />
                            <div>
                                <div>
                                    <b>Home School</b>
                                    <br />
                                    High School Diploma
                                    <br />
                                    2016 - 2020
                                </div>
                            </div>
                        </div>

                        <div
                            style={{
                                marginLeft: "1rem",
                                flexGrow: 1,
                            }}
                        >
                            {/* content room */}
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

const Project = ({
    title,
    date,
    location,
    children,
    tools,
}: {
    title: string;
    date: string;
    location?: string;
    children: React.ReactNode;
    tools: string[];
}) => {
    return (
        <>
            <article className={styles.project}>
                <header className={styles.projectHeader}>
                    <span
                        style={{
                            fontWeight: "600",
                            // make not italic
                            fontStyle: "normal",
                        }}
                    >
                        {title}
                        {location && (
                            <>
                                <br />
                                {location}
                            </>
                        )}
                    </span>
                    <span>
                        {date}
                        {/* <br />
                        <span
                            style={{
                                marginLeft: "8ch",
                            }}
                        >
                            Tech Used
                        </span> */}
                    </span>
                </header>

                <div className={styles.projectBody}>
                    {children}

                    {tools && tools.length !== 0 && (
                        <ul className={styles.projectTools}>
                            {tools.map((tool, idx) => (
                                <li key={idx}>{tool}</li>
                            ))}
                        </ul>
                    )}
                </div>
            </article>
        </>
    );
};
