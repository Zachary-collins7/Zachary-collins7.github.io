import React, { useId, useState } from "react";
import styles from "./toggle.module.scss";


type BaseProps = {
    children?: React.ReactNode
    className?: string
}

type ToggleAsInput = BaseProps &
    Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof BaseProps>

export type ToggleProps = 
    | ToggleAsInput;


const Toggle = ({ 
    className,
    ...props
 }: ToggleProps) => {
    
    const allClassNames: string = [
        className,
        styles.base
    ].filter(n => n).join(" ");

    const id = useId();

    return (
        <>
            <div className={allClassNames}>
                <input className={styles.input} type="checkbox" id={id} />

                <label className={styles.toggle} htmlFor={id}>
                    <span className={styles.slider} />
                </label>
            </div>
        </>
    );
}

export default Toggle;