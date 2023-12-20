import { baser } from "../../app";
import { getZIndex } from "../reducer/modal";
import { store } from "../reducer/store";

export function DragnResize(width = 200, height = 200, modal = false){
    this.MODAL_RESIZER = {
        LEFT : "resizer-left",
        TOP : "resizer-top",
        TOP_LEFT : "resizer-top-left",
        TOP_RIGHT : "resizer-top-right",
        RIGHT : "resizer-right",
        BOTTOM : "resizer-bottom",
        BOTTOM_LEFT : "resizer-bottom-left",
        BOTTOM_RIGHT : "resizer-bottom-right",
    };

    this.COLUMN_RESIZER = "resizer-column";
    this.WIDTH_RESIZER = "resizer-width";
    
    this.modalMinimumSize = {
        width: Number(width),
        height: Number(height),
    };

    //minimum height of workinglist
    this.minimumHeight = 120;
    
    this.navTop_height = 33;

    /**
    * @author JHLEE
    * @member DragnResize#body
    * @type {Element}
    * @description The body element
    */
    this.body = document.querySelector('body');
    this.modal = modal && modal;
    // this.modalHeader = modal && modal.querySelector('[name="modal-header"]');
    // this.modalName = this.modalHeader ? this.modalHeader.dataset.name : null;

}



/**
 * @author JHLEE
 * @memberof DragnResize
 * @function
 * @description Initialize events
 * @return {DragnResize}
 */
DragnResize.prototype.init = function (){

    //mouse down resize click start event to handle modal resize
    for(const property in this.MODAL_RESIZER){
        const resizeTriggerProp = this.MODAL_RESIZER[property];
        const resizeTriggers = this.modal.querySelectorAll(`[data-role="${resizeTriggerProp}"]`);
        if(resizeTriggers.length > 0){
            resizeTriggers.forEach( elem => {
                elem.addEventListener('mousedown', e => this.resizeClickStartHandler(e, this));
            })
        }
    }

    //modal's column resize event handler
    const columnResizers = this.modal.querySelectorAll(`[data-role="${this.COLUMN_RESIZER}"]`);
    columnResizers.forEach (resizer => {
      resizer.addEventListener('mousedown', e => this.resizeColumnHandler(e, this));  
    })


    return this;
};


DragnResize.prototype.resizeColumnHandler = function (e, _this){
    e.preventDefault();
    e.stopPropagation();
    
    const name = _this.modal.getAttribute('name');
    const targetParent = e.currentTarget.parentElement;
    const target = targetParent.dataset.type; //name
    const rectWidth = targetParent.closest('[column-container]').getBoundingClientRect().width;

    //target info including size and position
    const listX = targetParent.getBoundingClientRect().x;
    const listWidth = targetParent.getBoundingClientRect().width;

    //targeted list's right next sibling
    const siblingElem = targetParent.nextElementSibling;
    const sibling = siblingElem.dataset.type;
    const siblingInfo = {
        right: siblingElem.getBoundingClientRect().right
    };

    //send information to resize column function to compute the percentage of width
    store.dispatch({ type: "resizeColumn/start", name, target, sibling, siblingInfo, listX, listWidth, rectWidth });

}

DragnResize.prototype.resizeClickStartHandler = function (e, _this){
    e.preventDefault();
    e.stopPropagation();
    const resizeTrigger = e.currentTarget;
    const resizeTriggerName = resizeTrigger.parentElement.querySelector('header').dataset.name;
    const resizeTriggerProp = resizeTrigger.dataset.role;

    // if(isHeightMax && isWidthMax){
    //   return;
    // }
    let mousePosition = {
        x: e.pageX,
        y: e.pageY
    };

    _this.updateAsCurrent(resizeTriggerName, mousePosition, resizeTriggerProp);

}

DragnResize.prototype.updateAsCurrent = function(name, mousePosition, resizeTriggerProp){
    // store.dispatch({ type: "absMenu/activate", name, zIndex: getZIndex() });
    store.dispatch({ type: "current/active", name, isModal: true });
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

DragnResize.prototype.heightResizeInfo = function (){
    const selectValue = state => state.heightResizer;
    const resizeInfo = selectValue(store.getState())

    return resizeInfo;
}

DragnResize.prototype.columnResizeInfo = function (){
    const selectValue = state => state.columnResizer;
    const resizeInfo = selectValue(store.getState())

    return resizeInfo;
}

DragnResize.prototype.resizedModalInfo = function (){

    return this.getModal()[this.resizeInfo().name];
}

DragnResize.prototype.resizedModalSize = function (){
    return baser.modalList.getList()[this.resizeInfo().name].getResizer().modalMinimumSize;
}


/**
 * Get the status of resize
 */
DragnResize.prototype.isModalResized = function (){
    return this.resizeInfo().isResized;
}

DragnResize.prototype.isHeightResized = function (){
    return this.heightResizeInfo().isResized;
}

DragnResize.prototype.isColumnResized = function(){
    return this.columnResizeInfo().isResized;
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
    }else if(this.isHeightResized()){
        this.resizeHeight(e);
    }else if(this.isColumnResized()){
        this.resizeColumn(e);
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
    let height = (this.getOriginPosition().y + this.getOriginSize().height) - mousePositionY + Number(this.navTop_height);
    // let height = (this.getOriginPosition().y + this.getOriginSize().height) - mousePositionY;
    return height;
}

/**
* calc height when mouse resizing position DOES NOT effect of modal position
* - height must minus status bar height, otherwise, it gets the size includes of status bar height
* @param {number} mousePositionY - e.pageY which is the mouse y position
*/
DragnResize.prototype.getHeightFromPositionedModal = function(mousePositionY){
    let height = mousePositionY - this.getOriginPosition().y - Number(this.navTop_height);
    // let height = mousePositionY - this.getOriginPosition().y;
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
        y: mousePositionY - Number(this.navTop_height),
        // y: mousePositionY,
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
    let resizeTriggerProp = this.resizeInfo().resizeTriggerProp; //clickedFrom

    let isMinWidth = this.getOriginSize().width === this.resizedModalSize().width;
    let isMinHeight = this.getOriginSize().height === this.resizedModalSize().height;
    // console.log(isMinWidth, this.checkIfMinimumWidth())

    let isWidthNarrow = false;
    let isHeightShort = false;

    let width = 0;
    let height= 0;
    let size = 0;
    let position = 0;

    switch(resizeTriggerProp){
        case this.MODAL_RESIZER.LEFT:
            //when it's minimum width && mouse is inside of the modal => wait until mouse come back on right position
            // console.log(this.getOriginSize().width, this.resizedModalSize().width)
            
            // if (isMinWidth && (mousePositionX > this.getOriginPosition().x)) { 
            //     return; 
            // }

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
        case this.MODAL_RESIZER.RIGHT:
            
            //when it's minimum width && mouse is inside of the modal => wait until mouse come back on right position
            // if (isMinWidth && (mousePositionX < this.getOriginPosition().x + this.resizedModalSize().width)) {
                //     return;
                // }
                
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
        case this.MODAL_RESIZER.BOTTOM:
            
            //check mouse position when the height is minimum
            // if (isMinHeight && (mousePositionY < (this.getOriginPosition().y + this.resizedModalSize().height))) { return; }
            
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
        case this.MODAL_RESIZER.TOP:
            
            //check mouse position when the height is minimum
            // if (isMinHeight && (mousePositionY > getOriginPosition().y + getNavTopHeight())) { return; }
            // if (isMinHeight && (mousePositionY > this.getOriginPosition().y)) { return; }
            
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
        case this.MODAL_RESIZER.TOP_RIGHT:
            //get new width
            width = this.getWidthFromPositionedModal(mousePositionX);
            //get new height
            height = this.getHeightFromUnpositionedModal(mousePositionY);
            //set new position
            position = {
                x: this.getOriginPosition().x,
                y: mousePositionY - Number(this.navTop_height),
                // y: mousePositionY,
            }
              //check modal size
            //   isWidthNarrow = width < this.resizedModalSize().width;
            //   isHeightShort = height < this.resizedModalSize().height;
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
        case this.MODAL_RESIZER.TOP_LEFT:

            width = this.getWidthFromUnpositionedModal(mousePositionX);
            height = this.getHeightFromUnpositionedModal(mousePositionY);
            position = {
                x: mousePositionX,
                y: mousePositionY - Number(this.navTop_height),
                // y: mousePositionY,
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
        case this.MODAL_RESIZER.BOTTOM_RIGHT:
            
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
        case this.MODAL_RESIZER.BOTTOM_LEFT:
            
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
    const zIndex = this.resizedModalInfo().zIndex;
    store.dispatch({ 
        type: "modal/size", 
        name: this.resizeInfo().name, 
        width: size.width, 
        height: size.height, 
        zIndex 
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

    this.isHeightResized() && store.dispatch({ type: "resizeHeight/end"  });

    this.isColumnResized() && store.dispatch({ type: "resizeColumn/end", name: this.columnResizeInfo().name });
    // const ifColumnResized = columnResizer.resize;
    // const columnResizedTarget = columnResizer.target;
    // ifColumnResized && dispatch({ type: "resizeColumn/end", name: columnResizedTarget });

    // const ifWidthResized = widthResizer.resize;
    // const widthResizedTarget = widthResizer.target;
    // ifWidthResized && dispatch({ type: "resizeWidth/end", name: widthResizedTarget });

}

DragnResize.prototype.resizeHeight = function(e){
    this.body.style.cursor = "ns-resize";
    this.body.querySelector('#imca').style.cursor = "ns-resize";

    const height = this.heightResizeInfo().height + (this.heightResizeInfo().mousePosition.y - e.pageY);

    
    if(this.minimumHeight >= height){
        this.body.style.cursor = "not-allowed";
        return;
    }

    store.dispatch({type: "resizeHeight/update", 
        height, 
        mousePosition: {
            x: e.pageX,
            y: e.pageY
        }
    });

}

DragnResize.prototype.resizeColumn = function(e){
    const minWidth= 50;
     //set mouse cursor
     this.body.style.cursor = 'col-resize';
     //name is the triggered modal
     const columnResizer = this.columnResizeInfo();
     const name = columnResizer.name;

     const newWidth = e.pageX - columnResizer[name].listX;
     const newSiblingWidth = columnResizer[name].siblingInfo.right - e.pageX;
     const rectWidth = columnResizer[name].rectWidth;

     //sibling is the triggered column's sibling elements
     const sibling = columnResizer[name].sibling;
     if (newWidth < minWidth || newSiblingWidth < minWidth) return;
    
     const width = newWidth / rectWidth * 100;
     const siblingWidth = newSiblingWidth / rectWidth * 100;
     //target is the triggered column
     const target = columnResizer[name].target;

     store.dispatch({ type: "resizeColumn/update", name, target, width, sibling, siblingWidth });

     return this;
}

DragnResize.prototype.subscribe = function (){
    this.subscribeIfHeightResize();
    this.subscribeIfResize();
    this.subscribeIfFinishResize();

    return this;
}

DragnResize.prototype.subscribeIfHeightResize = function(){
    store.subscribe( () => {
        this.updateHeightState();
    });

    return this;
}

DragnResize.prototype.updateHeightState = function (){
    const heightResizer = store.getState().heightResizer;
    if (!heightResizer.isResized) {
      return;
    }

    document.querySelector(`[name="${heightResizer.name}"]`).style.height = 
        `${heightResizer.height}px`;
    document.querySelector(`[name="${heightResizer.name}"]`).style.minHeight = 
    `${heightResizer.height}px`;
        
    //canvas also get resized -> need to redraw 
    // baser.getPallet().paint();
    // console.log(document.querySelector(`[name="${heightResizer.name}"]`))

}

DragnResize.prototype.subscribeIfColumnResize = function(){
    store.subscribe( () => {
        this.updateColumnState();
    });
}

DragnResize.prototype.updateColumnState = function (){
    const columnResizer = store.getState().columnResizer;
    if (!columnResizer.isResized) {
      return;
    }

    const modalName = columnResizer.name
    const modalInfo = columnResizer[modalName];
    const triggerColumn = modalInfo.target;
    const siblingColumn = modalInfo.sibling;
    const types = modalInfo.types;
    
    this.modal.querySelectorAll(`[data-type="${triggerColumn}"]`).forEach(column => {
        column.style.width = `${types[triggerColumn].width}%`;
    });

    this.modal.querySelectorAll(`[data-type="${siblingColumn}"]`).forEach(column => {
        column.style.width = `${types[siblingColumn].width}%`;
    });

}