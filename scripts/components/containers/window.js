//#region Import
import { ThemedControl } from "/scripts/core/themedcontrol.js";
import { Tools } from "/scripts/core/tools.js";
import "/scripts/components/containers/layout.js";
import "/scripts/core/captioncontrol.js";
import "/scripts/components/common/windowbuttons.js";
import { Keyboard } from "/scripts/core/keyboard.js";
import { Mouse } from "/scripts/core/mouse.js";
import { Events } from "/scripts/core/events.js";
import { RectAnimation } from "/scripts/core/rectanimation.js";
import { Point } from "/scripts/core/geometry.js";
import { Convert } from "/scripts/core/convert.js";
//#endregion Import
//#region WindowTitleBar
const WindowTitleBar = (() => {
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
    //#region Class WindowTitleBar
    class WindowTitleBar extends ThemedControl {
        //#region Constructor
        constructor(owner, props) {
            //#region Variables déclaration
            const classes = Core.classes;
            const textAligns = Types.TEXTALIGNS;
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                //#region Private
                const priv = internal(this);
                priv.title = null;
                priv.closeBtn = null;
                priv.minimizeBtn = null;
                priv.maxRestoreBtn = null;
                priv.helpBtn = null;
                priv.rollUpDownBtn = null;
                priv.stayOnOffBtn = null;
                priv.startDragOff = new Core.classes.Point;
                priv.visibleBtns = 0;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "horizAlign",
                    enum: textAligns,
                    forceUpdate: true,
                    variable: priv,
                    value: textAligns.LEFT
                });
                //#endregion
                //#region Public
                this.autoCapture = true;
                const hitTest = this.hitTest;
                hitTest.all = true;
                hitTest.mouseWheel = false;
                //#endregion Public
                this.onCaptionChanged = new classes.NotifyEvent(this);
            }
        }
        //#endregion Constructor
        //#region getters / setters
        //#region visibleButtons
        get visibleButtons() {
            return this.form.isBorderDialog ? 2 : internal(this).visibleBtns;
        }
        //#endregion visibleButtons
        //#region title
        get title() {
            return internal(this).title;
        }
        /*set title(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (typeof newValue !== Types.CONSTANTS.STRING) {
                return;
            }
            if (priv.title !== newValue) {
                priv.title = newValue;
            }
        }*/
        //#endregion title
        //#region closeBtn
        get closeBtn() {
            return internal(this).closeBtn;
        }
        /*set closeBtn(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (!(newValue instanceof Core.classes.Component)) {
                return;
            }
            if (priv.closeBtn !== newValue) {
                priv.closeBtn = newValue;
            }
        }*/
        //#endregion closeBtn
        //#region minimizeBtn
        get minimizeBtn() {
            return internal(this).minimizeBtn;
        }
        /*set minimizeBtn(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (!(newValue instanceof Core.classes.Component)) {
                return;
            }
            if (priv.minimizeBtn !== newValue) {
                priv.minimizeBtn = newValue;
            }
        }*/
        //#endregion minimizeBtn
        //#region maxRestoreBtn
        get maxRestoreBtn() {
            return internal(this).maxRestoreBtn;
        }
        /*set maxRestoreBtn(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (!(newValue instanceof Core.classes.Component)) {
                return;
            }
            if (priv.maxRestoreBtn !== newValue) {
                priv.maxRestoreBtn = newValue;
            }
        }*/
        //#endregion maxRestoreBtn
        //#region helpBtn
        get helpBtn() {
            return internal(this).helpBtn;
        }
        /*set helpBtn(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (!(newValue instanceof Core.classes.Component)) {
                return;
            }
            if (priv.helpBtn !== newValue) {
                priv.helpBtn = newValue;
            }
        }*/
        //#endregion helpBtn
        //#region rollUpDownBtn
        get rollUpDownBtn() {
            return internal(this).rollUpDownBtn;
        }
        /*set rollUpDownBtn(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (!(newValue instanceof Core.classes.Component)) {
                return;
            }
            if (priv.rollUpDownBtn !== newValue) {
                priv.rollUpDownBtn = newValue;
            }
        }*/
        //#endregion rollUpDownBtn
        //#region stayOnOffBtn
        get stayOnOffBtn() {
            return internal(this).stayOnOffBtn;
        }
        /*set stayOnOffBtn(newValue) {
            const priv = internal(this);
            if (!(newValue instanceof Core.classes.Component)) {
                return;
            }
            if (priv.stayOnOffBtn !== newValue) {
                priv.stayOnOffBtn = newValue;
            }
        }*/
        //#endregion stayOnOffBtn
        //#region startDragOff
        get startDragOff() {
            return internal(this).startDragOff;
        }
        //#endregion startDragOff
        //#region allControls
        get allControls() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            return [priv.closeBtn, priv.maxRestoreBtn, priv.minimizeBtn, priv.helpBtn, priv.rollUpDownBtn, priv.stayOnOffBtn];
        }
        //#endregion allControls
        //#endregion
        //#region Methods
        //#region getCaptionButton
        getCaptionButton(btn) {
            //#region Variables déclaration
            const classes = Core.classes;
            const CONSTANTS = Types.CONSTANTS;
            const form = btn.form;
            //#endregion Variables déclaration
            if (btn instanceof classes.WindowCloseButton) {
                return CONSTANTS.CLOSEBTNGLYPH;
            } else if (btn instanceof classes.WindowMaxRestoreButton) {
                return form.isMaximized ? CONSTANTS.RESTOREBTNGLYPH : CONSTANTS.MAXIMIZEBTNGLYPH;
            } else if (btn instanceof classes.WindowMinimizeButton) {
                return form.isMinimized ? CONSTANTS.RESTOREBTNGLYPH : CONSTANTS.MINIMIZEBTNGLYPH;
            } else if (btn instanceof classes.WindowHelpButton) {
                return CONSTANTS.HELPBTNGLYPH;
            } else if (btn instanceof classes.WindowRollUpDownButton) {
                return btn.isRolledUp ? CONSTANTS.ROLLDOWNBTNGLYPH : CONSTANTS.ROLLUPBTNGLYPH;
            } else if (btn instanceof classes.WindowStayOnOffButton) {
                return btn.isStayOn ? CONSTANTS.STAYONBTNGLYPH : CONSTANTS.STAYOFFBTNGLYPH;
            }
        }
        //#endregion getCaptionButton
        //#region mouseDown
        mouseDown() {
            //#region Variables déclaration
            const mouse = Core.mouse;
            const priv = internal(this);
            const startDragOff = priv.startDragOff;
            const p = new Core.classes.Point(mouse.document.x, mouse.document.y);
            const form = this.form;
            const savedSizePosState = form.savedSizePosState;
            const isHtmlRenderer = Core.isHTMLRenderer;
            const htmlElement = form.HTMLElement;
            //#endregion Variables déclaration
            if (mouse.button !== Mouse.MOUSEBUTTONS.LEFT) {
                return;
            }
            super.mouseDown();
            if (form.snapArea === Window.SNAPAREAS.NONE && form.windowState !== Window.WINDOWSTATES.MAXIMIZED) {
                savedSizePosState.left = isHtmlRenderer ? htmlElement.offsetLeft : form.left;
                savedSizePosState.top = isHtmlRenderer ? htmlElement.offsetTop : form.top;
                savedSizePosState.width = isHtmlRenderer ? htmlElement.offsetWidth : form.width;
                savedSizePosState.height = isHtmlRenderer ? htmlElement.offsetHeight : form.height;
            }
            startDragOff.x = p.x;
            startDragOff.y = p.y;
            this.isPressed = true;
            Core.dragWindow = this;
            Events.bind(document, Mouse.MOUSEEVENTS.MOVE.toLowerCase(), this.mouseMove);
        }
        //#endregion mouseDown
        //#region mouseUp
        mouseUp() {
            //#region Variables déclaration
            const mouse = Core.mouse;
            const mDocument = mouse.document;
            const form = this.form;
            const bcr = this.getBoundingClientRect();
            const htmlElement = this.HTMLElement;
            const themeName = this.app.themeManifest.themeName;
            const snapElement = document.getElementById("snapArea");
            //#endregion Variables déclaration
            if (mouse.button === Mouse.MOUSEBUTTONS.RIGHT) {
                if (form.isBorderSingle || form.isBorderSizeable) {
                    let leftSysMenu = null;
                    leftSysMenu = bcr.left;
                    let offsetX = 0;
                    if (Core.isHTMLRenderer) {
                        let paddingLeft = null;
                        paddingLeft = parseFloat(getComputedStyle(htmlElement).paddingLeft);
                        let paddingRight = null;
                        paddingRight = parseFloat(getComputedStyle(htmlElement).paddingRight);
                        if (paddingRight > 0 && paddingRight > paddingLeft) {
                            offsetX = paddingRight;
                            leftSysMenu = bcr.right - offsetX;
                        } else {
                            offsetX = paddingLeft;
                        }
                    } else {
                        offsetX = 20;
                        if (Core.themes[themeName].sysMenuPosition &&
                            Core.themes[themeName].sysMenuPosition === "right") {
                            leftSysMenu = bcr.right - offsetX;
                        }
                    }
                    if ((mDocument.x > leftSysMenu) && (mDocument.x < leftSysMenu + offsetX)) {
                        form.showSystemMenu();
                    }
                }
            } else if (mouse.button === Mouse.MOUSEBUTTONS.LEFT) {
                super.mouseUp();
                this.isPressed = false;
                Core.dragWindow = null;
                Events.unBind(document, Mouse.MOUSEEVENTS.MOVE, this.mouseMove);
                if (form.bordersType === Window.BORDERSTYPES.SNAP && form.windowState !== Window.WINDOWSTATES.SNAPED) {
                    if (form.snapArea !== Window.SNAPAREAS.NONE && snapElement) {
                        form.applySnap();
                    }
                }
                form.enabledShadow = true;
            }
        }
        //#endregion mouseUp
        //#region mouseMove
        mouseMove(mouseEventArg) {
            //#region Variables déclaration
            const decOff = new Point;
            const BORDERSTYPES = Window.BORDERSTYPES;
            const SNAPAREAS = Window.SNAPAREAS;
            const mouse = Core.mouse;
            const mDocument = mouse.document;
            const isHtmlRenderer = Core.isHTMLRenderer;
            //#endregion Variables déclaration
            super.mouseMove();
            if (mouseEventArg) {
                mouse.getMouseInfos(mouseEventArg);
            }
            if (Core.dragWindow) {
                if (mouse.button === Mouse.MOUSEBUTTONS.LEFT) {
                    const titlebar = Core.dragWindow;
                    const form = titlebar.form;
                    const snapArea = form.snapArea;
                    form.enabledShadow = false;
                    if (form.moveable && !form.isMaximized) {
                        const fHtmlElement = form.HTMLElement;
                        const bordersType = form.bordersType;
                        const startDragOff = titlebar.startDragOff;
                        const savedSizePosState = form.savedSizePosState;
                        const winLeft = isHtmlRenderer ? fHtmlElement.offsetLeft : form.left;
                        const winTop = isHtmlRenderer ? fHtmlElement.offsetTop : form.top;
                        const winWidth = isHtmlRenderer ? fHtmlElement.offsetWidth : form.width;
                        const winHeight = isHtmlRenderer ? fHtmlElement.offsetHeight : form.height;
                        const parent = isHtmlRenderer ? fHtmlElement.parentNode : Core.canvas.parentNode;
                        const p = new Core.classes.Point(mDocument.x, mDocument.y);
                        decOff.x = Math.abs(startDragOff.x - p.x);
                        decOff.y = Math.abs(startDragOff.y - p.y);
                        if ((decOff.x !== 0 || decOff.y !== 0) && titlebar.isPressed) {
                            if (p.x < 0) {
                                p.x = 0;
                            }
                            if (p.y < 0) {
                                p.y = 0;
                            }
                            if (p.x > window.innerWidth) {
                                p.x = window.innerWidth;
                            }
                            if (p.y > window.innerHeight) {
                                p.y = window.innerHeight;
                            }
                            let newLeft = (winLeft + (p.x - startDragOff.x));
                            let newTop = (winTop + (p.y - startDragOff.y));
                            if (bordersType === BORDERSTYPES.MAGNETIC) {
                                if (newLeft < Window.MAGNETICSIZE) {
                                    newLeft = 0;
                                }
                                if (newTop < Window.MAGNETICSIZE) {
                                    newTop = 0;
                                }
                                if (newLeft + winWidth > parent.offsetWidth - Window.MAGNETICSIZE) {
                                    newLeft = parent.offsetWidth - winWidth;
                                }
                                if (newTop + winHeight > parent.offsetHeight - Window.MAGNETICSIZE) {
                                    newTop = parent.offsetHeight - winHeight;
                                }
                            } else if (bordersType === BORDERSTYPES.SNAP) {
                                if (form.windowState !== Window.WINDOWSTATES.SNAPED) {
                                    if (snapArea === SNAPAREAS.NONE) {
                                        if (p.x <= Window.SNAPAREADISTANCE) {
                                            form.createSnapArea(SNAPAREAS.LEFT);
                                        } else if (p.y <= Window.SNAPAREADISTANCE) {
                                            form.createSnapArea(SNAPAREAS.TOP);
                                        } else if (p.x >= parent.offsetWidth - Window.SNAPAREADISTANCE) {
                                            form.createSnapArea(SNAPAREAS.RIGHT);
                                        }
                                    } else if ((snapArea === SNAPAREAS.LEFT && p.x > Window.SNAPAREADISTANCE) ||
                                        (snapArea === SNAPAREAS.TOP && p.y > Window.SNAPAREADISTANCE) ||
                                        (snapArea === SNAPAREAS.RIGHT && p.x <
                                            parent.offsetWidth - Window.SNAPAREADISTANCE)) {
                                        form.snapArea = SNAPAREAS.NONE;
                                        form.destroySnapArea();
                                    }
                                } else {
                                    if (snapArea === SNAPAREAS.TOP) {
                                        newLeft = p.x - ~~(savedSizePosState.width / 2);
                                    } else if (snapArea === SNAPAREAS.LEFT) {
                                        newLeft = 0;
                                        if (p.x > newLeft + savedSizePosState.width) {
                                            newLeft = p.x - ~~(savedSizePosState.width / 2);
                                        }
                                    } else if (snapArea === SNAPAREAS.RIGHT) {
                                        if (p.x > newLeft + savedSizePosState.width) {
                                            newLeft = p.x - ~~(savedSizePosState.width / 2);
                                        }
                                    }
                                    form.restoreWindow();
                                }
                            }
                            form.moveTo(newLeft, newTop);
                            startDragOff.x = p.x;
                            startDragOff.y = p.y;
                        }
                    }
                    if (!Core.isHTMLRenderer) {
                        Core.canvas.needRedraw = true;
                    }
                }
            }
        }
        //#endregion mouseMove
        //#region addCSSClass
        addCSSClass() {
            return super.addCSSClass(this, []);
        }
        //#endregion addCSSClass
        //#region getChilds
        getChilds(childs) {
            //#region Variables déclaration
            let dataClass = null;
            let obj = null;
            let nodes = null;
            const XMLNODETYPES = Types.XMLNODETYPES;
            const isHtmlRenderer = Core.isHTMLRenderer;
            const priv = internal(this);
            //#endregion Variables déclaration
            if (isHtmlRenderer) {
                nodes = childs ? childs.childNodes : this.HTMLElement.childNodes;
            } else if (Core.isCanvasRenderer) {
                nodes = childs;
            }
            nodes.forEach(node => {
                if (node.nodeType === XMLNODETYPES.ELEMENT_NODE && isHtmlRenderer) {
                    dataClass = node.dataset.class;
                } else {
                    dataClass = node.className;
                }
                let dataName = node.name;
                if (!dataName || !dataName) {
                    dataName = String.EMPTY;
                }
                let properties = {};
                if (isHtmlRenderer) {
                    if (node.nodeType === XMLNODETYPES.ELEMENT_NODE) {
                        const props = node.querySelector(`[id='${node.id}']> properties:first-child`);
                        if (props) {
                            properties = JSON.parse(props.innerText);
                        }
                    }
                } else {
                    properties = node.properties;
                }
                if (properties) {
                    properties.inForm = false;
                } else {
                    properties = {
                        inForm: false
                    };
                }
                if (dataClass) {
                    if (dataClass !== "WindowTitle") {
                        obj = Core.classes.createComponent({
                            class: Core.classes[dataClass],
                            owner: this,
                            name: dataName,
                            props: properties,
                            withTpl: false,
                            internalId: node.id
                        });
                    }
                    switch (dataClass) {
                        case "WindowTitle":
                            priv.title = Core.isHTMLRenderer?node:properties.caption;
                            /*title.mouseDown = function () {
                                this.owner.mouseDown();
                            };
                            title.mouseMove = function () {
                                this.owner.mouseMove();
                            };
                            title.mouseUp = function () {
                                this.owner.mouseUp();
                            };
                            title.dblClick = this.dblClick;*/
                            //title.height = this.height;
                            //title.width = this.width;
                            //title.hitTest.all = false;
                            break;
                        case "WindowCloseButton":
                            priv.closeBtn = obj;
                            break;
                        case "WindowMinimizeButton":
                            priv.minimizeBtn = obj;
                            break;
                        case "WindowMaxRestoreButton":
                            priv.maxRestoreBtn = obj;
                            break;
                        case "WindowHelpButton":
                            priv.helpBtn = obj;
                            break;
                        case "WindowRollUpDownButton":
                            priv.rollUpDownBtn = obj;
                            break;
                        case "WindowStayOnOffButton":
                            priv.stayOnOffBtn = obj;
                            break;
                    }
                }
            });
        }
        //#endregion getChilds
        //#region destroy
        destroy() {
            super.destroy();
            internal(this).startDragOff.destroy();
        }
        //#endregion destroy
        //#region dblClick
        dblClick() {
            //#region Variables déclaration
            const form = this.form;
            const bcr = this.getBoundingClientRect();
            const mouse = Core.mouse;
            const document = mouse.document;
            //#endregion Variables déclaration
            if (mouse.button === Mouse.MOUSEBUTTONS.LEFT) {
                if (form.isBorderSingle || form.isBorderSizeable) {
                    if ((document.x > bcr.left) && (document.x < bcr.left + 20)) {
                        form.close();
                    } else {
                        form.toogleMaxRestore();
                    }
                }
            }
        }
        //#endregion dblClick
        //#region calcVisibleBtns
        calcVisibleBtns() {
            //#region Variables déclaration
            const buttons = ["close", "maxRestore", "minimize", "help", "rollUpDown", "stayOnOff"];
            let visbleBtns = 0;
            const priv = internal(this);
            //#endregion Variables déclaration
            buttons.forEach(btn => {
                btn = priv[`${btn}Btn`];
                if (btn.visible) {
                    visbleBtns++;
                }
            });
            if (Core.isHTMLRenderer) {
                this.form.HTMLElement.dataset.buttons = visbleBtns;
            }
            priv.visibleBtns = visbleBtns;
        }
        //#endregion calcVisibleBtns
        //#region loaded
        loaded() {
            super.loaded();
            this.calcVisibleBtns();
        }
        //#endregion loaded
        //#endregion
    }
    return WindowTitleBar;
    //#endregion Class WindowTitleBar
})();
//#endregion
//#region Class WindowContent
class WindowContent extends ThemedControl {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            //#region Public
            this.hitTest.mouseDown = true;
            this.hitTest.mouseWheel = true;
            this.stopEvent = false;
            //#endregion Public
        }
    }
    //#endregion
    //#region getters / setters
    //#endregion Getters / Setters
}
//#endregion
//#region BaseWindow
const BaseWindow = (() => {
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
    //#region Class BaseWindow
    class BaseWindow extends ThemedControl {
        //#region constructor
        constructor(owner, props) {
            //#region Variables déclaration
            const FORMPOSITIONS = Window.FORMPOSITIONS;
            const WINDOWSTATES = Window.WINDOWSTATES;
            const BORDERSTYLES = Window.BORDERSTYLES;
            const BORDERSTYPES = Window.BORDERSTYLES;
            const MODALRESULTS = Window.MODALRESULTS;
            const SHOWINGMODES = Window.SHOWINGMODES;
            const classes = Core.classes;
            //#endregion Variables déclaration
            if (owner) {
                super(owner, props);
                //#region Private
                const priv = internal(this);
                priv.resizeMode = {
                    leftEdge: false,
                    topEdge: false,
                    rightEdge: false,
                    bottomEdge: false
                };
                priv.savedSizePosState = {};
                priv.isModal = false;
                priv.creating = true;
                priv.layout = null;
                priv.titleBar = null;
                priv.content = null;
                priv.titleBarObj = {};
                priv.firstShow = true;
                priv.controlsToResize = [];
                priv.focusedControl = null;
                priv.hoveredControl = null;
                priv.capturedControl = null;
                priv.lastSelectedMenuItem = null;
                priv.popups = [];
                priv.toolBars = [];
                priv.statusBars = [];
                priv.isResizing = false;
                priv.snapArea = props.hasOwnProperty("snapArea") ? props.snapArea : Window.SNAPAREAS.NONE;
                priv.destroyOnHide = false;
                priv.controls = [];
                priv.isChildWindow = props.hasOwnProperty("parentHTML") ? (props.parentHTML !== document.body ? true : false) : false;
                priv.parentHTML = props.hasOwnProperty("parentHTML") ? props.parentHTML : null;
                priv.lastZIndex = -1;
                priv.animated = true;
                priv.keyPreview = false;
                priv.icon = "logo";
                priv.mainMenu = null;
                priv.activeControl = null;
                priv.canClose = true;
                priv.moveable = true;
                priv.stayOn = props.hasOwnProperty("stayOn")? props.stayOn : false;
                priv.enabledShadow = props.hasOwnProperty("enabledShadow") ? props.enabledShadow : true;
                //priv.minimizeAnimation = new RectAnimation(this, { inForm: false });
                priv.position = props.hasOwnProperty("position") ? props.position : FORMPOSITIONS.DEFAULT;
                priv.buttons = props.hasOwnProperty("buttons") ? props.buttons : null;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "position",
                    enum: FORMPOSITIONS,
                    variable: priv,
                    value: props.hasOwnProperty("formPosition") ? props.formPosition : FORMPOSITIONS.DESIGNED
                });
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "windowState",
                    enum: WINDOWSTATES,
                    setter: this._windowState,
                    variable: priv,
                    value: props.hasOwnProperty("windowState") ? props.windowState : WINDOWSTATES.NORMAL
                });
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "borderStyle",
                    enum: BORDERSTYLES,
                    setter: this._borderStyle,
                    variable: priv,
                    value: props.hasOwnProperty("borderStyle") ? props.borderStyle : BORDERSTYLES.SIZEABLE
                });
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "bordersType",
                    enum: BORDERSTYPES,
                    variable: priv,
                    value: props.hasOwnProperty("bordersType") ? props.bordersType : BORDERSTYPES.NONE
                });
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "modalResult",
                    enum: MODALRESULTS,
                    variable: priv,
                    value: MODALRESULTS.NONE
                });
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "showingMode",
                    enum: SHOWINGMODES,
                    variable: priv,
                    value: props.hasOwnProperty("showingMode") ? props.showingMode : SHOWINGMODES.NORMAL
                });
                //#endregion Private
                //#region Public
                const hitTest = this.hitTest;
                hitTest.mouseMove = true;
                hitTest.mouseDown = true;
                hitTest.mouseUp = true;
                //this.visible = false;
                this.app[this.constructor.name.toLowerCase()] = this;
                //#endregion Public
                //#region Events
                this.onActivate = new classes.NotifyEvent(this);
                this.onDeactivate = new classes.NotifyEvent(this);
                this.onHide = new classes.NotifyEvent(this);
                this.onShow = new classes.NotifyEvent(this);
                this.onCreate = new classes.NotifyEvent(this);
                this.onClose = new classes.NotifyEvent(this);
                this.onCloseQuery = new classes.NotifyEvent(this);
                this.onThemeChanged = new classes.NotifyEvent(this);
                //#endregion Events
                //if (!Core.isHTMLRenderer) {
                //    priv.minimizeAnimation.hideOnFinish = true;
                //    priv.minimizeAnimation.control = this;
                //    priv.minimizeAnimation.propertyName = "bounds";
                //    priv.minimizeAnimation.onProcess.addListener(this._onMinimizeProcess);
                //    priv.minimizeAnimation.onFinish.addListener(this._onMinimizeFinish);
                //}
            }
        }
        //#endregion constructor
        //#region getters / setters
        //#region savedSizePosState
        get savedSizePosState() {
            return internal(this).savedSizePosState;
        }
        //#endregion savedSizePosState
        //#region resizeMode
        get resizeMode() {
            return internal(this).resizeMode;
        }
        //#endregion resizeMode
        //#region isModal
        get isModal() {
            return internal(this).isModal;
        }
        //#endregion isModal
        //#region stayOn
        get stayOn() {
            return internal(this).stayOn;
        }
        set stayOn(newValue) {
            if (Tools.isBool(newValue)) {
                internal(this).stayOn = newValue;
            }
        }
        //#endregion stayOn
        //#region creating
        get creating() {
            return internal(this).creating;
        }
        //#endregion creating
        //#region focusedControl
        get focusedControl() {
            return internal(this).focusedControl;
        }
        set focusedControl(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            let focusedControl = priv.focusedControl;
            //#endregion Variables déclaration
            if (newValue) {
                if (!(newValue instanceof Core.classes.Component)) {
                    return;
                }
            }
            if (focusedControl !== newValue) {
                focusedControl = priv.focusedControl = newValue;
                if (newValue) {
                    focusedControl.setFocus();
                }
            }
        }
        //#endregion focusedControl
        //#region hoveredControl
        get hoveredControl() {
            return internal(this).hoveredControl;
        }
        set hoveredControl(object) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (object) {
                if (!(object instanceof Core.classes.Control)) {
                    return;
                }
            }
            if (priv.hoveredControl !== object) {
                priv.hoveredControl = object;
            }
        }
        //#endregion hoveredControl
        //#region capturedControl
        get capturedControl() {
            return internal(this).capturedControl;
        }
        set capturedControl(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue) {
                if (!(newValue instanceof Core.classes.Component)) {
                    return;
                }
            }
            if (priv.capturedControl !== newValue) {
                //this.releaseCapture();
                priv.capturedControl = newValue;
                if (newValue) {
                    this.app.activeWindow = newValue.form;
                }
            }
        }
        //#endregion capturedControl
        //#region lastSelectedMenuItem
        get lastSelectedMenuItem() {
            return internal(this).lastSelectedMenuItem;
        }
        //#endregion lastSelectedMenuItem
        //#region popups
        get popups() {
            return internal(this).popups;
        }
        //#endregion popups
        //#region toolBars
        get toolBars() {
            return internal(this).toolBars;
        }
        //#endregion toolBars
        //#region statusBars
        get statusBars() {
            return internal(this).statusBars;
        }
        //#endregion statusBars
        //#region isResizing
        get isResizing() {
            return internal(this).isResizing;
        }
        set isResizing(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.isResizing !== newValue) {
                    priv.isResizing = newValue;
                }
            }
        }
        //#endregion isResizing
        //#region snapArea
        get snapArea() {
            return internal(this).snapArea;
        }
        set snapArea(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (priv.snapArea !== newValue) {
                    priv.snapArea = newValue;
                }
            }
        }
        //#endregion snapArea
        //#region destroyOnHide
        get destroyOnHide() {
            return internal(this).destroyOnHide;
        }
        set destroyOnHide(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.destroyOnHide !== newValue) {
                    priv.destroyOnHide = newValue;
                }
            }
        }
        //#endregion destroyOnHide
        //#region controls
        get controls() {
            return internal(this).controls;
        }
        //#endregion controls
        //#region isChildWindow
        get isChildWindow() {
            return internal(this).isChildWindow;
        }
        //#endregion isChildWindow
        //#region parentHTML
        get parentHTML() {
            return internal(this).parentHTML;
        }
        //#endregion parentHTML
        //#region keyPreview
        get keyPreview() {
            return internal(this).keyPreview;
        }
        set keyPreview(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (newValue !== priv.keyPreview) {
                    priv.keyPreview = newValue;
                    this.propertyChanged("keyPreview");
                }
            }
        }
        //#endregion keyPreview
        //#region icon
        get icon() {
            return internal(this).icon;
        }
        set icon(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            let icon = internal(this).icon;
            const htmlElement = priv.titleBar;
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (icon !== newValue) {
                    htmlElement.classList.remove(icon);
                    icon = priv.icon = newValue;
                    if (newValue.contains("base64")) {

                    } else {
                        htmlElement.classList.add(icon);
                    }
                }
            }
        }
        //#endregion icon
        //#region mainMenu
        get mainMenu() {
            return internal(this).mainMenu;
        }
        set mainMenu(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Core.classes.MainMenu) {
                if (newValue !== priv.mainMenu) {
                    priv.mainMenu = newValue;
                    this.redraw();
                }
            }
        }
        //#endregion mainMenu
        //#region activeControl
        get activeControl() {
            return internal(this).activeControl;
        }
        //#endregion activeControl
        //#region canClose
        get canClose() {
            return internal(this).canClose;
        }
        set canClose(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            let canClose = priv.canClose;
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (canClose !== newValue) {
                    canClose = priv.canClose = newValue;
                }
                if (canClose) {
                    priv.destroyOnHide = canClose;
                    this._close();
                }
            }
        }
        //#endregion canClose
        //#region moveable
        get moveable() {
            return internal(this).moveable;
        }
        //#endregion moveable
        //#region isShowed
        get isShowed() {
            return internal(this).visible;
        }
        //#endregion isShowed
        //#region isNormal
        get isNormal() {
            return internal(this).windowState === Window.WINDOWSTATES.NORMAL;
        }
        //#endregion isNormal
        //#region isMinimized
        get isMinimized() {
            return internal(this).windowState === Window.WINDOWSTATES.MINIMIZED;
        }
        //#endregion isMinimized
        //#region isMaximized
        get isMaximized() {
            return internal(this).windowState === Window.WINDOWSTATES.MAXIMIZED;
        }
        //#endregion isMaximized
        //#region isRolledUp
        get isRolledUp() {
            return internal(this).windowState === Window.WINDOWSTATES.ROLLEDUP;
        }
        //#endregion isRolledUp
        //#region isBorderDialog
        get isBorderDialog() {
            return internal(this).borderStyle === Window.BORDERSTYLES.DIALOG;
        }
        //#endregion isBorderDialog
        //#region isBorderNone
        get isBorderNone() {
            return internal(this).borderStyle === Window.BORDERSTYLES.NONE;
        }
        //#endregion isBorderNone
        //#region isBorderSingle
        get isBorderSingle() {
            return internal(this).borderStyle === Window.BORDERSTYLES.SINGLE;
        }
        //#endregion isBorderSingle
        //#region isBorderSizeable
        get isBorderSizeable() {
            return internal(this).borderStyle === Window.BORDERSTYLES.SIZEABLE;
        }
        //#endregion isBorderSizeable
        //#region isPositionDefault
        get isPositionDefault() {
            return internal(this).position === Window.FORMPOSITIONS.DEFAULT;
        }
        //#endregion isPositionDefault
        //#region isPositionDesigned
        get isPositionDesigned() {
            return internal(this).position === Window.FORMPOSITIONS.DESIGNED;
        }
        //#endregion isPositionDesigned
        //#region isPositionMainFormCenter
        get isPositionMainFormCenter() {
            return internal(this).position === Window.FORMPOSITIONS.MAINFORMCENTER;
        }
        //#endregion isPositionMainFormCenter
        //#region isPositionScreenCenter
        get isPositionScreenCenter() {
            return internal(this).position === Window.FORMPOSITIONS.SCREENCENTER;
        }
        //#endregion isPositionScreenCenter
        //#region visibleButtons
        get visibleButtons() {
            return internal(this).titleBar.visibleButtons;
        }
        //#endregion visibleButtons
        //#region activeWindow
        get activeWindow() {
            return this === this.app.activeWindow;
        }
        //#endregion activeWindow
        //#region animated
        get animated() {
            return internal(this).animated;
        }
        set animated(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.animated !== newValue) {
                    priv.animated = newValue;
                }
            }
        }
        //#endregion animated
        //#region caption
        get caption() {
            return internal(this).titleBar.title;
        }
        set caption(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            let title = Core.isHTMLRenderer?priv.titleBar.title.innerText:priv.titleBar.title;
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (title !== newValue) {
                    title = newValue;
                    this.captionChanged();
                    //this.onCaptionChanged.invoke(priv.titleBar);
                    if (Core.isHTMLRenderer) {
                        title = newValue;
                    }
                }
            }
        }
        //#endregion caption
        //#region left
        get left() {
            return super.left;
        }
        set left(newValue) {
            if (!this.isMaximized && !this.isMinimized) {
                super.left = newValue;
            }
        }
        //#endregion left
        //#region top
        get top() {
            return super.top;
        }
        set top(newValue) {
            if (!this.isMaximized && !this.isMinimized) {
                super.top = newValue;
            }
        }
        //#endregion top
        //#region template
        get template() {
            //#region Variables déclaration
            let html = super.template;
            let a = html.split("{appName}");
            //#endregion Variables déclaration
            html = a.join(internal(this).app.name);
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
        }
        //#endregion template
        //#region visible
        get visible() {
            return super.visible;
        }
        set visible(newValue) {
            if (Tools.isBool(newValue)) {
                if (super.visible !== newValue) {
                    super.visible = newValue;
                    // à revoir
                    //if (!priv.visible) {
                    //    //priv.visible = false;
                    //    //Css.removeClass(this.HTMLElement,"isactive");
                    //    //this.HTMLElement.dataset.isactive = false;
                    //}
                }
            }
        }
        //#endregion visible
        //#region enabledShadow
        get enabledShadow() {
            return internal(this).enabledShadow;
        }
        set enabledShadow(newValue) {
            const priv = internal(this);
            if (Tools.isBool(newValue)) {
                if (priv.enabledShadow !== newValue) {
                    priv.enabledShadow = newValue;
                }
            }
        }
        //#endregion enabledShadow
        //#region _borderStyle
        _borderStyle(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            let borderStyle = priv.borderStyle;
            const isHtmlRenderer = Core.isHTMLRenderer;
            const themeName = this.app.themeManifest.themeName;
            const theme = Core.themes[themeName];
            const layout = priv.layout;
            const BORDERSTYLES = Window.BORDERSTYLES;
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, BORDERSTYLES)) {
                if (borderStyle !== newValue) {
                    if (isHtmlRenderer) {
                        htmlElement.classList.remove(borderStyle);
                    }
                    borderStyle = priv.borderStyle = newValue;
                    if (isHtmlRenderer) {
                        htmlElement.classList.add(borderStyle);
                    } else {
                        this.alignButtons();
                        if (this.isBorderNone) {
                            layout.margin.empty();
                        } else {
                            let layoutMargin = null;
                            if (theme.Window && theme.Window.WindowLayout && theme.Window.WindowLayout.margin) {
                                layoutMargin = theme.Window.WindowLayout.margin;
                            } else {
                                layoutMargin = Window.SIZEABLEBORDERSIZE;
                            }
                            if (Tools.isObject(layoutMargin)) {
                                layout.margin.setValues(layoutMargin.left, layoutMargin.top, layoutMargin.right, layoutMargin.bottom);
                            } else if (Tools.isObject(layoutMargin)) {
                                layout.margin.setValues(layoutMargin, layoutMargin, layoutMargin, layoutMargin);
                            }
                        }
                        this.realignChilds();
                        Core.canvas.needRedraw = true;
                    }
                }
            }
        }
        //#endregion _borderStyle
        //#region setActive
        setActive() {
            //#region Variables déclaration
            const priv = internal(this);
            let activeWindow = this.app.activeWindow;
            const app = this.app;
            const isHtmlRenderer = Core.isHTMLRenderer;
            const lastActiveWindow = app.lastActiveWindow;
            const htmlElement = activeWindow.HTMLElement;
            //#endregion Variables déclaration
            if (activeWindow !== this) {
                if (activeWindow) {
                    activeWindow.releaseCapture();
                    if (activeWindow.focusedControl) {
                        activeWindow.focusedControl.killFocus();
                    }
                    activeWindow.onDeactivate.invoke();
                    if (isHtmlRenderer) {
                        htmlElement.classList.add("inactive");
                    }
                    if (activeWindow) {
                        if (!priv.isChildWindow && this !== app.mainWindow) {
                            lastActiveWindow.push(this.app.activeWindow);
                        } else {
                            lastActiveWindow.clear();
                        }
                    }
                }
            }
            window.activeWindow = activeWindow = app.activeWindow = this;
            if (isHtmlRenderer) {
                htmlElement.classList.remove("inactive");
            }
            this.onActivate.invoke();
        }
        //#endregion setActive
        //#region setFocused
        setFocused(value) {
            //#region Variables déclaration
            const priv = internal(this);
            let focusedControl = priv.focusedControl;
            //#endregion Variables déclaration
            if (value) {
                if (!(value instanceof Core.classes.Control)) {
                    return;
                }
            }
            if (focusedControl !== value) {
                if (focusedControl) {
                    focusedControl.killFocus();
                }
                focusedControl = priv.focusedControl = value;
                if (focusedControl) {
                    focusedControl.enterFocus();
                }
            }
        }
        //#endregion setFocused
        //#region setTitleBar
        setTitleBar() {
            //this._titleBar.visible=false;
            //this._titleBarObj.mouseDown=this._titleBar.mouseDown;
            //this._titleBarObj.mouseUp=this._titleBar.mouseUp;
            //this._titleBarObj.mouseMove=this._titleBar.mouseMove;
            //this._titleBarObj.hitTest.mouseDown=false;
            //this._titleBarObj.hitTest.mouseMove=false;
            //this._titleBarObj.hitTest.mouseUp=false;
            //this._titleBarObj.hitTest.mouseWheel=false;
            //if (this._titleBarObj._startDragOff===null) this._titleBarObj._startDragOff=new Core.classes.Point();
        }
        //#endregion setTitleBar
        //#region setTitleBtn
        setTitleBtn(tab) {
            //#region Variables déclaration
            const priv = internal(this);
            const titleBar = priv.titleBar;
            const TITLEBUTTONS = Window.TITLEBUTTONS;
            const allBtns = [TITLEBUTTONS.MINIMIZE, TITLEBUTTONS.MAXRESTORE, TITLEBUTTONS.HELP, TITLEBUTTONS.ROLLUPDOWN, TITLEBUTTONS.STAYONOFF];
            //#endregion Variables déclaration
            if (!tab || tab.length === 0) {
                tab = [TITLEBUTTONS.MINIMIZE, TITLEBUTTONS.MAXRESTORE];
            }
            allBtns.forEach(t => {
                titleBar[`${t}Btn`].visible = false;
            });
            tab.forEach(t => {
                titleBar[`${t}Btn`].visible = true;
            });
            titleBar[`${TITLEBUTTONS.CLOSE}Btn`].visible = true;
        }
        //#endregion setTitleBtn
        //#region _windowState
        _windowState(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const WINDOWSTATES = Window.WINDOWSTATES;
            const windowState = priv.windowState;
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, WINDOWSTATES)) {
                if (windowState !== newValue) {
                    const lastWindowState = windowState;
                    switch (newValue) {
                        case WINDOWSTATES.NORMAL:
                            switch (lastWindowState) {
                                case WINDOWSTATES.MINIMIZED:
                                case WINDOWSTATES.MAXIMIZED:
                                    this.restore();
                                    break;
                                case WINDOWSTATES.ROLLEDUP:
                                    this.rollDown();
                                    break;
                                case WINDOWSTATES.SNAPED:
                                    this.restoreWindow();
                                    break;
                            }
                            break;
                        case WINDOWSTATES.MINIMIZED:
                            this.minimize();
                            break;
                        case WINDOWSTATES.MAXIMIZED:
                            this.maximize();
                            break;
                        case WINDOWSTATES.ROLLEDUP:
                            this.rollUp();
                            break;
                        case WINDOWSTATES.SNAPED:
                            this.applySnap();
                            break;
                    }
                    this.windowState = newValue;
                }
            }
        }
        //#endregion _windowState
        //#region layoutMargin
        layoutMargin(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const layout = priv.layout;
            //#endregion Variables déclaration
            if (Array.isArray(newValue) && newValue.length === 3) {
                layout.margin.setValues(newValue[0], newValue[1], newValue[2], newValue[3]);
            } else if (Tools.isNumber(newValue)) {
                layout.margin.setValues(newValue, newValue, newValue, newValue);
            }
        }
        //#endregion layoutMargin
        //#region setTitleBarProp
        setTitleBarProp(props) {
            //#region Variables déclaration
            const priv = internal(this);
            const titleBar = priv.titleBar;
            const keys = Object.keys(props);
            //#endregion Variables déclaration
            titleBar.beginUpdate();
            keys.forEach(key => {
                titleBar[key] = props[key];
            });
            titleBar.endUpdate();
        }
        //#endregion setTitleBarProp
        //#region setLayoutProp
        setLayoutProp(props) {
            //#region Variables déclaration
            const priv = internal(this);
            const layout = priv.titleBar;
            const keys = Object.keys(props);
            //#endregion Variables déclaration
            layout.beginUpdate();
            keys.forEach(key => {
                layout[key] = props[key];
            });
            layout.endUpdate();
        }
        //#endregion setLayoutProp
        //#region allControls
        get allControls() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            return [priv.titleBar, ...priv.titleBar.allControls, priv.content, ...priv.controls];
        }
        //#endregion allControls
        //#endregion
        //#region Methods
        //#region captionChanged
        captionChanged() {
            internal(this).titleBar.onCaptionChanged.invoke();
        }
        //#endregion captionChanged
        //#region addCaptionChangedListener
        addCaptionChangedListener(func) {
            //#region Variables déclaration
            const onCaptionChanged = internal(this).titleBar.onCaptionChanged;
            //#endregion Variables déclaration
            onCaptionChanged.clearListeners();
            onCaptionChanged.addListener(func);
        }
        //#endregion addCaptionChangedListener
        //#region alignButtons
        alignButtons() {
            //#region Variables déclaration
            const priv = internal(this);
            const titleBar = priv.titleBar;
            const buttons = ["close", "maxRestore", "minimize", "help", "rollUpDown", "stayOnOff"];
            const btns = Core.themes[this.themeName].WindowButton;
            let invisbleBtns = 0;
            //#endregion Variables déclaration
            buttons.forEach((btn, i) => {
                let data = btns;
                let offset = btns.offset;
                const button = titleBar[`${btn}Btn`];
                if (btns[btn]) {
                    data = btns[btn];
                    if (data.offset !== undefined) {
                        offset = data.offset;
                    }
                    if (data.hasOwnProperty("visible")) {
                        button.visible = data.visible;
                    }
                }
                if (!button.visible) {
                    invisbleBtns++;
                }
                button.width = data.width?data.width:btns.width;
                button.height = data.height?data.height:btns.height;
                button.left = data.left?data.left:btns.left;
                button.right = data.right?data.right:btns.right;
                if (i > 0) {
                    if (data.left === null) {
                        button.right += (i - invisbleBtns) * offset;
                    } else {
                        button.left += (i - invisbleBtns) * offset;
                    }
                }
                button.top = data.top?data.top:btns.top;
            });
            if (this.isBorderDialog) {
                buttons.forEach((btn, i) => {
                    if (i > 0) {
                        btn = titleBar[`${btn}Btn`];
                        /*if (i !== 3) {
                            btn.visible = -100;
                        } else {*/
                        btn.left = titleBar[`${buttons[1]}Btn`].left;
                        btn.right = titleBar[`${buttons[1]}Btn`].right;
                        //}
                    }
                });
                //} else {
                //    buttons.forEach((btn, i) => {
                //        if (i > 0) {
                //            btn = titleBar[`${btn}Btn`];
                //            btn.top = titleBar.closeBtn.top;
                //        }
                //    });
            }
            titleBar.visible = !this.isBorderNone;
        }
        //#endregion alignButtons
        //#region close
        close() {
            //#region Variables déclaration
            const form = this.form;
            const onCloseQuery = form.onCloseQuery;
            //#endregion Variables déclaration
            onCloseQuery.hasListener?onCloseQuery.invoke():form._close();
        }
        //#endregion close
        //#region _close
        _close() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (!priv.canClose) {
                return;
            }
            Tools.removeResizeListeners(this);
            this.hide();
        }
        //#endregion _close
        //#region hide
        hide() {
            //#region Variables déclaration
            const htmlElement = this.HTMLElement;
            const app = this.app;
            const lastActiveWindow = app.lastActiveWindow;
            const priv = internal(this);
            const isHtmlRenderer = Core.isHTMLRenderer;
            //#endregion Variables déclaration
            if (priv.isModal && isHtmlRenderer) {
                lastActiveWindow.last.HTMLElement.removeChild(lastHtmlElement.lastElementChild);
            }
            this.onHide.invoke();
            priv.isModal = false;
            if (isHtmlRenderer) {
                htmlElement.classList.remove("bounceIn");
                htmlElement.classList.add("bounceOut");
            }
            this.stopResize();
            if (isHtmlRenderer) {
                if (htmlElement.classList.contains("animated")) {
                    Events.bind(htmlElement, Events.whichAnimationEvent(), this.anitmationEndOnHide);
                }
                else {
                    this.visible = false;
                }
            } else {
                this.visible = false;
                Core.canvas.needRedraw = true;
            }
            if (lastActiveWindow.length > 0) {
                app.activeWindow = null;
                lastActiveWindow.last.setActive();
                lastActiveWindow.pop();
            }
        }
        //#endregion hide
        //#region minimize
        minimize() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const htmlElementStyle = this.HTMLElementStyle;
            const PX = Types.CSSUNITS.PX;
            const titleBar = priv.titleBar;
            const WINDOWSTATES = Window.WINDOWSTATES;
            const savedSizePosState = priv.savedSizePosState;
            const isHtmlRenderer = Core.isHTMLRenderer;
            const themeName = this.app.themeManifest.themeName;
            let minWinHeight = Window.MINHEIGHT;
            let minWinWidth = Window.MINWIDTH;
            //#endregion Variables déclaration
            if (!this.isRolledUp) {
                if (!this.isMaximized) {
                    savedSizePosState.left = isHtmlRenderer ? htmlElement.offsetLeft : this.left;
                    savedSizePosState.top = isHtmlRenderer ? htmlElement.offsetTop : this.top;
                    savedSizePosState.width = isHtmlRenderer ? htmlElement.offsetWidth : this.width;
                    savedSizePosState.height = isHtmlRenderer ? htmlElement.offsetHeight : this.height;
                } else {
                    savedSizePosState.oldState = WINDOWSTATES.MAXIMIZED;
                }
                savedSizePosState.state = WINDOWSTATES.MINIMIZED;
                if (isHtmlRenderer) {
                    htmlElement.classList.add(WINDOWSTATES.MINIMIZED);
                    htmlElement.classList.remove(WINDOWSTATES.MAXIMIZED);
                    htmlElementStyle.left = 0;
                    htmlElementStyle.top = `${document.body.offsetHeight - minWinHeight}${PX}`;
                    htmlElementStyle.width = `${Window.MINWIDTH}${PX}`;
                    htmlElementStyle.height = `${minWinHeight}${PX}`;
                    priv.windowState = WINDOWSTATES.MINIMIZED;
                } else {
                    const theme = Core.themes[themeName];
                    if (theme && theme.Window) {
                        if (theme.Window.minHeight) {
                            minWinHeight = theme.Window.minHeight;
                        }
                        if (theme.Window.minWidth) {
                            minWinWidth = theme.Window.MINWIDTH;
                        }
                    }
                    priv.windowState = WINDOWSTATES.NONE;
                    //const minimizeAnimation = priv.minimizeAnimation;
                    //minimizeAnimation.startFromCurrent = false;
                    //minimizeAnimation.inverse = false;
                    //minimizeAnimation.stopValue.setValues(0, document.body.offsetHeight - minWinHeight, minWinWidth, document.body.offsetHeight);
                    //if (priv.windowState === WINDOWSTATES.MAXIMIZED) {
                    //    minimizeAnimation.startValue.setValues(this.left, this.top, this.left + this.width, this.top + this.height);
                    //} else {
                    //    minimizeAnimation.startValue.setValues(savedSizePosState.left, savedSizePosState.top, savedSizePosState.left + savedSizePosState.width, savedSizePosState.top + savedSizePosState.height);
                    //}
                    //minimizeAnimation.start();
                }
                priv.enabledShadow = false;
                titleBar.maxRestoreBtn.enabled = false;
                titleBar.helpBtn.enabled = false;
                titleBar.rollUpDownBtn.enabled = false;
                titleBar.stayOnOffBtn.enabled = false;
                this.stopResize();
            }
        }
        //#endregion minimize
        //#region _onMinimizeProcess
        _onMinimizeProcess() {
            //#region Variables déclaration
            const form = this.control;
            const rect = this.current;
            //#endregion Variables déclaration
            form.beginUpdate();
            form.left = ~~rect.left;
            form.top = ~~rect.top;
            form.width = ~~rect.width;
            form.height = ~~rect.height;
            form.endUpdate();
            Core.canvas.needRedraw = true;
            //console.log(Convert.rect2Str(rect));
        }
        //#endregion _onMinimizeProcess
        //#region _onMinimizeFinish
        _onMinimizeFinish() {
            //#region Variables déclaration
            const form = this.jsObj ? this.jsObj : this.control;
            const savedSizePosState = form.savedSizePosState;
            const priv = internal(form);
            //#endregion Variables déclaration
            priv.windowState = form.savedSizePosState.state;
            if (this.isMaximized) {
                if (form.control) {
                    form.startValue.setValues(form.left, form.top, form.left + form.width, form.top + form.height);
                    form.startValue.setValues(savedSizePosState.left, savedSizePosState.top, savedSizePosState.left + savedSizePosState.width,
                        savedSizePosState.top + savedSizePosState.height);
                }
            }
            if (Core.isHTMLRenderer) {
                const htmlElementStyle = form.HTMLElementStyle;
                htmlElementStyle.transitionProperty = String.EMPTY;
                htmlElementStyle.transitionDuration = String.EMPTY;
                Events.unBind(form.HTMLElement, "transitionend", form._onMinimizeFinish);
            } else {
                Core.canvas.needRedraw = true;
            }
        }
        //#endregion _onMinimizeFinish
        //#region toogleMinRestore
        toogleMinRestore() {
            //#region Variables déclaration
            const priv = internal(this);
            const minimizeBtn = priv.titleBar.minimizeBtn;
            const isHtmlRenderer = Core.isHTMLRenderer;
            //#endregion Variables déclaration
            if (!this.isMinimized) {
                minimizeBtn.toolTip = "Rétablir précédent"; // à voir pour mettre en locale
                this.minimize();
                if (isHtmlRenderer) {
                    //Css.addClass(minimizeBtn.HTMLElement, "isrestore");
                }
            } else {
                minimizeBtn.toolTip = "Réduire"; // à voir pour mettre en locale
                this.restore();
                if (isHtmlRenderer) {
                    ///Css.removeClass(minimizeBtn.HTMLElement, "isrestore");
                }
            }
        }
        //#endregion toogleMinRestore
        //#region maximize
        maximize() {
            //#region Variables déclaration
            const priv = internal(this);
            const WINDOWSTATES = Window.WINDOWSTATES;
            const htmlElement = this.HTMLElement;
            const htmlElementStyle = this.HTMLElementStyle;
            const titleBar = priv.titleBar;
            const savedSizePosState = priv.savedSizePosState;
            const isHtmlRenderer = Core.isHTMLRenderer;
            const PX = Types.CSSUNITS.PX;
            //#endregion Variables déclaration
            if (!this.isRolledUp) {
                if (!this.isMinimized && priv.snapArea === Window.SNAPAREAS.NONE) {
                    savedSizePosState.left = isHtmlRenderer ? htmlElement.offsetLeft : this.left;
                    savedSizePosState.top = isHtmlRenderer ? htmlElement.offsetTop : this.top;
                    savedSizePosState.width = isHtmlRenderer ? htmlElement.offsetWidth : this.width;
                    savedSizePosState.height = isHtmlRenderer ? htmlElement.offsetHeight : this.height;
                }
                savedSizePosState.state = WINDOWSTATES.MAXIMIZED;
                if (Core.isHTMLRenderer) {
                    htmlElement.classList.add(WINDOWSTATES.MAXIMIZED);
                    htmlElement.classList.remove(WINDOWSTATES.MINIMIZED);
                    htmlElementStyle.left = 0;
                    htmlElementStyle.top = 0;
                    htmlElementStyle.width = `${document.body.offsetWidth}${PX}`;
                    htmlElementStyle.height = `${document.body.offsetHeight}${PX}`;
                    priv.windowState = WINDOWSTATES.MAXIMIZED;
                } else {
                    //const minimizeAnimation = priv.minimizeAnimation;
                    //minimizeAnimation.startFromCurrent = false;
                    //minimizeAnimation.inverse = false;
                    //minimizeAnimation.stopValue.setValues(0, 0, document.body.offsetWidth, document.body.offsetHeight);
                    //if (priv.windowState === WINDOWSTATES.MINIMIZED) {
                    //    minimizeAnimation.startValue.setValues(this.left, this.top, this.left + this.width, this.top + this.height);
                    //} else {
                    //    minimizeAnimation.startValue.setValues(savedSizePosState.left, savedSizePosState.top, savedSizePosState.left + savedSizePosState.width, savedSizePosState.top + savedSizePosState.height);
                    //}
                    //minimizeAnimation.start();
                    priv.windowState = WINDOWSTATES.NONE;
                }
                priv.enabledShadow = false;
                // on désactive les autres boutons
                titleBar.maxRestoreBtn.enabled = true;
                //titleBar.helpBtn.enabled = false;
                titleBar.rollUpDownBtn.enabled = false;
                titleBar.stayOnOffBtn.enabled = false;
                this.stopResize();
            }
        }
        //#endregion maximize
        //#region toogleMaxRestore
        toogleMaxRestore() {
            //#region Variables déclaration
            const priv = internal(this);
            const maxRestoreBtn = priv.titleBar.maxRestoreBtn;
            const isHtmlRenderer = Core.isHTMLRenderer;
            const WINDOWSTATES = Window.WINDOWSTATES;
            //#endregion Variables déclaration
            if (!this.isMaximized) {
                maxRestoreBtn.toolTip = "Rétablir précédent"; // à voir pour mettre en locale
                if (priv.windowState === WINDOWSTATES.SNAPED && priv.snapArea === Window.SNAPAREAS.TOP) {
                    this.restoreWindow();
                } else {
                    this.maximize();
                }
                if (isHtmlRenderer) {
                    maxRestoreBtn.HTMLElement.classList.add("isrestore");
                }
            } else {
                maxRestoreBtn.toolTip = "Agrandir"; // à voir pour mettre en locale
                this.restore();
                if (isHtmlRenderer) {
                    maxRestoreBtn.HTMLElement.classList.remove("isrestore");
                }
            }
        }
        //#endregion toogleMaxRestore
        //#region restore
        restore() {
            //#region Variables déclaration
            const priv = internal(this);
            const titleBar = priv.titleBar;
            const savedSizePosState = priv.savedSizePosState;
            const WINDOWSTATES = Window.WINDOWSTATES;
            const PX = Types.CSSUNITS.PX;
            if (savedSizePosState.oldState && savedSizePosState.oldState === WINDOWSTATES.MAXIMIZED) {
                delete priv.savedSizePosState.oldState;
                this.toogleMaxRestore();
                return;
            }
            //#endregion Variables déclaration
            if (Core.isHTMLRenderer) {
                const htmlElementStyle = this.HTMLElementStyle;
                htmlElementStyle.transitionProperty = "left, width, top, height";
                htmlElementStyle.transitionDuration = "0.2s";
                Events.bind(this.HTMLElement, "transitionend", this._onMinimizeFinish);
                if ([WINDOWSTATES.MAXIMIZED, WINDOWSTATES.MINIMIZED].indexOf(priv.windowState) > -1) {
                    htmlElementStyle.left = `${savedSizePosState.left}${PX}`;
                    htmlElementStyle.top = `${savedSizePosState.top}${PX}`;
                    htmlElementStyle.width = `${savedSizePosState.width}${PX}`;
                    htmlElementStyle.height = `${savedSizePosState.height}${PX}`;
                    htmlElementStyle.right = "auto";
                    htmlElementStyle.bottom = "auto";
                    priv.windowState = WINDOWSTATES.NORMAL;
                }
                this.HTMLElement.classList.remove(WINDOWSTATES.MAXIMIZED, WINDOWSTATES.MINIMIZED);
            } else {
                priv.enabledShadow = true;
                priv.windowState = WINDOWSTATES.NONE;
                //const minimizeAnimation = priv.minimizeAnimation;
                //minimizeAnimation.startFromCurrent = false;
                //minimizeAnimation.startValue.setValues(this.left, this.top, this.left + this.width, this.top + this.height);
                //minimizeAnimation.stopValue.setValues(savedSizePosState.left, savedSizePosState.top, savedSizePosState.left + savedSizePosState.width, savedSizePosState.top + savedSizePosState.height);
                //minimizeAnimation.start();
            }
            savedSizePosState.state = WINDOWSTATES.NORMAL;
            titleBar.maxRestoreBtn.enabled = true;
            titleBar.helpBtn.enabled = true;
            titleBar.rollUpDownBtn.enabled = true;
            titleBar.stayOnOffBtn.enabled = true;
        }
        //#endregion restore
        //#region maximizeRestore
        maximizeRestore() {
            //#region Variables déclaration
            const form = this.form;
            //#endregion Variables déclaration
            if (form.isMaximized) {
                form.restore(this);
            } else {
                form.maximize(this);
            }
        }
        //#endregion maximizeRestore
        //#region showHelp
        showHelp() {
            //let form=this.form;
        }
        //#endregion showHelp
        //#region toogleRollUpDown
        toogleRollUpDown() {
            if (!this.isRolledUp) {
                this.rollUp();
            } else {
                this.rollDown();
            }
        }
        //#endregion toogleRollUpDown
        //#region rollUp
        rollUp() {
            //#region Variables déclaration
            const priv = internal(this);
            const titleBar = priv.titleBar;
            const maxRestoreBtn = titleBar.maxRestoreBtn;
            const minimizeBtn = titleBar.minimizeBtn;
            const rollUpDownBtn = titleBar.rollUpDownBtn;
            const isHtmlRenderer = Core.isHTMLRenderer;
            const savedSizePosState = priv.savedSizePosState;
            let minWinHeight = Window.MINHEIGHT;
            const theme = Core.themes[this.app.themeManifest.themeName];
            //#endregion Variables déclaration
            if (this.isBorderSizeable || this.isBorderSingle || titleBar.rollUpDownBtn.visible) {
                if (isHtmlRenderer) {
                    savedSizePosState.height = this.HTMLElement.offsetHeight;
                    this.HTMLElement.classList.add("rolledUp");
                } else {
                    savedSizePosState.height = this.height;
                    if (theme && theme.Window && theme.Window.minHeight) {
                        minWinHeight = theme.Window.minHeight;
                    }
                    this.height = minWinHeight;
                }
                if (maxRestoreBtn.visible) {
                    maxRestoreBtn.enabled = false;
                }
                if (minimizeBtn.visible) {
                    minimizeBtn.enabled = false;
                }
                priv.content.visible = false;
                priv.windowState = Window.WINDOWSTATES.ROLLEDUP;
                rollUpDownBtn.isRolledUp = true;
                if (isHtmlRenderer) {
                    rollUpDownBtn.HTMLElement.classList.add("isup");
                } else {
                    Core.canvas.needRedraw = true;
                }
                this.stopResize();
            }
        }
        //#endregion rollUp
        //#region rollDown
        rollDown() {
            //#region Variables déclaration
            const priv = internal(this);
            const titleBar = priv.titleBar;
            const maxRestoreBtn = titleBar.maxRestoreBtn;
            const minimizeBtn = titleBar.minimizeBtn;
            const rollUpDownBtn = titleBar.rollUpDownBtn;
            const isHtmlRenderer = Core.isHTMLRenderer;
            const savedSizePosState = priv.savedSizePosState;
            //#endregion Variables déclaration
            if (this.isRolledUp) {
                if (isHtmlRenderer) {
                    this.HTMLElement.classList.remove("rolledUp");
                } else {
                    this.height = savedSizePosState.height;
                }
                priv.windowState = Window.WINDOWSTATES.NORMAL;
                if (maxRestoreBtn.visible) {
                    maxRestoreBtn.enabled = true;
                }
                if (minimizeBtn.visible) {
                    minimizeBtn.enabled = true;
                }
                priv.content.visible = true;
                rollUpDownBtn.isRolledUp = false;
                if (isHtmlRenderer) {
                    rollUpDownBtn.HTMLElement.classList.remove("isup");
                } else {
                    this.realignChilds();
                    Core.canvas.needRedraw = true;
                }
            }
        }
        //#endregion rollDown
        //#region toggleStay
        toggleStay() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (!priv.stayOn) {
                this.stayOnTop();
            } else {
                this.stayNormal();
            }
        }
        //#endregion toggleStay
        //#region stayOnTop
        stayOnTop() {
            //#region Variables déclaration
            const priv = internal(this);
            const titleBar = priv.titleBar;
            const stayOnOffBtn = titleBar.stayOnOffBtn;
            //#endregion Variables déclaration
            if (this.isBorderSizeable || this.isBorderSingle || titleBar.stayOnOffBtn.visible) {
                if (Core.isHTMLRenderer) {
                    this.HTMLElementStyle.zIndex = Window.STAYONTOP;
                }
                if (Core.isHTMLRenderer) {
                    stayOnOffBtn.HTMLElement.classList.add("isstayon");
                }
                stayOnOffBtn.isStayOn = priv.stayOn = true;
                this.stopResize();
            }
        }
        //#endregion stayOnTop
        //#region stayNormal
        stayNormal() {
            //#region Variables déclaration
            const priv = internal(this);
            const titleBar = priv.titleBar;
            const stayOnOffBtn = titleBar.stayOnOffBtn;
            //#endregion Variables déclaration
            if (this.isBorderSizeable || this.isBorderSingle || titleBar.stayOnOffBtn.visible) {
                stayOnOffBtn.isStayOn = priv.stayOn = false;
                stayOnOffBtn.toolTip = "Epingler au dessus"; // à voir pour mettre en locale
                if (Core.isHTMLRenderer) {
                    stayOnOffBtn.HTMLElement.classList.remove("isstayon");
                }
                if (Core.isHTMLRenderer) {
                    this.HTMLElementStyle.zIndex = priv.lastZIndex;
                }
            }
        }
        //#endregion stayNormal
        //#region showSystemMenu
        showSystemMenu() {
            //let form=this.form;
            alert('Showing system menu');
            //form.sysMenu.popup();
        }
        //#endregion showSystemMenu
        //#region beforeShow
        beforeShow() {
            //#region Variables declaration
            const priv = internal(this);
            const isHtmlRenderer = Core.isHTMLRenderer;
            //#endregion Variables declaration
            //this.checkBorderStyle();
            if (priv.firstShow) {
                if (isHtmlRenderer) {
                    this.HTMLResize();
                }
                priv.firstShow = false;
                if (this.isMaximized) {
                    priv.windowState = Window.WINDOWSTATES.NORMAL;
                    this.toogleMaxRestore();
                }
            }
            switch (priv.position) {
                case Window.FORMPOSITIONS.SCREENCENTER:
                    this.center();
            }
            //this.HTMLElementStyle.zIndex=~~(Core.apps.activeApplication.activeWindow.HTMLElementStyle.zIndex)+1;
            if (isHtmlRenderer) {
                this.HTMLElementStyle.zIndex = Core.windowZIndex;
            }
            priv.lastZIndex = Core.windowZIndex;
        }
        //#endregion beforeShow
        //#region show
        show() {
            //this.onBeforeShow.invoke();
            this.beforeShow();
            this._show();
            this.onShow.invoke();
            if (!Core.isHTMLRenderer) {
                Core.canvas.needRedraw = true;
            }
        }
        //#endregion show
        //#region _show
        _show() {
            //#region Variables déclaration
            const htmlElement = this.HTMLElement;
            const priv = internal(this);
            //#endregion Variables déclaration
            this.visible = true;
            this.setActive();
            //if (this.controlsToResize.length > 0) {
            priv.controlsToResize.forEach(ctrl => {
                ctrl.addResizeListener();
            });
            priv.controlsToResize.length = 0;
            //}
            if (priv.animated && Core.isHTMLRenderer) {
                htmlElement.classList.add("animated","bounceIn");
                Events.bind(htmlElement, Events.whichAnimationEvent(), this.anitmationEndOnShow);
                const defaultBtn = htmlElement.querySelector(".isDefault");
                if (defaultBtn && !priv.focusedControl) {
                    defaultBtn.jsObj.setFocus();
                }
            }
        }
        //#endregion _show
        //#region anitmationEndOnShow
        anitmationEndOnShow() {
            Events.unBind(this, Events.whichAnimationEvent(), this.jsObj.anitmationEndOnShow);
            setTimeout(() => {
                Core.apps.activeApplication.activeWindow.HTMLElement.classList.remove("bounceIn","hidden");
            }, 0);
        }
        //#endregion anitmationEndOnShow
        //#region anitmationEndOnHide
        anitmationEndOnHide() {
            //#region Variables déclaration
            const jsObj = this.jsObj;
            //#endregion Variables déclaration
            if (Core.isHTMLRenderer) {
                Events.unBind(this, Events.whichAnimationEvent(), jsObj.anitmationEndOnHide);
                this.classList.remove("bounceOut","animated","inactive");
            }
            jsObj.visible = false;
            //this.dataset.isactive = false;
            jsObj.onClose.invoke();
            if (jsObj.app.lastActiveWindow.length === 0) {
                internal(jsObj).destroyOnHide = true;
            }
            if (jsObj.destroyOnHide) {
                jsObj.destroy();
            }
            //let nodes=document.querySelectorAll(".Window.isactive");
            //Css.removeClass(nodes.last(),"isactive");
            //nodes[nodes.length-1].jsObj.removeToHTML();
            //if (nodes.last()._destroyOnHide) nodes.last().destroy();
        }
        //#endregion anitmationEndOnHide
        //#region showModal
        showModal() {
            //#region Variables déclaration
            let glass = null;
            const app = this.app;
            let activeWindow = app.activeWindow;
            const priv = internal(this);
            const isHtmlRenderer = Core.isHTMLRenderer;
            //#endregion Variables déclaration
            if (isHtmlRenderer) {
                glass = document.createElement(Types.HTMLELEMENTS.DIV);
                glass.classList.add("noEvents");
                glass.jsObj = this;
            }
            priv.isModal = true;
            priv.modalResult = Window.MODALRESULTS.NONE;
            if (!activeWindow.isChildWindow) {
                if (isHtmlRenderer) {
                    activeWindow.HTMLElement.appendChild(glass);
                }
            } else {
                if (isHtmlRenderer) {
                    app.mainWindow.HTMLElement.appendChild(glass);
                }
                activeWindow = app.mainWindow;
            }
            this.show();
        }
        //#endregion showModal
        //#region releaseCapture
        releaseCapture() {
            //#region Variables déclaration
            const capturedControl = internal(this).capturedControl;
            //#endregion Variables déclaration
            if (capturedControl !== this) {
                if (capturedControl) {
                    if (capturedControl instanceof Core.classes.Control) {
                        capturedControl.releaseCapture();
                    }
                }
            }
        }
        //#endregion releaseCapture
        //#region HTMLResize
        HTMLResize() {
            //#region Variables déclaration
            const priv = internal(this);
            const PX = Types.CSSUNITS.PX;
            const htmlElementStyle = this.HTMLElementStyle;
            const width = this.width;
            const height = this.height;
            //#endregion Variables déclaration
            if (!this.loading && !priv.creating) {
                //this.resizeContent();
                if (priv.firstShow) {
                }
                priv.firstShow = false;
            }
            const childs = Core.looper.listeners.filter(e => {
                return e.hasResizeEvent;
            });
            childs.forEach(child => {
                child.resized();
            });
            htmlElementStyle.width = `${width}${PX}`;
            htmlElementStyle.height = `${height}${PX}`;
            if (width < Window.MINWIDTH) {
                htmlElementStyle.width = `${Window.INWIDTH}${PX}`;
            }
            if (height < Window.MINHEIGHT) {
                htmlElementStyle.height = `${Window.MINHEIGHT}${PX}`;
            }
            this.moveTo(this.left, this.top);
        }
        //#endregion HTMLResize
        //#region touchToMouse
        touchToMouse(touchEventArg) {
            //if (touchEventArg.touches.length > 1) return;
            //let touch=touchEventArg.changedTouches[0],type="",simulatedEvent;
            //switch (touchEventArg.type) {
            //  case Core.types.toucheEvents.START:
            //    type=Core.types.mouseEvents.DOWN.toLowerCase();
            //    break;
            //  case Core.types.toucheEvents.MOVE:
            //    type=Core.types.mouseEvents.MOVE.toLowerCase();
            //    break;
            //  case Core.types.toucheEvents.END:
            //    type=Core.types.mouseEvents.UP.toLowerCase();
            //    break;
            //}
            //touch.preventDefault();
            //simulatedEvent=document.createEvent(Core.types.mouseEvents.EVENT);
            //simulatedEvent.initMouseEvent(type,true,true,this.canvas,1,touch.screenX,touch.screenY,touch.clientX,touch.clientY,false,false,false,false,0,null);
            //touch.target.dispatchEvent(simulatedEvent);
        }
        //#endregion touchToMouse
        //#region dblClick
        dblClick() {
            //let obj,p,frm=this.form;
            //if (!frm.hasHitTest()) return;
            //Core.mouse.getMouseInfos(mouseEventArg);
            //p=Core.classes.Point.create(Core.mouse.target.x,Core.mouse.target.y);
            //if (Core.renderer===Core.types.renderers.HTML){
            //  if (e.target.jsObj) e.target.jsObj.mouseDown(Core.mouse.button,p);
            //  return;
            //}
            //obj=frm.objectByPoint(p,Core.types.mouseEvents.DBLCLICK);
            //if (obj===frm) obj=null;
            //if(obj!==null){
            //  if(obj.enabled){
            //    p=obj.screenToClient(p);
            //    obj.dblClick(Core.mouse.button,p);
            //  }
            //}
            //Core.mouse.stopEvent(mouseEventArg);
            //obj=p=null;
        }
        //#endregion dblClick
        //#region mouseDown
        mouseDown(mouseEventArg) {
            //#region Variables déclaration
            const priv = internal(this);
            const resizeMode = priv.resizeMode;
            const savedSizePosState = priv.savedSizePosState;
            //#endregion Variables déclaration
            priv.isResizing = resizeMode.rightEdge || resizeMode.bottomEdge || resizeMode.topEdge || resizeMode.leftEdge;
            if (priv.isResizing && !this.isMaximized && !this.isMinimized) {
                if (mouseEventArg) {
                    Core.mouse.getMouseInfos(mouseEventArg);
                }
                const documentCoord = Core.mouse.document;
                savedSizePosState.x = documentCoord.x;
                savedSizePosState.y = documentCoord.y;
                Core.resizeWindow = this;
                Events.bind(document, Mouse.MOUSEEVENTS.MOVE.toLowerCase(), this.docMouseMove);
                Events.bind(document, Mouse.MOUSEEVENTS.UP.toLowerCase(), this.docMouseUp);
                Core.looper.addListener(this, "resize");
            }
        }
        //#endregion mouseDown
        //#region mouseUp
        mouseUp(mouseEventArg) {
            //#region Variables déclaration
            const resizeWindow = Core.resizeWindow;
            //#endregion Variables déclaration
            if (resizeWindow) {
                resizeWindow.stopResize(mouseEventArg);
            }
        }
        //#endregion mouseUp
        //#region docMouseUp
        docMouseUp(mouseEventArg) {
            //#region Variables déclaration
            const resizeWindow = Core.resizeWindow;
            //#endregion Variables déclaration
            if (resizeWindow) {
                resizeWindow.stopResize(mouseEventArg);
            }
        }
        //#endregion docMouseUp
        //#region stopResize
        stopResize(mouseEventArg) {
            //#region Variables déclaration
            const priv = internal(this);
            const resizeMode = priv.resizeMode;
            //#endregion Variables déclaration
            resizeMode.rightEdge = resizeMode.bottomEdge = resizeMode.topEdge = resizeMode.leftEdge = false;
            priv.isResizing = false;
            Core.looper.removeListener(this);
            Core.resizeWindow = null;
            Events.unBind(document, Mouse.MOUSEEVENTS.UP.toLowerCase(), this.docMouseUp);
            Events.unBind(document, Mouse.MOUSEEVENTS.MOVE.toLowerCase(), this.docMouseMove);
            if (!Core.isHTMLRenderer) {
                Core.canvas.needRedraw = true;
            }
        }
        //#endregion stopResize
        //#region mouseMove
        mouseMove(mouseEventArg) {
            //#region Variables déclaration
            const priv = internal(this);
            const layoutRect = {};
            let cs = null;
            let csrDefault = true;
            const CUSTOMCURSORS = Types.CUSTOMCURSORS;
            const isHtmlRenderer = Core.isHTMLRenderer;
            const htmlElement = isHtmlRenderer ? this.HTMLElement : Core.canvas;
            const resizeMode = priv.resizeMode;
            const layout = priv.layout;
            const lHtmlElement = layout.HTMLElement;
            const mouse = Core.mouse;
            const mDocument = mouse.document;
            //#endregion Variables déclaration
            super.mouseMove();
            if (mouseEventArg) {
                mouse.getMouseInfos(mouseEventArg);
            }
            this.removeCursors();
            if (this.isBorderSizeable && !this.isMaximized && !this.isMinimized && !priv.isResizing && !this.isRolledUp && priv.snapArea !== Window.SNAPAREAS.TOP) {
                if (mouse.event.srcElement === htmlElement || isHtmlRenderer) {
                    resizeMode.rightEdge = resizeMode.bottomEdge = resizeMode.topEdge = resizeMode.leftEdge = false;
                    if (isHtmlRenderer) {
                        cs = getComputedStyle(lHtmlElement);
                    } else {
                        let margin = layout.margin;
                        cs = {
                            marginLeft: margin.left,
                            marginTop: margin.top,
                            marginRight: margin.right,
                            marginBottom: margin.bottom
                        };
                    }
                    layoutRect.l = ~~parseFloat(cs.marginLeft);
                    layoutRect.t = ~~parseFloat(cs.marginTop);
                    layoutRect.r = ~~parseFloat(cs.marginRight);
                    layoutRect.b = ~~parseFloat(cs.marginBottom);
                    cs = isHtmlRenderer ? htmlElement.getBoundingClientRect() : this.getBoundingClientRect();
                    const x = mDocument.x - cs.left;
                    const y = mDocument.y - cs.top;
                    resizeMode.topEdge = y < layoutRect.l;
                    resizeMode.leftEdge = x < layoutRect.t;
                    resizeMode.rightEdge = x >= cs.width - layoutRect.r;
                    resizeMode.bottomEdge = y >= cs.height - layoutRect.b;
                    if (resizeMode.rightEdge || resizeMode.bottomEdge || resizeMode.topEdge || resizeMode.leftEdge) {
                        csrDefault = false;
                    }
                    if (resizeMode.rightEdge && resizeMode.bottomEdge || resizeMode.leftEdge && resizeMode.topEdge) {
                        htmlElement.classList.add(CUSTOMCURSORS.NWRESIZE);
                    } else if (resizeMode.rightEdge && resizeMode.topEdge || resizeMode.leftEdge && resizeMode.bottomEdge) {
                        htmlElement.classList.add(CUSTOMCURSORS.NERESIZE);
                    } else if (resizeMode.rightEdge || resizeMode.leftEdge) {
                        htmlElement.classList.add(CUSTOMCURSORS.ERESIZE);
                    } else if (resizeMode.topEdge || resizeMode.bottomEdge) {
                        htmlElement.classList.add(CUSTOMCURSORS.NRESIZE);
                    }
                }
            }
            if (csrDefault) {
                htmlElement.classList.add(CUSTOMCURSORS.DEFAULT);
            }
            if (priv.isResizing) {
                this.docMouseMove(mouseEventArg);
            }
        }
        //#endregion mouseMove
        //#region docMouseMove
        docMouseMove(mouseEventArg) {
            //#region Variables déclaration
            const mouse = Core.mouse;
            const mDocument = mouse.document;
            const p = new Core.classes.Point(mDocument.x, mDocument.y);
            const decOff = {};
            //#endregion Variables déclaration
            if (mouseEventArg) {
                mouse.getMouseInfos(mouseEventArg);
            }
            const resizeWindow = Core.resizeWindow;
            const savedSizePosState = internal(resizeWindow).savedSizePosState;
            if (resizeWindow && resizeWindow.isResizing) {
                decOff.x = Math.abs(savedSizePosState.x - p.x);
                decOff.y = Math.abs(savedSizePosState.y - p.y);
                if (decOff.x !== 0 || decOff.y !== 0) {
                    if (p.x < 0) {
                        p.x = 0;
                    }
                    if (p.y < 0) {
                        p.y = 0;
                    }
                    savedSizePosState.x = p.x;
                    savedSizePosState.y = p.y;
                }
                if (!Core.isHTMLRenderer) {
                    Core.canvas.needRedraw = true;
                }
            }
        }
        //#endregion docMouseMove
        //#region mouseWheel
        mouseWheel() {
            //let p,obj,frm=this.form;
            //if (!frm.hasHitTest()) return;
            //Core.mouse.getMouseInfos(mouseEventArg);
            //p=Core.classes.Point.create(Core.mouse.target.x,Core.mouse.target.y);
            //obj=frm.objectByPoint(p,Core.types.mouseEvents.WHEEL);
            //if (obj===frm) obj=null;
            //if(obj!==null){
            //  if(obj.enabled){
            //    p=obj.screenToClient(p);
            //    obj.mouseWheel(Core.mouse.wheelDir,Core.mouse.wheelDelta,Core.mouse.button,p);
            //  }
            //}
            //Core.mouse.stopEvent(mouseEventArg);
            //obj=p=null;
        }
        //#endregion mouseWheel
        //#region mouseLeave
        mouseLeave(mouseEventArg) {
            this.removeCursors();
            (Core.isHTMLRenderer ? this.HTMLElement : Core.canvas).classList.add(Types.CUSTOMCURSORS.DEFAULT);
        }
        //#endregion mouseLeave
        //#region removeCursors
        removeCursors() {
            //#region Variables déclaration
            const CUSTOMCURSORS = Types.CUSTOMCURSORS;
            const htmlElement = Core.isHTMLRenderer ? this.HTMLElement : Core.canvas;
            //#endregion Variables déclaration
            htmlElement.classList.remove(CUSTOMCURSORS.DEFAULT);
            htmlElement.classList.remove(CUSTOMCURSORS.NRESIZE);
            htmlElement.classList.remove(CUSTOMCURSORS.ERESIZE);
            htmlElement.classList.remove(CUSTOMCURSORS.NWRESIZE);
            htmlElement.classList.remove(CUSTOMCURSORS.NERESIZE);
        }
        //#endregion removeCursors
        //#region keyDown
        keyDown() {
            switch (Core.keyboard.keyCode) {
                case Keyboard.VKEYSCODES.VK_TAB:
                    if (Core.keyboard.shift) {
                        this.prevFocusedCtrl();
                    } else {
                        this.nextFocusedCtrl();
                    }
                    break;
                default:
                    Core.keyboard.stopEvent();
                    break;
            }
        }
        //#endregion keyDown
        //#region keyPress
        keyPress() {
        }
        //#endregion keyPress
        //#region keyUp
        keyUp() {
            //let form=Core.apps.activeApplication.activeWindow;
            //Core.keyboard.getKeyboardInfos(keyboardEventArg);
            //if (form._focusedControl!==null) form._focusedControl.keyUp(keyboardEventArg);
        }
        //#endregion keyUp
        //#region sortControls
        sortControls() {
            //  this._controls=this._controls.sort(function(a,b){return a._controlIdx-b._controlIdx;});
        }
        //#endregion sortControls
        //#region resize
        resize() {
            //#region Variables déclaration
            const priv = internal(this);
            const pos = {};
            const PX = Types.CSSUNITS.PX;
            const htmlElement = this.HTMLElement;
            const savedSizePosState = priv.savedSizePosState;
            const resizeMode = priv.resizeMode;
            const htmlElementStyle = this.HTMLElementStyle;
            const isHtmlRenderer = Core.isHTMLRenderer;
            const themeName = this.app.themeName;
            const windowTheme = Core.themes && Core.themes[themeName]?Core.themes[themeName].Window:null;
            const minWidth = windowTheme && windowTheme.minWidth?windowTheme.minWidth:Window.MINWIDTH;
            const minHeight = windowTheme && windowTheme.minHeight?windowTheme.minHeight:Window.MINHEIGHT;
            //#endregion Variables déclaration
            if (priv.isResizing) {
                const b = (isHtmlRenderer ? htmlElement : this).getBoundingClientRect();
                pos.l = isHtmlRenderer ? htmlElement.offsetLeft : this.left;
                pos.t = isHtmlRenderer ? htmlElement.offsetTop : this.top;
                const x = Math.min(window.innerWidth, savedSizePosState.x) - b.left;
                const y = Math.min(window.innerHeight, savedSizePosState.y) - b.top;
                if (resizeMode.rightEdge && x >= minWidth) {
                    if (isHtmlRenderer) {
                        htmlElementStyle.width = `${x}${PX}`;
                    } else {
                        this.width = x;
                    }
                }
                if (resizeMode.bottomEdge && y >= minHeight) {
                    if (isHtmlRenderer) {
                        htmlElementStyle.height = `${y}${PX}`;
                    } else {
                        this.height = y;
                    }
                }

                if (resizeMode.leftEdge) {
                    const newWidth = (Core.isHTMLRenderer ? htmlElement.offsetWidth : this.width) - x;
                    if (newWidth > minWidth && savedSizePosState.x > 0) {
                        if (Core.isHTMLRenderer) {
                            htmlElementStyle.width = `${newWidth}${PX}`;
                            htmlElementStyle.left = `${savedSizePosState.x}${PX}`;
                        } else {
                            this.width = newWidth;
                            this.left = savedSizePosState.x;
                        }
                    }
                }
                if (resizeMode.topEdge) {
                    const newHeight = (Core.isHTMLRenderer ? htmlElement.offsetHeight : this.height) - y;
                    if (newHeight > minHeight && savedSizePosState.y > 0) {
                        if (Core.isHTMLRenderer) {
                            htmlElementStyle.height = `${newHeight}${PX}`;
                            htmlElementStyle.top = `${savedSizePosState.y}${PX}`;
                        } else {
                            this.height = newHeight;
                            this.top = savedSizePosState.y;
                        }
                    }
                }
                if (!isHtmlRenderer) {
                    this.realignChilds();
                }
            }
        }
        //#endregion resize
        //#region addCSSClass
        addCSSClass() {
            //#region Variables déclaration
            let str = super.addCSSClass([]);
            //#endregion Variables déclaration
            str = Text.replace(str, this.ClassName, "Window");
            return str;
        }
        //#endregion addCSSClass
        //#region getChilds
        getChilds(childs) {
            //#region Variables déclaration
            let nodes = null;
            let props = null;
            let dataName = null;
            let dataClass = null;
            const priv = internal(this);
            const isHtmlRenderer = Core.isHTMLRenderer;
            const themeName = this.app.themeManifest.themeName;
            const theme = Core.themes[themeName];
            const classes = Core.classes;
            //#endregion Variables déclaration
            priv.layout = classes.createComponent({
                class: classes.Layout,
                owner: this,
                props: {
                    inForm: false,
                    align: Types.ALIGNS.CLIENT
                },
                withTpl: false
            });
            const layout = priv.layout;
            layout.hitTest.all = false;
            if (isHtmlRenderer) {
                layout.getHTMLElement(this.HTMLElement.querySelector('[data-class="Layout"]').id);
                nodes = layout.HTMLElement.childNodes;
            } else {
                nodes = childs;
            }
            nodes.forEach(node => {
                if (node.nodeType === Types.XMLNODETYPES.ELEMENT_NODE && isHtmlRenderer) {
                    dataClass = node.dataset.class;
                    dataName = node.dataset.name;
                } else {
                    dataClass = node.className;
                    dataName = node.name;
                }
                if (dataClass) {
                    props = {};
                    if (isHtmlRenderer) {
                        if (node.nodeType === Types.XMLNODETYPES.ELEMENT_NODE) {
                            const properties = node.querySelector(`[id='${node.id}']> properties:first-child`);
                            if (properties) {
                                props = JSON.parse(properties.innerText);
                            }
                        }
                    } else {
                        props = node.properties;
                    }
                    if ((classes[dataClass] === WindowTitleBar) ||
                        (classes[dataClass] === WindowContent)) {
                        props.inForm = false;
                    }
                    const obj = classes.createComponent({
                        class: classes[dataClass],
                        owner: layout,
                        name: dataName,
                        props: props,
                        internalId: node.id,
                        withTpl: false
                    });
                    if (isHtmlRenderer) {
                        obj.getHTMLElement(node.id);
                    }
                    switch (dataClass) {
                        case "WindowTitleBar": {
                            priv.titleBar = obj;
                            const titleBar = priv.titleBar;
                            if (this.isBorderNone) {
                                if (isHtmlRenderer) {
                                    titleBar.display = Types.DISPLAYS.NONE;
                                } else {
                                    titleBar.visible = false;
                                }
                                titleBar.inForm = false;
                            } else if (!isHtmlRenderer && theme.WindowTitleBar && theme.WindowTitleBar.height) {
                                titleBar.height = theme.WindowTitleBar.height;
                            } else {
                                titleBar.height = Window.TITLEBARHEIGHT;
                            }
                            titleBar.align = Types.ALIGNS.TOP;
                            break;
                        }
                        case "WindowContent": {
                            priv.content = obj;
                            const content = priv.content;
                            content.inForm = false;
                            content.hitTest.all = false;
                            content.align = Types.ALIGNS.CLIENT;
                            break;
                        }
                        case "MainMenu":
                            priv.mainMenu = obj;
                            //contentTop+=obj.HTMLElement.offsetHeight;
                            break;
                        case "ToolBar":
                        case "ToolBarContainer":
                            priv.toolBars.push(obj);
                            //obj.HTMLElement.style[Core.types.jsCSSProperties.TOP]=contentTop+Types.CSSUNITS.PX;
                            //contentTop+=obj.HTMLElement.offsetHeight;
                            break;
                        case "StatusBar":
                            priv.statusBars.push(obj);
                            //if (!this._statusBar)) this._statusBar=obj;
                            //else Css.addClass(obj.HTMLElement,"hidden");
                            //obj.HTMLElement.style[Core.types.jsCSSProperties.BOTTOM]=contentBottom+Types.CSSUNITS.PX;
                            //contentBottom+=obj.HTMLElement.offsetHeight;
                            break;
                    }
                    if (!isHtmlRenderer) {
                        //    //obj.updateFromHTML();
                        //    obj.getChilds();
                        //} else {
                        obj.getChilds(node.childs);
                    }
                }
            });
        }
        //#endregion getChilds
        //#region formCreated
        formCreated(id) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Core.isHTMLRenderer) {
                this.getHTMLElement(id);
                //this.updateFromHTML();
                this.getChilds();
                if (this.addListeners) {
                    this.addListeners();
                }
                if (priv.isChildWindow) {
                    priv.parentHTML.appendChild(this.HTMLElement);
                    this.maximize();
                    this.desactiveHitTest();
                }
            } else {
                this.getChilds(id);
            }
            //this.loaded();
        }
        //#endregion formCreated
        //#region bindEvents
        bindEvents() {
            super.bindEvents();
            this.bindEventToHTML("onClose");
            this.bindEventToHTML("onCloseQuery");
            this.bindEventToHTML("onActivate");
            this.bindEventToHTML("onDeactivate");
            this.bindEventToHTML("onHide");
            this.bindEventToHTML("onShow");
            this.bindEventToHTML("onCreate");
            this.bindEventToHTML("onThemeChanged");
        }
        //#endregion center
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const themeName = this.app.themeManifest.themeName;
            const theme = Core.themes[themeName];
            const isHtmlRenderer = Core.isHTMLRenderer;
            const layoutMargin = priv.layout.margin;
            const contentMargin = priv.content.margin;
            const TITLEBUTTONS = Window.TITLEBUTTONS;
            let margin = null;
            //#endregion Variables déclaration
            //if (!this.isMaximized) {
            //    if (this.clientWidth > 0) this.layout.HTMLElementStyle.width = `${this.clientWidth}${PX}`;
            //    if (this.clientHeight > 0) this.layout.HTMLElementStyle.height = `${this.clientHeight}${PX}`;
            //}
            if (!isHtmlRenderer) {
                layoutMargin.offset(Window.SIZEABLEBORDERSIZE, Window.SIZEABLEBORDERSIZE);
                if (theme.WindowLayout) {
                    if (theme.WindowLayout.margin) {
                        const layoutTheme = theme.WindowLayout;
                        if (Tools.isNumber(layoutTheme.margin)) {
                            margin = layoutTheme.margin;
                            layoutMargin.setValues(margin, margin, margin, margin);
                        } else if (Tools.isObject(layoutTheme.margin)) {
                            margin = layoutTheme.margin;
                            layoutMargin.setValues(margin.left, margin.top, margin.right, margin.bottom);
                        }
                    }
                    if (theme.WindowLayout.hasOwnProperty("clipped")) {
                        priv.layout.clipped = theme.WindowLayout.clipped;
                    }
                }
                if (theme.WindowContent) {
                    if (theme.WindowContent.margin) {
                        let contentTheme = theme.WindowContent;
                        if (Tools.isNumber(contentTheme.margin)) {
                            margin = contentTheme.margin;
                            contentMargin.setValues(margin, margin, margin, margin);
                        } else if (Tools.isObject(contentTheme.margin)) {
                            const margin = contentTheme.margin;
                            contentMargin.setValues(margin.left, margin.top, margin.right, margin.bottom);
                        }
                    }
                    if (theme.WindowContent.hasOwnProperty("clipped")) {
                        priv.content.clipped = theme.WindowContent.clipped;
                    }
                }
                if (theme.Window.hasOwnProperty("clipped")) {
                    this.clipped = theme.Window.clipped;
                }
                if (theme.WindowTitleBar) {
                    if (theme.WindowTitleBar.hasOwnProperty("clipped")) {
                        priv.titleBar.clipped = theme.WindowTitleBar.clipped;
                    }
                }
            }
            //} else {
            //    priv.layout.margin.offset(1, 1);
            //}
            super.loaded();
            priv.creating = false;
            const comp = priv.content.components.find(component => {
                if (component instanceof Core.classes.Control) {
                    if (component.visible && component.canFocused && component.isEnabled) {
                        return component;
                    }
                }
            });
            if (comp) {
                comp.setFocus();
            }
            this.realignChilds();
            if (!isHtmlRenderer) {
                this.alignButtons();
            }
            if (this.isBorderDialog) {

            }
            this.setTitleBtn(priv.buttons ? priv.buttons : [TITLEBUTTONS.MINIMIZE, TITLEBUTTONS.MAXRESTORE]);
        }
        //#endregion loaded
        //#region closePopups
        closePopups() {
            //#region Variables déclaration
            const priv = internal(this);
            const popups = priv.popups;
            const mainMenu = priv.mainMenu;
            const classes = Core.classes;
            //#endregion Variables déclaration
            if (popups) {
                if (popups.length > 0) {
                    popups.reverse().forEach((popup, i) => {
                        const control = popup.control;
                        if (control instanceof classes.MenuItem) {
                            control.closeSubMenu();
                        } else if (control) {
                            if (control.dropDownPopup instanceof classes.PopupBox) {
                                control.destroyPopup();
                                popup.control = null;
                            }
                        }
                        if (popup) {
                            if (popup.owner instanceof classes.PopupMenu) {
                                popup.owner.close();
                            }
                            popups[i] = null;
                        }
                    });
                }
                popups.clear();
            }
            if (mainMenu) {
                mainMenu.items.forEach(item => {
                    item.setActive(false);
                });
                //Css.removeClass(this.mainMenu.HTMLElement,"isactive
                //this.mainMenu.HTMLElement.dataset.isactive = false;
            }
        }
        //#endregion closePopups
        //#region removeToHTML
        removeToHTML() {
            document.body.removeChild(this.HTMLElement);
        }
        //#endregion removeToHTML
        //#region moveTo
        moveTo(x, y) {
            //#region Variables déclaration
            const htmlElement = this.HTMLElement;
            const htmlElementStyle = this.HTMLElementStyle;
            const body = document.body;
            const isHtmlRenderer = Core.isHTMLRenderer;
            const width = isHtmlRenderer ? htmlElement.offsetWidth : this.width;
            const height = isHtmlRenderer ? htmlElement.offsetHeight : this.height;
            const PX = Types.CSSUNITS.PX;
            //#endregion Variables déclaration
            if (Tools.isNumber(x) && Tools.isNumber(y)) {
                if (x + width < 0) x = 0;
                if (y + height < 0) y = 0;
                if (x > body.offsetWidth) {
                    x = body.offsetWidth - width;
                }
                if (y > body.offsetHeight) {
                    y = body.offsetHeight - height - 10;
                }
                this.left = x;
                this.top = y;
                if (isHtmlRenderer) {
                    htmlElementStyle.left = `${x}${PX}`;
                    htmlElementStyle.top = `${y}${PX}`;
                }
            }
        }
        //#endregion moveTo
        //#region center
        center() {
            //#region Variables déclaration
            let l = null;
            let t = null;
            const htmlParentElement = Tools.HTMLParentElement;
            const htmlElement = this.HTMLElement;
            const body = document.body;
            const htmlElementStyle = this.HTMLElementStyle;
            const PX = Types.CSSUNITS.PX;
            const isHtmlRenderer = Core.isHTMLRenderer;
            //#endregion Variables déclaration
            if (htmlParentElement) {
                l = ~~((htmlParentElement.offsetWidth - (isHtmlRenderer ? htmlElement.offsetWidth : this.width)) / 2);
                t = ~~((htmlParentElement.offsetHeight - (isHtmlRenderer ? htmlElement.offsetHeight : this.height)) / 2);
            } else {
                l = ~~((body.offsetWidth - (isHtmlRenderer ? htmlElement.offsetWidth : this.width)) / 2);
                t = ~~((body.offsetHeight - (isHtmlRenderer ? htmlElement.offsetHeight : this.height)) / 2);
            }
            if (isHtmlRenderer) {
                htmlElementStyle.left = `${l}${PX}`;
                htmlElementStyle.top = `${t}${PX}`;
            } else {
                this.left = l;
                this.top = t;
            }
        }
        //#endregion center
        //#region createSnapArea
        createSnapArea(_snapArea) {
            //#region Variables déclaration
            const SNAPAREAS = Window.SNAPAREAS;
            const priv = internal(this);
            let snapArea = document.getElementById("snapArea");
            //#endregion Variables déclaration
            if (!snapArea) {
                snapArea = document.createElement("div");
                snapArea.id = "snapArea";
                document.body.appendChild(snapArea);
            } else {
                snapArea.className = String.EMPTY;
            }
            const snapAreaStyle = snapArea.style;
            snapAreaStyle.zIndex = Core.isHTMLRenderer ? ~~this.HTMLElementStyle.zIndex - 1 : 0;
            priv.snapArea = _snapArea;
            switch (_snapArea) {
                case SNAPAREAS.TOP:
                    break;
                case SNAPAREAS.LEFT:
                    snapAreaStyle.left = "0";
                    snapAreaStyle.top = "50%";
                    snapAreaStyle.right = "100%";
                    snapAreaStyle.bottom = "50%";
                    break;
                case SNAPAREAS.RIGHT:
                    snapAreaStyle.left = "100%";
                    snapAreaStyle.top = "50%";
                    snapAreaStyle.right = "0";
                    snapAreaStyle.bottom = "50%";
                    break;
            }
            setTimeout(() => {
                //#region Variables déclaration
                const sa = document.getElementById("snapArea");
                //#endregion Variables déclaration
                sa.classList.add(Core.apps.activeApplication.activeWindow.snapArea);
            }, 0);
        }
        //#endregion createSnapArea
        //#region destroySnapArea
        destroySnapArea() {
            //#region Variables déclaration
            const snapArea = document.getElementById("snapArea");
            //#endregion Variables déclaration
            if (snapArea) {
                document.body.removeChild(snapArea);
            }
        }
        //#endregion destroySnapArea
        //#region restoreWindow
        restoreWindow() {
            //#region Variables déclaration
            const priv = internal(this);
            const PX = Types.CSSUNITS.PX;
            const WINDOWSTATES = Window.WINDOWSTATES;
            const savedSizePosState = priv.savedSizePosState;
            const htmlElement = this.HTMLElement;
            const htmlElementStyle = this.HTMLElementStyle;
            const isHtmlRenderer = Core.isHTMLRenderer;
            const SNAPED = WINDOWSTATES.SNAPED;
            const SNAPAREAS = Window.SNAPAREAS;
            const titleBar = priv.titleBar;
            const rollUpDownBtn = titleBar.rollUpDownBtn;
            const stayOnOffBtn = titleBar.stayOnOffBtn;
            const maxRestoreBtn = titleBar.maxRestoreBtn;
            //#endregion Variables déclaration
            if (priv.windowState === SNAPED) {
                if (isHtmlRenderer) {
                    htmlElementStyle.width = `${savedSizePosState.width}${PX}`;
                    htmlElementStyle.height = `${savedSizePosState.height}${PX}`;
                    htmlElementStyle.right = String.EMPTY;
                    htmlElementStyle.bottom = String.EMPTY;
                    htmlElementStyle.left = `${savedSizePosState.left}${PX}`;
                    htmlElementStyle.top = `${savedSizePosState.top}${PX}`;
                    htmlElement.classList.remove(`${SNAPED}${priv.snapArea}`);
                } else {
                    this.width = savedSizePosState.width;
                    this.height = savedSizePosState.height;
                    this.left = savedSizePosState.left;
                    this.top = savedSizePosState.top;
                }
                // TODO enable rollup and stayon button
                // change maxRestore button to max
                // change maxRestore button to restore
                priv.enabledShadow = true;
                // on désactive les autres boutons
                maxRestoreBtn.enabled = true;
                rollUpDownBtn.enabled = true;
                stayOnOffBtn.enabled = true;
                priv.windowState = WINDOWSTATES.NORMAL;
                priv.snapArea = SNAPAREAS.NONE;
            }
        }
        //#endregion restoreWindow
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const app = this.app;
            const priv = internal(this);
            const head = document.head;
            const className = this.constructor.name;
            const windows = app.windows;
            //#endregion Variables déclaration
            const scripts = Convert.nodeListToArray(head.getElementsByTagName("script"));
            scripts.forEach(script => {
                if (script.src.indexOf(className.toLowerCase()) > -1) {
                    head.removeChild(script);
                }
            });
            const styles = Convert.nodeListToArray(head.getElementsByTagName("link"));
            styles.forEach(style => {
                if (style.href.indexOf(className.toLowerCase()) > -1) {
                    head.removeChild(style);
                }
            });
            if (windows.last === this && windows.length === 1) {
                app.terminate();
                return;
            }
            app.windows.remove(this);
            priv.popups.destroy();
            priv.toolBars.destroy();
            priv.statusBars.destroy();
            this.onActivate.destroy();
            this.onDeactivate.destroy();
            this.onHide.destroy();
            this.onShow.destroy();
            this.onCreate.destroy();
            this.onClose.destroy();
            this.onCloseQuery.destroy();
            this.onThemeChanged.destroy();
            //priv.minimizeAnimation.destroy();
            super.destroy();
        }
        //#endregion destroy
        //#region desactiveHitTest
        desactiveHitTest() {
            //#region Variables declaration
            const priv = internal(this);
            //#endregion Variables declaration
            priv.content.hitTest = false;
            priv.layout.hitTest = false;
            priv.titleBar.hitTest = false;
            if (Core.isHTMLRenderer) {
                this.HTMLElement.classList.add("inactive");
            }
            //this.HTMLElement.dataset.isactive = false;
        }
        //#endregion desactiveHitTest
        //#region applySnap
        applySnap() {
            //#region Variables déclaration
            const priv = internal(this);
            const WINDOWSTATES = Window.WINDOWSTATES;
            const SNAPAREAS = Window.SNAPAREAS;
            const savedSizePosState = priv.savedSizePosState;
            const htmlElement = this.HTMLElement;
            const htmlElementStyle = this.HTMLElementStyle;
            const isHtmlRenderer = Core.isHTMLRenderer;
            const cw = !isHtmlRenderer ? Core.canvas.offsetWidth : 0;
            const cw2 = !isHtmlRenderer ? ~~(Core.canvas.offsetWidth / 2) : 0;
            const ch = !isHtmlRenderer ? Core.canvas.offsetHeight : 0;
            const titleBar = priv.titleBar;
            const rollUpDownBtn = titleBar.rollUpDownBtn;
            const stayOnOffBtn = titleBar.stayOnOffBtn;
            const maxRestoreBtn = titleBar.maxRestoreBtn;
            const SNAPED = WINDOWSTATES.SNAPED;
            const snapArea = priv.snapArea;
            //#endregion Variables déclaration
            priv.windowState = SNAPED;
            if (!isHtmlRenderer) {
                this.beginUpdate();
            }
            if (snapArea !== SNAPAREAS.NONE) {
                // change maxRestore button to restore
                priv.enabledShadow = false;
                // on désactive les autres boutons
                maxRestoreBtn.enabled = true;
                rollUpDownBtn.enabled = false;
                stayOnOffBtn.enabled = false;
            }
            switch (snapArea) {
                case SNAPAREAS.LEFT:
                    if (isHtmlRenderer) {
                        htmlElementStyle.left = 0;
                        htmlElementStyle.top = 0;
                        htmlElementStyle.width = "50%";
                        htmlElementStyle.bottom = 0;
                        htmlElementStyle.height = "auto";
                    } else {
                        this.left = 0;
                        this.top = 0;
                        this.width = cw2;
                        this.height = ch;
                    }
                    break;
                case SNAPAREAS.TOP:
                    if (isHtmlRenderer) {
                        htmlElementStyle.left = 0;
                        htmlElementStyle.top = 0;
                        htmlElementStyle.width = "auto";
                        htmlElementStyle.height = "auto";
                        htmlElementStyle.bottom = 0;
                        htmlElementStyle.right = 0;
                        htmlElement.classList.add(`${SNAPED}${snapArea}`);
                    } else {
                        this.left = 0;
                        this.top = 0;
                        this.width = cw;
                        this.height = ch;
                    }
                    break;
                case SNAPAREAS.RIGHT:
                    if (isHtmlRenderer) {
                        htmlElementStyle.right = 0;
                        htmlElementStyle.top = 0;
                        htmlElementStyle.width = "50%";
                        htmlElementStyle.bottom = 0;
                        htmlElementStyle.left = "auto";
                        htmlElementStyle.height = "auto";
                        savedSizePosState.left = htmlElement.offsetLeft;
                    } else {
                        this.left = cw2;
                        this.top = 0;
                        this.width = cw2;
                        this.height = ch;
                    }
                    break;
            }
            if (!isHtmlRenderer) {
                this.endUpdate();
            }
            this.destroySnapArea();
        }
        //#endregion applySnap
        //#region render
        render() {
            super.render("Window");
        }
        //#endregion render
        //#endregion
    }
    return BaseWindow;
    //#endregion Class BaseWindow
})();
//#region BaseWindow defineProperties
Object.defineProperties(BaseWindow, {
    toolBars: {
        enumerable: true
    },
    statusBars: {
        enumerable: true
    },
    //themeManifest: {
    //    enumerable: true
    //},
    snapArea: {
        enumerable: true
    },
    destroyOnHide: {
        enumerable: true
    },
    animated: {
        enumerable: true
    },
    keyPreview: {
        enumerable: true
    },
    icon: {
        enumerable: true
    },
    mainMenu: {
        enumerable: true
    },
    activeControl: {
        enumerable: true
    },
    canClose: {
        enumerable: true
    },
    moveable: {
        enumerable: true
    }
});
//#endregion BaseWindow defineProperties
//#endregion BaseWindow
//#region Window constants
//#region HELPTYPES
/**
 * @type    {Object}        HELPTYPES
 */
const _HELPTYPES = Object.freeze({
    KEYWORD: "keyword",
    CONTEXT: "context"
});
//#endregion
//#region TITLEBUTTONS
/**
 * @type    {Object}        TITLEBUTTONS
 */
const _TITLEBUTTONS = Object.freeze({
    CLOSE: "close",
    MAXRESTORE: "maxRestore",
    MINIMIZE: "minimize",
    HELP: "help",
    ROLLUPDOWN: "rollUpDown",
    STAYONOFF: "stayOnOff"
});
//#endregion
//#region FORMSTATES
/**
 * @type    {Object}        FORMSTATES
 */
const _FORMSTATES = Object.freeze({
    CREATING: "creating",
    VISIBLE: "visible",
    SHOWING: "showing",
    MODAL: "modal",
    ACTIVATED: "activated"
});
//#endregion
//#region WINDOWSTATES
/**
 * @type    {Object}        WINDOWSTATES
 */
const _WINDOWSTATES = Object.freeze({
    NONE: "none",
    NORMAL: "normal",
    MINIMIZED: "minimized",
    MAXIMIZED: "maximized",
    ROLLEDUP: "rolledup",
    SNAPED: "snaped"
});
//#endregion
//#region MODALRESULTBUTTONS
/**
 * @type    {Object}        MODALRESULTBUTTONS
 */
const _MODALRESULTBUTTONS = Object.freeze({
    NONE: "none",
    OK: "ok",
    CANCEL: "cancel",
    ABORT: "abort",
    RETRY: "retry",
    IGNORE: "ignore",
    YES: "yes",
    NO: "no",
    ALL: "all",
    NOTOALL: "noToAll",
    YESTOALL: "yesToAll",
    CLOSE: "close"
});
//#endregion
//#region MODALRESULTS
/**
 * @type    {Object}        MODALRESULTS
 */
const _MODALRESULTS = Object.freeze({
    NONE: "none",
    OK: "ok",
    CANCEL: "cancel",
    ABORT: "abort",
    RETRY: "retry",
    IGNORE: "ignore",
    YES: "yes",
    NO: "no",
    ALL: "all",
    NOTOALL: "noToAll",
    YESTOALL: "yesToAll",
    HELP: "help"
});
//#endregion
//#region FORMPOSITIONS
/**
 * @type    {Object}        FORMPOSITIONS
 */
const _FORMPOSITIONS = Object.freeze({
    DEFAULT: "default",
    DESIGNED: "designed",
    MAINFORMCENTER: "mainFormCenter",
    SCREENCENTER: "screenCenter"
});
//#endregion
//#region BORDERSTYLES
/**
 * @type    {Object}        BORDERSTYLES
 */
const _BORDERSTYLES = Object.freeze({
    DIALOG: "dialog",
    NONE: "none",
    SINGLE: "single",
    SIZEABLE: "sizeable"/*,
    SIZETOOLWIN: "sizeToolWin",
    TOOLWINDOW: "toolWindow"*/
});
//#endregion
//#region RESIZEMODES
/**
 * @type    {Object}        RESIZEMODES
 */
const _RESIZEMODES = Object.freeze({
    NONE: String.EMPTY,
    LEFT: "left",
    TOP: "top",
    RIGHT: "right",
    BOTTOM: "bottom",
    TOPLEFT: "topLeft",
    TOPRIGHT: "topRight",
    BOTTOMRIGHT: "bottomRight",
    BOTTOMLEFT: "bottomLeft"
});
//#endregion
//#region SNAPAREAS
/**
 * @type    {Object}        SNAPAREAS
 */
const _SNAPAREAS = Object.freeze({
    NONE: "none",
    LEFT: "left",
    TOP: "top",
    RIGHT: "right"
});
//#endregion
//#region SHOWINGMODES
/**
 * @type    {Object}        SHOWINGMODES
 */
const _SHOWINGMODES = Object.freeze({
    NORMAL: "normal",
    MODAL: "modal"
});
//#endregion
//#region BORDERSTYPES
/**
 * @type    {Object}        BORDERSTYPES
 */
const _BORDERSTYPES = Object.freeze({
    NONE: "none",
    SNAP: "snap",
    MAGNETIC: "magnetic"
});
//#endregion

//#endregion
//#region Window
const Window = (() => {
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
    //#region Class Window
    class Window extends BaseWindow {
        //#region Static
        static get SIZEABLEBORDERSIZE() { return 4; }
        static get CORNERSIZE() { return 10; }
        static get MINWIDTH() { return 150; }
        static get MINHEIGHT() { return 26; }
        static get TITLEBARHEIGHT() { return 25; }
        static get MAGNETICSIZE() { return 10; }
        static get SNAPAREADISTANCE() { return 20; }
        static get STAYONTOP() { return 999999999; }
        //#region HELPTYPES
        /**
         * @type    {Object}        HELPTYPES
         */
        static get HELPTYPES() {
            return _HELPTYPES;
        }
        //#endregion
        //#region TITLEBUTTONS
        /**
         * @type    {Object}        TITLEBUTTONS
         */
        static get TITLEBUTTONS() {
            return _TITLEBUTTONS;
        }
        //#endregion
        //#region FORMSTATES
        /**
         * @type    {Object}        FORMSTATES
         */
        static get FORMSTATES() {
            return _FORMSTATES;
        }
        //#endregion
        //#region WINDOWSTATES
        /**
         * @type    {Object}        WINDOWSTATES
         */
        static get WINDOWSTATES() {
            return _WINDOWSTATES;
        }
        //#endregion
        //#region MODALRESULTBUTTONS
        /**
         * @type    {Object}        MODALRESULTBUTTONS
         */
        static get MODALRESULTBUTTONS() {
            return _MODALRESULTBUTTONS;
        }
        //#endregion
        //#region MODALRESULTS
        /**
         * @type    {Object}        MODALRESULTS
         */
        static get MODALRESULTS() {
            return _MODALRESULTS;
        }
        //#endregion
        //#region FORMPOSITIONS
        /**
         * @type    {Object}        FORMPOSITIONS
         */
        static get FORMPOSITIONS() {
            return _FORMPOSITIONS;
        }
        //#endregion
        //#region BORDERSTYLES
        /**
         * @type    {Object}        BORDERSTYLES
         */
        static get BORDERSTYLES() {
            return _BORDERSTYLES;
        }
        //#endregion
        //#region RESIZEMODES
        /**
         * @type    {Object}        RESIZEMODES
         */
        static get RESIZEMODES() {
            return _RESIZEMODES;
        }
        //#endregion
        //#region SNAPAREAS
        /**
         * @type    {Object}        SNAPAREAS
         */
        static get SNAPAREAS() {
            return _SNAPAREAS;
        }
        //#endregion
        //#region BORDERSTYPES
        /**
         * @type    {Object}        BORDERSTYPES
         */
        static get BORDERSTYPES() {
            return _BORDERSTYPES;
        }
        //#endregion
        //#region SHOWINGMODES
        /**
         * @type    {Object}        SHOWINGMODES
         */
        static get SHOWINGMODES() {
            return _SHOWINGMODES;
        }
        //#endregion
        //#endregion Static
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
            }
        }
        //#endregion constructor
        //#region getters / setters
        //#endregion getters / setters
    }
    return Window;
    //#endregion Class Window
})();
//#endregion
Core.classes.register(Types.CATEGORIES.CONTAINERS, Window);
Core.classes.register(Types.INTERNALCATEGORIES.INTERNAL, WindowTitleBar, WindowContent, BaseWindow);
const WindowTitleBarTpl = `<jagui-windowtitlebar id='{internalId_TitleBar}' data-class='WindowTitleBar' class='Control WindowTitleBar {theme}'>
<jagui-windowtitle id='{internalId_Title}' data-class='CaptionControl' class='Control CaptionControl WindowTitle logo WindowIcon {theme}'>{title}</jagui-windowtitle>
<jagui-windowclosebutton id='{internalId_CloseButton}' data-class='WindowCloseButton' class='Control WindowTitleButton WindowCloseButton {theme}'></jagui-windowclosebutton>
<jagui-windowmaxrestorebutton id='{internalId_MaxRestoreButton}' data-class='WindowMaxRestoreButton' class='Control WindowTitleButton WindowMaxRestoreButton {theme}' data-isrestore='false'></jagui-windowmaxrestorebutton>
<jagui-windowminimizebutton id='{internalId_MinimizeButton}' data-class='WindowMinimizeButton' class='Control WindowTitleButton WindowMinimizeButton {theme}'></jagui-windowminimizebutton>
<jagui-windowhelpbutton id='{internalId_HelpButton}' data-class='WindowHelpButton' class='Control WindowTitleButton WindowHelpButton hidden {theme}'></jagui-windowhelpbutton>
<jagui-windowrollupdownbutton id='{internalId_RollUpDownButton}' data-class='WindowRollUpDownButton' class='Control WindowTitleButton WindowRollUpDownButton hidden {theme}' data-isup='true'></jagui-windowrollupdownbutton>
<jagui-windowstayonoffbutton id='{internalId_StayOnOffButton}' data-class='WindowStayOnOffButton' class='Control WindowTitleButton WindowStayOnOffButton hidden {theme}' data-ison='true'></jagui-windowstayonoffbutton>
</jagui-windowtitlebar>`;
const WindowTpl = `<jagui-window id='{internalId}' data-name='{name}' data-class='Window' class='Control csr_default Window {theme}' data-appName='{appName}' data-visible='false'>
<jagui-windowlayout id='{internalId_Layout}' data-class='Layout' class='Control Layout WindowLayout'>
<jagui-windowcontent id='{internalId_content}' data-name='{windowName_content}' data-class='WindowContent' class='Control WindowContent {theme}' data-popupmenu='{popupMenu}'>${WindowTitleBarTpl}</jagui-windowcontent>
</jagui-windowlayout>
</jagui-window>`;
Core.classes.registerTemplates([{ Class: Window, template: WindowTpl }]);
export { Window };