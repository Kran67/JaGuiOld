(function () {
    $j.types.cornerTypes = {
        ROUND: "round",
        BEVEL: "bevel",
        INNERROUND: "innerround",
        INNERLINE: "innerline",
        NOTCH: "notch"
    };
    $j.types.corners = {
        TOPLEFT: "topLeft",
        TOPRIGHT: "topRight",
        BOTTOMRIGHT: "bottomRight",
        BOTTOMLEFT: "bottomLeft"
    };
    var CornerButton = $j.classes.Button.extend("CornerButton", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                this.cornerType = $j.types.cornerTypes.ROUND;
                this.bordersRadius = {
                    owner: this,
                    topLeft: new $j.classes.Point,
                    topRight: new $j.classes.Point,
                    bottomLeft: new $j.classes.Point,
                    bottomRight: new $j.classes.Point,
                    cssUnit: $j.types.CSSUnits.PX,
                    setTopLeft: function (newValue) {
                        var changed = false;
                        if (!(newValue instanceof $j.classes.Point) && typeof newValue !== _const.NUMBER) return;
                        if (typeof newValue === _const.NUMBER) {
                            if (this.topLeft.x !== newValue || this.topLeft.y !== newValue) {
                                this.topLeft.x = newValue;
                                this.topLeft.y = newValue;
                                changed = true;
                            }
                        } else if (!this.topLeft.equals(newValue)) {
                            this.topLeft.assign(newValue);
                            changed = true;
                        }
                        if (changed) this._owner.update();
                    },
                    setTopRight: function (newValue) {
                        var changed = false;
                        if (!(newValue instanceof $j.classes.Point) && typeof newValue !== _const.NUMBER) return;
                        if (typeof newValue === _const.NUMBER) {
                            if (this.topRight.x !== newValue || this.topRight.y !== newValue) {
                                this.topRight.x = newValue;
                                this.topRight.y = newValue;
                                changed = true;
                            }
                        } else if (!this.topRight.equals(newValue)) {
                            this.topRight.assign(newValue);
                            changed = true;
                        }
                        if (changed) this._owner.update();
                    },
                    setBottomLeft: function (newValue) {
                        var changed = false;
                        if (!(newValue instanceof $j.classes.Point) && typeof newValue !== _const.NUMBER) return;
                        if (typeof newValue === _const.NUMBER) {
                            if (this.bottomLeft.x !== newValue || this.bottomLeft.y !== newValue) {
                                this.bottomLeft.x = newValue;
                                this.bottomLeft.y = newValue;
                                changed = true;
                            }
                        } else if (!this.bottomLeft.equals(newValue)) {
                            this.bottomLeft.assign(newValue);
                            changed = true;
                        }
                        if (changed) this._owner.update();
                    },
                    setBottomRight: function (newValue) {
                        var changed = false;
                        if (!(newValue instanceof $j.classes.Point) && typeof newValue !== _const.NUMBER) return;
                        if (typeof newValue === _const.NUMBER) {
                            if (this.bottomRight.x !== newValue || this.bottomRight.y !== newValue) {
                                this.bottomRight.x = newValue;
                                this.bottomRight.y = newValue;
                                changed = true;
                            }
                        } else if (!this.bottomRight.equals(newValue)) {
                            this.bottomRight.assign(newValue);
                            changed = true;
                        }
                        if (changed) this._owner.update();
                    },
                    setCssUnit: function (newValue) {
                        if (!$j.tools.valueInSet(newValue, $j.types.CSSUnits)) return;
                        if (!this.cssUnit !== newValue) {
                            this.cssUnit = newValue;
                            this._owner.update();
                        }
                    }
                };
            }
        },
        //#region Setter
        setCornerType: function (newValue) {
            if (!$j.tools.valueInSet(newValue, $j.types.cornerTypes)) return;
            if (this.cornerType !== newValue) {
                this.cornerType = newValue;
                this.update();
            }
        },
        setWidth: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            this._inherited(newValue);
            this.update();
        },
        setHeight: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            this._inherited(newValue);
            this.update();
        },
        setCaption: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.caption !== newValue) {
                this.caption = $j.tools.text.replace(newValue, _const.HOTKEYPREFIX, String.EMPTY);
                var d = this._HTMLElement.querySelector("div");
                if (d) {
                    d.innerHTML = this.caption;
                }
            }
        },
        //#endregion
        //#region Methods
        update: function () {
            var value;
            this._inherited();
            //switch(this.cornerType) {
            //    case $j.types.cornerTypes.ROUND:
            //        value = this.bordersRadius.topLeft.x + this.bordersRadius.cssUnit + String.SPACE + this.bordersRadius.topRight.x + this.bordersRadius.cssUnit + String.SPACE +
            //              this.bordersRadius.bottomRight.x + this.bordersRadius.cssUnit + String.SPACE + this.bordersRadius.bottomLeft.x + this.bordersRadius.cssUnit;
            //        this._HTMLElementStyle.borderRadius = value;
            //        if(!this.customStyle)) this.customStyle = { "borderRadius": value };
            //        else this.customStyle.borderRadius = value;
            //        break;
            //    case $j.types.cornerTypes.BEVEL:
            //    case $j.types.cornerTypes.INNERROUND:
            //    case $j.types.cornerTypes.INNERLINE:
            //    case $j.types.cornerTypes.NOTCH:
            //        this._HTMLElementStyle.borderRadius = 0;
            this.generateSVGPath();
            //        break;
            //}
            $j.CSS.addClass(this._HTMLElement, this.cornerType);
        },
        updateFromHTML: function () {
            var values, data;
            this._inherited();
            data = this._HTMLElement.dataset.topleft;
            if (data) {
                values = data.split(",");
                this.bordersRadius.topLeft.setValues(parseInt(values[0], 10), parseInt(values[1], 10));
            }
            data = this._HTMLElement.dataset.topright;
            if (data) {
                values = data.split(",");
                this.bordersRadius.topRight.setValues(parseInt(values[0], 10), parseInt(values[1], 10));
            }
            data = this._HTMLElement.dataset.bottomleft;
            if (data) {
                values = data.split(",");
                this.bordersRadius.bottomLeft.setValues(parseInt(values[0], 10), parseInt(values[1], 10));
            }
            data = this._HTMLElement.dataset.bottomright;
            if (data) {
                values = data.split(",");
                this.bordersRadius.bottomRight.setValues(parseInt(values[0], 10), parseInt(values[1], 10));
            }
            data = this._HTMLElement.dataset.cssunit;
            if (data) this.bordersRadius.cssUnit = data;
            data = this._HTMLElement.dataset.cornertype;
            if (data) this.cornerType = data;
        },
        generateSVGPath: function () {
            var svg = this._HTMLElement.querySelector("svg"), r = [], ratio, i, d;
            var defs = svg.firstElementChild;
            if (defs) {
                defs.innerHTML = "";
            }
            r.push(this.bordersRadius.topLeft.toArray());
            r.push(this.bordersRadius.topRight.toArray());
            r.push(this.bordersRadius.bottomRight.toArray());
            r.push(this.bordersRadius.bottomLeft.toArray());
            // Shrink overlapping curves
            var ratio = [1, 1];
            for (i = 0; i < r.length; i++) {
                var radii = r[i],
                    radiiAdj = r[i + (i % 2 ? -1 : 1)];

                ratio[0] = Math.min(
                    ratio[0],
                    this._HTMLElement.offsetWidth / (radii[0] + radiiAdj[0])
                );
            }
            for (i = 0; i < r.length; i++) {
                var radii = r[i],
                    radiiAdj = r[(i % 2 ? i + 5 : i + 3) % 4];

                ratio[1] = Math.min(
                    ratio[1],
                    this._HTMLElement.offsetHeight / (radii[1] + radiiAdj[1])
                );
            }
            if (ratio[0] < 1 || ratio[1] < 1) {
                for (i = 0; i < r.length; i++) {
                    r[i][0] *= ratio[0];
                    r[i][1] *= ratio[1];
                }
            }
            d = ['M', r[0][0], '0'];
            d.push('h', this._HTMLElement.offsetWidth - r[0][0] - r[1][0]);
            this.drawCorner($j.types.corners.TOPRIGHT, r[1], d);
            d.push('v', this._HTMLElement.offsetHeight - r[1][1] - r[2][1]);
            this.drawCorner($j.types.corners.BOTTOMRIGHT, r[2], d);
            d.push('h', -this._HTMLElement.offsetWidth + r[2][0] + r[3][0]);
            this.drawCorner($j.types.corners.BOTTOMLEFT, r[3], d);
            d.push('v', -this._HTMLElement.offsetHeight + r[3][1] + r[0][1]);
            this.drawCorner($j.types.corners.TOPLEFT, r[0], d);
            d.push('Z');
            defs.innerHTML = "<clipPath id='" + this.name + "Clip'><path d='" + d.join(' ') + "' /></clipPath>";
            svg.lastElementChild.setAttribute('d', d.join(' '));
        },
        drawCorner(corner, r, d) {
            var sweep, y2, x2;
            if (this.cornerType === $j.types.cornerTypes.NOTCH) {
                switch (corner) {
                    case $j.types.corners.TOPRIGHT:
                        d.push('v', r[1], 'h', r[0]);
                        break;
                    case $j.types.corners.BOTTOMRIGHT:
                        d.push('h', -r[0], 'v', r[1]);
                        break;
                    case $j.types.corners.BOTTOMLEFT:
                        d.push('v', -r[1], 'h', -r[0]);
                        break;
                    case $j.types.corners.TOPLEFT:
                        d.push('h', r[0], 'v', -r[1]);
                        break;
                }
            } else if (this.cornerType === $j.types.cornerTypes.INNERLINE) {
                y2 = r[1] * 0.5;
                x2 = r[0] * 0.5;
                switch (corner) {
                    case $j.types.corners.TOPRIGHT:
                        d.push('v', y2, 'l', r[0] - x2, r[1] - y2, 'h', r[0] - x2);
                        break;
                    case $j.types.corners.BOTTOMRIGHT:
                        d.push('h', -(r[0] - x2), 'l', -(r[0] - x2), r[1] - y2, 'v', r[1] - y2);
                        break;
                    case $j.types.corners.BOTTOMLEFT:
                        d.push('v', -y2, 'l', -(r[0] - x2), -(r[1] - y2), 'h', -(r[0] - x2));
                        break;
                    case $j.types.corners.TOPLEFT:
                        d.push('h', r[0] - x2, 'l', r[0] - x2, -(r[1] - y2), 'v', (-r[1] - y2));
                        break;
                }
            } else {
                if (this.cornerType === $j.types.cornerTypes.ROUND || this.cornerType === $j.types.cornerTypes.INNERROUND) {
                    sweep = +(this.cornerType === $j.types.cornerTypes.ROUND);
                    d.push('a', r[0], r[1], '0', 0, sweep);
                }
                else if (this.cornerType === $j.types.cornerTypes.BEVEL) {
                    d.push('l');
                }
                d.push(corner === $j.types.corners.BOTTOMRIGHT || corner === $j.types.corners.BOTTOMLEFT ? -r[0] : r[0]);
                d.push(corner === $j.types.corners.BOTTOMLEFT || corner === $j.types.corners.TOPLEFT ? -r[1] : r[1]);
            }
        },
        destroy: function () {
            this._inherited();
            this.bordersRadius.owner = null;
            this.bordersRadius.topLeft = null;
            this.bordersRadius.topRight = null;
            this.bordersRadius.bottomLeft = null;
            this.bordersRadius.bottomRight = null;
            this.bordersRadius.cssUnit = null;
        }
        //#endregion
    });
    Object.seal(CornerButton);
    $j.classes.register($j.types.categories.EXTENDED, CornerButton);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var CornerButtonTpl = "<button id='{internalId}' data-name='{name}' data-class='CornerButton' class='Control CornerButton {theme}' data-topleft='5' data-topright='10' \
                                data-bottomleft='25' data-bottomright='15' style='width:75px;height:21px;'><div style='clip-path:url(#{name}Clip);'>{caption}</div><svg width='100%' height='100%' style='display: none;'>\
                                <defs></defs>\
                                <path d='M 0 0' /></svg>\
                                </button>";
        $j.classes.registerTemplates([{ Class: CornerButton, template: CornerButtonTpl }]);
    }
    //#endregion
})();