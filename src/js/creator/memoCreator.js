/**
 * @author JHLEE
 * @class MemoCreator
 * @constructor
 * @classdesc MemoCreator controller
 */
export function MemoCreator (width, height){
    this.ELEMS = {
        CONTAINER: "CONTAINER",
        HEADER: "HEADER",
        BODY: "BODY",
        CORNERS: "CORNERS"
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
        CLASS_NAME: ["card-header"],
        INNER_HTML: `
        <div class="w-100 d-flex justify-content-between">
            <div>
                <button type="button" aria-label="Color"
                        data-click="color"
                        class="btn btn-sm btn-light">
                        <i class="bi bi-three-dots-vertical"></i>
                </button>
            </div>
            <div>
                <button type="button" aria-label="Restore"
                        data-click="restore"
                        class="btn btn-sm btn-light d-none">
                        <i class="bi bi-front"></i>
                </button>
                <button type="button" aria-label="Maximize"
                        data-click="maximize"
                        class="btn btn-sm btn-light">
                        <i class="bi bi-square"></i>
                </button>
                <button type="button" aria-label="Close"  
                        data-click="close"
                        class="btn btn-sm btn-light">
                        <i class="bi bi-x-lg"></i>
                </button>
            </div>
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
    const corners = this.createElem(this.ELEMS.CORNERS); 

    container.style.width = this.defSetting.width;
    container.style.height = this.defSetting.height;
    container.style.top = `${this.defSetting.top + getRandomInt(this.defSetting.randomPosRange)}px`;
    container.style.left = `${this.defSetting.left + getRandomInt(this.defSetting.randomPosRange)}px`; 

    container.appendChild(header);
    container.appendChild(body);
    container.appendChild(corners);

    const elems = {
        container,
        header,
        body,
        corners
    }


    return elems;
}


function getRandomInt(max) {

    return Math.floor(Math.random() * max);
  }