//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Point } from '/scripts/core/geometry.js';
import { Mouse } from '/scripts/core/mouse.js';
//#endregion Import
//#region Class Splitter
class Splitter extends ThemedControl {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.mouseEvents = { mousemove: !0 };
            props.autoCapture = !0;
            super(owner, props);
            core.private(this, {
                down: !1,
                downPos: new Point,
                firstCtrl: props.hasOwnProperty('firstCtrl') ? props.firstCtrl : null,
                lastCtrl: props.hasOwnProperty('lastCtrl') ? props.lastCtrl : null,
                lastLeftTop: 0,
                isCollapsed: !1,
                minSize: props.hasOwnProperty('minSize') ? props.minSize : 10,
                maxSize: props.hasOwnProperty('maxSize') ? props.maxSize : 100,
                collapsible: props.hasOwnProperty('collapsible') && core.tools.isBool(props.collapsible)
                    ? props.collapsible : !1
            });
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
        return core.private(this).orientation;
    }
    set orientation(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const aligns = core.types.ALIGNS;
        //#endregion Variables déclaration
        if (core.tools.valueInset(newValue, core.types.ORIENTATIONS) && priv.orientation !== newValue) {
            priv.orientation = newValue;
            this.align = priv.orientation === core.types.ORIENTATIONS.VERTICAL ? aligns.LEFT : aligns.TOP;
            this.update();
        }
    }
    //#endregion orientation
    //#region collapsible
    get collapsible() {
        return core.private(this).collapsible;
    }
    set collapsible(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isBool(newValue) && priv.collapsible !== newValue && (priv.collapsible = newValue);
    }
    //#endregion collapsible
    //#region minSize
    get minSize() {
        return core.private(this).minSize;
    }
    set minSize(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && priv.minSize !== newValue && (priv.minSize = newValue);
    }
    //#endregion minSize
    //#region maxSize
    get maxSize() {
        return core.private(this).maxSize;
    }
    set maxSize(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        core.tools.isNumber(newValue) && priv.maxSize !== newValue && (priv.maxSize = newValue);
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
        const priv = core.private(this);
        //#endregion Variables déclaration
        Object.keys(core.types.ORIENTATIONS).forEach(key => {
            this.HTMLElement.classList.remove(core.types.ORIENTATIONS[key]);
        });
        this.HTMLElement.classList.add(priv.orientation);
    }
    //#endregion update
    //#region mouseDown
    mouseDown() {
        //#region Variables déclaration
        const priv = core.private(this);
        const PX = core.types.CSSUNITS.PX;
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        super.mouseDown();
        if (core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && !this.canCollapse() && !priv.down) {
            priv.downPos.assign(core.mouse.document);
            priv.down = !0;
            const resizeLine = document.createElement(core.types.HTMLELEMENTS.DIV);
            const style = resizeLine.style;
            if (priv.orientation === core.types.ORIENTATIONS.VERTICAL) {
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
            resizeLine.classList.add(priv.orientation === core.types.ORIENTATIONS.VERTICAL
                ? 'csr_wResize' : 'csr_sResize');
        }
    }
    //#endregion mouseDown
    //#region mouseMove
    mouseMove() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        const aligns = core.types.ALIGNS;
        const PX = core.types.CSSUNITS.PX;
        //#endregion Variables déclaration
        super.mouseMove();
        if (core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && priv.down) {
            const resizeLine = htmlElement.parentNode.lastElementChild;
            if (this.orientation === core.types.ORIENTATIONS.VERTICAL) {
                let x = htmlElement.offsetLeft + (core.mouse.document.x - priv.downPos.x);
                x = Math.max(x, priv.minSize);
                htmlElement.parentNode.offsetWidth - x - htmlElement.offsetWidth < priv.minSize
                    && (x = htmlElement.parentNode.offsetWidth - priv.minSize - htmlElement.offsetWidth);
                if (this.align === aligns.LEFT && x > priv.maxSize) {
                    x = priv.maxSize;
                } else if (this.align === aligns.RIGHT) {
                    x < htmlElement.parentNode.offsetWidth - priv.maxSize - htmlElement.offsetWidth
                        && (x = htmlElement.parentNode.offsetWidth - priv.maxSize - htmlElement.offsetWidth);
                }
                resizeLine.style.transform = `translateX(${x}${PX})`;
            } else {
                let y = htmlElement.offsetTop + (core.mouse.document.y - priv.downPos.y);
                y = Math.max(y, priv.minSize);
                htmlElement.parentNode.offsetHeight - y - htmlElement.offsetHeight < priv.minSize
                    && (y = htmlElement.parentNode.offsetHeight - priv.minSize - htmlElement.offsetHeight);
                if (this.align === aligns.TOP && y > priv.maxSize) {
                    y = priv.maxSize;
                } else if (this.align === aligns.BOTTOM) {
                    y < htmlElement.parentNode.offsetHeight - priv.maxSize - htmlElement.offsetHeight
                        && (y = htmlElement.parentNode.offsetHeight - priv.maxSize - htmlElement.offsetHeight);
                }
                resizeLine.style.transform = `translateY(${y}${PX})`;
            }
        }
    }
    //#endregion mouseMove
    //#region mouseUp
    mouseUp() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        const parentNode = htmlElement.parentNode;
        //#endregion Variables déclaration
        super.mouseUp();
        if (priv.down) {
            priv.down = !1;
            this.updateControls();
            parentNode.lastElementChild.jsObj = null;
            parentNode.removeChild(parentNode.lastElementChild);
        }
    }
    //#endregion mouseUp
    //#region click
    click() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        super.click();
        if (this.canCollapse()) {
            priv.isCollapsed ? this.expand() : this.collapse();
        }
    }
    //#endregion click
    //#region collapse
    collapse() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        const htmlElementStyle = this.HTMLElementStyle;
        const aligns = core.types.ALIGNS;
        const PX = core.types.CSSUNITS.PX;
        const firstCtrl = priv.firstCtrl;
        const lastCtrl = priv.lastCtrl;
        //#endregion Variables déclaration
        if (priv.orientation === core.types.ORIENTATIONS.VERTICAL) {
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
        priv.isCollapsed = !0;
    }
    //#endregion collapse
    //#region expand
    expand() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        const htmlElementStyle = this.HTMLElementStyle;
        const aligns = core.types.ALIGNS;
        const PX = core.types.CSSUNITS.PX;
        const firstCtrl = priv.firstCtrl;
        const lastCtrl = priv.lastCtrl;
        //#endregion Variables déclaration
        if (this.orientation === core.types.ORIENTATIONS.VERTICAL) {
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
        priv.isCollapsed = !1;
    }
    //#endregion expand
    //#region canCollapse
    canCollapse() {
        //#region Variables déclaration
        const priv = core.private(this);
        let inCollapsibleArea = !1;
        const htmlElement = this.HTMLElement;
        const target = core.mouse.target;
        //#endregion Variables déclaration
        if (priv.orientation === core.types.ORIENTATIONS.VERTICAL) {
            const y2 = int(htmlElement.offsetHeight / 2);
            inCollapsibleArea = target.y > y2 - 15 && target.y < y2 + 15;
        } else {
            const w2 = int(htmlElement.offsetWidth / 2);
            inCollapsibleArea = target.x > w2 - 15 && target.x < w2 + 15;
        }
        return priv.collapsible & inCollapsibleArea;
    }
    //#endregion canCollapse
    //#region updateControls
    updateControls() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        const htmlElementStyle = this.HTMLElementStyle;
        let mat;
        let offset;
        const resizeLine = htmlElement.parentNode.lastElementChild;
        const firstCtrl = priv.firstCtrl;
        const firstHtmlElement = firstCtrl.HTMLElement;
        const lastCtrl = priv.lastCtrl;
        const lastHtmlElement = lastCtrl.HTMLElement;
        const aligns = core.types.ALIGNS;
        const PX = core.types.CSSUNITS.PX;
        //#endregion Variables déclaration
        mat = getComputedStyle(resizeLine).transform;
        mat = mat.match(/-?[\d\.]+/g);
        if (priv.orientation === core.types.ORIENTATIONS.VERTICAL) {
            offset = int(mat[4]) - htmlElement.offsetLeft;
            if (firstCtrl) {
                firstCtrl.align === aligns.CLIENT
                    ? firstCtrl.right = htmlElement.parentNode.offsetWidth - int(mat[4])
                    : firstCtrl.width = firstHtmlElement.offsetWidth + offset;
            }
            if (lastCtrl) {
                lastCtrl.align === aligns.CLIENT
                    ? lastCtrl.left = lastHtmlElement.offsetLeft + offset
                    : priv.lastCtrl.width = htmlElement.parentNode.offsetWidth - resizeLine.offsetWidth - int(mat[4]);
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
        const priv = core.private(this);
        let firstCtrl = priv.firstCtrl;
        let lastCtrl = priv.lastCtrl;
        const htmlElement = this.HTMLElement;
        const aligns = core.types.ALIGNS;
        const components = this.owner.components;
        const self = this;
        let comps = [];
        //#endregion Variables déclaration
        if (core.tools.isString(firstCtrl)) {
            priv.firstCtrl = firstCtrl = this.form[firstCtrl] ? this.form[firstCtrl] : null;
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
            priv.firstCtrl = firstCtrl = comps.find(e => e !== self);
        }
        if (core.tools.isString(lastCtrl)) {
            this.form[lastCtrl]
                ? priv.lastCtrl = lastCtrl = this.form[lastCtrl]
                : priv.lastCtrl = lastCtrl = null;
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
            priv.lastCtrl = lastCtrl = comps.find(e => e !== self);
        }
    }
    //#endregion checkCtrls
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.downPos.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
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