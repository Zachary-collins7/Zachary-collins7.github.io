import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import type { LinkProps, NavLinkProps } from 'react-router-dom';
import styles from './Button.module.scss';

// props shared with all
type BaseProps = {
    children: React.ReactNode
    className?: string
    styleType: 'primary' | 'secondary' | 'tertiary' | 'ghost',
    noPadding?: boolean
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

type ButtonAsNavLink = BaseProps &
    Omit<NavLinkProps, keyof BaseProps> & {
        as: 'navLink'
    }

type ButtonAsExternal = BaseProps &
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
        as: 'externalLink'
    }

export type ButtonProps =
    | ButtonAsButton
    | ButtonAsExternal
    | ButtonAsLink
    | ButtonAsNavLink
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
            return <Link className={allClassNames} {...props as LinkProps} />
        }
    
        case "navLink": {
            return <NavLink className={allClassNames} {...props as NavLinkProps} />
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
            return <button className={allClassNames} {...props as React.ButtonHTMLAttributes<HTMLButtonElement>} />
        }
    }
}


