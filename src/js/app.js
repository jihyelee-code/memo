const { MemoCreator } = require("./creator/memoCreator");
const { DragnDrop } = require("./modal/dragndrop");

require.context("../image", true);

function Memo (){
    this.memoCnt = 1;
    this.navTopHeight = 50;
    this.defaultSize = {
        width: "200px",
        height: "230px"
    };

    this.dragnDrop = null;
}

Memo.prototype.createMemoHandler = function(e, _this){
    e.preventDefault();
    const box = document.querySelector('#wall');
    const creator = new MemoCreator();
    const {html, elems} = creator.init();
    elems.container.setAttribute('data-name', `memo${_this.memoCnt}`);
    elems.container.style.width = this.defaultSize.width;
    elems.container.style.height = this.defaultSize.height;
    
    box.appendChild(html);

    this.dragnDrop.init(elems.header);
    
    console.log(elems.header, elems.header.getBoundingClientRect());
    
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
