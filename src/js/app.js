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


Memo.prototype.createMemoHandler = function(e, _this){
    e.preventDefault();
    //create a memo box through MemoCreator
    const wall = document.querySelector('#wall');
    const creator = new MemoCreator(_this.memoCnt, wall);
    const elems = creator.createElems().frameSetUp().showCard().updateObserver();
    // elems.container.setAttribute('data-name', `memo_${_this.memoCnt}`);
    //append it to html
    // wall.appendChild(elems.container);

    // const memoTextArea = elems.body.querySelector('textarea');
    // memoTextArea.focus();
    // elems.container.classList.add('card-show');

    // store.dispatch({
    //     type: "modalMutateObserver/update",
    //     name: `memo_${_this.memoCnt}`,
    //     x: elems.container.style.left,
    //     y: elems.container.style.top,
    //     width: this.size.width,
    //     height: this.size.height
    // });

    

    //Subscribe if modal attributes such as 
    //width, height, z-index and position get changes.
    const mv = new ButtonEvnt(elems.container);
    mv.init();
    this.dragnDrop.init(elems.header.querySelector('[data-click="drag"]'));
    this.resize.init(elems.container);


    _this.memoCnt++;
    
}

Memo.prototype.init = function(){
    const ADD_BTN_ATTR = this.NEW_MEMO;
    const addBtn = document.querySelector(`[evnt="${ADD_BTN_ATTR}"]`);
    addBtn.addEventListener('click', (e) => this.createMemoHandler(e, this));
    
    this.dragnDrop = new DragnDrop();
    this.dragnDrop.bodyEvnts();

    this.resize = new Resize();
    this.resize.subscribe();

}

const memo = new Memo();
memo.init();
