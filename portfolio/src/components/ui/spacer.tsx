export type SpacerProps = {
    className?: string;
    style?: React.CSSProperties;
    size: "xs" | "sm" | "md" | "lg" | "xl";
};

export default function Spacer({ className, style, size }: SpacerProps) {
    // map size to height in rem

    const sizeToHeight = {
        xs: "0.25rem",
        sm: "0.5rem",
        md: "1rem",
        lg: "2rem",
        xl: "3rem",
    };
    return (
        <div
            className={className}
            style={{
                ...style,
                height: sizeToHeight[size],
            }}
        />
    );
}
