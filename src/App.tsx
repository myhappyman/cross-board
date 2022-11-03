import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";

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


function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  /**
   * 해당 함수는 드래그가 끝났을 때 실행된느 함수
   */
  const onDragEnd = ({destination, source} : DropResult) => {
    
  } 

  return (
    <Wrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        <Boards>
          <Droppable droppableId="one">
            {(magic) => (
              <Board ref={magic.innerRef} {...magic.droppableProps}>                
                {toDos.map((toDo, idx) => (
                  <Draggable key={idx} draggableId={toDo} index={idx}>
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
