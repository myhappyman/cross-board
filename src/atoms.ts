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

const localStorageEffect = (key: string) => ({ setSelf, onSet }: any) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
        setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: boolean) => {
        isReset ? localStorage.removeItem(key)
        : localStorage.setItem(key, JSON.stringify(newValue));
    });
};

const sessionStorageEffect = (key: string) => ({ setSelf, onSet }: any) => {
    const savedValue = sessionStorage.getItem(key);
    if (savedValue !== null) {
        setSelf(JSON.parse(savedValue));
    }
    onSet((newValue: any, _: any, isReset: any) => {
        const confirm = newValue.length === 0;
        confirm ? sessionStorage.removeItem(key)
        : sessionStorage.setItem(key, JSON.stringify(newValue));
    });
};

export const toDoState = atom<IToDoState>({
    key: "crossBoardToDo",
    default: {
        TODO: [],
        DOING: [],
        DONE: [],
    },
    effects: [
            localStorageEffect("crossBoardToDo"), 
            sessionStorageEffect("crossBoardToDo")
    ],
});