//#region Imports
import { CaptionControl } from "/scripts/core/captioncontrol.js";
import { Tools } from "/scripts/core/tools.js";
import { Mouse } from "/scripts/core/mouse.js";
import { Keyboard } from "/scripts/core/keyboard.js";
//#endregion Imports
//#region CHECKBOXSTATES
/**
 * @type    {Object}        CHECKBOXSTATES
 */
const CHECKBOXSTATES = Object.freeze({
    UNCHECKED: "unchecked",
    GRAYED: "grayed",
    CHECKED: "checked"
});
//#endregion
//#region Checkbox
const Checkbox = (() => {
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
    //#region Class Checkbox
    class Checkbox extends CaptionControl {
        //#region CHECKBOXSTATES
        /**
         * @type    {Object}        CHECKBOXSTATES
         */
        static get CHECKBOXSTATES() {
            return CHECKBOXSTATES;
        }
        //#endregion
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.input = null;
                priv.check = null;
                this.autoCapture = true;
                priv.isChecked = props.hasOwnProperty("isChecked")?props.isChecked:false;
                priv.autoWidth = props.hasOwnProperty("autoWidth")?props.autoWidth:true;
                this.onChange = new Core.classes.NotifyEvent(this);
                if (!Core.isHTMLRenderer) {
                    this.width = 120;
                    this.height = 19;
                }
                this.canFocused = true;
                this.hitTest.mouseDown = true;
                this.hitTest.mouseUp = true;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "state",
                    enum: CHECKBOXSTATES,
                    variable: priv,
                    value: props.hasOwnProperty("state") ? props.state : CHECKBOXSTATES.UNCHECKED
                });
                priv.allowGrayed = props.hasOwnProperty("allowGrayed")?props.allowGrayed:false;
                priv.action = null;
                this.autoSize = false;
            }
        }
        //#endregion constructor
        //#region Getter / Setter
        //#region isChecked
        get isChecked() {
            return internal(this).isChecked;
        }
        set isChecked(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.allowGrayed) {
                    switch (priv.state) {
                        case CHECKBOXSTATES.UNCHECKED:
                            priv.state = CHECKBOXSTATES.GRAYED;
                            newValue = false;
                            break;
                        case CHECKBOXSTATES.GRAYED:
                            priv.state = CHECKBOXSTATES.CHECKED;
                            newValue = true;
                            break;
                        case CHECKBOXSTATES.CHECKED:
                            priv.state = CHECKBOXSTATES.UNCHECKED;
                            newValue = false;
                            break;
                    }
                }
                else if (newValue) {
                    priv.state = CHECKBOXSTATES.CHECKED;
                }
                else {
                    priv.state = CHECKBOXSTATES.UNCHECKED;
                }
                if (priv.isChecked !== newValue) {
                    priv.isChecked = newValue;
                    if (!this.loading && !this.form.loading) {
                        if (!Core.isHTMLRenderer) {
                            if (this.allowUpdate) {
                                this.update();
                            }
                            this.redraw();
                        } else {
                            this.update();
                        }
                        if (!this.updating) {
                            this.onChange.invoke();
                        }
                    }
                }
            }
        }
        //#endregion isChecked
        //#region allowGrayed
        get allowGrayed() {
            return internal(this).allowGrayed;
        }
        set allowGrayed(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.allowGrayed !== newValue) {
                    priv.allowGrayed = newValue;
                }
            }
        }
        //#endregion allowGrayed
        //#region action
        get action() {
            return internal(this).action;
        }
        set action(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Action) {
                if (priv.action !== newValue) {
                    if (priv.action instanceof Action) {
                        priv.action.unRegisterChanges(this);
                    }
                    priv.action = newValue;
                    priv.action.registerChanges(this);
                    priv.action.updateTarget(this);
                }
            }
        }
        //#endregion action
        //#endregion Getter / Setter
        //#region Methods
        //#region mouseDown
        mouseDown() {
            super.mouseDown();
            if (Core.mouse.button === Mouse.MOUSEBUTTONS.LEFT) {
                this.pressing = true;
                this.isPressed = true;
            }
        }
        //#endregion mouseDown
        //#region mouseUp
        mouseUp() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.mouseUp();
            if ((Core.mouse.button === Mouse.MOUSEBUTTONS.LEFT) && this.pressing) {
                this.pressing = false;
                this.isPressed = false;
                this.isChecked = !priv.isChecked;
                this.update();
            }
        }
        //#endregion mouseUp
        //#region keyUp
        keyUp() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.keyUp();
            if ((Core.keyboard.keyCode === Keyboard.VKEYSCODES.VK_RETURN) || (Core.keyboard.keyCode === Keyboard.VKEYSCODES.VK_SPACE)) {
                this.isChecked = !priv.isChecked;
                this.update();
            }
        }
        //#endregion keyUp
        //#region realign
        realign() {}
        //#endregion realign
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (!this.loading && !this.form.loading) {
                priv.check.classList.remove("checked", "grayed");
                if (priv.isChecked) {
                    priv.check.classList.add("checked");
                } else if (priv.allowGrayed && priv.state === CHECKBOXSTATES.GRAYED) {
                    priv.check.classList.add("grayed");
                }
                if (priv.state) {
                    if (priv.state !== CHECKBOXSTATES.UNCHECKED) {
                        priv.input.setAttribute("checked", "checked");
                    } else {
                        priv.input.removeAttribute("checked");
                    }
                } else if (priv.isChecked) {
                    priv.input.setAttribute("checked", "checked");
                } else {
                    priv.input.removeAttribute("checked");
                }
                if (priv.autoWidth) {
                    this.HTMLElementStyle.width = "auto";
                }
            }
        }
        //#endregion update
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.isChecked = null;
            priv.autoWidth = null;
            this.onChange.destroy();
            this.onChange = null;
            priv.state = null;
            priv.allowGrayed = null;
            if (priv.action) {
                priv.action.removeTarget(this);
            }
            priv.action = null;
            priv.check = null;
            priv.input = null;
            super.destroy();
        }
        //#endregion destroy
        //#region getHTMLElement
        getHTMLElement(id) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.getHTMLElement(id);
            const htmlElement = this.HTMLElement;
            if (!priv.input) {
                priv.input = htmlElement.querySelector(".CheckboxInput");
                priv.input.jsObj = this;
                priv.input.name = this.name;
                priv.input.id = this.name;
            }
            if (!priv.check) {
                priv.check = htmlElement.lastElementChild;
                priv.check.jsObj = this;
            }
        }
        //#endregion getHTMLElement
        //#region loaded
        loaded() {
            super.loaded();
            this.update();
        }
        //#region loaded
        //#endregion Checkbox
    }
    return Checkbox;
    //#endregion Checkbox
})();
//#endregion Checkbox
Core.classes.register(Types.CATEGORIES.COMMON, Checkbox);
/*(function () {
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
})();*/