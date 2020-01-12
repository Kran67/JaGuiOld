(function () {
    //#region CalendarPopup
    var CalendarPopup = $j.classes.Calendar.extend("CalendarPopup", {
        //#region Method
        selectDay: function (mouseEventArgs) {
            var obj = this.jsObj;
            this._inherited(mouseEventArgs);
            obj._dropDownCalendar.setDate(obj.curDate);
            obj.form.closePopups();
        }
        //#endregion
    });
    //#endregion
    //#region DropDownCalendarPopup
    var DropDownCalendarPopup = $j.classes.PopupBox.extend("DropDownCalendarPopup", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._calendar = $j.classes.createComponent($j.classes.CalendarPopup, this);
                this._calendar._dropDownCalendar = owner;
                this._calendar.canFocused = false;
                //#endregion
                this.setClosePopups(false);
            }
        },
        //#region Method
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{calendar}");
            html = a.join(this._calendar.getTemplate());
            a = html.split("{date}");
            html = a.join(this._calendar._dropDownCalendar.date._toString());
            return html;
        },
        show: function (x, y) {
            this._inherited(x, y);
            if (!this._calendar._HTMLElement) {
                this._calendar.getHTMLElement(this._calendar._internalId);
                this._calendar.updateFromHTML();
            }
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
            this._calendar = null;
        },
        getChildsHTMLElement: function () {
            this._calendar.getHTMLElement(this._HTMLElement.firstElementChild.id);
            this._calendar.getChildsHTMLElement();
            this._calendar.update();
        }
        //#endregion
    });
    Object.seal(DropDownCalendarPopup);
    //#endregion
    //#region DropDownCalendar
    var DropDownCalendar = $j.classes.ThemedControl.extend("DropDownCalendar", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._content = null;
                this._dropDownPopup = null;
                //#endregion
                this.opened = false;
                //this.editable=false;
                this.date = new Date();
                this.text = String.EMPTY;
                this.canFocused = true;
                this.autoCapture = true;
                this.setHitTest([true, true, true]);
                this.onChange = new $j.classes.NotifyEvent(this);
                //this.tabStop=true;
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
        setDate: function (newValue) {
            if (!(newValue instanceof Date)) return;
            if (!this.date.equals(newValue)) {
                this.date = new Date(newValue);
                this.setText(this.date.toString($j.tools.getLocale().date.formatPatterns.shortDate));
                this.onChange.invoke();
            }
        },
        //#endregion
        //#region Methods
        getChildsHTMLElement: function () {
            this._content = this._HTMLElement.firstElementChild;
            this._content.jsObj = this;
        },
        updateFromHTML: function () {
            this._inherited();
            var data = this._HTMLElement.dataset.text;
            if (data) this.text = data;
            data = this._HTMLElement.dataset.date;
            if (data) this.setDate(new Date(data));
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
                this._dropDownPopup = $j.classes.createComponent($j.classes.DropDownCalendarPopup, this, null, { "parentHTML": $j.doc.body });
                this._dropDownPopup._control = this;
                this._dropDownPopup.onlyHide = true;
                this._dropDownPopup._calendar.setDate(new Date(this.date));
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
            this._content = null;
            this.opened = null;
            this.date = null;
            this.text = null;
        },
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{date}");
            html = a.join(this.date.toString());
            return html;
        },
        keyDown: function () {
            this._inherited();
            if ($j.keyboard.keyCode === $j.types.VKeysCodes.VK_SPACE) {
                if (!this.opened) this.setOpened(true);
                else {
                    if (!this._dropDownPopup._calendar.mode) {
                        this.setText(this._dropDownPopup._calendar.curDate.toString($j.tools.getLocale().date.formatPatterns.shortDate));
                        this.setOpened(false);
                    } else if (this._dropDownPopup) this._dropDownPopup._calendar.keyDown();
                }
            } else if (this._dropDownPopup) this._dropDownPopup._calendar.keyDown();
        }
        //#endregion
    });
    Object.seal(DropDownCalendar);
    //#endregion
    $j.classes.register($j.types.categories.INTERNAL, CalendarPopup, DropDownCalendarPopup);
    $j.classes.register($j.types.categories.COMMON, DropDownCalendar);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var DropDownCalendarTpl = "<div id='{internalId}' data-name='{name}' data-class='DropDownCalendar' class='Control DropDownListBox DropDownCalendar {theme}' data-date='{date}' style='width:80px;height:20px;'>\
                             <div class='Control DropDownCalendarCaption {theme}'></div>\
                             <span class='Control DropDownListBoxArrow {theme}'></span>\
                             </div>",
            DropDownCalendarPopupTpl = "<div id='{internalId}' class='Control PopupBox PopupCalendar csr_default {theme}'>\
                                  {calendar}\
                                  </div>";
        $j.classes.registerTemplates([{ Class: DropDownCalendar, template: DropDownCalendarTpl }, { Class: DropDownCalendarPopup, template: DropDownCalendarPopupTpl }, { Class: CalendarPopup, template: $j.templates["Calendar"] }]);
    }
    //#endregion
})();