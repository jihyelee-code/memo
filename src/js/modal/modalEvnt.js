import { getZIndex, store } from "../reducer/store";

/**
 * @author JHLEE
 * @class ModalEvnt
 * @constructor
 * @classdesc
 */
export function ModalEvnt(){
  // this.ROLE_CLOSE = '[data-role="close"]';
  this.BTN_CLICK = {
    COLOR: '[data-click="color"]',
    RESTORE: '[data-click="restore"]',
    MAXIMIZE: '[data-click="maximize"]',
    CLOSE: '[data-click="close"]'
  };
//   this.body = document.querySelector('body');
}

ModalEvnt.prototype.maximizeEvent = function (modal){
    const maxBtn = modal.querySelector(this.BTN_CLICK.MAXIMIZE);
    maxBtn.addEventListener('click', e => {
      e.preventDefault();

      const parent = maxBtn.parentElement;
      const restrBtn = parent.querySelector(this.BTN_CLICK.RESTORE);
      restrBtn.classList.remove('d-none');
      maxBtn.classList.add('d-none');

      store.dispatch({ type: "modal/maximize", name: modal.dataset.name });
      
    })
}

ModalEvnt.prototype.restoreEvent = function (modal){
    const restrBtn = modal.querySelector(this.BTN_CLICK.RESTORE);
    restrBtn.addEventListener('click', e => {
      e.preventDefault();

      const parent = restrBtn.parentElement;
      const maxBtn = parent.querySelector(this.BTN_CLICK.MAXIMIZE);
      maxBtn.classList.remove('d-none');
      restrBtn.classList.add('d-none');

      store.dispatch({ type: "modal/restore", name: modal.dataset.name });
      
    })
}

/**
 * @author JHLEE
 * @memberof ModalEvnt
 * @function
 * @description Modal close event function. Define  what would do after user clicks 'close' button on the modal.
 */
ModalEvnt.prototype.closeEvent = function (modal, unsubscribe){
    const btn = modal.querySelector(this.BTN_CLICK.CLOSE);
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
    this.restoreEvent(modal);
}
