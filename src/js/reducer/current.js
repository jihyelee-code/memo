
/**
 * currently activated modal / absMenu information
 * @param {*} state 
 * @param {*} action 
 * @returns null
 */

 export default function current(state = { name: "" }, action){
    switch(action.type){
        case "current/active":
            return { ...state, name: action.name };
        default:
            return state;
    }
};
