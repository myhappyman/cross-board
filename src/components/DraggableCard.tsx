import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{isDragging:boolean}>`
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 5px;
    background-color: ${props => props.isDragging ? props.theme.draggingColor : props.theme.cardColor};
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    color: ${props => props.isDragging ? props.theme.textColor : props.theme.bgColor};
`;

interface IDraggableCardProps{
    toDoId: number;
    toDoText: string;
    idx: number;
}

function DraggableCard({toDoId, toDoText, idx}:IDraggableCardProps){
    return (
        <Draggable key={toDoId} draggableId={toDoId+""} index={idx}>
            {(magic, snapshot) => (
                <Card
                    isDragging={snapshot.isDragging}
                    ref={magic.innerRef} 
                    {...magic.draggableProps} 
                    {...magic.dragHandleProps}  
                >{toDoText}</Card>
            )}
        </Draggable>
    );
}

//React.memo로 DraggableCard를 감싸므로써 prop이 변하지 않는다면 
//렌더링하지 말아라라는 뜻으로 처리를 한다.
export default React.memo(DraggableCard);
