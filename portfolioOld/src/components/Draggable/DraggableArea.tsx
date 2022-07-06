import React, { ReactElement } from "react";
import DraggableElement, { DraggableElementProps } from "./DraggableElement";


type TDraggableElement = React.ReactElement<DraggableElementProps>;

// type TDraggableElementIsFirstChild = Omit<ReactElement, 'children'> & {
//     children: (
//         TDraggableElement | TDraggableElement[]
//     )
// }
type callBackParams = {
    from: number,
    to: number
}

export type IDraggableAreaBaseProps = {
    data: number[] | string[],
    onGesture?: (arg0: callBackParams) => void,
    children: (
        | TDraggableElement
        | TDraggableElement[]
        // | TDraggableElementIsFirstChild
        // | TDraggableElementIsFirstChild[]
    )
}

export type IDraggableAreaProps = IDraggableAreaBaseProps &
    Omit<React.HTMLAttributes<HTMLDivElement>, keyof IDraggableAreaBaseProps>


// check if the children is a DraggableElement and throw error if not
const checkDraggableChildren: (children: IDraggableAreaProps['children']) => void = (children) => {
    if (Array.isArray(children)) {
        children.forEach(child => {
            if (child.type !== DraggableElement) {
                throw new Error('DraggableArea children must be DraggableElement');
            }
        });
    }
    else if (children.type !== DraggableElement) {
        throw new Error('DraggableArea children must be DraggableElement');
    }
}

const childrenToArray: (children: IDraggableAreaProps['children']) => TDraggableElement[] = (children) => {
    if (Array.isArray(children)) {
        return children;
    }
    else {
        return [children];
    }
}


export default function DraggableArea({ children, onGesture, ...props }: IDraggableAreaProps) {
    checkDraggableChildren(children);
    let dragEl: HTMLElement | null = null;
    let targetEl: HTMLElement | null = null;

    const newChildren = React.Children.map(children, child => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, {
                draggable: true,
                onDragStart(e: React.DragEvent<HTMLDivElement>) {
                    e.currentTarget.style.filter = 'blur(1px)';
                    dragEl = e.currentTarget as HTMLElement;
                    // dragEl.style.display = 'none';
                },
                onDragOver: (e: React.DragEvent<HTMLDivElement>) => {
                    e.preventDefault();

                    const otherElements = document.querySelectorAll('[data-draggable-element]') as NodeListOf<HTMLElement>
                    otherElements.forEach(element => {
                        element.style.boxShadow = 'none';
                    })



                    if (dragEl !== null && dragEl !== e.currentTarget) {
                        targetEl = e.currentTarget as HTMLElement;
                        targetEl.style.boxShadow = '0 0 0 0.5px #00f';

                        const nearestDraggableArea = dragEl.closest('[data-draggable-area]');
                        if (nearestDraggableArea) {
                            const draggableElementsInArea = Array.from(nearestDraggableArea.querySelectorAll('[data-draggable-element]'));
                            const dragElIndex = draggableElementsInArea.indexOf(dragEl);
                            const targetElementIndex = draggableElementsInArea.indexOf(targetEl);
                            const dragElHeight = dragEl.offsetHeight;

                            const elementsBeforeTargetEl = draggableElementsInArea.slice(0, targetElementIndex + 1);

                            const elementsAferTargetEl = draggableElementsInArea.slice(targetElementIndex + 1);

                            elementsBeforeTargetEl.forEach(element => {
                                (element as HTMLElement).style.transition = 'transform 0.2s ease-in-out';
                                (element as HTMLElement).style.transform = `translateY(-${dragElHeight}px)`;    
                            });

                            elementsAferTargetEl.forEach(element => {
                                (element as HTMLElement).style.transform = "none";   
                            });


                            const delta = (elementsBeforeTargetEl.at(-1) as HTMLElement).getBoundingClientRect().top;

                            dragEl.style.transform = `translateY(${delta}px)`;
                        }
                    }
                    else {
                        targetEl = null;
                    }

                },
                onDragEnd: (e: React.DragEvent<HTMLDivElement>) => {
                    e.currentTarget.style.filter = 'none';
                    

                    if (dragEl !== null && targetEl !== null) {
                        dragEl.style.transform = 'none';
                        const nearestDraggableArea = dragEl.closest('[data-draggable-area]');

                        if (nearestDraggableArea && onGesture) {
                            const draggableElementsInArea = Array.from(nearestDraggableArea.querySelectorAll('[data-draggable-element]'));
                            draggableElementsInArea.forEach(element => (element as HTMLElement).style.transform = "none")
                            const dragElIndex = draggableElementsInArea.indexOf(dragEl);
                            const targetElementIndex = draggableElementsInArea.indexOf(targetEl);

                            onGesture({
                                from: dragElIndex,
                                to: targetElementIndex
                            })
                        }
                    }
                    

                    // set dragEl to null at end of drag
                    dragEl = null;
                }
            });
        }
        return child;
    })


    return (
        <div {...props} data-draggable-area="true" style={{ position: 'relative' }}>
            {newChildren}
        </div>
    );
}