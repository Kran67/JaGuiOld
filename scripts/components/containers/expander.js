//#region Import
import { ThemedControl } from "/scripts/core/themedcontrol.js";
import { Tools } from "/scripts/core/tools.js";
import { Convert } from "/scripts/core/convert.js";
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
                priv.container = Core.classes.createComponent({ class:Core.classes.Layout, owner: this, props : { inForm: false }, withTpl: false });
                priv.lastHeight = props.hasOwnProperty("height")?props.height:0;
                priv.button = Core.classes.createComponent({ class: Core.classes.Button, owner: this, props: { inForm: false, caption: String.EMPTY }, withTpl: false });
                priv.button.onClick.addListener(this.expandCollapse);
                priv.button.canFocused = false;
                priv.eye = Core.classes.createComponent({ class: Core.classes.Checkbox, owner: this, props: { inForm: false, caption: String.EMPTY, autoSize: false }, withTpl: false });
                priv.eye.onClick.addListener(this.check);
                priv.eye.canFocused = false;
                priv.expanded = props.hasOwnProperty("expanded")?props.expanded:false;
                priv.checked = props.hasOwnProperty("checked")?props.checked:false;
                priv.caption = this.ClassName;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region container
        get container() {
            return internal(this).container;
        }
        //#endregion container
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
            //priv.button.getChildsHTMLElement();
            //priv.button.updateFromHTML();
            priv.eye.getHTMLElement(priv.header.querySelector(".ExpanderCheckbox").id);
            //priv.eye.getChildsHTMLElement();
            //priv.eye.updateFromHTML();
            priv.headerCaption = priv.header.lastElementChild;
            priv.headerCaption.jsObj = this;
            priv.container.HTMLElement = htmlElement.lastElementChild;
            priv.container.HTMLElementStyle = priv.container.HTMLElement.style;
            priv.container.HTMLElement.jsObj = this;
            if (priv.container.HTMLElement.dataset.enabled) {
                priv.container.enabled = Convert.strToBool(priv.container.HTMLElement.dataset.enabled);
            }
            priv.container.getChilds(priv.container.HTMLElement);
            if (props.hasOwnProperty("contentEnabled")) {
                priv.container.enabled = props.contentEnabled;
            }
        }
        //updateFromHTML: function () {
        //    var data;
        //    this._inherited();
        //    this._lastHeight = ~~(this._HTMLElement.dataset.height);
        //    data = this._HTMLElement.dataset.expanded;
        //    if (data) this._expendCollapse(_conv.strToBool(data));
        //    if (this.eye) {
        //        data = this.eye._HTMLElement.dataset.checked;
        //        if (data) this.checked = _conv.strToBool(data);
        //        data = this._HTMLElement.dataset.viewcheck;
        //        if (data) this.eye._HTMLElementStyle.visibility = _conv.strToBool(data) ? "visible" : "hidden";
        //    }
        //},
        _expendCollapse(expand) {
            //#region Variables déclaration
            const htmlElementStyle = this.HTMLElementStyle;
            const bHTMLElement = priv.button.HTMLElement;
            //#endregion Variables déclaration
            if (priv.expanded !== expand) {
                priv.expanded = expand ? expand : !priv.expanded;
                bHTMLElement.classList.remove("expanded");
                if (priv.expanded) {
                    htmlElementStyle.height = `${priv.lastHeight}${Types.CSSUNITS.PX}`;
                    bHTMLElement.classList.add("expanded");
                } else {
                    htmlElementStyle.height = `${priv.header.offsetHeight}${Types.CSSUNITS.PX}`;
                }
                //this.button.HTMLElement.dataset.expanded = this.expanded;
                //this.button.HTMLElement.dataset.expanded = this.expanded;
            }
        }
        expandCollapse() {
            this.owner._expendCollapse();
        }
        check() {
            this.owner.checked = !this.owner.checked;
            this.owner.container.enabled = this.owner.checked;
            this.HTMLElement.dataset.checked = this.owner.checked;
        }
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
        //#endregion Methods
    }
    return Expander;
    //#endregion Expander
})();
//#endregion Expander
Core.classes.register(Types.CATEGORIES.CONTAINERS, Expander);
export { Expander };

/*(function () {
    var Expander = $j.classes.ThemedControl.extend("Expander", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private properties
                this._header = null;
                this._headerCaption = null;
                this._container = $j.classes.createComponent($j.classes.Layout, this, null, { _inForm: false }, false);
                this._lastHeight = 0;
                //#endregion
                this.button = $j.classes.createComponent($j.classes.Button, this, null, { _inForm: false }, false);
                this.button.onClick.addListener(this.expandCollapse);
                this.button.canFocused = false;
                this.eye = $j.classes.createComponent($j.classes.Checkbox, this, null, { _inForm: false }, false);
                this.eye.onClick.addListener(this.check);
                this.eye.canFocused = false;
                this.expanded = false;
                this.checked = false;
                this.caption = this._ClassName;
            }
        },
        //#region Setters
        setCaption: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.caption !== newValue) {
                this.caption = newValue;
                if (this._headerCaption) this._headerCaption.innerHTML = this.caption;
            }
        },
        //#endregion
        //#region Methods
        getChildsHTMLElement: function (id) {
            this._inherited(id);
            this._header = this._HTMLElement.firstElementChild;
            this._header.jsObj = this;
            this.button.getHTMLElement(this._header.firstElementChild.id);
            this.button.getChildsHTMLElement();
            this.button.updateFromHTML();
            this.eye.getHTMLElement(this._header.querySelector(".ExpanderCheckbox").id);
            this.eye.getChildsHTMLElement();
            this.eye.updateFromHTML();
            this._headerCaption = this._header.lastElementChild;
            this._headerCaption.jsObj = this;
            this._container._HTMLElement = this._HTMLElement.lastElementChild;
            this._container._HTMLElementStyle = this._container._HTMLElement.style;
            this._container._HTMLElement.jsObj = this;
            if (this._container._HTMLElement.dataset.enabled) this._container.enabled = _conv.strToBool(this._container._HTMLElement.dataset.enabled);
            this._container.getChildsHTMLElement(this._container._HTMLElement);
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            this._lastHeight = ~~(this._HTMLElement.dataset.height);
            data = this._HTMLElement.dataset.expanded;
            if (data) this._expendCollapse(_conv.strToBool(data));
            if (this.eye) {
                data = this.eye._HTMLElement.dataset.checked;
                if (data) this.checked = _conv.strToBool(data);
                data = this._HTMLElement.dataset.viewcheck;
                if (data) this.eye._HTMLElementStyle.visibility = _conv.strToBool(data) ? "visible" : "hidden";
            }
        },
        _expendCollapse: function (expand) {
            if (this.expanded === expand) return;
            this.expanded = expand ? expand : !this.expanded;
            $j.CSS.removeClass(this.button._HTMLElement, "expanded");
            if (this.expanded) {
                this._HTMLElementStyle.height = this._lastHeight + $j.types.CSSUnits.PX;
                $j.CSS.addClass(this.button._HTMLElement, "expanded");
            } else this._HTMLElementStyle.height = this._header.offsetHeight + $j.types.CSSUnits.PX;
            this.button._HTMLElement.dataset.expanded = this.expanded;
            this.button._HTMLElement.dataset.expanded = this.expanded;
        },
        expandCollapse: function () {
            this._owner._expendCollapse();
        },
        check: function () {
            this._owner.checked = !this._owner.checked;
            this._owner._container.setEnabled(this._owner.checked);
            this._HTMLElement.dataset.checked = this._owner.checked;
        },
        destroy: function () {
            this._inherited();
            this._header = null;
            this.button = null;
            this.eye = null;
            this._headerCaption = null;
            this._container.destroy();
            this._container = null;
            this._lastHeight = null;
            this.expanded = null;
            this.checked = null;
            this.caption = null;
        },
        getTabOrderList: function (list, children) {
            var i, control, l, tabList = this._container._tabList;
            if (children) children = true;
            if (!list) return;
            if (tabList) {
                l = tabList.length;
                for (i = 0; i < l; i++) {
                    control = tabList[i];
                    list.push(control);
                    if (children) control.getTabOrderList(list, children);
                }
            }
        }
        //#endregion
    });
    Object.seal(Expander);
    $j.classes.register($j.types.categories.CONTAINERS, Expander);
    //#region Template
    if ($j.isHTMLRenderer()) {
        var ExpanderTpl = "<div id='{internalId}' data-name='{name}' data-class='Expander' class='Control Expander {theme}' data-height='100' data-expanded='true' style='width:130px;height:100px;'>\
                     <div class='Control ExpanderHeader {theme}'>\
                     <button id='{internalId}_1' data-class='button' class='Control Button ExpanderButton {theme} expanded csr_default'></button>\
                     <div id='{internalId}_2' data-class='Checkbox' class='Control Checkbox ExpanderCheckbox {theme}' data-ischecked='true' data-state='checked'>\
                     <input type='checkbox' class='Control CheckboxInput' />\
                     <div class='Control {theme} CheckboxCheck ExpanderCheckboxCheck'></div>\
                     </div>\
                     <label class='Control csr_default ExpanderCaption {theme}'>{name}</label>\
                     </div>\
                     <div class='Control ExpanderContent {theme}'></div>\
                     </div>";
        $j.classes.registerTemplates([{ Class: Expander, template: ExpanderTpl }]);
    }
    //#endregion
})();*/