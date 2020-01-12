(function () {
    var Checkbox = $j.classes.CaptionControl.extend("Checkbox", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._autoTranslate = true;
                this._input = null;
                this._check = null;
                //#endregion
                this.autoCapture = true;
                this.isChecked = false;
                this.autoWidth = false;
                this.onChange = new $j.classes.NotifyEvent(this);
                if (!$j.isHTMLRenderer()) {
                    this.width = 120;
                    this.height = 19;
                }
                this.canFocused = true;
                this.hitTest.mouseDown = true;
                this.hitTest.mouseUp = true;
                $j.tools.addPropertyFromSet(this, "horizAlign", $j.types.textAligns, $j.types.textAligns.LEFT);
                $j.tools.addPropertyFromSet(this, "state", $j.types.checkboxStates, $j.types.checkboxStates.UNCHECKED);
                this.allowGrayed = false;
                this.action = null;
            }
        },
        //#region Setters
        setIsChecked: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.allowGrayed) {
                switch (this.state) {
                    case $j.types.checkboxStates.UNCHECKED:
                        this.state = $j.types.checkboxStates.GRAYED;
                        newValue = false;
                        break;
                    case $j.types.checkboxStates.GRAYED:
                        this.state = $j.types.checkboxStates.CHECKED;
                        newValue = true;
                        break;
                    case $j.types.checkboxStates.CHECKED:
                        this.state = $j.types.checkboxStates.UNCHECKED;
                        newValue = false;
                        break;
                }
            }
            else if (newValue) this.state = $j.types.checkboxStates.CHECKED;
            else this.state = $j.types.checkboxStates.UNCHECKED;
            if (this.isChecked !== newValue) {
                this.isChecked = newValue;
                if (this._loading || this.form._loading) return;
                if (!$j.isHTMLRenderer()) {
                    if (this._allowUpdate) this.update();
                    this.redraw();
                } else this.update();
                if (!this._updating) this.onChange.invoke();
            }
        },
        setAllowGrayed: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.allowGrayed !== newValue) this.allowGrayed = newValue;
        },
        setAction: function (newValue) {
            if (!(newValue instanceof $j.classes.Action)) return;
            if (this.action !== newValue) {
                if (this.action instanceof $j.classes.Action) this.action.unRegisterChanges(this);
                this.action = newValue;
                this.action.registerChanges(this);
                this.action.updateTarget(this);
            }
        },
        //#endregion
        //#region Methods
        mouseDown: function () {
            this._inherited();
            if ($j.mouse.button === $j.types.mouseButtons.LEFT) {
                this.pressing = true;
                this._isPressed = true;
            }
        },
        mouseUp: function () {
            this._inherited();
            if (($j.mouse.button === $j.types.mouseButtons.LEFT) && this.pressing) {
                this.pressing = false;
                this._isPressed = false;
                this.setIsChecked(!this.isChecked);
                this.update();
            }
        },
        keyUp: function () {
            this._inherited();
            if (($j.keyboard.keyCode === $j.types.VKeysCodes.VK_RETURN) || ($j.keyboard.keyCode === $j.types.VKeysCodes.VK_SPACE)) {
                this.setIsChecked(!this.isChecked);
                this.update();
            }
        },
        realign: $j.tools.emptyFunc,
        update: function () {
            if (this._loading || this.form._loading) return;
            if (!this._HTMLElement) return;
            this._HTMLElement.dataset.state = this.state;
            $j.CSS.removeClass(this._check, "checked grayed");
            if (this.isChecked) $j.CSS.addClass(this._check, "checked");
            else if (this.allowGrayed && this.state === $j.types.checkboxStates.GRAYED) $j.CSS.addClass(this._check, "grayed");
            if (this.state) {
                if (this.state !== $j.types.checkboxStates.UNCHECKED) this._input.setAttribute("checked", "checked");
                else this._input.removeAttribute("checked");
            } else if (this.isChecked) this._input.setAttribute("checked", "checked");
            else this._input.removeAttribute("checked");
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.ischecked;
            if (data) this.isChecked = _conv.strToBool(data);
            data = this._HTMLElement.dataset.autowidth;
            if (data) this.autoWidth = _conv.strToBool(data);
            data = this._HTMLElement.dataset.allowgrayed;
            if (data) this.allowGrayed = _conv.strToBool(data);
            data = this._HTMLElement.dataset.state;
            if (data) this.state = $j.types.checkboxStates[data.toUpperCase()];
            data = this._HTMLElement.dataset.onchange;
            if (data) {
                if (typeof this.form[data] === _const.FUNCTION) this.onChange.addListener(this.form[data]);
                else if (typeof data === _const.STRING) {
                    if (data !== String.EMPTY) this.onChange.addListener(new Function(data));
                }
            }
        },
        destroy: function () {
            this.isChecked = null;
            this.autoWidth = null;
            this.onChange.destroy();
            this.onChange = null;
            this.state = null;
            this.allowGrayed = null;
            if (this.action) this.action.removeTarget(this);
            this.action = null;
            this._check = null;
            this._input = null;
            this._inherited();
        },
        getChildsHTMLElement: function () {
            this._inherited();
            if (!this._input) {
                this._input = this._HTMLElement.firstElementChild;
                this._input.jsObj = this;
                this._input.name = this.name;
                this._input.id = this.name;
            }
            if (!this._check) {
                this._check = this._HTMLElement.lastElementChild;
                this._check.jsObj = this;
            }
        },
        loaded: function () {
            this._inherited();
            this.update();
        }
        //#endregion
    });
    Object.seal(Checkbox);
    $j.classes.register($j.types.categories.COMMON, Checkbox);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var CheckboxTpl = "<div id='{internalId}' data-name='{name}'' data-class='Checkbox' class='Control Checkbox {theme}' data-ischecked='famlse' data-state='unchecked' style='width:51px;height:15px;'>\
                     <input type='checkbox' class='Control CheckboxInput' />\
                     <div class='Control {theme} CheckboxCheck'></div>{caption}\
                     </div>";
        $j.classes.registerTemplates([{ Class: Checkbox, template: CheckboxTpl }]);
    }
    //endregion
})();