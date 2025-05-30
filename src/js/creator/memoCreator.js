/**
 * @author JHLEE
 * @class MemoCreator
 * @constructor
 * @classdesc MemoCreator controller
 */
export function MemoCreator (memoCnt, width, height){
    this.ELEMS = {
        CONTAINER: "CONTAINER",
        HEADER: "HEADER",
        BODY: "BODY",
        CORNERS: "CORNERS",
        FOOTER: "FOOTER"
    };

    this.defSetting = {
        width: width + "px",
        height: height + "px",
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
                <label for="bgColor_${memoCnt}" title="Background color" class="btn px-2 btn-transparent">
                    <i class="bi bi-palette"></i>
                    <input type="color" id="bgColor_${memoCnt}" data-click="bgColor" class="d-none" ></input>
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
MemoCreator.prototype.init = function (){
    const container = this.createElem(this.ELEMS.CONTAINER);
    const header = this.createElem(this.ELEMS.HEADER); 
    const body = this.createElem(this.ELEMS.BODY); 
    const footer = this.createElem(this.ELEMS.FOOTER); 
    const corners = this.createElem(this.ELEMS.CORNERS); 

    container.style.width = this.defSetting.width;
    container.style.height = this.defSetting.height;
    container.style.top = `${this.defSetting.top + getRandomInt(this.defSetting.randomPosRange)}px`;
    container.style.left = `${this.defSetting.left + getRandomInt(this.defSetting.randomPosRange)}px`; 

    container.appendChild(header);
    container.appendChild(body);
    container.appendChild(footer);
    container.appendChild(corners);

    const elems = {
        container,
        header,
        body,
        footer,
        corners
    }


    return elems;
}


function getRandomInt(max) {

    return Math.floor(Math.random() * max);
  }