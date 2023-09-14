import React from "react";
import Link from "next/link";
import type { LinkProps } from "next/link";
import styles from "./button.module.scss";

// props shared with all
type BaseProps = {
    children: React.ReactNode;
    className?: string;
    styleType: "primary" | "secondary" | "tertiary" | "ghost";
    size?: "small" | "medium" | "large";
    noPadding?: boolean;
    dis?: boolean;
};

type ButtonAsButton = BaseProps &
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
        as?: "button";
    };

type ButtonAsUnstyled = Omit<ButtonAsButton, "as" | "styleType"> & {
    as: "unstyled";
    styleType?: never; //BaseProps['styleType']
};

type ButtonAsLink = BaseProps &
    Omit<LinkProps, keyof BaseProps> & {
        as: "link";
    };

type ButtonAsExternal = BaseProps &
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
        as: "externalLink";
    };

export type ButtonProps =
    | ButtonAsButton
    | ButtonAsExternal
    | ButtonAsLink
    | ButtonAsUnstyled;

export default function Button({
    className,
    styleType,
    as: buttonType,
    noPadding,
    dis,
    size,
    children,
    ...props
}: ButtonProps): JSX.Element {
    const allClassNames: string = [
        className,
        styles.base,
        noPadding ? styles.noPadding : null,
        dis ? styles.disabled : null,
        styleType === "primary"
            ? styles.primary
            : styleType === "secondary"
            ? styles.secondary
            : styleType === "tertiary"
            ? styles.tertiary
            : styleType === "ghost"
            ? styles.ghost
            : null,
        size === "small"
            ? styles.small
            : size === "medium"
            ? styles.medium
            : size === "large"
            ? styles.large
            : styles.medium, // default to medium
    ]
        .filter((n) => n)
        .join(" ");

    switch (buttonType) {
        case "link": {
            return (
                <Link {...(props as LinkProps)} className={allClassNames}>
                    <span>{children}</span>
                </Link>
            );
        }
        case "externalLink": {
            return (
                <a
                    className={allClassNames}
                    target="_blank"
                    rel="noopener noreferrer"
                    {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
                >
                    <span>{children}</span>
                </a>
            );
        }
        case "unstyled": {
            return (
                <button
                    className={className}
                    {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
                >
                    <span>{children}</span>
                </button>
            );
        }
        default: {
            return (
                <button
                    className={allClassNames}
                    disabled={dis}
                    aria-disabled={dis}
                    {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
                >
                    <span>{children}</span>
                </button>
            );
        }
    }
}
