(function () {
    //#region ratingPrecisions
    $j.types.ratingPrecisions = {
        WHOLEITEM: "wholeItem",
        HALFANITEM: "halfAnItem",
        EXACTPRECISION: "exactPrecision"
    };
    //#endregion
    Object.seal($j.types.ratingPrecisions);
    Object.freeze($j.types.ratingPrecisions);
    var Rating = $j.classes.ThemedControl.extend("Rating", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._selObj = null;
                //#endregion
                if (!$j.isHTMLRenderer()) {
                    this.height = 16;
                    this.width = 90;
                }
                //this.precision=$j.types.ratingPrecisions.WHOLEITEM;
                $j.tools.addPropertyFromSet(this, "precision", $j.types.ratingPrecisions, $j.types.ratingPrecisions.WHOLEITEM);
                this.nbItem = 5;
                this.value = 0;
                this.autoCapture = true;
                this.setHitTest([true, true, true, false]);
                this.normalImg = new Image(18, 16);
                $j.tools.events.bind(this.normalImg, $j.types.HTMLEvents.LOAD, this.doBitmapLoaded);
                $j.tools.events.bind(this.normalImg, $j.types.HTMLEvents.ERROR, this.doBitmapNotLoaded);
                this.hoveredImg = new Image;
                $j.tools.events.bind(this.hoveredImg, $j.types.HTMLEvents.LOAD, this.doBitmapLoaded);
                $j.tools.events.bind(this.hoveredImg, $j.types.HTMLEvents.ERROR, this.doBitmapNotLoaded);
                this.selectedImg = new Image;
                $j.tools.events.bind(this.selectedImg, $j.types.HTMLEvents.LOAD, this.doBitmapLoaded);
                $j.tools.events.bind(this.selectedImg, $j.types.HTMLEvents.ERROR, this.doBitmapNotLoaded);
                this.normalImg.obj = this;
                this.hoveredImg.obj = this;
                this.selectedImg.obj = this;
                //this.orientation=$j.types.orientations.HORIZONTAL;
                $j.tools.addPropertyFromSet(this, "orientation", $j.types.orientations, $j.types.orientations.HORIZONTAL);
                //this.tabStop=true;
                this.canFocused = true;
                delete this.tabOrder;
            }
        },
        //#region Setters
        setOrientation: function (newValue) {
            if (!$j.tools.valueInSet(newValue, $j.types.orientations)) return;
            if (this.orientation !== newValue) {
                this.orientation = newValue;
                this.update();
            }
        },
        setPrecision: function (newValue) {
            if (!$j.tools.valueInSet(newValue, $j.types.ratingPrecisions)) return
            if (this.precision !== newValue) {
                this.precision = newValue;
                this.checkValue();
                if (this._allowUpdate) this.update();
            }
        },
        setValue: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.value !== newValue) {
                this.value = newValue;
                if (this.value > this.nbItem) this.value = this.nbItem;
                if (this.value < 0) this.value = 0;
                this.checkValue();
                if (this._allowUpdate) this.update();
            }
        },
        setNbItem: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue !== this.nbItem) {
                this.nbItem = newValue;
                if (this._allowUpdate) this.update();
            }
        },
        setNormalImg: function (imgSrc) {
            if (typeof imgSrc !== _const.STRING) return;
            this.normalImg.src = imgSrc;
            this.update();
        },
        setHoveredImg: function (imgSrc) {
            if (typeof imgSrc !== _const.STRING) return;
            this.hoveredImg.src = imgSrc;
            this.update();
        },
        setSelectedImg: function (imgSrc) {
            if (typeof imgSrc !== _const.STRING) return;
            this.selectedImg.src = imgSrc;
            this.update();
        },
        //#endregion
        //#region Methods
        checkValue: function () {
            switch (this.precision) {
                case $j.types.ratingPrecisions.WHOLEITEM:
                    this.value = $j.ceil(this.value);
                    break;
                case $j.types.ratingPrecisions.HALFANITEM:
                    var f = $j.frac(this.value);
                    if (f > 0 && f <= 0.5) this.value = (~~this.value) + .5;
                    else this.value = ~~this.value;
                    break;
            }
        },
        update: function () {
            var offset;
            if (this.orientation === $j.types.orientations.HORIZONTAL) {
                offset = this.value * this.normalImg.width;
                this._selObj.style.width = offset + $j.types.CSSUnits.PX;
            } else {
                offset = this.value * this.normalImg.height;
                this._selObj.style.height = offset + $j.types.CSSUnits.PX;
            }
            if (this.normalImg.naturalWidth > 0) {
                if (this._isMouseOver) this._selObj.style.backgroundImage = "url('" + this.hoveredImg.src + "')";
                else this._selObj.style.backgroundImage = "url('" + this.selectedImg.src + "')";
            }
        },
        mouseLeave: function () {
            this._inherited();
            this.update();
        },
        mouseMove: function () {
            var offset;
            this._inherited();
            if (this.orientation === $j.types.orientations.HORIZONTAL) offset = $j.mouse.target.x;
            else offset = $j.mouse.target.y;
            switch (this.precision) {
                case $j.types.ratingPrecisions.WHOLEITEM:
                    if (this.orientation === $j.types.orientations.HORIZONTAL) offset = $j.ceil(offset / this.normalImg.width) * this.normalImg.width;
                    else offset = $j.ceil(offset / this.normalImg.height) * this.normalImg.height;
                    break;
                case $j.types.ratingPrecisions.HALFANITEM:
                    if (this.orientation === $j.types.orientations.HORIZONTAL) offset = (~~(offset / (this.normalImg.width / 2) + 1) * (this.normalImg.width / 2));
                    else offset = (~~(offset / (this.normalImg.height / 2) + 1) * (this.normalImg.height / 2));
                    break;
            }
            if (this.orientation === $j.types.orientations.HORIZONTAL) this._selObj.style.width = offset + $j.types.CSSUnits.PX;
            else this._selObj.style.height = offset + $j.types.CSSUnits.PX;
        },
        mouseUp: function () {
            var offset;
            this._inherited();
            if (this.orientation === $j.types.orientations.HORIZONTAL) offset = $j.mouse.target.x;
            else offset = $j.mouse.target.y;
            switch (this.precision) {
                case $j.types.ratingPrecisions.WHOLEITEM:
                    if (this.orientation === $j.types.orientations.HORIZONTAL) this.value = this._selObj.offsetWidth / this.normalImg.width;
                    else this.value = this._selObj.offsetHeight / this.normalImg.height;
                    break;
                case $j.types.ratingPrecisions.HALFANITEM:
                    if (this.orientation === $j.types.orientations.HORIZONTAL) {
                        offset = (~~(offset / (this.normalImg.width / 2) + 1) * (this.normalImg.width / 2));
                        this.setValue(offset / this.normalImg.width);
                    } else {
                        offset = (~~(offset / (this.normalImg.height / 2) + 1) * (this.normalImg.height / 2));
                        this.setValue(offset / this.normalImg.height);
                    }
                    break;
                case $j.types.ratingPrecisions.EXACTPRECISION:
                    if (this.orientation === $j.types.orientations.HORIZONTAL) this.setValue($j.round(offset / this.normalImg.width, 1));
                    else this.setValue($j.round(offset / this.normalImg.height, 1));
                    break;
            }
        },
        mouseEnter: function () {
            this._inherited();
            this.update();
        },
        realign: $j.tools.emptyFunc,
        updateFromHTML: function () {
            var data = this._HTMLElement.dataset.value;
            if (data) this.value = parseFloat(data);
            data = this._HTMLElement.dataset.nbitem;
            if (data) this.nbItem = ~~data;
            data = this._HTMLElement.dataset.precision;
            if (data) this.precision = data;
            data = this._HTMLElement.dataset.itemwidth;
            if (data) this.itemWidth = data;
            data = this._HTMLElement.dataset.orientation;
            if (data) this.orientation = data;
            data = this._HTMLElement.dataset.normalimg;
            if (data) this.setNormalImg(data);
            data = this._HTMLElement.dataset.selectedimg;
            if (data) this.setSelectedImg(data);
            data = this._HTMLElement.dataset.hoveredimg;
            if (data) this.setHoveredImg(data);
            this._inherited();
        },
        getChildsHTMLElement: function (id) {
            if (this._HTMLElement) {
                this._selObj = this._HTMLElement.firstElementChild;
                this._selObj.jsObj = this;
                $j.tools.events.bind(this._selObj, $j.types.mouseEvents.MOVE, this.dispatchEvent);
            }
        },
        doBitmapLoaded: function () {
            if (this === this.obj.normalImg) {
                this.obj._HTMLElementStyle.backgroundImage = 'url(' + this.src + ')';
                //if (this.obj.orientation===$j.types.orientations.HORIZONTAL) {
                //  this.obj.width=this.obj._HTMLElementStyle.minWidth=this.obj._HTMLElementStyle.maxWidth=this.obj._HTMLElementStyle.width=(this.obj.nbItem*this.width)+$j.types.CSSUnits.PX;
                //} else {
                //  this.obj.height=this.obj._HTMLElementStyle.minHeight=this.obj._HTMLElementStyle.maxHeight=this.obj._HTMLElementStyle.height=(this.obj.nbItem*this.height)+$j.types.CSSUnits.PX;
                //}
                this.obj._HTMLElementStyle.backgroundImage = "url('" + this.src + "')";
            }
            if (this === this.obj.selectedImg) this.obj._selObj.style.backgroundImage = "url('" + this.src + "')";
            this.obj.update();
        },
        doBitmapNotLoaded: function () {
            //throw "Image bitmap error";
        },
        destroy: function () {
            this._inherited();
            this._selObj = null;
            this.precision = null;
            this.nbItem = null;
            this.value = null;
            this.normalImg = null;
            this.hoveredImg = null;
            this.selectedImg = null;
            this.orientation = null;
        }
        //#endregion
    });
    Object.seal(Rating);
    $j.classes.register($j.types.categories.COMMON, Rating);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var RatingTpl = "<div id='{internalId}' data-name='{name}' data-class='Rating' class='Control Rating {theme} orientation-horizontal' data-nbitem='5' data-value='0' data-orientation='horizontal' data-normalimg='' data-hoveredimg='' data-selectedimg='' style='width:90px;height:16px;'>\
                   <div class='Control RatingProgress orientation-horizontal'></div>\
                   </div>";
        $j.classes.registerTemplates([{ Class: Rating, template: RatingTpl }]);
    }
    //endregion
})();