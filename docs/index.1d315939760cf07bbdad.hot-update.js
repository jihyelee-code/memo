"use strict";
self["webpackHotUpdatememo"]("index",{

/***/ "./src/js/modal/buttonEvnt.js":
/*!************************************!*\
  !*** ./src/js/modal/buttonEvnt.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ButtonEvnt: () => (/* binding */ ButtonEvnt)
/* harmony export */ });
/* harmony import */ var _reducer_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../reducer/store */ "./src/js/reducer/store.js");


/**
 * @author JHLEE
 * @class ButtonEvnt
 * @constructor
 * @classdesc
 */
function ButtonEvnt(modal){
  // this.ROLE_CLOSE = '[data-role="close"]';
  this.BTN_CLICK = {
    BG_COLOR: '[id="bgColor"]',
    MINIMIZE: '[data-click="minimize"]',
    MAXIMIZE: '[data-click="maximize"]',
    CLOSE: '[data-click="close"]',
    TABLE: '[data-click="table"]',
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

ButtonEvnt.prototype.tableEvent = function (){
  const tableBtn = this.modal.querySelector(this.BTN_CLICK.TABLE);
  tableBtn.addEventListener('click', e => {
    e.preventDefault();
    // const table = new Tabulator(`${this.modalName}_`)
  })
}


ButtonEvnt.prototype.bgColorEvent = function (){
  const bgColorBtn = this.modal.querySelector(this.BTN_CLICK.BG_COLOR);
  bgColorBtn.addEventListener('change', e => {
    e.preventDefault();
    this.modal.querySelector('.card-header').style.backgroundColor = e.target.value;
  })
}



ButtonEvnt.prototype.maximizeEvent = function (e, _this){
  const maxBtn = _this.modal.querySelector(_this.BTN_CLICK.MAXIMIZE);
  e.preventDefault();
  //store current size and position of the modal
  const state = _reducer_store__WEBPACK_IMPORTED_MODULE_0__.store.getState();
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

  _reducer_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch({ type: "modalMutateObserver/maximize", name: _this.modalName });
    
}

ButtonEvnt.prototype.minimizeEvent = function (e, _this){
    const minimizeBtn = _this.modal.querySelector(_this.BTN_CLICK.MINIMIZE);
      e.preventDefault();

      //hide and show buttons
      const btnContainer = minimizeBtn.parentElement;
      const maxBtn = btnContainer.querySelector(_this.BTN_CLICK.MAXIMIZE);
      maxBtn.classList.remove('d-none');
      minimizeBtn.classList.add('d-none');

      _reducer_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch({ 
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
      // unsubscribe();
      this.unsubscribe();
      
      //remove from redux store
      _reducer_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch({ type: "modalMutateObserver/delete", name: this.modalName });
      _reducer_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch({ type: "focus", name: "" });
      
      //remove html
      this.modal.parentElement.removeChild(this.modal);
      // this = null;

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
    const zIndex = (0,_reducer_store__WEBPACK_IMPORTED_MODULE_0__.getZIndex)();
    _reducer_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch({ type: "modalMutateObserver/active", name: this.modalName, zIndex });
    _reducer_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch({ type: "focus", name: this.modalName });
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
  const state = _reducer_store__WEBPACK_IMPORTED_MODULE_0__.store.getState();

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
  this.unsubscribe = _reducer_store__WEBPACK_IMPORTED_MODULE_0__.store.subscribe( () => {
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
        const modalInfo = _reducer_store__WEBPACK_IMPORTED_MODULE_0__.store.getState().modalMutateObserver[this.modalName];
        if(modalInfo.width === "100%"){
          this.minimizeEvent(e, this);
          
        }else{
          this.maximizeEvent(e, this);
        }
      });

}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("12c3d16080b8efdc857b")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguMWQzMTU5Mzk3NjBjZjA3YmJkYWQuaG90LXVwZGF0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFvRDtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxlQUFlO0FBQ3JELEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsaURBQUs7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLGlEQUFLLFlBQVksNkRBQTZEO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxpREFBSztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLGlEQUFLLFlBQVksMERBQTBEO0FBQ2pGLE1BQU0saURBQUssWUFBWSx5QkFBeUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIseURBQVM7QUFDNUIsSUFBSSxpREFBSyxZQUFZLGtFQUFrRTtBQUN2RixJQUFJLGlEQUFLLFlBQVkscUNBQXFDO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQSxnQkFBZ0IsaURBQUs7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLGlEQUFLO0FBQzFCO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsaURBQUs7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7Ozs7Ozs7O1VDeE9BIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWVtby8uL3NyYy9qcy9tb2RhbC9idXR0b25Fdm50LmpzIiwid2VicGFjazovL21lbW8vd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFpJbmRleCwgc3RvcmUgfSBmcm9tIFwiLi4vcmVkdWNlci9zdG9yZVwiO1xyXG5cclxuLyoqXHJcbiAqIEBhdXRob3IgSkhMRUVcclxuICogQGNsYXNzIEJ1dHRvbkV2bnRcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBjbGFzc2Rlc2NcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBCdXR0b25Fdm50KG1vZGFsKXtcclxuICAvLyB0aGlzLlJPTEVfQ0xPU0UgPSAnW2RhdGEtcm9sZT1cImNsb3NlXCJdJztcclxuICB0aGlzLkJUTl9DTElDSyA9IHtcclxuICAgIEJHX0NPTE9SOiAnW2lkPVwiYmdDb2xvclwiXScsXHJcbiAgICBNSU5JTUlaRTogJ1tkYXRhLWNsaWNrPVwibWluaW1pemVcIl0nLFxyXG4gICAgTUFYSU1JWkU6ICdbZGF0YS1jbGljaz1cIm1heGltaXplXCJdJyxcclxuICAgIENMT1NFOiAnW2RhdGEtY2xpY2s9XCJjbG9zZVwiXScsXHJcbiAgICBUQUJMRTogJ1tkYXRhLWNsaWNrPVwidGFibGVcIl0nLFxyXG4gICAgRFJBRzogJ1tkYXRhLWNsaWNrPVwiZHJhZ1wiXSdcclxuICB9O1xyXG5cclxuICB0aGlzLm1vZGFsID0gbW9kYWw7XHJcbiAgdGhpcy5tb2RhbE5hbWUgPSBtb2RhbC5kYXRhc2V0Lm5hbWU7XHJcbiAgdGhpcy51bnN1YnNjcmliZSA9IG51bGw7XHJcbiAgdGhpcy5vcmlnaW5JbmZvID0ge1xyXG4gICAgd2lkdGg6IFwiMHB4XCIsXHJcbiAgICBoZWlnaHQ6IFwiMHB4XCIsXHJcbiAgICB4OiBcIjBweFwiLFxyXG4gICAgeTogXCIwcHhcIlxyXG4gIH07XHJcblxyXG59XHJcblxyXG5CdXR0b25Fdm50LnByb3RvdHlwZS50YWJsZUV2ZW50ID0gZnVuY3Rpb24gKCl7XHJcbiAgY29uc3QgdGFibGVCdG4gPSB0aGlzLm1vZGFsLnF1ZXJ5U2VsZWN0b3IodGhpcy5CVE5fQ0xJQ0suVEFCTEUpO1xyXG4gIHRhYmxlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAvLyBjb25zdCB0YWJsZSA9IG5ldyBUYWJ1bGF0b3IoYCR7dGhpcy5tb2RhbE5hbWV9X2ApXHJcbiAgfSlcclxufVxyXG5cclxuXHJcbkJ1dHRvbkV2bnQucHJvdG90eXBlLmJnQ29sb3JFdmVudCA9IGZ1bmN0aW9uICgpe1xyXG4gIGNvbnN0IGJnQ29sb3JCdG4gPSB0aGlzLm1vZGFsLnF1ZXJ5U2VsZWN0b3IodGhpcy5CVE5fQ0xJQ0suQkdfQ09MT1IpO1xyXG4gIGJnQ29sb3JCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0aGlzLm1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5jYXJkLWhlYWRlcicpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gIH0pXHJcbn1cclxuXHJcblxyXG5cclxuQnV0dG9uRXZudC5wcm90b3R5cGUubWF4aW1pemVFdmVudCA9IGZ1bmN0aW9uIChlLCBfdGhpcyl7XHJcbiAgY29uc3QgbWF4QnRuID0gX3RoaXMubW9kYWwucXVlcnlTZWxlY3RvcihfdGhpcy5CVE5fQ0xJQ0suTUFYSU1JWkUpO1xyXG4gIGUucHJldmVudERlZmF1bHQoKTtcclxuICAvL3N0b3JlIGN1cnJlbnQgc2l6ZSBhbmQgcG9zaXRpb24gb2YgdGhlIG1vZGFsXHJcbiAgY29uc3Qgc3RhdGUgPSBzdG9yZS5nZXRTdGF0ZSgpO1xyXG4gIGNvbnN0IG1vZGFsSW5mbyA9IHN0YXRlLm1vZGFsTXV0YXRlT2JzZXJ2ZXJbX3RoaXMubW9kYWxOYW1lXTtcclxuXHJcbiAgX3RoaXMub3JpZ2luSW5mby53aWR0aCA9IG1vZGFsSW5mby53aWR0aDtcclxuICBfdGhpcy5vcmlnaW5JbmZvLmhlaWdodCA9IG1vZGFsSW5mby5oZWlnaHQ7XHJcbiAgX3RoaXMub3JpZ2luSW5mby54ID0gbW9kYWxJbmZvLng7XHJcbiAgX3RoaXMub3JpZ2luSW5mby55ID0gbW9kYWxJbmZvLnk7XHJcblxyXG4gIC8vaGlkZSBhbmQgc2hvdyBidXR0b25zXHJcbiAgY29uc3QgYnRuQ29udGFpbmVyID0gbWF4QnRuLnBhcmVudEVsZW1lbnQ7XHJcbiAgY29uc3QgbWluaW1pemVCdG4gPSBidG5Db250YWluZXIucXVlcnlTZWxlY3RvcihfdGhpcy5CVE5fQ0xJQ0suTUlOSU1JWkUpO1xyXG4gIG1pbmltaXplQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xyXG4gIG1heEJ0bi5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcclxuXHJcbiAgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiBcIm1vZGFsTXV0YXRlT2JzZXJ2ZXIvbWF4aW1pemVcIiwgbmFtZTogX3RoaXMubW9kYWxOYW1lIH0pO1xyXG4gICAgXHJcbn1cclxuXHJcbkJ1dHRvbkV2bnQucHJvdG90eXBlLm1pbmltaXplRXZlbnQgPSBmdW5jdGlvbiAoZSwgX3RoaXMpe1xyXG4gICAgY29uc3QgbWluaW1pemVCdG4gPSBfdGhpcy5tb2RhbC5xdWVyeVNlbGVjdG9yKF90aGlzLkJUTl9DTElDSy5NSU5JTUlaRSk7XHJcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgIC8vaGlkZSBhbmQgc2hvdyBidXR0b25zXHJcbiAgICAgIGNvbnN0IGJ0bkNvbnRhaW5lciA9IG1pbmltaXplQnRuLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgIGNvbnN0IG1heEJ0biA9IGJ0bkNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKF90aGlzLkJUTl9DTElDSy5NQVhJTUlaRSk7XHJcbiAgICAgIG1heEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcclxuICAgICAgbWluaW1pemVCdG4uY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XHJcblxyXG4gICAgICBzdG9yZS5kaXNwYXRjaCh7IFxyXG4gICAgICAgIHR5cGU6IFwibW9kYWxNdXRhdGVPYnNlcnZlci91cGRhdGVcIiwgXHJcbiAgICAgICAgbmFtZTogX3RoaXMubW9kYWxOYW1lLCBcclxuICAgICAgICB4OiBfdGhpcy5vcmlnaW5JbmZvLngsIFxyXG4gICAgICAgIHk6IF90aGlzLm9yaWdpbkluZm8ueSwgXHJcbiAgICAgICAgd2lkdGg6IF90aGlzLm9yaWdpbkluZm8ud2lkdGgsIFxyXG4gICAgICAgIGhlaWdodDogX3RoaXMub3JpZ2luSW5mby5oZWlnaHQgXHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBhdXRob3IgSkhMRUVcclxuICogQG1lbWJlcm9mIEJ1dHRvbkV2bnRcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBkZXNjcmlwdGlvbiBNb2RhbCBjbG9zZSBldmVudCBmdW5jdGlvbi4gRGVmaW5lICB3aGF0IHdvdWxkIGRvIGFmdGVyIHVzZXIgY2xpY2tzICdjbG9zZScgYnV0dG9uIG9uIHRoZSBtb2RhbC5cclxuICovXHJcbkJ1dHRvbkV2bnQucHJvdG90eXBlLmNsb3NlRXZlbnQgPSBmdW5jdGlvbiAoKXtcclxuICAgIGNvbnN0IGJ0biA9IHRoaXMubW9kYWwucXVlcnlTZWxlY3Rvcih0aGlzLkJUTl9DTElDSy5DTE9TRSk7XHJcbiAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgLy91bnN1YnNjcmliZVxyXG4gICAgICAvLyB1bnN1YnNjcmliZSgpO1xyXG4gICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIFxyXG4gICAgICAvL3JlbW92ZSBmcm9tIHJlZHV4IHN0b3JlXHJcbiAgICAgIHN0b3JlLmRpc3BhdGNoKHsgdHlwZTogXCJtb2RhbE11dGF0ZU9ic2VydmVyL2RlbGV0ZVwiLCBuYW1lOiB0aGlzLm1vZGFsTmFtZSB9KTtcclxuICAgICAgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiBcImZvY3VzXCIsIG5hbWU6IFwiXCIgfSk7XHJcbiAgICAgIFxyXG4gICAgICAvL3JlbW92ZSBodG1sXHJcbiAgICAgIHRoaXMubW9kYWwucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLm1vZGFsKTtcclxuICAgICAgLy8gdGhpcyA9IG51bGw7XHJcblxyXG4gICAgfSlcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBAYXV0aG9yIEpITEVFXHJcbiAqIEBtZW1iZXJvZiBCdXR0b25Fdm50XHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAZGVzY3JpcHRpb24gXHJcbiAqL1xyXG5CdXR0b25Fdm50LnByb3RvdHlwZS56SW5kZXhFdmVudCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdGhpcy5tb2RhbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBlID0+IHtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQXNDdXJyZW50KCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBhdXRob3IgSkhMRUVcclxuICogQG1lbWJlcm9mIEJ1dHRvbkV2bnRcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBkZXNjcmlwdGlvbiBVcGRhdGUgY3VycmVudCBtb2RhbCBpbmZvcm1hdGlvbi5cclxuICovXHJcbkJ1dHRvbkV2bnQucHJvdG90eXBlLnVwZGF0ZUFzQ3VycmVudCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgY29uc3QgekluZGV4ID0gZ2V0WkluZGV4KCk7XHJcbiAgICBzdG9yZS5kaXNwYXRjaCh7IHR5cGU6IFwibW9kYWxNdXRhdGVPYnNlcnZlci9hY3RpdmVcIiwgbmFtZTogdGhpcy5tb2RhbE5hbWUsIHpJbmRleCB9KTtcclxuICAgIHN0b3JlLmRpc3BhdGNoKHsgdHlwZTogXCJmb2N1c1wiLCBuYW1lOiB0aGlzLm1vZGFsTmFtZSB9KTtcclxuICB9XHJcblxyXG5cclxuXHJcbiAgXHJcblxyXG4vKipcclxuICogQGF1dGhvciBKSExFRVxyXG4gKiBAbWVtYmVyb2YgQnV0dG9uRXZudFxyXG4gKiBAZnVuY3Rpb25cclxuICogQGRlc2NyaXB0aW9uIFVwZGF0ZSBtb2RhbCBpbmZvcm1hdGlvbiBieSBzdWJzY3JpYmluZyBpdFxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IG1vZGFsIFRhcmdldCBtb2RhbFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgbW9kYWxcclxuICovXHJcbkJ1dHRvbkV2bnQucHJvdG90eXBlLnVwZGF0ZU1vZGFsU3RhdGUgPSBmdW5jdGlvbiAoKXtcclxuICBjb25zdCBzdGF0ZSA9IHN0b3JlLmdldFN0YXRlKCk7XHJcblxyXG4gIGlmKHRoaXMubW9kYWxOYW1lICE9PSBzdGF0ZS5mb2N1c2VkTW9kYWxPYnNlcnZlci5uYW1lKXtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGNvbnN0IGluZm8gPSBzdGF0ZS5tb2RhbE11dGF0ZU9ic2VydmVyW3RoaXMubW9kYWxOYW1lXTtcclxuXHJcbiAgaWYoaW5mby53aWR0aCl7XHJcbiAgICB0aGlzLm1vZGFsLnN0eWxlLndpZHRoID0gaW5mby53aWR0aDtcclxuICB9XHJcblxyXG4gIGlmKGluZm8uaGVpZ2h0KXtcclxuICAgIHRoaXMubW9kYWwuc3R5bGUuaGVpZ2h0ID0gaW5mby5oZWlnaHQ7XHJcbiAgfVxyXG5cclxuICBpZihpbmZvLngpe1xyXG4gICAgdGhpcy5tb2RhbC5zdHlsZS5sZWZ0ID0gaW5mby54O1xyXG4gIH1cclxuXHJcbiAgaWYoaW5mby55KXtcclxuICAgIHRoaXMubW9kYWwuc3R5bGUudG9wID0gaW5mby55O1xyXG4gIH1cclxuXHJcbiAgaWYoaW5mby56SW5kZXgpe1xyXG4gICAgdGhpcy5tb2RhbC5zdHlsZS56SW5kZXggPSBpbmZvLnpJbmRleDtcclxuICB9XHJcblxyXG59XHJcblxyXG4gIC8qKlxyXG4gKiBAYXV0aG9yIEpITEVFXHJcbiAqIEBtZW1iZXJvZiBCdXR0b25Fdm50XHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAZGVzY3JpcHRpb24gXHJcbiAqL1xyXG4gIEJ1dHRvbkV2bnQucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpe1xyXG4gIHRoaXMudW5zdWJzY3JpYmUgPSBzdG9yZS5zdWJzY3JpYmUoICgpID0+IHtcclxuICAgIHRoaXMudXBkYXRlTW9kYWxTdGF0ZSgpO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gdGhpcy51bnN1YnNjcmliZTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBAYXV0aG9yIEpITEVFXHJcbiAqIEBtZW1iZXJvZiBCdXR0b25Fdm50XHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAZGVzY3JpcHRpb24gSW5pdGlhbGl6ZSBhbGwgdGhlIG1vZGFsIGV2ZW50c1xyXG4gKi9cclxuLy8gQnV0dG9uRXZudC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChtb2RhbCwgdW5zdWJzY3JpYmUpe1xyXG5CdXR0b25Fdm50LnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gKCl7XHJcbiAgdGhpcy5zdWJzY3JpYmUoKTtcclxuICB0aGlzLnVwZGF0ZUFzQ3VycmVudCgpO1xyXG4gIHRoaXMuekluZGV4RXZlbnQoKTtcclxuICB0aGlzLmNsb3NlRXZlbnQoKTtcclxuICAvLyB0aGlzLm1pbmltaXplRXZlbnQoKTtcclxuICB0aGlzLmJnQ29sb3JFdmVudCgpO1xyXG4gIC8vIHRoaXMubWF4aW1pemVFdmVudCgpO1xyXG4gIHRoaXMubW9kYWwucXVlcnlTZWxlY3Rvcih0aGlzLkJUTl9DTElDSy5NSU5JTUlaRSlcclxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB0aGlzLm1pbmltaXplRXZlbnQoZSwgdGhpcykpO1xyXG4gIHRoaXMubW9kYWwucXVlcnlTZWxlY3Rvcih0aGlzLkJUTl9DTElDSy5NQVhJTUlaRSlcclxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB0aGlzLm1heGltaXplRXZlbnQoZSwgdGhpcykpO1xyXG4gIHRoaXMubW9kYWwucXVlcnlTZWxlY3Rvcih0aGlzLkJUTl9DTElDSy5EUkFHKVxyXG4gICAgICAuYWRkRXZlbnRMaXN0ZW5lcignZGJsY2xpY2snLCBlID0+IHtcclxuICAgICAgICBjb25zdCBtb2RhbEluZm8gPSBzdG9yZS5nZXRTdGF0ZSgpLm1vZGFsTXV0YXRlT2JzZXJ2ZXJbdGhpcy5tb2RhbE5hbWVdO1xyXG4gICAgICAgIGlmKG1vZGFsSW5mby53aWR0aCA9PT0gXCIxMDAlXCIpe1xyXG4gICAgICAgICAgdGhpcy5taW5pbWl6ZUV2ZW50KGUsIHRoaXMpO1xyXG4gICAgICAgICAgXHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICB0aGlzLm1heGltaXplRXZlbnQoZSwgdGhpcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KTtcclxuXHJcbn1cclxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiMTJjM2QxNjA4MGI4ZWZkYzg1N2JcIikiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=