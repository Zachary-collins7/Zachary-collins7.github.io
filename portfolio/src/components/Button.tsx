import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import type { LinkProps, NavLinkProps } from 'react-router-dom';
import styles from './Button.module.scss';

// props shared with all
// dev note: styleType is optional for buttons as "unstyled"
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

export default function Button(props: ButtonProps): JSX.Element {
    const { className, styleType, as: buttonType, noPadding, ...rest } = props;
    const allClassNames = [
        className,
        noPadding ? styles.noPadding : null,
        styles.base,
        styleType === "primary" ? styles.primary
            : styleType === "secondary" ? styles.secondary
                : styleType === "tertiary" ? styles.tertiary
                    : styleType === "ghost" ? styles.ghost
                        : null
    ].filter(n => n).join(" ")

    switch (buttonType) {
        case "link": {
            return <Link className={allClassNames} {...rest as LinkProps} />
        }
    
        case "navLink": {
            return <NavLink className={allClassNames} {...rest as NavLinkProps} />
        }
        case "externalLink": {
            return (
                <a
                    className={allClassNames}
                    target='_blank'
                    rel='noopener noreferrer'
                    {...rest as React.AnchorHTMLAttributes<HTMLAnchorElement>}
                >
                    {props.children}
                </a>
            )
        }   
        case "unstyled": {
            return <button className={className} {...rest as React.ButtonHTMLAttributes<HTMLButtonElement>} />
        }
        default: {
            return <button className={allClassNames} {...rest as React.ButtonHTMLAttributes<HTMLButtonElement>} />
        }
    }
}