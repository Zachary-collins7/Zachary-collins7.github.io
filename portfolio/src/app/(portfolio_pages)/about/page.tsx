import styles from "./page.module.scss";
import Button from "@components/ui/button";

export default function Page() {
    return (
        <div
            style={{
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                textAlign: "center",
            }}
        >
            <div
                style={{
                    fontSize: "5rem",
                }}
            >
                🚧
            </div>

            <h1>
                <span className="highlight-text">About</span> page still in
                construction
            </h1>

            <div
                style={{
                    marginTop: "1rem",
                }}
            >
                <Button as="link" href="/" styleType="primary">
                    Go back home
                </Button>
            </div>
        </div>
    );
}
