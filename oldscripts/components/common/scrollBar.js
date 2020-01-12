(function () {
    //#region ScrollBar
    var ScrollBar = $j.classes.ThemedControl.extend("ScrollBar", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._thumb = null;
                this._wheelDeltaReplacement = 0;
                this._track = null;
                this._timer = new $j.classes.Timer(this, { _inForm: false });
                this._timer.interval = 100;
                this._timer.onTimer.addListener(this.onTimer);
                this._timer.docPt = new $j.classes.Point;
                this._timer.targetPt = new $j.classes.Point;
                this._timer.dir = String.EMPTY;
                this._firstBtn = $j.classes.createComponent($j.classes.Button, this, null, { _inForm: false }, false);
                this._firstBtn.canFocused = false;
                this._lastBtn = $j.classes.createComponent($j.classes.Button, this, null, { _inForm: false }, false);
                this._lastBtn.canFocused = false;
                this._repeatTimer = new $j.classes.Timer(this, { _inForm: false });
                this._repeatTimer.interval = 100;
                this._repeatTimer.onTimer.addListener(this.onTimer);
                this._downPt = new $j.classes.Point;
                this._downValue = 0;
                //#endregion
                if (!$j.isHTMLRenderer()) {
                    this.width = 100;
                    this.height = 15;
                }
                this.min = 0;
                this.max = 100;
                this.value = 0;
                this.viewportSize = 0;
                this.onChange = new $j.classes.NotifyEvent(this);
                this.setHitTest(true);
                this.autoCapture = true;
                $j.tools.addPropertyFromSet(this, "orientation", $j.types.orientations, $j.types.orientations.HORIZONTAL);
                this.smallChange = 1;
                this.canFocused = this._inForm ? true : false;
            }
        },
        //#region Setters
        setMin: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.min !== newValue) {
                this.min = newValue;
                this.updateThumb();
            }
        },
        setMax: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.max !== newValue) {
                this.max = newValue;
                if (this.max < this.min) this.max = this.min;
                if (this.value > this.max) this.value = this.max;
                this.updateThumb();
            }
        },
        setValue: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.value !== newValue) {
                this.value = newValue;
                if (this.value > this.max) this.value = this.max;
                if (this.value < this.min) this.value = this.min;
                if (!this._updating) this.onChange.invoke();
                this.updateThumb();
                this.propertyChanged("value");
            }
        },
        setViewportSize: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.viewportSize !== newValue) {
                this.viewportSize = newValue;
                this.updateThumb();
            }
        },
        setOrientation: function (newValue) {
            if (!($j.tools.valueInSet(newValue, $j.types.orientations))) return;
            if (this.orientation !== newValue) {
                $j.CSS.removeClass(this._HTMLElement, "orientation-" + this.orientation);
                this.orientation = newValue;
                $j.CSS.addClass(this._HTMLElement, "orientation-" + this.orientation);
                if (this._HTMLElement) {
                    this._HTMLElement.dataset.orientation = this.orientation;
                }
                this.updateThumb();
            }
        },
        //#endregion
        //#region Getter
        isVertical: function() {
            return this.orientation === $j.types.orientations.VERTICAL;
        },
        //#endregion
        //#region Methods
        getChildsHTMLElement: function () {
            if (this._HTMLElement) {
                this._track = this._HTMLElement.firstElementChild;
                this._track.jsObj = this;
                $j.tools.events.bind(this._thumb, $j.types.mouseEvents.DOWN, this.eventMouseDown);
                this._thumb = this._HTMLElement.firstElementChild.firstElementChild;
                this._thumb.jsObj = this;
                //$j.tools.events.bind(this._thumb, $j.types.HTMLEvents.INPUT, this._change);
                //$j.tools.events.bind(this._thumb, $j.types.mouseEvents.MOVE, this.moveThumb);
                //$j.tools.events.bind(this._thumb, $j.types.mouseEvents.UP, this.upThumb);
                //$j.tools.events.bind(this._thumb, $j.types.mouseEvents.ENTER, this.enterThumb);
                //$j.tools.events.bind(this._thumb, $j.types.mouseEvents.DOWN, this.eventMouseDown);
                //this._trackZone = this._inner;
                this._firstBtn.getHTMLElement(this._HTMLElement.querySelector(".ScrollBarFirstButton").id);
                this._firstBtn.getChildsHTMLElement();
                this._firstBtn.updateFromHTML();
                this._firstBtn.onMouseDown.addListener(this.starTimer);
                this._firstBtn.onMouseUp.addListener(this.resetTimer);
                this._lastBtn.getHTMLElement(this._HTMLElement.querySelector(".ScrollBarLastButton").id);
                this._lastBtn.getChildsHTMLElement();
                this._lastBtn.updateFromHTML();
                this._lastBtn.onMouseDown.addListener(this.starTimer);
                this._lastBtn.onMouseUp.addListener(this.resetTimer);
            }
        },
        updateFromHTML: function () {
            var data, t;
            this._inherited();
            data = this._HTMLElement.dataset.value;
            if (data) this.value = parseFloat(data);
            data = this._HTMLElement.dataset.frequency;
            if (data) this.frequency = ~~data;
            data = this._HTMLElement.dataset.viewportsize;
            if (data) this.viewportSize = ~~data;
            data = this._HTMLElement.dataset.min;
            if (data) this.min = ~~data;
            data = this._HTMLElement.dataset.max;
            if (data) this.max = ~~data;
            data = this._HTMLElement.dataset.orientation;
            if (data) this.orientation = data;
        },
        //downThumb: function (event) {
        //    var obj = this.jsObj;
        //    if (!obj.isEnabled()) return;
        //    $j.mouse.getMouseInfos(event);
        //    if ($j.tools.Debugger.debug) console.log(_conv.point2Str($j.mouse.document));
        //    obj._downPt.assign($j.mouse.document);
        //    obj._downValue = obj.value;
        //    $j.mouse.stopEvent(event);
        //    obj.form.setCapturedControl(obj);
        //    if (obj._closePopups) obj.form.closePopups();
        //    if (obj._owner instanceof $j.classes.ScrollControl) obj._owner.setFocus();
        //    else obj.setFocus();
        //},
        //moveThumb: function (event) {
        //    var obj = this.jsObj, w, h, delta, pos;
        //    if (!obj.isEnabled()) return;
        //    if (obj.form._capturedControl !== obj) return;
        //    $j.mouse.getMouseInfos(event);
        //    if ($j.mouse.button === $j.types.mouseButtons.LEFT) {
        //        w = obj._trackZone.offsetWidth;
        //        h = obj._trackZone.offsetHeight;
        //        if (obj.orientation === $j.types.orientations.HORIZONTAL) {
        //            delta = $j.mouse.document.x - obj._downPt.x;
        //            pos = obj._downValue + delta * ((obj.max - obj.min) / w);
        //            if (pos < 0) pos = 0;
        //            if (pos > (obj.max - obj.min) - obj.viewportSize) pos = (obj.max - obj.min) - obj.viewportSize;
        //            if (pos === obj.value) return;
        //            obj.value = pos;
        //        } else {
        //            delta = $j.mouse.document.y - obj._downPt.y;
        //            pos = obj._downValue + delta * ((obj.max - obj.min) / h);
        //            if (pos < 0) pos = 0;
        //            if (pos > (obj.max - obj.min) - obj.viewportSize) pos = (obj.max - obj.min) - obj.viewportSize;
        //            if (pos === obj.value) return;
        //            obj.value = pos;
        //        }
        //        obj.updateThumb();
        //    }
        //    $j.mouse.stopEvent(event);
        //    if (!obj._updating) obj.onChange.invoke();
        //},
        //upThumb: function (event) {
        //    var obj = this.jsObj;
        //    if (!obj.isEnabled()) return;
        //    $j.mouse.getMouseInfos(event);
        //    $j.mouse.stopEvent(event);
        //    obj.mouseUp();
        //    obj._inThumb = false;
        //    obj._timer.stopTimer();
        //},
        mouseDown: function () {
            var point = new $j.classes.Point;
            if (!this.isEnabled()) return;
            this._inherited();
            if ($j.mouse.button === $j.types.mouseButtons.LEFT) {
                point.assign($j.mouse.target);
                if ($j.mouse.event.target === this._track) this.setValue(this.translateToValue(this.isVertical() ? point.y - (this._thumb.offsetHeight / 2) : point.x - (this._thumb.offsetWidth / 2)));
                this._downPt.assign($j.mouse.target);
            }
        },
        //_onTimer: function () {
        //    var obj = this._owner, o, stop = true;
        //    $j.mouse.button = $j.types.mouseButtons.LEFT
        //    $j.mouse.document.assign(obj._timer.docPt);
        //    $j.mouse.target.assign(obj._timer.targetPt);
        //    if (this.dir !== String.EMPTY) {
        //        //o = obj.clientToDocument();
        //        //if (obj.orientation === $j.types.orientations.HORIZONTAL) {
        //        //    o.x += obj._thumb.offsetLeft + obj._inner.offsetLeft;
        //        //    if (o.x + obj.viewportSize <= $j.mouse.document.x && this.dir === "d") stop = false;
        //        //    else if (o.x > $j.mouse.document.x && this.dir === "g") stop = false;
        //        //} else {
        //        //    o.x += obj._thumb.offsetLeft + obj._inner.offsetLeft;
        //        //    if (o.y + obj.viewportSize <= $j.mouse.document.y && this.dir === "b") stop = false;
        //        //    else if (o.y > $j.mouse.document.y && this.dir === "h") stop = false;
        //        //}
        //        if ()
        //        if (!stop) obj.mouseDown();
        //        else {
        //            this.dir = String.EMPTY;
        //            this.stopTimer();
        //        }
        //    }
        //},
        mouseMove: function () {
            var point = new $j.classes.Point;
            this._inherited();
            if ($j.mouse.button === $j.types.mouseButtons.LEFT) {
                point.assign($j.mouse.target);
                this.setValue(this.translateToValue(this.isVertical() ? point.y - (this._thumb.offsetHeight / 2) : point.x - (this._thumb.offsetWidth / 2)));
                this._downPt.assign($j.mouse.target);
            }
        },
        //mouseUp: function () {
        //    if (!this.isEnabled()) return;
        //    this._inherited();
        //    this._inThumb = false;
        //    this._timer.stopTimer();
        //},
        /*eventMouseDown: function (e) {
            var obj = this.jsObj;
            $j.mouse.getMouseInfos(e);
            if ($j.mouse.button === $j.types.mouseButtons.LEFT) {
                if (obj._track === this) {
                    obj.setValue(obj.);
                }
            }
            obj._downPt.setValues($j.mouse.document);
            $j.mouse.stopEvent(e);
        },*/
        translateToPx: function() {
            var trackLength = this.isVertical() ? this._track.offsetHeight : this._track.offsetWidth,
                handleLength = this.isVertical() ? this._thumb.offsetHeight : this._thumb.offsetWidth;
            return $j.round(((trackLength - handleLength) / (this.max - this.min)) * (this.value - this.min)) + "px";
        },
        translateToValue: function (offset) {
            var trackLength = this.isVertical() ? this._track.offsetHeight : this._track.offsetWidth,
                handleLength = this.isVertical() ? this._thumb.offsetHeight : this._thumb.offsetWidth;
            return ((offset / (trackLength - handleLength) * (this.max - this.min)) + this.min);
        },
        updateThumb: function () {
            this._thumb.style[this.isVertical() ? 'top' : 'left'] = this.translateToPx();
        },
        mouseWheel: function () {
            this._inherited();
            var multiplier, wheelDelta = $j.mouse.wheelDelta;
            if (this._wheelDeltaReplacement !== 0) {
                if (wheelDelta > 0) wheelDelta = this._wheelDeltaReplacement;
                else wheelDelta = -this._wheelDeltaReplacement;
            }
            multiplier = wheelDelta * (((this.max - this.min) * 12) / 100);
            if (this._wheelDeltaReplacement !== 0) multiplier = this._wheelDeltaReplacement;
            this.scrollBy(-multiplier);
            if (this._owner instanceof $j.classes.ScrollControl) this._owner.setFocus();
            else this.setFocus();
        },
        scrollBy: function (offset) {
            this.setValue(this.value + offset);
        },
        starTimer: function () {
            var obj = this._owner;
            $j.mouse.stopEvent($j.mouse.event);
            if (!obj.isEnabled()) return;
            if (this === obj._firstBtn) obj.scrollBy(-obj.smallChange);
            if (this === obj._lastBtn) obj.scrollBy(obj.smallChange);
            if (obj.value >= obj.max) return;
            if (obj.value <= obj.min) return;
            obj._repeatTimer.btn = this;
            obj._repeatTimer.setEnabled(true);
            obj._owner.enterFocus();
        },
        resetTimer: function () {
            var obj = this._owner;
            obj._repeatTimer.stopTimer();
        },
        onTimer: function () {
            var obj = this._owner;
            if (this.btn === obj._firstBtn) obj.scrollBy(-obj.smallChange);
            if (this.btn === obj._lastBtn) obj.scrollBy(obj.smallChange);
            if (obj.value >= obj.max) obj._repeatTimer.stopTimer();
            if (obj.value <= obj.min) obj._repeatTimer.stopTimer();

        },
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{orientation}");
            html = a.join(this.orientation);
            return html;
        },
        destroy: function () {
            this._inherited();
            this._thumb = null;
            this._wheelDeltaReplacement = null;
            this._track = null;
            this._timer = null;
            this._firstBtn = null;
            this._lastBtn = null;
            this._repeatTimer = null;
            this._downPt.destroy();
            this._downPt = null;
            this._downValue = null;
            this.min = null;
            this.max = null;
            this.value = null;
            this.viewportSize = null;
            this.onChange.destroy();
            this.onChange = null;
            this.smallChange = null;
        },
        keyDown: function () {
            this._inherited();
            switch ($j.keyboard.keyCode) {
                case $j.types.VKeysCodes.VK_LEFT:
                case $j.types.VKeysCodes.VK_UP:
                    if (this.frequency > 0) this.scrollBy(-this.frequency);
                    else this.scrollBy(-1);
                    break;
                case $j.types.VKeysCodes.VK_RIGHT:
                case $j.types.VKeysCodes.VK_DOWN:
                    if (this.frequency > 0) this.scrollBy(this.frequency);
                    else this.scrollBy(1);
                    break;
                case $j.types.VKeysCodes.VK_HOME:
                    this.setValue(this.min);
                    break;
                case $j.types.VKeysCodes.VK_END:
                    this.setValue(this.max);
                    break;
                case $j.types.VKeysCodes.VK_PRIOR:
                    if (this.frequency > 0) this.scrollBy(-this.frequency * 2);
                    else this.scrollBy(-2);
                    break;
                case $j.types.VKeysCodes.VK_NEXT:
                    if (this.frequency > 0) this.scrollBy(this.frequency * 2);
                    else this.scrollBy(2);
                    break;
            }
        },
        loaded: function () {
            this._inherited();
            this.updateThumb();
        }
        //#endregion
    });
    Object.seal(ScrollBar);
    $j.classes.register($j.types.categories.COMMON, ScrollBar);
    //#endregion
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var ScrollBarTpl = "<div id='{internalId}' data-name='{name}' data-class='ScrollBar' class='Control ScrollBar {theme} orientation-horizontal' data-value='0' data-viewportsize='0' data-orientation='horizontal'>\
                      <input type='range' id='{internalId}_3' class='Control {theme} csr_default' />\
                      <button id='{internalId}_1' data-class='Button' class='Control Button {theme} ScrollBarFirstButton'></button>\
                      <button id='{internalId}_2' data-class='Button' class='Control Button {theme} ScrollBarLastButton'></button>\
                      </div>";
        $j.classes.registerTemplates([{ Class: ScrollBar, template: ScrollBarTpl }]);
    }
    //endregion
})();
https://github.com/Grsmto/simplebar/blob/master/src/simplebar.js
http://www.n-son.com/scripts/jsScrolling/jsScrollbar.html
http://interface.eyecon.ro/demos/scrollbar.html
https://baijs.com/tinyscrollbar/