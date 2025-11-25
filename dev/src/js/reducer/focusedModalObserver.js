
/**
 * currently activated modal information
 * @param {*} state 
 * @param {*} action 
 * @returns null
 */

 export default function focusedModalObserver(state = { name: "" }, action){
    switch(action.type){
        case "focus":
            return { ...state, name: action.name };
        default:
            return state;
    }
};
