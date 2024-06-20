import { getZIndex, store } from "../reducer/store";

/**
 * @author JHLEE
 * @class ModalEvnt
 * @constructor
 * @classdesc
 */
export function ModalEvnt(modal){
  // this.ROLE_CLOSE = '[data-role="close"]';
  this.BTN_CLICK = {
    COLOR: '[data-click="color"]',
    RESTORE: '[data-click="restore"]',
    MAXIMIZE: '[data-click="maximize"]',
    CLOSE: '[data-click="close"]'
  };

  this.modal = modal;
  this.modalName = modal.dataset.name;
  this.unsubscribe = null;
  this.originInfo = {
    width: 0,
    height: 0,
    x: 0,
    y: 0
  };

}

ModalEvnt.prototype.maximizeEvent = function (){
    const maxBtn = this.modal.querySelector(this.BTN_CLICK.MAXIMIZE);
    maxBtn.addEventListener('click', e => {
      e.preventDefault();

      //store current size and position of the modal
      const state = store.getState();
      const modalInfo = state.modal[this.modalName];

      this.originInfo.width = modalInfo.width;
      this.originInfo.height = modalInfo.height;
      this.originInfo.x = modalInfo.x;
      this.originInfo.y = modalInfo.y;

      //hide and show buttons
      const btnContainer = maxBtn.parentElement;
      const restrBtn = btnContainer.querySelector(this.BTN_CLICK.RESTORE);
      restrBtn.classList.remove('d-none');
      maxBtn.classList.add('d-none');

      store.dispatch({ type: "modal/maximize", name: this.modalName });
      
    })
}

ModalEvnt.prototype.restoreEvent = function (){
    const restrBtn = this.modal.querySelector(this.BTN_CLICK.RESTORE);
    restrBtn.addEventListener('click', e => {
      e.preventDefault();

      //hide and show buttons
      const btnContainer = restrBtn.parentElement;
      const maxBtn = btnContainer.querySelector(this.BTN_CLICK.MAXIMIZE);
      maxBtn.classList.remove('d-none');
      restrBtn.classList.add('d-none');

      // store.dispatch({ type: "modal/restore", name: this.modalName });
      
      store.dispatch({ 
        type: "modal/update", 
        name: this.modalName, 
        x: this.originInfo.x, 
        y: this.originInfo.y, 
        width: this.originInfo.width, 
        height: this.originInfo.height 
    });
  })
}

/**
 * @author JHLEE
 * @memberof ModalEvnt
 * @function
 * @description Modal close event function. Define  what would do after user clicks 'close' button on the modal.
 */
ModalEvnt.prototype.closeEvent = function (){
    const btn = this.modal.querySelector(this.BTN_CLICK.CLOSE);
    btn.addEventListener('click', e => {
      e.preventDefault();

      //unsubscribe
      // unsubscribe();
      this.unsubscribe();
      
      //remove from redux store
      store.dispatch({ type: "modal/remove", name: this.modalName });
      store.dispatch({ type: "current/active", name: "" });
      
      //remove html
      this.modal.parentElement.removeChild(this.modal);
      // this = null;

    })
}


/**
 * @author JHLEE
 * @memberof ModalEvnt
 * @function
 * @description 
 */
ModalEvnt.prototype.zIndexEvent = function (){
    this.modal.addEventListener('mousedown', e => {
        e.stopPropagation();
        this.updateAsCurrent();
    });
}

/**
 * @author JHLEE
 * @memberof ModalEvnt
 * @function
 * @description Update current modal information.
 */
ModalEvnt.prototype.updateAsCurrent = function (){
    const zIndex = getZIndex();
    store.dispatch({ type: "modal/active", name: this.modalName, zIndex });
    store.dispatch({ type: "current/active", name: this.modalName });
  }



  

/**
 * @author JHLEE
 * @memberof ModalEvnt
 * @function
 * @description Update modal information by subscribing it
 * @param {Element} modal Target modal
 * @param {string} name The name of the modal
 */
ModalEvnt.prototype.updateModalState = function (){
  const state = store.getState();

  if(this.modalName !== state.current.name){
    return;
  }

  const info = state.modal[this.modalName];

  if(info.width){
    // this.modal.style.width = `${info.width}px`;
    this.modal.style.width = info.width;
  }

  if(info.height){
    // this.modal.style.height = `${info.height}px`;
    this.modal.style.height = info.height;
  }

  if(info.x || info.x === 0){
    // this.modal.style.left = `${info.x}px`;
    this.modal.style.left = info.x;
  }

  if(info.y || info.y === 0){
    // this.modal.style.top = `${info.y}px`;
    this.modal.style.top = info.y;
  }

  if(info.zIndex){
    this.modal.style.zIndex = info.zIndex;
  }

}

  /**
 * @author JHLEE
 * @memberof ModalEvnt
 * @function
 * @description 
 */
  ModalEvnt.prototype.subscribe = function (){
  this.unsubscribe = store.subscribe( () => {
    this.updateModalState();
  });

  return this.unsubscribe;
}


/**
 * @author JHLEE
 * @memberof ModalEvnt
 * @function
 * @description Initialize all the modal events
 */
// ModalEvnt.prototype.init = function (modal, unsubscribe){
ModalEvnt.prototype.init = function (){
  this.subscribe();
  this.updateAsCurrent();
  this.zIndexEvent();
  this.closeEvent();
  this.maximizeEvent();
  this.restoreEvent();
}
