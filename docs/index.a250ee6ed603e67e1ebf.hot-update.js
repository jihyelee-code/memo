"use strict";
self["webpackHotUpdatememo"]("index",{

/***/ "./src/js/creator/memoCreator.js":
/*!***************************************!*\
  !*** ./src/js/creator/memoCreator.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MemoCreator: () => (/* binding */ MemoCreator)
/* harmony export */ });
/* harmony import */ var _reducer_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../reducer/store */ "./src/js/reducer/store.js");


/**
 * @author JHLEE
 * @class MemoCreator
 * @constructor
 * @classdesc MemoCreator controller
 */
function MemoCreator (memoCnt, mother){
    this.memoCnt = memoCnt
    this.mother = mother;
    this.ELEMS = {
        CONTAINER: "CONTAINER",
        HEADER: "HEADER",
        BODY: "BODY",
        CORNERS: "CORNERS",
        FOOTER: "FOOTER"
    };

    this.defSetting = {
        width: "200px",
        height: "230px",
        top: 60,    
        left: 0,
        randomPosRange: 50
    };

    this.HEADER = {
        TAG: "section",
        CLASS_NAME: ["card-header", "d-flex", "justify-content-end"],
        // <button type="button" title="Table" aria-label="Table"
        //         data-click="table"
        //         class="btn btn-sm btn-transparent">
        //         <i class="bi bi-border-all"></i>
        // </button>    
        INNER_HTML: `
            <div class="flex-grow-1" data-click="drag"> </div>
            <div class="d-flex align-items-center">
         
                <button type="button" title="Minimize" aria-label="Minimize"
                        data-click="minimize"
                        class="btn btn-sm btn-transparent d-none">
                        <i class="bi bi-front"></i>
                </button>
                <button type="button" title="Maximize" aria-label="Maximize"
                        data-click="maximize"
                        class="btn btn-sm btn-transparent">
                        <i class="bi bi-square"></i>
                </button>
                <button type="button" title="Close" aria-label="Close"  
                        data-click="close"
                        class="btn btn-sm btn-transparent">
                        <i class="bi bi-x-lg"></i>
                </button>
            </div>
        `,
    };

    this.BODY = {
        TAG: "section",
        CLASS_NAME: ["card-body"],
        INNER_HTML: `
        <textarea class="w-100 h-100"></textarea>
        `
    };

    this.FOOTER = {
        TAG: "section",
        CLASS_NAME: ["card-footer"],
        INNER_HTML: `
            <div class="d-flex">
                <label for="bgColor_${this.memoCnt}" title="Background color" class="btn p-1 btn-transparent">
                    <i class="bi bi-palette"></i>
                    <input type="color" id="bgColor_${this.memoCnt}" data-click="bgColor" class="d-none" ></input>
                </label>
            </div>
        `
    };

    this.CORNERS = {
        TAG: "div",
        CLASS_NAME: [],
        INNER_HTML : `
        <div class="corner-left" corner="left"></div>
        <div class="corner-top" corner="top"></div>
        <div class="corner-top-left" corner="top-left"></div>
        <div class="corner-top-right" corner="top-right"></div>
        <div class="corner-right" corner="right"></div>
        <div class="corner-bottom" corner="bottom"></div>
        <div class="corner-bottom-left" corner="bottom-left"></div>
        <div class="corner-bottom-right" corner="bottom-right"></div>
        `
    };

    this.CONTAINER = {
        TAG: "div",
        CLASS_NAME: ["card", "position-absolute"],
        INNER_HTML: ``
    };

    this.container = null;
    this.header = null;
    this.body = null;
    this.footer = null;
    this.corners = null;

}

/**
 * @author JHLEE
 * @memberof MemoCreator
 * @function
 * @description Append a memo html to its mother html.
 * @return {MemoCreator}
 */
MemoCreator.prototype.createElem = function (target){
    const elem = document.createElement(this[target].TAG);
    elem.classList.add(...this[target].CLASS_NAME);
    elem.innerHTML = this[target].INNER_HTML;

    return elem;
}


/**
 * @author JHLEE
 * @memberof MemoCreator
 * @function
 * @description 
 * @return {MemoCreator}
 */
MemoCreator.prototype.createElems = function (){
    this.container = this.createElem(this.ELEMS.CONTAINER);
    this.header = this.createElem(this.ELEMS.HEADER); 
    this.body = this.createElem(this.ELEMS.BODY); 
    this.footer = this.createElem(this.ELEMS.FOOTER); 
    this.corners = this.createElem(this.ELEMS.CORNERS); 

    return this;
}

MemoCreator.prototype.frameSetUp = function ( ){
    //size and location
    this.container.style.width = this.defSetting.width;
    this.container.style.height = this.defSetting.height;
    this.container.style.top = `${this.defSetting.top + getRandomInt(this.defSetting.randomPosRange)}px`;
    this.container.style.left = `${this.defSetting.left + getRandomInt(this.defSetting.randomPosRange)}px`; 

    //attribute
    this.container.setAttribute('data-name', `memo_${this.memoCnt}`);

    //structure
    this.container.appendChild(this.header);
    this.container.appendChild(this.body);
    this.container.appendChild(this.footer);
    this.container.appendChild(this.corners);
    this.mother.appendChild(this.container);

    //focus
    this.body.querySelector('textarea').focus();

    return this;
}

MemoCreator.prototype.showCard = function(){
    this.container.classList.add('card-show');

    return this;
}

MemoCreator.prototype.updateObserver = function(){
    _reducer_store__WEBPACK_IMPORTED_MODULE_0__.store.dispatch({
        type: "modalMutateObserver/update",
        name: `memo_${this.memoCnt}`,
        x: this.container.style.left,
        y: this.container.style.top,
        width: this.defSetting.width,
        height: this.defSetting.height
    });

    return this;
}

MemoCreator.prototype.addButtonEvnt = function (){

}




function getRandomInt(max) {

    return Math.floor(Math.random() * max);
  }

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("8867990b979751a85993")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYTI1MGVlNmVkNjAzZTY3ZTFlYmYuaG90LXVwZGF0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxhQUFhO0FBQ25EO0FBQ0Esc0RBQXNELGFBQWE7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsbUVBQW1FO0FBQ3JHLG1DQUFtQyxvRUFBb0U7QUFDdkc7QUFDQTtBQUNBLHFEQUFxRCxhQUFhO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksaURBQUs7QUFDVDtBQUNBLHNCQUFzQixhQUFhO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7VUNqTUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZW1vLy4vc3JjL2pzL2NyZWF0b3IvbWVtb0NyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vbWVtby93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc3RvcmUgfSBmcm9tIFwiLi4vcmVkdWNlci9zdG9yZVwiO1xyXG5cclxuLyoqXHJcbiAqIEBhdXRob3IgSkhMRUVcclxuICogQGNsYXNzIE1lbW9DcmVhdG9yXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAY2xhc3NkZXNjIE1lbW9DcmVhdG9yIGNvbnRyb2xsZXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBNZW1vQ3JlYXRvciAobWVtb0NudCwgbW90aGVyKXtcclxuICAgIHRoaXMubWVtb0NudCA9IG1lbW9DbnRcclxuICAgIHRoaXMubW90aGVyID0gbW90aGVyO1xyXG4gICAgdGhpcy5FTEVNUyA9IHtcclxuICAgICAgICBDT05UQUlORVI6IFwiQ09OVEFJTkVSXCIsXHJcbiAgICAgICAgSEVBREVSOiBcIkhFQURFUlwiLFxyXG4gICAgICAgIEJPRFk6IFwiQk9EWVwiLFxyXG4gICAgICAgIENPUk5FUlM6IFwiQ09STkVSU1wiLFxyXG4gICAgICAgIEZPT1RFUjogXCJGT09URVJcIlxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLmRlZlNldHRpbmcgPSB7XHJcbiAgICAgICAgd2lkdGg6IFwiMjAwcHhcIixcclxuICAgICAgICBoZWlnaHQ6IFwiMjMwcHhcIixcclxuICAgICAgICB0b3A6IDYwLCAgICBcclxuICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgIHJhbmRvbVBvc1JhbmdlOiA1MFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLkhFQURFUiA9IHtcclxuICAgICAgICBUQUc6IFwic2VjdGlvblwiLFxyXG4gICAgICAgIENMQVNTX05BTUU6IFtcImNhcmQtaGVhZGVyXCIsIFwiZC1mbGV4XCIsIFwianVzdGlmeS1jb250ZW50LWVuZFwiXSxcclxuICAgICAgICAvLyA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiB0aXRsZT1cIlRhYmxlXCIgYXJpYS1sYWJlbD1cIlRhYmxlXCJcclxuICAgICAgICAvLyAgICAgICAgIGRhdGEtY2xpY2s9XCJ0YWJsZVwiXHJcbiAgICAgICAgLy8gICAgICAgICBjbGFzcz1cImJ0biBidG4tc20gYnRuLXRyYW5zcGFyZW50XCI+XHJcbiAgICAgICAgLy8gICAgICAgICA8aSBjbGFzcz1cImJpIGJpLWJvcmRlci1hbGxcIj48L2k+XHJcbiAgICAgICAgLy8gPC9idXR0b24+ICAgIFxyXG4gICAgICAgIElOTkVSX0hUTUw6IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXgtZ3Jvdy0xXCIgZGF0YS1jbGljaz1cImRyYWdcIj4gPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyXCI+XHJcbiAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgdGl0bGU9XCJNaW5pbWl6ZVwiIGFyaWEtbGFiZWw9XCJNaW5pbWl6ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtY2xpY2s9XCJtaW5pbWl6ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tdHJhbnNwYXJlbnQgZC1ub25lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiYmkgYmktZnJvbnRcIj48L2k+XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHRpdGxlPVwiTWF4aW1pemVcIiBhcmlhLWxhYmVsPVwiTWF4aW1pemVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLWNsaWNrPVwibWF4aW1pemVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tc20gYnRuLXRyYW5zcGFyZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiYmkgYmktc3F1YXJlXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiB0aXRsZT1cIkNsb3NlXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCIgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLWNsaWNrPVwiY2xvc2VcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tc20gYnRuLXRyYW5zcGFyZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiYmkgYmkteC1sZ1wiPjwvaT5cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLkJPRFkgPSB7XHJcbiAgICAgICAgVEFHOiBcInNlY3Rpb25cIixcclxuICAgICAgICBDTEFTU19OQU1FOiBbXCJjYXJkLWJvZHlcIl0sXHJcbiAgICAgICAgSU5ORVJfSFRNTDogYFxyXG4gICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cInctMTAwIGgtMTAwXCI+PC90ZXh0YXJlYT5cclxuICAgICAgICBgXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuRk9PVEVSID0ge1xyXG4gICAgICAgIFRBRzogXCJzZWN0aW9uXCIsXHJcbiAgICAgICAgQ0xBU1NfTkFNRTogW1wiY2FyZC1mb290ZXJcIl0sXHJcbiAgICAgICAgSU5ORVJfSFRNTDogYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4XCI+XHJcbiAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiYmdDb2xvcl8ke3RoaXMubWVtb0NudH1cIiB0aXRsZT1cIkJhY2tncm91bmQgY29sb3JcIiBjbGFzcz1cImJ0biBwLTEgYnRuLXRyYW5zcGFyZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJiaSBiaS1wYWxldHRlXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY29sb3JcIiBpZD1cImJnQ29sb3JfJHt0aGlzLm1lbW9DbnR9XCIgZGF0YS1jbGljaz1cImJnQ29sb3JcIiBjbGFzcz1cImQtbm9uZVwiID48L2lucHV0PlxyXG4gICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLkNPUk5FUlMgPSB7XHJcbiAgICAgICAgVEFHOiBcImRpdlwiLFxyXG4gICAgICAgIENMQVNTX05BTUU6IFtdLFxyXG4gICAgICAgIElOTkVSX0hUTUwgOiBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvcm5lci1sZWZ0XCIgY29ybmVyPVwibGVmdFwiPjwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb3JuZXItdG9wXCIgY29ybmVyPVwidG9wXCI+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvcm5lci10b3AtbGVmdFwiIGNvcm5lcj1cInRvcC1sZWZ0XCI+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvcm5lci10b3AtcmlnaHRcIiBjb3JuZXI9XCJ0b3AtcmlnaHRcIj48L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29ybmVyLXJpZ2h0XCIgY29ybmVyPVwicmlnaHRcIj48L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29ybmVyLWJvdHRvbVwiIGNvcm5lcj1cImJvdHRvbVwiPjwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb3JuZXItYm90dG9tLWxlZnRcIiBjb3JuZXI9XCJib3R0b20tbGVmdFwiPjwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb3JuZXItYm90dG9tLXJpZ2h0XCIgY29ybmVyPVwiYm90dG9tLXJpZ2h0XCI+PC9kaXY+XHJcbiAgICAgICAgYFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLkNPTlRBSU5FUiA9IHtcclxuICAgICAgICBUQUc6IFwiZGl2XCIsXHJcbiAgICAgICAgQ0xBU1NfTkFNRTogW1wiY2FyZFwiLCBcInBvc2l0aW9uLWFic29sdXRlXCJdLFxyXG4gICAgICAgIElOTkVSX0hUTUw6IGBgXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuY29udGFpbmVyID0gbnVsbDtcclxuICAgIHRoaXMuaGVhZGVyID0gbnVsbDtcclxuICAgIHRoaXMuYm9keSA9IG51bGw7XHJcbiAgICB0aGlzLmZvb3RlciA9IG51bGw7XHJcbiAgICB0aGlzLmNvcm5lcnMgPSBudWxsO1xyXG5cclxufVxyXG5cclxuLyoqXHJcbiAqIEBhdXRob3IgSkhMRUVcclxuICogQG1lbWJlcm9mIE1lbW9DcmVhdG9yXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAZGVzY3JpcHRpb24gQXBwZW5kIGEgbWVtbyBodG1sIHRvIGl0cyBtb3RoZXIgaHRtbC5cclxuICogQHJldHVybiB7TWVtb0NyZWF0b3J9XHJcbiAqL1xyXG5NZW1vQ3JlYXRvci5wcm90b3R5cGUuY3JlYXRlRWxlbSA9IGZ1bmN0aW9uICh0YXJnZXQpe1xyXG4gICAgY29uc3QgZWxlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGhpc1t0YXJnZXRdLlRBRyk7XHJcbiAgICBlbGVtLmNsYXNzTGlzdC5hZGQoLi4udGhpc1t0YXJnZXRdLkNMQVNTX05BTUUpO1xyXG4gICAgZWxlbS5pbm5lckhUTUwgPSB0aGlzW3RhcmdldF0uSU5ORVJfSFRNTDtcclxuXHJcbiAgICByZXR1cm4gZWxlbTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBAYXV0aG9yIEpITEVFXHJcbiAqIEBtZW1iZXJvZiBNZW1vQ3JlYXRvclxyXG4gKiBAZnVuY3Rpb25cclxuICogQGRlc2NyaXB0aW9uIFxyXG4gKiBAcmV0dXJuIHtNZW1vQ3JlYXRvcn1cclxuICovXHJcbk1lbW9DcmVhdG9yLnByb3RvdHlwZS5jcmVhdGVFbGVtcyA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdGhpcy5jb250YWluZXIgPSB0aGlzLmNyZWF0ZUVsZW0odGhpcy5FTEVNUy5DT05UQUlORVIpO1xyXG4gICAgdGhpcy5oZWFkZXIgPSB0aGlzLmNyZWF0ZUVsZW0odGhpcy5FTEVNUy5IRUFERVIpOyBcclxuICAgIHRoaXMuYm9keSA9IHRoaXMuY3JlYXRlRWxlbSh0aGlzLkVMRU1TLkJPRFkpOyBcclxuICAgIHRoaXMuZm9vdGVyID0gdGhpcy5jcmVhdGVFbGVtKHRoaXMuRUxFTVMuRk9PVEVSKTsgXHJcbiAgICB0aGlzLmNvcm5lcnMgPSB0aGlzLmNyZWF0ZUVsZW0odGhpcy5FTEVNUy5DT1JORVJTKTsgXHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbk1lbW9DcmVhdG9yLnByb3RvdHlwZS5mcmFtZVNldFVwID0gZnVuY3Rpb24gKCApe1xyXG4gICAgLy9zaXplIGFuZCBsb2NhdGlvblxyXG4gICAgdGhpcy5jb250YWluZXIuc3R5bGUud2lkdGggPSB0aGlzLmRlZlNldHRpbmcud2lkdGg7XHJcbiAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSB0aGlzLmRlZlNldHRpbmcuaGVpZ2h0O1xyXG4gICAgdGhpcy5jb250YWluZXIuc3R5bGUudG9wID0gYCR7dGhpcy5kZWZTZXR0aW5nLnRvcCArIGdldFJhbmRvbUludCh0aGlzLmRlZlNldHRpbmcucmFuZG9tUG9zUmFuZ2UpfXB4YDtcclxuICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmxlZnQgPSBgJHt0aGlzLmRlZlNldHRpbmcubGVmdCArIGdldFJhbmRvbUludCh0aGlzLmRlZlNldHRpbmcucmFuZG9tUG9zUmFuZ2UpfXB4YDsgXHJcblxyXG4gICAgLy9hdHRyaWJ1dGVcclxuICAgIHRoaXMuY29udGFpbmVyLnNldEF0dHJpYnV0ZSgnZGF0YS1uYW1lJywgYG1lbW9fJHt0aGlzLm1lbW9DbnR9YCk7XHJcblxyXG4gICAgLy9zdHJ1Y3R1cmVcclxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuaGVhZGVyKTtcclxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuYm9keSk7XHJcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmZvb3Rlcik7XHJcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmNvcm5lcnMpO1xyXG4gICAgdGhpcy5tb3RoZXIuYXBwZW5kQ2hpbGQodGhpcy5jb250YWluZXIpO1xyXG5cclxuICAgIC8vZm9jdXNcclxuICAgIHRoaXMuYm9keS5xdWVyeVNlbGVjdG9yKCd0ZXh0YXJlYScpLmZvY3VzKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbk1lbW9DcmVhdG9yLnByb3RvdHlwZS5zaG93Q2FyZCA9IGZ1bmN0aW9uKCl7XHJcbiAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjYXJkLXNob3cnKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufVxyXG5cclxuTWVtb0NyZWF0b3IucHJvdG90eXBlLnVwZGF0ZU9ic2VydmVyID0gZnVuY3Rpb24oKXtcclxuICAgIHN0b3JlLmRpc3BhdGNoKHtcclxuICAgICAgICB0eXBlOiBcIm1vZGFsTXV0YXRlT2JzZXJ2ZXIvdXBkYXRlXCIsXHJcbiAgICAgICAgbmFtZTogYG1lbW9fJHt0aGlzLm1lbW9DbnR9YCxcclxuICAgICAgICB4OiB0aGlzLmNvbnRhaW5lci5zdHlsZS5sZWZ0LFxyXG4gICAgICAgIHk6IHRoaXMuY29udGFpbmVyLnN0eWxlLnRvcCxcclxuICAgICAgICB3aWR0aDogdGhpcy5kZWZTZXR0aW5nLndpZHRoLFxyXG4gICAgICAgIGhlaWdodDogdGhpcy5kZWZTZXR0aW5nLmhlaWdodFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbn1cclxuXHJcbk1lbW9DcmVhdG9yLnByb3RvdHlwZS5hZGRCdXR0b25Fdm50ID0gZnVuY3Rpb24gKCl7XHJcblxyXG59XHJcblxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBnZXRSYW5kb21JbnQobWF4KSB7XHJcblxyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCk7XHJcbiAgfSIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjg4Njc5OTBiOTc5NzUxYTg1OTkzXCIpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9