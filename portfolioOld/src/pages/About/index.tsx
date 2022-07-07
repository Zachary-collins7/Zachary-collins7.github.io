import React from "react";
import styles from "./index.module.scss";

export interface IAboutIndexProps {
}

export default function AboutIndex(props: IAboutIndexProps) {
    return (
        <div className={styles.wrapper}>
            <span style={{ 
                fontSize: "1.5rem"
             }}>
                <span style={{ 
                    color: "#e39"
                 }}>About Me</span> page in-progress
            </span>
        </div>
    );
}