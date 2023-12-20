const draggableModal = {
    mouseOn: false,
    name: "",
    target: "",
    mousePosition: { x: 0, y: 0 }
};

/**
 * store for when user dragging a modal
 * @param {*} state 
 * @param {*} action 
 * @returns null
 */

export default function draggable(state = draggableModal, action){
    switch(action.type){
        case "draggable/start":
            return { 
                ...state, 
                mouseOn: true, 
                name: action.name, 
                mousePosition: { 
                    x: action.mousePosition.x, 
                    y: action.mousePosition.y
                } 
            };
        case "draggable/end":
            return { 
                ...state, 
                mouseOn: false 
            };
        default:
            return state;
    }
};