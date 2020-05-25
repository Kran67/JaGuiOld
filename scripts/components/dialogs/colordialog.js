//#region Import
import { Window } from '/scripts/components/containers/window.js';
import { CommonDialog } from '/scripts/components/dialogs/commondialog.js';
import { Colors } from '/scripts/core/color.js';
import '/scripts/components/common/button.js';
import '/scripts/components/common/label.js';
import '/scripts/components/common/slider.js';
import '/scripts/components/common/textbox.js';
import '/scripts/components/containers/gridlayout.js';
import '/scripts/components/containers/pagecontrol.js';
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
                props.width = 575;
                props.height = 297;
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
            a = html.split('{internalId_pgeCtrl}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_tabRGB}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_tabHSL}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_tabHSV}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_tabsContent}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_pgeRGB}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_grdLayout_pgeRGB}');
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
            a = html.split('{internalId_pgeHSL}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_grdLayout_pgeHSL}');
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
            a = html.split('{internalId_pgeHSV}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_grdLayout_pgeHSV}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_lblHSVHue}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_slrHSVHue}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_txtbHSVHue}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_lblDeg}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_lblHSVSat}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_slrHVSSat}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_txtbHSVSat}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_lblSatPer}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_lblValue}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_slrValue}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_txtbValue}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_lblLVPer}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_grdLayout_opacity}');
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
                priv.clrBoxCurColor.color.assign(newValue);
                priv.clrPicker.color.assign(newValue);
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
            const color = priv.control.color;
            //#endregion Variables déclaration
            super.loaded();
            if (priv.control) {
                this.clrBoxCurColor.color.assign(color);
                this.clrPicker.color.assign(color);
                this.updateControls(color);
            }
        }
        //#endregion loaded
        //#region updateControls
        updateControls(color) {

        }
        //#endregion updateControls
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
                    control,
                    color: !control ? Colors.RED : control.color
                }
            });
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
let locale = core.locales[core.types.LANGUAGES.FR_FR];
core.locales[core.types.LANGUAGES.FR_FR] = {
    ...locale, ...{
        'colorDlg': 'Choix de la couleur',
        'colorDlg.lblCurColor': 'Couleur actuelle :',
        'colorDlg.lblNewColor': 'Nouvelle couleur :',
        'colorDlg.lblRed': 'Rouge :',
        'colorDlg.lblGreen': 'Vert :',
        'colorDlg.lblBlue': 'Bleu :',
        'colorDlg.lblHue': 'Hue :',
        'colorDlg.lblSat': 'Saturation :',
        'colorDlg.lblLight': 'Luminosité :',
        'colorDlg.lblHSVHue': 'Hue :',
        'colorDlg.lblHSVSat': 'Saturation :',
        'colorDlg.lblValue': 'Valeur :',
        'colorDlg.lblOpacity': 'Opacité :'
    }
};
locale = core.locales[core.types.LANGUAGES.EN_US];
core.locales[core.types.LANGUAGES.EN_US] = {
    ...locale, ...{
        'colorDlg': 'Color choice',
        'colorDlg.lblCurColor': 'Current color :',
        'colorDlg.lblNewColor': 'New color :',
        'colorDlg.lblRed': 'Red :',
        'colorDlg.lblGreen': 'Green :',
        'colorDlg.lblBlue': 'Blue :',
        'colorDlg.lblHue': 'Hue :',
        'colorDlg.lblSat': 'Saturate :',
        'colorDlg.lblLight': 'Light :',
        'colorDlg.lblHSVHue': 'Hue :',
        'colorDlg.lblHSVSat': 'Saturate :',
        'colorDlg.lblValue': 'Value :',
        'colorDlg.lblOpacity': 'Opacity :'
    }
};
//#endregion I18n
//#region Template
if (core.isHTMLRenderer) {
    const WindowTpl = core.classes.getTemplate(core.classes.Window.name);
    const ColorDlgTpl = ['<jagui-gridlayout id="{internalId_grdLayout}" data-class="GridLayout" class="Control GridLayout">',
            '<properties>{ "name": "grdLayout", "align": "client", "margin": 15, "templateColumns": "234px 35px 135px 103px 30px", ',
            '"templateRows": "20px 24px 38px 25px 26px 44px 28px 29px", "columnGap": 0, "rowGap": 0 }</properties>',
        '<jagui-colorquad id="{internalId_clrQuad}" data-class="ColorQuad" class="Control ColorQuad hsl">',
            '<properties>{ "name": "clrQuad", "color": "blue", "format": "hsl", "rowSpan": 8, ',
            '"column": 1, "row": 1, "width": 234, "height": 234, "colorBox": "clrBoxNewColor", "preserveColorAlpha": true }</properties></jagui-colorquad>',
        '<jagui-colorpicker id="{internalId_clrPicker}" data-class="ColorPicker" class="Control ColorPicker">',
            '<properties>{ "name": "clrPicker", "colorQuad": "clrQuad", "color": "blue", "column": 2, "row": 1, "rowSpan": 8, "margin": { "left": 8, "right": 8 } }',
            '</properties></jagui-colorpicker>',
        '<jagui-label id="{internalId_lblCurColor}" data-class="Label" class="Control Label {theme}">',
            '<properties>{ "name": "lblCurColor", "column": 3, "row": 1, "horizAlign": "center", "vertAlign": "bottom" }</properties></jagui-label>',
        '<jagui-label id="{internalId_lblNewColor}" data-class="Label" class="Control Label {theme}">',
            '<properties>{ "name": "lblNewColor", "column": 4, "row": 1, "horizAlign": "center", "vertAlign": "bottom", "colSpan": 2 }</properties></jagui-label>',
        '<jagui-colorbox id="{internalId_clrBoxCurColor}" data-class="ColorBox" class="Control ColorBox"><properties>{ "name": "clrBoxCurColor", "column": 3, "row": 2, "margin": { "left": 5, "right": 5 } }</properties></jagui-colorbox>',
        '<jagui-colorbox id="{internalId_clrBoxNewColor}" data-class="ColorBox" class="Control ColorBox"><properties>{ "name": "clrBoxNewColor", "column": 4, "row": 2, "colSpan": 2, "margin": { "left": 5, "right": 5 } }</properties></jagui-colorbox>',
        '<jagui-pagecontrol id="{internalId_pgeCtrl}" data-class="PageControl" class="Control TabControl PageControl {theme}">',
            '<properties>{ "name": "pgeCtrl", "activeTab": "tabRGB", "column": 3, "row": 3, "colSpan": 3, "margin": 7, "centerTabs": true, "rowSpan": 4 }</properties>',
        '<jagui-tabcontrolheader class="Control TabControlHeader {theme}">',
        '<jagui-tabscontainer class="Control TabsContainer {theme}">',
        '<jagui-tabsheet id="{internalId_tabRGB}" data-class="TabSheet" data-name="tabRGB" class="Control Tab TabSheet selected {theme}">RGB</jagui-tabsheet>',
        '<jagui-tabsheet id="{internalId_tabHSL}" data-class="TabSheet" data-name="tabHSL" class="Control Tab TabSheet {theme}">HSL</jagui-tabsheet>',
        '<jagui-tabsheet id="{internalId_tabHSV}" data-class="TabSheet" data-name="tabHSV" class="Control Tab TabSheet {theme}">HSV</jagui-tabsheet>',
        '</jagui-tabscontainer></jagui-tabcontrolheader>',
        '<jagui-tabscontent id="{internalId_tabsContent}" data-class="Layout" class="Control TabsContent PagesContent {theme}">',
            '<properties>{ "name": "TabContent", "inForm": false, "margin": { "top": -8 } }</properties>',
        '<jagui-pagecontent id="{internalId_pgeRGB}" data-class="PageContent" class="Control PageContent {theme}">',
            '<properties>{ "name": "pgeRGB", "inForm": false, "tab": "tabRGB", "align": "client" }</properties>',
        '<jagui-gridlayout id="{internalId_grdLayout_pgeRGB}" data-class="GridLayout" class="Control GridLayout">',
            '<properties>{ "name": "grdLayout_pgeRGB", "align": "client", "margin": { "left": 12, "top": 14, "right": 22, "bottom": 14 }, "templateColumns": "68px 120px 30px", ',
            '"templateRows": "23px 23px 23px", "columnGap": 0, "rowGap": 3 }</properties>',
        '<jagui-label id="{internalId_lblRed}" data-class="Label" class="Control Label {theme}">',
            '<properties>{ "name": "lblRed", "vertAlign": "middle" }</properties></jagui-label>',
        '<jagui-slider id="{internalId_slrRed}" data-class="Slider" class="Control Slider {theme}"><properties>{"name": "slrRed", "values": [0,0], "max": 255, "margin": { "left": 15, "right": 15 }, "dataBindings": [{ "property": "firstValue", "destination": { "component": "txtbRed", "property": "text", "converter": "intToStr" } }, { "property": "firstValue", "destination": { "component": "clrBoxNewColor", "property": "color.red" } }] }</properties></jagui-slider>',
        '<jagui-textbox id="{internalId_txtbRed}" data-class="TextBox" class="Control TextBox {theme}"><properties>{ "name": "txtbRed", "readOnly": true, "text": "0" }</properties></jagui-textbox>',
        '<jagui-label id="{internalId_lblGreen}" data-class="Label" class="Control Label {theme}">',
            '<properties>{ "name": "lblGreen", "vertAlign": "middle" }</properties></jagui-label>',
        '<jagui-slider id="{internalId_slrGreen}" data-class="Slider" class="Control Slider {theme}"><properties>{"name": "slrGreen", "values": [0,0], "max": 255, "margin": { "left": 15, "right": 15 }, "dataBindings": [{ "property": "firstValue", "destination": { "component": "txtbGreen", "property": "text", "converter": "intToStr" } }] }</properties></jagui-slider>',
        '<jagui-textbox id="{internalId_txtbGreen}" data-class="TextBox" class="Control TextBox {theme}"><properties>{ "name": "txtbGreen", "readOnly": true, "text": "0" }</properties></jagui-textbox>',
        '<jagui-label id="{internalId_lblBlue}" data-class="Label" class="Control Label {theme}">',
            '<properties>{ "name": "lblBlue", "vertAlign": "middle" }</properties></jagui-label>',
        '<jagui-slider id="{internalId_slrBlue}" data-class="Slider" class="Control Slider {theme}"><properties>{"name": "slrBlue", "values": [0,0], "max": 255, "margin": { "left": 15, "right": 15 }, "dataBindings": [{ "property": "firstValue", "destination": { "component": "txtbBlue", "property": "text", "converter": "intToStr" } }] }</properties></jagui-slider>',
        '<jagui-textbox id="{internalId_txtbBlue}" data-class="TextBox" class="Control TextBox {theme}"><properties>{ "name": "txtbBlue", "readOnly": true, "text": "0" }</properties></jagui-textbox>',
        '</jagui-gridlayout>',
        '</jagui-pagecontent>',
        '<jagui-pagecontent id="{internalId_pgeHSL}" data-class="PageContent" class="Control PageContent {theme}">',
            '<properties>{ "name": "pgeHSL", "inForm": false, "tab": "tabHSL", "align": "client" }</properties>',
        '<jagui-gridlayout id="{internalId_grdLayout_pgeHSL}" data-class="GridLayout" class="Control GridLayout">',
            '<properties>{ "name": "grdLayout_pgeHSL", "align": "client", "margin": { "left": 12, "top": 14, "right": 12, "bottom": 14 }, "templateColumns": "68px 120px 30px 10px", ',
            '"templateRows": "23px 23px 23px", "columnGap": 0, "rowGap": 3 }</properties>',
        '<jagui-label id="{internalId_lblHue}" data-class="Label" class="Control Label {theme}">',
            '<properties>{ "name": "lblHue", "vertAlign": "middle" }</properties></jagui-label>',
        '<jagui-slider id="{internalId_slrHue}" data-class="Slider" class="Control Slider {theme}"><properties>{"name": "slrHue", "values": [0,0], "max": 359, "margin": { "left": 15, "right": 15 }, "dataBindings": [{ "property": "firstValue", "destination": { "component": "txtbHue", "property": "text", "converter": "intToStr" } }] }</properties></jagui-slider>',
        '<jagui-textbox id="{internalId_txtbHue}" data-class="TextBox" class="Control TextBox {theme}"><properties>{ "name": "txtbHue", "readOnly": true }</properties></jagui-textbox>',
        '<jagui-label id="{internalId_lblSat}" data-class="Label" class="Control Label {theme}">',
            '<properties>{ "name": "lblSat", "vertAlign": "middle", "column": 1, "row": 2 }</properties></jagui-label>',
        '<jagui-slider id="{internalId_slrSat}" data-class="Slider" class="Control Slider {theme}"><properties>{"name": "slrSat", "values": [0,0], "max": 100, "column": 2, "row": 2, "margin": { "left": 15, "right": 15 }, "dataBindings": [{ "property": "firstValue", "destination": { "component": "txtbSat", "property": "text", "converter": "intToStr" } }] }</properties></jagui-slider>',
        '<jagui-textbox id="{internalId_txtbSat}" data-class="TextBox" class="Control TextBox {theme}"><properties>{ "name": "txtbSat", "readOnly": true, "column": 3, "row": 2 }</properties></jagui-textbox>',
        '<jagui-label id="{internalId_lblLight}" data-class="Label" class="Control Label {theme}">',
            '<properties>{ "name": "lblLight", "vertAlign": "middle", "column": 1, "row": 3 }</properties></jagui-label>',
        '<jagui-slider id="{internalId_slrLight}" data-class="Slider" class="Control Slider {theme}"><properties>{"name": "slrLight", "values": [0,0], "column": 2, "row": 3, "max": 100, "margin": { "left": 15, "right": 15 }, "dataBindings": [{ "property": "firstValue", "destination": { "component": "txtbLight", "property": "text", "converter": "intToStr" } }] }</properties></jagui-slider>',
        '<jagui-textbox id="{internalId_txtbLight}" data-class="TextBox" class="Control TextBox {theme}"><properties>{ "name": "txtbLight", "readOnly": true, "column": 3, "row": 3 }</properties></jagui-textbox>',
        '</jagui-gridlayout>',
        '</jagui-pagecontent>',
        '<jagui-pagecontent id="{internalId_pgeHSV}" data-class="PageContent" class="Control PageContent {theme}">',
            '<properties>{ "name": "pgeHSV", "inForm": false, "tab": "tabHSV", "align": "client" }</properties>',
        '<jagui-gridlayout id="{internalId_grdLayout_pgeHSV}" data-class="GridLayout" class="Control GridLayout">',
            '<properties>{ "name": "grdLayout_pgeHSV", "align": "client", "margin": { "left": 12, "top": 14, "right": 12, "bottom": 14 }, "templateColumns": "68px 120px 30px 10px", ',
            '"templateRows": "23px 23px 23px", "columnGap": 0, "rowGap": 3 }</properties>',
        '<jagui-label id="{internalId_lblHSVHue}" data-class="Label" class="Control Label {theme}">',
            '<properties>{ "name": "lblHSVHue", "vertAlign": "middle" }</properties></jagui-label>',
        '<jagui-slider id="{internalId_slrHSVHue}" data-class="Slider" class="Control Slider {theme}"><properties>{"name": "slrHSVHue", "values": [0,0], "max": 359, "margin": { "left": 15, "right": 15 }, "dataBindings": [{ "property": "firstValue", "destination": { "component": "txtbHSVHue", "property": "text", "converter": "intToStr" } }] }</properties></jagui-slider>',
        '<jagui-textbox id="{internalId_txtbHSVHue}" data-class="TextBox" class="Control TextBox {theme}"><properties>{ "name": "txtbHSVHue", "readOnly": true }</properties></jagui-textbox>',
        '<jagui-label id="{internalId_lblHSVSat}" data-class="Label" class="Control Label {theme}">',
            '<properties>{ "name": "lblHSVSat", "vertAlign": "middle", "column": 1, "row": 2 }</properties></jagui-label>',
        '<jagui-slider id="{internalId_slrHSVSat}" data-class="Slider" class="Control Slider {theme}"><properties>{"name": "slrHSVSat", "values": [0,0], "max": 100, "margin": { "left": 15, "right": 15 }, "column": 2, "row": 2, "dataBindings": [{ "property": "firstValue", "destination": { "component": "txtbHSVSat", "property": "text", "converter": "intToStr" } }] }</properties></jagui-slider>',
        '<jagui-textbox id="{internalId_txtbHSVSat}" data-class="TextBox" class="Control TextBox {theme}"><properties>{ "name": "txtbHSVSat", "readOnly": true, "column": 3, "row": 2 }</properties></jagui-textbox>',
        '<jagui-label id="{internalId_lblValue}" data-class="Label" class="Control Label {theme}">',
            '<properties>{ "name": "lblValue", "vertAlign": "middle", "column": 1, "row": 3 }</properties></jagui-label>',
        '<jagui-slider id="{internalId_slrValue}" data-class="Slider" class="Control Slider {theme}"><properties>{"name": "slrValue", "values": [0,0], "max": 100, "column": 2, "row": 3, "margin": { "left": 15, "right": 15 }, "dataBindings": [{ "property": "firstValue", "destination": { "component": "txtbValue", "property": "text", "converter": "intToStr" } }] }</properties></jagui-slider>',
        '<jagui-textbox id="{internalId_txtbValue}" data-class="TextBox" class="Control TextBox {theme}"><properties>{ "name": "txtbValue", "readOnly": true, "column": 3, "row": 3 }</properties></jagui-textbox>',
        '</jagui-gridlayout>',
        '</jagui-pagecontent>',
        '</jagui-tabscontent></jagui-pagecontrol>',
        '<jagui-label id="{internalId_lblDeg}" data-class="Label" class="Control Label {theme}">',
            '<properties>{ "name": "lblDeg", "caption": "°", "column": 5, "row": 4, "margin": { "left": 3 } }</properties></jagui-label>',
        '<jagui-label id="{internalId_lblSatPer}" data-class="Label" class="Control Label {theme}">',
            '<properties>{ "name": "lblSatPer", "caption": "%", "column": 5, "row": 5, "margin": { "left": 3 } }</properties></jagui-label>',
        '<jagui-label id="{internalId_lblLVPer}" data-class="Label" class="Control Label {theme}">',
            '<properties>{ "name": "lblLVPer", "caption": "%", "column": 5, "row": 6, "margin": { "left": 3 } }</properties></jagui-label>',
        '<jagui-gridlayout id="{internalId_grdLayout_opacity}" data-class="GridLayout" class="Control GridLayout">',
            '<properties>{ "name": "grdLayout_opacity", "margin": { "left": 20, "top": 3, "right": 20, "bottom": 2 }, "templateColumns": "68px 120px 30px 10px", ',
            '"templateRows": "23px", "columnGap": 0, "rowGap": 0, "column": 3, "row": 7, "colSpan": 3 }</properties>',
        '<jagui-label id="{internalId_lblOpacity}" data-class="Label" class="Control Label {theme}">',
            '<properties>{ "name": "lblOpacity", "vertAlign": "middle" }</properties></jagui-label>',
        '<jagui-alphaslider id="{internalId_slrOpacity}" data-class="AlphaSlider" class="Control Slider AlphaSlider {theme}"><properties>{"name": "slrOpacity", "values": [1,0], "margin": { "left": 15, "right": 15 }, "column": 2, "row": 1, "dataBindings": [{ "property": "firstValue", "destination": { "component": "txtbOpacity", "property": "text", "expressions": [{ "script": "return int(args.value * 100).toString()", "params": "value", "needReturn": true }] } }, { "property": "firstValue", "destination": { "component": "clrBoxNewColor", "property": "color", "expressions": [{ "script": "core.tools.changeAlpha(args)" }] } }] }</properties></jagui-alphaslider>',
        '<jagui-textbox id="{internalId_txtbOpacity}" data-class="TextBox" class="Control TextBox {theme}"><properties>{ "name": "txtbOpacity", "readOnly": true, "column": 3, "row": 1 }</properties></jagui-textbox>',
        '<jagui-label id="{internalId_lblOpacityPer}" data-class="Label" class="Control Label {theme}">',
            '<properties>{ "name": "lblOpacityPer", "column": 4, "row": 1, "caption": "%", "margin": { "left": 3 }, "padding": { "top": 3} }</properties></jagui-label>',
        '</jagui-gridlayout>',
        '<jagui-gridlayout id="{internalId_grdLayout_footer}" data-class="GridLayout" class="Control GridLayout">',
            '<properties>{ "name": "grdLayout_footer", "templateColumns": "98px 18px 71px 10px 71px", ',
            '"templateRows": "29px", "columnGap": 0, "rowGap": 0, "column": 3, "row": 8, "colSpan": 3 }</properties>',
        '<jagui-textbox id="{txtbHex}" data-class="TextBox" class="Control TextBox {theme}"><properties>{ "name": "txtbHex", "margin": { "left": 7, "top": 3, "right": 42, "bottom": 2 } }</properties></jagui-textbox>',
        '<jagui-button id="{internalId_btnOk}" data-class="Button" class="Control Button {theme}"><properties>{ "name": "btnOk", "modalResult": "ok", "column": 3, "margin": { "top": 4, "bottom": 4 }, "translationKey": "constantMessages.okButton" }</properties></jagui-button>',
        '<jagui-button id="{internalId_btnCancel}" data-class="Button" class="Control Button {theme}"><properties>{ "name": "btnCancel", "modalResult": "cancel", "column": 5, "margin": { "top": 4, "bottom": 4 }, "translationKey": "constantMessages.cancelButton" }</properties></jagui-button>',
        '</jagui-gridlayout>',
        '<jagui-gridlayout>'].join(String.EMPTY);
    core.classes.registerTemplates([
        { Class: ColorDlg, template: WindowTpl.replace('{content}', ColorDlgTpl).replace('{appName}', 'ColorDlg') }
    ]);
}
//#endregion Template
export { ColorDialog };