import { NAV_HEIGHT } from "../app";

export default function mutate(state = {}, action) {
    // z = z+1;
    switch (action.type) {
        case "mutate/update":
            return {
                ...state, 
                [action.name]: {
                    name: action.name, 
                    x: action.x, 
                    y: action.y, 
                    width: action.width, 
                    height: action.height
                }
            };

        case "mutate/active":
            return { ...state, 
                [action.name]: { 
                    ...state[action.name], 
                    zIndex: action.zIndex 
                } };

        case "mutate/delete":
            const copiedState = {...state};
            delete copiedState[action.name];
            return copiedState;

        case "mutate/maximize":
            return { ...state, 
                [action.name]: { 
                    ...state[action.name], 
                    width: "100%",
                    height: `calc(100% - ${NAV_HEIGHT}px)`, 
                    x: `0px`, 
                    y: `${NAV_HEIGHT}px` 
                } };

        case "mutate/position":
            return { ...state, 
                [action.name]: { 
                    ...state[action.name], 
                    x: action.x, 
                    y: action.y 
                } };

        case "mutate/size":
            return { ...state, 
                [action.name]: { 
                    ...state[action.name], 
                    width: action.width, 
                    height: action.height 
                } };

        default:
            return { ...state };
    }
}