(function () {
    var BitmapStateButton = $j.classes.CustomButton.extend("BitmapStateButton", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                this.bitmapState = new Image;
                this.bitmapState.obj = this;
                $j.tools.events.bind(this.bitmapState, $j.types.HTMLEvents.LOAD, this.doBitmapLoaded);
                $j.tools.events.bind(this.bitmapState, $j.types.HTMLEvents.ERROR, this.doBitmapNotLoaded);
                delete this.tabOrder;
            }
        },
        //#region Setters
        setBitmap: function (bmpSrc) {
            if (typeof bmpSrc !== _const.STRING) return;
            this.bitmapState.src = bmpSrc;
        },
        //#endregion
        //#region Methods
        doBitmapLoaded: function () {
            this.obj.update();
        },
        doBitmapNotLoaded: function () {
            if ($j.tools.Debugger.debug) console.log('Bitmap not loaded in : ' + this.obj.name);
        },
        mouseDown: function () {
            this._inherited();
            this.update();
        },
        mouseLeave: function () {
            this._inherited();
            this.update();
        },
        mouseEnter: function () {
            this._inherited();
            this.update();
        },
        mouseUp: function () {
            this._inherited();
            this.update();
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.bitmap;
            if (data) this.setBitmap(data);
        },
        update: function () {
            this._HTMLElementStyle.backgroundImage = "url('" + this.bitmapState.src + "')";
            if (this._isPressed && this._isMouseOver) {
                this._HTMLElementStyle.backgroundPosition = "right top";
            } else if (!this._isPressed && this._isMouseOver) {
                this._HTMLElementStyle.backgroundPosition = "center center";
            } else if (!this._isMouseOver) {
                this._HTMLElementStyle.backgroundPosition = "left top";
            }
        },
        destroy: function () {
            this._inherited();
            $j.tools.events.unBind(this.bitmapState, $j.types.HTMLEvents.LOAD, this.doBitmapLoaded);
            $j.tools.events.unBind(this.bitmapState, $j.types.HTMLEvents.ERROR, this.doBitmapNotLoaded);
            this.bitmapState.obj = null;
            this.bitmapState = null;
        }
        //#endregion
    });
    Object.seal(BitmapStateButton);
    $j.classes.register($j.types.categories.EXTENDED, BitmapStateButton);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var BitmapStateButtonTpl = "<div id='{internalId}' data-name='{name}' data-class='BitmapStateButton' class='Control BitmapStateButton {theme}' style='width:50px;height:50px;'>\
                              <div class='Control BitmapStateButtonCaption'></div>\
                              </div>";
        $j.classes.registerTemplates([{ Class: BitmapStateButton, template: BitmapStateButtonTpl }]);
    }
    //endregion
})();