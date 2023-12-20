import { Modal } from "./modal";

export function ModalList(){
    this.modals = {};
}

ModalList.prototype.getList = function(){
    return this.modals;
}

ModalList.prototype.addList = function(datas){

    datas.forEach( data => {

        //creates modal only when it does not exit
        if(!this.modals[data.name]){
            this.modals[data.name] = new Modal(data);
        }
    })

    return this.modals;
}

