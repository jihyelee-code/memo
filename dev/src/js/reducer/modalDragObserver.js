
/**
 * store for when user drags a modal
 * @param {*} state 
 * @param {*} action 
 * @returns null
 */

export default function modalDragObserver(state = {
    mouseOn: false,
    name: "",
    target: "",
    mousePosition: { x: 0, y: 0 }
}, action){
    switch(action.type){
        case "modalDragObserver/start":
            return { 
                ...state, 
                mouseOn: true, 
                name: action.name, 
                mousePosition: { 
                    x: action.mousePosition.x, 
                    y: action.mousePosition.y
                } 
            };
        case "modalDragObserver/end":
            return { 
                ...state, 
                mouseOn: false 
            };
        default:
            return state;
    }
};