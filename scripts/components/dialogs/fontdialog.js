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
    //#region Private fields
    #control;
    //#endregion Private fields
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
            this.#control = props.hasOwnProperty('control') ? props.control : null;
        }
    }
    //#endregion constructor
    //#region Methods
    //#region loaded
    loaded() {
        //#region Variables déclaration
        let effects = [];
        const locale = core.locales[core.currentLocale];
        //#endregion Variables déclaration
        super.loaded();
        this.lddlbFont.dropDownListBox.onChange.addListener(this.common_Change);
        this.lddlbFontStyle.dropDownListBox.onChange.addListener(this.common_Change);
        this.lddlbFontSize.dropDownListBox.onChange.addListener(this.common_Change);
        this.lddlbcFontColor.dropDownListBoxColor.onChange.addListener(this.common_Change);
        this.lddlbUnderline.dropDownListBox.onChange.addListener(this.ddlbUnderline_Change);
        this.lddlbcUnderlineColor.dropDownListBoxColor.onChange.addListener(this.common_Change);
        this.cboxStrikeThrough.onChange.addListener(this.common_Change);
        this.cboxOverline.onChange.addListener(this.common_Change);
        this.cboxShadow.onChange.addListener(this.cboxShadow_Change);
        this.cboxAllCaps.onChange.addListener(this.common_Change);
        effects = Object.keys(locale.labelEffects).map(key => {
            return { 'caption': locale.labelEffects[key] };
        });
        this.lddlbEffect.dropDownListBox.items.addRange([{ "translationKey": "constantMessages.rNone" }, ...effects]);
        this.lddlbEffect.dropDownListBox.onChange.addListener(this.lddlbEffect_Change);
        this.updateFromObject();
    }
    //#endregion loaded
    //#region cboxShadow_Change
    cboxShadow_Change() {
        this.form.lddlbEffect.dropDownListBox.itemIndex = 0;
        this.form.updateControl(this.form.lblPreview);
    }
    //#endregion cboxShadow_Change
    //#region lddlbEffect_Change
    lddlbEffect_Change() {
        this.form.cboxShadow.checked = false;
        this.form.updateControl(this.form.lblPreview);
    }
    //#endregion lddlbEffect_Change
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
    updateControl(control) {
        //#region Variables déclaration
        const htmlElementStyle = control.HTMLElementStyle;
        const FONTSTYLES = core.types.FONTSTYLES;
        let textDecoration = String.EMPTY;
        //#endregion Variables déclaration
        // special effect
        if (this.lddlbEffect.dropDownListBox.itemIndex > 0) {
            const effectName = core.tools.getEnumNameFromValue(core.locales[core.currentLocale].labelEffects, this.lddlbEffect.dropDownListBox.text);
            control.effect = new core.classes[`Label${effectName}Effect`](control);
        } else {
            control.effect = null;
        }
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
        this.cboxStrikeThrough.checked && (textDecoration = `line-through ${textDecoration}`);
        // overline
        this.cboxOverline.checked && (textDecoration = `overline ${textDecoration}`);
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
        this.cboxShadow.checked && (htmlElementStyle.textShadow = '2px 2px 0 gray');
        // all caps
        htmlElementStyle.textTransform = String.EMPTY;
        this.cboxAllCaps.checked && (htmlElementStyle.textTransform = 'uppercase');
    }
    //#endregion updatePreview
    //#region updateFromObject
    updateFromObject() {
        //#region Variables déclaration
        const cHtmlElement = this.#control.HTMLElement;
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
        (value) && (this.lddlbcFontColor.dropDownListBoxColor.color = Color.parse(value));
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
        value && value === FONTSTYLES.ITALIC && (!String.isNullOrEmpty(text) ? text += 'Italic' : 'italic');
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
                let parts = value.replace(/, /g, ',').split(' ');
                this.lddlbcUnderlineColor.dropDownListBoxColor.color = Color.parse(parts.find(e => e.includes('rgb')));
            }
        } else {
            this.lddlbUnderline.dropDownListBox.text = core.locales.translateConstant(core.currentLocale, 'rNone');
            this.lddlbUnderline.dropDownListBox.itemIndex = 0;
        }
        this.cboxStrikeThrough.checked = value && value.includes(TEXTDECORATIONS.LINETHROUGH);
        this.cboxOverline.checked = value && value.includes(TEXTDECORATIONS.OVERLINE);
        value = getComputedStyle(cHtmlElement).textShadow;
        this.cboxShadow.checked = value && !this.#control.effect && value.includes('rgb');
        value = getComputedStyle(cHtmlElement).textTransform;
        this.cboxAllCaps.checked = value && value.includes(core.types.TEXTTRANSFORMS.UPPERCASE);
        this.lddlbEffect.enabled = this.#control instanceof core.classes.Label;
        if (this.#control.effect) {
            let idx = Object.keys(core.locales[core.currentLocale].labelEffects).findIndex(e => e.toLowerCase() === this.#control.effect.cssName.toLowerCase());
            this.lddlbEffect.dropDownListBox.itemIndex = ++idx;
        }
        //control.effect && 
        this.updateControl(this.form.lblPreview);
    }
    //#endregion updateFromObject
    //#region close
    close() {
        this.modalResult === Window.MODALRESULTS.OK && this.updateControl(this.#control);
        super.close();
    }
    //#endregion close
    //#endregion Methods
}
//#endregion FontDlg
//#region class FontDialog
class FontDialog extends CommonDialog {
    //#region Private fields
    #control = null;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
        }
    }
    //#endregion constructor
    //#region Methods
    //#region loaded
    execute(control, callback) {
        //#region Variables déclaration
        let dlg;
        //#endregion Variables déclaration
        this.#control = control;
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
    'fontDlg.lddlbEffect.label': 'Effet spécial :'
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
    'fontDlg.lddlbEffect.label': 'Special effect :'
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
        `<jagui-labeleddropdownlistbox id="{internalId}" data-class="LabeledDropDownListBox" class="Control LabeledControl LabeledDropDownListBox"><properties>{ "name": "lddlbEffect", "column": 1, "row": 2, "colSpan": 4 }</properties></jagui-labeleddropdownlistbox>`,
        '</jagui-gridlayout></fieldset>',
        '<fieldset id="{internalId}" data-class="GroupBox" class="Control GroupBox {theme}"><properties>{ "name": "grpBPreview", "column": 1, "row": 7, "colSpan": 9 }</properties>',
        '<jagui-flexlayout id="{internalId}" data-class="FlexLayout" class="Control FlexLayout {theme}"><properties>{ "name": "flxLayout", "align": "client", "justifyContent": "center", "alignItems": "center" }</properties>',
        '<jagui-label id="{internalId}" data-class="Label" class="Label {theme}"><properties>{ "name": "lblPreview", "caption": "AaBbYyZz" }</properties></jagui-label>',
        '<jagui-flexlayout></fieldset>',
        '<jagui-gridlayout id="{internalId}" data-class="GridLayout" class="Control GridLayout">',
        '<properties>{ "name": "grdLayout_footer", "templateColumns": "90px 71px 1fr 71px 90px", ',
        '"templateRows": "1fr", "columnGap": 0, "rowGap": 0, "column": 1, "row": 9, "colSpan": 10 }</properties>',
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