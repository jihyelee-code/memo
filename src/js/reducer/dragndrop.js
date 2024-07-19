
/**
 * store for when user drags a modal
 * @param {*} state 
 * @param {*} action 
 * @returns null
 */

export default function dragndrop(state = {
    mouseOn: false,
    name: "",
    target: "",
    mousePosition: { x: 0, y: 0 }
}, action){
    switch(action.type){
        case "dragndrop/start":
            return { 
                ...state, 
                mouseOn: true, 
                name: action.name, 
                mousePosition: { 
                    x: action.mousePosition.x, 
                    y: action.mousePosition.y
                } 
            };
        case "dragndrop/end":
            return { 
                ...state, 
                mouseOn: false 
            };
        default:
            return state;
    }
};