import { configureStore } from "@reduxjs/toolkit";
import focusedModalObserver from "./focusedModalObserver";
import modalDragObserver from "./modalDragObserver";
import modalMutateObserver from "./modalMutateObserver";
import modalResizeObserver from "./modalResizeObserver";

export let store = configureStore({
    reducer: {
        modalMutateObserver,
        modalDragObserver,
        focusedModalObserver,
        modalResizeObserver,
    }
});

let z=0;
export function getZIndex(){
    z = z+1;
    return z;
}