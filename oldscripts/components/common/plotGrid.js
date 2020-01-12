(function () {
    var PlotGrid = $j.classes.PaintBox.extend("PlotGrid", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._ctx = null;
                //#endregion
                this.lineFill = new $j.classes.Brush($j.types.brushStyles.SOLID, _colors.parse("#333"), this);
                this.marks = 25;
                this.frequency = 5;
                delete this.tabOrder;
            }
        },
        //#region Setters
        setLineFill: function (newValue) {
            if (!(newValue instanceof $j.classes.Brush)) return;
            if (this.lineFill !== newValue) {
                this.lineFill.assign(newValue);
                if ($j.isHTMLRenderer()) {
                    if (!this._loading && !this.form._loading) this.update();
                } else {
                    if (this._allowUpdate) this.update();
                    this.redraw();
                }
            }
        },
        setMarks: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.marks !== newValue) {
                this.marks = newValue;
                if ($j.isHTMLRenderer()) {
                    if (!this._loading && !this.form._loading) this.update();
                } else {
                    if (this._allowUpdate) this.update();
                    this.redraw();
                }
            }
        },
        setFrequency: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.frequency !== newValue) {
                if (newValue < 0.001) newValue = 0.001;
                this.frequency = newValue;
                if ($j.isHTMLRenderer()) {
                    if (!this._loading && !this.form._loading) this.update();
                } else {
                    if (this._allowUpdate) this.update();
                    this.redraw();
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
            this._HTMLElement.setAttribute('width', this._HTMLElement.offsetWidth);
            this._HTMLElement.setAttribute('height', this._HTMLElement.offsetHeight);
            this.paint();
        },
        paint: function () {
            if ((this._HTMLElement.offsetWidth === 0) || (this._HTMLElement.offsetHeight === 0)) return;
            if (!this._ctx) return;
            if (!this.isEnabled()) return;
            var x = 0, y = 0, c = new $j.classes.Color(_colors.TRANSPARENT), w2 = this._HTMLElement.offsetWidth / 2, h2 = this._HTMLElement.offsetHeight / 2;
            c.assign(this.lineFill.color);
            c.opacity(0.4);
            this._ctx.save();
            while (x < w2) {
                if (x === 0) {
                    this._ctx.lineWidth = 2;
                    this._ctx.strokeStyle = this.lineFill.color.toARGBString();
                } else {
                    if (($j.frac(x) === 0) && ($j.frac(x / this.frequency / this.marks) === 0)) this._ctx.strokeStyle = this.lineFill.color.toARGBString();
                    else this._ctx.strokeStyle = c.toARGBString();
                    this._ctx.lineWidth = 1;
                }
                this._ctx.beginPath();
                this._ctx.moveTo(w2 + x + (this._ctx.lineWidth / 2), 0);
                this._ctx.lineTo(w2 + x + (this._ctx.lineWidth / 2), this._HTMLElement.offsetHeight);
                if (x !== 0) {
                    this._ctx.moveTo(w2 - x + (this._ctx.lineWidth / 2), 0);
                    this._ctx.lineTo(w2 - x + (this._ctx.lineWidth / 2), this._HTMLElement.offsetHeight);
                }
                this._ctx.stroke();
                x += this.frequency;
            }
            while (y < h2) {
                if (y === 0) {
                    this._ctx.lineWidth = 2;
                    this._ctx.strokeStyle = this.lineFill.color.toARGBString();
                } else {
                    if (($j.frac(y) === 0) && ($j.frac(y / this.frequency / this.marks) === 0)) this._ctx.strokeStyle = this.lineFill.color.toARGBString();
                    else this._ctx.strokeStyle = c.toARGBString();
                    this._ctx.lineWidth = 1;
                }
                this._ctx.beginPath();
                this._ctx.moveTo(0, h2 + y + (this._ctx.lineWidth / 2));
                this._ctx.lineTo(this._HTMLElement.offsetWidth, h2 + y + (this._ctx.lineWidth / 2));
                if (y !== 0) {
                    this._ctx.moveTo(0, h2 - y + (this._ctx.lineWidth / 2));
                    this._ctx.lineTo(this._HTMLElement.offsetWidth, h2 - y + (this._ctx.lineWidth / 2));
                }
                this._ctx.stroke();
                y += this.frequency;
            }
            c = null;
            this._ctx.restore();
            if ($j.isHTMLRenderer()) this.onPaint.invoke();
        },
        assign: function (source) {
            if (!(source instanceof $j.classes.PlotGrid)) return;
            this._inherited(source);
            this.lineFill.assign(source.lineFill);
            this.marks = source.marks;
            this.frequency = source.frequency;
        },
        /*updateFromHTML:function() {
          this._inherited();
          this.width=parseInt(this._HTMLElement.getAttribute("width"),10);
          this.height=parseInt(this._HTMLElement.getAttribute("height"),10);
        },*/
        loaded: function () {
            this._inherited();
            this.paint();
        },
        destroy: function () {
            this._inherited();
            this._ctx = null;
            this.lineFill.destroy();
            this.lineFill = null;
            this.marks = null;
            this.frequency = null;
        }
        //#endregion
    });
    Object.seal(PlotGrid);
    $j.classes.register($j.types.categories.COMMON, PlotGrid);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var PlotGridTpl = "<canvas id='{internalId}' data-class='PlotGrid' class='Control PlotGrid' data-name='{name}' width='105' height='105' style='width:105px;height:105px;'></canvas>';"
        $j.classes.registerTemplates([{ Class: PlotGrid, template: PlotGridTpl }]);
    }
    //endregion
})();