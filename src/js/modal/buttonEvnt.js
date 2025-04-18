import { getZIndex, store } from "../reducer/store";

/**
 * @author JHLEE
 * @class ButtonEvnt
 * @constructor
 * @classdesc
 */
export function ButtonEvnt(modal){
  // this.ROLE_CLOSE = '[data-role="close"]';
  this.BTN_CLICK = {
    BG_COLOR: '[data-click="bgColor"]',
    MINIMIZE: '[data-click="minimize"]',
    MAXIMIZE: '[data-click="maximize"]',
    CLOSE: '[data-click="close"]',
    // TABLE: '[data-click="table"]',
    DRAG: '[data-click="drag"]'
  };

  this.modal = modal;
  this.modalName = modal.dataset.name;
  this.unsubscribe = null;
  this.originInfo = {
    width: "0px",
    height: "0px",
    x: "0px",
    y: "0px"
  };

}

// ButtonEvnt.prototype.tableEvent = function (){
//   const tableBtn = this.modal.querySelector(this.BTN_CLICK.TABLE);
//   tableBtn.addEventListener('click', e => {
//     e.preventDefault();
//     // const table = new Tabulator(`${this.modalName}_`)
//   })
// }


ButtonEvnt.prototype.bgColorEvent = function (){
  const bgColorBtn = this.modal.querySelector(this.BTN_CLICK.BG_COLOR);
  const modal = this.modal;
  bgColorBtn.addEventListener('change', e => {
    e.preventDefault();
    modal.querySelector('.card-header').style.backgroundColor = e.target.value;
  })
}



ButtonEvnt.prototype.maximizeEvent = function (e, _this){
  const maxBtn = _this.modal.querySelector(_this.BTN_CLICK.MAXIMIZE);
  e.preventDefault();
  //store current size and position of the modal
  const state = store.getState();
  const modalInfo = state.modalMutateObserver[_this.modalName];

  _this.originInfo.width = modalInfo.width;
  _this.originInfo.height = modalInfo.height;
  _this.originInfo.x = modalInfo.x;
  _this.originInfo.y = modalInfo.y;

  //hide and show buttons
  const btnContainer = maxBtn.parentElement;
  const minimizeBtn = btnContainer.querySelector(_this.BTN_CLICK.MINIMIZE);
  minimizeBtn.classList.remove('d-none');
  maxBtn.classList.add('d-none');

  store.dispatch({ type: "modalMutateObserver/maximize", name: _this.modalName });
    
}

ButtonEvnt.prototype.minimizeEvent = function (e, _this){
    const minimizeBtn = _this.modal.querySelector(_this.BTN_CLICK.MINIMIZE);
      e.preventDefault();

      //hide and show buttons
      const btnContainer = minimizeBtn.parentElement;
      const maxBtn = btnContainer.querySelector(_this.BTN_CLICK.MAXIMIZE);
      maxBtn.classList.remove('d-none');
      minimizeBtn.classList.add('d-none');

      store.dispatch({ 
        type: "modalMutateObserver/update", 
        name: _this.modalName, 
        x: _this.originInfo.x, 
        y: _this.originInfo.y, 
        width: _this.originInfo.width, 
        height: _this.originInfo.height 
    });
}

/**
 * @author JHLEE
 * @memberof ButtonEvnt
 * @function
 * @description Modal close event function. Define  what would do after user clicks 'close' button on the modal.
 */
ButtonEvnt.prototype.closeEvent = function (){
    const btn = this.modal.querySelector(this.BTN_CLICK.CLOSE);
    btn.addEventListener('click', e => {
      e.preventDefault();


      //unsubscribe
      this.unsubscribe();
      
      //remove from redux store
      store.dispatch({ type: "modalMutateObserver/delete", name: this.modalName });
      store.dispatch({ type: "focus", name: "" });
      
      //remove html
      this.modal.classList.remove("card-show");

      setTimeout(() => {
        this.modal.classList.add('card-hide');
      }, 100);

      setTimeout(() => {
        this.modal.parentElement.removeChild(this.modal);
      }, 1000);

    })
}


/**
 * @author JHLEE
 * @memberof ButtonEvnt
 * @function
 * @description 
 */
ButtonEvnt.prototype.zIndexEvent = function (){
    this.modal.addEventListener('mousedown', e => {
        e.stopPropagation();
        this.updateAsCurrent();
    });
}

/**
 * @author JHLEE
 * @memberof ButtonEvnt
 * @function
 * @description Update current modal information.
 */
ButtonEvnt.prototype.updateAsCurrent = function (){
    const zIndex = getZIndex();
    store.dispatch({ type: "modalMutateObserver/active", name: this.modalName, zIndex });
    store.dispatch({ type: "focus", name: this.modalName });
  }



  

/**
 * @author JHLEE
 * @memberof ButtonEvnt
 * @function
 * @description Update modal information by subscribing it
 * @param {Element} modal Target modal
 * @param {string} name The name of the modal
 */
ButtonEvnt.prototype.updateModalState = function (){
  const state = store.getState();

  if(this.modalName !== state.focusedModalObserver.name){
    return;
  }

  const info = state.modalMutateObserver[this.modalName];

  if(info.width){
    this.modal.style.width = info.width;
  }

  if(info.height){
    this.modal.style.height = info.height;
  }

  if(info.x){
    this.modal.style.left = info.x;
  }

  if(info.y){
    this.modal.style.top = info.y;
  }

  if(info.zIndex){
    this.modal.style.zIndex = info.zIndex;
  }

}

  /**
 * @author JHLEE
 * @memberof ButtonEvnt
 * @function
 * @description 
 */
  ButtonEvnt.prototype.subscribe = function (){
  this.unsubscribe = store.subscribe( () => {
    this.updateModalState();
  });

  return this.unsubscribe;
}


/**
 * @author JHLEE
 * @memberof ButtonEvnt
 * @function
 * @description Initialize all the modal events
 */
// ButtonEvnt.prototype.init = function (modal, unsubscribe){
ButtonEvnt.prototype.init = function (){
  this.subscribe();
  this.updateAsCurrent();
  this.zIndexEvent();
  this.closeEvent();
  // this.minimizeEvent();
  this.bgColorEvent();
  // this.maximizeEvent();
  this.modal.querySelector(this.BTN_CLICK.MINIMIZE)
      .addEventListener('click', e => this.minimizeEvent(e, this));
  this.modal.querySelector(this.BTN_CLICK.MAXIMIZE)
      .addEventListener('click', e => this.maximizeEvent(e, this));
  this.modal.querySelector(this.BTN_CLICK.DRAG)
      .addEventListener('dblclick', e => {
        const modalInfo = store.getState().modalMutateObserver[this.modalName];
        if(modalInfo.width === "100%"){
          this.minimizeEvent(e, this);
          
        }else{
          this.maximizeEvent(e, this);
        }
      });

}
