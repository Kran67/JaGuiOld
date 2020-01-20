//#region Imports
import { Component } from "/scripts/core/component.js";
import { Events } from "/scripts/core/events.js";
import "/scripts/core/sizeconstraints.js";
import "/scripts/core/padding.js";
import "/scripts/core/margin.js";
import "/scripts/core/scale.js";
import "/scripts/core/rotatecenter.js";
import "/scripts/core/hittest.js";
import { Tools } from "/scripts/core/tools.js";
import { Mouse } from "/scripts/core/mouse.js";
import { Rect } from "/scripts/core/geometry.js";
//#endregion Imports
//#region Control
const Control = (() => {
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
    //#region Control
    class Control extends Component {
        //#region Constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.allowUpdate = true;
                priv.autoTranslate = props.hasOwnProperty("autoTranslate") && Tools.isBool(props.autoTranslate) ? props.autoTranslate : false;
                priv.isMouseOver = false;
                priv.isFocused = false;
                priv.isPressed = false;
                priv.closePopups = true;
                priv.wrapper = String.EMPTY;
                priv.forceMouseWheel = false;
                priv.hasResizeEvent = false;
                priv.resizeData = {
                    width: null,
                    height: null
                };
                priv.tabList = [];
                priv.stopEvent = true;
                priv.constraints = new Core.classes.SizeConstraints(this);
                priv.ownerShowToolTip = props.hasOwnProperty("ownerShowToolTip") && Tools.isBool(props.ownerShowToolTip) ? props.ownerShowToolTip : true;
                priv.autoCapture = props.hasOwnProperty("autoCapture")?props.autoCapture:false;
                priv.padding = new Core.classes.Padding(this);
                priv.margin = new Core.classes.Margin(this);
                priv.popupMenu = null;
                priv.opacity = props.hasOwnProperty("opacity") && Tools.isNumber(props.opacity) ? props.opacity : 1;
                priv.width = props.hasOwnProperty("width") && Tools.isNumber(props.width) ? props.width : 50;
                priv.height = props.hasOwnProperty("height") && Tools.isNumber(props.height) ? props.height : 50;
                priv.scale = new Core.classes.Scale(this);
                priv.canFocused = false;
                priv.showFocus = true;
                priv.enabled = props.hasOwnProperty("enabled") && Tools.isBool(props.enabled) ? props.enabled : true;
                priv.rotateCenter = new Core.classes.RotateCenter(this);
                priv.toolTip = props.hasOwnProperty("toolTip")?props.toolTip:String.EMPTY;
                priv.showToolTip = props.hasOwnProperty("showToolTip") && Tools.isBool(props.showToolTip) ? props.showToolTip : false;
                priv.hitTest = new Core.classes.HitTest;
                priv.rotateAngle = props.hasOwnProperty("rotateAngle") && Tools.isNumber(props.rotateAngle) ? props.rotateAngle : 0;
                priv.customStyle = null;
                priv.cssClasses = String.EMPTY;
                priv.tabOrder = props.hasOwnProperty("tabOrder") && Tools.isNumber(props.tabOrder) ? props.tabOrder : 0;
                priv.right = props.hasOwnProperty("right") && Tools.isNumber(props.right) ? props.right : null;
                priv.bottom = props.hasOwnProperty("bottom") && Tools.isNumber(props.bottom) ? props.bottom : null;
                priv.doubleClick = false;
                priv.component = false;
                priv.forceDisplayVisibility = false;
                priv.clipped = props.hasOwnProperty("clipped") && Tools.isBool(props.clipped) ? props.clipped : true;
                priv.reflected = props.hasOwnProperty("reflected") && Tools.isBool(props.reflected) ? props.reflected : false;
                this.onMouseDown = new Core.classes.NotifyEvent(this);
                this.onMouseMove = new Core.classes.NotifyEvent(this);
                this.onMouseUp = new Core.classes.NotifyEvent(this);
                this.onClick = new Core.classes.NotifyEvent(this);
                this.onDblClick = new Core.classes.NotifyEvent(this);
                this.onMouseLeave = new Core.classes.NotifyEvent(this);
                this.onMouseEnter = new Core.classes.NotifyEvent(this);
                this.onMouseWheel = new Core.classes.NotifyEvent(this);
                this.onMouseWheelStart = new Core.classes.NotifyEvent(this);
                this.onMouseWheelEnd = new Core.classes.NotifyEvent(this);
                this.onBeforePaint = new Core.classes.NotifyEvent(this);
                this.onPaint = new Core.classes.NotifyEvent(this);
                this.onAfterPaint = new Core.classes.NotifyEvent(this);
                this.onEnterFocus = new Core.classes.NotifyEvent(this);
                this.onKillFocus = new Core.classes.NotifyEvent(this);
                this.onKeyDown = new Core.classes.NotifyEvent(this);
                this.onKeyUp = new Core.classes.NotifyEvent(this);
                this.onKeyPress = new Core.classes.NotifyEvent(this);
                this.onAfterResized = new Core.classes.NotifyEvent(this);
                this.onDragStart = new Core.classes.NotifyEvent(this);
                this.onDrag = new Core.classes.NotifyEvent(this);
                this.onDragExit = new Core.classes.NotifyEvent(this);
                this.onDragEnd = new Core.classes.NotifyEvent(this);
                this.onDragEnter = new Core.classes.NotifyEvent(this);
                this.onDragOver = new Core.classes.NotifyEvent(this);
                this.onDragLeave = new Core.classes.NotifyEvent(this);
                this.onDrop = new Core.classes.NotifyEvent(this);
                this.onDestroy = new Core.classes.NotifyEvent(this);
                this.addBindableProperties(["opacity", "right", "bottom", "width", "height", "visible", "left", "top", "rotateAngle", "align"]);
                let anchors = Types.ANCHORS;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "anchor",
                    enum: anchors,
                    setter: this._anchor,
                    variable: priv,
                    value: props.hasOwnProperty("anchor") && Array.isArray(props.anchor) ? props.anchor : [Types.ANCHORS.LEFT, Types.ANCHORS.TOP]
                });
                anchors = null;
                const aligns = Types.ALIGNS;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "align",
                    enum: aligns,
                    variable: priv,
                    setter: this._align,
                    value: props.hasOwnProperty("align") ? props.align : Types.ALIGNS.NONE
                });
                const customCursors = Types.CUSTOMCURSORS;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "cursor",
                    enum: customCursors,
                    variable: priv,
                    setter: this._cursor,
                    value: props.hasOwnProperty("cursor") && Tools.isStirng(props.cursor) ? props.cursor : Types.CUSTOMCURSORS.DEFAULT
                });
                const dragKinds = Types.DRAGKINDS;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "dragKind",
                    enum: dragKinds,
                    variable: priv,
                    value: props.hasOwnProperty("dragKind") && Tools.isString(props.dragKind) ? props.dragKind : Types.DRAGKINDS.DRAG
                });
                const dragModes = Types.DRAGMODES;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "dragMode",
                    enum: dragModes,
                    variable: priv,
                    value: props.hasOwnProperty("dragMode") && Tools.isString(props.dragMode) ? props.dragMode : Types.DRAGMODES.MANUAL
                });
                // gestion des propriétés spéciales (Objets)
                if (props.margin) {
                    priv.margin.setValues(props.margin.left, props.margin.top, props.margin.right, props.margin.bottom);
                }
                if (props.padding) {
                    priv.padding.setValues(props.padding.left, props.padding.top, props.padding.right, props.padding.bottom);
                }

            }
        }
        //#endregion Constructor
        //#region Setters methods
        //#region bounds
        get bounds() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            return new Rect(this.left, this.top, priv.width, priv.height);
        }
        set bounds(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Rect) {
                this.beginUpdate();
                this.left = newValue.left;
                this.top = newValue.top;
                priv.width = newValue.width;
                priv.height = newValue.height;
                this.endUpdate();
            }
        }
        //#endregion bounds
        //#region clipped
        get clipped() {
            return internal(this).clipped;
        }
        set clipped(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.clipped !== newValue) {
                    priv.clipped = newValue;
                }
            }
        }
        //#endregion clipped
        //#region reflected
        get reflected() {
            return internal(this).reflected;
        }
        set reflected(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.reflected !== newValue) {
                    priv.reflected = newValue;
                    if (Core.isHTMLRenderer) {
                        if (newValue) {
                            htmlElement.classList.add("reflected");
                        } else {
                            htmlElement.classList.remove("reflected");
                        }
                    }
                }
            }
        }
        //#endregion reflected
        //#region forceDisplayVisibility
        get forceDisplayVisibility() {
            return internal(this).forceDisplayVisibility;
        }
        set forceDisplayVisibility(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.forceDisplayVisibility !== newValue) {
                    priv.forceDisplayVisibility = newValue;
                }
            }
        }
        //#endregion forceDisplayVisibility
        //#region allowUpdate
        get allowUpdate() {
            return internal(this).allowUpdate;
        }
        set allowUpdate(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.allowUpdate !== newValue) {
                    priv.allowUpdate = newValue;
                }
            }
        }
        //#endregion allowUpdate
        //#region autoTranslate
        get autoTranslate() {
            return internal(this).autoTranslate;
        }
        set autoTranslate(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.autoTranslate !== newValue) {
                    priv.autoTranslate = newValue;
                }
            }
        }
        //#endregion autoTranslate
        //#region isMouseOver
        get isMouseOver() {
            return internal(this).isMouseOver;
        }
        set isMouseOver(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.hitTest.mouseMove) {
                    if (priv.isMouseOver !== newValue) {
                        priv.isMouseOver = newValue;
                        //this._applyAllStyles();
                    }
                }
            }
        }
        //#endregion isMouseOver
        //#region isFocused
        get isFocused() {
            return internal(this).isFocused;
        }
        set isFocused(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const form = this.form;
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.isFocused !== newValue) {
                    priv.isFocused = newValue;
                    let lastFc;
                    if (form.focusedControl && (Core.classes.CustomTextControl && form.focusedControl instanceof Core.classes.CustomTextControl)) {
                        if (!newValue) {
                            lastFc = form.focusedControl;
                        }
                    }

                    if (newValue) {
                        form.focusedControl = this;
                    } else if (form.focusedControl === this) {
                        form.focusedControl = null;
                    }
                    if (htmlElement) {
                        //this.HTMLElement.dataset.focused = internal(this).isFocused;
                        htmlElement.classList.remove("focused");
                        if (newValue && priv.showFocus) {
                            htmlElement.classList.add("focused");
                        }
                    }
                    if (!newValue) {
                        this.killFocus();
                    }
                    if (lastFc) {
                        if (lastFc.inputObj) {
                            lastFc.inputObj.blur();
                        }
                    }
                }
            }
        }
        //#endregion isFocused
        //#region isPressed
        get isPressed() {
            return internal(this).isPressed;
        }
        set isPressed(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.hitTest.mouseDown) {
                    if (priv.isPressed !== newValue) {
                        priv.isPressed = newValue;
                        Core.isHTMLRenderer && htmlElement.classList.remove("pressed");
                        if (newValue) {
                            Core.isHTMLRenderer && htmlElement.classList.add("pressed");
                        }
                    }
                }
            }
        }
        //#endregion isPressed
        //#region closePopups
        get closePopups() {
            return internal(this).closePopups;
        }
        set closePopups(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const components = this.components;
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.closePopups !== newValue) {
                    priv.closePopups = newValue;
                    components.forEach(comp => {
                        if (comp instanceof Core.classes.Control) {
                            comp.closePopups = newValue;
                        }
                    });
                }
            }
        }
        //#endregion closePopups
        //#region wrapper
        get wrapper() {
            return internal(this).wrapper;
        }
        set wrapper(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (priv.wrapper !== newValue) {
                    priv.wrapper = newValue;
                }
            }
        }
        //#endregion wrapper
        //#region forceMouseWheel
        get forceMouseWheel() {
            return internal(this).forceMouseWheel;
        }
        set forceMouseWheel(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.forceMouseWheel !== newValue) {
                    priv.forceMouseWheel = newValue;
                }
            }
        }
        //#endregion forceMouseWheel
        //#region hasResizeEvent
        get hasResizeEvent() {
            return internal(this).hasResizeEvent;
        }
        set hasResizeEvent(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.hasResizeEvent !== newValue) {
                    priv.hasResizeEvent = newValue;
                }
            }
        }
        //#endregion hasResizeEvent
        //#region resizeData
        get resizeData() {
            return internal(this).resizeData;
        }
        //#endregion resizeData
        //#region tabList
        get tabList() {
            return internal(this).tabList;
        }
        //#endregion tabList
        //#region stopEvent
        get stopEvent() {
            return internal(this).stopEvent;
        }
        set stopEvent(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.stopEvent !== newValue) {
                    priv.stopEvent = newValue;
                }
            }
        }
        //#endregion stopEvent
        //#region constraints
        get constraints() {
            return internal(this).constraints;
        }
        set constraints(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Core.classes.Constraints) {
                if (priv.constraints !== newValue) {
                    priv.constraints.assign(newValue);
                }
            }
        }
        //#endregion constraints
        //#region ownerShowToolTip
        get ownerShowToolTip() {
            return internal(this).ownerShowToolTip;
        }
        set ownerShowToolTip(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.ownerShowToolTip !== newValue) {
                    priv.ownerShowToolTip = newValue;
                }
            }
        }
        //#endregion ownerShowToolTip
        //#region autoCapture
        get autoCapture() {
            return internal(this).autoCapture;
        }
        set autoCapture(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.autoCapture !== newValue) {
                    priv.autoCapture = newValue;
                }
            }
        }
        //#endregion autoCapture
        //#region padding
        get padding() {
            return internal(this).padding;
        }
        //#endregion padding
        //#region margin
        get margin() {
            return internal(this).margin;
        }
        //#endregion margin
        //#region popupMenu
        get popupMenu() {
            return internal(this).popupMenu;
        }
        set popupMenu(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Core.classes.PopupMenu) {
                if (priv.popupMenu !== newValue) {
                    priv.popupMenu = newValue;
                }
            }
        }
        //#endregion popupMenu
        //#region opacity
        get opacity() {
            return internal(this).opacity;
        }
        set opacity(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (newValue > 1) {
                    newValue = 1;
                }
                if (newValue < 0) {
                    newValue = 0;
                }
                if (priv.opacity !== newValue) {
                    priv.opacity = newValue;
                    this.propertyChanged(Types.BINDABLEPROPERTIES.OPACITY);
                    if (!this.loading && !this.form.loading) {
                        this.HTMLElementStyle.opacity = newValue;
                    }
                }
            }
        }
        //#endregion opacity
        //#region contentWidth
        get contentWidth() {
            //#region Variables déclaration
            const priv = internal(this);
            const owner = this.owner;
            let width = priv.width;
            const margin = priv.margin;
            const padding = priv.padding;
            //#endregion Variables déclaration
            if (Tools.isString(width) && width.endsWith("%")) {
                width = owner.contentWidth * (parseFloat(width) / 100);
            }
            width -= margin.left + margin.right + padding.left + padding.right;
            return width;
        }
        //#endregion contentWidth
        //#region width
        get width() {
            if (!Core.isHTMLRenderer) {
                const priv = internal(this);
                return priv.width;
            } else {
                return this.HTMLElement.offsetWidth;
            }
        }
        set width(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElementStyle = this.HTMLElementStyle;
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.width !== newValue) {
                    if (!Core.isHTMLRenderer) {
                        priv.width = newValue;
                        this.realignChilds();
                    } else if (!this.loading) {
                        this.propertyChanged(Types.BINDABLEPROPERTIES.WIDTH);
                        if (newValue === 0) {
                            htmlElementStyle.width = String.EMPTY;
                        } else {
                            htmlElementStyle.width = `${newValue}${Types.CSSUNITS.PX}`;
                        }
                        //this._boundingClientRect.right=this._boundingClientRect.left+this.HTMLElement.offsetWidth;
                    }
                }
            }
        }
        //#endregion width
        //#region contentHeight
        get contentHeight() {
            //#region Variables déclaration
            const priv = internal(this);
            const owner = this.owner;
            let height = priv.height;
            const margin = priv.margin;
            const padding = priv.padding;
            //#endregion Variables déclaration
            if (Tools.isString(height) && height.endsWith("%")) {
                height = owner.contentWidth * (parseFloat(height) / 100);
            }
            height -= (margin.top + margin.bottom + padding.top + padding.bottom);
            return height;
        }
        //#endregion contentHeight
        //#region height
        get height() {
            if (!Core.isHTMLRenderer) {
                const priv = internal(this);
                return priv.height;
            } else {
                return this.HTMLElement.offsetHeight;
            }
        }
        set height(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElementStyle = this.HTMLElementStyle;
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.height !== newValue) {
                    if (!Core.isHTMLRenderer) {
                        priv.height = newValue;
                        this.realignChilds();
                    } else if (!this.loading) {
                        this.propertyChanged(Types.BINDABLEPROPERTIES.HEIGHT);
                        if (newValue === 0) {
                            htmlElementStyle.height = String.EMPTY;
                        } else {
                            htmlElementStyle.height = `${newValue}${Types.CSSUNITS.PX}`;
                        }
                    }
                }
            }
        }
        //#endregion height
        //#region scale
        get scale() {
            return internal(this).scale;
        }
        set scale(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const scale = priv.scale;
            //#endregion Variables déclaration
            if (newValue instanceof Core.classes.Point) {
                if (!scale.equals(newValue)) {
                    scale.assign(newValue);
                    if (!this.loading && !this.form.loading) {
                        if (!Core.isHTMLRenderer) {
                            this.update();
                        } else {
                            this.applyTransforms();
                        }
                    }
                }
            }
        }
        //#endregion scale
        //#region canFocused
        get canFocused() {
            return internal(this).canFocused;
        }
        set canFocused(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                priv.canFocused = newValue;
            }
        }
        //#endregion canFocused
        //#region showFocus
        get showFocus() {
            return internal(this).showFocus;
        }
        set showFocus(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.showFocus !== newValue) {
                    priv.showFocus = newValue;
                    if (!newValue) {
                        htmlElement.classList.remove("focused");
                    } else if (priv.isFocused) {
                        htmlElement.classList.add("focused");
                    }
                }
            }
        }
        //#endregion showFocus
        //#region enabled
        get enabled() {
            return internal(this).enabled;
        }
        set enabled(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.enabled !== newValue) {
                    priv.enabled = newValue;
                    Core.isHTMLRenderer && htmlElement.classList.remove("disabled");
                    if (!newValue) {
                        Core.isHTMLRenderer && htmlElement.classList.add("disabled");
                        priv.isPressed = false;
                    }
                    const comps = this.components.filter(e => {
                        return e instanceof Core.classes.Control;
                    });
                    comps.forEach(comp => {
                        comp.enabled = newValue;
                    });
                }
            }
        }
        //#endregion enabled
        //#region rotateCenter
        get rotateCenter() {
            return _rotateCenter;
        }
        set rotateCenter(newValue) {
            //#region Variables déclaration
            const PO = Types.CSSUNITS.PO;
            const priv = internal(this);
            const rotateCenter = priv.rotateCenter;
            //#endregion Variables déclaration
            if (newValue instanceof Core.classes.Point) {
                if (!rotateCenter.equals(newValue)) {
                    rotateCenter.assign(newValue);
                    if (!this.loading && !this.form.loading) {
                        this.HTMLElementStyle.transformOrigin = `${newValue.x}${PO}${String.SPACE}${newValue.y}${PO}`;
                    }
                }
            }
        }
        //#endregion rotateCenter
        //#region toolTip
        get toolTip() {
            return internal(this).toolTip;
        }
        set toolTip(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (priv.toolTip !== newValue) {
                    priv.toolTip = newValue;
                }
            }
        }
        //#endregion toolTip
        //#region showToolTip
        get showToolTip() {
            return internal(this).showToolTip;
        }
        set showToolTip(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.showToolTip !== newValue) {
                    priv.showToolTip = newValue;
                }
            }
        }
        //#endregion showToolTip
        //#region hitTest
        get hitTest() {
            return internal(this).hitTest;
        }
        set hitTest(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const hitTest = priv.hitTest;
            //#endregion Variables déclaration
            if (Array.isArray(newValue)) {
                switch (newValue.length) {
                    case 1:
                        hitTest.mouseDown = newValue.first;
                        hitTest.mouseMove = false;
                        hitTest.mouseUp = false;
                        hitTest.mouseWheel = false;
                        hitTest.mouseDblClick = false;
                        break;
                    case 2:
                        hitTest.mouseDown = newValue.first;
                        hitTest.mouseMove = newValue.last;
                        hitTest.mouseUp = false;
                        hitTest.mouseWheel = false;
                        hitTest.mouseDblClick = false;
                        break;
                    case 3:
                        hitTest.mouseDown = newValue.first;
                        hitTest.mouseMove = newValue[1];
                        hitTest.mouseUp = newValue.last;
                        hitTest.mouseWheel = false;
                        hitTest.mouseDblClick = false;
                        break;
                    case 4:
                        hitTest.mouseDown = newValue.first;
                        hitTest.mouseMove = newValue[1];
                        hitTest.mouseUp = newValue[2];
                        hitTest.mouseWheel = newValue.last;
                        hitTest.mouseDblClick = false;
                        break;
                    case 5:
                        hitTest.mouseDown = newValue.first;
                        hitTest.mouseMove = newValue[1];
                        hitTest.mouseUp = newValue[2];
                        hitTest.mouseWheel = newValue[3];
                        hitTest.mouseDblClick = newValue.last;
                        break;
                }
            } else if (Tools.isBool(newValue)) {
                hitTest.mouseDown = hitTest.mouseMove =
                    hitTest.mouseUp = hitTest.mouseWheel = hitTest.mouseDblClick = newValue;
            }
        }
        //#endregion hitTest
        //#region rotateAngle
        get rotateAngle() {
            return internal(this).rotateAngle;
        }
        set rotateAngle(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.rotateAngle !== newValue) {
                    priv.rotateAngle = newValue;
                    this.propertyChanged(Types.BINDABLEPROPERTIES.ROTATEANGLE);
                    if (!this.loading && !this.form.loading && Core.isHTMLRenderer) {
                        this.applyTransforms();
                    }
                }
            }
        }
        //#endregion rotateAngle
        //#region customStyle
        get customStyle() {
            return internal(this).customStyle;
        }
        set customStyle(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.customStyle !== newValue) {
                priv.customStyle = newValue;
            }
        }
        //#endregion customStyle
        //#region cssClasses
        get cssClasses() {
            return internal(this).cssClasses;
        }
        set cssClasses(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (priv.cssClasses !== newValue) {
                    priv.cssClasses = newValue;
                    this.HTMLElement.classList.add(priv.cssClasses);
                }
            }
        }
        //#endregion cssClasses
        //#region tabOrder
        get tabOrder() {
            return internal(this).tabOrder;
        }
        set tabOrder(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const tabList = this.owner.tabList;
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                const curIndex = tabList.indexOf(this);
                if (curIndex >= 0) {
                    const count = tabList.length;
                    if (newValue < 0) {
                        newValue = 0;
                    }
                    if (newValue >= count) {
                        newValue = count - 1;
                    }
                    if (newValue !== curIndex) {
                        tabList.deleteAt(curIndex);
                        tabList.insert(newValue, this);
                        priv.tabOrder = newValue;
                    }
                } else {
                    priv.tabOrder = newValue;
                    tabList.push(this);
                }
            }
        }
        //#endregion tabOrder
        //#region right
        get right() {
            return internal(this).right;
        }
        set right(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElementStyle = this.HTMLElementStyle;
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue) || newValue === null) {
                if (priv.right !== newValue) {
                    priv.right = newValue;
                    this.propertyChanged(Types.BINDABLEPROPERTIES.RIGHT);
                    if (Core.isHTMLRenderer) {
                        if (!this.loading && !this.form.loading) {
                            htmlElementStyle.right = `${newValue}${Types.CSSUNITS.PX}`;
                            htmlElementStyle.width = String.EMPTY;
                        }
                    }
                }
            }
        }
        //#endregion right
        //#region bottom
        get bottom() {
            return internal(this).bottom;
        }
        set bottom(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElementStyle = this.HTMLElementStyle;
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue) || newValue === null) {
                if (priv.bottom !== newValue) {
                    priv.bottom = newValue;
                    this.propertyChanged(Types.BINDABLEPROPERTIES.BOTTOM);
                    if (Core.isHTMLRenderer) {
                        if (!this.loading && !this.form.loading) {
                            htmlElementStyle.bottom = `${newValue}${Types.CSSUNITS.PX}`;
                            htmlElementStyle.height = String.EMPTY;
                        }
                    }
                }
            }
        }
        //#endregion bottom
        //#region doubleClick
        get doubleClick() {
            return internal(this).doubleClick;
        }
        set doubleClick(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.doubleClick !== newValue) {
                    priv.doubleClick = newValue;
                }
            }
        }
        //#endregion doubleClick
        //#region visible
        get visible() {
            return super.visible;
        }
        set visible(newValue) {
            //#region Variables déclaration
            const htmlElement = this.HTMLElement;
            const owner = this.owner;
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (super.visible !== newValue) {
                    super.visible = newValue;
                    this.propertyChanged(Types.BINDABLEPROPERTIES.VISIBLE);
                    if (Core.isHTMLRenderer) {
                        if (newValue) {
                            //this._applyAllStyles();
                            if (priv.forceDisplayVisibility) {
                                htmlElement.classList.remove("noDisplay");
                            } else {
                                htmlElement.classList.remove("hidden");
                            }
                        } else {
                            if (priv.forceDisplayVisibility) {
                                htmlElement.classList.add("noDisplay");
                            } else {
                                htmlElement.classList.add("hidden");
                            }
                        }
                    }
                    if (owner && owner.update) {
                        owner.update();
                    }
                }
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
            const owner = this.owner;
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (Core.isHTMLRenderer) {
                    if (htmlElementStyle.display !== newValue) {
                        htmlElementStyle.display = newValue;
                    }
                    if (owner && owner.update) {
                        owner.update();
                    }
                }
            }
        }
        //#endregion display
        //#region isEnabled
        get isEnabled() {
            //#region Variables déclaration
            let enabled = internal(this).enabled;
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
            const priv = internal(this);
            const padding = priv.padding;
            //#endregion Variables déclaration
            return new Core.classes.Rect(padding.left, padding.top, padding.right, padding.bottom);
        }
        //#endregion localRect
        //#region template
        get template() {
            //#region Variables déclaration
            let html = super.template;
            const a = html.split("{cssClasses}");
            //#endregion Variables déclaration
            html = a.join(internal(this).cssClasses);
            return html;
        }
        //#endregion template
        //#region _anchor
        _anchor(newValue) {
            //#region Variables déclaration
            const anchor = this.anchor;
            //#endregion Variables déclaration
            if (Array.isArray(newValue)) {
                anchor.length = 0;
                anchor.addRange(newValue);
            }
        }
        //#endregion _anchor
        //#region _align
        _align(newValue) {
            //#region Variables déclaration
            const owner = this.owner;
            const priv = internal(this);
            let align = priv.align;
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, Types.ALIGNS)) {
                if (align !== newValue) {
                    align = priv.align = newValue;
                    if (!this.loading && !this.form.loading) {
                        if (align !== Types.ALIGNS.NONE) {
                            owner.realignChilds();
                            if (owner.hasResizeEvent) {
                                owner.resized();
                            }
                        }
                    }
                }
            }
        }
        //#endregion _align
        //#region _cursor
        _cursor(newValue) {
            //#region Variables déclaration
            const htmlElement = this.HTMLElement;
            const priv = internal(this);
            let cursor = priv.cursor;
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, Types.CUSTOMCURSORS)) {
                if (cursor !== newValue) {
                    htmlElement.classList.remove(cursor);
                    cursor = priv.cursor = newValue;
                    htmlElement.classList.add(cursor);
                }
            }
        }
        //#endregion _cursor
        //#region getDataSetValue
        getDataSetValue(dataName) {
            return this.HTMLElement.dataset[dataName];
        }
        setDataSetValue(dataName, value) {
            this.HTMLElement.dataset[dataName] = value;
        }
        //#endregion getDataSetValue
        //#endregion Getter / Setter
        //#region Methods
        //#region setBounds
        setBounds(l, t, w, h) {
            //#region Variables déclaration
            const PX = Types.CSSUNITS.PX;
            const htmlElementStyle = this.HTMLElementStyle;
            //#endregion Variables déclaration
            if (Tools.isNumber(l) && Tools.isNumber(t) && Tools.isNumber(w) && Tools.isNumber(h)) {
                if (!Core.isHTMLRenderer) {
                    this.left = l;
                    this.top = t;
                    this.width = w;
                    this.height = h;
                } else {
                    htmlElementStyle.left = `${l}${PX}`;
                    htmlElementStyle.top = `${t}${PX}`;
                    htmlElementStyle.width = `${w}${PX}`;
                    htmlElementStyle.height = `${h}${PX}`;
                }
            }
        }
        //#endregion setBounds
        //#region setDimension
        setDimension(width, height) {
            //#region Variables déclaration
            const PX = Types.CSSUNITS.PX;
            const htmlElementStyle = this.HTMLElementStyle;
            //#endregion Variables déclaration
            if (Tools.isNumber(width) && Tools.isNumber(height)) {
                htmlElementStyle.width = `${width}${PX}`;
                htmlElementStyle.height = `${height}${PX}`;
            }
        }
        //#endregion setDimension
        //#region resize
        resize() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElementStyle = this.HTMLElementStyle;
            //#endregion Variables déclaration
            if (htmlElementStyle) {
                htmlElementStyle.width = `${priv.width}${Types.CSSUNITS.PX}`;
                htmlElementStyle.height = `${priv.height}${Types.CSSUNITS.PX}`;
            }
        }
        //#endregion resize
        //#region update
        update() {
            if (Core.isHTMLRenderer) {
                this.applyTransforms();
            } else {
                Core.canvas.needRedraw = true;
            }
        }
        //#endregion update
        //#region realignChilds
        realignChilds() {
            //#region Variables déclaration
            const priv = internal(this);
            const PX = Types.CSSUNITS.PX;
            const ALIGNS = Types.ALIGNS;
            const comps = this.components;
            const padding = priv.padding;
            const width = this.contentWidth;// - padding.left - padding.right;
            let height = this.contentHeight;// - padding.top - padding.bottom;
            let l = padding.left;
            let t = padding.top;
            let r = padding.right;
            let b = padding.bottom;
            const alignTop = (child) => {
                if (Core.isHTMLRenderer) {
                    const htmlElementStyle = child.HTMLElementStyle;
                    const s = getComputedStyle(child.HTMLElement);
                    htmlElementStyle.top = t > 0 ? `${t}${PX}` : "0";
                    htmlElementStyle.left = l > 0 ? `${l}${PX}` : "0";
                    htmlElementStyle.right = r > 0 ? `${r}${PX}` : "0";
                    htmlElementStyle.width = "auto";
                    htmlElementStyle.bottom = "auto";
                    if (htmlElementStyle.height === "auto") {
                        htmlElementStyle.height = `${child.owner.HTMLElement.offsetHeight - t - b}${PX}`;
                    }
                    child.applyTransforms();
                    t = ~~parseFloat(s.marginTop) + child.HTMLElement.offsetHeight + ~~parseFloat(s.marginBottom);
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
                if (Core.isHTMLRenderer) {
                    const htmlElementStyle = child.HTMLElementStyle;
                    const s = getComputedStyle(child.HTMLElement);
                    htmlElementStyle.bottom = b > 0 ? `${b}${PX}` : "0";
                    htmlElementStyle.left = l > 0 ? `${l}${PX}` : "0";
                    htmlElementStyle.right = r > 0 ? `${r}${PX}` : "0";
                    htmlElementStyle.width = "auto";
                    htmlElementStyle.top = "auto";
                    if (htmlElementStyle.height === "auto") {
                        htmlElementStyle.height = `${child.owner.HTMLElement.offsetHeight - t - b}${PX}`;
                    }
                    child.applyTransforms();
                    b = ~~parseFloat(s.marginTop) + child.HTMLElement.offsetHeight + ~~parseFloat(s.marginBottom);
                }
                child.realignChilds();
            };
            const alignLeft = (child) => {
                if (Core.isHTMLRenderer) {
                    const htmlElementStyle = child.HTMLElementStyle;
                    const s = getComputedStyle(child.HTMLElement);
                    htmlElementStyle.top = t > 0 ? `${t}${PX}` : "0";
                    htmlElementStyle.left = l > 0 ? `${l}${PX}` : "0";
                    htmlElementStyle.right = "auto";
                    htmlElementStyle.bottom = b > 0 ? `${b}${PX}` : "0";
                    htmlElementStyle.height = "auto";
                    if (htmlElementStyle.width === "auto") {
                        htmlElementStyle.width = `${child.owner.HTMLElement.offsetWidth - l - r}${PX}`;
                    }
                    child.applyTransforms();
                    l = ~~parseFloat(s.marginLeft) + child.HTMLElement.offsetWidth + ~~parseFloat(s.marginRight);
                }
                child.realignChilds();
            };
            const alignRight = (child) => {
                if (Core.isHTMLRenderer) {
                    const htmlElementStyle = child.HTMLElementStyle;
                    const s = getComputedStyle(child.HTMLElement);
                    htmlElementStyle.top = t > 0 ? `${t}${PX}` : "0";
                    htmlElementStyle.left = "auto";
                    htmlElementStyle.right = r > 0 ? `${r}${PX}` : "0";
                    htmlElementStyle.bottom = b > 0 ? `${b}${PX}` : "0";
                    htmlElementStyle.height = "auto";
                    if (htmlElementStyle.width === "auto") {
                        htmlElementStyle.width = `${child.owner.HTMLElement.offsetWidth - l - r}${PX}`;
                    }
                    child.applyTransforms();
                    r = ~~parseFloat(s.marginLeft) + child.HTMLElement.offsetWidth + ~~parseFloat(s.marginRight);
                }
                child.realignChilds();
            };
            //#endregion Variables déclaration
            if (comps.length === 0 || !priv.allowUpdate) {
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
                if (Core.isHTMLRenderer) {
                    const htmlElementStyle = child.HTMLElementStyle;
                    htmlElementStyle.top = t > 0 ? `${t}${PX}` : "0";
                    htmlElementStyle.left = l > 0 ? `${l}${PX}` : "0";
                    htmlElementStyle.right = r > 0 ? `${r}${PX}` : "0";
                    htmlElementStyle.bottom = b > 0 ? `${b}${PX}` : "0";
                    htmlElementStyle.height = "auto";
                    htmlElementStyle.width = "auto";
                    child.applyTransforms();
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
                if (Core.isHTMLRenderer) {
                    const htmlElementStyle = child.HTMLElementStyle;
                    htmlElementStyle.left = l > 0 ? `${l}${PX}` : "0";
                    htmlElementStyle.right = r > 0 ? `${r}${PX}` : "0";
                    htmlElementStyle.width = "auto";
                    child.applyTransforms();
                }
                child.realignChilds();
            });
            //#endregion
            //#region vertical
            childs = this.components.filter(e => {
                return e.align === ALIGNS.VERTICAL && e.visible;
            });
            childs.forEach(child => {
                if (Core.isHTMLRenderer) {
                    const htmlElementStyle = child.HTMLElementStyle;
                    htmlElementStyle.top = l > 0 ? `${l}${PX}` : "0";
                    htmlElementStyle.bottom = b > 0 ? `${b}${PX}` : "0";
                    htmlElementStyle.height = "auto";
                    child.applyTransforms();
                }
                child.realignChilds();
            });
            //#endregion
            //#region contents
            childs = this.components.filter(e => {
                return e.align === ALIGNS.CONTENTS && e.visible;
            });
            childs.forEach(child => {
                if (Core.isHTMLRenderer) {
                    const htmlElementStyle = child.HTMLElementStyle;
                    htmlElementStyle.top = "0";
                    htmlElementStyle.left = "0";
                    htmlElementStyle.bottom = "0";
                    htmlElementStyle.right = "0";
                    htmlElementStyle.height = "auto";
                    htmlElementStyle.width = "auto";
                    child.applyTransforms();
                }
                child.realignChilds();
            });
            //#endregion
            //#region center
            childs = this.components.filter(e => {
                return e.align === ALIGNS.CENTER && e.visible;
            });
            childs.forEach(child => {
                if (Core.isHTMLRenderer) {
                    const htmlElementStyle = child.HTMLElementStyle;
                    htmlElementStyle.top = "50%";
                    htmlElementStyle.left = "50%";
                    htmlElementStyle.bottom = "auto";
                    htmlElementStyle.right = "auto";
                    child.applyTransforms("translate(-50%,-50%)");
                }
                child.realignChilds();
            });
            //#endregion
            //#region horzCenter
            childs = this.components.filter(e => {
                return e.align === ALIGNS.HORZCENTER && e.visible;
            });
            childs.forEach(child => {
                if (Core.isHTMLRenderer) {
                    const htmlElementStyle = child.HTMLElementStyle;
                    htmlElementStyle.top = l > 0 ? `${l}${PX}` : "0";
                    htmlElementStyle.bottom = b > 0 ? `${b}${PX}` : "0";
                    htmlElementStyle.left = "50%";
                    htmlElementStyle.height = "auto";
                    child.applyTransforms("translateX(-50%)");
                }
                child.realignChilds();
            });
            //#endregion
            //#region vertCenter
            childs = this.components.filter(e => {
                return e.align === ALIGNS.VERTCENTER && e.visible;
            });
            childs.forEach(child => {
                if (Core.isHTMLRenderer) {
                    const htmlElementStyle = child.HTMLElementStyle;
                    htmlElementStyle.left = l > 0 ? `${l}${PX}` : "0";
                    htmlElementStyle.right = b > 0 ? `${b}${PX}` : "0";
                    htmlElementStyle.top = "50%";
                    htmlElementStyle.width = "auto";
                    child.applyTransforms("translateY(-50%)");
                }
                child.realignChilds();
            });
            //#endregion
            //#region topRight
            //childs=this._components.filter(function(e,i,a) {
            //  return (e.align===Types.ALIGNS.TOPRIGHT)&&e.visible;
            //});
            //#endregion
            //#region bottomLeft
            //childs=this._components.filter(function(e,i,a) {
            //  return (e.align===Types.ALIGNS.BOTTOMLEFT)&&e.visible;
            //});
            //#endregion
            //#region bottomRight
            //childs=this._components.filter(function(e,i,a) {
            //  return (e.align===Types.ALIGNS.BOTTOMRIGHT)&&e.visible;
            //});
            //#endregion
        }
        //#endregion realignChilds
        //#region insertTemplate
        insertTemplate(tpl) {
            //#region Variables déclaration
            const htmlElement = this.HTMLElement;
            const priv = internal(this);
            //#endregion Variables déclaration
            if (!priv.allowUpdate) {
                priv.wrapper += tpl;
            } else if (htmlElement) {
                const div = document.createElement(Types.HTMLELEMENTS.DIV);
                div.innerHTML = tpl;
                htmlElement.appendChild(div.firstElementChild);
            }
        }
        //#endregion insertTemplate
        //#region setFocus
        setFocus() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.canFocused && this.visible && this.isEnabled) {
                this.enterFocus();
            }
        }
        //#endregion setFocus
        //#region beginUpdate
        beginUpdate() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.allowUpdate = false;
            if (Core.isHTMLRenderer) {
                priv.wrapper = this.HTMLElement.innerHTML;
            }
        }
        //#endregion beginUpdate
        //#region endUpdate
        endUpdate() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.allowUpdate = true;
            this.realignChilds();
            //this.update();
            //if (this._owner._allowUpdate&&Core.renderer!==Types.renderers.HTML) this.redraw(this.lastRect);
            //this.HTMLElement.innerHTML = this._wrapper;
            //for (let i=0,l=this.wrapperClass.length;i<l;i++) {
            //  let id=this.wrapperClass[i].id,Class=this.wrapperClass[i].Class;
            //  Tools.execFunc(createComponent",{Class:Class,owner:this,id:id});
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
            if (htmlElement) {
                if (this.owner) {
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
        }
        //#endregion bringToFront
        //#region sendToBack
        sendToBack() {
            //#region Variables déclaration
            const comps = this.owner.components;
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (htmlElement) {
                if (this.owner) {
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
                        if (newIdx >= comps.length) {
                            comps.add(this);
                        } else {
                            comps.insert(newIdx, this);
                        }
                        parentNode = htmlElement.parentNode;
                        parentNode.removeChild(htmlElement);
                        let lastElement = null;
                        if (lastIdx >= arr.length) {
                            lastElement = null;
                        } else {
                            lastElement = arr[newIdx + 1];
                        }
                        if (newIdx >= arr.length) {
                            parentNode.appendChild(htmlElement);
                        } else {
                            parentNode.insertBefore(htmlElement, lastElement);
                        }
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
                        if (newIdx < 0) {
                            comps.insert(0, this);
                        } else {
                            comps.insert(newIdx, this);
                        }
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
            const priv = internal(this);
            const form = this.form;
            //#endregion Variables déclaration
            if (priv.enabled && (this instanceof Core.classes.Control)) {
                if (this.hitTest.mouseDown) {
                    if (form && form instanceof Core.classes.Window) {
                        if (priv.closePopups) {
                            if (form.mainMenu) {
                                form.mainMenu.isActive = false;
                            }
                            form.closePopups();
                        }
                        if (!priv.canFocused && this !== form.content) {
                            const parentCanFocused = this.owner;
                            if (parentCanFocused && form.focusedControl !== parentCanFocused) {
                                parentCanFocused.setFocus();
                            }
                        } else if (!priv.isFocused && form.focusedControl !== this) {
                            this.setFocus();
                        }
                    }
                    if (Core.mouse.button === Mouse.MOUSEBUTTONS.RIGHT) {
                        this.contextMenu();
                        return;
                    } else {
                        if (this.autoCapture) {
                            this.capture();
                        }
                        this.isPressed = true;
                        this.onMouseDown.invoke();
                    }
                    if (!Core.isHTMLRenderer) {
                        Core.canvas.needRedraw = true;
                    }
                }
            }
        }
        //#endregion mouseDown
        //#region mouseUp
        mouseUp() {
            //#region Variables déclaration
            const priv = internal(this);
            let target = Core.mouse.event.target;
            let clicked = false;
            //#endregion Variables déclaration
            if (!target.jsObj) {
                target = target.parentNode;
            }
            if (this instanceof Core.classes.Control) {
                this.releaseCapture();
                this.onMouseUp.invoke();
                clicked = priv.isPressed && !priv.doubleClick;
                this.isPressed = false;
                this.doubleClick = false;
                if (clicked && Core.mouse.button === Mouse.MOUSEBUTTONS.LEFT) {
                    this.click();
                    if (!Core.isHTMLRenderer) {
                        Core.canvas.needRedraw = true;
                    }
                }
            }
        }
        //#endregion mouseUp
        //#region mouseWheel
        mouseWheel() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (this instanceof Core.classes.Control) {
                //if (this.scrollContainer!==null) this.scrollContainer.mouseWheel.apply(this.scrollContainer,arguments);
                //else {
                //  if (this.wheelTimer===null) {
                //    this.onMouseWheelStart.invoke();
                //  } else clearTimeout(this.wheelTimer);
                //  this.onMouseWheel.invoke(arguments);
                //}
                if (!priv.hitTest.mouseWheel) {
                    this.owner.mouseWheel();
                }
            }
        }
        //#endregion mouseWheel
        //#region mouseMove
        mouseMove() {
            if (this instanceof Core.classes.Control) {
                this.onMouseMove.invoke();
            }
        }
        //#endregion mouseMove
        //#region mouseEnter
        mouseEnter() {
            //#region Variables déclaration
            const priv = internal(this);
            const CUSTOMCURSORS = Types.CUSTOMCURSORS;
            const cursor = priv.cursor;
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (this instanceof Core.classes.Control) {
                this.isMouseOver = true;
                this.onMouseEnter.invoke();
                if (cursor !== CUSTOMCURSORS.DEFAULT) {
                    if ((cursor === CUSTOMCURSORS.WAIT || cursor === CUSTOMCURSORS.PROGRESS)) {
                        Core.animatedCursor.initAnimation(Core.isHTMLRenderer ? htmlElement : Core.canvas, cursor);
                    }
                }
                this.form.app.showToolTip(this, Core.mouse.document, true);
                if (priv.isPressed && Core.isHTMLRenderer) {
                    htmlElement.classList.add("pressed");
                } else if (!Core.isHTMLRenderer) {
                    Core.canvas.needRedraw = true;
                }
            }
        }
        //#endregion mouseEnter
        //#region mouseLeave
        mouseLeave() {
            //#region Variables déclaration
            const priv = internal(this);
            const cursor = priv.cursor;
            const CUSTOMCURSORS = Types.CUSTOMCURSORS;
            //#endregion Variables déclaration
            if (this instanceof Core.classes.Control) {
                this.isMouseOver = false;
                this.onMouseLeave.invoke();
                if (cursor !== CUSTOMCURSORS.DEFAULT) {
                    if ((cursor === CUSTOMCURSORS.WAIT || cursor === CUSTOMCURSORS.PROGRESS)) {
                        Core.animatedCursor.stopAnimation();
                    }
                }
                this.form.app.hideToolTip();
                if (Core.isHTMLRenderer) {
                    this.HTMLElement.classList.remove("pressed");
                } else if (!Core.isHTMLRenderer) {
                    Core.canvas.needRedraw = true;
                }
            }
        }
        //#endregion mouseLeave
        //#region enterFocus
        enterFocus() {
            //#region Variables déclaration
            const priv = internal(this);
            const focusedControl = this.form.focusedControl;
            //#endregion Variables déclaration
            if ((this instanceof Core.classes.Control) && priv.canFocused) {
                if (focusedControl) {
                    if (focusedControl !== this) {
                        focusedControl.killFocus();
                    }
                }
                this.isFocused = true;
                this.onEnterFocus.invoke();
            }
        }
        //#endregion enterFocus
        //#region killFocus
        killFocus() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if ((this instanceof Core.classes.Control) && priv.canFocused) {
                this.isFocused = false;
                //this._applyTriggerEffect(this,'isFocused');
                //this.startTriggerAnimation(this,'isFocused');
                this.onKillFocus.invoke();
            }
        }
        //#endregion killFocus
        //#region initEvents
        initEvents() {
            //#region Variables déclaration
            const MOUSEEVENTS = Mouse.MOUSEEVENTS;
            const htmlElement = this.HTMLElement;
            const dispatchEvent = this.dispatchEvent;
            //#endregion Variables déclaration
            Events.bind(htmlElement, MOUSEEVENTS.OVER, dispatchEvent);
            Events.bind(htmlElement, MOUSEEVENTS.OUT, dispatchEvent);
            Events.bind(htmlElement, MOUSEEVENTS.CLICK, dispatchEvent);
            Events.bind(htmlElement, MOUSEEVENTS.MOVE, dispatchEvent);
            Events.bind(htmlElement, MOUSEEVENTS.DOWN, dispatchEvent);
            Events.bind(htmlElement, MOUSEEVENTS.UP, dispatchEvent);
            Events.bind(htmlElement, MOUSEEVENTS.WHEEL, dispatchEvent);
            Events.bind(htmlElement, MOUSEEVENTS.DBLCLICK, dispatchEvent);
            Events.bind(htmlElement, MOUSEEVENTS.DOMSCROLL, dispatchEvent);
            Events.bind(htmlElement, MOUSEEVENTS.ENTER, dispatchEvent);
            Events.bind(htmlElement, MOUSEEVENTS.DRAG, dispatchEvent);
            Events.bind(htmlElement, MOUSEEVENTS.DROP, dispatchEvent);
            Events.bind(htmlElement, MOUSEEVENTS.DRAGEND, dispatchEvent);
            Events.bind(htmlElement, MOUSEEVENTS.DRAGENTER, dispatchEvent);
            Events.bind(htmlElement, MOUSEEVENTS.DRAGEXIT, dispatchEvent);
            Events.bind(htmlElement, MOUSEEVENTS.DRAGLEAVE, dispatchEvent);
            Events.bind(htmlElement, MOUSEEVENTS.DRAGOVER, dispatchEvent);
            Events.bind(htmlElement, MOUSEEVENTS.DRAGSTART, dispatchEvent);
        }
        //#endregion initEvents
        //#region resetEvent
        resetEvent() {
            //#region Variables déclaration
            const MOUSEEVENTS = Mouse.MOUSEEVENTS;
            const htmlElement = this.HTMLElement;
            const dispatchEvent = this.dispatchEvent;
            //#endregion Variables déclaration
            Events.unBind(htmlElement, MOUSEEVENTS.OVER, dispatchEvent);
            Events.unBind(htmlElement, MOUSEEVENTS.OUT, dispatchEvent);
            Events.unBind(htmlElement, MOUSEEVENTS.CLICK, dispatchEvent);
            Events.unBind(htmlElement, MOUSEEVENTS.MOVE, dispatchEvent);
            Events.unBind(htmlElement, MOUSEEVENTS.DOWN, dispatchEvent);
            Events.unBind(htmlElement, MOUSEEVENTS.UP, dispatchEvent);
            Events.unBind(htmlElement, MOUSEEVENTS.WHEEL, dispatchEvent);
            Events.unBind(htmlElement, MOUSEEVENTS.DBLCLICK, dispatchEvent);
            Events.unBind(htmlElement, MOUSEEVENTS.DOMSCROLL, dispatchEvent);
            Events.unBind(htmlElement, MOUSEEVENTS.ENTER, dispatchEvent);
            Events.unBind(htmlElement, MOUSEEVENTS.DRAG, dispatchEvent);
            Events.unBind(htmlElement, MOUSEEVENTS.DROP, dispatchEvent);
            Events.unBind(htmlElement, MOUSEEVENTS.DRAGEND, dispatchEvent);
            Events.unBind(htmlElement, MOUSEEVENTS.DRAGENTER, dispatchEvent);
            Events.unBind(htmlElement, MOUSEEVENTS.DRAGEXIT, dispatchEvent);
            Events.unBind(htmlElement, MOUSEEVENTS.DRAGLEAVE, dispatchEvent);
            Events.unBind(htmlElement, MOUSEEVENTS.DRAGOVER, dispatchEvent);
            Events.unBind(htmlElement, MOUSEEVENTS.DRAGSTART, dispatchEvent);
        }
        //#endregion resetEvent
        //#region dispatchEvent
        dispatchEvent(event) {
            //#region Variables déclaration
            let htmlObj = event.target;
            let jsObj = htmlObj.jsObj;
            let activeWin = null;
            let forceStopEvent = false;
            const AUTOMATIC = Types.DRAGMODES.AUTOMATIC;
            const DOCK = Types.DRAGKINDS.DOCK;
            const MOUSEEVENTS = Mouse.MOUSEEVENTS;
            //#endregion Variables déclaration
            if (Core.isHTMLRenderer) {
                while (!jsObj) {
                    htmlObj = htmlObj.parentNode;
                    if (htmlObj !== null) {
                        jsObj = htmlObj.jsObj;
                    } else {
                        break;
                    }
                }
            } else {
                jsObj = this;
            }
            if (!jsObj || jsObj.form.destroying ||
                (!jsObj.isEnabled && event.type !== MOUSEEVENTS.WHEEL && event.type !== MOUSEEVENTS.DOMSCROLL &&
                    event.type !== MOUSEEVENTS.MOVE)) {
                return;
            }
            activeWin = jsObj.form.app.activeWindow;
            Core.keyboard.getKeyboardInfos(event);
            Core.mouse.getMouseInfos(event);
            switch (event.type) {
                case MOUSEEVENTS.MOVE:
                    if (Core.resizeWindow) {
                        activeWin.mouseMove(event);
                    } else if (activeWin.capturedControl) {
                        if (activeWin.capturedControl.mouseMove) {
                            activeWin.capturedControl.mouseMove();
                        }
                    } else if (Tools.isFunc(jsObj.mouseMove)) {
                        jsObj.mouseMove();
                    }
                    break;
                case MOUSEEVENTS.DOWN:
                    if (activeWin !== jsObj.form) {
                        if (activeWin.mainMenu) {
                            activeWin.mainMenu.isActive = false;
                        }
                        activeWin.app.closeAllPopups();
                    }
                    if (jsObj.form && jsObj.form instanceof Core.classes.Window) {
                        jsObj.form.setActive();
                        activeWin = jsObj.form;
                        if (jsObj.autoCapture) {
                            activeWin.capturedControl = jsObj;
                        }
                        if (activeWin !== jsObj.form.app.mainWindow) {
                            if (jsObj.form.app.mainWindow.mainMenu) {
                                jsObj.form.app.mainWindow.mainMenu.isActive = false;
                            }
                            jsObj.form.app.mainWindow.closePopups();
                        }
                    }
                    if (Tools.isFunc(jsObj.mouseDown)) {
                        jsObj.mouseDown();
                    }
                    if (Core.classes.CustomTextControl && activeWin.focusedControl instanceof Core.classes.CustomTextControl) {
                        activeWin.focusedControl.inputObj.focus();
                    }
                    break;
                case MOUSEEVENTS.UP:
                case MOUSEEVENTS.CLICK:
                    if (Core.resizeWindow) {
                        activeWin.mouseUp(event);
                    } else if (activeWin.capturedControl) {
                        if (activeWin.capturedControl.mouseUp) {
                            activeWin.capturedControl.mouseUp();
                        }
                        if (activeWin) {
                            activeWin.capturedControl = null;
                        }
                    } else if (Tools.isFunc(jsObj.mouseUp)) {
                        jsObj.mouseUp();
                    }
                    break;
                case MOUSEEVENTS.WHEEL:
                case MOUSEEVENTS.DOMSCROLL:
                    if (activeWin.popups.length > 0 && !jsObj.forceMouseWheel) {
                        return;
                    }
                    if (Tools.isFunc(jsObj.mouseWheel)) {
                        jsObj.mouseWheel();
                    }
                    forceStopEvent = true;
                    event.preventDefault();
                    break;
                case MOUSEEVENTS.DBLCLICK:
                    if (activeWin.capturedControl) {
                        if (activeWin.capturedControl.mouseUp) {
                            activeWin.capturedControl.dblClick();
                        }
                    } else if (Tools.isFunc(jsObj.dblClick) && jsObj.dblClick) {
                        jsObj.dblClick();
                    }
                    break;
                case MOUSEEVENTS.OUT:
                case MOUSEEVENTS.LEAVE:
                    if (Tools.isFunc(jsObj.mouseLeave)) {
                        jsObj.mouseLeave();
                    }
                    break;
                case MOUSEEVENTS.OVER:
                case MOUSEEVENTS.ENTER:
                    if (Tools.isFunc(jsObj.mouseEnter)) {
                        jsObj.mouseEnter();
                    }
                    break;
                case MOUSEEVENTS.DRAG:
                    if (jsObj.dragMode !== AUTOMATIC)
                        if (Tools.isFunc(jsObj.drag)) {
                            jsObj.drag();
                        }
                    break;
                case MOUSEEVENTS.DROP:
                    if (jsObj.dragKind === DOCK) {
                        if (jsObj.dragMode === AUTOMATIC) {
                            event.preventDefault();
                            event.target.appendChild(document.getElementById(event.dataTransfer.getData("text")));
                        } else if (Tools.isFunc(jsObj.drop)) {
                            jsObj.drop();
                        }
                    }
                    break;
                case MOUSEEVENTS.DRAGEND:
                    if (jsObj.dragMode !== AUTOMATIC)
                        if (Tools.isFunc(jsObj.dragEnd)) {
                            jsObj.dragEnd();
                        }
                    break;
                case MOUSEEVENTS.DRAGENTER:
                    if (jsObj.dragMode !== AUTOMATIC)
                        if (Tools.isFunc(jsObj.dragEnter)) {
                            jsObj.dragEnter();
                        }
                    break;
                case MOUSEEVENTS.DRAGEXIT:
                    if (jsObj.dragMode !== AUTOMATIC)
                        if (Tools.isFunc(jsObj.dragExit)) {
                            jsObj.dragExit();
                        }
                    break;
                case MOUSEEVENTS.DRAGLEAVE:
                    if (jsObj.dragMode !== AUTOMATIC)
                        if (Tools.isFunc(jsObj.dragLeave)) {
                            jsObj.dragLeave();
                        }
                    break;
                case MOUSEEVENTS.DRAGOVER:
                    if (jsObj.dragKind === DOCK) {
                        if (jsObj.dragMode === AUTOMATIC) {
                            event.preventDefault();
                        } else if (Tools.isFunc(jsObj.dragOver)) {
                            jsObj.dragOver();
                        }
                    }
                    break;
                case MOUSEEVENTS.DRAGSTART:
                    if (jsObj.dragMode === AUTOMATIC) {
                        event.dataTransfer.setData("text", htmlObj.id);
                    } else if (Tools.isFunc(jsObj.dragStart)) {
                        jsObj.dragStart();
                    }
                    break;
                    //case Types.mouseEvents.CLICK:
                    //  //jsObj.click();
                    //  break;
                    //case Types.mouseEvents.EVENT:
                    //  break;
                    //case Types.keybordEvents.DOWN:
                    //  if (typeof jsObj.keyDown===Types.CONSTANTS.FUNCTION) jsObj.keyDown();
                    //  break;
                    //case Types.keybordEvents.UP:
                    //  if (typeof jsObj.keyUp===Types.CONSTANTS.FUNCTION) jsObj.keyUp();
                    //  break;
                    //case Types.keybordEvents.PRESS:
                    //  if (typeof jsObj.keyPress===Types.CONSTANTS.FUNCTION) jsObj.keyPress();
                    //  break;
            }
            if (jsObj.stopEvent || forceStopEvent) {
                Core.mouse.stopEvent(event);
            }
        }
        //#endregion dispatchEvent
        //#region releaseCapture
        releaseCapture() {
            //#region Variables déclaration
            const form = this.form;
            //#endregion Variables déclaration
            if (form) {
                if (form.capturedControl === this) {
                    form.capturedControl = null;
                }
            }
        }
        //#endregion releaseCapture
        //#region capture
        capture() {
            //#region Variables déclaration
            const form = this.form;
            //#endregion Variables déclaration
            if (form) {
                form.capturedControl = this;
            }
        }
        //#endregion capture
        //#region click
        click() {
            //#region Variables déclaration
            const action = this.action;
            //#endregion Variables déclaration
            if (this.onClick.hasListener) {
                this.onClick.invoke();
            } else if (action) {
                action.execute();
            }
        }
        //#endregion click
        //#region dblClick
        dblClick() {
            this.onDblClick.invoke();
        }
        //#endregion dblClick
        //#region keyDown
        keyDown() {
            this.onKeyDown.invoke();
            if (Core.keyboard.keyCode === Keyboard.VKEYSCODES.VK_SPACE) {
                if (!(this instanceof Core.classes.CustomTextControl)) {
                    this.isPressed = true;
                }
            }
        }
        //#endregion keyDown
        //#region keyUp
        keyUp() {
            //#region Variables déclaration
            const VKEYSCODES = Keyboard.VKEYSCODES;
            //#endregion Variables déclaration
            this.onKeyUp.invoke();
            if (Core.keyboard.keyCode === VKEYSCODES.VK_SPACE || Core.keyboard.keyCode === VKEYSCODES.VK_RETURN) {
                if (!(this instanceof Core.classes.CustomTextControl)) {
                    this.click();
                    this.isPressed = false;
                }
            } else if (Core.keyboard.keyCode === VKEYSCODES.VK_MENU) {
                if (this.popupMenu) {
                    const pt = this.clientToDocument();
                    this.popupMenu.show(pt.x, pt.y);
                } else {
                    this.form.content.popupMenu.show(0, 0);
                }
            }
        }
        //#endregion keyUp
        //#region keyPress
        keyPress() {
            this.onKeyPress.invoke();
        }
        //#endregion keyPress
        //#region drag
        drag(event) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.dragKind === Types.DRAGKINDS.DRAG && priv.dragMode === Types.DRAGMODES.MANUAL) {
                this.onDrag.invoke(event);
            }
        }
        //#endregion drag
        //#region drop
        drop(event) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.dragKind !== Types.DRAGKINDS.DOCK) {
                if (priv.dragMode !== Types.DRAGMODES.MANUAL) {
                    this.onDrop.invoke(event);
                }
            }
        }
        //#endregion drop
        //#region dragEnter
        dragEnter(event) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.dragKind === Types.DRAGKINDS.DOCK) {
                if (priv.dragMode === Types.DRAGMODES.MANUAL) {
                    this.onDragEnter.invoke(event);
                }
            }
        }
        //#endregion dragEnter
        //#region dragStart
        dragStart(event) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.dragKind === Types.DRAGKINDS.DRAG && priv.dragMode === Types.DRAGMODES.MANUAL) {
                this.onDragStart.invoke(event);
            }
        }
        //#endregion dragStart
        //#region dragLeave
        dragLeave() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.dragKind === Types.DRAGKINDS.DOCK) {
                if (priv.dragMode === Types.DRAGMODES.MANUAL) {
                    this.onDragLeave.invoke(event);
                }
            }
        }
        //#endregion dragLeave
        //#region dragExit
        dragExit() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.dragKind === Types.DRAGKINDS.DRAG && priv.dragMode === Types.DRAGMODES.MANUAL) {
                this.onDragExit.invoke(event);
            }
        }
        //#endregion dragExit
        //#region dragOver
        dragOver(event) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.dragKind === Types.DRAGKINDS.DOCK) {
                if (priv.dragMode === Types.DRAGMODES.MANUAL) {
                    this.onDragOver.invoke(event);
                }
            }
        }
        //#endregion dragOver
        //#region dragEnd
        dragEnd() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.dragKind === Types.DRAGKINDS.DRAG && priv.dragMode === Types.DRAGMODES.MANUAL) {
                this.onDragEnd.invoke(event);
            }
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
            const priv = internal(this);
            const popupMenu = priv.popupMenu;
            //#endregion Variables déclaration
            if (popupMenu) {
                const x = Core.mouse.window.x;
                const y = Core.mouse.window.y;
                //this.popup.staysOpen=false;
                popupMenu.control = this;
                popupMenu.show(x, y);
            }
        }
        //#endregion contextMenu
        //#region bindEvents
        bindEvents() {
            super.bindEvents();
            //let data;
            //this.opacity = ~~parseFloat(getComputedStyle(this.HTMLElement).opacity);
            //this.getCSSBorder();
            //data = this.HTMLElement.dataset.visible;
            //if (data) this.visible = Convert.strToBool(data);
            //data = this.HTMLElement.dataset.scale;
            //if (data) {
            //    let sca = data.split(",");
            //    this.scale.x = ~~parseFloat(sca[0]);
            //    this.scale.y = ~~parseFloat(sca[1]);
            //}
            //data = this.HTMLElement.dataset.enabled;
            //if (data) this.enabled = Convert.strToBool(data);
            //data = this.HTMLElement.dataset.rotatecenter;
            //if (data) {
            //    let rc = data.split(",");
            //    this.rotateCenter.x = ~~parseFloat(rc[0]);
            //    this.rotateCenter.y = ~~parseFloat(rc[1]);
            //}
            //data = this.HTMLElement.dataset.tooltip;
            //if (data) this.toolTip = data;
            //data = this.HTMLElement.dataset.showtooltip;
            //if (data) this.showToolTip = Convert.strToBool(data);
            //data = this.HTMLElement.dataset.rotateangle;
            //if (data) this.rotateAngle = ~~parseFloat(data);
            //data = this.HTMLElement.dataset.margin;
            //if (data) {
            //    let marg = data.split(",");
            //    this.margin.left = ~~parseFloat(marg[0]);
            //    this.margin.top = ~~parseFloat(marg[1]);
            //    this.margin.right = ~~parseFloat(marg[2]);
            //    this.margin.bottom = ~~parseFloat(marg[3]);
            //}
            //data = this.HTMLElement.dataset.padding;
            //if (data) {
            //    let pad = data.split(",");
            //    this.padding.left = ~~parseFloat(pad[0]);
            //    this.padding.top = ~~parseFloat(pad[1]);
            //    this.padding.right = ~~parseFloat(pad[2]);
            //    this.padding.bottom = ~~parseFloat(pad[3]);
            //}
            //data = this.HTMLElement.dataset.ownershowtooltip;
            //if (data) this.ownerShowToolTip = Convert.strToBool(data);
            //data = this.HTMLElement.dataset.align;
            //if (data) this.align = data;
            //data = this.HTMLElement.dataset.hittest;
            //if (data) {
            //    let hitTest = data.split(",");
            //    for (let i = 0, l = hitTest.length; i < l; i++) {
            //        let keyValue = hitTest[i].split(":");
            //        if (this.hitTest[keyValue[0]]) this.hitTest[keyValue[0]] = Convert.strToBool(keyValue[1]);
            //    }
            //}
            //data = this.HTMLElement.dataset.customstyle;
            //if (data) this._customStyle = JSON.parse(data);
            //data = this.HTMLElement.dataset.taborder;
            //if (data) {
            //    this.tabOrder = ~~data;
            //    this.owner.tabList[this.tabOrder] = this;
            //}
            //data = this.HTMLElement.dataset.canfocused;
            //if (data) this.canFocused = Convert.strToBool(data);
            //data = this.HTMLElement.dataset.showfocus;
            //if (data) this.showFocus = Convert.strToBool(data);
            //data = this.HTMLElement.dataset.dragkind;
            //if (data) this.dragKind = data;
            //data = this.HTMLElement.dataset.dragmode;
            //if (data) this.dragMode = data;
            //// cursor
            //if (this.HTMLElement.className.indexOf("csr_") > 0) {
            //    let classes = this.HTMLElement.className.split(String.SPACE);
            //    for (let i = 0, l = classes.length; i < l; i++) {
            //        if (classes[i].startsWith("csr_")) {
            //            this.cursor = classes[i];
            //            break;
            //        }
            //    }
            //}
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
            this.initEvents();
        }
        //#endregion bindEvents
        //#region getHTMLElement
        getHTMLElement(id) {
            //if (Tools.Debugger.debug) console.log(`${ this.constructor.name } getHTMLElement`);
            if (id !== String.EMPTY) {
                super.getHTMLElement(id);
                //this.initEvents();
                //if (this.animations.length>0) {
                //  for (let i=0,l=this.animations.length;i<l;i++) {
                //    if(this.animations[i].enabled&&!this.animations[i].running&&this.animations[i].autoStart) this.animations[i].start();
                //  }
                //}
                //this.updateFromHTML();
                //Tools.Debugger.log(arguments, this, t);
            }
        }
        //#endregion getHTMLElement
        //#region getChilds
        getChilds(childs, owner) {
            //#region Variables déclaration
            let dataClass = null;
            const XMLNODETYPES = Types.XMLNODETYPES;
            const isHtmlRenderer = Core.isHTMLRenderer;
            const classes = Core.classes;
            let props;
            //#endregion Variables déclaration
            if (childs) {
                let nodes = null;
                if (isHtmlRenderer) {
                    nodes = childs ? childs.childNodes : this.HTMLElement.childNodes;
                } else if (Core.isCanvasRenderer) {
                    nodes = childs;
                }
                nodes.forEach(node => {
                    if (node.nodeType === XMLNODETYPES.ELEMENT_NODE && isHtmlRenderer) {
                        dataClass = node.dataset.class;
                        //dataName = node.name.value;
                    } else {
                        dataClass = node.className;
                        //dataName = node.name;
                    }
                    //if (!dataName || !dataName) {
                    //    dataName = String.EMPTY;
                    //}
                    let properties = {};
                    if (isHtmlRenderer) {
                        if (node.nodeType === XMLNODETYPES.ELEMENT_NODE) {
                            props = node.querySelector(`[id='${node.id}']> properties:first-child`);
                            if (props) {
                                properties = JSON.parse(props.innerText);
                            }
                        }
                    } else {
                        properties = node.properties;
                    }
                    if (dataClass) {
                        if (!owner) {
                            owner = this;
                        }
                        classes.createComponent({
                            class: classes[dataClass],
                            owner: owner,
                            name: properties.name ? properties.name : String.EMPTY,
                            withTpl: false,
                            internalId: node.id,
                            props: properties
                        });
                    }
                });
            }
        }
        //#endregion getChilds
        //#region clientOrigin
        clientOrigin() {
            //#region Variables déclaration
            const result = new Core.classes.Point;
            const htmlElement = this.HTMLElement;
            const htmlParentElement = Tools.HTMLParentElement;
            //#endregion Variables déclaration
            this.owners.forEach(owner => {
                const oHtmlElement = owner.HTMLElement;
                const border = getComputedStyle(oHtmlElement);
                result.x += oHtmlElement.offsetLeft + ~~parseFloat(border.borderLeftWidth);
                result.y += oHtmlElement.offsetTop + ~~parseFloat(border.borderTopWidth);
            });
            result.x += htmlElement.offsetLeft;
            result.y += htmlElement.offsetTop;
            if (htmlParentElement) {
                result.x += htmlParentElement.offsetLeft;
                result.y = htmlParentElement.offsetTop;
            }
            return result;
        }
        //#endregion clientOrigin
        //#region documentToClient
        documentToClient(pt) {
            //#region Variables déclaration
            const origin = this.clientOrigin();
            const result = new Core.classes.Point;
            const width = this.width;
            const height = this.height;
            //#endregion Variables déclaration
            if (!pt) {
                pt = Core.mouse.document;
            }
            result.x = pt.x - origin.x;
            result.y = pt.y - origin.y;
            if (result.x < 0) {
                result.x = 0;
            }
            if (result.y < 0) {
                result.y = 0;
            }
            if (result.x > width) {
                result.x = width;
            }
            if (result.y > height) {
                result.y = height;
            }
            return result;
        }
        //#endregion documentToClient
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const align = priv.align;
            const owner = this.owner;
            const right = priv.right;
            //#endregion Variables déclaration
            super.loaded();
            if (align.startsWith("fit") || align === Types.ALIGNS.SCALE) {
                Tools.addResizeListener(owner);
            }
            if (owner.tab) {
                this.tab = owner.tab;
            }
            if (right !== null) {
                const oldRight = right;
                priv.right = null;
                this.right = oldRight;
            }
            if (Core.isHTMLRenderer && this.inForm) {
                this.resize();
            }
        }
        //#endregion loaded
        //#region resized
        resized() {
            //#region Variables déclaration
            const ALIGNS = Types.ALIGNS;
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
                }
                );
                childs.forEach(child => {
                    if (child.align === ALIGNS.SCALE) {
                        child.scaleFromParent();
                    } else {
                        child.fitToParent();
                    }
                });
                resizeData.width = htmlElement.offsetWidth;
                resizeData.height = htmlElement.offsetHeight;
                this.onAfterResized.invoke(this);
            }
        }
        //#endregion resized
        //#region scaleFromParent
        scaleFromParent() {
            //#region Variables déclaration
            const p = getComputedStyle(this.HTMLElement);
            const PX = Types.CSSUNITS.PX;
            const htmlElementStyle = this.HTMLElementStyle;
            const owner = this.owner;
            const resizeData = owner.resizeData;
            const oHtmlElement = owner.HTMLElement;
            //#endregion Variables déclaration
            if (resizeData.width > 0 && resizeData.height > 0 && oHtmlElement.offsetWidth > 0 && oHtmlElement.offsetHeight > 0) {
                htmlElementStyle.left = `${~~parseFloat(p.left) * (oHtmlElement.offsetWidth / resizeData.width)} ${PX} `;
                htmlElementStyle.top = `${~~parseFloat(p.top) * (oHtmlElement.offsetHeight / resizeData.height)} ${PX} `;
                htmlElementStyle.width = `${~~parseFloat(p.width) * (oHtmlElement.offsetWidth / resizeData.width)} ${PX} `;
                htmlElementStyle.height = `${~~parseFloat(p.height) * (oHtmlElement.offsetHeight / resizeData.height)} ${PX} `;
            }
        }
        //#endregion scaleFromParent
        //#region fitToParent
        fitToParent() {
            //#region Variables déclaration
            const priv = internal(this);
            let newLeft = null;
            let newTop = null;
            let newWidth = null;
            let newHeight = null;
            const p = getComputedStyle(this.HTMLElement);
            const PX = Types.CSSUNITS.PX;
            const ALIGNS = Types.ALIGNS;
            const oHtmlElement = this.owner.HTMLElement;
            const align = priv.align;
            const htmlElementStyle = this.HTMLElementStyle;
            const pP = getComputedStyle(oHtmlElement);
            const mR = new Core.classes.Rect(~~parseFloat(pP.paddingLeft), ~~parseFloat(pP.paddingTop),
                oHtmlElement.offsetWidth - ~~parseFloat(pP.paddingRight),
                oHtmlElement.offsetHeight - ~~parseFloat(pP.paddingBottom));
            const cR = new Core.classes.Rect(~~parseFloat(p.left) - ~~parseFloat(p.paddingLeft),
                ~~parseFloat(p.top) - ~~parseFloat(p.paddingTop),
                ~~parseFloat(p.left) + ~~parseFloat(p.width) + ~~parseFloat(p.paddingRight),
                ~~parseFloat(p.top) + ~~parseFloat(p.height) + ~~parseFloat(p.paddingBottom));
            const fitScale = cR.fit(mR);
            //#endregion Variables déclaration
            if (fitScale.ratio < 1) {
                cR.left = cR.left / fitScale.ratio;
                cR.right = cR.right / fitScale.ratio;
                cR.top = cR.top / fitScale.ratio;
                cR.bottom = cR.bottom / fitScale.ratio;
                cR.center(mR);
                if (align === ALIGNS.FITLEFT) {
                    cR.offset(mR.left - cR.left, 0);
                }
                if (align === ALIGNS.FITRIGHT) {
                    cR.offset(mR.right - cR.right, 0);
                }
                newLeft = cR.left;
                newTop = cR.top;
                newWidth = cR.right - cR.left;
                newHeight = cR.bottom - cR.top;
            } else {
                if (align === ALIGNS.FITLEFT) {
                    cR.offset(mR.left - cR.left, 0);
                }
                if (align === ALIGNS.FITRIGHT) {
                    cR.offset(mR.right - cR.right, 0);
                }
                newLeft = fitScale.rect.left;
                newTop = fitScale.rect.top;
                newWidth = fitScale.rect.right - fitScale.rect.left;
                newHeight = fitScale.rect.bottom - fitScale.rect.top;
            }
            htmlElementStyle.left = `${newLeft + ~~parseFloat(p.paddingLeft)} ${PX} `;
            htmlElementStyle.top = `${newTop + ~~parseFloat(p.paddingTop)} ${PX} `;
            htmlElementStyle.width = `${newWidth - ~~parseFloat(p.paddingLeft) - ~~parseFloat(p.paddingRight)} ${PX} `;
            htmlElementStyle.height = `${newHeight - ~~parseFloat(p.paddingTop) - ~~parseFloat(p.paddingBottom)} ${PX} `;
        }
        //#endregion fitToParent
        //#region applyTransforms
        applyTransforms(transform) {
            //#region Variables déclaration
            const priv = internal(this);
            const t = [];
            const rotateAngle = priv.rotateAngle;
            const scale = priv.scale;
            //#endregion Variables déclaration
            this.resetTransform();
            if (!transform) {
                transform = String.EMPTY;
            }
            //Translation
            //if (transform.includes("translate")) t.push(transform);
            //Rotation
            if (transform.includes("rotate")) {
                t.push(transform);
            } else if (rotateAngle !== 0) {
                t.push(`rotate(${rotateAngle}deg)`);
            }
            //if (this._rotateAngle!==0) {
            //rad=_conv.deg2Rad(this._rotateAngle);
            //t.push(["matrix(",Core.cos(rad),",",Core.sin(rad),",",-Core.sin(rad),",",Core.cos(rad),",0,0)"].join(String.EMPTY));
            //this.HTMLElementStyle.transformOrigin=this._rotateCenter.x+Types.CSSUnits.PX+String.SPACE+this._rotateCenter.y+Types.CSSUnits.PX+String.SPACE+" 0px";
            //this.HTMLElementStyle.transformOrigin="0px 0px 0px";
            //}
            //Scale
            if (transform.includes("scale")) {
                t.push(transform);
            } else if (!scale.isEmpty && scale.x !== 1 && scale.y !== 1) {
                t.push(`scale(${scale.x}, ${scale.y})`);
            } else if (scale.x > 0 && scale.y === 0) {
                t.push(`scaleX(${scale.x})`);
            } else if (scale.y > 0 && scale.x === 0) {
                t.push(`scaleY(${scale.y})`);
            }
            this.HTMLElementStyle.transform = t.join(String.SPACE);
        }
        //#endregion applyTransforms
        //#region resetTransform
        resetTransform() {
            if (Core.isHTMLRenderer) {
                this.HTMLElementStyle.transform = String.EMPTY;
            }
        }
        //#endregion resetTransform
        //#region getTabOrderList
        getTabOrderList(list, children) {
            //#region Variables déclaration
            const priv = internal(this);
            const tabList = priv.tabList;
            //#endregion Variables déclaration
            if (children) {
                children = true;
            }
            if (!list) {
                return;
            }
            if (tabList) {
                tabList.forEach(tab => {
                    if (tab.isVisible) {
                        list.push(tab);
                    }
                    if (children) {
                        tab.getTabOrderList(list, children);
                    }
                });
            }
        }
        //#endregion getTabOrderList
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            const tabList = priv.tabList;
            const padding = priv.padding;
            const margin = priv.margin;
            //#endregion Variables déclaration
            if (this.hasResizeEvent) {
                Core.looper.removeListener(this, "resized");
            }
            this.resetEvent();
            if (tabList) {
                tabList.clear();
            }
            if (padding) {
                padding.destroy();
            }
            if (margin) {
                margin.destroy();
            }
            if (this.onMouseDown) {
                this.onMouseDown.destroy();
            }
            if (this.onMouseMove) {
                this.onMouseMove.destroy();
            }
            if (this.onMouseUp) {
                this.onMouseUp.destroy();
            }
            if (this.onClick) {
                this.onClick.destroy();
            }
            if (this.onDblClick) {
                this.onDblClick.destroy();
            }
            if (this.onMouseLeave) {
                this.onMouseLeave.destroy();
            }
            if (this.onMouseEnter) {
                this.onMouseEnter.destroy();
            }
            if (this.onMouseWheel) {
                this.onMouseWheel.destroy();
            }
            if (this.onMouseWheelStart) {
                this.onMouseWheelStart.destroy();
            }
            if (this.onMouseWheelEnd) {
                this.onMouseWheelEnd.destroy();
            }
            if (this.onBeforePaint) {
                this.onBeforePaint.destroy();
            }
            if (this.onPaint) {
                this.onPaint.destroy();
            }
            if (this.onAfterPaint) {
                this.onAfterPaint.destroy();
            }
            if (this.onEnterFocus) {
                this.onEnterFocus.destroy();
            }
            if (this.onKillFocus) {
                this.onKillFocus.destroy();
            }
            if (this.onKeyDown) {
                this.onKeyDown.destroy();
            }
            if (this.onKeyUp) {
                this.onKeyUp.destroy();
            }
            if (this.onKeyPress) {
                this.onKeyPress.destroy();
            }
            if (this.onAfterResized) {
                this.onAfterResized.destroy();
            }
            if (this.onDragStart) {
                this.onDragStart.destroy();
            }
            if (this.onDrag) {
                this.onDrag.destroy();
            }
            if (this.onDragExit) {
                this.onDragExit.destroy();
            }
            if (this.onDragEnd) {
                this.onDragEnd.destroy();
            }
            if (this.onDragEnter) {
                this.onDragEnter.destroy();
            }
            if (this.onDragOver) {
                this.onDragOver.destroy();
            }
            if (this.onDragLeave) {
                this.onDragLeave.destroy();
            }
            if (this.onDrop) {
                this.onDrop.destroy();
            }
            if (this.onDestroy) {
                this.onDestroy.destroy();
            }
            if (this.scale) {
                this.scale.destroy();
            }
            //this.align = null;
            if (this.rotateCenter) {
                this.rotateCenter.destroy();
            }
            //if (this._boundingClientRect)) this._boundingClientRect.destroy();
            //this._boundingClientRect=null;
            super.destroy();
        }
        //#endregion destroy
        //#region addControl
        addControl(control) {
            //#region Variables déclaration
            const htmlElement = control.HTMLElement;
            //#endregion Variables déclaration
            if (control instanceof Core.classes.Control) {
                if (htmlElement) {
                    htmlElement.remove();
                }
                this.insertComponent(control);
            }
        }
        //#endregion addControl
        //#region getChildsControls
        getChildsControls(callback) {
            this.components.forEach(comp => {
                if (comp instanceof Core.classes.Component) {
                    if (callback) {
                        if (Tools.isFunc(callback)) {
                            callback(comp);
                        }
                    }
                    if (comp instanceof Core.classes.Control) {
                        comp.getChildsControls(callback);
                    }
                }
            });
        }
        //#endregion getChildsControls
        //#region getZOrder
        getZOrder() {
            //#region Variables déclaration
            const owner = this.owner;
            //#endregion Variables déclaration
            if (owner && this.HTMLElement) {
                return owner.components.indexOf(this);
            }
            return -1;
        }
        //#endregion getZOrder
        //#region render
        render(className) {
            //#region Variables déclaration
            const changingTheme = document.body.classList.contains("changingTheme");
            const themeName = changingTheme ? this.app.themeManifest.lastThemeName : this.themeName;
            const priv = internal(this);
            const ctx = Core.ctx;
            const classes = Core.classes;
            const CONSTANTS = Types.CONSTANTS;
            let drawCaption = this instanceof classes.CaptionControl;
            let state = priv.isPressed ? "pressed" : priv.isMouseOver ? "hovered" : priv.isFocused ? "focused" : "normal";
            const params = [];
            //#endregion Variables déclaration
            if (this instanceof classes.Window || this instanceof classes.WindowTitleBar) {
                state = this.form.activeWindow ? "active" : "inactive";
            }

            ctx.save();
            ctx.translate(this.contentLeft, this.contentTop);
            if (this instanceof classes.ThemedControl) {
                let obj = this;
                className = className ? className : this.__proto__.constructor.name;
                let objTheme = Core.themes[themeName][className];
                while (!objTheme && obj instanceof classes.ThemedControl) {
                    obj = Object.getPrototypeOf(obj);
                    className = obj.__proto__.constructor.name;
                    objTheme = Core.themes[themeName][className];
                }
                ctx.save();
                if (!priv.enabled) {
                    ctx.globalAlpha = 0.5;
                }
                if (objTheme) {
                    if (objTheme.hasOwnProperty("clipped") && objTheme.clipped) {
                        ctx.clipRect(0, 0, this.contentWidth, this.contentHeight);
                    }
                    if (objTheme.defaultDrawing != undefined) {
                        drawCaption = drawCaption && objTheme.defaultDrawing;
                    }
                    if (objTheme.shapes) {
                        objTheme.shapes.forEach(shape => {
                            let width = shape.width ? shape.width : priv.width;
                            let height = shape.height ? shape.height : priv.height;
                            if (Tools.isString(height)) {
                                height = eval(eval(height));
                            }
                            if (Tools.isString(width)) {
                                width = eval(eval(width));
                            }
                            const w2 = width / 2;
                            //const h2 = height / 2;
                            let left = shape.left ? shape.left : 0;
                            let top = shape.top ? shape.top : 0;
                            if (Tools.isString(left)) {
                                left = eval(eval(left));
                            }
                            if (Tools.isString(top)) {
                                top = eval(eval(top));
                            }
                            let offset = 0;
                            let canDraw = true;
                            // Offset
                            if (shape.offset != undefined) {
                                offset = shape.offset;
                            }
                            // Shape
                            const returnTrigger = Tools.checkTrigger(this, shape);
                            if (returnTrigger.isOK) {
                                if (shape.storedName) {
                                    Tools.storeValue(Core.vars, shape.storedName, returnTrigger);
                                }
                                // Radius
                                let radius = shape.radius;
                                if (radius) {
                                    if (Tools.isNumber(radius) && obj.borderRadius) {
                                        radius = obj.borderRadius;
                                    }
                                    params.push(Tools.processRadius(this, Core.vars, radius));
                                }
                                // Fill / Stroke
                                switch (shape.type) {
                                    case "drawImg": {
                                        let img = Core.themes[themeName].images[shape.image];
                                        if (!img) {
                                            img = Core.themes.images[shape.image];
                                        }
                                        if (img) {
                                            ctx[shape.type](this, img, shape);
                                        }
                                        canDraw = false;
                                        break;
                                    }
                                    case "drawText":
                                        returnTrigger.isDialog = this.form.isBorderDialog;
                                        ctx[shape.type](this, shape, returnTrigger, state);
                                        canDraw = false;
                                        break;
                                    case "ellipse":
                                        params.insert(0, CONSTANTS._2PI);   // endAngle
                                        params.insert(0, 0);                // startAngle
                                        params.insert(0, 0);                // rotation
                                        params.insert(0, w2 - 0.5 - offset);    // radiusY
                                        params.insert(0, w2 - 0.5 - offset);    // radiusX
                                        params.insert(0, w2);               // y
                                        params.insert(0, w2);               // x
                                        break;
                                    case "drawPolyline":
                                        params.insert(0, shape.points);
                                        break;
                                    case "rectWithBordersColor":
                                        params.insert(0, shape.borders);
                                        if (shape.hasOwnProperty("bottom")) {
                                            params.insert(0, height - top - shape.bottom);
                                        } else {
                                            params.insert(0, height); // height
                                        }
                                        if (shape.hasOwnProperty("right")) {
                                            params.insert(0, width - left - shape.right);
                                        } else {
                                            params.insert(0, width); // width
                                        }
                                        params.insert(0, top);          // top
                                        params.insert(0, left);          // left 
                                        break;
                                    default:
                                        if (shape.hasOwnProperty("bottom")) {
                                            params.insert(0, height - top - shape.bottom);
                                        } else {
                                            params.insert(0, height - (shape.strokeStyle ? 1 : 0)/*-offset*2-top*2*/); // height
                                        }
                                        if (shape.hasOwnProperty("right")) {
                                            params.insert(0, width - left - shape.right);
                                        } else {
                                            params.insert(0, width - (shape.strokeStyle ? 1 : 0)/*-offset*2-left*2*/);  // width
                                        }
                                        params.insert(0, top + (shape.strokeStyle ? 0.5 : 0));          // top
                                        params.insert(0, left + (shape.strokeStyle ? 0.5 : 0));          // left 
                                        break;
                                }
                                if (canDraw) {
                                    if (shape.clipping) {
                                        ctx.clipRegion(shape.clipping, left, top, width, height);
                                    }
                                    ctx.beginPath();
                                    if (shape.borders && shape.type !== "rectWithBordersColor") {
                                        params.push(Tools.processBorders(this, shape.borders));
                                        //params.push(shape.borders);
                                    }
                                    ctx[shape.type](...params);
                                    if (!shape.borders) {
                                        Tools.processStyle(this, shape, state);
                                    }
                                    if (shape.clipping) {
                                        ctx.restore();
                                    }
                                }
                            }
                            params.clear();
                        });
                    }
                }
                if (drawCaption) {
                    Core.themes.CaptionControl.render(this);
                }
                ctx.restore();
            }
            if (priv.clipped) {
                ctx.clipRect(0, 0, this.contentWidth, this.contentHeight);
            }
            this.components.forEach(comp => {
                if (comp.isVisible && comp instanceof classes.Control) {
                    comp.render();
                }
            });
            ctx.restore();
        }
        //#endregion render
        //#endregion Methods
        /*static init() {*/
        /*if (Core.isHTMLRenderer) {
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
                                            <button id='{internalId}_1' class='Control Button TabControlLeftBtn {theme}' data-enabled='false'>*</button>
                                            <button id='{internalId}_2' class='Control Button TabControlRightBtn {theme}' data-enabled='false'>)</button>
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
    return Control;
    //#endregion Control
})();
//#region Control defineProperties
Object.defineProperties(Control, {
    "autoTranslate": {
        enumerable: true
    },
    "closePopups": {
        enumerable: true
    },
    "forceMouseWheel": {
        enumerable: true
    },
    "stopEvent": {
        enumerable: true
    },
    "constraints": {
        enumerable: true
    },
    "ownerShowToolTip": {
        enumerable: true
    },
    "autoCapture": {
        enumerable: true
    },
    "padding": {
        enumerable: true
    },
    "margin": {
        enumerable: true
    },
    "popupMenu": {
        enumerable: true
    },
    "opacity": {
        enumerable: true
    },
    "width": {
        enumerable: true
    },
    "height": {
        enumerable: true
    },
    "scale": {
        enumerable: true
    },
    "canFocused": {
        enumerable: true
    },
    "showFocus": {
        enumerable: true
    },
    "enabled": {
        enumerable: true
    },
    "rotateCenter": {
        enumerable: true
    },
    "toolTip": {
        enumerable: true
    },
    "showToolTip": {
        enumerable: true
    },
    "hitTest": {
        enumerable: true
    },
    "rotateAngle": {
        enumerable: true
    },
    "customStyle": {
        enumerable: true
    },
    "cssClasses": {
        enumerable: true
    },
    "tabOrder": {
        enumerable: true
    },
    "right": {
        enumerable: true
    },
    "bottom": {
        enumerable: true
    },
    "doubleClick": {
        enumerable: true
    },
    "visible": {
        enumerable: true
    },
    "display": {
        enumerable: true
    },
    "left": {
        enumerable: true
    },
    "top": {
        enumerable: true
    }
});
//#endregion Control defineProperties
//#endregion Control
//#region Templates
const controlTpl = "<div id='{internalId}' data-name='{name}' data-class='{className}' class='Control {className}' style='width:100px;height:100px;'></div>";
//const ToolTipTpl = "<div class='Control ToolTip {theme}'>{text}</div>";
Core.classes.register(Types.CATEGORIES.INTERNAL, Control);
Core.classes.registerTemplates([
    { Class: Control, template: controlTpl }
]);
//#endregion
export { Control };
//http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/
//http://www.twinhelix.com/javascript/dragresize/demo/