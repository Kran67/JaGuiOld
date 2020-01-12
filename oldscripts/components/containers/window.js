"use strict";
(function () {
    $j.types.showingModes = {
        NORMAL: "normal",
        MODAL: "modal"
    };
    //#region WindowTitleBar
    var WindowTitleBar = $j.classes.ThemedControl.extend("WindowTitleBar", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._title = null;
                this._closeBtn = null;
                this._minimizeBtn = null;
                this._maxRestoreBtn = null;
                this._helpBtn = null;
                this._rollUpDownBtn = null;
                this._stayOnOffBtn = null;
                this._disableAlign = false;
                this._startDragOff = new $j.classes.Point;
                //#endregion
                $j.tools.addPropertyFromSet(this, "horizAlign", $j.types.textAligns, $j.types.textAligns.LEFT);
                this.autoCapture = true;
                this.hitTest.mouseDown = true;
                this.hitTest.mouseUp = true;
                this.hitTest.mouseMove = true;
            }
        },
        //#region Methods
        mouseDown: function () {
            this._inherited();
            var p = new $j.classes.Point($j.mouse.document.x, $j.mouse.document.y);
            this._startDragOff.x = p.x;
            this._startDragOff.y = p.y;
            this._isPressed = true;
            $j.dragWindow = this;
            $j.tools.events.bind($j.doc, $j.types.mouseEvents.MOVE.toLowerCase(), this.mouseMove);
        },
        mouseUp: function () {
            var formStyle;
            this._inherited();
            this._isPressed = false;
            if ($j.mouse.button === $j.types.mouseButtons.RIGHT) {
                if (this.form.isBorderSingle() || this.form.isBorderSizeable) {
                    if (($j.mouse.target.x > this._HTMLElement.firstElementChild.offsetLeft) &&
                        ($j.mouse.target.x < this._HTMLElement.firstElementChild.offsetLeft + parseInt(getComputedStyle(this._HTMLElement.firstElementChild).paddingLeft, 10))) this.form.showSystemMenu();
                }
            }
            $j.dragWindow = null;
            $j.tools.events.unBind($j.doc, $j.types.mouseEvents.MOVE, this.mouseMove);
            if (this.form.bordersType === $j.types.bordersTypes.SNAP && this.form.windowState !== $j.types.windowStates.SNAPED) {
                if (this.form._snapArea !== $j.types.snapAreas.NONE) {
                    formStyle = getComputedStyle(this.form._layout._HTMLElement)
                    this.form._savedSizePos.top = this.form._HTMLElement.offsetTop;
                    this.form._savedSizePos.width = this.form._layout._HTMLElement.offsetWidth;
                    this.form._savedSizePos.height = this.form._layout._HTMLElement.offsetHeight;
                    this.form.windowState = $j.types.windowStates.SNAPED;
                    $j.CSS.addClass(this.form._HTMLElement, $j.types.windowStates.SNAPED);
                    this.form._HTMLElement.dataset.SNAPED = true;
                    switch (this.form._snapArea) {
                        case $j.types.snapAreas.LEFT:
                            this.form._savedSizePos.left = 0;
                            this.form._HTMLElementStyle.left = 0;
                            this.form._HTMLElementStyle.top = 0;
                            this.form._HTMLElementStyle.width = "50%";
                            this.form._HTMLElementStyle.bottom = 0;
                            break;
                        case $j.types.snapAreas.TOP:
                            this.form._HTMLElementStyle.left = 0;
                            this.form._HTMLElementStyle.top = 0;
                            this.form._HTMLElementStyle.width = "auto";
                            this.form._HTMLElementStyle.height = "auto";
                            this.form._HTMLElementStyle.bottom = 0;
                            this.form._HTMLElementStyle.right = 0;
                            break;
                        case $j.types.snapAreas.RIGHT:
                            this.form._HTMLElementStyle.right = 0;
                            this.form._HTMLElementStyle.top = 0;
                            this.form._HTMLElementStyle.width = "50%";
                            this.form._HTMLElementStyle.bottom = 0;
                            this.form._HTMLElementStyle.left = "auto";
                            this.form._savedSizePos.left = this.form._HTMLElement.offsetLeft;
                            break;
                    }
                    this.form._layout._HTMLElementStyle.width = (this.form._HTMLElement.offsetWidth - parseInt(formStyle.marginLeft, 10) - parseInt(formStyle.marginRight, 10) - this.form._cssBorder.left - this.form._cssBorder.right) + $j.types.CSSUnits.PX;
                    this.form._layout._HTMLElementStyle.height = (this.form._HTMLElement.offsetHeight - parseInt(formStyle.marginTop, 10) - parseInt(formStyle.marginBottom, 10) - this.form._cssBorder.top - this.form._cssBorder.bottom) + $j.types.CSSUnits.PX;
                    this.form.destroySnapArea();
                }
            }
        },
        mouseMove: function (mouseEventArg) {
            var titlebar, p, decOff = new $j.classes.Point;
            this._inherited();
            if (mouseEventArg) $j.mouse.getMouseInfos(mouseEventArg);
            if (!$j.dragWindow) return;
            titlebar = $j.dragWindow;
            if (titlebar.form.isMaximized()) return;
            if ($j.mouse.button === $j.types.mouseButtons.LEFT) {
                if (titlebar.form.moveable) {
                    p = new $j.classes.Point($j.mouse.document.x, $j.mouse.document.y);
                    decOff.x = $j.abs(titlebar._startDragOff.x - p.x);
                    decOff.y = $j.abs(titlebar._startDragOff.y - p.y);
                    if ((decOff.x !== 0 || decOff.y !== 0) && titlebar._isPressed) {
                        if (p.x < 0) p.x = 0;
                        if (p.y < 0) p.y = 0;
                        if (p.x > window.innerWidth) p.x = window.innerWidth;
                        if (p.y > window.innerHeight) p.y = window.innerHeight;
                        var newLeft = (titlebar.form._HTMLElement.offsetLeft + (p.x - titlebar._startDragOff.x)), newTop = (titlebar.form._HTMLElement.offsetTop + (p.y - titlebar._startDragOff.y));
                        if (titlebar.form.bordersType === $j.types.bordersTypes.MAGNETIC) {
                            if (newLeft < _const.MAGNETICSIZE) newLeft = 0;
                            if (newTop < _const.MAGNETICSIZE) newTop = 0;
                            if (newLeft + titlebar.form._HTMLElement.offsetWidth > titlebar.form._HTMLElement.parentNode.offsetWidth - _const.MAGNETICSIZE) newLeft = titlebar.form._HTMLElement.parentNode.offsetWidth - titlebar.form._HTMLElement.offsetWidth;
                            if (newTop + titlebar.form._HTMLElement.offsetHeight > titlebar.form._HTMLElement.parentNode.offsetHeight - _const.MAGNETICSIZE) newTop = titlebar.form._HTMLElement.parentNode.offsetHeight - titlebar.form._HTMLElement.offsetHeight;
                        } else if (titlebar.form.bordersType === $j.types.bordersTypes.SNAP) {
                            if (!$j.CSS.containsClass(titlebar.form._HTMLElement, $j.types.windowStates.SNAPED)) {
                                if (titlebar.form._snapArea === $j.types.snapAreas.NONE) {
                                    if (p.x <= _const.SNAPAREADISTANCE) titlebar.form.createSnapArea($j.types.snapAreas.LEFT);
                                    else if (p.y <= _const.SNAPAREADISTANCE) titlebar.form.createSnapArea($j.types.snapAreas.TOP);
                                    else if (p.x >= titlebar.form._HTMLElement.parentNode.offsetWidth - _const.SNAPAREADISTANCE) titlebar.form.createSnapArea($j.types.snapAreas.RIGHT);
                                } else if ((titlebar.form._snapArea === $j.types.snapAreas.LEFT && p.x > _const.SNAPAREADISTANCE) ||
                                    (titlebar.form._snapArea === $j.types.snapAreas.TOP && p.y > _const.SNAPAREADISTANCE) ||
                                    (titlebar.form._snapArea === $j.types.snapAreas.RIGHT && p.x < titlebar.form._HTMLElement.parentNode.offsetWidth - _const.SNAPAREADISTANCE)) {
                                    titlebar.form._snapArea = $j.types.snapAreas.NONE;
                                    titlebar.form.destroySnapArea();
                                }
                            } else {
                                if (titlebar.form._snapArea === $j.types.snapAreas.TOP) newLeft = p.x - ~~(titlebar.form._savedSizePos.width / 2);
                                else if (titlebar.form._snapArea === $j.types.snapAreas.LEFT) {
                                    newLeft = 0;
                                    if (p.x > newLeft + titlebar.form._savedSizePos.width) newLeft = p.x - ~~(titlebar.form._savedSizePos.width / 2);
                                } else if (titlebar.form._snapArea === $j.types.snapAreas.RIGHT) {
                                    if (p.x > newLeft + titlebar.form._savedSizePos.width) newLeft = p.x - ~~(titlebar.form._savedSizePos.width / 2);
                                }
                                titlebar.form.restoreWindow();
                            }
                        }
                        titlebar.form.moveTo(newLeft, newTop);
                        titlebar._startDragOff.x = p.x;
                        titlebar._startDragOff.y = p.y;
                    }
                }
            }
        },
        addCSSClass: function () {
            var str = $j.classes.ThemedControl.prototype.addCSSClass.apply(this, []);
            if ((this.form.isBorderSizeToolWin) || (this.form.isBorderToolWindow)) {
                str = $j.tools.text.replace(str, this.themeAndClassName, this.themeAndClassName + "Tool");
            }
            return str;
        },
        getChildsHTMLElement: function () {
            var nodes = this._HTMLElement.childNodes, i, l, dataClass, obj, dataName;
            for (i = 0, l = nodes.length; i < l; i++) {
                if (nodes[i].nodeType === $j.types.xmlNodeTypes.ELEMENT_NODE) {
                    dataClass = nodes[i].dataset.class;
                    dataName = nodes[i].dataset.name;
                    if (!dataName || !dataName) dataName = String.EMPTY;
                    if (dataClass) {
                        obj = $j.classes.createComponent($j.classes[dataClass], this, dataName, { _inForm: false }, false, nodes[i].id);
                        switch (dataClass) {
                            case "CaptionControl":
                                this._title = obj;
                                this._title.mouseDown = function () {
                                    this._owner.mouseDown();
                                };
                                this._title.mouseMove = function () {
                                    this._owner.mouseMove();
                                };
                                this._title.mouseUp = function () {
                                    this._owner.mouseUp();
                                };
                                this._title.dblClick = this.dblClick;
                                break;
                            case "WindowCloseButton":
                                this._closeBtn = obj;
                                break;
                            case "WindowMinimizeButton":
                                this._minimizeBtn = obj;
                                break;
                            case "WindowMaxRestoreButton":
                                this._maxRestoreBtn = obj;
                                break;
                            case "WindowHelpButton":
                                this._helpBtn = obj;
                                break;
                            case "WindowRollUpDownButton":
                                this._rollUpDownBtn = obj;
                                break;
                            case "WindowStayOnOffButton":
                                this._stayOnOffBtn = obj;
                                break;
                        }
                    }
                }
            }
        },
        destroy: function () {
            this._inherited();
            this._title = null;
            this._closeBtn = null;
            this._minimizeBtn = null;
            this._maxRestoreBtn = null;
            this._helpBtn = null;
            this._rollUpDownBtn = null;
            this._stayOnOffBtn = null;
            this._disableAlign = null;
            this._startDragOff = new $j.classes.Point;
            this._startDragOff = null;
            this.horizAlign = null;
            this.autoCapture = null;
        },
        dblClick: function () {
            if ($j.mouse.button === $j.types.mouseButtons.LEFT) {
                if (this.form.isBorderSingle() || this.form.isBorderSizeable) {
                    if (($j.mouse.target.x > this._HTMLElement.offsetLeft) &&
                        ($j.mouse.target.x < this._HTMLElement.offsetLeft + parseInt(getComputedStyle(this._HTMLElement).paddingLeft, 10))) this.form.close();
                }
            }
        }
        //#endregion
    });
    //#endregion
    //#region WindowContent
    var WindowContent = $j.classes.ThemedControl.extend("WindowContent", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                this.hitTest.mouseDown = true;
            }
        }
        //#region Methods
        //#endregion Methods
    });
    //#endregion
    //#region BaseWindow
    var BaseWindow = $j.classes.ThemedControl.extend("BaseWindow", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._resizeMode = {
                    "leftEdge": false,
                    "topEdge": false,
                    "rightEdge": false,
                    "bottomEdge": false
                };
                this._savedSizePos = {};
                this._isModal = false;
                this._creating = true;
                //this._controls=[];
                this._layout = null;
                this._titleBar = null;
                this._content = null;
                this._titleBarObj = {};
                this._firstShow = true;
                this._controlsToResize = [];
                this._focusedControl = null;
                this._hoveredControl = null;
                this._capturedControl = null;
                this._lastSelectedMenuItem = null;
                this._popups = [];
                this._clientWidth = 0;
                this._clientHeight = 0;
                this._toolBars = [];
                this._statusBars = [];
                this._themeManifest = null;
                this._isResizing = false;
                this._snapArea = $j.types.snapAreas.NONE;
                this._destroyOnHide = false;
                this._controls = [];
                this._isChildWindow = props.parentHTML ? (props.parentHTML !== $j.doc.body ? true : false) : false;
                this._parentHTML = props.parentHTML ? props.parentHTML : null;
                this._lastZIndex = -1;
                //#endregion
                this.onActivate = new $j.classes.NotifyEvent(this);
                this.onDeactivate = new $j.classes.NotifyEvent(this);
                this.onHide = new $j.classes.NotifyEvent(this);
                this.onShow = new $j.classes.NotifyEvent(this);
                this.onCreate = new $j.classes.NotifyEvent(this);
                this.onClose = new $j.classes.NotifyEvent(this);
                this.onCloseQuery = new $j.classes.NotifyEvent(this);
                this.onThemeChanged = new $j.classes.NotifyEvent(this);
                $j.tools.addPropertyFromSet(this, "position", $j.types.formPositions, $j.types.formPositions.DESIGNED);
                this.formState = false;
                this.hitTest.mouseMove = true;
                this.hitTest.mouseDown = true;
                this.hitTest.mouseUp = true;
                this.animated = true;
                $j.tools.addPropertyFromSet(this, "windowState", $j.types.windowStates, $j.types.windowStates.NORMAL);
                this.keyPreview = false;
                this.icon = "logo";
                this.mainMenu = null;
                $j.tools.addPropertyFromSet(this, "borderStyle", $j.types.borderStyles, props.borderStyle ? props.borderStyle : $j.types.borderStyles.SIZEABLE);
                this.activeControl = null;
                this.visible = false;
                $j.tools.addPropertyFromSet(this, "bordersType", $j.types.bordersTypes, $j.types.bordersTypes.NONE);
                $j.tools.addPropertyFromSet(this, "modalResult", $j.types.modalResults, $j.types.modalResults.NONE);
                $j.tools.addPropertyFromSet(this, "showingMode", $j.types.showingModes, $j.types.showingModes.NORMAL);
                this.canClose = true;
                this.autoCapture = true;
                this.moveable = true;
                this.app[this._ClassName.toLowerCase()] = this;
            }
            this.setTitleBtn(true, [$j.types.titleButtons.CLOSE, $j.types.titleButtons.MINIMIZE, $j.types.titleButtons.MAXIMIZE]);
        },
        //#region Getters/Setters
        isShowed: function () {
            return this.visible;
        },
        isNormal: function () {
            return this.windowState === $j.types.windowStates.NORMAL;
        },
        isMinimized: function () {
            return this.windowState === $j.types.windowStates.MINIMIZED;
        },
        isMaximized: function () {
            return this.windowState === $j.types.windowStates.MAXIMIZED;
        },
        isRolledUp: function () {
            return this.windowState === $j.types.windowStates.ROLLEDUP;
        },
        isBorderDialog: function () {
            return this.borderStyle === $j.types.borderStyles.DIALOG;
        },
        isBorderNone: function () {
            return this.borderStyle === $j.types.borderStyles.NONE;
        },
        isBorderSingle: function () {
            return this.borderStyle === $j.types.borderStyles.SINGLE;
        },
        isBorderSizeable: function () {
            return this.borderStyle === $j.types.borderStyles.SIZEABLE;
        },
        isBorderSizeToolWin: function () {
            return this.borderStyle === $j.types.borderStyles.SIZETOOLWIN;
        },
        isBorderToolWindow: function () {
            return this.borderStyle === $j.types.borderStyles.TOOLWINDOW;
        },
        isPositionDefault: function () {
            return this.position === $j.types.formPositions.DEFAULT;
        },
        isPositionDesigned: function () {
            return this.position === $j.types.formPositions.DESIGNED;
        },
        isPositionMainFormCenter: function () {
            return this.position === $j.types.formPositions.MAINFORMCENTER;
        },
        isPositionScreenCenter: function () {
            return this.position === $j.types.formPositions.SCREENCENTER;
        },
        getActiveWindow: function () { return this === this.app.activeWindow; },
        setAnimated: function (newValue) {
            if (typeof newValue != _const.BOOLEAN) return;
            if (this.animated !== newValue) this.animated = newValue;
        },
        setCaption: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this._titleBar._title.caption !== newValue) {
                this._titleBar._title.caption = newValue;
                this._titleBar._title._HTMLElement.innerHTML = newValue;
            }
        },
        setKeyPreview: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (newValue !== this.keyPreview) {
                this.keyPreview = newValue;
                this.propertyChanged("keyPreview");
            }
        },
        setMenu: function (newValue) {
            if (!(newValue instanceof $j.classes.MainMenu)) return;
            if (newValue !== this.mainMenu) {
                this.mainMenu = newValue;
                this.redraw();
            }
        },
        setBorderStyle: function (newValue) {
            if (!$j.tools.valueInSet(newValue, $j.types.borderStyles)) return;
            if (this.borderStyle !== newValue) {
                $j.CSS.removeClass(this._HTMLElement, this.borderStyle);
                this.borderStyle = newValue;
                $j.CSS.addClass(this._HTMLElement, this.borderStyle);
            }
        },
        setActive: function () {
            if (this.app.activeWindow !== this) {
                if (this.app.activeWindow) {
                    this.app.activeWindow.releaseCapture();
                    if (this.app.activeWindow._focusedControl) this.app.activeWindow._focusedControl.killFocus();
                    this.app.activeWindow.onDeactivate.invoke();
                    //$j.CSS.removeClass(this.app.activeWindow._HTMLElement,"isactive");
                    this.app.activeWindow._HTMLElement.dataset.isactive = false;
                    if (this.app.activeWindow) {
                        if (!this._isChildWindow && this !== this.app.mainWindow) this.app._lastActiveWindow.push(this.app.activeWindow);
                        else this.app._lastActiveWindow.clear();
                    }
                }
            }
            this.app.activeWindow = this;
            //$j.CSS.addClass(this.app.activeWindow._HTMLElement,"isactive");
            this._HTMLElement.dataset.isactive = true;
            this.onActivate.invoke();
        },
        setFocused: function (value) {
            if (value) {
                if (!(value instanceof $j.classes.Control)) return;
            }
            if (this._focusedControl !== value) {
                if (this._focusedControl) {
                    this._focusedControl.killFocus();
                }
                this._focusedControl = value;
                if (this._focusedControl) {
                    this._focusedControl.enterFocus();
                }
            }
        },
        setHovered: function (object) {
            if (object) {
                if (!(object instanceof $j.classes.Control)) return;
            }
            if (this._hoveredControl !== object) this._hoveredControl = object;
        },
        setTitleBar: function () {
            //this._titleBar.visible=false;
            //this._titleBarObj.mouseDown=this._titleBar.mouseDown;
            //this._titleBarObj.mouseUp=this._titleBar.mouseUp;
            //this._titleBarObj.mouseMove=this._titleBar.mouseMove;
            //this._titleBarObj.hitTest.mouseDown=false;
            //this._titleBarObj.hitTest.mouseMove=false;
            //this._titleBarObj.hitTest.mouseUp=false;
            //this._titleBarObj.hitTest.mouseWheel=false;
            //if (this._titleBarObj._startDragOff===null) this._titleBarObj._startDragOff=new $j.classes.Point();
        },
        setTitleBtn: function (hideshow, tab) {
            if (tab.length === 0) {
                //for (var item in this.titleBtns){
                //  if (typeof this.titleBtns[item]===_const.BOOLEAN){
                //    this.titleBtns[item]=false;
                //    this.titleBar.buttons[item+"Btn"].visible=false;
                //  }
                //}
            }
            for (var i = 0, l = tab.length; i < l; i++) {
                //this.titleBtns[tab[i]]=hideshow;
                //this.titleBar.buttons[tab[i]+"Btn"].visible=hideshow;
            }
        },
        setWidth: function (newValue) {
            if (this.windowState === $j.types.windowStates.MAXIMIZED || this.windowState === $j.types.windowStates.MINIMIZED) return;
            if (typeof newValue !== _const.NUMBER) return;
            if (this._layout._HTMLElement.offsetWidth !== newValue) {
                this.propertyChanged("width");
                if (!this._loading) {
                    /*if (this._HTMLElement.offsetWidth===0) this._layout._HTMLElementStyle.width=String.EMPTY;
                    else*/ this._layout._HTMLElementStyle.width = newValue + $j.types.CSSUnits.PX;
                }
            }
        },
        setHeight: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.windowState === $j.types.windowStates.MAXIMIZED || this.windowState === $j.types.windowStates.MINIMIZED) return;
            if (this._layout._HTMLElement.offsetHeight !== newValue) {
                this.propertyChanged("height");
                if (!this._loading) {
                    /*if (this._HTMLElement.offsetHeight===0) this._layout._HTMLElementStyle.height=String.EMPTY;
                    else*/ this._layout._HTMLElementStyle.height = newValue + $j.types.CSSUnits.PX;
                }
            }
        },
        setBordersType: function (newValue) {
            if (!$j.tools.valueInSet(newValue, $j.types.bordersTypes)) return;
            if (this.bordersType !== newValue) {
                this.bordersType = newValue;
            }
        },
        setLeft: function (newValue) {
            if (this.windowState === $j.types.windowStates.MAXIMIZED || this.windowState === $j.types.windowStates.MINIMIZED) return;
            this._inherited(newValue);
        },
        setTop: function (newValue) {
            if (this.windowState === $j.types.windowStates.MAXIMIZED || this.windowState === $j.types.windowStates.MINIMIZED) return;
            this._inherited(newValue);
        },
        setCanClose: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.canClose !== newValue) this.canClose = newValue;
            if (this.canClose) {
                this._destroyOnHide = this.canClose;
                this._close();
            }
        },
        setVisible: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.visible !== newValue) {
                this._inherited(newValue);
                if (!this.visible) {
                    this.setVisible(false);
                    //$j.CSS.removeClass(this._HTMLElement,"isactive");
                    this._HTMLElement.dataset.isactive = false;
                }
            }
        },
        setCapturedControl: function (newValue) {
            if (newValue) {
                if (!(newValue instanceof $j.classes.Component)) return;
            }
            if (this._capturedControl !== newValue) {
                this.releaseCapture();
                this._capturedControl = newValue;
                if (newValue) this.app.activeWindow = newValue.form;
            }
        },
        setIcon: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.icon !== newValue) {
                $j.CSS.removeClass(this._titleBar._title._HTMLElement, this.icon);
                this.icon = newValue;
                if (newValue.contains("base64")) {

                } else $j.CSS.addClass(this._titleBar._title._HTMLElement, this.icon);
            }
        },
        //#endregion
        //#region Methods
        checkBorderStyle: function () {
            var contentTop = 0,/*toolbars,*/toolbarsTop = 0;;
            this._HTMLElement.dataset.borderstyle = this.borderStyle;
            this._titleBar.updateFromHTML();
            //if (this.isBorderNone()) {
            //  this._titleBar.setVisible(false);
            //} else {
            //  this._titleBar.setVisible(true);
            //  contentTop+=this._titleBar._HTMLElement.offsetHeight+parseInt(getComputedStyle(this._titleBar._HTMLElement).marginBottom,10);
            //}
            //if (this.mainMenu)) {
            //  if (!this.isBorderNone()) this.mainMenu.setTop(this._titleBar._HTMLElement.offsetHeight);
            //  toolbarsTop=this.mainMenu._HTMLElement.offsetHeight;
            //} else toolbarsTop=(!this.isBorderNone())?this._titleBar._HTMLElement.offsetHeight:0;
            //if (this._toolBars.length>0) {
            //  for (var i=0,l=this._toolBars.length;i<l;i++) {
            //    this._toolBars[i].setTop(toolbarsTop);
            //    toolbarsTop+=this._toolBars[i]._HTMLElement.offsetHeight;
            //  }
            //  contentTop=toolbarsTop;
            //}
            //this._content.setTop(contentTop);
        },
        visibleTitleBarButtons: function () {
            var btns = [];
            //for (var prop in this.titleBtns){
            //  if (typeof this.titleBtns[prop]===_const.BOOLEAN){
            //    if (this.titleBtns[prop]===true) btns.add(prop);
            //  }
            //}
            return btns;
        },
        loadRes: function () {
            $j.tools.loadFormRes(this.resource, $j.tools.resourceReader);
            var t = new Date().getTime();
        },
        close: function () {
            if (this.form.onCloseQuery.hasListener()) {
                this.form.onCloseQuery.invoke();
            } else this.form._close();
        },
        _close: function () {
            if (!this.canClose) return;
            $j.tools.removeResizeListeners(this);
            this.hide();
        },
        hide: function () {
            if (this._isModal) {
                this.app._lastActiveWindow.last()._HTMLElement.removeChild(this.app._lastActiveWindow.last()._HTMLElement.lastElementChild);
            }
            this.onHide.invoke();
            this._isModal = false;
            $j.CSS.removeClass(this._HTMLElement, "bounceIn");
            $j.CSS.addClass(this._HTMLElement, "bounceOut");
            this.stopResize();
            if ($j.CSS.containsClass(this._HTMLElement, "animated")) $j.tools.events.bind(this._HTMLElement, $j.tools.events.whichAnimationEvent(), this.anitmationEndOnHide);
            else this.setVisible(false);
            if (this.app._lastActiveWindow.length > 0) {
                this.app.activeWindow = null;
                this.app._lastActiveWindow.last().setActive();
                this.app._lastActiveWindow.pop();
            }
        },
        maximize: function () {
            if (this.isRolledUp()) return;
            this._savedSizePos.left = this._HTMLElement.offsetLeft;
            this._savedSizePos.top = this._HTMLElement.offsetTop;
            this._savedSizePos.width = this._layout._HTMLElement.offsetWidth;
            this._savedSizePos.height = this._layout._HTMLElement.offsetHeight;
            this.windowState = $j.types.windowStates.MAXIMIZED;
            $j.CSS.addClass(this._HTMLElement, $j.types.windowStates.MAXIMIZED);
            this._HTMLElementStyle.left = 0;
            this._HTMLElementStyle.top = 0;
            this._HTMLElementStyle.width = "auto";
            this._HTMLElementStyle.height = "auto";
            this._layout._HTMLElementStyle.width = "auto";
            this._layout._HTMLElementStyle.height = "auto";
            this._HTMLElement.dataset.windowstate = this.windowState;
            // on désactive les autres boutons
            this._titleBar._rollUpDownBtn.setEnabled(false);
            this.stopResize();
        },
        restore: function () {
            this._HTMLElementStyle.left = this._savedSizePos.left + $j.types.CSSUnits.PX;
            this._HTMLElementStyle.top = this._savedSizePos.top + $j.types.CSSUnits.PX;
            this._HTMLElementStyle.width = "auto";
            this._HTMLElementStyle.height = "auto";
            this._layout._HTMLElementStyle.width = this._savedSizePos.width + $j.types.CSSUnits.PX;
            this._layout._HTMLElementStyle.height = this._savedSizePos.height + $j.types.CSSUnits.PX;
            this._HTMLElementStyle.right = String.EMPTY;
            this._HTMLElementStyle.bottom = String.EMPTY;
            this.windowState = $j.types.windowStates.NORMAL;
            $j.CSS.removeClass(this._HTMLElement, $j.types.windowStates.MAXIMIZED);
            this._titleBar._rollUpDownBtn.setEnabled(true);
        },
        maximizeRestore: function () {
            var form = this.form;
            if (form.windowState === $j.types.windowStates.MAXIMIZED) form.restore(this);
            else form.maximize(this);
        },
        showHelp: function () {
            //var form=this.form;
        },
        rollUp: function () {
            var form = this.form;
            if (!form.isBorderSizeable || !form.isBorderSingle || !form._titleBar._rollUpDownBtn.visible) return;
            form._savedSizePos.height = form._HTMLElement.offsetHeight;
            $j.CSS.addClass(form._HTMLElement, "rolledUp");
            if (form._titleBar._maxRestoreBtn.visible) form._titleBar._maxRestoreBtn.setEnabled(false);
            if (form._titleBar._minimizeBtn.visible) form._titleBar._minimizeBtn.setEnabled(false);
            form._content.setVisible(false);
            form.windowState = $j.types.windowStates.ROLLEDUP;
            form._HTMLElement.dataset.windowstate = this.windowState;
            form.stopResize();
        },
        rollDown: function () {
            var form = this.form;
            if (form.isRolledUp()) {
                $j.CSS.removeClass(form._HTMLElement, "rolledUp");
                form.windowState = $j.types.windowStates.NORMAL;
                if (form._titleBar._maxRestoreBtn.visible) form._titleBar._maxRestoreBtn.setEnabled(true);
                if (form._titleBar._minimizeBtn.visible) form._titleBar._minimizeBtn.setEnabled(true);
                form._content.setVisible(true);
            }
        },
        stayOnTop: function () {
            var form = this.form;
            if (!form.isBorderSizeable || !form.isBorderSingle || !form._titleBar._stayOnOffBtn.visible) return;
            form._HTMLElementStyle.zIndex = _const.STAYONTOP;
            form.stopResize();
        },
        stayNormal: function () {
            var form = this.form;
            if (!form.isBorderSizeable || !form.isBorderSingle || !form._titleBar._stayOnOffBtn.visible) return;
            form._HTMLElementStyle.zIndex = form._lastZIndex;
        },
        showSystemMenu: function () {
            //var form=this.form;
            alert('Showing system menu');
            //form.sysMenu.popup();
        },
        beforeShow: function () {
            this.checkBorderStyle();
            if (this._firstShow) {
                this.HTMLResize();
                this._firstShow = false;
            }
            switch (this.position) {
                case $j.types.formPositions.SCREENCENTER:
                    this.center();
            }
            //this._HTMLElementStyle.zIndex=~~($j.apps.activeApplication.activeWindow._HTMLElementStyle.zIndex)+1;
            this._HTMLElementStyle.zIndex = $j.windowZIndex;
            this._lastZIndex = $j.windowZIndex;
        },
        show: function () {
            //this.onBeforeShow.invoke();
            this.beforeShow();
            this._show();
            this.onShow.invoke();
        },
        _show: function () {
            //this.onShow.invoke();
            this.setVisible(true);
            this.setActive();
            if (this._controlsToResize.length > 0) {
                for (var i = 0, l = this._controlsToResize.length; i < l; i++) {
                    this._controlsToResize[i].addResizeListener();
                }
                this._controlsToResize.length = 0;
            }
            if (this.animated) $j.CSS.addClass(this._HTMLElement, "animated bounceIn");
            $j.tools.events.bind(this._HTMLElement, $j.tools.events.whichAnimationEvent(), this.anitmationEndOnShow);
            var defaultBtn = this._HTMLElement.querySelector(".isDefault");
            if (defaultBtn && !this._focusedControl) defaultBtn.jsObj.setFocus();
        },
        anitmationEndOnShow: function () {
            $j.tools.events.unBind(this, $j.tools.events.whichAnimationEvent(), this.jsObj.anitmationEndOnShow);
            setTimeout(function () {
                $j.CSS.removeClass($j.apps.activeApplication.activeWindow._HTMLElement, "bounceIn hidden");
            }, 0);
        },
        anitmationEndOnHide: function () {
            $j.tools.events.unBind(this, $j.tools.events.whichAnimationEvent(), this.jsObj.anitmationEndOnHide);
            $j.CSS.removeClass(this, "bounceOut animated");
            this.jsObj.setVisible(false);
            //$j.CSS.removeClass(this,"isactive");
            this.dataset.isactive = false;
            this.jsObj.onClose.invoke();
            if (this.jsObj.app._lastActiveWindow.length === 0) this.jsObj._destroyOnHide = true;
            if (this.jsObj._destroyOnHide) this.jsObj.destroy();
            //var nodes=document.querySelectorAll(".Window.isactive");
            //$j.CSS.removeClass(nodes.last(),"isactive");
            //nodes[nodes.length-1].jsObj.removeToHTML();
            //if (nodes.last()._destroyOnHide) nodes.last().destroy();
        },
        showModal: function () {
            var glass = $j.doc.createElement($j.types.HTMLElements.DIV);
            $j.CSS.addClass(glass, "noEvents");
            glass.jsObj = this;
            this._isModal = true;
            this.modalResult = $j.types.modalResults.NONE;
            if (!this.app.activeWindow._isChildWindow) this.app.activeWindow._HTMLElement.appendChild(glass);
            else {
                this.app.mainWindow._HTMLElement.appendChild(glass);
                this.app.activeWindow = this.app.mainWindow;
            }
            this.show();
        },
        releaseCapture: function () {
            if (this._capturedControl !== this) {
                if (this._capturedControl) {
                    if (this._capturedControl instanceof $j.classes.Control) this._capturedControl.releaseCapture();
                }
            }
        },
        localRect: function () {
            var r = new $j.classes.Rect;
            if ((this.isBorderSizeable) || (this.isBorderSizeToolWin)) {
                r.left = _const.WINDOWSIZEABLEBORDERSIZE;
                r.top = _const.WINDOWSIZEABLEBORDERSIZE;
                r.right = _const.WINDOWSIZEABLEBORDERSIZE;
                r.bottom = _const.WINDOWSIZEABLEBORDERSIZE;
            }
            return r;
        },
        HTMLResize: function () {
            /// <summary>
            /// Resize the container of layers and all layers
            /// </summary>
            /// <param name="w">Width:Integer</param>
            /// <param name="h">Height:Integer</param>
            var i, l, childs;
            if (this._HTMLElement.offsetWidth < $j.types.constants.WINDOWMINWIDTH) this._HTMLElementStyle.width = $j.types.constants.WINDOWMINWIDTH + $j.types.CSSUnits.PX;
            if (this._HTMLElement.offsetHeight < $j.types.constants.WINDOWMINHEIGHT) this._HTMLElementStyle.height = $j.types.constants.WINDOWMINHEIGHT + $j.types.CSSUnits.PX;
            if (!this._loading && !this._creating) {
                //this.resizeContent();
                if (this._firstShow) {
                }
                this._firstShow = false;
            }
            childs = $j.looper.listeners.filter(
                function (e, i, a) {
                    return e._hasResizeEvent;
                }
            );
            for (i = 0, l = childs.length; i < l; i++) {
                childs[i].resized();
            }
        },
        touchToMouse: function (touchEventArg) {
            //if (touchEventArg.touches.length > 1) return;
            //var touch=touchEventArg.changedTouches[0],type="",simulatedEvent;
            //switch (touchEventArg.type) {
            //  case $j.types.toucheEvents.START:
            //    type=$j.types.mouseEvents.DOWN.toLowerCase();
            //    break;
            //  case $j.types.toucheEvents.MOVE:
            //    type=$j.types.mouseEvents.MOVE.toLowerCase();
            //    break;
            //  case $j.types.toucheEvents.END:
            //    type=$j.types.mouseEvents.UP.toLowerCase();
            //    break;
            //}
            //touch.preventDefault();
            //simulatedEvent=document.createEvent($j.types.mouseEvents.EVENT);
            //simulatedEvent.initMouseEvent(type,true,true,this.canvas,1,touch.screenX,touch.screenY,touch.clientX,touch.clientY,false,false,false,false,0,null);
            //touch.target.dispatchEvent(simulatedEvent);
        },
        dblClick: function () {
            //var obj,p,frm=this.form;
            //if (!frm.hasHitTest()) return;
            //$j.mouse.getMouseInfos(mouseEventArg);
            //p=$j.classes.Point.create($j.mouse.target.x,$j.mouse.target.y);
            //if ($j.renderer===$j.types.renderers.HTML){
            //  if (e.target.jsObj) e.target.jsObj.mouseDown($j.mouse.button,p);
            //  return;
            //}
            //obj=frm.objectByPoint(p,$j.types.mouseEvents.DBLCLICK);
            //if (obj===frm) obj=null;
            //if(obj!==null){
            //  if(obj.enabled){
            //    p=obj.screenToClient(p);
            //    obj.dblClick($j.mouse.button,p);
            //  }
            //}
            //$j.mouse.stopEvent(mouseEventArg);
            //obj=p=null;
        },
        mouseDown: function (mouseEventArg) {
            this._isResizing = this._resizeMode.rightEdge || this._resizeMode.bottomEdge || this._resizeMode.topEdge || this._resizeMode.leftEdge;
            if (this._isResizing) {
                if (mouseEventArg) $j.mouse.getMouseInfos(mouseEventArg);
                this._savedSizePos.x = $j.mouse.document.x;
                this._savedSizePos.y = $j.mouse.document.y;
                $j.resizeWindow = this;
                $j.tools.events.bind($j.doc, $j.types.mouseEvents.MOVE.toLowerCase(), this.docMouseMove);
                $j.tools.events.bind($j.doc, $j.types.mouseEvents.UP.toLowerCase(), this.docMouseUp);
                $j.looper.addListener(this, "resize");
            }
        },
        mouseUp: function (mouseEventArg) {
            var resizeWindow = $j.resizeWindow;
            if (resizeWindow) resizeWindow.stopResize(mouseEventArg);
        },
        docMouseUp: function (mouseEventArg) {
            var resizeWindow = $j.resizeWindow;
            if (resizeWindow) resizeWindow.stopResize(mouseEventArg);
        },
        stopResize: function (mouseEventArg) {
            this._resizeMode.rightEdge = this._resizeMode.bottomEdge = this._resizeMode.topEdge = this._resizeMode.leftEdge = false;
            this._isResizing = false;
            $j.looper.removeListener(this);
            $j.tools.events.unBind($j.doc, $j.types.mouseEvents.UP.toLowerCase(), this.docMouseUp);
            $j.tools.events.unBind($j.doc, $j.types.mouseEvents.MOVE.toLowerCase(), this.docMouseMove);
        },
        mouseMove: function (mouseEventArg) {
            var layoutRect = {}, cs, csrDefault = true, x, y;
            this._inherited();
            if (mouseEventArg) $j.mouse.getMouseInfos(mouseEventArg);
            this.removeCursors();
            if ((this.isBorderSizeable() || this.isBorderSizeToolWin()) && !this.isMaximized() && !this._isResizing) {
                if ($j.mouse.event.srcElement !== this._HTMLElement) return;
                this._resizeMode.rightEdge = this._resizeMode.bottomEdge = this._resizeMode.topEdge = this._resizeMode.leftEdge = false;
                cs = getComputedStyle(this._layout._HTMLElement);
                layoutRect.l = parseInt(cs.marginLeft, 10) + this._cssBorder.left;
                layoutRect.t = parseInt(cs.marginTop, 10) + this._cssBorder.top;
                layoutRect.r = parseInt(cs.marginRight, 10) + this._cssBorder.right;
                layoutRect.b = parseInt(cs.marginBottom, 10) + this._cssBorder.bottom;
                cs = this._HTMLElement.getBoundingClientRect();
                x = $j.mouse.window.x - cs.left;
                y = $j.mouse.window.y - cs.top;
                this._resizeMode.topEdge = y < layoutRect.l;
                this._resizeMode.leftEdge = x < layoutRect.t;
                this._resizeMode.rightEdge = x >= cs.width - layoutRect.r;
                this._resizeMode.bottomEdge = y >= cs.height - layoutRect.b;
                if (this._resizeMode.rightEdge || this._resizeMode.bottomEdge || this._resizeMode.topEdge || this._resizeMode.leftEdge) csrDefault = false;
                if (this._resizeMode.rightEdge && this._resizeMode.bottomEdge || this._resizeMode.leftEdge && this._resizeMode.topEdge) $j.CSS.addClass(this._HTMLElement, $j.types.customCursors.NWRESIZE);
                else if (this._resizeMode.rightEdge && this._resizeMode.topEdge || this._resizeMode.leftEdge && this._resizeMode.bottomEdge) $j.CSS.addClass(this._HTMLElement, $j.types.customCursors.NERESIZE);
                else if (this._resizeMode.rightEdge || this._resizeMode.leftEdge) $j.CSS.addClass(this._HTMLElement, $j.types.customCursors.ERESIZE);
                else if (this._resizeMode.topEdge || this._resizeMode.bottomEdge) $j.CSS.addClass(this._HTMLElement, $j.types.customCursors.NRESIZE);
            }
            if (csrDefault) $j.CSS.addClass(this._HTMLElement, $j.types.customCursors.DEFAULT);
            if (this._isResizing) {
                this.docMouseMove(mouseEventArg);
            }
        },
        docMouseMove: function (mouseEventArg) {
            var p = new $j.classes.Point($j.mouse.document.x, $j.mouse.document.y), decOff = {}, resizeWindow;
            if (mouseEventArg) $j.mouse.getMouseInfos(mouseEventArg);
            resizeWindow = $j.resizeWindow;
            if (!resizeWindow) return;
            if (!resizeWindow._isResizing) return;
            decOff.x = $j.abs(resizeWindow._savedSizePos.x - p.x);
            decOff.y = $j.abs(resizeWindow._savedSizePos.y - p.y);
            if (decOff.x !== 0 || decOff.y !== 0) {
                if (p.x < 0) p.x = 0;
                if (p.y < 0) p.y = 0;
                resizeWindow._savedSizePos.x = p.x;
                resizeWindow._savedSizePos.y = p.y;
            }
        },
        mouseWheel: function () {
            //var p,obj,frm=this.form;
            //if (!frm.hasHitTest()) return;
            //$j.mouse.getMouseInfos(mouseEventArg);
            //p=$j.classes.Point.create($j.mouse.target.x,$j.mouse.target.y);
            //obj=frm.objectByPoint(p,$j.types.mouseEvents.WHEEL);
            //if (obj===frm) obj=null;
            //if(obj!==null){
            //  if(obj.enabled){
            //    p=obj.screenToClient(p);
            //    obj.mouseWheel($j.mouse.wheelDir,$j.mouse.wheelDelta,$j.mouse.button,p);
            //  }
            //}
            //$j.mouse.stopEvent(mouseEventArg);
            //obj=p=null;
        },
        mouseLeave: function (mouseEventArg) {
            this.removeCursors();
            $j.CSS.addClass(this._HTMLElement, $j.types.customCursors.DEFAULT);
        },
        removeCursors: function () {
            $j.CSS.removeClass(this._HTMLElement, $j.types.customCursors.DEFAULT);
            $j.CSS.removeClass(this._HTMLElement, $j.types.customCursors.NRESIZE);
            $j.CSS.removeClass(this._HTMLElement, $j.types.customCursors.ERESIZE);
            $j.CSS.removeClass(this._HTMLElement, $j.types.customCursors.NWRESIZE);
            $j.CSS.removeClass(this._HTMLElement, $j.types.customCursors.NERESIZE);
        },
        keyDown: function () {
            switch ($j.keyboard.keyCode) {
                case $j.types.VKeysCodes.VK_TAB:
                    if ($j.keyboard.shift) this.prevFocusedCtrl();
                    else this.nextFocusedCtrl();
                    break;
                default:
                    $j.keyboard.stopEvent();
                    break;
            }
        },
        keyPress: function () {
        },
        keyUp: function () {
            //var form=$j.apps.activeApplication.activeWindow;
            //$j.keyboard.getKeyboardInfos(keyboardEventArg);
            //if (form._focusedControl!==null) form._focusedControl.keyUp(keyboardEventArg);
        },
        sortControls: function () {
            //  this._controls=this._controls.sort(function(a,b){return a._controlIdx-b._controlIdx;});
        },
        resize: function () {
            var b, x, y, layoutPos = {}, newWidth, newHeight, minWidth, minHeight;
            if (this._isResizing) {
                b = this._layout._HTMLElement.getBoundingClientRect();
                layoutPos.l = this._layout._HTMLElement.offsetLeft + this._cssBorder.left;
                layoutPos.t = this._layout._HTMLElement.offsetTop + this._cssBorder.top;
                b = this._HTMLElement.getBoundingClientRect();
                x = this._savedSizePos.x - b.left;
                y = this._savedSizePos.y - b.top;
                if (this._resizeMode.rightEdge && x > 0) this._layout._HTMLElementStyle.width = x + $j.types.CSSUnits.PX;
                if (this._resizeMode.bottomEdge && y > 0) this._layout._HTMLElementStyle.height = y + $j.types.CSSUnits.PX;

                if (this._resizeMode.leftEdge) {
                    newWidth = this._layout._HTMLElement.offsetWidth - x;
                    minWidth = parseInt(getComputedStyle(this._layout._HTMLElement).minWidth, 10);
                    if (newWidth > minWidth && this._savedSizePos.x > 0) {
                        this._layout._HTMLElementStyle.width = newWidth + $j.types.CSSUnits.PX;
                        this._HTMLElementStyle.left = this._savedSizePos.x + $j.types.CSSUnits.PX;
                    }
                }
                if (this._resizeMode.topEdge) {
                    newHeight = this._layout._HTMLElement.offsetHeight - y;
                    minHeight = parseInt(getComputedStyle(this._layout._HTMLElement).minHeight, 10);
                    if (newHeight > minHeight && this._savedSizePos.y > 0) {
                        this._layout._HTMLElementStyle.height = newHeight + $j.types.CSSUnits.PX;
                        this._HTMLElementStyle.top = this._savedSizePos.y + $j.types.CSSUnits.PX;
                    }
                }
            }
        },
        addCSSClass: function () {
            var str = $j.classes.ThemedControl.prototype.addCSSClass.apply(this, []);
            str = $j.tools.text.replace(str, this._ClassName, "Window");
            return str;
        },
        getChildsHTMLElement: function () {
            var nodes, dataName, obj, i, l, dataClass, contentTop = 0, contentBottom = 0, props;
            this._layout = $j.classes.createComponent($j.classes.Layout, this, null, { _inForm: false }, false);
            this._layout.getHTMLElement(this._HTMLElement.firstElementChild.id);
            this._layout.updateFromHTML();
            nodes = this._layout._HTMLElement.childNodes;
            for (i = 0, l = nodes.length; i < l; i++) {
                if (nodes[i].nodeType === $j.types.xmlNodeTypes.ELEMENT_NODE) {
                    dataClass = nodes[i].dataset.class;
                    dataName = nodes[i].dataset.name;
                    if (dataClass) {
                        props = {};
                        if (($j.classes[dataClass] === $j.classes.WindowTitleBar) ||
                            ($j.classes[dataClass] === $j.classes.WindowContent)) props = { _inForm: false };
                        obj = $j.classes.createComponent($j.classes[dataClass], this._layout, dataName, props, false);
                        obj.getHTMLElement(nodes[i].id);
                        switch (dataClass) {
                            case "WindowTitleBar":
                                this._titleBar = obj;
                                if (this.borderStyle === $j.types.borderStyles.NONE) {
                                    this._titleBar.setDisplay($j.types.displays.NONE);
                                    this._titleBar._inForm = false;
                                }// else contentTop+=obj._HTMLElement.offsetHeight+parseInt(getComputedStyle(obj._HTMLElement).marginBottom,10);
                                break;
                            case "WindowContent":
                                this._content = obj;
                                this._content.isForm = false;
                                break;
                            case "MainMenu":
                                this.mainMenu = obj;
                                //contentTop+=obj._HTMLElement.offsetHeight;
                                break;
                            case "ToolBar":
                            case "ToolBarContainer":
                                this._toolBars.push(obj);
                                //obj._HTMLElement.style[$j.types.jsCSSProperties.TOP]=contentTop+$j.types.CSSUnits.PX;
                                //contentTop+=obj._HTMLElement.offsetHeight;
                                break;
                            case "StatusBar":
                                this._statusBars.push(obj);
                                //if (!this._statusBar)) this._statusBar=obj;
                                //else $j.CSS.addClass(obj._HTMLElement,"hidden");
                                //obj._HTMLElement.style[$j.types.jsCSSProperties.BOTTOM]=contentBottom+$j.types.CSSUnits.PX;
                                //contentBottom+=obj._HTMLElement.offsetHeight;
                                break;
                        }
                        obj.updateFromHTML();
                        obj.getChildsHTMLElement();
                    }
                }
            }
            //this.resizeContent();
        },
        formCreated: function (id) {
            this.getHTMLElement(id);
            this.updateFromHTML();
            this.getChildsHTMLElement();
            if (this.addListeners) this.addListeners();
            if (this._isChildWindow) {
                this._parentHTML.appendChild(this._HTMLElement);
                this.maximize();
                this.desactiveHitTest();
            }
            //this.loaded();
        },
        updateFromHTML: function () {
            this._inherited();
            if (this._HTMLElement.dataset.borderstyle) this.borderStyle = this._HTMLElement.dataset.borderstyle;
            if (this._HTMLElement.dataset.windowstate) this.windowState = this._HTMLElement.dataset.windowstate;
            if (this._HTMLElement.dataset.clientwidth) this._clientWidth = ~~this._HTMLElement.dataset.clientwidth;
            if (this._HTMLElement.dataset.clientheight) this._clientHeight = ~~this._HTMLElement.dataset.clientheight;
            if (this._HTMLElement.dataset.borderstype) this.bordersType = this._HTMLElement.dataset.borderstype;
            if (this._HTMLElement.dataset.position) this.position = this._HTMLElement.dataset.position;
            if (this._HTMLElement.dataset.showingmode) this.showingMode = this._HTMLElement.dataset.showingmode;
            if (this._HTMLElement.dataset.animated) this.animated = _conv.strToBool(this._HTMLElement.dataset.animated);
            if (this._HTMLElement.dataset.icon) this.icon = this._HTMLElement.dataset.icon;
            this.bindEventToHTML("onClose");
            this.bindEventToHTML("onCloseQuery");
            this.bindEventToHTML("onActivate");
            this.bindEventToHTML("onDeactivate");
            this.bindEventToHTML("onHide");
            this.bindEventToHTML("onShow");
            this.bindEventToHTML("onCreate");
            this.bindEventToHTML("onThemeChanged");
        },
        loaded: function () {
            if (!this.isMaximized()) {
                if (this._clientWidth > 0) this._layout._HTMLElementStyle.width = this._clientWidth + $j.types.CSSUnits.PX;
                if (this._clientHeight > 0) this._layout._HTMLElementStyle.height = this._clientHeight + $j.types.CSSUnits.PX;
            }
            this._inherited();
            this._creating = false;
            for (var i = 0, l = this._content._components.length; i < l; i++) {
                var comp = this._content._components[i];
                if (comp instanceof $j.classes.Control) {
                    if (comp.visible && comp.canFocused && comp.isEnabled()) {
                        comp.setFocus();
                        break;
                    }
                }
            }
        },
        closePopups: function () {
            var popupMenu, i, l;
            if (this._popups) {
                if (this._popups.length > 0) {
                    for (var i = this._popups.length - 1; i >= 0; i--) {
                        if (this._popups[i]._control instanceof $j.classes.MenuItem) {
                            this._popups[i]._control.closeSubMenu();
                        } else if (this._popups[i]._control) {
                            if (this._popups[i]._control._dropDownPopup instanceof $j.classes.PopupBox) {
                                this._popups[i]._control.destroyPopup();
                                this._popups[i]._control = null;
                            }
                        }
                        if (this._popups[i]) {
                            if (this._popups[i]._owner instanceof $j.classes.PopupMenu) this._popups[i]._owner.close();
                            this._popups[i] = null;
                        }
                    }
                }
                this._popups.clear();
            }
            if (this.mainMenu) {
                for (i = 0, l = this.mainMenu.items.length; i < l; i++) {
                    this.mainMenu.items[i].setActive(false);
                }
                //$j.CSS.removeClass(this.mainMenu._HTMLElement,"isactive
                this.mainMenu._HTMLElement.dataset.isactive = false;
            }
        },
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{appName}");
            html = a.join(this.app.name);
            a = html.split("{internalId_Layout}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_content}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_TitleBar}");
            html = a.join(String.uniqueId());
            //a=html.split("{internalId_Icon}");
            //html=a.join(String.uniqueId());
            a = html.split("{internalId_Title}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_CloseButton}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_MaxRestoreButton}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_MinimizeButton}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_HelpButton}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_RollUpDownButton}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_StayOnOffButton}");
            html = a.join(String.uniqueId());
            return html;
        },
        removeToHTML: function () {
            $j.doc.body.removeChild(this._HTMLElement);
        },
        moveTo: function (x, y) {
            if (typeof x !== _const.NUMBER) return;
            if (typeof y !== _const.NUMBER) return;
            if (x + this._HTMLElement.offsetWidth < 0) x = 0;
            if (y + this._HTMLElement.offsetHeight < 0) y = 0;
            if (x > $j.doc.body.offsetWidth) x = $j.doc.body.offsetWidth - this._HTMLElement.offsetWidth;
            if (y > $j.doc.body.offsetHeight) y = $j.doc.body.offsetHeight - this._HTMLElement.offsetHeight - 10;
            this.setLeft(x);
            this.setTop(y);
        },
        center: function () {
            var l, t;
            if ($j.tools.HTMLParentElement) {
                l = ~~(($j.tools.HTMLParentElement.offsetWidth - this._HTMLElement.offsetWidth) / 2);
                t = ~~(($j.tools.HTMLParentElement.offsetHeight - this._HTMLElement.offsetHeight) / 2);
            } else {
                l = ~~(($j.doc.body.offsetWidth - this._HTMLElement.offsetWidth) / 2);
                t = ~~(($j.doc.body.offsetHeight - this._HTMLElement.offsetHeight) / 2);
            }
            this._HTMLElementStyle.left = l + $j.types.CSSUnits.PX;
            this._HTMLElementStyle.top = t + $j.types.CSSUnits.PX;
        },
        createSnapArea: function (_snapArea) {
            var snapArea = $j.doc.getElementById("snapArea"), snapAreaStyle;
            if (!snapArea) {
                snapArea = $j.doc.createElement("div");
                snapArea.id = "snapArea";
                $j.doc.body.appendChild(snapArea);
            } else {
                snapArea.className = String.EMPTY;
            }
            snapAreaStyle = snapArea.style;
            snapAreaStyle.zIndex = ~~this._HTMLElementStyle.zIndex - 1;
            this._snapArea = _snapArea;
            switch (_snapArea) {
                case $j.types.snapAreas.TOP:
                    break;
                case $j.types.snapAreas.LEFT:
                    snapAreaStyle.left = "0";
                    snapAreaStyle.top = "50%";
                    snapAreaStyle.right = "100%";
                    snapAreaStyle.bottom = "50%";
                    break;
                case $j.types.snapAreas.RIGHT:
                    snapAreaStyle.left = "100%";
                    snapAreaStyle.top = "50%";
                    snapAreaStyle.right = "0";
                    snapAreaStyle.bottom = "50%";
                    break;
            }
            setTimeout(function () { var sa = $j.doc.getElementById("snapArea"); $j.CSS.addClass(sa, $j.apps.activeApplication.activeWindow._snapArea); }, 0);
        },
        destroySnapArea: function () {
            var snapArea = $j.doc.getElementById("snapArea");
            if (snapArea) $j.doc.body.removeChild(snapArea);
        },
        restoreWindow: function () {
            if ($j.CSS.containsClass(this._HTMLElement, $j.types.windowStates.SNAPED)) {
                this._layout._HTMLElementStyle.width = this._savedSizePos.width + $j.types.CSSUnits.PX;
                this._layout._HTMLElementStyle.height = this._savedSizePos.height + $j.types.CSSUnits.PX;
                this._HTMLElementStyle.right = String.EMPTY;
                this._HTMLElementStyle.bottom = String.EMPTY;
                this._HTMLElementStyle.width = "auto";
                this._HTMLElementStyle.height = "auto";
                this.windowState = $j.types.windowStates.NORMAL;
                this._snapArea = $j.types.snapAreas.NONE
                $j.CSS.removeClass(this._HTMLElement, $j.types.windowStates.SNAPED);
            }
        },
        destroy: function () {
            var scripts, styles;
            scripts = $j.doc.head.getElementsByTagName("script");
            for (var i = scripts.length - 1; i >= 0; i--) {
                if (scripts[i].src.indexOf(this._ClassName.toLowerCase()) > -1) {
                    $j.doc.head.removeChild(scripts[i]);
                    break;
                }
            }
            styles = $j.doc.head.getElementsByTagName("link");
            for (var i = styles.length - 1; i >= 0; i--) {
                if (styles[i].href.indexOf(this._ClassName.toLowerCase()) > -1) {
                    $j.doc.head.removeChild(styles[i]);
                    break;
                }
            }
            if (this.app._windows.last() === this && this.app._windows.length === 1) {
                this.app.terminate();
                return;
            }
            this.app._windows.remove(this);
            this._inherited();
            this._resizeMode.leftEdge = null;
            this._resizeMode.topEdge = null;
            this._resizeMode.rightEdge = null;
            this._resizeMode.bottomEdge = null;
            this._resizeMode = null;
            this._savedSizePos = null;
            this._isModal = null;
            this._creating = null;
            //this._controls=[];
            this._layout = null;
            this._titleBar = null;
            this._content = null;
            this._titleBarObj = {};
            this._firstShow = null;
            this._controlsToResize = [];
            this._focusedControl = null;
            this._hoveredControl = null;
            this._capturedControl = null;
            this._lastSelectedMenuItem = null;
            this._popups.destroy();
            this._popups = null;
            this._clientWidth = null;
            this._clientHeight = null;
            this._toolBars.destroy();
            this._toolBars = null;
            this._statusBars.destroy();
            this._statusBars = null;
            this._isResizing = null;
            this._snapArea = null;
            this.onActivate.destroy();
            this.onActivate = null;
            this.onDeactivate.destroy();
            this.onDeactivate = null;
            this.onHide.destroy();
            this.onHide = null;
            this.onShow.destroy();
            this.onShow = null;
            this.onCreate.destroy();
            this.onCreate = null;
            this.onClose.destroy();
            this.onClose = null;
            this.onCloseQuery.destroy();
            this.onCloseQuery = null;
            this.onThemeChanged.destroy();
            this.onThemeChanged = null;
            this.position = null;
            this.formState = null;
            this.windowState = null;
            this.keyPreview = null;
            this.icon = null;
            this.mainMenu = null;
            this.borderStyle = null;
            this.activeControl = null;
            this.visible = null;
            this.bordersType = null;
            this.modalResult = null;
        },
        desactiveHitTest: function () {
            this._content.setHitTest(false);
            this._layout.setHitTest(false);
            this._titleBar.setHitTest(false);
            //$j.CSS.removeClass(this._HTMLElement,"isactive");
            this._HTMLElement.dataset.isactive = false;
        }
        /*nextFocusedCtrl:function() {
          var curTabOrder=-1,obj,tabList,canFocusedCtrls;
          if (this._focusedControl)) {
            curTabOrder=this._focusedControl.tabOrder;
            curTabOrder++;
            tabList=this._focusedControl._owner._tabList;
            if (curTabOrder>tabList.length-1) curTabOrder=0;
            canFocusedCtrls=tabList.filter(function(e,i,a) {
              return (e.canFocused&&e.visible&&e.isEnabled()&&e.tabStop&&e.tabOrder>=curTabOrder);
            });
            if (canFocusedCtrls.isEmpty()) tabList.first().setFocus();
            else canFocusedCtrls.first().setFocus();
            //obj=tabList[curTabOrder];
            //while (!obj.canFocused||!obj.visible||!obj.isEnabled()||!obj.tabStop) {
            //  curTabOrder++;
            //  if (curTabOrder>tabList.length-1) curTabOrder=0;
            //  if (this._focusedControl.tabOrder===curTabOrder) break;
            //  obj=tabList[curTabOrder];
            //}
            //tabList[curTabOrder].setFocus();
            console.log(this._focusedControl._ClassName);
            //this._lastTabOrder=this._focusedControl.tabOrder;
          }
        },
        prevFocusedCtrl:function() {
          var curTabOrder=0,obj;
          if (this._focusedControl)) curTabOrder=this._focusedControl.tabOrder;
          curTabOrder++;
        }*/
        //#endregion
    });
    //#endregion
    //#region Window
    var Window = BaseWindow.extend("Window", {});
    //#endregion
    //#region MessageDlg
    var MessageDlg = Window.extend("MessageDlg", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //this.dlgType=$j.types.messageTypes.CUSTOM;
                $j.tools.addPropertyFromSet(this, "dlgType", $j.types.messageTypes, $j.types.messageTypes.CUSTOM);
                this.buttons = [];
                if (props.dlgType) this.dlgType = props.dlgType;
                if (props.buttons) this.buttons = props.buttons;
                this._destroyOnHide = true;
            }
        },
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{internalId_msg}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_img}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_btnCont}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_btnYes}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_btnNo}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_btnOk}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_btnCancel}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_btnAbort}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_btnRetry}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_btnIgnore}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_btnAll}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_btnNoToAll}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_btnYesToAll}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_btnHelp}");
            html = a.join(String.uniqueId());
            return html;
        },
        resizeByContent: function () {
            var msgW = this.Msg._HTMLElement.offsetWidth, msgH = this.Msg._HTMLElement.offsetHeight, titleH = this._titleBar._HTMLElement.offsetHeight, nW, nH, lW = 0, lH = this.Msg_layout._HTMLElement.offsetHeight, lastBtnLeft = 0, nbBtns = 0;
            if (this.dlgType !== $j.types.messageTypes.CUSTOM) {
                this.Msg_icon.setVisible(true);
                this.Msg.setLeft(58);
            } else {
                this.Msg.setLeft(12);
                this.Msg_icon.setVisible(false);
            }
            //this.Msg_icon.load(_const.PIX);
            switch (this.dlgType) {
                case $j.types.messageTypes.CUSTOM:
                    //this.Msg_icon.load(_const.PIX);
                    break;
                case $j.types.messageTypes.WARNING:
                    //this.Msg_icon.load(_const.WARNING_ICO);
                    $j.CSS.addClass(this.Msg_icon._HTMLElement, _const.WARNING_CSS);
                    break;
                case $j.types.messageTypes.ERROR:
                    //this.Msg_icon.load(_const.ERROR_ICO);
                    $j.CSS.addClass(this.Msg_icon._HTMLElement, _const.ERROR_CSS);
                    break;
                case $j.types.messageTypes.INFORMATION:
                    //this.Msg_icon.load(_const.INFORMATION_ICO);
                    $j.CSS.addClass(this.Msg_icon._HTMLElement, _const.INFORMATION_CSS);
                    break;
                case $j.types.messageTypes.CONFIRMATION:
                    //this.Msg_icon.load(_const.CONFIRMATION_ICO);
                    $j.CSS.addClass(this.Msg_icon._HTMLElement, _const.CONFIRMATION_CSS);
                    break;
            }
            if (this.buttons.indexOf($j.types.messageButtons.YES) > -1) {
                this.btnYes.setVisible(true);
                this.btnYes.setLeft(lastBtnLeft);
                lW += this.btnYes._HTMLElement.offsetWidth;
                lastBtnLeft += this.btnYes._HTMLElement.offsetWidth + 6;
                nbBtns++;
            }
            if (this.buttons.indexOf($j.types.messageButtons.NO) > -1) {
                this.btnNo.setVisible(true);
                this.btnNo.setLeft(lastBtnLeft);
                lW += this.btnNo._HTMLElement.offsetWidth;
                lastBtnLeft += this.btnNo._HTMLElement.offsetWidth + 6;
                nbBtns++;
            }
            if (this.buttons.indexOf($j.types.messageButtons.OK) > -1) {
                this.btnOk.setVisible(true);
                this.btnOk.setLeft(lastBtnLeft);
                lW += this.btnOk._HTMLElement.offsetWidth;
                lastBtnLeft += this.btnOk._HTMLElement.offsetWidth + 6;
                nbBtns++;
            }
            if (this.buttons.indexOf($j.types.messageButtons.CANCEL) > -1) {
                this.btnCancel.setVisible(true);
                this.btnCancel.setLeft(lastBtnLeft);
                lW += this.btnCancel._HTMLElement.offsetWidth;
                lastBtnLeft += this.btnCancel._HTMLElement.offsetWidth + 6;
                nbBtns++;
            }
            if (this.buttons.indexOf($j.types.messageButtons.ABORT) > -1) {
                this.btnAbort.setVisible(true);
                this.btnAbort.setLeft(lastBtnLeft);
                lW += this.btnAbort._HTMLElement.offsetWidth;
                lastBtnLeft += this.btnAbort._HTMLElement.offsetWidth + 6;
                nbBtns++;
            }
            if (this.buttons.indexOf($j.types.messageButtons.RETRY) > -1) {
                this.btnRetry.setVisible(true);
                this.btnRetry.setLeft(lastBtnLeft);
                lW += this.btnRetry._HTMLElement.offsetWidth;
                lastBtnLeft += this.btnRetry._HTMLElement.offsetWidth + 6;
                nbBtns++;
            }
            if (this.buttons.indexOf($j.types.messageButtons.IGNORE) > -1) {
                this.btnIgnore.setVisible(true);
                this.btnIgnore.setLeft(lastBtnLeft);
                lW += this.btnIgnore._HTMLElement.offsetWidth;
                lastBtnLeft += this.btnIgnore._HTMLElement.offsetWidth + 6;
                nbBtns++;
            }
            if (this.buttons.indexOf($j.types.messageButtons.ALL) > -1) {
                this.btnAll.setVisible(true);
                this.btnAll.setLeft(lastBtnLeft);
                lW += this.btnAll._HTMLElement.offsetWidth;
                lastBtnLeft += this.btnAll._HTMLElement.offsetWidth + 6;
                nbBtns++;
            }
            if (this.buttons.indexOf($j.types.messageButtons.NOTOALL) > -1) {
                this.btnNoToAll.setVisible(true);
                this.btnNoToAll.setLeft(lastBtnLeft);
                lW += this.btnNoToAll._HTMLElement.offsetWidth;
                lastBtnLeft += this.btnNoToAll._HTMLElement.offsetWidth + 6;
                nbBtns++;
            }
            if (this.buttons.indexOf($j.types.messageButtons.YESTOALL) > -1) {
                this.btnYesToAll.setVisible(true);
                this.btnYesToAll.setLeft(lastBtnLeft);
                lW += this.btnYesToAll._HTMLElement.offsetWidth;
                lastBtnLeft += this.btnYesToAll._HTMLElement.offsetWidth + 6;
                nbBtns++;
            }
            if (this.buttons.indexOf($j.types.messageButtons.HELP) > -1) {
                this.btnHelp.setVisible(true);
                this.btnHelp.setLeft(lastBtnLeft);
                lW += this.btnHelp._HTMLElement.offsetWidth;
                lastBtnLeft += this.btnHelp._HTMLElement.offsetWidth + 6;
                nbBtns++;
            }
            lW += ((nbBtns - 1) * 6);
            if (this.dlgType !== $j.types.messageTypes.CUSTOM) {
                if (msgW + this.Msg_icon._HTMLElement.offsetWidth + 14 < lW) nW = lW + 24;
                else nW = 12 + this.Msg_icon._HTMLElement.offsetWidth + 12 + msgW + 12;
            } else if (msgW < lW) nW = lW + 24;
            else nW = msgW + 10;
            this.Msg_layout.setWidth(lW);
            nH = titleH + 13 + msgH + ((msgH < 32) ? (32 - msgH) : 0) + 13 + lH + 13;
            nW += parseInt(getComputedStyle(this._layout._HTMLElement).marginLeft, 10) + parseInt(getComputedStyle(this._layout._HTMLElement).marginRight, 10);
            if (nW > $j.doc.body.offsetWidth) nW = $j.doc.body.offsetWidth - 20;
            if (nH > $j.doc.body.offsetHeight) nH = $j.doc.body.offsetHeight - 20;
            this.setWidth(nW);
            this.setHeight(nH);
        },
        getChildsHTMLElement: function () {
            this._inherited();
            this.loaded();
        }
    });
    //#endregion
    //#region InputDlg
    var InputDlg = Window.extend("InputDlg", {
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{internalId_msg}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_btnCont}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_btnOk}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_btnCancel}");
            html = a.join(String.uniqueId());
            a = html.split("{internalId_input}");
            html = a.join(String.uniqueId());
            return html;
        },
        resizeByContent: function () {
            var msgW = this.Msg._HTMLElement.offsetWidth, msgH = this.Msg._HTMLElement.offsetHeight, titleH = this._titleBar._HTMLElement.offsetHeight, nW, nH, lW = 0, lH = this.Msg_layout._HTMLElement.offsetHeight, lastBtnLeft = 0, nbBtns = 0;
            this.btnOk.setLeft(lastBtnLeft);
            lW += this.btnOk._HTMLElement.offsetWidth;
            lastBtnLeft += this.btnOk._HTMLElement.offsetWidth + 6;
            nbBtns++;
            this.btnCancel.setLeft(lastBtnLeft);
            lW += this.btnCancel._HTMLElement.offsetWidth;
            lastBtnLeft += this.btnCancel._HTMLElement.offsetWidth + 6;
            nbBtns++;
            lW += 6;
            if (msgW < lW) nW = lW + 24;
            else nW = msgW + 10;
            this.Msg_layout.setWidth(lW);
            this.TextBox.setTop(this.Msg._HTMLElement.offsetTop + msgH + 5);
            this.TextBox.setFocus();
            nH = titleH + 13 + msgH + 5 + this.TextBox._HTMLElement.offsetHeight + 13 + lH + 13;
            nW += parseInt(getComputedStyle(this._layout._HTMLElement).marginLeft, 10) + parseInt(getComputedStyle(this._layout._HTMLElement).marginRight, 10);
            if (nW > $j.doc.body.offsetWidth) nW = $j.doc.body.offsetWidth - 20;
            if (nH > $j.doc.body.offsetHeight) nH = $j.doc.body.offsetHeight - 20;
            this.setWidth(nW);
            this.setHeight(nH);
        },
        getText: function () {
            return this.TextBox.getText();
        }
        /*getChildsHTMLElement:function() {
          this._inherited();
          this.loaded();
        }*/
    });
    //#endregion
    //#region dialogs
    $j.dialogs = {
        messageDlgPos: function (msg, dlgType, buttons, x, y, defaultButton) {
            var dlg = $j.classes.createComponent($j.classes.MessageDlg, $j.apps.activeApplication, null, { "parentHTML": $j.doc.body, "dlgType": dlgType, "buttons": buttons });
            dlg.loaded();
            dlg.Msg.setCaption(msg);
            dlg.setCaption($j.apps.activeApplication.name);
            dlg.resizeByContent();
            if (x === -1 && y === -1) dlg.center();
            else dlg.moveTo(x, y);
            dlg.showModal();
            return dlg;
        },
        showMessage: function (msg) {
            return $j.dialogs.showMessagePos(msg, -1, -1);
        },
        messageBox: function (msg) { return $j.dialogs.showMessage(msg); },
        alert: function (msg) { return $j.dialogs.showMessage(msg); },
        showMessagePos: function (msg, x, y) {
            return $j.dialogs.messageDlgPos(msg, $j.types.messageTypes.CUSTOM, [$j.types.messageButtons.OK],/*0,*/(!x ? -1 : x), (!y ? -1 : y));
        },
        messageDlg: function (msg, dlgType, buttons, defaultButton) {
            return $j.dialogs.messageDlgPos(msg, dlgType, buttons,/*helpCtx,*/ -1, -1, defaultButton);
        },
        warning: function (msg, buttons) {
            return $j.dialogs.messageDlgPos(msg, $j.types.messageTypes.WARNING, (buttons ? buttons : [$j.types.messageButtons.OK]), -1, -1);
        },
        information: function (msg, buttons) {
            return $j.dialogs.messageDlgPos(msg, $j.types.messageTypes.INFORMATION, (buttons ? buttons : _const.BTNS_YESNO), -1, -1);
        },
        error: function (msg, buttons) {
            return $j.dialogs.messageDlgPos(msg, $j.types.messageTypes.ERROR, (buttons ? buttons : $j.types.messageButtons.OK), -1, -1);
        },
        confirmation: function (msg, buttons) {
            return $j.dialogs.messageDlgPos(msg, $j.types.messageTypes.CONFIRMATION, (buttons ? buttons : _const.BTNS_OKCANCEL), -1, -1);
        },
        confirm: function (msg, buttons) {
            return $j.dialogs.confirmation(msg, buttons);
        },
        prompt: function (caption, prompt, value) {
            var inputDlg = $j.classes.createComponent($j.classes.InputDlg, $j.apps.activeApplication, null, { "parentHTML": $j.doc.body }, true);
            inputDlg.loaded();
            inputDlg.Msg.setCaption(prompt);
            inputDlg.TextBox.setText(value);
            inputDlg.setCaption(caption);
            inputDlg.resizeByContent();
            inputDlg.center();
            inputDlg.showModal();
            return inputDlg;
        },
        inputQuery: function (caption, prompt, value) {
            return $j.dialogs.prompt(caption, prompt, value);
        }
    };
    //#endregion
    $j.classes.register($j.types.categories.CONTAINERS, Window);
    $j.classes.register($j.types.internalCategories.INTERNAL, WindowTitleBar, WindowContent, BaseWindow, MessageDlg, InputDlg);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var WindowTitleBarTpl = "<div id='{internalId_TitleBar}' data-class='WindowTitleBar' class='Control WindowTitleBar {theme}'>\
                           <div id='{internalId_Title}' data-class='CaptionControl' class='Control CaptionControl WindowTitle logo WindowIcon {theme}'>{title}</div>\
                           <button id='{internalId_CloseButton}' data-class='WindowCloseButton' class='Control WindowTitleButton WindowCloseButton {theme}'></button>\
                           <button id='{internalId_MaxRestoreButton}' data-class='WindowMaxRestoreButton' class='Control WindowTitleButton WindowMaxRestoreButton {theme}' data-isrestore='false'></button>\
                           <button id='{internalId_MinimizeButton}' data-class='WindowMinimizeButton' class='Control WindowTitleButton WindowMinimizeButton {theme}'></button>\
                           <button id='{internalId_HelpButton}' data-class='WindowHelpButton' class='Control WindowTitleButton WindowHelpButton hidden {theme}'></button>\
                           <button id='{internalId_RollUpDownButton}' data-class='WindowRollUpDownButton' class='Control WindowTitleButton WindowRollUpDownButton hidden {theme}' data-isup='true'></button>\
                           <button id='{internalId_StayOnOffButton}' data-class='WindowStayOnOffButton' class='Control WindowTitleButton WindowStayOnOffButton hidden {theme}' data-ison='true'></button>\
                           </div>",
            WindowTpl = "<div id='{internalId}' data-name='{name}' data-class='Window' class='Control csr_default Window {theme}' data-appName='{appName}' data-visible='false'>\
                   <div id='{internalId_Layout}' data-class='Layout' class='Control Layout WindowLayout'>\
                   <div id='{internalId_content}' data-name='{windowName_content}' data-class='WindowContent' class='Control WindowContent {theme}' data-popupmenu='{popupMenu}'>"+
                WindowTitleBarTpl +
                "</div></div></div>",
            MessageDlgTpl = "<div id='{internalId}' data-name='{name}' data-class='Window' class='Control csr_default Window {theme} borderStyle-dialog' data-borderstyle='dialog' data-visible='true' data-isactive='true'>\
                       <div id='{internalId_Layout}' data-class='Layout' class='Control Layout WindowLayout'>"+
                WindowTitleBarTpl +
                "<div id='{internalId_content}' data-name='showMessage_content' data-class='WindowContent' class='Control WindowContent {theme}'>\
                       <label id='{internalId_msg}' data-name='Msg' data-class='Label' class='Control Label csr_default {theme}' style='left: 58px; top: 16px;'></label>\
                       <img id='{internalId_img}' data-class='Icon' data-name='Msg_icon' class='Control Icon {theme}' alt='' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=' draggable='false' style='left:12px;top:16px;' data-visible='false' />\
                       <div id='{internalId_btnCont}' data-class='Layout' data-name='Msg_layout' class='Control Layout horizontalCenter' style='overflow:visible;height: 24px; bottom: 5px;' data-taborder='0'>\
                       <button id='{internalId_btnYes}' data-name='btnYes' data-class='Button' class='Control Button {theme}' style='height: 22px; width: 71px;visibility:hidden;' data-modalresult='yes' data-visible='false' data-taborder='1'>Yes</button>\
                       <button id='{internalId_btnNo}' data-name='btnNo' data-class='Button' class='Control Button {theme}' style='height: 22px; width: 71px;visibility:hidden;' data-modalresult='no' data-visible='false' data-taborder='2'>No</button>\
                       <button id='{internalId_btnOk}' data-name='btnOk' data-class='Button' class='Control Button {theme}' style='height: 22px; width: 71px;visibility:hidden;' data-modalresult='ok' data-visible='false' data-taborder='3'>Ok</button>\
                       <button id='{internalId_btnCancel}' data-name='btnCancel' data-class='Button' class='Control Button {theme}' style='height: 22px; width: 71px;visibility:hidden;' data-modalresult='cancel' data-visible='false' data-taborder='4'>Cancel</button>\
                       <button id='{internalId_btnAbort}' data-name='btnAbort' data-class='Button' class='Control Button {theme}' style='height: 22px; width: 71px;visibility:hidden;' data-modalresult='abort' data-visible='false' data-taborder='5'>Abort</button>\
                       <button id='{internalId_btnRetry}' data-name='btnRetry' data-class='Button' class='Control Button {theme}' style='height: 22px; width: 71px;visibility:hidden;' data-modalresult='retry' data-visible='false' data-taborder='6'>Retry</button>\
                       <button id='{internalId_btnIgnore}' data-name='btnIgnore' data-class='Button' class='Control Button {theme}' style='height: 22px; width: 71px;visibility:hidden;' data-modalresult='ignore' data-visible='false' data-taborder='7'>Ignore</button>\
                       <button id='{internalId_btnAll}' data-name='btnAll' data-class='Button' class='Control Button {theme}' style='height: 22px; width: 71px;visibility:hidden;' data-modalresult='all' data-visible='false' data-taborder='8'>All</button>\
                       <button id='{internalId_btnNoToAll}' data-name='btnNoToAll' data-class='Button' class='Control Button {theme}' style='height: 22px; width: 71px;visibility:hidden;' data-modalresult='noToAll' data-visible='false' data-taborder='9'>No to All</button>\
                       <button id='{internalId_btnYesToAll}' data-name='btnYesToAll' data-class='Button' class='Control Button {theme}' style='height: 22px; width: 71px;visibility:hidden;' data-modalresult='yesToAll' data-visible='false' data-taborder='10'>Yes to All</button>\
                       <button id='{internalId_btnHelp}' data-name='btnHelp' data-class='Button' class='Control Button {theme}' style='height: 22px; width: 71px;visibility:hidden;' data-modalresult='help' data-visible='false' data-taborder='11'>Help</button>\
                       </div></div></div></div>",
            InputDlgTpl = "<div id='{internalId}' data-name='{name}' data-class='Window' class='Control csr_default Window {theme} borderStyle-dialog' data-borderstyle='dialog' data-visible='true' data-isactive='true'>\
                     <div id='{internalId_Layout}' data-class='Layout' class='Control Layout WindowLayout'>"+
                WindowTitleBarTpl +
                "<div id='{internalId_content}' data-name='showMessage_content' data-class='WindowContent' class='Control WindowContent {theme}'>\
                     <label id='{internalId_msg}' data-name='Msg' data-class='Label' class='Control csr_default Label' style='left: 12px; top: 12px;'></label>\
                     <div id='{internalId_input}' data-name='TextBox' data-class='TextBox' class='Control TextBox {theme}' style='left: 12px; right: 12px; height: 20px; width :auto;' data-taborder='0'>\
                     <input type='text' value='{value}' class='Control csr_text TextBoxInput {theme}' /></div>\
                     <div id='{internalId_btnCont}' data-class='Layout' data-name='Msg_layout' class='Control Layout horizontalCenter' style='height: 24px; bottom: 5px;' data-taborder='1'>\
                     <button id='{internalId_btnOk}' data-name='btnOk' data-class='Button' class='Control Button {theme}' style='height: 22px; width: 71px;' data-modalresult='ok' data-taborder='0'>Ok</button>\
                     <button id='{internalId_btnCancel}' data-name='btnCancel' data-class='Button' class='Control Button {theme}' style='height: 22px; width: 71px;' data-modalresult='cancel' data-taborder='1'>Cancel</button>\
                     </div></div></div></div>";
        $j.classes.registerTemplates([{ Class: WindowTitleBar, template: WindowTitleBarTpl }, { Class: Window, template: WindowTpl }, { Class: MessageDlg, template: MessageDlgTpl }, { Class: InputDlg, template: InputDlgTpl }]);
    }
    //#endregion
})();
//http://www.bypeople.com/round-icon-wave-css3-animation/