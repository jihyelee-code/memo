import { store } from "../reducer/store";

/**
 * @author JHLEE
 * @class MemoCreator
 * @constructor
 * @classdesc MemoCreator controller
 */
export function MemoCreator (memoCnt, mother){
    this.memoCnt = memoCnt
    this.mother = mother;
    this.ELEMS = {
        CONTAINER: "CONTAINER",
        HEADER: "HEADER",
        BODY: "BODY",
        CORNERS: "CORNERS",
        FOOTER: "FOOTER"
    };

    this.defSetting = {
        width: "200px",
        height: "230px",
        top: 60,    
        left: 0,
        randomPosRange: 50
    };

    this.HEADER = {
        TAG: "section",
        CLASS_NAME: ["card-header", "d-flex", "justify-content-end"],
        // <button type="button" title="Table" aria-label="Table"
        //         data-click="table"
        //         class="btn btn-sm btn-transparent">
        //         <i class="bi bi-border-all"></i>
        // </button>    
        INNER_HTML: `
            <div class="flex-grow-1" data-click="drag"> </div>
            <div class="d-flex align-items-center">
         
                <button type="button" title="Minimize" aria-label="Minimize"
                        data-click="minimize"
                        class="btn btn-sm btn-transparent d-none">
                        <i class="bi bi-front"></i>
                </button>
                <button type="button" title="Maximize" aria-label="Maximize"
                        data-click="maximize"
                        class="btn btn-sm btn-transparent">
                        <i class="bi bi-square"></i>
                </button>
                <button type="button" title="Close" aria-label="Close"  
                        data-click="close"
                        class="btn btn-sm btn-transparent">
                        <i class="bi bi-x-lg"></i>
                </button>
            </div>
        `,
    };

    this.BODY = {
        TAG: "section",
        CLASS_NAME: ["card-body"],
        INNER_HTML: `
        <textarea class="w-100 h-100"></textarea>
        `
    };

    this.FOOTER = {
        TAG: "section",
        CLASS_NAME: ["card-footer"],
        INNER_HTML: `
            <div class="d-flex">
                <label for="bgColor_${this.memoCnt}" title="Background color" class="btn p-1 btn-transparent">
                    <i class="bi bi-palette"></i>
                    <input type="color" id="bgColor_${this.memoCnt}" data-click="bgColor" class="d-none" ></input>
                </label>
            </div>
        `
    };

    this.CORNERS = {
        TAG: "div",
        CLASS_NAME: [],
        INNER_HTML : `
        <div class="corner-left" corner="left"></div>
        <div class="corner-top" corner="top"></div>
        <div class="corner-top-left" corner="top-left"></div>
        <div class="corner-top-right" corner="top-right"></div>
        <div class="corner-right" corner="right"></div>
        <div class="corner-bottom" corner="bottom"></div>
        <div class="corner-bottom-left" corner="bottom-left"></div>
        <div class="corner-bottom-right" corner="bottom-right"></div>
        `
    };

    this.CONTAINER = {
        TAG: "div",
        CLASS_NAME: ["card", "position-absolute"],
        INNER_HTML: ``
    };

    this.container = null;
    this.header = null;
    this.body = null;
    this.footer = null;
    this.corners = null;

}

/**
 * @author JHLEE
 * @memberof MemoCreator
 * @function
 * @description Append a memo html to its mother html.
 * @return {MemoCreator}
 */
MemoCreator.prototype.createElem = function (target){
    const elem = document.createElement(this[target].TAG);
    elem.classList.add(...this[target].CLASS_NAME);
    elem.innerHTML = this[target].INNER_HTML;

    return elem;
}


/**
 * @author JHLEE
 * @memberof MemoCreator
 * @function
 * @description 
 * @return {MemoCreator}
 */
MemoCreator.prototype.createElems = function (){
    this.container = this.createElem(this.ELEMS.CONTAINER);
    this.header = this.createElem(this.ELEMS.HEADER); 
    this.body = this.createElem(this.ELEMS.BODY); 
    this.footer = this.createElem(this.ELEMS.FOOTER); 
    this.corners = this.createElem(this.ELEMS.CORNERS); 

    return this;
}

MemoCreator.prototype.frameSetUp = function ( ){
    //size and location
    this.container.style.width = this.defSetting.width;
    this.container.style.height = this.defSetting.height;
    this.container.style.top = `${this.defSetting.top + getRandomInt(this.defSetting.randomPosRange)}px`;
    this.container.style.left = `${this.defSetting.left + getRandomInt(this.defSetting.randomPosRange)}px`; 

    //attribute
    this.container.setAttribute('data-name', `memo_${this.memoCnt}`);

    //structure
    this.container.appendChild(this.header);
    this.container.appendChild(this.body);
    this.container.appendChild(this.footer);
    this.container.appendChild(this.corners);
    this.mother.appendChild(this.container);

    //focus
    this.body.querySelector('textarea').focus();

    return this;
}

MemoCreator.prototype.showCard = function(){
    this.container.classList.add('card-show');

    return this;
}

MemoCreator.prototype.updateObserver = function(){
    store.dispatch({
        type: "modalMutateObserver/update",
        name: `memo_${this.memoCnt}`,
        x: this.container.style.left,
        y: this.container.style.top,
        width: this.defSetting.width,
        height: this.defSetting.height
    });

    return this;
}

MemoCreator.prototype.addButtonEvnt = function (){

}




function getRandomInt(max) {

    return Math.floor(Math.random() * max);
  }