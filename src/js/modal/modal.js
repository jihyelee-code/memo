import { DragnResize } from "./dragnResize";
import { ModalEvents } from "./modalState";

/**
 * Modal Information Container
 * @author JHLEE
 * @class Modal
 * @constructor
 * @classdesc Modal Information Container
 */

// export function Modal (name, datastore = false, chartColor = null){
export function Modal (data){
    this.modalName = data.name;
    this.modal = document.getElementsByName(this.modalName)[0];
    this.event = new ModalEvents(this.modal, data.datastore);
    this.resizer = new DragnResize(data.width, data.height, this.modal);
}

Modal.prototype.getResizer = function (){
    return this.resizer;
}

Modal.prototype.getModal = function (){
    return this.modal;
}

Modal.prototype.getModalName = function (){
    return this.modalName;
}
