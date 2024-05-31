import { configureStore } from "@reduxjs/toolkit";
import current from "./current";
import draggable from "./draggable";
import modal from "./modal";
import resizer from "./resizer";
// import heightResizer from "./heightResizer";

export let store = configureStore({
    reducer: {
        modal,
        draggable,
        current,
        resizer,
    }
});

let z=0;
export function getZIndex(){
    z = z+1;
    return z;
}