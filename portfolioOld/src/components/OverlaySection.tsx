import * as React from 'react';

export interface IOverlaySectionProps {
    under: React.ReactNode,
    over: React.ReactNode,
}

export default function OverlaySection({ under, over }: IOverlaySectionProps) {
    return (
        <>
            <div style={{
                minHeight: "200vh"
            }}>
                <div style={{
                    position: "sticky",
                    top: 0
                }}>
                    {under}
                </div>
            </div>
            <div style={{
                position: "relative",
                marginTop: "-100vh",
                minHeight: "100vh",
                backdropFilter: "blur()",
            }}>
                {over}
            </div>
        </>
    );
}
