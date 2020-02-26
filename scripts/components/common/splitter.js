//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Point } from '/scripts/core/geometry.js';
import { Mouse } from '/scripts/core/mouse.js';
import { Tools } from '/scripts/core/tools.js';
//#endregion Import
//#region Splitter
const Splitter = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class Splitter
    class Splitter extends ThemedControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.down = false;
                priv.downPos = new Point;
                priv.firstCtrl = props.hasOwnProperty('firstCtrl')?props.firstCtrl:null;
                priv.lastCtrl = props.hasOwnProperty('lastCtrl')?props.lastCtrl:null;
                priv.lastLeftTop = 0;
                priv.isCollapsed = false;
                priv.minSize = props.hasOwnProperty('minSize')?props.minSize:10;
                priv.maxSize = props.hasOwnProperty('maxSize')?props.maxSize:100;
                priv.collapsible = props.hasOwnProperty('collapsible') && Tools.isBool(props.collapsible)?props.collapsible:false;
                this.autoCapture = true;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: 'orientation',
                    enum: Types.ORIENTATIONS,
                    forceUpdate: true,
                    variable: priv,
                    value: props.hasOwnProperty('orientation')?props.orientation:Types.ORIENTATIONS.VERTICAL
                });
                this.hitTest.mouseMove = true;
                delete this.tabOrder;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region orientation
        get orientation() {
            return internal(this).orientation;
        }
        set orientation(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const aligns = Types.ALIGNS;
            //#endregion Variables déclaration
            if (Tools.valueInset(newValue, Types.ORIENTATIONS)) {
                if (priv.orientation !== newValue) {
                    priv.orientation = newValue;
                    if (priv.orientation === Types.ORIENTATIONS.VERTICAL) {
                        this.align = aligns.LEFT;
                    } else {
                        this.align = aligns.TOP;
                    }
                    this.update();
                }
            }
        }
        //#endregion orientation
        //#region collapsible
        get collapsible() {
            return internal(this).collapsible;
        }
        set collapsible(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.collapsible !== newValue) {
                    priv.collapsible = newValue;
                }
            }
        }
        //#endregion collapsible
        //#region minSize
        get minSize() {
            return internal(this).minSize;
        }
        set minSize(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.minSize !== newValue) {
                    priv.minSize = newValue;
                }
            }
        }
        //#endregion minSize
        //#region maxSize
        get maxSize() {
            return internal(this).maxSize;
        }
        set maxSize(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.maxSize !== newValue) {
                    priv.maxSize = newValue;
                }
            }
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
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            Object.keys(Types.ORIENTATIONS).forEach(key => {
                this.HTMLElement.classList.remove(Types.ORIENTATIONS[key]);
            });
            this.HTMLElement.classList.add(priv.orientation);
        }
        //#endregion update
        //#region mouseDown
        mouseDown() {
            //#region Variables déclaration
            const priv = internal(this);
            const PX = Types.CSSUNITS.PX;
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            super.mouseDown();
            if (Core.mouse.button === Mouse.MOUSEBUTTONS.LEFT) {
                if (!this.canCollapse()) {
                    priv.downPos.assign(Core.mouse.document);
                    priv.down = true;
                    const resizeLine = document.createElement(Types.HTMLELEMENTS.DIV);
                    const style = resizeLine.style;
                    if (priv.orientation === Types.ORIENTATIONS.VERTICAL) {
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
                    resizeLine.classList.add(priv.orientation===Types.ORIENTATIONS.VERTICAL?'csr_wResize':'csr_sResize');
                }
            }
        }
        //#endregion mouseDown
        //#region mouseMove
        mouseMove() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const aligns = Types.ALIGNS;
            const PX = Types.CSSUNITS.PX;
            //#endregion Variables déclaration
            super.mouseMove();
            if (Core.mouse.button === Mouse.MOUSEBUTTONS.LEFT) {
                if (priv.down) {
                    const resizeLine = htmlElement.parentNode.lastElementChild;
                    if (this.orientation === Types.ORIENTATIONS.VERTICAL) {
                        let x = htmlElement.offsetLeft + (Core.mouse.document.x - priv.downPos.x);
                        if (x < priv.minSize) {
                            x = priv.minSize;
                        }
                        if (htmlElement.parentNode.offsetWidth - x - htmlElement.offsetWidth < priv.minSize) {
                            x = htmlElement.parentNode.offsetWidth - priv.minSize - htmlElement.offsetWidth;
                        }
                        if (this.align === aligns.LEFT && x > priv.maxSize) {
                            x = priv.maxSize;
                        } else if (this.align === aligns.RIGHT) {
                            if (x < htmlElement.parentNode.offsetWidth - priv.maxSize - htmlElement.offsetWidth) {
                                x = htmlElement.parentNode.offsetWidth - priv.maxSize - htmlElement.offsetWidth;
                            }
                        }
                        resizeLine.style.transform = `translateX(${x}${PX})`;
                    } else {
                        let y = htmlElement.offsetTop + (Core.mouse.document.y - priv.downPos.y);
                        if (y < priv.minSize) {
                            y = priv.minSize;
                        }
                        if (htmlElement.parentNode.offsetHeight - y - htmlElement.offsetHeight < priv.minSize) {
                            y = htmlElement.parentNode.offsetHeight - priv.minSize - htmlElement.offsetHeight;
                        }
                        if (this.align === aligns.TOP && y > priv.maxSize) {
                            y = priv.maxSize;
                        } else if (this.align === aligns.BOTTOM) {
                            if (y < htmlElement.parentNode.offsetHeight - priv.maxSize - htmlElement.offsetHeight) {
                                y = htmlElement.parentNode.offsetHeight - priv.maxSize - htmlElement.offsetHeight;
                            }
                        }
                        resizeLine.style.transform = `translateY(${y}${PX})`;
                    }
                }
            }
        }
        //#endregion mouseMove
        //#region mouseUp
        mouseUp() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const parentNode = htmlElement.parentNode;
            //#endregion Variables déclaration
            super.mouseUp();
            if (priv.down) {
                priv.down = false;
                this.updateControls();
                parentNode.lastElementChild.jsObj = null;
                parentNode.removeChild(parentNode.lastElementChild);
            }
        }
        //#endregion mouseUp
        //#region click
        click() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.click();
            if (this.canCollapse()) {
                if (priv.isCollapsed) {
                    this.expand();
                }
                else {
                    this.collapse();
                }
            }
        }
        //#endregion click
        //#region collapse
        collapse() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const htmlElementStyle = this.HTMLElementStyle;
            const aligns = Types.ALIGNS;
            const PX = Types.CSSUNITS.PX;
            const firstCtrl = priv.firstCtrl;
            const lastCtrl = priv.lastCtrl;
            //#endregion Variables déclaration
            if (priv.orientation === Types.ORIENTATIONS.VERTICAL) {
                priv.lastLeftTop = htmlElement.offsetLeft;
                if (this.align === aligns.LEFT) {
                    firstCtrl.width = 0;
                    this.left = 0;
                    lastCtrl.left = htmlElement.offsetWidth;
                } else if (this.align === aligns.RIGHT) {
                    priv.lastLeftTop = parseInt(getComputedStyle(htmlElement).right, 10);
                    firstCtrl.HTMLElementStyle.right = `${htmlElement.offsetWidth}${PX}`;
                    lastCtrl.width = 0;
                    htmlElementStyle.right = "0";
                }
            } else {
                if (this.align === aligns.TOP) {
                    priv.lastLeftTop = htmlElement.offsetTop;
                    firstCtrl.height = 0;
                    this.top = 0;
                    lastCtrl.top = htmlElement.offsetHeight;
                } else if (this.align === aligns.BOTTOM) {
                    priv.lastLeftTop = parseInt(getComputedStyle(htmlElement).bottom, 10);
                    firstCtrl.HTMLElementStyle.bottom = `${htmlElement.offsetHeight}${PX}`;
                    lastCtrl.height = 0;
                    htmlElementStyle.bottom = "0";
                }
            }
            priv.isCollapsed = true;
        }
        //#endregion collapse
        //#region expand
        expand() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const htmlElementStyle = this.HTMLElementStyle;
            const aligns = Types.ALIGNS;
            const PX = Types.CSSUNITS.PX;
            const firstCtrl = priv.firstCtrl;
            const lastCtrl = priv.lastCtrl;
            //#endregion Variables déclaration
            if (this.orientation === Types.ORIENTATIONS.VERTICAL) {
                if (this.align === aligns.LEFT) {
                    this.left = priv.lastLeftTop;
                    firstCtrl.width = htmlElement.offsetLeft;
                    lastCtrl.left = htmlElement.offsetWidth + htmlElement.offsetLeft;
                } else if (this.align === aligns.RIGHT) {
                    firstCtrl.HTMLElementStyle.right = `${priv.lastLeftTop + htmlElement.offsetWidth}${PX}`;
                    htmlElementStyle.right = priv.lastLeftTop;
                    lastCtrl.width = priv.lastLeftTop;
                }
                priv.lastLeftTop = 0;
            } else {
                if (this.align === aligns.TOP) {
                    this.top = priv.lastLeftTop;
                    firstCtrl.height = htmlElement.offsetTop;
                    lastCtrl.top = htmlElement.offsetHeight + htmlElement.offsetTop;
                } else if (this.align === aligns.BOTTOM) {
                    firstCtrl.HTMLElementStyle.bottom = `${priv.lastLeftTop + htmlElement.offsetHeight}${PX}`;
                    htmlElementStyle.bottom = `${priv.lastLeftTop}${PX}`;
                    lastCtrl.height = priv.lastLeftTop;
                }
                priv.lastLeftTop = 0;
            }
            priv.isCollapsed = false;
        }
        //#endregion expand
        //#region canCollapse
        canCollapse() {
            //#region Variables déclaration
            const priv = internal(this);
            let inCollapsibleArea = false;
            const htmlElement = this.HTMLElement;
            const target = Core.mouse.target;
            //#endregion Variables déclaration
            if (priv.orientation === Types.ORIENTATIONS.VERTICAL) {
                const y2 = ~~(htmlElement.offsetHeight / 2);
                inCollapsibleArea = target.y > y2 - 15 && target.y < y2 + 15;
            } else {
                const w2 = ~~(htmlElement.offsetWidth / 2);
                inCollapsibleArea = target.x > w2 - 15 && target.x < w2 + 15;
            }
            return priv.collapsible & inCollapsibleArea;
        }
        //#endregion canCollapse
        //#region updateControls
        updateControls() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const htmlElementStyle = this.HTMLElementStyle;
            let mat;
            let offset;
            const resizeLine = htmlElement.parentNode.lastElementChild;
            const firstCtrl = priv.firstCtrl;
            const firstHtmlElement = firstCtrl.HTMLElement;
            const lastCtrl = priv.lastCtrl;
            const lastHtmlElement = lastCtrl.HTMLElement;
            const aligns = Types.ALIGNS;
            const PX = Types.CSSUNITS.PX;
            //#endregion Variables déclaration
            mat = getComputedStyle(resizeLine).transform;
            mat = mat.match(/-?[\d\.]+/g);
            if (priv.orientation === Types.ORIENTATIONS.VERTICAL) {
                offset = ~~mat[4] - htmlElement.offsetLeft;
                if (firstCtrl) {
                    if (firstCtrl.align === aligns.CLIENT) {
                        firstCtrl.right = htmlElement.parentNode.offsetWidth - ~~mat[4];
                    }
                    else {
                        firstCtrl.width = firstHtmlElement.offsetWidth + offset;
                    }
                }
                if (lastCtrl) {
                    if (lastCtrl.align === aligns.CLIENT) {
                        lastCtrl.left = lastHtmlElement.offsetLeft + offset;
                    }
                    else {
                        priv.lastCtrl.width = htmlElement.parentNode.offsetWidth - resizeLine.offsetWidth - ~~mat[4];
                    }
                }
                if (this.align === aligns.LEFT) {
                    this.left = htmlElement.offsetLeft + offset;
                }
                else {
                    htmlElementStyle.right = `${htmlElement.parentNode.offsetWidth - lastHtmlElement.offsetLeft}${PX}`;
                }
            } else {
                offset = ~~mat[5] - htmlElement.offsetTop;
                if (firstCtrl) {
                    if (firstCtrl.align === aligns.CLIENT) {
                        firstCtrl.bottom = htmlElement.parentNode.offsetHeight - ~~mat[5];
                    }
                    else {
                        firstCtrl.height = firstHtmlElement.offsetHeight + offset;
                    }
                }
                if (lastCtrl) {
                    if (lastCtrl.align === aligns.CLIENT) {
                        lastCtrl.top = lastHtmlElement.offsetTop + offset;
                    }
                    else {
                        lastCtrl.height = htmlElement.parentNode.offsetHeight - resizeLine.offsetHeight - ~~mat[5];
                    }
                }
                if (this.align === aligns.TOP) {
                    this.top = htmlElement.offsetTop + offset;
                }
                else {
                    htmlElementStyle.bottom = `${htmlElement.parentNode.offsetHeight - lastHtmlElement.offsetTop}${PX}`;
                }
            }
        }
        //#endregion updateControls
        //#region checkCtrls
        checkCtrls() {
            //#region Variables déclaration
            const priv = internal(this);
            let firstCtrl = priv.firstCtrl;
            let lastCtrl = priv.lastCtrl;
            const htmlElement = this.HTMLElement;
            const aligns = Types.ALIGNS;
            const components = this.owner.components;
            const self = this;
            let comps = [];
            //#endregion Variables déclaration
            if (Tools.isString(firstCtrl)) {
                priv.firstCtrl = firstCtrl = this.form[firstCtrl]?this.form[firstCtrl]:null;
            } else if (!firstCtrl) {
                switch (this.align) {
                    case aligns.LEFT:
                        comps = components.filter(e => {
                            return (e.align === aligns.LEFT) && e.visible && e.HTMLElement.parentNode === htmlElement.parentNode;
                        });
                        break;
                    case aligns.TOP:
                        comps = components.filter(e => {
                            return (e.align === aligns.TOP) && e.visible && e.HTMLElement.parentNode === htmlElement.parentNode;
                        });
                        break;
                    case aligns.RIGHT:
                        comps = components.filter(e => {
                            return (e.align === aligns.CLIENT) && e.visible && e.HTMLElement.parentNode === htmlElement.parentNode;
                        });
                        break;
                    case aligns.BOTTOM:
                        comps = components.filter(e => {
                            return (e.align === aligns.CLIENT) && e.visible && e.HTMLElement.parentNode === htmlElement.parentNode;
                        });
                        break;
                }
                priv.firstCtrl = firstCtrl = comps.find(e => e !== self);
            }
            if (Tools.isString(lastCtrl)) {
                if (this.form[lastCtrl]) {
                    priv.lastCtrl = lastCtrl = this.form[lastCtrl];
                }
                else {
                    priv.lastCtrl = lastCtrl = null;
                }
            } else if (!lastCtrl) {
                switch (this.align) {
                    case aligns.RIGHT:
                        comps = components.filter(e => {
                            return (e.align === aligns.RIGHT) && e.visible && e.HTMLElement.parentNode === htmlElement.parentNode;
                        });
                        break;
                    case aligns.BOTTOM:
                        comps = components.filter(e => {
                            return (e.align === aligns.BOTTOM) && e.visible && e.HTMLElement.parentNode === htmlElement.parentNode;
                        });
                        break;
                    case aligns.LEFT:
                        comps = components.filter(e => {
                            return (e.align === aligns.CLIENT) && e.visible && e.HTMLElement.parentNode === htmlElement.parentNode;
                        });
                        break;
                    case aligns.TOP:
                        comps = components.filter(e => {
                            return (e.align === aligns.CLIENT) && e.visible && e.HTMLElement.parentNode === htmlElement.parentNode;
                        });
                        break;
                }
                priv.lastCtrl = lastCtrl = comps.find(e => e !== self);
            }
        }
        //#endregion checkCtrls
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.down = null;
            priv.downPos.destroy();
            priv.downPos = null;
            priv.firstCtrl = null;
            priv.lastCtrl = null;
            priv.lastLeftTop = null;
            priv.minSize = null;
            priv.maxSize = null;
            priv.collapsible = null;
            priv.orientation = null;
        }
        //#endregion destroy
        //#endregion Methods
    }
    return Splitter;
    //#endregion Splitter
})();
Object.seal(Splitter);
Core.classes.register(Types.CATEGORIES.COMMON, Splitter);
//#endregion Splitter
//#region Templates
if (Core.isHTMLRenderer) {
    const SplitterTpl = ['<jagui-splitter id="{internalId}" data-class="Splitter" class="Control csr_wResize Splitter {theme}">',
        '<properties>{ "name": "{name}", "orientation": "vertical", "align": "left", "collapsible": true }</properties>',
        '</jagui-splitter>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: Splitter, template: SplitterTpl }]);
}
//endregion
export { Splitter };
//http://codepen.io/enxaneta/pen/zGGMxq*/