//#region Imports
import { Component } from '/scripts/core/component.js';
import { Events } from '/scripts/core/events.js';
import '/scripts/core/sizeconstraints.js';
import '/scripts/core/padding.js';
import '/scripts/core/margin.js';
import '/scripts/core/scale.js';
import '/scripts/core/rotatecenter.js';
import '/scripts/core/mouseevents.js';
import { Mouse } from '/scripts/core/mouse.js';
import { Keyboard } from '/scripts/core/keyboard.js';
import { Rect } from '/scripts/core/geometry.js';
//#endregion Imports
//#region Control
class Control extends Component {
    //#region Private fields
    #allowUpdate = !0;
    #autoTranslate;
    #translationKey;
    #isMouseOver = !1;
    #isFocused = !1;
    #isPressed = !1;
    #closePopups;
    #wrapper = String.EMPTY;
    #hasResizeEvent = !1;
    #resizeData = {
        width: null,
        height: null
    };
    #tabList = [];
    #constraints;
    #ownerShowToolTip;
    #autoCapture;
    #padding;
    #margin;
    #popupMenu = null;
    #opacity;
    #width;
    #height;
    #scale;
    #canFocused;
    #showFocus;
    #enabled;
    #rotateCenter;
    #toolTip;
    #showToolTip;
    #mouseEvents;
    #rotateAngle;
    #customStyle = null;
    #cssClasses;
    #tabOrder;
    #right;
    #bottom;
    #doubleClick = !1;
    #component = !1;
    #forceDisplayVisibility;
    #clipped;
    #reflected;
    #column;
    #row;
    #colSpan;
    #rowSpan;
    #allowUpdateOnResize;
    #allowRealignChildsOnResize;
    #resizer;
    #updateCell;
    #anchor;
    #align;
    #cursor;
    #dragMode;
    #dragKind;
    //#endregion Private fields
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            const self = this;
            this.#autoTranslate= props.hasOwnProperty('autoTranslate') && core.tools.isBool(props.autoTranslate)
                    ? props.autoTranslate : !1;
            this.#translationKey= props.hasOwnProperty('translationKey') ? props.translationKey : String.EMPTY;
            this.#closePopups= props.hasOwnProperty('closePopups') && core.tools.isBool(props.closePopups)
                    ? props.closePopups : !0;
            this.#constraints= new core.classes.SizeConstraints(this);
            this.#ownerShowToolTip= props.hasOwnProperty('ownerShowToolTip')
                    && core.tools.isBool(props.ownerShowToolTip) ? props.ownerShowToolTip : !0;
            this.#autoCapture= props.hasOwnProperty('autoCapture') && core.tools.isBool(props.autoCapture)
                    ? props.autoCapture : !1;
            this.#padding= new core.classes.Padding(this);
            this.#margin= new core.classes.Margin(this);
            this.#opacity= props.hasOwnProperty('opacity') && core.tools.isNumber(props.opacity) && (props.opacity);
            this.#width= props.hasOwnProperty('width') && core.tools.isNumber(props.width) ? props.width : 50;
            this.#height= props.hasOwnProperty('height') && core.tools.isNumber(props.height) ? props.height : 50;
            this.#scale= new core.classes.Scale(this);
            this.#canFocused= props.hasOwnProperty('canFocused') && core.tools.isBool(props.canFocused)
                    ? props.canFocused : !1;
            this.#showFocus= props.hasOwnProperty('showFocus') && core.tools.isBool(props.showFocus)
                    ? props.showFocus : !0;
            this.#enabled= props.hasOwnProperty('enabled') && core.tools.isBool(props.enabled) ? props.enabled : !0;
            this.#rotateCenter= new core.classes.RotateCenter(this);
            this.#toolTip= props.hasOwnProperty('toolTip') ? props.toolTip : String.EMPTY;
            this.#showToolTip= props.hasOwnProperty('showToolTip') && core.tools.isBool(props.showToolTip)
                    ? props.showToolTip : !1;
            this.#mouseEvents= new core.classes.MouseEvents(props.hasOwnProperty('mouseEvents')
                    ? props.mouseEvents : null);
            this.#rotateAngle= props.hasOwnProperty('rotateAngle') && core.tools.isNumber(props.rotateAngle)
                    ? props.rotateAngle : 0;
            this.#cssClasses= props.hasOwnProperty('cssClasses') ? props.cssClasses : String.EMPTY;
            this.#tabOrder= props.hasOwnProperty('tabOrder') && core.tools.isNumber(props.tabOrder)
                ? props.tabOrder : 0;
            this.#right= props.hasOwnProperty('right') && core.tools.isNumber(props.right) ? props.right : null;
            this.#bottom= props.hasOwnProperty('bottom') && core.tools.isNumber(props.bottom) ? props.bottom : null;
            this.#forceDisplayVisibility= props.hasOwnProperty('forceDisplayVisibility')
                && core.tools.isBool(props.forceDisplayVisibility)
                ? props.forceDisplayVisibility : !1;
            this.#clipped= props.hasOwnProperty('clipped') && core.tools.isBool(props.clipped) ? props.clipped : !0;
            this.#reflected= props.hasOwnProperty('reflected') && core.tools.isBool(props.reflected)
                ? props.reflected : !1;
            this.#column= props.hasOwnProperty('column') && core.tools.isNumber(props.column) ? props.column : 0;
            this.#row= props.hasOwnProperty('row') && core.tools.isNumber(props.row) ? props.row : 0;
            this.#colSpan= props.hasOwnProperty('colSpan') && core.tools.isNumber(props.colSpan)
                ? props.colSpan : 0;
            this.#rowSpan= props.hasOwnProperty('rowSpan') && core.tools.isNumber(props.rowSpan)
                ? props.rowSpan : 0;
            this.#allowUpdateOnResize= props.hasOwnProperty('allowUpdateOnResize')
                && core.tools.isBool(props.allowUpdateOnResize) ? props.allowUpdateOnResize : !1;
            this.#allowRealignChildsOnResize= props.hasOwnProperty('allowRealignChildsOnResize')
                && core.tools.isBool(props.allowRealignChildsOnResize)
                ? props.allowRealignChildsOnResize : !1;
            this.#resizer= new ResizeObserver(function () {
                const obj = this.obj;
                obj.allowUpdateOnResize && obj.update();
                obj.allowRealignChildsOnResize && obj.realignChilds();
                obj.onResize && obj.onResize.invoke(obj);
            });
            this.#updateCell= function () {
                //#region Variables déclaration
                const htmlElementStyle = self.HTMLElementStyle;
                //#endregion Variables déclaration
                // columns
                htmlElementStyle.gridColumn = `${this.#column} / span ${this.#colSpan > 1 ? this.#colSpan : 1}`;
                // rows
                htmlElementStyle.gridRow = `${this.#row} / span ${this.#rowSpan > 1 ? this.#rowSpan : 1}`;
            };
            this.#resizer.obj = this;
            if (props.hasOwnProperty('padding')) {
                //#region Variables déclaration
                const padding = props.padding;
                //#endregion Variables déclaration
                core.tools.isNumber(padding)
                    ? this.#padding.setValues(padding, padding, padding, padding)
                    : this.#padding.setValues(padding.left, padding.top, padding.right, padding.bottom);
            }
            if (props.hasOwnProperty('margin')) {
                //#region Variables déclaration
                const margin = props.margin;
                //#endregion Variables déclaration
                core.tools.isNumber(margin)
                    ? this.#padding.setValues(margin, margin, margin, margin)
                    : this.#margin.setValues(margin.left, margin.top, margin.right, margin.bottom);
            }
            this.createEventsAndBind(['onMouseDown', 'onMouseMove', 'onMouseUp', 'onClick', 'onDblClick',
                'onMouseLeave', 'onMouseEnter', 'onWheel', 'onScroll', 'onBeforePaint', 'onPaint',
                'onAfterPaint', 'onEnterFocus', 'onKillFocus', 'onKeyDown', 'onKeyUp', 'onKeyPress', 'onAfterResized',
                'onDragStart', 'onDrag', 'onDragExit', 'onDragEnd', 'onDragEnter', 'onDragOver', 'onDragLeave',
                'onDrop', 'onDestroy', 'onResize'], props);
            this.addPropertyEnum('anchor', core.types.ANCHORS);
            this.#anchor = props.hasOwnProperty('anchor') && Array.isArray(props.anchor)
                ? props.anchor : [core.types.ANCHORS.LEFT, core.types.ANCHORS.TOP];
            this.addPropertyEnum('align', core.types.ALIGNS);
            this.#align = props.hasOwnProperty('align') ? props.align : core.types.ALIGNS.NONE;
            this.addPropertyEnum('cursor', core.types.CUSTOMCURSORS);
            this.#cursor = props.hasOwnProperty('cursor') && core.tools.isString(props.cursor)
                    ? props.cursor : core.types.CUSTOMCURSORS.DEFAULT;
            this.addPropertyEnum('dragKind', core.types.DRAGKINDS);
            this.#dragKind = props.hasOwnProperty('dragKind') && core.tools.isString(props.dragKind)
                    ? props.dragKind : core.types.DRAGKINDS.DRAG;
            this.addPropertyEnum('dragMode', core.types.DRAGMODES);
            this.#dragMode = props.hasOwnProperty('dragMode') && core.tools.isString(props.dragMode)
                    ? props.dragMode : core.types.DRAGMODES.MANUAL;
        }
    }
    //#endregion Constructor
    //#region Getters / Setters
    //#region cursor
    get cursor() {
        return this.#cursor;
    }
    set cursor(newValue) {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        let cursor = this.#cursor;
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, core.types.CUSTOMCURSORS) && cursor !== newValue) {
            htmlElement.classList.remove(cursor);
            cursor = this.#cursor = newValue;
            htmlElement.classList.add(cursor);
        }
    }
    //#endregion cursor
    //#region align
    get align() {
        return this.#align;
    }
    set align(newValue) {
        //#region Variables déclaration
        const owner = this.owner;
        let align = this.#align;
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, core.types.ALIGNS) && align !== newValue) {
            align = this.#align = newValue;
            if (!this.loading && !this.form.loading && align !== core.types.ALIGNS.NONE) {
                owner.realignChilds();
                owner.hasResizeEvent && owner.resized();
            }
        }
    }
    //#endregion align
    //#region anchor
    get anchor() {
        return this.#anchor;
    }
    set anchor(newValue) {
        //#region Variables déclaration
        const anchor = this.#anchor;
        //#endregion Variables déclaration
        if (Array.isArray(newValue)) {
            anchor.length = 0;
            anchor.addRange(newValue);
        }
    }
    //#endregion anchor
    //#region translationKey
    get translationKey() {
        return this.#translationKey;
    }
    set translationKey(newValue) {
        core.tools.isString(newValue) && this.#translationKey !== newValue
            && (this.#translationKey = newValue);
    }
    //#endregion translationKey
    //#region allowUpdateOnResize
    get allowUpdateOnResize() {
        return this.#allowUpdateOnResize;
    }
    set allowUpdateOnResize(newValue) {
        core.tools.isBool(newValue) && this.#allowUpdateOnResize !== newValue
            && (this.#allowUpdateOnResize = newValue);
    }
    //#endregion allowUpdateOnResize
    //#region allowRealignChildsOnResize
    get allowRealignChildsOnResize() {
        return this.#allowRealignChildsOnResize;
    }
    set allowRealignChildsOnResize(newValue) {
        core.tools.isBool(newValue) && this.#allowRealignChildsOnResize !== newValue
            && (this.#allowRealignChildsOnResize = newValue);
    }
    //#endregion allowRealignChildsOnResize
    //#region bounds
    get bounds() {
        return new Rect(this.left, this.top, this.#width, this.#height);
    }
    set bounds(newValue) {
        if (newValue instanceof Rect) {
            this.beginUpdate();
            this.left = newValue.left;
            this.top = newValue.top;
            this.width = newValue.width;
            this.height = newValue.height;
            this.endUpdate();
        }
    }
    //#endregion bounds
    //#region clipped
    get clipped() {
        return this.#clipped;
    }
    set clipped(newValue) {
        core.tools.isBool(newValue) && this.#clipped !== newValue
            && (this.#clipped = newValue);
    }
    //#endregion clipped
    //#region reflected
    get reflected() {
        return this.#reflected;
    }
    set reflected(newValue) {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && this.#reflected !== newValue) {
            (this.#reflected = newValue);
            if (core.isHTMLRenderer) {
                newValue
                    ? htmlElement.classList.add('reflected')
                    : htmlElement.classList.remove('reflected');
            }
        }
    }
    //#endregion reflected
    //#region forceDisplayVisibility
    get forceDisplayVisibility() {
        return this.#forceDisplayVisibility;
    }
    set forceDisplayVisibility(newValue) {
        core.tools.isBool(newValue) && this.#forceDisplayVisibility !== newValue
            && (this.#forceDisplayVisibility = newValue);
    }
    //#endregion forceDisplayVisibility
    //#region allowUpdate
    get allowUpdate() {
        return this.#allowUpdate;
    }
    set allowUpdate(newValue) {
        core.tools.isBool(newValue) && this.#allowUpdate !== newValue
            && (this.#allowUpdate = newValue);
    }
    //#endregion allowUpdate
    //#region autoTranslate
    get autoTranslate() {
        return this.#autoTranslate;
    }
    set autoTranslate(newValue) {
        core.tools.isBool(newValue) && this.#autoTranslate !== newValue
            && (this.#autoTranslate = newValue);
    }
    //#endregion autoTranslate
    //#region isMouseOver
    get isMouseOver() {
        return this.#isMouseOver;
    }
    set isMouseOver(newValue) {
        core.tools.isBool(newValue) && this.#mouseEvents.mouseenter && this.#isMouseOver !== newValue
            && (this.#isMouseOver = newValue);
    }
    //#endregion isMouseOver
    //#region isFocused
    get isFocused() {
        return this.#isFocused;
    }
    set isFocused(newValue) {
        //#region Variables déclaration
        const form = this.form;
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && this.#isFocused !== newValue) {
            this.#isFocused = newValue;
            let lastFc;
            form.focusedControl && (core.classes.CustomTextControl
                && form.focusedControl instanceof core.classes.CustomTextControl) && !newValue
                && (lastFc = form.focusedControl);

            if (newValue) {
                form.focusedControl = this;
            } else if (form.focusedControl === this) {
                form.focusedControl = null;
            }
            if (htmlElement && !this.updating) {
                newValue && this.#showFocus ? htmlElement.classList.add('focused') : htmlElement.classList.remove('focused');
            }
            !newValue && this.killFocus();
            lastFc && lastFc.inputObj && lastFc.inputObj.blur();
        }
    }
    //#endregion isFocused
    //#region isPressed
    get isPressed() {
        return this.#isPressed;
    }
    set isPressed(newValue) {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && this.#mouseEvents.mousedown && this.#isPressed !== newValue) {
            this.#isPressed = newValue;
            core.isHTMLRenderer && htmlElement.classList.remove('pressed');
            newValue && (core.isHTMLRenderer && htmlElement.classList.add('pressed'));
        }
    }
    //#endregion isPressed
    //#region closePopups
    get closePopups() {
        return this.#closePopups;
    }
    set closePopups(newValue) {
        //#region Variables déclaration
        const components = this.components;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && this.#closePopups !== newValue) {
            this.#closePopups = newValue;
            components.forEach(comp => {
                comp instanceof core.classes.Control && (comp.closePopups = newValue);
            });
        }
    }
    //#endregion closePopups
    //#region wrapper
    get wrapper() {
        return this.#wrapper;
    }
    set wrapper(newValue) {
        core.tools.isString(newValue) && this.#wrapper !== newValue && (this.#wrapper = newValue);
    }
    //#endregion wrapper
    //#region hasResizeEvent
    get hasResizeEvent() {
        return this.#hasResizeEvent;
    }
    set hasResizeEvent(newValue) {
        core.tools.isBool(newValue) && this.#hasResizeEvent !== newValue && (this.#hasResizeEvent = newValue);
    }
    //#endregion hasResizeEvent
    //#region resizeData
    get resizeData() {
        return this.#resizeData;
    }
    //#endregion resizeData
    //#region tabList
    get tabList() {
        return this.#tabList;
    }
    //#endregion tabList
    //#region constraints
    get constraints() {
        return this.#constraints;
    }
    set constraints(newValue) {
        newValue instanceof core.classes.Constraints && this.#constraints !== newValue
            && (this.#constraints = newValue);
    }
    //#endregion constraints
    //#region ownerShowToolTip
    get ownerShowToolTip() {
        return this.#ownerShowToolTip;
    }
    set ownerShowToolTip(newValue) {
        core.tools.isBool(newValue) && this.#ownerShowToolTip !== newValue && (this.#ownerShowToolTip = newValue);
    }
    //#endregion ownerShowToolTip
    //#region autoCapture
    get autoCapture() {
        return this.#autoCapture;
    }
    set autoCapture(newValue) {
        core.tools.isBool(newValue) && this.#autoCapture !== newValue && (this.#autoCapture = newValue);
    }
    //#endregion autoCapture
    //#region padding
    get padding() {
        return this.#padding;
    }
    //#endregion padding
    //#region margin
    get margin() {
        return this.#margin;
    }
    //#endregion margin
    //#region popupMenu
    get popupMenu() {
        return this.#popupMenu;
    }
    set popupMenu(newValue) {
        newValue instanceof core.classes.PopupMenu && this.#popupMenu !== newValue
            && (this.#popupMenu = newValue);
    }
    //#endregion popupMenu
    //#region opacity
    get opacity() {
        return this.#opacity;
    }
    set opacity(newValue) {
        if (core.tools.isNumber(newValue)) {
            newValue = Math.max(Math.min(newValue, 0), 0);
            if (this.#opacity !== newValue) {
                this.#opacity = newValue;
                this.propertyChanged('opacity');
                !this.loading && !this.form.loading
                    && (this.HTMLElementStyle.opacity = newValue);
            }
        }
    }
    //#endregion opacity
    //#region contentWidth
    get contentWidth() {
        //#region Variables déclaration
        const owner = this.owner;
        let width = this.#width;
        const margin = this.#margin;
        const padding = this.#padding;
        //#endregion Variables déclaration
        core.tools.isString(width) && width.endsWith('%')
            && (width = owner.contentWidth * (parseFloat(width) / 100));
        width -= margin.left + margin.right + padding.left + padding.right;
        return width;
    }
    //#endregion contentWidth
    //#region width
    get width() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (!core.isHTMLRenderer) {
            return this.#width;
        } else {
            let width = htmlElement.offsetWidth > 0 ?
                htmlElement.offsetWidth :
                parseInt(getComputedStyle(this.HTMLElement).width, 10);
            this.#width = this.#width !== width && width > 0 ? width : this.#width;
            return this.#width;
        }
    }
    set width(newValue) {
        //#region Variables déclaration
        const htmlElementStyle = this.HTMLElementStyle;
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && this.#width !== newValue) {
            if (!core.isHTMLRenderer) {
                this.#width = newValue;
                this.realignChilds();
            } else if (!this.loading) {
                this.propertyChanged('width');
                newValue < 0
                    ? htmlElementStyle.width = 'auto'
                    : htmlElementStyle.width = `${newValue}${core.types.CSSUNITS.PX}`;
                this.#width = newValue;
                //this._boundingClientRect.right=this._boundingClientRect.left+this.HTMLElement.offsetWidth;
            }
        }
    }
    //#endregion width
    //#region contentHeight
    get contentHeight() {
        //#region Variables déclaration
        const owner = this.owner;
        let height = this.#height;
        const margin = this.#margin;
        const padding = this.#padding;
        //#endregion Variables déclaration
        core.tools.isString(height) && height.endsWith('%')
            && (height = owner.contentWidth * (parseFloat(height) / 100));
        height -= margin.top + margin.bottom + padding.top + padding.bottom;
        return height;
    }
    //#endregion contentHeight
    //#region height
    get height() {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (!core.isHTMLRenderer) {
            return this.#height;
        } else {
            let height = htmlElement.offsetHeight > 0 ?
                htmlElement.offsetHeight :
                parseInt(getComputedStyle(this.HTMLElement).height, 10);
            this.#height = this.#height !== height && height > 0 ? height : this.#height;
            return this.#height;
        }
    }
    set height(newValue) {
        //#region Variables déclaration
        const htmlElementStyle = this.HTMLElementStyle;
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && this.#height !== newValue) {
            if (!core.isHTMLRenderer) {
                this.#height = newValue;
                this.realignChilds();
            } else if (!this.loading) {
                this.propertyChanged('height');
                newValue < 0
                    ? htmlElementStyle.height = 'auto'
                    : htmlElementStyle.height = `${newValue}${core.types.CSSUNITS.PX}`;
                this.#height = newValue;
            }
        }
    }
    //#endregion height
    //#region scale
    get scale() {
        return this.#scale;
    }
    set scale(newValue) {
        //#region Variables déclaration
        const scale = this.#scale;
        //#endregion Variables déclaration
        if (newValue instanceof core.classes.Point && !scale.equals(newValue)) {
            scale.assign(newValue);
            if (!this.loading && !this.form.loading) {
                !core.isHTMLRenderer ? this.update() : this.applyTransforms();
            }
        }
    }
    //#endregion scale
    //#region canFocused
    get canFocused() {
        return this.#canFocused;
    }
    set canFocused(newValue) {
        core.tools.isBool(newValue) && this.#canFocused !== newValue && (this.#canFocused = newValue);
    }
    //#endregion canFocused
    //#region showFocus
    get showFocus() {
        return this.#showFocus;
    }
    set showFocus(newValue) {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && this.#showFocus !== newValue) {
            this.#showFocus = newValue;
            if (!newValue) {
                htmlElement.classList.remove('focused');
            } else if (this.#isFocused) {
                htmlElement.classList.add('focused');
            }
        }
    }
    //#endregion showFocus
    //#region enabled
    get enabled() {
        return this.#enabled;
    }
    set enabled(newValue) {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && this.#enabled !== newValue) {
            this.#enabled = newValue;
            core.isHTMLRenderer && htmlElement.classList.remove('disabled');
            if (!newValue) {
                core.isHTMLRenderer && htmlElement.classList.add('disabled');
                this.#isPressed = !1;
            }
            const comps = this.components.filter(e => {
                return e instanceof core.classes.Control;
            });
            comps.forEach(comp => {
                comp.enabled = newValue;
            });
        }
    }
    //#endregion enabled
    //#region rotateCenter
    get rotateCenter() {
        return this.#rotateCenter;
    }
    set rotateCenter(newValue) {
        //#region Variables déclaration
        const PO = core.types.CSSUNITS.PO;
        const rotateCenter = this.#rotateCenter;
        //#endregion Variables déclaration
        if (newValue instanceof core.classes.Point && !rotateCenter.equals(newValue)) {
            rotateCenter.assign(newValue);
            !this.loading && !this.form.loading
                && (this.HTMLElementStyle.transformOrigin = `${newValue.x}${PO} ${newValue.y}${PO}`);
        }
    }
    //#endregion rotateCenter
    //#region toolTip
    get toolTip() {
        return this.#toolTip;
    }
    set toolTip(newValue) {
        core.tools.isString(newValue) && this.#toolTip !== newValue && (this.#toolTip = newValue);
    }
    //#endregion toolTip
    //#region showToolTip
    get showToolTip() {
        return this.#showToolTip;
    }
    set showToolTip(newValue) {
        core.tools.isBool(newValue) && this.#showToolTip !== newValue && (this.#showToolTip = newValue);
    }
    //#endregion showToolTip
    //#region mouseEvents
    get mouseEvents() {
        return this.#mouseEvents;
    }
    //set mouseEvents(newValue) {
    //    //#region Variables déclaration
    //    const priv = internal(this);
    //    const mouseEvents = this.#mouseEvents;
    //    //#endregion Variables déclaration
    //    if (core.tools.isBool(newValue)) {
    //        hitTest.mouseDown = hitTest.mouseMove =
    //            hitTest.mouseUp = /*hitTest.mouseWheel = */hitTest.dblClick = newValue;
    //    }
    //}
    //#endregion mouseEvents
    //#region rotateAngle
    get rotateAngle() {
        return this.#rotateAngle;
    }
    set rotateAngle(newValue) {
        if (core.tools.isNumber(newValue) && this.#rotateAngle !== newValue) {
            this.#rotateAngle = newValue;
            this.propertyChanged('rotateAngle');
            !this.loading && !this.form.loading && core.isHTMLRenderer && this.applyTransforms();
        }
    }
    //#endregion rotateAngle
    //#region customStyle
    get customStyle() {
        return this.#customStyle;
    }
    set customStyle(newValue) {
        core.tools.isString(newValue) && this.#customStyle !== newValue && (this.#customStyle = newValue);
    }
    //#endregion customStyle
    //#region cssClasses
    get cssClasses() {
        return this.#cssClasses;
    }
    set cssClasses(newValue) {
        if (core.tools.isString(newValue) && this.#cssClasses !== newValue) {
            this.#cssClasses = newValue;
            this.HTMLElement.classList.add(newValue);
        }
    }
    //#endregion cssClasses
    //#region tabOrder
    get tabOrder() {
        return this.#tabOrder;
    }
    set tabOrder(newValue) {
        //#region Variables déclaration
        const tabList = this.owner.tabList;
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue)) {
            const curIndex = tabList.indexOf(this);
            if (curIndex >= 0) {
                const count = tabList.length;
                newValue = Math.max(Math.min(newValue, 0), count - 1);
                if (newValue !== curIndex) {
                    tabList.deleteAt(curIndex);
                    tabList.insert(newValue, this);
                    this.#tabOrder = newValue;
                }
            } else {
                this.#tabOrder = newValue;
                tabList.push(this);
            }
        }
    }
    //#endregion tabOrder
    //#region right
    get right() {
        return this.#right;
    }
    set right(newValue) {
        //#region Variables déclaration
        const htmlElementStyle = this.HTMLElementStyle;
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) || newValue === null && this.#right !== newValue) {
            this.#right = newValue;
            this.propertyChanged('right');
            if (core.isHTMLRenderer && !this.loading && !this.form.loading) {
                htmlElementStyle.right = `${newValue}${core.types.CSSUNITS.PX}`;
                htmlElementStyle.width = String.EMPTY;
            }
        }
    }
    //#endregion right
    //#region bottom
    get bottom() {
        return this.#bottom;
    }
    set bottom(newValue) {
        //#region Variables déclaration
        const htmlElementStyle = this.HTMLElementStyle;
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) || newValue === null && this.#bottom !== newValue) {
            this.#bottom = newValue;
            this.propertyChanged('bottom');
            if (core.isHTMLRenderer && !this.loading && !this.form.loading) {
                htmlElementStyle.bottom = `${newValue}${core.types.CSSUNITS.PX}`;
                htmlElementStyle.height = String.EMPTY;
            }
        }
    }
    //#endregion bottom
    //#region doubleClick
    get doubleClick() {
        return this.#doubleClick;
    }
    set doubleClick(newValue) {
        core.tools.isBool(newValue) && this.#doubleClick !== newValue && (this.#doubleClick = newValue);
    }
    //#endregion doubleClick
    //#region visible
    get visible() {
        return super.visible;
    }
    set visible(newValue) {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && super.visible !== newValue) {
            super.visible = newValue;
            this.propertyChanged('visible');
            if (core.isHTMLRenderer) {
                if (newValue) {
                    //this._applyAllStyles();
                    this.#forceDisplayVisibility
                        ? htmlElement.classList.remove('noDisplay')
                        : htmlElement.classList.remove('hidden');
                } else {
                    this.#forceDisplayVisibility
                        ? htmlElement.classList.add('noDisplay')
                        : htmlElement.classList.add('hidden');
                }
            }
            //if (owner && owner.update) {
            //    owner.update();
            //}
        }
    }
    //#endregion visible
    //#region display
    get display() {
        return this.HTMLElementStyle.display;
    }
    set display(newValue) {
        //#region Variables déclaration
        const htmlElementStyle = this.HTMLElementStyle;
        //#endregion Variables déclaration
        core.tools.isString(newValue) && core.isHTMLRenderer && htmlElementStyle.display !== newValue
            && (htmlElementStyle.display = newValue);
    }
    //#endregion display
    //#region isEnabled
    get isEnabled() {
        //#region Variables déclaration
        let enabled = this.#enabled;
        const owners = this.owners;
        //#endregion Variables déclaration
        if (enabled) {
            owners.forEach(owner => {
                enabled = enabled && owner.enabled;
            });
        }
        return enabled;
    }
    //#endregion isEnabled
    //#region localRect
    get localRect() {
        //#region Variables déclaration
        const padding = this.#padding;
        //#endregion Variables déclaration
        return new core.classes.Rect(padding.left, padding.top, padding.right, padding.bottom);
    }
    //#endregion localRect
    //#region template
    get template() {
        //#region Variables déclaration
        let html = super.template;
        const a = html.split('{cssClasses}');
        //#endregion Variables déclaration
        html = a.join(this.#cssClasses);
        return html;
    }
    //#endregion template
    //#region column
    get column() {
        if (this.owner instanceof core.classes.GridLayout) {
            return this.#column;
        }
        return null;
    }
    set column(newValue) {
        if (this.owner instanceof core.classes.GridLayout && core.tools.isNumber(newValue) && this.#column !== newValue) {
            this.#column = newValue;
            this.#updateCell();
        }
    }
    //#endregion column
    //#region row
    get row() {
        return this.owner instanceof core.classes.GridLayout
            ? this.#row : null;
    }
    set row(newValue) {
        if (this.owner instanceof core.classes.GridLayout && core.tools.isNumber(newValue) && this.#row !== newValue) {
            this.#row = newValue;
            this.#updateCell();
        }
    }
    //#endregion row
    //#region colSpan
    get colSpan() {
        return this.owner instanceof core.classes.GridLayout
            ? this.#colSpan : null;
    }
    set colSpan(newValue) {
        if (this.owner instanceof core.classes.GridLayout && core.tools.isNumber(newValue)
            && this.#colSpan !== newValue) {
            this.#colSpan = newValue;
            this.#updateCell();
        }
    }
    //#endregion colSpan
    //#region rowSpan
    get rowSpan() {
        return this.owner instanceof core.classes.GridLayout
            ? this.#rowSpan : null;
    }
    set rowSpan(newValue) {
        if (this.owner instanceof core.classes.GridLayout && core.tools.isNumber(newValue)
            && this.#rowSpan !== newValue) {
            this.#rowSpan = newValue;
            this.#updateCell();
        }
    }
    //#endregion rowSpan
    //#endregion Getter / Setter
    //#region Methods
    //#region getDataSetValue
    getDataSetValue(dataName) {
        return this.HTMLElement.dataset[dataName];
    }
    setDataSetValue(dataName, value) {
        this.HTMLElement.dataset[dataName] = value;
    }
    //#endregion getDataSetValue
    //#region setBounds
    setBounds(l, t, w, h) {
        //#region Variables déclaration
        const PX = core.types.CSSUNITS.PX;
        const htmlElementStyle = this.HTMLElementStyle;
        const cStyle = getComputedStyle(this.HTMLElement);
        //#endregion Variables déclaration
        if (core.tools.isNumber(l) && core.tools.isNumber(t) && core.tools.isNumber(w) && core.tools.isNumber(h)) {
            if (!core.isHTMLRenderer) {
                this.left = l;
                this.top = t;
                this.width = w;
                this.height = h;
            } else {
                if (cStyle.position === 'absolute') {
                    htmlElementStyle.left = `${l}${PX}`;
                    htmlElementStyle.top = `${t}${PX}`;
                    htmlElementStyle.width = `${w}${PX}`;
                    htmlElementStyle.height = `${h}${PX}`;
                }
            }
        }
    }
    //#endregion setBounds
    //#region setDimension
    setDimension(width, height) {
        //#region Variables déclaration
        const PX = core.types.CSSUNITS.PX;
        const htmlElementStyle = this.HTMLElementStyle;
        //#endregion Variables déclaration
        if (core.tools.isNumber(width) && core.tools.isNumber(height)) {
            htmlElementStyle.width = `${width}${PX}`;
            htmlElementStyle.height = `${height}${PX}`;
        }
    }
    //#endregion setDimension
    //#region resize
    resize() {
        //#region Variables déclaration
        const htmlElementStyle = this.HTMLElementStyle;
        //#endregion Variables déclaration
        if (htmlElementStyle && this.inForm) {
            htmlElementStyle.width = this.#width < 0 ? 'auto' : `${this.#width}${core.types.CSSUNITS.PX}`;
            htmlElementStyle.height = this.#height < 0 ? 'auto' : `${this.#height}${core.types.CSSUNITS.PX}`;
        }
    }
    //#endregion resize
    //#region sizing
    sizing() {
        //#region Variables déclaration
        const htmlElementStyle = this.HTMLElementStyle;
        const PX = core.types.CSSUNITS.PX;
        const right = this.#right;
        //#endregion Variables déclaration
        if (core.isHTMLRenderer) {
            this.applyTransforms();
            if (this.#column > 0 || this.#row > 0 || this.#colSpan > 1 || this.#rowSpan > 1
                && this.owner instanceof core.classes.GridLayout) {
                htmlElementStyle.gridColumn = `${this.#column} / ${this.#colSpan > 1 ? 'span ' + this.#colSpan : this.#column + 1}`;
                htmlElementStyle.gridRow = `${this.#row} / ${this.#rowSpan > 1 ? 'span ' + this.#rowSpan : this.#row + 1}`;
            }
            !this.#margin.isEmpty
                && (htmlElementStyle.margin = `${this.#margin.top}${PX} ${this.#margin.right}${PX} ${this.#margin.bottom}${PX} ${this.#margin.left}${PX}`);
            !this.#padding.isEmpty
                && (htmlElementStyle.padding = `${this.#padding.top}${PX} ${this.#padding.right}${PX} ${this.#padding.bottom}${PX} ${this.#padding.left}${PX}`);
        } else {
            core.canvas.needRedraw = !0;
        }
        if (this.form !== this) {
            if (right !== null) {
                const oldRight = right;
                this.#right = null;
                this.right = oldRight;
            }
            core.isHTMLRenderer && this.inForm && this.resize();
        }
    }
    //#endregion sizing
    //#region realignChilds
    realignChilds() {
        //#region Variables déclaration
        const PX = core.types.CSSUNITS.PX;
        const ALIGNS = core.types.ALIGNS;
        const comps = this.components;
        const padding = this.#padding;
        const width = this.contentWidth;// - padding.left - padding.right;
        let height = this.contentHeight;// - padding.top - padding.bottom;
        let l = padding.left;
        let t = padding.top;
        let r = padding.right;
        let b = padding.bottom;
        const alignTop = (child) => {
            if (core.isHTMLRenderer) {
                const htmlElementStyle = child.HTMLElementStyle;
                const cStyle = getComputedStyle(child.HTMLElement);
                if (cStyle.position === 'absolute') {
                    htmlElementStyle.top = t > 0 ? `${t}${PX}` : '0';
                    htmlElementStyle.left = l > 0 ? `${l}${PX}` : '0';
                    htmlElementStyle.right = r > 0 ? `${r}${PX}` : '0';
                    htmlElementStyle.width = 'auto';
                    htmlElementStyle.bottom = 'auto';
                    htmlElementStyle.height === 'auto'
                        && (htmlElementStyle.height = `${child.owner.HTMLElement.offsetHeight - t - b}${PX}`);
                    child.applyTransforms();
                    t += int(cStyle.marginTop) + child.HTMLElement.offsetHeight + int(cStyle.marginBottom);
                }
            } else {
                child.top = t;
                child.left = l;
                child.width = width;
                t += child.height + child.margin.top + child.margin.bottom;
                height -= child.height + child.margin.top + child.margin.bottom;
            }
            child.realignChilds();
        };
        const alignBottom = (child) => {
            if (core.isHTMLRenderer) {
                const htmlElementStyle = child.HTMLElementStyle;
                const cStyle = getComputedStyle(child.HTMLElement);
                if (cStyle.position === 'absolute') {
                    htmlElementStyle.bottom = b > 0 ? `${b}${PX}` : '0';
                    htmlElementStyle.left = l > 0 ? `${l}${PX}` : '0';
                    htmlElementStyle.right = r > 0 ? `${r}${PX}` : '0';
                    htmlElementStyle.width = 'auto';
                    htmlElementStyle.top = 'auto';
                    htmlElementStyle.height === 'auto'
                        && (htmlElementStyle.height = `${child.owner.HTMLElement.offsetHeight - t - b}${PX}`);
                    child.applyTransforms();
                    b += int(cStyle.marginTop) + child.HTMLElement.offsetHeight + int(cStyle.marginBottom);
                }
            }
            child.realignChilds();
        };
        const alignLeft = (child) => {
            if (core.isHTMLRenderer) {
                const htmlElementStyle = child.HTMLElementStyle;
                const cStyle = getComputedStyle(child.HTMLElement);
                if (cStyle.position === 'absolute') {
                    htmlElementStyle.top = t > 0 ? `${t}${PX}` : '0';
                    htmlElementStyle.left = l > 0 ? `${l}${PX}` : '0';
                    htmlElementStyle.right = 'auto';
                    htmlElementStyle.bottom = b > 0 ? `${b}${PX}` : '0';
                    htmlElementStyle.height = 'auto';
                    htmlElementStyle.width === 'auto'
                        && (htmlElementStyle.width = `${child.owner.HTMLElement.offsetWidth - l - r}${PX}`);
                    child.applyTransforms();
                    l += int(cStyle.marginLeft) + child.HTMLElement.offsetWidth + int(cStyle.marginRight);
                }
            }
            child.realignChilds();
        };
        const alignRight = (child) => {
            if (core.isHTMLRenderer) {
                const htmlElementStyle = child.HTMLElementStyle;
                const cStyle = getComputedStyle(child.HTMLElement);
                if (cStyle.position === 'absolute') {
                    htmlElementStyle.top = t > 0 ? `${t}${PX}` : '0';
                    htmlElementStyle.left = 'auto';
                    htmlElementStyle.right = r > 0 ? `${r}${PX}` : '0';
                    htmlElementStyle.bottom = b > 0 ? `${b}${PX}` : '0';
                    htmlElementStyle.height = 'auto';
                    htmlElementStyle.width === 'auto'
                        && (htmlElementStyle.width = `${child.owner.HTMLElement.offsetWidth - l - r}${PX}`);
                    child.applyTransforms();
                    r += int(cStyle.marginLeft) + child.HTMLElement.offsetWidth + int(cStyle.marginRight);
                }
            }
            child.realignChilds();
        };
        //#endregion Variables déclaration
        if (comps.length === 0 || !this.#allowUpdate) {
            return null;
        }
        //#region mostTop
        let childs = comps.filter(e => {
            return e.align === ALIGNS.MOSTTOP && e.visible;
        });
        childs.forEach(child => {
            alignTop(child);
        });
        //#endregion
        //#region mostBottom
        childs = comps.filter(e => {
            return e.align === ALIGNS.MOSTBOTTOM && e.visible;
        });
        childs.forEach(child => {
            alignBottom(child);
        });
        //#endregion
        //#region mostLeft
        childs = comps.filter(e => {
            return e.align === ALIGNS.MOSTLEFT && e.visible;
        });
        childs.forEach(child => {
            alignLeft(child);
        });
        //#endregion
        //#region mostRight
        childs = comps.filter(e => {
            return e.align === ALIGNS.MOSTRIGHT && e.visible;
        });
        childs.forEach(child => {
            alignRight(child);
        });
        //#endregion
        //#region top
        childs = comps.filter(e => {
            return e.align === ALIGNS.TOP && e.visible;
        });
        childs.forEach(child => {
            alignTop(child);
        });
        //#endregion
        //#region bottom
        childs = comps.filter(e => {
            return e.align === ALIGNS.BOTTOM && e.visible;
        });
        childs.forEach(child => {
            alignBottom(child);
        });
        //#endregion
        //#region left
        childs = comps.filter(e => {
            return e.align === ALIGNS.LEFT && e.visible;
        });
        childs.forEach(child => {
            alignLeft(child);
        });
        //#endregion
        //#region right
        childs = comps.filter(e => {
            return e.align === ALIGNS.RIGHT && e.visible;
        });
        childs.forEach(child => {
            alignRight(child);
        });
        //#endregion
        //#region client
        childs = comps.filter(e => {
            return e.align === ALIGNS.CLIENT && e.visible;
        });
        childs.forEach(child => {
            if (core.isHTMLRenderer) {
                const cStyle = getComputedStyle(child.HTMLElement);
                const htmlElementStyle = child.HTMLElementStyle;
                htmlElementStyle.height = 'auto';
                htmlElementStyle.width = 'auto';
                if (cStyle.position === 'absolute') {
                    htmlElementStyle.top = t > 0 ? `${t}${PX}` : '0';
                    htmlElementStyle.left = l > 0 ? `${l}${PX}` : '0';
                    htmlElementStyle.right = r > 0 ? `${r}${PX}` : '0';
                    htmlElementStyle.bottom = b > 0 ? `${b}${PX}` : '0';
                    child.applyTransforms();
                } else {
                    htmlElementStyle.flex = '1';
                }
            } else {
                child.top = t;
                child.left = l;
                child.width = width;
                child.height = height;
            }
            child.realignChilds();
        });
        //#endregion
        //#region horizontal
        childs = this.components.filter(e => {
            return e.align === ALIGNS.HORIZONTAL && e.visible;
        });
        childs.forEach(child => {
            if (core.isHTMLRenderer) {
                const cStyle = getComputedStyle(child.HTMLElement);
                const htmlElementStyle = child.HTMLElementStyle;
                if (cStyle.position === 'absolute') {
                    htmlElementStyle.left = l > 0 ? `${l}${PX}` : '0';
                    htmlElementStyle.right = r > 0 ? `${r}${PX}` : '0';
                    htmlElementStyle.width = 'auto';
                    child.applyTransforms();
                }
            }
            child.realignChilds();
        });
        //#endregion
        //#region vertical
        childs = this.components.filter(e => {
            return e.align === ALIGNS.VERTICAL && e.visible;
        });
        childs.forEach(child => {
            if (core.isHTMLRenderer) {
                const cStyle = getComputedStyle(child.HTMLElement);
                const htmlElementStyle = child.HTMLElementStyle;
                if (cStyle.position === 'absolute') {
                    htmlElementStyle.top = l > 0 ? `${l}${PX}` : '0';
                    htmlElementStyle.bottom = b > 0 ? `${b}${PX}` : '0';
                    htmlElementStyle.height = 'auto';
                    child.applyTransforms();
                }
            }
            child.realignChilds();
        });
        //#endregion
        //#region contents
        childs = this.components.filter(e => {
            return e.align === ALIGNS.CONTENTS && e.visible;
        });
        childs.forEach(child => {
            if (core.isHTMLRenderer) {
                const cStyle = getComputedStyle(child.HTMLElement);
                const htmlElementStyle = child.HTMLElementStyle;
                if (cStyle.position === 'absolute') {
                    htmlElementStyle.top = '0';
                    htmlElementStyle.left = '0';
                    htmlElementStyle.bottom = '0';
                    htmlElementStyle.right = '0';
                    htmlElementStyle.height = 'auto';
                    htmlElementStyle.width = 'auto';
                    child.applyTransforms();
                }
            }
            child.realignChilds();
        });
        //#endregion
        //#region center
        childs = this.components.filter(e => {
            return e.align === ALIGNS.CENTER && e.visible;
        });
        childs.forEach(child => {
            if (core.isHTMLRenderer) {
                const cStyle = getComputedStyle(child.HTMLElement);
                const htmlElementStyle = child.HTMLElementStyle;
                if (cStyle.position === 'absolute') {
                    htmlElementStyle.top = '50%';
                    htmlElementStyle.left = '50%';
                    htmlElementStyle.bottom = 'auto';
                    htmlElementStyle.right = 'auto';
                    child.applyTransforms('translate(-50%,-50%)');
                }
            }
            child.realignChilds();
        });
        //#endregion
        //#region horzCenter
        childs = this.components.filter(e => {
            return e.align === ALIGNS.HORZCENTER && e.visible;
        });
        childs.forEach(child => {
            if (core.isHTMLRenderer) {
                const cStyle = getComputedStyle(child.HTMLElement);
                const htmlElementStyle = child.HTMLElementStyle;
                if (cStyle.position === 'absolute') {
                    htmlElementStyle.top = l > 0 ? `${l}${PX}` : '0';
                    htmlElementStyle.bottom = b > 0 ? `${b}${PX}` : '0';
                    htmlElementStyle.left = '50%';
                    htmlElementStyle.height = 'auto';
                    child.applyTransforms('translateX(-50%)');
                }
            }
            child.realignChilds();
        });
        //#endregion
        //#region vertCenter
        childs = this.components.filter(e => {
            return e.align === ALIGNS.VERTCENTER && e.visible;
        });
        childs.forEach(child => {
            if (core.isHTMLRenderer) {
                const cStyle = getComputedStyle(child.HTMLElement);
                const htmlElementStyle = child.HTMLElementStyle;
                if (cStyle.position === 'absolute') {
                    htmlElementStyle.left = l > 0 ? `${l}${PX}` : '0';
                    htmlElementStyle.right = b > 0 ? `${b}${PX}` : '0';
                    htmlElementStyle.top = '50%';
                    htmlElementStyle.width = 'auto';
                    child.applyTransforms('translateY(-50%)');
                }
            }
            child.realignChilds();
        });
        //#endregion
        //#region topRight
        //childs=this._components.filter(function(e,i,a) {
        //  return (e.align===core.types.ALIGNS.TOPRIGHT)&&e.visible;
        //});
        //#endregion
        //#region bottomLeft
        //childs=this._components.filter(function(e,i,a) {
        //  return (e.align===core.types.ALIGNS.BOTTOMLEFT)&&e.visible;
        //});
        //#endregion
        //#region bottomRight
        //childs=this._components.filter(function(e,i,a) {
        //  return (e.align===core.types.ALIGNS.BOTTOMRIGHT)&&e.visible;
        //});
        //#endregion
    }
    //#endregion realignChilds
    //#region insertTemplate
    insertTemplate(tpl) {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (htmlElement) {
            const div = document.createElement(core.types.HTMLELEMENTS.DIV);
            div.innerHTML = tpl;
            htmlElement.appendChild(div.firstElementChild);
        }
    }
    //#endregion insertTemplate
    //#region setFocus
    setFocus() {
        this.#canFocused && this.visible && this.isEnabled && this.enterFocus();
    }
    //#endregion setFocus
    //#region beginUpdate
    beginUpdate() {
        this.#allowUpdate = !1;
        if (core.isHTMLRenderer) {
            //this.#wrapper = this.HTMLElement.innerHTML;
        }
    }
    //#endregion beginUpdate
    //#region endUpdate
    endUpdate() {
        this.#allowUpdate = !0;
        this.realignChilds();
        //this.update();
        //if (this._owner._allowUpdate&&core.renderer!==core.types.renderers.HTML) this.redraw(this.lastRect);
        //this.HTMLElement.innerHTML = this._wrapper;
        //for (let i=0,l=this.wrapperClass.length;i<l;i++) {
        //  let id=this.wrapperClass[i].id,Class=this.wrapperClass[i].Class;
        //  core.tools.execFunc(createComponent",{Class:Class,owner:this,id:id});
        //}
        //this._wrapper = String.EMPTY;
        //this.wrapperClass.clear();
    }
    //#endregion endUpdate
    //#region bringToFront
    bringToFront() {
        //#region Variables déclaration
        const comps = this.owner.components;
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (htmlElement && this.owner) {
            let parentNode = htmlElement.parentNode;
            if (parentNode.children.length > 1) {
                comps.remove(this);
                comps.add(this);
                parentNode = htmlElement.parentNode;
                parentNode.removeChild(htmlElement);
                parentNode.appendChild(htmlElement);
            }
        }
    }
    //#endregion bringToFront
    //#region sendToBack
    sendToBack() {
        //#region Variables déclaration
        const comps = this.owner.components;
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (htmlElement && this.owner) {
            let parentNode = htmlElement.parentNode;
            if (parentNode.children.length > 1) {
                comps.remove(this);
                comps.insert(0, this);
                parentNode = htmlElement.parentNode;
                parentNode.removeChild(htmlElement);
                parentNode.insertBefore(htmlElement, parentNode.firstElementChild);
            }
        }
    }
    //#endregion sendToBack
    //#region forwardOne
    forwardOne() {
        //+1
        //#region Variables déclaration
        const comps = this.owner.components;
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (this.owner && htmlElement) {
            let parentNode = htmlElement.parentNode;
            if (parentNode.children.length > 1) {
                const arr = Array.prototype.slice.call(parentNode.children);
                const lastIdx = arr.indexOf(htmlElement);
                if (lastIdx < arr.length - 1) {
                    const newIdx = lastIdx + 1;
                    comps.remove(this);
                    newIdx >= comps.length ? comps.add(this) : comps.insert(newIdx, this);
                    parentNode = htmlElement.parentNode;
                    parentNode.removeChild(htmlElement);
                    let lastElement = null;
                    lastElement = lastIdx >= arr.length ? null : arr[newIdx + 1];
                    newIdx >= arr.length
                        ? parentNode.appendChild(htmlElement)
                        : parentNode.insertBefore(htmlElement, lastElement);
                }
            }
        }
    }
    //#endregion forwardOne
    //#region backOne
    backOne() {
        //-1
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        const comps = this.owner.components;
        //#endregion Variables déclaration
        if (this.owner && htmlElement) {
            parentNode = htmlElement.parentNode;
            if (parentNode.children.length > 1) {
                const arr = Array.prototype.slice.call(parentNode.children);
                const lastIdx = arr.indexOf(htmlElement);
                if (lastIdx < arr.length && lastIdx > 0) {
                    const newIdx = lastIdx - 1;
                    comps.remove(this);
                    newIdx < 0 ? comps.insert(0, this) : comps.insert(newIdx, this);
                    const parentNode = htmlElement.parentNode;
                    parentNode.removeChild(htmlElement);
                    const lastElement = arr[newIdx];
                    parentNode.insertBefore(htmlElement, lastElement);
                }
            }
        }
    }
    //#endregion backOne
    //#region mouseDown
    mouseDown() {
        //#region Variables déclaration
        const form = this.form;
        //#endregion Variables déclaration
        if (this.#enabled && (this instanceof core.classes.Control) && this.mouseEvents.mousedown) {
            if (form && form instanceof core.classes.Window) {
                if (this.#closePopups) {
                    form.mainMenu && (form.mainMenu.isActive = !1);
                    form.closePopups();
                }
                if (!this.#canFocused && this !== form.content) {
                    const parentCanFocused = this.owner;
                    parentCanFocused && parentCanFocused.canFocused
                        && form.focusedControl !== parentCanFocused
                        && parentCanFocused.setFocus();
                } else if (!this.#isFocused && form.focusedControl !== this) {
                    this.setFocus();
                }
            }
            if (core.mouse.button === Mouse.MOUSEBUTTONS.RIGHT) {
                this.contextMenu();
                return !0;
            } else {
                this.autoCapture && this.capture();
                this.isPressed = !0;
                this.onMouseDown && this.onMouseDown.invoke();
            }
            !core.isHTMLRenderer && (core.canvas.needRedraw = !0);
        }
    }
    //#endregion mouseDown
    //#region mouseUp
    mouseUp() {
        //#region Variables déclaration
        let target = core.mouse.event.target;
        let clicked = !1;
        //#endregion Variables déclaration
        !target.jsObj && (target = target.parentNode);
        if (this instanceof core.classes.Control) {
            this.releaseCapture();
            this.onMouseUp && this.onMouseUp.invoke();
            clicked = this.#isPressed && !this.#doubleClick;
            this.isPressed = !1;
            this.doubleClick = !1;
        }
    }
    //#endregion mouseUp
    //#region mouseMove
    mouseMove() {
        this instanceof core.classes.Control && this.onMouseMove && this.onMouseMove.invoke();
    }
    //#endregion mouseMove
    //#region mouseEnter
    mouseEnter() {
        //#region Variables déclaration
        const CUSTOMCURSORS = core.types.CUSTOMCURSORS;
        const cursor = this.#cursor;
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (this instanceof core.classes.Control) {
            this.isMouseOver = !0;
            this.onMouseEnter && this.onMouseEnter.invoke();
            cursor !== CUSTOMCURSORS.DEFAULT
                && (cursor === CUSTOMCURSORS.WAIT || cursor === CUSTOMCURSORS.PROGRESS)
                && core.animatedCursor.initAnimation(core.isHTMLRenderer ? htmlElement : core.canvas, cursor);
            this.form.app.showToolTip(this, core.mouse.document, !0);
            if (this.#isPressed && core.isHTMLRenderer) {
                htmlElement.classList.add('pressed');
            } else if (!core.isHTMLRenderer) {
                core.canvas.needRedraw = !0;
            }
        }
    }
    //#endregion mouseEnter
    //#region mouseLeave
    mouseLeave() {
        //#region Variables déclaration
        const cursor = this.#cursor;
        const CUSTOMCURSORS = core.types.CUSTOMCURSORS;
        //#endregion Variables déclaration
        if (this instanceof core.classes.Control) {
            this.isMouseOver = !1;
            this.onMouseLeave && this.onMouseLeave.invoke();
            cursor !== CUSTOMCURSORS.DEFAULT
                && (cursor === CUSTOMCURSORS.WAIT || cursor === CUSTOMCURSORS.PROGRESS)
                && core.animatedCursor.stopAnimation();
            this.form.app.hideToolTip();
            if (core.isHTMLRenderer) {
                this.HTMLElement.classList.remove('pressed');
            } else if (!core.isHTMLRenderer) {
                core.canvas.needRedraw = !0;
            }
        }
    }
    //#endregion mouseLeave
    //#region enterFocus
    enterFocus() {
        //#region Variables déclaration
        const focusedControl = this.form.focusedControl;
        //#endregion Variables déclaration
        this instanceof core.classes.Control && this.#canFocused && focusedControl && focusedControl !== this
            && focusedControl.killFocus();
        this.isFocused = !0;
        this.onEnterFocus && this.onEnterFocus.invoke();
    }
    //#endregion enterFocus
    //#region killFocus
    killFocus() {
        if ((this instanceof core.classes.Control) && this.#canFocused) {
            this.isFocused = !1;
            //this._applyTriggerEffect(this,'isFocused');
            //this.startTriggerAnimation(this,'isFocused');
            this.onKillFocus && this.onKillFocus.invoke();
        }
    }
    //#endregion killFocus
    //#region initEvents
    initEvents() {
        //#region Variables déclaration
        const MOUSEEVENTS = Mouse.MOUSEEVENTS;
        const htmlElement = this.HTMLElement;
        const events = [MOUSEEVENTS.OVER, MOUSEEVENTS.OUT, MOUSEEVENTS.CLICK, MOUSEEVENTS.MOVE,
        MOUSEEVENTS.DOWN, MOUSEEVENTS.UP, MOUSEEVENTS.WHEEL, MOUSEEVENTS.DBLCLICK,
        MOUSEEVENTS.SCROLL, MOUSEEVENTS.ENTER, MOUSEEVENTS.LEAVE, MOUSEEVENTS.DRAG, MOUSEEVENTS.DROP,
        MOUSEEVENTS.DRAGEND, MOUSEEVENTS.DRAGENTER, MOUSEEVENTS.DRAGEXIT, MOUSEEVENTS.DRAGLEAVE,
        MOUSEEVENTS.DRAGOVER, MOUSEEVENTS.DRAGSTART
        ];
        //#endregion Variables déclaration
        events.forEach(event => {
            Events.bind(htmlElement, event, this.dispatchEvent, !1);
        });
    }
    //#endregion initEvents
    //#region resetEvent
    resetEvent() {
        //#region Variables déclaration
        const MOUSEEVENTS = Mouse.MOUSEEVENTS;
        const htmlElement = this.HTMLElement;
        const events = [MOUSEEVENTS.OVER, MOUSEEVENTS.OUT, MOUSEEVENTS.CLICK, MOUSEEVENTS.MOVE,
        MOUSEEVENTS.DOWN, MOUSEEVENTS.UP, MOUSEEVENTS.WHEEL, MOUSEEVENTS.DBLCLICK,
        MOUSEEVENTS.SCROLL, MOUSEEVENTS.ENTER, MOUSEEVENTS.LEAVE, MOUSEEVENTS.DRAG, MOUSEEVENTS.DROP,
        MOUSEEVENTS.DRAGEND, MOUSEEVENTS.DRAGENTER, MOUSEEVENTS.DRAGEXIT, MOUSEEVENTS.DRAGLEAVE,
        MOUSEEVENTS.DRAGOVER, MOUSEEVENTS.DRAGSTART
        ];
        //#endregion Variables déclaration
        events.forEach(event => {
            Events.unBind(htmlElement, event, this.dispatchEvent, !1);
        });
    }
    //#endregion resetEvent
    //#region dispatchEvent
    dispatchEvent(event) {
        //#region Variables déclaration
        let htmlObj = event.currentTarget;
        let control = htmlObj.jsObj;
        let activeWin = null;
        const AUTOMATIC = core.types.DRAGMODES.AUTOMATIC;
        const DOCK = core.types.DRAGKINDS.DOCK;
        const MOUSEEVENTS = Mouse.MOUSEEVENTS;
        //#endregion Variables déclaration
        //if (core.isHTMLRenderer) {
        //    while (!control) {
        //        htmlObj = htmlObj.parentNode;
        //        if (htmlObj !== null) {
        //            control = htmlObj.jsObj;
        //        } else {
        //            break;
        //        }
        //    }
        //} else {
        //    control = this;
        //}
        !control && this instanceof core.classes.Component && (control = this);
        if (control && htmlObj === event.target) {
            activeWin = control.form.app.activeWindow;
            activeWin.capturedControl && (control = activeWin.capturedControl);
            core.mouse.getMouseInfos(event);
            if (!control || control.form.destroying || (!control.isEnabled && event.type !== MOUSEEVENTS.MOVE)
                || (control.mouseEvents && !control.mouseEvents.has(event.type))) {
                if (event.type === MOUSEEVENTS.DOWN) {
                    control.closePopups && control.form.closePopups();
                    control.setFocus();
                }
                return;
            }
            switch (event.type) {
                case MOUSEEVENTS.MOVE:
                    if (core.resizeWindow) {
                        activeWin.mouseMove();
                    } else if (core.tools.isFunc(control.mouseMove)) {
                        control.mouseMove();
                    }
                    break;
                case MOUSEEVENTS.DOWN:
                    if (activeWin !== control.form) {
                        activeWin.mainMenu && (activeWin.mainMenu.isActive = !1);
                        activeWin.app.closeAllPopups();
                    }
                    if (control.form && control.form instanceof core.classes.Window) {
                        control.form.setActive();
                        activeWin = control.form;
                        control.autoCapture && (activeWin.capturedControl = control);
                        if (activeWin !== control.form.app.mainWindow) {
                            control.form.app.mainWindow.mainMenu
                                && (control.form.app.mainWindow.mainMenu.isActive = !1);
                            control.form.app.mainWindow.closePopups();
                        }
                    }
                    core.tools.isFunc(control.mouseDown) && control.mouseDown();
                    core.classes.CustomTextControl
                        && activeWin.focusedControl instanceof core.classes.CustomTextControl
                        && activeWin.focusedControl.inputObj.focus();
                    break;
                case MOUSEEVENTS.UP:
                    if (core.resizeWindow) {
                        activeWin.mouseUp();
                    } else if (core.tools.isFunc(control.mouseUp)) {
                        control.mouseUp();
                    }
                    activeWin && (activeWin.capturedControl = null);
                    break;
                case MOUSEEVENTS.CLICK:
                    if (core.resizeWindow) {
                        activeWin.click();
                    } else if (core.tools.isFunc(control.click)) {
                        control.click();
                    }
                    break;
                case MOUSEEVENTS.DBLCLICK:
                    core.tools.isFunc(control.dblClick) && control.dblClick();
                    break;
                case MOUSEEVENTS.OUT:
                case MOUSEEVENTS.LEAVE:
                    activeWin.hoveredControl === control && core.tools.isFunc(control.mouseLeave) && control.mouseLeave();
                    activeWin.hoveredControl = null;
                    break;
                case MOUSEEVENTS.OVER:
                case MOUSEEVENTS.ENTER:
                    if (activeWin.hoveredControl !== control) {
                        activeWin.hoveredControl = control;
                        core.tools.isFunc(control.mouseEnter) && control.mouseEnter();
                    }
                    break;
                case MOUSEEVENTS.DRAG:
                    jsObj.dragMode !== AUTOMATIC && core.tools.isFunc(control.drag) && control.drag();
                    break;
                case MOUSEEVENTS.DROP:
                    if (control.dragKind === DOCK) {
                        if (control.dragMode === AUTOMATIC) {
                            //event.preventDefault();
                            event.target.appendChild(document.getElementById(event.dataTransfer.getData('text')));
                        } else if (core.tools.isFunc(control.drop)) {
                            control.drop();
                        }
                    }
                    break;
                case MOUSEEVENTS.DRAGEND:
                    control.dragMode !== AUTOMATIC && core.tools.isFunc(control.dragEnd) && control.dragEnd();
                    break;
                case MOUSEEVENTS.DRAGENTER:
                    control.dragMode !== AUTOMATIC && core.tools.isFunc(control.dragEnter) && control.dragEnter();
                    break;
                case MOUSEEVENTS.DRAGEXIT:
                    control.dragMode !== AUTOMATIC && core.tools.isFunc(control.dragExit) && control.dragExit();
                    break;
                case MOUSEEVENTS.DRAGLEAVE:
                    control.dragMode !== AUTOMATIC && core.tools.isFunc(control.dragLeave) && control.dragLeave();
                    break;
                case MOUSEEVENTS.DRAGOVER:
                    if (control.dragKind === DOCK) {
                        if (control.dragMode === AUTOMATIC) {
                            event.preventDefault();
                        } else if (core.tools.isFunc(control.dragOver)) {
                            control.dragOver();
                        }
                    }
                    break;
                case MOUSEEVENTS.DRAGSTART:
                    if (control.dragMode === AUTOMATIC) {
                        event.dataTransfer.setData('text', htmlObj.id);
                    } else if (core.tools.isFunc(control.dragStart)) {
                        control.dragStart();
                    }
                    break;
            }
            //console.log(control.name, event.type);
            core.mouse.stopAllEvents(event);
        }
    }
    //#endregion dispatchEvent
    //#region releaseCapture
    releaseCapture() {
        //#region Variables déclaration
        const form = this.form;
        //#endregion Variables déclaration
        form && form.capturedControl === this && (form.capturedControl = null);
    }
    //#endregion releaseCapture
    //#region capture
    capture() {
        //#region Variables déclaration
        const form = this.form;
        //#endregion Variables déclaration
        form && (form.capturedControl = this);
    }
    //#endregion capture
    //#region click
    click() {
        //#region Variables déclaration
        const action = this.hasOwnProperty('action') ? this.action : null;
        //#endregion Variables déclaration
        if (this.onClick && this.onClick.hasListener) {
            this.onClick.invoke();
        } else if (action) {
            action.execute();
        }
    }
    //#endregion click
    //#region dblClick
    dblClick() {
        this.onDblClick && this.onDblClick.invoke();
    }
    //#endregion dblClick
    //#region keyDown
    keyDown() {
        this.onKeyDown && this.onKeyDown.invoke();
        core.keyboard.key === Keyboard.VKEYSCODES.VK_SPACE
            && !(this instanceof core.classes.CustomTextControl)
            && (this.isPressed = !0);
    }
    //#endregion keyDown
    //#region keyUp
    keyUp() {
        //#region Variables déclaration
        const VKEYSCODES = Keyboard.VKEYSCODES;
        //#endregion Variables déclaration
        this.onKeyUp && this.onKeyUp.invoke();
        if (core.keyboard.key === VKEYSCODES.VK_SPACE || core.keyboard.key === VKEYSCODES.VK_ENTER) {
            if (!(this instanceof core.classes.CustomTextControl)) {
                this.click();
                this.isPressed = !1;
            }
        } else if (core.keyboard.key === VKEYSCODES.VK_CONTEXTMENU) {
            if (this.#popupMenu) {
                const pt = this.clientToDocument();
                this.#popupMenu.show(pt.x, pt.y);
            } else {
                this.form.content.popupMenu.show(0, 0);
            }
        }
    }
    //#endregion keyUp
    //#region keyPress
    keyPress() {
        this.onKeyPress && this.onKeyPress.invoke();
    }
    //#endregion keyPress
    //#region drag
    drag(event) {
        this.#dragKind === core.types.DRAGKINDS.DRAG && this.#dragMode === core.types.DRAGMODES.MANUAL
            && this.onDrag && this.onDrag.invoke(event);
    }
    //#endregion drag
    //#region drop
    drop(event) {
        this.#dragKind !== core.types.DRAGKINDS.DOCK
            && this.#dragMode !== core.types.DRAGMODES.MANUAL
            && this.onDrop && this.onDrop.invoke(event);
    }
    //#endregion drop
    //#region dragEnter
    dragEnter(event) {
        this.#dragKind === core.types.DRAGKINDS.DOCK
            && this.#dragMode === core.types.DRAGMODES.MANUAL
            && this.onDragEnter && this.onDragEnter.invoke(event);
    }
    //#endregion dragEnter
    //#region dragStart
    dragStart(event) {
        this.#dragKind === core.types.DRAGKINDS.DRAG
            && this.#dragMode === core.types.DRAGMODES.MANUAL
            && this.onDragStart && this.onDragStart.invoke(event);
    }
    //#endregion dragStart
    //#region dragLeave
    dragLeave() {
        this.#dragKind === core.types.DRAGKINDS.DOCK
            && this.#dragMode === core.types.DRAGMODES.MANUAL
            && this.onDragLeave && this.onDragLeave.invoke(event);
    }
    //#endregion dragLeave
    //#region dragExit
    dragExit() {
        this.#dragKind === core.types.DRAGKINDS.DRAG
            && this.#dragMode === core.types.DRAGMODES.MANUAL
            && this.onDragExit && this.onDragExit.invoke(event);
    }
    //#endregion dragExit
    //#region dragOver
    dragOver(event) {
        this.#dragKind === core.types.DRAGKINDS.DOCK
            && this.#dragMode === core.types.DRAGMODES.MANUAL
            && this.onDragOver && this.onDragOver.invoke(event);
    }
    //#endregion dragOver
    //#region dragEnd
    dragEnd() {
        this.#dragKind === core.types.DRAGKINDS.DRAG
            && this.#dragMode === core.types.DRAGMODES.MANUAL
            && this.onDragEnd && this.onDragEnd.invoke(event);
    }
    //#endregion dragEnd
    //dialogKey Control_dialogKey(key,shift){
    //  if (this._components.length>0){
    //    for(let i=0,l=this._components.length;i<l;i++){
    //      if(this._components[i].visible&&this._components[i].enabled){
    //        this._components[i].dialogKey();
    //        //if Key=0 then Break;
    //      }
    //    }
    //  }
    //},
    //#region contextMenu
    contextMenu(stayOpen) {
        //#region Variables déclaration
        const popupMenu = this.#popupMenu;
        //#endregion Variables déclaration
        if (popupMenu) {
            const x = core.mouse.window.x;
            const y = core.mouse.window.y;
            //this.popup.staysOpen=!1;
            popupMenu.control = this;
            popupMenu.show(x, y);
        }
    }
    //#endregion contextMenu
    //#region getHTMLElement
    getHTMLElement(id) {
        //if (core.tools.Debugger.debug) console.log(`${ this.constructor.name } getHTMLElement`);
        if (id !== String.EMPTY) {
            super.getHTMLElement(id);
            this.HTMLElement && this.#resizer.observe(this.HTMLElement);
            //this.initEvents();
            //if (this.animations.length>0) {
            //  for (let i=0,l=this.animations.length;i<l;i++) {
            //    if(this.animations[i].enabled&&!this.animations[i].running&&this.animations[i].autoStart) this.animations[i].start();
            //  }
            //}
            //this.updateFromHTML();
            //core.tools.Debugger.log(arguments, this, t);
        }
    }
    //#endregion getHTMLElement
    //#region getChilds
    getChilds(childs, owner) {
        //#region Variables déclaration
        let dataClass = null;
        const isHtmlRenderer = core.isHTMLRenderer;
        const classes = core.classes;
        const XMLNODETYPES = core.types.XMLNODETYPES;
        let props;
        //#endregion Variables déclaration
        if (childs) {
            let nodes = null;
            if (isHtmlRenderer) {
                nodes = childs ? childs.childNodes : this.HTMLElement.childNodes;
            } else if (core.isCanvasRenderer) {
                nodes = childs;
            }
            nodes.forEach(node => {
                dataClass = node.nodeType === XMLNODETYPES.ELEMENT_NODE && isHtmlRenderer
                    ? node.dataset.class : dataClass = node.className;
                let properties = {};
                if (isHtmlRenderer) {
                    if (node.nodeType === XMLNODETYPES.ELEMENT_NODE) {
                        props = node.querySelector(`[id='${node.id}']> properties:first-child`);
                        props && (properties = JSON.parse(props.innerText));
                    }
                } else {
                    properties = node.properties;
                }
                if (dataClass) {
                    !owner && (owner = this);
                    classes.createComponent({
                        class: classes[dataClass],
                        owner: owner,
                        name: properties.name ? properties.name : String.EMPTY,
                        withTpl: !1,
                        internalId: node.id,
                        props: properties
                    });
                }
            });
        }
    }
    //#endregion getChilds
    //#region clientOrigin
    //clientOrigin() {
    //    //#region Variables déclaration
    //    const result = new core.classes.Point;
    //    const htmlElement = this.HTMLElement;
    //    const htmlParentElement = core.tools.HTMLParentElement;
    //    //#endregion Variables déclaration
    //    this.owners.forEach(owner => {
    //        const oHtmlElement = owner.HTMLElement;
    //        const border = getComputedStyle(oHtmlElement);
    //        result.x += oHtmlElement.offsetLeft + ~~parseFloat(border.borderLeftWidth) + oHtmlElement.scrollLeft;
    //        result.y += oHtmlElement.offsetTop + ~~parseFloat(border.borderTopWidth) + oHtmlElement.scrollTop;
    //    });
    //    result.x += htmlElement.offsetLeft;
    //    result.y += htmlElement.offsetTop;
    //    if (htmlParentElement) {
    //        result.x += htmlParentElement.offsetLeft;
    //        result.y = htmlParentElement.offsetTop;
    //    }
    //    return result;
    //}
    //#endregion clientOrigin
    //#region documentToClient
    //documentToClient(pt) {
    //    //#region Variables déclaration
    //    const origin = this.clientOrigin();
    //    const result = new core.classes.Point;
    //    const width = this.width;
    //    const height = this.height;
    //    //#endregion Variables déclaration
    //    if (!pt) {
    //        pt = core.mouse.document;
    //    }
    //    result.x = pt.x - origin.x;
    //    result.y = pt.y - origin.y;
    //    if (result.x < 0) {
    //        result.x = 0;
    //    }
    //    if (result.y < 0) {
    //        result.y = 0;
    //    }
    //    if (result.x > width) {
    //        result.x = width;
    //    }
    //    if (result.y > height) {
    //        result.y = height;
    //    }
    //    return result;
    //}
    //#endregion documentToClient
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const owner = this.owner;
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        super.loaded();
        this.sizing();
        this.initEvents();
        owner.tab && (this.tab = owner.tab);
        !this.enabled ? htmlElement.classList.add('disabled') : null;
        !this.visible && (
            this.#forceDisplayVisibility
                ? htmlElement.classList.add('noDisplay')
                : htmlElement.classList.add('hidden')
        );
        !String.isNullOrEmpty(this.#cssClasses) && htmlElement.classList.add(this.#cssClasses.split(String.SPACE));
        htmlElement.classList.add(this.cursor);
        (this.#ownerShowToolTip || this.#showToolTip) && (this.#mouseEvents.mouseenter = this.#mouseEvents.mouseout = !0);
        this.props.hasOwnProperty('popupMenu') && this.form[this.props.popupMenu] && this.form[this.props.popupMenu] instanceof core.classes.PopupMenu
            && (this.#popupMenu = this.form[this.props.popupMenu]);
    }
    //#endregion loaded
    //#region resized
    resized() {
        //#region Variables déclaration
        const ALIGNS = core.types.ALIGNS;
        const resizeData = this.resizeData;
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (!resizeData.width || !resizeData.height) {
            resizeData.width = htmlElement.offsetWidth;
            resizeData.height = htmlElement.offsetHeight;
        }
        if (resizeData.width !== htmlElement.offsetWidth || resizeData.height !== htmlElement.offsetHeight) {
            const childs = this.components.filter(e => {
                return (e.align === ALIGNS.SCALE || e.align === ALIGNS.FIT) && e.visible;
            });
            childs.forEach(child => {
                child.align === ALIGNS.SCALE ? child.scaleFromParent() : child.fitToParent();
            });
            resizeData.width = htmlElement.offsetWidth;
            resizeData.height = htmlElement.offsetHeight;
            this.onAfterResized && this.onAfterResized.invoke(this);
        }
    }
    //#endregion resized
    //#region scaleFromParent
    scaleFromParent() {
        //#region Variables déclaration
        const p = getComputedStyle(this.HTMLElement);
        const PX = core.types.CSSUNITS.PX;
        const htmlElementStyle = this.HTMLElementStyle;
        const owner = this.owner;
        const resizeData = owner.resizeData;
        const oHtmlElement = owner.HTMLElement;
        //#endregion Variables déclaration
        if (resizeData.width > 0 && resizeData.height > 0 && oHtmlElement.offsetWidth > 0 && oHtmlElement.offsetHeight > 0) {
            htmlElementStyle.left = `${int(p.left) * (oHtmlElement.offsetWidth / resizeData.width)} ${PX} `;
            htmlElementStyle.top = `${int(p.top) * (oHtmlElement.offsetHeight / resizeData.height)} ${PX} `;
            htmlElementStyle.width = `${int(p.width) * (oHtmlElement.offsetWidth / resizeData.width)} ${PX} `;
            htmlElementStyle.height = `${int(p.height) * (oHtmlElement.offsetHeight / resizeData.height)} ${PX} `;
        }
    }
    //#endregion scaleFromParent
    //#region fitToParent
    fitToParent() {
        //#region Variables déclaration
        let newLeft = null;
        let newTop = null;
        let newWidth = null;
        let newHeight = null;
        const p = getComputedStyle(this.HTMLElement);
        const PX = core.types.CSSUNITS.PX;
        const ALIGNS = core.types.ALIGNS;
        const oHtmlElement = this.owner.HTMLElement;
        const align = this.#align;
        const htmlElementStyle = this.HTMLElementStyle;
        const pP = getComputedStyle(oHtmlElement);
        const mR = new core.classes.Rect(int(pP.paddingLeft), int(pP.paddingTop),
            oHtmlElement.offsetWidth - int(pP.paddingRight),
            oHtmlElement.offsetHeight - int(pP.paddingBottom));
        const cR = new core.classes.Rect(int(p.left) - int(p.paddingLeft),
            int(p.top) - int(p.paddingTop),
            int(p.left) + int(p.width) + int(p.paddingRight),
            int(p.top) + int(p.height) + int(p.paddingBottom));
        const fitScale = cR.fit(mR);
        //#endregion Variables déclaration
        if (fitScale.ratio < 1) {
            cR.left = cR.left / fitScale.ratio;
            cR.right = cR.right / fitScale.ratio;
            cR.top = cR.top / fitScale.ratio;
            cR.bottom = cR.bottom / fitScale.ratio;
            cR.center(mR);
            align === ALIGNS.FITLEFT && cR.offset(mR.left - cR.left, 0);
            align === ALIGNS.FITRIGHT && cR.offset(mR.right - cR.right, 0);
            newLeft = cR.left;
            newTop = cR.top;
            newWidth = cR.right - cR.left;
            newHeight = cR.bottom - cR.top;
        } else {
            align === ALIGNS.FITLEFT && cR.offset(mR.left - cR.left, 0);
            align === ALIGNS.FITRIGHT && cR.offset(mR.right - cR.right, 0);
            newLeft = fitScale.rect.left;
            newTop = fitScale.rect.top;
            newWidth = fitScale.rect.right - fitScale.rect.left;
            newHeight = fitScale.rect.bottom - fitScale.rect.top;
        }
        htmlElementStyle.left = `${newLeft + int(p.paddingLeft)} ${PX} `;
        htmlElementStyle.top = `${newTop + int(p.paddingTop)} ${PX} `;
        htmlElementStyle.width = `${newWidth - int(p.paddingLeft) - int(p.paddingRight)} ${PX} `;
        htmlElementStyle.height = `${newHeight - int(p.paddingTop) - int(p.paddingBottom)} ${PX} `;
    }
    //#endregion fitToParent
    //#region applyTransforms
    applyTransforms(transform) {
        //#region Variables déclaration
        let t = [];
        const rotateAngle = this.#rotateAngle;
        const scale = this.#scale;
        //#endregion Variables déclaration
        if (this.HTMLElementStyle) {
            this.resetTransform();
            transform = transform || String.EMPTY;
            //Translation
            //if (transform.includes("translate")) t.push(transform);
            //Rotation
            if (transform.includes('rotate')) {
                t = [...t, transform];
            } else if (rotateAngle !== 0) {
                t = [...t, `rotate(${rotateAngle}deg)`];
            }
            //if (this._rotateAngle!==0) {
            //rad=_conv.deg2Rad(this._rotateAngle);
            //t.push(["matrix(",core.cos(rad),",",core.sin(rad),",",-core.sin(rad),",",core.cos(rad),",0,0)"].join(String.EMPTY));
            //this.HTMLElementStyle.transformOrigin=this._rotateCenter.x+core.types.CSSUnits.PX+String.SPACE+this._rotateCenter.y+core.types.CSSUnits.PX+String.SPACE+" 0px";
            //this.HTMLElementStyle.transformOrigin="0px 0px 0px";
            //}
            //Scale
            if (transform.includes('scale')) {
                t = [...t, transform];
            } else if (!scale.isEmpty && scale.x !== 1 && scale.y !== 1) {
                t = [...t, `scale(${scale.x}, ${scale.y})`];
            } else if (scale.x > 0 && scale.y === 0) {
                t = [...t, `scaleX(${scale.x})`];
            } else if (scale.y > 0 && scale.x === 0) {
                t = [...t, `scaleY(${scale.y})`];
            }
            this.HTMLElementStyle.transform = t.join(String.SPACE);
        }
    }
    //#endregion applyTransforms
    //#region resetTransform
    resetTransform() {
        core.isHTMLRenderer && (this.HTMLElementStyle.transform = String.EMPTY);
    }
    //#endregion resetTransform
    //#region getTabOrderList
    getTabOrderList(list, children) {
        //#region Variables déclaration
        const tabList = this.#tabList;
        //#endregion Variables déclaration
        children && (children = !0);
        if (!list) {
            return;
        }
        if (tabList) {
            tabList.forEach(tab => {
                tab.isVisible && list.push(tab);
                children && tab.getTabOrderList(list, children);
            });
        }
    }
    //#endregion getTabOrderList
    //#region destroy
    destroy() {
        this.#resizer.disconnect();
        this.#tabList.destroy();
        this.#constraints.destroy();
        this.#padding.destroy();
        this.#margin.destroy();
        this.#scale.destroy();
        this.#rotateCenter.destroy();
        this.#mouseEvents.destroy();
        this.unBindAndDestroyEvents(['onMouseDown', 'onMouseMove', 'onMouseUp', 'onClick', 'onDblClick',
            'onMouseLeave', 'onMouseEnter', 'onWheel', 'onScroll', 'onBeforePaint', 'onPaint',
            'onAfterPaint', 'onEnterFocus', 'onKillFocus', 'onKeyDown', 'onKeyUp', 'onKeyPress', 'onAfterResized',
            'onDragStart', 'onDrag', 'onDragExit', 'onDragEnd', 'onDragEnter', 'onDragOver', 'onDragLeave',
            'onDrop', 'onDestroy', 'onResize']);
        super.destroy();
    }
    //#endregion destroy
    //#region addControl
    addControl(control) {
        //#region Variables déclaration
        const htmlElement = control.HTMLElement;
        //#endregion Variables déclaration
        if (control instanceof core.classes.Control) {
            htmlElement && htmlElement.remove();
            this.insertComponent(control);
        }
    }
    //#endregion addControl
    //#region getChildsControls
    getChildsControls(callback) {
        this.components.forEach(comp => {
            if (comp instanceof core.classes.Component) {
                callback && core.tools.isFunc(callback) && callback(comp);
                comp instanceof core.classes.Control && comp.getChildsControls(callback);
            }
        });
    }
    //#endregion getChildsControls
    //#region getZOrder
    getZOrder() {
        //#region Variables déclaration
        const owner = this.owner;
        //#endregion Variables déclaration
        return owner && this.HTMLElement ? owner.components.indexOf(this) : -1;
    }
    //#endregion getZOrder
    //#region render
    render(className) {
        //#region Variables déclaration
        const changingTheme = document.body.classList.contains('changingTheme');
        const themeName = changingTheme ? this.app.themeManifest.lastThemeName : this.themeName;
        const ctx = core.ctx;
        const classes = core.classes;
        const CONSTANTS = core.types.CONSTANTS;
        let drawCaption = this instanceof classes.CaptionControl;
        let state = this.#isPressed ? 'pressed' : this.#isMouseOver ? 'hovered' : this.#isFocused ? 'focused' : 'normal';
        const params = [];
        //#endregion Variables déclaration
        this instanceof classes.Window || this instanceof classes.WindowTitleBar
            && (state = this.form.activeWindow ? 'active' : 'inactive');

        ctx.save();
        ctx.translate(this.contentLeft, this.contentTop);
        if (this instanceof classes.ThemedControl) {
            let obj = this;
            className = className ? className : this.__proto__.constructor.name;
            let objTheme = core.themes[themeName][className];
            while (!objTheme && obj instanceof classes.ThemedControl) {
                obj = Object.getPrototypeOf(obj);
                className = obj.__proto__.constructor.name;
                objTheme = core.themes[themeName][className];
            }
            ctx.save();
            !this.#enabled && (ctx.globalAlpha = 0.5);
            if (objTheme) {
                objTheme.hasOwnProperty('clipped') && objTheme.clipped
                    && ctx.clipRect(0, 0, this.contentWidth, this.contentHeight);
                objTheme.defaultDrawing != undefined
                    && (drawCaption = drawCaption && objTheme.defaultDrawing);
                if (objTheme.shapes) {
                    objTheme.shapes.forEach(shape => {
                        let width = shape.width ? shape.width : this.#width;
                        let height = shape.height ? shape.height : this.#height;
                        core.tools.isString(height) && (height = eval(eval(height)));
                        core.tools.isString(width) && (width = eval(eval(width)));
                        const w2 = width / 2;
                        //const h2 = height / 2;
                        let left = shape.left ? shape.left : 0;
                        let top = shape.top ? shape.top : 0;
                        core.tools.isString(left) && (left = eval(eval(left)));
                        core.tools.isString(top) && (top = eval(eval(top)));
                        let offset = 0;
                        let canDraw = !0;
                        // Offset
                        shape.offset != undefined && (offset = shape.offset);
                        // Shape
                        const returnTrigger = core.tools.checkTrigger(this, shape);
                        if (returnTrigger.isOK) {
                            shape.storedName
                                && core.tools.storeValue(core.vars, shape.storedName, returnTrigger);
                            // Radius
                            let radius = shape.radius;
                            if (radius) {
                                core.tools.isNumber(radius) && obj.borderRadius
                                    && (radius = obj.borderRadius);
                                params.push(core.tools.processRadius(this, core.vars, radius));
                            }
                            // Fill / Stroke
                            switch (shape.type) {
                                case 'drawImg': {
                                    let img = core.themes[themeName].images[shape.image];
                                    !img && (img = core.themes.images[shape.image]);
                                    img && ctx[shape.type](this, img, shape);
                                    canDraw = !1;
                                    break;
                                }
                                case 'drawText':
                                    returnTrigger.isDialog = this.form.isBorderDialog;
                                    ctx[shape.type](this, shape, returnTrigger, state);
                                    canDraw = !1;
                                    break;
                                case 'ellipse':
                                    params.insert(0, CONSTANTS._2PI);   // endAngle
                                    params.insert(0, 0);                // startAngle
                                    params.insert(0, 0);                // rotation
                                    params.insert(0, w2 - 0.5 - offset);    // radiusY
                                    params.insert(0, w2 - 0.5 - offset);    // radiusX
                                    params.insert(0, w2);               // y
                                    params.insert(0, w2);               // x
                                    break;
                                case 'drawPolyline':
                                    params.insert(0, shape.points);
                                    break;
                                case 'rectWithBordersColor':
                                    params.insert(0, shape.borders);
                                    shape.hasOwnProperty('bottom')
                                        ? params.insert(0, height - top - shape.bottom)
                                        : params.insert(0, height); // height
                                    shape.hasOwnProperty('right')
                                        ? params.insert(0, width - left - shape.right)
                                        : params.insert(0, width); // width
                                    params.insert(0, top);          // top
                                    params.insert(0, left);          // left 
                                    break;
                                default:
                                    shape.hasOwnProperty('bottom')
                                        ? params.insert(0, height - top - shape.bottom)
                                        : params.insert(0, height - (shape.strokeStyle ? 1 : 0)); // height
                            }
                            shape.hasOwnProperty('right')
                                ? params.insert(0, width - left - shape.right)
                                : params.insert(0, width - (shape.strokeStyle ? 1 : 0));  // width
                            params.insert(0, top + (shape.strokeStyle ? 0.5 : 0));          // top
                            params.insert(0, left + (shape.strokeStyle ? 0.5 : 0));          // left 
                        }
                        if (canDraw) {
                            shape.clipping
                                && ctx.clipRegion(shape.clipping, left, top, width, height);
                            ctx.beginPath();
                            shape.borders && shape.type !== 'rectWithBordersColor'
                                && params.push(core.tools.processBorders(this, shape.borders));
                            ctx[shape.type](...params);
                            !shape.borders && core.tools.processStyle(this, shape, state);
                            shape.clipping && ctx.restore();
                        }
                        params.clear();
                    });
                }
            }
            drawCaption && core.themes.CaptionControl.render(this);
            ctx.restore();
        }
        this.#clipped && ctx.clipRect(0, 0, this.contentWidth, this.contentHeight);
        this.components.forEach(comp => {
            comp.isVisible && comp instanceof classes.Control && comp.render();
        });
        ctx.restore();
    }
    //#endregion render
    //#endregion Methods
    /*static init() {*/
    /*if (core.isHTMLRenderer) {
        let ControlTpl = "<div id='{internalId}' data-name='{name}' data-class='{className}' class='Control {className}' style='width:100px;height:100px;'></div>",
            ItemsWheelTpl = `< div id = '{internalId}' data - class='ItemsWheel' class='Control ItemsWheel {theme} {cssClasses}' >
                                    <div class='Control ItemsWheelTopGradient carbon'></div>
                                    <div class='Control ItemsWheelSep carbon'></div>
                                    <div class='Control ItemsWheelContent carbon'></div>
                                    <div class='Control ItemsWheelBottomGradient carbon'></div>
                           </div > `,
            PopupBoxTpl = "<div id='{internalId}' data-name='{name}' data-class='{className}' class='Control {className} csr_default {theme}'></div>",
            ToolTipTpl = "<div class='Control ToolTip {theme}'>{text}</div>",
            ShortCutIconTpl = `< div id = '{internalId}' data - name='{name}' data - class='ShortCutIcon' class='Control ShortCutIcon' >
                                    <div class='Control ShortCutIconImg'>
                                        <div class='Control ShortCutIconCaption'>{caption}</div>
                                    </div></div > `,
            TabTpl = "<label id='{internalId}' data-class='TabSheet' data-name='{name}' class='Control Tab TabSheet csr_default {theme}'>{caption}</label>",
            CustomTabControlTpl = `< div id = '{internalId}' data - name='{name}' data - class='TabControl' class='Control TabControl {theme}' style = 'width:289px;height:193px;' >
                                    <div class='Control TabControlHeader {theme}'>
                                        <div class='Control TabsContainer {theme}'></div>
                                        <button id='{internalId}_1' class='Control Button TabControlLeftBtn {theme}' data-enabled='!1'>*</button>
                                        <button id='{internalId}_2' class='Control Button TabControlRightBtn {theme}' data-enabled='!1'>)</button>
                                    </div>
                                    <div id='{internalId}_3' data-class='Layout' class='Control TabsContent PagesContent {theme}'></div>
                         </div > `,
            CustomTextBoxBtnTpl = `< div id = '{internalId}' data - name='{name}' data - class='CustomTextBoxBtn' class='Control CustomTextBoxBtn {theme}' >
                                    <input type='text' class='Control csr_text {theme}'>
                                        {buttons}
                         </div>`;
        registerTemplates([{ Class: Control, template: ControlTpl }, { Class: PopupBox, template: PopupBoxTpl },
        { Class: ItemsWheel, template: ItemsWheelTpl }, { Class: Layout, template: ControlTpl },
        { Class: "ToolTip", template: ToolTipTpl }, { Class: "ShortCutIcon", template: ShortCutIconTpl },
        { Class: "Tab", template: TabTpl }, { Class: "CustomTabControl", template: CustomTabControlTpl },
        { Class: "CustomTextBoxBtn", template: CustomTextBoxBtnTpl }]);
    }
    }*/
}
Object.defineProperties(Component.prototype, {
    'autoTranslate': {
        enumerable: !0
    },
    'translationKey': {
        enumerable: !0
    },
    'constraints': {
        enumerable: !0
    },
    'ownerShowToolTip': {
        enumerable: !0
    },
    'padding': {
        enumerable: !0
    },
    'margin': {
        enumerable: !0
    },
    'popupMenu': {
        enumerable: !0
    },
    'opacity': {
        enumerable: !0
    },
    'width': {
        enumerable: !0
    },
    'height': {
        enumerable: !0
    },
    'scale': {
        enumerable: !0
    },
    'enabled': {
        enumerable: !0
    },
    'rotateCenter': {
        enumerable: !0
    },
    'toolTip': {
        enumerable: !0
    },
    'showToolTip': {
        enumerable: !0
    },
    'rotateAngle': {
        enumerable: !0
    },
    'customStyle': {
        enumerable: !0
    },
    'cssClasses': {
        enumerable: !0
    },
    'tabOrder': {
        enumerable: !0
    },
    'right': {
        enumerable: !0
    },
    'bottom': {
        enumerable: !0
    },
    'reflected': {
        enumerable: !0
    },
    'column': {
        enumerable: !0
    },
    'row': {
        enumerable: !0
    },
    'colSpan': {
        enumerable: !0
    },
    'rowSpan': {
        enumerable: !0
    }
});
//#endregion Control
//#region Templates
//const controlTpl = ['<div id='{internalId}' data-name='{name}' data-class='{className}' class='Control {className}' style='width:100px;height:100px;'></div>";
//const ToolTipTpl = "<div class='Control ToolTip {theme}'>{text}</div>";
core.classes.register(core.types.CATEGORIES.INTERNAL, Control);
//core.classes.registerTemplates([
//    { Class: Control, template: controlTpl }
//]);
//#endregion
export { Control };