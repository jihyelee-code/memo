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
    TABLE: '[data-click="table"]'
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


ButtonEvnt.prototype.maximizeEvent = function (){
    const maxBtn = this.modal.querySelector(this.BTN_CLICK.MAXIMIZE);
    maxBtn.addEventListener('click', e => {
      e.preventDefault();

      //store current size and position of the modal
      const state = _reducer_store__WEBPACK_IMPORTED_MODULE_0__.store.getState();
      const modalInfo = state.modal[this.modalName];

      this.originInfo.width = modalInfo.width;
      this.originInfo.height = modalInfo.height;
      this.originInfo.x = modalInfo.x;
      this.originInfo.y = modalInfo.y;

      //hide and show buttons
      const btnContainer = maxBtn.parentElement;
      const minimizeBtn = btnContainer.querySelector(this.BTN_CLICK.MINIMIZE);
      minimizeBtn.classList.remove('d-none');
      maxBtn.classList.add('d-none');

      _reducer_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch({ type: "modal/maximize", name: this.modalName });
      
    })
}

ButtonEvnt.prototype.minimizeEvent = function (){
    const minimizeBtn = this.modal.querySelector(this.BTN_CLICK.MINIMIZE);
    minimizeBtn.addEventListener('click', e => {
      e.preventDefault();

      //hide and show buttons
      const btnContainer = minimizeBtn.parentElement;
      const maxBtn = btnContainer.querySelector(this.BTN_CLICK.MAXIMIZE);
      maxBtn.classList.remove('d-none');
      minimizeBtn.classList.add('d-none');

      _reducer_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch({ 
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
      _reducer_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch({ type: "modal/remove", name: this.modalName });
      _reducer_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch({ type: "current/active", name: "" });
      
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
    _reducer_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch({ type: "modal/active", name: this.modalName, zIndex });
    _reducer_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch({ type: "current/active", name: this.modalName });
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

  if(this.modalName !== state.current.name){
    return;
  }

  const info = state.modal[this.modalName];

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
  this.maximizeEvent();
  this.minimizeEvent();
  this.bgColorEvent();
}


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("6d2ab7c6f76f020a2fea")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguZDc4MDQ5NjRiNzIyZWY0OTBkNGEuaG90LXVwZGF0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFvRDtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsZUFBZTtBQUNyRCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsaURBQUs7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLGlEQUFLLFlBQVksOENBQThDO0FBQ3JFO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxpREFBSztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxpREFBSyxZQUFZLDRDQUE0QztBQUNuRSxNQUFNLGlEQUFLLFlBQVksa0NBQWtDO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHlEQUFTO0FBQzVCLElBQUksaURBQUssWUFBWSxvREFBb0Q7QUFDekUsSUFBSSxpREFBSyxZQUFZLDhDQUE4QztBQUNuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0EsZ0JBQWdCLGlEQUFLO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixpREFBSztBQUMxQjtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztVQzVOQSIsInNvdXJjZXMiOlsid2VicGFjazovL21lbW8vLi9zcmMvanMvbW9kYWwvYnV0dG9uRXZudC5qcyIsIndlYnBhY2s6Ly9tZW1vL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRaSW5kZXgsIHN0b3JlIH0gZnJvbSBcIi4uL3JlZHVjZXIvc3RvcmVcIjtcclxuXHJcbi8qKlxyXG4gKiBAYXV0aG9yIEpITEVFXHJcbiAqIEBjbGFzcyBCdXR0b25Fdm50XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAY2xhc3NkZXNjXHJcbiAqL1xyXG5leHBvcnQgZnVuY3Rpb24gQnV0dG9uRXZudChtb2RhbCl7XHJcbiAgLy8gdGhpcy5ST0xFX0NMT1NFID0gJ1tkYXRhLXJvbGU9XCJjbG9zZVwiXSc7XHJcbiAgdGhpcy5CVE5fQ0xJQ0sgPSB7XHJcbiAgICBCR19DT0xPUjogJ1tpZD1cImJnQ29sb3JcIl0nLFxyXG4gICAgTUlOSU1JWkU6ICdbZGF0YS1jbGljaz1cIm1pbmltaXplXCJdJyxcclxuICAgIE1BWElNSVpFOiAnW2RhdGEtY2xpY2s9XCJtYXhpbWl6ZVwiXScsXHJcbiAgICBDTE9TRTogJ1tkYXRhLWNsaWNrPVwiY2xvc2VcIl0nLFxyXG4gICAgVEFCTEU6ICdbZGF0YS1jbGljaz1cInRhYmxlXCJdJ1xyXG4gIH07XHJcblxyXG4gIHRoaXMubW9kYWwgPSBtb2RhbDtcclxuICB0aGlzLm1vZGFsTmFtZSA9IG1vZGFsLmRhdGFzZXQubmFtZTtcclxuICB0aGlzLnVuc3Vic2NyaWJlID0gbnVsbDtcclxuICB0aGlzLm9yaWdpbkluZm8gPSB7XHJcbiAgICB3aWR0aDogXCIwcHhcIixcclxuICAgIGhlaWdodDogXCIwcHhcIixcclxuICAgIHg6IFwiMHB4XCIsXHJcbiAgICB5OiBcIjBweFwiXHJcbiAgfTtcclxuXHJcbn1cclxuXHJcbkJ1dHRvbkV2bnQucHJvdG90eXBlLnRhYmxlRXZlbnQgPSBmdW5jdGlvbiAoKXtcclxuICBjb25zdCB0YWJsZUJ0biA9IHRoaXMubW9kYWwucXVlcnlTZWxlY3Rvcih0aGlzLkJUTl9DTElDSy5UQUJMRSk7XHJcbiAgdGFibGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIC8vIGNvbnN0IHRhYmxlID0gbmV3IFRhYnVsYXRvcihgJHt0aGlzLm1vZGFsTmFtZX1fYClcclxuICB9KVxyXG59XHJcblxyXG5cclxuQnV0dG9uRXZudC5wcm90b3R5cGUuYmdDb2xvckV2ZW50ID0gZnVuY3Rpb24gKCl7XHJcbiAgY29uc3QgYmdDb2xvckJ0biA9IHRoaXMubW9kYWwucXVlcnlTZWxlY3Rvcih0aGlzLkJUTl9DTElDSy5CR19DT0xPUik7XHJcbiAgYmdDb2xvckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMubW9kYWwucXVlcnlTZWxlY3RvcignLmNhcmQtaGVhZGVyJykuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gZS50YXJnZXQudmFsdWU7XHJcbiAgfSlcclxufVxyXG5cclxuXHJcbkJ1dHRvbkV2bnQucHJvdG90eXBlLm1heGltaXplRXZlbnQgPSBmdW5jdGlvbiAoKXtcclxuICAgIGNvbnN0IG1heEJ0biA9IHRoaXMubW9kYWwucXVlcnlTZWxlY3Rvcih0aGlzLkJUTl9DTElDSy5NQVhJTUlaRSk7XHJcbiAgICBtYXhCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgLy9zdG9yZSBjdXJyZW50IHNpemUgYW5kIHBvc2l0aW9uIG9mIHRoZSBtb2RhbFxyXG4gICAgICBjb25zdCBzdGF0ZSA9IHN0b3JlLmdldFN0YXRlKCk7XHJcbiAgICAgIGNvbnN0IG1vZGFsSW5mbyA9IHN0YXRlLm1vZGFsW3RoaXMubW9kYWxOYW1lXTtcclxuXHJcbiAgICAgIHRoaXMub3JpZ2luSW5mby53aWR0aCA9IG1vZGFsSW5mby53aWR0aDtcclxuICAgICAgdGhpcy5vcmlnaW5JbmZvLmhlaWdodCA9IG1vZGFsSW5mby5oZWlnaHQ7XHJcbiAgICAgIHRoaXMub3JpZ2luSW5mby54ID0gbW9kYWxJbmZvLng7XHJcbiAgICAgIHRoaXMub3JpZ2luSW5mby55ID0gbW9kYWxJbmZvLnk7XHJcblxyXG4gICAgICAvL2hpZGUgYW5kIHNob3cgYnV0dG9uc1xyXG4gICAgICBjb25zdCBidG5Db250YWluZXIgPSBtYXhCdG4ucGFyZW50RWxlbWVudDtcclxuICAgICAgY29uc3QgbWluaW1pemVCdG4gPSBidG5Db250YWluZXIucXVlcnlTZWxlY3Rvcih0aGlzLkJUTl9DTElDSy5NSU5JTUlaRSk7XHJcbiAgICAgIG1pbmltaXplQnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xyXG4gICAgICBtYXhCdG4uY2xhc3NMaXN0LmFkZCgnZC1ub25lJyk7XHJcblxyXG4gICAgICBzdG9yZS5kaXNwYXRjaCh7IHR5cGU6IFwibW9kYWwvbWF4aW1pemVcIiwgbmFtZTogdGhpcy5tb2RhbE5hbWUgfSk7XHJcbiAgICAgIFxyXG4gICAgfSlcclxufVxyXG5cclxuQnV0dG9uRXZudC5wcm90b3R5cGUubWluaW1pemVFdmVudCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgY29uc3QgbWluaW1pemVCdG4gPSB0aGlzLm1vZGFsLnF1ZXJ5U2VsZWN0b3IodGhpcy5CVE5fQ0xJQ0suTUlOSU1JWkUpO1xyXG4gICAgbWluaW1pemVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgLy9oaWRlIGFuZCBzaG93IGJ1dHRvbnNcclxuICAgICAgY29uc3QgYnRuQ29udGFpbmVyID0gbWluaW1pemVCdG4ucGFyZW50RWxlbWVudDtcclxuICAgICAgY29uc3QgbWF4QnRuID0gYnRuQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IodGhpcy5CVE5fQ0xJQ0suTUFYSU1JWkUpO1xyXG4gICAgICBtYXhCdG4uY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XHJcbiAgICAgIG1pbmltaXplQnRuLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xyXG5cclxuICAgICAgc3RvcmUuZGlzcGF0Y2goeyBcclxuICAgICAgICB0eXBlOiBcIm1vZGFsL3VwZGF0ZVwiLCBcclxuICAgICAgICBuYW1lOiB0aGlzLm1vZGFsTmFtZSwgXHJcbiAgICAgICAgeDogdGhpcy5vcmlnaW5JbmZvLngsIFxyXG4gICAgICAgIHk6IHRoaXMub3JpZ2luSW5mby55LCBcclxuICAgICAgICB3aWR0aDogdGhpcy5vcmlnaW5JbmZvLndpZHRoLCBcclxuICAgICAgICBoZWlnaHQ6IHRoaXMub3JpZ2luSW5mby5oZWlnaHQgXHJcbiAgICB9KTtcclxuICB9KVxyXG59XHJcblxyXG4vKipcclxuICogQGF1dGhvciBKSExFRVxyXG4gKiBAbWVtYmVyb2YgQnV0dG9uRXZudFxyXG4gKiBAZnVuY3Rpb25cclxuICogQGRlc2NyaXB0aW9uIE1vZGFsIGNsb3NlIGV2ZW50IGZ1bmN0aW9uLiBEZWZpbmUgIHdoYXQgd291bGQgZG8gYWZ0ZXIgdXNlciBjbGlja3MgJ2Nsb3NlJyBidXR0b24gb24gdGhlIG1vZGFsLlxyXG4gKi9cclxuQnV0dG9uRXZudC5wcm90b3R5cGUuY2xvc2VFdmVudCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgY29uc3QgYnRuID0gdGhpcy5tb2RhbC5xdWVyeVNlbGVjdG9yKHRoaXMuQlROX0NMSUNLLkNMT1NFKTtcclxuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAvL3Vuc3Vic2NyaWJlXHJcbiAgICAgIC8vIHVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcclxuICAgICAgXHJcbiAgICAgIC8vcmVtb3ZlIGZyb20gcmVkdXggc3RvcmVcclxuICAgICAgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiBcIm1vZGFsL3JlbW92ZVwiLCBuYW1lOiB0aGlzLm1vZGFsTmFtZSB9KTtcclxuICAgICAgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiBcImN1cnJlbnQvYWN0aXZlXCIsIG5hbWU6IFwiXCIgfSk7XHJcbiAgICAgIFxyXG4gICAgICAvL3JlbW92ZSBodG1sXHJcbiAgICAgIHRoaXMubW9kYWwucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLm1vZGFsKTtcclxuICAgICAgLy8gdGhpcyA9IG51bGw7XHJcblxyXG4gICAgfSlcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBAYXV0aG9yIEpITEVFXHJcbiAqIEBtZW1iZXJvZiBCdXR0b25Fdm50XHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAZGVzY3JpcHRpb24gXHJcbiAqL1xyXG5CdXR0b25Fdm50LnByb3RvdHlwZS56SW5kZXhFdmVudCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdGhpcy5tb2RhbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBlID0+IHtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQXNDdXJyZW50KCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEBhdXRob3IgSkhMRUVcclxuICogQG1lbWJlcm9mIEJ1dHRvbkV2bnRcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBkZXNjcmlwdGlvbiBVcGRhdGUgY3VycmVudCBtb2RhbCBpbmZvcm1hdGlvbi5cclxuICovXHJcbkJ1dHRvbkV2bnQucHJvdG90eXBlLnVwZGF0ZUFzQ3VycmVudCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgY29uc3QgekluZGV4ID0gZ2V0WkluZGV4KCk7XHJcbiAgICBzdG9yZS5kaXNwYXRjaCh7IHR5cGU6IFwibW9kYWwvYWN0aXZlXCIsIG5hbWU6IHRoaXMubW9kYWxOYW1lLCB6SW5kZXggfSk7XHJcbiAgICBzdG9yZS5kaXNwYXRjaCh7IHR5cGU6IFwiY3VycmVudC9hY3RpdmVcIiwgbmFtZTogdGhpcy5tb2RhbE5hbWUgfSk7XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIFxyXG5cclxuLyoqXHJcbiAqIEBhdXRob3IgSkhMRUVcclxuICogQG1lbWJlcm9mIEJ1dHRvbkV2bnRcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBkZXNjcmlwdGlvbiBVcGRhdGUgbW9kYWwgaW5mb3JtYXRpb24gYnkgc3Vic2NyaWJpbmcgaXRcclxuICogQHBhcmFtIHtFbGVtZW50fSBtb2RhbCBUYXJnZXQgbW9kYWxcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIG1vZGFsXHJcbiAqL1xyXG5CdXR0b25Fdm50LnByb3RvdHlwZS51cGRhdGVNb2RhbFN0YXRlID0gZnVuY3Rpb24gKCl7XHJcbiAgY29uc3Qgc3RhdGUgPSBzdG9yZS5nZXRTdGF0ZSgpO1xyXG5cclxuICBpZih0aGlzLm1vZGFsTmFtZSAhPT0gc3RhdGUuY3VycmVudC5uYW1lKXtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIGNvbnN0IGluZm8gPSBzdGF0ZS5tb2RhbFt0aGlzLm1vZGFsTmFtZV07XHJcblxyXG4gIGlmKGluZm8ud2lkdGgpe1xyXG4gICAgdGhpcy5tb2RhbC5zdHlsZS53aWR0aCA9IGluZm8ud2lkdGg7XHJcbiAgfVxyXG5cclxuICBpZihpbmZvLmhlaWdodCl7XHJcbiAgICB0aGlzLm1vZGFsLnN0eWxlLmhlaWdodCA9IGluZm8uaGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgaWYoaW5mby54KXtcclxuICAgIHRoaXMubW9kYWwuc3R5bGUubGVmdCA9IGluZm8ueDtcclxuICB9XHJcblxyXG4gIGlmKGluZm8ueSl7XHJcbiAgICB0aGlzLm1vZGFsLnN0eWxlLnRvcCA9IGluZm8ueTtcclxuICB9XHJcblxyXG4gIGlmKGluZm8uekluZGV4KXtcclxuICAgIHRoaXMubW9kYWwuc3R5bGUuekluZGV4ID0gaW5mby56SW5kZXg7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuICAvKipcclxuICogQGF1dGhvciBKSExFRVxyXG4gKiBAbWVtYmVyb2YgQnV0dG9uRXZudFxyXG4gKiBAZnVuY3Rpb25cclxuICogQGRlc2NyaXB0aW9uIFxyXG4gKi9cclxuICBCdXR0b25Fdm50LnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKXtcclxuICB0aGlzLnVuc3Vic2NyaWJlID0gc3RvcmUuc3Vic2NyaWJlKCAoKSA9PiB7XHJcbiAgICB0aGlzLnVwZGF0ZU1vZGFsU3RhdGUoKTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHRoaXMudW5zdWJzY3JpYmU7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogQGF1dGhvciBKSExFRVxyXG4gKiBAbWVtYmVyb2YgQnV0dG9uRXZudFxyXG4gKiBAZnVuY3Rpb25cclxuICogQGRlc2NyaXB0aW9uIEluaXRpYWxpemUgYWxsIHRoZSBtb2RhbCBldmVudHNcclxuICovXHJcbi8vIEJ1dHRvbkV2bnQucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAobW9kYWwsIHVuc3Vic2NyaWJlKXtcclxuQnV0dG9uRXZudC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xyXG4gIHRoaXMuc3Vic2NyaWJlKCk7XHJcbiAgdGhpcy51cGRhdGVBc0N1cnJlbnQoKTtcclxuICB0aGlzLnpJbmRleEV2ZW50KCk7XHJcbiAgdGhpcy5jbG9zZUV2ZW50KCk7XHJcbiAgdGhpcy5tYXhpbWl6ZUV2ZW50KCk7XHJcbiAgdGhpcy5taW5pbWl6ZUV2ZW50KCk7XHJcbiAgdGhpcy5iZ0NvbG9yRXZlbnQoKTtcclxufVxyXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCI2ZDJhYjdjNmY3NmYwMjBhMmZlYVwiKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==