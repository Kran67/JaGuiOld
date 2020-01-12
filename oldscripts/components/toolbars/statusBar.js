(function () {
    "use strict";
    $j.types.bevels = {
        LOWERED: "lowered",
        NONE: "none",
        RAISED: "raised",
        SINGLE: "single"
    };
    var StatusBarPanel = Class.extend("StatusBarPanel", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                //#region Private properties
                this._html = $j.doc.createElement($j.types.HTMLElements.DIV);
                owner._HTMLElement.appendChild(this._html);
                $j.CSS.addClass(this._html, "Control StatusBarPanel " + owner.app.themeManifest.themeName);
                this._owner = owner;
                //#endregion
                $j.tools.addPropertyFromSet(this, "alignment", $j.types.textAligns, $j.types.textAligns.LEFT);
                $j.tools.addPropertyFromSet(this, "bevel", $j.types.bevels, $j.types.bevels.LOWERED);
                this.text = String.EMPTY;
                this.width = 50;
                for (var prop in props) {
                    if (this.hasOwnProperty(prop)) this[prop] = props[prop];
                }
            }
        },
        //#region Setters
        setAlignment: function (newValue) {
            if (!$j.tools.valueInset(newValue, $j.types.textAligns)) return;
            if (this.alignment !== newValue) {
                this.alignment = newValue;
                this.update();
                if (this._owner.panels.onChange.hasListener()) this._owner.panels.onChange.invoke();
            }
        },
        setBevel: function (newValue) {
            if (!$j.tools.valueInSet(newValue, $j.types.bevels)) return;
            if (this.bevel !== newValue) {
                this.bevel = newValue;
                this.update();
                if (this._owner.panels.onChange.hasListener()) this._owner.panels.onChange.invoke();
            }
        },
        setText: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.text !== newValue) {
                this.text = newValue;
                this.update();
                if (this._owner.panels.onChange.hasListener()) this._owner.panels.onChange.invoke();
            }
        },
        setWidth: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.width !== newValue) {
                this.width = newValue;
                this.update();
                if (this._owner.panels.onChange.hasListener()) this._owner.panels.onChange.invoke();
            }
        },
        //#endregion
        //#region Methods
        update: function () {
            var style, theme, s;
            if (this._html) {
                style = this._html.style;
                style.textAlign = this.alignment;
                this._html.innerHTML = this.text;
                if (this._owner.panels.last() !== this) style.width = this.width + $j.types.CSSUnits.PX;
                $j.CSS.removeClass(this._html, "none lowered raised single");
                $j.CSS.addClass(this._html, this.bevel);
            }
        },
        destroy: function () {
            this.alignment = null;
            this.bevel = null;
            this.text = null;
            this.width = null;
            if (this._html) {
                this._html.parentNode.remove(this._html);
            }
        }
        //#endregion
    });
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
})();