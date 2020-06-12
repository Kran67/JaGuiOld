//#region Import
import { Window } from '/scripts/components/containers/window.js';
import { CommonDialog } from '/scripts/components/dialogs/commondialog.js';
import { Convert } from '/scripts/core/convert.js';
import { Color } from '/scripts/core/color.js';
import '/scripts/components/common/button.js';
import '/scripts/components/common/label.js';
import '/scripts/components/extended/labeleddropdownlistbox.js';
import '/scripts/components/extended/labeleddropdowncolors.js';
import '/scripts/components/containers/flexlayout.js';
import '/scripts/components/containers/gridlayout.js';
import '/scripts/components/containers/groupbox.js';
//#endregion Import
//#region FontDlg
class FontDlg extends Window {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.width = 396;
            props.height = 297;
            props.borderStyle = Window.BORDERSTYLES.DIALOG;
            props.formPosition = Window.FORMPOSITIONS.MAINFORMCENTER;
            props.name = 'fontDlg';
            props.destroyOnHide = !0;
            props.caption = core.locales[core.currentLocale]['fontDlg'];
            super(owner, props);
            core.private(this, {
                control: props.hasOwnProperty('control') ? props.control : null
            });
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        super.loaded();
        this.lddlbFont.dropDownListBox.onChange.addListener(this.common_Change);
        this.lddlbFontStyle.dropDownListBox.onChange.addListener(this.common_Change);
        this.lddlbFontSize.dropDownListBox.onChange.addListener(this.common_Change);
        this.lddlbcFontColor.dropDownListBoxColor.onChange.addListener(this.common_Change);
        this.lddlbUnderline.dropDownListBox.onChange.addListener(this.ddlbUnderline_Change);
        this.lddlbcUnderlineColor.dropDownListBoxColor.onChange.addListener(this.common_Change);
        this.cboxStrikeThrough.onChange.addListener(this.common_Change);
        this.cboxOverline.onChange.addListener(this.common_Change);
        this.cboxShadow.onChange.addListener(this.common_Change);
        this.cboxAllCaps.onChange.addListener(this.common_Change);
        this.updateFromObject();
    }
    //#endregion loaded
    //#region common_Change
    common_Change() {
        this.form.updateControl(this.form.lblPreview);
    }
    //#endregion common_Change
    //#region ddlbUnderline_Change
    ddlbUnderline_Change() {
        this.cssText = this.items[this.itemIndex].css;
        this.form.updateControl(this.form.lblPreview);
    }
    //#endregion ddlbUnderline_Change
    //#region updatePreview
    updateControl(htmlElement) {
        //#region Variables déclaration
        const htmlElementStyle = htmlElement.HTMLElementStyle;
        const FONTSTYLES = core.types.FONTSTYLES;
        let textDecoration = String.EMPTY;
        //#endregion Variables déclaration
        // font family
        htmlElementStyle.fontFamily = this.lddlbFont.dropDownListBox.text;
        // font size
        htmlElementStyle.fontSize = `${this.lddlbFontSize.dropDownListBox.text}px`;
        // font style
        htmlElementStyle.fontWeight = String.EMPTY;
        switch (this.lddlbFontStyle.dropDownListBox.itemIndex) {
            case 1: // Bold
                htmlElementStyle.fontWeight = FONTSTYLES.BOLD;
                break;
            case 2: // Italic
                htmlElementStyle.fontStyle = FONTSTYLES.ITALIC;
                break;
            case 3: // Bold Italic
                htmlElementStyle.fontWeight = FONTSTYLES.BOLD;
                htmlElementStyle.fontStyle = FONTSTYLES.ITALIC;
                break;
            default: // Regular
                htmlElementStyle.fontWeight = FONTSTYLES.NORMAL;
                htmlElementStyle.fontStyle = FONTSTYLES.NORMAL;
        }
        // font color
        htmlElementStyle.color = this.lddlbcFontColor.dropDownListBoxColor.color.toRGBAString();
        // underline
        this.lddlbUnderline.dropDownListBox.itemIndex > 0 && (textDecoration = 'underline');
        // line through
        this.cboxStrikeThrough.isChecked && (textDecoration = `line-through ${textDecoration}`);
        // overline
        this.cboxOverline.isChecked && (textDecoration = `overline ${textDecoration}`);
        // underline style
        this.lddlbUnderline.dropDownListBox.itemIndex > 0 
            && (textDecoration += `${this.lddlbUnderline.dropDownListBox.cssText
                .replace('line-through', String.EMPTY)
                .replace('text-decoration:', String.EMPTY)
                .replace(';', String.EMPTY)}`);
        htmlElementStyle.textDecoration = textDecoration;
        // underline color
        this.lddlbUnderline.dropDownListBox.itemIndex > 0 && (htmlElementStyle.textDecorationColor = this.lddlbcUnderlineColor.dropDownListBoxColor.color.toRGBAString());
        // shadow
        htmlElementStyle.textShadow = String.EMPTY;
        this.cboxShadow.isChecked && (htmlElementStyle.textShadow = '2px 2px 0 gray');
        // all caps
        htmlElementStyle.textTransform = String.EMPTY;
        this.cboxAllCaps.isChecked && (htmlElementStyle.textTransform = 'uppercase');
        // special effect
    }
    //#endregion updatePreview
    //#region updateFromObject
    updateFromObject() {
        //#region Variables déclaration
        const priv = core.private(this);
        const cHtmlElement = priv.control.HTMLElement;
        let value = int(getComputedStyle(cHtmlElement).fontSize, 10);
        let idx, text;
        const FONTSTYLES = core.types.FONTSTYLES;
        const TEXTDECORATIONS = core.types.TEXTDECORATIONS;
        const TEXTDECORATIONSTYLES = core.types.TEXTDECORATIONSTYLES;
        //#endregion Variables déclaration
        // font-size
        if (value) {
            idx = this.lddlbFontSize.dropDownListBox.findItemIndexFromText(Convert.intToStr(value));
            if (idx > -1) {
                this.lddlbFontSize.dropDownListBox.itemIndex = idx;
            } else {
                this.lddlbFontSize.dropDownListBox.itemIndex = -1;
                this.lddlbFontSize.dropDownListBox.text = Convert.intToStr(value);
            }
        }
        // color
        value = getComputedStyle(cHtmlElement).color;
        (value)  && (this.lddlbcFontColor.dropDownListBoxColor.color = Color.parse(value));
        // font-family
        value = getComputedStyle(cHtmlElement).fontFamily;
        if (value) {
            value = value.split("'").join(String.EMPTY);
            idx = this.lddlbFont.dropDownListBox.findItemIndexFromText(value);
            if (idx > -1) {
                this.lddlbFont.dropDownListBox.itemIndex = idx;
            } else {
                this.lddlbFont.dropDownListBox.itemIndex = -1;
                this.lddlbFont.dropDownListBox.text = value;
            }
        }
        // font style
        idx = 0;
        // Bold
        value = getComputedStyle(cHtmlElement).fontWeight;
        value && value === FONTSTYLES.BOLD && (text = 'bold');
        // Oblique
        value = getComputedStyle(cHtmlElement).fontStyle;
        value && value === FONTSTYLES.ITALIC && (!String.isNullOrEmpty(text) ? text += 'Italic': 'italic');
        idx = this.lddlbFontStyle.dropDownListBox.findItemIndexFromText(text);
        if (idx > -1) {
            this.lddlbFontStyle.dropDownListBox.itemIndex = idx;
        } else {
            this.lddlbFontStyle.dropDownListBox.itemIndex = -1;
            this.lddlbFontStyle.dropDownListBox.text = value;
        }
        // underline
        value = getComputedStyle(cHtmlElement).textDecoration;
        idx = 0;
        if (value && value.includes(TEXTDECORATIONS.UNDERLINE)) {
            // check type of the line
            if (value.includes(TEXTDECORATIONSTYLES.SOLID)) {
                idx = 1;
            } else if (value.includes(TEXTDECORATIONSTYLES.DOUBLE)) {
                idx = 2;
            } else if (value.includes(TEXTDECORATIONSTYLES.DOTTED)) { 
                idx = 3;
            } else if (value.includes(TEXTDECORATIONSTYLES.DASHED)) {
                idx = 4;
            } else if (value.includes(TEXTDECORATIONSTYLES.WAVY)) {
                idx = 5;
            }
            this.lddlbUnderline.dropDownListBox.text = this.lddlbUnderline.dropDownListBox.items[idx].caption;
            this.lddlbUnderline.dropDownListBox.itemIndex = idx;
            this.lddlbUnderline.dropDownListBox.cssText = this.lddlbUnderline.dropDownListBox.items[idx].css;
            // color
            if (value.includes('rgb')) {
                let parts = value.replace(/, /g,',').split(' ');
                this.lddlbcUnderlineColor.dropDownListBoxColor.color = Color.parse(parts.find(e => e.includes('rgb')));
            }
        } else {
            this.lddlbUnderline.dropDownListBox.text = core.locales.translateConstant(core.currentLocale, 'rNone');
            this.lddlbUnderline.dropDownListBox.itemIndex = 0;
        }
        this.cboxStrikeThrough.isChecked = value && value.includes(TEXTDECORATIONS.LINETHROUGH);
        this.cboxOverline.isChecked = value && value.includes(TEXTDECORATIONS.OVERLINE);
        value = getComputedStyle(cHtmlElement).textShadow;
        this.cboxShadow.isChecked = value && value.includes('rgb');
        value = getComputedStyle(cHtmlElement).textTransform;
        this.cboxAllCaps.isChecked = value && value.includes(core.types.TEXTTRANSFORMS.UPPERCASE);
        this.btnEditEffect.enabled = this.lblEffect.enabled = this.lblCurrentEffect.enabled = priv.control instanceof core.classes.Label;
        this.updateControl(this.form.lblPreview);
    }
    //#endregion updateFromObject
    //#region close
    close() {
        this.modalResult === Window.MODALRESULTS.OK && this.updateControl(core.private(this).control);
        super.close();
    }
    //#endregion close
    //#endregion Methods

}
//#endregion FontDlg
//#region class FontDialog
class FontDialog extends CommonDialog {
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
            class: FontDlg,
            owner: activeApp,
            props: {
                parentHTML: document.body,
                control
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
core.classes.register(core.types.CATEGORIES.INTERNAL, FontDlg);
core.classes.register(core.types.CATEGORIES.DIALOGS, FontDialog);
//#region I18n
core.locales.addLocaleKeyValues(core.types.LANGUAGES.FR_FR, !1, {
    'fontDlg': 'Paramètrage de la police',
    'fontDlg.lddlbFont.label': 'Police :',
    'fontDlg.lddlbFontStyle.label': 'Style de police :',
    'fontDlg.lddlbFontSize.label': 'Taille :',
    'fontDlg.lddlbcFontColor.label': 'Couleur de police :',
    'fontDlg.lddlbUnderline.label': 'Soulignement :',
    'fontDlg.lddlbcUnderlineColor.label': 'Couleur de soulignement : ',
    'fontDlg.grpBEffects': 'Effets',
    'fontDlg.grpBPreview': 'Aperçu',
    'fontDlg.cboxStrikeThrough': 'Barré',
    'fontDlg.cboxOverline': 'Surligné',
    'fontDlg.cboxShadow': 'Ombre',
    'fontDlg.cboxAllCaps': 'Majuscules',
    'fontDlg.lblEffect': 'Effet spécial :',
    'fontDlg.lblCurrentEffect': '(Aucun)',
    'fontDlg.btnEditEffect': 'Ajouter / Editer un effet...'
});
core.locales.addLocaleKeyValues(core.types.LANGUAGES.EN_US, !1, {
    'fontDlg': 'Font settings',
    'fontDlg.lddlbFont.label': 'Font family :',
    'fontDlg.lddlbFontStyle.label': 'Font Style :',
    'fontDlg.lddlbFontSize.label': 'Size :',
    'fontDlg.lddlbcFontColor.label': 'Font color :',
    'fontDlg.lddlbUnderline.label': 'Underline :',
    'fontDlg.lddlbcUnderlineColor.label': 'Underline color : ',
    'fontDlg.grpBEffects': 'Effects',
    'fontDlg.grpBPreview': 'Preview',
    'fontDlg.cboxStrikeThrough': 'Strikethrough',
    'fontDlg.cboxOverline': 'Overline',
    'fontDlg.cboxShadow': 'Shadow',
    'fontDlg.cboxAllCaps': 'All caps',
    'fontDlg.lblEffect': 'Special effect :',
    'fontDlg.lblCurrentEffect': '(None)',
    'fontDlg.btnEditEffect': 'Add / Edit an effect...'
});
//#endregion
//#region Template
if (core.isHTMLRenderer) {
    const WindowTpl = core.classes.getTemplate(core.classes.Window.name);
    const FontDlgTpl = ['<jagui-gridlayout id="{internalId}" data-class="GridLayout" class="Control GridLayout">',
        '<properties>{ "name": "grdLayout", "align": "client", "margin": 15, "templateColumns": "143px 7px 41px 7px 23px 7px 68px 7px 55px", ',
        '"templateRows": "33px 5px 33px 5px 55px 5px 70px 5px 23px", "columnGap": 0, "rowGap": 0 }</properties>',
        '<jagui-labeleddropdownlistbox id="{internalId}" data-class="LabeledDropDownListBox" class="Control LabeledControl LabeledDropDownListBox"><properties>{ "name": "lddlbFont", "flexDirection": "column", "dropDownListBox": { "items" : [{ "caption": "Arial", "css": "font-family: Arial" }, { "caption": "Arial Black", "css": "font-family: Arial Black" }, { "caption": "Courier New", "css": "font-family: Courier New" }, { "caption": "Georgia", "css": "font-family: Georgia" }, { "caption": "Tahoma", "css": "font-family: tahoma" }, { "caption": "Times", "css": "font-family: Times" }, { "caption": "Times New Roman", "css": "font-family: Times New Roman" }, { "caption": "Trebuchet MS", "css": "font-family: Trebuchet MS" }, { "caption": "Verdana", "css": "font-family: Verdana" }], "dropDownCount": 9 }, "column": 1, "row": 1, "colSpan": 3 }</properties></jagui-labeleddropdownlistbox>',
        '<jagui-labeleddropdownlistbox id="{internalId}" data-class="LabeledDropDownListBox" class="Control LabeledControl LabeledDropDownListBox"><properties>{ "name": "lddlbFontStyle", "flexDirection": "column", "dropDownListBox": { "items" : [{ "css": "font-weight: Normal", "translationKey": "constantMessages.regularFont" }, { "css": "font-weight: bold", "translationKey": "constantMessages.boldFont" }, { "css": "font-style: italic", "translationKey": "constantMessages.italicFont" }, { "css": "font-weight: bold; font-style: italique", "translationKey": "constantMessages.boldItalicFont" }], "dropDownCount": 4 }, "column": 5, "row": 1, "colSpan": 3 }</properties></jagui-labeleddropdownlistbox>',
        '<jagui-labeleddropdownlistbox id="{internalId}" data-class="LabeledDropDownListBox" class="Control LabeledControl LabeledDropDownListBox"><properties>{ "name": "lddlbFontSize", "flexDirection": "column", "dropDownListBox": { "items" : [{ "caption": "8" }, { "caption": "9" }, { "caption": "10" }, { "caption": "11" }, { "caption": "12" }, { "caption": "14" }, { "caption": "16" }, { "caption": "18" }, { "caption": "20" }, { "caption": "22" }, { "caption": "24" }, { "caption": "26" }, { "caption": "28" }, { "caption": "36" }, { "caption": "48" }, { "caption": "72" }] }, "column": 9, "row": 1 }</properties></jagui-labeleddropdownlistbox>',
        '<jagui-labeleddropdownlistboxcolor id="{internalId}" data-class="LabeledDropDownListBoxColor" class="Control LabeledControl LabeledDropDownListBoxColor"><properties>{ "name": "lddlbcFontColor", "flexDirection": "column", "column": 1, "row": 3, "dropDownListBoxColor": { "color": "black" } }</properties></jagui-labeleddropdownlistboxcolor>',
        `<jagui-labeleddropdownlistbox id="{internalId}" data-class="LabeledDropDownListBox" class="Control LabeledControl LabeledDropDownListBox"><properties>{ "name": "lddlbUnderline", "flexDirection": "column", "dropDownListBox": { "items" : [{ "translationKey": "constantMessages.rNone" }, { "caption": "${String.dupeString("&nbsp;", 19)}", "css": "text-decoration: solid line-through" }, { "caption": "${String.dupeString("&nbsp;", 19)}", "css": "text-decoration: line-through double" }, { "caption": "${String.dupeString("&nbsp;", 19)}", "css": "text-decoration: line-through dotted" }, { "caption": "${String.dupeString("&nbsp;", 19)}", "css": "text-decoration: line-through dashed" }, { "caption": "${String.dupeString("&nbsp;", 19)}", "css": "text-decoration: line-through wavy" }], "dropDownCount": 6 }, "column": 3, "row": 3, "colSpan": 3 }</properties></jagui-labeleddropdownlistbox>`,
        '<jagui-labeleddropdownlistboxcolor id="{internalId}" data-class="LabeledDropDownListBoxColor" class="Control LabeledControl LabeledDropDownListBoxColor"><properties>{ "name": "lddlbcUnderlineColor", "flexDirection": "column", "column": 7, "row": 3, "colSpan": 3, "dropDownListBoxColor": { "color": "transparent" } }</properties></jagui-labeleddropdownlistboxcolor>',
        '<fieldset id="{internalId}" data-class="GroupBox" class="Control GroupBox {theme}"><properties>{ "name": "grpBEffects", "column": 1, "row": 5, "colSpan": 9 }</properties>',
        '<jagui-gridlayout id="{internalId}" data-class="GridLayout" class="Control GridLayout">',
        '<properties>{ "name": "grdLayout_effects", "columns": 4, ',
        '"rows": 2, "columnGap": 5, "rowGap": 5, "align": "client" }</properties>',
        '<jagui-checkbox id="{internalId}" data-class="Checkbox" class="Control Checkbox {theme}"><properties>{ "name": "cboxStrikeThrough" }</properties></jagui-checkbox>',
        '<jagui-checkbox id="{internalId}" data-class="Checkbox" class="Control Checkbox {theme}"><properties>{ "name": "cboxOverline" }</properties></jagui-checkbox>',
        '<jagui-checkbox id="{internalId}" data-class="Checkbox" class="Control Checkbox {theme}"><properties>{ "name": "cboxShadow" }</properties></jagui-checkbox>',
        '<jagui-checkbox id="{internalId}" data-class="Checkbox" class="Control Checkbox {theme}"><properties>{ "name": "cboxAllCaps" }</properties></jagui-checkbox>',
        '<jagui-label id="{internalId}" data-class="Label" class="Label {theme}"><properties>{ "name": "lblEffect", "column": 1, "row": 2, "enabled": false }</properties></jagui-label>',
        '<jagui-label id="{internalId}" data-class="Label" class="Label {theme}"><properties>{ "name": "lblCurrentEffect", "column": 2, "row": 2, "enabled": false }</properties></jagui-label>',
        '<jagui-button id="{internalId}" data-class="Button" class="Control Button {theme}"><properties>{ "name": "btnEditEffect", "column": 3, "colSpan": 2, "row": 2, "enabled": false }</properties></jagui-button>',
        '</jagui-gridlayout></fieldset>',
        '<fieldset id="{internalId}" data-class="GroupBox" class="Control GroupBox {theme}"><properties>{ "name": "grpBPreview", "column": 1, "row": 7, "colSpan": 9 }</properties>',
        '<jagui-flexlayout id="{internalId}" data-class="FlexLayout" class="Control FlexLayout {theme}"><properties>{ "name": "flxLayout", "align": "client", "justifyContent": "center", "alignItems": "center" }</properties>',
        '<jagui-label id="{internalId}" data-class="Label" class="Label {theme}"><properties>{ "name": "lblPreview", "caption": "AaBbYyZz" }</properties></jagui-label>',
        '<jagui-flexlayout></fieldset>',
        '<jagui-gridlayout id="{internalId}" data-class="GridLayout" class="Control GridLayout">',
        '<properties>{ "name": "grdLayout_footer", "templateColumns": "90px 71px 6px 71px 90px", ',
        '"templateRows": "1fr", "columnGap": 0, "rowGap": 0, "column": 1, "row": 9, "colSpan": 5 }</properties>',
        '<jagui-button id="{internalId}" data-class="Button" class="Control Button {theme}"><properties>{ "name": "btnOk", "modalResult": "ok", "column": 2, "translationKey": "constantMessages.okButton" }</properties></jagui-button>',
        '<jagui-button id="{internalId}" data-class="Button" class="Control Button {theme}"><properties>{ "name": "btnCancel", "modalResult": "cancel", "column": 4, "translationKey": "constantMessages.cancelButton" }</properties></jagui-button>',
        '</jagui-gridlayout>',
        '<jagui-gridlayout>'].join(String.EMPTY);
    core.classes.registerTemplates([
        { Class: FontDlg, template: WindowTpl.replace('{content}', FontDlgTpl).replace('{appName}', 'FontDlg') }
    ]);
}
//#endregion Template
export { FontDialog };
/*(function () {
        loaded: function () {
            this._inherited();
            var lW = 0, lastBtnLeft = 0;
            lW += parseInt(getComputedStyle(this._layout._HTMLElement).marginLeft, 10) + parseInt(getComputedStyle(this._layout._HTMLElement).marginRight, 10);
            this.setWidth(this._HTMLElement.offsetWidth + lW);
            this.btnOk.setLeft(lastBtnLeft);
            lW += this.btnOk._HTMLElement.offsetWidth;
            lastBtnLeft += this.btnOk._HTMLElement.offsetWidth + 6;
            this.btnCancel.setLeft(lastBtnLeft);
            lW += this.btnCancel._HTMLElement.offsetWidth;
            lastBtnLeft += this.btnCancel._HTMLElement.offsetWidth + 6;
            lW += 6;
            this.btnCont.setWidth(lW);
        },
        updatePreview: function () {
            var form = this.form;
            form.updateObject(form.lblPreview);
        },
        updateObject: function (obj) {
            obj._HTMLElementStyle.fontFamily = this.ddlbPolice.text;
            obj._HTMLElementStyle.fontWeight = String.EMPTY;
            obj._HTMLElementStyle.fontStyle = String.EMPTY;
            switch (this.ddlbStyle.itemIndex) {
                case 1:
                    obj._HTMLElementStyle.fontWeight = "bold";
                    break;
                case 2:
                    obj._HTMLElementStyle.fontStyle = "oblique";
                    break;
                case 3:
                    obj._HTMLElementStyle.fontWeight = "bold";
                    obj._HTMLElementStyle.fontStyle = "oblique";
                    break;
            }
            obj._HTMLElementStyle.fontSize = this.ddlbSize.text + $j.types.CSSUnits.PX;
            obj._HTMLElementStyle.textDecoration = (this.chkUnderline.isChecked) ? "underline" : String.EMPTY;
            obj._HTMLElementStyle.color = this.colorBtn.color.toRGBHexString();
        },
        updateFromObject: function (obj) {
            var value = parseInt(getComputedStyle(obj._HTMLElement).fontSize, 10), idx;
            // font-size
            if (value) {
                idx = this.ddlbSize.findItemFromText(_conv.intToStr(value));
                if (idx > -1) this.ddlbSize.setItemIndex(idx);
                else {
                    this.ddlbSize.setItemIndex(-1);
                    this.ddlbSize.setText(_conv.intToStr(value));
                }
            }
            // color
            value = getComputedStyle(obj._HTMLElement).color;
            if (value) this.colorBtn.setColor(_colors.parse(value));
            // font-family
            value = getComputedStyle(obj._HTMLElement).fontFamily;
            if (value) {
                value = value.split("'").join(String.EMPTY);
                idx = this.ddlbPolice.findItemFromText(value);
                if (idx > -1) this.ddlbPolice.setItemIndex(idx);
                else {
                    this.ddlbPolice.setItemIndex(-1);
                    this.ddlbPolice.setText(value);
                }
            }
            // font style
            idx = 0;
            // Bold
            value = getComputedStyle(obj._HTMLElement).fontWeight;
            if (value) {
                if (value === $j.types.fontStyles.BOLD) idx++;
            }
            // Oblique
            value = getComputedStyle(obj._HTMLElement).fontStyle;
            if (value) {
                if (value === $j.types.fontStyles.OBLIQUE) idx += 2;
            }
            this.ddlbStyle.setItemIndex(idx);
            this.ddlbStyle.setText(this.ddlbStyle.items[idx].text);
            // underline
            value = getComputedStyle(obj._HTMLElement).textDecoration;
            if (value) {
                if (value === "underline") this.chkUnderline.setIsChecked(true);
            }

            this.updatePreview();
        }
    });
    //#endregion
    //#region FontDialog
    var FontDialog = $j.classes.CommonDialog.extend("FontDialog", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                //#region Private properties
                //this._dlg=null;
                this._obj = null;
                //#endregion
            }
        },
        //#region Properties
        //#endregion
        //#region Methods
        execute: function (obj) {
            var _dlg = $j.classes.createComponent($j.classes.FontDlg, $j.apps.activeApplication, null, { "parentHTML": $j.doc.body });
            _dlg.loaded();
            _dlg.updateFromObject(obj);
            _dlg.dialog = this;
            _dlg._obj = obj;
            _dlg.onClose.addListener(this.updateObj);
            _dlg.setCaption("Police");
            _dlg.center();
            _dlg.showModal();
            this._inherited();
        },
        updateObj: function () {
            if (this.modalResult === $j.types.modalResults.OK) {
                this.updateObject(this._obj);
            }
            this._obj = null;
        },
        destroy: function () {
            this._inherited();
            //if (this._dlg)) this._dlg.destroy();
            //this._dlg=null;
            this._obj = null;
        }
        //#endregion
    });
    Object.seal(FontDialog);
    //#endregion
    $j.classes.register($j.types.categories.INTERNAL, FontDlg);
    $j.classes.register($j.types.categories.DIALOGS, FontDialog);
    //#region Template
    if ($j.isHTMLRenderer()) {
        var FontDlgTpl = ["<div id='{internalId}' data-name='{name}' data-class='Window' class='Window csr_default FontDlg {theme} borderStyle-dialog' data-borderstyle='dialog' data-clientwidth='350' data-clientheight='220' data-position='screenCenter'>",
                        "<div id='{internalId_Layout}' data-class='Layout' class='WindowLayout'>",
                        $j.templates["WindowTitleBar"],
                        "<div id='{internalId_content}' data-name='font_content' data-class='WindowContent' class='WindowContent {theme}'>",
                        // label Police
                        "<label id='{internalId_lblPolice}' data-name='lblPolice' data-class='Label' class='csr_default Label fontDlgPolice' style='left:12px;top:12px;'>Police :</label>",
                        // dropDown Police
                        "<div id='{internalId_ddlbPolice}' data-name='ddlbPolice' data-class='DropDownListBox' class='DropDownListBox fontDlgDdlbPolice {theme}' data-itemindex='0' data-dropdowncount='9' data-onchange='updatePreview' style='left:12px;top:27px;width:146px;height:20px;'>",
                        "<div class='DropDownListBoxContent'>",
                        "<input type='text' readonly='readonly' class='csr_default DropDownListBoxInput {theme}' />",
                        "</div>",
                        "<span class='DropDownListBoxArrow {theme}'></span><!--",
                        JSON.stringify([{ "text": "Arial", "size": 13, "isChecked": false, "enabled": true, "isHeader": false, "top": 0, "css": "font-family:Arial" },
                                        { "text": "Arial Black", "size": 13, "isChecked": false, "enabled": true, "isHeader": false, "top": 16, "css": "font-family:Arial Black" },
                                        { "text": "Courier New", "size": 13, "isChecked": false, "enabled": true, "isHeader": false, "top": 32, "css": "font-family:Courier New" },
                                        { "text": "Georgia", "size": 13, "isChecked": false, "enabled": true, "isHeader": false, "top": 48, "css": "font-family:Georgia" },
                                        { "text": "Tahoma", "size": 13, "isChecked": false, "enabled": true, "isHeader": false, "top": 64, "css": "font-family:Tahoma" },
                                        { "text": "Times", "size": 13, "isChecked": false, "enabled": true, "isHeader": false, "top": 80, "css": "font-family:Times" },
                                        { "text": "Times New Roman", "size": 13, "isChecked": false, "enabled": true, "isHeader": false, "top": 96, "css": "font-family:Times New Roman" },
                                        { "text": "Trebuchet MS", "size": 13, "isChecked": false, "enabled": true, "isHeader": false, "top": 112, "css": "font-family:Trebuchet MS" },
                                        { "text": "Verdana", "size": 13, "isChecked": false, "enabled": true, "isHeader": false, "top": 128, "css": "font-family:Verdana" }]),
                        "--></div>",
                        // label Style
                        "<label id='{internalId_lblStyle}' data-name='lblStyle' data-class='Label' class='csr_default Label fontDlgStyle' style='left:166px;top:12px;'>Style :</label>",
                        // dropDown Style
                        "<div id='{internalId_ddlbStyle}' data-name='ddlbStyle' data-class='DropDownListBox' class='DropDownListBox fontDlgDdlbStyle {theme}' data-itemindex='0' data-dropdowncount='4' data-onchange='updatePreview' style='left:166px;top:27px;width:111px;height:20px;'>",
                        "<div class='DropDownListBoxContent'>",
                        "<input type='text' readonly='readonly' class='csr_default DropDownListBoxInput {theme}' />",
                        "</div>",
                        "<span class='DropDownListBoxArrow {theme}'></span><!--",
                        JSON.stringify([{ "text": "Normal", "size": 13, "isChecked": false, "enabled": true, "isHeader": false, "top": 0 },
                                        { "text": "Gras", "size": 13, "isChecked": false, "enabled": true, "isHeader": false, "top": 16, "css": "font-weight:bold;" },
                                        { "text": "Oblique", "size": 13, "isChecked": false, "enabled": true, "isHeader": false, "top": 32, "css": "font-style:oblique;" },
                                        { "text": "Gras Oblique", "size": 13, "isChecked": false, "enabled": true, "isHeader": false, "top": 48, "css": "font-weight:bold;font-style:oblique;" }]),
                        "--></div>",
                        // label Taille
                        "<label id='{internalId_lblSize}' data-name='lblSize' data-class='Label' class='csr_default Label fontDlgLblSize' style='left:286px;top:12px;'>Taille :</label>",
                        // dropDown Taille
                        "<div id='{internalId_ddlbSize}' data-name='ddlbSize' data-class='DropDownListBox' class='DropDownListBox fontDlgDdlbSize {theme}' data-itemindex='0' data-onchange='updatePreview' style='left:285px;top:27px;width:54px;height:20px;'>",
                        "<div class='DropDownListBoxContent'>",
                        "<input type='text' readonly='readonly' class='csr_default DropDownListBoxInput {theme}' />",
                        "</div>",
                        "<span class='DropDownListBoxArrow {theme}'></span><!--",
                        JSON.stringify([{ "text": "8", "size": 13, "isChecked": false, "enabled": true, "isHeader": false, "top": 0 },
                                        { "text": "9", "size": 13, "isChecked": false, "enabled": true, "isHeader": false, "top": 16 },
                                        { "text": "10", "size": 13, "isChecked": false, "enabled": true, "isHeader": false, "top": 32 },
                                        { "text": "11", "size": 13, "isChecked": false, "enabled": true, "isHeader": false, "top": 48 },
                                        { "text": "12", "size": 13, "isChecked": false, "enabled": true, "isHeader": false, "top": 64 },
                                        { "text": "14", "size": 13, "isChecked": false, "enabled": true, "isHeader": false, "top": 80 },
                                        { "text": "16", "size": 13, "isChecked": false, "enabled": true, "isHeader": false, "top": 96 },
                                        { "text": "18", "size": 13, "isChecked": false, "enabled": true, "isHeader": false, "top": 112 },
                                        { "text": "20", "size": 13, "isChecked": false, "enabled": true, "isHeader": false, "top": 128 },
                                        { "text": "22", "size": 13, "isChecked": false, "enabled": true, "isHeader": false, "top": 144 },
                                        { "text": "24", "size": 13, "isChecked": false, "enabled": true, "isHeader": false, "top": 160 },
                                        { "text": "26", "size": 13, "isChecked": false, "enabled": true, "isHeader": false, "top": 176 },
                                        { "text": "28", "size": 13, "isChecked": false, "enabled": true, "isHeader": false, "top": 192 },
                                        { "text": "36", "size": 13, "isChecked": false, "enabled": true, "isHeader": false, "top": 208 },
                                        { "text": "48", "size": 13, "isChecked": false, "enabled": true, "isHeader": false, "top": 224 },
                                        { "text": "72", "size": 13, "isChecked": false, "enabled": true, "isHeader": false, "top": 240 }]),
                        "--></div>",
                        // GroupBox Effets
                        "<fieldset id='{internalId_gbEffects}' data-name='gbEffects' data-class='GroupBox' class='GroupBox fontDlgGbEffects {theme}' style='top:54px;left:10px;width:146px;height:90px;'>",
                        "<legend class='GroupBoxLegend {theme}'>Effets</legend>",
                        // Checkbox barré
                        //"<div id='{internalId_chkCrossed}' data-name='chkCrossed' data-class='Checkbox' class='Checkbox fontDlg_chkCrossed' data-ischecked='false' data-onchange='updatePreview'>Barré</div>",
                        // Checkbox souligné
                        "<div id='{internalId_chkUnderline}' data-name='chkUnderline' data-class='Checkbox' class='Checkbox fontDlgChkUnderline {theme}' data-onchange='updatePreview' style='top:20px;left:10px;'>",
                        "<input type='checkbox' class='CheckboxInput' />",
                        "<div class='{theme} CheckboxCheck checked'></div>Souligné",
                        "</div>",
                        // Label Couleur
                        "<label id='{internalId_lblColor}' data-name='lblColor' data-class='Label' class='csr_default Label fontDlgLblColor' style='top:40px;left:10px;'>Couleur :</label>",
                        // colorButton couleur
                        "<button id='{internalId_btnColor}' data-name='colorBtn' data-class='ColorButton' class='ColorButton fontDlgColorBtn {theme}' data-color='black' data-onchange='updatePreview' style='top:58px;left:10px;width:123px;height:20px;'>",
                        "<span class='ButtonCaption'></span>",
                        "<div class='ColorButtonColor {theme}'></div>",
                        "</button>",
                        "</fieldset>",
                        // GroupBox Aperçu
                        "<fieldset id='{internalId_gbPreview}' data-name='gbPreview' data-class='GroupBox' class='GroupBox fontDlgGbPreview {theme}' style='top:54px;width:157px;height:90px;left:164px;'>",
                        "<legend class='GroupBoxLegend {theme}'>Aperçu</legend>",
                        "<label id='{internalId_lblPreview}' data-name='lblPreview' data-class='Label' class='csr_default Label fontDlgLblPreview'>AaBbYyZz</label>",
                        "</fieldset>",
                        // Boutons layout
                        "<div id='{internalId_btnCont}' data-class='Layout' data-name='btnCont' class='Layout horizontalCenter fontDlgBtnCont' style='height:24px;bottom:5px;'>",
                        // Bouton Ok
                        "<input type='button' id='{internalId_btnOk}' value='Ok' data-name='btnOk' data-class='Button' class='Button {theme}' data-modalresult='ok' style='height:22px;width:71px;' />",
                        // Bouton Annuler
                        "<input type='button' id='{internalId_btnCancel}' value='Annuler' data-name='btnCancel' data-class='Button' class='Button {theme}' data-modalresult='cancel' style='height:22px;width:71px;' />",
                        "</div></div></div>"].join(String.EMPTY),
            FontDialogTpl = "<div id='{internalId}' data-name='{name}' data-class='FontDialog' class='ShortCutIcon'>\
                       <div class='ShortCutIconImg fontdialog'></div>\
                       <div class='ShortCutIconCaption'>{name}</div>\
                       </div>";
        $j.classes.registerTemplates([{ Class: FontDlg, template: FontDlgTpl }, { Class: FontDialog, template: FontDialogTpl }]);
    }
    //#endregion
})();*/