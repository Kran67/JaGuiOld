//#region Import
import { ThemedControl } from "/scripts/core/themedcontrol.js";
import { Tools } from "/scripts/core/tools.js";
import { BaseClass } from "/scripts/core/baseclass.js";
//#endregion Import
//#region BEVELS
/**
 * @type    {Object}        BEVELS
 */
const BEVELS = Object.freeze({
    LOWERED: "lowered",
    NONE: "none",
    RAISED: "raised",
    SINGLE: "single"
});
//#endregion BEVELS
//#region StatusBarPanel
const StatusBarPanel = (() => {
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
    //#region Class StatusBarPanel
    class StatusBarPanel extends BaseClass {
        //#region BEVELS
        /**
         * @type    {Object}        BEVELS
         */
        static get BEVELS() {
            return BEVELS;
        }
        //#endregion BEVELS
        //#region constructor
        constructor(owner, props) {
            super(owner, props);
            props = !props ? {} : props;
            if (owner) {
                const priv = internal(this);
                priv.html = document.createElement(Types.HTMLELEMENTS.DIV);
                owner.HTMLElement.appendChild(priv.html);
                priv.html.classList.add("Control","StatusBarPanel", owner.app.themeManifest.themeName);
                priv.owner = owner;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "alignment",
                    enum: Types.TEXTALIGNS,
                    variable: priv,
                    value: props.hasOwnProperty("alignment") ? props.alignment : Types.TEXTALIGNS.LEFT,
                    setter: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        if (Tools.valueInSet(newValue, Types.TEXTALIGNS)) {
                            if (priv.alignment !== newValue) {
                                priv.alignment = newValue;
                                this.update();
                                if (priv.owner.panels.onChange.hasListener) {
                                    priv.owner.panels.onChange.invoke();
                                }
                            }
                        }
                    }
                });
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "bevel",
                    enum: BEVELS,
                    variable: priv,
                    value: props.hasOwnProperty("bevel") ? props.bevel : BEVELS.LOWERED,
                    setter: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        if (Core.tools.valueInSet(newValue, BEVELS)) {
                            if (priv.bevel !== newValue) {
                                priv.bevel = newValue;
                                this.update();
                                if (priv.owner.panels.onChange.hasListener) {
                                    priv.owner.panels.onChange.invoke();
                                }
                            }
                        }
                    }
                });
                priv.text = props.hasOwnProperty("text")?props.text:String.EMPTY;
                priv.width = props.hasOwnProperty("width")?props.width:50;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region html
        get html() {
            return internal(this).html;
        }
        //#endregion html
        //#region text
        get text() {
            return internal(this).text;
        }
        set text(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (priv.text !== newValue) {
                    priv.text = newValue;
                    this.update();
                    if (priv.owner.panels.onChange.hasListener) {
                        priv.owner.panels.onChange.invoke();
                    }
                }
            }
        }
        //#endregion text
        //#region width
        get width() {
            return internal(this).width;
        }
        set width(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.width !== newValue) {
                    priv.width = newValue;
                    this.update();
                    if (priv.owner.panels.onChange.hasListener) {
                        priv.owner.panels.onChange.invoke();
                    }
                }
            }
        }
        //#endregion width
        //#endregion Getters / Setters
        //#region Methods
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            const html = priv.html;
            if (html) {
                const style = html.style;
                style.textAlign = priv.alignment;
                html.innerHTML = priv.text;
                if (priv.owner.panels.last !== this) {
                    style.width = `${priv.width}${Types.CSSUNITS.PX}`;
                }
                priv.html.classList.remove("none", "lowered", "raised", "single");
                priv.html.classList.add(priv.bevel);
            }
        }
        //#endregion update
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.alignment = null;
            priv.bevel = null;
            priv.text = null;
            priv.width = null;
            if (priv.html) {
                priv.html.parentNode.remove(priv.html);
            }
        }
        //#endregion destroy
        //#endregion Methods
    }
    return StatusBarPanel;
    //#endregion StatusBarPanel
})();
//#endregion StatusBarPanel
//#region StatusBar
const StatusBar = (() => {
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
    //#region Class StatusBar
    class StatusBar extends ThemedControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                if (owner === owner.form.content) {
                    owner = owner.form.layout;
                }
                priv.simplePanel = null;
                this.align = props.hasOwnProperty("align") ? props.alignment : Types.ALIGNS.MOSTBOTTOM;
                if (!Core.isHTMLRenderer) {
                    this.height = 19;
                }
                Core.classes.newCollection(this, this, StatusBarPanel, "panels");
                priv.autoHint = props.hasOwnProperty("autoHint")?props.autoHint:false;
                priv.simplePanel = props.hasOwnProperty("simplePanel")?props.simplePanel:false;
                priv.simpleText = props.hasOwnProperty("simpleText")?props.simpleText:String.EMPTY;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region autoHint
        get autoHint() {
            return internal(this).autoHint;
        }
        set autoHint(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.autoHint !== newValue) {
                    priv.autoHint = newValue;
                }
            }
        }
        //#endregion autoHint
        //#region simplePanel
        get simplePanel() {
            return internal(this).simplePanel;
        }
        set simplePanel(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const DISPLAYS = Types.DISPLAYS;
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.simplePanel !== newValue) {
                    priv.simplePanel = newValue;
                    priv.simplePanel.style.display = DISPLAYS.NONE;
                    if (priv.simplePanel) {
                        priv.simplePanel.style.display = DISPLAYS.BLOCK;
                    }
                    priv.panels.forEach(panel => {
                        const style = panel.html.style;
                        if (priv.simplePanel) {
                            style.display = DISPLAYS.NONE;
                        } else {
                            style.display = DISPLAYS.BLOCK;
                        }
                    });
                }
            }
        }
        //#endregion simplePanel
        //#region simpleText
        get simpleText() {
            return internal(this).simplePanel;
        }
        set simpleText(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (priv.simpleText !== newValue) {
                    priv.simpleText = newValue;
                    priv.simplePanel.innerHTML = priv.simpleText;
                }
            }
        }
        //#endregion simpleText
        //#endregion Getters / Setters
        //#region Methods
        //#region getHTMLElement
        getHTMLElement(id) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.getHTMLElement(id);
            const htmlElement = this.HTMLElement;
            priv.simplePanel = htmlElement.querySelector(".StatusBarSimplePanel");
            let props = htmlElement.querySelector("properties");
            if (props) {
                props = JSON.parse(props.innerText);
            }
            if (props.hasOwnProperty("panels") && Array.isArray(props.panels)) {
                props.panels.forEach(panel => {
                    this.panels.push(new StatusBarPanel(this, panel));
                });
            }
        }
        //#endregion getHTMLElement
        //#region loaded
        loaded() {
            super.loaded();
            this.alignPanels();
            this.panels.onChange.addListener(this.alignPanels);
            if (!this.form.statusBar && this.owner === this.form.layout) {
                if (this.form.statusBars.indexOf(this) === -1) {
                    this.form.statusBars.push(this);
                }
                //this.form.resizeContent();
            }
        }
        //#endregion loaded
        //#region alignPanels
        alignPanels() {
            let x = 1;
            this.panels.forEach((panel, i) => {
                const style = panel.html.style;
                style.left = `${x}${Types.CSSUNITS.PX}`;
                style.right = "auto";
                x += panel.width + (panel.bevel === BEVELS.SINGLE ? 0 : 2);
                if (i === this.panels.length - 1) {
                    style.right = "1px";
                    style.width = "auto";
                }
                panel.update();
            });
        }
        //#endregion alignPanels
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.simplePanel = null;
            while (this.panels.length > 0) {
                const panel = this.panels.pop();
                panel.destroy();
            }
            if (priv.simplePanel) {
                priv.simplePanel.parentNode.remove(priv.simplePanel);
            }
            this.panels.clear();
            priv.autoHint = null;
            priv.simplePanel = null;
            priv.simpleText = null;
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return StatusBar;
    //#endregion StatusBar
})();
//#endregion StatusBar
Object.seal(StatusBar);
Core.classes.register(Types.CATEGORIES.INTERNAL, StatusBarPanel);
Core.classes.register(Types.CATEGORIES.TOOLBARS, StatusBar);

/*(function () {
    var StatusBar = $j.classes.ThemedControl.extend("StatusBar", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                if (owner === owner.form._content) owner = owner.form._layout;
                this._inherited(owner, props);
                //#region Private properties
                this._simplePanel = null;
                //#endregion
                $j.tools.addPropertyFromSet(this, "align", $j.types.aligns, $j.types.aligns.MOSTBOTTOM);
                if (!$j.isHTMLRenderer()) this.height = 19;
                $j.classes.newCollection(this, this, $j.classes.StatusBarPanel, "panels");
                this.autoHint = false;
                this.simplePanel = false;
                this.simpleText = String.EMPTY;
            }
        },
        //#region Setters
        setAutoHint: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.autoHint !== newValue) {
                this.autoHint = newValue;
            }
        },
        setSimplePanel: function (newValue) {
            var style;
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.simplePanel !== newValue) {
                this.simplePanel = newValue;
                this._simplePanel.style.display = $j.types.displays.NONE;
                if (this.simplePanel) this._simplePanel.style.display = $j.types.displays.BLOCK;
                for (var i = 0, l = this.panels.length; i < l; i++) {
                    style = this.panels[i]._html.style;
                    if (this.simplePanel) style.display = $j.types.displays.NONE;
                    else style.display = $j.types.displays.BLOCK;
                }
            }
        },
        setSimpleText: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.simpleText !== newValue) {
                this.simpleText = newValue;
                this._simplePanel.innerHTML = this.simpleText;
            }
        },
        //#endregion
        //#region Methods
        getChildsHTMLElement: function () {
            var items, item, i, l, cdata;
            this._simplePanel = this._HTMLElement.firstElementChild;
            // on va chercher les items dans le CDATA
            cdata = this._HTMLElement.childNodes;
            l = cdata.length
            for (i = 0; i < l; i++) {
                if (cdata[i].nodeType === $j.types.xmlNodeTypes.COMMENT_NODE) {
                    items = JSON.parse(cdata[i].nodeValue);
                }
            }
            if (items) {
                l = items.length;
                for (i = 0; i < l; i++) {
                    item = new $j.classes.StatusBarPanel(this, items[i]);
                    this.panels.push(item);
                }
            }
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.autohint;
            this.autoHint = _conv.strToBool(data);
            data = this._HTMLElement.dataset.simplepanel;
            this.simplePanel = _conv.strToBool(data);
            data = this._HTMLElement.dataset.simpletext;
            this.simpleText = data;
        },
        loaded: function () {
            this._inherited();
            this.alignPanels();
            this.panels.onChange.addListener(this.alignPanels);
            if (!this.form._statusBar && this._owner === this.form._layout) {
                if (this.form._statusBars.indexOf(this) === -1) this.form._statusBars.push(this);
                //this.form.resizeContent();
            }
        },
        alignPanels: function () {
            var x = 1, style;
            for (var i = 0, l = this.panels.length; i < l; i++) {
                style = this.panels[i]._html.style;
                style.left = x + $j.types.CSSUnits.PX;
                style.right = "auto";
                x += this.panels[i].width + (this.panels[i].bevel === $j.types.bevels.SINGLE ? 0 : 2);
                if (i === this.panels.length - 1) {
                    style.right = "1px";
                    style.width = "auto";
                }
                this.panels[i].update();
            }
        },
        destroy: function () {
            var panel;
            this.simplePanel = null;
            while (this.panels.length > 0) {
                panel = this.panels.pop();
                panel.destroy();
            }
            if (this.getSimplePanel) {
                this.getSimplePanel.parentNode.remove(this.getSimplePanel);
            }
            this._simplePanel = null;
            this.panels.clear();
            this.autoHint = false;
            this.simplePanel = false;
            this.simpleText = String.EMPTY;
            this._inherited();
        }
        //#endregion
    });
    Object.seal(StatusBar);
    $j.classes.register($j.types.categories.INTERNAL, StatusBarPanel);
    $j.classes.register($j.types.categories.TOOLBARS, StatusBar);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var StatusBarTpl = "<div id='{internalId}' data-name='{name}' data-class='StatusBar' class='Control StatusBar {theme}'>\
                      <div class='Control StatusBarSimplePanel {theme}' style='display:none;'></div>\
                      <div class='Control StatusBarSizer {theme} csr_nwResize'></div>\
                      </div>";
        $j.classes.registerTemplates([{ Class: StatusBar, template: StatusBarTpl }]);
    }
    //endregion
})();*/