import { DragnResize } from "./modal/dragnResize";
import { ModalEvnt } from "./modal/modalEvnt";
import { ModalState } from "./modal/modalState";
import { store } from "./reducer/store";

const { MemoCreator } = require("./creator/memoCreator");
const { DragnDrop } = require("./modal/dragndrop");

require.context("../image", true);

export const NAV_HEIGHT = 50;

function Memo (){
    this.memoCnt = 0;
    this.size = {
        width: "200",
        height: "230"
    };
    this.dragnDrop = null;
    this.dragnResize = null;
    this.mv = null;
}


Memo.prototype.createMemoHandler = function(e, _this){
    e.preventDefault();
    //create a memo box through MemoCreator
    const box = document.querySelector('#wall');
    const creator = new MemoCreator(this.size.width, this.size.height);
    const elems = creator.init();
    elems.container.setAttribute('data-name', `memo_${_this.memoCnt}`);
    //append it to html
    box.appendChild(elems.container);

    store.dispatch({
        type: "modal/update",
        name: `memo_${_this.memoCnt}`,
        x: Number(elems.container.style.left.match(/\d+/g)[0]),
        y: Number(elems.container.style.top.match(/\d+/g)[0]),
        width: Number(this.size.width),
        height: Number(this.size.height)
    });

    

    //Subscribe if modal attributes such as 
    //width, height, z-index and position get changes.
    this.ms = new ModalState(elems.container);
    const unsubscribe = this.ms.init();
    this.mv.init(elems.container, unsubscribe);
    this.dragnDrop.init(elems.header);
    this.dragnResize.init(elems.container);


    _this.memoCnt++;
    
}

Memo.prototype.init = function(){
    const ADD_BTN_ATTR = "addMemo";
    const addBtn = document.querySelector(`[evnt="${ADD_BTN_ATTR}"]`);
    addBtn.addEventListener('click', (e) => this.createMemoHandler(e, this));
    
    this.dragnDrop = new DragnDrop();
    this.dragnDrop.bodyEvnts();

    this.dragnResize = new DragnResize(this.size.width, this.size.height);
    this.dragnResize.subscribe();

    this.mv = new ModalEvnt();

}

const memo = new Memo();
memo.init();
