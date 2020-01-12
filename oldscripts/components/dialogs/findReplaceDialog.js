(function () {
    //#region FindReplaceDlg
    var FindReplaceDlg = $j.classes.Window.extend("FindReplaceDlg", {
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{internalId_switchBtn}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_caseBtn}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_wordBtn}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_regExpBtn}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_destDdlb}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_findDdlb}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_replaceDdlb}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_nextDdlb}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_allDdlb}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_nextSBtn}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_nextSBtn_Btn}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_nextSBtn_PopBtn}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_popup}");
            html = a.join(String.uniqueId());
            return html;
        },
        loaded: function () {
            this._inherited();
            this.DestinationDDLB.dropDownCount = this.DestinationDDLB.items.length;
        },
        expendCollapse: function () {
            var form = this.form, expended;
            expended = form._HTMLElement.dataset.replace;
            if (expended === "on") {
                this.setCaption("(");
                form._HTMLElement.dataset.replace = null;
            } else {
                this.setCaption("%");
                form._HTMLElement.dataset.replace = "on";
            }
            form.DestinationDDLB.updateFromHTML();
        }
    });
    //#endregion
    //#region FindReplaceDialog
    var FindReplaceDialog = $j.classes.CommonDialog.extend("FindReplaceDialog", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                //#region Private properties
                this._dlg = null;
                //#endregion
            }
        },
        //#region Properties
        //#endregion
        //#region Methods
        execute: function () {
            this._dlg = $j.classes.createComponent($j.classes.FindReplaceDlg, $j.apps.activeApplication, null, { "parentHTML": $j.doc.body });
            this._dlg.setCaption("Find & replace");
            this._dlg.show();
            this._inherited();
        },
        destroy: function () {
            this._inherited();
            if (this._dlg) this._dlg.destroy();
            //this._dlg=null;
        }
        //#endregion
    });
    Object.seal(FindReplaceDialog);
    //#endregion
    $j.classes.register($j.types.categories.INTERNAL, FindReplaceDlg);
    $j.classes.register($j.types.categories.DIALOGS, FindReplaceDialog);
    //#region Template
    if ($j.isHTMLRenderer()) {
        var FindReplaceDlgTpl = ["<div id='{internalId}' data-name='{name}' data-class='Window' class='Control Window csr_default FindReplaceDlg {theme} borderStyle-toolWindow' data-borderstyle='toolWindow' data-clientwidth='640' data-clientheight='480'>",
                               "<div id='{internalId_Layout}' data-class='Layout' class='Control Layout WindowLayout {theme}'>",
                               $j.templates["WindowTitleBar"],
                               "<div id='{internalId_content}' data-name='showMessage_content' data-class='WindowContent' class='Control WindowContent {theme}'>",
                               // Button SwitchBtn
                               "<div id='{internalId_switchBtn}' data-name='SwitchBtn' data-class='Button' style='top:4px;width:21px;height:21px;border: 1px solid #404040;' data-onclick='expendCollapse' data-customstyle='{ \"focused\":{ \"boxShadow\":\"0 0 0 #000\" } }'>",
                               "<span style='font-family:JaGui;font-size:8pt;color: #E0E0E0;'>(</span></div>",
                               // SpeedButton CaseBtn
                               "<div id='{internalId_caseBtn}' data-name='CaseBtn' data-class='SpeedButton' class='Control SpeedButton frDlgCaseBtn {theme}' data-stayspressed='true'>",
                               "<span style='left:0;top:0;right:0;bottom:0;line-height:21px;'>Aa</span></div>",
                               // SeepButton WordBtn
                               "<div id='{internalId_wordBtn}' data-name='WordBtn' data-class='SpeedButton' class='Control SpeedButton frDlgWordBtn {theme}' data-stayspressed='true'>",
                               "<span></span></div>",
                               // SpeedButton SpeedButton
                               "<div id='{internalId_regExpBtn}' data-name='RegExpBtn' data-class='SpeedButton' class='Control SpeedButton frDlgRegExpBtn {theme}' data-stayspressed='true'>",
                               "<span></span></div>",
                               // DropDownListBox FindDDLB
                               "<div id='{internalId_findDdlb}' data-name='FindDDLB' data-class='DropDownListBox' class='Control DropDownListBox frDlgFindDdlb {theme}' data-editable='true'>",
                               "<div class='Control DropDownListBoxContent'>",
                               "<input type='text' class='csr_text' />",
                               "</div></div>",
                               // SplitButton nextSBtn
                               "<div id='{internalId_nextSBtn}' data-name='nextSBtn' data-class='SplitButton' class='Control SplitButton frDlgNextSplitBtn {theme}' data-popupmenu='PopupMenu'>",
                               "<div id='{internalId_nextSBtn_Btn}' data-name='nextSBtn_Btn' data-class='Button' style='font-family:jagui;border: 1px solid #404040;'>",
                               "<span>F</span></div>",
                               // PopupButton nextSBtn_PopBtn
                               "<div id='{internalId_nextSBtn_PopBtn}' data-name='nextSBtn_PopBtn' data-class='PopupButton' class='Control PopupButton frDlgSB_PopBtn'>",
                               "<span></span></div></div>",
                               // DropDownListBox ReplaceDDLB
                               "<div id='{internalId_replaceDdlb}' data-name='ReplaceDDLB' data-class='DropDownListBox' class='Control DropDownListBox frDlgReplaceDdlb {theme}' data-editable='true'>",
                               "<div class='Control DropDownListBoxContent'>",
                               "<input type='text' class='Control csr_text' />",
                               "</div></div>",
                               // DropDownListBox DestinationDDLB
                               "<div id='{internalId_destDdlb}' data-name='DestinationDDLB' data-class='DropDownListBox' class='Control DropDownListBox frDlgDestinationDdlb {theme}' data-editable='false' data-itemindex='0'>",
                               "<div class='Control DropDownListBoxContent'>",
                               "<input type='text' class='Control csr_default' readonly />",
                               "</div>",
                               "<!--[{\"text\":\"Sélection\",\"size\":13,\"isChecked\":false,\"enabled\":true,\"isHeader\":false,\"top\":0},",
                               "{\"text\":\"Document actif\",\"size\":13,\"isChecked\":false,\"enabled\":true,\"isHeader\":false,\"top\":16},",
                               "{\"text\":\"Tous les documents ouverts\",\"size\":13,\"isChecked\":false,\"enabled\":true,\"isHeader\":false,\"top\":32},",
                               "{\"text\":\"Projet actif\",\"size\":13,\"isChecked\":false,\"enabled\":true,\"isHeader\":false,\"top\":48},",
                               "{\"text\":\"Solution complète\",\"size\":13,\"isChecked\":false,\"enabled\":true,\"isHeader\":false,\"top\":64}]-->",
                               "</div>",
                               // SpeedButton NextBtn
                               "<div id='{internalId_nextBtn}' data-name='NextBtn' data-class='SpeedButton' class='Control SpeedButton frDlgNextBtn {theme}'>",
                               "<span></span></div>",
                               // SpeedButton AllBtn
                               "<div id='{internalId_allBtn}' data-name='AllBtn' data-class='SpeedButton' class='Control SpeedButton frDlgAllBtn {theme}'>",
                               "<span></span></div>",
                               // PopupMenu PopupMenu
                               "<div id='{internalId_popup}' data-name='PopupMenu' data-class='PopupMenu' class='Control PopupMenu nonVisual' data-designer='false'>",
                               "<!--[{\"caption\":\"Suivant\",\"shortcut\":\"F3\",\"enabled\":true,\"visible\":true,\"items\":[]},",
                               "{\"caption\":\"Rechercher le précédent\",\"shortcut\":\"Maj+F3\",\"enabled\":true,\"visible\":true,\"items\":[]},",
                               "{\"caption\":\"Rechercher tout\",\"shortcut\":\"\",\"enabled\":true,\"visible\":true,\"items\":[]}]-->",
                               "<div class='Control nonVisualImg timer_design'>",
                               "<div class='Control nonVisualCaption'>PopupMenu1</div>",
                               "</div></div>",
                               "</div></div></div>"].join(String.EMPTY),
            FindReplaceDialogTpl = "<div id='{internalId}' data-name='{name}' data-class='FindReplaceDialog' class='Control ShortCutIcon'>\
                              <div class='Control ShortCutIconImg findreplacedialog'></div>\
                              <div class='Control ShortCutIconCaption'>{name}</div>\
                              </div>";
        $j.classes.registerTemplates([{ Class: FindReplaceDlg, template: FindReplaceDlgTpl }, { Class: FindReplaceDialog, template: FindReplaceDialogTpl }]);
    }
    //#endregion
})();