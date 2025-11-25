export default function modalResizeObserver( state = {
    isResized: false,
    name: "",
    mousePosition: {},
    resizeTriggerProp: "",
}, action ){
    switch(action.type){
        case "modalResizeObserver/start":
            return{
                isResized: true,
                name: action.name,
                mousePosition: action.mousePosition,
                resizeTriggerProp: action.resizeTriggerProp
            };
        case "modalResizeObserver/end":
            return {
                isResized: false,
                name: "",
                mousePosition: {},
                resizeTriggerProp: "",
            };
        default: return {...state};
    }
}