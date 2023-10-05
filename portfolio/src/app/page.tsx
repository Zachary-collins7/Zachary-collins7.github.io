import styles from "./page.module.scss";
import NavBar from "@components/navbar";
import { NavBarItem } from "@components/navbar";
import ContentView from "@components/ui/contentView";
import Hero from "@components/hero";
import { getAllPosts, getPostById } from "@lib/api";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/button";

export default async function Home() {
    const projects = await getAllPosts();
    const featuredProjects = projects
        .filter((project) => project.featured)
        .slice(0, 3);

    const navBarItems: NavBarItem[] = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
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
        <main className={styles.main}>
            <NavBar animateDown navBarItems={navBarItems} />

            <Hero />

            <div className={styles.gridview}>
                <div className={styles.aboutMe}>
                    <div>
                        <h1>About Me</h1>
                        <p>
                            I am a software developer with a passion for
                            creating software that is both functional and
                            beautiful. I have experience in both front-end and
                            back-end development and have worked with a variety
                            of languages and frameworks. I love learning new
                            things and am always looking for new challenges.
                        </p>
                    </div>
                </div>

                <div className={styles.projects}>
                    <h1>Projects I love</h1>
                    {featuredProjects &&
                        featuredProjects.map((project, i) => (
                            <Link
                                href={`/projects/${project.id}`}
                                className={styles.project}
                                key={i}
                            >
                                <h3>{project.title}</h3>
                                <div className={styles.details}>
                                    <h3>{project.title}</h3>
                                    <p>{project.description}</p>
                                </div>
                                <Image
                                    src={project.image}
                                    alt={project.imageAlt}
                                    width={300}
                                    height={300}
                                />
                            </Link>
                        ))}
                </div>
            </div>

            <div
                style={{
                    margin: "3rem 0",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1rem",
                }}
            >
                <div>
                    Need a developer?{" "}
                    <Button
                        as="link"
                        styleType="tertiary"
                        href="/contact"
                        noPadding
                    >
                        Contact Me
                    </Button>
                </div>
            </div>

            <div className={styles.links}>
                <Link
                    href="https://www.linkedin.com/in/zachary-collins7/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        src="/assets/logos/linkedin.png"
                        alt="LinkedIn"
                        width={32}
                        height={32}
                    />
                </Link>
                <Link
                    href="https://github.com/Zachary-collins7"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        src="/assets/logos/github-mark.png"
                        alt="Github"
                        width={32}
                        height={32}
                    />
                </Link>
                <Link
                    href="https://twitter.com/ZachTheCollins"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        src="/assets/logos/twitter.png"
                        alt="Twitter"
                        width={32}
                        height={32}
                        style={{
                            filter: "invert(1)",
                        }}
                    />
                </Link>
                <Link href="/contact" target="_blank" rel="noopener noreferrer">
                    <Image
                        src="/assets/logos/email.png"
                        alt="Email"
                        width={32}
                        height={32}
                        style={{
                            filter: "invert(1)",
                        }}
                    />
                </Link>
            </div>
            {/* hello I am and short about */}
            {/* projects */}
            {/* certs? */}
            {/* Contact  */}
        </main>
    );
}

const MyAnimation = () => (
    <div className={styles.ani}>
        {Array(16)
            .fill(0)
            .map((_, i) => (
                <span
                    style={
                        {
                            "--i": i,
                        } as React.CSSProperties
                    }
                    key={i}
                >
                    <i>EAT</i>
                    SLEEP
                    <i>CODE</i>
                </span>
            ))}
    </div>
);
