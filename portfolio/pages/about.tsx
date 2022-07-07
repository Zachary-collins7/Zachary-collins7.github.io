import React from "react";
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Button from "@element/Button";
import NavBar from "@element/Navbar";

const About: NextPage = () => {
    return (
        <>
            <NavBar>
                <Link href={"/"}><a>Home</a></Link>
                <Link href={"/about"}><a>About</a></Link>
                <Link href={"/projects"}><a>Projects</a></Link>
                <Link href={"/contact"}><a>Contact</a></Link>
            </NavBar>

            <NextSeo
                title="About"
                description="Learn more about the person behind this portfolio."
            />



            <div className="trash" style={{ 
                width: '100vw',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                textAlign: 'center'
             }}>
                <div style={{ 
                    fontSize: '5rem',
                }}>🚧
                </div>

                <h1><span className="highlight-text">About</span> page still in construction</h1>
            
                <div style={{
                    marginTop: '1rem',
                }}>
                    <Button as='link' href='/' styleType='primary'>Go back home</Button>
                </div>
            </div>
        </>
    );
}

export default About;