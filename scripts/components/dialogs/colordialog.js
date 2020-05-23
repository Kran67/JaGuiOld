//#region Import
import { Window } from '/scripts/components/containers/window.js';
import { CommonDialog } from '/scripts/components/dialogs/commondialog.js';
import '/scripts/components/common/button.js';
import '/scripts/components/common/label.js';
import '/scripts/components/common/slider.js';
import '/scripts/components/common/textbox.js';
import '/scripts/components/containers/gridlayout.js';
import '/scripts/components/containers/panel.js';
import '/scripts/components/color/colorquad.js';
import '/scripts/components/color/colorbox.js';
import '/scripts/components/color/colorpicker.js';
import '/scripts/components/color/alphaslider.js';
import '/scripts/components/extended/valuelabel.js';
//#endregion Import
//#region ColorDlg
const ColorDlg = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class ColorDlg
    class ColorDlg extends Window {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                props.width = 572;
                props.height = 295;
                props.borderStyle = Window.BORDERSTYLES.DIALOG;
                props.formPosition = Window.FORMPOSITIONS.MAINFORMCENTER;
                props.name = 'colorDlg';
                props.destroyOnHide = !0;
                props.caption = core.locales[core.currentLocale]['colorDlg'];
                super(owner, props);
                const priv = internal(this);
                priv.control = props.hasOwnProperty('control') ? props.control : null;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region template
        get template() {
            let html = super.template;
            let a = html.split('{internalId_grdLayout}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_ClrQuad}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_ClrPicker}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_lblCurColor}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_clrBoxCurColor}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_clrBoxNewColor}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_btnRGB}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_btnHSL}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_btnHSV}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_pnlRGB}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_lblRed}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_slrRed}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_txtbRed}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_lblGreen}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_slrGreen}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_txtbGreen}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_lblBlue}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_slrBlue}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_pnlHSL}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_lblHue}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_slrHue}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_txtbHSLHue}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_lblHSLHue}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_lblSat}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_slrSat}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_txtbHSLSat}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_lblHSLSat}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_lblLight}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_slrLight}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_txtbLight}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_lblHSLLight}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_pnlHSV}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_lblHSVHue}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_slrHSVHue}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_txtbHSVHue}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_lblHSVHueDeg}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_lblHSVSat}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_slrHVSSat}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_txtbHSVSat}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_lblHSVSatPer}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_lblValue}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_slrValue}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_txtbValue}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_lblValuePer}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_lblOpacity}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_slrOpacity}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_txtbOpacity}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_lblOpacityPer}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_btnOk}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_btnCancel}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_txtbHex}');
            html = a.join(String.uniqueId());
            return html;
        }
        //#endregion template
        //#region color
        set color(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof core.classes.Color && !priv.clrBoxCurColor.fillColor.equals(newValue)) {
                priv.clrBoxCurColor.color = newValue;
                priv.clrPicker.color = newValue;
                this.updateControls(newValue);
            }
        }
        //#endregion color
        //#endregion Getters / Setters
        //#region Methods
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const locale = core.tools.getDefaultLocale();
            //#endregion Variables déclaration
            super.loaded();
            this.lblCurColor.caption = locale['colorDlg.LblCurColor'];
            this.lblNewColor.caption = locale['colorDlg.LblNewColor'];
        }
        //#endregion loaded
        //#endregion Methods
    }
    return ColorDlg;
    //#endregion ColorDlg
})();
//#endregion ColorDlg
//#region ColorDialog
const ColorDialog = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region class ColorDialog
    class ColorDialog extends CommonDialog {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.control = null;
            }
        }
        //#endregion constructor
        //#region Methods
        //#region loaded
        execute(control, callback) {
            //#region Variables déclaration
            const priv = internal(this);
            let dlg;
            //#endregion Variables déclaration
            priv.control = control;
            dlg = core.classes.createComponent({
                class: ColorDlg,
                owner: activeApp,
                props: {
                    parentHTML: document.body,
                    control
                }
            });
            //if (!obj) {
            //    _dlg.setColor(_colors.RED);
            //} else this._dlg.setColor(obj.color);

            dlg.dialog = this;
            dlg.onClose.addListener(callback);
            super.execute();
        }
        //#endregion loaded
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.control = null;
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return ColorDialog;
    //#endregion class ColorDialog
})();
//#endregion ColorDialog
core.classes.register(core.types.CATEGORIES.INTERNAL, ColorDlg);
core.classes.register(core.types.CATEGORIES.DIALOGS, ColorDialog);
//#region I18n
!core.locales[core.types.LANGUAGES.FR_FR] && (core.locales[core.types.LANGUAGES.FR_FR] = {});
!core.locales[core.types.LANGUAGES.EN_US] && (core.locales[core.types.LANGUAGES.EN_US] = {});
core.locales[core.types.LANGUAGES.FR_FR]['colorDlg'] = 'Choix de la couleur';
core.locales[core.types.LANGUAGES.FR_FR]['colorDlg.LblCurColor'] = 'Couleur actuelle :';
core.locales[core.types.LANGUAGES.FR_FR]['colorDlg.LblNewColor'] = 'Nouvelle couleur :';
core.locales[core.types.LANGUAGES.FR_FR]['colorDlg.LblRed'] = 'Rouge : ';
core.locales[core.types.LANGUAGES.FR_FR]['colorDlg.LblGreen'] = 'Vert : ';
core.locales[core.types.LANGUAGES.FR_FR]['colorDlg.LblBlue'] = 'Bleu : ';
core.locales[core.types.LANGUAGES.FR_FR]['colorDlg.LblHue'] = 'Hue: ';
core.locales[core.types.LANGUAGES.FR_FR]['colorDlg.LblSaturate'] = 'Saturation : ';
core.locales[core.types.LANGUAGES.FR_FR]['colorDlg.LblLight'] = 'Luminosité : ';
core.locales[core.types.LANGUAGES.FR_FR]['colorDlg.LblValue'] = 'Valeur : ';
core.locales[core.types.LANGUAGES.EN_US]['colorDlg'] = 'Color choice';
core.locales[core.types.LANGUAGES.EN_US]['colorDlg.LblCurColor'] = 'Current color :';
core.locales[core.types.LANGUAGES.EN_US]['colorDlg.LblNewColor'] = 'New color :';
core.locales[core.types.LANGUAGES.EN_US]['colorDlg.LblRed'] = 'Red : ';
core.locales[core.types.LANGUAGES.EN_US]['colorDlg.LblGreen'] = 'Green : ';
core.locales[core.types.LANGUAGES.EN_US]['colorDlg.LblBlue'] = 'Blue : ';
core.locales[core.types.LANGUAGES.EN_US]['colorDlg.LblHue'] = 'Hue: ';
core.locales[core.types.LANGUAGES.EN_US]['colorDlg.LblSaturate'] = 'Saturate : ';
core.locales[core.types.LANGUAGES.EN_US]['colorDlg.LblLight'] = 'Light : ';
core.locales[core.types.LANGUAGES.EN_US]['colorDlg.LblValue'] = 'Value : ';
//#endregion I18n
//#region Template
if (core.isHTMLRenderer) {
    const WindowTpl = core.classes.getTemplate(core.classes.Window.name);
    const ColorDlgTpl = ['<jagui-gridlayout id="{internalId_grdLayout}" data-class="GridLayout" class="Control GridLayout">',
        '<properties>{ "name": "grdLayout", "align": "client", "margin": 15, "templateColumns": "1fr 35px 135px 133px", ',
        '"templateRows": "19px 24px 1fr 28px 29px" }</properties>',
        '<jagui-colorquad id="{internalId_clrQuad}" data-class="ColorQuad" class="Control ColorQuad hsl">',
        '<properties>{ "name": "clrQuad", "color": "blue", "format": "hsl", "colorBox": "ColorBox1", "rowSpan": 5, ',
        '"column": 1, "row": 1 }</properties></jagui-colorquad>',
        '<jagui-colorpicker id="{internalId_clrPicker}" data-class="ColorPicker" class="Control ColorPicker">',
        '<properties>{ "name": "clrPicker", "colorQuad": "clrQuad", "color": "blue", "column": 2, "row": 1, "rowSpan": 5 }',
        '</properties></jagui-colorpicker>',
        '<jagui-label id="{internalId_lblCurColor}" data-class="Label" class="Control Label {theme}">',
        '<properties>{ "name": "lblCurColor", "column": 3, "row": 1, "horizAlign": "center" }</properties></jagui-label>',
        '<jagui-label id="{internalId_lblNewColor}" data-class="Label" class="Control Label {theme}">',
        '<properties>{ "name": "lblNewColor", "column": 4, "row": 1, "horizAlign": "center" }</properties></jagui-label>',
        '<jagui-gridlayout>'].join(String.EMPTY);
    core.classes.registerTemplates([
        { Class: ColorDlg, template: WindowTpl.replace('{content}', ColorDlgTpl) }
    ]);
}
//#endregion Template
export { ColorDialog };