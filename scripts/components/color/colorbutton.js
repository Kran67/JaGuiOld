//#region Imports
import { Button } from '/scripts/components/common/button.js';
import { Color, Colors } from '/scripts/core/color.js';
import { Window } from '/scripts/components/containers/window.js';
//#endregion Imports
//#region ColorButton
const ColorButton = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) ? _private.set(key, {}) : 1;
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
                const color = props.hasOwnProperty('color') ? Color.parse(props.color) : Colors.TRANSPARENT;
                props.caption = color.toRGBAString();
                super(owner, props);
                const priv = internal(this);
                priv.color = color;
                this.createEventsAndBind(['onChange'], props);
                priv.colorDlg = null;
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
            if (newValue instanceof Color && !priv.color.equals(newValue)) {
                priv.color.assign(newValue);
                this.caption = priv.color.toRGBAString();
                if (core.isHTMLRenderer) {
                    !this.loading && !this.form.loading ? this.update() : 1;
                    !this.updating ? this.onChange.invoke() : 1;
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
            newValue instanceof ColorDialog && priv.colorDlg !== newValue ? priv.colorDlg = newValue : 1;
        }
        //#endregion colorDlg
        //#endregion Getters / Setters
        //#region Methods
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            this.textObj ? this.textObj.innerHTML = String.EMPTY : 1;
            priv.colorObj ? priv.colorObj.style.backgroundColor = priv.color.toRGBAString() : 1;
        }
        //#endregion update
        //#region click
        click() {
            //#region Variables déclaration
            const priv = internal(this);
            const colorDlg = core.classes.createComponent({
                class: ColorDlg,
                owner: activeApplication,
                props: { parentHTML: document.body }
            });
            //#endregion Variables déclaration
            colorDlg.loaded();
            colorDlg.obj = this;
            colorDlg.caption = 'Couleurs'; // à traduire
            colorDlg.color = priv.color;
            colorDlg.lblOpacity.visible = !1;
            colorDlg.slrOpacity.visible = !1;
            colorDlg.txtbOpacity.visible = !1;
            colorDlg.lblOpacityPer.visible = !1;
            colorDlg.onClose.addListener(this.updateColor);
            colorDlg.center();
            colorDlg.showModal();
            super.click();
        }
        //#endregion click
        //#region updateColor
        updateColor() {
            this.modalResult === Window.MODALRESULTS.OK ? this.obj.color = this.clrBoxNewColor.fillColor : 1;
            this.obj.colorDlg = null;
        }
        //#endregion updateColor
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.colorObj = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}color`);
            priv.colorObj.classList.add('Control', 'ColorButtonColor', this.themeName);
            this.HTMLElement.appendChild(priv.colorObj);
            super.loaded();
        }
        //#endregion loaded
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.colorObj = null;
            priv.color.destroy();
            priv.color = null;
            this.unBindAndDestroyEvents(['onChange']);
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return ColorButton;
    //#endregion ColorButton
})();
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