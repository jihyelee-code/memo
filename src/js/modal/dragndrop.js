import { NAV_HEIGHT } from "../app";
import { store } from "../reducer/store";

/**
 * @author JHLEE
 * @class DragnDrop
 * @constructor
 * @classdesc Drag and Drop Event Controller
 */
export function DragnDrop(){
    
  /**
  * @author JHLEE
  * @member DragnDrop#body
  * @type {Element}
  * @description The body element
  */
  this.body = document.querySelector('body');

}



/**
 * @author JHLEE
 * @memberof DragnDrop
 * @function
 * @description Initialize event
 * @return {DragnDrop}
 */
DragnDrop.prototype.init = function (header){
  header.addEventListener('mousedown', this.mouseDownHandler);
  return this;
};

DragnDrop.prototype.bodyEvnts = function (){
  this.body.addEventListener('mouseup', this.mouseUpHandler);
  this.body.addEventListener('mouseleave', this.mouseLeaveHandler);
  this.body.addEventListener('mousemove', this.mouseMoveHandler);
  return this;
}

/**
 * @author JHLEE
 * @memberof DragnDrop
 * @function
 * @description Drag start event handler
 * @param {Event} e Mouse down event param
 * @return {DragnDrop}
 */
DragnDrop.prototype.mouseDownHandler = function (e){
  e.preventDefault();
  //compute current position of mouse
  const mousePositionOnModal = {
      x: e.layerX,
      y: e.layerY,
  };

  const name = e.currentTarget.parentElement.dataset.name;

  store.dispatch({ type: "current/active", name });
  store.dispatch({
    type: "draggable/start",
    name,
    mousePosition: mousePositionOnModal,
  });

  return this;
}

/**
 * @author JHLEE
 * @memberof DragnDrop
 * @function
 * @description Dragging event handler
 * @param {Event} e Mouse move event
 * @return {DragnDrop}
 */
DragnDrop.prototype.mouseMoveHandler = function (e){
  e.preventDefault();
  e.stopPropagation();
  const getDraggable = (state) => state.draggable;
  const draggableStatus = getDraggable(store.getState());
  
  if (!draggableStatus.mouseOn) {
    return;
  }

  const mousePosition = draggableStatus.mousePosition;
  const name = draggableStatus.name;
  const computedY = e.pageY - mousePosition.y - NAV_HEIGHT;

  let modalPosition = {
    x: e.pageX - mousePosition.x, 
    // y: computedY < NAV_HEIGHT ? NAV_HEIGHT : computedY,
    y: computedY < 0 ? 0 : computedY,
  };

  store.dispatch({
    type: "modal/position",
    name,
    x: modalPosition.x,
    y: modalPosition.y,
    // zIndex
  });

}

/**
 * @author JHLEE
 * @memberof DragnDrop
 * @function
 * @description Drop event handler
 * @return {DragnDrop}
 */
DragnDrop.prototype.mouseUpHandler = function (e){
  e.preventDefault();
  e.stopPropagation();
  const getDraggable = (state) => state.draggable;
  const draggableStatus = getDraggable(store.getState());

  if (!draggableStatus.mouseOn) {
    return;
  }

  store.dispatch({ type: "draggable/end" });
}

/**
 * @author JHLEE
 * @memberof DragnDrop
 * @function
 * @description If mouse is out of the browser, stop dragging.
 * @return {DragnDrop}
 */
DragnDrop.prototype.mouseLeaveHandler = function (e){
    e.preventDefault();
    e.stopPropagation();
    const getDraggable = (state) => state.draggable;
    const draggableStatus = getDraggable(store.getState());

    if (!draggableStatus.mouseOn) {
      return;
    }

    store.dispatch({ type: "draggable/end" });
}
