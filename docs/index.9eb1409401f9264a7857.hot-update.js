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
/* harmony import */ var _colorChanger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./colorChanger */ "./src/js/modal/colorChanger.js");



/**
 * @author JHLEE
 * @class ButtonEvnt
 * @constructor
 * @classdesc
 */
function ButtonEvnt(modal){
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
    const bgColor = e.target.value;
    const cardHeader = modal.querySelector('.card-header'); 
    cardHeader.style.backgroundColor = bgColor;
    
    const rgb = (0,_colorChanger__WEBPACK_IMPORTED_MODULE_1__.hexToRgb)(bgColor);
    let iconColor = null;
    if((0,_colorChanger__WEBPACK_IMPORTED_MODULE_1__.isDarkColor)(rgb.r, rgb.g, rgb.b)){
      iconColor = "#FFFFFF";
    }else{
      const black = { r: 0, g: 0, b: 0, a: 0 };
      const darkenedColor = (0,_colorChanger__WEBPACK_IMPORTED_MODULE_1__.makeDarkColor)(black, 40);
      iconColor = `rgb(${darkenedColor.r}, ${darkenedColor.g}, ${darkenedColor.b})`;
    }

    cardHeader.querySelectorAll('button').forEach ( each => {
      each.style.color = iconColor;
    })
  
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
      this.unsubscribe();
      
      //remove from redux store
      _reducer_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch({ type: "modalMutateObserver/delete", name: this.modalName });
      _reducer_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch({ type: "focus", name: "" });
      
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
/******/ 	__webpack_require__.h = () => ("efa863b8088bd851e29e")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguOWViMTQwOTQwMWY5MjY0YTc4NTcuaG90LXVwZGF0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBb0Q7QUFDa0I7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsZUFBZTtBQUN4RCxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHVEQUFRO0FBQ3hCO0FBQ0EsT0FBTywwREFBVztBQUNsQjtBQUNBLEtBQUs7QUFDTCxzQkFBc0I7QUFDdEIsNEJBQTRCLDREQUFhO0FBQ3pDLHlCQUF5QixnQkFBZ0IsSUFBSSxnQkFBZ0IsSUFBSSxnQkFBZ0I7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixpREFBSztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUUsaURBQUssWUFBWSw2REFBNkQ7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLGlEQUFLO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0saURBQUssWUFBWSwwREFBMEQ7QUFDakYsTUFBTSxpREFBSyxZQUFZLHlCQUF5QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix5REFBUztBQUM1QixJQUFJLGlEQUFLLFlBQVksa0VBQWtFO0FBQ3ZGLElBQUksaURBQUssWUFBWSxxQ0FBcUM7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBLGdCQUFnQixpREFBSztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsaURBQUs7QUFDMUI7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixpREFBSztBQUMvQjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOzs7Ozs7Ozs7VUNyUUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZW1vLy4vc3JjL2pzL21vZGFsL2J1dHRvbkV2bnQuanMiLCJ3ZWJwYWNrOi8vbWVtby93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0WkluZGV4LCBzdG9yZSB9IGZyb20gXCIuLi9yZWR1Y2VyL3N0b3JlXCI7XHJcbmltcG9ydCB7IGhleFRvUmdiLCBpc0RhcmtDb2xvciwgbWFrZURhcmtDb2xvciB9IGZyb20gXCIuL2NvbG9yQ2hhbmdlclwiO1xyXG5cclxuLyoqXHJcbiAqIEBhdXRob3IgSkhMRUVcclxuICogQGNsYXNzIEJ1dHRvbkV2bnRcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBjbGFzc2Rlc2NcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBCdXR0b25Fdm50KG1vZGFsKXtcclxuICAvLyB0aGlzLlJPTEVfQ0xPU0UgPSAnW2RhdGEtcm9sZT1cImNsb3NlXCJdJztcclxuICB0aGlzLkJUTl9DTElDSyA9IHtcclxuICAgIEJHX0NPTE9SOiAnW2RhdGEtY2xpY2s9XCJiZ0NvbG9yXCJdJyxcclxuICAgIE1JTklNSVpFOiAnW2RhdGEtY2xpY2s9XCJtaW5pbWl6ZVwiXScsXHJcbiAgICBNQVhJTUlaRTogJ1tkYXRhLWNsaWNrPVwibWF4aW1pemVcIl0nLFxyXG4gICAgQ0xPU0U6ICdbZGF0YS1jbGljaz1cImNsb3NlXCJdJyxcclxuICAgIC8vIFRBQkxFOiAnW2RhdGEtY2xpY2s9XCJ0YWJsZVwiXScsXHJcbiAgICBEUkFHOiAnW2RhdGEtY2xpY2s9XCJkcmFnXCJdJ1xyXG4gIH07XHJcblxyXG4gIHRoaXMubW9kYWwgPSBtb2RhbDtcclxuICB0aGlzLm1vZGFsTmFtZSA9IG1vZGFsLmRhdGFzZXQubmFtZTtcclxuICB0aGlzLnVuc3Vic2NyaWJlID0gbnVsbDtcclxuICB0aGlzLm9yaWdpbkluZm8gPSB7XHJcbiAgICB3aWR0aDogXCIwcHhcIixcclxuICAgIGhlaWdodDogXCIwcHhcIixcclxuICAgIHg6IFwiMHB4XCIsXHJcbiAgICB5OiBcIjBweFwiXHJcbiAgfTtcclxuXHJcbn1cclxuXHJcbi8vIEJ1dHRvbkV2bnQucHJvdG90eXBlLnRhYmxlRXZlbnQgPSBmdW5jdGlvbiAoKXtcclxuLy8gICBjb25zdCB0YWJsZUJ0biA9IHRoaXMubW9kYWwucXVlcnlTZWxlY3Rvcih0aGlzLkJUTl9DTElDSy5UQUJMRSk7XHJcbi8vICAgdGFibGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcclxuLy8gICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuLy8gICAgIC8vIGNvbnN0IHRhYmxlID0gbmV3IFRhYnVsYXRvcihgJHt0aGlzLm1vZGFsTmFtZX1fYClcclxuLy8gICB9KVxyXG4vLyB9XHJcblxyXG5cclxuQnV0dG9uRXZudC5wcm90b3R5cGUuYmdDb2xvckV2ZW50ID0gZnVuY3Rpb24gKCl7XHJcbiAgY29uc3QgYmdDb2xvckJ0biA9IHRoaXMubW9kYWwucXVlcnlTZWxlY3Rvcih0aGlzLkJUTl9DTElDSy5CR19DT0xPUik7XHJcbiAgY29uc3QgbW9kYWwgPSB0aGlzLm1vZGFsO1xyXG5cclxuXHJcblxyXG4gIGJnQ29sb3JCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBjb25zdCBiZ0NvbG9yID0gZS50YXJnZXQudmFsdWU7XHJcbiAgICBjb25zdCBjYXJkSGVhZGVyID0gbW9kYWwucXVlcnlTZWxlY3RvcignLmNhcmQtaGVhZGVyJyk7IFxyXG4gICAgY2FyZEhlYWRlci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBiZ0NvbG9yO1xyXG4gICAgXHJcbiAgICBjb25zdCByZ2IgPSBoZXhUb1JnYihiZ0NvbG9yKTtcclxuICAgIGxldCBpY29uQ29sb3IgPSBudWxsO1xyXG4gICAgaWYoaXNEYXJrQ29sb3IocmdiLnIsIHJnYi5nLCByZ2IuYikpe1xyXG4gICAgICBpY29uQ29sb3IgPSBcIiNGRkZGRkZcIjtcclxuICAgIH1lbHNle1xyXG4gICAgICBjb25zdCBibGFjayA9IHsgcjogMCwgZzogMCwgYjogMCwgYTogMCB9O1xyXG4gICAgICBjb25zdCBkYXJrZW5lZENvbG9yID0gbWFrZURhcmtDb2xvcihibGFjaywgNDApO1xyXG4gICAgICBpY29uQ29sb3IgPSBgcmdiKCR7ZGFya2VuZWRDb2xvci5yfSwgJHtkYXJrZW5lZENvbG9yLmd9LCAke2RhcmtlbmVkQ29sb3IuYn0pYDtcclxuICAgIH1cclxuXHJcbiAgICBjYXJkSGVhZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2J1dHRvbicpLmZvckVhY2ggKCBlYWNoID0+IHtcclxuICAgICAgZWFjaC5zdHlsZS5jb2xvciA9IGljb25Db2xvcjtcclxuICAgIH0pXHJcbiAgXHJcbiAgfSlcclxufVxyXG5cclxuXHJcblxyXG5CdXR0b25Fdm50LnByb3RvdHlwZS5tYXhpbWl6ZUV2ZW50ID0gZnVuY3Rpb24gKGUsIF90aGlzKXtcclxuICBjb25zdCBtYXhCdG4gPSBfdGhpcy5tb2RhbC5xdWVyeVNlbGVjdG9yKF90aGlzLkJUTl9DTElDSy5NQVhJTUlaRSk7XHJcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIC8vc3RvcmUgY3VycmVudCBzaXplIGFuZCBwb3NpdGlvbiBvZiB0aGUgbW9kYWxcclxuICBjb25zdCBzdGF0ZSA9IHN0b3JlLmdldFN0YXRlKCk7XHJcbiAgY29uc3QgbW9kYWxJbmZvID0gc3RhdGUubW9kYWxNdXRhdGVPYnNlcnZlcltfdGhpcy5tb2RhbE5hbWVdO1xyXG5cclxuICBfdGhpcy5vcmlnaW5JbmZvLndpZHRoID0gbW9kYWxJbmZvLndpZHRoO1xyXG4gIF90aGlzLm9yaWdpbkluZm8uaGVpZ2h0ID0gbW9kYWxJbmZvLmhlaWdodDtcclxuICBfdGhpcy5vcmlnaW5JbmZvLnggPSBtb2RhbEluZm8ueDtcclxuICBfdGhpcy5vcmlnaW5JbmZvLnkgPSBtb2RhbEluZm8ueTtcclxuXHJcbiAgLy9oaWRlIGFuZCBzaG93IGJ1dHRvbnNcclxuICBjb25zdCBidG5Db250YWluZXIgPSBtYXhCdG4ucGFyZW50RWxlbWVudDtcclxuICBjb25zdCBtaW5pbWl6ZUJ0biA9IGJ0bkNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKF90aGlzLkJUTl9DTElDSy5NSU5JTUlaRSk7XHJcbiAgbWluaW1pemVCdG4uY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XHJcbiAgbWF4QnRuLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xyXG5cclxuICBzdG9yZS5kaXNwYXRjaCh7IHR5cGU6IFwibW9kYWxNdXRhdGVPYnNlcnZlci9tYXhpbWl6ZVwiLCBuYW1lOiBfdGhpcy5tb2RhbE5hbWUgfSk7XHJcbiAgICBcclxufVxyXG5cclxuQnV0dG9uRXZudC5wcm90b3R5cGUubWluaW1pemVFdmVudCA9IGZ1bmN0aW9uIChlLCBfdGhpcyl7XHJcbiAgICBjb25zdCBtaW5pbWl6ZUJ0biA9IF90aGlzLm1vZGFsLnF1ZXJ5U2VsZWN0b3IoX3RoaXMuQlROX0NMSUNLLk1JTklNSVpFKTtcclxuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgLy9oaWRlIGFuZCBzaG93IGJ1dHRvbnNcclxuICAgICAgY29uc3QgYnRuQ29udGFpbmVyID0gbWluaW1pemVCdG4ucGFyZW50RWxlbWVudDtcclxuICAgICAgY29uc3QgbWF4QnRuID0gYnRuQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoX3RoaXMuQlROX0NMSUNLLk1BWElNSVpFKTtcclxuICAgICAgbWF4QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2Qtbm9uZScpO1xyXG4gICAgICBtaW5pbWl6ZUJ0bi5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcclxuXHJcbiAgICAgIHN0b3JlLmRpc3BhdGNoKHsgXHJcbiAgICAgICAgdHlwZTogXCJtb2RhbE11dGF0ZU9ic2VydmVyL3VwZGF0ZVwiLCBcclxuICAgICAgICBuYW1lOiBfdGhpcy5tb2RhbE5hbWUsIFxyXG4gICAgICAgIHg6IF90aGlzLm9yaWdpbkluZm8ueCwgXHJcbiAgICAgICAgeTogX3RoaXMub3JpZ2luSW5mby55LCBcclxuICAgICAgICB3aWR0aDogX3RoaXMub3JpZ2luSW5mby53aWR0aCwgXHJcbiAgICAgICAgaGVpZ2h0OiBfdGhpcy5vcmlnaW5JbmZvLmhlaWdodCBcclxuICAgIH0pO1xyXG59XHJcblxyXG4vKipcclxuICogQGF1dGhvciBKSExFRVxyXG4gKiBAbWVtYmVyb2YgQnV0dG9uRXZudFxyXG4gKiBAZnVuY3Rpb25cclxuICogQGRlc2NyaXB0aW9uIE1vZGFsIGNsb3NlIGV2ZW50IGZ1bmN0aW9uLiBEZWZpbmUgIHdoYXQgd291bGQgZG8gYWZ0ZXIgdXNlciBjbGlja3MgJ2Nsb3NlJyBidXR0b24gb24gdGhlIG1vZGFsLlxyXG4gKi9cclxuQnV0dG9uRXZudC5wcm90b3R5cGUuY2xvc2VFdmVudCA9IGZ1bmN0aW9uICgpe1xyXG4gICAgY29uc3QgYnRuID0gdGhpcy5tb2RhbC5xdWVyeVNlbGVjdG9yKHRoaXMuQlROX0NMSUNLLkNMT1NFKTtcclxuICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xyXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG5cclxuICAgICAgLy91bnN1YnNjcmliZVxyXG4gICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgIFxyXG4gICAgICAvL3JlbW92ZSBmcm9tIHJlZHV4IHN0b3JlXHJcbiAgICAgIHN0b3JlLmRpc3BhdGNoKHsgdHlwZTogXCJtb2RhbE11dGF0ZU9ic2VydmVyL2RlbGV0ZVwiLCBuYW1lOiB0aGlzLm1vZGFsTmFtZSB9KTtcclxuICAgICAgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiBcImZvY3VzXCIsIG5hbWU6IFwiXCIgfSk7XHJcbiAgICAgIFxyXG4gICAgICAvL3JlbW92ZSBodG1sXHJcbiAgICAgIHRoaXMubW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcImNhcmQtc2hvd1wiKTtcclxuXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMubW9kYWwuY2xhc3NMaXN0LmFkZCgnY2FyZC1oaWRlJyk7XHJcbiAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLm1vZGFsLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5tb2RhbCk7XHJcbiAgICAgIH0sIDEwMDApO1xyXG5cclxuICAgIH0pXHJcbn1cclxuXHJcblxyXG4vKipcclxuICogQGF1dGhvciBKSExFRVxyXG4gKiBAbWVtYmVyb2YgQnV0dG9uRXZudFxyXG4gKiBAZnVuY3Rpb25cclxuICogQGRlc2NyaXB0aW9uIFxyXG4gKi9cclxuQnV0dG9uRXZudC5wcm90b3R5cGUuekluZGV4RXZlbnQgPSBmdW5jdGlvbiAoKXtcclxuICAgIHRoaXMubW9kYWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgZSA9PiB7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUFzQ3VycmVudCgpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAYXV0aG9yIEpITEVFXHJcbiAqIEBtZW1iZXJvZiBCdXR0b25Fdm50XHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAZGVzY3JpcHRpb24gVXBkYXRlIGN1cnJlbnQgbW9kYWwgaW5mb3JtYXRpb24uXHJcbiAqL1xyXG5CdXR0b25Fdm50LnByb3RvdHlwZS51cGRhdGVBc0N1cnJlbnQgPSBmdW5jdGlvbiAoKXtcclxuICAgIGNvbnN0IHpJbmRleCA9IGdldFpJbmRleCgpO1xyXG4gICAgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiBcIm1vZGFsTXV0YXRlT2JzZXJ2ZXIvYWN0aXZlXCIsIG5hbWU6IHRoaXMubW9kYWxOYW1lLCB6SW5kZXggfSk7XHJcbiAgICBzdG9yZS5kaXNwYXRjaCh7IHR5cGU6IFwiZm9jdXNcIiwgbmFtZTogdGhpcy5tb2RhbE5hbWUgfSk7XHJcbiAgfVxyXG5cclxuXHJcblxyXG4gIFxyXG5cclxuLyoqXHJcbiAqIEBhdXRob3IgSkhMRUVcclxuICogQG1lbWJlcm9mIEJ1dHRvbkV2bnRcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBkZXNjcmlwdGlvbiBVcGRhdGUgbW9kYWwgaW5mb3JtYXRpb24gYnkgc3Vic2NyaWJpbmcgaXRcclxuICogQHBhcmFtIHtFbGVtZW50fSBtb2RhbCBUYXJnZXQgbW9kYWxcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIG1vZGFsXHJcbiAqL1xyXG5CdXR0b25Fdm50LnByb3RvdHlwZS51cGRhdGVNb2RhbFN0YXRlID0gZnVuY3Rpb24gKCl7XHJcbiAgY29uc3Qgc3RhdGUgPSBzdG9yZS5nZXRTdGF0ZSgpO1xyXG5cclxuICBpZih0aGlzLm1vZGFsTmFtZSAhPT0gc3RhdGUuZm9jdXNlZE1vZGFsT2JzZXJ2ZXIubmFtZSl7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICBjb25zdCBpbmZvID0gc3RhdGUubW9kYWxNdXRhdGVPYnNlcnZlclt0aGlzLm1vZGFsTmFtZV07XHJcblxyXG4gIGlmKGluZm8ud2lkdGgpe1xyXG4gICAgdGhpcy5tb2RhbC5zdHlsZS53aWR0aCA9IGluZm8ud2lkdGg7XHJcbiAgfVxyXG5cclxuICBpZihpbmZvLmhlaWdodCl7XHJcbiAgICB0aGlzLm1vZGFsLnN0eWxlLmhlaWdodCA9IGluZm8uaGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgaWYoaW5mby54KXtcclxuICAgIHRoaXMubW9kYWwuc3R5bGUubGVmdCA9IGluZm8ueDtcclxuICB9XHJcblxyXG4gIGlmKGluZm8ueSl7XHJcbiAgICB0aGlzLm1vZGFsLnN0eWxlLnRvcCA9IGluZm8ueTtcclxuICB9XHJcblxyXG4gIGlmKGluZm8uekluZGV4KXtcclxuICAgIHRoaXMubW9kYWwuc3R5bGUuekluZGV4ID0gaW5mby56SW5kZXg7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuICAvKipcclxuICogQGF1dGhvciBKSExFRVxyXG4gKiBAbWVtYmVyb2YgQnV0dG9uRXZudFxyXG4gKiBAZnVuY3Rpb25cclxuICogQGRlc2NyaXB0aW9uIFxyXG4gKi9cclxuICBCdXR0b25Fdm50LnByb3RvdHlwZS5zdWJzY3JpYmUgPSBmdW5jdGlvbiAoKXtcclxuICB0aGlzLnVuc3Vic2NyaWJlID0gc3RvcmUuc3Vic2NyaWJlKCAoKSA9PiB7XHJcbiAgICB0aGlzLnVwZGF0ZU1vZGFsU3RhdGUoKTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIHRoaXMudW5zdWJzY3JpYmU7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogQGF1dGhvciBKSExFRVxyXG4gKiBAbWVtYmVyb2YgQnV0dG9uRXZudFxyXG4gKiBAZnVuY3Rpb25cclxuICogQGRlc2NyaXB0aW9uIEluaXRpYWxpemUgYWxsIHRoZSBtb2RhbCBldmVudHNcclxuICovXHJcbi8vIEJ1dHRvbkV2bnQucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAobW9kYWwsIHVuc3Vic2NyaWJlKXtcclxuQnV0dG9uRXZudC5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uICgpe1xyXG4gIHRoaXMuc3Vic2NyaWJlKCk7XHJcbiAgdGhpcy51cGRhdGVBc0N1cnJlbnQoKTtcclxuICB0aGlzLnpJbmRleEV2ZW50KCk7XHJcbiAgdGhpcy5jbG9zZUV2ZW50KCk7XHJcbiAgLy8gdGhpcy5taW5pbWl6ZUV2ZW50KCk7XHJcbiAgdGhpcy5iZ0NvbG9yRXZlbnQoKTtcclxuICAvLyB0aGlzLm1heGltaXplRXZlbnQoKTtcclxuICB0aGlzLm1vZGFsLnF1ZXJ5U2VsZWN0b3IodGhpcy5CVE5fQ0xJQ0suTUlOSU1JWkUpXHJcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4gdGhpcy5taW5pbWl6ZUV2ZW50KGUsIHRoaXMpKTtcclxuICB0aGlzLm1vZGFsLnF1ZXJ5U2VsZWN0b3IodGhpcy5CVE5fQ0xJQ0suTUFYSU1JWkUpXHJcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4gdGhpcy5tYXhpbWl6ZUV2ZW50KGUsIHRoaXMpKTtcclxuICB0aGlzLm1vZGFsLnF1ZXJ5U2VsZWN0b3IodGhpcy5CVE5fQ0xJQ0suRFJBRylcclxuICAgICAgLmFkZEV2ZW50TGlzdGVuZXIoJ2RibGNsaWNrJywgZSA9PiB7XHJcbiAgICAgICAgY29uc3QgbW9kYWxJbmZvID0gc3RvcmUuZ2V0U3RhdGUoKS5tb2RhbE11dGF0ZU9ic2VydmVyW3RoaXMubW9kYWxOYW1lXTtcclxuICAgICAgICBpZihtb2RhbEluZm8ud2lkdGggPT09IFwiMTAwJVwiKXtcclxuICAgICAgICAgIHRoaXMubWluaW1pemVFdmVudChlLCB0aGlzKTtcclxuICAgICAgICAgIFxyXG4gICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgdGhpcy5tYXhpbWl6ZUV2ZW50KGUsIHRoaXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG59XHJcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcImVmYTg2M2I4MDg4YmQ4NTFlMjllXCIpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9