import { getZIndex, store } from "../reducer/store";

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
  header.addEventListener('mousedown', e => this.mouseDownHandler(e));
  return this;
};

DragnDrop.prototype.bodyEvnts = function (){
  this.body.addEventListener('mouseup', e => this.mouseUpHandler(e));
  this.body.addEventListener('mouseleave', e => this.mouseLeaveHandler(e));
  this.body.addEventListener('mousemove', e => this.mouseMoveHandler(e));
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
  e.stopPropagation();
  //compute current position of mouse
  const mousePositionOnModal = {
      x: e.layerX,
      y: e.layerY,
  };
  const headerTitle = e.currentTarget;
  const name = headerTitle.dataset.name;
  
  const zIndex = getZIndex();
  store.dispatch({ type: "modal/active", name, zIndex });
  store.dispatch({ type: "current/active", name, isModal: true });
  store.dispatch({
    type: "draggable/start",
    name,
    mousePosition: mousePositionOnModal,
  });

  // this.body.addEventListener('mousemove', e => this.mouseMoveHandler(e, zIndex));

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
DragnDrop.prototype.mouseMoveHandler = function (e, zIndex){
  e.preventDefault();
  e.stopPropagation();
  const getDraggable = (state) => state.draggable;
  const draggableStatus = getDraggable(store.getState());
  
  if (!draggableStatus.mouseOn) {
    return;
  }
  console.log(e.target)

  const headerHeight = 50;
  const navTopHeight = 50;
  const mousePosition = draggableStatus.mousePosition;
  const name = draggableStatus.name;
  const computedY = e.pageY - mousePosition.y - navTopHeight;


  let modalPosition = {
    x: e.pageX - mousePosition.x, 
    y: computedY < headerHeight ? headerHeight : computedY,
  };

  store.dispatch({
    type: "modal/position",
    name,
    x: modalPosition.x,
    y: modalPosition.y,
    // zIndex
  });

  // this.body.addEventListener('mouseup', e => this.mouseUpHandler(e));
  // this.body.addEventListener('mouseleave', e => this.mouseLeaveHandler(e));
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
