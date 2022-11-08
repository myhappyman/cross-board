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
        width: calc(100% - 50px);
        word-break: break-all;
    }
    div{
        width: 50px;
        text-align: center;
        border: none;
        padding-top: 8px;
        button{
            cursor: pointer;
            margin-left: 5px;
            width: 20px;
            text-align: center;
            border: none;
            .icon{
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
            // const copyBoards = {...allBoards}; // object복사
            // delete Object.assign(copyBoards, {[editTitle]: copyBoards[boardId] })[boardId];
            // // console.log(copyBoards);
            // return {
            //     ...copyBoards
            // }

            const newBoards = {} as IToDoState;
            Object.keys(allBoards).forEach(key => {
                console.log(key);
                if(key === boardId){
                    newBoards[editTitle] = allBoards[key];
                }else{
                    newBoards[key] = allBoards[key];
                }                
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