import React from 'react';
import Link from 'next/link';
import type { LinkProps } from 'next/link';
import styles from './button.module.scss';

// props shared with all
type BaseProps = {
    children: React.ReactNode
    className?: string
    styleType: 'primary' | 'secondary' | 'tertiary' | 'ghost',
    noPadding?: boolean,
}

type ButtonAsButton = BaseProps &
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
        as?: 'button'
    }

type ButtonAsUnstyled = Omit<ButtonAsButton, 'as' | 'styleType'> & {
    as: 'unstyled'
    styleType?: never //BaseProps['styleType']
}

type ButtonAsLink = BaseProps &
    Omit<LinkProps, keyof BaseProps> & {
        as: 'link'
    }

type ButtonAsExternal = BaseProps &
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
        as: 'externalLink'
    }

export type ButtonProps =
    | ButtonAsButton
    | ButtonAsExternal
    | ButtonAsLink
    | ButtonAsUnstyled

export default function Button({ className, styleType, as: buttonType, noPadding, ...props }: ButtonProps): JSX.Element {
    const allClassNames: string = [
        className,
        styles.base,
        noPadding ? styles.noPadding : null,
        styleType === "primary" ? styles.primary
            : styleType === "secondary" ? styles.secondary
                : styleType === "tertiary" ? styles.tertiary
                    : styleType === "ghost" ? styles.ghost
                        : null
    ].filter(n => n).join(" ");

    switch (buttonType) {
        case "link": {
            return <Link {...props as LinkProps}><a className={allClassNames}>{props.children}</a></Link>
        }
        case "externalLink": {
            return (
                <a
                    className={allClassNames}
                    target='_blank'
                    rel='noopener noreferrer'
                    {...props as React.AnchorHTMLAttributes<HTMLAnchorElement>}
                >
                    {props.children}
                </a>
            )
        }   
        case "unstyled": {
            return <button className={className} {...props as React.ButtonHTMLAttributes<HTMLButtonElement>} />
        }
        default: {
            const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
            const isDisabledClass = styles.disabled ? " " + styles.disabled : "";

            return <button className={allClassNames + isDisabledClass} {...props as React.ButtonHTMLAttributes<HTMLButtonElement>} />
        }
    }
}


