import React from "react";
import Section, { SectionProps } from "@element/Section";
import styles from "./fullpagesection.module.scss";

type BaseProps = {
    children: React.ReactNode,
    level?: "1" | "2" | "3" | "4",
    classname?: string,
    sectionProps: Omit<SectionProps, "children"> 
}

export type FullpageSectionProps = BaseProps &
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseProps>

export default function FullpageSection({ children, sectionProps, level, classname, ...props }: FullpageSectionProps) {
    const allClassNames = [styles.fullpageSection, styles[`surface${level}`], classname].join(" ");

    return (
        <>
            <div style={{ 
                minHeight: "100vh",
             }} className={allClassNames}>
                <Section {...sectionProps}>
                    {children}
                </Section>
            </div>
        </>
    );
}