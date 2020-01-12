(function () {
    "use strict";
    //#region ToolBarContainer
    var ToolBarContainer = $j.classes.ThemedControl.extend("ToolBarContainer", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                if (owner === owner.form._content) owner = owner.form._layout;
                this._inherited(owner, props);
                this.align = $j.types.aligns.MOSTTOP;
                if (!$j.isHTMLRenderer()) this.height = 75;
            }
        },
        //#region Methods
        getChildsHTMLElement: function () {
            var nodes, dataName, obj, i, l, dataClass;
            nodes = this._HTMLElement.childNodes;
            for (i = 0, l = nodes.length; i < l; i++) {
                if (nodes[i].nodeType === $j.types.xmlNodeTypes.ELEMENT_NODE) {
                    dataClass = nodes[i].dataset.class;
                    dataName = nodes[i].dataset.name;
                    if (dataClass) {
                        obj = $j.classes.createComponent($j.classes[dataClass], this, dataName, null, false);
                        obj.getHTMLElement(nodes[i].id);
                        obj.updateFromHTML();
                        obj.getChildsHTMLElement();
                    }
                }
            }
        },
        setHeight: function (newValue) {
            var lastValue = this._HTMLElement.offsetHeight;
            if (typeof newValue !== _const.NUMBER) return;
            this._inherited(newValue);
            //if (lastValue!==this._HTMLElement.offsetHeight) this.form.resizeContent();
        },
        loaded: function () {
            this._inherited();
            if (this.form._toolBars.indexOf(this) === -1) this.form._toolBars.push(this);
            //this.form.resizeContent();
        }
        //#endregion
    });
    Object.seal(ToolBarContainer);
    //#endregion
    $j.classes.register($j.types.categories.TOOLBARS, ToolBarContainer);
    //#region Templates
    var CoolBarTpl = "<div id='{internalId}' data-name='{name}' data-class='ToolBarContainer' class='ToolBarContainer {theme}'></div>";
    $j.classes.registerTemplates([{ Class: ToolBarContainer, template: CoolBarTpl }]);
    //endregion
    //#region ToolBar
    var ToolBar = $j.classes.ThemedControl.extend("ToolBar", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                if (owner === owner.form._content) owner = owner.form._layout;
                this._inherited(owner, props);
                this.align = $j.types.aligns.MOSTTOP;
                if (!$j.isHTMLRenderer()) this.height = 29;
                this.images = null;
                this.showCaption = true;
            }
        },
        //#region Setters
        setShowCaption: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.showCaption !== newValue) {
                this.showCaption = newValue;
                $j.CSS.removeClass(this._HTMLElement, "nocaption");
                if (!this.showCaption) $j.CSS.addClass(this._HTMLElement, "nocaption");
                this.updateToolButtons();
            }
        },
        setImages: function (newValue) {
            if (!(newValue instanceof $j.classes.ImageList)) return;
            if (this.images !== newValue) {
                this.images = newValue;
                this.updateToolButtons();
            }
        },
        //#endregion
        //#region Methods
        setHeight: function (newValue) {
            var lastValue = this._HTMLElement.offsetHeight;
            if (typeof newValue !== _const.NUMBER) return;
            this._inherited(newValue);
            //if (lastValue!==this._HTMLElement.offsetHeight) this.form.resizeContent();
        },
        loaded: function () {
            this.getImages();
            this._inherited();
            this.updateToolButtons();
            if (this._owner === this.form._layout) {
                if (this.form._toolBars.indexOf(this) === -1) this.form._toolBars.push(this);
                //this.form.resizeContent();
            }
        },
        destroy: function () {
            this._inherited();
            this.images = null;
        },
        getImages: function () {
            var data = this._HTMLElement.dataset.images;
            if (data) {
                if (this.form[data]) {
                    this.images = this.form[data];
                }
            }
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.showcaption;
            if (data) this.setShowCaption(_conv.strToBool(data));
        },
        updateToolButtons: function () {
            for (var i = 0, l = this._components.length; i < l; i++) {
                if (!this._components[i]._HTMLElementStyle) this._components[i]._HTMLElementStyle.backgroundImage = this.images[this._components[i].imageIndex];
                if (this._components[i] instanceof $j.classes.ToolButton) this._components[i].setShowCaption(this.showCaption);
            }
        }
        //#endregion
    });
    Object.seal(ToolBar);
    //#endregion
    $j.classes.register($j.types.categories.TOOLBARS, ToolBar);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var ToolBarTpl = "<div id='{internalId}' data-name='{name}' data-class='ToolBar' class='Control ToolBar {theme}'></div>",
            ToolBarContainerTpl = "<div id='{internalId}' data-name='{name}' data-class='ToolBarContainer' class='Control ToolBarContainer'></div>";
        $j.classes.registerTemplates([{ Class: ToolBar, template: ToolBarTpl }, { Class: ToolBarContainer, template: ToolBarContainerTpl }]);
    }
    //endregion
})();