import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  background-color: ${props => props.theme.cardColor};
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
`;

interface IDraggableCardProps{
    toDo:string;
    idx:number
}

function DraggableCard({toDo, idx}:IDraggableCardProps){
    return (
        <Draggable key={toDo} draggableId={toDo} index={idx}>
            {(magic) => (
                <Card 
                    ref={magic.innerRef} 
                    {...magic.draggableProps} 
                    {...magic.dragHandleProps}  
                >{toDo}</Card>
            )}
        </Draggable>
    );
}

//React.memo로 DraggableCard를 감싸므로써 prop이 변하지 않는다면 
//렌더링하지 말아라라는 뜻으로 처리를 한다.
export default React.memo(DraggableCard);
