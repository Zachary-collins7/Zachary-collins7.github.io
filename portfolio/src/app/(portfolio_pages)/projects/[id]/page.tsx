import styles from "./page.module.scss";
import { Metadata } from "next";
import { getPostById, getAllPosts } from "@lib/api";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/button";

// Generate the post, note that this is a "react server component"! it is
// allowed to be async
export default async function Post({
    params: { id },
}: {
    params: { id: string };
}) {
    const {
        html,
        title,
        date,
        description,
        githubURL,
        image,
        imageAlt,
        tags,
        authors,
    } = await getPostById(id);
    return (
        <div className={styles.wrapper}>
            <div>
                <Button as="link" styleType="secondary" href="/projects">
                    Back to all Projects
                </Button>
            </div>

            <div className={styles.content}>
                <article>
                    <div>
                        <span>
                            <time dateTime={date}>{date}</time> by{" "}
                            <i>
                                {(authors && authors.join(", ")) || "Anonymous"}
                            </i>
                        </span>

                        {githubURL && (
                            <Link
                                href={githubURL}
                                prefetch={false}
                                target="_blank"
                            >
                                View on GitHub
                            </Link>
                        )}
                    </div>
                    <Image
                        src={image}
                        alt={imageAlt}
                        width={200}
                        height={200}
                    />
                    <h1>{title}</h1>
                    <h4>{description}</h4>
                    {tags && (
                        <div>
                            {/* TODO make links */}
                            {tags.map((tag) => (
                                <span key={tag}>{tag}</span>
                            ))}
                        </div>
                    )}
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                </article>
            </div>

            <Button as="link" styleType="primary" href="/projects">
                Back to all Projects
            </Button>
        </div>
    );
}

// This function can statically allow nextjs to find all the posts that you
// have made, and statically generate them
export async function generateStaticParams() {
    const posts = await getAllPosts();

    return posts.map((post) => ({
        id: post.id,
    }));
}

// Set the title of the page to be the post title, note that we no longer use
// e.g. next/head in app dir, and this can be async just like the server
// component
export async function generateMetadata({
    params: { id },
}: {
    params: { id: string };
}) {
    const { title, description, image, authors } = await getPostById(id);
    return {
        title,
        description,
        authors,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: image,
                },
            ],
        },
    } as Metadata;
}
