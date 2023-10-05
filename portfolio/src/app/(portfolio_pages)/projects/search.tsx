"use client";
import { Project } from "@lib/api";
import styles from "./search.module.scss";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { levenshteinDistance } from "@/util/dataStructures";

export default function Search({ projects }: { projects: Project[] }) {
    const maxEditDistance = 7;
    const searchRef = useRef<HTMLInputElement>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [displayedProjects, setDisplayedProjects] =
        useState<Project[]>(projects);

    const [searchSuggestionSelection, setSearchSuggestionSelection] =
        useState(0);
    const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);

    // search for projects that match the search query
    useEffect(() => {
        // if search query is empty, display all projects
        if (searchQuery === "") {
            setSearchSuggestions([]);
            return setDisplayedProjects(projects);
        }

        //else find projects that match the search query
        const searchResults = projects
            .map((project) => {
                const query = searchQuery.toLowerCase();

                return {
                    project,
                    query,
                    distance: levenshteinDistance(
                        query,
                        project.title.toLowerCase()
                    ),
                };
            })
            .filter(({ project, query, distance }) => {
                if (!searchQuery) return true;

                if (project.title.toLowerCase().includes(query)) return true;
                return distance.distance < maxEditDistance;
            })
            .sort((a, b) => a.distance.distance - b.distance.distance)
            .map(({ project }) => project);

        setSearchSuggestions(searchResults.map((project) => project.title));
        setDisplayedProjects(searchResults);
        setSearchSuggestionSelection(0);
    }, [searchQuery, projects]);

    // handles search suggestions and input like arrow up/down and enter/tab
    const handleSearchSelect = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const delta = e.key === "ArrowUp" ? -1 : e.key === "ArrowDown" ? 1 : 0;

        if (delta !== 0) e.preventDefault();

        // tab and enter are handled
        if (
            (e.key === "Tab" || e.key === "Enter") &&
            searchSuggestions.length &&
            searchQuery
        ) {
            e.preventDefault();

            // if we are displaying suggestions
            if (searchSuggestions.length > 0) {
                setSearchQuery(
                    (cur) => searchSuggestions[searchSuggestionSelection] || cur
                );
                searchRef.current?.blur();
            }
        }

        setSearchSuggestionSelection((cur) => {
            const newVal = (cur + delta) % searchSuggestions.length || 0;
            return newVal;
        });
    };

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.search}>
                    <div className={styles.searchTextBox}>
                        <input
                            autoFocus
                            type="text"
                            ref={searchRef}
                            placeholder="Search for a project"
                            value={searchQuery}
                            onChange={(e) =>
                                setSearchQuery(
                                    e.target.value
                                        .trimStart()
                                        .replace("  ", " ")
                                )
                            }
                            onKeyDown={handleSearchSelect}
                        />
                        <div className={styles.hasButton}>
                            <button type="submit" />
                        </div>
                    </div>

                    <div className={styles.searchSuggestions}>
                        {searchSuggestions.map((suggestion, idx) => (
                            <div
                                key={idx}
                                className={
                                    styles.searchSuggestion +
                                    (idx === searchSuggestionSelection
                                        ? " " + styles.selected
                                        : "")
                                }
                            >
                                {suggestion}
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.searchResults}>
                    <ul>
                        {displayedProjects.map((project, i) => {
                            const { id, date, title, image, imageAlt } =
                                project;
                            return (
                                <li key={i} className={styles.project}>
                                    <Link href={`/projects/${id}`}>
                                        <div className={styles.image}>
                                            <img src={image} alt={imageAlt} />
                                        </div>
                                        <div className={styles.details}>
                                            <h2>{title}</h2>
                                            <p>{date}</p>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
}
