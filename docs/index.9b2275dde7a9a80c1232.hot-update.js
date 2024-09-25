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
    this.memoCnt = 0;
    this.size = {
        width: "200px",
        height: "230px"
    };
    this.dragnDrop = null;
    this.resize = null;
    this.mv = null;
}


Memo.prototype.createMemoHandler = function(e, _this){
    e.preventDefault();
    //create a memo box through MemoCreator
    const box = document.querySelector('#wall');
    const creator = new MemoCreator(_this.memoCnt, this.size.width, this.size.height);
    const elems = creator.init();
    elems.container.setAttribute('data-name', `memo_${_this.memoCnt}`);
    //append it to html
    box.appendChild(elems.container);
    const memoTextArea = elems.body.querySelector('textarea');
    memoTextArea.focus();

    _reducer_store__WEBPACK_IMPORTED_MODULE_2__.store.dispatch({
        type: "modalMutateObserver/update",
        name: `memo_${_this.memoCnt}`,
        x: elems.container.style.left,
        y: elems.container.style.top,
        width: this.size.width,
        height: this.size.height
    });

    

    //Subscribe if modal attributes such as 
    //width, height, z-index and position get changes.
    const mv = new _modal_buttonEvnt__WEBPACK_IMPORTED_MODULE_1__.ButtonEvnt(elems.container);
    mv.init();
    this.dragnDrop.init(elems.header.querySelector('[data-click="drag"]'));
    this.resize.init(elems.container);


    _this.memoCnt++;
    
}

Memo.prototype.init = function(){
    const ADD_BTN_ATTR = "addMemo";
    const addBtn = document.querySelector(`[evnt="${ADD_BTN_ATTR}"]`);
    addBtn.addEventListener('click', (e) => this.createMemoHandler(e, this));
    
    this.dragnDrop = new DragnDrop();
    this.dragnDrop.bodyEvnts();

    this.resize = new _modal_resize__WEBPACK_IMPORTED_MODULE_0__.Resize(this.size.width, this.size.height);
    this.resize.subscribe();

}

const memo = new Memo();
memo.init();


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("69b70735e56eca1e4e71")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguOWIyMjc1ZGRlN2E5YTgwYzEyMzIuaG90LXVwZGF0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQXdDO0FBQ1E7QUFDUjtBQUN4QztBQUNBLFFBQVEsY0FBYyxFQUFFLG1CQUFPLENBQUMsOERBQXVCO0FBQ3ZELFFBQVEsWUFBWSxFQUFFLG1CQUFPLENBQUMsc0RBQW1CO0FBQ2pEO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxjQUFjO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGlEQUFLO0FBQ1Q7QUFDQSxzQkFBc0IsY0FBYztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHlEQUFVO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsYUFBYTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGlEQUFNO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O1VDekVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWVtby8uL3NyYy9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vbWVtby93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUmVzaXplIH0gZnJvbSBcIi4vbW9kYWwvcmVzaXplXCI7XHJcbmltcG9ydCB7IEJ1dHRvbkV2bnQgfSBmcm9tIFwiLi9tb2RhbC9idXR0b25Fdm50XCI7XHJcbmltcG9ydCB7IHN0b3JlIH0gZnJvbSBcIi4vcmVkdWNlci9zdG9yZVwiO1xyXG5cclxuY29uc3QgeyBNZW1vQ3JlYXRvciB9ID0gcmVxdWlyZShcIi4vY3JlYXRvci9tZW1vQ3JlYXRvclwiKTtcclxuY29uc3QgeyBEcmFnbkRyb3AgfSA9IHJlcXVpcmUoXCIuL21vZGFsL2RyYWduZHJvcFwiKTtcclxuXHJcbi8vIHJlcXVpcmUuY29udGV4dChcIi4uL2ltYWdlXCIsIHRydWUpO1xyXG5cclxuZXhwb3J0IGNvbnN0IE5BVl9IRUlHSFQgPSA0MDtcclxuXHJcblxyXG5mdW5jdGlvbiBNZW1vICgpe1xyXG4gICAgdGhpcy5tZW1vQ250ID0gMDtcclxuICAgIHRoaXMuc2l6ZSA9IHtcclxuICAgICAgICB3aWR0aDogXCIyMDBweFwiLFxyXG4gICAgICAgIGhlaWdodDogXCIyMzBweFwiXHJcbiAgICB9O1xyXG4gICAgdGhpcy5kcmFnbkRyb3AgPSBudWxsO1xyXG4gICAgdGhpcy5yZXNpemUgPSBudWxsO1xyXG4gICAgdGhpcy5tdiA9IG51bGw7XHJcbn1cclxuXHJcblxyXG5NZW1vLnByb3RvdHlwZS5jcmVhdGVNZW1vSGFuZGxlciA9IGZ1bmN0aW9uKGUsIF90aGlzKXtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIC8vY3JlYXRlIGEgbWVtbyBib3ggdGhyb3VnaCBNZW1vQ3JlYXRvclxyXG4gICAgY29uc3QgYm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3dhbGwnKTtcclxuICAgIGNvbnN0IGNyZWF0b3IgPSBuZXcgTWVtb0NyZWF0b3IoX3RoaXMubWVtb0NudCwgdGhpcy5zaXplLndpZHRoLCB0aGlzLnNpemUuaGVpZ2h0KTtcclxuICAgIGNvbnN0IGVsZW1zID0gY3JlYXRvci5pbml0KCk7XHJcbiAgICBlbGVtcy5jb250YWluZXIuc2V0QXR0cmlidXRlKCdkYXRhLW5hbWUnLCBgbWVtb18ke190aGlzLm1lbW9DbnR9YCk7XHJcbiAgICAvL2FwcGVuZCBpdCB0byBodG1sXHJcbiAgICBib3guYXBwZW5kQ2hpbGQoZWxlbXMuY29udGFpbmVyKTtcclxuICAgIGNvbnN0IG1lbW9UZXh0QXJlYSA9IGVsZW1zLmJvZHkucXVlcnlTZWxlY3RvcigndGV4dGFyZWEnKTtcclxuICAgIG1lbW9UZXh0QXJlYS5mb2N1cygpO1xyXG5cclxuICAgIHN0b3JlLmRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcIm1vZGFsTXV0YXRlT2JzZXJ2ZXIvdXBkYXRlXCIsXHJcbiAgICAgICAgbmFtZTogYG1lbW9fJHtfdGhpcy5tZW1vQ250fWAsXHJcbiAgICAgICAgeDogZWxlbXMuY29udGFpbmVyLnN0eWxlLmxlZnQsXHJcbiAgICAgICAgeTogZWxlbXMuY29udGFpbmVyLnN0eWxlLnRvcCxcclxuICAgICAgICB3aWR0aDogdGhpcy5zaXplLndpZHRoLFxyXG4gICAgICAgIGhlaWdodDogdGhpcy5zaXplLmhlaWdodFxyXG4gICAgfSk7XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy9TdWJzY3JpYmUgaWYgbW9kYWwgYXR0cmlidXRlcyBzdWNoIGFzIFxyXG4gICAgLy93aWR0aCwgaGVpZ2h0LCB6LWluZGV4IGFuZCBwb3NpdGlvbiBnZXQgY2hhbmdlcy5cclxuICAgIGNvbnN0IG12ID0gbmV3IEJ1dHRvbkV2bnQoZWxlbXMuY29udGFpbmVyKTtcclxuICAgIG12LmluaXQoKTtcclxuICAgIHRoaXMuZHJhZ25Ecm9wLmluaXQoZWxlbXMuaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNsaWNrPVwiZHJhZ1wiXScpKTtcclxuICAgIHRoaXMucmVzaXplLmluaXQoZWxlbXMuY29udGFpbmVyKTtcclxuXHJcblxyXG4gICAgX3RoaXMubWVtb0NudCsrO1xyXG4gICAgXHJcbn1cclxuXHJcbk1lbW8ucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpe1xyXG4gICAgY29uc3QgQUREX0JUTl9BVFRSID0gXCJhZGRNZW1vXCI7XHJcbiAgICBjb25zdCBhZGRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZXZudD1cIiR7QUREX0JUTl9BVFRSfVwiXWApO1xyXG4gICAgYWRkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHRoaXMuY3JlYXRlTWVtb0hhbmRsZXIoZSwgdGhpcykpO1xyXG4gICAgXHJcbiAgICB0aGlzLmRyYWduRHJvcCA9IG5ldyBEcmFnbkRyb3AoKTtcclxuICAgIHRoaXMuZHJhZ25Ecm9wLmJvZHlFdm50cygpO1xyXG5cclxuICAgIHRoaXMucmVzaXplID0gbmV3IFJlc2l6ZSh0aGlzLnNpemUud2lkdGgsIHRoaXMuc2l6ZS5oZWlnaHQpO1xyXG4gICAgdGhpcy5yZXNpemUuc3Vic2NyaWJlKCk7XHJcblxyXG59XHJcblxyXG5jb25zdCBtZW1vID0gbmV3IE1lbW8oKTtcclxubWVtby5pbml0KCk7XHJcbiIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjY5YjcwNzM1ZTU2ZWNhMWU0ZTcxXCIpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9