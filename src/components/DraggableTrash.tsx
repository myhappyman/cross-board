import { Droppable } from "react-beautiful-dnd";
import { BsFillTrashFill } from "react-icons/bs";
import styled from "styled-components";

interface IArea{
    isDraggingOver: boolean;
    draggingFromThisWith: boolean;
}

const BoardWrapper = styled.div`
    background-color: ${props => props.theme.boardColor};
    margin-top: 10px;
    border-radius: 5px;
    width: 48px;
    height: 48px;
    display: flex;
    flex-direction: column;
`;

const Trash = styled.div<IArea>`
    background-color: ${props => props.isDraggingOver 
                                ? props.theme.draggingColor  
                                : props.draggingFromThisWith ? "#b2bec3" : "transparent"};
    padding: 6px;
    width: 48px;
    height: 48px;  
    .icon{
        position: absolute;
        color: ${props => props.isDraggingOver 
                                ? props.theme.cardColor 
                                : props.draggingFromThisWith ? "#b2bec3" : props.theme.textColor};
}
`;

function DraggableTrash(){
    return (
        <BoardWrapper>
            <Droppable droppableId="trash">
                {(magic, snapshot) => (
                    <Trash
                      isDraggingOver={snapshot.isDraggingOver}
                      draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
                      ref={magic.innerRef}
                    >
                      <BsFillTrashFill className="icon" size="36"/>
                      {magic.placeholder}
                    </Trash>
                )}
            </Droppable>
        </BoardWrapper>
    );
}

export default DraggableTrash;