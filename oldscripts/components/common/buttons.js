(function () {
    //#region CustomButton final
    var CustomButton = $j.classes.CaptionControl.extend("CustomButton", {
        init: function (owner, props) {
            props = !props ? {} : props;
            var t = new Date().getTime()
            if (owner) {
                this._inherited(owner, props);
                this.addBindableProperties(["staysPressed", "repeatClick"]);
                //#region Private
                this._pressing = false;
                this._repeatTimer = null;
                //#endregion
                $j.tools.addPropertyFromSet(this, "modalResult", $j.types.modalResults, $j.types.modalResults.NONE);
                this.staysPressed = false;
                this.repeatClick = false;
                this.setHitTest(true);
                if (!$j.isHTMLRenderer()) {
                    this.width = 75;
                    this.height = 25;
                }
                this.autoCapture = true;
                this.action = null;
            }
            $j.tools.Debugger.log(arguments, this, t);
        },
        //#region Setters
        setPressing: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this._pressing !== newValue) {
                this._pressing = newValue;
                this.setIsPressed(this._pressing);
                $j.CSS.removeClass(this._HTMLElement, "pressed");
                $j.CSS.removeClass(this._textObj, "paddingDownText");
                if (this._pressing) {
                    $j.CSS.addClass(this._HTMLElement, "pressed");
                    $j.CSS.addClass(this._textObj, "paddingDownText");
                }
            }
        },
        setAction: function (newValue) {
            if (!(newValue instanceof $j.classes.Action)) return;
            if (this.action !== newValue) {
                if (this.action instanceof $j.classes.Action) this.action.unRegisterChanges(this);
                this.action = newValue;
                this.action.registerChanges(this);
                this.action.updateTarget(this);
            }
        },
        setEnabled: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (newValue !== this.enabled) {
                this.resetTimer();
                this._inherited(newValue);
            }
        },
        //#endregion
        //#region Methods
        update: function () {
            if ((this._loading || this.form._loading) && !$j.tools.Debugger.useFragment) return;
            $j.CSS.removeClass(this._HTMLElement, "stayspressed");
            if (this.staysPressed) $j.CSS.addClass(this._HTMLElement, "stayspressed");
        },
        click: function () {
            var o;
            this._inherited();
            if (this.modalResult !== $j.types.modalResults.NONE) {
                this.form.modalResult = this.modalResult;
                this.form.close();
            }
        },
        mouseDown: function () {
            if (!this.enabled) return;
            this._inherited();
            if ($j.mouse.button === $j.types.mouseButtons.LEFT) this._down();
        },
        keyDown: function () {
            this._inherited();
            if ($j.keyboard.keyCode === $j.types.VKeysCodes.VK_SPACE) this._down();
        },
        keyUp: function () {
            this._inherited();
            if ($j.keyboard.keyCode === $j.types.VKeysCodes.VK_SPACE) this._up();
        },
        _down: function () {
            if (this.staysPressed) this.setPressing(true);
            else if (this.repeatClick && this._repeatTimer === null) this._repeatTimer = setInterval(this.onTimer.bind(this), 200);
            if ($j.isHTMLRenderer()) {
                if (this instanceof $j.classes.ButtonGlyph) {
                    $j.CSS.addClass(this._textObj, "paddingDownText");
                    $j.CSS.addClass(this.glyph, "marginDownText");
                } else {
                    $j.CSS.addClass(this._HTMLElement, "buttonPaddingDownText");
                }
            }
        },
        mouseEnter: function () {
            this._inherited();
            if (this._isPressed) this._down();
        },
        mouseLeave: function () {
            this.resetTimer();
            if (!this.staysPressed) {
                this._inherited();
                this._up();
            }
        },
        mouseUp: function () {
            this.resetTimer();
            this._inherited();
            if (this.staysPressed) {
                this.setIsPressed(true);
                return;
            }
            this._up();
        },
        _up: function () {
            this.resetTimer();
            if (this instanceof $j.classes.ButtonGlyph) {
                $j.CSS.removeClass(this._textObj, "paddingDownText");
                $j.CSS.removeClass(this.glyph, "marginDownText");
            } else $j.CSS.removeClass(this._HTMLElement, "buttonPaddingDownText");
        },
        resetTimer: function () {
            clearInterval(this._repeatTimer);
            this._repeatTimer = null;
        },
        assign: function (source) {
            if (!(source instanceof $j.classes.CustomButton)) return;
            this.staysPressed = source.staysPressed;
            this._isPressed = source._isPressed;
            this.modalResult = source.modalResult;
            this.repeatClick = source.repeatClick;
        },
        onTimer: function () {
            if (this.enabled) this.mouseDown();
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.modalresult;
            if (data) this.modalResult = data;
            data = this._HTMLElement.dataset.stayspressed;
            if (data) this.staysPressed = _conv.strToBool(data);
            data = this._HTMLElement.dataset.repeatclick;
            if (data) this.repeatClick = _conv.strToBool(data);
            data = this._HTMLElement.dataset.action;
            if (data) this.action = data;
        },
        destroy: function () {
            this._inherited();
            this._pressing = null;
            this._repeatTimer = null;
            this.modalResult = null;
            this.staysPressed = null;
            this.repeatClick = null;
            if (this.action) this.action.removeTarget(this);
            this.action = null;
        },
        loaded: function () {
            this._inherited();
            this.update();
        }
        //#endregion
    });
    //#endregion
    //#region Button final
    var Button = CustomButton.extend("Button", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                this.addBindableProperties(["isDefault"]);
                this.canFocused = true;
                this.autoCapture = true;
                this.isDefault = false;
            }
        },
        //#region Setter
        setCaption: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.caption !== newValue) {
                this.caption = $j.tools.text.replace(newValue, _const.HOTKEYPREFIX, String.EMPTY);
                this._HTMLElement.innerHTML = this.caption;
            }
        },
        //#endregion
        //#region Methods
        update: function () {
            var t = new Date().getTime();
            this._inherited();
            if ($j.tools.Debugger.debug) console.log(arguments.callee.name + ":" + (new Date().getTime() - t) + "ms");
        },
        /*dialogKey: function Button_dialogKey(k,s){
          var args=arguments;
          this._inherited();
          if(this.isDefault&&(k===$j.types.VKeysCodes.VK_RETURN)){
            this.click();
            $j.keyboard.keyCode=0;
          }
          if(this.cancel&&(args[0]===$j.types.VKeysCodes.VK_ESCAPE)){
            this.click();
            $j.keyboard.keyCode=0;
          }
        },*/
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.isdefault;
            if (!data) this.isDefault = _conv.strToBool(data);
        },
        assign: function (source) {
            if (!(source instanceof $j.classes.Button)) return;
            this.isDefault = source.isDefault;
            this.cancel = source.cancel;
        }
        //#endregion
    });
    //#endregion
    //#region ButtonGlyph final
    var ButtonGlyph = CustomButton.extend("ButtonGlyph", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                this.addBindableProperties(["glyphSize", "glyphSpacing", "glyphMargin", "layout"]);
                //#region Private
                this._glyphPos = new $j.classes.Point;
                this._textObj = null;
                //#endregion
                $j.tools.addPropertyFromSet(this, "layout", $j.types.buttonLayoutGlyphs, $j.types.buttonLayoutGlyphs.LEFT);
                this.glyphSize = 32;
                this.glyphSpacing = 4;
                this.glyphMargin = 0;
                //$j.tools.addPropertyFromSet(this,"glyphWrapMode",$j.types.pathWraps,$j.types.pathWraps.ORIGINAL);
                if (!this.glyphHTMLElement) this.glyphHTMLElement = $j.types.HTMLElements.IMG;
                this.glyph = null;
                this.showCaption = true;
            }
        },
        //#region Setter
        setLayout: function (newValue) {
            if (!$j.tools.valueInSet(newValue, $j.types.buttonLayoutGlyphs)) return;
            if (this.layout !== newValue) {
                this.layout = newValue;
                if ($j.isHTMLRenderer()) {
                    if ((!this._loading && !this.form._loading) || $j.tools.Debugger.useFragment) this.update();
                }
            }
        },
        setGlyphSize: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.glyphSize !== newValue) {
                this.glyphSize = newValue;
                if ($j.isHTMLRenderer()) {
                    if ((!this._loading && !this.form._loading) || $j.tools.Debugger.useFragment) this.update();
                }
            }
        },
        setGlyphSpacing: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.glyphSpacing !== newValue) {
                this.glyphSpacing = newValue;
                if ($j.isHTMLRenderer()) {
                    if ((!this._loading && !this.form._loading) || $j.tools.Debugger.useFragment) this.update();
                }
            }
        },
        setGlyphMargin: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (!newValue instanceof $j.classes.Rect) return;
            if (this.glyphMargin !== newValue) {
                this.glyphMargin = newValue;
                if ($j.isHTMLRenderer()) {
                    if ((!this._loading && !this.form._loading) || $j.tools.Debugger.useFragment) this.update();
                }
            }
        },
        //setGlyphWrapMode: function(newValue){
        //  if (!$j.tools.valueInSet(newValue,$j.types.pathWraps)) return;
        //  if(this.glyphWrapMode!==newValue) {
        //    this.glyphWrapMode=newValue;
        //    if ($j.isHTMLRenderer()) {
        //      if ((!this._loading&&!this.form._loading)||$j.tools.Debugger.useFragment) this.update();
        //    }
        //  }
        //},
        setWidth: function (newValue) {
            this._inherited(newValue);
            if ((!this._loading && !this.form._loading) || $j.tools.Debugger.useFragment) this.update();
        },
        setHeight: function (newValue) {
            this._inherited(newValue);
            if ((!this._loading && !this.form._loading) || $j.tools.Debugger.useFragment) this.update();
        },
        setShowCaption: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.showCaption !== newValue) {
                this.showCaption = newValue;
                this.update();
            }
        },
        //#endregion
        //#region Methods
        //calcButtonLayout: function(){
        //  var textPos=new $j.classes.Point,textSize=new $j.classes.Point,totalSize=new $j.classes.Point,clientSize,tw,th,txt=this.caption,
        //      spacing=this.glyphSpacing,margin=this.glyphPadding,textBounds=new $j.classes.Rect,glyphSize=this.glyphSize;
        //  if (this.glyph instanceof $j.classes.PathData) {
        //    if (this.glyph.empty) glyphSize=0;
        //  }
        //  if (this.glyphHTMLElement===$j.types.HTMLElements.IMG) {
        //    if (this.src===String.EMPTY) glyphSize=0;
        //    else glyphSize=this.glyph.offsetWidth;
        //  }
        //  if (!this.showCaption) txt=String.EMPTY;
        //  // calculate the item sizes
        //  clientSize=new $j.classes.Point(this._HTMLElement.clientWidth,this._HTMLElement.clientHeight);
        //  if (txt.length>0){
        //    textBounds.setValues(0,0,this._HTMLElement.clientWidth,0);
        //    if (!$j.isHTMLRenderer()) {
        //      this.ctx.prepareText(this,textBounds,true);
        //      textSize.setValues(textBounds.width+1,textBounds.height+1);
        //    } else {
        //      tw=this._textObj.offsetWidth;
        //      th=this._textObj.offsetHeight;
        //      if (!this._textObj)||(tw===0&&th===0)) {
        //        var txtSizes=$j.tools.text.getTextSizes(txt,this._ClassName,this._textObj);
        //        textSize.setValues(txtSizes.w,txtSizes.h);
        //      } else textSize.setValues(tw,th);
        //    }
        //  } else {
        //    textBounds.setValues(0,0,0,0);
        //    textSize.setValues(0,0);
        //  }
        //  //If the layout has the glyph on the right or the left, then both the
        //  //text and the glyph are centered vertically.  If the glyph is on the top
        //  //or the bottom, then both the text and the glyph are centered horizontally.
        //  if ([$j.types.buttonLayoutGlyphs.LEFT,$j.types.buttonLayoutGlyphs.RIGHT].indexOf(this.layout)>-1){
        //    this._glyphPos.y=~~((clientSize.y-glyphSize+1)/2);
        //    if (this.showCaption) textPos.y=~~((clientSize.y-textSize.y+1)/2);
        //  } else {
        //    this._glyphPos.x=~~((clientSize.x-glyphSize+1)/2);
        //    if (this.showCaption) textPos.x=~~((clientSize.x-textSize.x+1)/2);
        //  }
        //  // if there is no text or no bitmap, then Spacing is irrelevant
        //  if ((textSize.x===0)||(glyphSize===0)) spacing=0;
        //  // adjust Margin and Spacing
        //  if (margin===-1){
        //    if (spacing<0){
        //      totalSize.setValues(glyphSize+textSize.x,glyphSize+textSize.y);
        //      if ([$j.types.buttonLayoutGlyphs.LEFT,$j.types.buttonLayoutGlyphs.RIGHT].indexOf(this.layout)>-1) margin=~~((clientSize.x-totalSize.x)/3);
        //      else margin=~~((clientSize.y-totalSize.y)/3);
        //      spacing=margin;
        //    } else {
        //      totalSize.setValues(glyphSize+spacing+textSize.x,glyphSize+spacing+textSize.y);
        //      if ([$j.types.buttonLayoutGlyphs.LEFT,$j.types.buttonLayoutGlyphs.RIGHT].indexOf(this.layout)>-1) margin=~~((clientSize.x-totalSize.x+1)/2);
        //      else margin=~~((clientSize.y-totalSize.y+1)/2);
        //    }
        //  } else {
        //    if (spacing<0){
        //      totalSize.setValues(clientSize.x-(margin+glyphSize),clientSize.y-(margin+glyphSize));
        //      if ([$j.types.buttonLayoutGlyphs.LEFT,$j.types.buttonLayoutGlyphs.RIGHT].indexOf(this.layout)>-1) spacing=~~((totalSize.x-textSize.x)/2);
        //      else spacing=~~((totalSize.y-textSize.y)/2);
        //    }
        //  }
        //  switch (this.layout){
        //    case $j.types.buttonLayoutGlyphs.LEFT:
        //      this._glyphPos.x=margin;
        //      if (this.showCaption) textPos.x=this._glyphPos.x+glyphSize+spacing;
        //      break;
        //    case $j.types.buttonLayoutGlyphs.RIGHT:
        //      this._glyphPos.x=clientSize.x-margin-glyphSize;
        //      if (this.showCaption) textPos.x=this._glyphPos.x-spacing-textSize.x;
        //      break;
        //    case $j.types.buttonLayoutGlyphs.TOP:
        //      this._glyphPos.y=margin;
        //      if (this.showCaption) textPos.y=this._glyphPos.y+glyphSize+spacing;
        //      break;
        //    case $j.types.buttonLayoutGlyphs.BOTTOM:
        //      this._glyphPos.y=clientSize.y-margin-glyphSize;
        //      if (this.showCaption) textPos.y=this._glyphPos.y-spacing-textSize.y;
        //      break;
        //  }
        //  // fixup the result variables
        //  //with (this._glyphPos){
        //  //  x+=client.left;
        //  //  y+=client.top;
        //  //}
        //  if (this.showCaption) textBounds.offset(textPos.x/*+client.left*/,textPos.y/*+client.top*/);
        //  return textBounds;
        //},
        update: function () {
            if ((this._loading || this.form._loading) && !$j.tools.Debugger.useFragment) return;
            this._inherited();
            $j.CSS.removeClass(this._HTMLElement, $j.types.buttonLayoutGlyphs.LEFT);
            $j.CSS.removeClass(this._HTMLElement, $j.types.buttonLayoutGlyphs.RIGHT);
            $j.CSS.removeClass(this._HTMLElement, $j.types.buttonLayoutGlyphs.TOP);
            $j.CSS.removeClass(this._HTMLElement, $j.types.buttonLayoutGlyphs.BOTTOM);
            $j.CSS.removeClass(this._HTMLElement, $j.types.buttonLayoutGlyphs.CENTER);
            $j.CSS.addClass(this._HTMLElement, this.layout);
            if (this._textObj) {
                //var txtB=this.calcButtonLayout();
                //this._textObj.style.left=txtB.left+$j.types.CSSUnits.PX;
                //this._textObj.style.top=txtB.top+$j.types.CSSUnits.PX;
                if (this.showCaption || !this.showCaption) this._textObj.innerHTML = this.caption;
                if (!this.wordWrap) this._HTMLElementStyle.whiteSpace = "nowrap";
                else this._HTMLElementStyle.whiteSpace = "normal";
                if (!this.showCaption) {
                    this._textObj.style.width = "0";
                    this._textObj.style.height = "0";
                    this._textObj.style.margin = "0";
                }
                if (this.path) {
                    //this.glyph.style.left=this._glyphPos.x+$j.types.CSSUnits.PX;
                    //this.glyph.style.top=this._glyphPos.y+$j.types.CSSUnits.PX;

                    this.updateCanvas();
                    this.paint();
                } else {
                    if (this.glyph) {
                        //this.glyph.style.left=this._glyphPos.x+$j.types.CSSUnits.PX;
                        //this.glyph.style.top=this._glyphPos.y+$j.types.CSSUnits.PX;
                        this.glyph.style.width = this.glyphSize + $j.types.CSSUnits.PX;
                        this.glyph.style.height = this.glyphSize + $j.types.CSSUnits.PX;
                        this.glyph.style.minWidth = this.glyphSize + $j.types.CSSUnits.PX;
                        this.glyph.style.minHeight = this.glyphSize + $j.types.CSSUnits.PX;
                    }
                }
                if (this.glyph) {
                    if (this.glyph.offsetWidth > 0 && this.glyph.offsetHeight) {
                        if (this.glyphMargin > 0) this.glyph.style.margin = this.glyphMargin + $j.types.CSSUnits.PX;
                        if (this.glyphSpacing > 0 && this.showcaption) {
                            this._textObj.style.margin = "0";
                            switch (this.layout) {
                                case this._HTMLElement, $j.types.buttonLayoutGlyphs.LEFT:
                                    this._textObj.style.marginLeft = this.glyphSpacing + $j.types.CSSUnits.PX;
                                    break;
                                case this._HTMLElement, $j.types.buttonLayoutGlyphs.RIGHT:
                                    this._textObj.style.marginRight = this.glyphSpacing + $j.types.CSSUnits.PX;
                                    break;
                                case this._HTMLElement, $j.types.buttonLayoutGlyphs.TOP:
                                    this._textObj.style.marginTop = this.glyphSpacing + $j.types.CSSUnits.PX;
                                    break;
                                case this._HTMLElement, $j.types.buttonLayoutGlyphs.BOTTOM:
                                    this._textObj.style.marginBottom = this.glyphSpacing + $j.types.CSSUnits.PX;
                                    break;
                                    //case this._HTMLElement,$j.types.buttonLayoutGlyphs.CENTER:
                                    //  this._textObj.style.marginLeft=this.glyphSpacing+$j.types.CSSUnits.PX;
                                    //  break;
                            }
                        }
                    }
                }
            }
        },
        getHTMLElement: function (id) {
            this._inherited(id);
            if (this._HTMLElement) {
                this._textObj = this._HTMLElement.firstElementChild;
                this._textObj.jsObj = this;
                this.caption = this._textObj.innerHTML;
                this.glyph = this._HTMLElement.getElementsByTagName(this.glyphHTMLElement)[0];
                this.glyphSize = this.glyph.offsetWidth;
                if (this.glyph) this.glyph.jsObj = this;
            }
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.layout;
            if (data) this.layout = data;
            data = this._HTMLElement.dataset.glyphsize;
            if (data) this.glyphSize = ~~data;
            data = this._HTMLElement.dataset.glyphspacing;
            if (data) this.glyphSpacing = ~~data;
            data = this._HTMLElement.dataset.glyphmargin;
            if (data) this.glyphMargin = ~~data;
            data = this._HTMLElement.dataset.showcaption;
            if (data) this.showCaption = _conv.strToBool(data);
            if (this._textObj) this.caption = this._textObj.innerHTML;
        },
        destroy: function () {
            this._inherited();
            this._glyphPos.destroy();
            this._glyphPos = null;
            this.layout = null;
            this.glyphSize = null;
            this.glyphSpacing = null;
            this.glyphMargin = null;
            if (this.glyph && this.glyph instanceof $j.classes.Path) this.glyph.destroy();
            this.glyph = null;
            this._textObj = null;
        }
        //#endregion
    });
    //#endregion
    //#region WindowButton final
    var WindowButton = Button.extend("WindowButton", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                this.canFocused = false;
            }
        }
        //#region Methods
        //#endregion
    });
    //#endregion
    //#region WindowCloseButton final
    var WindowCloseButton = WindowButton.extend("WindowCloseButton", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                this.modalResult = $j.types.modalResults.CANCEL;
                this.toolTip = "Fermer";
                this.showToolTip = true;
            }
        },
        //#region Methods
        //#endregion
    });
    //#endregion
    //#region WindowMinimizeButton final
    var WindowMinimizeButton = WindowButton.extend("WindowMinimizeButton", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                this.toolTip = "Réduire";
                this.showToolTip = true;
            }
        }
        //#region Methods
        //#endregion
    });
    //#endregion
    //#region WindowMaximizeButton final
    var WindowMaxRestoreButton = WindowButton.extend("WindowMaxRestoreButton", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                this.toolTip = "Agrandir";
                this.showToolTip = true;
                //#region Private
                //#endregion
            }
        },
        //#region Methods
        click: function () {
            if (this.form.windowState === $j.types.windowStates.NORMAL) {
                this.toolTip = "Rétablir précédent";
                this.form.maximize();
                $j.CSS.addClass(this._HTMLElement, "isrestore");
            } else {
                this.toolTip = "Agrandir";
                this.form.restore();
                $j.CSS.removeClass(this._HTMLElement, "isrestore");
            }
        }
        //#endregion
    });
    //#endregion
    //#region WindowHelpButton final
    var WindowHelpButton = WindowButton.extend("WindowHelpButton", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                this.toolTip = "Aide";
                this.showToolTip = true;
                this.onClick.addListener(this.form.showHelp);
            }
        },
        //#region Methods
        //#endregion
    });
    //#endregion
    //#region WindowRollUpButton final
    var WindowRollUpDownButton = WindowButton.extend("WindowRollUpDownButton", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                this.toolTip = "Taille minimale";
                this.showToolTip = true;
                //#region Private
                //#endregion
            }
        },
        //#region Methods
        click: function () {
            if (this.form.windowState === $j.types.windowStates.NORMAL) {
                this.toolTip = "Taille précédente";
                this.form.rollUp();
                $j.CSS.addClass(this._HTMLElement, "isup");
            } else {
                this.toolTip = "Taille minimale";
                this.form.rollDown();
                $j.CSS.removeClass(this._HTMLElement, "isup");
            }
        }
        //#endregion
    });
    //#endregion
    //#region WindowStayOnButton final
    var WindowStayOnOffButton = WindowButton.extend("WindowStayOnOffButton", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                this.toolTip = "Epingler au dessus";
                this.showToolTip = true;
                //#region Private
                //#endregion
            }
        },
        //#region Methods
        click: function () {
            if (~~this.form._HTMLElementStyle.zIndex !== _const.STAYONTOP) {
                this.toolTip = "Ne pas épingler";
                this.form.stayOnTop();
                $j.CSS.addClass(this._HTMLElement, "isstayon");
            } else {
                this.toolTip = "Epingler au dessus";
                this.form.stayNormal(this._lastZIndex);
                $j.CSS.removeClass(this._HTMLElement, "isstayon");
            }
        }
        //#endregion
    });
    //#endregion
    //#region SpeedButton final
    var SpeedButton = ButtonGlyph.extend("SpeedButton", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this.src = String.EMPTY;
                this._inherited(owner, props);
                this.canFocused = false;
                //this.tabStop=false;
            }
        },
        //#region Methods
        setSrc: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.src !== newValue) {
                this.src = newValue;
                if (this.glyph instanceof Image) {
                    this.glyph.src = newValue;
                    if (newValue === String.EMPTY) {
                        $j.CSS.addClass(this.glyph, "hidden");
                    } else {
                        $j.CSS.removeClass(this.glyph, "hidden");
                    }
                    if ((!this._loading && !this.form._loading) || $j.tools.Debugger.useFragment) this.update();
                }
            }
        },
        loaded: function () {
            this._inherited();
            if (this.glyph.src !== String.EMPTY) this.src = this.glyph.src;
            this.update();
        },
        destroy: function () {
            this._inherited();
            this.src = null;
        }
        //#endregion
    });
    //#endregion
    //#region TextButton
    var TextButton = Button.extend("TextButton", {});
    //#region
    $j.classes.register($j.types.categories.COMMON, Button, SpeedButton);
    $j.classes.register($j.types.categories.INTERNAL, CustomButton, ButtonGlyph, WindowButton, WindowCloseButton, WindowMinimizeButton, WindowMaxRestoreButton
                        , WindowHelpButton, WindowRollUpDownButton, WindowStayOnOffButton, TextButton);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var ButtonTpl = "<button id='{internalId}' data-name='{name}' data-class='Button' class='Control Button {theme}' style='width:75px;height:21px;'>{caption}</button>",
            WindowCloseButton = "<button' id='{internalId}' data-class='WindowCloseButton' class='Control WindowTitleButton WindowCloseButton {theme}' style='width:18px;height:18px;'></button>",
            WindowMinimizeButton = "<button' id='{internalId}' data-class='WindowMinimizeButton' class='Control WindowTitleButton WindowMinimizeButton {theme}' style='width:18px;height:18px;'></button>",
            WindowMaxRestoreButton = "<button' id='{internalId}' data-class='WindowMaxRestoreButton' class='Control WindowTitleButton WindowMaxRestoreButton {theme}' style='width:18px;height:18px;'></button>",
            WindowHelpButton = "<button' id='{internalId}' data-class='WindowHelpButton' class='Control WindowTitleButton WindowHelpButton hidden {theme}' style='width:18px;height:18px;'></button>",
            WindowRollUpDownButton = "<button' id='{internalId}' data-class='WindowRollUpDownButton' class='Control WindowTitleButton WindowRollUpDownButton hidden {theme}' data-isup='true' style='width:18px;height:18px;'></button>",
            WindowStayOnOffButton = "<button' id='{internalId}' data-class='WindowStayOnOffButton' class='Control WindowTitleButton WindowStayOnOffButton hidden {theme}' data-ison='true' style='width:18px;height:18px;'></button>",
            SpeedButtonTpl = "<button id='{internalId}' data-name='{name}' data-class='SpeedButton' class='Control ButtonGlyph SpeedButton {theme}' style='width:25px;height:21px;'>\
                        <span class='Control SpeedButtonCaption'>{caption}</span>\
                        <img class='Control' width='0' height='0' alt='' draggable='false' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQIW2NkAAIAAAoAAggA9GkAAAAASUVORK5CYII=' />\
                        </button>";
        $j.classes.registerTemplates([{ Class: Button, template: ButtonTpl }, { Class: SpeedButton, template: SpeedButtonTpl }, { Class: TextButton, template: ButtonTpl }]);
    }
    //#endregion
})();