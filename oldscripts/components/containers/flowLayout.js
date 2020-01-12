(function () {
    var FlowLayout = $j.classes.Layout.extend("FlowLayout", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                //this.layout=$j.types.FlowLayouts.HORIZONTAL;
                $j.tools.addPropertyFromSet(this, "layout", $j.types.FlowLayouts, $j.types.FlowLayouts.HORIZONTAL);
                this.hGap = 5;
                this.vGap = 5;
            }
        },
        //#region Methods
        alignControls: function () {
            var i = 0, l, obj, x = this.hGap, y = this.vGap, maxTop = y, maxLeft = x;
            if (this._components.length === 0) return;
            l = this._components.length;
            for (; i < l; i++) {
                obj = this._components[i];
                if (obj.visible) {
                    obj.beginUpdate();
                    if (this.layout === $j.types.FlowLayouts.HORIZONTAL) {
                        if (x + obj._HTMLElement.offsetWidth > this._HTMLElement.offsetWidth) {
                            if (maxTop < y + obj._HTMLElement.offsetHeight) maxTop = y + obj._HTMLElement.offsetHeight;
                            y = maxTop + this.vGap;
                            x = this.hGap;
                            maxTop = y;
                        }
                        obj.setTop(y);
                        obj.setLeft(x);
                        x += obj._HTMLElement.offsetWidth + this.hGap;
                        if (maxTop < y + obj._HTMLElement.offsetHeight) maxTop = y + obj._HTMLElement.offsetHeight;
                    } else {
                        if (y + obj._HTMLElement.offsetHeight > this._HTMLElement.offsetHeight) {
                            if (maxLeft < x + obj._HTMLElement.offsetWidth) maxLeft = x + obj._HTMLElement.offsetWidth;
                            x = maxLeft + this.hGap;
                            y = this.vGap;
                            maxLeft = x;
                        }
                        obj.setTop(y);
                        obj.setLeft(x);
                        y += obj._HTMLElement.offsetHeight + this.vGap;
                        if (maxLeft < x + obj._HTMLElement.offsetWidth) maxLeft = x + obj._HTMLElement.offsetWidth;
                    }
                    obj.endUpdate();
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
            data = this._HTMLElement.dataset.layout;
            if (data) this.layout = data;
            data = this._HTMLElement.dataset.hgap;
            if (data) this.hGap = ~~data;
            data = this._HTMLElement.dataset.vgap;
            if (data) this.vGap = ~~data;
        },
        destroy: function () {
            this._inherited();
            this.layout = null;
            this.hGap = null;
            this.vGap = null;
        }
        //#endregion
    });
    Object.seal(FlowLayout);
    $j.classes.register($j.types.categories.CONTAINERS, FlowLayout);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var FlowLayoutTpl = "<div id='{internalId}' data-name='{name}' data-class='FlowLayout' class='Control FlowLayout' data-layout='horizontal' data-hgap='5' data-vgap='5' style='width:185px;height:41px;'></div>";
        $j.classes.registerTemplates([{ Class: FlowLayout, template: FlowLayoutTpl }]);
    }
    //endregion
})();
//https://github.com/bramstein/jlayout/blob/master/lib/jlayout.flow.js