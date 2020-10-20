//#region Imports
import { Button } from '/scripts/components/common/button.js';
import { Color, Colors } from '/scripts/core/color.js';
import { Window } from '/scripts/components/containers/window.js';
//#endregion Imports
//#region Class CustomButton
class ColorButton extends Button {
    //#region Private fields
    #color;
    #colorObj;
    //#endregion Private fields
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            const color = props.hasOwnProperty('color') ? Color.parse(props.color) : Colors.TRANSPARENT;
            props.caption = color.toRGBAString();
            props.color = color;
            super(owner, props);
            this.#color = color;
            this.createEventsAndBind(['onChange'], props);
        }
    }
    //#endregion Constructor
    //#region Getters / Setters
    //#region caption
    get caption() {
        return this.#color.toRGBAString();
    }
    set caption(newValue) {
        return;
    }
    //#endregion caption
    //#region color
    get color() {
        return this.#color;
    }
    set color(newValue) {
        if (newValue instanceof Color && !this.#color.equals(newValue)) {
            this.#color.assign(newValue);
            this.caption = this.#color.toRGBAString(); // à voir
            if (core.isHTMLRenderer) {
                !this.loading && !this.form.loading && this.update();
                !this.updating && this.onChange.invoke();
            }
        }
    }
    //#endregion color
    //#endregion Getters / Setters
    //#region Methods
    //#region update
    update() {
        this.textObj && (this.textObj.innerHTML = String.EMPTY);
        this.#colorObj
            && (this.#colorObj.style.boxShadow = `${this.#color.toRGBAString()} 0px 0px 0px 1000px inset`);
    }
    //#endregion update
    //#region click
    click() {
        //#region Variables déclaration
        let colorDlg;
        //#endregion Variables déclaration
        activeApp.isBusy = !0;
        colorDlg = core.classes.createComponent({
            class: core.classes.ColorDlg,
            owner: activeApp,
            props: {
                parentHTML: document.body,
                control: this
            }
        });
        colorDlg.obj = this;
        colorDlg.onClose.addListener(this.updateColor);
        colorDlg.showModal();
        super.click();
        activeApp.isBusy = !1;
    }
    //#endregion click
    //#region updateColor
    updateColor() {
        this.modalResult === Window.MODALRESULTS.OK && (this.obj.color = this.clrBoxNewColor.fillColor);
        this.obj.colorDlg = null;
    }
    //#endregion updateColor
    //#region loaded
    loaded() {
        //#region Variables déclaration
        let colorObj;
        //#endregion Variables déclaration
        colorObj = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}color`);
        colorObj.classList.add('ColorButtonColor', this.themeName);
        this.#colorObj = colorObj;
        this.HTMLElement.appendChild(this.#colorObj);
        super.loaded();
    }
    //#endregion loaded
    //#region destroy
    destroy() {
        this.#color.destroy();
        this.#color = null;
        this.unBindAndDestroyEvents(['onChange']);
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
//#endregion ColorButton
Object.defineProperties(ColorButton.prototype, {
    'color': {
        enumerable: !0
    }
});
Object.seal(ColorButton);
core.classes.register(core.types.CATEGORIES.COLOR, ColorButton);
//#region Templates
if (core.isHTMLRenderer) {
    const ColorButtonTpl = ['<jagui-colorbutton id="{internalId}" data-class="ColorButton" class="Control ColorButton {theme} csr_default">',
        '<properties>{ "name": "{name}", "color": "red" }</properties></jagui-colorbutton>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: ColorButton, template: ColorButtonTpl }]);
}
//#endregion
export { ColorButton };