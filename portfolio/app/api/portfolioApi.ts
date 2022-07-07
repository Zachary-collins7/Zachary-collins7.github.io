export interface Iproject {
    title: string,
    description: string,
    image: string,
    hoverImage: string,
    featured: boolean,
    date: Date,
    url: string,
    githubUrl: string,
    tags: string[]
}

interface rawProject extends Omit<Iproject, "date"> {
    date: string | Date
}

export const getProjects: () => Promise<Iproject[]> = () => fetch("/data/projects.json")
    .then(res => res.json())
    .then(json => json.projects as rawProject[])
    .then(rawProjects => rawProjects.map(project => {
        project.date = new Date(project.date)
        return project as Iproject
    }).sort(({ date: a }, { date: b }) => a < b ? 1 : -1))
