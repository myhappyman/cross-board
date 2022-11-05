import { builtinModules } from "module";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  background-color: ${props => props.theme.boardColor};
  padding-top: 10px;
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px;
`;

interface IArea{
    isDraggingOver: boolean;
    draggingFromThisWith: boolean;
}

const Area = styled.div<IArea>`
    background-color: ${props => props.isDraggingOver 
                            ? "#dfe6e9" 
                            : props.draggingFromThisWith ? "#b2bec3" : "transparent"};
    flex-grow: 1;
    transition: background-color .3 ease-in-out;
    padding: 20px;
`;

interface IBoardProps {
    toDos: string[],
    boardId: string;
}

function Board({toDos, boardId}:IBoardProps){
    return (
        <Wrapper >
            <Title>{boardId}</Title>
            <Droppable droppableId={boardId}>
            {(magic, snapshot) => (
                <Area 
                    isDraggingOver={snapshot.isDraggingOver}
                    draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
                    ref={magic.innerRef} {...magic.droppableProps}
                >
                    {toDos.map((toDo, idx) => <DraggableCard key={toDo} toDo={toDo} idx={idx}/>)}
                    {magic.placeholder}
                </Area>
              
            )}
            </Droppable>
        </Wrapper>
    );
}

export default Board;