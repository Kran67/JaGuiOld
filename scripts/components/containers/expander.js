//#region Import
import { ThemedControl } from "/scripts/core/themedcontrol.js";
import { Tools } from "/scripts/core/tools.js";
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
            //#region Variables déclaration
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.header = null;
                priv.headerCaption = null;
                priv.container = Core.classes.createComponent({ class: Core.classes.Layout, owner: this, props: { inForm: false }, withTpl: false });
                priv.lastHeight = props.hasOwnProperty("height") ? props.height : 0;
                priv.button = Core.classes.createComponent({ class: Core.classes.Button, owner: this, props: { inForm: false, caption: String.EMPTY }, withTpl: false });
                priv.button.onClick.addListener(this.expandCollapse);
                priv.button.canFocused = false;
                priv.eye = Core.classes.createComponent({ class: Core.classes.Checkbox, owner: this, props: { inForm: false, caption: String.EMPTY, autoSize: false }, withTpl: false });
                priv.eye.onClick.addListener(this.check);
                priv.eye.canFocused = false;
                priv.expanded = props.hasOwnProperty("expanded") ? props.expanded : false;
                priv.checked = props.hasOwnProperty("checked") ? props.checked : false;
                priv.caption = props.hasOwnProperty("caption") ? props.caption : this.name;
                priv.viewCheck = props.hasOwnProperty("viewCheck") && Tools.isBool(props.viewCheck) ? props.viewCheck : true;
                priv.container.allowRealignChildsOnResize = true;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region container
        get container() {
            return internal(this).container;
        }
        //#endregion container
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
                    if (priv.eye) {
                        priv.eye.visible = priv.viewCheck;
                    }
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
                    if (priv.headerCaption) {
                        priv.headerCaption.innerHTML = priv.caption;
                    }
                }
            }
        }
        //#endregion caption
        //#endregion Getters / Setters
        //#region Methods
        //#region getHTMLElement
        getHTMLElement(id) {
            //#region Variables déclaration
            const priv = internal(this);
            let props = null;
            //#endregion Variables déclaration
            super.getHTMLElement(id);
            const htmlElement = this.HTMLElement;
            props = htmlElement.querySelector("properties");
            if (props) {
                props = JSON.parse(props.innerText);
            }
            priv.header = htmlElement.querySelector(".ExpanderHeader");
            priv.header.jsObj = this;
            priv.button.getHTMLElement(priv.header.firstElementChild.id);
            priv.eye.getHTMLElement(priv.header.querySelector(".ExpanderCheckbox").id);
            priv.headerCaption = priv.header.lastElementChild;
            priv.headerCaption.jsObj = this;
            priv.headerCaption.innerHTML = priv.caption;
            priv.container.HTMLElement = htmlElement.lastElementChild;
            priv.container.HTMLElementStyle = priv.container.HTMLElement.style;
            priv.container.HTMLElement.jsObj = this;
            priv.container.getChilds(priv.container.HTMLElement);
            if (props.hasOwnProperty("contentEnabled")) {
                priv.container.enabled = props.contentEnabled;
            }
        }
        //#region getHTMLElement
        //#region _expendCollapse
        _expandCollapse() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.expanded = !priv.expanded;
            this.update();
        }
        //#endregion _expendCollapse
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElementStyle = this.HTMLElementStyle;
            const bHTMLElement = priv.button.HTMLElement;
            const PX = Types.CSSUNITS.PX;
            //#endregion Variables déclaration
//            super.update();
            bHTMLElement.classList.remove("expanded");
            if (priv.expanded) {
                htmlElementStyle.height = `${priv.lastHeight}${PX}`;
                bHTMLElement.classList.add("expanded");
            } else {
                if (this.HTMLElement.offsetHeight > priv.header.offsetHeight) {
                    htmlElementStyle.height = `${priv.header.offsetHeight + 1}${PX}`;
                }
            }
            priv.eye.visible = priv.viewCheck;
        }
        //#endregion update
        //#region expandCollapse
        expandCollapse() {
            this.owner._expandCollapse();
        }
        //#endregion expandCollapse
        //#region check
        check() {
            this.owner.checked = !this.owner.checked;
            this.owner.container.enabled = this.owner.checked;
            this.HTMLElement.dataset.checked = this.owner.checked;
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
                children = true;
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
            super.loaded();
            this.update();
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
    var ExpanderTpl = "<jagui-expander id=\"{internalId}\" data-class=\"Expander\" class=\"Control Expander {theme}\"><properties>{ \"name\": \"{name}\", \"height\": 100, \"tabOrder\": 40, \"width\": 130, \"height\": 100 }</properties><jagui-expanderheader class=\"Control ExpanderHeader {theme}\"><jagui-button id=\"{internalId}_1\" data-class=\"button\" class=\"Control Button ExpanderButton {theme}\"></jagui-button><jagui-checkbox id=\"{internalId}_2\" data-class=\"Checkbox\" class=\"Control Checkbox ExpanderCheckbox {theme}\"><input type=\"checkbox\" class=\"Control CheckboxInput\" /><div class=\"Control {theme} CheckboxCheck ExpanderCheckboxCheck\"></div></jagui-checkbox><jagui-label class=\"csr_default ExpanderCaption {theme}\"></jagui-label></jagui-expanderheader><jagui-expandercontent class=\"Control ExpanderContent {theme}\"></jagui-expandercontent></jagui-expander>";
    Core.classes.registerTemplates([{ Class: Expander, template: ExpanderTpl }]);
}
//#endregion