// page to list all projects

import fs from "fs";
import path from "path";
import matter from "gray-matter";

import Link from "next/link";
import NavBar from "@components/navbar";

export default function Page() {
    const files = fs.readdirSync(path.join("src/projects"));

    const projects = files.map((filename) => {
        const slug = filename.replace(".mdx", "");
        const markdownWithMeta = fs.readFileSync(
            path.join("src/projects", filename),
            "utf-8"
        );

        const { data: frontmatter } = matter(markdownWithMeta);

        return {
            slug,
            frontmatter,
        };
    });

    return (
        <div>
            <NavBar animate />

            <div style={{ height: "3rem" }} />

            <h1>Projects</h1>
            <ul>
                {projects.map((project, index) => (
                    <li key={index}>
                        <Link href={`/projects/${project.slug}`}>
                            {project.frontmatter.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
