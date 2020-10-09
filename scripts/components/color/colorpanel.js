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
            this.addPropertyEnum('colorBoxType', COLORPANELBOXES);
            this.#colorBoxType = props.hasOwnProperty('colorBoxType') ? props.colorBoxType : COLORPANELBOXES.PRIMARY;
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
    //#endregion COLORPANELBOXES
    //#region colorBoxType
    get colorBoxType() {
        return this.#colorBoxType;
    }
    set colorBoxType(newValue) {
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
    //#endregion colorBoxType
    //#region colorQuad
    get colorQuad() {
        return this.#colorQuad;
    }
    //#endregion colorQuad
    //#region hueSlider
    get hueSlider() {
        return this.#hueSlider;
    }
    //#endregion hueSlider
    //#region alphaSlider
    get alphaSlider() {
        return this.#alphaSlider;
    }
    //#region primaryColorBox
    get primaryColorBox() {
        return this.#primaryColorBox;
    }
    //#endregion primaryColorBox
    //#region secondaryColorBox
    get secondaryColorBox() {
        return this.#secondaryColorBox;
    }
    //#endregion secondaryColorBox
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
        //let colorQuad, hueSlider, alphaSlider, secondaryColorBox, primaryColorBox;
        //#endregion Variables déclaration
        super.loaded();
        this.#colorQuad = core.classes.createComponent({
            class: ColorQuad,
            owner: this,
            props: {
                inForm: !1,
                format: 'hsl'
            }
        });
        this.#colorQuad.onChange.addListener(this.doQuadChange);
        this.#hueSlider = core.classes.createComponent({
            class: HUESlider,
            owner: this,
            props: {
                inForm: !1,
                orientation: core.types.ORIENTATIONS.VERTICAL
            }
        });
        this.#hueSlider.onChange.addListener(this.doHueChange);
        this.#alphaSlider = core.classes.createComponent({
            class: AlphaSlider,
            owner: this,
            props: {
                inForm: !1,
                values: [1, 0]
            }
        });
        this.#alphaSlider.onChange.addListener(this.doAlphaChange);
        this.#secondaryColorBox = core.classes.createComponent({
            class: ColorBox,
            owner: this,
            props: {
                inForm: !1
            }
        });
        this.#secondaryColorBox.onClick.addListener(this.changeColorBox);
        this.#secondaryColorBox.mouseEvents.mousedown = !0;
        this.#secondaryColorBox.HTMLElement.classList.add('secondaryColorBox');
        this.#primaryColorBox = core.classes.createComponent({
            class: ColorBox,
            owner: this,
            props: {
                inForm: !1,
                color: color
            }
        });
        this.#primaryColorBox.onClick.addListener(this.changeColorBox);
        this.#primaryColorBox.mouseEvents.mousedown = !0;
        this.#primaryColorBox.HTMLElement.classList.add('primaryColorBox');
        this.#colorQuad.colorBox = this.#primaryColorBox;
        this.#colorQuad.color = this.#primaryColorBox.color;
        this.#hueSlider.firstValue = this.#primaryColorBox.color.hue / 360;
        this.#secondaryColorBox.color = Colors.WHITE;
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