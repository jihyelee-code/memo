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
/**
 * @author JHLEE
 * @class MemoCreator
 * @constructor
 * @classdesc MemoCreator controller
 */
function MemoCreator (memoCnt, width, height){
    this.ELEMS = {
        CONTAINER: "CONTAINER",
        HEADER: "HEADER",
        BODY: "BODY",
        CORNERS: "CORNERS"
    };

    this.defSetting = {
        width: width + "px",
        height: height + "px",
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
                <div class="d-flex">
                    <label for="bgColor_${memoCnt}" title="Background color" class="btn btn-sm btn-transparent">
                        <i class="bi bi-palette"></i>
                        <input type="color" id="bgColor_${memoCnt}" data-click="bgColor" class="d-none" ></input>
                    </label>
                </div>
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
MemoCreator.prototype.init = function (){
    const container = this.createElem(this.ELEMS.CONTAINER);
    const header = this.createElem(this.ELEMS.HEADER); 
    const body = this.createElem(this.ELEMS.BODY); 
    const corners = this.createElem(this.ELEMS.CORNERS); 

    container.style.width = this.defSetting.width;
    container.style.height = this.defSetting.height;
    container.style.top = `${this.defSetting.top + getRandomInt(this.defSetting.randomPosRange)}px`;
    container.style.left = `${this.defSetting.left + getRandomInt(this.defSetting.randomPosRange)}px`; 

    container.appendChild(header);
    container.appendChild(body);
    container.appendChild(corners);

    const elems = {
        container,
        header,
        body,
        corners
    }


    return elems;
}


function getRandomInt(max) {

    return Math.floor(Math.random() * max);
  }

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("504611b1502f9730a44f")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguMWZmODMyNmRhNDgwZDYxY2VlYjYuaG90LXVwZGF0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsUUFBUTtBQUNsRDtBQUNBLDBEQUEwRCxRQUFRO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLG1FQUFtRTtBQUNoRyw4QkFBOEIsb0VBQW9FO0FBQ2xHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7VUM5SUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZW1vLy4vc3JjL2pzL2NyZWF0b3IvbWVtb0NyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vbWVtby93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIEBhdXRob3IgSkhMRUVcclxuICogQGNsYXNzIE1lbW9DcmVhdG9yXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAY2xhc3NkZXNjIE1lbW9DcmVhdG9yIGNvbnRyb2xsZXJcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiBNZW1vQ3JlYXRvciAobWVtb0NudCwgd2lkdGgsIGhlaWdodCl7XHJcbiAgICB0aGlzLkVMRU1TID0ge1xyXG4gICAgICAgIENPTlRBSU5FUjogXCJDT05UQUlORVJcIixcclxuICAgICAgICBIRUFERVI6IFwiSEVBREVSXCIsXHJcbiAgICAgICAgQk9EWTogXCJCT0RZXCIsXHJcbiAgICAgICAgQ09STkVSUzogXCJDT1JORVJTXCJcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5kZWZTZXR0aW5nID0ge1xyXG4gICAgICAgIHdpZHRoOiB3aWR0aCArIFwicHhcIixcclxuICAgICAgICBoZWlnaHQ6IGhlaWdodCArIFwicHhcIixcclxuICAgICAgICB0b3A6IDYwLCAgICBcclxuICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgIHJhbmRvbVBvc1JhbmdlOiA1MFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLkhFQURFUiA9IHtcclxuICAgICAgICBUQUc6IFwic2VjdGlvblwiLFxyXG4gICAgICAgIENMQVNTX05BTUU6IFtcImNhcmQtaGVhZGVyXCIsIFwiZC1mbGV4XCIsIFwianVzdGlmeS1jb250ZW50LWVuZFwiXSxcclxuICAgICAgICAvLyA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiB0aXRsZT1cIlRhYmxlXCIgYXJpYS1sYWJlbD1cIlRhYmxlXCJcclxuICAgICAgICAvLyAgICAgICAgIGRhdGEtY2xpY2s9XCJ0YWJsZVwiXHJcbiAgICAgICAgLy8gICAgICAgICBjbGFzcz1cImJ0biBidG4tc20gYnRuLXRyYW5zcGFyZW50XCI+XHJcbiAgICAgICAgLy8gICAgICAgICA8aSBjbGFzcz1cImJpIGJpLWJvcmRlci1hbGxcIj48L2k+XHJcbiAgICAgICAgLy8gPC9idXR0b24+ICAgIFxyXG4gICAgICAgIElOTkVSX0hUTUw6IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXgtZ3Jvdy0xXCIgZGF0YS1jbGljaz1cImRyYWdcIj4gPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXggYWxpZ24taXRlbXMtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGZvcj1cImJnQ29sb3JfJHttZW1vQ250fVwiIHRpdGxlPVwiQmFja2dyb3VuZCBjb2xvclwiIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tdHJhbnNwYXJlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJiaSBiaS1wYWxldHRlXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNvbG9yXCIgaWQ9XCJiZ0NvbG9yXyR7bWVtb0NudH1cIiBkYXRhLWNsaWNrPVwiYmdDb2xvclwiIGNsYXNzPVwiZC1ub25lXCIgPjwvaW5wdXQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgdGl0bGU9XCJNaW5pbWl6ZVwiIGFyaWEtbGFiZWw9XCJNaW5pbWl6ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtY2xpY2s9XCJtaW5pbWl6ZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tdHJhbnNwYXJlbnQgZC1ub25lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiYmkgYmktZnJvbnRcIj48L2k+XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIHRpdGxlPVwiTWF4aW1pemVcIiBhcmlhLWxhYmVsPVwiTWF4aW1pemVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLWNsaWNrPVwibWF4aW1pemVcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tc20gYnRuLXRyYW5zcGFyZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiYmkgYmktc3F1YXJlXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiB0aXRsZT1cIkNsb3NlXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCIgIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLWNsaWNrPVwiY2xvc2VcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cImJ0biBidG4tc20gYnRuLXRyYW5zcGFyZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiYmkgYmkteC1sZ1wiPjwvaT5cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgLFxyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLkJPRFkgPSB7XHJcbiAgICAgICAgVEFHOiBcInNlY3Rpb25cIixcclxuICAgICAgICBDTEFTU19OQU1FOiBbXCJjYXJkLWJvZHlcIl0sXHJcbiAgICAgICAgSU5ORVJfSFRNTDogYFxyXG4gICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cInctMTAwIGgtMTAwXCI+PC90ZXh0YXJlYT5cclxuICAgICAgICBgXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuQ09STkVSUyA9IHtcclxuICAgICAgICBUQUc6IFwiZGl2XCIsXHJcbiAgICAgICAgQ0xBU1NfTkFNRTogW10sXHJcbiAgICAgICAgSU5ORVJfSFRNTCA6IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29ybmVyLWxlZnRcIiBjb3JuZXI9XCJsZWZ0XCI+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvcm5lci10b3BcIiBjb3JuZXI9XCJ0b3BcIj48L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29ybmVyLXRvcC1sZWZ0XCIgY29ybmVyPVwidG9wLWxlZnRcIj48L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29ybmVyLXRvcC1yaWdodFwiIGNvcm5lcj1cInRvcC1yaWdodFwiPjwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb3JuZXItcmlnaHRcIiBjb3JuZXI9XCJyaWdodFwiPjwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb3JuZXItYm90dG9tXCIgY29ybmVyPVwiYm90dG9tXCI+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvcm5lci1ib3R0b20tbGVmdFwiIGNvcm5lcj1cImJvdHRvbS1sZWZ0XCI+PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvcm5lci1ib3R0b20tcmlnaHRcIiBjb3JuZXI9XCJib3R0b20tcmlnaHRcIj48L2Rpdj5cclxuICAgICAgICBgXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuQ09OVEFJTkVSID0ge1xyXG4gICAgICAgIFRBRzogXCJkaXZcIixcclxuICAgICAgICBDTEFTU19OQU1FOiBbXCJjYXJkXCIsIFwicG9zaXRpb24tYWJzb2x1dGVcIl0sXHJcbiAgICAgICAgSU5ORVJfSFRNTDogYGBcclxuICAgIH07XHJcblxyXG59XHJcblxyXG4vKipcclxuICogQGF1dGhvciBKSExFRVxyXG4gKiBAbWVtYmVyb2YgTWVtb0NyZWF0b3JcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBkZXNjcmlwdGlvbiBBcHBlbmQgYSBtZW1vIGh0bWwgdG8gaXRzIG1vdGhlciBodG1sLlxyXG4gKiBAcmV0dXJuIHtNZW1vQ3JlYXRvcn1cclxuICovXHJcbk1lbW9DcmVhdG9yLnByb3RvdHlwZS5jcmVhdGVFbGVtID0gZnVuY3Rpb24gKHRhcmdldCl7XHJcbiAgICBjb25zdCBlbGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0aGlzW3RhcmdldF0uVEFHKTtcclxuICAgIGVsZW0uY2xhc3NMaXN0LmFkZCguLi50aGlzW3RhcmdldF0uQ0xBU1NfTkFNRSk7XHJcbiAgICBlbGVtLmlubmVySFRNTCA9IHRoaXNbdGFyZ2V0XS5JTk5FUl9IVE1MO1xyXG5cclxuICAgIHJldHVybiBlbGVtO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIEBhdXRob3IgSkhMRUVcclxuICogQG1lbWJlcm9mIE1lbW9DcmVhdG9yXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAZGVzY3JpcHRpb24gXHJcbiAqIEByZXR1cm4ge01lbW9DcmVhdG9yfVxyXG4gKi9cclxuTWVtb0NyZWF0b3IucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbiAoKXtcclxuICAgIGNvbnN0IGNvbnRhaW5lciA9IHRoaXMuY3JlYXRlRWxlbSh0aGlzLkVMRU1TLkNPTlRBSU5FUik7XHJcbiAgICBjb25zdCBoZWFkZXIgPSB0aGlzLmNyZWF0ZUVsZW0odGhpcy5FTEVNUy5IRUFERVIpOyBcclxuICAgIGNvbnN0IGJvZHkgPSB0aGlzLmNyZWF0ZUVsZW0odGhpcy5FTEVNUy5CT0RZKTsgXHJcbiAgICBjb25zdCBjb3JuZXJzID0gdGhpcy5jcmVhdGVFbGVtKHRoaXMuRUxFTVMuQ09STkVSUyk7IFxyXG5cclxuICAgIGNvbnRhaW5lci5zdHlsZS53aWR0aCA9IHRoaXMuZGVmU2V0dGluZy53aWR0aDtcclxuICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSB0aGlzLmRlZlNldHRpbmcuaGVpZ2h0O1xyXG4gICAgY29udGFpbmVyLnN0eWxlLnRvcCA9IGAke3RoaXMuZGVmU2V0dGluZy50b3AgKyBnZXRSYW5kb21JbnQodGhpcy5kZWZTZXR0aW5nLnJhbmRvbVBvc1JhbmdlKX1weGA7XHJcbiAgICBjb250YWluZXIuc3R5bGUubGVmdCA9IGAke3RoaXMuZGVmU2V0dGluZy5sZWZ0ICsgZ2V0UmFuZG9tSW50KHRoaXMuZGVmU2V0dGluZy5yYW5kb21Qb3NSYW5nZSl9cHhgOyBcclxuXHJcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGVyKTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChib2R5KTtcclxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChjb3JuZXJzKTtcclxuXHJcbiAgICBjb25zdCBlbGVtcyA9IHtcclxuICAgICAgICBjb250YWluZXIsXHJcbiAgICAgICAgaGVhZGVyLFxyXG4gICAgICAgIGJvZHksXHJcbiAgICAgICAgY29ybmVyc1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICByZXR1cm4gZWxlbXM7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiBnZXRSYW5kb21JbnQobWF4KSB7XHJcblxyXG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heCk7XHJcbiAgfSIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjUwNDYxMWIxNTAyZjk3MzBhNDRmXCIpIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9