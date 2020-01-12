(function () {
    //#region Control
    var Control = $j.classes.Component.extend("Control", {
        init: function (owner, props) {
            props = !props ? {} : props;
            var t = new Date().getTime();
            if (owner) {
                //#region Private
                this._allowUpdate = true;
                this._autoTranslate = false;
                this._isMouseOver = false;
                this._isFocused = false;
                this._isPressed = false;
                this._closePopups = true;
                this._wrapper = String.EMPTY;
                this._forceMouseWheel = false;
                this._hasResizeEvent = false;
                this._resizeDatas = {
                    width: null,
                    height: null
                };
                this._tabList = [];
                this._stopEvent = true;
                //this._boundingClientRect=new $j.classes.Rect;
                //#endregion
                this.constraints = new $j.classes.SizeConstraints(this);
                this.ownerShowToolTip = true;
                this.autoCapture = false;
                this.padding = new $j.classes.Padding(this);
                this.margin = new $j.classes.Margin(this);
                this.onMouseDown = new $j.classes.NotifyEvent(this);
                this.onMouseMove = new $j.classes.NotifyEvent(this);
                this.onMouseUp = new $j.classes.NotifyEvent(this);
                this.onClick = new $j.classes.NotifyEvent(this);
                this.onDblClick = new $j.classes.NotifyEvent(this);
                this.onMouseLeave = new $j.classes.NotifyEvent(this);
                this.onMouseEnter = new $j.classes.NotifyEvent(this);
                this.onMouseWheel = new $j.classes.NotifyEvent(this);
                this.onMouseWheelStart = new $j.classes.NotifyEvent(this);
                this.onMouseWheelEnd = new $j.classes.NotifyEvent(this);
                this.onBeforePaint = new $j.classes.NotifyEvent(this);
                this.onPaint = new $j.classes.NotifyEvent(this);
                this.onAfterPaint = new $j.classes.NotifyEvent(this);
                this.onEnterFocus = new $j.classes.NotifyEvent(this);
                this.onKillFocus = new $j.classes.NotifyEvent(this);
                this.onKeyDown = new $j.classes.NotifyEvent(this);
                this.onKeyUp = new $j.classes.NotifyEvent(this);
                this.onKeyPress = new $j.classes.NotifyEvent(this);
                this.onAfterResized = new $j.classes.NotifyEvent(this);
                this.onDragStart = new $j.classes.NotifyEvent(this);
                this.onDrag = new $j.classes.NotifyEvent(this);
                this.onDragExit = new $j.classes.NotifyEvent(this);
                this.onDragEnd = new $j.classes.NotifyEvent(this);
                this.onDragEnter = new $j.classes.NotifyEvent(this);
                this.onDragOver = new $j.classes.NotifyEvent(this);
                this.onDragLeave = new $j.classes.NotifyEvent(this);
                this.onDrop = new $j.classes.NotifyEvent(this);
                this.onDestroy = new $j.classes.NotifyEvent(this);
                this.popupMenu = null;
                this.opacity = 1;
                if (!$j.isHTMLRenderer()) {
                    this.width = 50;
                    this.height = 50;
                }
                this.scale = new $j.classes.Scale(this);
                this.canFocused = false;
                this.showFocus = true;
                this.enabled = true;
                this.rotateCenter = new $j.classes.RotateCenter(this);
                this.toolTip = String.EMPTY;
                this.showToolTip = false;
                this.hitTest = new $j.classes.HitTest();
                this.rotateAngle = 0;
                this.customStyle = null;
                this.cssClasses = String.EMPTY;
                this.tabOrder = 0;
                this._inherited(owner, props);
                this._component = false;
                this.addBindableProperties(["opacity", "right", "bottom", "width", "height", "visible", "left", "top", "rotateAngle", "align"]);
                $j.tools.addPropertyFromSet(this, "anchor", $j.types.anchors, [$j.types.anchors.LEFT, $j.types.anchors.TOP]);
                $j.tools.addPropertyFromSet(this, "align", $j.types.aligns, $j.types.aligns.NONE);
                $j.tools.addPropertyFromSet(this, "cursor", $j.types.customCursors, $j.types.customCursors.DEFAULT);
                $j.tools.addPropertyFromSet(this, "dragKind", $j.types.dragKinds, $j.types.dragKinds.DRAG);
                $j.tools.addPropertyFromSet(this, "dragMode", $j.types.dragModes, $j.types.dragModes.MANUAL);
            };
            $j.tools.Debugger.log(arguments, this, t);
        },
        //#region Setters methods
        setIsPressed: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.hitTest.mouseDown) {
                if (this._isPressed !== newValue) {
                    this._isPressed = newValue;
                    $j.CSS.removeClass(this._HTMLElement, "pressed");
                    if (newValue) $j.CSS.addClass(this._HTMLElement, "pressed");
                }
            }
        },
        setHitTest: function (newValue) {
            if (Array.isArray(newValue)) {
                switch (newValue.length) {
                    case 1:
                        this.hitTest.mouseDown = newValue[0];
                        this.hitTest.mouseMove = false;
                        this.hitTest.mouseUp = false;
                        this.hitTest.mouseWheel = false;
                        this.hitTest.mouseDblClick = false;
                        break;
                    case 2:
                        this.hitTest.mouseDown = newValue[0];
                        this.hitTest.mouseMove = newValue[1];
                        this.hitTest.mouseUp = false;
                        this.hitTest.mouseWheel = false;
                        this.hitTest.mouseDblClick = false;
                        break;
                    case 3:
                        this.hitTest.mouseDown = newValue[0];
                        this.hitTest.mouseMove = newValue[1];
                        this.hitTest.mouseUp = newValue[2];
                        this.hitTest.mouseWheel = false;
                        this.hitTest.mouseDblClick = false;
                        break;
                    case 4:
                        this.hitTest.mouseDown = newValue[0];
                        this.hitTest.mouseMove = newValue[1];
                        this.hitTest.mouseUp = newValue[2];
                        this.hitTest.mouseWheel = newValue[3];
                        this.hitTest.mouseDblClick = false;
                        break;
                    case 5:
                        this.hitTest.mouseDown = newValue[0];
                        this.hitTest.mouseMove = newValue[1];
                        this.hitTest.mouseUp = newValue[2];
                        this.hitTest.mouseWheel = newValue[3];
                        this.hitTest.mouseDblClick = newValue[4];
                        break;
                }
            } else if (typeof newValue === _const.BOOLEAN) this.hitTest.mouseDown = this.hitTest.mouseMove = this.hitTest.mouseUp = this.hitTest.mouseWheel = this.hitTest.mouseDblClick = newValue;
        },
        setIsMouseOver: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.hitTest.mouseMove) {
                if (this._isMouseOver !== newValue) {
                    this._isMouseOver = newValue;
                    //this.applyAllStyles();
                }
            }
        },
        setIsFocused: function (newValue) {
            var lastFC;
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this._isFocused !== newValue) {
                this._isFocused = newValue;
                if (this.form._focusedControl instanceof $j.classes.CustomTextControl) {
                    if (!newValue) lastFC = this.form._focusedControl;
                }

                if (newValue) this.form._focusedControl = this;
                else if (this.form._focusedControl === this) this.form._focusedControl = null;
                if (this._HTMLElement) {
                    this._HTMLElement.dataset.focused = this._isFocused;
                    $j.CSS.removeClass(this._HTMLElement, "focused");
                    if (newValue && this.showFocus) $j.CSS.addClass(this._HTMLElement, "focused");
                }
                if (!newValue) this.killFocus();
                if (lastFC) {
                    if (lastFC._inputObj) lastFC._inputObj.blur();
                }
            }
        },
        setAnchor: function (newValue) {
            if (!Array.isArray(newValue)) return;
            this.anchor.length = 0;
            this.anchor.addRange(newValue);
        },
        setOpacity: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue > 1) newValue = 1;
            if (newValue < 0) newValue = 0;
            if (this.opacity !== newValue) {
                this.opacity = newValue;
                this.propertyChanged($j.types.bindableProperties.OPACITY);
                if (!this._loading && !this.form._loading) this._HTMLElementStyle.opacity = newValue;
            }
        },
        setRight: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.right !== newValue) {
                this.right = newValue;
                this.propertyChanged($j.types.bindableProperties.RIGHT);
                if (!this._loading && !this.form._loading) {
                    this._HTMLElementStyle.right = newValue + $j.types.CSSUnits.PX;
                    this._HTMLElementStyle.width = String.EMPTY;
                }
            }
        },
        setBottom: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.bottom !== newValue) {
                this.bottom = newValue;
                this.propertyChanged($j.types.bindableProperties.BOTTOM);
                if ((!this._loading && !this.form._loading) || $j.tools.Debugger.useFragment) {
                    this._HTMLElementStyle.bottom = newValue + $j.types.CSSUnits.PX;
                    this._HTMLElementStyle.height = String.EMPTY;
                }
            }
        },
        setTabOrder: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.tabOrder !== newValue) this.tabOrder = newValue;
        },
        setWidth: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.width !== newValue) {
                if (!$j.isHTMLRenderer()) this.width = newValue;
                if (!this._loading) {
                    this.propertyChanged($j.types.bindableProperties.WIDTH);
                    if (newValue === 0) this._HTMLElementStyle.width = String.EMPTY;
                    else this._HTMLElementStyle.width = newValue + $j.types.CSSUnits.PX;
                    //this._boundingClientRect.right=this._boundingClientRect.left+this._HTMLElement.offsetWidth;
                }
            }
        },
        setHeight: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.height !== newValue) {
                if (!$j.isHTMLRenderer()) this.height = newValue;
                if (!this._loading) {
                    this.propertyChanged($j.types.bindableProperties.HEIGHT);
                    if (newValue === 0) this._HTMLElementStyle.height = String.EMPTY;
                    else this._HTMLElementStyle.height = newValue + $j.types.CSSUnits.PX;
                    //this._boundingClientRect.bottom=this._boundingClientRect.top+this._HTMLElement.offsetHeight;
                }
            }
        },
        setVisible: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.visible !== newValue) {
                this.visible = newValue;
                //if (this.visible){
                //}          if (!this._loading){
                //if (this.align!==$j.types.aligns.NONE) this.alignmentNeeded=true;
                //if (this.owner&&(this.align!==$j.types.aligns.NONE)) {
                //  this.owner.disableAlign=false;
                //  this.owner.realign();
                //}
                //  }
                this.propertyChanged($j.types.bindableProperties.VISIBLE);
                if (this._HTMLElementStyle) {
                    if (this.visible) {
                        //this.applyAllStyles();
                        this._HTMLElementStyle.visibility = $j.types.CSSValues.VISIBLE;
                    } else this._HTMLElementStyle.visibility = $j.types.CSSValues.HIDDEN;
                    this._HTMLElement.dataset.visible = this.visible;
                }
                if (this._owner && this._owner.update) this._owner.update();
                //this.updateFromHTML();
            }
        },
        setDisplay: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this._HTMLElementStyle.display !== newValue) this._HTMLElementStyle.display = newValue;
            if (this._owner && this._owner.update) this._owner.update();
        },
        setScale: function (newValue) {
            if (!(newValue instanceof $j.classes.Point)) return;
            if (!this.scale.equals(newValue)) {
                this.scale.assign(newValue);
                if (!this._loading && !this.form._loading) {
                    if (!$j.isHTMLRenderer()) this.update();
                    else this.applyTransforms();//="scale("+newValue.x+","+newValue.y+")";
                    //else $j.CSS.updateInlineCSS(this,$j.types.jsCSSProperties.TRANSFORM);
                }
            }
        },
        //setAlignmentNeeded: function(newValue) {
        //  if (typeof newValue!==_const.BOOLEAN) return;
        //  if (this.alignmentNeeded!==newValue) {
        //    this.alignmentNeeded=newValue;
        //    for (var i=0,l=this._components.length;i<l;i++) {
        //      this._components[i].alignmentNeeded=newValue;
        //    }
        //  }
        //},
        setCanFocused: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            this.canFocused = newValue;
        },
        setEnabled: function (newValue) {
            var comps;
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.enabled !== newValue) {
                this.enabled = newValue;
                this._HTMLElement.dataset.enabled = this.enabled;
                $j.CSS.removeClass(this._HTMLElement, "disabled");
                if (!newValue) {
                    $j.CSS.addClass(this._HTMLElement, "disabled");
                    this.setIsPressed(false);
                }
                comps = this._components.filter(function (e, i, a) {
                    return (e instanceof $j.classes.Control);
                });
                if (comps.length > 0) {
                    for (var i = 0, l = comps.length; i < l; i++) {
                        comps[i].setEnabled(newValue);
                    }
                }
            }
        },
        setAlign: function (newValue) {
            if (!($j.tools.valueInSet(newValue, $j.types.aligns))) return;
            if (this.align !== newValue) {
                this.align = newValue;
                if (!this._loading && !this.form._loading) {
                    if (this.align !== $j.types.aligns.NONE) {
                        this._HTMLElement.dataset.align = this.align;
                        this._owner.realignChilds();
                        if (this._owner._hasResizeEvent) this._owner.resized();
                    }
                }
            }
        },
        setRotateCenter: function (newValue) {
            if (!(newValue instanceof $j.classes.Point)) return;
            if (!this.rotateCenter.equals(newValue)) {
                this.rotateCenter.assign(newValue);
                if (!this._loading && !this.form._loading) this._HTMLElementStyle.transformOrigin = newValue.x + $j.types.CSSUnits.PO + String.SPACE + newValue.y + $j.types.CSSUnits.PO;
            }
        },
        setCursor: function (newValue) {
            if (!($j.tools.valueInSet(newValue, $j.types.customCursors))) return;
            if (this.cursor !== newValue) {
                $j.CSS.removeClass(this._HTMLElement, this.cursor);
                this.cursor = newValue;
                $j.CSS.addClass(this._HTMLElement, this.cursor);
            }
        },
        setToolTip: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.toolTip !== newValue) {
                this.toolTip = newValue;
                if (this._HTMLElement) {
                    this._HTMLElement.dataset.tooltip = this.toolTip;
                }
            }
        },
        setShowToolTip: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.showToolTip !== newValue) this.showToolTip = newValue;
        },
        setLeft: function (newValue) {
            var delta = 0;
            if (typeof newValue !== _const.NUMBER) return;
            if (this._HTMLElement.offsetLeft !== newValue) {
                if (!this._loading) {
                    delta = newValue - this._HTMLElement.offsetLeft;
                    //this._boundingClientRect.offset(delta,0);
                    //this.offsetChildsBy(delta,0);
                    this.propertyChanged($j.types.bindableProperties.LEFT);
                    this._HTMLElementStyle.left = newValue + $j.types.CSSUnits.PX;
                }
            }
        },
        setTop: function (newValue) {
            var delta = 0;
            if (typeof newValue !== _const.NUMBER) return;
            if (this._HTMLElement.offsetTop !== newValue) {
                if (!this._loading) {
                    delta = newValue - this._HTMLElement.offsetTop;
                    //this._boundingClientRect.offset(0,delta);
                    //this.offsetChildsBy(0,delta);
                    this.propertyChanged($j.types.bindableProperties.TOP);
                    this._HTMLElementStyle.top = newValue + $j.types.CSSUnits.PX;
                }
            }
        },
        setRotateAngle: function (newValue) {
            var bcr = this._HTMLElement.getBoundingClientRect();
            if (typeof newValue !== _const.NUMBER) return;
            if (this.rotateAngle !== newValue) {
                //if (this.rotateAngle===0) {
                //  this._boundingClientRect.setValues(bcr.left,bcr.top,bcr.right,bcr.bottom);
                //}
                this.rotateAngle = newValue;
                this.propertyChanged($j.types.bindableProperties.ROTATEANGLE);
                if (!this._loading && !this.form._loading) this.applyTransforms();
            }
        },
        setPopupMenu: function (newValue) {
            if (!(newValue instanceof $j.classes.PopupMenu)) return;
            if (this.popupMenu !== newValue) this.popupMenu = newValue;
        },
        setClosePopups: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this._closePopups !== newValue) {
                this._closePopups = newValue;
                for (var i = 0, l = this._components.length; i < l; i++) {
                    if (this._components[i] instanceof $j.classes.Control) {
                        this._components[i].setClosePopups(newValue);
                    }
                }
            }
        },
        setBounds: function (l, t, w, h) {
            var style;
            if (typeof l !== _const.NUMBER) return;
            if (typeof t !== _const.NUMBER) return;
            if (typeof w !== _const.NUMBER) return;
            if (typeof h !== _const.NUMBER) return;
            if (!$j.isHTMLRenderer()) {
                this.left = l;
                this.top = t;
                this.width = w;
                this.height = h;
            } else {
                this._HTMLElementStyle.left = l + $j.types.CSSUnits.PX;
                this._HTMLElementStyle.top = t + $j.types.CSSUnits.PX;
                this._HTMLElementStyle.width = w + $j.types.CSSUnits.PX;
                this._HTMLElementStyle.height = h + $j.types.CSSUnits.PX;
            }
            //if (this._HTMLElement) {
            //  //style=this._HTMLElement.style;
            //  this._HTMLElementStyle.left=l+$j.types.CSSUnits.PX;
            //  this._HTMLElementStyle.top=t+$j.types.CSSUnits.PX;
            //  this._HTMLElementStyle.width=w+$j.types.CSSUnits.PX;
            //  this._HTMLElementStyle.height=h+$j.types.CSSUnits.PX;
            //}
        },
        setTabOrder: function (newValue) {
            var curIndex, count;
            if (typeof newValue !== _const.NUMBER) return;
            curIndex = this._owner._tabList.indexOf(this);
            if (curIndex >= 0) {
                count = this._owner.tabList.length;
                if (newValue < 0) newValue = 0;
                if (newValue >= count) newValue = count - 1;
                if (newValue !== curIndex) {
                    this._owner.tabList.deleteAt(curIndex);
                    this._owner.tabList.insert(newValue, this);
                    this.tabOrder = newValue;
                }
            } else {
                this.tabOrder = newValue;
                this._owner._tabList.push(this);
            }
            this._HTMLElement.dataset.taborder = newValue;
        },
        setDimension: function (width, height) {
            if (typeof width !== _const.NUMBER) return;
            if (typeof height !== _const.NUMBER) return;
            //this._boundingClientRect.right=this._boundingClientRect.left+width;
            //this._boundingClientRect.bottom=this._boundingClientRect.top+height;
            this._HTMLElementStyle.width = width + $j.types.CSSUnits.PX;
            this._HTMLElementStyle.height = height + $j.types.CSSUnits.PX;
        },
        //setTabStop:function(newValue) {
        //  if (typeof newValue!==_const.BOOLEAN) return;
        //  if (this.tabStop!==newValue) this.tabStop=newValue;
        //},,
        setShowFocus: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.showFocus !== newValue) {
                this.showFocus = newValue;
                if (!newValue) $j.CSS.removeClass(this._HTMLElement, "focused");
                else if (this._isFocused) $j.CSS.addClass(this._HTMLElement, "focused");
            }
        },
        setDragKind: function (newValue) {
            if (!($j.tools.valueInSet(newValue, $j.types.dragKinds))) return;
            if (this.dragKind !== newValue) {
                this.dragKind = newValue;
            }
        },
        setDragMode: function (newValue) {
            if (!($j.tools.valueInSet(newValue, $j.types.dragModes))) return;
            if (this.dragModes !== newValue) {
                this.dragModes = newValue;
            }
        },
        setCSSClasses: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.cssClasses !== newValue) {
                this.cssClasses = newValue;
                $j.CSS.addClass(this._HTMLElement, this.cssClasses);
            }
        },
        //#endregion
        //#region Methods
        update: function () {
            this.applyTransforms();
        },
        realignChilds: function () {
            var l = 0, t = 0, r = 0, b = 0, i, childs, c, _child, _s,
                alignTop = function (child) {
                    var s = getComputedStyle(child._HTMLElement);
                    child._HTMLElementStyle.top = (t > 0 ? t + $j.types.CSSUnits.PX : "0");
                    child._HTMLElementStyle.left = (l > 0 ? l + $j.types.CSSUnits.PX : "0");
                    child._HTMLElementStyle.right = (r > 0 ? r + $j.types.CSSUnits.PX : "0");
                    child._HTMLElementStyle.width = "auto";
                    child._HTMLElementStyle.bottom = "auto";
                    if (child._HTMLElementStyle.height === "auto") child._HTMLElementStyle.height = (child._owner._HTMLElement.offsetHeight - t - b) + $j.types.CSSUnits.PX;
                    child.applyTransforms();
                    t = parseFloat(s.marginTop) + child._HTMLElement.offsetHeight + parseFloat(s.marginBottom);
                },
                alignBottom = function (child) {
                    var s = getComputedStyle(child._HTMLElement);
                    child._HTMLElementStyle.bottom = (b > 0 ? b + $j.types.CSSUnits.PX : "0");
                    child._HTMLElementStyle.left = (l > 0 ? l + $j.types.CSSUnits.PX : "0");
                    child._HTMLElementStyle.right = (r > 0 ? r + $j.types.CSSUnits.PX : "0");
                    child._HTMLElementStyle.width = "auto";
                    child._HTMLElementStyle.top = "auto";
                    if (child._HTMLElementStyle.height === "auto") child._HTMLElementStyle.height = (child._owner._HTMLElement.offsetHeight - t - b) + $j.types.CSSUnits.PX;
                    child.applyTransforms();
                    b = parseFloat(s.marginTop) + child._HTMLElement.offsetHeight + parseFloat(s.marginBottom);
                }
            alignLeft = function (child) {
                var s = getComputedStyle(child._HTMLElement);
                s = getComputedStyle(child._HTMLElement);
                child._HTMLElementStyle.top = (t > 0 ? t + $j.types.CSSUnits.PX : "0");
                child._HTMLElementStyle.left = (l > 0 ? l + $j.types.CSSUnits.PX : "0");
                child._HTMLElementStyle.right = "auto";
                child._HTMLElementStyle.bottom = (b > 0 ? b + $j.types.CSSUnits.PX : "0");
                child._HTMLElementStyle.height = "auto";
                if (child._HTMLElementStyle.width === "auto") child._HTMLElementStyle.width = (child._owner._HTMLElement.offsetWidth - l - r) + $j.types.CSSUnits.PX;
                child.applyTransforms();
                l = parseFloat(s.marginLeft) + child._HTMLElement.offsetWidth + parseFloat(s.marginRight);
            }
            alignRight = function (child) {
                var s = getComputedStyle(child._HTMLElement);
                s = getComputedStyle(child._HTMLElement);
                child._HTMLElementStyle.top = (t > 0 ? t + $j.types.CSSUnits.PX : "0");
                child._HTMLElementStyle.left = "auto";
                child._HTMLElementStyle.right = (r > 0 ? r + $j.types.CSSUnits.PX : "0");
                child._HTMLElementStyle.bottom = (b > 0 ? b + $j.types.CSSUnits.PX : "0");
                child._HTMLElementStyle.height = "auto";
                if (child._HTMLElementStyle.width === "auto") child._HTMLElementStyle.width = (child._owner._HTMLElement.offsetWidth - l - r) + $j.types.CSSUnits.PX;
                child.applyTransforms();
                r = parseFloat(s.marginLeft) + child._HTMLElement.offsetWidth + parseFloat(s.marginRight);
            }
                ;
            //#region mostTop
            childs = this._components.filter(function (e, i, a) {
                return (e.align === $j.types.aligns.MOSTTOP) && e.visible;
            });
            for (i = 0, c = childs.length; i < c; i++) alignTop(childs[i]);
            //#endregion
            //#region mostBottom
            childs = this._components.filter(function (e, i, a) {
                return (e.align === $j.types.aligns.MOSTBOTTOM) && e.visible;
            });
            for (i = 0, c = childs.length; i < c; i++) alignBottom(childs[i]);
            //#endregion
            //#region mostLeft
            childs = this._components.filter(function (e, i, a) {
                return (e.align === $j.types.aligns.MOSTLEFT) && e.visible;
            });
            for (i = 0, c = childs.length; i < c; i++) alignLeft(childs[i]);
            //#endregion
            //#region mostRight
            childs = this._components.filter(function (e, i, a) {
                return (e.align === $j.types.aligns.MOSTRIGHT) && e.visible;
            });
            for (i = 0, c = childs.length; i < c; i++) alignRight(childs[i]);
            //#endregion
            //#region top
            childs = this._components.filter(function (e, i, a) {
                return (e.align === $j.types.aligns.TOP) && e.visible;
            });
            for (i = 0, c = childs.length; i < c; i++) alignTop(childs[i]);
            //#endregion
            //#region bottom
            childs = this._components.filter(function (e, i, a) {
                return (e.align === $j.types.aligns.BOTTOM) && e.visible;
            });
            for (i = 0, c = childs.length; i < c; i++) alignBottom(childs[i]);
            //#endregion
            //#region left
            childs = this._components.filter(function (e, i, a) {
                return (e.align === $j.types.aligns.LEFT) && e.visible;
            });
            for (i = 0, c = childs.length; i < c; i++) alignLeft(childs[i]);
            //#endregion
            //#region right
            childs = this._components.filter(function (e, i, a) {
                return (e.align === $j.types.aligns.RIGHT) && e.visible;
            });
            for (i = 0, c = childs.length; i < c; i++) alignRight(childs[i]);
            //#endregion
            //#region client
            childs = this._components.filter(function (e, i, a) {
                return (e.align === $j.types.aligns.CLIENT) && e.visible;
            });
            for (i = 0, c = childs.length; i < c; i++) {
                _child = childs[i];
                _s = getComputedStyle(_child._HTMLElement);
                _child._HTMLElementStyle.top = (t > 0 ? t + $j.types.CSSUnits.PX : "0");
                _child._HTMLElementStyle.left = (l > 0 ? l + $j.types.CSSUnits.PX : "0")
                _child._HTMLElementStyle.right = (r > 0 ? r + $j.types.CSSUnits.PX : "0");
                _child._HTMLElementStyle.bottom = (b > 0 ? b + $j.types.CSSUnits.PX : "0");
                _child._HTMLElementStyle.height = "auto";
                _child._HTMLElementStyle.width = "auto";
                _child.applyTransforms();
            }
            //#endregion
            //#region horizontal
            childs = this._components.filter(function (e, i, a) {
                return (e.align === $j.types.aligns.HORIZONTAL) && e.visible;
            });
            for (i = 0, c = childs.length; i < c; i++) {
                _child = childs[i];
                _s = getComputedStyle(_child._HTMLElement);
                _child._HTMLElementStyle.left = (l > 0 ? l + $j.types.CSSUnits.PX : "0")
                _child._HTMLElementStyle.right = (r > 0 ? r + $j.types.CSSUnits.PX : "0");
                _child._HTMLElementStyle.width = "auto";
                _child.applyTransforms();
            }
            //#endregion
            //#region vertical
            childs = this._components.filter(function (e, i, a) {
                return (e.align === $j.types.aligns.VERTICAL) && e.visible;
            });
            for (i = 0, c = childs.length; i < c; i++) {
                _child = childs[i];
                _s = getComputedStyle(_child._HTMLElement);
                _child._HTMLElementStyle.top = (l > 0 ? l + $j.types.CSSUnits.PX : "0")
                _child._HTMLElementStyle.bottom = (b > 0 ? b + $j.types.CSSUnits.PX : "0");
                _child._HTMLElementStyle.height = "auto";
                _child.applyTransforms();
            }
            //#endregion
            //#region contents
            childs = this._components.filter(function (e, i, a) {
                return (e.align === $j.types.aligns.CONTENTS) && e.visible;
            });
            for (i = 0, c = childs.length; i < c; i++) {
                _child = childs[i];
                _s = getComputedStyle(_child._HTMLElement);
                _child._HTMLElementStyle.top = "0";
                _child._HTMLElementStyle.left = "0";
                _child._HTMLElementStyle.bottom = "0";
                _child._HTMLElementStyle.right = "0";
                _child._HTMLElementStyle.height = "auto";
                _child._HTMLElementStyle.width = "auto";
                _child.applyTransforms();
            }
            //#endregion
            //#region center
            childs = this._components.filter(function (e, i, a) {
                return (e.align === $j.types.aligns.CENTER) && e.visible;
            });
            for (i = 0, c = childs.length; i < c; i++) {
                _child = childs[i];
                _s = getComputedStyle(_child._HTMLElement);
                _child._HTMLElementStyle.top = "50%";
                _child._HTMLElementStyle.left = "50%";
                _child._HTMLElementStyle.bottom = "auto";
                _child._HTMLElementStyle.right = "auto";
                _child.applyTransforms("translate(-50%,-50%)");
                //_child._HTMLElementStyle.transform=;
            }
            //#endregion
            //#region horzCenter
            childs = this._components.filter(function (e, i, a) {
                return (e.align === $j.types.aligns.HORZCENTER) && e.visible;
            });
            for (i = 0, c = childs.length; i < c; i++) {
                _child = childs[i];
                _s = getComputedStyle(_child._HTMLElement);
                _child._HTMLElementStyle.top = (l > 0 ? l + $j.types.CSSUnits.PX : "0")
                _child._HTMLElementStyle.bottom = (b > 0 ? b + $j.types.CSSUnits.PX : "0");
                _child._HTMLElementStyle.left = "50%";
                _child._HTMLElementStyle.height = "auto";
                _child.applyTransforms("translateX(-50%)");
            }
            //#endregion
            //#region vertCenter
            childs = this._components.filter(function (e, i, a) {
                return (e.align === $j.types.aligns.VERTCENTER) && e.visible;
            });
            for (i = 0, c = childs.length; i < c; i++) {
                _child = childs[i];
                _s = getComputedStyle(_child._HTMLElement);
                _child._HTMLElementStyle.left = (l > 0 ? l + $j.types.CSSUnits.PX : "0")
                _child._HTMLElementStyle.right = (b > 0 ? b + $j.types.CSSUnits.PX : "0");
                _child._HTMLElementStyle.top = "50%";
                _child._HTMLElementStyle.width = "auto";
                _child.applyTransforms("translateY(-50%)");
            }
            //#endregion
            //#region topRight
            //childs=this._components.filter(function(e,i,a) {
            //  return (e.align===$j.types.aligns.TOPRIGHT)&&e.visible;
            //});
            //#endregion
            //#region bottomLeft
            //childs=this._components.filter(function(e,i,a) {
            //  return (e.align===$j.types.aligns.BOTTOMLEFT)&&e.visible;
            //});
            //#endregion
            //#region bottomRight
            //childs=this._components.filter(function(e,i,a) {
            //  return (e.align===$j.types.aligns.BOTTOMRIGHT)&&e.visible;
            //});
            //#endregion
        },
        insertTemplate: function (tpl) {
            var div;
            if (!this._allowUpdate) this._wrapper += tpl;
            else if (this._HTMLElement) {
                div = $j.doc.createElement($j.types.HTMLElements.DIV);
                div.innerHTML = tpl;
                this._HTMLElement.appendChild(div.firstElementChild);
                div = null;
            }
        },
        setFocus: function () {
            if (!this.canFocused || !this.visible || !this.isEnabled()) return;
            this.enterFocus();
        },
        localRect: function () {
            return new $j.classes.Rect(this.padding.left, this.padding.top, this.padding.right, this.padding.bottom);
        },
        beginUpdate: function () {
            this._allowUpdate = false;
            this._wrapper = this._HTMLElement.innerHTML;
        },
        endUpdate: function () {
            this._allowUpdate = true;
            //this.update();
            //if (this.owner._allowUpdate&&$j.renderer!==$j.types.renderers.HTML) this.redraw(this.lastRect);
            //this._HTMLElement.innerHTML = this._wrapper;
            //for (var i=0,l=this.wrapperClass.length;i<l;i++) {
            //  var id=this.wrapperClass[i].id,Class=this.wrapperClass[i].Class;
            //  $j.tools.execFunc($j.classes.createComponent",{Class:Class,owner:this,id:id});
            //}
            //this._wrapper = String.EMPTY;
            //this.wrapperClass.clear();
        },
        bringToFront: function Control_bringToFront() {
            var parentNode;
            if (!this._HTMLElement) return;
            if (this._owner) {
                parentNode = this._HTMLElement.parentNode;
                if (parentNode.children.length > 1) {
                    this._owner._components.remove(this);
                    this._owner._components.add(this);
                    parentNode = this._HTMLElement.parentNode;
                    parentNode.removeChild(this._HTMLElement);
                    parentNode.appendChild(this._HTMLElement);
                }
            }
        },
        sendToBack: function () {
            var parentNode;
            if (!this._HTMLElement) return;
            if (this._owner) {
                parentNode = this._HTMLElement.parentNode;
                if (parentNode.children.length > 1) {
                    this._owner._components.remove(this);
                    this._owner._components.insert(0, this);
                    parentNode = this._HTMLElement.parentNode;
                    parentNode.removeChild(this._HTMLElement);
                    parentNode.insertBefore(this._HTMLElement, parentNode.firstElementChild);
                }
            }
        },
        forwardOne: function () {
            //+1
            var parentNode, lastIdx, newIdx, arr, lastElement;
            if (!this._HTMLElement) return;
            if (this._owner) {
                parentNode = this._HTMLElement.parentNode;
                if (parentNode.children.length > 1) {
                    arr = Array.prototype.slice.call(parentNode.children);
                    lastIdx = arr.indexOf(this._HTMLElement);
                    if (lastIdx < arr.length - 1) {
                        newIdx = lastIdx + 1;
                        this._owner._components.remove(this);
                        if (newIdx >= this._owner._components.length) this._owner._components.add(this);
                        else this._owner._components.insert(newIdx, this);
                        parentNode = this._HTMLElement.parentNode;
                        parentNode.removeChild(this._HTMLElement);
                        if (lastIdx >= arr.length) lastElement = null;
                        else lastElement = arr[newIdx + 1];
                        if (newIdx >= arr.length) parentNode.appendChild(this._HTMLElement);
                        else parentNode.insertBefore(this._HTMLElement, lastElement);
                    }
                }
            }
        },
        backOne: function () {
            //-1
            var parentNode, lastIdx, newIdx, arr, lastElement;
            if (!this._HTMLElement) return;
            if (this._owner) {
                parentNode = this._HTMLElement.parentNode;
                if (parentNode.children.length > 1) {
                    arr = Array.prototype.slice.call(parentNode.children);
                    lastIdx = arr.indexOf(this._HTMLElement);
                    if (lastIdx < arr.length && lastIdx > 0) {
                        newIdx = lastIdx - 1;
                        this._owner._components.remove(this);
                        if (newIdx < 0) this._owner._components.insert(0, this);
                        else this._owner._components.insert(newIdx, this);
                        parentNode = this._HTMLElement.parentNode;
                        parentNode.removeChild(this._HTMLElement);
                        lastElement = arr[newIdx];
                        parentNode.insertBefore(this._HTMLElement, lastElement);
                    }
                }
            }
        },
        mouseDown: function () {
            var parentCanFocused;
            if (!this.enabled) return;
            if (!(this instanceof $j.classes.Control)) return;
            if (!this.enabled) return;
            if (this.hitTest.mouseDown) {
                if (this.form) {
                    //if (this!==this.form._focusedControl) {
                    //  console.log("hidePopups");
                    if (this._closePopups) {
                        if (this.form.mainMenu) this.form.mainMenu._isActive = false;
                        this.form.closePopups();
                    }
                    //}
                    if (!this.canFocused && this !== this.form._content) {
                        parentCanFocused = this._owner;
                        if (parentCanFocused && (this.form._focusedControl !== parentCanFocused)) parentCanFocused.setFocus();
                    } else if (!this._isFocused && (this.form._focusedControl !== this)) this.setFocus();
                }
                if ($j.mouse.button === $j.types.mouseButtons.RIGHT) {
                    this.contextMenu();
                    return;
                }
                if (this.autoCapture) this.capture();
                this.setIsPressed(true);
                this.onMouseDown.invoke();
            }
        },
        mouseUp: function () {
            var target = $j.mouse.event.target, clicked = false;
            if (!target.jsObj) target = target.parentNode;
            if (!(this instanceof $j.classes.Control)) return;
            //if (this!==target.jsObj) return;
            this.releaseCapture();
            this.onMouseUp.invoke();
            clicked = this._isPressed && !this.doubleClick;
            this.setIsPressed(false);
            this.doubleClick = false;
            if (clicked) this.click();
        },
        mouseWheel: function () {
            if (!(this instanceof $j.classes.Control)) return;
            //if (this.scrollContainer!==null) this.scrollContainer.mouseWheel.apply(this.scrollContainer,arguments);
            //else {
            //  if (this.wheelTimer===null) {
            //    this.onMouseWheelStart.invoke();
            //  } else clearTimeout(this.wheelTimer);
            //  this.onMouseWheel.invoke(arguments);
            //}
            if (!this.hitTest.mouseWheel) this._owner.mouseWheel();
        },
        mouseMove: function () {
            if (this instanceof $j.classes.Control) this.onMouseMove.invoke();
        },
        mouseEnter: function () {
            if (!(this instanceof $j.classes.Control)) return;
            /*if (!this._isPressed)*/ this.setIsMouseOver(true);
            //this.applyTriggerEffect(this,'isMouseOver');
            //this.startTriggerAnimation(this,'isMouseOver');
            this.onMouseEnter.invoke();
            if (this.cursor !== $j.types.customCursors.DEFAULT) {
                if ((this.cursor === $j.types.customCursors.WAIT || this.cursor === $j.types.customCursors.PROGRESS) && !$j.browser.ie) {
                    $j.animatedCursor.initAnimation(this._HTMLElement, this.cursor);
                }// else $j.CSS.addClass(this._HTMLElement,this.cursor);
            }
            this.form.app.showToolTip(this, $j.mouse.document, true);
            if (this._isPressed) $j.CSS.addClass(this._HTMLElement, "pressed");
        },
        mouseLeave: function () {
            if (!(this instanceof $j.classes.Control)) return;
            this.setIsMouseOver(false);
            //this.applyTriggerEffect(this,'isMouseOver');
            //this.startTriggerAnimation(this,'isMouseOver');
            this.onMouseLeave.invoke();
            if (this.cursor !== $j.types.customCursors.DEFAULT) {
                if ((this.cursor === $j.types.customCursors.WAIT || this.cursor === $j.types.customCursors.PROGRESS) && !$j.browser.ie) {
                    $j.animatedCursor.stopAnimation();
                }// else $j.CSS.removeClass(this._HTMLElement,this.cursor);
            }
            this.form.app.hideToolTip();
            $j.CSS.removeClass(this._HTMLElement, "pressed");
        },
        enterFocus: function () {
            if (!(this instanceof $j.classes.Control)) return;
            if (!this.canFocused) return;
            if (this.form._focusedControl) {
                if (this.form._focusedControl !== this) this.form._focusedControl.killFocus();
            }
            this.setIsFocused(true);
            this.onEnterFocus.invoke();
        },
        killFocus: function () {
            if (!(this instanceof $j.classes.Control)) return;
            if (!this.canFocused) return;
            this.setIsFocused(false);
            //this.applyTriggerEffect(this,'isFocused');
            //this.startTriggerAnimation(this,'isFocused');
            this.onKillFocus.invoke();
        },
        initEvents: function () {
            $j.tools.events.bind(this._HTMLElement, $j.types.mouseEvents.OVER, this.dispatchEvent);
            $j.tools.events.bind(this._HTMLElement, $j.types.mouseEvents.OUT, this.dispatchEvent);
            $j.tools.events.bind(this._HTMLElement, $j.types.mouseEvents.CLICK, this.dispatchEvent);
            $j.tools.events.bind(this._HTMLElement, $j.types.mouseEvents.MOVE, this.dispatchEvent);
            $j.tools.events.bind(this._HTMLElement, $j.types.mouseEvents.DOWN, this.dispatchEvent);
            $j.tools.events.bind(this._HTMLElement, $j.types.mouseEvents.UP, this.dispatchEvent);
            $j.tools.events.bind(this._HTMLElement, $j.types.mouseEvents.WHEEL, this.dispatchEvent);
            $j.tools.events.bind(this._HTMLElement, $j.types.mouseEvents.DBLCLICK, this.dispatchEvent);
            $j.tools.events.bind(this._HTMLElement, $j.types.mouseEvents.DOMSCROLL, this.dispatchEvent);
            $j.tools.events.bind(this._HTMLElement, $j.types.mouseEvents.ENTER, this.dispatchEvent);
            $j.tools.events.bind(this._HTMLElement, $j.types.mouseEvents.DRAG, this.dispatchEvent);
            $j.tools.events.bind(this._HTMLElement, $j.types.mouseEvents.DROP, this.dispatchEvent);
            $j.tools.events.bind(this._HTMLElement, $j.types.mouseEvents.DRAGEND, this.dispatchEvent);
            $j.tools.events.bind(this._HTMLElement, $j.types.mouseEvents.DRAGENTER, this.dispatchEvent);
            $j.tools.events.bind(this._HTMLElement, $j.types.mouseEvents.DRAGEXIT, this.dispatchEvent);
            $j.tools.events.bind(this._HTMLElement, $j.types.mouseEvents.DRAGLEAVE, this.dispatchEvent);
            $j.tools.events.bind(this._HTMLElement, $j.types.mouseEvents.DRAGOVER, this.dispatchEvent);
            $j.tools.events.bind(this._HTMLElement, $j.types.mouseEvents.DRAGSTART, this.dispatchEvent);
        },
        resetEvent: function () {
            $j.tools.events.unBind(this._HTMLElement, $j.types.mouseEvents.OVER, this.dispatchEvent);
            $j.tools.events.unBind(this._HTMLElement, $j.types.mouseEvents.OUT, this.dispatchEvent);
            $j.tools.events.unBind(this._HTMLElement, $j.types.mouseEvents.CLICK, this.dispatchEvent);
            $j.tools.events.unBind(this._HTMLElement, $j.types.mouseEvents.MOVE, this.dispatchEvent);
            $j.tools.events.unBind(this._HTMLElement, $j.types.mouseEvents.DOWN, this.dispatchEvent);
            $j.tools.events.unBind(this._HTMLElement, $j.types.mouseEvents.UP, this.dispatchEvent);
            $j.tools.events.unBind(this._HTMLElement, $j.types.mouseEvents.WHEEL, this.dispatchEvent);
            $j.tools.events.unBind(this._HTMLElement, $j.types.mouseEvents.DBLCLICK, this.dispatchEvent);
            $j.tools.events.unBind(this._HTMLElement, $j.types.mouseEvents.DOMSCROLL, this.dispatchEvent);
            $j.tools.events.unBind(this._HTMLElement, $j.types.mouseEvents.ENTER, this.dispatchEvent);
            $j.tools.events.unBind(this._HTMLElement, $j.types.mouseEvents.DRAG, this.dispatchEvent);
            $j.tools.events.unBind(this._HTMLElement, $j.types.mouseEvents.DROP, this.dispatchEvent);
            $j.tools.events.unBind(this._HTMLElement, $j.types.mouseEvents.DRAGEND, this.dispatchEvent);
            $j.tools.events.unBind(this._HTMLElement, $j.types.mouseEvents.DRAGENTER, this.dispatchEvent);
            $j.tools.events.unBind(this._HTMLElement, $j.types.mouseEvents.DRAGEXIT, this.dispatchEvent);
            $j.tools.events.unBind(this._HTMLElement, $j.types.mouseEvents.DRAGLEAVE, this.dispatchEvent);
            $j.tools.events.unBind(this._HTMLElement, $j.types.mouseEvents.DRAGOVER, this.dispatchEvent);
            $j.tools.events.unBind(this._HTMLElement, $j.types.mouseEvents.DRAGSTART, this.dispatchEvent);
        },
        dispatchEvent: function (event) {
            var htmlObj = event.target, jsObj = htmlObj.jsObj, activeWin, forceStopEvent = false;
            while (!jsObj) {
                htmlObj = htmlObj.parentNode;
                if (htmlObj !== null) jsObj = htmlObj.jsObj;
                else break;
            }
            if (!jsObj) return;
            if (jsObj.form._destroying) return;
            if (!jsObj.isEnabled() && (event.type !== $j.types.mouseEvents.WHEEL) && (event.type !== $j.types.mouseEvents.DOMSCROLL) && (event.type !== $j.types.mouseEvents.MOVE)) return;
            activeWin = jsObj.form.app.activeWindow;
            $j.keyboard.getKeyboardInfos(event);
            $j.mouse.getMouseInfos(event);
            switch (event.type) {
                case $j.types.mouseEvents.MOVE:
                    if (activeWin._capturedControl) {
                        if (activeWin._capturedControl.mouseMove) activeWin._capturedControl.mouseMove();
                    } else if (typeof jsObj.mouseMove === _const.FUNCTION) jsObj.mouseMove();
                    break;
                case $j.types.mouseEvents.DOWN:
                    if (activeWin !== jsObj.form) {
                        if (activeWin.mainMenu) activeWin.mainMenu._isActive = false;
                        //activeWin.closePopups();
                        activeWin.app.closeAllPopups();
                    }
                    jsObj.form.app.activeWindow = jsObj.form;
                    activeWin = jsObj.form;
                    if (jsObj.autoCapture) activeWin.setCapturedControl(jsObj);
                    if (activeWin !== jsObj.form.app.mainWindow) {
                        if (jsObj.form.app.mainWindow.mainMenu) jsObj.form.app.mainWindow.mainMenu._isActive = false;
                        jsObj.form.app.mainWindow.closePopups();
                        //jsObj.form.app.closeAllPopups();
                    }
                    if (typeof jsObj.mouseDown === _const.FUNCTION) jsObj.mouseDown();
                    if (activeWin._focusedControl instanceof $j.classes.CustomTextControl) activeWin._focusedControl._inputObj.focus();
                    break;
                case $j.types.mouseEvents.UP:
                case $j.types.mouseEvents.CLICK:
                    if (activeWin._capturedControl) {
                        if (activeWin._capturedControl.mouseUp) activeWin._capturedControl.mouseUp();
                        if (activeWin) activeWin.setCapturedControl(null);
                    } else if (typeof jsObj.mouseUp === _const.FUNCTION) jsObj.mouseUp();
                    break;
                case $j.types.mouseEvents.WHEEL:
                case $j.types.mouseEvents.DOMSCROLL:
                    if (activeWin._popups.length > 0 && !jsObj._forceMouseWheel) return;
                    if (typeof jsObj.mouseWheel === _const.FUNCTION) jsObj.mouseWheel();
                    forceStopEvent = true;
                    event.preventDefault();
                    break;
                case $j.types.mouseEvents.DBLCLICK:
                    if (activeWin._capturedControl) {
                        if (activeWin._capturedControl.mouseUp) activeWin._capturedControl.dblClick();
                    } else if (typeof jsObj.dblClick === _const.FUNCTION) {
                        if (jsObj.dblClick) jsObj.dblClick();
                    }
                    break;
                case $j.types.mouseEvents.OUT:
                case $j.types.mouseEvents.LEAVE:
                    if (typeof jsObj.mouseLeave === _const.FUNCTION) jsObj.mouseLeave();
                    break;
                case $j.types.mouseEvents.OVER:
                case $j.types.mouseEvents.ENTER:
                    if (typeof jsObj.mouseEnter === _const.FUNCTION) jsObj.mouseEnter();
                    break;
                case $j.types.mouseEvents.DRAG:
                    if (jsObj.dragMode !== $j.types.dragModes.AUTOMATIC)
                        if (typeof jsObj.drag === _const.FUNCTION) jsObj.drag();
                    break;
                case $j.types.mouseEvents.DROP:
                    if (jsObj.dragKind === $j.types.dragKinds.DOCK) {
                        if (jsObj.dragMode === $j.types.dragModes.AUTOMATIC) {
                            event.preventDefault();
                            event.target.appendChild($j.doc.getElementById(event.dataTransfer.getData("text")));
                        } else if (typeof jsObj.drop === _const.FUNCTION) jsObj.drop();
                    }
                    break;
                case $j.types.mouseEvents.DRAGEND:
                    if (jsObj.dragMode !== $j.types.dragModes.AUTOMATIC)
                        if (typeof jsObj.dragEnd === _const.FUNCTION) jsObj.dragEnd();
                    break;
                case $j.types.mouseEvents.DRAGENTER:
                    if (jsObj.dragMode !== $j.types.dragModes.AUTOMATIC)
                        if (typeof jsObj.dragEnter === _const.FUNCTION) jsObj.dragEnter();
                    break;
                case $j.types.mouseEvents.DRAGEXIT:
                    if (jsObj.dragMode !== $j.types.dragModes.AUTOMATIC)
                        if (typeof jsObj.dragExit === _const.FUNCTION) jsObj.dragExit();
                    break;
                case $j.types.mouseEvents.DRAGLEAVE:
                    if (jsObj.dragMode !== $j.types.dragModes.AUTOMATIC)
                        if (typeof jsObj.dragLeave === _const.FUNCTION) jsObj.dragLeave();
                    break;
                case $j.types.mouseEvents.DRAGOVER:
                    if (jsObj.dragKind === $j.types.dragKinds.DOCK) {
                        if (jsObj.dragMode === $j.types.dragModes.AUTOMATIC) event.preventDefault();
                        else if (typeof jsObj.dragOver === _const.FUNCTION) jsObj.dragOver();
                    }
                    break;
                case $j.types.mouseEvents.DRAGSTART:
                    if (jsObj.dragMode === $j.types.dragModes.AUTOMATIC) event.dataTransfer.setData("text", htmlObj.id);
                    else if (typeof jsObj.dragStart === _const.FUNCTION) jsObj.dragStart();
                    break;
                //case $j.types.mouseEvents.CLICK:
                //  //jsObj.click();
                //  break;
                //case $j.types.mouseEvents.EVENT:
                //  break;
                //case $j.types.keybordEvents.DOWN:
                //  if (typeof jsObj.keyDown===_const.FUNCTION) jsObj.keyDown();
                //  break;
                //case $j.types.keybordEvents.UP:
                //  if (typeof jsObj.keyUp===_const.FUNCTION) jsObj.keyUp();
                //  break;
                //case $j.types.keybordEvents.PRESS:
                //  if (typeof jsObj.keyPress===_const.FUNCTION) jsObj.keyPress();
                //  break;
            }
            if (jsObj._stopEvent || forceStopEvent) $j.mouse.stopEvent(event);
            //else event.stopPropagation();
        },
        releaseCapture: function () {
            if (this.form) {
                if (this.form._capturedControl === this) this.form._capturedControl = null;
            }
        },
        capture: function () { if (this.form) this.form.setCapturedControl(this); },
        click: function () {
            if (this.onClick.hasListener()) this.onClick.invoke();
            else if (this.action) this.action.execute();
        },
        dblClick: function () { this.onDblClick.invoke(); },
        keyDown: function () {
            //if($j.keyboard.keyCode===$j.VKeysCode.VK_APP) this.contextMenu();
            //else this.onKeyDown.invoke(new $j.Events.onKeyEventArgs(k,kc,s));
            this.onKeyDown.invoke();
            if ($j.keyboard.keyCode === $j.types.VKeysCodes.VK_SPACE) {
                if (!(this instanceof $j.classes.CustomTextControl)) this.setIsPressed(true);
            }
        },
        keyUp: function () {
            var pt;
            this.onKeyUp.invoke();
            if ($j.keyboard.keyCode === $j.types.VKeysCodes.VK_SPACE || $j.keyboard.keyCode === $j.types.VKeysCodes.VK_RETURN) {
                if (!(this instanceof $j.classes.CustomTextControl)) {
                    this.click();
                    this.setIsPressed(false);
                }
            } else if ($j.keyboard.keyCode === $j.types.VKeysCodes.VK_MENU) {
                if (this.popupMenu) {
                    pt = this.clientToDocument();
                    this.popupMenu.show(pt.x, pt.y);
                } else this.form._content.popupMenu.show(0, 0);
            }
        },
        keyPress: function () {
            this.onKeyPress.invoke();
        },
        drag: function (event) {
            if (this.dragKind === $j.types.dragKinds.DRAG && this.dragMode === $j.types.dragModes.MANUAL) this.onDrag.invoke(event);
        },
        drop: function (event) {
            if (this.dragKind === $j.types.dragKinds.DOCK) return;
            if (this.dragMode !== $j.types.dragModes.MANUAL) this.onDrop.invoke(event);
        },
        dragEnter: function (event) {
            if (this.dragKind !== $j.types.dragKinds.DOCK) return;
            if (this.dragMode === $j.types.dragModes.MANUAL) this.onDragEnter.invoke(event);
        },
        dragStart: function (event) {
            if (this.dragKind === $j.types.dragKinds.DRAG && this.dragMode === $j.types.dragModes.MANUAL) this.onDragStart.invoke(event);
        },
        dragLeave: function () {
            if (this.dragKind !== $j.types.dragKinds.DOCK) return;
            if (this.dragMode === $j.types.dragModes.MANUAL) this.onDragLeave.invoke(event);
        },
        dragExit: function () {
            if (this.dragKind === $j.types.dragKinds.DRAG && this.dragMode === $j.types.dragModes.MANUAL) this.onDragExit.invoke(event);
        },
        dragOver: function (event) {
            if (this.dragKind !== $j.types.dragKinds.DOCK) return;
            if (this.dragMode === $j.types.dragModes.MANUAL) this.onDragOver.invoke(event);
        },
        dragEnd: function () {
            if (this.dragKind === $j.types.dragKinds.DRAG && this.dragMode === $j.types.dragModes.MANUAL) this.onDragEnd.invoke(event);
        },
        //dialogKey: function Control_dialogKey(key,shift){
        //  if (this._components.length>0){
        //    for(var i=0,l=this._components.length;i<l;i++){
        //      if(this._components[i].visible&&this._components[i].enabled){
        //        this._components[i].dialogKey();
        //        //if Key=0 then Break;
        //      }
        //    }
        //  }
        //},
        contextMenu: function (stayOpen) {
            if (this.popupMenu) {
                var x = $j.mouse.window.x, y = $j.mouse.window.y;
                //this.popup.staysOpen=false;
                this.popupMenu._control = this;
                this.popupMenu.show(x, y);
            }
        },
        updateFromHTML: function () {
            var data;
            this.opacity = parseFloat(getComputedStyle(this._HTMLElement).opacity);
            this.getCSSBorder();
            data = this._HTMLElement.dataset.visible;
            if (data) this.visible = _conv.strToBool(data);
            data = this._HTMLElement.dataset.scale;
            if (data) {
                var sca = data.split(",");
                this.scale.x = parseFloat(sca[0]);
                this.scale.y = parseFloat(sca[1]);
            }
            data = this._HTMLElement.dataset.enabled;
            if (data) this.setEnabled(_conv.strToBool(data));
            data = this._HTMLElement.dataset.rotatecenter;
            if (data) {
                var rc = data.split(",");
                this.rotateCenter.x = parseFloat(rc[0]);
                this.rotateCenter.y = parseFloat(rc[1]);
            }
            data = this._HTMLElement.dataset.tooltip;
            if (data) this.toolTip = data;
            data = this._HTMLElement.dataset.showtooltip;
            if (data) this.showToolTip = _conv.strToBool(data);;
            data = this._HTMLElement.dataset.rotateangle;
            if (data) this.rotateAngle = parseFloat(data);
            data = this._HTMLElement.dataset.margin;
            if (data) {
                var marg = data.split(",");
                this.margin.left = parseFloat(marg[0]);
                this.margin.top = parseFloat(marg[1]);
                this.margin.right = parseFloat(marg[2]);
                this.margin.bottom = parseFloat(marg[3]);
            }
            data = this._HTMLElement.dataset.padding;
            if (data) {
                var pad = data.split(",");
                this.padding.left = parseFloat(pad[0]);
                this.padding.top = parseFloat(pad[1]);
                this.padding.right = parseFloat(pad[2]);
                this.padding.bottom = parseFloat(pad[3]);
            }
            data = this._HTMLElement.dataset.ownershowtooltip;
            if (data) this.ownerShowToolTip = _conv.strToBool(data);
            data = this._HTMLElement.dataset.align;
            if (data) this.align = data;
            data = this._HTMLElement.dataset.hittest;
            if (data) {
                var hitTest = data.split(",");
                for (var i = 0, l = hitTest.length; i < l; i++) {
                    var keyValue = hitTest[i].split(":");
                    if (this.hitTest[keyValue[0]]) this.hitTest[keyValue[0]] = _conv.strToBool(keyValue[1]);
                }
            }
            data = this._HTMLElement.dataset.customstyle;
            if (data) this.customStyle = JSON.parse(data);
            data = this._HTMLElement.dataset.taborder;
            if (data) {
                this.tabOrder = ~~data;
                this._owner._tabList[this.tabOrder] = this;
            }
            data = this._HTMLElement.dataset.canfocused;
            if (data) this.canFocused = _conv.strToBool(data);
            data = this._HTMLElement.dataset.showfocus;
            if (data) this.showFocus = _conv.strToBool(data);
            data = this._HTMLElement.dataset.dragkind;
            if (data) this.dragKind = data;
            data = this._HTMLElement.dataset.dragmode;
            if (data) this.dragMode = data;
            // cursor
            if (this._HTMLElement.className.indexOf("csr_") > 0) {
                var classes = this._HTMLElement.className.split(String.SPACE);
                for (var i = 0, l = classes.length; i < l; i++) {
                    if (classes[i].startsWith("csr_")) {
                        this.cursor = classes[i];
                        break;
                    }
                }
            }
            this.bindEventToHTML("onClick");
            this.bindEventToHTML("onMouseDown");
            this.bindEventToHTML("onMouseMove");
            this.bindEventToHTML("onMouseUp");
            this.bindEventToHTML("onDblClick");
            this.bindEventToHTML("onMouseLeave");
            this.bindEventToHTML("onMouseEnter");
            this.bindEventToHTML("onMouseWheel");
            this.bindEventToHTML("onMouseWheelStart");
            this.bindEventToHTML("onMouseWheelEnd");
            this.bindEventToHTML("onBeforePaint");
            this.bindEventToHTML("onPaint");
            this.bindEventToHTML("onAfterPaint");
            this.bindEventToHTML("onEnterFocus");
            this.bindEventToHTML("onKillFocus");
            this.bindEventToHTML("onKeyDown");
            this.bindEventToHTML("onKeyUp");
            this.bindEventToHTML("onKeyPress");
            this.bindEventToHTML("onDrag");
            this.bindEventToHTML("onDrop");
            this.bindEventToHTML("onDragStart");
            this.bindEventToHTML("onDragEnd");
            this.bindEventToHTML("onDragLeave");
            this.bindEventToHTML("onDragOver");
            this.bindEventToHTML("onDragExit");
            this.bindEventToHTML("onDragEnter");
        },
        getHTMLElement: function (id) {
            if ($j.tools.Debugger.debug) console.log(this._ClassName + " getHTMLElement");
            var t = new Date().getTime();
            if (id === String.EMPTY) return;
            this._inherited(id);
            this.initEvents();
            //if (this.animations.length>0) {
            //  for (var i=0,l=this.animations.length;i<l;i++) {
            //    if(this.animations[i].enabled&&!this.animations[i].running&&this.animations[i].autoStart) this.animations[i].start();
            //  }
            //}
            //this.updateFromHTML();
            $j.tools.Debugger.log(arguments, this, t);
        },
        getChildsHTMLElement: function (htmlObj, owner) {
            var nodes = (htmlObj) ? htmlObj.childNodes : this._HTMLElement.childNodes, obj, dataClass, dataName;
            for (var i = 0, l = nodes.length; i < l; i++) {
                if (!nodes[i]) continue;
                if (nodes[i].nodeType === $j.types.xmlNodeTypes.ELEMENT_NODE) {
                    dataClass = nodes[i].dataset.class;
                    dataName = nodes[i].dataset.name;
                    if (dataClass) {
                        if (!owner) owner = this;
                        if ($j.classes[dataClass] !== null) obj = $j.classes.createComponent($j.classes[dataClass], owner, dataName, null, false, nodes[i].id);
                    }
                }
            }
        },
        clientOrigin: function () {
            var result = new $j.classes.Point(), border;
            for (i = 0, l = this._owners.length; i < l; i++) {
                border = getComputedStyle(this._owners[i]._HTMLElement);
                result.x += this._owners[i]._HTMLElement.offsetLeft + parseInt(border.borderLeftWidth, 10);
                result.y += this._owners[i]._HTMLElement.offsetTop + parseInt(border.borderTopWidth, 10);
            }
            result.x += this._HTMLElement.offsetLeft;
            result.y += this._HTMLElement.offsetTop;
            if ($j.tools.HTMLParentElement) {
                result.x += $j.tools.HTMLParentElement.offsetLeft;
                result.y = $j.tools.HTMLParentElement.offsetTop;
            }
            return result;
        },
        //boundingClientRect:function() {
        //  return this._boundingClientRect;
        //},
        documentToClient: function (pt) {
            var origin = this.clientOrigin(), result = new $j.classes.Point;
            if (!pt) pt = $j.mouse.document;
            result.x = pt.x - origin.x;
            result.y = pt.y - origin.y;
            if (result.x < 0) result.x = 0;
            if (result.y < 0) result.y = 0;
            if (result.x > this.width) result.x = this.width;
            if (result.y > this.height) result.y = this.height;
            return result;
        },
        isEnabled: function () {
            var enabled = this.enabled;
            if (enabled) {
                for (var i = this._owners.length - 1; i >= 0; i--) {
                    enabled = enabled && this._owners[i].enabled;
                }
            }
            return enabled;
        },
        loaded: function () {
            this._inherited();
            if (this.align.startsWith("fit") || this.align === $j.types.aligns.SCALE) $j.tools.addResizeListener(this._owner);
            if (this._owner._tab) this._tab = this._owner._tab;
        },
        resized: function () {
            var childs, i, l;
            if (!this._resizeDatas.width || !this._resizeDatas.height) {
                this._resizeDatas.width = this._HTMLElement.offsetWidth;
                this._resizeDatas.height = this._HTMLElement.offsetHeight;
            }
            if (this._resizeDatas.width !== this._HTMLElement.offsetWidth || this._resizeDatas.height !== this._HTMLElement.offsetHeight) {
                childs = this._components.filter(
                    function (e, i, a) {
                        return (e.align === $j.types.aligns.SCALE || e.align === $j.types.aligns.FIT) && e.visible;
                    }
                );
                for (i = 0, l = childs.length; i < l; i++) {
                    if (childs[i].align === $j.types.aligns.SCALE) childs[i].scaleFromParent();
                    else childs[i].fitToParent();
                }
                this._resizeDatas.width = this._HTMLElement.offsetWidth;
                this._resizeDatas.height = this._HTMLElement.offsetHeight;
                this.onAfterResized.invoke(this);
            }
        },
        scaleFromParent: function () {
            var p = getComputedStyle(this._HTMLElement);
            if ((this._owner._resizeDatas.width > 0) && (this._owner._resizeDatas.height > 0) && (this._owner._HTMLElement.offsetWidth > 0) && (this._owner._HTMLElement.offsetHeight > 0)) {
                this._HTMLElementStyle.left = (parseFloat(p.left) * (this._owner._HTMLElement.offsetWidth / this._owner._resizeDatas.width)) + $j.types.CSSUnits.PX;
                this._HTMLElementStyle.top = (parseFloat(p.top) * (this._owner._HTMLElement.offsetHeight / this._owner._resizeDatas.height)) + $j.types.CSSUnits.PX;
                this._HTMLElementStyle.width = (parseFloat(p.width) * (this._owner._HTMLElement.offsetWidth / this._owner._resizeDatas.width)) + $j.types.CSSUnits.PX;
                this._HTMLElementStyle.height = (parseFloat(p.height) * (this._owner._HTMLElement.offsetHeight / this._owner._resizeDatas.height)) + $j.types.CSSUnits.PX;
            }
        },
        fitToParent: function () {
            var mR, cR, fitScale, newLeft, newTop, newWidth, newHeight, pP, p = getComputedStyle(this._HTMLElement);;
            pP = getComputedStyle(this._owner._HTMLElement);
            mR = new $j.classes.Rect(parseInt(pP.paddingLeft, 10), parseInt(pP.paddingTop, 10),
                this._owner._HTMLElement.offsetWidth - parseInt(pP.paddingRight, 10),
                this._owner._HTMLElement.offsetHeight - parseInt(pP.paddingBottom, 10));
            cR = new $j.classes.Rect(parseFloat(p.left) - parseInt(p.paddingLeft, 10),
                parseFloat(p.top) - parseInt(p.paddingTop, 10),
                parseFloat(p.left) + parseFloat(p.width) + parseInt(p.paddingRight, 10),
                parseFloat(p.top) + parseFloat(p.height) + parseInt(p.paddingBottom, 10));
            fitScale = cR.fit(mR);
            if (fitScale.ratio < 1) {
                cR.left = cR.left / fitScale.ratio;
                cR.right = cR.right / fitScale.ratio;
                cR.top = cR.top / fitScale.ratio;
                cR.bottom = cR.bottom / fitScale.ratio;
                cR.center(mR);
                if (this.align === $j.types.aligns.fitLeft) cR.offset(mR.left - cR.left, 0);
                if (this.align === $j.types.aligns.fitRight) cR.offset(mR.right - cR.right, 0);
                newLeft = cR.left;
                newTop = cR.top;
                newWidth = cR.right - cR.left;
                newHeight = cR.bottom - cR.top;
            } else {
                if (this.align === $j.types.aligns.fitLeft) cR.offset(mR.left - cR.left, 0);
                if (this.align === $j.types.fitRight) cR.offset(mR.right - cR.right, 0);
                newLeft = fitScale.rect.left;
                newTop = fitScale.rect.top;
                newWidth = fitScale.rect.right - fitScale.rect.left;
                newHeight = fitScale.rect.bottom - fitScale.rect.top;
            }
            this._HTMLElementStyle.left = (newLeft + parseInt(p.paddingLeft, 10)) + $j.types.CSSUnits.PX;
            this._HTMLElementStyle.top = (newTop + parseInt(p.paddingTop, 10)) + $j.types.CSSUnits.PX;
            this._HTMLElementStyle.width = (newWidth - parseInt(p.paddingLeft, 10) - parseInt(p.paddingRight, 10)) + $j.types.CSSUnits.PX;
            this._HTMLElementStyle.height = (newHeight - parseInt(p.paddingTop, 10) - parseInt(p.paddingBottom, 10)) + $j.types.CSSUnits.PX;
        },
        applyTransforms: function (transform) {
            var t = [], rad;
            this.resetTransform();
            if (!transform) transform = String.EMPTY;
            //Translation
            //if (transform.contains("translate")) t.push(transform);
            //Rotation
            if (transform.contains("rotate")) t.push(transform);
            else if (this.rotateAngle !== 0) t.push("rotate(" + this.rotateAngle + "deg)");
            //if (this.rotateAngle!==0) {
            //rad=_conv.deg2Rad(this.rotateAngle);
            //t.push(["matrix(",$j.cos(rad),",",$j.sin(rad),",",-$j.sin(rad),",",$j.cos(rad),",0,0)"].join(String.EMPTY));
            //this._HTMLElementStyle.transformOrigin=this.rotateCenter.x+$j.types.CSSUnits.PX+String.SPACE+this.rotateCenter.y+$j.types.CSSUnits.PX+String.SPACE+" 0px";
            //this._HTMLElementStyle.transformOrigin="0px 0px 0px";
            //}
            //Scale
            if (transform.contains("scale")) t.push(transform);
            else if (!this.scale.isEmpty()&&this.scale.x!==1&&this.scale.y!==1) t.push("scale("+this.scale.x+","+this.scale.y+")");
            else if (this.scale.x>0&&this.scale.y===0) t.push("scaleX("+this.scale.x+")");
            else if (this.scale.y>0&&this.scale.x===0) t.push("scaleY("+this.scale.y+")");
            this._HTMLElementStyle.transform = t.join(String.SPACE);
        },
        resetTransform: function () {
            this._HTMLElementStyle.transform = String.EMPTY;
        },
        getTabOrderList: function (list, children) {
            var i, control, l, tabList = this._tabList;
            if (children) children = true;
            if (!list) return;
            if (tabList) {
                l = tabList.length;
                for (i = 0; i < l; i++) {
                    control = tabList[i];
                    if (control.isVisible()) list.push(control);
                    if (children) control.getTabOrderList(list, children);
                }
            }
        },
        destroy: function () {
            if (this._hasResizeEvent) $j.looper.removeListener(this, "resized");
            this.resetEvent();
            this._allowUpdate = null;
            this._autoTranslate = null;
            this._isMouseOver = null;
            this._isFocused = null;
            this._isPressed = null;
            this._closePopups = null;
            //this._tabList.destroy();
            if (this._tabList) this._tabList.clear();
            this._tabList = null;
            this._wrapper = null;
            this._forceMouseWheel = null;
            this._hasResizeEvent = null;
            if (this._resizeDatas) {
                if (this._resizeDatas.width) this._resizeDatas.width = null;
                if (this._resizeDatas.height) this._resizeDatas.height = null;
            }
            this._resizeDatas = null;
            this.ownerShowToolTip = null;
            this.autoCapture = null;
            if (this.padding) this.padding.destroy();
            this.padding = null;
            if (this.margin) this.margin.destroy();
            this.margin = null;
            if (this.onMouseDown) this.onMouseDown.destroy(); this.onMouseDown = null;
            if (this.onMouseMove) this.onMouseMove.destroy(); this.onMouseMove = null;
            if (this.onMouseUp) this.onMouseUp.destroy(); this.onMouseUp = null;
            if (this.onClick) this.onClick.destroy(); this.onClick = null;
            if (this.onDblClick) this.onDblClick.destroy(); this.onDblClick = null;
            if (this.onMouseLeave) this.onMouseLeave.destroy(); this.onMouseLeave = null;
            if (this.onMouseEnter) this.onMouseEnter.destroy(); this.onMouseEnter = null;
            if (this.onMouseWheel) this.onMouseWheel.destroy(); this.onMouseWheel = null;
            if (this.onMouseWheelStart) this.onMouseWheelStart.destroy(); this.onMouseWheelStart = null;
            if (this.onMouseWheelEnd) this.onMouseWheelEnd.destroy(); this.onMouseWheelEnd = null;
            if (this.onBeforePaint) this.onBeforePaint.destroy(); this.onBeforePaint = null;
            if (this.onPaint) this.onPaint.destroy(); this.onPaint = null;
            if (this.onAfterPaint) this.onAfterPaint.destroy(); this.onAfterPaint = null;
            if (this.onEnterFocus) this.onEnterFocus.destroy(); this.onEnterFocus = null;
            if (this.onKillFocus) this.onKillFocus.destroy(); this.onKillFocus = null;
            if (this.onKeyDown) this.onKeyDown.destroy(); this.onKeyDown = null;
            if (this.onKeyUp) this.onKeyUp.destroy(); this.onKeyUp = null;
            if (this.onKeyPress) this.onKeyPress.destroy(); this.onKeyPress = null;
            if (this.onAfterResized) this.onAfterResized.destroy(); this.onAfterResized = null;
            if (this.onDragStart) this.onDragStart.destroy(); this.onDragStart = null;
            if (this.onDrag) this.onDrag.destroy(); this.onDrag = null;
            if (this.onDragExit) this.onDragExit.destroy(); this.onDragExit = null;
            if (this.onDragEnd) this.onDragEnd.destroy(); this.onDragEnd = null;
            if (this.onDragEnter) this.onDragEnter.destroy(); this.onDragEnter = null;
            if (this.onDragOver) this.onDragOver.destroy(); this.onDragOver = null;
            if (this.onDragLeave) this.onDragLeave.destroy(); this.onDragLeave = null;
            if (this.onDrop) this.onDrop.destroy(); this.onDrop = null;
            if (this.onDestroy) this.onDestroy.destroy(); this.onDestroy = null;
            this.popupMenu = null;
            this.opacity = null;
            if (!$j.isHTMLRenderer()) {
                this.width = null;
                this.height = null;
            }
            this.visible = null;
            if (this.scale) this.scale.destroy();
            this.scale = null;
            this.canFocused = null;
            this.enabled = null;
            this.align = null;
            if (this.rotateCenter) this.rotateCenter.destroy();
            this.rotateCenter = null;
            this.cursor = null;
            this.toolTip = null;
            this.showToolTip = null;
            if (this.hitTest) {
                this.hitTest.mouseDown = null;
                this.hitTest.mouseMove = null;
                this.hitTest.mouseUp = null;
                this.hitTest.mouseWheel = null;
                this.hitTest.mouseDblClick = null;
            }
            this.hitTest = null;
            this.rotateAngle = null;
            this.customStyle = null;
            this.cssClasses = null;
            //if (this._boundingClientRect)) this._boundingClientRect.destroy();
            //this._boundingClientRect=null;
            this._inherited();
        },
        addControl: function (control) {
            if (!(control instanceof $j.classes.Control)) return;
            if (control._HTMLElement) control._HTMLElement.remove();
            this.insertComponent(control);
        },
        getChildsControls: function (callback) {
            var i, l, comp;
            for (i = 0, l = this._components.length; i < l; i++) {
                comp = this._components[i];
                if (comp instanceof $j.classes.Component) {
                    if (callback) {
                        if (typeof callback === _const.FUNCTION) callback(comp);
                    }
                    if (comp instanceof $j.classes.Control) comp.getChildsControls(callback);
                }
            }
        },
        getDataSetValue: function (dataName) {
            var value;
            value = this._HTMLElement.dataset[dataName];
            return value;
        },
        setDataSetValue: function (dataName, value) {
            this._HTMLElement.dataset[dataName] = value;
        },
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{cssClasses}");
            html = a.join(this.cssClasses);
            return html;
        },
        getZOrder: function () {
            if (!this._owner) return -1;
            if (!this._HTMLElement) return -1;
            return this._owner._components.indexOf(this);
        }
        //#endregion
    });
    //#endregion
    //#region ThemedControl final
    var ThemedControl = Control.extend("ThemedControl", {
        init: function (owner, props) {
            props = !props ? {} : props;
            var t = new Date().getTime();
            if (owner) {
                this.themeName = String.EMPTY;
                this._inherited(owner, props);
            }
            $j.tools.Debugger.log(arguments, this, t);
        },
        //#region Methods
        getThemeName: function () {
            return (this.themeName !== String.EMPTY) ? this.themeName : this.form.app.themeManifest.themeName;
        },
        setThemeName: function (newValue) {
            var newThemeOk = false, ctrls, j;
            if (typeof newValue !== _const.STRING) return;
            if (this.themeName !== newValue) {
                // on recherche s'il existe un theme
                for (var i = 0, l = document.styleSheets.length; i < l; i++) {
                    if (document.styleSheets[i].href) {
                        if (document.styleSheets[i].href.contains(newValue + ".css")) {
                            newThemeOk = true;
                            break;
                        }
                    }
                }
                if (newThemeOk) {
                    this.themeName = newValue;
                    ctrls = this._HTMLElement.querySelectorAll("[data-theme]");
                    this._HTMLElement.dataset.theme = this.themeName;
                    for (j = 0, l1 = ctrls.length; j < l1; j++) {
                        if (ctrls[j].jsObj) {
                            if (jsObj === this) {
                                ctrls[j].dataset.theme = this.themeName;
                            }
                        }
                    }
                }
            }
        },
        themeAndClassName: function () {
            return this.getThemeName() + "_" + this._ClassName;
        },
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{theme}");
            html = a.join(this.form.getThemeName());
            return html;
        },
        updateFromHTML: function () {
            var data = this._HTMLElement.dataset.theme;
            if (data) this.themeName = data;
            //if (this._HTMLElement.dataset.cssResource!==null) this.cssResource=this._HTMLElement.dataset.cssResource;
            this._inherited();
        },
        changeTheme: function() {
            this.onChangeTheme.invoke();
        },
        destroy: function () {
            this._inherited();
            this.themeName = null;
        }
        //#endregion
    });
    //#endregion
    //#region CaptionControl
    var CaptionControl = ThemedControl.extend("CaptionControl", {
        init: function (owner, props) {
            props = !props ? {} : props;
            var t = new Date().getTime()
            if (owner) {
                //this.horizAlign=$j.types.textAligns.CENTER;
                this.caption = props.caption ? props.caption : this._ClassName;
                this.wordWrap = false;
                this._inherited(owner, props);
                this.addBindableProperties(["caption", "horizAlign", "wordWrap"]);
                $j.tools.addPropertyFromSet(this, "horizAlign", $j.types.textAligns, $j.types.textAligns.CENTER);
                this.autoTranslate = true;
            }
            $j.tools.Debugger.log(arguments, this, t);
        },
        //#region setter
        setHorizAlign: function (newValue) {
            if (!($j.tools.valueInSet(newValue, $j.types.textAligns))) return;
            if (newValue !== this.horizAlign) {
                this.horizAlign = newValue;
                if ((this._loading || this.form._loading) && !$j.tools.Debugger.useFragment) return;
                if (!$j.isHTMLRenderer()) {
                    if (this._allowUpdate) this.update();
                    //this.redraw();
                    this.form.addControlToRedraw(this);
                } else this.update();
            }
        },
        setCaption: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.caption !== newValue) {
                this.caption = $j.tools.text.replace(newValue, _const.HOTKEYPREFIX, String.EMPTY);
                //if ((this._loading||this.form._loading)&&!$j.tools.Debugger.useFragment) return;
                this.update();
            }
        },
        setWordWrap: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.wordWrap !== newValue) {
                this.wordWrap = newValue;
                if ((this._loading || this.form._loading) && !$j.tools.Debugger.useFragment) return;
                if (!$j.isHTMLRenderer()) {
                    if (this._allowUpdate) this.update();
                    this.form.addControlToRedraw(this);
                } else this.update();
            }
        },
        //#endregion
        //#region Methods
        update: function () {
            //var i,l,childs;
            //if ((this._loading||this.form._loading)&&!$j.tools.Debugger.useFragment) return;
            if (!this._HTMLElement) return;
            $j.tools.text.setTextNode(this._HTMLElement, this.caption);
            //childs=this._HTMLElement.childNodes;
            //l=childs.length;
            //while (i<childs.length-1) {
            //  if (childs[i].nodeType===$j.types.xmlNodeTypes.TEXT_NODE) {
            //    childs[i].nodeValue=this.caption;
            //    i=childs.length+1;
            //  }
            //  i++;
            //}
            if (!this.wordWrap) this._HTMLElementStyle.whiteSpace = "nowrap";
            else this._HTMLElementStyle.whiteSpace = String.EMPTY;
        },
        updateFromHTML: function () {
            var data = this._HTMLElement.dataset.horizalign;
            if (data) this.horizAlign = data;
            data = this._HTMLElement.dataset.wordwrap;
            if (data) this.wordWrap = _conv.strToBool(data);
            //this.caption=this._HTMLElement.innerHTML;
            this.app.getLocalText(this);
            this._inherited();
        },
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{caption}");
            html = a.join(this.caption);
            return html;
        },
        destroy: function () {
            this._inherited();
            this.horizAlign = null;
            this.caption = null;
            this.wordWrap = null;
            this.autoTranslate = null;
        }
        //#endregion
    });
    //#endregion
    //#region CustomTextControl
    var CustomTextControl = ThemedControl.extend("CustomTextControl", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                this.addBindableProperties(["text", "readOnly", "placeHolder", "autoTranslate", "horizAlign"]);
                //#region Private
                this._inputObj = null;
                this._hasError = false;
                this._stopEvent = false;
                this._requiredElement = null;
                //#endregion
                this.text = String.EMPTY;
                $j.tools.addPropertyFromSet(this, "horizAlign", $j.types.textAligns, $j.types.textAligns.CENTER);
                this.maxLength = 0;
                this.readOnly = false;
                this.placeHolder = String.EMPTY;
                $j.tools.addPropertyFromSet(this, "type", $j.types.HTMLInputTypes, $j.types.HTMLInputTypes.TEXT);
                this.filterChars = String.EMPTY;
                this.autoTranslate = true;
                this.canFocused = true;
                this.required = false;
                this.errorMsg = String.EMPTY;
                this.onChange = new $j.classes.NotifyEvent(this);
            }
        },
        //#region setter
        setMaxLength: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.maxLength !== newValue) {
                this.maxLength = newValue;
                if ($j.isHTMLRenderer()) this.update();
            }
        },
        setReadOnly: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.readOnly !== newValue) {
                this.readOnly = newValue;
                if ($j.isHTMLRenderer()) this.update();
            }
        },
        setPlaceHolder: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.placeHolder !== newValue) {
                this.placeHolder = newValue;
                if ($j.isHTMLRenderer()) this.update();
            }
        },
        setText: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.text !== newValue) {
                this.text = newValue;
                this._inputObj.value = this.text;
                if ((this._loading || this.form._loading) && !$j.tools.Debugger.useFragment) return;
                if ($j.isHTMLRenderer()) this.update();
            }
        },
        setHorizAlign: function (newValue) {
            if (!($j.tools.valueInSet(newValue, $j.types.textAligns))) return;
            if (newValue !== this.horizAlign) {
                this.horizAlign = newValue;
                if ((this._loading || this.form._loading) && !$j.tools.Debugger.useFragment) return;
                if (!$j.isHTMLRenderer()) {
                    if (this._allowUpdate) this.update();
                    this.form.addControlToRedraw(this);
                } else this.update();
            }
        },
        setEnabled: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.enabled !== newValue) {
                this._inherited(newValue);
                if (this.enabled) this._inputObj.removeAttribute("disabled");
                else this._inputObj.setAttribute("disabled", "disabled");
            }
        },
        setRequired: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.required !== newValue) {
                this.required = newValue;
                this._HTMLElement.dataset.required = this.required;
                this.required ? this._requiredElement.style.display = "block" : this._requiredElement.style.display = "none";
            }
        },
        setHasError: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this._hasError !== newValue) {
                this._hasError = newValue;
                this._HTMLElement.dataset.haserror = this._hasError;
            }
        },
        setErrorMsg: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.errorMsg !== newValue) {
                this.errorMsg = newValue;
            }
        },
        //#endregion
        //#region Methods
        loaded: function () {
            this._inherited();
            //if (this.text===String.EMPTY) this.text=this.name;
        },
        update: function () {
            if ((this._loading || this.form._loading) && !$j.tools.Debugger.useFragment) return;
            if (this._inputObj) {
                this._inputObj.value = this.text;
                if (this.maxLength > 0) this._inputObj.setAttribute("maxlength", this.maxLength);
                this._inputObj.setAttribute("placeholder", this.placeHolder);
                if (this.readOnly) this._inputObj.setAttribute("readonly", String.EMPTY);
                else this._inputObj.removeAttribute("readonly");
            }
        },
        getChildsHTMLElement: function (id) {
            if (this._HTMLElement) {
                this._inputObj = this._HTMLElement.firstElementChild;
                this._inputObj.jsObj = this;
                this.bindEventToHTMLInput();
            }
        },
        updateFromHTML: function () {
            var data = this._HTMLElement.dataset.horizalign;
            if (data) this.horizAlign = data;
            this.maxLength = parseInt(this._HTMLElement.getAttribute("maxlength"), 10) | 0;
            data = this._HTMLElement.dataset.readonly;
            if (data) this.readOnly = _conv.strToBool(data);
            data = this._HTMLElement.dataset.haserror;
            if (data) this.hasError = _conv.strToBool(data);
            this.placeHolder = this._inputObj.getAttribute("placeholder");
            if (!this.placeHolder) this.placeHolder = String.EMPTY;
            data = this._HTMLElement.dataset.filterchars;
            if (data) this.filterChars = data;
            data = this._HTMLElement.dataset.required;
            if (data) this.required = _conv.strToBool(data);;
            data = this._HTMLElement.dataset.errormsg;
            if (data) this.errorMsg = data;
            this.app.getLocalText(this);
            this.bindEventToHTML("onChange");
            //if (this.required) {
            //  this._requiredElement=$j.doc.createElement($j.types.HTMLElements.DIV);
            //  this._requiredElement.dataset.jsonname="required";
            //  this._requiredElement.innerHTML="*";
            //  this._requiredElement.display="none";
            //  this._HTMLElement.appendChild(this._requiredElement);
            //}
            this._inherited();
        },
        textChanged: function () {
            this.jsObj.text = this.value;
            if (!this.jsObj._updating) this.jsObj.onChange.invoke();
        },
        keyPress: function () {
            if (!$j.keyboard.isNavigationKey()) {
                if (this.filterChars.length > 0 && this.filterChars.indexOf($j.keyboard.keyChar) === -1) $j.keyboard.stopEvent();
                //else this.onChange.invoke();
            }
            this.textChanged.apply(this._inputObj);
            this._inherited();
            this.onChange.invoke();
        },
        keyUp: function () {
            this.textChanged.apply(this._inputObj);
            this._HTMLElement.dataset.length = this._inputObj.value.length;
            this._inherited();
            this.onChange.invoke();
        },
        HTMLFocus: function () {
            if (this.jsObj.canFocused) {
                this.jsObj.enterFocus();
            }
        },
        HTMLBlur: function () {
            if (this.jsObj.form._focusedControl === this.jsObj) {
                if (this.jsObj.app.activeWindow === this.jsObj.form) this.focus();
                else this.blur();
            }
        },
        setFocus: function () {
            this._inherited();
            if (this.canFocused) {
                if (this._inputObj) {
                    //this.selectAll();
                    this._inputObj.focus();
                }
            }
        },
        selectAll: function () {
            this._inputObj.setSelectionRange(0, this._inputObj.value.length);
        },
        destroy: function () {
            this._inherited();
            this.unbindEventToHTMLInput();
            this._inputObj = null;
            this._hasError = null;
            this.text = null;
            this.horizAlign = null;
            this.maxLength = null;
            this.readOnly = null;
            this.placeHolder = null;
            this.type = null;
            this.filterChars = null;
            this.autoTranslate = null;
            this.canFocused = null;
            this.required = null;
            this.errorMsg = null;
            this.onChange.destroy(); this.onChange = null;
        },
        getText: function () {
            return this._inputObj.value;
        },
        bindEventToHTMLInput: function () {
            $j.tools.events.bind(this._inputObj, $j.types.HTMLEvents.CHANGE, this.textChanged);
            $j.tools.events.bind(this._inputObj, $j.types.HTMLEvents.FOCUS, this.HTMLFocus);
            $j.tools.events.bind(this._inputObj, $j.types.HTMLEvents.KILLFOCUS, this.HTMLBlur);
            $j.tools.events.bind(this._inputObj, $j.types.keybordEvents.DOWN, this.dispatchEvent);
            $j.tools.events.bind(this._inputObj, $j.types.keybordEvents.UP, this.dispatchEvent);
            $j.tools.events.bind(this._inputObj, $j.types.keybordEvents.PRESS, this.dispatchEvent);
        },
        unbindEventToHTMLInput: function () {
            $j.tools.events.unBind(this._inputObj, $j.types.HTMLEvents.CHANGE, this.textChanged);
            $j.tools.events.unBind(this._inputObj, $j.types.HTMLEvents.FOCUS, this.HTMLFocus);
            $j.tools.events.unBind(this._inputObj, $j.types.HTMLEvents.KILLFOCUS, this.HTMLBlur);
            $j.tools.events.unBind(this._inputObj, $j.types.keybordEvents.DOWN, this.dispatchEvent);
            $j.tools.events.unBind(this._inputObj, $j.types.keybordEvents.UP, this.dispatchEvent);
            $j.tools.events.unBind(this._inputObj, $j.types.keybordEvents.PRESS, this.dispatchEvent);
        }
        //#endregion
    });
    //#endregion
    //#region CustomTextBoxBtn
    var CustomTextBoxBtn = CustomTextControl.extend("CustomTextBoxBtn", {
        init: function (owner, props) {
            var i, btn;
            if (owner) {
                this._inherited(owner, props);
                if (!props) props = {};
                if (!props.btns) props.btns = 1;
                //#region Private
                this._btnClass = props._btnClass ? props._btnClass : $j.classes.Button;
                this._btns = [];
                for (i = 0; i < props.btns; i++) {
                    btn = $j.classes.createComponent(this._btnClass, this, null, { _inForm: false }, false);
                    btn.name = "btn" + i;
                    btn.canFocused = false;
                    this._btns.add(btn);
                }
                //#endregion
            }
        },
        //#region Setter
        //#endregion
        //#region Methods
        getTemplate: function () {
            var html, a, tpl, i;
            html = this._inherited();
            a = html.split("{buttons}");
            if (a.length > 1) {
                for (i = 0; i < this._btns.length; i++) {
                    tpl = this._btns[i].getTemplate();
                    a.insert(a.length - 1, tpl);
                }
            }
            html = a.join(String.EMPTY);
            return html;
        },
        getChildsHTMLElement: function (id) {
            var i, btns;
            this._inherited();
            if (this._HTMLElement) {
                btns = this._HTMLElement.querySelectorAll("button");
                if (btns.length === this._btns.length) {
                    for (i = 0; i < this._btns.length; i++) {
                        this._btns[i].getHTMLElement(btns[i].id);
                        this._btns[i].getChildsHTMLElement();
                        this._btns[i].updateFromHTML();
                        this._btns[i].setCaption(String.EMPTY);
                        $j.CSS.addClass(this._btns[i]._HTMLElement, "TextBoxBtnButton");
                    }
                }
            }
        },
        destroy: function () {
            for (i = 0; i < this._btns.length; i++) {
                this._btns[i].destroy();
                this._btns[i] = null;
            }
            this._btns.clear();
            this._btns = null;
            this._inherited();
        }
        //#endregion
    });
    //#endregion
    //#region GraphicControl final
    var GraphicControl = Control.extend("GraphicControl", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                //$j.classes.DrawingInfo.mixin(this);
                this._inherited(owner, props);
                this.addBindableProperties(["fillColor", "strokeColor", "strokeWidth", "strokeDash", "strokeDashOffset"]);
                this.fillColor = new $j.classes.Color(_colors.WHITE);
                this.strokeColor = new $j.classes.Color(_colors.BLACK);
                this.strokeWidth = 1;
                this.strokeDash = "[]";
                this.strokeDashOffset = 0;
                delete this.tabOrder;
            }
        },
        //#region Setters
        setStrokeWidth: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue < 0) newValue = 0;
            if (this.strokeWidth !== newValue) {
                this.strokeWidth = newValue;
                this.update();
            }
        },
        setFillColor: function (newValue) {
            if (!(newValue instanceof $j.classes.Color)) return;
            if (!this.fillColor.equals(newValue)) {
                this.fillColor.assign(newValue);
                this.update();
            }
        },
        setStrokeColor: function (newValue) {
            if (!(newValue instanceof $j.classes.Color)) return;
            if (!this.strokeColor.equals(newValue)) {
                this.strokeColor.assign(newValue);
                this.update();
            }
        },
        setStrokeDash: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (!this.strokeDash !== newValue) {
                this.strokeDash = newValue;
                this.update();
            }
        },
        setStrokeDashOffset: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.strokeDashOffset !== newValue) {
                this.strokeDashOffset = newValue;
                this.update();
            }
        },
        //#endregion
        //#region Methods
        changed: function () { },
        update: function () {
            var stroke = String.EMPTY;
            if (this._loading) return;
            //if (this.fillColor)) {
            //    if (!this.fillColor.equals(_colors.TRANSPARENT)) this._HTMLElementStyle.backgroundColor = this.fillColor.toARGBString();
            //}
            //if (this.strokeWidth) && this.strokeColor)) {
            //    stroke = this.strokeWidth + $j.types.CSSUnits.PX + String.SPACE + "solid" + String.SPACE;
            //    stroke += this.strokeColor.toARGBString();
            //    this._HTMLElementStyle.border = stroke;
            //}
            this._inherited();
        },
        updateFromHTML: function () {
            var data;
            data = this._HTMLElement.dataset.fillcolor;
            if (data) this.fillColor.assign(_colors.parse(data));
            data = this._HTMLElement.dataset.strokecolor;
            if (data) this.strokeColor.assign(_colors.parse(data));
            data = this._HTMLElement.dataset.strokewidth;
            if (data) this.strokeWidth = ~~data;
            data = this._HTMLElement.dataset.strokedash;
            if (data) this.strokeDash = data;
            data = this._HTMLElement.dataset.strokedashoffset;
            if (data) this.strokeDashOffset = ~~data;
            this._inherited();
        },
        loaded: function () {
            this._inherited();
            this.update();
        },
        destroy: function () {
            this._inherited();
            if (this.fillColor) {
                this.fillColor.destroy();
                this.fillColor = null;
            }
            if (this.strokeColor) {
                this.strokeColor.destroy();
                this.strokeColor = null;
            }
            this.strokeWidth = null;
            //this.shadowColor.destroy(); this.shadowColor=null;
            //this.shadowOffsetX=null;
            //this.shadowOffsetY=null;
            //this.shadowBlur=null;
        }
        //reset: function GraphicControl_reset(){
        //  this.background.clear();
        //  this.color.assign(_colors.TRANSPARENT);
        //  this.font.reset();
        //  this.borderWidth=0;
        //  this.borderColor.assign(_colors.TRANSPARENT);
        //  this.bordersRadius={topLeft:0,topRight:0,bottomLeft:0,bottomRight:0};
        //  this.shadowColor.assign(_colors.TRANSPARENT);
        //  this.shadowOffsetX=0;
        //  this.shadowOffsetY=0;
        //  this.shadowBlur=0;
        //},
        //empty: function GraphicControl_empty(){
        //  var background=(this.background.style===$j.types.brushStyles.NONE)&&(this.background.color.equals(_colors.TRANSPARENT));
        //  var color=this.color.equals(_colors.TRANSPARENT);
        //  var font=(!this.font.underline)&&(!this.font.strikeout)&&(this.font.size===10)&&(this.font.family==="Tahoma")&&(this.font.style===$j.types.fontStyles.NORMAL)&&(this.font.height===0);
        //  var borderWidth=this.borderWidth===0;
        //  var borderColor=this.borderColor.equals(_colors.TRANSPARENT);
        //  var bordersRadius=(this.bordersRadius.topLeft===0)&&(this.bordersRadius.topRight===0)&&(this.bordersRadius.bottomLeft===0)&&(this.bordersRadius.bottomRight===0);
        //  var shadowColor=this.shadowColor.equals(_colors.TRANSPARENT);
        //  var shadowOffsetX=this.shadowOffsetX===0;
        //  var shadowOffsetY=this.shadowOffsetY===0;
        //  var shadowBlur=this.shadowBlur===0;
        //  var shape=this.shape===$j.types.shapes.RECTANGLE;
        //  return background&&color&&font&&borderWidth&&borderColor&&bordersRadius&&shadowColor&&shadowOffsetX&&shadowOffsetY&&shadowBlur&&shape;
        //},
        //assign: function GraphicControl_assign(source) {
        //  this.background.assign(source.background);
        //  this.color.assign(source.color);
        //  this.font.assign(source.font);
        //  this.align=source.align;
        //  this.borderWidth=source.borderWidth;
        //  this.borderColor.assign(source.borderColor);
        //  this.bordersRadius.topLeft=source.bordersRadius.topLeft;
        //  this.bordersRadius.topRight=source.bordersRadius.topRight;
        //  this.bordersRadius.bottomLeft=source.bordersRadius.bottomLeft;
        //  this.bordersRadius.bottomRight=source.bordersRadius.bottomRight;
        //  this.shadowColor.assign(source.shadowColor);
        //  this.shadowOffsetX=source.shadowOffsetX;
        //  this.shadowOffsetY=source.shadowOffsetY;
        //  this.shadowBlur=source.shadowBlur;
        //  this.shape=source.shape;
        //  this.borderDash=source.borderDash;
        //}
        //#endregion
    });
    //#endregion
    //#region SVGGraphicControl
    var SVGGraphicControl = GraphicControl.extend("SVGGraphicControl", {
        init: function (owner, props) {
            props = props || {};
            if (owner) {
                this._inherited(owner, props);
                //#region Privates
                this._svg = null;
                this._svgShape = null;
                //#endregion
            }
        },
        //#region Methods
        getChildsHTMLElement: function () {
            this._svg = this._HTMLElement.firstElementChild;
            this._svgShape = this._svg.firstElementChild;
        },
        update: function () {
            var stroke = String.EMPTY;
            if (this._loading) return;
            if (this.fillColor) this._svgShape.setAttribute("fill", this.fillColor.toARGBString());
            this._svgShape.setAttribute("stroke-width", this.strokeWidth);
            if (this.strokeColor) this._svgShape.setAttribute("stroke", this.strokeColor.toARGBString());
            if (this.strokeDash && this.strokeDash !== String.EMPTY) this._svgShape.setAttribute("stroke-dasharray", JSON.parse(this.strokeDash).join(String.COMMA));
            this._svgShape.setAttribute("stroke-dashoffset", this.strokeDashOffset);
            this._inherited();
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.fill;
            if (data) this.fillColor.assign(_colors.parse(data));
            data = this._HTMLElement.dataset.stroke;
            if (data) this.strokeColor.assign(_colors.parse(data));
            data = this._HTMLElement.dataset.strokewidth;
            if (data) this.strokeWidth = ~~data;
        },
        destroy: function () {
            this._inherited();
            this._svg = null;
            this._svgShape = null;
        }
        //#endregion
    });
    //#endregion
    //#region Layout final
    var Layout = Control.extend("Layout", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                delete this.tabOrder;
            }
        }
        //#region Methods
        //#endregion
    });
    //#endregion
    //#region LabeledControl
    var LabeledControl = ThemedControl.extend("LabeledControl", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                this.label = $j.classes.createComponent($j.classes.Label, this, null, { _inForm: false }, false);
                this.onChange = new $j.classes.NotifyEvent(this);
                this.width = 200;
                this.height = 20;
            }
        },
        //#region Setter
        setCaption: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.label.caption !== newValue) {
                this.label.setCaption(newValue);
            }
        },
        setHeight: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.height !== newValue) {
                this._inherited(newValue);
                if (this.label) {
                    this.label._HTMLElementStyle.lineHeight = this.height + $j.types.CSSUnits.PX;
                }
            }
        },
        //#endregion
        //#region Methods
        destroy: function () {
            this._inherited();
            this.onChange.destroy();
            this.onChange = null;
            this.label = null;
        },
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{label}"), tpl;
            tpl = this.label.getTemplate();
            html = a.join(tpl);
            return html;
        },
        getChildsHTMLElement: function () {
            if (this._HTMLElement) {
                this.label.getHTMLElement(this._HTMLElement.firstElementChild.id);
            }
        },
        update: function () {
            if (this.label) this.label._HTMLElementStyle.lineHeight = this.height + $j.types.CSSUnits.PX;
        }
        //getChildsHTMLElement:function() {
        //  var nextId;
        //  this.label=new $j.classes.Label(this);
        //  this.label.getHTMLElement(this._HTMLElement.firstElementChild.id);
        //  this.label.updateFromHTML();
        //}
        //#endregion
    });
    //#endregion
    //#region PopupBox
    var PopupBox = ThemedControl.extend("PopupBox", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._owners.destroy();
                this._control = null;
                //#endregion
                delete this.tabOrder;
            }
        },
        show: function (x, y) {
            var tpl, container;
            if (!this.form) this.form = this._control.form;
            if (!this.app) this.app = this._control.app;
            if (!this._HTMLElement) {
                tpl = this.getTemplate();
                container = $j.doc.createElement($j.types.HTMLElements.DIV);
                container.innerHTML = tpl;
                $j.doc.body.appendChild(container.firstElementChild);
                this.getHTMLElement(this._internalId);
            }
            if (y + this._HTMLElement.offsetHeight > $j.doc.body.offsetHeight) {
                // for the PopupBox
                if (this instanceof $j.classes.PopupBox) {
                    // _control is MenuItem
                    if (this._control instanceof $j.classes.MenuItem) y = y - this._HTMLElement.offsetHeight + this._control._HTMLElement.offsetHeight;
                    // _control is WindowContent
                    else if (this._control !== this._control.form._content) y -= this._HTMLElement.offsetHeight + this._control._HTMLElement.offsetHeight;
                    // other
                    else y = $j.doc.body.offsetHeight - this._HTMLElement.offsetHeight;
                }
                if (y < 0) y = 0;
            }
            if ($j.mouse.button !== $j.types.mouseButtons.RIGHT) {
                if ((this instanceof $j.classes.PopupMenu)) {
                    if (this._control instanceof $j.classes.MenuItem && !(this._control._owner instanceof $j.classes.MainMenu)) {
                        x += parseInt(getComputedStyle(this._HTMLElement.firstElementChild).paddingLeft, 10);
                        y -= parseInt(getComputedStyle(this._HTMLElement.firstElementChild).paddingTop, 10);
                    }
                }
            }
            if (!$j.isHTMLRenderer()) {
                this.left = x;
                this.top = y;
            } else {
                this._HTMLElementStyle.left = x + $j.types.CSSUnits.PX;
                this._HTMLElementStyle.top = y + $j.types.CSSUnits.PX;
                this._HTMLElementStyle.zIndex = this.zIndex;
            }
            this.form._popups.push(this);
            if (this._control) {
                $j.CSS.addClass(this._control._HTMLElement, "opened");
                if (this._control.onOpenMenu) this._control.onOpenMenu.invoke();
            }
        },
        destroy: function () {
            this._inherited();
            if (this._control) {
                this._control._HTMLElement.dataset.opened = false;
                //$j.CSS.removeClass(this._control._HTMLElement,"opened");
                if (this._control.onCloseMenu) this._control.onCloseMenu.invoke();
            }
            //this._control.destroy();
            //this._control=null;
        }
    });
    //#endregion
    //#region ItemsWheel
    var ItemsWheel = ThemedControl.extend("ItemsWheel", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                this.addBindableProperties(["value"]);
                //#region Private
                this._content = null;
                this._lastDelta = new $j.classes.Point;
                this._downPos = new $j.classes.Point;
                this._currentPos = new $j.classes.Point;
                this._down = false;
                this._scrollAni = null;
                this._sep = null;
                this._topGradient = null;
                this._bottomGradient = null;
                //#endregion
                this.value = String.EMPTY;
                this.setHitTest(true);
                //this.items=[];
                $j.classes.newCollection(this, this, _const.STRING);
                this.onChange = new $j.classes.NotifyEvent(this);
                this.index = -1;
                this.mouseTracking = true;
                this.animated = true;
                //this.tabStop=true;
                this.canFocused = true;
                delete this.tabOrder;
            }
        },
        //#region Setters
        setValue: function (newValue) {
            if (typeof newValue !== typeof this.value) return;
            if (newValue !== this.value) {
                this.value = newValue;
                if (!this._updating) this.onChange.invoke();
            }
        },
        setIndex: function (newValue) {
            var offset = 0, idx;
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue < 0) newValue = 0;
            if (newValue > this.items.length - 1) newValue = this.items.length - 1;
            if (this.index !== newValue) {
                this.index = $j.intCeiling(newValue, 1);
                if (this.index !== -1) {
                    offset = 15 * this.index;
                    this._content.style.top = (-offset) + $j.types.CSSUnits.PX;
                }
                this.setValue(this.items[this.index]);
            }
        },
        //#endregion
        //#region Methods
        recreateItems: function () {
            var i, item, str;
            if (!this._content) return;
            this._content.innerHTML = String.EMPTY;
            for (i = 0; i < this.items.length; i++) {
                item = $j.doc.createElement($j.types.HTMLElements.DIV);
                $j.CSS.addClass(item, this._ClassName + "Item ItemsWheelItem");
                item.dataset.theme = this.form.getThemeName();
                str = this.items[i];
                item.innerHTML = str;
                this._content.appendChild(item);
            }
        },
        updateFromHTML: function () {
            var data = this._HTMLElement.dataset.value;
            if (data) this.value = data;
            this._inherited();
            //this.recreateItems();
        },
        getHTMLElement: function (id) {
            this._inherited(id);
            if (this._HTMLElement) {
                this._topGradient = this._HTMLElement.firstElementChild;
                this._sep = this._HTMLElement.querySelector(".ItemsWheelSep");
                this._content = this._HTMLElement.querySelector(".ItemsWheelContent");
                this._content.jsObj = this;
                this._bottomGradient = this._HTMLElement.lastElementChild;
            }
        },
        mouseWheel: function () {
            var d = $j.mouse.wheelDelta, offsetValue = 0;
            this._inherited();
            if (d < 0) offsetValue = 1;
            else offsetValue = -1;
            this.scrollBy(offsetValue);
        },
        scrollBy: function (offset) {
            var topOffset = 0;
            if (this.index + offset < 0 || this.index + offset > this.items.length - 1) offset = 0;
            if (offset === 0) return;
            if (offset < 0) topOffset = 15 * offset;
            else topOffset = 15 * offset;
            this.setIndex(this.index + offset);
        },
        loaded: function () {
            this._inherited();
            this.recreateItems();
        },
        mouseDown: function () {
            this._inherited();
            if ($j.mouse.button === $j.types.mouseButtons.LEFT && this.mouseTracking) {
                this._lastDelta.setValues(0, 0);
                this._downPos.assign($j.mouse.screen);
                this._currentPos.assign($j.mouse.screen);
                this._down = true;
                if (this._scrollAni && this._scrollAni.running) {
                    this._scrollAni.stopAtCurrent();
                    this.setIndex($j.intCeiling(this.index, 1));
                }
            }
        },
        mouseMove: function () {
            var offset = $j.mouse.screen.y - this._currentPos.y;
            this._inherited();
            if (this._down && this.mouseTracking) {
                this._lastDelta.y = ($j.mouse.screen.y - this._downPos.y);
                if ($j.abs(this._lastDelta.y) < 10 && $j.abs(this._lastDelta.y) > 3) {
                    this.scrollBy(offset > 0 ? -1 : 1);
                    this._downPos.y = $j.mouse.screen.y;
                }
                this._currentPos.assign($j.mouse.screen);
            }
        },
        mouseUp: function () {
            var offset = 0;
            this._inherited();
            offset = $j.mouse.screen.y - this._currentPos.y;
            if (this._down && this.mouseTracking) {
                this._down = false;
                if (this.animated && (this._lastDelta.y !== 0)) {
                    if ($j.abs(this._downPos.y - this._currentPos.y) > 20) {
                        this.createScrollAni();
                        if (this._scrollAni.running) this._scrollAni.stopAtCurrent();
                        this._scrollAni.stopValue = ~~(this.index - (this._lastDelta.y / 2));
                        this._scrollAni.start();
                    }
                }
            }
        },
        createScrollAni: function () {
            if (!this._scrollAni) {
                this._scrollAni = new $j.classes.FloatAnimation(this);
                this._scrollAni.animationType = $j.types.animationTypes.OUT;
                this._scrollAni.interpolation = $j.types.interpolationTypes.QUADRATIC;
                this._scrollAni.duration = 3;
                this._scrollAni.control = this;
                this._scrollAni.propertyName = "index";
                this._scrollAni.startFromCurrent = true;
                this._scrollAni.convertToCSS = false;
                this._scrollAni.initialValue = this.index;
            }
        },
        destroy: function () {
            this._inherited();
            //this._content.jsObj=null;
            this._content = null;
            this._lastDelta.destroy(); this._lastDelta = null;
            this._downPos.destroy(); this._downPos = null;
            this._currentPos.destroy(); this._currentPos = null;
            this._down = null;
            //if (this._scrollAni)) this._scrollAni.destroy();
            //this._scrollAni=null;
            this._sep = null;
            this.value = null;
            this.items.destroy();
            this.items = null;
            this.onChange.destroy();
            this.onChange = null;
            this.index = null;
            this.mouseTracking = null;
            this.animated = null;
        },
        keyDown: function () {
            this._inherited();
            switch ($j.keyboard.keyCode) {
                case $j.types.VKeysCodes.VK_LEFT:
                    break;
                case $j.types.VKeysCodes.VK_UP:
                    this.setIndex(this.index - 1);
                    break;
                case $j.types.VKeysCodes.VK_RIGHT:
                    break;
                case $j.types.VKeysCodes.VK_DOWN:
                    this.setIndex(this.index + 1);
                    break;
                case $j.types.VKeysCodes.VK_HOME:
                    this.setIndex(0);
                    break;
                case $j.types.VKeysCodes.VK_END:
                    this.setIndex(this.items.length - 1);
                    break;
                case $j.types.VKeysCodes.VK_PRIOR:
                    this.setIndex(this.index - 5);
                    break;
                case $j.types.VKeysCodes.VK_NEXT:
                    this.setIndex(this.index + 5);
                    break;
            }
        },
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{name}");
            html = a.join(this.name);
            return html;
        },

        //#endregion
    });
    Object.seal(ItemsWheel);
    //#endregion
    //#region ShortCutIcon
    var ShortCutIcon = Control.extend("ShortCutIcon", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                //#endregion
                delete this.tabOrder;
            }
        }
    });
    Object.seal(ShortCutIcon);
    //#endregion
    //#region ScrollControl
    var ScrollControl = ThemedControl.extend("ScrollControl", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                //#endregion
            }
        }
    });
    Object.seal(ScrollControl);
    //#endregion
    //#region Tab
    var Tab = CaptionControl.extend("Tab", {
        init: function (owner, props) {
            var num = 1;
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                this.addBindableProperties(["showCaption", "imageIndex"]);
                //#region Private
                this._tabControl = owner;
                //#endregion
                if (owner instanceof $j.classes.CustomTabControl) num = owner._tabs.length + 1;
                this.caption = props.caption ? props.caption : this._ClassName + num;
                this.setHitTest(true);
                this.imageIndex = -1;
                this.showCaption = true;
                this.onClose = new $j.classes.NotifyEvent(this);
            }
        },
        //#region Setter
        setImageIndex: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue < -1) newValue = -1;
            if (this._tabControl.images) {
                if (newValue < this._tabControl.images.length) {
                    this.imageIndex = newValue;
                    this.update();
                }
            }
        },
        setEnabled: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.enabled !== newValue) {
                this._inherited(newValue);
            }
        },
        //#endregion
        //#region Methods
        show: function () {
            if (this._tabControl.activeTab === this) return;
            if (this._tabControl.activeTab) this._tabControl.activeTab.hide();
            if (!this.enabled) return;
            this._tabControl.activeTab = this;
            $j.CSS.addClass(this._HTMLElement, "selected");
            // on bouge pour mettre le tab bien visible
            this._tabControl.scrollToTab(this);
            this._tabControl.change();
        },
        hide: function () {
            $j.CSS.removeClass(this._HTMLElement, "selected");
        },
        mouseUp: function () {
            this._inherited();
            if ($j.mouse.button === $j.types.mouseButtons.LEFT) {
                if (this._owner.showTabsCloseBtn) {
                    if ($j.mouse.target.x < this._HTMLElement.offsetWidth - 20) this.show();
                    else this._owner.closeTab(this);
                } else this.show();
            }
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            this.caption = this._HTMLElement.innerHTML;
        },
        update: function () {
            this._inherited();
            if (this.imageIndex > -1) {
            } else {
            }
        },
        destroy: function () {
            this._inherited();
            this._tabControl = null;
            this.imageIndex = null;
            this.showCaption = null;
        }
        //#endregion
    });
    Object.seal(Tab);
    //#endregion
    //#region CustomTabControl
    $j.types.tabStyles = { TABS: "tabs", BUTTONS: "buttons", FLATBUTTONS: "flatButtons" };
    $j.types.tabPositions = { TOP: "top", BOTTOM: "bottom", LEFT: "left", RIGHT: "right" };
    var CustomTabControl = ThemedControl.extend("CustomTabControl", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                this.addBindableProperties(["activeTab", "showTabsCloseBtn", "tabStyle", "tabPosition"]);
                //#region Private
                this._tabContent = $j.classes.createComponent($j.classes.Layout, this, null, { _inForm: false }, false);
                this._tabs = [];
                this._btnLeft = $j.classes.createComponent($j.classes.Button, this, null, { _inForm: false }, false);
                this._btnLeft.tag = $j.types.directions.LEFT;
                this._btnLeft.onClick.addListener(this.moveTabs);
                this._btnLeft.canFocused = false;
                this._btnRight = $j.classes.createComponent($j.classes.Button, this, null, { _inForm: false }, false);
                this._btnRight.tag = $j.types.directions.RIGHT;
                this._btnRight.onClick.addListener(this.moveTabs);
                this._btnRight.canFocused = false;
                this._tabsHeader = null;
                this._tabs_Container = null;
                this._firstVisibleTab = 0;
                this._lastVisibleTab = 0;
                this._tabClass = $j.classes.Tab;
                //#endregion
                if (!$j.isHTMLRenderer()) this.width = this.height = 200;
                this.autoCapture = true;
                this.activeTab = null;
                this.images = null;
                $j.tools.addPropertyFromSet(this, "tabStyle", $j.types.tabStyles, $j.types.tabStyles.TABS);
                $j.tools.addPropertyFromSet(this, "tabPosition", $j.types.tabPositions, $j.types.tabPositions.TOP);
                this.onChange = new $j.classes.NotifyEvent(this);
                this.canChange = true;
                this.canFocused = true;
                this.showTabsCloseBtn = false;
            }
        },
        //#region Setters
        setShowTabsCloseBtn: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.showTabsCloseBtn !== newValue) {
                this.showTabsCloseBtn = newValue;
                if (newValue) $j.CSS.addClass(this._HTMLElement, "showTabsCloseBtn");
                else $j.CSS.removeClass(this._HTMLElement, "showTabsCloseBtn");
            }
        },
        setTabsPosition: function (newValue) {
            if (!$j.tools.valueInSet(newValue, $j.types.tabPositions)) return;
            if (this.tabPosition !== newValue) {
                this.tabPosition = newValue;
                if (this.tabPosition === $j.types.tabPositions.BOTTOM) $j.CSS.addClass(this._HTMLElement, "tabs" + this.tabPosition.capitalise());
                else $j.CSS.removeClass(this._HTMLElement, "tabsBottom");
            }

        },
        //#endregion
        //#region Methods
        changeActiveTab: function (tab) {
            if (tab !== this.activeTab) {
                tab.show();
            }
            //if (this._tabSheets.indexOf(this.activeTab)<=this._firstVisibleTab) this.updateTabs($j.types.directions.LEFT);
            //if (this._tabSheets.indexOf(this.activeTab)>this._lastVisibleTab) this.updateTabs($j.types.directions.RIGHT);
        },
        deleteTab: function (index) {
            if (index < 0 || index > this._tabs.length - 1) return null;
            var tab = this._tabs[index];
            //this._tabContent.removeChild(tab._HTMLPage);
            // supprimer les controles de la page
            this._tab_Container.removeChild(tab._HTMLElement);
            this._tabs.removeAt(index);
            this.checkViewBtns();
        },
        getActiveTabIndex: function () {
            return this._tabs.indexOf(this.activeTab);
        },
        getTab: function (index) {
            if (index < 0 || index > this._tabs.length - 1) return null;
            return this._tabs[index];
        },
        newTab: function (caption) {
            var tab, tpl, a, div = $j.doc.createElement($j.types.HTMLElements.DIV);
            if (!caption) caption = "tab" + (this._tabs.length + 1);
            tab = $j.classes.createComponent($j.classes.Tab, this, caption.firstCharUpper(), { "parentHTML": this._tabs_Container, "caption": caption }, true);
            this._tabs.push(tab);
            //tpl=$j.templates["Page"];
            //a=tpl.split("{theme}");
            //tpl=a.join(this.getThemeName());
            //a=tpl.split("{name}");
            //tpl=a.join(tab.name);
            //div.innerHTML=tpl;
            //tab._HTMLPage=div.firstElementChild;
            //$j.CSS.addClass(tab._HTMLPage,"basecss");
            //this._tabContent._HTMLElement.appendChild(div.firstElementChild);
            this.changeActiveTab(tab);
            this.checkViewBtns();
            this.change();
        },
        /*insertTab:function(tab,index) {
          var tpl,a,div=$j.doc.createElement($j.types.HTMLElements.DIV);
          if (!(tab instanceof $j.classes.TabSheet)) return;
          if (typeof index===_const.NUMBER) {
            if (index<0) index=0;
            else if (index>this._tabSheets.length-1) index=this._tabSheets.length-1;
            this._tabSheets.insert(index,tab);
          } else this._tabSheets.push(tab);
          tab.owner=this;
          tab._pageControl=this;
          if (tab._HTMLPage)) {
            tpl=$j.templates["Page"];
            a=tpl.split("{theme}");
            tpl=a.join(this.getThemeName());
            a=tpl.split("{name}");
            tpl=a.join(tab.name);
            div.innerHTML=tpl;
            this._pageContent.appendChild(div.firstElementChild);
            tab._HTMLPage=this._pageContent.lastElementChild;
          } else this._pageContent.appendChild(tab._HTMLPage);
          this.checkLastVisibleTab();
          this.checkViewBtns();
        },*/
        moveTab: function (fromIndex, toIndex) {
            if (fromIndex < 0 || fromIndex > this._tabs.length - 1) return;
            if (toIndex < 0 || toIndex > this._tabs.length - 1) return;
            var curTab = this.getTab(fromIndex);
            this._tabs.splice(fromIndex, 1);
            this._tabs.splice(toIndex, 0, curTab);
            curTab._HTMLElement.remove();
            toIndex++;
            if (toIndex > this._tabs.length - 1) this._tabs_Container.insertBefore(curTab._HTMLElement, this._tabContent);
            else this._tabs_Container.insertBefore(curTab._HTMLElement, this.getTab(toIndex)._HTMLElement);
            this.change();
        },
        setActiveTabIndex: function (index) {
            if (index < 0 || index > this._tabs.length - 1) return null;
            this._tabs[index].show();
            //if (this._tabSheets.indexOf(this.activeTab)<this._firstVisibleTab) this.updateTabs($j.types.directions.LEFT);
            //if (this._tabSheets.indexOf(this.activeTab)>this._lastVisibleTab) this.updateTabs($j.types.directions.RIGHT);
        },
        findNextTab: function (goForward, checkTabVisible) {
            var startIndex = this.getActiveTabIndex(), i, result = null;
            if (this._tabs.length !== 0) {
                if (startIndex === -1) {
                    if (goForward) startIndex = this._tabs.length - 1
                    else startIndex = 0;
                }
                i = startIndex;
                do {
                    if (goForward) {
                        i++;
                        if (i === this._tabs.length) i = 0;
                    } else {
                        if (i === 0) i = this._tabs.length;
                        i--;
                    }
                    result = this._tabs[i];
                    if (!checkTabVisible || result.visible) return result;
                }
                while (i === startIndex)
            }
            return result;
        },
        selectNextTab: function (goForward, checkTabVisible) {
            var tab = this.findNextTab(goForward, checkTabVisible);
            if (tab && tab !== this.activeTab && this.canChange) {
                this.changeActiveTab(tab);
                this.change();
            }
        },
        change: function () {
            if (!this._updating) this.onChange.invoke();
        },
        getChildsHTMLElement: function (id) {
            var nodes, i, l, tab, data;
            if (this._HTMLElement) {
                this._tabs_Container = this._HTMLElement.querySelector(".TabsContainer");
                nodes = this._tabs_Container.childNodes;
                for (i = 0, l = nodes.length; i < l; i++) {
                    if (nodes[i].nodeType === $j.types.xmlNodeTypes.ELEMENT_NODE) {
                        data = nodes[i].dataset.class;
                        if (data) {
                            obj = new $j.classes[data](this);
                            obj._HTMLElement = nodes[i];
                            obj._HTMLElementStyle = obj._HTMLElement.style;
                            nodes[i].jsObj = obj;
                            data = nodes[i].dataset.name;
                            if (data) obj.setName(data);
                            obj.updateFromHTML();
                            this._tabs.push(obj);
                        }
                    }
                }
                this._tabContent.getHTMLElement(this._HTMLElement.lastElementChild.id)
                this._tabContent.updateFromHTML();
                this._tabContent.getChildsHTMLElement();
                this._btnLeft.getHTMLElement(this._HTMLElement.querySelector(".TabControlLeftBtn").id);
                this._btnLeft.updateFromHTML();
                this._btnLeft.getChildsHTMLElement();
                this._btnRight.getHTMLElement(this._HTMLElement.querySelector(".TabControlRightBtn").id);
                this._btnRight.updateFromHTML();
                this._btnRight.getChildsHTMLElement();
            }
            this.checkViewBtns();
            this.checkLastVisibleTab();
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.activetab;
            if (data) this.activeTab = this.form[data];
            data = this._HTMLElement.dataset.tabsposition;
            if (data) this.setTabsPosition(data);
            data = this._HTMLElement.dataset.showtabsclosebtn;
            if (data) this.setShowTabsCloseBtn(_conv.strToBool(data));
            //if (this.tabPosition!==$j.types.tabPositions.TOP) $j.CSS.addClass(this._HTMLElement,"tabs"+this.tabPosition.capitalise());
        },
        checkViewBtns: function () {
            if (this._tabs_Container.scrollLeft < this._tabs_Container.scrollWidth - this._tabs_Container.offsetWidth) this._btnRight.setEnabled(true);
            else this._btnRight.setEnabled(false);
            if (this._tabs_Container.scrollLeft > 0) this._btnLeft.setEnabled(true);
            else this._btnLeft.setEnabled(false);
            $j.CSS.removeClass(this._HTMLElement, "noButtons");
            if (this._tabs_Container.scrollWidth <= this._tabs_Container.offsetWidth) {
                this._btnLeft.setVisible(false);
                this._btnRight.setVisible(false);
                $j.CSS.addClass(this._HTMLElement, "noButtons");
            } else {
                this._btnLeft.setVisible(true);
                this._btnRight.setVisible(true);
            }
        },
        moveTabs: function () {
            var enabled = true, firstVisibleTabWidth = 0, owner;
            enabled = _conv.strToBool(this._HTMLElement.dataset.enabled);
            if (!enabled) return;
            owner = this._owner;
            this._owner.checkLastVisibleTab();
            firstVisibleTabWidth = owner._tabs[owner._firstVisibleTab]._HTMLElement.offsetWidth;
            switch (this.tag) {
                case $j.types.directions.LEFT:
                    owner._tabs_Container.scrollLeft -= firstVisibleTabWidth;
                    owner._firstVisibleTab--;
                    break;
                case $j.types.directions.RIGHT:
                    owner._tabs_Container.scrollLeft += firstVisibleTabWidth;
                    owner._firstVisibleTab++;

                    break;
            }
            owner.checkViewBtns();
            owner.change();
        },
        scrollToTab: function (tab) {
            var tw, tl, tcw, tcl;
            tw = tab._HTMLElement.offsetWidth;
            tl = tab._HTMLElement.offsetLeft;
            tcw = this._tabs_Container.offsetWidth;
            tcsl = this._tabs_Container.scrollLeft;
            tcsw = this._tabs_Container.scrollWidth;
            if (tl + tw - tcsl > tcw) this._tabs_Container.scrollLeft += (tl + tw) - tcw;
            else if (tl < tcsl) this._tabs_Container.scrollLeft -= tcsl - tl;
            this.checkViewBtns();
        },
        checkLastVisibleTab: function () {
            var i, l = this._tabs.length;
            this._lastVisibleTab = -1;
            for (i = this._firstVisibleTab; i < l; i++) {
                if ((this._tabs[i]._HTMLElement.offsetLeft + this._tabs[i]._HTMLElement.offsetWidth) + this._tabs_Container.offsetLeft > this._btnLeft.offsetLeft) {
                    this._lastVisibleTab = i - 1;
                    break;
                }
            }
            if (this._lastVisibleTab === -1) this._lastVisibleTab = this._tabs.length - 1;
        },
        destroy: function () {
            this._inherited();
            this._tabContent = null;
            this._tabs.destroy();
            this._tabs = null;
            this._btnLeft = null;
            this._btnRight = null;
            this._tabs_Container = null;
            this._firstVisibleTab = null;
            this._lastVisibleTab = null;
            this.activeTab = null;
            this.images = null;
            this.tabStyle = null;
            this.tabPosition = null;
            this.onChange.destroy();
            this.onChange = null;
            this.canChange = null;
        },
        keyDown: function () {
            var idx;
            this._inherited();
            switch ($j.keyboard.keyCode) {
                case $j.types.VKeysCodes.VK_LEFT:
                    if (this.activeTab === this._tabs.first()) return;
                    this.selectNextTab(false, true);
                    if (this._tabs.indexOf(this.activeTab) < this._firstVisibleTab) this.updateTabs($j.types.directions.LEFT);
                    break;
                case $j.types.VKeysCodes.VK_RIGHT:
                    if (this.activeTab === this._tabs.last()) return;
                    this.selectNextTab(true, true);
                    if (this._tabs.indexOf(this.activeTab) > this._lastVisibleTab) this.updateTabs($j.types.directions.RIGHT);
                    break;
            }
        },
        getTabOrderList: function (list, children) {
            var i, control, l, tabList = this._tabContent._tabList;
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
        closeTab: function (tab) {
            tab.onClose.invoke();
            tab.hide();
            this._tabs.remove(tab);
            tab.destroy();
        },
        loaded: function () {
            this._inherited();
            this.checkViewBtns();
        }
        //#endregion
    });
    Object.seal(CustomTabControl);
    //#endregion
    $j.classes.register($j.types.categories.INTERNAL, Control, ThemedControl, CaptionControl, CustomTextControl, GraphicControl,
        LabeledControl, PopupBox, ItemsWheel, ShortCutIcon, ScrollControl, Tab, CustomTabControl, CustomTextBoxBtn,
        SVGGraphicControl);
    $j.classes.register($j.types.categories.CONTAINERS, Layout);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var ControlTpl = "<div id='{internalId}' data-name='{name}' data-class='{className}' class='Control {className}' style='width:100px;height:100px;'></div>",
            ItemsWheelTpl = "<div id='{internalId}' data-class='ItemsWheel' class='Control ItemsWheel {theme} {cssClasses}'>\
                       <div class='Control ItemsWheelTopGradient carbon'></div>\
                       <div class='Control ItemsWheelSep carbon'></div>\
                       <div class='Control ItemsWheelContent carbon'></div>\
                       <div class='Control ItemsWheelBottomGradient carbon'></div>\
                       </div>";
        PopupBoxTpl = "<div id='{internalId}' data-name='{name}' data-class='{className}' class='Control {className} csr_default {theme}'></div>",
            ToolTipTpl = "<div class='Control ToolTip {theme}'>{text}</div>",
            ShortCutIconTpl = "<div id='{internalId}' data-name='{name}' data-class='ShortCutIcon' class='Control ShortCutIcon'>\
                         <div class='Control ShortCutIconImg'>\
                         <div class='Control ShortCutIconCaption'>{caption}</div>\
                         </div></div>",
            TabTpl = "<label id='{internalId}' data-class='TabSheet' data-name='{name}' class='Control Tab TabSheet csr_default {theme}'>{caption}</label>",
            CustomTabControlTpl = "<div id='{internalId}' data-name='{name}' data-class='TabControl' class='Control TabControl {theme}' style='width:289px;height:193px;'>\
                             <div class='Control TabControlHeader {theme}'>\
                             <div class='Control TabsContainer {theme}'></div>\
                             <button id='{internalId}_1' class='Control Button TabControlLeftBtn {theme}' data-enabled='false'>*</button>\
                             <button id='{internalId}_2' class='Control Button TabControlRightBtn {theme}' data-enabled='false'>)</button>\
                             </div>\
                             <div id='{internalId}_3' data-class='Layout' class='Control TabsContent PagesContent {theme}'></div>\
                             </div>",
            CustomTextBoxBtnTpl = "<div id='{internalId}' data-name='{name}' data-class='CustomTextBoxBtn' class='Control CustomTextBoxBtn {theme}'>\
                             <input type='text' class='Control csr_text {theme}'>\
                             {buttons}\
                             </div>";
        $j.classes.registerTemplates([{ Class: Control, template: ControlTpl }, { Class: PopupBox, template: PopupBoxTpl },
        { Class: ItemsWheel, template: ItemsWheelTpl }, { Class: Layout, template: ControlTpl },
        { Class: "ToolTip", template: ToolTipTpl }, { Class: "ShortCutIcon", template: ShortCutIconTpl },
        { Class: "Tab", template: TabTpl }, { Class: "CustomTabControl", template: CustomTabControlTpl },
        { Class: "CustomTextBoxBtn", template: CustomTextBoxBtnTpl }]);
    }
    //#endregion
})();
//http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/
//http://www.twinhelix.com/javascript/dragresize/demo/