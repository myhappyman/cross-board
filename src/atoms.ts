import {atom, selector} from "recoil";

export interface ITodo {
    id: number;
    text: string;
}

interface IToDoState{
    //object형태로 key값은 string이고
    //그 key을 넣으면 string[]의 값이 나온다는 뜻으로 사용한다.
    [key:string]: ITodo[]; 
}

export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        TODO: [],
        DOING: [],
        DONE: [],
    }
})