import { NAV_HEIGHT } from "../app";
import { store } from "../reducer/store";

export function Resize(width = "200px", height = "230px"){
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
    * @member Resize#body
    * @type {Element}
    * @description The body element
    */
    this.body = document.querySelector('body');

    this.modal = null;
}



/**
 * @author JHLEE
 * @memberof Resize
 * @function
 * @description Initialize events
 * @return {Resize}
 */
Resize.prototype.init = function (modal){
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


Resize.prototype.resizeClickStartHandler = function (e, _this){
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

Resize.prototype.updateAsCurrent = function(name, mousePosition, resizeTriggerProp){
    store.dispatch({ type: "focus", name });
    store.dispatch({ type: "modalResizeObserver/start", name, mousePosition, resizeTriggerProp});

    return this;
}

/**
 * Get resized modal information
 */
Resize.prototype.resizeInfo = function (){
    const selectValue = state => state.modalResizeObserver;
    const resizeInfo = selectValue(store.getState())
    return resizeInfo;
}


Resize.prototype.resizedModalInfo = function (){
    return this.getModal()[this.resizeInfo().name];
}

/**
 * Get the status of resize
 */
Resize.prototype.isModalResized = function (){
    return this.resizeInfo().isResized;
}


/**
 * @author JHLEE
 * @memberof Resize
 * @function
 * @description Maybe only body element would need this to subscribe if
 *              any of modal has been triggered to be resized.
 */
 Resize.prototype.subscribeIfResize = function(){
    this.body.addEventListener('mousemove', e => this.resizeHandler(e, this));
}

/**
 * Handle resize when mouse moves
 */
Resize.prototype.resizeHandler = function (e){
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
Resize.prototype.getWidthFromUnpositionedModal = function(mousePositionX) {
   let width = (this.getOriginPosition().x + this.getOriginSize().width) - mousePositionX;

   return width;
}

 /** 
 * calc width when mouse resizing position DOES NOT effect of modal position
 * @param {number} mousePositionX - e.pageX which is the mouse x position
 */
Resize.prototype.getWidthFromPositionedModal = function(mousePositionX) {
    let width = mousePositionX - this.getOriginPosition().x;
    return width;
}


/**
 * calc height when mouse resizing position DOES effect of modal position
 * @param {number} mousePositionY - e.pageY which is the mouse y position
 */
 Resize.prototype.getHeightFromUnpositionedModal = function(mousePositionY){
    let height = (this.getOriginPosition().y + this.getOriginSize().height) - mousePositionY;


    return height;
}

/**
* calc height when mouse resizing position DOES NOT effect of modal position
* @param {number} mousePositionY - e.pageY which is the mouse y position
*/
Resize.prototype.getHeightFromPositionedModal = function(mousePositionY){
    let height = mousePositionY - this.getOriginPosition().y;
    return height;
}



/**
 * if width minimum ? return null : set modal size with changed width
 * @param {number} width - changed width
 */
Resize.prototype.setSizeWithWidth = function(width) {
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
Resize.prototype.setSizeWithHeight = function(height){
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
Resize.prototype.checkIfMinimumWidth = function(width){
    
    return (width < this.modalMinimumSize.width) ? true : false;
}

/**
 * check if resized height is shorter than the height of minimum size
 * @param {number} height - resized height
 */
Resize.prototype.checkIfMinimumHeight = function(height){
    return (height < this.modalMinimumSize.height) ? true : false;
}



/**
 * resize: mouse move event handler
 */
 Resize.prototype.resizeModal = function(e){
    let mousePositionX = e.pageX;
    let mousePositionY = e.pageY;

    //if mouse is on the statusbar, do nothing
    if(mousePositionY < NAV_HEIGHT){
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
Resize.prototype.getModal = function(){
    const selectValue = state => state.modalMutateObserver;
    const modal = selectValue(store.getState());
    return modal;
}

/**
 * Get the current size of the resize modal
 */
Resize.prototype.getOriginSize = function(){
    const modal = this.resizedModalInfo();
    return { width: parseFloat(modal.width.match(/\d+/g)[0]), height: parseFloat(modal.height.match(/\d+/g)[0]) };
}

/**
 * send redux store the size of the modal
 */
 Resize.prototype.updateModalSize = function(size){
    store.dispatch({ 
        type: "modalMutateObserver/size", 
        name: this.resizeInfo().name, 
        width: `${size.width}px`, 
        height: `${size.height}px`
    });
}


/**
* send redux store the position and the size of the modal
*/
Resize.prototype.updateModal = function(size, position) {
    // store.dispatch(setPositionAndSizeOfModal(getName(), position, size));
    store.dispatch({ 
        type: "modalMutateObserver/update", 
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
Resize.prototype.getOriginPosition = function(){
    const modal = this.resizedModalInfo();
    return { x: parseFloat(modal.x.match(/\d+/g)[0]), y: parseFloat(modal.y.match(/\d+/g)[0]) };
}


/**
 * Subscribe if the modal resize has finished
 */  
Resize.prototype.subscribeIfFinishResize = function(){
    this.body.addEventListener('mouseup', e => this.finishResizeHandler(e));
    // this.body.addEventListener('mouseleave', e => this.finishResizeHandler(e));
}


/**
 * Send redux if the resize is done
 */
Resize.prototype.finishResizeHandler = function(e){
    e.preventDefault();
    e.stopPropagation();
    
    //set mouse cursor back to normal
    this.body.style.cursor = "default";

    //if user was resizing, quit resize
    this.isModalResized() && store.dispatch({ type: "modalResizeObserver/end" });

}


Resize.prototype.subscribe = function (){
    this.subscribeIfResize();
    this.subscribeIfFinishResize();

    return this;
}

