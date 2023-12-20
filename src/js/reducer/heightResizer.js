const modalInfo = {
    isResized: false,
    name: "",
    height: "",
    mousePosition: {
        x: "",
        y: ""
    },

}

export default function heightResizer( state = modalInfo, action ){
    
    switch(action.type){
        case "resizeHeight/start":
            return{
                ...state,
                isResized: true,
                name: action.name,
                height: action.height,
                mousePosition: action.mousePosition
            };
        case "resizeHeight/end":
            return {
                ...state,
                isResized: false,
                name: "",
                height: "",
                mousePosition: {
                    x: "",
                    y: ""
                }
            };
        case "resizeHeight/update":
            return{
                ...state,
                height: action.height,
                mousePosition: action.mousePosition
            }
        default: 
            return {...state};
    }
}