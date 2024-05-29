import tippy from "tippy.js";
import 'tippy.js/dist/tippy.css';
import { getZIndex, store } from "../reducer/store";

/**
 * @author JHLEE
 * @class ModalState
 * @constructor
 * @classdesc
 */
export function ModalState(modalElem){
  // this.ROLE_CLOSE = '[data-role="close"]';
  this.body = document.querySelector('body');
  this.modal = modalElem;
  this.modalName = modalElem.dataset.name;
}

/**
 * @author JHLEE
 * @memberof ModalState
 * @function
 * @description Modal close event function. Define  what would do after user clicks 'close' button on the modal.
 */
// ModalState.prototype.setCloseEvent = function (callback, isReadOnly = false){
//   const closeBtns =  this.modal.querySelectorAll(this.ROLE_CLOSE);
//   closeBtns.forEach(btn => {
//     btn.addEventListener('click', e => {
//       e.preventDefault();
//       e.stopPropagation();

//       const common = baser.common;
//       common.deactive(this.modal);

//       //reset error alert
//       this.removeErrorEffect();

//       if(this.datastore && !isReadOnly){
//         //set html values with data store data
//         this.setInputValues();
//         this.deactiveApplyBtn && this.deactiveApplyBtn();
//         this.deactiveConfirmBtn();
//       }

//       callback && callback();

//       store.dispatch({ type: "current/reset"});
//       store.dispatch({ type: "modal/deactivate", name: this.modalName });

//     })
//   })
// }


/**
 * @author JHLEE
 * @memberof ModalState
 * @function
 * @description Update current modal information.
 */
ModalState.prototype.updateAsCurrent = function (_this){
  const zIndex = getZIndex();
  store.dispatch({ type: "modal/active", name: _this.modalName, zIndex });
  store.dispatch({ type: "current/active", name: _this.modalName, isModal: true });
}

/**
 * @author JHLEE
 * @memberof ModalState
 * @function
 * @description Update current clicked modal's z-index.
 */
ModalState.prototype.zIndexHandler = function(e, _this){
    e.stopPropagation();
    _this.updateAsCurrent(_this);
}

/**
 * @author JHLEE
 * @memberof ModalState
 * @function
 * @description Subscribe modal's status
 */
ModalState.prototype.subscribeState = function(){
  store.subscribe( () => {
    this.updateModalState();
  });
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
  
  if (!state.current.isModal) {
    return;
  }
  const update = state.modal[this.modalName];

  if(update.x){
    this.modal.style.left = `${update.x}px`;
  }

  if(update.y){
    this.modal.style.top = `${update.y}px`;
  }

  if(update.zIndex){
    this.modal.style.zIndex = update.zIndex;
  }
  
  if(update.width){
    this.modal.style.width = `${update.width}px`;
  }

  if(update.height){
    this.modal.style.height = `${update.height}px`;
  }
   
}


/**
 * @author JHLEE
 * @memberof ModalState
 * @function
 * @description Update current focused modal as none
 * @param {Event} e Event parameter
 */
ModalState.prototype.focusOutHandler = function (e){
    //if you use 'preventDefault' function of event param, some other function will not be triggered.
    e.stopPropagation();
    store.dispatch({ type: "current/active", name: null, isModal: false });
}


/**
 * @author JHLEE
 * @memberof ModalState
 * @function
 * @description Initialize all the modal events
 */
ModalState.prototype.init = function (){
  this.subscribeState();
  this.updateAsCurrent(this);
  //z index event
  this.modal.addEventListener('mousedown', e => this.zIndexHandler(e, this));
}

ModalState.prototype.initBody = function (){
  //modal fucus out event
  this.body.addEventListener("click", this.focusOutHandler);

}

