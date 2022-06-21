import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";
import { Iproject, getPojects } from "../../api/portforlioAPI";

export interface IProjectsIndexProps {
}


const levenshteinDistance = function (a: string, b: string) {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

    var matrix = [];

    // increment along the first column of each row
    var i;
    for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    // increment each column in the first row
    var j;
    for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Fill in the rest of the matrix
    for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, // substitution
                    Math.min(matrix[i][j - 1] + 1, // insertion
                        matrix[i - 1][j] + 1)); // deletion
            }
        }
    }

    return matrix[b.length][a.length];
};


const filterProjectsByTag = (projects: Iproject[], selectedTags: string[]) => projects.filter(project => {
    if (selectedTags.length === 0)
        return true;

    // filter: foreach selectedTags => return tag if tag in projectTag array
    // return true if no tags in selectedTags are NOT in projectTags
    return selectedTags.filter(tag => {
        return !project.tags.includes(tag)
    }).length === 0;
});

export default function ProjectsIndex(props: IProjectsIndexProps) {
    const MAX_LEVENSHTEIN_DISTANCE = 3;
    const [allProjects, setAllProjects] = useState<Iproject[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Iproject[]>([]);
    const [allTags, setAllTags] = useState<string[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    const [searchQuery, setSearchQuery] = useState("");
    const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
    const [searchSuggestionSelection, setSearchSuggestionSelection] = useState(0);

    const searchRef = useRef<HTMLInputElement>(null);


    useEffect(() => {        
        getPojects()
            .then(projects => {
                setAllProjects(projects);
            })
    }, [])

    useEffect(()=> {
        const tags = allProjects
            .map(({ tags }) => tags)
            .reduce((a, b) => [...a, ...b], [])
            .filter((tag, idx, self) => self.indexOf(tag) === idx)
            .sort((a, b) => a > b ? 1 : -1)
        setAllTags(tags);
    }, [allProjects])

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

    const handleTagClick = (tag: string) => {
        if (selectedTags.includes(tag)) {
            setSelectedTags(cur => cur.filter(other => other !== tag))
        }
        else {
            setSelectedTags(cur => [...cur, tag])
        }
    }

    return (
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
                                <img src={project.image} alt={project.title} />
                            </div>
                            <div className={styles.title}>
                                {project.title}
                            </div>
                        </div>
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className={styles.noResults}>No results found for "{searchQuery}"</div>
                )}
            </div>
        </div>
    );
}