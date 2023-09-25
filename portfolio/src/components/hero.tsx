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
                <span className={`${styles.brandColor} ${styles.title}`}>
                    <span style={{ marginRight: "1ch" }}>Hello</span>
                    <span className={styles.LevenshteinChangingTitle}>
                        {(wordChanges && wordChanges.length > 0 && (
                            <LevenshteinChangingTitle
                                wordChanges={wordChanges}
                            />
                        )) ||
                            title}
                    </span>
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
}): (JSX.Element | string)[] => {
    // Helper function to generate the html for each word
    // const oldwords = wordChanges.map((change, i) => {
    //     let animationIndexChange = 0;
    //     let deltaIndex = 0;

    //     const innerHtml = change.steps.map((step, j) => {
    //         const animationStyleClass =
    //             step.type in styles ? styles[step.type] : styles.HUHHH;
    //         const indexStyleClass = styles[`letterNumber${j}`]; // relative to the word
    //         const deltaStyleClass =
    //             styles[`letterDelta${animationIndexChange}`]; // relative to all words

    //         const styleClass = [
    //             animationStyleClass,
    //             indexStyleClass,
    //             deltaStyleClass,
    //         ].join(" ");

    //         console.log(styleClass);

    //         // for letters after this we need to update the delta
    //         if (step.type == "insertion") {
    //             animationIndexChange++;
    //         } else if (step.type == "deletion") {
    //             animationIndexChange--;
    //         }

    //         return (
    //             // `<span class=${styleClass}>` +
    //             // `<span>${step.oldChar}</span>` +
    //             // `<span>${step.newChar}</span>` +
    //             // "</span>"
    //             <span className={styleClass} key={j}>
    //                 <span>{step.oldChar}</span>
    //                 <span>{step.newChar}</span>
    //             </span>
    //         );
    //     });

    //     // we use dangerouslySetInnerHTML because without it the html
    //     // animations were working inconsistently
    //     return (
    //         <span
    //             className={styles.word}
    //             key={i}
    //             // dangerouslySetInnerHTML={{ __html: innerHtml.join("") }}
    //         >
    //             {innerHtml}
    //         </span>
    //     );
    // });

    // we have to init the index to be centered at the start of the first word
    // so we have to count the number of wordchanges before the oldChar has its first letter
    let i =
        (() => {
            let index = 0;
            for (let i = 0; i < wordChanges.length; i++) {
                for (let j = 0; j < wordChanges[i].steps.length; j++) {
                    if (wordChanges[i].steps[j].oldChar !== "") {
                        return -index;
                    }
                    index++;
                }
            }
        })() || 0;
    let delta = -i;

    const allDifferentStepTypes = wordChanges
        .map((change) =>
            Array.from(new Set(change.steps.map((step) => step.type)))
        )
        .reduce((acc, set) => Array.from(new Set([...acc, ...set])), []);

    console.log({ allDifferentStepTypes, i, delta });

    const letters = wordChanges
        .map((change, keyI) => {
            // we will describe the current index and the target delta
            // if the new word starts after the old word then the delta will be negative at the first index
            const letterGroups = change.steps.map((step, keyJ) => {
                const animationStyleClass =
                    step.type in styles ? styles[step.type] : styles.HUHHH;
                const indexStyleClass = styles[`letterNumber${i}`];
                const deltaStyleClass = styles[`letterDelta${delta}`]; // relative to all words
                const styleClass = [
                    animationStyleClass,
                    indexStyleClass,
                    deltaStyleClass,
                ].join(" ");

                if (step.oldChar === "") {
                    // delta++;
                } else if (step.newChar === "") {
                    delta--;
                }

                i++;

                // // if new char is empty
                // if (step.newChar === "") {
                // }

                // i++;
                return (
                    <span className={styleClass} key={`${keyI}.${keyJ}`}>
                        <span>{step.oldChar}</span>
                        <span>{step.newChar}</span>
                    </span>
                );
            });

            i++; // for the space between words
            return letterGroups;
        })
        .flat(); // flatten the array
    return letters;
};
