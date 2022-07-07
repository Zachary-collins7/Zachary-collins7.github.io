import React, { useEffect, useRef, useState } from "react";
import type { NextPage } from 'next';
import styles from "./projects.module.scss";
import { getProjects, Iproject } from "@api/portfolioApi";
import levenshteinDistance from "@util/levenshteinDistance";
import NavBar from "@element/Navbar";
import Link from "next/link";
import { NextSeo } from "next-seo";
import Image from "next/image";


const filterProjectsByTag = (projects: Iproject[], selectedTags: string[]) => projects.filter(project => {
    if (selectedTags.length === 0)
        return true;

    // filter: foreach selectedTags => return tag if tag in projectTag array
    // return true if no tags in selectedTags are NOT in projectTags
    return selectedTags.filter(tag => {
        return !project.tags.includes(tag)
    }).length === 0;
});

const Projects: NextPage = () => {
    const MAX_LEVENSHTEIN_DISTANCE = 3;
    const [allProjects, setAllProjects] = useState<Iproject[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Iproject[]>([]);
    const [allTags, setAllTags] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const [searchQuery, setSearchQuery] = useState("");
    const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
    const [searchSuggestionSelection, setSearchSuggestionSelection] = useState(0);

    const searchRef = useRef<HTMLInputElement>(null);


    // on load get projects
    useEffect(() => {
        getProjects().then(setAllProjects)
    }, [])


    // on projects load get all tags
    useEffect(() => {
        const tags = allProjects
            .map(({ tags }) => tags)
            .reduce((a, b) => [...a, ...b], [])
            .filter((tag, idx, self) => self.indexOf(tag) === idx)
            .sort((a, b) => a > b ? 1 : -1)
        setAllTags(tags);
    }, [allProjects])


    // when projects, search query, or selected tags change, filter projects and update search suggestions
    useEffect(() => {
        let results = filterProjectsByTag(allProjects, selectedTags)

        if (searchQuery) {
            results = filterProjectsByTag(allProjects, selectedTags)
                .map(project => {
                    const query = searchQuery.toLowerCase();
                    const match = project.title.toLowerCase();

                    return {
                        match,
                        query,
                        project,
                        dist: levenshteinDistance(match, query)
                    }
                })
                // .sort(({ dist: a }, { dist: b }) => a > b ? 1 : a === b ? 0 : -1)
                .filter(({ project, match, query, dist }) => {
                    if (!searchQuery)
                        return true;

                    if (match.includes(query))
                        return true;

                    return dist < MAX_LEVENSHTEIN_DISTANCE;
                })
                .map(({ project }) => project)


            setSearchSuggestions(results.map(({ title }) => title))
            setSearchSuggestionSelection(0);
            setFilteredProjects(results);
        }
        else {
            setSearchSuggestions([])
        }

        setFilteredProjects(results);
    }, [allProjects, searchQuery, selectedTags])


    // handles search suggestions and input like arrow up/down and enter/tab
    const handleSearchSelect = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const delta = e.key === "ArrowUp" ? -1
            : e.key === "ArrowDown" ? 1
                : 0;

        if (delta !== 0)
            e.preventDefault();

        // tab and enter are handled
        if (e.key === "Tab" || e.key === "Enter") {
            e.preventDefault();

            // if we are displaying suggestions
            if (searchSuggestions.length > 0) {
                setSearchQuery((cur) => searchSuggestions[searchSuggestionSelection] || cur);
                searchRef.current?.blur();
            }
        }

        setSearchSuggestionSelection((cur) => {
            const newVal = (cur + delta) % (searchSuggestions.length) || 0
            return newVal
        })
    }


    // updates projects filter when tag is clicked
    const handleTagClick = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(cur => cur.filter(other => other !== tag))
        }
        else {
            setSelectedTags(cur => [...cur, tag])
        }
    }

    return (
        <>
            <NavBar animate>
                <Link href={"/"}><a>Home</a></Link>
                <Link href={"/about"}><a>About</a></Link>
                <Link href={"/projects"}><a>Projects</a></Link>
                <Link href={"/contact"}><a>Contact</a></Link>
            </NavBar>

            <NextSeo
                title="Projects"
                description="Check out some of my recent projects and work"
            />

            <div className={styles.wrapper}>
                <div className={styles.searchWrapper}>
                    <div className={styles.searchBar}>
                        <input
                            autoFocus
                            type="search"
                            value={searchQuery}
                            onChange={e => {
                                setSearchQuery(e.target.value.trimStart().replace("  ", " "))
                            }}
                            onKeyDown={e => handleSearchSelect(e)}
                            ref={searchRef} />

                        <div className={styles.searchSuggestions}>
                            {searchSuggestions.map((suggestion, idx) => (
                                <div key={idx} className={styles.searchSuggestion + (idx === searchSuggestionSelection ? " " + styles.selected : "")}>
                                    {suggestion}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.tags}>
                        {allTags.map((tag, idx) => (
                            <div
                                key={idx}
                                onClick={() => handleTagClick(tag)}
                                className={[styles.tag, selectedTags.includes(tag) ? styles.focus : ""].join(" ")}>
                                {tag}
                            </div>
                        ))}
                    </div>

                    <div className={styles.toolTip}>
                        {searchQuery ? `Showing: "${searchQuery}"` : "Showing: all projects"}
                    </div>

                    <div className={styles.searchResults}>
                        {filteredProjects.length > 0 && filteredProjects.map((project, idx) => (
                            <div key={idx} className={styles.searchResult}>
                                <div className={styles.imageWrapper}>
                                    <Image src={project.image} alt={project.title} layout='fill' objectFit='cover' />
                                </div>
                                <div className={styles.title}>
                                    {project.title}
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className={styles.noResults}>No results found for &quot{searchQuery}&quot</div>
                    )}
                </div>
            </div>
        </>
    );
}

export default Projects;