//#region Import
import { ThemedControl } from "/scripts/core/themedcontrol.js";
import { Events } from "/scripts/core/events.js";
import { Mouse } from "/scripts/core/mouse.js";
import { Tools } from "/scripts/core/tools.js";
//#endregion Import
//#region RATINGPRECISIONS
const RATINGPRECISIONS = {
    WHOLEITEM: "wholeItem",
    HALFANITEM: "halfAnItem",
    EXACTPRECISION: "exactPrecision"
};
Object.seal(RATINGPRECISIONS);
Object.freeze(RATINGPRECISIONS);
//#endregion RATINGPRECISIONS
//#region RATINGSYMBOLS
const RATINGSYMBOLS = {
    WHOLEITEM: "wholeItem",
    HALFANITEM: "halfAnItem",
    EXACTPRECISION: "exactPrecision"
};
Object.seal(RATINGSYMBOLS);
Object.freeze(RATINGSYMBOLS);
//#endregion RATINGSYMBOLS
//#region Rating
const Rating = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class Rating
    class Rating extends ThemedControl {
        //#region Statics
        static get RATINGPRECISIONS() {
            return RATINGPRECISIONS;
        }
        //#endregion Statics
        //#region constructor
        constructor(owner, props) {
            //#region Variables déclaration
            const HTMLEVENTS = Types.HTMLEVENTS;
            const ORIENTATIONS = Types.ORIENTATIONS;
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                //priv.selObj = null;
                if (!Core.isHTMLRenderer) {
                    this.height = 16;
                    this.width = 90;
                }
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "precision",
                    enum: RATINGPRECISIONS,
                    variable: priv,
                    value: props.hasOwnProperty("precision") ? props.precision : RATINGPRECISIONS.WHOLEITEM
                });
                priv.nbItem = props.hasOwnProperty("nbItem") ? props.nbItem : 5;
                priv.value = props.hasOwnProperty("value") ? props.value : 0;
                this.autoCapture = true;
                this.hitTest.mouseDown = true;
                this.hitTest.mousemove = true;
                this.hitTest.mouseup = true;
                this.hitTest.mousewheel = false;
                priv.normalImg = new Image(18, 16);
                Events.bind(priv.normalImg, HTMLEVENTS.LOAD, this.doBitmapLoaded);
                Events.bind(priv.normalImg, HTMLEVENTS.ERROR, this.doBitmapNotLoaded);
                priv.hoveredImg = new Image;
                Events.bind(priv.hoveredImg, HTMLEVENTS.LOAD, this.doBitmapLoaded);
                Events.bind(priv.hoveredImg, HTMLEVENTS.ERROR, this.doBitmapNotLoaded);
                priv.selectedImg = new Image;
                Events.bind(priv.selectedImg, HTMLEVENTS.LOAD, this.doBitmapLoaded);
                Events.bind(priv.selectedImg, HTMLEVENTS.ERROR, this.doBitmapNotLoaded);
                priv.normalImg.obj = this;
                priv.hoveredImg.obj = this;
                priv.selectedImg.obj = this;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "orientation",
                    enum: ORIENTATIONS,
                    variable: priv,
                    value: props.hasOwnProperty("orientation") ? props.orientation : ORIENTATIONS.HORIZONTAL
                });
                this.canFocused = true;
                delete this.tabOrder;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region orientation
        get orientation() {
            return internal(this).orientation;
        }
        set orientation(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, Types.ORIENTATIONS)) {
                if (priv.orientation !== newValue) {
                    priv.orientation = newValue;
                    this.update();
                }
            }
        }
        //#endregion orientation
        //#region precision
        get precision() {
            return internal(this).precision;
        }
        set precision(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, RATINGPRECISIONS)) {
                if (priv.precision !== newValue) {
                    priv.precision = newValue;
                    this.checkValue();
                    if (this.allowUpdate) {
                        this.update();
                    }
                }
            }
        }
        //#endregion precision
        //#region value
        get value() {
            return internal(this).value;
        }
        set value(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.value !== newValue) {
                    priv.value = newValue;
                    if (priv.value > priv.nbItem) {
                        priv.value = priv.nbItem;
                    }
                    if (priv.value < 0) {
                        priv.value = 0;
                    }
                    this.checkValue();
                    if (this.allowUpdate) {
                        this.update();
                    }
                }
            }
        }
        //#endregion value
        //#region nbItem
        get nbItem() {
            return internal(this).nbItem;
        }
        set nbItem(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (newValue !== priv.nbItem) {
                    priv.nbItem = newValue;
                    if (this.allowUpdate) {
                        this.update();
                    }
                }
            }
        }
        //#endregion nbItem
        //#region normalImg
        get normalImg() {
            return internal(this).normalImg;
        }
        set normalImg(imgSrc) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(imgSrc)) {
                priv.normalImg.src = imgSrc;
                this.update();
            }
        }
        //#endregion normalImg
        //#region hoveredImg
        get hoveredImg() {
            return internal(this).hoveredImg;
        }
        set hoveredImg(imgSrc) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(imgSrc)) {
                priv.hoveredImg.src = imgSrc;
                this.update();
            }
        }
        //#endregion hoveredImg
        //#region selectedImg
        get selectedImg() {
            return internal(this).hoveredImg;
        }
        set selectedImg(imgSrc) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(imgSrc)) {
                priv.selectedImg.src = imgSrc;
                this.update();
            }
        }
        //#endregion selectedImg
        //#endregion Getters / Setters
        //#region Methods
        //#region checkValue
        checkValue() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            switch (priv.precision) {
                case RATINGPRECISIONS.WHOLEITEM:
                    this.value = Math.ceil(priv.value);
                    break;
                case RATINGPRECISIONS.HALFANITEM:
                    {
                        const f = Math.frac(priv.value);
                        if (f > 0 && f <= 0.5) {
                            this.value = ~~priv.value + .5;
                        }
                        else {
                            this.value = ~~priv.value;
                        }
                    }
                    break;
            }
        }
        //#endregion checkValue
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            const ORIENTATIONS = Types.ORIENTATIONS;
            const PX = Types.CSSUNITS.PX;
            let offset;
            const ori = priv.orientation === ORIENTATIONS.HORIZONTAL?"width":"height";
            const htmlElementStyle = this.HTMLElement;
            //#endregion Variables déclaration

            offset = priv.value * priv.normalImg[ori];
            //priv.selObj.style[ori] = `${offset}${PX}`;
            console.log(`update - ${offset}`);
            //if (priv.normalImg.naturalWidth > 0) {
            //    if (priv.isMouseOver) {
            //        htmlElementStyle.backgroundImage = `url('${priv.hoveredImg.src}')`;
            //    } else {
            //        htmlElementStyle.backgroundImage = `url('${priv.selectedImg.src}')`;
            //    }
            //}
        }
        //#endregion update
        //#region mouseLeave
        mouseLeave() {
            super.mouseLeave();
            console.log("mouseLeave");
            this.update();
        }
        //#endregion mouseLeave
        //#region mouseMove
        mouseMove() {
            //#region Variables déclaration
            const priv = internal(this);
            const ORIENTATIONS = Types.ORIENTATIONS;
            const PX = Types.CSSUNITS.PX;
            let offset;
            //#endregion Variables déclaration
            super.mouseMove();
            if (priv.orientation === ORIENTATIONS.HORIZONTAL) {
                offset = Core.mouse.target.x;
            } else {
                offset = Core.mouse.target.y;
            }
            switch (priv.precision) {
                case RATINGPRECISIONS.WHOLEITEM:
                    if (priv.orientation === ORIENTATIONS.HORIZONTAL) {
                        offset = Math.ceil(offset / priv.normalImg.width) * priv.normalImg.width;
                    } else {
                        offset = Math.ceil(offset / priv.normalImg.height) * priv.normalImg.height;
                    }
                    break;
                case RATINGPRECISIONS.HALFANITEM:
                    if (priv.orientation === ORIENTATIONS.HORIZONTAL) {
                        offset = (~~(offset / (priv.normalImg.width / 2) + 1) * (priv.normalImg.width / 2));
                    } else {
                        offset = (~~(offset / (priv.normalImg.height / 2) + 1) * (priv.normalImg.height / 2));
                    }
                    break;
            }
            //priv.selObj.style[priv.orientation === ORIENTATIONS.HORIZONTAL?"width":"height"] = `${offset}${PX}`;
            //console.log(`mouseMove - ${offset} - ${priv.selObj.offsetWidth}`);
        }
        //#endregion mouseMove
        //#region mouseUp
        mouseUp() {
            //#region Variables déclaration
            const priv = internal(this);
            const ORIENTATIONS = Types.ORIENTATIONS;
            let offset;
            //#endregion Variables déclaration
            super.mouseUp();
            if (priv.orientation === ORIENTATIONS.HORIZONTAL) {
                offset = Core.mouse.target.x;
            }
            else {
                offset = Core.mouse.target.y;
            }
            switch (priv.precision) {
                case RATINGPRECISIONS.WHOLEITEM:
                    if (priv.orientation === ORIENTATIONS.HORIZONTAL) {
                        //this.value = priv.selObj.offsetWidth / priv.normalImg.width;
                    }
                    else {
                        //this.value = priv.selObj.offsetHeight / priv.normalImg.height;
                    }
                    break;
                case RATINGPRECISIONS.HALFANITEM:
                    if (priv.orientation === ORIENTATIONS.HORIZONTAL) {
                        offset = (~~(offset / (priv.normalImg.width / 2) + 1) * (priv.normalImg.width / 2));
                        //this.value = offset / priv.normalImg.width;
                    } else {
                        offset = (~~(offset / (priv.normalImg.height / 2) + 1) * (priv.normalImg.height / 2));
                        //this.value = offset / priv.normalImg.height;
                    }
                    break;
                case RATINGPRECISIONS.EXACTPRECISION:
                    if (priv.orientation === ORIENTATIONS.HORIZONTAL) {
                        //this.value = Math.round(offset / priv.normalImg.width, 1);
                    } else {
                        //this.value = Math.round(offset / priv.normalImg.height, 1);
                    }
                    break;
            }
        }
        //#endregion mouseUp
        //#region realign
        realign() {
        }
        //#endregion realign
        //updateFromHTML: function () {
        //    var data = this._HTMLElement.dataset.value;
        //    if (data) this.value = parseFloat(data);
        //    data = this._HTMLElement.dataset.nbitem;
        //    if (data) this.nbItem = ~~data;
        //    data = this._HTMLElement.dataset.precision;
        //    if (data) this.precision = data;
        //    data = this._HTMLElement.dataset.itemwidth;
        //    if (data) this.itemWidth = data;
        //    data = this._HTMLElement.dataset.orientation;
        //    if (data) this.orientation = data;
        //    data = this._HTMLElement.dataset.normalimg;
        //    if (data) this.setNormalImg(data);
        //    data = this._HTMLElement.dataset.selectedimg;
        //    if (data) this.setSelectedImg(data);
        //    data = this._HTMLElement.dataset.hoveredimg;
        //    if (data) this.setHoveredImg(data);
        //    this._inherited();
        //}
        //#region doBitmapLoaded
        doBitmapLoaded() {
            //#region Variables déclaration
            const htmlElementStyle = this.obj.HTMLElementStyle;
            //#endregion Variables déclaration
            if (this === this.obj.normalImg) {
                //htmlElementStyle.backgroundImage = `url('${this.src}')`;
                //if (this.obj.orientation===$j.types.orientations.HORIZONTAL) {
                //  this.obj.width=this.obj._HTMLElementStyle.minWidth=this.obj._HTMLElementStyle.maxWidth=this.obj._HTMLElementStyle.width=(this.obj.nbItem*this.width)+$j.types.CSSUnits.PX;
                //} else {
                //  this.obj.height=this.obj._HTMLElementStyle.minHeight=this.obj._HTMLElementStyle.maxHeight=this.obj._HTMLElementStyle.height=(this.obj.nbItem*this.height)+$j.types.CSSUnits.PX;
                //}
                //htmlElementStyle.backgroundImage = "url('" + this.src + "')";
            }
            if (this === this.obj.selectedImg) {
                //this.obj.selObj.style.backgroundImage = `url('${this.src}')`;
            }
            this.obj.update();
        }
        //#endregion doBitmapLoaded
        //#region doBitmapNotLoaded
        doBitmapNotLoaded() {
            //throw "Image bitmap error";
        }
        //#endregion doBitmapNotLoaded
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.destroy();
            priv.selObj = null;
            priv.precision = null;
            priv.nbItem = null;
            priv.value = null;
            priv.normalImg = null;
            priv.hoveredImg = null;
            priv.selectedImg = null;
            priv.orientation = null;
        }
        //#endregion destroy
        //#endregion Methods
    }
    return Rating;
    //#endregion Rating
})();
//#endregion Rating
Core.classes.register(Types.CATEGORIES.COMMON, Rating);
    export { Rating };
/*(function () {
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
})();*/