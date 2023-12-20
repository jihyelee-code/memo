const modalInfo = {
    isResized: false,
    name: "",
    mousePosition: {},
    resizeTriggerProp: "",
}

export default function resizer( state = modalInfo, action ){
    switch(action.type){
        case "resize/start":
            return{
                isResized: true,
                name: action.name,
                mousePosition: action.mousePosition,
                resizeTriggerProp: action.resizeTriggerProp
            };
        case "resize/end":
            return {
                isResized: false,
                name: "",
                mousePosition: {},
                resizeTriggerProp: "",
            };
        default: return {...state};
    }
}