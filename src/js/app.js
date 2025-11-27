import { Resize } from "./modal/resize";
import { ButtonEvnt } from "./modal/buttonEvnt";
import { store } from "./reducer/store";

const { MemoCreator } = require("./creator/memoCreator");
const { DragnDrop } = require("./modal/dragndrop");

// require.context("../image", true);

export const NAV_HEIGHT = 40;


function Memo (){
    this.NEW_MEMO = "newMemo";
    this.memoCnt = 0;
    this.dragnDrop = null;
    this.resize = null;
    this.mv = null;
}


Memo.prototype.newMemoHandler = function(_this){
    //create a memo box through MemoCreator
    const wall = document.querySelector('#wall');
    const creator = new MemoCreator(_this.memoCnt, wall);
    const memoElems = creator.init();

    const buttonEvent = new ButtonEvnt(memoElems.container);
    buttonEvent.init();
    _this.dragnDrop.init(memoElems.header.querySelector('[data-click="drag"]'));
    _this.resize.init(memoElems.container);

    _this.memoCnt++;

    return null;
}

Memo.prototype.init = function(){
    //add new memo
    const newMemoBtn = document.querySelector(`[evnt="${this.NEW_MEMO}"]`);
    newMemoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.newMemoHandler(this);

    });
    
    this.dragnDrop = new DragnDrop();
    this.dragnDrop.bodyEvnts();

    this.resize = new Resize();
    this.resize.subscribe();

    return this;
}

const memo = new Memo();
memo.init();
