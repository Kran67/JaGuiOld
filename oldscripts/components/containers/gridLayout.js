(function () {
    GridLayout = $j.classes.Layout.extend("GridLayout", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                this.itemWidth = 64;
                this.itemHeight = 64;
                this.hGap = 5;
                this.vGap = 5;
            }
        },
        //#region Methods
        alignControls: function () {
            var i = 0, l, obj, x = this.hGap, y = this.vGap, maxTop = y;
            if (this._components.length === 0) return;
            l = this._components.length;
            for (; i < l; i++) {
                obj = this._components[i];
                if (obj.visible) {
                    if (x + this.itemWidth > this._HTMLElement.offsetWidth) {
                        if (maxTop < y + this.itemHeight) maxTop = y + this.itemHeight;
                        y = maxTop + this.vGap;
                        x = this.hGap;
                    }
                    obj.setWidth(this.itemWidth);
                    obj.setHeight(this.itemHeight);
                    obj.setLeft(x);
                    obj.setTop(y);
                    x += this.itemWidth + this.hGap;
                }
            }
        },
        loaded: function () {
            this._inherited();
            this.alignControls();
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.itemwidth;
            if (data) this.itemWidth = ~~data;
            data = this._HTMLElement.dataset.itemheight;
            if (data) this.itemHeight = ~~data;
            data = this._HTMLElement.dataset.hgap;
            if (data) this.hGap = ~~data;
            data = this._HTMLElement.dataset.vgap;
            if (data) this.vGap = ~~data;
        },
        destroy: function () {
            this._inherited();
            this.itemWidth = null;
            this.itemHeight = null;
            this.hGap = null;
            this.vGap = null;
        }
        //#endregion
    });
    Object.seal(GridLayout);
    $j.classes.register($j.types.categories.CONTAINERS, GridLayout);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var GridLayoutTpl = "<div id='{internalId}' data-name='{name}' data-class='GridLayout' class='Control GridLayout' data-itemwidth='64' data-itemheight='64' data-hgap='5' data-vgap='5' style='width:185px;height:41px;'></div>";
        $j.classes.registerTemplates([{ Class: GridLayout, template: GridLayoutTpl }]);
    }
    //endregion
})();