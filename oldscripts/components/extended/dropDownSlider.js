(function () {
    //#region SliderPopup
    var SliderPopup = $j.classes.Slider.extend("SliderPopup", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._forceMouseWheel = true;
                this._dropDownSlider = null;
                //#endregion
            }
        },
        //#region Setter
        changeDropDownValue: function () {
            this._dropDownSlider.setValue(parseFloat(this.getFirstValue().toFixed(this.decimalPrecision)));
        },
        //#endregion
        //#region Method
        destroy: function () {
            this._inherited();
            this._forceMouseWheel = null;
            this._dropDownSlider = null;
        },
        loaded: function () {
            this._inherited();
            this.onChange.addListener(this.changeDropDownValue);
        }
        //#endregion
    });
    //#endregion
    //#region DropDownSliderPopup
    var DropDownSliderPopup = $j.classes.PopupBox.extend("DropDownSliderPopup", {
        init: function (owner, props, parent) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner.form, props);
                //#region Private
                this._slider = $j.classes.createComponent($j.classes.SliderPopup, this, null, false);
                //this._slider.setValues([owner.value,0]);
                this._slider._dropDownSlider = owner;
                this._slider.canFocused = false;
                //#endregion
                this.setClosePopups(false);
            }
        },
        //#region Method
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{slider}");
            html = a.join(this._slider.getTemplate());
            a = html.split("{value}");
            html = a.join(this.value);
            return html;
        },
        show: function (x, y) {
            this._inherited(x, y);
            if (!this._slider._HTMLElement) {
                this._slider.getHTMLElement(this._slider._internalId);
                this._slider.updateFromHTML();
            }
            this._slider.setValues([this._control.value, 0]);
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
            this._slider = null;
        },
        getChildsHTMLElement: function () {
            if (this._HTMLElement) {
                this._slider.getHTMLElement(this._HTMLElement.firstElementChild.id);
                this._slider.getChildsHTMLElement();
                this._slider.updateFromHTML();
            }
        }
        //#endregion
    });
    Object.seal(DropDownSliderPopup);
    //#endregion
    //#region DropDownSlider
    var DropDownSlider = $j.classes.ThemedControl.extend("DropDownSlider", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._dropDownPopup = null;
                this._content = null;
                //#endregion
                this.opened = false;
                this.value = 0;
                this.canFocused = true;
                this.autoCapture = true;
                this.min = 0;
                this.max = 100;
                //this.horizAlign=$j.types.textAligns.LEFT;
                $j.tools.addPropertyFromSet(this, "horizAlign", $j.types.textAligns, $j.types.textAligns.LEFT);
                this.setHitTest([true, true, true]);
            }
        },
        //#region Setters
        setHorizAlign: function (newValue) {
            if (!($j.tools.valueInSet(newValue, $j.types.textAligns))) return;
            if (newValue !== this.horizAlign) {
                this.horizAlign = newValue;
                this.update();
            }
        },
        setValue: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.value !== newValue) {
                this.value = newValue;
                this.update();
            }
        },
        setMin: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.min !== newValue) {
                this.min = newValue;
            }
        },
        setMax: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.max !== newValue) {
                this.max = newValue;
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
            if (this._HTMLElement) {
                this._content = this._HTMLElement.firstElementChild;
                this._content.jsObj = this;
            }
        },
        updateFromHTML: function () {
            var data;
            data = this._HTMLElement.dataset.value;
            if (data) this.value = ~~data;
            data = this._HTMLElement.dataset.horizalign;
            if (data) this.horizAlign = data;
            data = this._HTMLElement.dataset.min;
            if (data) this.min = ~~data;
            data = this._HTMLElement.dataset.max;
            if (data) this.max = ~~data;
            //this.update();
            this._inherited();
        },
        update: function () {
            if (this._HTMLElement) {
                this._HTMLElement.dataset.opened = this.opened;
            }
            if (this._content) {
                this._content.innerHTML = this.value;
                this._content.style.textAlign = this.horizAlign;
            }
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
                this._dropDownPopup = $j.classes.createComponent($j.classes.DropDownSliderPopup, this, String.EMPTY, { "parentHTML": $j.doc.body });
                this._dropDownPopup._control = this;
                this._dropDownPopup.onlyHide = true;
                this._dropDownPopup._slider.setValues([this.value, 0]);
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
            if (this._dropDownPopup) this._dropDownPopup.destroy();
            this._dropDownPopup = null;
            this._content = null;
            this.opened = null;
            this.value = null;
            this.canFocused = null;
            this.autoCapture = null;
            this.min = null;
            this.max = null;
            this.horizAlign = null;
        },
        keyDown: function () {
            this._inherited();
            if ($j.keyboard.keyCode === $j.types.VKeysCodes.VK_SPACE) this.setOpened(true);
            else if (this._dropDownPopup) this._dropDownPopup._slider.keyDown();
        }
        //#endregion
    });
    Object.seal(DropDownSlider);
    //#endregion
    $j.classes.register($j.types.categories.INTERNAL, SliderPopup, DropDownSliderPopup);
    $j.classes.register($j.types.categories.EXTENDED, DropDownSlider);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var DropDownSliderTpl = "<div id='{internalId}' data-name='{name}' data-class='DropDownSlider' class='Control DropDownListBox DropDownSlider {theme}' data-value='0' data-horizalign='center' style='width:50px;height:20px;'>\
                           <div class='Control DropDownSliderCaption {theme}'>0</div>\
                           <span class='Control DropDownListBoxArrow {theme}'></span>\
                           </div>",
            DropDownSliderPopupTpl = "<div id='{internalId}' class='Control PopupBox PopupSlider csr_default {theme}' style='{style}'>\
                                {slider}\
                                </div>";
        $j.classes.registerTemplates([{ Class: DropDownSlider, template: DropDownSliderTpl }, { Class: DropDownSliderPopup, template: DropDownSliderPopupTpl }, { Class: SliderPopup, template: $j.templates["Slider"] }]);
    }
    //#endregion
})();