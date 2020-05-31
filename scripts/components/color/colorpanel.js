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
            core.tools.addPropertyFromEnum({
                component: this,
                propName: 'colorBoxType',
                enum: COLORPANELBOXES,
                value: props.hasOwnProperty('colorBoxType') ? props.colorBoxType : COLORPANELBOXES.PRIMARY,
                setter: function (newValue) {
                    //#region Variables déclaration
                    const priv = core.private(this);
                    const c = Colors.TRANSPARENT;
                    //#endregion Variables déclaration
                    if (core.tools.valueInSet(newValue, COLORPANELBOXES) && priv.colorBoxType !== newValue) {
                        priv.colorBoxType = newValue;
                        switch (newValue) {
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
        return core.private(this).colorQuad;
    }
    get hueSlider() {
        return core.private(this).hueSlider;
    }
    get alphaSlider() {
        return core.private(this).alphaSlider;
    }
    get primaryColorBox() {
        return core.private(this).primaryColorBox;
    }
    get secondaryColorBox() {
        return core.private(this).secondaryColorBox;
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
        const priv = core.private(this);
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
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.colorQuad.destroy();
        priv.alphaSlider.destroy();
        priv.hueSlider.destroy();
        priv.secondaryColorBox.destroy();
        priv.primaryColorBox.destroy();
        this.unBindAndDestroyEvents(['onChange'], props);
        super.destroy();
    }
    loaded() {
        //#region Variables déclaration
        const json = JSON.parse(this.HTMLElement.querySelector('properties').innerText);
        const color = json.hasOwnProperty('color') ? json.color : Colors.RED;
        let colorQuad, hueSlider, alphaSlider, secondaryColorBox, primaryColorBox;
        //#endregion Variables déclaration
        super.loaded();
        colorQuad = core.classes.createComponent({
            class: ColorQuad,
            owner: this,
            props: {
                inForm: !1,
                format: 'hsl'
            }
        });
        colorQuad.onChange.addListener(this.doQuadChange);
        hueSlider = core.classes.createComponent({
            class: HUESlider,
            owner: this,
            props: {
                inForm: !1,
                orientation: core.types.ORIENTATIONS.VERTICAL
            }
        });
        hueSlider.onChange.addListener(this.doHueChange);
        alphaSlider = core.classes.createComponent({
            class: AlphaSlider,
            owner: this,
            props: {
                inForm: !1,
                values: [1, 0]
            }
        });
        alphaSlider.onChange.addListener(this.doAlphaChange);
        secondaryColorBox = core.classes.createComponent({
            class: ColorBox,
            owner: this,
            props: {
                inForm: !1
            }
        });
        secondaryColorBox.onClick.addListener(this.changeColorBox);
        secondaryColorBox.mouseEvents.mousedown = !0;
        secondaryColorBox.HTMLElement.classList.add('secondaryColorBox');
        primaryColorBox = core.classes.createComponent({
            class: ColorBox,
            owner: this,
            props: {
                inForm: !1,
                color: color
            }
        });
        primaryColorBox.onClick.addListener(this.changeColorBox);
        primaryColorBox.mouseEvents.mousedown = !0;
        primaryColorBox.HTMLElement.classList.add('primaryColorBox');
        colorQuad.colorBox = primaryColorBox;
        colorQuad.color = primaryColorBox.color;
        hueSlider.firstValue = primaryColorBox.color.hue / 360;
        secondaryColorBox.color = Colors.WHITE;
        core.private(this, { colorQuad, hueSlider, alphaSlider, secondaryColorBox, primaryColorBox });
    }
    update() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (!this.loading && !this.form.loading) {
            priv.alphaSlider.update();
            priv.hueSlider.update();
            priv.colorQuad.update();
        }
    }
    //#endregion Methods
}
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