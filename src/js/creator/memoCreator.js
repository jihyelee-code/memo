/**
 * @author JHLEE
 * @class MemoCreator
 * @constructor
 * @classdesc MemoCreator controller
 */
export function MemoCreator (count){
    this.TAG = {
        HEADER: "section",
        BODY: "section",
        CORNERS: "div",
        CONTAINER: "div"
    };

    this.HTML = {
        HEADER: `
        <${this.TAG.HEADER} class="card-header">
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
        </${this.TAG.HEADER}>
        `,
        BODY: `
        <${this.TAG.BODY} class="card-body">
            <textarea class="w-100 h-100"></textarea>
        </${this.TAG.BODY}>`,
        CORNERS: `
        <${this.TAG.CORNERS}>
            <div class="corner-left" corner="left"></div>
            <div class="corner-top" corner="top"></div>
            <div class="corner-top-left" corner="top-left"></div>
            <div class="corner-top-right" corner="top-right"></div>
            <div class="corner-right" corner="right"></div>
            <div class="corner-bottom" corner="bottom"></div>
            <div class="corner-bottom-left" corner="bottom-left"></div>
            <div class="corner-bottom-right" corner="bottom-right"></div>
        </${this.TAG.CORNERS}>
            `,
        CONTAINER:`
        <${this.TAG.CONTAINER} class="card position-absolute" data-name="${count}">
        </${this.TAG.CONTAINER}>
        `
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
    const elem = document.createElement(this.TAG[target]);
    elem.outerHTML = this.HTML[target];

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

    const elems = {
        container,
        header,
        body,
        corners
    }


    return elems;
}


