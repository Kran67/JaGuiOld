(function () {
    //#region DataSourceTypes
    $j.types.DataSourceTypes = {
        WEBSERVICE: "webService",
        COLLECTION: "collection",
        MEMORYXML: "memoryXML",
        LOCALDB: "localDB",
        EXTERNALDB: "externalDB",
        MEMORYJSON: "memoryJSON",
        FILE: "file"
    }
    //#endregion
    //#region DataSource
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.BASECSSCOMPONENTS) + "dataSource");
    var DataSource = $j.classes.Component.extend("DataSource", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private properties
                this._controls = [];
                //#endregion
                this.autoEdit = true;
                //this.dataType=$j.types.DataSourceTypes.MEMORYJSON;
                $j.tools.addPropertyFromSet(this, "dataType", $j.types.DataSourceTypes, $j.types.DataSourceTypes.MEMORYJSON);
                this.dataset = null;
                this.enabled = true;
            }
        },
        //#region Setters
        setAutoEdit: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.autoEdit !== newValue) {
                this.autoEdit = newValue;
            }
        },
        setDataset: function (newValue) {
            if (!(newValue instanceof $j.classes.DataSet)) return;
            if (this.dataset !== newValue) {
                this.dataset = newValue;
                this.dataset.dataSource = this;
            }
        },
        setEnabled: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.enabled !== newValue) {
                this.enabled = newValue;
            }
        },
        //#endregion
        //#region Methods
        addControl: function (control) {
            if (this._controls.indexOf(control) > -1) return;
            else this._controls.push(control);
        },
        removeControl: function (control) {
            if (this._controls.indexOf(control) > -1) return;
            else this._controls.remove(control);
        },
        refreshControls: function () {
            for (var i = 0, l = this._controls.length; i < l; i++) {
                this._controls[i].refresh();
            }
        },
        updateFromHTML: function () {
            var data;
            data = this._HTMLElement.dataset.type;
            if (data) {
                this.dataType = data;
            }
            if (this.dataType === $j.types.DataSourceTypes.MEMORYJSON) {
                data = this._HTMLElement.dataset.dataset;
                if (data) {
                    this.dataset = data;
                }
            }
            if (this.dataType === $j.types.DataSourceTypes.FILE) {
                data = this._HTMLElement.dataset.dataset;
                if (data) {
                    this.dataset = data;
                }
            }
        },
        loaded: function () {
            this._inherited();
            if (this.dataset) {
                if (this.form[this.dataset]) {
                    this.setDataset(this.form[this.dataset]);
                }
            }
        },
        destroy: function () {
            this._inherited();
            this._controls.destroy();
            this._controls = null;
            this.autoEdit = null;
            this.dataType = null;
            this.dataset = null;
            this.enabled = null;
        }
        //#endregion
    });
    Object.seal(DataSource);
    $j.classes.register($j.types.categories.DATA, DataSource);
    //#endregion
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var DataSourceTpl = "<div id='{internalId}' data-name='{name}' data-class='DataSource' class='Control ShortCutIcon' data-type='file'>\
                       <div class='Control ShortCutIconImg datasource'></div>\
                       <div class='Control ShortCutIconCaption'>{name}</div>\
                       </div>";
        $j.classes.registerTemplates([{ Class: DataSource, template: DataSourceTpl }]);
    }
    //#endregion
})();