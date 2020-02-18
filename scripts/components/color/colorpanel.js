//#region Import
import { Control } from "/scripts/components/control.js";
import { Tools } from "/scripts/core/tools.js";
import { NotifyEvent } from "/scripts/core/events.js";
import { Color, Colors } from "/scripts/core/color.js";
import { ColorQuad } from "/scripts/components/color/colorquad.js";
import { AlphaSlider } from "/scripts/components/color/alphaslider.js";
import { HUESlider } from "/scripts/components/color/hueslider.js";
import { ColorBox } from "/scripts/components/color/colorbox.js";
//#endregion Import
//#region COLORPANELBOXES
const COLORPANELBOXES = {
    PRIMARY: "primary",
    SECONDARY: "secondary"
};
//#endregion COLORPANELBOXES
//#region ColorPanel
const ColorPanel = (() => {
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
    //#region Class ColorPanel
    class ColorPanel extends Control {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "colorBoxType",
                    enum: COLORPANELBOXES,
                    forceUpdate: true,
                    variable: priv,
                    value: COLORPANELBOXES.PRIMARY
                });

                if (!Core.isHTMLRenderer) {
                    this.width = 160;
                    this.height = 160;
                }
                this.onChange = new NotifyEvent(this);
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region COLORPANELBOXES
        /**
         * @type    {Object}        COLORPANELBOXES
         */
        static get COLORPANELBOXES() {
            return COLORPANELBOXES;
        }
        //#endregion
        //#region colorBoxType
        get colorBoxType() {
            return internal(this).colorBoxType;
        }
        set colorBoxType(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const c = new Color(Colors.TRANSPARENT);
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, COLORPANELBOXES)) {
                if (priv.colorBoxType !== newValue) {
                    priv.colorBoxType = newValue;
                    switch (priv.colorBoxType) {
                        case COLORPANELBOXES.PRIMARY:
                            c.assign(priv.primaryColorBox.fillColor);
                            priv.colorQuad.colorBox = priv.primaryColorBox;
                            priv.primaryColorBox.fillColor.assign(c);
                            break;
                        case COLORPANELBOXES.SECONDARY:
                            c.assign(priv.secondaryColorBox.fillColor);
                            priv.colorQuad.colorBox = priv.secondaryColorBox;
                            priv.secondaryColorBox.fillColor.assign(c);
                            break;
                    }
                    priv.colorQuad.color = c;
                    priv.colorQuad.hue = c.hue;
                    priv.hueSlider.values = [c.hue / 360, 0];
                    priv.alphaSlider.values = [c.alpha, 0];
                }
            }
        }
        //#endregion colorBoxType
        get colorQuad() {
            return internal(this).colorQuad;
        }
        get hueSlider() {
            return internal(this).hueSlider;
        }
        get alphaSlider() {
            return internal(this).alphaSlider;
        }
        get primaryColorBox() {
            return internal(this).primaryColorBox;
        }
        get secondaryColorBox() {
            return internal(this).secondaryColorBox;
        }
        //#endregion Getters / Setters
        //#region Methods
        doQuadChange() {
            //#region Variables déclaration
            const colorPanel = this.owner;
            //#endregion Variables déclaration
            switch (colorPanel.colorBoxType) {
                case COLORPANELBOXES.PRIMARY:
                    colorPanel.primaryColorBox.fillColor.alpha = colorPanel.alphaSlider.firstValue;
                    //colorPanel.primaryColorBox.update();
                    break;
                case COLORPANELBOXES.SECONDARY:
                    colorPanel.secondaryColorBox.fillColor.alpha = colorPanel.alphaSlider.firstValue;
                    //colorPanel.secondaryColorBox.update();
                    break;
            }
            if (!colorPanel.updating) {
                colorPanel.onChange.invoke();
            }
        }
        doAlphaChange() {
            //#region Variables déclaration
            const colorPanel = this.owner;
            //#endregion Variables déclaration
            colorPanel.changeAlpha(this.firstValue);
        }
        doHueChange() {
            //#region Variables déclaration
            const colorPanel = this.owner;
            //#endregion Variables déclaration
            colorPanel.colorQuad.hue = this.firstValue * 359;
            colorPanel.changeAlpha(colorPanel.alphaSlider.firstValue);
        }
        changeAlpha(value) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            switch (priv.colorBoxType) {
                case COLORPANELBOXES.PRIMARY:
                    priv.primaryColorBox.fillColor.alpha = value;
                    priv.primaryColorBox.update();
                    break;
                case COLORPANELBOXES.SECONDARY:
                    priv.secondaryColorBox.fillColor.alpha = value;
                    priv.secondaryColorBox.update();
                    break;
            }
            if (!this.updating) {
                this.onChange.invoke();
            }
        }
        changeColorBox() {
            //#region Variables déclaration
            const colorPanel = this.owner;
            const htmlElementStyle = this.HTMLElementStyle;
            //#endregion Variables déclaration
            if (this === colorPanel.primaryColorBox) {
                htmlElementStyle.zIndex = "1";
                colorPanel.secondaryColorBox.HTMLElementStyle.zIndex = String.EMPTY;
                colorPanel.colorBoxType = COLORPANELBOXES.PRIMARY;
            } else if (this === colorPanel.secondaryColorBox) {
                htmlElementStyle.zIndex = "1";
                colorPanel.primaryColorBox.HTMLElementStyle.zIndex = String.EMPTY;
                colorPanel.colorBoxType = COLORPANELBOXES.SECONDARY;
            }
        }
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.colorBoxType = null;
            this.onChange.destroy();
            this.onChange = null;
            priv.colorQuad.destroy();
            priv.colorQuad = null;
            priv.alphaSlider.destroy();
            priv.alphaSlider = null;
            priv.hueSlider.destroy();
            priv.hueSlider = null;
            priv.secondaryColorBox.destroy();
            priv.secondaryColorBox = null;
            priv.primaryColorBox.destroy();
            priv.primaryColorBox = null;
        }
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.loaded();
            priv.colorQuad = Core.classes.createComponent({ class: ColorQuad, owner: this, props: { inForm: false }, withTpl : true });
            priv.colorQuad.onChange.addListener(this.doQuadChange);
            priv.hueSlider = Core.classes.createComponent({ class: HUESlider, owner: this, props: { inForm: false, orientation: "vertical" }, withTpl: true });
            priv.hueSlider.onChange.addListener(this.doHueChange);
            priv.alphaSlider = Core.classes.createComponent({ class: AlphaSlider, owner: this, props: { inForm: false, values: [1, 0] }, withTpl: true });
            priv.alphaSlider.onChange.addListener(this.doAlphaChange);
            priv.secondaryColorBox = Core.classes.createComponent({ class: ColorBox, owner: this, props: { inForm: false }, withTpl: true });
            priv.secondaryColorBox.onClick.addListener(this.changeColorBox);
            priv.secondaryColorBox.hitTest.mouseDown = true;
            priv.primaryColorBox = Core.classes.createComponent({class: ColorBox, owner: this, props: { inForm: false }, withTpl: true });
            priv.primaryColorBox.onClick.addListener(this.changeColorBox);
            priv.primaryColorBox.hitTest.mouseDown = true;
            priv.colorQuad.colorBox = priv.primaryColorBox;
            priv.secondaryColorBox.color = Colors.WHITE;
        }
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (!this.loading && !this.form.loading) {
                priv.alphaSlider.update();
                priv.hueSlider.update();
                priv.colorQuad.update();
            }
        }
        //#endregion Methods
    }
    return ColorPanel;
    //#endregion ColorPanel
})();
Object.seal(ColorPanel);
Core.classes.register(Types.CATEGORIES.COLOR, ColorPanel);
//#endregion ColorPanel

/*(function () {
    "use strict";
    $j.types.ColorPanelBoxes = { PRIMARY: "primary", SECONDARY: "secondary" };
    var ColorPanel = $j.classes.Control.extend("ColorPanel", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                $j.tools.addPropertyFromSet(this, "colorBoxType", $j.types.ColorPanelBoxes, $j.types.ColorPanelBoxes.PRIMARY);
                if (!$j.isHTMLRenderer()) {
                    this.width = 160;
                    this.height = 160;
                }
                this.onChange = new $j.classes.NotifyEvent(this);
                this.colorQuad = $j.classes.createComponent($j.classes.ColorQuad, this, null, { _inForm: false }, false);
                this.colorQuad.onChange.addListener(this.doQuadChange);
                this.alphaSlider = $j.classes.createComponent($j.classes.AlphaSlider, this, null, { _inForm: false }, false);
                this.alphaSlider.onChange.addListener(this.doAlphaChange);
                this.hueSlider = $j.classes.createComponent($j.classes.HUESlider, this, null, { _inForm: false }, false);
                this.hueSlider.onChange.addListener(this.doHueChange);
                this.secondaryColorBox = $j.classes.createComponent($j.classes.ColorBox, this, null, { _inForm: false }, false);
                this.secondaryColorBox.onClick.addListener(this.changeColorBox);
                this.secondaryColorBox.hitTest.mouseDown = true;
                this.primaryColorBox = $j.classes.createComponent($j.classes.ColorBox, this, null, { _inForm: false }, false);
                this.primaryColorBox.onClick.addListener(this.changeColorBox);
                this.primaryColorBox.hitTest.mouseDown = true;
                this.colorQuad.setColorBox(this.primaryColorBox);
            }
        },
        //#region Setter
        setColorBoxType: function (newValue) {
            var c = new $j.classes.Color(_colors.TRANSPARENT);
            if (!$j.tools.valueInSet(newValue, $j.types.ColorPanelBoxes)) return;
            if (this.colorBoxType !== newValue) {
                this.colorBoxType = newValue;
                switch (this.colorBoxType) {
                    case $j.types.ColorPanelBoxes.PRIMARY:
                        c.assign(this.primaryColorBox.fillColor);
                        this.colorQuad.colorBox = this.primaryColorBox;
                        this.colorQuad.setColor(c);
                        this.colorQuad.setHue(c.hue);
                        this.hueSlider.setValues([c.hue / 360, 0]);
                        this.alphaSlider.setValues([c.alpha, 0]);
                        this.primaryColorBox.fillColor.assign(c);
                        break;
                    case $j.types.ColorPanelBoxes.SECONDARY:
                        c.assign(this.secondaryColorBox.fillColor);
                        this.colorQuad.colorBox = this.secondaryColorBox;
                        this.colorQuad.setColor(c);
                        this.colorQuad.setHue(c.hue);
                        this.hueSlider.setValues([c.hue / 360, 0]);
                        this.alphaSlider.setValues([c.alpha, 0]);
                        this.secondaryColorBox.fillColor.assign(c);
                        break;
                }
            }
        },
        //#endregion
        //#region Methods
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{ColorQuadTpl}"), tpl;
            tpl = this.colorQuad.getTemplate();
            html = a.join(tpl);
            a = html.split("{AlphaSliderTpl}"), tpl;
            tpl = this.alphaSlider.getTemplate();
            html = a.join(tpl);
            a = html.split("{HUESliderTpl}"), tpl;
            tpl = this.hueSlider.getTemplate();
            html = a.join(tpl);
            a = html.split("{primaryColorBoxTpl}"), tpl;
            tpl = this.primaryColorBox.getTemplate();
            html = a.join(tpl);
            a = html.split("{secondaryColorBoxTpl}"), tpl;
            tpl = this.secondaryColorBox.getTemplate();
            html = a.join(tpl);
            return html;
        },
        getChildsHTMLElement: function () {
            var elem;
            if (this._HTMLElement) {
                this.colorQuad.getHTMLElement(this._HTMLElement.firstElementChild.id);
                this.colorQuad.updateFromHTML();
                this.colorQuad.update();
                this.alphaSlider.getHTMLElement(this._HTMLElement.querySelector(".AlphaSlider").id);
                this.alphaSlider.getChildsHTMLElement();
                this.alphaSlider.updateFromHTML();
                this.hueSlider.getHTMLElement(this._HTMLElement.querySelector(".HUESlider").id);
                this.hueSlider.getChildsHTMLElement();
                this.hueSlider.updateFromHTML();
                this.hueSlider.setLeftValue(0.65);
                this.hueSlider.decimalPrecision = 2;
                this.secondaryColorBox.getHTMLElement(this._HTMLElement.querySelector(".ColorBox").id);
                this.secondaryColorBox.updateFromHTML();
                this.primaryColorBox.getHTMLElement(this._HTMLElement.lastElementChild.id);
                this.primaryColorBox.updateFromHTML();
            }
        },
        doQuadChange: function () {
            var colorPanel = this._owner;
            switch (colorPanel.colorBoxType) {
                case $j.types.ColorPanelBoxes.PRIMARY:
                    colorPanel.primaryColorBox.fillColor.setAlpha(colorPanel.alphaSlider.getFirstValue());
                    colorPanel.primaryColorBox.update();
                    break;
                case $j.types.ColorPanelBoxes.SECONDARY:
                    colorPanel.secondaryColorBox.fillColor.setAlpha(colorPanel.alphaSlider.getFirstValue());
                    colorPanel.secondaryColorBox.update();
                    break;
            }
            if (!colorPanel._updating) colorPanel.onChange.invoke();
        },
        doAlphaChange: function () {
            var colorPanel = this._owner;
            colorPanel.changeAlpha(this.getFirstValue());
        },
        doHueChange: function () {
            var colorPanel = this._owner;
            colorPanel.colorQuad.setHue(this.getFirstValue() * 359);
            colorPanel.changeAlpha(colorPanel.alphaSlider.getFirstValue());
        },
        changeAlpha: function (value) {
            switch (this.colorBoxType) {
                case $j.types.ColorPanelBoxes.PRIMARY:
                    this.primaryColorBox.fillColor.setAlpha(value);
                    this.primaryColorBox.update();
                    break;
                case $j.types.ColorPanelBoxes.SECONDARY:
                    this.secondaryColorBox.fillColor.setAlpha(value);
                    this.secondaryColorBox.update();
                    break;
            }
            if (!this._updating) this.onChange.invoke();
        },
        changeColorBox: function () {
            var colorPanel = this._owner;
            if (this === colorPanel.primaryColorBox) {
                this._HTMLElementStyle.zIndex = "1";
                colorPanel.secondaryColorBox._HTMLElementStyle.zIndex = String.EMPTY;
                colorPanel.setColorBoxType($j.types.ColorPanelBoxes.PRIMARY);
            } else if (this === colorPanel.secondaryColorBox) {
                this._HTMLElementStyle.zIndex = "1";
                colorPanel.primaryColorBox._HTMLElementStyle.zIndex = String.EMPTY;
                colorPanel.setColorBoxType($j.types.ColorPanelBoxes.SECONDARY);
            }
        },
        destroy: function () {
            this._inherited();
            this.colorBoxType = null;
            this.onChange.destroy();
            this.onChange = null;
            this.colorQuad = null;
            this.alphaSlider = null;
            this.hueSlider = null;
            this.secondaryColorBox = null;
            this.primaryColorBox = null;
        },
        loaded: function () {
            this._inherited();
            this.secondaryColorBox._HTMLElement.dataset.type = "secondaryColorBox";
            this.primaryColorBox._HTMLElement.dataset.type = "primaryColorBox";
            this.hueSlider.setOrientation($j.types.orientations.VERTICAL);
            this.secondaryColorBox.setColor(_colors.WHITE);
        },
        update: function () {
            if (this._loading || this.form._loading) return;
            this.alphaSlider.update();
            this.hueSlider.update();
            this.colorQuad.update();
        }
        //#endregion
    });
    Object.seal(ColorPanel);
    $j.classes.register($j.types.categories.COLOR, ColorPanel);
    //#region Template
    if ($j.isHTMLRenderer()) {
        var ColorPanelTpl = "<div id='{internalId}' data-name='{name}' data-class='ColorPanel' class='Control ColorPanel' style='width:160px;height:160px;'>\
                       {ColorQuadTpl}\
                       {AlphaSliderTpl}\
                       {HUESliderTpl}\
                       {primaryColorBoxTpl}\
                       {secondaryColorBoxTpl}\
                       </div>";
        $j.classes.registerTemplates([{ Class: ColorPanel, template: ColorPanelTpl }]);
    }
    //#endregion
})();*/