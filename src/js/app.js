const { MemoCreator } = require("./creator/memoCreator");

require.context("../image", true);

function Memo (){
    this.memoCnt = 0;

}

Memo.prototype.createMemoHandler = function(e, _this){
    e.preventDefault();
    const box = document.querySelector('#wall');
    const creator = new MemoCreator(_this.memoCnt);
    const elems = creator.init();

    _this.memoCnt++;
    
}

Memo.prototype.init = function(){
    const ADD_BTN_ATTR = "addMemo";
    const addBtn = document.querySelector(`[evnt="${ADD_BTN_ATTR}"]`);
    addBtn.addEventListener('click', (e) => this.createMemoHandler(e, this));
}

const memo = new Memo();
memo.init();
