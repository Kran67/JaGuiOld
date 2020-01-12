(function () {
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.BASECSSCOMPONENTS) + "scaledLayout");
    $j.tools.loadCssFile($j.tools.getPath($j.types.categories.THEMESCSSCOMPONENTS) + $j.defaultTheme + "/scaledLayout");
    ScaledLayout = $j.classes.Layout.extend("ScaledLayout", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                //#endregion
                this.originalWidth = 0;
                this.originalHeight = 0;
                $j.tools.addResizeListener(this);
            }
        },
        //#region Setters methods
        setOriginalWidth: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.originalWidth !== newValue) {
                this.originalWidth = newValue;
                this.scaleChilds();
            }
        },
        setOriginalHeight: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.originalHeight !== newValue) {
                this.originalHeight = newValue;
                this.scaleChilds();
            }
        },
        //#endregion
        //#region Methods
        loaded: function () {
            this._inherited();
            //this.scaleChilds();
        },
        resized: function () {
            this._inherited();
            this.scaleChilds();
        },
        scaleChilds: function () {
            if (!this._HTMLElement) return;
            this._HTMLElementStyle.transform = "scale(" + (this._HTMLElement.offsetWidth / this.originalWidth) + "," + (this._HTMLElement.offsetHeight / this.originalHeight) + ")";
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.originalwidth;
            if (data) this.originalWidth = ~~data;
            data = this._HTMLElement.dataset.originalheight;
            if (data) this.originalHeight = ~~data;
        }
        //#endregion
    });
    Object.seal(ScaledLayout);
    $j.classes.register($j.types.categories.CONTAINERS, ScaledLayout);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var ScaledLayoutTpl = "<div id='{internalId}' data-name='{name}' data-class='ScaledLayout' class='Control ScaledLayout'></div>";
        $j.classes.registerTemplates([{ Class: ScaledLayout, template: ScaledLayoutTpl }]);
    }
    //endregion
})();