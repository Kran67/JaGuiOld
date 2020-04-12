//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Tools } from '/scripts/core/tools.js';
import { Mouse } from '/scripts/core/mouse.js';
//#endregion Import
//#region Expander
const Expander = (() => {
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
    //#region Class Expander
    class Expander extends ThemedControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.header = null;
                priv.headerCaption = null;
                priv.lastHeight = props.hasOwnProperty('height') ? props.height : 0;
                priv.expanded = props.hasOwnProperty('expanded') ? props.expanded : !1;
                priv.checked = props.hasOwnProperty('checked') ? props.checked : !1;
                priv.caption = props.hasOwnProperty('caption') ? props.caption : this.name;
                priv.viewCheck = props.hasOwnProperty('viewCheck') && Tools.isBool(props.viewCheck) ? props.viewCheck : !0;
                priv.allowRealignChildsOnResize = !0;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region viewCheck
        get viewCheck() {
            return internal(this).viewCheck;
        }
        set viewCheck(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.viewCheck !== newValue) {
                    priv.viewCheck = newValue;
                    this.update();
                }
            }
        }
        //#endregion viewCheck
        //#region caption
        get caption() {
            return internal(this).caption;
        }
        set caption(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (priv.caption !== newValue) {
                    priv.caption = newValue;
                    this.update();
                }
            }
        }
        //#endregion caption
        //#region expanded
        get expanded() {
            return internal(this).expanded;
        }
        set expanded(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.expanded !== newValue) {
                    priv.expanded = newValue;
                    this.update();
                }
            }
        }
        //#endregion expanded
        //#region viewCheck
        get viewCheck() {
            return internal(this).viewCheck;
        }
        set viewCheck(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.viewCheck !== newValue) {
                    priv.viewCheck = newValue;
                    this.update();
                }
            }
        }
        //#endregion viewCheck
        //#region checked
        get checked() {
            return internal(this).checked;
        }
        set checked(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.checked !== newValue) {
                    priv.checked = newValue;
                    this.update();
                }
            }
        }
        //#endregion checked
        //#endregion Getters / Setters
        //#region Methods
        //#region expendCollapse
        expandCollapse() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.expanded = !priv.expanded;
            this.update();
        }
        //#endregion expendCollapse
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const htmlElementStyle = this.HTMLElementStyle;
            //const bHTMLElement = priv.button.HTMLElement;
            const PX = Types.CSSUNITS.PX;
            //#endregion Variables déclaration
            htmlElement.classList.remove('expanded');
            htmlElement.classList.remove('viewCheck');
            htmlElement.classList.remove('checked');
            if (priv.expanded) {
                htmlElementStyle.height = `${priv.lastHeight}${PX}`;
                htmlElement.classList.add('expanded');
            } else {
                if (htmlElement.offsetHeight > priv.headerHeight) {
                    htmlElementStyle.height = `${priv.headerHeight + 2}${PX}`;
                }
            }
            if (priv.viewCheck) {
                htmlElement.classList.add('viewCheck');
                if (priv.checked) {
                    htmlElement.classList.add('checked');
                }
            }
            htmlElement.dataset.caption = priv.caption;
            this.components.forEach(comp => {
                comp.enabled = priv.checked;
            });
        }
        //#endregion update
        //#region check
        check() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.checked = !priv.checked;
            this.update();
        }
        //#endregion check
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.header = null;
            priv.button = null;
            priv.eye = null;
            priv.headerCaption = null;
            priv.container.destroy();
            priv.container = null;
            priv.lastHeight = null;
            priv.expanded = null;
            priv.checked = null;
            priv.caption = null;
        }
        //#endregion destroy
        //#region getTabOrderList
        getTabOrderList(list, children) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            const tabList = priv.container.tabList;
            if (children) {
                children = !0;
            }
            if (list && tabList) {
                tabList.forEach(tab => {
                    list.push(tab);
                    if (children) {
                        tab.getTabOrderList(list, children);
                    }
                });
            }
        }
        //#endregion getTabOrderList
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const cStyle = getComputedStyle(htmlElement);
            //#endregion Variables déclaration
            super.loaded();
            priv.headerHeight = parseFloat(cStyle.getPropertyValue(`--${this.themeName}-header-height`));
            priv.arrowPos = new Core.classes.Point(parseFloat(cStyle.getPropertyValue(`--${this.themeName}-arrow-left`)),
                parseFloat(cStyle.getPropertyValue(`--${this.themeName}-arrow-top`)));
            priv.arrowSize = new Core.classes.Point(parseFloat(cStyle.getPropertyValue(`--${this.themeName}-arrow-width`)),
                parseFloat(cStyle.getPropertyValue(`--${this.themeName}-arrow-height`)));
            priv.checkPos = {  left: parseFloat(cStyle.getPropertyValue(`--${this.themeName}-check-left`)),
                width: parseFloat(cStyle.getPropertyValue(`--${this.themeName}-check-width`)) };
            this.update();
        }
        //#endregion loaded
        //#region loaded
        mouseDown() {
            //#region Variables déclaration
            const priv = internal(this);
            const target = Core.mouse.target;
            //#endregion Variables déclaration
            if (this.enabled) {
                super.mouseDown();
                if (Core.mouse.button === Mouse.MOUSEBUTTONS.LEFT) {
                    if (target.y < priv.headerHeight) {
                        if (target.x>=priv.checkPos.left && target.x<=priv.checkPos.left+priv.checkPos.width && priv.viewCheck) {
                            this.check();
                        } else {
                            this.expandCollapse();
                        }
                    }
                }
            }
        }
        //#endregion loaded
        //#endregion Methods
    }
    return Expander;
    //#endregion Expander
})();
//#endregion Expander
Core.classes.register(Types.CATEGORIES.CONTAINERS, Expander);
export { Expander };
//#region Template
if (Core.isHTMLRenderer) {
    const ExpanderTpl = ['<jagui-expander id="{internalId}" data-class="Expander" class="Control Expander {theme}">',
        '<properties>{ "name": "{name}", "width": 130, "height": 100 }</properties></jagui-expander>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: Expander, template: ExpanderTpl }]);
}
//#endregion