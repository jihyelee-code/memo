import { store } from "./reducer/store";

const { MemoCreator } = require("./creator/memoCreator");
const { DragnDrop } = require("./modal/dragndrop");

require.context("../image", true);

export const NAV_TOP_HEIGHT = 50;
export const HEADER_HEIGHT = 50;

function Memo (){
    this.memoCnt = 1;
    this.defaultSize = {
        width: "200px",
        height: "230px"
    };

    this.dragnDrop = null;
}

Memo.prototype.updateMemoInfo = function (infos){
    infos.forEach( info => {

        //creates modal only when it does not exit
        if(!this.modals[info.name]){
            this.modals[info.name] = info;
            
            store.dispatch({ type: "modal/update", 
                name: info.name, x: info.x, y: info.y,
                width: info.width, height: info.height, zIndex: info.zIndex ? info.zIndex : 0
            });
        }

    })
}


Memo.prototype.createMemoHandler = function(e, _this){
    e.preventDefault();
    //create a memo box through MemoCreator
    const box = document.querySelector('#wall');
    const creator = new MemoCreator();
    const {html, elems} = creator.init();
    elems.container.setAttribute('data-name', `memo_${_this.memoCnt}`);
    elems.container.style.width = this.defaultSize.width;
    elems.container.style.height = this.defaultSize.height;
    //append it to html
    box.appendChild(html);

    //then, init drag and drop functionality
    this.dragnDrop.init(elems.header);

    // const evnts = new ModalEvents();
    
//   const modals = [
//     { name: "finestore", datastore: false, x: 80, y: 80, width: "715", height: "736", zIndex: 1 },
//   ];
  
//   this.modalConf.addModal(modals);
}

Memo.prototype.init = function(){
    const ADD_BTN_ATTR = "addMemo";
    const addBtn = document.querySelector(`[evnt="${ADD_BTN_ATTR}"]`);
    addBtn.addEventListener('click', (e) => this.createMemoHandler(e, this));
    
    this.dragnDrop = new DragnDrop();
    this.dragnDrop.bodyEvnts();


}

const memo = new Memo();
memo.init();
