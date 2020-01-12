(function () {
    //#region PathButton final
    var PathButton = $j.classes.SpeedButton.extend("PathButton", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                this.path = new $j.classes.PathData(this);
                this.glyphNormalStrokeColor = new $j.classes.Color(_colors.BLACK);
                this.glyphNormalFillColor = new $j.classes.Color(_colors.WHITE);
                this.glyphHoveredStrokeColor = new $j.classes.Color(_colors.BLACK);
                this.glyphHoveredFillColor = new $j.classes.Color(_colors.WHITE);
                this.glyphPressedStrokeColor = new $j.classes.Color(_colors.BLACK);
                this.glyphPressedFillColor = new $j.classes.Color(_colors.WHITE);
                this.glyphHTMLElement = $j.types.HTMLElements.CANVAS;
                this.canFocused = true;
            }
        },
        //#region Setter
        setGlyphPressedFillColor: function (newValue) {
            if (!(newValue instanceof $j.classes.Color)) return;
            if (this.glyphPressedFillColor !== newValue) {
                this.glyphPressedFillColor.assign(newValue);
                if ($j.isHTMLRenderer()) {
                    this.update();
                    this.paint();
                }
            }
        },
        setGlyphNormalStrokeColor: function (newValue) {
            if (!(newValue instanceof $j.classes.Color)) return;
            if (this.glyphNormalStrokeColor !== newValue) {
                this.glyphNormalStrokeColor.assign(newValue);
                if ($j.isHTMLRenderer()) {
                    this.update();
                    this.paint();
                }
            }
        },
        setGlyphHoveredStrokeColor: function (newValue) {
            if (!(newValue instanceof $j.classes.Color)) return;
            if (this.glyphHoveredStrokeColor !== newValue) {
                this.glyphHoveredStrokeColor.assign(newValue);
                if ($j.isHTMLRenderer()) {
                    this.update();
                    this.paint();
                }
            }
        },
        setGlyphHoveredFillColor: function (newValue) {
            if (!(newValue instanceof $j.classes.Color)) return;
            if (this.glyphHoveredFillColor !== newValue) {
                this.glyphHoveredFillColor.assign(newValue);
                if ($j.isHTMLRenderer()) {
                    this.update();
                    this.paint();
                }
            }
        },
        setGlyphPressedStrokeColor: function (newValue) {
            if (!(newValue instanceof $j.classes.Color)) return;
            if (this.glyphPressedStrokeColor !== newValue) {
                this.glyphPressedStrokeColor.assign(newValue);
                if ($j.isHTMLRenderer()) {
                    this.update();
                    this.paint();
                }
            }
        },
        //#endregion
        //#region Methods
        assign: function (source) {
            if (!source instanceof $j.pathButton) return;
            $j.SpeedButton.prototype.assign.apply(this, [source]);
            this.path.assign(source.path);
        },
        paint: function () {
            if ((this._HTMLElement.offsetWidth === 0) || (this._HTMLElement.offsetHeight === 0)) return;
            if (!this.glyph) return;
            this.ctx.save();
            this.ctx.clear();
            if (this._isMouseOver && !this._isPressed) {
                this.ctx.strokeStyle = this.glyphHoveredStrokeColor.toARGBString();
                this.ctx.fillStyle = this.glyphHoveredFillColor.toARGBString();
            } else if (this._isPressed) {
                this.ctx.strokeStyle = this.glyphPressedStrokeColor.toARGBString();
                this.ctx.fillStyle = this.glyphPressedFillColor.toARGBString();
            } else {
                this.ctx.strokeStyle = this.glyphNormalStrokeColor.toARGBString();
                this.ctx.fillStyle = this.glyphNormalFillColor.toARGBString();
            }
            this.ctx.drawPath(this, this.path, false);
            this.ctx.restore();
        },
        updateCanvas: function () {
            if (!this.glyph) return;
            var p, r, b, clientRect = new $j.classes.Rect(0, 0, this.glyphSize, this.glyphSize);
            p = this.path;
            if (!p.isEmpty()) {
                b = p.originalBounds;
                p.resizeToRect(b);
                r = p.bounds();
                r = r.fit(clientRect).rect;
                p.resizeToRect(r);
            }
            this.glyph.setAttribute('width', this.glyphSize);
            this.glyph.setAttribute('height', this.glyphSize);
            this.glyph.style.minWidth = this.glyphSize + $j.types.CSSUnits.PX;
            this.glyph.style.minHeight = this.glyphSize + $j.types.CSSUnits.PX;
        },
        mouseDown: function (mouseButton, point) {
            this._inherited(mouseButton, point);
            if ($j.isHTMLRenderer()) this.paint();
        },
        mouseUp: function (mouseButton, point) {
            this._inherited(mouseButton, point);
            if ($j.isHTMLRenderer()) this.paint();
        },
        mouseEnter: function (mouseButton, point) {
            this._inherited(mouseButton, point);
            if ($j.isHTMLRenderer()) this.paint();
        },
        mouseLeave: function (mouseButton, point) {
            this._inherited(mouseButton, point);
            if ($j.isHTMLRenderer()) this.paint();
        },
        getHTMLElement: function (id) {
            this._inherited(id);
            if (this.glyph) this.ctx = this.glyph.getContext("2d");
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.path;
            if (data) this.path.setPathString(atob(data));
            if (!this.path.isEmpty()) {
                $j.CSS.removeClass(this.glyph, "hidden");
                this.update();
                this.paint();
            }
            data = this._HTMLElement.dataset.glyphnormalstrokecolor;
            if (data) this.glyphNormalStrokeColor = $j.tools.colors.parse(data);
            data = this._HTMLElement.dataset.glyphnormalfillcolor;
            if (data) this.glyphNormalFillColor = $j.tools.colors.parse(data);
            data = this._HTMLElement.dataset.glyphhoveredstrokecolor;
            if (data) this.glyphHoveredStrokeColor = $j.tools.colors.parse(data);
            data = this._HTMLElement.dataset.glyphhoveredfillcolor;
            if (data) this.glyphHoveredFillColor = $j.tools.colors.parse(data);
            data = this._HTMLElement.dataset.glyphpressedstrokecolor;
            if (data) this.glyphPressedStrokeColor = $j.tools.colors.parse(data);
            data = this._HTMLElement.dataset.glyphpressedfillcolor;
            if (data) this.glyphPressedFillColor = $j.tools.colors.parse(data);
        },
        destroy: function () {
            this._inherited();
            this.path.destroy();
            this.path = null;
            this.glyphNormalStrokeColor.destroy();
            this.glyphNormalStrokeColor = null;
            this.glyphNormalFillColor.destroy();
            this.glyphNormalFillColor = null;
            this.glyphHoveredStrokeColor.destroy();
            this.glyphHoveredStrokeColor = null;
            this.glyphHoveredFillColor.destroy();
            this.glyphHoveredFillColor = null;
            this.glyphPressedStrokeColor.destroy();
            this.glyphPressedStrokeColor = null;
            this.glyphPressedFillColor.destroy();
            this.glyphPressedFillColor = null;
            this.glyphHTMLElement = null;
        }
        //#endregion
        //#endregion
    });
    Object.seal(PathButton);
    $j.classes.register($j.types.categories.EXTENDED, PathButton);
    //#region Template
    if ($j.isHTMLRenderer()) {
        var PathButtonTpl = "<button id='{internalId}' data-name='{name}' data-class='PathButton' class='Control ButtonGlyph PathButton {theme}' style='width:98px;height:58px;'>\
                       <span class='Control ButtonCaption PathButtonCaption'>{caption}</span>\
                       <canvas class='Control' width='32' height='32'></canvas>\
                       </button>";
        $j.classes.registerTemplates([{ Class: PathButton, template: PathButtonTpl }]);
    }
    //#endregion
})();