//#region Import
import { Button } from "/scripts/components/common/button.js";
import { NotifyEvent } from "/scripts/core/events.js";
import { Vector } from "/scripts/core/geometry.js";
import { Keyboard } from "/scripts/core/keyboard.js";
import { Mouse } from "/scripts/core/mouse.js";
//#endregion Import
//#region AngleButton
const AngleButton = (() => {
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
    //#region Class AngleButton
    class AngleButton extends Button {
        //#region Constructor
        constructor(owner, props) {
            //#region Variables déclaration
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.internalValue = 0;
                priv.knob = null;
                priv.saveValue = 0;
                priv.textObj = null;
                if (!Core.isHTMLRenderer) {
                    this.width = 30;
                    this.height = 30;
                }
                priv.frequency = props.hasOwnProperty("frequency")?props.frequency:1;
                priv.tracking = props.hasOwnProperty("tracking")?props.tracking:true;
                priv.value = props.hasOwnProperty("value")?props.value:0;
                priv.showValue = props.hasOwnProperty("showValue")?props.showValue:true;
                this.autoCapture = true;
                this.caption = String.EMPTY;
                this.canFocused = true;
                this.onChanged = new NotifyEvent(this);
                const self = this;
                priv.setInternalValue = function(newValue) {
                    //#region Variables déclaration
                    const priv = this;
                    //#endregion Variables déclaration
                    if (typeof newValue === Types.CONSTANTS.NUMBER) {
                        if (priv.internalValue !== newValue) {
                            if (priv.frequency === 0) {
                                priv.internalValue = newValue;
                            } else {
                                const nv = Math.round(newValue / priv.frequency) * priv.frequency;
                                if (priv.internalValue !== nv) {
                                    priv.internalValue = nv;
                                }
                            }
                            if (priv.internalValue > 0) {
                                priv.value = Math.round(360 - priv.internalValue, 0);
                            } else {
                                priv.value = 360 - Math.round(360 + priv.internalValue, 0);
                            }
                            if (!Core.isHTMLRenderer) {
                                if (self.allowUpdate) {
                                    self.update();
                                }
                                self.redraw();
                            } else {
                                self.update();
                            }
                            self.onChanged.invoke();
                        }
                    }
                };
            }
        }
        //#endregion Constructor
        //#region Setters
        //#region frequency
        get frequency() {
            return internal(this).frequency;
        }
        set frequency(newValue) {
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (priv.frequency !== newValue) {
                    priv.frequency = newValue;
                }
            }
        }
        //#endregion frequency
        //#region tracking
        get tracking() {
            return internal(this).tracking;
        }
        set tracking(newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.tracking !== newValue) this.tracking = newValue;
        }
        //#endregion tracking
        //#region value
        get value() {
            return internal(this).value;
        }
        set value(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (newValue >= 360) {
                    newValue = 0;
                } else if (newValue < 0) {
                    newValue = 0;
                }
                if (priv.value !== newValue) {
                    priv.value = 360 - newValue;
                    priv.setInternalValue(priv.value);
                }
            }
        }
        //#endregion value
        //#region showValue
        get showValue() {
            return internal(this).showValue;
        }
        set showValue(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const cssValues = Types.CSSVALUES;
            //#endregion Variables déclaration
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (priv.showValue !== newValue) {
                    priv.showValue = newValue;
                    if (priv.showValue) {
                        priv.textObj.style.visibility = cssValues.NORMAL;
                    } else {
                        priv.textObj.style.visibility = cssValues.HIDDEN;
                    }
                    //this._textObj
                    //if (!$j.isHTMLRenderer()) {
                    //  if (this._allowUpdate) this.update();
                    //  this.redraw();
                    //} else this.update();
                }
            }
        }
        //#endregion showValue
        //#endregion
        //#region Methods
        //#region mouseDown
        mouseDown() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.mouseDown();
            if (Core.mouse.button === Mouse.MOUSEBUTTONS.LEFT) {
                priv.saveValue = priv.internalValue;
                this.valueFromPoint(this.documentToClient());
            }
        }
        //#endregion mouseDown
        //#region mouseMove
        mouseMove() {
            super.mouseMove();
            if (Core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && this.isPressed) {
                this.valueFromPoint(this.documentToClient());
            }
        }
        //#endregion mouseMove
        //#region mouseUp
        mouseUp() {
            super.mouseUp();
            if (this.isPressed) {
                this.valueFromPoint(this.documentToClient());
            }
        }
        //#endregion mouseUp
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (!this.loading && !this.form.loading) {
                priv.knob.style.transform = `rotate(${priv.internalValue}deg)`;
                //this._knob.style.lineHeight=this._knob.offsetHeight+$j.types.CSSUnits.PX;
                priv.textObj.innerHTML = `${priv.value}&deg;`;
                priv.textObj.style.lineHeight = `${priv.textObj.offsetHeight}${Types.CSSUNITS.PX}`;
            }
        }
        //#endregion update
        //#region valueFromPoint
        valueFromPoint(point) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const v = new Vector(point.x - htmlElement.offsetWidth / 2, point.y - htmlElement.offsetHeight / 2);
            const v1 = new Vector(1, 0, 0);
            //#endregion Variables déclaration
            priv.setInternalValue(-v1.angle(v));
        }
        //#endregion valueFromPoint
        //#region mouseWheel
        mouseWheel() {
            //#region Variables déclaration
            const priv = internal(this);
            let newVal = priv.internalValue + ~~(Core.mouse.wheelDelta * 10);
            //#endregion Variables déclaration
            if (newVal < -360) {
                newVal = 360 + newVal;
            } else if (newVal > 360) {
                newVal = 360 - newVal;
            }
            priv.setInternalValue(newVal);
        }
        //#endregion mouseWheel
        //#region getHTMLElement
        getHTMLElement(id) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.getHTMLElement(id);
            const htmlElement = this.HTMLElement;
            priv.textObj = htmlElement.querySelector(".AngleButtonCaption");
            priv.textObj.jsObj = this;
            priv.knob = htmlElement.querySelector(".AngleButtonKnob");
            priv.knob.jsObj = this;
        }
        //#endregion getHTMLElement
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.internalValue = null;
            priv.knob = null;
            priv.textObj = null;
            priv.saveValue = null;
            priv.frequency = null;
            priv.tracking = null;
            priv.value = null;
            priv.showValue = null;
            //this.autoCapture = null;
            //this.caption = null;
            priv.onChanged.destroy();
            priv.onChanged = null;
        }
        //#endregion destroy
        //#region keyDown
        keyDown() {
            //#region Variables déclaration
            const priv = internal(this);
            const VKeysCodes = Keyboard.VKEYSCODES;
            //#endregion Variables déclaration
            super.keyDown();
            switch (Core.keyboard.keyCode) {
                case VKeysCodes.VK_LEFT:
                case VKeysCodes.VK_UP:
                    priv.value += priv.frequency;
                    break;
                case VKeysCodes.VK_RIGHT:
                case VKeysCodes.VK_DOWN:
                    priv.value -= priv.frequency;
                    break;
                case VKeysCodes.VK_HOME:
                case VKeysCodes.VK_END:
                    priv.value = 0;
                    break;
                case VKeysCodes.VK_PRIOR:
                    priv.value += priv.frequency * 5;
                    break;
                case VKeysCodes.VK_NEXT:
                    priv.value -= priv.frequency * 5;
                    break;
            }
        }
        //#endregion keyDown
        //#region loaded
        loaded() {
            super.loaded();
            this.update();
        }
        //#endregion loaded
        //#endregion
    }
    return AngleButton;
    //#endregion
})();
//#endregion
Core.classes.register(Types.CATEGORIES.EXTENDED, AngleButton);
export { AngleButton };
/*
(function () {
    var AngleButton = $j.classes.CustomButton.extend("AngleButton", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._internalValue = 0;
                this._knob = null;
                this._saveValue = 0;
                this._textObj = null;
                //#endregion
                if (!$j.isHTMLRenderer()) {
                    this.width = 30;
                    this.height = 30;
                }
                this.frequency = 1;
                this.tracking = true;
                this.value = 0;
                this.showValue = true;
                this.autoCapture = true;
                this.caption = String.EMPTY;
                this.canFocused = true;
                this.onChanged = new $j.classes.NotifyEvent(this);
            }
        },
        //#region Setters
        setFrequency: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.frequency !== newValue) this.frequency = newValue;
        },
        setTracking: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.tracking !== newValue) this.tracking = newValue;
        },
        setInternalValue: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this._internalValue !== newValue) {
                if (this.frequency === 0) {
                    this._internalValue = newValue;
                } else {
                    var nv = $j.round(newValue / this.frequency) * this.frequency;
                    if (this._internalValue !== nv) {
                        this._internalValue = nv;
                    }
                }
                if (this._internalValue > 0) this.value = $j.round(360 - this._internalValue, 0);
                else this.value = 360 - $j.round(360 + this._internalValue, 0);
                if (!$j.isHTMLRenderer()) {
                    if (this._allowUpdate) this.update();
                    this.redraw();
                } else this.update();
                this.onChanged.invoke();
            }
        },
        setValue: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue >= 360) newValue = 0;
            if (newValue < 0) newValue = 0;
            if (this.value !== newValue) {
                this.value = 360 - newValue;
                this.setInternalValue(this.value);
            }
        },
        setShowValue: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.showValue !== newValue) {
                this.showValue = newValue;
                if (this.showValue) this._textObj.style.visibility = "normal";
                else this._textObj.style.visibility = "hidden";
                //this._textObj
                //if (!$j.isHTMLRenderer()) {
                //  if (this._allowUpdate) this.update();
                //  this.redraw();
                //} else this.update();
            }
        },
        //#endregion
        //#region Methods
        mouseDown: function () {
            this._inherited();
            if ($j.mouse.button === $j.types.mouseButtons.LEFT) {
                this._saveValue = this._internalValue;
            }
        },
        mouseMove: function () {
            this._inherited();
            if (($j.mouse.button === $j.types.mouseButtons.LEFT) && this._isPressed) {
                var point = this.documentToClient();
                this.valueFromPoint(point);
            }
        },
        mouseUp: function () {
            var pressing = this._isPressed;
            this._inherited();
            if (pressing) {
                var point = this.documentToClient();
                this.valueFromPoint(point);
            }
        },
        update: function () {
            if (this._loading || this.form._loading) return;
            this._knob.style.transform = "rotate(" + this._internalValue + "deg)";
            //this._knob.style.lineHeight=this._knob.offsetHeight+$j.types.CSSUnits.PX;
            this._textObj.innerHTML = this.value + "&deg;";
            this._textObj.style.lineHeight = this._textObj.offsetHeight + $j.types.CSSUnits.PX;
        },
        valueFromPoint: function (point) {
            var v = new $j.classes.Vector(point.x - this._HTMLElement.offsetWidth / 2, point.y - this._HTMLElement.offsetHeight / 2);
            var v1 = new $j.classes.Vector(1, 0, 0);
            this.setInternalValue(-v1.angle(v));
        },
        mouseWheel: function () {
            var newVal = this._internalValue + ~~($j.mouse.wheelDelta * 10);
            if (newVal < -360) newVal = 360 + newVal;
            else if (newVal > 360) newVal = 360 - newVal;
            this.setInternalValue(newVal);
        },
        getChildsHTMLElement: function () {
            this._inherited();
            this._textObj = this._HTMLElement.firstElementChild;
            this._textObj.jsObj = this;
            this._knob = this._HTMLElement.lastElementChild;
            this._knob.jsObj = this;
        },
        destroy: function () {
            this._inherited();
            this._internalValue = null;
            this._knob = null;
            this._textObj = null;
            this._saveValue = null;
            this.frequency = null;
            this.tracking = null;
            this.value = null;
            this.showValue = null;
            this.autoCapture = null;
            this.caption = null;
            this.onChanged.destroy();
            this.onChanged = null;
        },
        keyDown: function () {
            this._inherited();
            switch ($j.keyboard.keyCode) {
                case $j.types.VKeysCodes.VK_LEFT:
                case $j.types.VKeysCodes.VK_UP:
                    this.setValue(this.value + this.frequency);
                    break;
                case $j.types.VKeysCodes.VK_RIGHT:
                case $j.types.VKeysCodes.VK_DOWN:
                    this.setValue(this.value - this.frequency);
                    break;
                case $j.types.VKeysCodes.VK_HOME:
                case $j.types.VKeysCodes.VK_END:
                    this.setValue(0);
                    break;
                case $j.types.VKeysCodes.VK_PRIOR:
                    this.setValue(this.value + this.frequency * 5);
                    break;
                case $j.types.VKeysCodes.VK_NEXT:
                    this.setValue(this.value - this.frequency * 5);
                    break;
            }
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.showvalue;
            if (data) this.setShowValue(_conv.strToBool(data));
        },
        loaded: function () {
            this._inherited();
            this.update();
        }
        //#endregion
    });
    Object.seal(AngleButton);
    $j.classes.register($j.types.categories.EXTENDED, AngleButton);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var AngleButtonTpl = "<button id='{internalId}' data-name='{name}' data-class='AngleButton' class='Control AngleButton {theme}' style='width:30px;height:30px;'>\
                        <div class='Control AngleButtonCaption'>0°</div>\
                        <div class='Control AngleButtonKnob'>3</div>\
                        </button>";
        $j.classes.registerTemplates([{ Class: AngleButton, template: AngleButtonTpl }]);
    }
    //endregion
})();
*/