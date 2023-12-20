import { store } from "../reducer/store";

/**
 * Modal Configuration
 * @author JHLEE
 * @class ModalConfig
 * @constructor
 * @classdesc Purpose to controll the list of modal and absolute menu list to use it from redux store.
 * But, would I really need this?
 */
export function ModalConfig(){
    this.modals = {};
}

/**
 * @author JHLEE
 * @memberof ModalConfig
 * @function
 * @description Add new list of modal
 * @param {Object} data 
 * @example { name: "projectInformation", x: "calc(50% - 167px)", y: 150, zIndex: 1, width: "400", height: "370" }
 * @return {ModalConfig}
 */
 ModalConfig.prototype.addModal = function(datas){
    datas.forEach( data => {

        //creates modal only when it does not exit
        if(!this.modals[data.name]){
            this.modals[data.name] = data;
            
            store.dispatch({ type: "modal/update", 
                name: data.name, x: data.x, y: data.y,
                width: data.width, height: data.height, zIndex: data.zIndex ? data.zIndex : 0
            });
        }

    })
    return this;
}


/**
 * @author JHLEE
 * @memberof ModalConfig
 * @function
 * @description Return all modal list.
 * @param {Object} data 
 * @return {ModalConfig}
 */
ModalConfig.prototype.getModals = function(){
    return this.modals;
}



