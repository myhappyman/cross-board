import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 3fr);
  width: 100%;
`;

const Board = styled.div`
  background-color: ${props => props.theme.boardColor};
  padding: 30px 10px 20px 10px;
  border-radius: 5px;
  min-height: 200px;
`;

const Card = styled.div`
  background-color: ${props => props.theme.cardColor};
  padding: 10px;
  margin-bottom: 5px;
  border-radius: 5px;
`;

const toDos = ["a", "b", "c", "d", "e", "f"];

function App() {
  const onDragEnd = () => {

  }
  return (
    <Wrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        <Boards>
          <Droppable droppableId="one">
            {(magic) => (
              <Board ref={magic.innerRef} {...magic.droppableProps}>                
                {toDos.map((toDo, idx) => (
                  <Draggable draggableId={toDo} index={idx}>
                  {(magic) => (
                      <Card 
                        ref={magic.innerRef} 
                        {...magic.draggableProps} 
                        {...magic.dragHandleProps}  
                      >{toDo}</Card>
                  )}
                </Draggable>
                ))}
                {magic.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </DragDropContext>
    </Wrapper>

    
  );
}

export default App;
