import "@styles/app.scss";
import type { Metadata } from "next";
import Providers from "@lib/providers";
import GA from "@lib/googleAnalytics";

export const metadata: Metadata = {
    title: "Zachary's Portfolio",
    description: "Learn more about my projects and skills",
    themeColor: "#030203",
    viewport: "width=device-width, initial-scale=1.0",
    robots: "index, follow",
    appleWebApp: {
        capable: true,
        title: "Zachary's Portfolio",
    },
    keywords: [
        "Zachary",
        "Collins",
        "Zachary Collins",
        "Zachary Collins Portfolio",
        "Zachary Collins Projects",
        "Zachary Collins Python Projects",
        "Zachary Collins Skills",
        "Zachary Collins Resume",
        "Zachary Collins Contact",
        "Zachary Collins About",
        "Zachary Collins Blog",
        "Zachary Collins Blog Posts",
    ],
    icons: [
        {
            rel: "apple-touch-icon",
            sizes: "180x180",
            url: "/apple-touch-icon.png",
        },
        {
            rel: "icon",
            sizes: "32x32",
            url: "/favicon-32x32.png",
        },
        {
            rel: "icon",
            sizes: "16x16",
            url: "/favicon-16x16.png",
        },
        {
            rel: "icon",
            sizes: "192x192",
            url: "/android-chrome-192x192.png",
        },
        {
            rel: "icon",
            sizes: "512x512",
            url: "/android-chrome-512x512.png",
        },
    ],
    manifest: "/site.webmanifest",
    twitter: {
        card: "summary_large_image",
        site: "@ZachTheCollins",
        creator: "@ZachTheCollins",
        creatorId: "ZachTheCollins",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: `${process.env.SITE_URL!}`,
        siteName: "Zachary's Portfolio",
        title: "Zachary's Portfolio",
        description: "Learn more about my projects and skills",
        images: [
            {
                url: `${process.env.SITE_URL!}/assets/images/portfolioV2.jpg`,
                width: 1920,
                height: 1080,
                alt: "Zachary's Portfolio",
            },
            {
                url: `${process.env.SITE_URL!}/assets/images/portfolioV2.webp`,
                width: 1920,
                height: 1080,
                alt: "Zachary's Portfolio",
            },
        ],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const art = (
        "           __________                                  \n" +
        "         .'----------`.                   😤😤😤      \n" +
        "         | .--------. |                                \n" +
        "         | |########| |       __________               \n" +
        "         | |########| |      /__________               \n" +
        ".--------| `--------' |------|    --=-- |-------------.\n" +
        "|        `----,-.-----'      |o ======  |             |\n" +
        "|       ______|_|_______     |__________|             |\n" +
        "|      /  %%%%%%%%%%%%  \\                             |\n" +
        "|     /  %%%%%%%%%%%%%%  \\      Rust > Python ;)      |\n" +
        "|     ^^^^^^^^^^^^^^^^^^^^                            |\n" +
        "+-----------------------------------------------------+\n" +
        "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"
    )
        .split("\n")
        .map((line) => `<!-- ${line} -->`)
        .join("\n");

    return (
        <>
            <html lang="en" data-theme="monotone-dark">
                <head>
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin="anonymous"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Hind+Vadodara:wght@300;400;500;600;700&family=Roboto+Mono:wght@700&family=Quattrocento+Sans:wght@700&display=swap"
                        // href="https://fonts.googleapis.com/css2?family=Hind+Vadodara:wght@300;400;500;600;700&family=Montserrat:wght@700&family=Quattrocento+Sans:wght@700&display=swap"
                        rel="stylesheet"
                    />
                    {/* https://www.realtimecolors.com/?colors=faf9fa-030203-a119d7-1d0c1d-ab49ab&fonts=Poppins-Poppins */}
                    {/* {"&lt;!--hello"}--&gt; */}
                    {process && process.env.NODE_ENV === "production" && <GA />}
                </head>

                <body>
                    <script
                        about="Hello Developer"
                        dangerouslySetInnerHTML={{
                            __html: art,
                        }}
                    ></script>
                    <Providers>{children}</Providers>
                </body>
            </html>
        </>
    );
}
