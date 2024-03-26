import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/button";
import styles from "./footer.module.scss";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.cta}>
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
        </footer>
    );
}
