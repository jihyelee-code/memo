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
    elems.container.classList.add('card-show');

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
/******/ 	__webpack_require__.h = () => ("e166639569b64f6ee0c3")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguY2UwOTg2NTU0ZTA4YTc4MWFjYjYuaG90LXVwZGF0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQXdDO0FBQ1E7QUFDUjtBQUN4QztBQUNBLFFBQVEsY0FBYyxFQUFFLG1CQUFPLENBQUMsOERBQXVCO0FBQ3ZELFFBQVEsWUFBWSxFQUFFLG1CQUFPLENBQUMsc0RBQW1CO0FBQ2pEO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxjQUFjO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxpREFBSztBQUNUO0FBQ0Esc0JBQXNCLGNBQWM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQix5REFBVTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELGFBQWE7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixpREFBTTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztVQzNFQSIsInNvdXJjZXMiOlsid2VicGFjazovL21lbW8vLi9zcmMvanMvYXBwLmpzIiwid2VicGFjazovL21lbW8vd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFJlc2l6ZSB9IGZyb20gXCIuL21vZGFsL3Jlc2l6ZVwiO1xyXG5pbXBvcnQgeyBCdXR0b25Fdm50IH0gZnJvbSBcIi4vbW9kYWwvYnV0dG9uRXZudFwiO1xyXG5pbXBvcnQgeyBzdG9yZSB9IGZyb20gXCIuL3JlZHVjZXIvc3RvcmVcIjtcclxuXHJcbmNvbnN0IHsgTWVtb0NyZWF0b3IgfSA9IHJlcXVpcmUoXCIuL2NyZWF0b3IvbWVtb0NyZWF0b3JcIik7XHJcbmNvbnN0IHsgRHJhZ25Ecm9wIH0gPSByZXF1aXJlKFwiLi9tb2RhbC9kcmFnbmRyb3BcIik7XHJcblxyXG4vLyByZXF1aXJlLmNvbnRleHQoXCIuLi9pbWFnZVwiLCB0cnVlKTtcclxuXHJcbmV4cG9ydCBjb25zdCBOQVZfSEVJR0hUID0gNDA7XHJcblxyXG5cclxuZnVuY3Rpb24gTWVtbyAoKXtcclxuICAgIHRoaXMubWVtb0NudCA9IDA7XHJcbiAgICB0aGlzLnNpemUgPSB7XHJcbiAgICAgICAgd2lkdGg6IFwiMjAwcHhcIixcclxuICAgICAgICBoZWlnaHQ6IFwiMjMwcHhcIlxyXG4gICAgfTtcclxuICAgIHRoaXMuZHJhZ25Ecm9wID0gbnVsbDtcclxuICAgIHRoaXMucmVzaXplID0gbnVsbDtcclxuICAgIHRoaXMubXYgPSBudWxsO1xyXG59XHJcblxyXG5cclxuTWVtby5wcm90b3R5cGUuY3JlYXRlTWVtb0hhbmRsZXIgPSBmdW5jdGlvbihlLCBfdGhpcyl7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAvL2NyZWF0ZSBhIG1lbW8gYm94IHRocm91Z2ggTWVtb0NyZWF0b3JcclxuICAgIGNvbnN0IGJveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN3YWxsJyk7XHJcbiAgICBjb25zdCBjcmVhdG9yID0gbmV3IE1lbW9DcmVhdG9yKF90aGlzLm1lbW9DbnQsIHRoaXMuc2l6ZS53aWR0aCwgdGhpcy5zaXplLmhlaWdodCk7XHJcbiAgICBjb25zdCBlbGVtcyA9IGNyZWF0b3IuaW5pdCgpO1xyXG4gICAgZWxlbXMuY29udGFpbmVyLnNldEF0dHJpYnV0ZSgnZGF0YS1uYW1lJywgYG1lbW9fJHtfdGhpcy5tZW1vQ250fWApO1xyXG4gICAgLy9hcHBlbmQgaXQgdG8gaHRtbFxyXG4gICAgYm94LmFwcGVuZENoaWxkKGVsZW1zLmNvbnRhaW5lcik7XHJcblxyXG4gICAgY29uc3QgbWVtb1RleHRBcmVhID0gZWxlbXMuYm9keS5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYScpO1xyXG4gICAgbWVtb1RleHRBcmVhLmZvY3VzKCk7XHJcbiAgICBlbGVtcy5jb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY2FyZC1zaG93Jyk7XHJcblxyXG4gICAgc3RvcmUuZGlzcGF0Y2goe1xyXG4gICAgICAgIHR5cGU6IFwibW9kYWxNdXRhdGVPYnNlcnZlci91cGRhdGVcIixcclxuICAgICAgICBuYW1lOiBgbWVtb18ke190aGlzLm1lbW9DbnR9YCxcclxuICAgICAgICB4OiBlbGVtcy5jb250YWluZXIuc3R5bGUubGVmdCxcclxuICAgICAgICB5OiBlbGVtcy5jb250YWluZXIuc3R5bGUudG9wLFxyXG4gICAgICAgIHdpZHRoOiB0aGlzLnNpemUud2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OiB0aGlzLnNpemUuaGVpZ2h0XHJcbiAgICB9KTtcclxuXHJcbiAgICBcclxuXHJcbiAgICAvL1N1YnNjcmliZSBpZiBtb2RhbCBhdHRyaWJ1dGVzIHN1Y2ggYXMgXHJcbiAgICAvL3dpZHRoLCBoZWlnaHQsIHotaW5kZXggYW5kIHBvc2l0aW9uIGdldCBjaGFuZ2VzLlxyXG4gICAgY29uc3QgbXYgPSBuZXcgQnV0dG9uRXZudChlbGVtcy5jb250YWluZXIpO1xyXG4gICAgbXYuaW5pdCgpO1xyXG4gICAgdGhpcy5kcmFnbkRyb3AuaW5pdChlbGVtcy5oZWFkZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY2xpY2s9XCJkcmFnXCJdJykpO1xyXG4gICAgdGhpcy5yZXNpemUuaW5pdChlbGVtcy5jb250YWluZXIpO1xyXG5cclxuXHJcbiAgICBfdGhpcy5tZW1vQ250Kys7XHJcbiAgICBcclxufVxyXG5cclxuTWVtby5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcbiAgICBjb25zdCBBRERfQlROX0FUVFIgPSBcImFkZE1lbW9cIjtcclxuICAgIGNvbnN0IGFkZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtldm50PVwiJHtBRERfQlROX0FUVFJ9XCJdYCk7XHJcbiAgICBhZGRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gdGhpcy5jcmVhdGVNZW1vSGFuZGxlcihlLCB0aGlzKSk7XHJcbiAgICBcclxuICAgIHRoaXMuZHJhZ25Ecm9wID0gbmV3IERyYWduRHJvcCgpO1xyXG4gICAgdGhpcy5kcmFnbkRyb3AuYm9keUV2bnRzKCk7XHJcblxyXG4gICAgdGhpcy5yZXNpemUgPSBuZXcgUmVzaXplKHRoaXMuc2l6ZS53aWR0aCwgdGhpcy5zaXplLmhlaWdodCk7XHJcbiAgICB0aGlzLnJlc2l6ZS5zdWJzY3JpYmUoKTtcclxuXHJcbn1cclxuXHJcbmNvbnN0IG1lbW8gPSBuZXcgTWVtbygpO1xyXG5tZW1vLmluaXQoKTtcclxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiZTE2NjYzOTU2OWI2NGY2ZWUwYzNcIikiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=