import { relative } from 'path';
import React from 'react';

export type DraggableElementBaseProps = {
    children: React.ReactNode;
}

export type DraggableElementAsDiv = DraggableElementBaseProps &
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof DraggableElementBaseProps>

export type DraggableElementProps = 
    | DraggableElementAsDiv
    
export default function DraggableElement({ children, ...props }: DraggableElementProps) {
    return (
        <div {...props} data-draggable-element style={{ position: 'relative' }}>
            {children}
        </div>
    );
}