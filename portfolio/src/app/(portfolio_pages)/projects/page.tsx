// page to list all projects
import styles from "./page.module.scss";
import Link from "next/link";
import { getAllPosts } from "@lib/api";
import Search from "./search";

export default async function Page() {
    const projects = await getAllPosts();

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1>My Projects</h1>
                <h4>
                    I&apos;m working on writing about my most recent projects
                </h4>
            </div>
            <Search projects={projects} />
        </div>
    );
}
