(function () {
    var ImageControl = $j.classes.ThemedControl.extend("ImageControl", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._bitmapStyle = null;
                //#endregion
                this.bitmap = null;
            }
        },
        //#region Setters
        setWidth: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this._HTMLElement.offsetWidth !== newValue) {
                this._inherited(newValue);
                this.update();
            }
        },
        setHeight: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this._HTMLElement.offsetHeight !== newValue) {
                this._inherited(newValue);
                this.update();
            }
        },
        //#endregion
        //#region Methods
        getChildsHTMLElement: function () {
            this._inherited();
            this.bitmap = this._HTMLElement.firstElementChild;
            this._bitmapStyle = this.bitmap.style;
            this.bitmap.jsObj = this;
            $j.tools.events.bind(this.bitmap, $j.types.HTMLEvents.LOAD, this.doBitmapLoaded);
            $j.tools.events.bind(this.bitmap, $j.types.HTMLEvents.ERROR, this.doBitmapNotLoaded);
        },
        doBitmapLoaded: function () {
            this.jsObj.update();
        },
        doBitmapNotLoaded: function () { throw "Image bitmap error"; },
        isEmpty: function () {
            return this.bitmap.src === _const.PIX;
        },
        load: function (uri) {
            this.bitmap.src = uri;
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.src;
            if (data) this.bitmap.src = data;
        },
        update: function () {
            //center the image
            var iw = this.bitmap.naturalWidth, ih = this.bitmap.naturalHeight, destRect, imgRect;
            if (iw > this._HTMLElement.offsetWidth || ih > this._HTMLElement.offsetHeight) {
                destRect = new $j.classes.Rect(0, 0, this._HTMLElement.offsetWidth, this._HTMLElement.offsetHeight);
                imgRect = new $j.classes.Rect(0, 0, iw, ih);
                destRect.assign(imgRect.fit(destRect).rect);
                this._bitmapStyle.width = destRect.width() + $j.types.CSSUnits.PX;
                this._bitmapStyle.height = destRect.height() + $j.types.CSSUnits.PX;
                this._bitmapStyle.left = destRect.left + $j.types.CSSUnits.PX;
                this._bitmapStyle.top = destRect.top + $j.types.CSSUnits.PX;
            } else {
                this._bitmapStyle.left = ~~((this._HTMLElement.offsetWidth - iw) / 2) + $j.types.CSSUnits.PX;
                this._bitmapStyle.top = ~~((this._HTMLElement.offsetHeight - ih) / 2) + $j.types.CSSUnits.PX;
                this._bitmapStyle.width = iw + $j.types.CSSUnits.PX;
                this._bitmapStyle.height = ih + $j.types.CSSUnits.PX;
            }
        },
        destroy: function () {
            this._inherited();
            this._bitmapStyle = null;
            this.bitmap = null;
        }
        //#endregion
    });
    Object.seal(ImageControl);
    $j.classes.register($j.types.categories.EXTENDED, ImageControl);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var ImageControlTpl = "<div id='{internalId}' data-name='{name}' data-class='ImageControl' class='Control ImageControl {theme}' style='width:105px;height:105px;'>\
                         <img class='Control' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==' alt='' draggable='false' />\
                         </div>";
        $j.classes.registerTemplates([{ Class: ImageControl, template: ImageControlTpl }]);
    }
    //#endregion
})();