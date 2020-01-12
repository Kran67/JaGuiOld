(function () {
    //#region Image
    var Image = $j.classes.Control.extend("Image", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._src = _const.PIX;
                //#endregion
                $j.tools.addPropertyFromSet(this, "wrapMode", $j.types.imageWraps, $j.types.imageWraps.FIT);
                this.bitmap = "No image";
                delete this.tabOrder;
            }
        },
        //#region Setters
        setBitmap: function (newValue) {
            if (!(newValue instanceof Image)) return;
            if (this._src !== newValue.src) {
                this._src = newValue.src;
                this.backgroundImage.backgroundImage = "url(" + newValue.src + ")";
                this.update();
            }
        },
        setWrapMode: function (newValue) {
            if (!$j.tools.valueInSet(newValue, $j.types.imageWraps)) return;
            if (this.wrapMode !== newValue) {
                this.wrapMode = newValue;
                if (!this._loading && !this.form._loading) this.update();
            }
        },
        //#endregion
        //#region Methods
        /*doBitmapLoaded: function(){
          this.obj._HTMLElementStyle.backgroundImage=this.src;
          this.obj.update();
        },
        doBitmapNotLoaded: function(){throw "Image bitmap error";},*/
        isEmpty: function () {
            return this._HTMLElementStyle.backgroundImage === _const.PIX;
        },
        update: function () {
            if (this._loading || this.form._loading) return;
            switch (this.wrapMode) {
                case $j.types.imageWraps.ORIGINAL:
                    this._HTMLElementStyle.backgroundSize = "auto auto";
                    this._HTMLElementStyle.backgroundPosition = "auto auto";
                    this._HTMLElementStyle.backgroundRepeat = "no-repeat";
                    break;
                case $j.types.imageWraps.FIT:
                    this._HTMLElementStyle.backgroundSize = "contain";
                    this._HTMLElementStyle.backgroundPosition = "center center";
                    this._HTMLElementStyle.backgroundRepeat = "no-repeat";
                    break;
                case $j.types.imageWraps.STRETCH:
                    this._HTMLElementStyle.backgroundSize = "100% 100%";
                    this._HTMLElementStyle.backgroundPosition = "center center";
                    this._HTMLElementStyle.backgroundRepeat = "no-repeat";
                    break;
                case $j.types.imageWraps.TILE:
                    this._HTMLElementStyle.backgroundSize = "auto auto";
                    this._HTMLElementStyle.backgroundPosition = "auto auto";
                    this._HTMLElementStyle.backgroundRepeat = "repeat";
                    break;
            }
        },
        load: function (uri) {
            this._src = uri;
            this._HTMLElementStyle.backgroundImage = "url(" + uri + ")";
            this.update();
        },
        updateFromHTML: function () {
            this._inherited();
            var data = this._HTMLElement.datasetwrapmode;
            if (data) this.wrapMode = data;
        },
        /*getHTMLElement:function(id) {
          this._inherited(id);
          //this.bitmap=this._HTMLElement;
        }*/
        //#endregion
    });
    //#endregion Image
    //#region Icon
    var Icon = $j.classes.ThemedControl.extend("Icon", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                this.cssClass = String.EMPTY;
                delete this.tabOrder;
            }
        },
        //#region Methods
        changeCSS: function (cssClass) {
            if (typeof cssClass !== _const.STRING) return;
            if (cssClass === String.EMPTY) return;
            if (this.cssClass !== cssClass) {
                $j.CSS.removeClass(this._HTMLElement, this.cssClass);
                $j.CSS.addClass(this._HTMLElement, cssClass);
                this.cssClass = cssClass;
            }
        },
        destroy: function () {
            this._inherited();
            this.cssClass = null;
        },
        loaded: function () {
            this._inherited();
            if (this._HTMLElement.src.contains("#")) this._HTMLElement.src = _const.PIX;
        }
        //#endregion
    });
    //#endregion Icon
    $j.classes.register($j.types.categories.COMMON, Image, Icon);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var ImageTpl = "<img id='{internalId}' data-name='{name}' data-class='Image' class='Control Image csr_default' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==' draggable='false' width='105px' height='105px' alt='' style='width:105px;height:105px;' />";
        IconTpl = "<img id='{internalId}' data-name='{name}' data-class='Icon' class='Control Icon {theme} csr_default' draggable='false' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==' alt='' width='32' height='32' style='width:32px;height:32px;' />";
        $j.classes.registerTemplates([{ Class: Image, template: ImageTpl }, { Class: Icon, template: IconTpl }]);
    }
    //endregion
})();