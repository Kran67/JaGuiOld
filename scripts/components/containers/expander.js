//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Mouse } from '/scripts/core/mouse.js';
//#endregion Import
//#region Class Expander
class Expander extends ThemedControl {
    //#region Private fields
    #lastHeight;
    #expanded;
    #checked;
    #caption;
    #viewCheck;
    #headerHeight;
    #container;
    #arrowPos;
    #arrowSize;
    #checkPos;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.allowRealignChildsOnResize = !0;
            super(owner, props);
            this.#lastHeight = props.hasOwnProperty('height') ? props.height : 0;
            this.#expanded = props.hasOwnProperty('expanded') ? props.expanded : !1;
            this.#checked = props.hasOwnProperty('checked') ? props.checked : !1;
            this.#caption = props.hasOwnProperty('caption') ? props.caption : this.name;
            this.#viewCheck = props.hasOwnProperty('viewCheck') && core.tools.isBool(props.viewCheck)
                    ? props.viewCheck : !0;
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region viewCheck
    get viewCheck() {
        return this.#viewCheck;
    }
    set viewCheck(newValue) {
        if (core.tools.isBool(newValue) && this.#viewCheck !== newValue) {
            this.#viewCheck = newValue;
            this.update();
        }
    }
    //#endregion viewCheck
    //#region caption
    get caption() {
        return this.#caption;
    }
    set caption(newValue) {
        if (core.tools.isString(newValue) && this.#caption !== newValue) {
            this.#caption = newValue;
            this.update();
        }
    }
    //#endregion caption
    //#region expanded
    get expanded() {
        return this.#expanded;
    }
    set expanded(newValue) {
        if (core.tools.isBool(newValue) && this.#expanded !== newValue) {
            this.#expanded = newValue;
            this.update();
        }
    }
    //#endregion expanded
    //#region viewCheck
    get viewCheck() {
        return this.#viewCheck;
    }
    set viewCheck(newValue) {
        if (core.tools.isBool(newValue) && this.#viewCheck !== newValue) {
            this.#viewCheck = newValue;
            this.update();
        }
    }
    //#endregion viewCheck
    //#region checked
    get checked() {
        return this.#checked;
    }
    set checked(newValue) {
        if (core.tools.isBool(newValue) && this.#checked !== newValue) {
            this.#checked = newValue;
            this.update();
        }
    }
    //#endregion checked
    //#endregion Getters / Setters
    //#region Methods
    //#region expendCollapse
    expandCollapse() {
        this.#expanded = !this.#expanded;
        this.update();
    }
    //#endregion expendCollapse
    //#region update
    update() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const htmlElementStyle = this.HTMLElementStyle;
        //const bHTMLElement = this.#button.HTMLElement;
        const PX = core.types.CSSUNITS.PX;
        //#endregion Variables déclaration
        htmlElement.classList.remove('expanded');
        htmlElement.classList.remove('viewCheck');
        htmlElement.classList.remove('checked');
        if (this.#expanded) {
            htmlElementStyle.height = `${this.#lastHeight}${PX}`;
            htmlElement.classList.add('expanded');
        } else {
            htmlElement.offsetHeight > this.#headerHeight
                && (htmlElementStyle.height = `${this.#headerHeight + 2}${PX}`);
        }
        if (this.#viewCheck) {
            htmlElement.classList.add('viewCheck');
            this.#checked && htmlElement.classList.add('checked');
        }
        htmlElement.dataset.caption = this.#caption;
        this.components.forEach(comp => {
            comp.enabled = this.#checked;
        });
    }
    //#endregion update
    //#region check
    check() {
        this.#checked = !this.#checked;
        this.update();
    }
    //#endregion check
    //#region destroy
    destroy() {
        this.#container.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#region getTabOrderList
    getTabOrderList(list, children) {
        const tabList = this.#container.tabList;
        children && (children = !0);
        if (list && tabList) {
            tabList.forEach(tab => {
                list.push(tab);
                children && tab.getTabOrderList(list, children);
            });
        }
    }
    //#endregion getTabOrderList
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const cStyle = getComputedStyle(htmlElement);
        //#endregion Variables déclaration
        super.loaded();
        this.#headerHeight = parseFloat(cStyle.getPropertyValue(`--${this.themeName}-header-height`));
        this.#arrowPos = new core.classes.Point(parseFloat(cStyle.getPropertyValue(`--${this.themeName}-arrow-left`)),
            parseFloat(cStyle.getPropertyValue(`--${this.themeName}-arrow-top`)));
        this.#arrowSize = new core.classes.Point(parseFloat(cStyle.getPropertyValue(`--${this.themeName}-arrow-width`)),
            parseFloat(cStyle.getPropertyValue(`--${this.themeName}-arrow-height`)));
        this.#checkPos = {
            left: parseFloat(cStyle.getPropertyValue(`--${this.themeName}-check-left`)),
            width: parseFloat(cStyle.getPropertyValue(`--${this.themeName}-check-width`))
        };
        this.update();
    }
    //#endregion loaded
    //#region loaded
    mouseDown() {
        //#region Variables déclaration
        const target = core.mouse.target;
        //#endregion Variables déclaration
        if (this.enabled) {
            super.mouseDown();
            if (core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && target.y < this.#headerHeight) {
                target.x >= this.#checkPos.left && target.x <= this.#checkPos.left + this.#checkPos.width
                    && this.#viewCheck ? this.check() : this.expandCollapse();
            }
        }
    }
    //#endregion loaded
    //#endregion Methods
}
Object.defineProperties(Expander.prototype, {
    'expanded': {
        enumerable: !0
    },
    'checked': {
        enumerable: !0
    },
    'caption': {
        enumerable: !0
    },
    'viewCheck': {
        enumerable: !0
    }
});
core.classes.register(core.types.CATEGORIES.CONTAINERS, Expander);
//#endregion Expander
//#region Template
if (core.isHTMLRenderer) {
    const ExpanderTpl = ['<jagui-expander id="{internalId}" data-class="Expander" class="Control Expander {theme}">',
        '<properties>{ "name": "{name}", "width": 130, "height": 100 }</properties></jagui-expander>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: Expander, template: ExpanderTpl }]);
}
//#endregion
export { Expander };