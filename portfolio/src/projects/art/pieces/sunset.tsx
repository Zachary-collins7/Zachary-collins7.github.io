import React from "react";
import styles from "./sunset.module.scss";

export interface ISunsetProps {
}

export default function Sunset (props: ISunsetProps) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.canvas}>
                <span className={styles.bubble}></span>
                <span className={styles.bubble}></span>
                <span className={styles.bubble}></span>
                <span className={styles.bubble}></span>
                <span className={styles.bubble}></span>
                <span className={styles.bubble}></span>
                <span className={styles.bubble}></span>
                <div className={styles.cloudFill}></div>
            </div>
        </div>
    );
}