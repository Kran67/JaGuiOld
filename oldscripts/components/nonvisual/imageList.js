(function () {
    //#region ImageList
    var ImageList = $j.classes.Component.extend("ImageList", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                //#region Private properties
                this._images = [];
                //#endregion
                this.imageHeight = 16;
                this.imageWidth = 16;
            }
        },
        //#region Setters
        setImageWidth: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.imageWidth !== newValue) {
                this.imageWidth = newValue;
            }
        },
        setImageHeight: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.imageHeight !== newValue) {
                this.imageHeight = newValue;
            }
        },
        //#endregion
        //#region Methods
        getImage: function (idx) {
            if (idx < 0) return String.EMPTY;
            if (idx > this._images.length) return String.EMPTY;
            return this._images[idx];
        },
        addImage: function (image) {
            if (typeof image !== _const.STRING) return;
            if (!this._images.contains(image)) {
                this._images.push(image);
            }
        },
        InsertImage: function (index, image) {
        },
        removeImage: function (index) {
        },
        clear: function () {
            var i, l;
            for (i = 0, l = this._images.length; i < l; i++) {
                this._images[i] = null;
            }
            this._images.clear();
        },
        replaceImage: function (index, image) {
        },
        getChildsHTMLElement: function () {
            // on va chercher les items dans le CDATA
            var cdata = this._HTMLElement.childNodes;
            for (var i = 0, l = cdata.length; i < l; i++) {
                if (cdata[i].nodeType === $j.types.xmlNodeTypes.COMMENT_NODE) {
                    if (cdata[i].nodeValue !== String.EMPTY && cdata[i].nodeValue) this._images = JSON.parse(cdata[i].nodeValue);
                }
            }
        },
        destroy: function () {
            this._inherited();
            this._images.destroy();
            this._images = null;
            this.imageHeight = null;
            this.imageWidth = null;
        }
        //#endregion
    });
    //#endregion
    Object.seal(ImageList);
    $j.classes.register($j.types.categories.NONVISUAL, ImageList);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var ImageListTpl = "<div id='{internalId}' data-name='{name}' data-class='ImageList' class='Control ShortCutIcon'>\
                      <div class='Control ShortCutIconImg imagelist'></div>\
                      <div class='Control ShortCutIconCaption'>{name}</div>\
                      </div>";
        $j.classes.registerTemplates([{ Class: ImageList, template: ImageListTpl }]);
        //$j..registerDesignerMenuItem();
    }
    //#endregion
})();