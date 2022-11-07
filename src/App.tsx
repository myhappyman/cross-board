import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";
import { BsFillTrashFill } from "react-icons/bs";
import CategoryForm from "./components/CategoryForm";

const Wrapper = styled.div`
  display: flex;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 3fr);
  gap: 10px;
`;

interface IArea{
  isDraggingOver: boolean;
  draggingFromThisWith: boolean;
}

const BoardWrapper = styled.div`
  background-color: ${props => props.theme.boardColor};
  padding-top: 10px;
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;

const Trash = styled.div<IArea>`
  margin-top: 30px;
  position: relative;
  min-width: 36px;
  min-height: 200px;
  background-color: ${props => props.isDraggingOver 
                            ? "#dfe6e9" 
                            : props.draggingFromThisWith ? "#b2bec3" : "transparent"};
  .icon{
    position: absolute;
  }
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  console.log(toDos);
  
  /**
   * 해당 함수는 드래그가 끝났을 때 실행된느 함수
   */
  const onDragEnd = (info: DropResult) => {
    console.log(info);
    const {destination, source} = info;
    if(!destination) return; //가끔 destination이 undefined이거나 없는경우가 있어서 처리함.

    //휴지통으로 옮긴 경우(삭제)
    if(destination?.droppableId === "trash"){
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        console.log(sourceBoard);
        sourceBoard.splice(source.index, 1);
        return {
          ...allBoards,
          [source.droppableId]: sourceBoard
        }
      });

    //같은 보드로 옮긴 경우
    }else if(destination?.droppableId === source.droppableId){      
      // 1.수정이 일어난 보드의 데이터만 복사한다.
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        //1) source.index에서 해당하는 아이템을 copy array에서 삭제한다.
        //2) destination.index를 통해 해당 위치에 draggableId를 넣기
        boardCopy.splice(source.index, 1); //1);
        boardCopy.splice(destination?.index, 0, taskObj); //2);
        //return을 해줄 때는 복사한 수정된 board와 나머지 board도 return해야한다.
        return {
          ...allBoards,
          [source.droppableId]: boardCopy
        };
      });

    //다른 보드로 옮긴 경우
    }else if(destination?.droppableId !== source.droppableId){
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const taskObj = sourceBoard[source.index];
        const destinationBoard = [...allBoards[destination.droppableId]];

        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination.index, 0, taskObj);

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
      <CategoryForm />
      <DragDropContext onDragEnd={onDragEnd}>
        <Boards>
          {
            Object.keys(toDos).map(boardId => <Board key={boardId} toDos={toDos[boardId]} boardId={boardId} />)
          }
          <BoardWrapper >
              <Droppable droppableId="trash">
                  {(magic, snapshot) => (
                      <Trash
                        isDraggingOver={snapshot.isDraggingOver}
                        draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
                        ref={magic.innerRef}
                        {...magic.droppableProps}
                      >
                        <BsFillTrashFill className="icon" size="36" color="#000" />
                      </Trash>
                  )}
              </Droppable>
          </BoardWrapper>
        </Boards>
      </DragDropContext>
    </Wrapper>    
  );
}

export default App;