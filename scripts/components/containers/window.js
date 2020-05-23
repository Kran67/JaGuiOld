//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import '/scripts/components/containers/layout.js';
import '/scripts/core/captioncontrol.js';
import '/scripts/components/common/windowbuttons.js';
import { Keyboard } from '/scripts/core/keyboard.js';
import { Mouse } from '/scripts/core/mouse.js';
import { Events } from '/scripts/core/events.js';
//import { RectAnimation } from '/scripts/core/rectanimation.js';
import { Point } from '/scripts/core/geometry.js';
import { Convert } from '/scripts/core/convert.js';
//#endregion Import
//#region WindowTitleBar
const WindowTitleBar = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class WindowTitleBar
    class WindowTitleBar extends ThemedControl {
        //#region Constructor
        constructor(owner, props) {
            //#region Variables déclaration
            const textAligns = core.types.TEXTALIGNS;
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                props.autoCapture = !0;
                props.mouseEvents = { mousemove: !0, wheel: !0, dblclick: !0 };
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
                priv.startDragOff = new core.classes.Point;
                priv.visibleBtns = 0;
                core.tools.addPropertyFromEnum({
                    component: this,
                    propName: 'horizAlign',
                    enum: textAligns,
                    forceUpdate: !0,
                    variable: priv,
                    value: textAligns.LEFT
                });
                //#endregion
                //#region Public
                //#endregion Public
                this.createEventsAndBind(['onCaptionChanged'], props);
            }
        }
        //#endregion Constructor
        //#region Getters / Setters
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
            if (typeof newValue !== core.types.CONSTANTS.STRING) {
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
            if (!(newValue instanceof core.classes.Component)) {
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
            if (!(newValue instanceof core.classes.Component)) {
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
            if (!(newValue instanceof core.classes.Component)) {
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
            if (!(newValue instanceof core.classes.Component)) {
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
            if (!(newValue instanceof core.classes.Component)) {
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
            if (!(newValue instanceof core.classes.Component)) {
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
        //#endregion Getters / Setters
        //#region Methods
        //#region getCaptionButton
        getCaptionButton(btn) {
            //#region Variables déclaration
            const classes = core.classes;
            const CONSTANTS = core.types.CONSTANTS;
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
            const mouse = core.mouse;
            const priv = internal(this);
            const startDragOff = priv.startDragOff;
            const p = new core.classes.Point(mouse.document.x, mouse.document.y);
            const form = this.form;
            const savedSizePosState = form.savedSizePosState;
            const isHtmlRenderer = core.isHTMLRenderer;
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
            this.isPressed = !0;
            core.dragWindow = this;
            Events.bind(document, Mouse.MOUSEEVENTS.MOVE.toLowerCase(), this.mouseMove);
        }
        //#endregion mouseDown
        //#region mouseUp
        mouseUp() {
            //#region Variables déclaration
            const mouse = core.mouse;
            const mDocument = mouse.document;
            const form = this.form;
            const bcr = this.getBoundingClientRect();
            const htmlElement = this.HTMLElement;
            const themeName = this.app.themeManifest.themeName;
            const snapElement = document.getElementById('snapArea');
            //#endregion Variables déclaration
            if (mouse.button === Mouse.MOUSEBUTTONS.RIGHT) {
                if (form.isBorderSingle || form.isBorderSizeable) {
                    let leftSysMenu = null;
                    leftSysMenu = bcr.left;
                    let offsetX = 0;
                    if (core.isHTMLRenderer) {
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
                        core.themes[themeName].sysMenuPosition &&
                            core.themes[themeName].sysMenuPosition === 'right'
                            && (leftSysMenu = bcr.right - offsetX);
                    }
                    (mDocument.x > leftSysMenu) && (mDocument.x < leftSysMenu + offsetX)
                        && form.showSystemMenu();
                }
            } else if (mouse.button === Mouse.MOUSEBUTTONS.LEFT) {
                super.mouseUp();
                this.isPressed = !1;
                core.dragWindow = null;
                Events.unBind(document, Mouse.MOUSEEVENTS.MOVE, this.mouseMove);
                form.bordersType === Window.BORDERSTYPES.SNAP && form.windowState !== Window.WINDOWSTATES.SNAPED
                    && form.snapArea !== Window.SNAPAREAS.NONE && snapElement && form.applySnap();
                form.enabledShadow = !0;
            }
        }
        //#endregion mouseUp
        //#region mouseMove
        mouseMove() {
            //#region Variables déclaration
            const decOff = new Point;
            const BORDERSTYPES = Window.BORDERSTYPES;
            const SNAPAREAS = Window.SNAPAREAS;
            const mouse = core.mouse;
            const mDocument = mouse.document;
            const isHtmlRenderer = core.isHTMLRenderer;
            //#endregion Variables déclaration
            super.mouseMove();
            if (core.dragWindow) {
                if (mouse.button === Mouse.MOUSEBUTTONS.LEFT) {
                    const titlebar = core.dragWindow;
                    const form = titlebar.form;
                    const snapArea = form.snapArea;
                    form.enabledShadow = !1;
                    if (form.moveable && !form.isMaximized) {
                        const fHtmlElement = form.HTMLElement;
                        const bordersType = form.bordersType;
                        const startDragOff = titlebar.startDragOff;
                        const savedSizePosState = form.savedSizePosState;
                        const winLeft = isHtmlRenderer ? fHtmlElement.offsetLeft : form.left;
                        const winTop = isHtmlRenderer ? fHtmlElement.offsetTop : form.top;
                        const winWidth = isHtmlRenderer ? fHtmlElement.offsetWidth : form.width;
                        const winHeight = isHtmlRenderer ? fHtmlElement.offsetHeight : form.height;
                        const parent = isHtmlRenderer ? fHtmlElement.parentNode : core.canvas.parentNode;
                        const p = new core.classes.Point(mDocument.x, mDocument.y);
                        decOff.x = Math.abs(startDragOff.x - p.x);
                        decOff.y = Math.abs(startDragOff.y - p.y);
                        if ((decOff.x !== 0 || decOff.y !== 0) && titlebar.isPressed) {
                            p.x = Math.max(Math.min(p.x, window.innerWidth), 0);
                            p.y = Math.max(Math.min(p.y, window.innerHeight), 0);
                            let newLeft = (winLeft + (p.x - startDragOff.x));
                            let newTop = (winTop + (p.y - startDragOff.y));
                            if (bordersType === BORDERSTYPES.MAGNETIC) {
                                newLeft < Window.MAGNETICSIZE && (newLeft = 0);
                                newTop < Window.MAGNETICSIZE && (newTop = 0);
                                newLeft + winWidth > parent.offsetWidth - Window.MAGNETICSIZE
                                    && (newLeft = parent.offsetWidth - winWidth);
                                newTop + winHeight > parent.offsetHeight - Window.MAGNETICSIZE
                                    && (newTop = parent.offsetHeight - winHeight);
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
                                        newLeft = p.x - int(savedSizePosState.width / 2);
                                    } else if (snapArea === SNAPAREAS.LEFT) {
                                        newLeft = 0;
                                        p.x > newLeft + savedSizePosState.width
                                            && (newLeft = p.x - int(savedSizePosState.width / 2));
                                    } else if (snapArea === SNAPAREAS.RIGHT) {
                                        p.x > newLeft + savedSizePosState.width
                                    }
                                    form.restoreWindow();
                                }
                            }
                            form.moveTo(newLeft, newTop);
                            startDragOff.x = p.x;
                            startDragOff.y = p.y;
                        }
                    }
                    !core.isHTMLRenderer && (core.canvas.needRedraw = !0);
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
            const XMLNODETYPES = core.types.XMLNODETYPES;
            const isHtmlRenderer = core.isHTMLRenderer;
            const priv = internal(this);
            //#endregion Variables déclaration
            if (isHtmlRenderer) {
                nodes = childs ? childs.childNodes : this.HTMLElement.childNodes;
            } else if (core.isCanvasRenderer) {
                nodes = childs;
            }
            nodes.forEach(node => {
                dataClass = node.nodeType === XMLNODETYPES.ELEMENT_NODE && isHtmlRenderer
                    ? node.dataset.class
                    : node.className;
                let dataName = node.name;
                !dataName || !dataName && (dataName = String.EMPTY);
                let properties = {};
                if (isHtmlRenderer) {
                    if (node.nodeType === XMLNODETYPES.ELEMENT_NODE) {
                        const props = node.querySelector(`[id='${node.id}']> properties:first-child`);
                        props && (properties = JSON.parse(props.innerText));
                    }
                } else {
                    properties = node.properties;
                }
                properties ? properties.inForm = !1 : properties = { inForm: !1 };
                if (dataClass) {
                    if (dataClass !== 'WindowTitle') {
                        obj = core.classes.createComponent({
                            class: core.classes[dataClass],
                            owner: this,
                            name: dataName,
                            props: properties,
                            withTpl: !1,
                            internalId: node.id
                        });
                    }
                    switch (dataClass) {
                        case 'WindowTitle':
                            priv.title = core.isHTMLRenderer ? node : properties.caption;
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
                            //title.hitTest.all = !1;
                            break;
                        case 'WindowCloseButton':
                            priv.closeBtn = obj;
                            break;
                        case 'WindowMinimizeButton':
                            priv.minimizeBtn = obj;
                            break;
                        case 'WindowMaxRestoreButton':
                            priv.maxRestoreBtn = obj;
                            break;
                        case 'WindowHelpButton':
                            priv.helpBtn = obj;
                            break;
                        case 'WindowRollUpDownButton':
                            priv.rollUpDownBtn = obj;
                            break;
                        case 'WindowStayOnOffButton':
                            priv.stayOnOffBtn = obj;
                            break;
                    }
                }
            });
        }
        //#endregion getChilds
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.startDragOff.destroy();
            priv.startDragOff = null;
            priv.title = null;
            priv.closeBtn = null;
            priv.minimizeBtn = null;
            priv.maxRestoreBtn = null;
            priv.helpBtn = null;
            priv.rollUpDownBtn = null;
            priv.stayOnOffBtn = null;
            priv.visibleBtns = null;
            priv.horizAlign = null;
            this.unBindAndDestroyEvents(['onCaptionChanged']);
            super.destroy();
        }
        //#endregion destroy
        //#region dblClick
        dblClick() {
            //#region Variables déclaration
            const form = this.form;
            const bcr = this.getBoundingClientRect();
            const mouse = core.mouse;
            const document = mouse.document;
            //#endregion Variables déclaration
            if (mouse.button === Mouse.MOUSEBUTTONS.LEFT && form.isBorderSingle || form.isBorderSizeable) {
                (document.x > bcr.left) && (document.x < bcr.left + 20)
                    ? form.close() : form.toggleMaxRestore();
            }
        }
        //#endregion dblClick
        //#region calcVisibleBtns
        calcVisibleBtns() {
            //#region Variables déclaration
            const buttons = ['close', 'maxRestore', 'minimize', 'help', 'rollUpDown', 'stayOnOff'];
            let visbleBtns = 0;
            const priv = internal(this);
            //#endregion Variables déclaration
            buttons.forEach(btn => {
                btn = priv[`${btn}Btn`];
                btn.visible && (visbleBtns++);
            });
            core.isHTMLRenderer && (this.form.HTMLElement.dataset.buttons = visbleBtns);
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
//#endregion WindowTitleBar
//#region Class WindowContent
class WindowContent extends ThemedControl {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            //props.mouseEvents = { mousedown: !0 };
            super(owner, props);
        }
    }
    //#endregion
}
//#endregion WindowContent
//#region BaseWindow
const BaseWindow = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
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
            //#endregion Variables déclaration
            if (owner) {
                props.mouseEvents = { mousemove: !0 };
                super(owner, props);
                //#region Private
                const priv = internal(this);
                priv.resizeMode = {
                    leftEdge: !1,
                    topEdge: !1,
                    rightEdge: !1,
                    bottomEdge: !1
                };
                priv.savedSizePosState = {};
                priv.isModal = !1;
                priv.creating = !0;
                priv.layout = null;
                priv.titleBar = null;
                priv.content = null;
                priv.titleBarObj = {};
                priv.firstShow = !0;
                priv.controlsToResize = [];
                priv.focusedControl = null;
                priv.hoveredControl = null;
                priv.capturedControl = null;
                priv.lastSelectedMenuItem = null;
                priv.popups = [];
                priv.toolBars = [];
                priv.statusBars = [];
                priv.isResizing = !1;
                priv.snapArea = props.hasOwnProperty('snapArea') ? props.snapArea : Window.SNAPAREAS.NONE;
                priv.destroyOnHide = props.hasOwnProperty('destroyOnHide')
                    && core.tools.isBool(props.destroyOnHide) ? props.destroyOnHide : !1;
                priv.controls = [];
                priv.isChildWindow = props.hasOwnProperty('parentHTML')
                    ? (props.parentHTML !== document.body ? !0 : !1) : !1;
                priv.parentHTML = props.hasOwnProperty('parentHTML') ? props.parentHTML : null;
                priv.lastZIndex = -1;
                priv.animated = !0;
                priv.keyPreview = !1;
                priv.icon = 'logo';
                priv.mainMenu = null;
                priv.activeControl = null;
                priv.canClose = !0;
                priv.moveable = !0;
                priv.stayOn = props.hasOwnProperty('stayOn') ? props.stayOn : !1;
                priv.enabledShadow = props.hasOwnProperty('enabledShadow') ? props.enabledShadow : !0;
                //priv.minimizeAnimation = new RectAnimation(this, { inForm: !1 });
                priv.position = props.hasOwnProperty('position') ? props.position : FORMPOSITIONS.DEFAULT;
                priv.buttons = props.hasOwnProperty('buttons') ? props.buttons : null;
                core.tools.addPropertyFromEnum({
                    component: this,
                    propName: 'position',
                    enum: FORMPOSITIONS,
                    variable: priv,
                    value: props.hasOwnProperty('formPosition') ? props.formPosition : FORMPOSITIONS.DESIGNED
                });
                core.tools.addPropertyFromEnum({
                    component: this,
                    propName: 'windowState',
                    enum: WINDOWSTATES,
                    setter: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        const WINDOWSTATES = Window.WINDOWSTATES;
                        const windowState = priv.windowState;
                        //#endregion Variables déclaration
                        if (core.tools.valueInSet(newValue, WINDOWSTATES) && windowState !== newValue) {
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
                    },
                    variable: priv,
                    value: props.hasOwnProperty('windowState') ? props.windowState : WINDOWSTATES.NORMAL
                });
                core.tools.addPropertyFromEnum({
                    component: this,
                    propName: 'borderStyle',
                    enum: BORDERSTYLES,
                    setter: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        const htmlElement = this.HTMLElement;
                        let borderStyle = priv.borderStyle;
                        const isHtmlRenderer = core.isHTMLRenderer;
                        const themeName = this.app.themeManifest.themeName;
                        const theme = core.themes[themeName];
                        const layout = priv.layout;
                        const BORDERSTYLES = Window.BORDERSTYLES;
                        //#endregion Variables déclaration
                        if (core.tools.valueInSet(newValue, BORDERSTYLES) && borderStyle !== newValue) {
                            isHtmlRenderer && htmlElement.classList.remove(borderStyle);
                            borderStyle = priv.borderStyle = newValue;
                            if (isHtmlRenderer) {
                                htmlElement.classList.add(borderStyle);
                            } else {
                                this.alignButtons();
                                if (this.isBorderNone) {
                                    layout.margin.empty();
                                } else {
                                    let layoutMargin = null;
                                    layoutMargin = theme.Window && theme.Window.WindowLayout
                                        && theme.Window.WindowLayout.margin
                                        ? theme.Window.WindowLayout.margin
                                        : Window.SIZEABLEBORDERSIZE;
                                    if (core.tools.isObject(layoutMargin)) {
                                        layout.margin.setValues(layoutMargin.left, layoutMargin.top, layoutMargin.right, layoutMargin.bottom);
                                    } else if (core.tools.isObject(layoutMargin)) {
                                        layout.margin.setValues(layoutMargin, layoutMargin, layoutMargin, layoutMargin);
                                    }
                                }
                                this.realignChilds();
                                core.canvas.needRedraw = !0;
                            }
                        }
                    },
                    variable: priv,
                    value: props.hasOwnProperty('borderStyle') ? props.borderStyle : BORDERSTYLES.SIZEABLE
                });
                core.tools.addPropertyFromEnum({
                    component: this,
                    propName: 'bordersType',
                    enum: BORDERSTYPES,
                    variable: priv,
                    value: props.hasOwnProperty('bordersType') ? props.bordersType : BORDERSTYPES.NONE
                });
                core.tools.addPropertyFromEnum({
                    component: this,
                    propName: 'modalResult',
                    enum: MODALRESULTS,
                    variable: priv,
                    value: MODALRESULTS.NONE
                });
                core.tools.addPropertyFromEnum({
                    component: this,
                    propName: 'showingMode',
                    enum: SHOWINGMODES,
                    variable: priv,
                    value: props.hasOwnProperty('showingMode') ? props.showingMode : SHOWINGMODES.NORMAL
                });
                priv.props = props;
                //#endregion Private
                //#region Public
                //this.visible = !1;
                this.app[this.constructor.name.toLowerCase()] = this;
                //#endregion Public
                //#region Events
                this.createEventsAndBind(['onActivate', 'onDeactivate', 'onHide', 'onShow', 'onCreate', 'onClose', 'onCloseQuery', 'onThemeChanged'], props);
                //#endregion Events
                //if (!core.isHTMLRenderer) {
                //    priv.minimizeAnimation.hideOnFinish = !0;
                //    priv.minimizeAnimation.control = this;
                //    priv.minimizeAnimation.propertyName = "bounds";
                //    priv.minimizeAnimation.onProcess.addListener(this._onMinimizeProcess);
                //    priv.minimizeAnimation.onFinish.addListener(this._onMinimizeFinish);
                //}
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region titleBarSize
        get titleBarSize() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            return {
                width: priv.titleBar.HTMLElement.offsetWidth,
                height: priv.titleBar.HTMLElement.offsetHeight
            };
        }
        //#endregion titleBarSize
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
            core.tools.isBool(newValue) && (internal(this).stayOn = newValue);
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
            newValue && newValue instanceof core.classes.Component && focusedControl !== newValue
                && (focusedControl = priv.focusedControl = newValue);
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
            object && object instanceof core.classes.Control && priv.hoveredControl !== object
                && (priv.hoveredControl = object);
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
            if ((newValue instanceof core.classes.Component && priv.capturedControl !== newValue) || newValue == null) {
                //this.releaseCapture();
                priv.capturedControl = newValue;
                newValue && (this.app.activeWindow = newValue.form);
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
            core.tools.isBool(newValue) && priv.isResizing !== newValue && (priv.isResizing = newValue);
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
            core.tools.isString(newValue) && priv.snapArea !== newValue && (priv.snapArea = newValue);
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
            core.tools.isBool(newValue) && priv.destroyOnHide !== newValue && (priv.destroyOnHide = newValue);
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
            if (core.tools.isBool(newValue) && newValue !== priv.keyPreview) {
                priv.keyPreview = newValue;
                this.propertyChanged('keyPreview');
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
            if (core.tools.isString(newValue) && icon !== newValue) {
                htmlElement.classList.remove(icon);
                icon = priv.icon = newValue;
                if (newValue.contains('base64')) {

                } else {
                    htmlElement.classList.add(icon);
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
            if (core.classes.MainMenu && newValue instanceof core.classes.MainMenu && newValue !== priv.mainMenu) {
                priv.mainMenu = newValue;
                this.redraw();
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
            if (core.tools.isBool(newValue)) {
                canClose !== newValue && (canClose = priv.canClose = newValue);
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
            core.tools.isBool(newValue) && priv.animated !== newValue && (priv.animated = newValue);
        }
        //#endregion animated
        //#region caption
        get caption() {
            return internal(this).titleBar.title;
        }
        set caption(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            let title = core.isHTMLRenderer ? priv.titleBar.title.innerText : priv.titleBar.title;
            //#endregion Variables déclaration
            if (core.tools.isString(newValue) && title !== newValue) {
                //priv.titleBar.title.innerText = newValue;
                this.captionChanged();
                //this.onCaptionChanged.invoke(priv.titleBar);
                core.isHTMLRenderer && (priv.titleBar.title.innerText = newValue);
            }
        }
        //#endregion caption
        //#region left
        get left() {
            return super.left;
        }
        set left(newValue) {
            !this.isMaximized && !this.isMinimized && (super.left = newValue);
        }
        //#endregion left
        //#region top
        get top() {
            return super.top;
        }
        set top(newValue) {
            !this.isMaximized && !this.isMinimized && (super.top = newValue);
        }
        //#endregion top
        //#region template
        get template() {
            //#region Variables déclaration
            const priv = internal(this);
            let html = super.template;
            let a = html.split('{appName}');
            //#endregion Variables déclaration
            html = a.join(this.app.name);
            a = html.split('{internalId_Layout}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_content}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_TitleBar}');
            html = a.join(String.uniqueId());
            //a=html.split('{internalId_Icon}');
            //html=a.join(String.uniqueId());
            a = html.split('{internalId_Title}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_CloseButton}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_MaxRestoreButton}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_MinimizeButton}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_HelpButton}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_RollUpDownButton}');
            html = a.join(String.uniqueId());
            a = html.split('{internalId_StayOnOffButton}');
            html = a.join(String.uniqueId());
            a = html.split('{title}');
            html = a.join(priv.props && priv.props.caption ? priv.props.caption : this.constructor.name);
            a = html.split('{content}');
            html = a.join(String.EMPTY);
            return html;
        }
        //#endregion template
        //#region visible
        get visible() {
            return super.visible;
        }
        set visible(newValue) {
            if (core.tools.isBool(newValue) && super.visible !== newValue) {
                super.visible = newValue;
                // à revoir
                //if (!priv.visible) {
                //    //priv.visible = !1;
                //    //Css.removeClass(this.HTMLElement,"isactive");
                //    //this.HTMLElement.dataset.isactive = !1;
                //}
            }
        }
        //#endregion visible
        //#region enabledShadow
        get enabledShadow() {
            return internal(this).enabledShadow;
        }
        set enabledShadow(newValue) {
            const priv = internal(this);
            core.tools.isBool(newValue) && priv.enabledShadow !== newValue && (priv.enabledShadow = newValue);
        }
        //#endregion enabledShadow
        //#region setActive
        setActive() {
            //#region Variables déclaration
            const priv = internal(this);
            let activeWindow = this.app.activeWindow;
            const app = this.app;
            const isHtmlRenderer = core.isHTMLRenderer;
            const lastActiveWindow = app.lastActiveWindow;
            let htmlElement;
            //#endregion Variables déclaration
            if (activeWindow !== this && activeWindow) {
                htmlElement = activeWindow.HTMLElement;
                activeWindow.releaseCapture();
                activeWindow.focusedControl && activeWindow.focusedControl.killFocus();
                activeWindow.onDeactivate.invoke();
                isHtmlRenderer && htmlElement.classList.add('inactive');
                if (activeWindow) {
                    !priv.isChildWindow && this !== app.mainWindow
                        ? lastActiveWindow.push(this.app.activeWindow)
                        : lastActiveWindow.clear();
                }
            }
            window.activeWindow = activeWindow = app.activeWindow = this;
            isHtmlRenderer && htmlElement && htmlElement.classList.remove('inactive');
            this.onActivate.invoke();
        }
        //#endregion setActive
        //#region setFocused
        setFocused(value) {
            //#region Variables déclaration
            const priv = internal(this);
            let focusedControl = priv.focusedControl;
            //#endregion Variables déclaration
            if (value && value instanceof core.classes.Control && focusedControl !== value) {
                focusedControl && focusedControl.killFocus();
                focusedControl = priv.focusedControl = value;
                focusedControl && focusedControl.enterFocus();
            }
        }
        //#endregion setFocused
        //#region setTitleBar
        setTitleBar() {
            //this._titleBar.visible=!1;
            //this._titleBarObj.mouseDown=this._titleBar.mouseDown;
            //this._titleBarObj.mouseUp=this._titleBar.mouseUp;
            //this._titleBarObj.mouseMove=this._titleBar.mouseMove;
            //this._titleBarObj.hitTest.mouseDown=!1;
            //this._titleBarObj.hitTest.mouseMove=!1;
            //this._titleBarObj.hitTest.mouseUp=!1;
            //this._titleBarObj.hitTest.mouseWheel=!1;
            //if (this._titleBarObj._startDragOff===null) this._titleBarObj._startDragOff=new core.classes.Point();
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
            !tab || tab.length === 0 && (tab = [TITLEBUTTONS.MINIMIZE, TITLEBUTTONS.MAXRESTORE]);
            allBtns.forEach(t => {
                titleBar[`${t}Btn`].visible = !1;
            });
            tab.forEach(t => {
                titleBar[`${t}Btn`].visible = !0;
            });
            titleBar[`${TITLEBUTTONS.CLOSE}Btn`].visible = !0;
        }
        //#endregion setTitleBtn
        //#region layoutMargin
        layoutMargin(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const layout = priv.layout;
            //#endregion Variables déclaration
            if (Array.isArray(newValue) && newValue.length === 3) {
                layout.margin.setValues(newValue[0], newValue[1], newValue[2], newValue[3]);
            } else if (core.tools.isNumber(newValue)) {
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
        //#endregion Getters / Setters
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
            const buttons = ['close', 'maxRestore', 'minimize', 'help', 'rollUpDown', 'stayOnOff'];
            const btns = core.themes[this.themeName].WindowButton;
            let invisbleBtns = 0;
            //#endregion Variables déclaration
            buttons.forEach((btn, i) => {
                let data = btns;
                let offset = btns.offset;
                const button = titleBar[`${btn}Btn`];
                if (btns[btn]) {
                    data = btns[btn];
                    data.offset !== undefined && (offset = data.offset);
                    data.hasOwnProperty('visible') && (button.visible = data.visible);
                }
                !button.visible && (invisbleBtns++);
                button.width = data.width ? data.width : btns.width;
                button.height = data.height ? data.height : btns.height;
                button.left = data.left ? data.left : btns.left;
                button.right = data.right ? data.right : btns.right;
                if (i > 0) {
                    data.left === null
                        ? button.right += (i - invisbleBtns) * offset
                        : button.left += (i - invisbleBtns) * offset;
                }
                button.top = data.top ? data.top : btns.top;
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
            onCloseQuery.hasListener ? onCloseQuery.invoke() : form._close();
        }
        //#endregion close
        //#region _close
        _close() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.canClose) {
                this.hide();
            }
        }
        //#endregion _close
        //#region hide
        hide() {
            //#region Variables déclaration
            const htmlElement = this.HTMLElement;
            const app = this.app;
            const lastActiveWindow = app.lastActiveWindow;
            const priv = internal(this);
            const isHtmlRenderer = core.isHTMLRenderer;
            let glass;
            //#endregion Variables déclaration
            this.onHide.invoke();
            if (isHtmlRenderer) {
                htmlElement.classList.remove('bounceIn');
                htmlElement.classList.add('bounceOut');
            }
            this.stopResize();
            if (isHtmlRenderer) {
                htmlElement.classList.contains('animated')
                    ? Events.bind(htmlElement, Events.whichAnimationEvent(), this.anitmationEndOnHide)
                    : this.visible = !1;
            } else {
                this.visible = !1;
                core.canvas.needRedraw = !0;
            }
            if (lastActiveWindow.length > 0) {
                app.activeWindow = null;
                lastActiveWindow.last.setActive();
                lastActiveWindow.pop();
            }
            if (priv.isModal && isHtmlRenderer) {
                glass = activeWindow.HTMLElement.querySelector('.glass')
                if (!activeWindow.isChildWindow) {
                    isHtmlRenderer && activeWindow.HTMLElement.removeChild(glass);
                } else {
                    isHtmlRenderer && app.mainWindow.HTMLElement.removeChild(glass);
                    activeWindow = app.mainWindow;
                }
            }
            priv.isModal = !1;

        }
        //#endregion hide
        //#region minimize
        minimize() {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            const htmlElementStyle = this.HTMLElementStyle;
            const PX = core.types.CSSUNITS.PX;
            const titleBar = priv.titleBar;
            const WINDOWSTATES = Window.WINDOWSTATES;
            const savedSizePosState = priv.savedSizePosState;
            const isHtmlRenderer = core.isHTMLRenderer;
            const themeName = this.app.themeManifest.themeName;
            let minWinHeight = Window.MINHEIGHT;
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
                    const theme = core.themes[themeName];
                    if (theme && theme.Window) {
                        theme.Window.minHeight && (minWinHeight = theme.Window.minHeight);
                        theme.Window.minWidth && (minWinWidth = theme.Window.MINWIDTH);
                    }
                    priv.windowState = WINDOWSTATES.NONE;
                    //const minimizeAnimation = priv.minimizeAnimation;
                    //minimizeAnimation.startFromCurrent = !1;
                    //minimizeAnimation.inverse = !1;
                    //minimizeAnimation.stopValue.setValues(0, document.body.offsetHeight - minWinHeight, minWinWidth, document.body.offsetHeight);
                    //if (priv.windowState === WINDOWSTATES.MAXIMIZED) {
                    //    minimizeAnimation.startValue.setValues(this.left, this.top, this.left + this.width, this.top + this.height);
                    //} else {
                    //    minimizeAnimation.startValue.setValues(savedSizePosState.left, savedSizePosState.top, savedSizePosState.left + savedSizePosState.width, savedSizePosState.top + savedSizePosState.height);
                    //}
                    //minimizeAnimation.start();
                }
                priv.enabledShadow = !1;
                titleBar.maxRestoreBtn.enabled = !1;
                titleBar.helpBtn.enabled = !1;
                titleBar.rollUpDownBtn.enabled = !1;
                titleBar.stayOnOffBtn.enabled = !1;
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
            form.left = int(rect.left);
            form.top = int(rect.top);
            form.width = int(rect.width);
            form.height = int(rect.height);
            form.endUpdate();
            core.canvas.needRedraw = !0;
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
            if (this.isMaximized && form.control) {
                form.startValue.setValues(form.left, form.top, form.left + form.width, form.top + form.height);
                form.startValue.setValues(savedSizePosState.left, savedSizePosState.top, savedSizePosState.left + savedSizePosState.width,
                    savedSizePosState.top + savedSizePosState.height);
            }
            if (core.isHTMLRenderer) {
                const htmlElementStyle = form.HTMLElementStyle;
                htmlElementStyle.transitionProperty = String.EMPTY;
                htmlElementStyle.transitionDuration = String.EMPTY;
                Events.unBind(form.HTMLElement, 'transitionend', form._onMinimizeFinish);
            } else {
                core.canvas.needRedraw = !0;
            }
        }
        //#endregion _onMinimizeFinish
        //#region toggleMinRestore
        toggleMinRestore() {
            //#region Variables déclaration
            const priv = internal(this);
            const minimizeBtn = priv.titleBar.minimizeBtn;
            const isHtmlRenderer = core.isHTMLRenderer;
            //#endregion Variables déclaration
            if (!this.isMinimized) {
                minimizeBtn.toolTip = 'Rétablir précédent'; // à voir pour mettre en locale
                this.minimize();
                if (isHtmlRenderer) {
                    //Css.addClass(minimizeBtn.HTMLElement, 'isrestore');
                }
            } else {
                minimizeBtn.toolTip = 'Réduire'; // à voir pour mettre en locale
                this.restore();
                if (isHtmlRenderer) {
                    ///Css.removeClass(minimizeBtn.HTMLElement, "isrestore");
                }
            }
        }
        //#endregion toggleMinRestore
        //#region maximize
        maximize() {
            //#region Variables déclaration
            const priv = internal(this);
            const WINDOWSTATES = Window.WINDOWSTATES;
            const htmlElement = this.HTMLElement;
            const htmlElementStyle = this.HTMLElementStyle;
            const titleBar = priv.titleBar;
            const savedSizePosState = priv.savedSizePosState;
            const isHtmlRenderer = core.isHTMLRenderer;
            const PX = core.types.CSSUNITS.PX;
            //#endregion Variables déclaration
            if (!this.isRolledUp) {
                if (!this.isMinimized && priv.snapArea === Window.SNAPAREAS.NONE) {
                    savedSizePosState.left = isHtmlRenderer ? htmlElement.offsetLeft : this.left;
                    savedSizePosState.top = isHtmlRenderer ? htmlElement.offsetTop : this.top;
                    savedSizePosState.width = isHtmlRenderer ? htmlElement.offsetWidth : this.width;
                    savedSizePosState.height = isHtmlRenderer ? htmlElement.offsetHeight : this.height;
                }
                savedSizePosState.state = WINDOWSTATES.MAXIMIZED;
                if (core.isHTMLRenderer) {
                    htmlElement.classList.add(WINDOWSTATES.MAXIMIZED);
                    htmlElement.classList.remove(WINDOWSTATES.MINIMIZED);
                    htmlElementStyle.left = `0`;
                    htmlElementStyle.top = `0`;
                    htmlElementStyle.width = `${document.body.offsetWidth}${PX}`;
                    htmlElementStyle.height = `${document.body.offsetHeight}${PX}`;
                    priv.windowState = WINDOWSTATES.MAXIMIZED;
                } else {
                    //const minimizeAnimation = priv.minimizeAnimation;
                    //minimizeAnimation.startFromCurrent = !1;
                    //minimizeAnimation.inverse = !1;
                    //minimizeAnimation.stopValue.setValues(0, 0, document.body.offsetWidth, document.body.offsetHeight);
                    //if (priv.windowState === WINDOWSTATES.MINIMIZED) {
                    //    minimizeAnimation.startValue.setValues(this.left, this.top, this.left + this.width, this.top + this.height);
                    //} else {
                    //    minimizeAnimation.startValue.setValues(savedSizePosState.left, savedSizePosState.top, savedSizePosState.left + savedSizePosState.width, savedSizePosState.top + savedSizePosState.height);
                    //}
                    //minimizeAnimation.start();
                    priv.windowState = WINDOWSTATES.NONE;
                }
                priv.enabledShadow = !1;
                // on désactive les autres boutons
                titleBar.maxRestoreBtn.enabled = !0;
                //titleBar.helpBtn.enabled = !1;
                titleBar.rollUpDownBtn.enabled = !1;
                titleBar.stayOnOffBtn.enabled = !1;
                this.stopResize();
            }
        }
        //#endregion maximize
        //#region toggleMaxRestore
        toggleMaxRestore() {
            //#region Variables déclaration
            const priv = internal(this);
            const maxRestoreBtn = priv.titleBar.maxRestoreBtn;
            const isHtmlRenderer = core.isHTMLRenderer;
            const WINDOWSTATES = Window.WINDOWSTATES;
            //#endregion Variables déclaration
            if (!this.isMaximized) {
                maxRestoreBtn.toolTip = 'Rétablir précédent'; // à voir pour mettre en locale
                priv.windowState === WINDOWSTATES.SNAPED && priv.snapArea === Window.SNAPAREAS.TOP
                    ? this.restoreWindow()
                    : this.maximize();
                isHtmlRenderer && maxRestoreBtn.HTMLElement.classList.add('isrestore');
            } else {
                maxRestoreBtn.toolTip = 'Agrandir'; // à voir pour mettre en locale
                this.restore();
                isHtmlRenderer && maxRestoreBtn.HTMLElement.classList.remove('isrestore');
            }
        }
        //#endregion toggleMaxRestore
        //#region restore
        restore() {
            //#region Variables déclaration
            const priv = internal(this);
            const titleBar = priv.titleBar;
            const savedSizePosState = priv.savedSizePosState;
            const WINDOWSTATES = Window.WINDOWSTATES;
            const PX = core.types.CSSUNITS.PX;
            if (savedSizePosState.oldState && savedSizePosState.oldState === WINDOWSTATES.MAXIMIZED) {
                delete priv.savedSizePosState.oldState;
                this.toggleMaxRestore();
                return;
            }
            //#endregion Variables déclaration
            if (core.isHTMLRenderer) {
                const htmlElementStyle = this.HTMLElementStyle;
                htmlElementStyle.transitionProperty = 'left, width, top, height';
                htmlElementStyle.transitionDuration = '0.2s';
                Events.bind(this.HTMLElement, 'transitionend', this._onMinimizeFinish);
                if ([WINDOWSTATES.MAXIMIZED, WINDOWSTATES.MINIMIZED].indexOf(priv.windowState) > -1) {
                    htmlElementStyle.left = `${savedSizePosState.left}${PX}`;
                    htmlElementStyle.top = `${savedSizePosState.top}${PX}`;
                    htmlElementStyle.width = `${savedSizePosState.width}${PX}`;
                    htmlElementStyle.height = `${savedSizePosState.height}${PX}`;
                    htmlElementStyle.right = 'auto';
                    htmlElementStyle.bottom = 'auto';
                    priv.windowState = WINDOWSTATES.NORMAL;
                }
                this.HTMLElement.classList.remove(WINDOWSTATES.MAXIMIZED, WINDOWSTATES.MINIMIZED);
            } else {
                priv.enabledShadow = !0;
                priv.windowState = WINDOWSTATES.NONE;
                //const minimizeAnimation = priv.minimizeAnimation;
                //minimizeAnimation.startFromCurrent = !1;
                //minimizeAnimation.startValue.setValues(this.left, this.top, this.left + this.width, this.top + this.height);
                //minimizeAnimation.stopValue.setValues(savedSizePosState.left, savedSizePosState.top, savedSizePosState.left + savedSizePosState.width, savedSizePosState.top + savedSizePosState.height);
                //minimizeAnimation.start();
            }
            savedSizePosState.state = WINDOWSTATES.NORMAL;
            titleBar.maxRestoreBtn.enabled = !0;
            titleBar.helpBtn.enabled = !0;
            titleBar.rollUpDownBtn.enabled = !0;
            titleBar.stayOnOffBtn.enabled = !0;
        }
        //#endregion restore
        //#region maximizeRestore
        maximizeRestore() {
            //#region Variables déclaration
            const form = this.form;
            //#endregion Variables déclaration
            form.isMaximized ? form.restore(this) : form.maximize(this);
        }
        //#endregion maximizeRestore
        //#region showHelp
        showHelp() {
            //let form=this.form;
        }
        //#endregion showHelp
        //#region toggleRollUpDown
        toggleRollUpDown() {
            !this.isRolledUp ? this.rollUp() : this.rollDown();
        }
        //#endregion toggleRollUpDown
        //#region rollUp
        rollUp() {
            //#region Variables déclaration
            const priv = internal(this);
            const titleBar = priv.titleBar;
            const maxRestoreBtn = titleBar.maxRestoreBtn;
            const minimizeBtn = titleBar.minimizeBtn;
            const rollUpDownBtn = titleBar.rollUpDownBtn;
            const isHtmlRenderer = core.isHTMLRenderer;
            const savedSizePosState = priv.savedSizePosState;
            let minWinHeight = Window.MINHEIGHT;
            const theme = core.themes[this.app.themeManifest.themeName];
            //#endregion Variables déclaration
            if (this.isBorderSizeable || this.isBorderSingle || titleBar.rollUpDownBtn.visible) {
                if (isHtmlRenderer) {
                    savedSizePosState.height = this.HTMLElement.offsetHeight;
                    this.HTMLElement.classList.add('rolledUp');
                } else {
                    savedSizePosState.height = this.height;
                    theme && theme.Window && theme.Window.minHeight && (minWinHeight = theme.Window.minHeight);
                    this.height = minWinHeight;
                }
                maxRestoreBtn.visible && (maxRestoreBtn.enabled = !1);
                minimizeBtn.visible && (minimizeBtn.enabled = !1);
                priv.content.visible = !1;
                priv.windowState = Window.WINDOWSTATES.ROLLEDUP;
                rollUpDownBtn.isRolledUp = !0;
                isHtmlRenderer
                    ? rollUpDownBtn.HTMLElement.classList.add('isup')
                    : core.canvas.needRedraw = !0;
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
            const isHtmlRenderer = core.isHTMLRenderer;
            const savedSizePosState = priv.savedSizePosState;
            //#endregion Variables déclaration
            if (this.isRolledUp) {
                isHtmlRenderer
                    ? this.HTMLElement.classList.remove('rolledUp')
                    : this.height = savedSizePosState.height;
                priv.windowState = Window.WINDOWSTATES.NORMAL;
                maxRestoreBtn.visible && (maxRestoreBtn.enabled = !0);
                minimizeBtn.visible && (minimizeBtn.enabled = !0);
                priv.content.visible = !0;
                rollUpDownBtn.isRolledUp = !1;
                if (isHtmlRenderer) {
                    rollUpDownBtn.HTMLElement.classList.remove('isup');
                } else {
                    this.realignChilds();
                    core.canvas.needRedraw = !0;
                }
            }
        }
        //#endregion rollDown
        //#region toggleStay
        toggleStay() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            !priv.stayOn ? this.stayOnTop() : this.stayNormal();
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
                core.isHTMLRenderer && (this.HTMLElementStyle.zIndex = Window.STAYONTOP);
                core.isHTMLRenderer && stayOnOffBtn.HTMLElement.classList.add('isstayon');
                stayOnOffBtn.isStayOn = priv.stayOn = !0;
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
                stayOnOffBtn.isStayOn = priv.stayOn = !1;
                stayOnOffBtn.toolTip = 'Epingler au dessus'; // à voir pour mettre en locale
                core.isHTMLRenderer && stayOnOffBtn.HTMLElement.classList.remove('isstayon');
                core.isHTMLRenderer && (this.HTMLElementStyle.zIndex = priv.lastZIndex);
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
            const isHtmlRenderer = core.isHTMLRenderer;
            const htmlElement = this.HTMLElement;
            //#endregion Variables declaration
            //this.checkBorderStyle();
            if (priv.firstShow) {
                //if (isHtmlRenderer) {
                //    this.HTMLResize();
                //}
                priv.firstShow = !1;
                htmlElement.classList.add(priv.borderStyle);
                if (this.isMaximized) {
                    priv.windowState = Window.WINDOWSTATES.NORMAL;
                    this.toggleMaxRestore();
                }
            }
            switch (priv.position) {
                case Window.FORMPOSITIONS.SCREENCENTER:
                case Window.FORMPOSITIONS.MAINFORMCENTER:
                    this.center();
            }
            isHtmlRenderer && (this.HTMLElementStyle.zIndex = core.windowZIndex);
            priv.lastZIndex = core.windowZIndex;
            this.loaded();
        }
        //#endregion beforeShow
        //#region show
        show() {
            //#region Variables déclaration
            const htmlElement = this.HTMLElement;
            const priv = internal(this);
            //#endregion Variables déclaration
            this.beforeShow();
            this.visible = !0;
            this.setActive();
            if (priv.animated && core.isHTMLRenderer) {
                htmlElement.classList.add('animated', 'bounceIn');
                Events.bind(htmlElement, Events.whichAnimationEvent(), this.anitmationEndOnShow);
                const defaultBtn = htmlElement.querySelector('.isDefault');
                defaultBtn && !priv.focusedControl && defaultBtn.jsObj.setFocus();
            }
            this.onShow.invoke();
            if (!core.isHTMLRenderer) {
                core.canvas.needRedraw = !0;
            }
        }
        //#endregion show
        //#region anitmationEndOnShow
        anitmationEndOnShow() {
            Events.unBind(this, Events.whichAnimationEvent(), this.jsObj.anitmationEndOnShow);
            setTimeout(() => {
                core.apps.activeApplication.activeWindow.HTMLElement.classList.remove('bounceIn', 'hidden');
            }, 0);
        }
        //#endregion anitmationEndOnShow
        //#region anitmationEndOnHide
        anitmationEndOnHide() {
            //#region Variables déclaration
            const jsObj = this.jsObj;
            //#endregion Variables déclaration
            if (core.isHTMLRenderer) {
                Events.unBind(this, Events.whichAnimationEvent(), jsObj.anitmationEndOnHide);
                this.classList.remove('bounceOut', 'animated', 'inactive');
            }
            jsObj.visible = !1;
            //this.dataset.isactive = !1;
            jsObj.onClose.invoke();
            jsObj.app.lastActiveWindow.length === 0 && (internal(jsObj).destroyOnHide = !0);
            jsObj.destroyOnHide && jsObj.destroy();
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
            const isHtmlRenderer = core.isHTMLRenderer;
            //#endregion Variables déclaration
            if (isHtmlRenderer) {
                glass = document.createElement(core.types.HTMLELEMENTS.DIV);
                glass.classList.add('Control', 'glass');
                glass.jsObj = this;
            }
            priv.isModal = !0;
            priv.modalResult = Window.MODALRESULTS.NONE;
            if (!activeWindow.isChildWindow) {
                isHtmlRenderer && activeWindow.HTMLElement.appendChild(glass);
            } else {
                isHtmlRenderer && app.mainWindow.HTMLElement.appendChild(glass);
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
            capturedControl !== this && capturedControl && capturedControl instanceof core.classes.Control
                && capturedControl.releaseCapture();
        }
        //#endregion releaseCapture
        //#region HTMLResize
        HTMLResize() {
            //#region Variables déclaration
            const priv = internal(this);
            const PX = core.types.CSSUNITS.PX;
            const htmlElementStyle = this.HTMLElementStyle;
            const width = this.width;
            const height = this.height;
            //#endregion Variables déclaration
            !this.loading && !priv.creating && (priv.firstShow = !1);
            Object.keys(core.looper.listeners).forEach(key => {
                if (core.looper.listeners[key].component.hasResizeEvent) {
                    core.looper.listeners[key].component.resized();
                }
            });
            htmlElementStyle.width = `${width}${PX}`;
            htmlElementStyle.height = `${height}${PX}`;
            width < Window.MINWIDTH && (htmlElementStyle.width = `${Window.MINWIDTH}${PX}`);
            height < Window.MINHEIGHT && (htmlElementStyle.height = `${Window.MINHEIGHT}${PX}`);
            this.moveTo(this.left, this.top);
        }
        //#endregion HTMLResize
        //#region touchToMouse
        touchToMouse(touchEventArg) {
            //if (touchEventArg.touches.length > 1) return;
            //let touch=touchEventArg.changedTouches[0],type="",simulatedEvent;
            //switch (touchEventArg.type) {
            //  case core.types.toucheEvents.START:
            //    type=core.types.mouseEvents.DOWN.toLowerCase();
            //    break;
            //  case core.types.toucheEvents.MOVE:
            //    type=core.types.mouseEvents.MOVE.toLowerCase();
            //    break;
            //  case core.types.toucheEvents.END:
            //    type=core.types.mouseEvents.UP.toLowerCase();
            //    break;
            //}
            //touch.preventDefault();
            //simulatedEvent=document.createEvent(core.types.mouseEvents.EVENT);
            //simulatedEvent.initMouseEvent(type,!0,!0,this.canvas,1,touch.screenX,touch.screenY,touch.clientX,touch.clientY,!1,!1,!1,!1,0,null);
            //touch.target.dispatchEvent(simulatedEvent);
        }
        //#endregion touchToMouse
        //#region dblClick
        dblClick() {
            //let obj,p,frm=this.form;
            //if (!frm.hasHitTest()) return;
            //core.mouse.getMouseInfos(mouseEventArg);
            //p=core.classes.Point.create(core.mouse.target.x,core.mouse.target.y);
            //if (core.renderer===core.types.renderers.HTML){
            //  if (e.target.jsObj) e.target.jsObj.mouseDown(core.mouse.button,p);
            //  return;
            //}
            //obj=frm.objectByPoint(p,core.types.mouseEvents.DBLCLICK);
            //if (obj===frm) obj=null;
            //if(obj!==null){
            //  if(obj.enabled){
            //    p=obj.screenToClient(p);
            //    obj.dblClick(core.mouse.button,p);
            //  }
            //}
            //core.mouse.stopEvent(mouseEventArg);
            //obj=p=null;
        }
        //#endregion dblClick
        //#region mouseDown
        mouseDown() {
            //#region Variables déclaration
            const priv = internal(this);
            const resizeMode = priv.resizeMode;
            const savedSizePosState = priv.savedSizePosState;
            //#endregion Variables déclaration
            priv.isResizing = resizeMode.rightEdge || resizeMode.bottomEdge || resizeMode.topEdge || resizeMode.leftEdge;
            if (priv.isResizing && !this.isMaximized && !this.isMinimized) {
                const documentCoord = core.mouse.document;
                savedSizePosState.x = documentCoord.x;
                savedSizePosState.y = documentCoord.y;
                core.resizeWindow = this;
                Events.bind(document, Mouse.MOUSEEVENTS.MOVE.toLowerCase(), this.docMouseMove);
                Events.bind(document, Mouse.MOUSEEVENTS.UP.toLowerCase(), this.docMouseUp);
                core.looper.addListener(this, 'resize');
            }
        }
        //#endregion mouseDown
        //#region mouseUp
        mouseUp() {
            //#region Variables déclaration
            const resizeWindow = core.resizeWindow;
            //#endregion Variables déclaration
            resizeWindow && resizeWindow.stopResize();
        }
        //#endregion mouseUp
        //#region docMouseUp
        docMouseUp() {
            //#region Variables déclaration
            const resizeWindow = core.resizeWindow;
            //#endregion Variables déclaration
            resizeWindow && resizeWindow.stopResize();
        }
        //#endregion docMouseUp
        //#region stopResize
        stopResize() {
            //#region Variables déclaration
            const priv = internal(this);
            const resizeMode = priv.resizeMode;
            //#endregion Variables déclaration
            resizeMode.rightEdge = resizeMode.bottomEdge = resizeMode.topEdge = resizeMode.leftEdge = !1;
            priv.isResizing = !1;
            core.looper.removeListener(this, 'resize');
            core.resizeWindow = null;
            Events.unBind(document, Mouse.MOUSEEVENTS.UP.toLowerCase(), this.docMouseUp);
            Events.unBind(document, Mouse.MOUSEEVENTS.MOVE.toLowerCase(), this.docMouseMove);
            !core.isHTMLRenderer && (core.canvas.needRedraw = !0);
        }
        //#endregion stopResize
        //#region mouseMove
        mouseMove() {
            //#region Variables déclaration
            const priv = internal(this);
            const layoutRect = {};
            let cs = null;
            let csrDefault = !0;
            const CUSTOMCURSORS = core.types.CUSTOMCURSORS;
            const isHtmlRenderer = core.isHTMLRenderer;
            const htmlElement = isHtmlRenderer ? this.HTMLElement : core.canvas;
            const resizeMode = priv.resizeMode;
            const layout = priv.layout;
            const lHtmlElement = layout.HTMLElement;
            const mouse = core.mouse;
            const mDocument = mouse.document;
            //#endregion Variables déclaration
            super.mouseMove();
            this.removeCursors();
            if (this.isBorderSizeable && !this.isMaximized && !this.isMinimized && !priv.isResizing && !this.isRolledUp && priv.snapArea !== Window.SNAPAREAS.TOP) {
                if (mouse.event.srcElement === htmlElement || isHtmlRenderer) {
                    resizeMode.rightEdge = resizeMode.bottomEdge = resizeMode.topEdge = resizeMode.leftEdge = !1;
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
                    layoutRect.l = int(cs.marginLeft);
                    layoutRect.t = int(cs.marginTop);
                    layoutRect.r = int(cs.marginRight);
                    layoutRect.b = int(cs.marginBottom);
                    cs = isHtmlRenderer ? htmlElement.getBoundingClientRect() : this.getBoundingClientRect();
                    const x = mDocument.x - cs.left;
                    const y = mDocument.y - cs.top;
                    resizeMode.topEdge = y < layoutRect.l;
                    resizeMode.leftEdge = x < layoutRect.t;
                    resizeMode.rightEdge = x >= cs.width - layoutRect.r;
                    resizeMode.bottomEdge = y >= cs.height - layoutRect.b;
                    resizeMode.rightEdge || resizeMode.bottomEdge || resizeMode.topEdge || resizeMode.leftEdge
                        && (csrDefault = !1);
                    if (resizeMode.rightEdge && resizeMode.bottomEdge || resizeMode.leftEdge && resizeMode.topEdge) {
                        htmlElement.classList.add(CUSTOMCURSORS.NWRESIZE);
                    } else if (resizeMode.rightEdge && resizeMode.topEdge
                        || resizeMode.leftEdge && resizeMode.bottomEdge) {
                        htmlElement.classList.add(CUSTOMCURSORS.NERESIZE);
                    } else if (resizeMode.rightEdge || resizeMode.leftEdge) {
                        htmlElement.classList.add(CUSTOMCURSORS.ERESIZE);
                    } else if (resizeMode.topEdge || resizeMode.bottomEdge) {
                        htmlElement.classList.add(CUSTOMCURSORS.NRESIZE);
                    }
                }
            }
            csrDefault && htmlElement.classList.add(CUSTOMCURSORS.DEFAULT);
            priv.isResizing && this.docMouseMove();
        }
        //#endregion mouseMove
        //#region docMouseMove
        docMouseMove() {
            //#region Variables déclaration
            const mouse = core.mouse;
            const mDocument = mouse.document;
            const p = new core.classes.Point(mDocument.x, mDocument.y);
            const decOff = {};
            //#endregion Variables déclaration
            const resizeWindow = core.resizeWindow;
            const savedSizePosState = internal(resizeWindow).savedSizePosState;
            if (resizeWindow && resizeWindow.isResizing) {
                decOff.x = Math.abs(savedSizePosState.x - p.x);
                decOff.y = Math.abs(savedSizePosState.y - p.y);
                if (decOff.x !== 0 || decOff.y !== 0) {
                    p.x = Math.max(p.x, 0);
                    p.y = Math.max(p.y, 0);
                    savedSizePosState.x = p.x;
                    savedSizePosState.y = p.y;
                }
                !core.isHTMLRenderer && (core.canvas.needRedraw = !0);
            }
        }
        //#endregion docMouseMove
        //#region mouseLeave
        mouseLeave() {
            this.removeCursors();
            (core.isHTMLRenderer ? this.HTMLElement : core.canvas).classList.add(core.types.CUSTOMCURSORS.DEFAULT);
        }
        //#endregion mouseLeave
        //#region removeCursors
        removeCursors() {
            //#region Variables déclaration
            const CUSTOMCURSORS = core.types.CUSTOMCURSORS;
            const htmlElement = core.isHTMLRenderer ? this.HTMLElement : core.canvas;
            //#endregion Variables déclaration
            htmlElement.classList.remove(CUSTOMCURSORS.DEFAULT, CUSTOMCURSORS.NRESIZE, CUSTOMCURSORS.ERESIZE, CUSTOMCURSORS.NWRESIZE, CUSTOMCURSORS.NERESIZE);
        }
        //#endregion removeCursors
        //#region keyDown
        keyDown() {
            switch (core.keyboard.keyCode) {
                case Keyboard.VKEYSCODES.VK_TAB:
                    core.keyboard.shift ? this.prevFocusedCtrl() : this.nextFocusedCtrl();
                    break;
                default:
                    core.keyboard.stopEvent();
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
            //let form=core.apps.activeApplication.activeWindow;
            //core.keyboard.getKeyboardInfos(keyboardEventArg);
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
            const PX = core.types.CSSUNITS.PX;
            const htmlElement = this.HTMLElement;
            const savedSizePosState = priv.savedSizePosState;
            const resizeMode = priv.resizeMode;
            const htmlElementStyle = this.HTMLElementStyle;
            const isHtmlRenderer = core.isHTMLRenderer;
            const themeName = this.app.themeName;
            const windowTheme = core.themes && core.themes[themeName] ? core.themes[themeName].Window : null;
            const minWidth = windowTheme && windowTheme.minWidth ? windowTheme.minWidth : Window.MINWIDTH;
            const minHeight = windowTheme && windowTheme.minHeight ? windowTheme.minHeight : Window.MINHEIGHT;
            //#endregion Variables déclaration
            if (priv.isResizing) {
                const b = (isHtmlRenderer ? htmlElement : this).getBoundingClientRect();
                pos.l = isHtmlRenderer ? htmlElement.offsetLeft : this.left;
                pos.t = isHtmlRenderer ? htmlElement.offsetTop : this.top;
                const x = Math.min(window.innerWidth, savedSizePosState.x) - b.left;
                const y = Math.min(window.innerHeight, savedSizePosState.y) - b.top;
                if (resizeMode.rightEdge && x >= minWidth) {
                    isHtmlRenderer
                        ? htmlElementStyle.width = `${x}${PX}`
                        : this.width = x;
                }
                if (resizeMode.bottomEdge && y >= minHeight) {
                    isHtmlRenderer
                        ? htmlElementStyle.height = `${y}${PX}`
                        : this.height = y;
                }

                if (resizeMode.leftEdge) {
                    const newWidth = (core.isHTMLRenderer ? htmlElement.offsetWidth : this.width) - x;
                    if (newWidth > minWidth && savedSizePosState.x > 0) {
                        if (core.isHTMLRenderer) {
                            htmlElementStyle.width = `${newWidth}${PX}`;
                            htmlElementStyle.left = `${savedSizePosState.x}${PX}`;
                        } else {
                            this.width = newWidth;
                            this.left = savedSizePosState.x;
                        }
                    }
                }
                if (resizeMode.topEdge) {
                    const newHeight = (core.isHTMLRenderer ? htmlElement.offsetHeight : this.height) - y;
                    if (newHeight > minHeight && savedSizePosState.y > 0) {
                        if (core.isHTMLRenderer) {
                            htmlElementStyle.height = `${newHeight}${PX}`;
                            htmlElementStyle.top = `${savedSizePosState.y}${PX}`;
                        } else {
                            this.height = newHeight;
                            this.top = savedSizePosState.y;
                        }
                    }
                }
                !isHtmlRenderer && this.realignChilds();
            }
        }
        //#endregion resize
        //#region addCSSClass
        addCSSClass() {
            //#region Variables déclaration
            let str = super.addCSSClass([]);
            //#endregion Variables déclaration
            str = Text.replace(str, this.ClassName, 'Window');
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
            const isHtmlRenderer = core.isHTMLRenderer;
            const themeName = this.app.themeManifest.themeName;
            const theme = core.themes[themeName];
            const classes = core.classes;
            //#endregion Variables déclaration
            priv.layout = classes.createComponent({
                class: classes.Layout,
                owner: this,
                props: {
                    inForm: !1,
                    align: core.types.ALIGNS.CLIENT
                },
                withTpl: !1
            });
            const layout = priv.layout;
            layout.mouseEvents.all = !1;
            if (isHtmlRenderer) {
                layout.getHTMLElement(this.HTMLElement.querySelector('[data-class="Layout"]').id);
                nodes = layout.HTMLElement.childNodes;
            } else {
                nodes = childs;
            }
            nodes.forEach(node => {
                if (node.nodeType === core.types.XMLNODETYPES.ELEMENT_NODE && isHtmlRenderer) {
                    dataClass = node.dataset.class;
                    dataName = node.dataset.name;
                } else {
                    dataClass = node.className;
                    dataName = node.name;
                }
                if (dataClass) {
                    props = {};
                    if (isHtmlRenderer) {
                        if (node.nodeType === core.types.XMLNODETYPES.ELEMENT_NODE) {
                            const properties = node.querySelector(`[id='${node.id}']> properties:first-child`);
                            properties && (props = JSON.parse(properties.innerText));
                        }
                    } else {
                        props = node.properties;
                    }
                    if ((classes[dataClass] === WindowTitleBar) ||
                        (classes[dataClass] === WindowContent) ||
                        (core.classes.StatusBar && classes[dataClass] === core.classes.StatusBar) ||
                        (core.classes.ToolBar && classes[dataClass] === core.classes.ToolBar)) {
                        props.inForm = !1;
                    }
                    const obj = classes.createComponent({
                        class: classes[dataClass],
                        owner: layout,
                        name: dataName,
                        props: props,
                        internalId: node.id,
                        withTpl: !1
                    });
                    switch (dataClass) {
                        case 'WindowTitleBar': {
                            priv.titleBar = obj;
                            const titleBar = priv.titleBar;
                            if (this.isBorderNone) {
                                isHtmlRenderer
                                    ? titleBar.display = core.types.DISPLAYS.NONE
                                    : titleBar.visible = !1;
                                titleBar.inForm = !1;
                            } else if (!isHtmlRenderer && theme.WindowTitleBar && theme.WindowTitleBar.height) {
                                titleBar.height = theme.WindowTitleBar.height;
                            } else {
                                titleBar.height = Window.TITLEBARHEIGHT;
                            }
                            titleBar.align = core.types.ALIGNS.TOP;
                            break;
                        }
                        case 'WindowContent': {
                            priv.content = obj;
                            const content = priv.content;
                            content.inForm = !1;
                            content.mouseEvents.all = !1;
                            content.mouseEvents.mousedown = !0;
                            content.align = core.types.ALIGNS.CLIENT;
                            break;
                        }
                        case 'MainMenu':
                            priv.mainMenu = obj;
                            break;
                        case 'ToolBar':
                        case 'ToolBarContainer':
                            priv.toolBars.push(obj);
                            break;
                        case 'StatusBar':
                            priv.statusBars.push(obj);
                            break;
                    }
                    !isHtmlRenderer && obj.getChilds(node.childs);
                }
            });
        }
        //#endregion getChilds
        //#region formCreated
        formCreated(id) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.isHTMLRenderer) {
                this.getHTMLElement(id);
                this.getChilds();
                this.addListeners && this.addListeners();
                if (priv.isChildWindow) {
                    priv.parentHTML.appendChild(this.HTMLElement);
                    this.maximize();
                    this.desactiveHitTest();
                }
                this.HTMLResize();
            } else {
                this.getChilds(id);
            }
        }
        //#endregion formCreated
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const themeName = this.app.themeManifest.themeName;
            const theme = core.themes[themeName];
            const isHtmlRenderer = core.isHTMLRenderer;
            const layoutMargin = priv.layout.margin;
            const contentMargin = priv.content.margin;
            const TITLEBUTTONS = Window.TITLEBUTTONS;
            let margin = null;
            //#endregion Variables déclaration
            if (!isHtmlRenderer) {
                layoutMargin.offset(Window.SIZEABLEBORDERSIZE, Window.SIZEABLEBORDERSIZE);
                if (theme.WindowLayout) {
                    if (theme.WindowLayout.margin) {
                        const layoutTheme = theme.WindowLayout;
                        if (core.tools.isNumber(layoutTheme.margin)) {
                            margin = layoutTheme.margin;
                            layoutMargin.setValues(margin, margin, margin, margin);
                        } else if (core.tools.isObject(layoutTheme.margin)) {
                            margin = layoutTheme.margin;
                            layoutMargin.setValues(margin.left, margin.top, margin.right, margin.bottom);
                        }
                    }
                    theme.WindowLayout.hasOwnProperty('clipped') && (priv.layout.clipped = theme.WindowLayout.clipped);
                }
                if (theme.WindowContent) {
                    if (theme.WindowContent.margin) {
                        let contentTheme = theme.WindowContent;
                        if (core.tools.isNumber(contentTheme.margin)) {
                            margin = contentTheme.margin;
                            contentMargin.setValues(margin, margin, margin, margin);
                        } else if (core.tools.isObject(contentTheme.margin)) {
                            margin = contentTheme.margin;
                            contentMargin.setValues(margin.left, margin.top, margin.right, margin.bottom);
                        }
                    }
                    theme.WindowContent.hasOwnProperty('clipped') && (priv.content.clipped = theme.WindowContent.clipped);
                }
                theme.Window.hasOwnProperty('clipped') && (this.clipped = theme.Window.clipped);
                theme.WindowTitleBar && theme.WindowTitleBar.hasOwnProperty('clipped')
                    && (priv.titleBar.clipped = theme.WindowTitleBar.clipped);
            }
            this.realignChilds();
            super.loaded();
            priv.creating = !1;
            const comp = priv.content.components.find(component => {
                if (component instanceof core.classes.Control && component.visible && component.canFocused
                    && component.isEnabled) {
                    return component;
                }
            });
            comp && comp.setFocus();
            !isHtmlRenderer && this.alignButtons();
            if (this.isBorderDialog) {

            }
            this.setTitleBtn(priv.buttons ? priv.buttons : [TITLEBUTTONS.MINIMIZE, TITLEBUTTONS.MAXRESTORE]);
            delete priv.props;
        }
        //#endregion loaded
        //#region closePopups
        closePopups() {
            //#region Variables déclaration
            const priv = internal(this);
            const popups = priv.popups;
            const mainMenu = priv.mainMenu;
            const classes = core.classes;
            //#endregion Variables déclaration
            if (popups) {
                if (popups.length > 0) {
                    popups.reverse().forEach((popup, i) => {
                        const refControl = popup.refControl;
                        if (classes.MenuItem && refControl instanceof classes.MenuItem) {
                            refControl.closeSubMenu();
                        } else if (refControl) {
                            if (classes.PopupBox && refControl.dropDownPopup instanceof classes.PopupBox) {
                                refControl.destroyPopup();
                                popup.refControl = null;
                            }
                        }
                        if (popup) {
                            classes.PopupMenu && popup.owner instanceof classes.PopupMenu && popup.owner.close();
                            popups[i] = null;
                        }
                    });
                }
                popups.clear();
            }
            if (mainMenu) {
                mainMenu.items.forEach(item => {
                    item.setActive(!1);
                });
                //Css.removeClass(this.mainMenu.HTMLElement,"isactive
                //this.mainMenu.HTMLElement.dataset.isactive = !1;
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
            const isHtmlRenderer = core.isHTMLRenderer;
            const width = isHtmlRenderer ? htmlElement.offsetWidth : this.width;
            const height = isHtmlRenderer ? htmlElement.offsetHeight : this.height;
            const PX = core.types.CSSUNITS.PX;
            //#endregion Variables déclaration
            if (core.tools.isNumber(x) && core.tools.isNumber(y)) {
                x + width < 0 && (x = 0);
                y + height < 0 && (y = 0);
                x > body.offsetWidth && (x = body.offsetWidth - width);
                y > body.offsetHeight && (y = body.offsetHeight - height - 10);
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
            const htmlParentElement = core.tools.HTMLParentElement;
            const htmlElement = this.HTMLElement;
            const body = document.body;
            const htmlElementStyle = this.HTMLElementStyle;
            const PX = core.types.CSSUNITS.PX;
            const isHtmlRenderer = core.isHTMLRenderer;
            //#endregion Variables déclaration
            if (htmlParentElement) {
                l = int((htmlParentElement.offsetWidth - (isHtmlRenderer ? htmlElement.offsetWidth : this.width)) / 2);
                t = int((htmlParentElement.offsetHeight - (isHtmlRenderer ? htmlElement.offsetHeight : this.height)) / 2);
            } else {
                l = int((body.offsetWidth - (isHtmlRenderer ? htmlElement.offsetWidth : this.width)) / 2);
                t = int((body.offsetHeight - (isHtmlRenderer ? htmlElement.offsetHeight : this.height)) / 2);
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
            let snapArea = document.getElementById('snapArea');
            //#endregion Variables déclaration
            if (!snapArea) {
                snapArea = document.createElement('div');
                snapArea.id = 'snapArea';
                document.body.appendChild(snapArea);
            } else {
                snapArea.className = String.EMPTY;
            }
            const snapAreaStyle = snapArea.style;
            snapAreaStyle.zIndex = core.isHTMLRenderer ? int(this.HTMLElementStyle.zIndex) - 1 : 0;
            priv.snapArea = _snapArea;
            switch (_snapArea) {
                case SNAPAREAS.TOP:
                    break;
                case SNAPAREAS.LEFT:
                    snapAreaStyle.left = '0';
                    snapAreaStyle.top = '50%';
                    snapAreaStyle.right = '100%';
                    snapAreaStyle.bottom = '50%';
                    break;
                case SNAPAREAS.RIGHT:
                    snapAreaStyle.left = '100%';
                    snapAreaStyle.top = '50%';
                    snapAreaStyle.right = '0';
                    snapAreaStyle.bottom = '50%';
                    break;
            }
            setTimeout(() => {
                //#region Variables déclaration
                const sa = document.getElementById('snapArea');
                //#endregion Variables déclaration
                sa.classList.add(core.apps.activeApplication.activeWindow.snapArea);
            }, 0);
        }
        //#endregion createSnapArea
        //#region destroySnapArea
        destroySnapArea() {
            //#region Variables déclaration
            const snapArea = document.getElementById('snapArea');
            //#endregion Variables déclaration
            snapArea && document.body.removeChild(snapArea);
        }
        //#endregion destroySnapArea
        //#region restoreWindow
        restoreWindow() {
            //#region Variables déclaration
            const priv = internal(this);
            const PX = core.types.CSSUNITS.PX;
            const WINDOWSTATES = Window.WINDOWSTATES;
            const savedSizePosState = priv.savedSizePosState;
            const htmlElement = this.HTMLElement;
            const htmlElementStyle = this.HTMLElementStyle;
            const isHtmlRenderer = core.isHTMLRenderer;
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
                priv.enabledShadow = !0;
                // on désactive les autres boutons
                maxRestoreBtn.enabled = !0;
                rollUpDownBtn.enabled = !0;
                stayOnOffBtn.enabled = !0;
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
            const scripts = Convert.nodeListToArray(head.getElementsByTagName('script'));
            //#endregion Variables déclaration
            this.closePopups();
            priv.isModal && isHtmlRenderer && priv.parentHTML.removeChild(this.HTMLElement);
            scripts.forEach(script => {
                script.src.indexOf(className.toLowerCase()) > -1 && head.removeChild(script);
            });
            const styles = Convert.nodeListToArray(head.getElementsByTagName('link'));
            styles.forEach(style => {
                style.href.indexOf(className.toLowerCase()) > -1 && head.removeChild(style);
            });
            if (windows.last === this && windows.length === 1) {
                app.terminate();
                return;
            }
            app.windows.remove(this);
            priv.popups.destroy();
            priv.toolBars.destroy();
            priv.statusBars.destroy();
            priv.resizeMode = null;
            priv.savedSizePosState = null;
            priv.isModal = null;
            priv.creating = null;
            priv.layout = null;
            priv.titleBar = null;
            priv.content = null;
            priv.titleBarObj = null;
            priv.firstShow = null;
            priv.controlsToResize.clear();
            priv.controlsToResize.destroy();
            priv.controlsToResize = null;
            priv.focusedControl = null;
            priv.hoveredControl = null;
            priv.capturedControl = null;
            priv.lastSelectedMenuItem = null;
            priv.popups.clear();
            priv.popups = null;
            priv.toolBars.clear();
            priv.toolBars.destroy();
            priv.toolBars = null;
            priv.statusBars.clear();
            priv.statusBars.destroy();
            priv.statusBars = null;
            priv.isResizing = null;
            priv.snapArea = null;
            priv.destroyOnHide = null;
            priv.controls.clear();
            priv.controls.destroy();
            priv.controls = null;
            priv.isChildWindow = null;
            priv.parentHTML = null;
            priv.lastZIndex = null;
            priv.animated = null;
            priv.keyPreview = null;
            priv.icon = null;
            priv.mainMenu = null;
            priv.activeControl = null;
            priv.canClose = null;
            priv.moveable = null;
            priv.stayOn = null;
            priv.enabledShadow = null;
            //priv.minimizeAnimation = new RectAnimation(this, { inForm: !1 });
            priv.position = null;
            priv.buttons = null;
            priv.position = null;
            priv.windowState = null;
            priv.borderStyle = null;
            priv.bordersType = null;
            priv.modalResult = null;
            priv.showingMode = null;

            //priv.minimizeAnimation.destroy();
            this.unBindAndDestroyEvents(['onActivate', 'onDeactivate', 'onHide', 'onShow', 'onCreate', 'onClose', 'onCloseQuery', 'onThemeChanged']);
            super.destroy();
        }
        //#endregion destroy
        //#region desactiveHitTest
        desactiveHitTest() {
            //#region Variables declaration
            const priv = internal(this);
            //#endregion Variables declaration
            priv.content.mouseEvents.all = !1;
            priv.layout.mouseEvents.all = !1;
            priv.titleBar.mouseEvents.all = !1;
            core.isHTMLRenderer && this.HTMLElement.classList.add('inactive');
            //this.HTMLElement.dataset.isactive = !1;
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
            const isHtmlRenderer = core.isHTMLRenderer;
            const cw = !isHtmlRenderer ? core.canvas.offsetWidth : 0;
            const cw2 = !isHtmlRenderer ? int(core.canvas.offsetWidth / 2) : 0;
            const ch = !isHtmlRenderer ? core.canvas.offsetHeight : 0;
            const titleBar = priv.titleBar;
            const rollUpDownBtn = titleBar.rollUpDownBtn;
            const stayOnOffBtn = titleBar.stayOnOffBtn;
            const maxRestoreBtn = titleBar.maxRestoreBtn;
            const SNAPED = WINDOWSTATES.SNAPED;
            const snapArea = priv.snapArea;
            //#endregion Variables déclaration
            priv.windowState = SNAPED;
            !isHtmlRenderer && this.beginUpdate();
            if (snapArea !== SNAPAREAS.NONE) {
                // change maxRestore button to restore
                priv.enabledShadow = !1;
                // on désactive les autres boutons
                maxRestoreBtn.enabled = !0;
                rollUpDownBtn.enabled = !1;
                stayOnOffBtn.enabled = !1;
            }
            switch (snapArea) {
                case SNAPAREAS.LEFT:
                    if (isHtmlRenderer) {
                        htmlElementStyle.left = 0;
                        htmlElementStyle.top = 0;
                        htmlElementStyle.width = '50%';
                        htmlElementStyle.bottom = 0;
                        htmlElementStyle.height = 'auto';
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
                        htmlElementStyle.width = 'auto';
                        htmlElementStyle.height = 'auto';
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
                        htmlElementStyle.width = '50%';
                        htmlElementStyle.bottom = 0;
                        htmlElementStyle.left = 'auto';
                        htmlElementStyle.height = 'auto';
                        savedSizePosState.left = htmlElement.offsetLeft;
                    } else {
                        this.left = cw2;
                        this.top = 0;
                        this.width = cw2;
                        this.height = ch;
                    }
                    break;
            }
            !isHtmlRenderer && this.endUpdate();
            this.destroySnapArea();
        }
        //#endregion applySnap
        //#region render
        render() {
            super.render('Window');
        }
        //#endregion render
        //#endregion
    }
    return BaseWindow;
    //#endregion Class BaseWindow
})();
//#endregion BaseWindow
//#region Window constants
//#region HELPTYPES
/**
 * @type    {Object}        HELPTYPES
 */
const HELPTYPES = Object.freeze(Object.seal({
    KEYWORD: 'keyword',
    CONTEXT: 'context'
}));
//#endregion HELPTYPES
//#region TITLEBUTTONS
/**
 * @type    {Object}        TITLEBUTTONS
 */
const TITLEBUTTONS = Object.freeze(Object.seal({
    CLOSE: 'close',
    MAXRESTORE: 'maxRestore',
    MINIMIZE: 'minimize',
    HELP: 'help',
    ROLLUPDOWN: 'rollUpDown',
    STAYONOFF: 'stayOnOff'
}));
//#endregion TITLEBUTTONS
//#region FORMSTATES
/**
 * @type    {Object}        FORMSTATES
 */
const FORMSTATES = Object.freeze(Object.seal({
    CREATING: 'creating',
    VISIBLE: 'visible',
    SHOWING: 'showing',
    MODAL: 'modal',
    ACTIVATED: 'activated'
}));
//#endregion FORMSTATES
//#region WINDOWSTATES
/**
 * @type    {Object}        WINDOWSTATES
 */
const WINDOWSTATES = Object.freeze(Object.seal({
    NONE: 'none',
    NORMAL: 'normal',
    MINIMIZED: 'minimized',
    MAXIMIZED: 'maximized',
    ROLLEDUP: 'rolledup',
    SNAPED: 'snaped'
}));
//#endregion WINDOWSTATES
//#region MODALRESULTBUTTONS
/**
 * @type    {Object}        MODALRESULTBUTTONS
 */
const MODALRESULTBUTTONS = Object.freeze(Object.seal({
    NONE: 'none',
    OK: 'ok',
    CANCEL: 'cancel',
    ABORT: 'abort',
    RETRY: 'retry',
    IGNORE: 'ignore',
    YES: 'yes',
    NO: 'no',
    ALL: 'all',
    NOTOALL: 'noToAll',
    YESTOALL: 'yesToAll',
    CLOSE: 'close'
}));
//#endregion MODALRESULTBUTTONS
//#region MODALRESULTS
/**
 * @type    {Object}        MODALRESULTS
 */
const MODALRESULTS = Object.freeze(Object.seal({
    NONE: 'none',
    OK: 'ok',
    CANCEL: 'cancel',
    ABORT: 'abort',
    RETRY: 'retry',
    IGNORE: 'ignore',
    YES: 'yes',
    NO: 'no',
    ALL: 'all',
    NOTOALL: 'noToAll',
    YESTOALL: 'yesToAll',
    HELP: 'help'
}));
//#endregion MODALRESULTS
//#region FORMPOSITIONS
/**
 * @type    {Object}        FORMPOSITIONS
 */
const FORMPOSITIONS = Object.freeze(Object.seal({
    DEFAULT: 'default',
    DESIGNED: 'designed',
    MAINFORMCENTER: 'mainFormCenter',
    SCREENCENTER: 'screenCenter'
}));
//#endregion FORMPOSITIONS
//#region BORDERSTYLES
/**
 * @type    {Object}        BORDERSTYLES
 */
const BORDERSTYLES = Object.freeze(Object.seal({
    DIALOG: 'dialog',
    NONE: 'none',
    SINGLE: 'single',
    SIZEABLE: 'sizeable'/*,
    SIZETOOLWIN: 'sizeToolWin',
    TOOLWINDOW: 'toolWindow'*/
}));
//#endregion BORDERSTYLES
//#region RESIZEMODES
/**
 * @type    {Object}        RESIZEMODES
 */
const RESIZEMODES = Object.freeze(Object.seal({
    NONE: String.EMPTY,
    LEFT: 'left',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    TOPLEFT: 'topLeft',
    TOPRIGHT: 'topRight',
    BOTTOMRIGHT: 'bottomRight',
    BOTTOMLEFT: 'bottomLeft'
}));
//#endregion RESIZEMODES
//#region SNAPAREAS
/**
 * @type    {Object}        SNAPAREAS
 */
const SNAPAREAS = Object.freeze(Object.seal({
    NONE: 'none',
    LEFT: 'left',
    TOP: 'top',
    RIGHT: 'right'
}));
//#endregion SNAPAREAS
//#region SHOWINGMODES
/**
 * @type    {Object}        SHOWINGMODES
 */
const SHOWINGMODES = Object.freeze(Object.seal({
    NORMAL: 'normal',
    MODAL: 'modal'
}));
//#endregion SHOWINGMODES
//#region BORDERSTYPES
/**
 * @type    {Object}        BORDERSTYPES
 */
const BORDERSTYPES = Object.freeze(Object.seal({
    NONE: 'none',
    SNAP: 'snap',
    MAGNETIC: 'magnetic'
}));
//#endregion BORDERSTYPES
//#endregion
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
        return HELPTYPES;
    }
    //#endregion
    //#region TITLEBUTTONS
    /**
     * @type    {Object}        TITLEBUTTONS
     */
    static get TITLEBUTTONS() {
        return TITLEBUTTONS;
    }
    //#endregion
    //#region FORMSTATES
    /**
     * @type    {Object}        FORMSTATES
     */
    static get FORMSTATES() {
        return FORMSTATES;
    }
    //#endregion
    //#region WINDOWSTATES
    /**
     * @type    {Object}        WINDOWSTATES
     */
    static get WINDOWSTATES() {
        return WINDOWSTATES;
    }
    //#endregion
    //#region MODALRESULTBUTTONS
    /**
     * @type    {Object}        MODALRESULTBUTTONS
     */
    static get MODALRESULTBUTTONS() {
        return MODALRESULTBUTTONS;
    }
    //#endregion
    //#region MODALRESULTS
    /**
     * @type    {Object}        MODALRESULTS
     */
    static get MODALRESULTS() {
        return MODALRESULTS;
    }
    //#endregion
    //#region FORMPOSITIONS
    /**
     * @type    {Object}        FORMPOSITIONS
     */
    static get FORMPOSITIONS() {
        return FORMPOSITIONS;
    }
    //#endregion
    //#region BORDERSTYLES
    /**
     * @type    {Object}        BORDERSTYLES
     */
    static get BORDERSTYLES() {
        return BORDERSTYLES;
    }
    //#endregion
    //#region RESIZEMODES
    /**
     * @type    {Object}        RESIZEMODES
     */
    static get RESIZEMODES() {
        return RESIZEMODES;
    }
    //#endregion
    //#region SNAPAREAS
    /**
     * @type    {Object}        SNAPAREAS
     */
    static get SNAPAREAS() {
        return SNAPAREAS;
    }
    //#endregion
    //#region BORDERSTYPES
    /**
     * @type    {Object}        BORDERSTYPES
     */
    static get BORDERSTYPES() {
        return BORDERSTYPES;
    }
    //#endregion
    //#region SHOWINGMODES
    /**
     * @type    {Object}        SHOWINGMODES
     */
    static get SHOWINGMODES() {
        return SHOWINGMODES;
    }
    //#endregion
    //#endregion Static
}
//#endregion
core.classes.register(core.types.CATEGORIES.CONTAINERS, Window);
core.classes.register(core.types.INTERNALCATEGORIES.INTERNAL, WindowTitleBar, WindowContent, BaseWindow);
//#region Templates
const WindowTitleBarTpl = ['<jagui-windowtitlebar id="{internalId_TitleBar}" data-class="WindowTitleBar" class="Control WindowTitleBar {theme}">',
    '<jagui-windowtitle id="_oNun98l0" data-class="WindowTitle" class="WindowTitle {theme}">{title}</jagui-windowtitle>',
    '<jagui-windowstayonoffbutton id="{internalId_StayOnOffButton}" data-class="WindowStayOnOffButton" class="Control Button WindowTitleButton WindowStayOnOffButton {theme}"></jagui-windowstayonoffbutton>',
    '<jagui-windowrollupdownbutton id="{internalId_RollUpDownButton}"" data-class="WindowRollUpDownButton" class="Control Button WindowTitleButton WindowRollUpDownButton {theme}"></jagui-windowrollupdownbutton>',
    '<jagui-windowhelpbutton id="{internalId_HelpButton}" data-class="WindowHelpButton" class="Control Button WindowTitleButton WindowHelpButton {theme}"></jagui-windowhelpbutton>',
    '<jagui-windowminimizebutton id="{internalId_MinimizeButton}" data-class="WindowMinimizeButton" class="Control Button WindowTitleButton WindowMinimizeButton {theme}"></jagui-windowminimizebutton>',
    '<jagui-windowmaxrestorebutton id="{internalId_MaxRestoreButton}"" data-class="WindowMaxRestoreButton" class="Control Button WindowTitleButton WindowMaxRestoreButton {theme}"></jagui-windowmaxrestorebutton>',
    '<jagui-windowclosebutton id="{internalId_CloseButton}" data-class="WindowCloseButton" class="Control Button WindowTitleButton WindowCloseButton {theme}"></jagui-windowclosebutton>',
    '</jagui-windowtitlebar>'].join(String.EMPTY);
const WindowTpl = ['<jagui-window id="{internalId}" data-class="Window" class="Control Window {theme} {appName}"><jagui-windowlayout id="{internalId_Layout}" data-class="Layout" ',
    `class="Control Layout WindowLayout {theme}">${WindowTitleBarTpl}<jagui-windowcontent id="{internalId_content}" data-class="WindowContent" class="Control WindowContent {theme}">{content}</jagui-windowcontent>`,
    '</jagui-windowlayout></jagui-window>'].join(String.EMPTY);
core.classes.registerTemplates([{ Class: Window, template: WindowTpl }, { Class: WindowTitleBar, template: WindowTitleBarTpl }]);
//#endregion Templates
export { Window };