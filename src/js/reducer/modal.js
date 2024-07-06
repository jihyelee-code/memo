import { NAV_HEIGHT } from "../app";

export default function modal(state = {}, action) {
    // z = z+1;
    switch (action.type) {
        case "modal/active":
            return { ...state, 
                [action.name]: { 
                    ...state[action.name], 
                    zIndex: action.zIndex 
                } };

        case "modal/remove":
            const copiedState = {...state};
            delete copiedState[action.name];
            return copiedState;

        case "modal/maximize":
            return { ...state, 
                [action.name]: { 
                    ...state[action.name], 
                    width: "100%",
                    height: `calc(100% - ${NAV_HEIGHT}px)`, 
                    x: `0px`, 
                    y: `${NAV_HEIGHT}px` 
                } };

        case "modal/position":
            return { ...state, 
                [action.name]: { 
                    ...state[action.name], 
                    x: action.x ? action.x : "0px", 
                    y: action.y ? action.y : "0px" 
                } };

        case "modal/size":
            return { ...state, 
                [action.name]: { 
                    ...state[action.name], 
                    width: action.width, 
                    height: action.height 
                } };

        case "modal/update":
            return {
                ...state, 
                [action.name]: {
                    name: action.name, 
                    x: action.x, y: action.y, 
                    width: action.width, 
                    height: action.height
                }
            };

        default:
            return { ...state };
    }
}