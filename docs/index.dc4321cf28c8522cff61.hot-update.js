"use strict";
self["webpackHotUpdatememo"]("index",{

/***/ "./src/js/modal/dragnResize.js":
/*!*************************************!*\
  !*** ./src/js/modal/dragnResize.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DragnResize: () => (/* binding */ DragnResize)
/* harmony export */ });
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../app */ "./src/js/app.js");
/* harmony import */ var _reducer_store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../reducer/store */ "./src/js/reducer/store.js");



function DragnResize(width = "200px", height = "230px"){
    this.CORNER_RESIZER = {
        LEFT : "left",
        TOP : "top",
        TOP_LEFT : "top-left",
        TOP_RIGHT : "top-right",
        RIGHT : "right",
        BOTTOM : "bottom",
        BOTTOM_LEFT : "bottom-left",
        BOTTOM_RIGHT : "bottom-right",
    };

    this.modalMinimumSize = {
        width: Number(width.match(/\d+/g)[0]),
        height: Number(height.match(/\d+/g)[0]),
    };

    /**
    * @author JHLEE
    * @member DragnResize#body
    * @type {Element}
    * @description The body element
    */
    this.body = document.querySelector('body');

    this.modal = null;
}



/**
 * @author JHLEE
 * @memberof DragnResize
 * @function
 * @description Initialize events
 * @return {DragnResize}
 */
DragnResize.prototype.init = function (modal){
    this.modal = modal;

    //mouse down resize click start event to handle modal resize
    for(const property in this.CORNER_RESIZER){
        const resizeTriggerProp = this.CORNER_RESIZER[property];
        const resizeTriggers = this.modal.querySelectorAll(`[corner="${resizeTriggerProp}"]`);
        if(resizeTriggers.length > 0){
            resizeTriggers.forEach( trigger => {
                trigger.addEventListener('mousedown', e => this.resizeClickStartHandler(e, this));
            })
        }
    }

    return this;
};


DragnResize.prototype.resizeClickStartHandler = function (e, _this){
    e.preventDefault();
    const resizeTrigger = e.currentTarget;
    const resizeTriggerName = resizeTrigger.parentElement.parentElement.dataset.name;
    const resizeTriggerProp = resizeTrigger.getAttribute("corner");

    let mousePosition = {
        x: e.pageX,
        y: e.pageY
    };

    _this.updateAsCurrent(resizeTriggerName, mousePosition, resizeTriggerProp);

}

DragnResize.prototype.updateAsCurrent = function(name, mousePosition, resizeTriggerProp){
    _reducer_store__WEBPACK_IMPORTED_MODULE_1__.store.dispatch({ type: "active", name });
    _reducer_store__WEBPACK_IMPORTED_MODULE_1__.store.dispatch({ type: "resize/start", name, mousePosition, resizeTriggerProp});

    return this;
}

/**
 * Get resized modal information
 */
DragnResize.prototype.resizeInfo = function (){
    const selectValue = state => state.resize;
    const resizeInfo = selectValue(_reducer_store__WEBPACK_IMPORTED_MODULE_1__.store.getState())
    return resizeInfo;
}


DragnResize.prototype.resizedModalInfo = function (){
    return this.getModal()[this.resizeInfo().name];
}

/**
 * Get the status of resize
 */
DragnResize.prototype.isModalResized = function (){
    return this.resizeInfo().isResized;
}


/**
 * @author JHLEE
 * @memberof DragnResize
 * @function
 * @description Maybe only body element would need this to subscribe if
 *              any of modal has been triggered to be resized.
 */
 DragnResize.prototype.subscribeIfResize = function(){
    this.body.addEventListener('mousemove', e => this.resizeHandler(e, this));
}

/**
 * Handle resize when mouse moves
 */
DragnResize.prototype.resizeHandler = function (e){
    e.preventDefault();
    e.stopPropagation();

    if(this.isModalResized()){
        this.resizeModal(e);
    }
    
}    

/**
* calc width when mouse resizing position DOES effect of modal position
* @param {number} mousePositionX - e.pageX which is the mouse x position
*/
DragnResize.prototype.getWidthFromUnpositionedModal = function(mousePositionX) {
   let width = (this.getOriginPosition().x + this.getOriginSize().width) - mousePositionX;

   return width;
}

 /** 
 * calc width when mouse resizing position DOES NOT effect of modal position
 * @param {number} mousePositionX - e.pageX which is the mouse x position
 */
DragnResize.prototype.getWidthFromPositionedModal = function(mousePositionX) {
    let width = mousePositionX - this.getOriginPosition().x;
    return width;
}


/**
 * calc height when mouse resizing position DOES effect of modal position
 * @param {number} mousePositionY - e.pageY which is the mouse y position
 */
 DragnResize.prototype.getHeightFromUnpositionedModal = function(mousePositionY){
    let height = (this.getOriginPosition().y + this.getOriginSize().height) - mousePositionY;


    return height;
}

/**
* calc height when mouse resizing position DOES NOT effect of modal position
* @param {number} mousePositionY - e.pageY which is the mouse y position
*/
DragnResize.prototype.getHeightFromPositionedModal = function(mousePositionY){
    let height = mousePositionY - this.getOriginPosition().y;
    return height;
}



/**
 * if width minimum ? return null : set modal size with changed width
 * @param {number} width - changed width
 */
DragnResize.prototype.setSizeWithWidth = function(width) {
    //check if width < min width => return;
    let isMinimum = this.checkIfMinimumWidth(width);
    if (isMinimum) {
        return null;
    }

    let size = {
        width,
        height: this.getOriginSize().height,
    };

    return size;
}


/**
* if height minimum ? return null : set modal size with changed height
* @param {number} height - changed height
*/
DragnResize.prototype.setSizeWithHeight = function(height){
    let isMinimum = this.checkIfMinimumHeight(height);
    
    if (isMinimum) {
        return null;
    }
    let size = {
        width: this.getOriginSize().width,
        height,
    }

    return size;
};

/**
 * check if resized width is narrower than the width of minimum size
 * @param {number} width - resized width
 */
DragnResize.prototype.checkIfMinimumWidth = function(width){
    
    return (width < this.modalMinimumSize.width) ? true : false;
}

/**
 * check if resized height is shorter than the height of minimum size
 * @param {number} height - resized height
 */
DragnResize.prototype.checkIfMinimumHeight = function(height){
    return (height < this.modalMinimumSize.height) ? true : false;
}



/**
 * resize: mouse move event handler
 */
 DragnResize.prototype.resizeModal = function(e){
    let mousePositionX = e.pageX;
    let mousePositionY = e.pageY;

    //if mouse is on the statusbar, do nothing
    if(mousePositionY < _app__WEBPACK_IMPORTED_MODULE_0__.NAV_HEIGHT){
        return;
    }

    //which part triggered from modal
    let resizeTriggerProp = this.resizeInfo().resizeTriggerProp; 

    let isWidthNarrow = false;
    let isHeightShort = false;

    let width = 0;
    let height= 0;
    let size = 0;
    let position = 0;

    switch(resizeTriggerProp){
        case this.CORNER_RESIZER.LEFT:
            width = this.getWidthFromUnpositionedModal(mousePositionX);
            size = this.setSizeWithWidth(width);
            
            if (size) {
                this.body.style.cursor = "ew-resize";
                position = {
                    x: mousePositionX,
                    y: this.getOriginPosition().y
                };

                this.updateModal(size, position, this);
            }

            break;
        case this.CORNER_RESIZER.RIGHT:
            
            width = this.getWidthFromPositionedModal(mousePositionX);
            size = this.setSizeWithWidth(width);

            if(size){
                this.updateModalSize(size);
                this.body.style.cursor = "ew-resize";
            }

            break;
        case this.CORNER_RESIZER.BOTTOM:
            
            height = this.getHeightFromPositionedModal(mousePositionY);
            size = this.setSizeWithHeight(height);
            
            if(size){
                this.body.style.cursor = "ns-resize";
                this.updateModalSize(size);

            }

            break;
        case this.CORNER_RESIZER.TOP:
            //get new height

            height = this.getHeightFromUnpositionedModal(mousePositionY);
            size = this.setSizeWithHeight(height);
            
            if (size) {
                position = {
                    x: this.getOriginPosition().x,
                    y: mousePositionY,
                };

                this.updateModal(size, position, this);
                this.body.style.cursor = "ns-resize";
            }

            break;
        case this.CORNER_RESIZER.TOP_RIGHT:
            //get new width
            width = this.getWidthFromPositionedModal(mousePositionX);
            //get new height
            height = this.getHeightFromUnpositionedModal(mousePositionY);
            //set new position
            position = {
                x: this.getOriginPosition().x,
                y: mousePositionY,
            }
              //check modal size
            isWidthNarrow = this.checkIfMinimumWidth(width);
            isHeightShort = this.checkIfMinimumHeight(height);
            
            if (isWidthNarrow && isHeightShort) {
                return;
            } 

            this.body.style.cursor = "nesw-resize";

            if (isWidthNarrow && !isHeightShort) {
                width = this.modalMinimumSize.width;

            } else if (!isWidthNarrow && isHeightShort) {
                size = {
                    width,
                    height: this.getOriginSize().height,
                };
                this.updateModalSize(size);
                break;
            }
            //set new size
            size = {
                width,
                height,
            };

            this.updateModal(size, position);

            break;
        case this.CORNER_RESIZER.TOP_LEFT:

            width = this.getWidthFromUnpositionedModal(mousePositionX);
            height = this.getHeightFromUnpositionedModal(mousePositionY);
            position = {
                x: mousePositionX,
                y: mousePositionY
                // y: mousePositionY < NAV_HEIGHT ? NAV_HEIGHT : mousePositionY,
            }
            //check modal size
            isWidthNarrow = this.checkIfMinimumWidth(width);
            isHeightShort = this.checkIfMinimumHeight(height);
            if (isWidthNarrow && isHeightShort) {
                return;
            }
            
            this.body.style.cursor = "nwse-resize";

            if (isWidthNarrow && !isHeightShort) {
                size = {
                    width: this.getOriginSize().width,
                    height,
                };
                position.x = this.getOriginPosition().x;
            } else if (!isWidthNarrow && isHeightShort) {
                size = {
                    width,
                    height: this.getOriginSize().height,
                };
                position.y = this.getOriginPosition().y;
            } else {
                //set new size
                size = {
                    width,
                    height,
                };
            }
            this.updateModal(size, position);

            break;
        case this.CORNER_RESIZER.BOTTOM_RIGHT:
            
            width = this.getWidthFromPositionedModal(mousePositionX);
            height = this.getHeightFromPositionedModal(mousePositionY);

            isWidthNarrow = this.checkIfMinimumWidth(width);
            isHeightShort = this.checkIfMinimumHeight(height);
            
            if (isWidthNarrow && isHeightShort) {
                return;
            } 
            
            this.body.style.cursor = "nwse-resize";
        
            this.checkIfMinimumWidth(width) && (width = this.modalMinimumSize.width);
            this.checkIfMinimumHeight(height) && (height = this.modalMinimumSize.height);

            size = {
                width,
                height,
            };

            this.updateModalSize(size);

            break;
        case this.CORNER_RESIZER.BOTTOM_LEFT:
            
            width = this.getWidthFromUnpositionedModal(mousePositionX);
            height = this.getHeightFromPositionedModal(mousePositionY);
            
            position = {
                x: mousePositionX,
                y: this.getOriginPosition().y,
            }
            //check modal size
            isWidthNarrow = this.checkIfMinimumWidth(width);
            isHeightShort = this.checkIfMinimumHeight(height);
            if (isWidthNarrow && isHeightShort) {
                return;
            } 
            
            this.body.style.cursor = "nesw-resize";

            if (isWidthNarrow && !isHeightShort) {
                size = {
                    width: this.getOriginSize().width,
                    height,
                };
                this.updateModalSize(size);
                break;
            } else if (!isWidthNarrow && isHeightShort) {
                size = {
                    width,
                    height: this.getOriginSize().height,
                };
                //set new position
                position.y = this.getOriginPosition().y;
            } else {
                size = {
                    width,
                    height,
                };
            }
            this.updateModal(size, position);

            break;
        default:
            break;
    }
}


/**
 * Get all the modal information
 */
DragnResize.prototype.getModal = function(){
    const selectValue = state => state.mutate;
    const modal = selectValue(_reducer_store__WEBPACK_IMPORTED_MODULE_1__.store.getState());
    return modal;
}

/**
 * Get the current size of the resize modal
 */
DragnResize.prototype.getOriginSize = function(){
    const modal = this.resizedModalInfo();
    return { width: parseFloat(modal.width.match(/\d+/g)[0]), height: parseFloat(modal.height.match(/\d+/g)[0]) };
}

/**
 * send redux store the size of the modal
 */
 DragnResize.prototype.updateModalSize = function(size){
    _reducer_store__WEBPACK_IMPORTED_MODULE_1__.store.dispatch({ 
        type: "mutate/size", 
        name: this.resizeInfo().name, 
        width: `${size.width}px`, 
        height: `${size.height}px`
    });
}


/**
* send redux store the position and the size of the modal
*/
DragnResize.prototype.updateModal = function(size, position) {
    // store.dispatch(setPositionAndSizeOfModal(getName(), position, size));
    _reducer_store__WEBPACK_IMPORTED_MODULE_1__.store.dispatch({ 
        type: "mutate/update", 
        name: this.resizeInfo().name, 
        x: `${position.x}px`, 
        y: `${position.y}px`, 
        width: `${size.width}px`, 
        height: `${size.height}px` 
    });
}


/**
 * Get the position of the resize modal
 */
DragnResize.prototype.getOriginPosition = function(){
    const modal = this.resizedModalInfo();
    return { x: parseFloat(modal.x.match(/\d+/g)[0]), y: parseFloat(modal.y.match(/\d+/g)[0]) };
}


/**
 * Subscribe if the modal resize has finished
 */  
DragnResize.prototype.subscribeIfFinishResize = function(){
    this.body.addEventListener('mouseup', e => this.finishResizeHandler(e));
    // this.body.addEventListener('mouseleave', e => this.finishResizeHandler(e));
}


/**
 * Send redux if the resize is done
 */
DragnResize.prototype.finishResizeHandler = function(e){
    e.preventDefault();
    e.stopPropagation();
    
    //set mouse cursor back to normal
    this.body.style.cursor = "default";

    //if user was resizing, quit resize
    this.isModalResized() && _reducer_store__WEBPACK_IMPORTED_MODULE_1__.store.dispatch({ type: "resize/end" });

}


DragnResize.prototype.subscribe = function (){
    this.subscribeIfResize();
    this.subscribeIfFinishResize();

    return this;
}



/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("1ed8afd28af37011c3f2")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguZGM0MzIxY2YyOGM4NTIyY2ZmNjEuaG90LXVwZGF0ZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBb0M7QUFDSztBQUN6QztBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVFQUF1RSxrQkFBa0I7QUFDekY7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGlEQUFLLFlBQVksc0JBQXNCO0FBQzNDLElBQUksaURBQUssWUFBWSw2REFBNkQ7QUFDbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLGlEQUFLO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsUUFBUTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxRQUFRO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxRQUFRO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsNENBQVU7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBOEIsaURBQUs7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLGlEQUFLO0FBQ1Q7QUFDQTtBQUNBLGtCQUFrQixXQUFXO0FBQzdCLG1CQUFtQixZQUFZO0FBQy9CLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSxpREFBSztBQUNUO0FBQ0E7QUFDQSxjQUFjLFdBQVc7QUFDekIsY0FBYyxXQUFXO0FBQ3pCLGtCQUFrQixXQUFXO0FBQzdCLG1CQUFtQixZQUFZO0FBQy9CLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsaURBQUssWUFBWSxvQkFBb0I7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O1VDOWhCQSIsInNvdXJjZXMiOlsid2VicGFjazovL21lbW8vLi9zcmMvanMvbW9kYWwvZHJhZ25SZXNpemUuanMiLCJ3ZWJwYWNrOi8vbWVtby93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTkFWX0hFSUdIVCB9IGZyb20gXCIuLi9hcHBcIjtcclxuaW1wb3J0IHsgc3RvcmUgfSBmcm9tIFwiLi4vcmVkdWNlci9zdG9yZVwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIERyYWduUmVzaXplKHdpZHRoID0gXCIyMDBweFwiLCBoZWlnaHQgPSBcIjIzMHB4XCIpe1xyXG4gICAgdGhpcy5DT1JORVJfUkVTSVpFUiA9IHtcclxuICAgICAgICBMRUZUIDogXCJsZWZ0XCIsXHJcbiAgICAgICAgVE9QIDogXCJ0b3BcIixcclxuICAgICAgICBUT1BfTEVGVCA6IFwidG9wLWxlZnRcIixcclxuICAgICAgICBUT1BfUklHSFQgOiBcInRvcC1yaWdodFwiLFxyXG4gICAgICAgIFJJR0hUIDogXCJyaWdodFwiLFxyXG4gICAgICAgIEJPVFRPTSA6IFwiYm90dG9tXCIsXHJcbiAgICAgICAgQk9UVE9NX0xFRlQgOiBcImJvdHRvbS1sZWZ0XCIsXHJcbiAgICAgICAgQk9UVE9NX1JJR0hUIDogXCJib3R0b20tcmlnaHRcIixcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5tb2RhbE1pbmltdW1TaXplID0ge1xyXG4gICAgICAgIHdpZHRoOiBOdW1iZXIod2lkdGgubWF0Y2goL1xcZCsvZylbMF0pLFxyXG4gICAgICAgIGhlaWdodDogTnVtYmVyKGhlaWdodC5tYXRjaCgvXFxkKy9nKVswXSksXHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgKiBAYXV0aG9yIEpITEVFXHJcbiAgICAqIEBtZW1iZXIgRHJhZ25SZXNpemUjYm9keVxyXG4gICAgKiBAdHlwZSB7RWxlbWVudH1cclxuICAgICogQGRlc2NyaXB0aW9uIFRoZSBib2R5IGVsZW1lbnRcclxuICAgICovXHJcbiAgICB0aGlzLmJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcblxyXG4gICAgdGhpcy5tb2RhbCA9IG51bGw7XHJcbn1cclxuXHJcblxyXG5cclxuLyoqXHJcbiAqIEBhdXRob3IgSkhMRUVcclxuICogQG1lbWJlcm9mIERyYWduUmVzaXplXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAZGVzY3JpcHRpb24gSW5pdGlhbGl6ZSBldmVudHNcclxuICogQHJldHVybiB7RHJhZ25SZXNpemV9XHJcbiAqL1xyXG5EcmFnblJlc2l6ZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uIChtb2RhbCl7XHJcbiAgICB0aGlzLm1vZGFsID0gbW9kYWw7XHJcblxyXG4gICAgLy9tb3VzZSBkb3duIHJlc2l6ZSBjbGljayBzdGFydCBldmVudCB0byBoYW5kbGUgbW9kYWwgcmVzaXplXHJcbiAgICBmb3IoY29uc3QgcHJvcGVydHkgaW4gdGhpcy5DT1JORVJfUkVTSVpFUil7XHJcbiAgICAgICAgY29uc3QgcmVzaXplVHJpZ2dlclByb3AgPSB0aGlzLkNPUk5FUl9SRVNJWkVSW3Byb3BlcnR5XTtcclxuICAgICAgICBjb25zdCByZXNpemVUcmlnZ2VycyA9IHRoaXMubW9kYWwucXVlcnlTZWxlY3RvckFsbChgW2Nvcm5lcj1cIiR7cmVzaXplVHJpZ2dlclByb3B9XCJdYCk7XHJcbiAgICAgICAgaWYocmVzaXplVHJpZ2dlcnMubGVuZ3RoID4gMCl7XHJcbiAgICAgICAgICAgIHJlc2l6ZVRyaWdnZXJzLmZvckVhY2goIHRyaWdnZXIgPT4ge1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBlID0+IHRoaXMucmVzaXplQ2xpY2tTdGFydEhhbmRsZXIoZSwgdGhpcykpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcblxyXG5EcmFnblJlc2l6ZS5wcm90b3R5cGUucmVzaXplQ2xpY2tTdGFydEhhbmRsZXIgPSBmdW5jdGlvbiAoZSwgX3RoaXMpe1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29uc3QgcmVzaXplVHJpZ2dlciA9IGUuY3VycmVudFRhcmdldDtcclxuICAgIGNvbnN0IHJlc2l6ZVRyaWdnZXJOYW1lID0gcmVzaXplVHJpZ2dlci5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZGF0YXNldC5uYW1lO1xyXG4gICAgY29uc3QgcmVzaXplVHJpZ2dlclByb3AgPSByZXNpemVUcmlnZ2VyLmdldEF0dHJpYnV0ZShcImNvcm5lclwiKTtcclxuXHJcbiAgICBsZXQgbW91c2VQb3NpdGlvbiA9IHtcclxuICAgICAgICB4OiBlLnBhZ2VYLFxyXG4gICAgICAgIHk6IGUucGFnZVlcclxuICAgIH07XHJcblxyXG4gICAgX3RoaXMudXBkYXRlQXNDdXJyZW50KHJlc2l6ZVRyaWdnZXJOYW1lLCBtb3VzZVBvc2l0aW9uLCByZXNpemVUcmlnZ2VyUHJvcCk7XHJcblxyXG59XHJcblxyXG5EcmFnblJlc2l6ZS5wcm90b3R5cGUudXBkYXRlQXNDdXJyZW50ID0gZnVuY3Rpb24obmFtZSwgbW91c2VQb3NpdGlvbiwgcmVzaXplVHJpZ2dlclByb3Ape1xyXG4gICAgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiBcImFjdGl2ZVwiLCBuYW1lIH0pO1xyXG4gICAgc3RvcmUuZGlzcGF0Y2goeyB0eXBlOiBcInJlc2l6ZS9zdGFydFwiLCBuYW1lLCBtb3VzZVBvc2l0aW9uLCByZXNpemVUcmlnZ2VyUHJvcH0pO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59XHJcblxyXG4vKipcclxuICogR2V0IHJlc2l6ZWQgbW9kYWwgaW5mb3JtYXRpb25cclxuICovXHJcbkRyYWduUmVzaXplLnByb3RvdHlwZS5yZXNpemVJbmZvID0gZnVuY3Rpb24gKCl7XHJcbiAgICBjb25zdCBzZWxlY3RWYWx1ZSA9IHN0YXRlID0+IHN0YXRlLnJlc2l6ZTtcclxuICAgIGNvbnN0IHJlc2l6ZUluZm8gPSBzZWxlY3RWYWx1ZShzdG9yZS5nZXRTdGF0ZSgpKVxyXG4gICAgcmV0dXJuIHJlc2l6ZUluZm87XHJcbn1cclxuXHJcblxyXG5EcmFnblJlc2l6ZS5wcm90b3R5cGUucmVzaXplZE1vZGFsSW5mbyA9IGZ1bmN0aW9uICgpe1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0TW9kYWwoKVt0aGlzLnJlc2l6ZUluZm8oKS5uYW1lXTtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgc3RhdHVzIG9mIHJlc2l6ZVxyXG4gKi9cclxuRHJhZ25SZXNpemUucHJvdG90eXBlLmlzTW9kYWxSZXNpemVkID0gZnVuY3Rpb24gKCl7XHJcbiAgICByZXR1cm4gdGhpcy5yZXNpemVJbmZvKCkuaXNSZXNpemVkO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIEBhdXRob3IgSkhMRUVcclxuICogQG1lbWJlcm9mIERyYWduUmVzaXplXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAZGVzY3JpcHRpb24gTWF5YmUgb25seSBib2R5IGVsZW1lbnQgd291bGQgbmVlZCB0aGlzIHRvIHN1YnNjcmliZSBpZlxyXG4gKiAgICAgICAgICAgICAgYW55IG9mIG1vZGFsIGhhcyBiZWVuIHRyaWdnZXJlZCB0byBiZSByZXNpemVkLlxyXG4gKi9cclxuIERyYWduUmVzaXplLnByb3RvdHlwZS5zdWJzY3JpYmVJZlJlc2l6ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICB0aGlzLmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZSA9PiB0aGlzLnJlc2l6ZUhhbmRsZXIoZSwgdGhpcykpO1xyXG59XHJcblxyXG4vKipcclxuICogSGFuZGxlIHJlc2l6ZSB3aGVuIG1vdXNlIG1vdmVzXHJcbiAqL1xyXG5EcmFnblJlc2l6ZS5wcm90b3R5cGUucmVzaXplSGFuZGxlciA9IGZ1bmN0aW9uIChlKXtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gICAgaWYodGhpcy5pc01vZGFsUmVzaXplZCgpKXtcclxuICAgICAgICB0aGlzLnJlc2l6ZU1vZGFsKGUpO1xyXG4gICAgfVxyXG4gICAgXHJcbn0gICAgXHJcblxyXG4vKipcclxuKiBjYWxjIHdpZHRoIHdoZW4gbW91c2UgcmVzaXppbmcgcG9zaXRpb24gRE9FUyBlZmZlY3Qgb2YgbW9kYWwgcG9zaXRpb25cclxuKiBAcGFyYW0ge251bWJlcn0gbW91c2VQb3NpdGlvblggLSBlLnBhZ2VYIHdoaWNoIGlzIHRoZSBtb3VzZSB4IHBvc2l0aW9uXHJcbiovXHJcbkRyYWduUmVzaXplLnByb3RvdHlwZS5nZXRXaWR0aEZyb21VbnBvc2l0aW9uZWRNb2RhbCA9IGZ1bmN0aW9uKG1vdXNlUG9zaXRpb25YKSB7XHJcbiAgIGxldCB3aWR0aCA9ICh0aGlzLmdldE9yaWdpblBvc2l0aW9uKCkueCArIHRoaXMuZ2V0T3JpZ2luU2l6ZSgpLndpZHRoKSAtIG1vdXNlUG9zaXRpb25YO1xyXG5cclxuICAgcmV0dXJuIHdpZHRoO1xyXG59XHJcblxyXG4gLyoqIFxyXG4gKiBjYWxjIHdpZHRoIHdoZW4gbW91c2UgcmVzaXppbmcgcG9zaXRpb24gRE9FUyBOT1QgZWZmZWN0IG9mIG1vZGFsIHBvc2l0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBtb3VzZVBvc2l0aW9uWCAtIGUucGFnZVggd2hpY2ggaXMgdGhlIG1vdXNlIHggcG9zaXRpb25cclxuICovXHJcbkRyYWduUmVzaXplLnByb3RvdHlwZS5nZXRXaWR0aEZyb21Qb3NpdGlvbmVkTW9kYWwgPSBmdW5jdGlvbihtb3VzZVBvc2l0aW9uWCkge1xyXG4gICAgbGV0IHdpZHRoID0gbW91c2VQb3NpdGlvblggLSB0aGlzLmdldE9yaWdpblBvc2l0aW9uKCkueDtcclxuICAgIHJldHVybiB3aWR0aDtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBjYWxjIGhlaWdodCB3aGVuIG1vdXNlIHJlc2l6aW5nIHBvc2l0aW9uIERPRVMgZWZmZWN0IG9mIG1vZGFsIHBvc2l0aW9uXHJcbiAqIEBwYXJhbSB7bnVtYmVyfSBtb3VzZVBvc2l0aW9uWSAtIGUucGFnZVkgd2hpY2ggaXMgdGhlIG1vdXNlIHkgcG9zaXRpb25cclxuICovXHJcbiBEcmFnblJlc2l6ZS5wcm90b3R5cGUuZ2V0SGVpZ2h0RnJvbVVucG9zaXRpb25lZE1vZGFsID0gZnVuY3Rpb24obW91c2VQb3NpdGlvblkpe1xyXG4gICAgbGV0IGhlaWdodCA9ICh0aGlzLmdldE9yaWdpblBvc2l0aW9uKCkueSArIHRoaXMuZ2V0T3JpZ2luU2l6ZSgpLmhlaWdodCkgLSBtb3VzZVBvc2l0aW9uWTtcclxuXHJcblxyXG4gICAgcmV0dXJuIGhlaWdodDtcclxufVxyXG5cclxuLyoqXHJcbiogY2FsYyBoZWlnaHQgd2hlbiBtb3VzZSByZXNpemluZyBwb3NpdGlvbiBET0VTIE5PVCBlZmZlY3Qgb2YgbW9kYWwgcG9zaXRpb25cclxuKiBAcGFyYW0ge251bWJlcn0gbW91c2VQb3NpdGlvblkgLSBlLnBhZ2VZIHdoaWNoIGlzIHRoZSBtb3VzZSB5IHBvc2l0aW9uXHJcbiovXHJcbkRyYWduUmVzaXplLnByb3RvdHlwZS5nZXRIZWlnaHRGcm9tUG9zaXRpb25lZE1vZGFsID0gZnVuY3Rpb24obW91c2VQb3NpdGlvblkpe1xyXG4gICAgbGV0IGhlaWdodCA9IG1vdXNlUG9zaXRpb25ZIC0gdGhpcy5nZXRPcmlnaW5Qb3NpdGlvbigpLnk7XHJcbiAgICByZXR1cm4gaGVpZ2h0O1xyXG59XHJcblxyXG5cclxuXHJcbi8qKlxyXG4gKiBpZiB3aWR0aCBtaW5pbXVtID8gcmV0dXJuIG51bGwgOiBzZXQgbW9kYWwgc2l6ZSB3aXRoIGNoYW5nZWQgd2lkdGhcclxuICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoIC0gY2hhbmdlZCB3aWR0aFxyXG4gKi9cclxuRHJhZ25SZXNpemUucHJvdG90eXBlLnNldFNpemVXaXRoV2lkdGggPSBmdW5jdGlvbih3aWR0aCkge1xyXG4gICAgLy9jaGVjayBpZiB3aWR0aCA8IG1pbiB3aWR0aCA9PiByZXR1cm47XHJcbiAgICBsZXQgaXNNaW5pbXVtID0gdGhpcy5jaGVja0lmTWluaW11bVdpZHRoKHdpZHRoKTtcclxuICAgIGlmIChpc01pbmltdW0pIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgc2l6ZSA9IHtcclxuICAgICAgICB3aWR0aCxcclxuICAgICAgICBoZWlnaHQ6IHRoaXMuZ2V0T3JpZ2luU2l6ZSgpLmhlaWdodCxcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIHNpemU7XHJcbn1cclxuXHJcblxyXG4vKipcclxuKiBpZiBoZWlnaHQgbWluaW11bSA/IHJldHVybiBudWxsIDogc2V0IG1vZGFsIHNpemUgd2l0aCBjaGFuZ2VkIGhlaWdodFxyXG4qIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHQgLSBjaGFuZ2VkIGhlaWdodFxyXG4qL1xyXG5EcmFnblJlc2l6ZS5wcm90b3R5cGUuc2V0U2l6ZVdpdGhIZWlnaHQgPSBmdW5jdGlvbihoZWlnaHQpe1xyXG4gICAgbGV0IGlzTWluaW11bSA9IHRoaXMuY2hlY2tJZk1pbmltdW1IZWlnaHQoaGVpZ2h0KTtcclxuICAgIFxyXG4gICAgaWYgKGlzTWluaW11bSkge1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgbGV0IHNpemUgPSB7XHJcbiAgICAgICAgd2lkdGg6IHRoaXMuZ2V0T3JpZ2luU2l6ZSgpLndpZHRoLFxyXG4gICAgICAgIGhlaWdodCxcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gc2l6ZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBjaGVjayBpZiByZXNpemVkIHdpZHRoIGlzIG5hcnJvd2VyIHRoYW4gdGhlIHdpZHRoIG9mIG1pbmltdW0gc2l6ZVxyXG4gKiBAcGFyYW0ge251bWJlcn0gd2lkdGggLSByZXNpemVkIHdpZHRoXHJcbiAqL1xyXG5EcmFnblJlc2l6ZS5wcm90b3R5cGUuY2hlY2tJZk1pbmltdW1XaWR0aCA9IGZ1bmN0aW9uKHdpZHRoKXtcclxuICAgIFxyXG4gICAgcmV0dXJuICh3aWR0aCA8IHRoaXMubW9kYWxNaW5pbXVtU2l6ZS53aWR0aCkgPyB0cnVlIDogZmFsc2U7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBjaGVjayBpZiByZXNpemVkIGhlaWdodCBpcyBzaG9ydGVyIHRoYW4gdGhlIGhlaWdodCBvZiBtaW5pbXVtIHNpemVcclxuICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodCAtIHJlc2l6ZWQgaGVpZ2h0XHJcbiAqL1xyXG5EcmFnblJlc2l6ZS5wcm90b3R5cGUuY2hlY2tJZk1pbmltdW1IZWlnaHQgPSBmdW5jdGlvbihoZWlnaHQpe1xyXG4gICAgcmV0dXJuIChoZWlnaHQgPCB0aGlzLm1vZGFsTWluaW11bVNpemUuaGVpZ2h0KSA/IHRydWUgOiBmYWxzZTtcclxufVxyXG5cclxuXHJcblxyXG4vKipcclxuICogcmVzaXplOiBtb3VzZSBtb3ZlIGV2ZW50IGhhbmRsZXJcclxuICovXHJcbiBEcmFnblJlc2l6ZS5wcm90b3R5cGUucmVzaXplTW9kYWwgPSBmdW5jdGlvbihlKXtcclxuICAgIGxldCBtb3VzZVBvc2l0aW9uWCA9IGUucGFnZVg7XHJcbiAgICBsZXQgbW91c2VQb3NpdGlvblkgPSBlLnBhZ2VZO1xyXG5cclxuICAgIC8vaWYgbW91c2UgaXMgb24gdGhlIHN0YXR1c2JhciwgZG8gbm90aGluZ1xyXG4gICAgaWYobW91c2VQb3NpdGlvblkgPCBOQVZfSEVJR0hUKXtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy93aGljaCBwYXJ0IHRyaWdnZXJlZCBmcm9tIG1vZGFsXHJcbiAgICBsZXQgcmVzaXplVHJpZ2dlclByb3AgPSB0aGlzLnJlc2l6ZUluZm8oKS5yZXNpemVUcmlnZ2VyUHJvcDsgXHJcblxyXG4gICAgbGV0IGlzV2lkdGhOYXJyb3cgPSBmYWxzZTtcclxuICAgIGxldCBpc0hlaWdodFNob3J0ID0gZmFsc2U7XHJcblxyXG4gICAgbGV0IHdpZHRoID0gMDtcclxuICAgIGxldCBoZWlnaHQ9IDA7XHJcbiAgICBsZXQgc2l6ZSA9IDA7XHJcbiAgICBsZXQgcG9zaXRpb24gPSAwO1xyXG5cclxuICAgIHN3aXRjaChyZXNpemVUcmlnZ2VyUHJvcCl7XHJcbiAgICAgICAgY2FzZSB0aGlzLkNPUk5FUl9SRVNJWkVSLkxFRlQ6XHJcbiAgICAgICAgICAgIHdpZHRoID0gdGhpcy5nZXRXaWR0aEZyb21VbnBvc2l0aW9uZWRNb2RhbChtb3VzZVBvc2l0aW9uWCk7XHJcbiAgICAgICAgICAgIHNpemUgPSB0aGlzLnNldFNpemVXaXRoV2lkdGgod2lkdGgpO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYgKHNpemUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYm9keS5zdHlsZS5jdXJzb3IgPSBcImV3LXJlc2l6ZVwiO1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogbW91c2VQb3NpdGlvblgsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogdGhpcy5nZXRPcmlnaW5Qb3NpdGlvbigpLnlcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RhbChzaXplLCBwb3NpdGlvbiwgdGhpcyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgdGhpcy5DT1JORVJfUkVTSVpFUi5SSUdIVDpcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHdpZHRoID0gdGhpcy5nZXRXaWR0aEZyb21Qb3NpdGlvbmVkTW9kYWwobW91c2VQb3NpdGlvblgpO1xyXG4gICAgICAgICAgICBzaXplID0gdGhpcy5zZXRTaXplV2l0aFdpZHRoKHdpZHRoKTtcclxuXHJcbiAgICAgICAgICAgIGlmKHNpemUpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RhbFNpemUoc2l6ZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvZHkuc3R5bGUuY3Vyc29yID0gXCJldy1yZXNpemVcIjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSB0aGlzLkNPUk5FUl9SRVNJWkVSLkJPVFRPTTpcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGhlaWdodCA9IHRoaXMuZ2V0SGVpZ2h0RnJvbVBvc2l0aW9uZWRNb2RhbChtb3VzZVBvc2l0aW9uWSk7XHJcbiAgICAgICAgICAgIHNpemUgPSB0aGlzLnNldFNpemVXaXRoSGVpZ2h0KGhlaWdodCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZihzaXplKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYm9keS5zdHlsZS5jdXJzb3IgPSBcIm5zLXJlc2l6ZVwiO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RhbFNpemUoc2l6ZSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIHRoaXMuQ09STkVSX1JFU0laRVIuVE9QOlxyXG4gICAgICAgICAgICAvL2dldCBuZXcgaGVpZ2h0XHJcblxyXG4gICAgICAgICAgICBoZWlnaHQgPSB0aGlzLmdldEhlaWdodEZyb21VbnBvc2l0aW9uZWRNb2RhbChtb3VzZVBvc2l0aW9uWSk7XHJcbiAgICAgICAgICAgIHNpemUgPSB0aGlzLnNldFNpemVXaXRoSGVpZ2h0KGhlaWdodCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoc2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogdGhpcy5nZXRPcmlnaW5Qb3NpdGlvbigpLngsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogbW91c2VQb3NpdGlvblksXHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kYWwoc2l6ZSwgcG9zaXRpb24sIHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ib2R5LnN0eWxlLmN1cnNvciA9IFwibnMtcmVzaXplXCI7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgdGhpcy5DT1JORVJfUkVTSVpFUi5UT1BfUklHSFQ6XHJcbiAgICAgICAgICAgIC8vZ2V0IG5ldyB3aWR0aFxyXG4gICAgICAgICAgICB3aWR0aCA9IHRoaXMuZ2V0V2lkdGhGcm9tUG9zaXRpb25lZE1vZGFsKG1vdXNlUG9zaXRpb25YKTtcclxuICAgICAgICAgICAgLy9nZXQgbmV3IGhlaWdodFxyXG4gICAgICAgICAgICBoZWlnaHQgPSB0aGlzLmdldEhlaWdodEZyb21VbnBvc2l0aW9uZWRNb2RhbChtb3VzZVBvc2l0aW9uWSk7XHJcbiAgICAgICAgICAgIC8vc2V0IG5ldyBwb3NpdGlvblxyXG4gICAgICAgICAgICBwb3NpdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgIHg6IHRoaXMuZ2V0T3JpZ2luUG9zaXRpb24oKS54LFxyXG4gICAgICAgICAgICAgICAgeTogbW91c2VQb3NpdGlvblksXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAvL2NoZWNrIG1vZGFsIHNpemVcclxuICAgICAgICAgICAgaXNXaWR0aE5hcnJvdyA9IHRoaXMuY2hlY2tJZk1pbmltdW1XaWR0aCh3aWR0aCk7XHJcbiAgICAgICAgICAgIGlzSGVpZ2h0U2hvcnQgPSB0aGlzLmNoZWNrSWZNaW5pbXVtSGVpZ2h0KGhlaWdodCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoaXNXaWR0aE5hcnJvdyAmJiBpc0hlaWdodFNob3J0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gXHJcblxyXG4gICAgICAgICAgICB0aGlzLmJvZHkuc3R5bGUuY3Vyc29yID0gXCJuZXN3LXJlc2l6ZVwiO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzV2lkdGhOYXJyb3cgJiYgIWlzSGVpZ2h0U2hvcnQpIHtcclxuICAgICAgICAgICAgICAgIHdpZHRoID0gdGhpcy5tb2RhbE1pbmltdW1TaXplLndpZHRoO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIGlmICghaXNXaWR0aE5hcnJvdyAmJiBpc0hlaWdodFNob3J0KSB7XHJcbiAgICAgICAgICAgICAgICBzaXplID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5nZXRPcmlnaW5TaXplKCkuaGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kYWxTaXplKHNpemUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9zZXQgbmV3IHNpemVcclxuICAgICAgICAgICAgc2l6ZSA9IHtcclxuICAgICAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0LFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RhbChzaXplLCBwb3NpdGlvbik7XHJcblxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIHRoaXMuQ09STkVSX1JFU0laRVIuVE9QX0xFRlQ6XHJcblxyXG4gICAgICAgICAgICB3aWR0aCA9IHRoaXMuZ2V0V2lkdGhGcm9tVW5wb3NpdGlvbmVkTW9kYWwobW91c2VQb3NpdGlvblgpO1xyXG4gICAgICAgICAgICBoZWlnaHQgPSB0aGlzLmdldEhlaWdodEZyb21VbnBvc2l0aW9uZWRNb2RhbChtb3VzZVBvc2l0aW9uWSk7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uID0ge1xyXG4gICAgICAgICAgICAgICAgeDogbW91c2VQb3NpdGlvblgsXHJcbiAgICAgICAgICAgICAgICB5OiBtb3VzZVBvc2l0aW9uWVxyXG4gICAgICAgICAgICAgICAgLy8geTogbW91c2VQb3NpdGlvblkgPCBOQVZfSEVJR0hUID8gTkFWX0hFSUdIVCA6IG1vdXNlUG9zaXRpb25ZLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vY2hlY2sgbW9kYWwgc2l6ZVxyXG4gICAgICAgICAgICBpc1dpZHRoTmFycm93ID0gdGhpcy5jaGVja0lmTWluaW11bVdpZHRoKHdpZHRoKTtcclxuICAgICAgICAgICAgaXNIZWlnaHRTaG9ydCA9IHRoaXMuY2hlY2tJZk1pbmltdW1IZWlnaHQoaGVpZ2h0KTtcclxuICAgICAgICAgICAgaWYgKGlzV2lkdGhOYXJyb3cgJiYgaXNIZWlnaHRTaG9ydCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmJvZHkuc3R5bGUuY3Vyc29yID0gXCJud3NlLXJlc2l6ZVwiO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzV2lkdGhOYXJyb3cgJiYgIWlzSGVpZ2h0U2hvcnQpIHtcclxuICAgICAgICAgICAgICAgIHNpemUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMuZ2V0T3JpZ2luU2l6ZSgpLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodCxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbi54ID0gdGhpcy5nZXRPcmlnaW5Qb3NpdGlvbigpLng7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWlzV2lkdGhOYXJyb3cgJiYgaXNIZWlnaHRTaG9ydCkge1xyXG4gICAgICAgICAgICAgICAgc2l6ZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMuZ2V0T3JpZ2luU2l6ZSgpLmhlaWdodCxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbi55ID0gdGhpcy5nZXRPcmlnaW5Qb3NpdGlvbigpLnk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvL3NldCBuZXcgc2l6ZVxyXG4gICAgICAgICAgICAgICAgc2l6ZSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTW9kYWwoc2l6ZSwgcG9zaXRpb24pO1xyXG5cclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSB0aGlzLkNPUk5FUl9SRVNJWkVSLkJPVFRPTV9SSUdIVDpcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHdpZHRoID0gdGhpcy5nZXRXaWR0aEZyb21Qb3NpdGlvbmVkTW9kYWwobW91c2VQb3NpdGlvblgpO1xyXG4gICAgICAgICAgICBoZWlnaHQgPSB0aGlzLmdldEhlaWdodEZyb21Qb3NpdGlvbmVkTW9kYWwobW91c2VQb3NpdGlvblkpO1xyXG5cclxuICAgICAgICAgICAgaXNXaWR0aE5hcnJvdyA9IHRoaXMuY2hlY2tJZk1pbmltdW1XaWR0aCh3aWR0aCk7XHJcbiAgICAgICAgICAgIGlzSGVpZ2h0U2hvcnQgPSB0aGlzLmNoZWNrSWZNaW5pbXVtSGVpZ2h0KGhlaWdodCk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZiAoaXNXaWR0aE5hcnJvdyAmJiBpc0hlaWdodFNob3J0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmJvZHkuc3R5bGUuY3Vyc29yID0gXCJud3NlLXJlc2l6ZVwiO1xyXG4gICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmNoZWNrSWZNaW5pbXVtV2lkdGgod2lkdGgpICYmICh3aWR0aCA9IHRoaXMubW9kYWxNaW5pbXVtU2l6ZS53aWR0aCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tJZk1pbmltdW1IZWlnaHQoaGVpZ2h0KSAmJiAoaGVpZ2h0ID0gdGhpcy5tb2RhbE1pbmltdW1TaXplLmhlaWdodCk7XHJcblxyXG4gICAgICAgICAgICBzaXplID0ge1xyXG4gICAgICAgICAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGFsU2l6ZShzaXplKTtcclxuXHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgdGhpcy5DT1JORVJfUkVTSVpFUi5CT1RUT01fTEVGVDpcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIHdpZHRoID0gdGhpcy5nZXRXaWR0aEZyb21VbnBvc2l0aW9uZWRNb2RhbChtb3VzZVBvc2l0aW9uWCk7XHJcbiAgICAgICAgICAgIGhlaWdodCA9IHRoaXMuZ2V0SGVpZ2h0RnJvbVBvc2l0aW9uZWRNb2RhbChtb3VzZVBvc2l0aW9uWSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBwb3NpdGlvbiA9IHtcclxuICAgICAgICAgICAgICAgIHg6IG1vdXNlUG9zaXRpb25YLFxyXG4gICAgICAgICAgICAgICAgeTogdGhpcy5nZXRPcmlnaW5Qb3NpdGlvbigpLnksXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy9jaGVjayBtb2RhbCBzaXplXHJcbiAgICAgICAgICAgIGlzV2lkdGhOYXJyb3cgPSB0aGlzLmNoZWNrSWZNaW5pbXVtV2lkdGgod2lkdGgpO1xyXG4gICAgICAgICAgICBpc0hlaWdodFNob3J0ID0gdGhpcy5jaGVja0lmTWluaW11bUhlaWdodChoZWlnaHQpO1xyXG4gICAgICAgICAgICBpZiAoaXNXaWR0aE5hcnJvdyAmJiBpc0hlaWdodFNob3J0KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB0aGlzLmJvZHkuc3R5bGUuY3Vyc29yID0gXCJuZXN3LXJlc2l6ZVwiO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzV2lkdGhOYXJyb3cgJiYgIWlzSGVpZ2h0U2hvcnQpIHtcclxuICAgICAgICAgICAgICAgIHNpemUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMuZ2V0T3JpZ2luU2l6ZSgpLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodCxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZU1vZGFsU2l6ZShzaXplKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFpc1dpZHRoTmFycm93ICYmIGlzSGVpZ2h0U2hvcnQpIHtcclxuICAgICAgICAgICAgICAgIHNpemUgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgd2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLmdldE9yaWdpblNpemUoKS5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgLy9zZXQgbmV3IHBvc2l0aW9uXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbi55ID0gdGhpcy5nZXRPcmlnaW5Qb3NpdGlvbigpLnk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzaXplID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodCxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy51cGRhdGVNb2RhbChzaXplLCBwb3NpdGlvbik7XHJcblxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBHZXQgYWxsIHRoZSBtb2RhbCBpbmZvcm1hdGlvblxyXG4gKi9cclxuRHJhZ25SZXNpemUucHJvdG90eXBlLmdldE1vZGFsID0gZnVuY3Rpb24oKXtcclxuICAgIGNvbnN0IHNlbGVjdFZhbHVlID0gc3RhdGUgPT4gc3RhdGUubXV0YXRlO1xyXG4gICAgY29uc3QgbW9kYWwgPSBzZWxlY3RWYWx1ZShzdG9yZS5nZXRTdGF0ZSgpKTtcclxuICAgIHJldHVybiBtb2RhbDtcclxufVxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgY3VycmVudCBzaXplIG9mIHRoZSByZXNpemUgbW9kYWxcclxuICovXHJcbkRyYWduUmVzaXplLnByb3RvdHlwZS5nZXRPcmlnaW5TaXplID0gZnVuY3Rpb24oKXtcclxuICAgIGNvbnN0IG1vZGFsID0gdGhpcy5yZXNpemVkTW9kYWxJbmZvKCk7XHJcbiAgICByZXR1cm4geyB3aWR0aDogcGFyc2VGbG9hdChtb2RhbC53aWR0aC5tYXRjaCgvXFxkKy9nKVswXSksIGhlaWdodDogcGFyc2VGbG9hdChtb2RhbC5oZWlnaHQubWF0Y2goL1xcZCsvZylbMF0pIH07XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBzZW5kIHJlZHV4IHN0b3JlIHRoZSBzaXplIG9mIHRoZSBtb2RhbFxyXG4gKi9cclxuIERyYWduUmVzaXplLnByb3RvdHlwZS51cGRhdGVNb2RhbFNpemUgPSBmdW5jdGlvbihzaXplKXtcclxuICAgIHN0b3JlLmRpc3BhdGNoKHsgXHJcbiAgICAgICAgdHlwZTogXCJtdXRhdGUvc2l6ZVwiLCBcclxuICAgICAgICBuYW1lOiB0aGlzLnJlc2l6ZUluZm8oKS5uYW1lLCBcclxuICAgICAgICB3aWR0aDogYCR7c2l6ZS53aWR0aH1weGAsIFxyXG4gICAgICAgIGhlaWdodDogYCR7c2l6ZS5oZWlnaHR9cHhgXHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4qIHNlbmQgcmVkdXggc3RvcmUgdGhlIHBvc2l0aW9uIGFuZCB0aGUgc2l6ZSBvZiB0aGUgbW9kYWxcclxuKi9cclxuRHJhZ25SZXNpemUucHJvdG90eXBlLnVwZGF0ZU1vZGFsID0gZnVuY3Rpb24oc2l6ZSwgcG9zaXRpb24pIHtcclxuICAgIC8vIHN0b3JlLmRpc3BhdGNoKHNldFBvc2l0aW9uQW5kU2l6ZU9mTW9kYWwoZ2V0TmFtZSgpLCBwb3NpdGlvbiwgc2l6ZSkpO1xyXG4gICAgc3RvcmUuZGlzcGF0Y2goeyBcclxuICAgICAgICB0eXBlOiBcIm11dGF0ZS91cGRhdGVcIiwgXHJcbiAgICAgICAgbmFtZTogdGhpcy5yZXNpemVJbmZvKCkubmFtZSwgXHJcbiAgICAgICAgeDogYCR7cG9zaXRpb24ueH1weGAsIFxyXG4gICAgICAgIHk6IGAke3Bvc2l0aW9uLnl9cHhgLCBcclxuICAgICAgICB3aWR0aDogYCR7c2l6ZS53aWR0aH1weGAsIFxyXG4gICAgICAgIGhlaWdodDogYCR7c2l6ZS5oZWlnaHR9cHhgIFxyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogR2V0IHRoZSBwb3NpdGlvbiBvZiB0aGUgcmVzaXplIG1vZGFsXHJcbiAqL1xyXG5EcmFnblJlc2l6ZS5wcm90b3R5cGUuZ2V0T3JpZ2luUG9zaXRpb24gPSBmdW5jdGlvbigpe1xyXG4gICAgY29uc3QgbW9kYWwgPSB0aGlzLnJlc2l6ZWRNb2RhbEluZm8oKTtcclxuICAgIHJldHVybiB7IHg6IHBhcnNlRmxvYXQobW9kYWwueC5tYXRjaCgvXFxkKy9nKVswXSksIHk6IHBhcnNlRmxvYXQobW9kYWwueS5tYXRjaCgvXFxkKy9nKVswXSkgfTtcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiBTdWJzY3JpYmUgaWYgdGhlIG1vZGFsIHJlc2l6ZSBoYXMgZmluaXNoZWRcclxuICovICBcclxuRHJhZ25SZXNpemUucHJvdG90eXBlLnN1YnNjcmliZUlmRmluaXNoUmVzaXplID0gZnVuY3Rpb24oKXtcclxuICAgIHRoaXMuYm9keS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgZSA9PiB0aGlzLmZpbmlzaFJlc2l6ZUhhbmRsZXIoZSkpO1xyXG4gICAgLy8gdGhpcy5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCBlID0+IHRoaXMuZmluaXNoUmVzaXplSGFuZGxlcihlKSk7XHJcbn1cclxuXHJcblxyXG4vKipcclxuICogU2VuZCByZWR1eCBpZiB0aGUgcmVzaXplIGlzIGRvbmVcclxuICovXHJcbkRyYWduUmVzaXplLnByb3RvdHlwZS5maW5pc2hSZXNpemVIYW5kbGVyID0gZnVuY3Rpb24oZSl7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgXHJcbiAgICAvL3NldCBtb3VzZSBjdXJzb3IgYmFjayB0byBub3JtYWxcclxuICAgIHRoaXMuYm9keS5zdHlsZS5jdXJzb3IgPSBcImRlZmF1bHRcIjtcclxuXHJcbiAgICAvL2lmIHVzZXIgd2FzIHJlc2l6aW5nLCBxdWl0IHJlc2l6ZVxyXG4gICAgdGhpcy5pc01vZGFsUmVzaXplZCgpICYmIHN0b3JlLmRpc3BhdGNoKHsgdHlwZTogXCJyZXNpemUvZW5kXCIgfSk7XHJcblxyXG59XHJcblxyXG5cclxuRHJhZ25SZXNpemUucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uICgpe1xyXG4gICAgdGhpcy5zdWJzY3JpYmVJZlJlc2l6ZSgpO1xyXG4gICAgdGhpcy5zdWJzY3JpYmVJZkZpbmlzaFJlc2l6ZSgpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG59XHJcblxyXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCIxZWQ4YWZkMjhhZjM3MDExYzNmMlwiKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==