define(['geometry', 'browser'], function (Geometry, Browser) {
    //#region ALIGNS
    const ALIGNS = {
        NONE: "none",
        MOSTTOP: "mostTop",
        MOSTBOTTOM: "mostBottom",
        MOSTLEFT: "mostLeft",
        MOSTRIGHT: "mostRight",
        TOP: "top",
        BOTTOM: "bottom",
        LEFT: "left",
        RIGHT: "right",
        CLIENT: "client",
        HORIZONTAL: "horizontal",
        VERTICAL: "vertical",
        CONTENTS: "contents",
        CENTER: "center",
        HORZCENTER: "horzCenter",
        VERTCENTER: "vertCenter",
        SCALE: "scale",
        FIT: "fit",
        FITLEFT: "fitLeft",
        FITRIGHT: "fitRight"
        //TOPRIGHT:"topRight",
        //BOTTOMLEFT:"bottomLeft",
        //BOTTOMRIGHT:"bottomRight",
        //TOPLEFT:"topLeft"
    };
    Object.freeze(ALIGNS);
    //#endregion
    //#region DRAGMODES
    const DRAGMODES = {
        MANUAL: "manual",
        AUTOMATIC: "automatic"
    };
    Object.freeze(DRAGMODES);
    //#endregion
    //#region INTERPOLATIONTYPES
    const INTERPOLATIONTYPES = {
        BACK: "back",
        BOUNCE: "bounce",
        CIRCULAR: "circular",
        CUBIC: "cubic",
        ELASTIC: "elastic",
        EXPONENTIAL: "exponential",
        LINEAR: "linear",
        QUADRATIC: "quadratic",
        QUARTIC: "quartic",
        QUINTIC: "quintic",
        SINUSOIDAL: "sinusoidal"
    };
    Object.freeze(INTERPOLATIONTYPES);
    //#endregion
    //#region ANIMATIONTYPES
    const ANIMATIONTYPES = {
        IN: "in",
        INOUT: "inOut",
        OUT: "out"
    };
    Object.freeze(ANIMATIONTYPES);
    //#endregion
    //#region PATHPOINTKINDS
    const PATHPOINTKINDS = {
        MOVETO: "moveTo",
        LINETO: "lineTo",
        CURVETO: "curveTo",
        CLOSE: "close"
    };
    Object.freeze(PATHPOINTKINDS);
    //#endregion
    //#region PATHWRAPS
    const PATHWRAPS = {
        ORIGINAL: "original",
        FIT: "fit",
        STRETCH: "stretch",
        TILE: "tile"
    };
    Object.freeze(PATHWRAPS);
    //#endregion
    //#region TEXTALIGNS
    const TEXTALIGNS = {
        CENTER: "center",
        LEFT: "left",
        RIGHT: "right"
    };
    Object.freeze(TEXTALIGNS);
    //#endregion
    //#region VERTTEXTALIGNS
    const VERTTEXTALIGNS = {
        TOP: "top",
        MIDDLE: "middle",
        BOTTOM: "bottom"
    };
    Object.freeze(VERTTEXTALIGNS);
    //#endregion
    //#region WRAPMODES
    const WRAPMODES = {
        TILE: "tile",
        TILEORIGINAL: "tileOriginal",
        TILESTRETCH: "tileStretch"
    };
    Object.freeze(WRAPMODES);
    //#endregion
    //#region ORIENTATIONS
    const ORIENTATIONS = {
        HORIZONTAL: "horizontal",
        VERTICAL: "vertical"
    };
    Object.freeze(ORIENTATIONS);
    //#endregion
    //#region MESSAGETYPES
    const MESSAGETYPES = {
        WARNING: "warning",
        ERROR: "error",
        INFORMATION: "information",
        CONFIRMATION: "confirmation",
        CUSTOM: "custom"
    };
    Object.freeze(MESSAGETYPES);
    //#endregion
    //#region MESSAGEBUTTONS
    const MESSAGEBUTTONS = {
        YES: "yes",
        NO: "no",
        OK: "ok",
        CANCEL: "cancel",
        ABORT: "abort",
        RETRY: "retry",
        IGNORE: "ignore",
        ALL: "all",
        NOTOALL: "noToAll",
        YESTOALL: "yesToAll",
        HELP: "help"
    };
    Object.freeze(MESSAGEBUTTONS);
    //#endregion
    //#region CONSTANTS
    const CONSTANTS = {
        _2PI: Math.PI * 2,
        INV180: 1 / 180,
        INV360: 1 / 360,
        EPSILON: 1e-40,
        GRIPSIZE: 3,
        ROTSIZE: 10,
        IDENTITYMATRIX: new Geometry.Matrix(new Geometry.Vector(1, 0, 0), new Geometry.Vector(0, 1, 0), new Geometry.Vector(0, 0, 1)),
        ZEROMATRIX: new Geometry.Matrix,
        //#region CLOSEPOLYGON
        CLOSEPOLYGON: {
            x: 0xFFFF,
            y: 0xFFFF
        },
        //#endregion
        FUNCTION: "function",
        OBJECT: "object",
        NUMBER: "number",
        BOOLEAN: "boolean",
        STRING: "string",
        ARRAY: "array",
        DATE: "date",
        INTEGER: "integer",
        UNDEFINED: "undefined",
        COLORPICKSIZE: 10,
        WINDOWSIZEABLEBORDERSIZE: 5,
        WINDOWCORNERSIZE: 10,
        WINDOWMINWIDTH: 130,
        WINDOWMINHEIGHT: 40,
        MAGNETICSIZE: 10,
        SNAPAREADISTANCE: 20,
        STAYONTOP: 999999999,
        LINECAPTION: "-",
        HOTKEYPREFIX: "&",
        PIX: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==",
        BTNS_ALL: [MESSAGEBUTTONS.YES, MESSAGEBUTTONS.NO, MESSAGEBUTTONS.OK, MESSAGEBUTTONS.CANCEL, MESSAGEBUTTONS.ABORT, MESSAGEBUTTONS.RETRY, MESSAGEBUTTONS.IGNORE, MESSAGEBUTTONS.ALL, MESSAGEBUTTONS.NOTOALL, MESSAGEBUTTONS.YESTOALL, MESSAGEBUTTONS.HELP],
        BTNS_YESNO: [MESSAGEBUTTONS.YES, MESSAGEBUTTONS.NO],
        BTNS_YESNOCANCEL: [MESSAGEBUTTONS.YES, MESSAGEBUTTONS.NO, MESSAGEBUTTONS.CANCEL],
        BTNS_YESALLNOALLCANCEL: [MESSAGEBUTTONS.YES, MESSAGEBUTTONS.YESTOALL, MESSAGEBUTTONS.NO, MESSAGEBUTTONS.NOTOALL, MESSAGEBUTTONS.CANCEL],
        BTNS_OKCANCEL: [MESSAGEBUTTONS.OK, MESSAGEBUTTONS.CANCEL],
        BTNS_ABORTRETRYIGNORE: [MESSAGEBUTTONS.ABORT, MESSAGEBUTTONS.RETRY, MESSAGEBUTTONS.IGNORE],
        BTNS_ABORTIGNORE: [MESSAGEBUTTONS.ABORT, MESSAGEBUTTONS.IGNORE],
        WARNING_CSS: "warning",
        ERROR_CSS: "error",
        INFORMATION_CSS: "information",
        CONFIRMATION_CSS: "confirmation",
        CHANNELMAP: { R: 0, G: 1, B: 2, A: 3 },
        PSEUDOCLASSBEFORE: Browser.webkit ? ":" : ""
    };
    //Object.freeze(CONSTANTS.CLOSEPOLYGON);
    Object.freeze(CONSTANTS);
    //#endregion
    //#region CURSORS
    const CURSORS = {
        ALIAS: "alias",
        ALLSCROLL: "all-scroll",
        AUTO: "auto",
        CELL: "cell",
        COLRESIZE: "col-resize",
        COPY: "copy",
        CROSSHAIR: "crosshair",
        DEFAULT: "default",
        ERESIZE: "e-resize",
        EWRESIZE: "ew-resize",
        HELP: "help",
        MOVE: "move",
        NRESIZE: "n-resize",
        NSRESIZE: "ns-resize",
        NWRESIZE: "nw-resize",
        NWSERESIZE: "nwse-resize",
        NODROP: "no-drop",
        NONE: "none",
        NOTALLOWED: "not-allowed",
        POINTER: "pointer",
        PROGRESS: "progress",
        ROWRESIZE: "row-resize",
        SRESIZE: "s-resize",
        SERESIZE: "se-resize",
        SWRESIZE: "sw-resize",
        TEXT: "text",
        VERTICALTEXT: "vertical-text",
        WRESIZE: "w-resize",
        WAIT: "wait",
        ZOOMIN: "zoom-in",
        ZOOMOUT: "zoom-out",
        INITIAL: "initial"
    };
    Object.freeze(CURSORS);
    const CUSTOMCURSORS = {
        ALIAS: "csr_alias",
        ALLSCROLL: "csr_allScroll",
        AUTO: "csr_auto",
        CELL: "csr_cell",
        COLRESIZE: "csr_colResize",
        COPY: "csr_copy",
        CROSSHAIR: "csr_crosshair",
        DEFAULT: "csr_default",
        ERESIZE: "csr_eResize",
        EWRESIZE: "csr_ewResize",
        HELP: "csr_help",
        MOVE: "csr_move",
        NRESIZE: "csr_nResize",
        NSRESIZE: "csr_nsResize",
        NWRESIZE: "csr_nwResize",
        NWSERESIZE: "csr_nwseResize",
        NODROP: "csr_noDrop",
        NONE: "none",
        NOTALLOWED: "csr_notAllowed",
        POINTER: "csr_pointer",
        PROGRESS: "csr_progress",
        ROWRESIZE: "csr_rowResize",
        SRESIZE: "csr_sResize",
        NERESIZE: "csr_neResize",
        NESWRESIZE: "csr_neswResize",
        SERESIZE: "csr_seResize",
        SWRESIZE: "csr_swResize",
        TEXT: "csr_text",
        VERTICALTEXT: "csr_verticalText",
        WRESIZE: "csr_wResize",
        WAIT: "csr_wait",
        ZOOMIN: "csr_zoomIn",
        ZOOMOUT: "csr_zoomOut",
        INITIAL: "csr_initial",
        ROTATE: "csr_rotate"
    };
    Object.freeze(CUSTOMCURSORS);
    //#endregion
    //#region HELPTYPES
    const HELPTYPES = {
        KEYWORD: "keyword",
        CONTEXT: "context"
    };
    Object.freeze(HELPTYPES);
    //#endregion
    //#region BRUSHSTYLES
    const BRUSHSTYLES = {
        NONE: "none",
        SOLID: "solid",
        GRADIENT: "gradient",
        BITMAP: "bitmap"
    };
    Object.freeze(BRUSHSTYLES);
    //#endregion
    //#region GRADIENTSTYLES
    const GRADIENTSTYLES = {
        LINEAR: "linear",
        RADIAL: "radial",
        CONIC: "conic"
    };
    Object.freeze(GRADIENTSTYLES);
    //#endregion
    //#region FONTSTYLES
    const FONTSTYLES = {
        NORMAL: "normal",
        BOLD: "bold",
        OBLIQUE: "OBLIQUE",
        BOLDITALIC: "bolditalic"
    };
    Object.freeze(FONTSTYLES);
    //#endregion
    //#region CALLOUTPOSITIONS
    const CALLOUTPOSITIONS = TRAPEZOIDORIENTATIONS = PARALLELOGRAMORIENTATIONS = {
        LEFT: "left",
        TOP: "top",
        RIGHT: "right",
        BOTTOM: "bottom"
    };
    Object.freeze(CALLOUTPOSITIONS);
    Object.freeze(TRAPEZOIDORIENTATIONS);
    Object.freeze(PARALLELOGRAMORIENTATIONS);
    //#endregion
    //#region ARROWORIENTATIONS
    const ARROWORIENTATIONS = {
        LEFT: "left",
        TOP: "top",
        RIGHT: "right",
        BOTTOM: "bottom",
        TOPLEFT: "topleft",
        TOPRIGHT: "topright",
        BOTTOMLEFT: "bottomleft",
        BOTTOMRIGHT: "bottomright"
    };
    Object.freeze(ARROWORIENTATIONS);
    //#endregion
    //#region BUTTONLAYOUTGLYPHS
    const BUTTONLAYOUTGLYPHS = {
        LEFT: "layoutLeft",
        RIGHT: "layoutRight",
        TOP: "layoutTop",
        BOTTOM: "layoutBottom",
        CENTER: "layoutCenter"
    };
    Object.freeze(BUTTONLAYOUTGLYPHS);
    //#endregion
    //#region XMLNODETYPES
    const XMLNODETYPES = {
        ELEMENT_NODE: 0x1,
        ATTRIBUTE_NODE: 0x2,
        TEXT_NODE: 0x3,
        CDATA_SECTION_NODE: 0x4,
        ENTITY_REFERENCE_NODE: 0x5,
        ENTITY_NODE: 0x6,
        PROCESSING_INSTRUCTION_NODE: 0x7,
        COMMENT_NODE: 0x8,
        DOCUMENT_NODE: 0x9,
        DOCUMENT_TYPE_NODE: 0xA,
        DOCUMENT_FRAGMENT_NODE: 0xB,
        NOTATION_NODE: 0xC
    };
    Object.freeze(XMLNODETYPES);
    //#endregion
    //#region LISTSTYLES
    const LISTSTYLES = {
        VERTICAL: "vertical",
        HORIZONTAL: "horizontal"
    };
    Object.freeze(LISTSTYLES);
    //#endregion
    //#region SVG
    const SVG = {
        XMLNS: "http://www.w3.org/2000/svg"
    };
    Object.freeze(SVG);
    //#endregion
    //#region SHAPES
    const SHAPES = {
        RECTANGLE: "rectangle",
        ELLIPSE: "ellipse",
        CIRCLE: "circle",
        ROUNDRECT: "roundRect",
        PIE: "pie",
        CALLOUT: "callout",
        ARC: "arc",
        CHORD: "chord",
        PATH: "path",
        LINE: "line",
        SCROLLARROWLEFT: "scrollArrowLeft",
        SCROLLARROWRIGHT: "scrollArrowRight",
        STAR: "star",
        TRAPEZOID: "trapezoid",
        PARALLELOGRAM: "parallelogram",
        NINJASTAR: "ninjaStar",
        REGULARPOLYGON: "regularPolygon"
    };
    Object.freeze(SHAPES);
    //#endregion
    //#region OPERATIONS
    const OPERATIONS = {
        INSERT: "insert",
        REMOVE: "remove"
    };
    Object.freeze(OPERATIONS);
    //#endregion
    //#region CSSSELECTORSFLAGS
    CSSSELECTORSFLAGS = {
        START: "start",
        EGAL: "egal",
        CONTAINS: "contains",
        ENDS: "ends"
    };
    Object.freeze(CSSSELECTORSFLAGS);
    //#endregion
    //#region HTMLELEMENTS
    const HTMLELEMENTS = {
        DIV: "div",
        IMG: "img",
        SPAN: "span",
        LABEL: "label",
        INPUT: "input",
        TEXTAREA: "textarea",
        HR: "hr",
        CANVAS: "canvas",
        BUTTON: "button",
        FIELDSET: "fieldset",
        LEGEND: "legend",
        LI: "li",
        UL: "ul",
        SVG: "svg",
        FORM: "form",
        H3: "h3",
        A: "a"
    };
    Object.freeze(HTMLELEMENTS);
    //#endregion
    //#region HTMLEVENTS
    const HTMLEVENTS = {
        LOAD: "load",
        ERROR: "error",
        CHANGE: "change",
        FOCUS: "focus",
        KILLFOCUS: "blur",
        KEYPRESS: "keypress",
        KEYDOWN: "keydown",
        KEYUP: "keyup",
        CLICK: "click",
        SCROLL: "scroll",
        INPUT: "input"
        /*,
    MOUSEMOVE:"mousemove",
    MOUSEDOWN:"mousedown",
    MOUSEUP:"mouseup"*/
    };
    Object.freeze(HTMLEVENTS);
    //#endregion
    //#region HTMLINPUTTYPES
    const HTMLINPUTTYPES = {
        TEXT: "text",
        PASSWORD: "password",
        COLOR: "color",
        DATE: "date",
        DATETIME: "datetime",
        DATETIMELOCAL: "datetime-local",
        EMAIL: "email",
        MONTH: "month",
        NUMBER: "number",
        RANGE: "range",
        SEARCH: "search",
        TEL: "tel",
        TIME: "time",
        URL: "url",
        WEEK: "week",
        RADIO: "radio",
        Checkbox: "checkbox",
        SUBMIT: "submit"
    };
    Object.freeze(HTMLINPUTTYPES);
    //#endregion
    //#region WORKERSTATUS
    const WORKERSTATUS = {
        START: "start",
        UPDATE: "update",
        END: "end"
    };
    Object.freeze(WORKERSTATUS);
    //#endregion
    //#region CONTROLPROPS
    const CONTROLPROPS = {
        ANCHOR: "anchor"
    };
    Object.freeze(CONTROLPROPS);
    //#endregion
    //#region ANCHORS
    const ANCHORS = {
        LEFT: "left",
        TOP: "top",
        RIGHT: "right",
        BOTTOM: "bottom"
    };
    Object.freeze(ANCHORS);
    //#endregion
    //#region PSEUDOCSSCLASS
    const PSEUDOCSSCLASS = {
        BEFORE: CONSTANTS.PSEUDOCLASSBEFORE + ":before",
        AFTER: CONSTANTS.PSEUDOCLASSBEFORE + ":after",
        HOVER: CONSTANTS.PSEUDOCLASSBEFORE + ":hover",
        HOVER_BEFORE: CONSTANTS.PSEUDOCLASSBEFORE + ":hover" + CONSTANTS.PSEUDOCLASSBEFORE + ":before",
        HOVER_AFTER: CONSTANTS.PSEUDOCLASSBEFORE + ":hover" + CONSTANTS.PSEUDOCLASSBEFORE + ":after",
        ACTIVE: CONSTANTS.PSEUDOCLASSBEFORE + ":active",
        ACTIVE_BEFORE: CONSTANTS.PSEUDOCLASSBEFORE + ":active" + CONSTANTS.PSEUDOCLASSBEFORE + ":before",
        ACTIVE_AFTER: CONSTANTS.PSEUDOCLASSBEFORE + ":active" + CONSTANTS.PSEUDOCLASSBEFORE + ":after"
    };
    Object.freeze(PSEUDOCSSCLASS);
    //#endregion
    //#region PROPSNEEDUPDATE
    const PROPSNEEDUPDATE = {
        WIDTH: "width",
        HEIGHT: "height",
        COLOR: "color",
        ANGLE: "angle",
        LEFT: "left",
        TOP: "top",
        ROTATEANGLE: "rotateAngle"
    };
    Object.freeze(PROPSNEEDUPDATE);
    //#endregion
    //#region STYLES
    const STYLES = {
        NONE: "none",
        NORMAL: "normal",
        HOVERED: "hovered",
        PRESSED: "pressed"
    };
    Object.freeze(STYLES);
    //#endregion
    //#region MESSAGES
    const MESSAGES = {
        RESIZE: "resize"
    };
    Object.freeze(MESSAGES);
    //#endregion
    //#region CATEGORIES
    const CATEGORIES = {
        CORE: "core",
        INTERNAL: "internal",
        COMMON: "common",
        CONTAINERS: "containers",
        EXTENDED: "extended",
        MENUS: "menus",
        TOOLBARS: "toolbars",
        ACTIONS: "actions",
        DIALOGS: "dialogs",
        COLOR: "color",
        DATA: "data",
        ANIMATIONS: "animations",
        SHAPES: "shapes",
        NONVISUAL: "nonvisual",
        EXTRAS: "extras",
        THEMES: "themes",
        GUITHEMES: "guithemes",
        BASECSSCOMPONENTS: "basecsscomponents",
        THEMESCSSCOMPONENTS: "themescsscomponents"
    };
    Object.freeze(CATEGORIES);
    //#endregion
    //#region INTERNALCATEGORIES
    const INTERNALCATEGORIES = {
        INTERNAL: "internal",
        CORE: "core",
        APPS: "apps",
        COMPONENTS: "components",
        LOCALES: "locales",
        THIRDPARTY: "thirdparty"
    };
    Object.freeze(INTERNALCATEGORIES);
    //#endregion
    //#region BITMAPREPEATMODES
    const BITMAPREPEATMODES = {
        NOREPEAT: "no-repeat",
        REPEAT: "repeat",
        REPEATX: "repeat-x",
        REPEATY: "repeat-y"
    };
    Object.freeze(BITMAPREPEATMODES);
    //#endregion
    //#region TEXTSELECTIONMOVES
    const TEXTSELECTIONMOVES = {
        FIRST: "first",
        PREV: "prev",
        NEXT: "next",
        LAST: "last",
        SELSTART: "selStart",
        PREV_ONE: "prevOne",
        NEXT_ONE: "nextOne",
        PREV_WORD: "prevWord",
        NEXT_WORD: "nextWord",
        MOVE_TO_COL: "moveToCol",
        UP: "up",
        DOWN: "down",
        TOP: "top",
        BOTTOM: "bottom",
        FIRST_TOP: "firstTop",
        LAST_BOTTOM: "lastBottom"
    };
    Object.freeze(TEXTSELECTIONMOVES);
    //#endregion
    //#region TITLEBUTTONS
    const TITLEBUTTONS = {
        CLOSE: "close",
        MINIMIZE: "minimize",
        MAXIMIZE: "maximize",
        HELP: "help",
        ROLLUP: "rollUp",
        STAYON: "stayOn"
    };
    Object.freeze(TITLEBUTTONS);
    //#endregion
    //#region FORMSTATES
    const FORMSTATES = {
        CREATING: "creating",
        VISIBLE: "visible",
        SHOWING: "showing",
        MODAL: "modal",
        ACTIVATED: "activated"
    };
    Object.freeze(FORMSTATES);
    //#endregion
    //#region WINDOWSTATES
    const WINDOWSTATES = {
        NORMAL: "windowState-normal",
        MINIMIZED: "windowState-minimized",
        MAXIMIZED: "windowState-maximized",
        ROLLEDUP: "windowState-rolledup",
        SNAPED: "windowState-snaped"
    };
    Object.freeze(WINDOWSTATES);
    //#endregion
    //#region MODALRESULTBUTTONS
    const MODALRESULTBUTTONS = {
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
    };
    Object.freeze(MODALRESULTBUTTONS);
    //#endregion
    //#region MODALRESULTS
    const MODALRESULTS = {
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
    };
    Object.freeze(MODALRESULTS);
    //#endregion
    //#region FORMPOSITIONS
    const FORMPOSITIONS = {
        DEFAULT: "default",
        DESIGNED: "designed",
        MAINFORMCENTER: "mainFormCenter",
        SCREENCENTER: "screenCenter"
    };
    Object.freeze(FORMPOSITIONS);
    //#endregion
    //#region BORDERSTYLES
    const BORDERSTYLES = {
        DIALOG: "borderStyle-dialog",
        NONE: "borderStyle-none",
        SINGLE: "borderStyle-single",
        SIZEABLE: "borderStyle-sizeable",
        SIZETOOLWIN: "borderStyle-sizeToolWin",
        TOOLWINDOW: "borderStyle-toolWindow"
    };
    Object.freeze(BORDERSTYLES);
    //#endregion
    //#region JSCSSPROPERTIES
    const JSCSSPROPERTIES = {
        LEFT: "left",
        TOP: "top",
        RIGHT: "right",
        BOTTOM: "bottom",
        DISPLAY: "display",
        WIDTH: "width",
        HEIGHT: "height",
        TRANSFORM: "transform",
        TRANSFORMORIGIN: "transformOrigin",
        PADDING: "padding",
        PADDINGLEFT: "paddingLeft",
        PADDINGTOP: "paddingTop",
        PADDINGRIGHT: "paddingRight",
        PADDINGBOTTOM: "paddingBottom",
        MARGIN: "margin",
        MARGINLEFT: "marginLeft",
        MARGINTOP: "marginLeft",
        MARGINRIGHT: "marginLeft",
        MARGINBOTTOM: "marginLeft",
        FONT: "font",
        FONTFAMILY: "fontFamily",
        FONTWEIGHT: "fontWeight",
        FONTSTYLE: "fontStyle",
        FONTSIZE: "fontSize",
        COLOR: "color",
        BACKGROUND: "background",
        BACKGROUNDCOLOR: "backgroundColor",
        BACKGROUNDREPEAT: "backgroundRepeat",
        BACKGROUNDATTACHMENT: "backgroundAttachment",
        BACKGROUNDIMAGE: "backgroundImage",
        BACKGROUNDSIZE: "backgroundSize",
        BACKGROUNDPOSITION: "backgroundPosition",
        TEXTALIGN: "textAlign",
        BORDER: "border",
        BORDERTOP: "borderTop",
        BORDERLEFT: "borderLeft",
        BORDERBOTTOM: "borderBottom",
        BORDERRIGHT: "borderRight",
        BORDERTOPWIDTH: "borderTopWidth",
        BORDERLEFTWIDTH: "borderLeftWidth",
        BORDERBOTTOMWIDTH: "borderBottomWidth",
        BORDERRIGHTWIDTH: "borderRightWidth",
        BORDERRADIUS: "borderRadius",
        MINWIDTH: "minWidth",
        MAXWIDTH: "maxWidth",
        MINHEIGHT: "minHeight",
        MAXHEIGHT: "maxHeight",
        TEXTSHADOW: "textShadow",
        BOXSHADOW: "boxShadow",
        OPACITY: "opacity",
        ZINDEX: "zIndex",
        LINEHEIGHT: "lineHeight",
        OVERFLOW: "overflow",
        ANIMATION: "animation",
        ANIMATIONSTATE: "animationPlayState",
        WHITESPACE: "whiteSpace",
        TEXTDECORATION: "textDecoration"
    };
    Object.freeze(JSCSSPROPERTIES);
    //#endregion
    //#region CSSPROPERTIES
    const CSSPROPERTIES = {
        LEFT: "left",
        TOP: "top",
        RIGHT: "right",
        BOTTOM: "bottom",
        DISPLAY: "display",
        WIDTH: "width",
        HEIGHT: "height",
        TRANSFORM: "transform",
        TRANSFORMORIGIN: "transform-origin",
        PADDING: "padding",
        MARGIN: "margin",
        FONT: "font",
        COLOR: "color",
        BACKGROUND: "background",
        BACKGROUNDCOLOR: "background-color",
        BACKGROUNDREPEAT: "background-repeat",
        BACKGROUNDATTACHMENT: "background-attachment",
        BACKGROUNDIMAGE: "background-image",
        BACKGROUNDSIZE: "background-size",
        BACKGROUNDPOSITION: "background-position",
        TEXTALIGN: "text-align",
        BORDER: "border",
        BORDERRADIUS: "border-radius",
        MINWIDTH: "min-width",
        MAXWIDTH: "max-width",
        MINHEIGHT: "min-height",
        MAXHEIGHT: "max-height",
        TEXTSHADOW: "text-shadow",
        BOXSHADOW: "box-shadow",
        OPACITY: "opacity",
        ZINDEX: "z-index",
        LINEHEIGHT: "line-height",
        OVERFLOW: "overflow",
        ANIMATION: "animation",
        ANIMATIONSTATE: "animation-play-state",
        WHITESPACE: "white-space",
        BORDERLEFTWIDTH: "border-left-width",
        BORDERRIGHTWIDTH: "border-right-width",
        BORDERTOPWIDTH: "border-top-width",
        BORDERBOTTOMWIDTH: "border-bottom-width",
        ROTATE: "rotate",
        SCALE: "scale",
        LINEARGRADIENT: "linear-gradient",
        POSITION: "position",
        PADDINGLEFT: "padding-left",
        PADDINGTOP: "padding-top",
        PADDINGRIGHT: "padding-right",
        PADDINGBOTTOM: "padding-bottom",
        MARGINLEFT: "margin-left",
        MARGINTOP: "margin-top",
        MARGINRIGHT: "margin-right",
        MARGINBOTTOM: "margin-bottom"
    };
    Object.freeze(CSSPROPERTIES);
    //#endregion
    //#region CSSVALUES
    const CSSVALUES = {
        VISIBLE: "visible",
        HIDDEN: "hidden",
        NONE: "none",
        INLINEBLOCK: "inline-block"
    };
    Object.freeze(CSSVALUES);
    //#endregion
    //#region IMAGEWRAPS
    const IMAGEWRAPS = {
        ORIGINAL: "original",
        FIT: "fit",
        STRETCH: "stretch",
        TILE: "tile"
    };
    Object.freeze(IMAGEWRAPS);
    //#endregion
    //#region CSSUNITS
    const CSSUNITS = {
        CM: "cm",
        EM: "em",
        IN: "in",
        MM: "mm",
        PC: "pc",
        PT: "pt",
        PO: "%",
        PX: "px",
        REM: "rem"
    };
    Object.freeze(CSSUNITS);
    //#endregion
    //#region ANIMATIONTRIGGERS
    const ANIMATIONTRIGGERS = {
        ISMOUSEOVER: "isMouseOver:true",
        ISNOTMOUSEOVER: "isMouseOver:false",
        ISFOCUSED: "isFocused:true",
        ISNOTFOCUSED: "isFocused:false",
        ISVISIBLE: "isVisible:true",
        ISNOTVISIBLE: "isVisible:false",
        ISDRAGOVER: "isDragOver:true",
        ISNOTDRAGOVER: "isDragOver:false",
        ISOPEN: "isOpen:true",
        ISNOTOPEN: "isOpen:false"
    };
    Object.freeze(ANIMATIONTRIGGERS);
    //#endregion
    //#region CSSRULETYPES
    const CSSRULETYPES = {
        UNKNOWN_RULE: 0,
        STYLE_RULE: 1,
        CHARSET_RULE: 2,
        IMPORT_RULE: 3,
        MEDIA_RULE: 4,
        FONT_FACE_RULE: 5,
        PAGE_RULE: 6,
        KEYFRAMES_RULE: 7,
        KEYFRAME_RULE: 8,
        NAMESPACE_RULE: 10,
        SUPPORTS_RULE: 12,
        FONT_FEATURE_VALUES_RULE: 14
    };
    Object.freeze(CSSRULETYPES);
    //#endregion
    //#region COLORFORMATS
    const COLORFORMATS = {
        HSL: "hsl",
        HSV: "hsv"
    };
    Object.freeze(COLORFORMATS);
    //#endregion
    //#region LANGUAGES
    const LANGUAGES = {
        AF_ZA: "af-ZA",
        AR_AE: "ar-AE",
        AR_BH: "ar-BH",
        AR_DZ: "ar-DZ",
        AR_EG: "ar-EG",
        AR_IQ: "ar-IQ",
        AR_JO: "ar-JO",
        AR_KW: "ar-KW",
        AR_LB: "ar-LB",
        AR_LY: "ar-LY",
        AR_MA: "ar-MA",
        AR_OM: "ar-OM",
        AR_QA: "ar-QA",
        AR_SA: "ar-SA",
        AR_SY: "ar-SY",
        AR_TN: "ar-TN",
        AR_YE: "ar-YE",
        AZ_CYRL_AZ: "az-Cyrl-AZ",
        AZ_LATN_AZ: "az-Latn-AZ",
        BE_BY: "be-BY",
        BG_BG: "bg-BG",
        BS_LATN_BA: "bs-Latn-BA",
        CA_ES: "ca-ES",
        CS_CZ: "cs-CZ",
        CY_GB: "cy-GB",
        DA_DK: "da-DK",
        DE_AT: "de-AT",
        DE_CH: "de-CH",
        DE_DE: "de-DE",
        DE_LI: "de-LI",
        DE_LU: "de-LU",
        DV_MV: "dv-MV",
        EL_GR: "el-GR",
        EN_029: "en-029",
        EN_AU: "en-AU",
        EN_BZ: "en-BZ",
        EN_CA: "en-CA",
        EN_GB: "en-GB",
        EN_IE: "en-IE",
        EN_JM: "en-JM",
        EN_NZ: "en-NZ",
        EN_PH: "en-PH",
        EN_TT: "en-TT",
        EN_US: "en-US",
        EN_ZA: "en-ZA",
        EN_ZW: "en-ZW",
        ES_AR: "es-AR",
        ES_BO: "es-BO",
        ES_CL: "es-CL",
        ES_CO: "es-CO",
        ES_CR: "es-CR",
        ES_DO: "es-DO",
        ES_EC: "es-EC",
        ES_ES: "es-ES",
        ES_GT: "es-GT",
        ES_HN: "es-HN",
        ES_MX: "es-MX",
        ES_NI: "es-NI",
        ES_PA: "es-PA",
        ES_PE: "es-PE",
        ES_PR: "es-PR",
        ES_PY: "es-PY",
        ES_SV: "es-SV",
        ES_UY: "es-UY",
        ES_VE: "es-VE",
        ET_EE: "et-EE",
        EU_ES: "eu-ES",
        FA_IR: "fa-IR",
        FI_FI: "fi-FI",
        FO_FO: "fo-FO",
        FR_BE: "fr-BE",
        FR_CA: "fr-CA",
        FR_CH: "fr-CH",
        FR_FR: "fr-FR",
        FR_LU: "fr-LU",
        FR_MC: "fr-MC",
        GL_ES: "gl-ES",
        GU_IN: "gu-IN",
        HE_IL: "he-IL",
        HI_IN: "hi-IN",
        HR_BA: "hr-BA",
        HR_HR: "hr-HR",
        HU_HU: "hu-HU",
        HY_AM: "hy-AM",
        ID_ID: "id-ID",
        IS_IS: "is-IS",
        IT_CH: "it-CH",
        IT_IT: "it-IT",
        JA_JP: "ja-JP",
        KA_GE: "ka-GE",
        KK_KZ: "kk-KZ",
        KN_IN: "kn-IN",
        KO_KR: "ko-KR",
        KOK_IN: "kok-IN",
        KY_KG: "ky-KG",
        LT_LT: "lt-LT",
        LV_LV: "lv-LV",
        MI_NZ: "mi-NZ",
        MK_MK: "mk-MK",
        MN_MN: "mn-MN",
        MR_IN: "mr-IN",
        MS_BN: "ms-BN",
        MS_MY: "ms-MY",
        MT_MT: "mt-MT",
        NB_NO: "nb-NO",
        NL_BE: "nl-BE",
        NL_NL: "nl-NL",
        NN_NO: "nn-NO",
        NS_ZA: "ns-ZA",
        PA_IN: "pa-IN",
        PL_PL: "pl-PL",
        PT_BR: "pt-BR",
        PT_PT: "pt-PT",
        QUZ_BO: "quz-BO",
        QUZ_EC: "quz-EC",
        QUZ_PE: "quz-PE",
        RO_RO: "ro-RO",
        RU_RU: "ru-RU",
        SA_IN: "sa-IN",
        SE_FI: "se-FI",
        SE_NO: "se-NO",
        SE_SE: "se-SE",
        SK_SK: "sk-SK",
        SL_SI: "sl-SI",
        SMA_NO: "sma-NO",
        SMA_SE: "sma-SE",
        SMJ_NO: "smj-NO",
        SMJ_SE: "smj-SE",
        SMN_FI: "smn-FI",
        SMS_FI: "sms-FI",
        SQ_AL: "sq-AL",
        SR_CYRL_BA: "sr-Cyrl-BA",
        SR_CYRL_CS: "sr-Cyrl-CS",
        SR_LATN_BA: "sr-Latn-BA",
        SR_LATN_CS: "sr-Latn-CS",
        SV_FI: "sv-FI",
        SV_SE: "sv-SE",
        SW_KE: "sw-KE",
        SYR_SY: "syr-SY",
        TA_IN: "ta-IN",
        TE_IN: "te-IN",
        TH_TH: "th-TH",
        TN_ZA: "tn-ZA",
        TR_TR: "tr-TR",
        TT_RU: "tt-RU",
        UK_UA: "uk-UA",
        UR_PK: "ur-PK",
        UZ_CYRL_UZ: "uz-Cyrl-UZ",
        UZ_LATN_UZ: "uz-Latn-UZ",
        VI_VN: "vi-VN",
        XH_ZA: "xh-ZA",
        ZH_CN: "zh-CN",
        ZH_HK: "zh-HK",
        ZH_MO: "zh-MO",
        ZH_SG: "zh-SG",
        ZH_TW: "zh-TW",
        ZU_ZA: "zu-ZA"
    };
    Object.freeze(LANGUAGES);
    //#endregion
    //#region CHECKBOXSTATES
    const CHECKBOXSTATES = {
        UNCHECKED: "unchecked",
        GRAYED: "grayed",
        CHECKED: "checked"
    }
    Object.freeze(CHECKBOXSTATES);
    //#endregion
    //#region SCROLLBARS
    const SCROLLBARS = {
        NONE: "none",
        HORIZONTAL: "horizontal",
        VERTICAL: "vertical",
        BOTH: "both"
    }
    Object.freeze(SCROLLBARS);
    //#endregion
    //#region DIRECTIONS
    const DIRECTIONS = {
        LEFT: "left",
        RIGHT: "right"
    }
    Object.freeze(DIRECTIONS);
    //#endregion
    //#region CHARCASES
    const CHARCASES = {
        NORMAL: "normal",
        LOWERCASE: "lowerCase",
        UPPERCASE: "upperCase"
    }
    Object.freeze(CHARCASES);
    //#endregion
    //#region SORTEDORDERS
    const SORTEDORDERS = {
        ASC: "asc",
        DESC: "desc"
    }
    Object.freeze(SORTEDORDERS);
    //#endregion
    //#region FLOWLAYOUTS
    const FLOWLAYOUTS = {
        HORIZONTAL: "horizontal",
        VERTICAL: "vertical"
    }
    Object.freeze(FLOWLAYOUTS);
    //#endregion
    //#region CSSFILES
    const CSSFILES = {
        ANIMATE: "animate",
        JAGUI: "jagui",
        AIR: "Air",
        BEOS: "BeOS",
        BLEND: "Blend",
        CARBON: "Carbon",
        CLASSIC10K: "Classic10K",
        CLEARLOOKS: "Clearlooks",
        CORONA12: "Corona12",
        CRUZ: "Cruz",
        DEANACHM: "Deanachm",
        EXTREME: "Extreme",
        GUISTYLE: "GUIStyle",
        LUNABLUE: "LunaBlue",
        LUNAHOMESTEAD: "LunaHomestead",
        LUNAMETALLIC: "LunaMetallic",
        MACOS: "MacOS",
        MODERN: "Modern",
        PROLCD: "ProLCD",
        RAINBOW: "Rainbow",
        SIMPLE: "Simple",
        SMOOTHGNOME: "SmoothGnome",
        SUSTENANCE: "Sustenance",
        UBUNTU: "Ubuntu",
        VISTA: "Vista",
        WATERCOLOR: "WaterColor",
        WINDOWS8: "Windows8"
    }
    Object.freeze(CSSFILES);
    //#endregion
    //#region RESIZEMODES
    const RESIZEMODES = {
        NONE: "",
        LEFT: "left",
        TOP: "top",
        RIGHT: "right",
        BOTTOM: "bottom",
        TOPLEFT: "topLeft",
        TOPRIGHT: "topRight",
        BOTTOMRIGHT: "bottomRight",
        BOTTOMLEFT: "bottomLeft"
    }
    Object.freeze(RESIZEMODES);
    //#endregion
    //#region SNAPAREAS
    const SNAPAREAS = {
        NONE: "none",
        LEFT: "left",
        TOP: "top",
        RIGHT: "right"
    }
    Object.freeze(SNAPAREAS);
    //#endregion
    //#region BORDERSTYPES
    const BORDERSTYPES = {
        NONE: "none",
        SNAP: "snap",
        MAGNETIC: "magnetic"
    }
    Object.freeze(BORDERSTYPES);
    //#endregion
    //#region DISPLAYS
    const DISPLAYS = {
        NONE: "none",
        BLOCK: "block",
        INLINE: "inline",
        FLEX: "flex",
        INLINEBLOCK: "inline-block",
        GRID: "grid",
        INLINEFLEX: "inline-flex",
        INLINEGRID: "inline-grid",
        INLINETABLE: "inline-table",
        LISTITEM: "list-item",
        RUNIN: "run-in",
        TABLE: "table",
        TABLECAPTION: "table-caption",
        TABLECELL: "table-cell",
        TABLECOLUMN: "table-column",
        TABLECOLUMNGROUP: "table-column-group",
        TABLEFOOTERGROUP: "table-footer-group",
        TABLEHEADERGROUP: "table-header-group",
        TABLEROW: "table-row",
        TABLEROWGROUP: "table-row-group"
    }
    Object.freeze(DISPLAYS);
    //#endregion
    //#region PROPERTIESCATEGORIES
    const PROPERTIESCATEGORIES = {
        ACTION: "Action",
        DATABASE: "Database",
        DRAGDROPDOCKING: "Drag, Drop, and Docking",
        HELPHINTS: "Help and Hints",
        LAYOUT: "Layout",
        LEGACY: "Legacy",
        LINKAGE: "Linkage",
        LOCALE: "Locale",
        LOCALIZABLE: "Localizable",
        VISUAL: "Visual",
        INPUT: "Input",
        MISCELLANEOUS: "Miscellaneous"
    }
    Object.freeze(PROPERTIESCATEGORIES);
    //#endregion
    //#region THEMES
    const THEMES = {
        BASE: "base"
    }
    Object.freeze(THEMES);
    //#endregion
    //#region BINDABLEPROPERTIES
    const bindableProperties = {};
    //Object.freeze(BINDABLEPROPERTIES);
    //#endregion
    //#region DRAGKINDS
    const DRAGKINDS = {
        DRAG: "drag",
        DOCK: "dock"
    };
    Object.freeze(DRAGKINDS);
    //#endregion
    //#region RENDERERS
    const RENDERERS = {
        HTML: "html",
        CANVAS: "canvas",
        WEBGL: "webgl"
    };
    Object.freeze(RENDERERS);
    //#endregion

    return {
        ALIGNS: ALIGNS,
        DRAGMODES: DRAGMODES,
        INTERPOLATIONTYPES: INTERPOLATIONTYPES,
        ANIMATIONTYPES: ANIMATIONTYPES,
        PATHPOINTKINDS: PATHPOINTKINDS,
        PATHWRAPS: PATHWRAPS,
        TEXTALIGNS: TEXTALIGNS,
        VERTTEXTALIGNS: VERTTEXTALIGNS,
        WRAPMODES: WRAPMODES,
        ORIENTATIONS: ORIENTATIONS,
        MESSAGETYPES: MESSAGETYPES,
        MESSAGEBUTTONS: MESSAGEBUTTONS,
        CONSTANTS: CONSTANTS,
        CURSORS: CURSORS,
        CUSTOMCURSORS: CUSTOMCURSORS,
        HELPTYPES: HELPTYPES,
        BRUSHSTYLES: BRUSHSTYLES,
        GRADIENTSTYLES: GRADIENTSTYLES,
        FONTSTYLES: FONTSTYLES,
        CALLOUTPOSITIONS: CALLOUTPOSITIONS,
        TRAPEZOIDORIENTATIONS: TRAPEZOIDORIENTATIONS,
        PARALLELOGRAMORIENTATIONS: PARALLELOGRAMORIENTATIONS,
        ARROWORIENTATIONS: ARROWORIENTATIONS,
        BUTTONLAYOUTGLYPHS: BUTTONLAYOUTGLYPHS,
        XMLNODETYPES: XMLNODETYPES,
        LISTSTYLES: LISTSTYLES,
        SVG: SVG,
        SHAPES: SHAPES,
        OPERATIONS: OPERATIONS,
        CSSSELECTORSFLAGS: CSSSELECTORSFLAGS,
        HTMLELEMENTS: HTMLELEMENTS,
        HTMLEVENTS: HTMLEVENTS,
        HTMLINPUTTYPES: HTMLINPUTTYPES,
        WORKERSTATUS: WORKERSTATUS,
        CONTROLPROPS: CONTROLPROPS,
        ANCHORS: ANCHORS,
        PSEUDOCSSCLASS: PSEUDOCSSCLASS,
        PROPSNEEDUPDATE: PROPSNEEDUPDATE,
        STYLES: STYLES,
        MESSAGES: MESSAGES,
        CATEGORIES: CATEGORIES,
        INTERNALCATEGORIES: INTERNALCATEGORIES,
        BITMAPREPEATMODES: BITMAPREPEATMODES,
        TEXTSELECTIONMOVES: TEXTSELECTIONMOVES,
        TITLEBUTTONS: TITLEBUTTONS,
        FORMSTATES: FORMSTATES,
        WINDOWSTATES: WINDOWSTATES,
        MODALRESULTBUTTONS: MODALRESULTBUTTONS,
        MODALRESULTS: MODALRESULTS,
        FORMPOSITIONS: FORMPOSITIONS,
        BORDERSTYLES: BORDERSTYLES,
        JSCSSPROPERTIES: JSCSSPROPERTIES,
        CSSPROPERTIES: CSSPROPERTIES,
        CSSVALUES: CSSVALUES,
        IMAGEWRAPS: IMAGEWRAPS,
        CSSUNITS: CSSUNITS,
        ANIMATIONTRIGGERS: ANIMATIONTRIGGERS,
        CSSRULETYPES: CSSRULETYPES,
        COLORFORMATS: COLORFORMATS,
        LANGUAGES: LANGUAGES,
        CHECKBOXSTATES: CHECKBOXSTATES,
        SCROLLBARS: SCROLLBARS,
        DIRECTIONS: DIRECTIONS,
        CHARCASES: CHARCASES,
        SORTEDORDERS: SORTEDORDERS,
        FLOWLAYOUTS: FLOWLAYOUTS,
        CSSFILES: CSSFILES,
        RESIZEMODES: RESIZEMODES,
        SNAPAREAS: SNAPAREAS,
        BORDERSTYPES: BORDERSTYPES,
        DISPLAYS: DISPLAYS,
        PROPERTIESCATEGORIES: PROPERTIESCATEGORIES,
        THEMES: THEMES,
        bindableProperties: bindableProperties,
        DRAGKINDS: DRAGKINDS,
        RENDERERS: RENDERERS
    }
});