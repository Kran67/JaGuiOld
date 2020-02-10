//#region Imports
import { Button } from "/scripts/components/common/button.js";
import { Color, Colors } from "/scripts/core/color.js";
import { NotifyEvent } from "/scripts/core/events.js";
import { Window } from "/scripts/components/containers/window.js";
//#endregion Imports
//#region ColorButton
const ColorButton = (() => {
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
    //#region Class CustomButton
    class ColorButton extends Button {
        //#region Constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                const color = props.hasOwnProperty("color") ? Color.parse(props.color) : Colors.TRANSPARENT;
                props.caption = color.toRGBAString();
                super(owner, props);
                const priv = internal(this);
                priv.color = color;
                this.onChange = new NotifyEvent(this);
                priv.colorDlg = null;
                //priv.colorObj = null;
            }
        }
        //#endregion Constructor
        //#region Getters / Setters
        //#region caption
        get caption() {
            return internal(this).color.toRGBAString();
        }
        set caption(newValue) {
            return;
        }
        //#endregion caption
        //#region color
        get color() {
            return internal(this).color;
        }
        set color(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Color) {
                if (!priv.color.equals(newValue)) {
                    priv.color.assign(newValue);
                    this.caption = priv.color.toRGBAString();
                    if (Core.isHTMLRenderer) {
                        if (!this.loading && !this.form.loading) {
                            this.update();
                        }
                        if (!this.updating) {
                            this.onChange.invoke();
                        }
                    }
                }
            }
        }
        //#endregion color
        //#region colorDlg
        get colorDlg() {
            return internal(this).colorDlg;
        }
        set colorDlg(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof ColorDialog) {
                if (priv.colorDlg !== newValue) {
                    priv.colorDlg = newValue;
                }
            }
        }
        //#endregion colorDlg
        //#endregion Getters / Setters
        //#region Methods
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (this.textObj) {
                this.textObj.innerHTML = String.EMPTY;
            }
            if (priv.colorObj) {
                priv.colorObj.style.backgroundColor = priv.color.toRGBAString();
            }
        }
        //#endregion update
        //#region click
        click() {
            //#region Variables déclaration
            const priv = internal(this);
            const colorDlg = Core.classes.createComponent(ColorDlg, activeApplication, null, { parentHTML: document.body });
            //#endregion Variables déclaration
            colorDlg.loaded();
            colorDlg.obj = this;
            colorDlg.caption = "Couleurs";
            colorDlg.color = priv.color;
            colorDlg.lblOpacity.visible = false;
            colorDlg.slrOpacity.visible = false;
            colorDlg.txtbOpacity.visible = false;
            colorDlg.lblOpacityPer.visible = false;
            colorDlg.onClose.addListener(this.updateColor);
            colorDlg.center();
            colorDlg.showModal();
            super.click();
        }
        //#endregion click
        //#region updateColor
        updateColor() {
            if (this.modalResult === Window.MODALRESULTS.OK) {
                this.obj.color = this.clrBoxNewColor.fillColor;
            }
            this.obj.colorDlg = null;
        }
        //#endregion updateColor
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.colorObj = document.createElement(Types.HTMLELEMENTS.DIV);
            priv.colorObj.classList.add("Control", "ColorButtonColor", this.themeName);
            this.HTMLElement.appendChild(priv.colorObj);
            super.loaded();
        }
        //#endregion loaded
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.colorObj = null;
            priv.color.destroy();
            priv.color = null;
            this.caption = null;
            this.onChange.destroy();
            this.onChange = null;
        }
        //#endregion destroy
        //#endregion Methods
    }
    return ColorButton;
    //#endregion ColorButton
})();
//#endregion ColorButton
Core.classes.register(Types.CATEGORIES.COLOR, ColorButton);
//#region Templates
if (Core.isHTMLRenderer) {
    var ColorButtonTpl = ["<jagui-colorbutton id=\"{internalId}\" data-class=\"ColorButton\" class=\"Control ColorButton {theme} csr_default\">",
        "<properties>{ \"name\": \"{name}\", \"color\": \"red\" }</properties></jagui-colorbutton>"].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: ColorButton, template: ColorButtonTpl }]);
}
//endregion