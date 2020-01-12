(function () {
    var PaintBox = $j.classes.Control.extend("PaintBox", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._ctx = null;
                //#endregion
                delete this.tabOrder;
            }
        },
        //#region Setter
        setWidth: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            this._inherited(newValue);
            if (this.width !== newValue) {
                if ($j.isHTMLRenderer()) {
                    if (!this._loading && !this.form._loading) this.paint();
                }
            }
        },
        setHeight: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            this._inherited(newValue);
            if (this.height !== newValue) {
                if ($j.isHTMLRenderer()) {
                    if (!this._loading && !this.form._loading) this.paint();
                }
            }
        },
        //#endregion
        //#region Methods
        getHTMLElement: function (id) {
            this._inherited(id);
            if (this._HTMLElement) {
                this._ctx = this._HTMLElement.getContext("2d");
            }
        },
        update: function () {
            if (this.form._loading || this.form._creating) return;
            this._HTMLElement.setAttribute('width', this._HTMLElement.offsetWidth);
            this._HTMLElement.setAttribute('height', this._HTMLElement.offsetHeight);
            this.paint();
        },
        paint: function () {
            if ((this._HTMLElement.offsetWidth === 0) || (this._HTMLElement.offsetHeight === 0)) return;
            if (this.form._loading || this.form._creating) return;
            if (!this.isEnabled()) return;
            if ($j.isHTMLRenderer()) {
                this._ctx.clear();
                this.onPaint.invoke();
            }
        },
        destroy: function () {
            this._inherited();
            this._ctx = null;
        }
        //updateFromHTML:function() {
        //  this._inherited();
        //  this.width=parseInt(this._HTMLElement.getAttribute("width"),10);
        //  this.height=parseInt(this._HTMLElement.getAttribute("height"),10);
        //}
        //#endregion
    });
    Object.seal(PaintBox);
    $j.classes.register($j.types.categories.COMMON, PaintBox);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var PaintBoxTpl = "<canvas id='{internalId}' data-class='PaintBox' class='Control PaintBox' data-name='{name}'' width='105' height='105' style='width:105px;height:105px;'></canvas>";
        $j.classes.registerTemplates([{ Class: PaintBox, template: PaintBoxTpl }]);
    }
    //endregion
})();