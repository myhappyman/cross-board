import {atom, selector} from "recoil";

interface IToDoState{
    //object형태로 key값은 string이고
    //그 key을 넣으면 string[]의 값이 나온다는 뜻으로 사용한다.
    [key:string]: string[]; 
}

export const toDoState = atom<IToDoState>({
    key: "toDo",
    default: {
        TODO: ["a", "b", "c"],
        DOING: ["d", "e",],
        DONE: ["f"],
    }
})