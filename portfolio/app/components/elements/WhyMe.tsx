import React, { useState } from "react";
import Image from "next/image";
import styles from "./whyme.module.scss";

export interface IWhyMeProps {
}

export default function WhyMe(props: IWhyMeProps) {
    return (
        <>
            <div className={styles.wrapper}>
                <Card title={"Responsive Design"} text={"My layouts will work on any device, big or small"} className={styles.responsive}>
                    <Image
                        src="/images/responsiveAnimation.gif"
                        blurDataURL="/images/responsiveAnimation.gif"
                        layout="fill"
                        objectFit="cover"
                        alt="aminated responsive design"
                        placeholder="blur"
                    />
                </Card>

                <Card title={"Modern Development"} className={styles.modern}>
                    <p>I integrate modern frameworks like <b>ReactJS</b> and <b>NextJS</b>.</p>
                    <p>I'll update your website regularly to keep it up to date with the <b>latest trends</b> and technologies.</p>
                </Card>

                <Card title={"Search Engine Optimization"} className={styles.seo}>
                    <p>SEO management is a <b>critical</b> part of any website. Let me manage your <b>SEO strategy</b> and help you get the most out of your site.</p>
                </Card>

                <Card title={"Really Fast Loadtimes"} text={"Fast load times and lag free interaction, my highest priority"} className={styles.performance}>
                    <Image
                        src="/images/rocket.gif"
                        blurDataURL="/images/rocket.gif"
                        layout="fill"
                        objectFit="cover"
                        objectPosition={"top"}
                        alt="aminated rocket"
                        placeholder="blur"
                    />
                </Card>

                <Card title={"Frequent intractable updates for you to test every other week"} className={styles.updates}>
                    {/* <p>I will update your website regularly to keep it up to date with the latest trends and technologies.</p> */}
                </Card>

                <Card title={"Customized"} text={"I can customize your website to fit your needs"} className={styles.customized}>

                </Card>

            </div>
        </>
    );
}

type BaseCardProps = { title: string, text?: string, className: string, children: React.ReactNode };
type CardProps = BaseCardProps &
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseCardProps>

const Card = ({ title, text, children, className, ...props }: CardProps) => {
    const allClasses = [className, styles.card].join(" ");
    const titleStyle = children || text ? {} : { margin: "0" }



    return (
        <div className={allClasses} {...props}>

            <h2 className={styles.cardTitle} style={{
                ...titleStyle
            }}>{title}</h2>
            {children}
            {/* <div className={styles.cardContent}>
                
            </div> */}
            {text && <p className={styles.cardText}>{text}</p>}
        </div>

    )
}
