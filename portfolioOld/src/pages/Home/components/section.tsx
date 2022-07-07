import * as React from 'react';
import styles from './section.module.scss';

export interface ISectionProps {
    id?: string,
    title?: string,
    children?: React.ReactNode
}

export default function Section({ id, title, children }: ISectionProps) {
    return (
        <div className={styles.section + " uiSection"} id={id}>
            {title && (
                <div className={styles.stickyTitle + " uiSectionTitle"}>
                    <div className={styles.stickyTitleInner}>
                        {title}
                    </div>
                </div>
            )}
            

            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
}