(function () {
    //#region TimePanelPopup
    var TimePanelPopup = $j.classes.TimePanel.extend("TimePanelPopup", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                this._forceMouseWheel = true;
            }
        },
        loaded: function () {
            this._inherited();
            this._hours._forceMouseWheel = true;
            this._minutes._forceMouseWheel = true;
            this._seconds._forceMouseWheel = true;
            this._meridiem._forceMouseWheel = true;
            $j.CSS.addClass(this._hours._HTMLElement, "focused");
        }
    });
    //#endregion
    //#region DropDownTimePanelPopup
    var DropDownTimePanelPopup = $j.classes.PopupBox.extend("DropDownTimePanelPopup", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                this._timePanel = $j.classes.createComponent($j.classes.TimePanelPopup, this);
                this._timePanel._dropDownPopup = owner;
                this._timePanel.onChange.addListener(this.change);
                this._timePanel._currentItemWheel = this._timePanel._hours;
                this.setClosePopups(false);
            }
        },
        //#region Method
        change: function () {
            this._dropDownPopup.setText(this.time);
        },
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{timePanel}");
            if (a.length > 1) {
                html = a.join(this._timePanel.getTemplate());
            }
            return html;
        },
        show: function (x, y) {
            this._inherited(x, y);
            if (!this._timePanel._HTMLElement) {
                this._timePanel.getHTMLElement(this._timePanel._internalId);
                this._timePanel.updateFromHTML();
            }
            this._timePanel.setUse24H(this._owner.use24H);
            this._timePanel.setViewSeconds(this._owner.viewSeconds);
            this._timePanel.setTime(this._owner.text);
        },
        destroy: function () {
            if (this._control) {
                this._control.opened = false;
                $j.CSS.removeClass(this._control._HTMLElement, "opened");
            }
            if (this._HTMLElement) {
                $j.CSS.removeClass(this._HTMLElement, "animated");
                $j.CSS.removeClass(this._HTMLElement, "fadeIn");
            }
            this._inherited();
            this._timePanel = null;
        },
        getChildsHTMLElement: function () {
            this._timePanel.getHTMLElement(this._HTMLElement.firstElementChild.id);
            this._timePanel.getChildsHTMLElement();
            $j.CSS.addClass(this._timePanel._HTMLElement, "csr_default");
        }
        //#endregion
    });
    Object.seal(DropDownTimePanelPopup);
    //#endregion
    //#region DropDownTimePanel
    var DropDownTimePanel = $j.classes.ThemedControl.extend("DropDownTimePanel", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._dropDownPopup = null;
                this._content = null;
                //#endregion
                this.opened = false;
                this.text = String.EMPTY;
                this.canFocused = true;
                //this.tabStop=true;
                this.autoCapture = true;
                this.use24H = false;
                this.viewSeconds = false;
                this.setHitTest([true, true, true]);
            }
        },
        //#region Setters
        setText: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.text !== newValue) {
                this.text = newValue;
                this.update();
            }
        },
        setOpened: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.opened !== newValue) {
                this.opened = newValue;
                this.update();
                if (this.opened) this.showPopup();
                else this.form.closePopups();
            }
        },
        //#endregion
        //#region Methods
        getChildsHTMLElement: function () {
            this._content = this._HTMLElement.firstElementChild;
            this._content.jsObj = this;
        },
        updateFromHTML: function () {
            var data;
            data = this._HTMLElement.dataset.text;
            if (data) this.setText(data);
            data = this._HTMLElement.dataset.use24h;
            if (data) this.use24H = _conv.strToBool(data);
            data = this._HTMLElement.dataset.viewseconds;
            if (data) this.viewSeconds = _conv.strToBool(data);
            this._inherited();
        },
        update: function () {
            if (this._HTMLElement) {
                this._HTMLElement.dataset.opened = this.opened;
            }
            if (this._content) this._content.innerHTML = this.text;
        },
        mouseDown: function () {
            var lastOpened = this.opened;
            if (this === this.form._focusedControl) {
                if (lastOpened) this._closePopups = false;
            }
            this._inherited();
            this._closePopups = true;
            this.setOpened(!this.opened);
        },
        showPopup: function () {
            var pt = this.clientToDocument(), lbHeight;
            if (!this._dropDownPopup) {
                this._dropDownPopup = $j.classes.createComponent($j.classes.DropDownTimePanelPopup, this, null, { "parentHTML": $j.doc.body });
                this._dropDownPopup._control = this;
                this._dropDownPopup.onlyHide = true;
            }
            $j.CSS.removeClass(this._dropDownPopup._HTMLElement, "hidden");
            this._dropDownPopup.show(pt.x, pt.y + this._HTMLElement.offsetHeight);
            $j.CSS.addClass(this._dropDownPopup._HTMLElement, "animated fadeIn");
        },
        destroyPopup: function () {
            this._dropDownPopup.destroy();
            this._dropDownPopup = null;
            this.opened = false;
        },
        destroy: function () {
            this._inherited();
            this._dropDownPopup = null;
            this._content = null;
            this.opened = null;
            this.text = null;
            this.use24H = null;
            this.viewSeconds = null;
        },
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{time}");
            html = a.join(new Date().toString($j.tools.getLocale().date.formatPatterns.shortTime));
            return html;
        },
        keyDown: function () {
            this._inherited();
            if ($j.keyboard.keyCode === $j.types.VKeysCodes.VK_SPACE) this.setOpened(true);
            else if (this._dropDownPopup) this._dropDownPopup._timePanel.keyDown();
        }
        //#endregion
    });
    Object.seal(DropDownTimePanel);
    //#endregion
    $j.classes.register($j.types.categories.INTERNAL, TimePanelPopup, DropDownTimePanelPopup);
    $j.classes.register($j.types.categories.COMMON, DropDownTimePanel);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var DropDownTimePanelTpl = "<div id='{internalId}' data-name='{name}' data-class='DropDownTimePanel' class='Control DropDownListBox DropDownTimePanel {theme}' data-horizalign='center' \
                              data-text='{time}' style='width:85px;height:20px;'>\
                              <div class='Control DropDownTimePanelCaption {theme}'></div>\
                              <span class='Control DropDownListBoxArrow {theme}'></span>\
                              </div>",
            DropDownTimePanelPopupTpl = "<div id='{internalId}' class='Control PopupBox PopupTimePanel {theme}'>\
                                   {timePanel}\
                                   </div>";
        $j.classes.registerTemplates([{ Class: DropDownTimePanel, template: DropDownTimePanelTpl }, { Class: DropDownTimePanelPopup, template: DropDownTimePanelPopupTpl }, { Class: TimePanelPopup, template: $j.templates["TimePanel"] }]);
    }
    //#endregion
})();