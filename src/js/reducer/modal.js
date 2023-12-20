
export default function modal(state = {}, action) {
    // z = z+1;
    switch (action.type) {
        case "modal/active":
            return { ...state, [action.name]: { ...state[action.name], zIndex: action.zIndex, show: true, active: true } };


        case "modal/hide":
            return { ...state, [action.name]: { ...state[action.name], zIndex: action.zIndex, show: false, active: true } };

        case "modal/deactive":
            return { ...state, [action.name]: { ...state[action.name], show: false, active: false } };

        // case "modal/maximize":
        //     const height = "100%";
        //     const width = "100%";
        //     return { ...state, [action.name]: { ...state[action.name], zIndex, width, height, x: 0, y: 0 } };

        case "modal/position":
            return { ...state, 
                [action.name]: { 
                    ...state[action.name], 
                    // zIndex: action.zIndex, 
                    x: action.x ? action.x : 0, 
                    y: action.y ? action.y : 0 
                } };

        case "modal/size":
            return { ...state, 
                [action.name]: { 
                    ...state[action.name], 
                    zIndex: action.zIndex,
                    width: action.width, 
                    height: action.height 
                } };

        case "modal/update":
            return {
                ...state, 
                [action.name]: {
                    name: action.name, zIndex: action.zIndex,
                    x: action.x, y: action.y, 
                    width: action.width, height: action.height,
                    show: true,
                    active: true
                }
            };

        default:
            return { ...state };
    }
}