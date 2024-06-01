import { getZIndex, store } from "../reducer/store";

/**
 * @author JHLEE
 * @class ModalEvnt
 * @constructor
 * @classdesc
 */
export function ModalEvnt(){
  // this.ROLE_CLOSE = '[data-role="close"]';
  this.EVNT_CLICK = {
    COLOR: '[data-click="color"]',
    SIZED: '[data-click="sized"]',
    MAXIMIZE: '[data-click="maximize"]',
    CLOSE: '[data-click="close"]'
  };
//   this.body = document.querySelector('body');
}

ModalEvnt.prototype.maximizeEvent = function (modal){
    const btn = modal.querySelector(this.EVNT_CLICK.MAXIMIZE);
    btn.addEventListener('click', e => {
      e.preventDefault();

      store.dispatch({ type: "modal/maximize", name: modal.dataset.name });
      
    })
}

/**
 * @author JHLEE
 * @memberof ModalEvnt
 * @function
 * @description Modal close event function. Define  what would do after user clicks 'close' button on the modal.
 */
ModalEvnt.prototype.closeEvent = function (modal, unsubscribe){
    const btn = modal.querySelector(this.EVNT_CLICK.CLOSE);
    btn.addEventListener('click', e => {
      e.preventDefault();

      //unsubscribe
      unsubscribe();
      
      //remove from redux store
      store.dispatch({ type: "modal/remove", name: modal.dataset.name });
      store.dispatch({ type: "current/active", name: "" });
      
      //remove html
      modal.parentElement.removeChild(modal);
    })
}


/**
 * @author JHLEE
 * @memberof ModalEvnt
 * @function
 * @description 
 */
ModalEvnt.prototype.zIndexEvent = function (modal){
    modal.addEventListener('mousedown', e => {
        e.stopPropagation();
        this.updateAsCurrent(modal.dataset.name);
    });
}

/**
 * @author JHLEE
 * @memberof ModalEvnt
 * @function
 * @description Update current modal information.
 */
ModalEvnt.prototype.updateAsCurrent = function (name){
    const zIndex = getZIndex();
    store.dispatch({ type: "modal/active", name, zIndex });
    store.dispatch({ type: "current/active", name });
  }

/**
 * @author JHLEE
 * @memberof ModalEvnt
 * @function
 * @description Initialize all the modal events
 */
ModalEvnt.prototype.init = function (modal, unsubscribe){
    this.updateAsCurrent(modal.dataset.name);
    this.zIndexEvent(modal);
    this.closeEvent(modal, unsubscribe);
    this.maximizeEvent(modal);
}
