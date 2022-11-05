import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  background-color: ${props => props.theme.boardColor};
  padding: 30px 10px 20px 10px;
  border-radius: 5px;
  min-height: 200px;
`;

interface IBoardProps {
    toDos: string[],
    boardId: string;
}

function Board({toDos, boardId}:IBoardProps){
    return (
        <Droppable droppableId={boardId}>
            {(magic) => (
              <Wrapper ref={magic.innerRef} {...magic.droppableProps}>                
                {toDos.map((toDo, idx) => <DraggableCard key={toDo} toDo={toDo} idx={idx}/>)}
                {magic.placeholder}
              </Wrapper>
            )}
        </Droppable>
    );
}

export default Board;