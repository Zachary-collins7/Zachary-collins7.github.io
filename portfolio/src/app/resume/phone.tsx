"use client";
import { useEffect, useState } from "react";

export default function Phone() {
    // get phone number and email from the url arguments (if they exist)
    const [phone, setPhone] = useState<string | null>(null);
    useEffect(() => {
        const url = new URL(window.location.href);
        const phone_raw = url.searchParams.get("phone");

        if (!phone_raw) {
            return;
        }

        const phone_formatted = phone_raw.replace(
            /(\d{3})(\d{3})(\d{4})/,
            "$1-$2-$3"
        );
        setPhone(phone_formatted);
    }, []);

    return (
        <>
            {(phone && <a href={`tel:+1-${phone}`}>+1 {phone}</a>) || (
                <a>+1 XXX-XXX-XXXX</a>
            )}
        </>
    );
}
