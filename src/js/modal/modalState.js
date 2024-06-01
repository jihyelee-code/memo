import tippy from "tippy.js";
import 'tippy.js/dist/tippy.css';
import { store } from "../reducer/store";

/**
 * @author JHLEE
 * @class ModalState
 * @constructor
 * @classdesc
 */
export function ModalState(modal){
  this.body = document.querySelector('body');
  this.modal = modal;
  this.modalName = modal.dataset.name;
  this.unsubscribe = null;
  this.origin = {
    size: {
      width: 0,
      height: 0
    },
    position: {
      x: 0,
      y: 0
    }
  };

}


/**
 * @author JHLEE
 * @memberof ModalState
 * @function
 * @description Update modal information by subscribing it
 * @param {Element} modal Target modal
 * @param {string} name The name of the modal
 */
ModalState.prototype.updateModalState = function (){
  const state = store.getState();
  
  if(this.modalName !== state.current.name){
    return;
  }

  const update = state.modal[this.modalName];

  //in case of maximize, save the current information of the modal
  if(typeof update.width === "string" && typeof update.height === "string"){
    this.origin.width = this.modal.style.width;
    this.origin.height = this.modal.style.height;
    this.origin.x = this.modal.style.left;
    this.origin.y = this.modal.style.top;

    this.modal.style.width = update.width;
    this.modal.style.height = update.height;
    this.modal.style.left = 0;
    this.modal.style.top = 0;
    return;
  }

  if(update.width){
    this.modal.style.width = `${update.width}px`;
  }

  if(update.height){
    this.modal.style.height = `${update.height}px`;
  }

  if(update.x || update.x === 0){
    this.modal.style.left = `${update.x}px`;
  }

  if(update.y || update.y === 0){
    this.modal.style.top = `${update.y}px`;
  }

  if(update.zIndex){
    this.modal.style.zIndex = update.zIndex;
  }
  
}


/**
 * @author JHLEE
 * @memberof ModalState
 * @function
 * @description 
 */
ModalState.prototype.init = function (){
  this.unsubscribe = store.subscribe( () => {
    this.updateModalState();
  });

  return this.unsubscribe;
}
