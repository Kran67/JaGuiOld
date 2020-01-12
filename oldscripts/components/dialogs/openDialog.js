(function () {
    var OpenDialog = $j.classes.CommonDialog.extend("OpenDialog", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                //#region Private properties
                this._form = $j.doc.createElement($j.types.HTMLElements.FORM);
                this._inputFile = $j.doc.createElement($j.types.HTMLElements.INPUT);
                this._inputFile.type = "file";
                this._inputFile.multiple = false;
                this._inputFile._owner = this;
                this._form.appendChild(this._inputFile);
                //#endregion
                this.filesFilter = String.EMPTY;
                this.multiple = false;
                $j.tools.events.bind(this._inputFile, "change", this.handleFileSelection);
            }
        },
        //#region Properties
        //#endregion
        //#region Methods
        handleFileSelection: function (evt) {
            var files = evt.target.files, openDlg = evt.target._owner, availableFiles = [], filesFilter = openDlg.filesFilter.split(',');
            for (var i = files.length - 1; i >= 0; i--) {
                var file = files[i];
                if (openDlg.filesFilter === String.EMPTY) availableFiles.push(file);
                else if (openDlg.filesFilter.toLowerCase().indexOf($j.tools.uri.extractFileExt(file.name).toLowerCase()) > -1) availableFiles.push(file);
            }
            openDlg._form.reset();
            if (availableFiles.length === 0) {
                $j.dialogs.error("At least one selected file is invalid - do not select any folders.<br />Please reselect and try again.");
                return;
            }
            openDlg.onClose.invoke(availableFiles);
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.filesfilter;
            if (data) this.filesFilter = data;
            data = this._HTMLElement.dataset.multiple;
            if (data) this.multiple = _conv.strToBool(data);
            //this.bindEventToHTML("onClose");
        },
        loaded: function () {
            this._inherited();
            this._inputFile.setAttribute("accept", this.filesFilter);
            this._inputFile.setAttribute("multiple", this.multiple);
        },
        execute: function () {
            this._inherited();
            this._inputFile.click();
        },
        setFileFilter: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.filesFilter !== newValue) {
                this._inputFile.setAttribute("accept", newValue);
            }
        },
        setMultiple: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.multiple !== newValue) {
                this._inputFile.setAttribute("multiple", newValue);
            }
        },
        destroy: function () {
            this._inherited();
            $j.tools.events.unBind(this._inputFile, "change", this.handleFileSelection);
            this._inputFile = null;
            this.filesFilter = null;
            this.multiple = null;
        }
        //#endregion
    });
    Object.seal(OpenDialog);
    $j.classes.register($j.types.categories.DIALOGS, OpenDialog);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var OpenDialogTpl = "<div id='{internalId}' data-name='{name}' data-class='OpenDialog' class='ShortCutIcon'>\
                       <div class='ShortCutIconImg opendialog'></div>\
                       <div class='ShortCutIconCaption'>{name}</div>\
                       </div>";
        $j.classes.registerTemplates([{ Class: OpenDialog, template: OpenDialogTpl }]);
    }
    //#endregion
})();