import React from "react";
import styles from "./textcard.module.scss";


type BaseProps = {
    text?: string,
    title?: string,
}

export type TextCardProps = BaseProps &
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseProps>

export default function TextCard({ text, title, ...props }: TextCardProps) {
    return (
        <>
            <div className={styles.base} {...props}>
                <h2>{title}</h2>
                <p>{text}</p>
            </div>
        </>
    );
}