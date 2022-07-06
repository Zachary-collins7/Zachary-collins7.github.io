import Button from '@element/Button';
import Hero from '@element/Hero';
import NavBar from '@element/Navbar';
import Toggle from '@element/Toggle';
import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';


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
      </NavBar>

      <NextSeo
        description="Let's build something great together!"
      />

      <Hero />

      <div style={{ 
        height: '100vh',
       }}></div>
    </>
  )
}

export default Home
