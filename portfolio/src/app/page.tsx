import styles from "./page.module.css";
import NavBar from "@components/navbar";
import ContentView from "@components/ui/contentView";
import Spacer from "@components/ui/spacer";
import Button from "@components/ui/button";
import Hero from "@components/hero";

export default function Home() {
    return (
        <main className={styles.main}>
            <NavBar />

            <Hero />
            {/* <div style={{ height: "3rem" }} /> */}
            {/* <div style={{ height: "100vh", backgroundColor: "#00ff003f" }} /> */}

            <ContentView backgroundSurfaceLevel={2}>
                <ContentView
                    backgroundSurfaceLevel={3}
                    style={{ margin: "1rem" }}
                >
                    <h1>hello</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Fugit cupiditate perferendis culpa voluptatem
                        perspiciatis non eos deserunt, neque atque? Alias autem
                        enim asperiores sit, magni voluptas officia omnis
                        aliquid vel. Lorem ipsum dolor sit amet consectetur
                        adipisicing elit. Fugit cupiditate perferendis culpa
                        voluptatem perspiciatis non eos deserunt, neque atque?
                        Alias autem enim asperiores sit, magni voluptas officia
                        omnis aliquid vel. Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Fugit cupiditate
                        perferendis culpa voluptatem perspiciatis non eos
                        deserunt, neque atque? Alias autem enim asperiores sit,
                        magni voluptas officia omnis aliquid vel.
                    </p>
                    <ContentView backgroundSurfaceLevel={4}>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Fugit cupiditate perferendis culpa voluptatem
                            perspiciatis non eos deserunt, neque atque? Alias
                            autem enim asperiores sit, magni voluptas officia
                            omnis aliquid vel.
                        </p>
                    </ContentView>
                </ContentView>

                <Spacer size="lg" />

                <ContentView backgroundSurfaceLevel={2}>
                    <div
                        style={{
                            display: "flex",
                            gap: "1rem",
                            margin: "1rem",
                        }}
                    >
                        <span>hello</span>
                        <Button styleType="primary" as="button" size="small">
                            primary
                        </Button>
                        <Button styleType="secondary" as="button" size="small">
                            secondary
                        </Button>
                        <Button styleType="tertiary" as="button" size="small">
                            tertiary
                        </Button>
                        <Button styleType="ghost" as="button" size="small">
                            ghost
                        </Button>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gap: "1rem",
                            margin: "1rem",
                        }}
                    >
                        <span>hello</span>
                        <Button
                            styleType="primary"
                            as="externalLink"
                            size="medium"
                        >
                            primary
                        </Button>
                        <Button
                            styleType="secondary"
                            as="externalLink"
                            size="medium"
                        >
                            secondary
                        </Button>
                        <Button
                            styleType="tertiary"
                            as="externalLink"
                            size="medium"
                        >
                            tertiary
                        </Button>
                        <Button
                            styleType="ghost"
                            as="externalLink"
                            size="medium"
                        >
                            ghost
                        </Button>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            gap: "1rem",
                            margin: "1rem",
                        }}
                    >
                        <span>hello</span>
                        <Button
                            styleType="primary"
                            as="link"
                            size="large"
                            href={"/"}
                        >
                            primary
                        </Button>
                        <Button
                            styleType="secondary"
                            as="link"
                            size="large"
                            href={"/"}
                        >
                            secondary
                        </Button>
                        <Button
                            styleType="tertiary"
                            as="link"
                            size="large"
                            href={"/"}
                        >
                            tertiary
                        </Button>
                        <Button
                            styleType="ghost"
                            as="link"
                            size="large"
                            href={"/"}
                        >
                            ghost
                        </Button>
                    </div>
                </ContentView>
            </ContentView>

            <div style={{ height: "100vh", backgroundColor: "#ff00000f" }} />
        </main>
    );
}
