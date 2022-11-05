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
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const {destination, draggableId, source} = info;
    if(!destination) return; //가끔 destination이 undefined이거나 없는경우가 있어서 처리함.

    //same board
    if(destination?.droppableId === source.droppableId){      
      // 1.수정이 일어난 보드의 데이터만 복사한다.
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        //1) source.index에서 해당하는 아이템을 copy array에서 삭제한다.
        //2) destination.index를 통해 해당 위치에 draggableId를 넣기
        boardCopy.splice(source.index, 1); //1);
        boardCopy.splice(destination?.index, 0, draggableId); //2);
        //return을 해줄 때는 복사한 수정된 board와 나머지 board도 return해야한다.
        return {
          ...allBoards,
          [source.droppableId]: boardCopy
        };
      });

    //other board
    }else if(destination?.droppableId !== source.droppableId){
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination.droppableId]];

        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, draggableId);

        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard
        }
      });

    }
    
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
