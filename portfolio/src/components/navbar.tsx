"use client";
import Link from "next/link";
import styles from "./navbar.module.scss";
import { useEffect, useState } from "react";

export interface INavBarProps {
    animate?: boolean;
}

export default function Navbar({ animate }: INavBarProps) {
    const [offset, setOffset] = useState(0);
    const [showNav, setShowNav] = useState(10000);
    const navHeight = 16 * 3; // 3rem in px
    const [pathname, setPathname] = useState("");

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Projects", href: "/projects" },
        { name: "Contact", href: "/contact" },
    ];

    // below runs every time the component is rendered
    useEffect(() => {
        setPathname(window.location.pathname);
    });

    useEffect(() => {
        setShowNav(window.innerHeight - navHeight);
        const onScroll = () => setOffset(window.scrollY);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const navStyles = [styles.navHeader];

    if (animate) {
        navStyles.push(styles.animate);
        if (offset > showNav) {
            navStyles.push(
                styles.show // apply animation css and remove hide
            );
        } else if (offset > showNav / 2) {
            navStyles.push(
                styles.hide, // still hide since we havent scrolled 1 window height yet
                styles.show // apply animation css
            );
        } else if (offset > navHeight) {
            navStyles.push(
                styles.hide // hide as soon as the navbar is scrolled past
            );
        }
    }

    return (
        <header className={navStyles.join(" ")}>
            <span className={styles.brand}></span>
            <input
                className={styles.navInput}
                type="checkbox"
                id="nav-toggle"
            />
            <label className={styles.navElements} htmlFor="nav-toggle">
                <ul className={styles.navLinks}>
                    {navLinks.map(({ name, href }) => (
                        <li key={name}>
                            <Link
                                href={href}
                                className={
                                    href === pathname ? styles.active : ""
                                }
                            >
                                {name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </label>
        </header>
    );
}
