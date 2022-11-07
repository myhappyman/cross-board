import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, toDoState } from "../atoms";
import { Form, Input } from "./BasicTag";
import DraggableCard from "./DraggableCard";

interface IArea{
    isDraggingOver: boolean;
    draggingFromThisWith: boolean;
}

interface IBoardProps {
    toDos: ITodo[],
    boardId: string;
}

interface IForm{
    toDo: string;
}

const Wrapper = styled.div`
  background-color: ${props => props.theme.boardColor};
  padding-top: 10px;
  border-radius: 5px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;

const Area = styled.div<IArea>`
    background-color: ${props => props.isDraggingOver 
                            ? "#dfe6e9" 
                            : props.draggingFromThisWith ? "#b2bec3" : "transparent"};
    flex-grow: 1;
    transition: background-color .3 ease-in-out;
    padding: 20px;
`;

const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    h2{
        width: calc(100% - 20px);
        word-break: break-all;
    }
    button{
        width: 20px;
        text-align: center;
        border: none;
    }
`;

function Board({toDos, boardId}:IBoardProps){
    const {register, setValue, handleSubmit} = useForm<IForm>();
    const setToDos = useSetRecoilState(toDoState);
    const onValid = ({toDo}:IForm) => {
        const newToDo = {
            id:Date.now(),
            text: toDo
        };
        setToDos(allBoards => {
            return {
                ...allBoards,
                [boardId] : [newToDo, ...allBoards[boardId]]
            };
        });
        setValue("toDo", "");
    };

    return (
        <Wrapper >
            <TitleWrapper>
                <h2>{boardId}</h2>
                <button>X</button>
            </TitleWrapper>
            <Form onSubmit={handleSubmit(onValid)}>
                <Input 
                    {...register("toDo",
                    {required: true})}
                    type="text"
                    placeholder={`Add task on ${boardId}`} 
                />
            </Form>
            <Droppable droppableId={boardId}>
            {(magic, snapshot) => (
                <Area 
                    isDraggingOver={snapshot.isDraggingOver}
                    draggingFromThisWith={Boolean(snapshot.draggingFromThisWith)}
                    ref={magic.innerRef} {...magic.droppableProps}
                >
                    {toDos.map((toDo, idx) => (
                        <DraggableCard 
                            key={toDo.id} 
                            toDoId={toDo.id} 
                            toDoText={toDo.text} 
                            idx={idx}
                        />))
                    }
                    {magic.placeholder}
                </Area>                
            )}
            </Droppable>
        </Wrapper>
    );
}

export default Board;