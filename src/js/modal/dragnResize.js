import { store } from "../reducer/store";

export function DragnResize(width = 200, height = 230){
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
        width: Number(width),
        height: Number(height),
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
    store.dispatch({ type: "current/active", name });
    store.dispatch({ type: "resize/start", name, mousePosition, resizeTriggerProp});

    return this;
}

/**
 * Get resized modal information
 */
DragnResize.prototype.resizeInfo = function (){
    const selectValue = state => state.resizer;
    const resizeInfo = selectValue(store.getState())
    return resizeInfo;
}


DragnResize.prototype.resizedModalInfo = function (){
    return this.getModal()[this.resizeInfo().name];
}

DragnResize.prototype.resizedModalSize = function (){
    return this.modalMinimumSize;
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
* set modal x position with mouse x position
* @param {number} mousePositionX - changed x position
*/
DragnResize.prototype.setPositionWithMouseX = function(mousePositionX){
    let position = {
        x: mousePositionX,
        y: this.getOriginPosition().y
    };
    return position;
}

/**
* set modal y position with mouse y position
* @param {number} mousePositionY - changed y position
*/
DragnResize.prototype.setPositionWithMouseY = function(mousePositionY){
    //set new position
    let position = {
        x: this.getOriginPosition().x,
        y: mousePositionY,
    };
    return position;
}

/**
 * check if resized width is narrower than the width of minimum size
 * @param {number} width - resized width
 */
DragnResize.prototype.checkIfMinimumWidth = function(width){
    
    return (width < this.resizedModalSize().width) ? true : false;
}

/**
 * check if resized height is shorter than the height of minimum size
 * @param {number} height - resized height
 */
DragnResize.prototype.checkIfMinimumHeight = function(height){
    return (height < this.resizedModalSize().height) ? true : false;
}



/**
 * resize: mouse move event handler
 */
 DragnResize.prototype.resizeModal = function(e){
    let mousePositionX = e.pageX;
    let mousePositionY = e.pageY;
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
                position = this.setPositionWithMouseX(mousePositionX);
                this.updateModal(size, position, this);
                this.body.classList.remove('not-allowed');
            }else{
                // this.body.style.cursor = "not-allowed";
                this.body.classList.add('not-allowed');
            }

            break;
        case this.CORNER_RESIZER.RIGHT:
            
            width = this.getWidthFromPositionedModal(mousePositionX);
            size = this.setSizeWithWidth(width);

            if(size){
                // size && this.updateModalSize(size);
                this.updateModalSize(size);
                this.body.style.cursor = "ew-resize";
                this.body.classList.remove('not-allowed');
            }else{
                this.body.classList.add('not-allowed');
            }

            break;
        case this.CORNER_RESIZER.BOTTOM:
            
            height = this.getHeightFromPositionedModal(mousePositionY);
            size = this.setSizeWithHeight(height);
            
            if(size){
                this.body.style.cursor = "ns-resize";
                this.updateModalSize(size);
                this.body.classList.remove('not-allowed');

            }else{
                this.body.classList.add('not-allowed');
                
            }
            // size && this.updateModalSize(size);

            break;
        case this.CORNER_RESIZER.TOP:
            //get new height
            height = this.getHeightFromUnpositionedModal(mousePositionY);
            size = this.setSizeWithHeight(height);
            
            if (size) {
                position = this.setPositionWithMouseY(mousePositionY);
                this.updateModal(size, position, this);
                this.body.style.cursor = "ns-resize";
                this.body.classList.remove('not-allowed');
            }else{
                this.body.classList.add('not-allowed');
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
                // this.body.style.cursor = "not-allowed";
                this.body.classList.add('not-allowed');
                return;
            } 

            this.body.classList.remove('not-allowed');
            this.body.style.cursor = "nesw-resize";

            if (isWidthNarrow && !isHeightShort) {
                width = this.resizedModalSize().width;

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
                y: mousePositionY,
            }
            //check modal size
            isWidthNarrow = this.checkIfMinimumWidth(width);
            isHeightShort = this.checkIfMinimumHeight(height);
            if (isWidthNarrow && isHeightShort) {
                this.body.classList.add('not-allowed');
                return;
            }
            
            this.body.classList.remove('not-allowed');
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
                this.body.classList.add('not-allowed');
                return;
            } 
            
            this.body.style.cursor = "nwse-resize";
            this.body.classList.remove('not-allowed');
        
            this.checkIfMinimumWidth(width) && (width = this.resizedModalSize().width);

            this.checkIfMinimumHeight(height) && (height = this.resizedModalSize().height);

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
                this.body.classList.add('not-allowed');
                return;
            } 
            
            this.body.style.cursor = "nesw-resize";
            this.body.classList.remove('not-allowed');

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
    const selectValue = state => state.modal;
    const modal = selectValue(store.getState());
    return modal;
}

/**
 * Get the current size of the resize modal
 */
DragnResize.prototype.getOriginSize = function(){
    const modal = this.resizedModalInfo();
    return { width: parseFloat(modal.width), height: parseFloat(modal.height) };
}

/**
 * send redux store the size of the modal
 */
 DragnResize.prototype.updateModalSize = function(size){
    store.dispatch({ 
        type: "modal/size", 
        name: this.resizeInfo().name, 
        width: size.width, 
        height: size.height
    });
}


/**
* send redux store the position and the size of the modal
*/
DragnResize.prototype.updateModal = function(size, position) {
    // store.dispatch(setPositionAndSizeOfModal(getName(), position, size));
    store.dispatch({ 
        type: "modal/update", 
        name: this.resizeInfo().name, 
        x: position.x, 
        y: position.y, 
        width: size.width, 
        height: size.height 
    });
}


/**
 * Get the position of the resize modal
 */
DragnResize.prototype.getOriginPosition = function(){
    const modal = this.resizedModalInfo();
    return { x: parseFloat(modal.x), y: parseFloat(modal.y) };
}


/**
 * Subscribe if the modal resize has finished
 */  
DragnResize.prototype.subscribeIfFinishResize = function(){
    this.body.addEventListener('mouseup', e => this.finishResizeHandler(e));
    this.body.addEventListener('mouseleave', e => this.finishResizeHandler(e));
}


/**
 * Send redux if the resize is done
 */
DragnResize.prototype.finishResizeHandler = function(e){
    e.preventDefault();
    e.stopPropagation();
    
    //set mouse cursor back to normal
    this.body.style.cursor = "default";
    this.body.classList.remove('not-allowed');

    //if user was resizing, quit resize
    this.isModalResized() && store.dispatch({ type: "resize/end" });

}


DragnResize.prototype.subscribe = function (){
    this.subscribeIfResize();
    this.subscribeIfFinishResize();

    return this;
}

