(function () {
    var Splitter = $j.classes.ThemedControl.extend("Splitter", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._down = false;
                this._downPos = new $j.classes.Point;
                this._firstCtrl = null;
                this._lastCtrl = null;
                this._lastLeftTop = 0;
                this._isCollapsed = false;
                //#endregion Private
                this.minSize = 10;
                this.maxSize = 10;
                this.collapsible = false;
                this.autoCapture = true;
                $j.tools.addPropertyFromSet(this, "orientation", $j.types.orientations, $j.types.orientations.VERTICAL);
                this.hitTest.mouseMove = true;
                delete this.tabOrder;
            }
        },
        //#region Private
        setOrientation: function (newValue) {
            if (!$j.tools.valueInset(newValue, $j.types.orientations)) return;
            if (this.orientation !== newValue) {
                this.orientation = newValue;
                if (this.orientation === $j.types.orientations.VERTICAL) {
                    this.setAlign($j.types.aligns.LEFT);
                } else {
                    this.setAlign($j.types.aligns.TOP);
                }
            }
        },
        setCollapsible: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.collapsible !== newValue) {
                this.collapsible = newValue;
            }
        },
        setMinSize: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.minSize !== newValue) {
                this.minSize = newValue;
            }
        },
        setMaxSize: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.maxSize !== newValue) {
                this.maxSize = newValue;
            }
        },
        //#endregion Private
        //#region Methods
        loaded: function () {
            this._inherited();
            this.checkCtrls();
        },
        updateFromHTML: function () {
            var data = this._HTMLElement.dataset.firstctrl;
            if (data) this._firstCtrl = data;
            data = this._HTMLElement.dataset.lastctrl;
            if (data) this._lastCtrl = data;
            data = this._HTMLElement.dataset.minsize;
            if (data) this.minSize = ~~data;
            data = this._HTMLElement.dataset.maxsize;
            if (data) this.maxSize = ~~data;
            data = this._HTMLElement.dataset.collapsible;
            if (data) this.collapsible = _conv.strToBool(data);
            data = this._HTMLElement.dataset.orientation;
            if (data) this.orientation = data;
            this._inherited();
        },
        mouseDown: function () {
            var resizeLine, p, theme = this.form.getThemeName(), style;
            this._inherited();
            if ($j.mouse.button === $j.types.mouseButtons.LEFT) {
                if (!this.canCollapse()) {
                    this._downPos.assign($j.mouse.document);
                    this._down = true;
                    resizeLine = $j.doc.createElement($j.types.HTMLElements.DIV);
                    style = resizeLine.style;
                    if (this.orientation === $j.types.orientations.VERTICAL) {
                        style.transform = "translateX(" + this._HTMLElement.offsetLeft + $j.types.CSSUnits.PX + ")";
                        style.top = 0;
                        style.bottom = 0;
                        style.width = "5px";
                    } else {
                        style.transform = "translateY(" + this._HTMLElement.offsetTop + $j.types.CSSUnits.PX + ")";
                        style.left = 0;
                        style.right = 0;
                        style.height = "5px";
                    }
                    style.zIndex = 99999;
                    $j.CSS.addClass(resizeLine, "ghostSplitter" + String.SPACE + this.getThemeName());
                    resizeLine.jsObj = this;
                    this._HTMLElement.parentNode.appendChild(resizeLine);
                }
            }
        },
        mouseMove: function () {
            var x, y, resizeLine;
            this._inherited();
            if ($j.mouse.button === $j.types.mouseButtons.LEFT) {
                if (this._down) {
                    resizeLine = this._HTMLElement.parentNode.lastElementChild;
                    if (this.orientation === $j.types.orientations.VERTICAL) {
                        x = this._HTMLElement.offsetLeft + ($j.mouse.document.x - this._downPos.x);
                        if (x < this.minSize) x = this.minSize;
                        if (this._HTMLElement.parentNode.offsetWidth - x - this._HTMLElement.offsetWidth < this.minSize) x = this._HTMLElement.parentNode.offsetWidth - this.minSize - this._HTMLElement.offsetWidth;
                        if (this.align === $j.types.aligns.LEFT) {
                            if (x > this.maxSize) x = this.maxSize;
                        } else if (this.align === $j.types.aligns.RIGHT) {
                            if (x < this._HTMLElement.parentNode.offsetWidth - this.maxSize - this._HTMLElement.offsetWidth) x = this._HTMLElement.parentNode.offsetWidth - this.maxSize - this._HTMLElement.offsetWidth;
                        }
                        resizeLine.style.transform = "translateX(" + x + $j.types.CSSUnits.PX + ")";
                    } else {
                        y = this._HTMLElement.offsetTop + ($j.mouse.document.y - this._downPos.y);
                        if (y < this.minSize) y = this.minSize;
                        if (this._HTMLElement.parentNode.offsetHeight - y - this._HTMLElement.offsetHeight < this.minSize) y = this._HTMLElement.parentNode.offsetHeight - this.minSize - this._HTMLElement.offsetHeight;
                        if (this.align === $j.types.aligns.TOP) {
                            if (y > this.maxSize) y = this.maxSize;
                        } else if (this.align === $j.types.aligns.BOTTOM) {
                            if (y < this._HTMLElement.parentNode.offsetHeight - this.maxSize - this._HTMLElement.offsetHeight) y = this._HTMLElement.parentNode.offsetHeight - this.maxSize - this._HTMLElement.offsetHeight;
                        }
                        resizeLine.style.transform = "translateY(" + y + $j.types.CSSUnits.PX + ")";
                    }
                }
            }
        },
        mouseUp: function () {
            this._inherited();
            if (this._down) {
                this._down = false;
                this.updateControls();
                this._HTMLElement.parentNode.lastElementChild.jsObj = null;
                this._HTMLElement.parentNode.removeChild(this._HTMLElement.parentNode.lastElementChild);
                //if (this.orientation===$j.types.orientations.VERTICAL) $j.CSS.removeClass(this._HTMLElement.parentNode,$j.types.customCursors.WRESIZE);
                //else $j.CSS.removeClass(this._HTMLElement.parentNode,$j.types.customCursors.SRESIZE);
            }
        },
        click: function () {
            this._inherited();
            if (this.canCollapse()) {
                if (this._isCollapsed) this.expand();
                else this.collapse();
            }
        },
        collapse: function () {
            if (this.orientation === $j.types.orientations.VERTICAL) {
                this._lastLeftTop = this._HTMLElement.offsetLeft;
                if (this.align === $j.types.aligns.LEFT) {
                    this._firstCtrl.setWidth(0);
                    this.setLeft(0);
                    this._lastCtrl.setLeft(this._HTMLElement.offsetWidth);
                } else if (this.align === $j.types.aligns.RIGHT) {
                    this._lastLeftTop = parseInt(getComputedStyle(this._HTMLElement).right, 10);
                    this._firstCtrl._HTMLElementStyle.right = this._HTMLElement.offsetWidth + $j.types.CSSUnits.PX;
                    this._lastCtrl.setWidth(0);
                    this._HTMLElementStyle.right = "0";
                }
            } else {
                if (this.align === $j.types.aligns.TOP) {
                    this._lastLeftTop = this._HTMLElement.offsetTop;
                    this._firstCtrl.setHeight(0);
                    this.setTop(0);
                    this._lastCtrl.setTop(this._HTMLElement.offsetHeight);
                } else if (this.align === $j.types.aligns.BOTTOM) {
                    this._lastLeftTop = parseInt(getComputedStyle(this._HTMLElement).bottom, 10);
                    this._firstCtrl._HTMLElementStyle.bottom = this._HTMLElement.offsetHeight + $j.types.CSSUnits.PX;
                    this._lastCtrl.setHeight(0);
                    this._HTMLElementStyle.bottom = "0";
                }
            }
            this._isCollapsed = true;
        },
        expand: function () {
            if (this.orientation === $j.types.orientations.VERTICAL) {
                if (this.align === $j.types.aligns.LEFT) {
                    this.setLeft(this._lastLeftTop);
                    this._firstCtrl.setWidth(this._HTMLElement.offsetLeft);
                    this._lastCtrl.setLeft(this._HTMLElement.offsetWidth + this._HTMLElement.offsetLeft);
                } else if (this.align === $j.types.aligns.RIGHT) {
                    this._firstCtrl._HTMLElementStyle.right = (this._lastLeftTop + this._HTMLElement.offsetWidth) + $j.types.CSSUnits.PX;
                    this._HTMLElementStyle.right = this._lastLeftTop + $j.types.CSSUnits.PX;
                    this._lastCtrl.setWidth(this._lastLeftTop);
                }
                this._lastLeftTop = 0;
            } else {
                if (this.align === $j.types.aligns.TOP) {
                    this.setTop(this._lastLeftTop);
                    this._firstCtrl.setHeight(this._HTMLElement.offsetTop);
                    this._lastCtrl.setTop(this._HTMLElement.offsetHeight + this._HTMLElement.offsetTop);
                } else if (this.align === $j.types.aligns.BOTTOM) {
                    this._firstCtrl._HTMLElementStyle.bottom = (this._lastLeftTop + this._HTMLElement.offsetHeight) + $j.types.CSSUnits.PX;
                    this._HTMLElementStyle.bottom = this._lastLeftTop + $j.types.CSSUnits.PX;
                    this._lastCtrl.setHeight(this._lastLeftTop);
                }
                this._lastLeftTop = 0;
            }
            this._isCollapsed = false;
        },
        canCollapse: function () {
            var w2, y2, inCollapsibleArea = false;
            if (this.orientation === $j.types.orientations.VERTICAL) {
                y2 = ~~(this._HTMLElement.offsetHeight / 2);
                inCollapsibleArea = $j.mouse.target.y > y2 - 15 && $j.mouse.target.y < y2 + 15;
            } else {
                w2 = ~~(this._HTMLElement.offsetWidth / 2);
                inCollapsibleArea = $j.mouse.target.x > w2 - 15 && $j.mouse.target.x < w2 + 15;
            }
            return this.collapsible & inCollapsibleArea;
        },
        updateControls: function () {
            var offset, resizeLine = this._HTMLElement.parentNode.lastElementChild, mat;
            if (this.orientation === $j.types.orientations.VERTICAL) {
                mat = getComputedStyle(resizeLine).transform;
                mat = mat.match(/-?[\d\.]+/g);
                offset = ~~mat[4] - this._HTMLElement.offsetLeft;
                if (this._firstCtrl) {
                    if (this._firstCtrl.align === $j.types.aligns.CLIENT) this._firstCtrl.setRight(this._HTMLElement.parentNode.offsetWidth - ~~mat[4]);
                    else this._firstCtrl.setWidth(this._firstCtrl._HTMLElement.offsetWidth + offset);
                }
                if (this._lastCtrl) {
                    if (this._lastCtrl.align === $j.types.aligns.CLIENT) this._lastCtrl.setLeft(this._lastCtrl._HTMLElement.offsetLeft + offset);
                    else this._lastCtrl.setWidth(this._HTMLElement.parentNode.offsetWidth - resizeLine.offsetWidth - ~~mat[4]);
                }
                if (this.align === $j.types.aligns.LEFT) this.setLeft(this._HTMLElement.offsetLeft + offset);
                else this._HTMLElementStyle.right = (this._HTMLElement.parentNode.offsetWidth - this._lastCtrl._HTMLElement.offsetLeft) + $j.types.CSSUnits.PX;
            } else {
                mat = getComputedStyle(resizeLine).transform;
                mat = mat.match(/-?[\d\.]+/g);
                offset = ~~mat[5] - this._HTMLElement.offsetTop;
                if (this._firstCtrl) {
                    if (this._firstCtrl.align === $j.types.aligns.CLIENT) this._firstCtrl.setBottom(this._HTMLElement.parentNode.offsetHeight - ~~mat[5]);
                    else this._firstCtrl.setHeight(this._firstCtrl._HTMLElement.offsetHeight + offset);
                }
                if (this._lastCtrl) {
                    if (this._lastCtrl.align === $j.types.aligns.CLIENT) this._lastCtrl.setTop(this._lastCtrl._HTMLElement.offsetTop + offset);
                    else this._lastCtrl.setHeight(this._HTMLElement.parentNode.offsetHeight - resizeLine.offsetHeight - ~~mat[5]);
                }
                if (this.align === $j.types.aligns.TOP) this.setTop(this._HTMLElement.offsetTop + offset);
                else this._HTMLElementStyle.bottom = (this._HTMLElement.parentNode.offsetHeight - this._lastCtrl._HTMLElement.offsetTop) + $j.types.CSSUnits.PX;
            }
        },
        checkCtrls: function () {
            var comps = [], i, l, self = this;
            if (typeof this._firstCtrl === _const.STRING) {
                if (this.form[this._firstCtrl]) this._firstCtrl = this.form[this._firstCtrl];
                else this._firstCtrl = null;
            } else if (!this._firstCtrl) {
                switch (this.align) {
                    case $j.types.aligns.LEFT:
                        comps = this._owner._components.filter(function (e, i, a) {
                            return (e.align === $j.types.aligns.LEFT) && e.visible && e._HTMLElement.parentNode === self._HTMLElement.parentNode;
                        });
                        break;
                    case $j.types.aligns.TOP:
                        comps = this._owner._components.filter(function (e, i, a) {
                            return (e.align === $j.types.aligns.TOP) && e.visible && e._HTMLElement.parentNode === self._HTMLElement.parentNode;
                        });
                        break;
                    case $j.types.aligns.RIGHT:
                        comps = this._owner._components.filter(function (e, i, a) {
                            return (e.align === $j.types.aligns.CLIENT) && e.visible && e._HTMLElement.parentNode === self._HTMLElement.parentNode;
                        });
                        break;
                    case $j.types.aligns.BOTTOM:
                        comps = this._owner._components.filter(function (e, i, a) {
                            return (e.align === $j.types.aligns.CLIENT) && e.visible && e._HTMLElement.parentNode === self._HTMLElement.parentNode;
                        });
                        break;
                }
                for (i = 0, l = comps.length; i < l; i++) {
                    if (comps[i] !== this) {
                        this._firstCtrl = comps[i];
                        break;
                    }
                }
            }
            if (typeof this._lastCtrl === _const.STRING) {
                if (this.form[this._lastCtrl]) this._lastCtrl = this.form[this._lastCtrl];
                else this._lastCtrl = null;
            } else if (!this._lastCtrl) {
                switch (this.align) {
                    case $j.types.aligns.RIGHT:
                        comps = this._owner._components.filter(function (e, i, a) {
                            return (e.align === $j.types.aligns.RIGHT) && e.visible && e._HTMLElement.parentNode === self._HTMLElement.parentNode;
                        });
                        break;
                    case $j.types.aligns.BOTTOM:
                        comps = this._owner._components.filter(function (e, i, a) {
                            return (e.align === $j.types.aligns.BOTTOM) && e.visible && e._HTMLElement.parentNode === self._HTMLElement.parentNode;
                        });
                        break;
                    case $j.types.aligns.LEFT:
                        comps = this._owner._components.filter(function (e, i, a) {
                            return (e.align === $j.types.aligns.CLIENT) && e.visible && e._HTMLElement.parentNode === self._HTMLElement.parentNode;
                        });
                        break;
                    case $j.types.aligns.TOP:
                        comps = this._owner._components.filter(function (e, i, a) {
                            return (e.align === $j.types.aligns.CLIENT) && e.visible && e._HTMLElement.parentNode === self._HTMLElement.parentNode;
                        });
                        break;
                }
                for (i = 0, l = comps.length; i < l; i++) {
                    if (comps[i] !== this) {
                        this._lastCtrl = comps[i];
                        break;
                    }
                }
            }
        },
        destroy: function () {
            this._inherited();
            this._down = null;
            this._downPos.destroy();
            this._downPos = null;
            this._firstCtrl = null;
            this._lastCtrl = null;
            this._lastLeftTop = null;
            this.minSize = null;
            this.maxSize = null;
            this.collapsible = null;
            this.orientation = null;
        }
        //#endregion
    });
    Object.seal(Splitter);
    $j.classes.register($j.types.categories.COMMON, Splitter);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var SplitterTpl = "<div id='{internalId}' data-name='{name}' data-class='Splitter' class='Control csr_wResize Splitter orientation-vertical {theme}' data-orientation='vertical' data-align='left' data-collapsible='true' style='{style}'></div>";
        $j.classes.registerTemplates([{ Class: Splitter, template: SplitterTpl }]);
    }
    //endregion
})();
//http://codepen.io/enxaneta/pen/zGGMxq