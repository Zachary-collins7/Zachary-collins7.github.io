"use client";
import { Project } from "@lib/api";
import styles from "./search.module.scss";
import { useEffect, useRef, useState } from "react";
import useDebounce from "@hooks/useDebounce";
import Link from "next/link";
import { levenshteinDistance } from "@/util/dataStructures";
import MiniSearch from "minisearch";

export default function Search({ projects }: { projects: Project[] }) {
    let miniSearch = new MiniSearch<Project>({
        fields: ["id", "title", "description", "html"], // fields to index for full-text search
    });
    miniSearch.addAll(projects);

    const searchRef = useRef<HTMLInputElement>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedSearchQuery = useDebounce(searchQuery, 200);
    const [displayedProjects, setDisplayedProjects] =
        useState<Project[]>(projects);

    const [searchSuggestionSelection, setSearchSuggestionSelection] =
        useState(0);
    const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);

    // search for projects that match the search query
    useEffect(() => {
        // if search query is empty, display all projects
        if (debouncedSearchQuery === "") {
            setSearchSuggestions([]);
            return setDisplayedProjects(projects);
        }

        const searchResults = miniSearch
            .search(debouncedSearchQuery, {
                boost: { id: 3, title: 3 },
                fuzzy: 1,
            })
            .map((result) =>
                projects.find((project) => project.id === result.id)
            )
            .map((project) => project as Project);

        const titleStartsWithOrContains = projects.filter(
            (project) =>
                project.title
                    .toLowerCase()
                    .startsWith(debouncedSearchQuery.toLowerCase()) ||
                project.title
                    .toLowerCase()
                    .includes(debouncedSearchQuery.toLowerCase())
        );

        titleStartsWithOrContains.forEach((project) => {
            if (!searchResults.includes(project)) {
                searchResults.push(project);
            }
        });

        setSearchSuggestions(searchResults.map((project) => project.title));
        setDisplayedProjects(searchResults);
        setSearchSuggestionSelection(0);
    }, [debouncedSearchQuery, projects]);

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
