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
//#region Class Rating
class Rating extends ThemedControl {
    //#region Private fields
    #nbItem;
    #value;
    #precision;
    #orientation;
    #normalImg;
    #hoveredImg;
    #selectedImg;
    #ratingObj;
    //#endregion Private fields
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
                props.width = props.hasOwnProperty('width') && core.tools.isNumber(props.width) ? props.width : 90;
            }
            props.mouseEvents = { mousemove: !0, mouseenter: !0, mouseout: !0 };
            props.canFocused = !1;
            props.allowUpdateOnResize = !0;
            super(owner, props);
            this.#nbItem = props.hasOwnProperty('nbItem') ? props.nbItem : 5;
            this.#value = props.hasOwnProperty('value') ? props.value : 0;
            this.addPropertyEnum('precision', RATINGPRECISIONS);
            this.#precision = props.hasOwnProperty('precision') ? props.precision : RATINGPRECISIONS.WHOLEITEM;
            if (props.hasOwnProperty('normalImg')) {
                this.#normalImg = new Image;
                Events.bind(this.#normalImg, HTMLEVENTS.LOAD, this.doBitmapLoaded);
                Events.bind(this.#normalImg, HTMLEVENTS.ERROR, this.doBitmapNotLoaded);
                this.#normalImg.obj = this;
                this.#normalImg.src = props.normalImg;
            } else {
                this.#normalImg = 'var(--normlaImg)';
            }
            if (props.hasOwnProperty('hoveredImg')) {
                this.#hoveredImg = new Image;
                Events.bind(this.#hoveredImg, HTMLEVENTS.LOAD, this.doBitmapLoaded);
                Events.bind(this.#hoveredImg, HTMLEVENTS.ERROR, this.doBitmapNotLoaded);
                this.#hoveredImg.obj = this;
                this.#hoveredImg.src = props.hoveredImg;
            } else {
                this.#normalImg = 'var(--hoveredImg)';
            }
            if (props.hasOwnProperty('selectedImg')) {
                this.#selectedImg = new Image;
                Events.bind(this.#selectedImg, HTMLEVENTS.LOAD, this.doBitmapLoaded);
                Events.bind(this.#selectedImg, HTMLEVENTS.ERROR, this.doBitmapNotLoaded);
                this.#selectedImg.obj = this;
                this.#selectedImg.src = props.selectedImg;
            } else {
                this.#normalImg = 'var(--hoveredImg)';
            }
            this.addPropertyEnum('orientation', ORIENTATIONS);
            this.#orientation = props.hasOwnProperty('orientation') ? props.orientation : ORIENTATIONS.HORIZONTAL;
            delete this.tabOrder;
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region orientation
    get orientation() {
        return this.#orientation;
    }
    set orientation(newValue) {
        if (core.tools.valueInSet(newValue, core.types.ORIENTATIONS) && this.#orientation !== newValue) {
            this.#orientation = newValue;
            this.update();
        }
    }
    //#endregion orientation
    //#region precision
    get precision() {
        return this.#precision;
    }
    set precision(newValue) {
        if (core.tools.valueInSet(newValue, RATINGPRECISIONS) && this.#precision !== newValue) {
            this.#precision = newValue;
            this.checkValue();
            this.allowUpdate && this.update();
        }
    }
    //#endregion precision
    //#region value
    get value() {
        return this.#value;
    }
    set value(newValue) {
        if (core.tools.isNumber(newValue) && this.#value !== newValue) {
            this.#value = Math.max(Math.min(newValue, this.#nbItem), 0);
            this.checkValue();
            this.allowUpdate && this.update();
        }
    }
    //#endregion value
    //#region nbItem
    get nbItem() {
        return this.#nbItem;
    }
    set nbItem(newValue) {
        if (core.tools.isNumber(newValue) && newValue !== this.#nbItem) {
            this.#nbItem = newValue;
            this.allowUpdate && this.update();
        }
    }
    //#endregion nbItem
    //#region normalImg
    get normalImg() {
        return this.#normalImg;
    }
    set normalImg(imgSrc) {
        if (core.tools.isString(imgSrc)) {
            this.#normalImg.src = imgSrc;
            this.update();
        }
    }
    //#endregion normalImg
    //#region hoveredImg
    get hoveredImg() {
        return this.#hoveredImg;
    }
    set hoveredImg(imgSrc) {
        if (core.tools.isString(imgSrc)) {
            this.#hoveredImg.src = imgSrc;
            this.update();
        }
    }
    //#endregion hoveredImg
    //#region selectedImg
    get selectedImg() {
        return this.#hoveredImg;
    }
    set selectedImg(imgSrc) {
        if (core.tools.isString(imgSrc)) {
            this.#selectedImg.src = imgSrc;
            this.update();
        }
    }
    //#endregion selectedImg
    //#endregion Getters / Setters
    //#region Methods
    //#region checkValue
    checkValue() {
        switch (this.#precision) {
            case RATINGPRECISIONS.WHOLEITEM:
                this.value = Math.ceil(this.#value);
                break;
            case RATINGPRECISIONS.HALFANITEM:
                {
                    const f = Math.frac(this.#value);
                    this.value = f > 0 && f <= 0.5 ? int(this.#value) + 0.5 : int(this.#value);
                }
                break;
        }
    }
    //#endregion checkValue
    //#region update
    update() {
        //#region Variables déclaration
        const ORIENTATIONS = core.types.ORIENTATIONS;
        let offset;
        let clipRect = [0];
        const isHoriz = this.#orientation === ORIENTATIONS.HORIZONTAL;
        const ori = isHoriz ? 'Width' : 'Height';
        //#endregion Variables déclaration
        offset = this.#value * (this.#normalImg instanceof Image
            ? this.#normalImg[`natural${ori}`] : this[ori.toLowerCase()] / this.#nbItem);
        clipRect = [...clipRect, isHoriz ? this.width - offset : 0];
        clipRect = [...clipRect, !isHoriz ? this.height - offset : 0];
        clipRect = [...clipRect, 0];
        this.#ratingObj.style.clipPath = `inset(${clipRect.join("px ")}`;
    }
    //#endregion update
    //#region mouseEnter
    mouseEnter() {
        super.mouseEnter();
        this.#hoveredImg instanceof Image
            && (this.#ratingObj.style.backgroundImage = `url('${this.#hoveredImg.src}')`);
    }
    //#endregion mouseEnter
    //#region mouseLeave
    mouseLeave() {
        super.mouseLeave();
        this.update();
        this.#selectedImg instanceof Image
            && (this.#ratingObj.style.backgroundImage = `url('${this.#selectedImg.src}')`);
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
        const ORIENTATIONS = core.types.ORIENTATIONS;
        const isHoriz = this.#orientation === ORIENTATIONS.HORIZONTAL;
        const ori = isHoriz ? 'Width' : 'Height';
        const imgSize = this.#normalImg instanceof Image
            ? this.#normalImg[`natural${ori}`] : this[ori.toLowerCase()] / this.#nbItem;
        const isMouseMove = core.mouse.eventType === Mouse.MOUSEEVENTS.MOVE;
        let offset = 0;
        let clipRect = [];
        //#endregion Variables déclaration
        offset = isHoriz ? core.mouse.target.x : offset = core.mouse.target.y;
        clipRect.push(0);
        switch (this.#precision) {
            case RATINGPRECISIONS.WHOLEITEM:
                offset = Math.ceil(offset / imgSize) * imgSize;
                !isMouseMove && (this.#value = int(offset / imgSize));
                break;
            case RATINGPRECISIONS.HALFANITEM:
                offset = int(offset / (imgSize / 2) + 1) * int(imgSize / 2);
                !isMouseMove && (this.#value = offset / imgSize);
                break;
            case RATINGPRECISIONS.EXACTPRECISION:
                !isMouseMove && (this.#value = +(offset / imgSize).toFixed(1));
                break;
        }
        clipRect = [...clipRect, isHoriz ? this.width - offset : 0];
        clipRect = [...clipRect, !isHoriz ? this.height - offset : 0];
        clipRect = [...clipRect, 0];
        this.#ratingObj.style.clipPath = `inset(${clipRect.join("px ")}`;
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
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (!htmlElement.querySelector('.RatingProgress')) {
            this.#ratingObj = document.createElement(`${core.name.toLowerCase()}-${this.constructor.name.toLowerCase()}progress`);
            this.#ratingObj.classList.add('RatingProgress', this.themeName, `orientation-${this.#orientation}`);
            htmlElement.appendChild(this.#ratingObj);
        }
        super.loaded();
        this.#selectedImg instanceof Image
            && this.#ratingObj.style.backgroundImage !== `url('${this.#selectedImg.src}')`
            && (this.#ratingObj.style.backgroundImage = `url('${this.#selectedImg.src}')`);
        this.update();
    }
    //#endregion loaded
    //#endregion Methods
}
Object.defineProperties(Rating.prototype, {
    'nbItem': {
        enumerable: !0
    },
    'value': {
        enumerable: !0
    }
});
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