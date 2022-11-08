import { useState } from "react";
import { useForm } from "react-hook-form";
import { BsCheckLg, BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { IToDoState, toDoState } from "../atoms";
import { Form, Input } from "./BasicTag";

interface IForm{
    editTitle: string;
}

interface IBoardProps {
    boardId: string;
}

const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    h2{
        min-height: 36px;
        font-size: 16px;
        line-height: 36px;
        width: calc(100% - 62px);
        word-break: break-all;
    }
    div{
        width: 62px;
        background: none;
        border: none;
        padding-top: 8px;
        button{
            background: none;
            cursor: pointer;
            margin-left: 5px;
            width: 26px;
            text-align: center;
            border: none;
            text-align: center;
            .icon{
                color: ${props => props.theme.textColor};
                font-size: 16px;
            }
        }
    }
`;

const TitleForm = styled(Form)`
    margin: 0;
`;

function BoardTitle({boardId}:IBoardProps){
    const [editMode, setEditMode] = useState(false);
    const {register, setValue, handleSubmit} = useForm<IForm>();
    const setToDos = useSetRecoilState(toDoState);
    
    const titleEdit = () => {
        setValue("editTitle", boardId);
        setEditMode(prev => !prev);
    }
    const categoryDrop = () => {
        if(window.confirm(`'${boardId}' 카테고리를 삭제하시겠습니까?`)){
            setToDos(allBoards => {
                const copyBoards = {...allBoards};
                delete copyBoards[boardId];
                return {...copyBoards};
            });
        }
    };
    const modifyEdit = ({editTitle}:IForm) => {
        setToDos(allBoards => {
            const newBoards = {} as IToDoState;
            Object.keys(allBoards).forEach(key => {
                key === boardId 
                ? newBoards[editTitle] = allBoards[key]
                : newBoards[key] = allBoards[key];
            });
            return {...newBoards};
        });
        setEditMode(prev => !prev);
    };
    return (
        <TitleWrapper>
            {
                editMode ? (
                    <TitleForm onSubmit={handleSubmit(modifyEdit)}>
                        <Input {...register("editTitle",
                                {required: true})} />
                        <div>
                            <button type="submit"><BsCheckLg className="icon"/></button>
                            <button onClick={categoryDrop}><BsFillTrashFill className="icon"/></button>
                        </div>
                    </TitleForm>
                ) : (
                    <>
                        <h2>{boardId}</h2>
                        <div>
                            <button onClick={titleEdit}><BsFillPencilFill className="icon"/></button>
                            <button onClick={categoryDrop}><BsFillTrashFill className="icon"/></button>
                        </div>
                    </>
                )
            }
        </TitleWrapper>
    )
}

export default BoardTitle;