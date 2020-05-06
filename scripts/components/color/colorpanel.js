//#region Import
import { Control } from '/scripts/components/control.js';
import { Colors } from '/scripts/core/color.js';
import { ColorQuad } from '/scripts/components/color/colorquad.js';
import { AlphaSlider } from '/scripts/components/color/alphaslider.js';
import { HUESlider } from '/scripts/components/color/hueslider.js';
import { ColorBox } from '/scripts/components/color/colorbox.js';
//#endregion Import
//#region COLORPANELBOXES
const COLORPANELBOXES = Object.freeze(Object.seal({
    PRIMARY: 'primary',
    SECONDARY: 'secondary'
}));
//#endregion COLORPANELBOXES
//#region ColorPanel
const ColorPanel = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
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
                if (!core.isHTMLRenderer) {
                    props.width = 160;
                    props.height = 160;
                }
                super(owner, props);
                const priv = internal(this);
                core.tools.addPropertyFromEnum({
                    component: this,
                    propName: 'colorBoxType',
                    enum: COLORPANELBOXES,
                    //forceUpdate: true,
                    variable: priv,
                    value: props.hasOwnProperty('colorBoxType') ? props.colorBoxType : COLORPANELBOXES.PRIMARY,
                    setter: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        const c = Colors.TRANSPARENT;
                        //#endregion Variables déclaration
                        if (core.tools.valueInSet(newValue, COLORPANELBOXES) && priv.colorBoxType !== newValue) {
                            priv.colorBoxType = newValue;
                            switch (priv.colorBoxType) {
                                case COLORPANELBOXES.PRIMARY:
                                    c.assign(priv.primaryColorBox.fillColor);
                                    priv.colorQuad.colorBox = priv.primaryColorBox;
                                    priv.colorQuad.color.assign(c);
                                    priv.colorQuad.hue = c.hue;
                                    priv.hueSlider.firstValue = c.hue / 360;
                                    priv.alphaSlider.firstValue = c.alpha;
                                    priv.primaryColorBox.fillColor.assign(c);
                                    break;
                                case COLORPANELBOXES.SECONDARY:
                                    c.assign(priv.secondaryColorBox.fillColor);
                                    priv.colorQuad.colorBox = priv.secondaryColorBox;
                                    priv.colorQuad.color.assign(c);
                                    priv.colorQuad.hue = c.hue;
                                    priv.hueSlider.firstValue = c.hue / 360;
                                    priv.alphaSlider.firstValue = c.alpha;
                                    priv.secondaryColorBox.fillColor.assign(c);
                                    break;
                            }
                        }
                    }
                });
                this.createEventsAndBind(['onChange'], props);
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
            !colorPanel.updating && colorPanel.onChange.invoke();
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
            !this.updating && this.onChange.invoke();
        }
        changeColorBox() {
            //#region Variables déclaration
            const colorPanel = this.owner;
            const htmlElementStyle = this.HTMLElementStyle;
            //#endregion Variables déclaration
            if (this === colorPanel.primaryColorBox) {
                htmlElementStyle.zIndex = '1';
                colorPanel.secondaryColorBox.HTMLElementStyle.zIndex = String.EMPTY;
                colorPanel.colorBoxType = COLORPANELBOXES.PRIMARY;
            } else if (this === colorPanel.secondaryColorBox) {
                htmlElementStyle.zIndex = '1';
                colorPanel.primaryColorBox.HTMLElementStyle.zIndex = String.EMPTY;
                colorPanel.colorBoxType = COLORPANELBOXES.SECONDARY;
            }
        }
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            this.unBindAndDestroyEvents(['onChange'], props);
            priv.colorBoxType = null;
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
            super.destroy();
        }
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const json = JSON.parse(this.HTMLElement.querySelector('properties').innerText);
            const color = json.hasOwnProperty('color') ? json.color : Colors.RED;
            //#endregion Variables déclaration
            super.loaded();
            priv.colorQuad = core.classes.createComponent({
                class: ColorQuad,
                owner: this,
                props: {
                    inForm: !1,
                    format: 'hsl'
                }
            });
            priv.colorQuad.onChange.addListener(this.doQuadChange);
            priv.hueSlider = core.classes.createComponent({
                class: HUESlider,
                owner: this,
                props: {
                    inForm: !1,
                    orientation: core.types.ORIENTATIONS.VERTICAL
                }
            });
            priv.hueSlider.onChange.addListener(this.doHueChange);
            priv.alphaSlider = core.classes.createComponent({
                class: AlphaSlider,
                owner: this,
                props: {
                    inForm: !1,
                    values: [1, 0]
                }
            });
            priv.alphaSlider.onChange.addListener(this.doAlphaChange);
            priv.secondaryColorBox = core.classes.createComponent({
                class: ColorBox,
                owner: this,
                props: {
                    inForm: !1
                }
            });
            priv.secondaryColorBox.onClick.addListener(this.changeColorBox);
            priv.secondaryColorBox.hitTest.mouseDown = !0;
            priv.secondaryColorBox.HTMLElement.classList.add('secondaryColorBox');
            priv.primaryColorBox = core.classes.createComponent({
                class: ColorBox,
                owner: this,
                props: {
                    inForm: !1,
                    color: color
                }
            });
            priv.primaryColorBox.onClick.addListener(this.changeColorBox);
            priv.primaryColorBox.hitTest.mouseDown = !0;
            priv.primaryColorBox.HTMLElement.classList.add('primaryColorBox');
            priv.colorQuad.colorBox = priv.primaryColorBox;
            priv.colorQuad.color = priv.primaryColorBox.color;
            priv.hueSlider.firstValue = priv.primaryColorBox.color.hue / 360;
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
core.classes.register(core.types.CATEGORIES.COLOR, ColorPanel);
//#endregion ColorPanel
//#region Template
if (core.isHTMLRenderer) {
    const ColorPanelTpl = ['<jagui-colorpanel id="{internalId}" data-class="ColorPanel" class="Control ColorPanel">',
        '<properties>{ "name": "{name}", "width": 160, "height": 160, "color": "blue", "format": "hsl" }</properties>',
        '</jagui-colorpanel>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: ColorPanel, template: ColorPanelTpl }]);
}
//#endregion
export { ColorPanel };