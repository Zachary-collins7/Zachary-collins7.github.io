import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import Hero from '@element/Hero';
import NavBar from '@element/Navbar';
import FeaturedProjects from '@element/FeaturedProjects';
import AboutSkills from '@element/aboutSkills';



export async function getStaticProps() {
  return {
    props: {}, // will be passed to the page component as props
  }
}

const Home: NextPage = () => {
  return (
    <>
      <NavBar animate>
        <Link href={"/"}><a>Home</a></Link>
        <Link href={"/about"}><a>About</a></Link>
        <Link href={"/projects"}><a>Projects</a></Link>
        <Link href={"/contact"}><a>Contact</a></Link>
      </NavBar>

      <NextSeo
        description="Let's build something great together!"
      />

      <Hero />

      <FeaturedProjects />

      <AboutSkills />
    </>
  )
}

export default Home