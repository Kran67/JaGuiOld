/*(function () {
    //#region FontDlg
    var FontDlg = $j.classes.Window.extend("FontDlg", {
        init: function (owner, props) {
            if (owner !== null) {
                this._inherited(owner, props);
                //#region Private properties
                //#endregion
                this._destroyOnHide = true;
            }
        },
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{internalId_lblPolice}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_lblStyle}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_lblSize}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_btnOk}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_ddlbPolice}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_btnCont}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_btnCancel}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_ddlbStyle}");
            html = a.join(String.uniqueId());
            a = html.split("{fontDlgDdlbSize}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_gbEffects}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_gbPreview}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_lblPreview}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_chkCrossed}");
            html = a.join(String.uniqueId());
            a = html.split("{fontDlg_chkUnderline}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_lblColor}");
            html = a.join(String.uniqueId());
            //a=html.split("{internalId_ddlbColor}");
            a = html.split("{internalId_btnColor}");
            html = a.join(String.uniqueId());
            return html;
        },
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