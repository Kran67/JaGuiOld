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
    //#region Private fields
    #colorBoxType;
    #primaryColorBox;
    #secondaryColorBox;
    #colorQuad;
    #hueSlider;
    #alphaSlider;
    //#endregion Private fields
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
                    const c = Colors.TRANSPARENT;
                    //#endregion Variables déclaration
                    if (core.tools.valueInSet(newValue, COLORPANELBOXES) && this.#colorBoxType !== newValue) {
                        this.#colorBoxType = newValue;
                        switch (newValue) {
                            case COLORPANELBOXES.PRIMARY:
                                c.assign(this.#primaryColorBox.fillColor);
                                this.#colorQuad.colorBox = this.#primaryColorBox;
                                this.#primaryColorBox.fillColor.assign(c);
                                break;
                            case COLORPANELBOXES.SECONDARY:
                                c.assign(this.#secondaryColorBox.fillColor);
                                this.#colorQuad.colorBox = this.#secondaryColorBox;
                                this.#secondaryColorBox.fillColor.assign(c);
                                break;
                        }
                        this.#colorQuad.color = c;
                        this.#hueSlider.firstValue = c.hue / 360;
                        this.#alphaSlider.firstValue = c.alpha;
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
        return this.#colorQuad;
    }
    get hueSlider() {
        return this.#hueSlider;
    }
    get alphaSlider() {
        return this.#alphaSlider;
    }
    get primaryColorBox() {
        return this.#primaryColorBox;
    }
    get secondaryColorBox() {
        return this.#secondaryColorBox;
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
        switch (this.#colorBoxType) {
            case COLORPANELBOXES.PRIMARY:
                this.#primaryColorBox.fillColor.alpha = value;
                this.#primaryColorBox.update();
                break;
            case COLORPANELBOXES.SECONDARY:
                this.#secondaryColorBox.fillColor.alpha = value;
                this.#secondaryColorBox.update();
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
        this.#colorQuad.destroy();
        this.#alphaSlider.destroy();
        this.#hueSlider.destroy();
        this.#secondaryColorBox.destroy();
        this.#primaryColorBox.destroy();
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
        if (!this.loading && !this.form.loading) {
            this.#alphaSlider.update();
            this.#hueSlider.update();
            this.#colorQuad.update();
        }
    }
    //#endregion Methods
}
Object.defineProperties(ColorPanel.prototype, {
    'colorQuad': {
        enumerable: !0
    },
    'hueSlider': {
        enumerable: !0
    },
    'alphaSlider': {
        enumerable: !0
    },
    'secondaryColorBox': {
        enumerable: !0
    },
    'primaryColorBox': {
        enumerable: !0
    }
});
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