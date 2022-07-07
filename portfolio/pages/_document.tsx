import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en" data-theme="dark">
                <Head>
                    <meta name="theme-color" content="#272727" />
                    <meta name="apple-mobile-web-app-capable" content="yes">

                    </meta>
                    {/* <link
                        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"
                        rel="stylesheet"
                    /> */}
                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="manifest" href="/site.webmanifest" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;