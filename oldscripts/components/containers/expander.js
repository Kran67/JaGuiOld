(function () {
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
})();