import styles from "./layout.module.scss";
import NavBar from "@/components/navbar";
import { NavBarItem } from "@components/navbar";

export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
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
            <NavBar navBarItems={navBarItems} />
            {children}
            {/* <Footer /> */}
        </main>
    );
}
