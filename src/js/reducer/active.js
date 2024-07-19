
/**
 * currently activated modal information
 * @param {*} state 
 * @param {*} action 
 * @returns null
 */

 export default function active(state = { name: "" }, action){
    switch(action.type){
        case "active":
            return { ...state, name: action.name };
        default:
            return state;
    }
};
