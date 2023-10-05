"use client";
import Link from "next/link";
import styles from "./navbar.module.scss";
import { useEffect, useRef, useState } from "react";

// we need to have types for a option in the navbar thats just a href
// and an option that is a dropdown with a list of hrefs
export type NavBarItem = {
    name: string;
    href: string;
    dropdown?: NavBarItem[];
};

export interface INavBarProps {
    animateDown?: boolean;
    navBarItems?: NavBarItem[];
}

const clamp = (num: number, min: number, max: number) => {
    return Math.min(Math.max(num, min), max);
};

export default function Navbar({ animateDown, navBarItems }: INavBarProps) {
    const headerRef = useRef<HTMLElement>(null);
    const [pathname, setPathname] = useState<string>("");
    const [progress, setProgress] = useState<Number>(0);
    const [navBlur, setNavBlur] = useState<Number>(0);
    const [navBarOpen, setNavBarOpen] = useState<boolean>(false);

    useEffect(() => {
        setPathname(window.location.pathname);

        const handleScroll = () => {
            const pageHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPosition = window.scrollY;
            const scrollPercentage = clamp(scrollPosition / pageHeight, 0, 1);
            const blur = clamp((scrollPosition / window.innerHeight) * 5, 0, 1);
            setProgress(scrollPercentage);
            setNavBlur(blur);
        };
        handleScroll();

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const headerStyles = [
        styles.navHeader,
        navBarOpen ? styles.open : "",
        animateDown ? styles.animateDown : "",
    ].join(" ");

    const handleMenuClick = () => {
        console.log("menu clicked");
        setNavBarOpen(!navBarOpen);
    };

    return (
        <header
            className={headerStyles}
            ref={headerRef}
            style={
                {
                    "--progress": `${progress}`,
                    "--navBlur": `${navBlur}`,
                } as React.CSSProperties
            }
        >
            <nav>
                <span className={styles.brand}>
                    <Link href="/" onClick={() => setNavBarOpen(false)}></Link>
                </span>
                <ul className={styles.navElements}>
                    {navBarItems?.map((item, index) => {
                        if (item.dropdown) {
                            const linkStyles = [
                                styles.linkDropdown,
                                pathname === item.href ? styles.active : "",
                            ].join(" ");
                            return (
                                <li key={index} className={linkStyles}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setNavBarOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                    {/* <ul className="dropdown">
                                        {item.dropdown.map(
                                            (subItem, subIndex) => {
                                                const linkStyles = [
                                                    styles.link,
                                                    pathname === subItem.href
                                                        ? styles.active
                                                        : "",
                                                ].join(" ");
                                                return (
                                                    <li
                                                        key={subIndex}
                                                        className={linkStyles}
                                                    >
                                                        <Link
                                                            href={subItem.href}
                                                            onClick={() => setNavBarOpen(false)}
                                                        >
                                                            {subItem.name}
                                                        </Link>
                                                    </li>
                                                );
                                            }
                                        )}
                                    </ul> */}
                                </li>
                            );
                        } else {
                            const linkStyles = [
                                styles.link,
                                pathname === item.href ? styles.active : "",
                            ].join(" ");
                            return (
                                <li key={index} className={linkStyles}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setNavBarOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            );
                        }
                    })}
                </ul>
                <button
                    className={styles.menu}
                    onClick={handleMenuClick}
                    aria-expanded={navBarOpen}
                    aria-haspopup={true}
                >
                    <span className={styles.bar} />
                    <span className={styles.bar} />
                    <span className={styles.bar} />
                </button>
            </nav>
        </header>
    );
}
