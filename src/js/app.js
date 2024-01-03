import { ModalState } from "./modal/modalState";
import { store } from "./reducer/store";

const { MemoCreator } = require("./creator/memoCreator");
const { DragnDrop } = require("./modal/dragndrop");

require.context("../image", true);

export const MEMO_HEADER_HEIGHT = 50;

function Memo (){
    this.memoCnt = 1;
    this.defaultSize = {
        width: "200px",
        height: "230px"
    };

    this.dragnDrop = null;
}


Memo.prototype.createMemoHandler = function(e, _this){
    e.preventDefault();
    //create a memo box through MemoCreator
    const box = document.querySelector('#wall');
    const creator = new MemoCreator();
    const elems = creator.init();
    elems.container.setAttribute('data-name', `memo_${_this.memoCnt}`);
    elems.container.style.width = this.defaultSize.width;
    elems.container.style.height = this.defaultSize.height;
    //append it to html
    box.appendChild(elems.container);

    //then, init drag and drop functionality
    this.dragnDrop.init(elems.header);

    //also, subscribe if modal attributes such as 
    //width, height, z-index and position got changed.
    this.ms = new ModalState(elems.container);
    this.ms.init();

    _this.memoCnt++;
    
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
