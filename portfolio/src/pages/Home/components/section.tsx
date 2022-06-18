import React, { useRef, useState } from 'react';
import './section.scss';


export interface ISectionProps {
    title: string,
    desc: string,
    desc2: string,
    imageUrl: string,
    buttonTitle?: string[],
    id?: string;
    children?: React.ReactNode
}

export default function Section({
    title,
    desc,
    desc2,
    imageUrl,
    buttonTitle = ["Show more", "Go back"],
    id,
    children
}: ISectionProps) {
    const [animate, setAnimate] = useState(false);
    const section = useRef<HTMLDivElement>(null);

    const handleTransition = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        if (section.current && !animate) {
            setAnimate((cur) => !cur);
            const deltaScroll = section.current.getBoundingClientRect().top;

            // style to make fixed
            section.current.style.top = deltaScroll.toString() + "px";
            section.current.style.left = "0";
            section.current.style.width = "100vw";
            section.current.style.zIndex = "1000";
            section.current.style.transition = "top 1s linear";

            // animation
            setTimeout(() => {
                if (section.current) {
                    section.current.style.position = "fixed";
                    section.current.style.top = "0";
                } 
            }, 100);

            // after animation
            setTimeout(() => {
                //scroll to selected section
                window.scrollBy(0, deltaScroll);
            }, 1000);
        }

        if (section.current && animate) {
            setAnimate((cur) => !cur);

            // reset style
            section.current.style.position = "relative";
            section.current.style.left = "unset";
            section.current.style.top = "unset";
            section.current.style.zIndex = "10";
            section.current.style.background = "rgba(0,0,0,0)";
        }
    }

    return (
        <div style={{ height: "100vh" }} id={id}>
            <div
                ref={section}
                className={
                    animate ? "section post" : "section"
                }>
                <div className="section-hero">
                    <div className="detail">
                        <div className="over">
                            <div className="title">
                                {title}
                            </div>
                            <span className="divider"></span>
                            <div className="desc">
                                {desc}<br></br>{desc2}
                            </div>
                            <a className="button" onClick={handleTransition}>{animate ? buttonTitle.at(-1) : buttonTitle.at(0)}</a>
                        </div>
                    </div>

                    <a className="image" onClick={handleTransition}>
                        <div className="inner"
                            style={{
                                background: `url('${imageUrl}')`,
                                backgroundSize: "cover",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backdropFilter: "blur(1px)"
                            }}>
                        </div>
                    </a>
                </div>

                <div className="section-content">
                    {children}
                </div>
            </div>
        </div>
    );
}
