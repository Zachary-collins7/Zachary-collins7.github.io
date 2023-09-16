import styles from "./contentView.module.scss";

type BaseProps = {
    backgroundSurfaceLevel?: 1 | 2 | 3 | 4;
};

export type ContentViewProps = BaseProps &
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof BaseProps>;

export default function ContentView({
    backgroundSurfaceLevel,
    children,
    ...props
}: ContentViewProps) {
    const styleMap = {
        0: null,
        1: styles.backgroundSurfaceLevel1,
        2: styles.backgroundSurfaceLevel2,
        3: styles.backgroundSurfaceLevel3,
        4: styles.backgroundSurfaceLevel4,
    };

    return (
        <div
            className={[styles.wrapper, styleMap[backgroundSurfaceLevel ?? 0]]
                .filter((e) => e)
                .join(" ")}
            {...props}
        >
            <div className={styles.content}>{children}</div>
        </div>
    );
}
