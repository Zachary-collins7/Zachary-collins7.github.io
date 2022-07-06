import React from "react";
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import styles from "./about.module.scss";

const About: NextPage = () => {
    return (
        <>
            <Link href={"/"}>Go to home</Link>
        </>
    );
}

export default About;