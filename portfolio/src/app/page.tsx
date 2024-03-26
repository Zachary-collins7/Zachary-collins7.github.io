import styles from "./page.module.scss";
import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/ui/hero";
import { getAllPosts, getPostById } from "@lib/api";

export default async function Home() {
    const projects = await getAllPosts();
    const featuredProjects = projects
        .filter((project) => project.featured)
        .slice(0, 3);

    return (
        <main className={styles.main}>
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
            {/* hello I am and short about */}
            {/* projects */}
            {/* certs? */}
            {/* Contact  */}
        </main>
    );
}
