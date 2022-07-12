import React from "react";
import styles from "./section.module.scss";

type BaseProps = {
    children: React.ReactNode,
    title?: React.ReactNode | string
}

export type SectionProps = BaseProps &
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseProps>

const Section = ({ children, title, ...props }: SectionProps) => {

    return (
        <>
            <section className={styles.section} {...props}>
                {title && <h2 className={styles.title}>{title}</h2>}
                
                <div className={styles.inner}>
                    {children}
                </div>
            </section>
        </>
    )

}

export default Section;