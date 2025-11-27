"use strict";
self["webpackHotUpdatememo"]("index",{

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NAV_HEIGHT: () => (/* binding */ NAV_HEIGHT)
/* harmony export */ });
/* harmony import */ var _modal_resize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal/resize */ "./src/js/modal/resize.js");
/* harmony import */ var _modal_buttonEvnt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modal/buttonEvnt */ "./src/js/modal/buttonEvnt.js");
/* harmony import */ var _reducer_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./reducer/store */ "./src/js/reducer/store.js");




const { MemoCreator } = __webpack_require__(/*! ./creator/memoCreator */ "./src/js/creator/memoCreator.js");
const { DragnDrop } = __webpack_require__(/*! ./modal/dragndrop */ "./src/js/modal/dragndrop.js");

// require.context("../image", true);

const NAV_HEIGHT = 40;


function Memo (){
    this.NEW_MEMO = "newMemo";
    this.memoCnt = 0;
    this.dragnDrop = null;
    this.resize = null;
    this.mv = null;
}


Memo.prototype.newMemoHandler = function(_this){
    //create a memo box through MemoCreator
    const wall = document.querySelector('#wall');
    const creator = new MemoCreator(_this.memoCnt, wall);
    const memoElems = creator.init();

    const buttonEvent = new _modal_buttonEvnt__WEBPACK_IMPORTED_MODULE_1__.ButtonEvnt(memoElems.container);
    buttonEvent.init();
    _this.dragnDrop.init(memoElems.header.querySelector('[data-click="drag"]'));
    _this.resize.init(memoElems.container);

    _this.memoCnt++;

    return null;
}

Memo.prototype.init = function(){
    //add new memo
    const newMemoBtn = document.querySelector(`[evnt="${this.NEW_MEMO}"]`);
    newMemoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.newMemoHandler(this);

    });
    
    this.dragnDrop = new DragnDrop();
    this.dragnDrop.bodyEvnts();

    this.resize = new _modal_resize__WEBPACK_IMPORTED_MODULE_0__.Resize();
    this.resize.subscribe();

    return this;
}

const memo = new Memo();
memo.init();


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("f442969a47b703f0ac72")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguMDY3MGRlYzVkMTI5MTViNDExZTguaG90LXVwZGF0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQXdDO0FBQ1E7QUFDUjtBQUN4QztBQUNBLFFBQVEsY0FBYyxFQUFFLG1CQUFPLENBQUMsOERBQXVCO0FBQ3ZELFFBQVEsWUFBWSxFQUFFLG1CQUFPLENBQUMsc0RBQW1CO0FBQ2pEO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0Qix5REFBVTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELGNBQWM7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsaURBQU07QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztVQ3hEQSIsInNvdXJjZXMiOlsid2VicGFjazovL21lbW8vLi9zcmMvanMvYXBwLmpzIiwid2VicGFjazovL21lbW8vd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlc2l6ZSB9IGZyb20gXCIuL21vZGFsL3Jlc2l6ZVwiO1xyXG5pbXBvcnQgeyBCdXR0b25Fdm50IH0gZnJvbSBcIi4vbW9kYWwvYnV0dG9uRXZudFwiO1xyXG5pbXBvcnQgeyBzdG9yZSB9IGZyb20gXCIuL3JlZHVjZXIvc3RvcmVcIjtcclxuXHJcbmNvbnN0IHsgTWVtb0NyZWF0b3IgfSA9IHJlcXVpcmUoXCIuL2NyZWF0b3IvbWVtb0NyZWF0b3JcIik7XHJcbmNvbnN0IHsgRHJhZ25Ecm9wIH0gPSByZXF1aXJlKFwiLi9tb2RhbC9kcmFnbmRyb3BcIik7XHJcblxyXG4vLyByZXF1aXJlLmNvbnRleHQoXCIuLi9pbWFnZVwiLCB0cnVlKTtcclxuXHJcbmV4cG9ydCBjb25zdCBOQVZfSEVJR0hUID0gNDA7XHJcblxyXG5cclxuZnVuY3Rpb24gTWVtbyAoKXtcclxuICAgIHRoaXMuTkVXX01FTU8gPSBcIm5ld01lbW9cIjtcclxuICAgIHRoaXMubWVtb0NudCA9IDA7XHJcbiAgICB0aGlzLmRyYWduRHJvcCA9IG51bGw7XHJcbiAgICB0aGlzLnJlc2l6ZSA9IG51bGw7XHJcbiAgICB0aGlzLm12ID0gbnVsbDtcclxufVxyXG5cclxuXHJcbk1lbW8ucHJvdG90eXBlLm5ld01lbW9IYW5kbGVyID0gZnVuY3Rpb24oX3RoaXMpe1xyXG4gICAgLy9jcmVhdGUgYSBtZW1vIGJveCB0aHJvdWdoIE1lbW9DcmVhdG9yXHJcbiAgICBjb25zdCB3YWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dhbGwnKTtcclxuICAgIGNvbnN0IGNyZWF0b3IgPSBuZXcgTWVtb0NyZWF0b3IoX3RoaXMubWVtb0NudCwgd2FsbCk7XHJcbiAgICBjb25zdCBtZW1vRWxlbXMgPSBjcmVhdG9yLmluaXQoKTtcclxuXHJcbiAgICBjb25zdCBidXR0b25FdmVudCA9IG5ldyBCdXR0b25Fdm50KG1lbW9FbGVtcy5jb250YWluZXIpO1xyXG4gICAgYnV0dG9uRXZlbnQuaW5pdCgpO1xyXG4gICAgX3RoaXMuZHJhZ25Ecm9wLmluaXQobWVtb0VsZW1zLmhlYWRlci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jbGljaz1cImRyYWdcIl0nKSk7XHJcbiAgICBfdGhpcy5yZXNpemUuaW5pdChtZW1vRWxlbXMuY29udGFpbmVyKTtcclxuXHJcbiAgICBfdGhpcy5tZW1vQ250Kys7XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbn1cclxuXHJcbk1lbW8ucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpe1xyXG4gICAgLy9hZGQgbmV3IG1lbW9cclxuICAgIGNvbnN0IG5ld01lbW9CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZXZudD1cIiR7dGhpcy5ORVdfTUVNT31cIl1gKTtcclxuICAgIG5ld01lbW9CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB0aGlzLm5ld01lbW9IYW5kbGVyKHRoaXMpO1xyXG5cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICB0aGlzLmRyYWduRHJvcCA9IG5ldyBEcmFnbkRyb3AoKTtcclxuICAgIHRoaXMuZHJhZ25Ecm9wLmJvZHlFdm50cygpO1xyXG5cclxuICAgIHRoaXMucmVzaXplID0gbmV3IFJlc2l6ZSgpO1xyXG4gICAgdGhpcy5yZXNpemUuc3Vic2NyaWJlKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbmNvbnN0IG1lbW8gPSBuZXcgTWVtbygpO1xyXG5tZW1vLmluaXQoKTtcclxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiZjQ0Mjk2OWE0N2I3MDNmMGFjNzJcIikiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=