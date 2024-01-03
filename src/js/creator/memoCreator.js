/**
 * @author JHLEE
 * @class MemoCreator
 * @constructor
 * @classdesc MemoCreator controller
 */
export function MemoCreator (){
    this.HEADER = {
        TAG: "section",
        CLASS_NAME: ["card-header"],
        INNER_HTML: `
        <div class="w-100 d-flex justify-content-between">
            <div>
                <button type="button" aria-label="Color"
                        class="btn btn-sm btn-light">
                        <i class="bi bi-three-dots-vertical"></i>
                </button>
            </div>
            <div>
                <button type="button" aria-label="Minimize"
                        class="btn btn-sm btn-light">
                        <i class="bi bi-dash-lg"></i>
                </button>
                <button type="button" aria-label="Remove"
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
    const container = this.createElem("CONTAINER");
    const header = this.createElem("HEADER"); 
    const body = this.createElem("BODY"); 
    const corners = this.createElem("CORNERS"); 

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


