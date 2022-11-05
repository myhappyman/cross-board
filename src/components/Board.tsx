import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  background-color: ${props => props.theme.boardColor};
  padding: 30px 10px 20px 10px;
  border-radius: 5px;
  min-height: 200px;
`;

const Title = styled.h2`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px;
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
            {(magic) => (
                <div ref={magic.innerRef} {...magic.droppableProps}>
                {toDos.map((toDo, idx) => <DraggableCard key={toDo} toDo={toDo} idx={idx}/>)}
                {magic.placeholder}
                </div>
              
            )}
            </Droppable>
        </Wrapper>
    );
}

export default Board;