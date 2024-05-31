import { store } from "../reducer/store";

/**
 * @author JHLEE
 * @class ModalEvnt
 * @constructor
 * @classdesc
 */
export function ModalEvnt(modalElem){
  // this.ROLE_CLOSE = '[data-role="close"]';
  this.EVNT_CLICK = {
    COLOR: '[data-click="color"]',
    SIZED: '[data-click="sized"]',
    MAXIMIZE: '[data-click="maximize"]',
    CLOSE: '[data-click="close"]'
  };
  this.body = document.querySelector('body');
  this.modal = modalElem;
  this.modalName = modalElem.dataset.name;
}

/**
 * @author JHLEE
 * @memberof ModalEvnt
 * @function
 * @description Modal close event function. Define  what would do after user clicks 'close' button on the modal.
 */
ModalEvnt.prototype.closeEvent = function (){
    const btn = this.modal.querySelector(this.EVNT_CLICK.CLOSE);
    btn.addEventListener('click', e => {
      e.preventDefault();

      //remove html

      //remove from redux store
      store.dispatch({ type: "modal/remove", name: this.modalName });
      store.dispatch({ type: "current/active", name: "" });
      
    })
}


/**
 * @author JHLEE
 * @memberof ModalEvnt
 * @function
 * @description Initialize all the modal events
 */
ModalEvnt.prototype.init = function (){
    this.closeEvent();
}
