import React, { useEffect, useState } from "react";
import styles from "./aboutSkills.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faLaptopCode, faBook } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import Button from "./Button";

export interface IaboutSkillsProps {
}

type skillType = {
    icon: IconDefinition,
    title: string,
    desc: string,
    subtitle1: string,
    desc1: string,
    toolSubtitle: string,
    tools: {
        text: string,
        link?: string
    }[]
}

const loadSkills = () => fetch("/data/skills.json")
    .then(res => res.json())
    .then(json => json.skills)
    .then(skills => skills.map((skill: any) => {
        skill.icon =
            skill.icon === "faCode" ? faCode
                : skill.icon === "faLaptopCode" ? faLaptopCode
                    : faBook

        return skill;
    }
    ))
    .then(skills => skills as skillType[])

export default function AboutSkills(props: IaboutSkillsProps) {
    const [skills, setSkills] = useState<skillType[]>([]);

    useEffect(() => {
        loadSkills()
            .then((s) => setSkills(s || []))
            .catch(err => console.error(`Error fetching skills: ${err}`))
    }, [])

    return (
        <>
            <div className={styles.wrapper}>
                <div style={{
                    fontSize: "7vmin",
                    textAlign: "center",
                    marginBottom: "2rem"
                }}>My Skills</div>

                <div className={styles.skills}>
                    {skills.map(({
                        icon,
                        title,
                        desc,
                        subtitle1,
                        desc1,
                        toolSubtitle,
                        tools
                    }, idx) => (
                        <>
                            <div className={styles.skill} key={idx}>
                                <div className={styles.icon}>
                                    <FontAwesomeIcon icon={icon} />
                                </div>


                                <div className={styles.title}>{title}</div>
                                <div className={styles.description}>{desc}</div>


                                <div className={styles.subtitle}>{subtitle1}</div>
                                <div className={styles.description}>{desc1}</div>


                                <div className={styles.subtitle}>{toolSubtitle}</div>

                                <ul className={styles.toolList}>
                                    {tools.map(({ text, link }, idx) => {
                                        return (
                                            <li key={idx}>
                                                {link &&
                                                    <Button
                                                        styleType="tertiary"
                                                        as="externalLink"
                                                        noPadding
                                                        href={link}>
                                                        {text}
                                                    </Button>
                                                }
                                                {!link && text}
                                            </li>
                                        )
                                    })}
                                </ul>

                                <div className={styles.onLongHover}>
                                    Need to hire a <span>{title}</span>?
                                    <div>
                                        <Button styleType="primary" as="link" href="/contact">contact me</Button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </>
    );
}