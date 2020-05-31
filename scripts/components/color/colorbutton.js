//#region Imports
import { Button } from '/scripts/components/common/button.js';
import { Color, Colors } from '/scripts/core/color.js';
import { Window } from '/scripts/components/containers/window.js';
//#endregion Imports
//#region Class CustomButton
class ColorButton extends Button {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            const color = props.hasOwnProperty('color') ? Color.parse(props.color) : Colors.TRANSPARENT;
            props.caption = color.toRGBAString();
            super(owner, props);
            core.private(this, { color });
            this.createEventsAndBind(['onChange'], props);
            //priv.colorDlg = null;
        }
    }
    //#endregion Constructor
    //#region Getters / Setters
    //#region caption
    get caption() {
        return core.private(this).color.toRGBAString();
    }
    set caption(newValue) {
        return;
    }
    //#endregion caption
    //#region color
    get color() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set color(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        if (newValue instanceof Color && !priv[propName].equals(newValue)) {
            priv[propName].assign(newValue);
            this.caption = priv[propName].toRGBAString(); // à voir
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
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        this.textObj && (this.textObj.innerHTML = String.EMPTY);
        priv.colorObj
            && (priv.colorObj.style.boxShadow = `${priv.color.toRGBAString()} 0px 0px 0px 1000px inset`);
    }
    //#endregion update
    //#region click
    click() {
        //#region Variables déclaration
        const colorDlg = core.classes.createComponent({
            class: core.classes.ColorDlg,
            owner: activeApp,
            props: {
                parentHTML: document.body,
                control: this
            }
        });
        //#endregion Variables déclaration
        colorDlg.obj = this;
        colorDlg.onClose.addListener(this.updateColor);
        colorDlg.showModal();
        super.click();
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
        const priv = core.private(this);
        let colorObj;
        //#endregion Variables déclaration
        colorObj = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}color`);
        colorObj.classList.add('Control', 'ColorButtonColor', this.themeName);
        core.private(this, { colorObj });
        this.HTMLElement.appendChild(priv.colorObj);
        super.loaded();
    }
    //#endregion loaded
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.color.destroy();
        this.unBindAndDestroyEvents(['onChange']);
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
//#endregion ColorButton
core.classes.register(core.types.CATEGORIES.COLOR, ColorButton);
//#region Templates
if (core.isHTMLRenderer) {
    const ColorButtonTpl = ['<jagui-colorbutton id="{internalId}" data-class="ColorButton" class="Control ColorButton {theme} csr_default">',
        '<properties>{ "name": "{name}", "color": "red" }</properties></jagui-colorbutton>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: ColorButton, template: ColorButtonTpl }]);
}
//#endregion
export { ColorButton };