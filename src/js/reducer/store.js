import { configureStore } from "@reduxjs/toolkit";
import active from "./active";
import dragndrop from "./dragndrop";
import mutate from "./mutate";
import resize from "./resize";

export let store = configureStore({
    reducer: {
        mutate,
        dragndrop,
        active,
        resize,
    }
});

let z=0;
export function getZIndex(){
    z = z+1;
    return z;
}