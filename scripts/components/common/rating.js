//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Events } from '/scripts/core/events.js';
import { Mouse } from '/scripts/core/mouse.js';
//#endregion Import
//#region RATINGPRECISIONS
const RATINGPRECISIONS = Object.freeze(Object.seal({
    WHOLEITEM: 'wholeItem',
    HALFANITEM: 'halfAnItem',
    EXACTPRECISION: 'exactPrecision'
}));
//#endregion RATINGPRECISIONS
//#region Rating
const Rating = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
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
            const HTMLEVENTS = core.types.HTMLEVENTS;
            const ORIENTATIONS = core.types.ORIENTATIONS;
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                if (!core.isHTMLRenderer) {
                    props.height = props.hasOwnProperty('height') && core.tools.isNumber(props.height) ? props.height : 16;
                    props.width = props.hasOwnProperty('width') && core.tools.isNumber(props.width) ? props.width :90;
                }
                props.mouseEvents = { mousemove: !0, mouseenter: !0, mouseout: !0 };
                props.canFocused = !1;
                props.allowUpdateOnResize = !0;
                super(owner, props);
                const priv = internal(this);
                priv.ratingObj = null;
                core.tools.addPropertyFromEnum({
                    component: this,
                    propName: 'precision',
                    enum: RATINGPRECISIONS,
                    variable: priv,
                    value: props.hasOwnProperty('precision') ? props.precision : RATINGPRECISIONS.WHOLEITEM
                });
                priv.nbItem = props.hasOwnProperty('nbItem') ? props.nbItem : 5;
                priv.value = props.hasOwnProperty('value') ? props.value : 0;
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
                core.tools.addPropertyFromEnum({
                    component: this,
                    propName: 'orientation',
                    enum: ORIENTATIONS,
                    variable: priv,
                    value: props.hasOwnProperty('orientation') ? props.orientation : ORIENTATIONS.HORIZONTAL
                });
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
            if (core.tools.valueInSet(newValue, core.types.ORIENTATIONS) && priv.orientation !== newValue) {
                priv.orientation = newValue;
                this.update();
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
            if (core.tools.valueInSet(newValue, RATINGPRECISIONS) && priv.precision !== newValue) {
                priv.precision = newValue;
                this.checkValue();
                this.allowUpdate && this.update();
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
            if (core.tools.isNumber(newValue) && priv.value !== newValue) {
                priv.value = Math.max(Math.min(newValue, priv.nbItem), 0);
                this.checkValue();
                this.allowUpdate && this.update();
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
            if (core.tools.isNumber(newValue) && newValue !== priv.nbItem) {
                priv.nbItem = newValue;
                this.allowUpdate && this.update();
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
            if (core.tools.isString(imgSrc)) {
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
            if (core.tools.isString(imgSrc)) {
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
            if (core.tools.isString(imgSrc)) {
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
                        this.value = f > 0 && f <= 0.5 ? int(priv.value) + 0.5 : int(priv.value);
                    }
                    break;
            }
        }
        //#endregion checkValue
        //#region update
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            const ORIENTATIONS = core.types.ORIENTATIONS;
            let offset;
            let clipRect = [0];
            const isHoriz = priv.orientation === ORIENTATIONS.HORIZONTAL;
            const ori = isHoriz ? 'Width' : 'Height';
            //#endregion Variables déclaration
            offset = priv.value * (priv.normalImg instanceof Image
                ? priv.normalImg[`natural${ori}`] : this[ori.toLowerCase()] / priv.nbItem);
            clipRect = [...clipRect, isHoriz ? this.width - offset : 0];
            clipRect = [...clipRect, !isHoriz ? this.height - offset : 0];
            clipRect = [...clipRect, 0];
            priv.ratingObj.style.clipPath = `inset(${clipRect.join("px ")}`;
            //super.update();
        }
        //#endregion update
        //#region mouseEnter
        mouseEnter() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.hoveredImg instanceof Image
                && priv.ratingObj.style.backgroundImage !== `url('${priv.hoveredImg.src}')`
                && (priv.ratingObj.style.backgroundImage = `url('${priv.hoveredImg.src}')`);
        }
        //#endregion mouseEnter
        //#region mouseLeave
        mouseLeave() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            this.update();
            priv.selectedImg instanceof Image
                && priv.ratingObj.style.backgroundImage !== `url('${priv.selectedImg.src}')`
                && (priv.ratingObj.style.backgroundImage = `url('${priv.selectedImg.src}')`);
        }
        //#endregion mouseLeave
        //#region mouseMove
        mouseMove() {
            this.updateRatingProgress();
        }
        //#endregion mouseMove
        //#region mouseUp
        mouseUp() {
            this.updateRatingProgress();
        }
        //#endregion mouseUp
        //#region mouseDown
        mouseDown() {
            this.updateRatingProgress();
        }
        //#endregion mouseDown
        //#region updateRatingProgress
        updateRatingProgress() {
            //#region Variables déclaration
            const priv = internal(this);
            const ORIENTATIONS = core.types.ORIENTATIONS;
            const isHoriz = priv.orientation === ORIENTATIONS.HORIZONTAL;
            const ori = isHoriz ? 'Width' : 'Height';
            const imgSize = priv.normalImg instanceof Image
                ? priv.normalImg[`natural${ori}`] : this[ori.toLowerCase()] / priv.nbItem;
            const isMouseMove = core.mouse.eventType === Mouse.MOUSEEVENTS.MOVE;
            let offset = 0;
            let clipRect = [];
            //#endregion Variables déclaration
            offset = isHoriz ? core.mouse.target.x : offset = core.mouse.target.y;
            clipRect.push(0);
            switch (priv.precision) {
                case RATINGPRECISIONS.WHOLEITEM:
                    offset = Math.ceil(offset / imgSize) * imgSize;
                    !isMouseMove && (priv.value = int(offset / imgSize));
                    break;
                case RATINGPRECISIONS.HALFANITEM:
                    offset = int(offset / (imgSize / 2) + 1) * int(imgSize / 2);
                    !isMouseMove && (priv.value = offset / imgSize);
                    break;
                case RATINGPRECISIONS.EXACTPRECISION:
                    !isMouseMove && (priv.value = +(offset / imgSize).toFixed(1));
                    break;
            }
            clipRect = [...clipRect, isHoriz ? this.width - offset : 0];
            clipRect = [...clipRect, !isHoriz ? this.height - offset : 0];
            clipRect = [...clipRect, 0];
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
            const PX = core.types.CSSUNITS.PX;
            //#endregion Variables déclaration
            if (this === this.obj.normalImg) {
                htmlElementStyle.backgroundImage = `url('${this.src}')`;
                if (this.obj.orientation === core.types.ORIENTATIONS.HORIZONTAL) {
                    this.obj.width = this.obj.nbItem * this.width;
                    htmlElementStyle.minWidth = htmlElementStyle.maxWidth = htmlElementStyle.width =
                        `${this.obj.width}${PX}`;
                } else {
                    this.obj.height = this.obj.nbItem * this.height;
                    htmlElementStyle.minHeight = htmlElementStyle.maxHeight = htmlElementStyle.height =
                        `${this.obj.height}${PX}`;
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
                priv.ratingObj = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}progress`);
                priv.ratingObj.classList.add('Control', 'RatingProgress', this.themeName, `orientation-${priv.orientation}`);
                priv.ratingObj.jsObj = this;
                htmlElement.appendChild(priv.ratingObj);
                Events.bind(priv.ratingObj, Mouse.MOUSEEVENTS.MOVE, this.dispatchEvent);
            }
            super.loaded();
            priv.selectedImg instanceof Image
                && priv.ratingObj.style.backgroundImage !== `url('${priv.selectedImg.src}')`
                && (priv.ratingObj.style.backgroundImage = `url('${priv.selectedImg.src}')`);
            this.update();
        }
        //#endregion loaded
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.selObj = null;
            priv.precision = null;
            priv.nbItem = null;
            priv.value = null;
            priv.normalImg = null;
            priv.hoveredImg = null;
            priv.selectedImg = null;
            priv.orientation = null;
            priv.ratingObj = null;
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return Rating;
    //#endregion Rating
})();
Object.seal(Rating);
core.classes.register(core.types.CATEGORIES.COMMON, Rating);
//#endregion Rating
//#region Templates
if (core.isHTMLRenderer) {
    const RatingTpl = ['<jagui-rating id="{internalId}" data-class="Rating" class="Control Rating {theme} csr_default">',
        '<properties>{ "name": "{name}", "orientation": "horizontal" }</properties></jagui-rating>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: Rating, template: RatingTpl }]);
}
//endregion
export { Rating };