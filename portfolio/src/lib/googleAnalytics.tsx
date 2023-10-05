"use client";
import { GoogleAnalytics } from "nextjs-google-analytics";

export default function GA() {
    return <GoogleAnalytics strategy="lazyOnload" />;
}
