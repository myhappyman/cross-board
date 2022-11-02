import {atom, selector} from "recoil";

export const minuteState = atom({
    key: "minutes",
    default: 0
});

export const hourSelector = selector({
    key: "hour",
    get: ({get}) => {
        const minutes = get(minuteState);
        return Math.floor(minutes/60);
    }
});