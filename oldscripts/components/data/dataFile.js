(function () {
    //#region DataTypes
    $j.types.dataTypes = {
        AUTO: 'auto',
        XML: 'xml',
        JSON: 'json'
    };
    //#endregion
    //#region DataFile
    var DataFile = $j.classes.DataSet.extend('DataFile', {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                this.url = String.EMPTY;
                $j.tools.addPropertyFromSet(this, 'dataType', $j.types.dataTypes, $j.types.dataTypes.AUTO);
            }
        },
        //#region Setters
        //#endregion
        //#region Methods
        updateFromHTML: function () {
            var data = this._HTMLElement.dataset.url;
            if (data) this.url = $j.tools.uri.convertToRealURI(data);
            data = this._HTMLElement.dataset.type;
            if (data) this.dataType = data;
            data = this._HTMLElement.dataset.keyfields;
            if (data) this.keyFields = data;
        },
        loaded: function () {
            this._inherited();
            if (this.url !== String.EMPTY) {
                $j.tools.xhr.load(true, this.url + '?rnd=' + new Date().getTime(), this.loadData, false, this);
            }
        },
        loadData: function (data, sender) {
            var fileExt;
            switch (sender.dataType) {
                case $j.types.dataTypes.AUTO:
                    fileExt = $j.tools.uri.extractFileExt(sender.url);
                    if (fileExt === 'json') {
                        sender._datas = JSON.parse(data);
                        sender.dataType = $j.types.dataTypes.JSON;
                    }
                    if (fileExt === 'xml') {
                        sender.dataType = $j.types.dataTypes.XML;
                    }
                    break;
                case $j.types.dataTypes.XML:
                    sender.dataType = $j.types.dataTypes.XML;

                    break;
                case $j.types.dataTypes.JSON:
                    sender._datas = JSON.parse(data);
                    break;
            }
            sender.getDatasInfos();
            if (sender.activeOnLoad) sender.setActive(true);
        },
        getDatasInfos: function () {
            switch (this.dataType) {
                case $j.types.dataTypes.JSON:
                    this._nbrRecords = this._datas.length;
                    if (this._nbrRecords > 0) this._nbrFields = Object.getOwnPropertyNames(this._datas[0]).length;
                    break;
                case $j.types.dataTypes.XML:
                    break;
            }
        },
        destroy: function () {
            this._inherited();
            this.url = null;
            this.dataType = null;
        }
        //#endregion
    });
    Object.seal(DataFile);
    $j.classes.register($j.types.categories.DATA, DataFile);
    //#endregion
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var DataFileTpl = "<div id='{internalId}' data-name='{name}' data-class='DataFile' class='Control ShortCutIcon' data-type='auto'>\
                     <div class='Control ShortCutIconImg datafile'></div>\
                     <div class='Control ShortCutIconCaption'>{name}</div>\
                     </div>";
        $j.classes.registerTemplates([{ Class: DataFile, template: DataFileTpl }]);
    }
    //#endregion
})();