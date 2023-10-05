"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
    levenshteinDistance,
    LevenshteinDistanceResult,
} from "../util/dataStructures"; //"@util/dataStructures";
import styles from "./hero.module.scss";
import Button from "./ui/button";
import Link from "next/link";

export default function Hero() {
    const bgImageRef = useRef<HTMLImageElement>(null);
    const profileImageRef = useRef<HTMLImageElement>(null);

    //triggers multiple times if the user resizes the window
    const onLoad = () => {
        const imageElement = bgImageRef.current;
        if (!imageElement) {
            return;
        }
        // wait 2 sceonds before showing the image
        setTimeout(() => {
            imageElement.classList.add(styles.imageLoaded);
        }, 2000);

        console.log("image loaded");
    };
    const onError = () => {
        const imageElement = bgImageRef.current;
        if (!imageElement) {
            return;
        }
        imageElement.style.display = "none";
    };

    return (
        <div className={styles.wrapper}>
            <picture
                ref={bgImageRef}
                style={
                    {
                        "--average-color": "hsl(252, 12%, 8%)",
                    } as React.CSSProperties
                }
            >
                <source
                    type="image/webp"
                    data-srcset="../assets/images/herobg-4k.webp 1x, ../assets/images/herobg-4k@2x.webp 2x"
                    media="(min-width: 2561px)"
                    srcSet="../assets/images/herobg-4k.webp 1x, ../assets/images/herobg-4k@2x.webp 2x"
                />
                <source
                    type="image/jpg"
                    data-srcset="../assets/images/herobg-4k.jpg 1x, ../assets/images/herobg-4k@2x.jpg 2x"
                    media="(min-width: 2561px)"
                    srcSet="../assets/images/herobg-4k.jpg 1x, ../assets/images/herobg-4k@2x.jpg 2x"
                />
                <source
                    type="image/webp"
                    data-srcset="../assets/images/herobg-2k.webp 1x, ../assets/images/herobg-2k@2x.webp 2x"
                    media="(min-width: 1930px)"
                    srcSet="../assets/images/herobg-2k.webp 1x, ../assets/images/herobg-2k@2x.webp 2x"
                />
                <source
                    type="image/jpg"
                    data-srcset="../assets/images/herobg-2k.jpg 1x, ../assets/images/herobg-2k@2x.jpg 2x"
                    media="(min-width: 1930px)"
                    srcSet="../assets/images/herobg-2k.jpg 1x, ../assets/images/herobg-2k@2x.jpg 2x"
                />
                <source
                    type="image/webp"
                    data-srcset="../assets/images/herobg-hd.webp 1x, ../assets/images/herobg-hd@2x.webp 2x"
                    media="(min-width: 1441px)"
                    srcSet="../assets/images/herobg-hd.webp 1x, ../assets/images/herobg-hd@2x.webp 2x"
                />
                <source
                    type="image/jpg"
                    data-srcset="../assets/images/herobg-hd.jpg 1x, ../assets/images/herobg-hd@2x.jpg 2x"
                    media="(min-width: 1441px)"
                    srcSet="../assets/images/herobg-hd.jpg 1x, ../assets/images/herobg-hd@2x.jpg 2x"
                />
                <source
                    type="image/webp"
                    data-srcset="../assets/images/herobg-pi.webp 1x, ../assets/images/herobg-pi@2x.webp 2x"
                    media="(min-width: 1281px)"
                    srcSet="../assets/images/herobg-pi.webp 1x, ../assets/images/herobg-pi@2x.webp 2x"
                />
                <source
                    type="image/jpg"
                    data-srcset="../assets/images/herobg-pi.jpg 1x, ../assets/images/herobg-pi@2x.jpg 2x"
                    media="(min-width: 1281px)"
                    srcSet="../assets/images/herobg-pi.jpg 1x, ../assets/images/herobg-pi@2x.jpg 2x"
                />
                <source
                    type="image/webp"
                    data-srcset="../assets/images/herobg-md.webp 1x, ../assets/images/herobg-md@2x.webp 2x"
                    media="(min-width: 481px)"
                    srcSet="../assets/images/herobg-md.webp 1x, ../assets/images/herobg-md@2x.webp 2x"
                />
                <source
                    type="image/jpg"
                    data-srcset="../assets/images/herobg-md.jpg 1x, ../assets/images/herobg-md@2x.jpg 2x"
                    media="(min-width: 481px)"
                    srcSet="../assets/images/herobg-md.jpg 1x, ../assets/images/herobg-md@2x.jpg 2x"
                />
                <source
                    type="image/webp"
                    data-srcset="../assets/images/herobg-mobile@2x.webp 1x, ../assets/images/herobg-md.webp 2x"
                    media="(max-width: 414px)"
                    srcSet="../assets/images/herobg-mobile@2x.webp 1x, ../assets/images/herobg-md.webp 2x"
                />
                <source
                    type="image/jpg"
                    data-srcset="../assets/images/herobg-mobile@2x.jpg 1x, ../assets/images/herobg-md.jpg 2x"
                    media="(max-width: 414px)"
                    srcSet="../assets/images/herobg-mobile@2x.jpg 1x, ../assets/images/herobg-md.jpg 2x"
                />
                <Image
                    className="parallax lazyloaded"
                    width="2160"
                    height="2028"
                    src="../assets/images/herobg-hd.jpg"
                    data-src="../assets/images/herobg-hd.jpg"
                    alt="olt art"
                    role="presentation"
                    onLoad={onLoad}
                    onError={onError}
                />
            </picture>

            <div className={styles.left}>
                <div>
                    <Greeting />
                </div>
            </div>
            <div className={styles.right}>
                <div>
                    <picture>
                        <Image
                            src={"/assets/images/headshot2.png"}
                            alt="picture of me"
                            width={100}
                            height={100}
                            ref={profileImageRef}
                            priority
                        />
                    </picture>
                </div>
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
    const titleChangeDelayMs = 10000;
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
    }, [titleIndex, title]);

    return (
        <>
            <h3>I&apos;m Zach</h3>
            <h1>
                <span className={`${styles.title}`}>
                    {/* <span style={{ marginRight: "1ch" }}>a</span> */}
                    {(wordChanges && wordChanges.length > 0 && (
                        <span
                            className={styles.LevenshteinChangingTitle}
                            aria-description={
                                "Title animating between " +
                                allTitles.join(", ")
                            }
                            aria-details={
                                `Role changes every ${Math.round(
                                    titleChangeDelayMs / 10
                                )} seconds and uses the` +
                                " Levenshtein distance algorithm to animate the title change."
                            }
                            dangerouslySetInnerHTML={{
                                __html:
                                    (LevenshteinChangingTitle({
                                        wordChanges,
                                    }) as string) || title,
                            }}
                        />
                    )) || (
                        <span className={styles.LevenshteinChangingTitle}>
                            {title}
                        </span>
                    )}
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
            <p className={styles.callToActionButtons}>
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
            </p>
            <p style={{ fontSize: "0.8em" }}>
                I&apos;m currently working on: My discord bot{" "}
                <Link
                    href="/projects/zerkbot"
                    style={{
                        color: "inherit",
                        textDecoration: "underline",
                    }}
                >
                    ZerkBot
                </Link>
            </p>
        </>
    );
};

const LevenshteinChangingTitle = ({
    wordChanges,
}: {
    wordChanges: LevenshteinDistanceResult[];
}): (JSX.Element | string)[] | JSX.Element | String => {
    // Helper function to generate the html for each word

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

                // return string html because react was messing up the animation
                return (
                    `<span class="${styleClass}">` +
                    `<span>${step.oldChar}</span>` +
                    `<span>${step.newChar}</span>` +
                    `</span>`
                );
            });

            i++; // for the space between words
            return letterGroups;
        })
        .flat(); // flatten the array
    return letters.join("");
};
