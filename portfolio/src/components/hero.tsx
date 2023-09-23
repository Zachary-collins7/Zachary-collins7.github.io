"use client";
import { useEffect, useState } from "react";
import {
    levenshteinDistance,
    LevenshteinDistanceResult,
} from "../util/dataStructures"; //"@util/dataStructures";
import styles from "./hero.module.scss";
import Button from "./ui/button";

export default function Hero() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <div>
                    <Greeting />
                </div>
            </div>
            <div className={styles.right}>
                <div></div>
            </div>
        </div>
    );
}

const Greeting = () => {
    const allTitles = [
        "Software Engineer",
        "Fullstack Developer",
        "Prompt Engineer",
    ];
    const titleChangeDelayMs = 5000;
    const [titleIndex, setTitleIndex] = useState(1); // TODO: check prod. no idea why this is 1 and not 0
    const [title, setTitle] = useState(allTitles[0]);
    const [wordChanges, setWordChanges]: [LevenshteinDistanceResult[], any] =
        useState([]);

    // every 5 seconds change title index
    useEffect(() => {
        const interval = setInterval(async () => {
            const newIndex = (titleIndex + 1) % allTitles.length;
            const oldTitle = title;
            const newTitle = allTitles[titleIndex];
            const oldTitleWords = oldTitle.split(" ");
            const newTitleWords = newTitle.split(" ");
            setTitleIndex(newIndex);
            setTitle(allTitles[titleIndex]);

            // update to support different length titles
            const newWordChanges = oldTitleWords.map((word, i) => {
                // if new title is shorter than old title then just delete the rest of the old title
                if (i >= newTitleWords.length) {
                    return {
                        steps: word.split("").map((char, i) => ({
                            type: "deletion",
                            oldChar: char,
                            newChar: "",
                            i,
                        })),
                        distance: word.length,
                        matrix: [],
                    } as LevenshteinDistanceResult;
                }
                return levenshteinDistance(word, newTitleWords[i]);
            });

            // if new title is longer than old title then just insert the rest of the new title
            if (newTitleWords.length > oldTitleWords.length) {
                const newWords = newTitleWords.slice(oldTitleWords.length);
                newWordChanges.push(
                    ...newWords.map((word) => ({
                        steps: word.split("").map((char, i) => ({
                            type: "insertion",
                            oldChar: "",
                            newChar: char,
                            i,
                        })),
                        distance: word.length,
                        matrix: [],
                    }))
                );
            }

            setWordChanges(newWordChanges);
        }, titleChangeDelayMs);
        return () => clearInterval(interval);
    }, [titleIndex]);

    return (
        <>
            <h3>Im Zach</h3>
            <h1>
                <span className={`${styles.title} ${styles.brandColor}`}>
                    {(wordChanges && wordChanges.length > 0 && (
                        <LevenshteinChangingTitle wordChanges={wordChanges} />
                    )) ||
                        title.split(" ").map((word, i) => (
                            <span className={styles.word} key={i}>
                                {word.split("").map((char, j) => (
                                    <span className={styles.letterBase} key={j}>
                                        {char}
                                    </span>
                                ))}
                            </span>
                        ))}
                </span>
            </h1>
            <p
                style={{
                    maxWidth: "45ch",
                }}
            >
                ... with agile software development skills and a passion for
                creating beautiful and functional applications
            </p>
            <p>Hello world</p>
            <div className={styles.callToActionButtons}>
                <Button
                    as={"link"}
                    href={"/contact"}
                    styleType={"primary"}
                    size={"large"}
                >
                    Contact Me
                </Button>
                <Button
                    as={"link"}
                    href={"/about"}
                    styleType={"secondary"}
                    size={"large"}
                >
                    Learn More
                </Button>
            </div>
        </>
    );
};

const LevenshteinChangingTitle = ({
    wordChanges,
}: {
    wordChanges: LevenshteinDistanceResult[];
}) => {
    // Helper function to generate the html for each word
    const words = wordChanges.map((change, i) => {
        const innerHtml = change.steps.map((step, j) => {
            let styleClass = "";
            switch (step.type) {
                case "match":
                    styleClass = styles.match;
                    break;
                case "substitution":
                    styleClass = styles.substitution;
                    break;
                case "deletion":
                    styleClass = styles.deletion;
                    break;
                case "insertion":
                    styleClass = styles.insertion;
                    break;
                default:
                    styleClass = styles.HUHHH;
                    break;
            }
            return (
                `<span class=${styleClass}>` +
                `<span>${step.oldChar}</span>` +
                `<span>${step.newChar}</span>` +
                "</span>"
            );
        });

        // we use dangerouslySetInnerHTML because without it the html
        // animations were working inconsistently
        return (
            <span
                className={styles.word}
                key={i}
                dangerouslySetInnerHTML={{ __html: innerHtml.join("") }}
            />
        );
    });

    return words;
};
