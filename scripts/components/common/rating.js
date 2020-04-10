//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Events } from '/scripts/core/events.js';
import { Mouse } from '/scripts/core/mouse.js';
import { Tools } from '/scripts/core/tools.js';
//#endregion Import
//#region RATINGPRECISIONS
const RATINGPRECISIONS = Object.freeze({
    WHOLEITEM: 'wholeItem',
    HALFANITEM: 'halfAnItem',
    EXACTPRECISION: 'exactPrecision'
});
Object.seal(RATINGPRECISIONS);
//#endregion RATINGPRECISIONS
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
                priv.ratingObj = null;
                if (!Core.isHTMLRenderer) {
                    this.height = 16;
                    this.width = 90;
                }
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: 'precision',
                    enum: RATINGPRECISIONS,
                    variable: priv,
                    value: props.hasOwnProperty('precision') ? props.precision : RATINGPRECISIONS.WHOLEITEM
                });
                priv.nbItem = props.hasOwnProperty('nbItem') ? props.nbItem : 5;
                priv.value = props.hasOwnProperty('value') ? props.value : 0;
                this.autoCapture = !0;
                this.hitTest.mouseDown = !0;
                this.hitTest.mouseMove = !0;
                this.hitTest.mouseUp = !0;
                this.hitTest.mouseWheel = !1;
                if (props.hasOwnProperty('normalImg')) {
                    priv.normalImg = new Image;
                    Events.bind(priv.normalImg, HTMLEVENTS.LOAD, this.doBitmapLoaded);
                    Events.bind(priv.normalImg, HTMLEVENTS.ERROR, this.doBitmapNotLoaded);
                    priv.normalImg.obj = this;
                    priv.normalImg.src = props.normalImg;
                } else {
                    priv.normalImg = 'var(--normlaImg)';
                }
                if (props.hasOwnProperty('hoveredImg')) {
                    priv.hoveredImg = new Image;
                    Events.bind(priv.hoveredImg, HTMLEVENTS.LOAD, this.doBitmapLoaded);
                    Events.bind(priv.hoveredImg, HTMLEVENTS.ERROR, this.doBitmapNotLoaded);
                    priv.hoveredImg.obj = this;
                    priv.hoveredImg.src = props.hoveredImg;
                } else {
                    priv.normalImg = 'var(--hoveredImg)';
                }
                if (props.hasOwnProperty('selectedImg')) {
                    priv.selectedImg = new Image;
                    Events.bind(priv.selectedImg, HTMLEVENTS.LOAD, this.doBitmapLoaded);
                    Events.bind(priv.selectedImg, HTMLEVENTS.ERROR, this.doBitmapNotLoaded);
                    priv.selectedImg.obj = this;
                    priv.selectedImg.src = props.selectedImg;
                } else {
                    priv.normalImg = 'var(--hoveredImg)';
                }
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: 'orientation',
                    enum: ORIENTATIONS,
                    variable: priv,
                    value: props.hasOwnProperty('orientation') ? props.orientation : ORIENTATIONS.HORIZONTAL
                });
                this.canFocused = !0;
                delete this.tabOrder;
                this.allowUpdateOnResize = !0;
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
            let offset;
            const clipRect = [0];
            const isHoriz = priv.orientation === ORIENTATIONS.HORIZONTAL;
            const ori = isHoriz ? 'Width' : 'Height';
            //#endregion Variables déclaration
            offset = priv.value * (priv.normalImg instanceof Image ? priv.normalImg[`natural${ori}`] : this[ori.toLowerCase()] / priv.nbItem);
            clipRect.push(isHoriz ? this.width - offset : 0);
            clipRect.push(!isHoriz ? this.height - offset : 0);
            clipRect.push(0);
            priv.ratingObj.style.clipPath = `inset(${clipRect.join("px ")}`;
            //super.update();
        }
        //#endregion update
        //#region mouseEnter
        mouseEnter() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.mouseEnter();
            if (priv.hoveredImg instanceof Image && priv.ratingObj.style.backgroundImage !== `url('${priv.hoveredImg.src}')`) {
                priv.ratingObj.style.backgroundImage = `url('${priv.hoveredImg.src}')`;
            }
        }
        //#endregion mouseEnter
        //#region mouseLeave
        mouseLeave() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.mouseLeave();
            this.update();
            if (priv.selectedImg instanceof Image && priv.ratingObj.style.backgroundImage !== `url('${priv.selectedImg.src}')`) {
                priv.ratingObj.style.backgroundImage = `url('${priv.selectedImg.src}')`;
            }
        }
        //#endregion mouseLeave
        //#region mouseMove
        mouseMove() {
            super.mouseMove();
            this.updateRatingProgress();
        }
        //#endregion mouseMove
        //#region mouseUp
        mouseUp() {
            super.mouseUp();
            this.updateRatingProgress();
        }
        //#endregion mouseUp
        //#region mouseDown
        mouseDown() {
            super.mouseUp();
            this.updateRatingProgress();
        }
        //#endregion mouseDown
        //#region updateRatingProgress
        updateRatingProgress() {
            //#region Variables déclaration
            const priv = internal(this);
            const ORIENTATIONS = Types.ORIENTATIONS;
            const isHoriz = priv.orientation === ORIENTATIONS.HORIZONTAL;
            const ori = isHoriz ? 'Width' : 'Height';
            const imgSize = priv.normalImg instanceof Image ? priv.normalImg[`natural${ori}`] : this[ori.toLowerCase()] / priv.nbItem;
            const isMouseMove = Core.mouse.eventType === Mouse.MOUSEEVENTS.MOVE;
            let offset = 0;
            const clipRect = [];
            //#endregion Variables déclaration
            if (isHoriz) {
                offset = Core.mouse.target.x;
            } else {
                offset = Core.mouse.target.y;
            }
            clipRect.push(0);
            switch (priv.precision) {
                case RATINGPRECISIONS.WHOLEITEM:
                    offset = Math.ceil(offset / imgSize) * imgSize;
                    if (!isMouseMove) {
                        priv.value = ~~(offset / imgSize);
                    }
                    break;
                case RATINGPRECISIONS.HALFANITEM:
                    offset = ~~(offset / (imgSize / 2) + 1) * ~~(imgSize / 2);
                    if (!isMouseMove) {
                        priv.value = offset / imgSize;
                    }
                    break;
                case RATINGPRECISIONS.EXACTPRECISION:
                    if (!isMouseMove) {
                        priv.value = +(offset / imgSize).toFixed(1);
                    }
                    break;
            }
            clipRect.push(isHoriz ? this.width - offset : 0);
            clipRect.push(!isHoriz ? this.height - offset : 0);
            clipRect.push(0);
            priv.ratingObj.style.clipPath = `inset(${clipRect.join("px ")}`;
        }
        //#endregion updateRatingProgress
        //#region realign
        realign() { }
        //#endregion realign
        //#region doBitmapLoaded
        doBitmapLoaded() {
            //#region Variables déclaration
            const htmlElementStyle = this.obj.HTMLElementStyle;
            const PX = Types.CSSUNITS.PX;
            //#endregion Variables déclaration
            if (this === this.obj.normalImg) {
                htmlElementStyle.backgroundImage = `url('${this.src}')`;
                if (this.obj.orientation === Types.ORIENTATIONS.HORIZONTAL) {
                    this.obj.width = this.obj.nbItem * this.width;
                    htmlElementStyle.minWidth = htmlElementStyle.maxWidth = htmlElementStyle.width = `  ${this.obj.width}${PX}`;
                } else {
                    this.obj.height = this.obj.nbItem * this.height;
                    htmlElementStyle.minHeight = htmlElementStyle.maxHeight = htmlElementStyle.height = `${this.obj.height}${PX}`;
                }
            }
            this.obj.update();
        }
        //#endregion doBitmapLoaded
        //#region doBitmapNotLoaded
        doBitmapNotLoaded() {
            //throw "Image bitmap error";
        }
        //#endregion doBitmapNotLoaded
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (!htmlElement.querySelector('.RatingProgress')) {
                priv.ratingObj = document.createElement(`${Core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}progress`);
                priv.ratingObj.classList.add('Control', 'RatingProgress', this.themeName, `orientation-${priv.orientation}`);
                priv.ratingObj.jsObj = this;
                htmlElement.appendChild(priv.ratingObj);
                Events.bind(priv.ratingObj, Mouse.MOUSEEVENTS.MOVE, this.dispatchEvent);
            }
            super.loaded();
            if (priv.selectedImg instanceof Image && priv.ratingObj.style.backgroundImage !== `url('${priv.selectedImg.src}')`) {
                priv.ratingObj.style.backgroundImage = `url('${priv.selectedImg.src}')`;
            }
            this.update();
        }
        //#endregion loaded
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
Object.seal(Rating);
Core.classes.register(Types.CATEGORIES.COMMON, Rating);
export { Rating };
//#region Templates
if (Core.isHTMLRenderer) {
    const RatingTpl = ['<jagui-rating id="{internalId}" data-class="Rating" class="Control Rating {theme} csr_default">',
        '<properties>{ "name": "{name}", "orientation": "horizontal" }</properties></jagui-rating>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: Rating, template: RatingTpl }]);
}
//endregion