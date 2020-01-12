(function () {
    var StackLayout = $j.classes.Layout.extend("StackLayout", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                $j.tools.addPropertyFromSet(this, "layout", $j.types.FlowLayouts, $j.types.FlowLayouts.VERTICAL);
                this.gap = 5;
            }
        },
        //#region Setter
        setVisible: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            this._inherited(newValue);
            if (newValue) this.alignControls();
        },
        //#endregion
        //#region Methods
        alignControls: function () {
            var i = 0, l, offset = 0;
            if (this._components.length === 0) return;
            l = this._components.length;
            for (; i < l; i++) {
                obj = this._components[i];
                obj.beginUpdate();
                if (obj.visible) {
                    if (this.layout === $j.types.FlowLayouts.HORIZONTAL) {
                        if (i === 0) {
                            obj.setLeft(this.padding.left);
                            offset = this.padding.left;
                        } else obj.setLeft(offset);
                        obj.setTop(this.padding.left);
                        obj.setHeight(this._HTMLElement.offsetHeight - this.padding.height());
                        offset += obj._HTMLElement.offsetWidth + this.gap;
                    } else {
                        if (i === 0) {
                            obj.setTop(this.padding.top);
                            offset = this.padding.top;
                        } else obj.setTop(offset);
                        obj.setLeft(this.padding.left);
                        obj.setWidth(this._HTMLElement.offsetWidth - this.padding.width());
                        offset += obj._HTMLElement.offsetHeight + this.gap;
                    }
                }
                obj.endUpdate();
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
            data = this._HTMLElement.dataset.gap;
            if (data) this.gap = ~~data;
        },
        destroy: function () {
            this._inherited();
            this.layout = null;
            this.gap = null;
        },
        update: function () {
            this._inherited();
            this.alignControls();
        }
        //#endregion
    });
    Object.seal(StackLayout);
    $j.classes.register($j.types.categories.CONTAINERS, StackLayout);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var StackLayoutTpl = "<div id='{internalId}' data-name='{name}' data-class='StackLayout' class='Control StackLayout' data-layout='vertical' data-gap='5' style='width:185px;height:41px;'></div>";
        $j.classes.registerTemplates([{ Class: StackLayout, template: StackLayoutTpl }]);
    }
    //endregion
})();
