import styles from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/ui/hero";
import { getAllPosts, getPostById } from "@lib/api";
import NavBar from "@components/navbar";
import { NavBarItem } from "@components/navbar";
import Footer from "@/components/ui/footer";

export default async function Home() {
    const projects = await getAllPosts();
    const featuredProjects = projects
        .filter((project) => project.featured)
        .slice(0, 3);

    const navBarItems: NavBarItem[] = [
        { name: "Home", href: "/" },
        // { name: "About", href: "/about" },
        {
            name: "Projects",
            href: "/projects",
            dropdown: [
                {
                    name: "Project 1",
                    href: "/project/1",
                },
                {
                    name: "Project 2",
                    href: "/project/2",
                },
            ],
        },
        { name: "Contact", href: "/contact" },
    ];
    return (
        <>
            <NavBar navBarItems={navBarItems} />
            <main className={styles.main}>
                <Hero />
                <div className={styles.gridview}>
                    <section className={styles.aboutMe}>
                        <div className={styles.content}>
                            <h2>About Me</h2>
                            <div>
                                <div className={styles.mytitle}></div>

                                <div className={styles.myfavlangs}>
                                    <h4>Languages</h4>
                                    <ul>
                                        <li>Python</li>
                                        <li>SQL</li>
                                        <li>Typescript</li>
                                        <li>Swift</li>
                                        <li>PHP</li>
                                    </ul>
                                </div>

                                <div className={styles.myfavtech}>
                                    <h4>Technologies</h4>
                                    <ul>
                                        <li>NextJS</li>
                                        <li>SwiftUI</li>
                                        <li>Laravel</li>
                                        <li>Docker</li>
                                        <li>Selenium</li>
                                    </ul>
                                </div>

                                <div className={styles.git}>
                                    <div>git pull</div>
                                    <div>git status</div>
                                    <div>git commit</div>
                                    <div>git push</div>
                                </div>
                                <div className={styles.about}>
                                    <p>
                                        Hello! I am Zachary Collins, a software
                                        engineer based in Colorado USA. Since I
                                        was 13, I've had a passion for
                                        programming and technology.
                                    </p>
                                    <p>
                                        I have experience in different types of
                                        development and am always looking for
                                        new opportunities to learn and grow as a
                                        developer.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className={styles.projects}>
                        <div className={styles.content}>
                            <h2>Projects I love</h2>
                            <div>
                                {featuredProjects &&
                                    featuredProjects.map((project, i) => (
                                        <Link
                                            href={`/projects/${project.id}`}
                                            className={styles.project}
                                            key={i}
                                        >
                                            <Image
                                                src={project.image}
                                                alt={project.imageAlt}
                                                width={300}
                                                height={300}
                                            />
                                            <h3>{project.title}</h3>
                                            <div className={styles.details}>
                                                <h3>{project.title}</h3>
                                                <p>{project.description}</p>
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    </section>
                </div>
                {/* hello I am and short about */}
                {/* projects */}
                {/* certs? */}
                {/* Contact  */}
            </main>
            <Footer />
        </>
    );
}
