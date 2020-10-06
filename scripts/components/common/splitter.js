//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Point } from '/scripts/core/geometry.js';
import { Mouse } from '/scripts/core/mouse.js';
//#endregion Import
//#region Class Splitter
class Splitter extends ThemedControl {
    //#region Private fields
    #down = !1;
    #downPos = new Point;
    #firstCtrl;
    #lastCtrl;
    #lastLeftTop = 0;
    #isCollapsed = !1;
    #minSize;
    #maxSize;
    #collapsible;
    #orientation;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.mouseEvents = { mousemove: !0 };
            props.autoCapture = !0;
            super(owner, props);
            this.#firstCtrl = props.hasOwnProperty('firstCtrl') ? props.firstCtrl : null;
            this.#lastCtrl = props.hasOwnProperty('lastCtrl') ? props.lastCtrl : null;
            this.#minSize = props.hasOwnProperty('minSize') ? props.minSize : 10;
            this.#maxSize = props.hasOwnProperty('maxSize') ? props.maxSize : 100;
            this.#collapsible = props.hasOwnProperty('collapsible') && core.tools.isBool(props.collapsible)
                ? props.collapsible : !1;
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'orientation',
                enum: core.types.ORIENTATIONS,
                forceUpdate: !0,
                value: props.hasOwnProperty('orientation') ? props.orientation : core.types.ORIENTATIONS.VERTICAL
            });
            delete this.tabOrder;
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region orientation
    get orientation() {
        return this.#orientation;
    }
    set orientation(newValue) {
        //#region Variables déclaration
        const aligns = core.types.ALIGNS;
        //#endregion Variables déclaration
        if (core.tools.valueInset(newValue, core.types.ORIENTATIONS) && this.#orientation !== newValue) {
            this.#orientation = newValue;
            this.align = this.#orientation === core.types.ORIENTATIONS.VERTICAL ? aligns.LEFT : aligns.TOP;
            this.update();
        }
    }
    //#endregion orientation
    //#region collapsible
    get collapsible() {
        return this.#collapsible;
    }
    set collapsible(newValue) {
        core.tools.isBool(newValue) && this.#collapsible !== newValue && (this.#collapsible = newValue);
    }
    //#endregion collapsible
    //#region minSize
    get minSize() {
        return this.#minSize;
    }
    set minSize(newValue) {
        core.tools.isNumber(newValue) && this.#minSize !== newValue && (this.#minSize = newValue);
    }
    //#endregion minSize
    //#region maxSize
    get maxSize() {
        return this.#maxSize;
    }
    set maxSize(newValue) {
        core.tools.isNumber(newValue) && this.#maxSize !== newValue && (this.#maxSize = newValue);
    }
    //#endregion maxSize
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        super.loaded();
        this.update();
        this.checkCtrls();
    }
    //#endregion loaded
    //#region update
    update() {
        Object.keys(core.types.ORIENTATIONS).forEach(key => {
            this.HTMLElement.classList.remove(core.types.ORIENTATIONS[key]);
        });
        this.HTMLElement.classList.add(this.#orientation);
    }
    //#endregion update
    //#region mouseDown
    mouseDown() {
        //#region Variables déclaration
        const PX = core.types.CSSUNITS.PX;
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        super.mouseDown();
        if (core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && !this.canCollapse() && !this.#down) {
            this.#downPos.assign(core.mouse.document);
            this.#down = !0;
            const resizeLine = document.createElement(core.types.HTMLELEMENTS.DIV);
            const style = resizeLine.style;
            if (this.#orientation === core.types.ORIENTATIONS.VERTICAL) {
                style.transform = `translateX(${htmlElement.offsetLeft}${PX})`;
                style.top = 0;
                style.bottom = 0;
                style.width = '5px';
            } else {
                style.transform = `translateY(${htmlElement.offsetTop}${PX})`;
                style.left = 0;
                style.right = 0;
                style.height = '5px';
            }
            style.zIndex = 99999;
            resizeLine.classList.add('Control', 'ghostSplitter', this.themeName);
            resizeLine.jsObj = this;
            htmlElement.parentNode.appendChild(resizeLine);
            resizeLine.classList.add(this.#orientation === core.types.ORIENTATIONS.VERTICAL
                ? 'csr_wResize' : 'csr_sResize');
        }
    }
    //#endregion mouseDown
    //#region mouseMove
    mouseMove() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const aligns = core.types.ALIGNS;
        const PX = core.types.CSSUNITS.PX;
        //#endregion Variables déclaration
        super.mouseMove();
        if (core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && this.#down) {
            const resizeLine = htmlElement.parentNode.lastElementChild;
            if (this.orientation === core.types.ORIENTATIONS.VERTICAL) {
                let x = htmlElement.offsetLeft + (core.mouse.document.x - this.#downPos.x);
                x = Math.max(x, this.#minSize);
                htmlElement.parentNode.offsetWidth - x - htmlElement.offsetWidth < this.#minSize
                    && (x = htmlElement.parentNode.offsetWidth - this.#minSize - htmlElement.offsetWidth);
                if (this.align === aligns.LEFT && x > this.#maxSize) {
                    x = this.#maxSize;
                } else if (this.align === aligns.RIGHT) {
                    x < htmlElement.parentNode.offsetWidth - this.#maxSize - htmlElement.offsetWidth
                        && (x = htmlElement.parentNode.offsetWidth - this.#maxSize - htmlElement.offsetWidth);
                }
                resizeLine.style.transform = `translateX(${x}${PX})`;
            } else {
                let y = htmlElement.offsetTop + (core.mouse.document.y - this.#downPos.y);
                y = Math.max(y, this.#minSize);
                htmlElement.parentNode.offsetHeight - y - htmlElement.offsetHeight < this.#minSize
                    && (y = htmlElement.parentNode.offsetHeight - this.#minSize - htmlElement.offsetHeight);
                if (this.align === aligns.TOP && y > this.#maxSize) {
                    y = this.#maxSize;
                } else if (this.align === aligns.BOTTOM) {
                    y < htmlElement.parentNode.offsetHeight - this.#maxSize - htmlElement.offsetHeight
                        && (y = htmlElement.parentNode.offsetHeight - this.#maxSize - htmlElement.offsetHeight);
                }
                resizeLine.style.transform = `translateY(${y}${PX})`;
            }
        }
    }
    //#endregion mouseMove
    //#region mouseUp
    mouseUp() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const parentNode = htmlElement.parentNode;
        //#endregion Variables déclaration
        super.mouseUp();
        if (this.#down) {
            this.#down = !1;
            this.updateControls();
            parentNode.lastElementChild.jsObj = null;
            parentNode.removeChild(parentNode.lastElementChild);
        }
    }
    //#endregion mouseUp
    //#region click
    click() {
        super.click();
        if (this.canCollapse()) {
            this.#isCollapsed ? this.expand() : this.collapse();
        }
    }
    //#endregion click
    //#region collapse
    collapse() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const htmlElementStyle = this.HTMLElementStyle;
        const aligns = core.types.ALIGNS;
        const PX = core.types.CSSUNITS.PX;
        const firstCtrl = this.#firstCtrl;
        const lastCtrl = this.#lastCtrl;
        //#endregion Variables déclaration
        if (this.#orientation === core.types.ORIENTATIONS.VERTICAL) {
            this.#lastLeftTop = htmlElement.offsetLeft;
            if (this.align === aligns.LEFT) {
                firstCtrl.width = 0;
                this.left = 0;
                lastCtrl.left = htmlElement.offsetWidth;
            } else if (this.align === aligns.RIGHT) {
                this.#lastLeftTop = parseInt(getComputedStyle(htmlElement).right, 10);
                firstCtrl.HTMLElementStyle.right = `${htmlElement.offsetWidth}${PX}`;
                lastCtrl.width = 0;
                htmlElementStyle.right = "0";
            }
        } else {
            if (this.align === aligns.TOP) {
                this.#lastLeftTop = htmlElement.offsetTop;
                firstCtrl.height = 0;
                this.top = 0;
                lastCtrl.top = htmlElement.offsetHeight;
            } else if (this.align === aligns.BOTTOM) {
                this.#lastLeftTop = parseInt(getComputedStyle(htmlElement).bottom, 10);
                firstCtrl.HTMLElementStyle.bottom = `${htmlElement.offsetHeight}${PX}`;
                lastCtrl.height = 0;
                htmlElementStyle.bottom = "0";
            }
        }
        this.#isCollapsed = !0;
    }
    //#endregion collapse
    //#region expand
    expand() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const htmlElementStyle = this.HTMLElementStyle;
        const aligns = core.types.ALIGNS;
        const PX = core.types.CSSUNITS.PX;
        const firstCtrl = this.#firstCtrl;
        const lastCtrl = this.#lastCtrl;
        //#endregion Variables déclaration
        if (this.orientation === core.types.ORIENTATIONS.VERTICAL) {
            if (this.align === aligns.LEFT) {
                this.left = this.#lastLeftTop;
                firstCtrl.width = htmlElement.offsetLeft;
                lastCtrl.left = htmlElement.offsetWidth + htmlElement.offsetLeft;
            } else if (this.align === aligns.RIGHT) {
                firstCtrl.HTMLElementStyle.right = `${this.#lastLeftTop + htmlElement.offsetWidth}${PX}`;
                htmlElementStyle.right = this.#lastLeftTop;
                lastCtrl.width = this.#lastLeftTop;
            }
            this.#lastLeftTop = 0;
        } else {
            if (this.align === aligns.TOP) {
                this.top = this.#lastLeftTop;
                firstCtrl.height = htmlElement.offsetTop;
                lastCtrl.top = htmlElement.offsetHeight + htmlElement.offsetTop;
            } else if (this.align === aligns.BOTTOM) {
                firstCtrl.HTMLElementStyle.bottom = `${this.#lastLeftTop + htmlElement.offsetHeight}${PX}`;
                htmlElementStyle.bottom = `${this.#lastLeftTop}${PX}`;
                lastCtrl.height = this.#lastLeftTop;
            }
            this.#lastLeftTop = 0;
        }
        this.#isCollapsed = !1;
    }
    //#endregion expand
    //#region canCollapse
    canCollapse() {
        //#region Variables déclaration
        let inCollapsibleArea = !1;
        const htmlElement = this.HTMLElement;
        const target = core.mouse.target;
        //#endregion Variables déclaration
        if (this.#orientation === core.types.ORIENTATIONS.VERTICAL) {
            const y2 = int(htmlElement.offsetHeight / 2);
            inCollapsibleArea = target.y > y2 - 15 && target.y < y2 + 15;
        } else {
            const w2 = int(htmlElement.offsetWidth / 2);
            inCollapsibleArea = target.x > w2 - 15 && target.x < w2 + 15;
        }
        return this.#collapsible & inCollapsibleArea;
    }
    //#endregion canCollapse
    //#region updateControls
    updateControls() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const htmlElementStyle = this.HTMLElementStyle;
        let mat;
        let offset;
        const resizeLine = htmlElement.parentNode.lastElementChild;
        const firstCtrl = this.#firstCtrl;
        const firstHtmlElement = firstCtrl.HTMLElement;
        const lastCtrl = this.#lastCtrl;
        const lastHtmlElement = lastCtrl.HTMLElement;
        const aligns = core.types.ALIGNS;
        const PX = core.types.CSSUNITS.PX;
        //#endregion Variables déclaration
        mat = getComputedStyle(resizeLine).transform;
        mat = mat.match(/-?[\d\.]+/g);
        if (this.#orientation === core.types.ORIENTATIONS.VERTICAL) {
            offset = int(mat[4]) - htmlElement.offsetLeft;
            if (firstCtrl) {
                firstCtrl.align === aligns.CLIENT
                    ? firstCtrl.right = htmlElement.parentNode.offsetWidth - int(mat[4])
                    : firstCtrl.width = firstHtmlElement.offsetWidth + offset;
            }
            if (lastCtrl) {
                lastCtrl.align === aligns.CLIENT
                    ? lastCtrl.left = lastHtmlElement.offsetLeft + offset
                    : this.#lastCtrl.width = htmlElement.parentNode.offsetWidth - resizeLine.offsetWidth - int(mat[4]);
            }
            this.align === aligns.LEFT
                ? this.left = htmlElement.offsetLeft + offset
                : htmlElementStyle.right = `${htmlElement.parentNode.offsetWidth - lastHtmlElement.offsetLeft}${PX}`;
        } else {
            offset = int(mat[5]) - htmlElement.offsetTop;
            if (firstCtrl) {
                firstCtrl.align === aligns.CLIENT
                    ? firstCtrl.bottom = htmlElement.parentNode.offsetHeight - int(mat[5])
                    : firstCtrl.height = firstHtmlElement.offsetHeight + offset;
            }
            if (lastCtrl) {
                lastCtrl.align === aligns.CLIENT
                    ? lastCtrl.top = lastHtmlElement.offsetTop + offset
                    : lastCtrl.height = htmlElement.parentNode.offsetHeight - resizeLine.offsetHeight - int(mat[5]);
            }
            this.align === aligns.TOP
                ? this.top = htmlElement.offsetTop + offset
                : htmlElementStyle.bottom = `${htmlElement.parentNode.offsetHeight - lastHtmlElement.offsetTop}${PX}`;
        }
    }
    //#endregion updateControls
    //#region checkCtrls
    checkCtrls() {
        //#region Variables déclaration
        let firstCtrl = this.#firstCtrl;
        let lastCtrl = this.#lastCtrl;
        const htmlElement = this.HTMLElement;
        const aligns = core.types.ALIGNS;
        const components = this.owner.components;
        const self = this;
        let comps = [];
        //#endregion Variables déclaration
        if (core.tools.isString(firstCtrl)) {
            this.#firstCtrl = firstCtrl = this.form[firstCtrl] ? this.form[firstCtrl] : null;
        } else if (!firstCtrl) {
            switch (this.align) {
                case aligns.LEFT:
                    comps = components.filter(e => {
                        return (e.align === aligns.LEFT) && e.visible
                            && e.HTMLElement.parentNode === htmlElement.parentNode;
                    });
                    break;
                case aligns.TOP:
                    comps = components.filter(e => {
                        return (e.align === aligns.TOP) && e.visible
                            && e.HTMLElement.parentNode === htmlElement.parentNode;
                    });
                    break;
                case aligns.RIGHT:
                    comps = components.filter(e => {
                        return (e.align === aligns.CLIENT) && e.visible
                            && e.HTMLElement.parentNode === htmlElement.parentNode;
                    });
                    break;
                case aligns.BOTTOM:
                    comps = components.filter(e => {
                        return (e.align === aligns.CLIENT) && e.visible
                            && e.HTMLElement.parentNode === htmlElement.parentNode;
                    });
                    break;
            }
            this.#firstCtrl = firstCtrl = comps.find(e => e !== self);
        }
        if (core.tools.isString(lastCtrl)) {
            this.form[lastCtrl]
                ? this.#lastCtrl = lastCtrl = this.form[lastCtrl]
                : this.#lastCtrl = lastCtrl = null;
        } else if (!lastCtrl) {
            switch (this.align) {
                case aligns.RIGHT:
                    comps = components.filter(e => {
                        return (e.align === aligns.RIGHT) && e.visible
                            && e.HTMLElement.parentNode === htmlElement.parentNode;
                    });
                    break;
                case aligns.BOTTOM:
                    comps = components.filter(e => {
                        return (e.align === aligns.BOTTOM) && e.visible
                            && e.HTMLElement.parentNode === htmlElement.parentNode;
                    });
                    break;
                case aligns.LEFT:
                    comps = components.filter(e => {
                        return (e.align === aligns.CLIENT) && e.visible
                            && e.HTMLElement.parentNode === htmlElement.parentNode;
                    });
                    break;
                case aligns.TOP:
                    comps = components.filter(e => {
                        return (e.align === aligns.CLIENT) && e.visible
                            && e.HTMLElement.parentNode === htmlElement.parentNode;
                    });
                    break;
            }
            this.#lastCtrl = lastCtrl = comps.find(e => e !== self);
        }
    }
    //#endregion checkCtrls
    //#region destroy
    destroy() {
        this.#downPos.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.defineProperties(Splitter.prototype, {
    'minSize': {
        enumerable: !0
    },
    'maxSize': {
        enumerable: !0
    },
    'collapsible': {
        enumerable: !0
    }
});
Object.seal(Splitter);
core.classes.register(core.types.CATEGORIES.COMMON, Splitter);
//#endregion Splitter
//#region Templates
if (core.isHTMLRenderer) {
    const SplitterTpl = ['<jagui-splitter id="{internalId}" data-class="Splitter" class="Control csr_wResize Splitter {theme}">',
        '<properties>{ "name": "{name}", "orientation": "vertical", "align": "left", "collapsible": !0 }</properties>',
        '</jagui-splitter>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: Splitter, template: SplitterTpl }]);
}
//endregion
export { Splitter };