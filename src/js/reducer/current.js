
/**
 * currently activated modal / absMenu information
 * @param {*} state 
 * @param {*} action 
 * @returns null
 */

 export default function current(state = { name: "", isModal: "" }, action){
    switch(action.type){
        case "current/active":
            return { ...state, name: action.name, isModal: action.isModal };
        case "current/reset":
            return { ...state, name: null, isModal: false };
        default:
            return state;
    }
};
