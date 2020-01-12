(function () {
    var ImageViewer = $j.classes.ScrollBox.extend("ImageViewer", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                this.bitmap = $j.doc.createElement($j.types.HTMLElements.IMG);
                this.bitmap.jsObj = this;
                $j.tools.events.bind(this.bitmap, $j.types.HTMLEvents.LOAD, this.doBitmapLoaded);
                $j.tools.events.bind(this.bitmap, $j.types.HTMLEvents.ERROR, this.doBitmapNotLoaded);
                this._scale = 1;
                this.mouseScaling = true;
            }
        },
        //#region Setters
        setImage: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.bitmap.src !== newValue) {
                this.load(newValue);
            }
        },
        //#endregion
        //#region Methods
        mouseWheel: function () {
            this._scale += $j.mouse.wheelDelta * 0.02;
            if (this._scale > 10) this._scale = 10;
            else if (this._scale < 0.01) this._scale = 0.01;
            this.update();
        },
        doBitmapLoaded: function () {
            if (this.jsObj._content) this.jsObj._content._HTMLElementStyle.backgroundImage = "url('" + this.src + "')";
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
            var newW, newH, rectD, rectS, viewHS = false, viewVS = false, t = String.EMPTY;
            if (!this._content) return;
            if (!this._HTMLElement) return;
            if (!this.bitmap) return;
            newW = ~~(this.bitmap.naturalWidth * this._scale);
            newH = ~~(this.bitmap.naturalHeight * this._scale);
            if (newW > this._viewPort.offsetWidth) viewHS = true;
            if (newH > this._viewPort.offsetHeight) viewVS = true;
            $j.CSS.removeClass(this._HTMLElement, "scrollbars-none");
            $j.CSS.removeClass(this._HTMLElement, "scrollbars-horizontal");
            $j.CSS.removeClass(this._HTMLElement, "scrollbars-vertical");
            $j.CSS.removeClass(this._HTMLElement, "scrollbars-both");
            if (viewHS && viewVS) {
                this._HTMLElement.dataset.scrollbars = $j.types.scrollbars.BOTH;
                $j.CSS.addClass(this._HTMLElement, "scrollbars-both");
            } else if (viewHS && !viewVS) {
                this._HTMLElement.dataset.scrollbars = $j.types.scrollbars.HORIZONTAL;
                $j.CSS.addClass(this._HTMLElement, "scrollbars-horizontal");
            } else if (!viewHS && viewVS) {
                this._HTMLElement.dataset.scrollbars = $j.types.scrollbars.VERTICAL;
                $j.CSS.addClass(this._HTMLElement, "scrollbars-vertical");
            } else {
                this._HTMLElement.dataset.scrollbars = $j.types.scrollbars.NONE;
                $j.CSS.addClass(this._HTMLElement, "scrollbars-none");
            }
            this._HScrollBar.setMax(newW);
            this._HScrollBar.setViewportSize(this._viewPort.offsetWidth);
            this._VScrollBar.setMax(newH);
            this._VScrollBar.setViewportSize(this._viewPort.offsetHeight);
            rectD = new $j.classes.Rect(0, 0, this._viewPort.offsetWidth, this._viewPort.offsetHeight);
            rectS = new $j.classes.Rect(0, 0, newW, newH);
            rectS.center(rectD);
            if (viewHS || viewVS) {
                if (viewHS) this._HScrollBar.setValue($j.abs((this._viewPort.offsetWidth - newW) / 2));
                if (viewVS) this._VScrollBar.setValue($j.abs((this._viewPort.offsetHeight - newH) / 2));
            }
            this.moveContent();
        },
        HScroll: function () {
            var scrollBox = this._owner;
            scrollBox.moveContent(-this.value, -scrollBox._VScrollBar.value);
        },
        VScroll: function () {
            var scrollBox = this._owner;
            scrollBox.moveContent(-scrollBox._HScrollBar.value, -this.value);
        },
        moveContent: function (newL, newT) {
            var newW, newH, rectD, rectS, viewHS = false, viewVS = false, t = String.EMPTY;
            newW = ~~(this.bitmap.naturalWidth * this._scale);
            newH = ~~(this.bitmap.naturalHeight * this._scale);
            rectD = new $j.classes.Rect(0, 0, this._viewPort.offsetWidth, this._viewPort.offsetHeight);
            rectS = new $j.classes.Rect(0, 0, newW, newH);
            rectS.center(rectD);
            if (!newL && !newT) {
                newL = rectS.left;
                newT = rectS.top;
            }
            t = "translate(" + newL + $j.types.CSSUnits.PX + "," + newT + $j.types.CSSUnits.PX + ")";
            t += " scale(" + $j.round(this._scale, 2) + ")";
            this._content._HTMLElementStyle.transform = t;
        },
        destroy: function () {
            this._inherited();
            $j.tools.events.unBind(this.bitmap, $j.types.HTMLEvents.LOAD, this.doBitmapLoaded);
            $j.tools.events.unBind(this.bitmap, $j.types.HTMLEvents.ERROR, this.doBitmapNotLoaded);
            this.bitmap.jsObj = null;
            this.bitmap = null;
            this._scale = null;
            this.mouseScaling = null;
        }
        //#endregion
    });
    Object.seal(ImageViewer);
    $j.classes.register($j.types.categories.EXTENDED, ImageViewer);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var ImageViewerTpl = "<div id='{internalId}' data-name='{name}' data-class='ImageViewer' class='Control ImageViewer {theme} scrollbars-none' data-scrollbars='none' style='width:185px;height:41px;'>\
                        <div class='Control ImageViewerViewPort'>\
                        <div class='Control ImageViewerContent' style='height: 240px;width: 320px;'></div>\
                        </div>\
                        {horizontalScrollBar}\
                        {verticalScrollBar}\
                        </div>";
        $j.classes.registerTemplates([{ Class: ImageViewer, template: ImageViewerTpl }]);
    }
    //#endregion
})();