import fs from "fs";
import matter from "gray-matter";
import { join } from "path";
import { unified } from "unified";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeHighlight from "rehype-highlight";

// memoize/cache the creation of the markdown parser, this sped up the
// building of the blog from ~60s->~10s
let p: ReturnType<typeof getParserPre> | undefined;

// import * as Prism from "remark-prism";

async function getParserPre() {
    return unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypeHighlight)
        .use(remarkGfm)
        .use(rehypeStringify)
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings, {
            content: (arg) => ({
                type: "element",
                tagName: "a",
                properties: {
                    href: "#" + arg.properties?.id,
                    style: "margin-right: 10px",
                },
                children: [{ type: "text", value: "#" }],
            }),
        });
}

function getParser() {
    if (!p) {
        p = getParserPre().catch((e) => {
            p = undefined;
            throw e;
        });
    }
    return p;
}

export type Project = {
    title: string;
    date: string;
    description: string;
    image: string;
    imageAlt: string;
    githubURL: string;
    featured: boolean;
    authors: string[] | undefined;
    tags: string[] | undefined;
    id: string;
    html: string;
};

export async function getPostById(id: string): Promise<Project> {
    const realId = id.replace(/\.mdx$/, "");
    const fullPath = join("_projects", `${realId}.mdx`);
    const { data, content } = matter(
        await fs.promises.readFile(fullPath, "utf8")
    );

    const parser = await getParser();
    const html = await parser.process(content);

    return {
        ...data,
        title: data.title,
        date: `${data.date?.toISOString().slice(0, 10)}`,
        description: data.description,
        image: data.image,
        imageAlt: data.imageAlt,
        githubURL: data.githubURL,
        featured: data.featured || false,
        authors: data.authors as string[] | undefined,
        tags: data.tags as string[] | undefined,
        id: realId,
        html: html.value.toString(),
    };
}

export async function getAllPosts(): Promise<Project[]> {
    const posts = await Promise.all(
        fs.readdirSync("_projects").map((id) => getPostById(id))
    );
    return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}
