(function () {
    //#region ColorDlg
    var ColorDlg = $j.classes.Window.extend("ColorDlg", {
        init: function (owner, props) {
            if (owner !== null) {
                this._inherited(owner, props);
                //#region Private properties
                this._obj = null;
                //#endregion
                this._destroyOnHide = true;
            }
        },
        //#region Setters
        setColor: function (newValue) {
            if (!(newValue instanceof $j.classes.Color)) return;
            if (!this.clrBoxCurColor.fillColor.equals(newValue)) {
                this.clrBoxCurColor.setColor(newValue);
                this.clrPicker.setColor(newValue);
                this.updateControls(newValue);
            }
        },
        //#endregion
        //#region Methods
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{internalId_clrQuad}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_clrPicker}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_lblCurColor}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_lblNewColor}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_clrBoxCurColor}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_clrBoxNewColor}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_btnRGB}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_btnHSL}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_btnHSV}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_pnlRGB}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_lblRed}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_slrRed}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_txtbRed}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_lblGreen}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_slrGreen}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_txtbGreen}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_lblBlue}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_slrBlue}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_txtbBlue}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_pnlHSL}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_lblHue}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_slrHue}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_txtbHSLHue}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_lblHSLHue}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_lblSat}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_slrSat}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_txtbHSLSat}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_lblHSLSat}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_lblLight}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_slrLight}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_txtbLight}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_lblHSLLight}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_pnlHSV}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_lblHSVHue}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_slrHSVHue}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_txtbHSVHue}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_lblHSVHueDeg}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_lblHSVSat}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_slrHVSSat}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_txtbHSVSat}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_lblHSVSatPer}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_lblValue}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_slrValue}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_txtbValue}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_lblValuePer}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_lblOpacity}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_slrOpacity}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_txtbOpacity}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_lblOpacityPer}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_btnOk}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_btnCancel}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_txtbHex}");
            html = a.join(String.uniqueId());
            return html;
        },
        loaded: function () {
            this._inherited();
            this.setWidth(this._HTMLElement.offsetWidth + parseInt(getComputedStyle(this._layout._HTMLElement).marginLeft, 10) + parseInt(getComputedStyle(this._layout._HTMLElement).marginRight, 10));
            this.setHeight(this._HTMLElement.offsetHeight + parseInt(getComputedStyle(this._layout._HTMLElement).marginTop, 10) + parseInt(getComputedStyle(this._layout._HTMLElement).marginBottom, 10));
            this.btnRGB.setPressing(true);
            this.btnRGB.canFocused = false;
            this.btnHSL.canFocused = false;
            this.btnHSV.canFocused = false;
            this.clrQuad.setColorBox(this.clrBoxNewColor);
            this.clrQuad.setColor(this.clrBoxCurColor.fillColor);
        },
        // events
        clrQuad_onChange: function () {
            var form = this.form;
            form.updateControls(this.color);
        },
        slrRed_onChange: function () {
            var form = this.form, c = new $j.classes.Color(form.clrBoxNewColor.fillColor), v = this.leftValue;
            if (form.txtbRed) {
                c.setRed(v);
                form.updateControls(c);
            }
        },
        txtbRed_onChange: function () {
            var form = this.form, c = new $j.classes.Color(form.clrBoxNewColor.fillColor), v = ~~this.text;
            if (v < form.slrRed.min) v = form.slrRed.min;
            if (v > form.slrRed.max) v = form.slrRed.max;
            c.setRed(v);
            form.updateControls(c);
        },
        slrGreen_onChange: function () {
            var form = this.form, c = new $j.classes.Color(form.clrBoxNewColor.fillColor), v = this.leftValue;
            if (form.txtbGreen) {
                c.setGreen(v);
                form.updateControls(c);
            }
        },
        txtbGreen_onChange: function () {
            var form = this.form, c = new $j.classes.Color(form.clrBoxNewColor.fillColor), v = ~~this.text;
            if (v < form.slrGreen.min) v = form.slrGreen.min;
            if (v > form.slrGreen.max) v = form.slrGreen.max;
            c.setGreen(v);
            form.updateControls(c);
        },
        slrBlue_onChange: function () {
            var form = this.form, c = new $j.classes.Color(form.clrBoxNewColor.fillColor), v = this.leftValue;
            if (form.txtbBlue) {
                c.setBlue(v);
                form.updateControls(c);
            }
        },
        txtbBlue_onChange: function () {
            var form = this.form, c = new $j.classes.Color(form.clrBoxNewColor.fillColor), v = ~~this.text;
            if (v < form.slrBlue.min) v = form.slrBlue.min;
            if (v > form.slrBlue.max) v = form.slrBlue.max;
            c.setBlue(v);
            form.updateControls(c);
        },
        slrHue_onChange: function () {
            var form = this.form, c = new $j.classes.Color(form.clrBoxNewColor.fillColor), v = this.leftValue;
            if (form.txtbHSLHue) {
                c.setHue(v);
                form.updateControls(c);
            }
        },
        txtbHue_onChange: function () {
            var form = this.form, c = new $j.classes.Color(form.clrBoxNewColor.fillColor), v = ~~this.text;
            if (v < form.slrHue.min) v = form.slrHue.min;
            if (v > form.slrHue.max) v = form.slrHue.max;
            c.setHue(v);
            form.updateControls(c);
        },
        slrSat_onChange: function () {
            var form = this.form, c = new $j.classes.Color(form.clrBoxNewColor.fillColor), v = this.leftValue;
            if (form.txtbHSLSat) {
                c.setSaturation(v);
                form.updateControls(c);
            }
        },
        txtbSat_onChange: function () {
            var form = this.form, c = new $j.classes.Color(form.clrBoxNewColor.fillColor), v = ~~this.text;
            if (v < form.slrSat.min) v = form.slrSat.min;
            if (v > form.slrSat.max) v = form.slrSat.max;
            c.setSaturation(v);
            form.updateControls(c);
        },
        slrLight_onChange: function () {
            var form = this.form, c = new $j.classes.Color(form.clrBoxNewColor.fillColor), v = this.leftValue;
            if (form.txtbLight) {
                c.setLightness(v);
                form.updateControls(c);
            }
        },
        txtbLight_onChange: function () {
            var form = this.form, c = new $j.classes.Color(form.clrBoxNewColor.fillColor), v = ~~this.text;
            if (v < form.slrLight.min) v = form.slrLight.min;
            if (v > form.slrLight.max) v = form.slrLight.max;
            c.setLightness(v);
            form.updateControls(c);
        },
        slrHVSSat_onChange: function () {
            var form = this.form, c = new $j.classes.Color(form.clrBoxNewColor.fillColor), v = ~~this.text;
            c.setSaturation(v);
            form.updateControls(c);
        },
        slrValue_onChange: function () {
            var form = this.form, c = new $j.classes.Color(form.clrBoxNewColor.fillColor), v = this.leftValue;
            if (form.txtbValue) {
                c.setValue(v);
                form.updateControls(c);
            }
        },
        txtbValue_onChange: function () {
            var form = this.form, c = new $j.classes.Color(form.clrBoxNewColor.fillColor), v = ~~this.text;
            if (v < form.slrValue.min) v = form.slrValue.min;
            if (v > form.slrValue.max) v = form.slrValue.max;
            c.setValue(v);
            form.updateControls(c);
        },
        slrOpacity_onChange: function () {
            var form = this.form, c = new $j.classes.Color(form.clrBoxNewColor.fillColor), v = this.leftValue;
            if (form.txtbOpacity) {
                c.setAlpha(v);
                form.updateControls(c);
            }
        },
        txtbOpacity_onChange: function () {
            var form = this.form, c = new $j.classes.Color(form.clrBoxNewColor.fillColor), v = (~~this.text) / 100;
            if (v < form.slrOpacity.min) v = form.slrOpacity.min;
            if (v > form.slrOpacity.max) v = form.slrOpacity.max;
            c.setAlpha(v);
            form.updateControls(c);
        },
        txtbHex_onChange: function () {
            var form = this.form, c = _colors.parse(this.text);
            c.setAlpha(1);
            form.updateControls(c);
        },
        btn_onClick: function () {
            var form = this.form, c = new $j.classes.Color(form.clrBoxNewColor.fillColor);
            if (this !== form.btnRGB) {
                form.btnRGB.setPressing(false);
                form.pnlRGB.setVisible(false);
            }
            if (this !== form.btnHSL) {
                form.btnHSL.setPressing(false);
                form.pnlHSL.setVisible(false);
            }
            if (this !== form.btnHSV) {
                form.btnHSV.setPressing(false);
                form.pnlHSV.setVisible(false);
            }
            if (this === form.btnRGB) form.pnlRGB.setVisible(true);
            if (this === form.btnHSL) form.pnlHSL.setVisible(true);
            if (this === form.btnHSV) {
                form.pnlHSV.setVisible(true);
                form.clrQuad.setFormat($j.types.colorFormats.HSV);
                c.RGBtoHSV();
            } else {
                form.clrQuad.setFormat($j.types.colorFormats.HSL);
                if (this === form.btnHSL) {
                    c.RGBtoHSL();
                }
            }
            form.updateControls(c);
        },
        updateControls: function (color) {
            if (this._loading || this._creating) return;
            color.setAlpha(this.slrOpacity.leftValue);
            this.clrBoxNewColor.setColor(color);
            this.clrBoxNewColor.update();
            color.setAlpha(1);
            this.clrPicker.updating();
            this.clrPicker.setColor(color);
            this.clrPicker.updated();
            this.clrQuad.updating();
            this.clrQuad.setColor(color);
            this.clrQuad.updated();
            // RGB Tab
            this.slrRed.updating();
            this.slrRed.setValues([color.red, 0]);
            this.slrRed.updated();
            this.txtbRed.updating();
            this.txtbRed.setText(_conv.intToStr(color.red));
            this.txtbRed.updated();
            this.slrGreen.updating();
            this.slrGreen.setValues([color.green, 0]);
            this.slrGreen.updated();
            this.txtbGreen.updating();
            this.txtbGreen.setText(_conv.intToStr(color.green));
            this.txtbGreen.updated();
            this.slrBlue.updating();
            this.slrBlue.setValues([color.blue, 0]);
            this.slrBlue.updated();
            this.txtbBlue.updating();
            this.txtbBlue.setText(_conv.intToStr(color.blue));
            this.txtbBlue.updated();
            // HSL Tab
            this.slrHue.updating();
            this.slrHue.setValues([color.hue, 0]);
            this.slrHue.updated();
            this.txtbHSLHue.updating();
            this.txtbHSLHue.setText(_conv.intToStr(color.hue));
            this.txtbHSLHue.updated();
            this.slrSat.updating();
            this.slrSat.setValues([color.saturation, 0]);
            this.slrSat.updated();
            this.txtbHSLSat.updating();
            this.txtbHSLSat.setText(_conv.intToStr(color.saturation));
            this.txtbHSLSat.updated();
            this.slrLight.updating();
            this.slrLight.setValues([color.lightness, 0]);
            this.slrLight.updated();
            this.txtbLight.updating();
            this.txtbLight.setText(_conv.intToStr(color.lightness));
            this.txtbLight.updated();
            // HSV Tab
            this.slrHSVHue.updating();
            this.slrHSVHue.setValues([color.hue, 0]);
            this.slrHSVHue.updated();
            this.txtbHSVHue.updating();
            this.txtbHSVHue.setText(_conv.intToStr(color.hue));
            this.txtbHSVHue.updated();
            this.slrHVSSat.updating();
            this.slrHVSSat.setValues([color.saturation, 0]);
            this.slrHVSSat.updated();
            this.txtbHSVSat.updating();
            this.txtbHSVSat.setText(_conv.intToStr(color.saturation));
            this.txtbHSVSat.updated();
            this.slrValue.updating();
            this.slrValue.setValues([color.value, 0]);
            this.slrValue.updated();
            this.txtbValue.updating();
            this.txtbValue.setText(_conv.intToStr(color.value));
            this.txtbValue.updated();
            // Opacity
            this.txtbOpacity.updating();
            this.txtbOpacity.setText(_conv.intToStr(~~(color.alpha * 100)));
            this.txtbOpacity.updated();
            // Hex textBox
            this.txtbHex.updating();
            this.txtbHex.setText(color.toRGBHexString().toUpperCase());
            this.txtbHex.updated();
        }
        //#endregion
    });
    //#endregion
    //#region ColorDialog
    var ColorDialog = $j.classes.CommonDialog.extend("ColorDialog", {
        init: function (owner, props) {
            if (owner !== null) {
                this._inherited(owner, props);
                //#region Private properties
                //this._dlg=null;
                this._obj = null;
                //#endregion
            }
        },
        //#region Methods
        execute: function (obj, callback) {
            this._obj = obj;
            var _dlg = $j.classes.createComponent($j.classes.ColorDlg, $j.apps.activeApplication, null, { "parentHTML": $j.doc.body });
            _dlg.loaded();
            if (!obj) {
                _dlg.setColor(_colors.RED);
            } else this._dlg.setColor(obj.color);
            _dlg.dialog = this;
            _dlg._obj = obj;
            _dlg.onClose.addListener(callback);
            _dlg.setCaption("Couleurs");
            _dlg.center();
            _dlg.showModal();
            this._inherited();
        },
        destroy: function () {
            this._inherited();
            //if (this._dlg)) this._dlg.destroy();
            //this._dlg=null;
            this._obj = null;
        }
        //#endregion
    });
    Object.seal(ColorDialog);
    //#endregion
    $j.classes.register($j.types.categories.INTERNAL, ColorDlg);
    $j.classes.register($j.types.categories.DIALOGS, ColorDialog);
    //#region Template
    if ($j.isHTMLRenderer()) {
        var ColorDlgTpl = ["<div id='{internalId}' data-name='{name}' data-class='Window' class='Control Window csr_default ColorDlg {theme} borderStyle-dialog' data-borderstyle='dialog' data-clientwidth='570' data-clientheight='293' data-position='screenCenter'>",
                        "<div id='{internalId_Layout}' data-class='Layout' class='Control Layout WindowLayout {theme}'>",
                        $j.templates["WindowTitleBar"],
                        "<div id='{internalId_content}' data-name='color_content' data-class='WindowContent' class='Control WindowContent {theme}'>",
                        // ColorQuad
                        "<div id='{internalId_clrQuad}' data-name='clrQuad' data-class='ColorQuad' class='Control ColorQuad hsl colorDlgClrQuad' data-color='blue' data-format='hsl' data-onchange='clrQuad_onChange'>",
                        "<div class='Control ColorQuadIndicator'></div>",
                        "</div>",
                        // ColorPicker
                        "<div id='{internalId_clrPicker}' data-name='clrPicker' data-class='ColorPicker' class='Control ColorPicker colorDlgClrPicker' data-colorquad='clrQuad' data-color='blue'>",
                        "<div class='Control ColorPickerIndicator'></div>",
                        "</div>",
                        // Label CurrentColor
                        "<label id='{internalId_lblCurColor}' data-name='lblCurColor' data-class='Label' class='Control csr_default Label colorDlgLblCurColor'>Couleur actuelle :</label>",
                        // Label NewColor
                        "<label id='{internalId_lblNewColor}' data-name='lblNewColor' data-class='Label' class='Control csr_default Label colorDlgLblNewColor'>Nouvelle couleur :</label>",
                        // ColorBox CurrentColor
                        "<div id='{internalId_clrBoxCurColor}' data-name='clrBoxCurColor' data-class='ColorBox' class='Control ColorBox colorDlgClrBoxCurColor' data-color='blue'></div>",
                        // ColorBox NewColor
                        "<div id='{internalId_clrBoxNewColor}' data-name='clrBoxNewColor' data-class='ColorBox' class='Control ColorBox colorDlgClrBoxNewColor' data-color='blue'></div>",
                        // BtnRGB
                        "<div id='colorDlgBtnContainer' data-name='colorDlg_btnContainer' data-class='Layout' class='Control Layout'>",
                        "<button id='{internalId_btnRGB}' data-name='btnRGB' data-class='Button' class='Control Button {theme} colorDlgBtnRGB' style='width:40px;height:25px;'  data-onclick='btn_onClick' data-stayspressed='true'>RGB</button>",
                        // BtnHSL
                        "<button id='{internalId_btnHSL}' data-name='btnHSL' data-class='Button' class='Control Button {theme} colorDlgBtnHSL' style='left:40px;width:40px;height:25px;'  data-onclick='btn_onClick' data-stayspressed='true'>HSL</button>",
                        // BtnHSV
                        "<button id='{internalId_btnHSV}' data-name='btnHSV' data-class='Button' class='Control Button {theme} colorDlgBtnHSV' style='left:80px;width:40px;height:25px;'  data-onclick='btn_onClick' data-stayspressed='true'>HSV</button>",
                        "</div>",
                        // PanelRGB
                        "<div id='{internalId_pnlRGB}' data-name='pnlRGB' data-class='Panel' class='Control Panel colorDlgPnlRGB {theme}'  data-visible='true'>",
                        // RedLabel
                        "<label id='{internalId_lblRed}' data-name='lblRed' data-class='Label' class='Control csr_default Label colorDlgLblRed'>Rouge :</label>",
                        // RedSlider
                        "<div id='{internalId_slrRed}' data-name='slrRed' data-class='Slider' class='Control Slider colorDlgSlrRed {theme} orientation-horizontal' data-values='[0,0]' data-orientation='horizontal' data-mode='normal' data-frequency='1' data-min='0' data-max='255' data-onchange='slrRed_onChange' data-decimalprecision='0'>",
                        "<div class='Control SliderRange {theme} orientation-horizontal noDisplay'></div>",
                        "<div id='{internalId_slrRed}_1' data-class='Thumb' class='Control SliderThumb {theme} orientation-horizontal' data-jsonname='leftthumb'></div>",
                        "<div id='{internalId_slrRed}_2' data-class='Thumb' class='Control SliderThumb {theme} orientation-horizontal' style='display:none;'></div>",
                        "</div>",
                        // RedTextBox
                        "<div id='{internalId_txtbRed}' data-name='txtbRed' data-class='TextBox' class='Control TextBox {theme} colorDlgTxtbRed' data-onchange='txtbRed_onChange' data-maxlength='3' data-filterchars='0123456789'>",
                        "<input type='text' value='0' class='Control csr_text TextBoxInput {theme}' />",
                        "</div>",
                        // GreenLabel
                        "<label id='{internalId_lblGreen}' data-name='lblGreen' data-class='Label' class='Control csr_default Label colorDlgLblGreen'>Vert :</label>",
                        // GreenSlider
                        "<div id='{internalId_slrGreen}' data-name='slrGreen' data-class='Slider' class='Control Slider colorDlgSlrGreen {theme} orientation-horizontal' data-values='[0,0]' data-orientation='horizontal' data-mode='normal' data-frequency='1' data-min='0' data-max='255' data-onchange='slrGreen_onChange' data-decimalprecision='0'>",
                        "<div class='Control SliderRange {theme} orientation-horizontal noDisplay'></div>",
                        "<div id='{internalId_slrGreen}_1' data-class='Thumb' class='Control SliderThumb {theme} orientation-horizontal' data-jsonname='leftthumb'></div>",
                        "<div id='{internalId_slrGreen}_2' data-class='Thumb' class='Control SliderThumb {theme} orientation-horizontal' style='display:none;'></div>",
                        "</div>",
                        // GreenTextBox
                        "<div id='{internalId_txtbGreen}' data-name='txtbGreen' data-class='TextBox' class='Control TextBox {theme} colorDlgTxtbGreen' data-onchange='txtbGreen_onChange' data-maxlength='3' data-filterchars='0123456789'>",
                        "<input type='text' value='0' class='Control csr_text TextBoxInput {theme}' />",
                        "</div>",
                        // BlueLabel
                        "<label id='{internalId_lblBlue}' data-name='lblBlue' data-class='Label' class='Control csr_default Label colorDlgLblBlue'>Bleu :</label>",
                        // BlueSlider
                        "<div id='{internalId_slrBlue}' data-name='slrBlue' data-class='Slider' class='Control Slider colorDlgSlrBlue {theme} orientation-horizontal' data-values='[0,0]' data-orientation='horizontal' data-mode='normal' data-frequency='1' data-min='0' data-max='255' data-onchange='slrBlue_onChange' data-decimalprecision='0'>",
                        "<div class='Control SliderRange {theme} orientation-horizontal noDisplay'></div>",
                        "<div id='{internalId_slrBlue}_1' data-class='Thumb' class='Control SliderThumb {theme} orientation-horizontal' data-jsonname='leftthumb'></div>",
                        "<div id='{internalId_slrBlue}_2' data-class='Thumb' class='Control SliderThumb {theme} orientation-horizontal' style='display:none;'></div>",
                        "</div>",
                        // BlueTextBox
                        "<div id='{internalId_txtbBlue}' data-name='txtbBlue' data-class='TextBox' class='Control TextBox {theme} colorDlgTxtbBlue' data-onchange='txtbBlue_onChange' data-maxlength='3' data-filterchars='0123456789'>",
                        "<input type='text' value='0' class='Control csr_text TextBoxInput {theme}' />",
                        "</div>",
                        "</div>",
                        // PanelHSL
                        "<div id='{internalId_pnlHSL}' data-name='pnlHSL' data-class='Panel' class='Control Panel colorDlgPnlHSL hidden {theme}' data-visible='false'>",
                        // HSL_HueLabel
                        "<label id='{internalId_lblHue}' data-name='lblHue' data-class='Label' class='Control csr_default Label colorDlgLblHue'>Hue :</label>",
                        // HueSlider
                        "<div id='{internalId_slrHue}' data-name='slrHue' data-class='Slider' class='Control Slider colorDlgSlrHue {theme} orientation-horizontal' data-values='[0,0]' data-orientation='horizontal' data-mode='normal' data-frequency='1' data-min='0' data-max='359' data-onchange='slrHue_onChange' data-decimalprecision='0'>",
                        "<div class='Control SliderRange {theme} orientation-horizontal noDisplay'></div>",
                        "<div id='{internalId_slrHue}_1' data-class='Thumb' class='Control SliderThumb {theme} orientation-horizontal' data-jsonname='leftthumb'></div>",
                        "<div id='{internalId_slrHue}_2' data-class='Thumb' class='Control SliderThumb {theme} orientation-horizontal' style='display:none;'></div>",
                        "</div>",
                        // HSL_HueTextBox
                        "<div id='{internalId_txtbHSLHue}' data-name='txtbHSLHue' data-class='TextBox' class='Control TextBox {theme} colorDlgTxtbHSLHue' data-onchange='txtbHue_onChange' data-maxlength='3' data-filterchars='0123456789'>",
                        "<input type='text' value='0' class='Control csr_text TextBoxInput {theme}' />",
                        "</div>",
                        // HSL_HueLabel
                        "<label id='{internalId_lblHSLHue}' data-name='lblHSLHue' data-class='Label' class='Control csr_default Label colorDlgLblHSLHue'>°</label>",
                        // HSL_SatLabel
                        "<label id='{internalId_lblSat}' data-name='lblSat' data-class='Label' class='Control csr_default Label colorDlgLblSat'>Saturation :</label>",
                        // SatSlider
                        "<div id='{internalId_slrSat}' data-name='slrSat' data-class='Slider' class='Control Slider colorDlgSlrSat {theme} orientation-horizontal' data-values='[0,0]' data-orientation='horizontal' data-mode='normal' data-frequency='1' data-min='0' data-max='359' data-onchange='slrSat_onChange' data-decimalprecision='0'>",
                        "<div class='Control SliderRange {theme} orientation-horizontal noDisplay'></div>",
                        "<div id='{internalId_slrSat}_1' data-class='Thumb' class='Control SliderThumb {theme} orientation-horizontal' data-jsonname='leftthumb'></div>",
                        "<div id='{internalId_slrSat}_2' data-class='Thumb' class='Control SliderThumb {theme} orientation-horizontal' style='display:none;'></div>",
                        "</div>",
                        // HSL_SatTextBox
                        "<div id='{internalId_txtbHSLSat}' data-name='txtbHSLSat' data-class='TextBox' class='Control TextBox {theme} colorDlgTxtbHSLSat' data-onchange='txtbSat_onChange' data-maxlength='3' data-filterchars='0123456789'>",
                        "<input type='text' value='0' class='Control csr_text TextBoxInput {theme}' />",
                        "</div>",
                        // HSL_SatLabel
                        "<label id='{internalId_lblHSLSat}' data-name='lblHSLSat' data-class='Label' class='Control csr_default Label colorDlgLblHSLSat'>%</label>",
                        // HSL_LightLabel
                        "<label id='{internalId_lblLight}' data-name='lblLight' data-class='Label' class='Control csr_default Label colorDlgLblLight'>Luminosité :</label>",
                        // LightSlider
                        "<div id='{internalId_slrLight}' data-name='slrLight' data-class='Slider' class='Control Slider colorDlgSlrLight {theme} orientation-horizontal' data-values='[0,0]' data-orientation='horizontal' data-mode='normal' data-frequency='1' data-min='0' data-max='100' data-onchange='slrLight_onChange' data-decimalprecision='0'>",
                        "<div class='Control SliderRange {theme} orientation-horizontal noDisplay'></div>",
                        "<div id='{internalId_slrLight}_1' data-class='Thumb' class='Control SliderThumb {theme} orientation-horizontal' data-jsonname='leftthumb'></div>",
                        "<div id='{internalId_slrLight}_2' data-class='Thumb' class='Control SliderThumb {theme} orientation-horizontal' style='display:none;'></div>",
                        "</div>",
                        // LightTextBox
                        "<div id='{internalId_txtbLight}' data-name='txtbLight' data-class='TextBox' class='Control TextBox {theme} colorDlgTxtbLight' data-onchange='txtbLight_onChange' data-maxlength='3' data-filterchars='0123456789'>",
                        "<input type='text' value='0' class='Control csr_text TextBoxInput {theme}' />",
                        "</div>",
                        // LightLabel
                        "<label id='{internalId_lblHSLLight}' data-name='lblHSLLight' data-class='Label' class='Control csr_default Label colorDlgLblHSLLight'>%</label>",
                        "</div>",
                        // PanelHSV
                        "<div id='{internalId_pnlHSV}' data-name='pnlHSV' data-class='Panel' class='Control Panel colorDlgPnlHSV hidden {theme}' data-visible='false'>",
                        // HSV_HueLabel
                        "<label id='{internalId_lblHSVHue}' data-name='lblHSVHue' data-class='Label' class='Control csr_default Label colorDlgLblHSVHue'>Hue :</label>",
                        // HSV_HueSlider
                        "<div id='{internalId_slrHSVHue}' data-name='slrHSVHue' data-class='Slider' class='Control Slider colorDlgSlrHSVHue {theme} orientation-horizontal' data-values='[0,0]' data-orientation='horizontal' data-mode='normal' data-frequency='1' data-min='0' data-max='100' data-onchange='slrHue_onChange' data-decimalprecision='0'>",
                        "<div class='Control SliderRange {theme} orientation-horizontal noDisplay'></div>",
                        "<div id='{internalId_slrHSVHue}_1' data-class='Thumb' class='Control SliderThumb {theme} orientation-horizontal' data-jsonname='leftthumb'></div>",
                        "<div id='{internalId_slrHSVHue}_2' data-class='Thumb' class='Control SliderThumb {theme} orientation-horizontal' style='display:none;'></div>",
                        "</div>",
                        // HSV_HueTextBox
                        "<div id='{internalId_txtbHSVHue}' data-name='txtbHSVHue' data-class='TextBox' class='Control TextBox {theme} colorDlgTxtbHSVHue' data-onchange='txtbHue_onChange' data-maxlength='3' data-filterchars='0123456789'>",
                        "<input type='text' value='0' class='Control csr_text TextBoxInput {theme}' />",
                        "</div>",
                        // HVS_HueLabel
                        "<label id='{internalId_lblHSVHueDeg}' data-name='lblHSVHueDeg' data-class='Label' class='Control csr_default Label colorDlgLblHSVHueDeg'>°</label>",
                        // HSV_SatLabel
                        "<label id='{internalId_lblHSVSat}' data-name='lblHSVSat' data-class='Label' class='Control csr_default Label colorDlgLblHSVSat'>Saturation :</label>",
                        // HVS_SatSlider
                        "<div id='{internalId_slrHVSSat}' data-name='slrHVSSat' data-class='Slider' class='Control Slider colorDlgSlrHVSSat {theme} orientation-horizontal' data-values='[0,0]' data-orientation='horizontal' data-mode='normal' data-frequency='1' data-min='0' data-max='100' data-onchange='slrSat_onChange' data-decimalprecision='0'>",
                        "<div class='Control SliderRange {theme} orientation-horizontal noDisplay'></div>",
                        "<div id='{internalId_slrHVSSat}_1' data-class='Thumb' class='Control SliderThumb {theme} orientation-horizontal' data-jsonname='leftthumb'></div>",
                        "<div id='{internalId_slrHVSSat}_2' data-class='Thumb' class='Control SliderThumb {theme} orientation-horizontal' style='display:none;'></div>",
                        "</div>",
                        // HSV_SatTextBox
                        "<div id='{internalId_txtbHSVSat}' data-name='txtbHSVSat' data-class='TextBox' class='Control TextBox {theme} colorDlgTxtbHSVSat' data-onchange='txtbSat_onChange' data-maxlength='3' data-filterchars='0123456789'>",
                        "<input type='text' value='0' class='Control csr_text TextBoxInput {theme}' />",
                        "</div>",
                        // HSV_SatLabel
                        "<label id='{internalId_lblHSVSatPer}' data-name='lblHSVSatPer' data-class='Label' class='Control csr_default Label colorDlgLblHSVSatPer'>%</label>",
                        // HSV_ValueLabel
                        "<label id='{internalId_lblValue}' data-name='lblValue' data-class='Label' class='Control csr_default Label colorDlgLblValue'>Valeur :</label>",
                        // ValueSlider
                        "<div id='{internalId_slrValue}' data-name='slrValue' data-class='Slider' class='Control Slider colorDlgSlrValue {theme} orientation-horizontal' data-values='[0,0]' data-orientation='horizontal' data-mode='normal' data-frequency='1' data-min='0' data-max='100' data-onchange='slrValue_onChange' data-decimalprecision='0'>",
                        "<div class='Control SliderRange {theme} orientation-horizontal noDisplay'></div>",
                        "<div id='{internalId_slrValue}_1' data-class='Thumb' class='Control SliderThumb {theme} orientation-horizontal' data-jsonname='leftthumb'></div>",
                        "<div id='{internalId_slrValue}_2' data-class='Thumb' class='Control SliderThumb {theme} orientation-horizontal' style='display:none;'></div>",
                        "</div>",
                        // ValueTextBox
                        "<div id='{internalId_txtbValue}' data-name='txtbValue' data-class='TextBox' class='Control TextBox {theme} colorDlgTxtbValue' data-onchange='txtbValue_onChange' data-maxlength='3' data-filterchars='0123456789'>",
                        "<input type='text' value='0' class='Control csr_text TextBoxInput {theme}' />",
                        "</div>",
                        // ValueLabel
                        "<label id='{internalId_lblValuePer}' data-name='lblValuePer' data-class='Label' class='Control csr_default Label colorDlgLblValuePer'>%</label>",
                        "</div>",
                        // OpacityLabel
                        "<label id='{internalId_lblOpacity}' data-name='lblOpacity' data-class='Label' class='Control csr_default Label colorDlgLblOpacity'>Opacité :</label>",
                        // OpacitySilder
                        "<div id='{internalId_slrOpacity}' data-name='slrOpacity' data-class='AlphaSlider' class='Control AlphaSlider carbon orientation-horizontal colorDlgSlrOpacity' data-values='[1,0]' data-mode='normal' data-orientation='horizontal'  data-onchange='slrOpacity_onChange' data-decimalprecision='2'>",
                        "<div id='{internalId_slrOpacity}_1' data-class='Thumb' class='Control SliderThumb carbon orientation-horizontal'></div>",
                        "</div>",
                        // OpacityTextbox
                        "<div id='{internalId_txtbOpacity}' data-name='txtbOpacity' data-class='TextBox' class='Control TextBox {theme} colorDlgTxtbOpacity' data-onchange='txtbOpacity_onChange' data-maxlength='3' data-filterchars='0123456789'>",
                        "<input type='text' value='0' class='Control csr_text TextBoxInput {theme}' />",
                        "</div>",
                        // OpacityLabel
                        "<label id='{internalId_lblOpacityPer}' data-name='lblOpacityPer' data-class='Label' class='Control csr_default Label colorDlgLblOpacityPer'>µ</label>",
                        // HexTextbox
                        "<div id='{internalId_txtbHex}' data-name='txtbHex' data-class='TextBox' class='Control TextBox {theme} colorDlgTxtbHex' data-onchange='txtbHex_onChange' data-maxlength='7' data-filterchars='#0123456789ABCDEF'>",
                        "<input type='text' value='0' class='Control csr_text TextBoxInput {theme}' />",
                        "</div>",
                        // Bouton Ok
                        "<button id='{internalId_btnOk}' data-name='btnOk' data-class='Button' class='Control Button {theme}' style='left:401px;top:226px;width:71px;height:25px;' data-modalresult='ok'>Ok</button>",
                        // Bouton Annuler
                        "<button id='{internalId_btnCancel}' data-name='btnCancel' data-class='Button' class='Control Button {theme}' style='left:482px;top:226px;width:71px;height:25px;' data-modalresult='cancel'>Annuler</button>",
                        "</div>",
                        "</div></div></div>"].join(String.EMPTY),
            ColorDialogTpl = "<div id='{internalId}' data-name='{name}' data-class='ColorDialog' class='Control ShortCutIcon'>\
                        <div class='Control ShortCutIconImg colordialog'></div>\
                        <div class='Control ShortCutIconCaption'>{name}</div>\
                        </div>";
        $j.classes.registerTemplates([{ Class: ColorDlg, template: ColorDlgTpl }, { Class: ColorDialog, template: ColorDialogTpl }]);
    }
    //#endregion
})();