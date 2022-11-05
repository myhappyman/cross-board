import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";
import DraggableCard from "./components/DraggableCard";

const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 3fr);
  gap: 10px;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  /**
   * 해당 함수는 드래그가 끝났을 때 실행된느 함수
   */
  const onDragEnd = ({draggableId, destination, source} : DropResult) => {
    if(!destination) return;
    // setToDos(oldToDos => {
    //   const copyToDos = [...oldToDos];
    //   //1) source.index에서 해당하는 아이템을 copy array에서 삭제한다.
    //   //2) destination.index를 통해 해당 위치에 draggableId를 넣기

    //   copyToDos.splice(source.index, 1); //1)
    //   copyToDos.splice(destination?.index, 0, draggableId); //2)
    //   return copyToDos;
    // });
  } 

  return (
    <Wrapper>
      <DragDropContext onDragEnd={onDragEnd}>
        <Boards>
          {
            Object.keys(toDos).map(boardId => <Board key={boardId} toDos={toDos[boardId]} boardId={boardId} />)
          }
        </Boards>
      </DragDropContext>
    </Wrapper>

    
  );
}

export default App;
