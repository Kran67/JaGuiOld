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
            core.private(this, {
                control: props.hasOwnProperty('control') ? props.control : null
            });
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region color
    set color(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
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
        const priv = core.private(this);
        const color = priv.control.color;
        //#endregion Variables déclaration
        super.loaded();
        if (priv.control) {
            this.clrBoxCurColor.color.assign(color);
            this.clrPicker.color.assign(color);
            this.txtbHex.btns.first.onClick.addListener(this.txtbHexBtn_click);
            this.txtbHex.btns.first.mode = 'rgbh';
            this.updateControls(color);
        }
    }
    //#endregion loaded
    //#region slider_change
    slider_change() {
        //#region Variables déclaration
        const form = this.form;
        const c = new core.classes.Color(form.clrBoxNewColor.fillColor);
        //#endregion Variables déclaration
        this === form.slrRed && (c.red = this.firstValue);
        this === form.slrGreen && (c.green = this.firstValue);
        this === form.slrBlue && (c.blue = this.firstValue);
        (this === form.slrHue || this === form.slrHSVHue) && (c.hue = this.firstValue);
        (this === form.slrSat || this === form.slrHSVSat) && (c.saturation = this.firstValue);
        this === form.slrLight && (c.lightness = this.firstValue);
        this === form.slrValue && (c.value = this.firstValue);
        form.updateControls(c);
    }
    //#endregion slider_change
    //#region pgeCtrl_change
    pgeCtrl_change() {
        //#region Variables déclaration
        const COLORFORMATS = core.types.COLORFORMATS;
        const form = this.form;
        const clrQuad = form.clrQuad;
        const c = new core.classes.Color(form.clrBoxNewColor.fillColor);
        //#endregion Variables déclaration
        clrQuad.format = this.activeTabIndex > 1 ? COLORFORMATS.HSV : COLORFORMATS.HSL;
        this.activeTabIndex === 1 && c.RGBtoHSL();
        this.activeTabIndex === 2 && c.RGBtoHSV();
        form.updateControls(c, !0);
    }
    //#endregion pgeCtrl_change
    //#region clrQuad_change
    clrQuad_change() {
        //#region Variables déclaration
        const form = this.form;
        const funcs = {
            'argbh': 'toARGBHexString',
            'rgb': 'toRGBString',
            'rgba': 'toRGBAString',
            'hsl': 'toHSLString',
            'hsl': 'toHSLString',
            'hsv': 'toHSVString'
        };
        let func;
        //#endregion Variables déclaration
        if (!form.creating && !form.loading) {
            func = funcs[form.txtbHex.btns.first.mode] ? funcs[form.txtbHex.btns.first.mode] : 'toRGBHexString';
            form.txtbHex.text = form.clrBoxNewColor.fillColor[func]();
            form.updateControls(this.color, !0);
        }
    }
    //#endregion clrQuad_change
    //#region txtbHex_click
    txtbHexBtn_click() {
        //#region Variables déclaration
        const modes = {
            'rgbh': 'argbh',
            'argbh': 'rgb',
            'rgb': 'rgba',
            'rgba': 'hsl',
            'hsl': 'hsv',
            'hsv': 'rgbh'
        };
        //#endregion Variables déclaration
        this.mode = modes[this.mode];
        this.form.clrQuad.onChange.invoke();
    }
    //#endregion txtbHex_click
    //#region updateControls
    updateControls(color, updateSliders) {
        this.clrBoxNewColor.fillColor = color;
        this.clrPicker._updating();
        this.clrPicker.color = color;
        this.clrPicker.updated();
        this.clrQuad._updating();
        this.clrQuad.color = color;
        this.clrQuad.updated();
        updateSliders && this.updateSliders(color);
    }
    //#endregion updateControls
    //#region updateSliders
    updateSliders(color) {
        //#region Variables déclaration
        const pageIdx = this.pgeCtrl.activeTabIndex;
        const tabs = ['RGB', 'HSL', 'HSV'];
        //#endregion Variables déclaration
        this[`update${tabs[pageIdx]}Tab`](color);
        //this.txtbHex.setFocus();
    }
    //#endregion updateSliders
    //#region updateRGBTab
    updateRGBTab(color) {
        ['Red', 'Green', 'Blue'].forEach(item => {
            const silderName = `slr${item}`;
            this[silderName]._updating();
            this[silderName].values = [color[item.toLowerCase()], 0];
            this[silderName].updated();
        });
    }
    //#endregion updateRGBTab
    //#region updateHSLTab
    updateHSLTab(color) {
        const cor = ['hue', 'saturation', 'lightness'];
        ['Hue', 'Sat', 'Light'].forEach((item, idx) => {
            const silderName = `slr${item}`;
            this[silderName]._updating();
            this[silderName].values = [color[cor[idx]], 0];
            this[silderName].updated();
        });
    }
    //#endregion updateHSLTab
    //#region updateHSVTab
    updateHSVTab(color) {
        this.slrHSVHue._updating();
        this.slrHSVHue.values = [color.hue, 0];
        this.slrHSVHue.updated();
        this.slrHSVSat._updating();
        this.slrHSVSat.values = [color.saturation, 0];
        this.slrHSVSat.updated();
        this.slrValue._updating();
        this.slrValue.values = [color.value, 0];
        this.slrValue.updated();
    }
    //#endregion updateHSVTab
    //#endregion Methods
}
//#endregion ColorDlg
//#region class ColorDialog
class ColorDialog extends CommonDialog {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            core.private(this, {
                control: null
            });
        }
    }
    //#endregion constructor
    //#region Methods
    //#region loaded
    execute(control, callback) {
        //#region Variables déclaration
        const priv = core.private(this);
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
        callback && dlg.onClose.addListener(callback);
        super.execute();
        dlg.showModal();
    }
    //#endregion loaded
    //#endregion Methods
}
//#endregion ColorDialog
core.classes.register(core.types.CATEGORIES.INTERNAL, ColorDlg);
core.classes.register(core.types.CATEGORIES.DIALOGS, ColorDialog);
//#region I18n
core.locales.addLocaleKeyValues(core.types.LANGUAGES.FR_FR, !1, {
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
});
core.locales.addLocaleKeyValues(core.types.LANGUAGES.EN_US, !1, {
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
});
//#endregion I18n
//#region Template
if (core.isHTMLRenderer) {
    const WindowTpl = core.classes.getTemplate(core.classes.Window.name);
    const ColorDlgTpl = ['<jagui-gridlayout id="{internalId}" data-class="GridLayout" class="Control GridLayout">',
        '<properties>{ "name": "grdLayout", "align": "client", "margin": 15, "templateColumns": "234px 35px 135px 103px 30px", ',
        '"templateRows": "20px 24px 38px 25px 26px 44px 28px 29px", "columnGap": 0, "rowGap": 0 }</properties>',
        '<jagui-colorquad id="{internalId}" data-class="ColorQuad" class="Control ColorQuad">',
        '<properties>{ "name": "clrQuad", "color": "blue", "format": "hsl", "rowSpan": 8, ',
        '"column": 1, "row": 1, "width": 234, "height": 234, "onChange": "clrQuad_change" }</properties></jagui-colorquad>',
        '<jagui-colorpicker id="{internalId}" data-class="ColorPicker" class="Control ColorPicker">',
        '<properties>{ "name": "clrPicker", "colorQuad": "clrQuad", "color": "blue", "column": 2, "row": 1, "rowSpan": 8, "margin": { "left": 8, "right": 8 } }',
        '</properties></jagui-colorpicker>',
        '<jagui-label id="{internalId}" data-class="Label" class="Control Label {theme}">',
        '<properties>{ "name": "lblCurColor", "column": 3, "row": 1, "horizAlign": "center", "vertAlign": "bottom" }</properties></jagui-label>',
        '<jagui-label id="{internalId}" data-class="Label" class="Control Label {theme}">',
        '<properties>{ "name": "lblNewColor", "column": 4, "row": 1, "horizAlign": "center", "vertAlign": "bottom", "colSpan": 2 }</properties></jagui-label>',
        '<jagui-colorbox id="{internalId}" data-class="ColorBox" class="Control ColorBox"><properties>{ "name": "clrBoxCurColor", "column": 3, "row": 2, "margin": { "left": 5, "right": 5 } }</properties></jagui-colorbox>',
        '<jagui-colorbox id="{internalId}" data-class="ColorBox" class="Control ColorBox"><properties>{ "name": "clrBoxNewColor", "column": 4, "row": 2, "colSpan": 2, "margin": { "left": 5, "right": 5 } }</properties></jagui-colorbox>',
        '<jagui-pagecontrol id="{internalId}" data-class="PageControl" class="Control TabControl PageControl {theme}">',
        '<properties>{ "name": "pgeCtrl", "activeTab": "tabRGB", "column": 3, "row": 3, "colSpan": 3, "margin": 7, "centerTabs": true, "rowSpan": 4, "dataBindings": [{ "property": "activeTab", "destination": { "component": "lblDeg", "property": "visible", "expressions": [{ "script": "return args.obj.activeTabIndex > 0;" }] } },{ "property": "activeTab", "destination": { "component": "lblSatPer", "property": "visible", "expressions": [{ "script": "return args.obj.activeTabIndex > 0;" }] } },{ "property": "activeTab", "destination": { "component": "lblLVPer", "property": "visible", "expressions": [{ "script": "return args.obj.activeTabIndex > 0;" }] } }], "onChange": "pgeCtrl_change" }</properties>',
        '<jagui-tabcontrolheader class="Control TabControlHeader {theme}">',
        '<jagui-tabscontainer class="Control TabsContainer {theme}">',
        '<jagui-tabsheet id="{internalId}" data-class="TabSheet" data-name="tabRGB" class="Control Tab TabSheet selected {theme}">RGB</jagui-tabsheet>',
        '<jagui-tabsheet id="{internalId}" data-class="TabSheet" data-name="tabHSL" class="Control Tab TabSheet {theme}">HSL</jagui-tabsheet>',
        '<jagui-tabsheet id="{internalId}" data-class="TabSheet" data-name="tabHSV" class="Control Tab TabSheet {theme}">HSV</jagui-tabsheet>',
        '</jagui-tabscontainer></jagui-tabcontrolheader>',
        '<jagui-tabscontent id="{internalId}" data-class="Layout" class="Control TabsContent PagesContent {theme}">',
        '<properties>{ "name": "TabContent", "inForm": false, "margin": { "top": -8 } }</properties>',
        '<jagui-pagecontent id="{internalId}" data-class="PageContent" class="Control PageContent {theme}">',
        '<properties>{ "name": "pgeRGB", "inForm": false, "tab": "tabRGB", "align": "client" }</properties>',
        '<jagui-gridlayout id="{internalId}" data-class="GridLayout" class="Control GridLayout">',
        '<properties>{ "name": "grdLayout_pgeRGB", "align": "client", "margin": { "left": 12, "top": 14, "right": 22, "bottom": 14 }, "templateColumns": "68px 120px 30px", ',
        '"templateRows": "23px 23px 23px", "columnGap": 0, "rowGap": 3 }</properties>',
        '<jagui-label id="{internalId}" data-class="Label" class="Control Label {theme}">',
        '<properties>{ "name": "lblRed", "vertAlign": "middle" }</properties></jagui-label>',
        '<jagui-slider id="{internalId}" data-class="Slider" class="Control Slider {theme}"><properties>{"name": "slrRed", "values": [0,0], "max": 255, "margin": { "left": 15, "right": 15 }, "dataBindings": [{ "property": "firstValue", "destination": { "component": "txtbRed", "property": "text", "converter": "intToStr" } }], "onChange": "slider_change" }</properties></jagui-slider>',
        '<jagui-textbox id="{internalId}" data-class="TextBox" class="Control TextBox {theme}"><properties>{ "name": "txtbRed", "readOnly": true, "text": "0" }</properties></jagui-textbox>',
        '<jagui-label id="{internalId}" data-class="Label" class="Control Label {theme}">',
        '<properties>{ "name": "lblGreen", "vertAlign": "middle" }</properties></jagui-label>',
        '<jagui-slider id="{internalId}" data-class="Slider" class="Control Slider {theme}"><properties>{"name": "slrGreen", "values": [0,0], "max": 255, "margin": { "left": 15, "right": 15 }, "dataBindings": [{ "property": "firstValue", "destination": { "component": "txtbGreen", "property": "text", "converter": "intToStr" } }], "onChange": "slider_change" }</properties></jagui-slider>',
        '<jagui-textbox id="{internalId}" data-class="TextBox" class="Control TextBox {theme}"><properties>{ "name": "txtbGreen", "readOnly": true, "text": "0" }</properties></jagui-textbox>',
        '<jagui-label id="{internalId}" data-class="Label" class="Control Label {theme}">',
        '<properties>{ "name": "lblBlue", "vertAlign": "middle" }</properties></jagui-label>',
        '<jagui-slider id="{internalId}" data-class="Slider" class="Control Slider {theme}"><properties>{"name": "slrBlue", "values": [0,0], "max": 255, "margin": { "left": 15, "right": 15 }, "dataBindings": [{ "property": "firstValue", "destination": { "component": "txtbBlue", "property": "text", "converter": "intToStr" } }], "onChange": "slider_change" }</properties></jagui-slider>',
        '<jagui-textbox id="{internalId}" data-class="TextBox" class="Control TextBox {theme}"><properties>{ "name": "txtbBlue", "readOnly": true, "text": "0" }</properties></jagui-textbox>',
        '</jagui-gridlayout>',
        '</jagui-pagecontent>',
        '<jagui-pagecontent id="{internalId}" data-class="PageContent" class="Control PageContent {theme}">',
        '<properties>{ "name": "pgeHSL", "inForm": false, "tab": "tabHSL", "align": "client" }</properties>',
        '<jagui-gridlayout id="{internalId}" data-class="GridLayout" class="Control GridLayout">',
        '<properties>{ "name": "grdLayout_pgeHSL", "align": "client", "margin": { "left": 12, "top": 14, "right": 12, "bottom": 14 }, "templateColumns": "68px 120px 30px 10px", ',
        '"templateRows": "23px 23px 23px", "columnGap": 0, "rowGap": 3 }</properties>',
        '<jagui-label id="{internalId}" data-class="Label" class="Control Label {theme}">',
        '<properties>{ "name": "lblHue", "vertAlign": "middle" }</properties></jagui-label>',
        '<jagui-slider id="{internalId}" data-class="Slider" class="Control Slider {theme}"><properties>{"name": "slrHue", "values": [0,0], "max": 359, "margin": { "left": 15, "right": 15 }, "dataBindings": [{ "property": "firstValue", "destination": { "component": "txtbHue", "property": "text", "converter": "intToStr" } }], "onChange": "slider_change" }</properties></jagui-slider>',
        '<jagui-textbox id="{internalId}" data-class="TextBox" class="Control TextBox {theme}"><properties>{ "name": "txtbHue", "readOnly": true }</properties></jagui-textbox>',
        '<jagui-label id="{internalId}" data-class="Label" class="Control Label {theme}">',
        '<properties>{ "name": "lblSat", "vertAlign": "middle", "column": 1, "row": 2 }</properties></jagui-label>',
        '<jagui-slider id="{internalId}" data-class="Slider" class="Control Slider {theme}"><properties>{"name": "slrSat", "values": [0,0], "max": 100, "column": 2, "row": 2, "margin": { "left": 15, "right": 15 }, "dataBindings": [{ "property": "firstValue", "destination": { "component": "txtbSat", "property": "text", "converter": "intToStr" } }], "onChange": "slider_change" }</properties></jagui-slider>',
        '<jagui-textbox id="{internalId}" data-class="TextBox" class="Control TextBox {theme}"><properties>{ "name": "txtbSat", "readOnly": true, "column": 3, "row": 2 }</properties></jagui-textbox>',
        '<jagui-label id="{internalId}" data-class="Label" class="Control Label {theme}">',
        '<properties>{ "name": "lblLight", "vertAlign": "middle", "column": 1, "row": 3 }</properties></jagui-label>',
        '<jagui-slider id="{internalId}" data-class="Slider" class="Control Slider {theme}"><properties>{"name": "slrLight", "values": [0,0], "column": 2, "row": 3, "max": 100, "margin": { "left": 15, "right": 15 }, "dataBindings": [{ "property": "firstValue", "destination": { "component": "txtbLight", "property": "text", "converter": "intToStr" } }], "onChange": "slider_change" }</properties></jagui-slider>',
        '<jagui-textbox id="{internalId}" data-class="TextBox" class="Control TextBox {theme}"><properties>{ "name": "txtbLight", "readOnly": true, "column": 3, "row": 3 }</properties></jagui-textbox>',
        '</jagui-gridlayout>',
        '</jagui-pagecontent>',
        '<jagui-pagecontent id="{internalId}" data-class="PageContent" class="Control PageContent {theme}">',
        '<properties>{ "name": "pgeHSV", "inForm": false, "tab": "tabHSV", "align": "client" }</properties>',
        '<jagui-gridlayout id="{internalId}" data-class="GridLayout" class="Control GridLayout">',
        '<properties>{ "name": "grdLayout_pgeHSV", "align": "client", "margin": { "left": 12, "top": 14, "right": 12, "bottom": 14 }, "templateColumns": "68px 120px 30px 10px", ',
        '"templateRows": "23px 23px 23px", "columnGap": 0, "rowGap": 3 }</properties>',
        '<jagui-label id="{internalId}" data-class="Label" class="Control Label {theme}">',
        '<properties>{ "name": "lblHSVHue", "vertAlign": "middle" }</properties></jagui-label>',
        '<jagui-slider id="{internalId}" data-class="Slider" class="Control Slider {theme}"><properties>{"name": "slrHSVHue", "values": [0,0], "max": 359, "margin": { "left": 15, "right": 15 }, "dataBindings": [{ "property": "firstValue", "destination": { "component": "txtbHSVHue", "property": "text", "converter": "intToStr" } }], "onChange": "slider_change" }</properties></jagui-slider>',
        '<jagui-textbox id="{internalId}" data-class="TextBox" class="Control TextBox {theme}"><properties>{ "name": "txtbHSVHue", "readOnly": true }</properties></jagui-textbox>',
        '<jagui-label id="{internalId}" data-class="Label" class="Control Label {theme}">',
        '<properties>{ "name": "lblHSVSat", "vertAlign": "middle", "column": 1, "row": 2 }</properties></jagui-label>',
        '<jagui-slider id="{internalId}" data-class="Slider" class="Control Slider {theme}"><properties>{"name": "slrHSVSat", "values": [0,0], "max": 100, "margin": { "left": 15, "right": 15 }, "column": 2, "row": 2, "dataBindings": [{ "property": "firstValue", "destination": { "component": "txtbHSVSat", "property": "text", "converter": "intToStr" } }], "onChange": "slider_change" }</properties></jagui-slider>',
        '<jagui-textbox id="{internalId}" data-class="TextBox" class="Control TextBox {theme}"><properties>{ "name": "txtbHSVSat", "readOnly": true, "column": 3, "row": 2 }</properties></jagui-textbox>',
        '<jagui-label id="{internalId}" data-class="Label" class="Control Label {theme}">',
        '<properties>{ "name": "lblValue", "vertAlign": "middle", "column": 1, "row": 3 }</properties></jagui-label>',
        '<jagui-slider id="{internalId}" data-class="Slider" class="Control Slider {theme}"><properties>{"name": "slrValue", "values": [0,0], "max": 100, "column": 2, "row": 3, "margin": { "left": 15, "right": 15 }, "dataBindings": [{ "property": "firstValue", "destination": { "component": "txtbValue", "property": "text", "converter": "intToStr" } }], "onChange": "slider_change" }</properties></jagui-slider>',
        '<jagui-textbox id="{internalId}" data-class="TextBox" class="Control TextBox {theme}"><properties>{ "name": "txtbValue", "readOnly": true, "column": 3, "row": 3 }</properties></jagui-textbox>',
        '</jagui-gridlayout>',
        '</jagui-pagecontent>',
        '</jagui-tabscontent></jagui-pagecontrol>',
        '<jagui-label id="{internalId}" data-class="Label" class="Control Label {theme}">',
        '<properties>{ "name": "lblDeg", "caption": "°", "column": 5, "row": 4, "margin": { "left": 3 } }</properties></jagui-label>',
        '<jagui-label id="{internalId}" data-class="Label" class="Control Label {theme}">',
        '<properties>{ "name": "lblSatPer", "caption": "%", "column": 5, "row": 5, "margin": { "left": 3 } }</properties></jagui-label>',
        '<jagui-label id="{internalId}" data-class="Label" class="Control Label {theme}">',
        '<properties>{ "name": "lblLVPer", "caption": "%", "column": 5, "row": 6, "margin": { "left": 3 } }</properties></jagui-label>',
        '<jagui-gridlayout id="{internalId}" data-class="GridLayout" class="Control GridLayout">',
        '<properties>{ "name": "grdLayout_opacity", "margin": { "left": 20, "top": 3, "right": 20, "bottom": 2 }, "templateColumns": "68px 120px 30px 10px", ',
        '"templateRows": "23px", "columnGap": 0, "rowGap": 0, "column": 3, "row": 7, "colSpan": 3 }</properties>',
        '<jagui-label id="{internalId}" data-class="Label" class="Control Label {theme}">',
        '<properties>{ "name": "lblOpacity", "vertAlign": "middle" }</properties></jagui-label>',
        '<jagui-alphaslider id="{internalId}" data-class="AlphaSlider" class="Control Slider AlphaSlider {theme}"><properties>{"name": "slrOpacity", "values": [1,0], "margin": { "left": 15, "right": 15 }, "column": 2, "row": 1, "dataBindings": [{ "property": "firstValue", "destination": { "component": "txtbOpacity", "property": "text", "expressions": [{ "script": "return int(args.value * 100).toString()", "params": "value" }] } }, { "property": "firstValue", "destination": { "component": "clrBoxNewColor", "property": "color", "expressions": [{ "script": "args.destProperty.alpha = args.value", "needReturn": false }] } }] }</properties></jagui-alphaslider>',
        '<jagui-textbox id="{internalId}" data-class="TextBox" class="Control TextBox {theme}"><properties>{ "name": "txtbOpacity", "readOnly": true, "column": 3, "row": 1 }</properties></jagui-textbox>',
        '<jagui-label id="{internalId}" data-class="Label" class="Control Label {theme}">',
        '<properties>{ "name": "lblOpacityPer", "column": 4, "row": 1, "caption": "%", "margin": { "left": 3 }, "padding": { "top": 3} }</properties></jagui-label>',
        '</jagui-gridlayout>',
        '<jagui-gridlayout id="{internalId}" data-class="GridLayout" class="Control GridLayout">',
        '<properties>{ "name": "grdLayout_footer", "templateColumns": "98px 18px 71px 10px 71px", ',
        '"templateRows": "29px", "columnGap": 0, "rowGap": 0, "column": 3, "row": 8, "colSpan": 3 }</properties>',
        '<jagui-textbox id="{internalId}" data-class="TextBoxBtn" class="Control TextBox TextBoxBtn {theme}"><properties>{ "name": "txtbHex", "margin": { "top": 3, "bottom": 2 }, "toolTip": "Click to the button to change", "showToolTip": true }</properties></jagui-textbox>',
        '<jagui-button id="{internalId}" data-class="Button" class="Control Button {theme}"><properties>{ "name": "btnOk", "modalResult": "ok", "column": 3, "margin": { "top": 4, "bottom": 4 }, "translationKey": "constantMessages.okButton" }</properties></jagui-button>',
        '<jagui-button id="{internalId}" data-class="Button" class="Control Button {theme}"><properties>{ "name": "btnCancel", "modalResult": "cancel", "column": 5, "margin": { "top": 4, "bottom": 4 }, "translationKey": "constantMessages.cancelButton" }</properties></jagui-button>',
        '</jagui-gridlayout>',
        '<jagui-gridlayout>'].join(String.EMPTY);
    core.classes.registerTemplates([
        { Class: ColorDlg, template: WindowTpl.replace('{content}', ColorDlgTpl).replace('{appName}', 'ColorDlg') }
    ]);
}
//#endregion Template
export { ColorDialog };