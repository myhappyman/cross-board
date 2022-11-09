import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, IToDoState, toDoState } from "./atoms";
import Board from "./components/Board";
import CategoryForm from "./components/CategoryForm";
import DraggableTrash from "./components/DraggableTrash";

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
  padding: 1rem;
`;

function App() {
  const [category, setCategory] = useRecoilState(categoryState);
  const [toDos, setToDos] = useRecoilState(toDoState);

  /**
   * 해당 함수는 드래그가 끝났을 때 실행된느 함수
   */
  const onDragEnd = (info: DropResult) => {
    const {destination, source, type} = info;
    if(!destination) return; //가끔 destination이 undefined이거나 없는경우가 있어서 처리함.

    //보드 덩어리가 옮겨진 경우
    if(type === "board"){
      setCategory(prev => {
        const copy = [...prev];
        const sourceStr = copy[source.index]; //기존 위치 문자열
        const destinationStr = copy[destination.index]; //옮길 위치 문자열
        copy.splice(source.index, 1, destinationStr);
        copy.splice(destination?.index, 1, sourceStr);
        return [...copy];
      });

    // 휴지통으로 옮긴 경우(삭제)
    }else if(destination?.droppableId === "trash"){
      const tmpText = toDos[source.droppableId][source.index].text;
      if(window.confirm(`'${[source.droppableId]}'의 '${tmpText}'를 정말 삭제하시겠습니까?`)){
        setToDos((allBoards) => {
          const sourceBoard = [...allBoards[source.droppableId]];
          sourceBoard.splice(source.index, 1);
          return {
            ...allBoards,
            [source.droppableId]: sourceBoard
          }
        });
      }      

    // 같은 보드로 옮긴 경우
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

    // 다른 보드로 옮긴 경우
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
          <Droppable droppableId="boards" direction="horizontal" type="board">
            {(magic) => (
              <>
                <Boards ref={magic.innerRef} {...magic.droppableProps}>
                  {category.map((boardId, index) => (                  
                      <Board 
                        key={boardId} 
                        index={index}
                        toDos={toDos[boardId]} 
                        boardId={boardId}                    
                      />                      
                    ))
                  }          
                </Boards>
                <DraggableTrash />
                {magic.placeholder}
              </>              
            )}
          </Droppable>
      </DragDropContext>
    </Wrapper>    
  );
}

export default App;