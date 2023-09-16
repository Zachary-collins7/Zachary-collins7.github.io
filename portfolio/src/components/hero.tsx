"use client";
import { useEffect, useState } from "react";
import styles from "./hero.module.scss";

export default function Hero() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <Greeting varient={1} />
            </div>
            {/* <div className={styles.right}>world</div> */}
        </div>
    );
}

const Greeting = ({ varient }: { varient: number }) => {
    const allTitles = [
        "Software Engineer",
        "Fullstack Developer",
        "Prompt Engineer",
    ];
    const titleChangeDelayMs = 5000;
    const [titleIndex, setTitleIndex] = useState(0);
    const [title, setTitle] = useState(allTitles[titleIndex]);

    // every 5 seconds change title index
    useEffect(() => {
        const interval = setInterval(() => {
            setTitleIndex((titleIndex + 1) % allTitles.length);

            const inner = async () => {
                const oldTitle = title;
                const newTitle = allTitles[titleIndex];
                const minLen = Math.min(oldTitle.length, newTitle.length);
                const transitionCharecters = "@#$%&*+=<>?~";

                const changesPerLetter = 1;
                const transitionTimeMs = titleChangeDelayMs / 2; // 1/5 of time is spent transitioning
                const transitionTimePerLetterMs =
                    transitionTimeMs / changesPerLetter / minLen;

                const doSetTitle = (title: string) => {
                    setTitle(title);
                    console.log(title);
                };

                for (let i = 0; i < minLen; i++) {
                    for (let j = 0; j < changesPerLetter; j++) {
                        let titleFragment = newTitle.slice(0, i);
                        const getRandomChar = () => {
                            return transitionCharecters[
                                Math.floor(
                                    Math.random() * transitionCharecters.length
                                )
                            ];
                        };

                        for (let k = i; k < minLen; k++) {
                            titleFragment += getRandomChar();
                        }

                        doSetTitle(titleFragment);

                        await new Promise((resolve) =>
                            setTimeout(resolve, transitionTimePerLetterMs)
                        );
                        // await new Promise((resolve) => setTimeout(resolve, transitionTimePerLetterMs / changesPerLetter));
                    }
                }
                doSetTitle(newTitle);
            };

            inner().then(console.log).catch(console.error);
        }, 5000);
        return () => clearInterval(interval);
    }, [titleIndex]);

    switch (varient) {
        case 1:
            return (
                <>
                    <h1>Im Zach</h1>
                    <h3>
                        A <span className={styles.brandColor}>{title}</span>
                    </h3>
                </>
            );
        default:
            return (
                <h1>
                    Hello
                    <br />
                    Im Zach
                </h1>
            );
    }
};
