(function () {
    var ScrollBox = $j.classes.ScrollControl.extend("ScrollBox", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._viewPort = null;
                this._content = $j.classes.createComponent($j.classes.Layout, this, null, { _inForm: false }, false);
                this._content._components.onChange.addListener(this.updateContent);
                this._HScrollBar = $j.classes.createComponent($j.classes.ScrollBar, this, null, { _inForm: false }, false);
                this._VScrollBar = $j.classes.createComponent($j.classes.ScrollBar, this, null, { _inForm: false }, false);
                this._HScrollBar.onChange.addListener(this.HScroll);
                this._HScrollBar.setAlign($j.types.aligns.MOSTRIGHT);
                this._VScrollBar.onChange.addListener(this.VScroll);
                this._VScrollBar.setAlign($j.types.aligns.MOSTBOTTOM);
                this._lastDelta = new $j.classes.Point;
                this._downPos = new $j.classes.Point;
                this._currentPos = new $j.classes.Point;
                this._down = false;
                this._HScrollAni = null;
                this._VScrollAni = null;
                //#endregion
                this.hitTest.mouseWheel = true;
                this.mouseTracking = true;
                this.animated = true;
            }
        },
        //#region Methods
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{horizontalScrollBar}"), tpl;
            tpl = this._HScrollBar.getTemplate();
            html = a.join(tpl);
            a = html.split("{verticalScrollBar}"), tpl;
            tpl = this._VScrollBar.getTemplate();
            html = a.join(tpl);
            return html;
        },
        getChildsHTMLElement: function () {
            if (this._HTMLElement) {
                this._VScrollBar.getHTMLElement(this._HTMLElement.lastElementChild.id);
                this._VScrollBar.getChildsHTMLElement();
                this._VScrollBar.setOrientation($j.types.orientations.VERTICAL);
                this._VScrollBar.updateFromHTML();

                this._HScrollBar._HTMLElement = this._VScrollBar._HTMLElement.previousSibling;
                while (this._HScrollBar._HTMLElement.nodeType !== $j.types.xmlNodeTypes.ELEMENT_NODE) {
                    this._HScrollBar._HTMLElement = this._HScrollBar._HTMLElement.previousSibling;
                }
                this._HScrollBar.getHTMLElement(this._HScrollBar._HTMLElement.id);
                this._HScrollBar.getChildsHTMLElement();
                this._HScrollBar.updateFromHTML();
                this._viewPort = this._HTMLElement.firstElementChild;
                this._viewPort.jsObj = this;
                //this._content=new $j.classes.Layout(this);
                //this._content._components.onChange.addListener(this.updateContent);
                this._content._HTMLElement = this._viewPort.firstElementChild;
                this._content._HTMLElement.jsObj = this;
                this._content._HTMLElementStyle = this._content._HTMLElement.style;
                this._content.getChildsHTMLElement(this._content._HTMLElement);
                //this._content.getChildsHTMLElement();
                this._HScrollBar.updateFromHTML();
                this._VScrollBar.updateFromHTML();
            }
        },
        HScroll: function () {
            var scrollBox = this._owner;
            scrollBox.updateContentPos();
        },
        VScroll: function () {
            var scrollBox = this._owner;
            scrollBox.updateContentPos();
        },
        updateContentPos: function () {
            this._content._HTMLElementStyle.transform = "translate(" + (-this._HScrollBar.value) + $j.types.CSSUnits.PX + "," + (-this._VScrollBar.value) + $j.types.CSSUnits.PX + ")";
        },
        mouseWheel: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.scrollbars;
            if ((data === $j.types.scrollbars.VERTICAL) || (data === $j.types.scrollbars.BOTH)) {
                this._VScrollBar.mouseWheel();
            } else if (data === $j.types.scrollbars.HORIZONTAL) {
                this._HScrollBar.mouseWheel();
            }
        },
        update: function () {
            if (this._HTMLElement) {
                if (this._content) {
                    var i, childs = this._content._HTMLElement.childNodes, l = childs.length, maxX = 0, maxY = 0, viewHS = false, viewVS = false;
                    for (i = 0; i < l; i++) {
                        if (childs[i].nodeType === $j.types.xmlNodeTypes.ELEMENT_NODE) {
                            if (childs[i].offsetLeft + childs[i].offsetWidth > maxX) maxX = childs[i].offsetLeft + childs[i].offsetWidth;
                            if (childs[i].offsetTop + childs[i].offsetHeight > maxY) maxY = childs[i].offsetTop + childs[i].offsetHeight;
                        }
                    }
                }
                if (maxX > this._HTMLElement.offsetWidth) viewHS = true;
                if (maxY > this._HTMLElement.offsetHeight) viewVS = true;
                $j.CSS.removeClass(this._HTMLElement, "scrollbars-none scrollbars-both scrollbars-horizontal scrollbars-vertical");
                if (viewHS && viewVS) {
                    this._HTMLElement.dataset.scrollbars = $j.types.scrollbars.BOTH;
                    $j.CSS.addClass(this._HTMLElement, "scrollbars-both");
                } else if (viewHS && !viewVS) {
                    this._HTMLElement.dataset.scrollbars = $j.types.scrollbars.HORIZONTAL;
                    $j.CSS.addClass(this._HTMLElement, "scrollbars-horizontal");
                } else if (!viewHS && viewVS) {
                    this._HTMLElement.dataset.scrollbars = $j.types.scrollbars.VERTICAL;
                    $j.CSS.addClass(this._HTMLElement, "scrollbars-vertical");
                }
                else {
                    this._HTMLElement.dataset.scrollbars = $j.types.scrollbars.NONE;
                    $j.CSS.addClass(this._HTMLElement, "scrollbars-none");
                }
                if (this._HScrollBar) {
                    this._HScrollBar.setMax(maxX - this._HTMLElement.offsetWidth);
                    this._HScrollBar.setViewportSize(maxX);
                }
                if (this._VScrollBar) {
                    this._VScrollBar.setMax(maxY - this._HTMLElement.offsetHeight);
                    this._VScrollBar.setViewportSize(maxY);
                }
                this._HScrollBar.smallChange = ~~(this._HScrollBar.viewportSize / 5);
                this._VScrollBar.smallChange = ~~(this._VScrollBar.viewportSize / 5);
                this._content._HTMLElementStyle.width = maxX + $j.types.CSSUnits.PX;
                this._content._HTMLElementStyle.height = maxY + $j.types.CSSUnits.PX;
            }
        },
        loaded: function () {
            this._inherited();
            this.update();
        },
        mouseDown: function () {
            this._inherited();
            if ($j.mouse.button === $j.types.mouseButtons.LEFT && this.mouseTracking) {
                this._lastDelta.setValues(0, 0);
                this._downPos.assign($j.mouse.screen);
                this._currentPos.assign($j.mouse.screen);
                this._down = true;
                if (this._VScrollAni && this._VScrollAni.running) this._VScrollAni.stopAtCurrent();
                if (this._HScrollAni && this._HScrollAni.running) this._HScrollAni.stopAtCurrent();
            }
        },
        mouseMove: function () {
            var data;
            this._inherited();
            if (this._down && this.mouseTracking) {
                data = this._HTMLElement.dataset.scrollbars;
                if (data === $j.types.scrollbars.VERTICAL || data === $j.types.scrollbars.BOTH) {
                    this._VScrollBar.setValue(this._VScrollBar.value - ($j.mouse.screen.y - this._currentPos.y));
                    this._lastDelta.y = ($j.mouse.screen.y - this._currentPos.y);
                }
                if (data === $j.types.scrollbars.HORIZONTAL || data === $j.types.scrollbars.BOTH) {
                    this._HScrollBar.setValue(this._HScrollBar.value - ($j.mouse.screen.x - this._currentPos.x));
                    this._lastDelta.x = ($j.mouse.screen.x - this._currentPos.x);
                }
                this._currentPos.assign($j.mouse.screen);
            }
        },
        mouseUp: function () {
            var data;
            this._inherited();
            if (this._down && this.mouseTracking) {
                this._down = false;
                if (this.animated && ((this._lastDelta.x !== 0) || (this._lastDelta.y !== 0))) {
                    data = this._HTMLElement.dataset.scrollbars;
                    if (data === $j.types.scrollbars.VERTICAL || data === $j.types.scrollbars.BOTH) {
                        this.createVScrollAni();
                        if (this._VScrollAni.running) this._VScrollAni.stopAtCurrent();
                        this._VScrollAni.stopValue = this._VScrollBar.value - (this._lastDelta.y * 7);
                        this._VScrollAni.start();
                    }
                    if (data === $j.types.scrollbars.HORIZONTAL || data === $j.types.scrollbars.BOTH) {
                        this.createHScrollAni();
                        if (this._HScrollAni.running) this._HScrollAni.stopAtCurrent();
                        this._HScrollAni.stopValue = this._HScrollBar.value - (this._lastDelta.x * 7);
                        this._HScrollAni.start();
                    }
                }
            }
        },
        createVScrollAni: function () {
            if (!this._VScrollAni) {
                this._VScrollAni = new $j.classes.FloatAnimation(this);
                this._VScrollAni.animationType = $j.types.animationTypes.OUT;
                this._VScrollAni.interpolation = $j.types.interpolationTypes.QUADRATIC;
                this._VScrollAni.duration = 1;
                this._VScrollAni.control = this._VScrollBar;
                this._VScrollAni.propertyName = "value";
                this._VScrollAni.startFromCurrent = true;
                this._VScrollAni.convertToCSS = false;
            }
        },
        createHScrollAni: function () {
            if (!this._HScrollAni) {
                this._HScrollAni = new $j.classes.FloatAnimation(this);
                this._HScrollAni.animationType = $j.types.animationTypes.OUT;
                this._HScrollAni.interpolation = $j.types.interpolationTypes.QUADRATIC;
                this._HScrollAni.duration = 1;
                this._HScrollAni.control = this._HScrollBar;
                this._HScrollAni.propertyName = "value";
                this._HScrollAni.startFromCurrent = true;
                this._HScrollAni.convertToCSS = false;
            }
        },
        destroy: function () {
            this._inherited();
            this._viewPort = null;
            this._content = null;
            //this._HScrollBar.destroy();
            this._HScrollBar = null;
            //this._VScrollBar.destroy();
            this._VScrollBar = null;
            this._lastDelta.destroy();
            this._lastDelta = null;
            this._downPos.destroy();
            this._downPos = null;
            this._currentPos.destroy();
            this._currentPos = null;
            this._down = null;
            if (this._HScrollAni) this._HScrollAni.destroy();
            this._HScrollAni = null;
            if (this._VScrollAni) this._VScrollAni.destroy();
            this._VScrollAni = null;
            this.mouseTracking = null;
            this.animated = null;
        },
        getTabOrderList: function (list, children) {
            var i, control, l, tabList = this._content._tabList;
            if (children) children = true;
            if (!list) return;
            if (tabList) {
                l = tabList.length;
                for (i = 0; i < l; i++) {
                    control = tabList[i];
                    list.push(control);
                    if (children) control.getTabOrderList(list, children);
                }
            }
        },
        updateContent: function (op, obj) {
            if (this.form._loading || this._destroying) return;
            if (op === $j.types.operations.INSERT || op === $j.types.operations.REMOVE) {
                if (obj._owner === this) this._owner.update();
            }
        },
        addControl: function (control) {
            this._inherited(control);
            if (this._content) this._content._HTMLElement.appendChild(control._HTMLElement);
            this.update();
        }
        //#endregion
    });
    Object.seal(ScrollBox);
    $j.classes.register($j.types.categories.CONTAINERS, ScrollBox);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var ScrollBoxTpl = "<div id='{internalId}' data-name='{name}' data-class='ScrollBox' class='Control ScrollBox {theme} scrollbars-none' data-scrollbars='none' style='width:185px;height:41px;'>\
                      <div class='Control ScrollBoxViewPort {theme}'>\
                      <div class='Control ScrollBoxContent {theme}'></div>\
                      </div>\
                      {horizontalScrollBar}\
                      {verticalScrollBar}\
                      </div>";
        $j.classes.registerTemplates([{ Class: ScrollBox, template: ScrollBoxTpl }]);
    }
    //#endregion
})();