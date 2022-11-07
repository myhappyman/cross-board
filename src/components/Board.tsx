import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { ITodo, toDoState } from "../atoms";
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
    toDos: ITodo[],
    boardId: string;
}

const Form = styled.form`
    width: 100%;
    input{
        width: 100%;
    }
`;

interface IForm{
    toDo: string;
}

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
            <Title>{boardId}</Title>
            <Form onSubmit={handleSubmit(onValid)}>
                <input 
                    {...register("toDo",
                    {required: true})}
                type="text" placeholder={`Add task on ${boardId}`} />
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