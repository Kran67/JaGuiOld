//#region MESSAGEBUTTONS
/**
 * @type    {Object}        MESSAGEBUTTONS
 */
const MESSAGEBUTTONS = Object.freeze({
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
});
//#endregion

//#region CONSTANTS
/**
 * @type    {Object}        CONSTANTS
 */
const CONSTANTS = Object.freeze({
    _2PI: Math.PI * 2,
    INV180: 1 / 180,
    INV360: 1 / 360,
    EPSILON: 1e-40,
    GRIPSIZE: 3,
    ROTSIZE: 10,
    //#region CLOSEPOLYGON
    CLOSEPOLYGON: Object.freeze({
        x: 0xFFFF,
        y: 0xFFFF
    }),
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
    CLOSEBTNGLYPH: "C",
    MAXIMIZEBTNGLYPH: ";",
    RESTOREBTNGLYPH: "<",
    MINIMIZEBTNGLYPH: ":",
    HELPBTNGLYPH: "9",
    ROLLDOWNBTNGLYPH:"=",
    ROLLUPBTNGLYPH: ">",
    STAYOFFBTNGLYPH: "@",
    STAYONBTNGLYPH: "?",
    BTNGLYPHFONTFACE: "jagui",
    UNSET: "unset"
});
//#endregion
//#region
const ArithmeticOperations = Object.freeze({
    EQUAL:"equal",
    NOTEQUAL:"notEqual",
    LESSTHAN:"lessThan",
    GREATERTHAN:"greaterThan",
    LESSTHANOREQUAL:"lessThanOrEqual",
    GREATERTHANOREQUAL:"greaterThanOrEqual",
    ISFALSE:"isFalse",
    ISTRUE:"isTrue",
    OR:"or",
    AND:"and",
    INDEXOF:"indexOf"
});
//#endregion
const Types = Object.freeze({
    CONSTANTS: CONSTANTS,
    //#region ALIGNS
    /**
     * @type    {Object}        ALIGNS
     */
    ALIGNS: Object.freeze({
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
    }),
    //#endregion
    //#region DRAGMODES
    /**
     * @type    {Object}        DRAGMODES
     */
    DRAGMODES: Object.freeze({
        MANUAL: "manual",
        AUTOMATIC: "automatic"
    }),
    //#endregion
    //#region PATHWRAPS
    /**
     * @type    {Object}        PATHWRAPS
     */
    PATHWRAPS: Object.freeze({
        ORIGINAL: "original",
        FIT: "fit",
        STRETCH: "stretch",
        TILE: "tile"
    }),
    //#endregion
    //#region TEXTALIGNS
    /**
     * @type    {Object}        TEXTALIGNS
     */
    TEXTALIGNS: Object.freeze({
        CENTER: "center",
        LEFT: "left",
        RIGHT: "right"
    }),
    //#endregion
    //#region VERTTEXTALIGNS
    /**
     * @type    {Object}        VERTTEXTALIGNS
     */
    VERTTEXTALIGNS: Object.freeze({
        TOP: "top",
        MIDDLE: "middle",
        BOTTOM: "bottom"
    }),
    //#endregion
    //#region WRAPMODES
    /**
     * @type    {Object}        WRAPMODES
     */
    WRAPMODES: Object.freeze({
        TILE: "tile",
        TILEORIGINAL: "tileOriginal",
        TILESTRETCH: "tileStretch"
    }),
    //#endregion
    //#region ORIENTATIONS
    /**
     * @type    {Object}        ORIENTATIONS
     */
    ORIENTATIONS: Object.freeze({
        HORIZONTAL: "horizontal",
        VERTICAL: "vertical"
    }),
    //#endregion
    //#region MESSAGETYPES
    /**
     * @type    {Object}        MESSAGETYPES
     */
    MESSAGETYPES: Object.freeze({
        WARNING: "warning",
        ERROR: "error",
        INFORMATION: "information",
        CONFIRMATION: "confirmation",
        CUSTOM: "custom"
    }),
    //#endregion
    //#region CURSORS
    /**
     * @type    {Object}        CURSORS
     */
    CURSORS: Object.freeze({
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
    }),
    /**
     * @type    {Object}
     */
    CUSTOMCURSORS: Object.freeze({
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
    }),
    //#endregion
    //#region BRUSHSTYLES
    /**
     * @type    {Object}        BRUSHSTYLES
     */
    BRUSHSTYLES: Object.freeze({
        NONE: "none",
        SOLID: "solid",
        GRADIENT: "gradient",
        BITMAP: "bitmap"
    }),
    //#endregion
    //#region GRADIENTSTYLES
    /**
     * @type    {Object}        GRADIENTSTYLES
     */
    GRADIENTSTYLES: Object.freeze({
        LINEAR: "linear",
        RADIAL: "radial",
        CONIC: "conic"
    }),
    //#endregion
    //#region FONTSTYLES
    /**
     * @type    {Object}        FONTSTYLES
     */
    FONTSTYLES: Object.freeze({
        NORMAL: "normal",
        ITALIC: "italic",
        BOLD: "bold"
    }),
    //#endregion
    //#region CALLOUTPOSITIONS
    /**
     * @type    {Object}        CALLOUTPOSITIONS
     */
    CALLOUTPOSITIONS: Object.freeze({
        LEFT: "left",
        TOP: "top",
        RIGHT: "right",
        BOTTOM: "bottom"
    }),
    /**
     * @type    {Object}
     */
    TRAPEZOIDORIENTATIONS: Object.freeze({
        LEFT: "left",
        TOP: "top",
        RIGHT: "right",
        BOTTOM: "bottom"
    }),
    /**
     * @type    {Object}
     */
    PARALLELOGRAMORIENTATIONS: Object.freeze({
        LEFT: "left",
        TOP: "top",
        RIGHT: "right",
        BOTTOM: "bottom"
    }),
    //#endregion
    //#region ARROWORIENTATIONS
    /**
     * @type    {Object}        ARROWORIENTATIONS
     */
    ARROWORIENTATIONS: Object.freeze({
        LEFT: "left",
        TOP: "top",
        RIGHT: "right",
        BOTTOM: "bottom",
        TOPLEFT: "topleft",
        TOPRIGHT: "topright",
        BOTTOMLEFT: "bottomleft",
        BOTTOMRIGHT: "bottomright"
    }),
    //#endregion
    //#region XMLNODETYPES
    /**
     * @type    {Object}        XMLNODETYPES
     */
    XMLNODETYPES: Object.freeze({
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
    }),
    //#endregion
    //#region LISTSTYLES
    /**
     * @type    {Object}        LISTSTYLES
     */
    LISTSTYLES: Object.freeze({
        VERTICAL: "vertical",
        HORIZONTAL: "horizontal"
    }),
    //#endregion
    //#region SVG
    /**
     * @type    {Object}        SVG
     */
    SVG: Object.freeze({
        XMLNS: "http://www.w3.org/2000/svg",
        SVG: "svg",
        DEFS: "defs",
        CLIPPATH: "clipPath",
        USE: "use",
        LINEARGRADIENT: "linearGradient",
        STOP: "stop",
        XLINKHREF: "xlink:href",
        XLINK: "http://www.w3.org/1999/xlink"
    }),
    //#endregion
    //#region SHAPES
    /**
     * @type    {Object}        SHAPES
     */
    SHAPES: Object.freeze({
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
    }),
    //#endregion
    //#region OPERATIONS
    /**
     * @type    {Object}        OPERATIONS
     */
    OPERATIONS: Object.freeze({
        INSERT: "insert",
        REMOVE: "remove"
    }),
    //#endregion
    //#region CSSSELECTORSFLAGS
    /**
     * @type    {Object}        CSSSELECTORSFLAGS
     */
    CSSSELECTORSFLAGS: Object.freeze({
        START: "start",
        EGAL: "egal",
        CONTAINS: "contains",
        ENDS: "ends"
    }),
    //#endregion
    //#region HTMLELEMENTS
    /**
     * @type    {Object}        HTMLELEMENTS
     */
    HTMLELEMENTS: Object.freeze({
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
        FORM: "form",
        H3: "h3",
        A: "a",
        DATALIST: "datalist"
    }),
    //#endregion
    //#region HTMLEVENTS
    /**
     * @type    {Object}        HTMLEVENTS
     */
    HTMLEVENTS: Object.freeze({
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
        INPUT: "input",
        MOUSEMOVE:"mousemove",
        MOUSEDOWN:"mousedown",
        MOUSEUP:"mouseup"
    }),
    //#endregion
    //#region HTMLINPUTTYPES
    /**
     * @type    {Object}        HTMLINPUTTYPES
     */
    HTMLINPUTTYPES: Object.freeze({
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
    }),
    //#endregion
    //#region WORKERSTATUS
    /**
     * @type    {Object}        WORKERSTATUS
     */
    WORKERSTATUS: Object.freeze({
        START: "start",
        UPDATE: "update",
        END: "end"
    }),
    //#endregion
    //#region CONTROLPROPS
    /**
     * @type    {Object}        CONTROLPROPS
     */
    CONTROLPROPS: Object.freeze({
        ANCHOR: "anchor"
    }),
    //#endregion
    //#region ANCHORS
    /**
     * @type    {Object}        ANCHORS
     */
    ANCHORS: Object.freeze({
        LEFT: "left",
        TOP: "top",
        RIGHT: "right",
        BOTTOM: "bottom"
    }),
    //#endregion
    //#region PSEUDOCSSCLASS
    /**
     * @type    {Object}        PSEUDOCSSCLASS
     */
    PSEUDOCSSCLASS: Object.freeze({
        BEFORE: ":before",
        AFTER: ":after",
        HOVER: ":hover",
        HOVER_BEFORE: ":hover:before",
        HOVER_AFTER: ":hover:after",
        ACTIVE: ":active",
        ACTIVE_BEFORE: ":active:before",
        ACTIVE_AFTER: ":active:after"
    }),
    //#endregion
    //#region PROPSNEEDUPDATE
    /**
     * @type    {Object}        PROPSNEEDUPDATE
     */
    PROPSNEEDUPDATE: Object.freeze({
        WIDTH: "width",
        HEIGHT: "height",
        COLOR: "color",
        ANGLE: "angle",
        LEFT: "left",
        TOP: "top",
        ROTATEANGLE: "rotateAngle"
    }),
    //#endregion
    //#region STYLES
    /**
     * @type    {Object}        STYLES
     */
    STYLES: Object.freeze({
        NONE: "none",
        NORMAL: "normal",
        HOVERED: "hovered",
        PRESSED: "pressed"
    }),
    //#endregion
    //#region MESSAGES
    /**
     * @type    {Object}        MESSAGES
     */
    MESSAGES: Object.freeze({
        RESIZE: "resize"
    }),
    //#endregion
    //#region CATEGORIES
    /**
     * @type    {Object}        CATEGORIES
     */
    CATEGORIES: Object.freeze({
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
    }),
    //#endregion
    //#region INTERNALCATEGORIES
    /**
     * @type    {Object}        INTERNALCATEGORIES
     */
    INTERNALCATEGORIES: Object.freeze({
        INTERNAL: "internal",
        CORE: "core",
        APPS: "apps",
        COMPONENTS: "components",
        LOCALES: "locales",
        THIRDPARTY: "thirdparty"
    }),
    //#endregion
    //#region BITMAPREPEATMODES
    /**
     * @type    {Object}        BITMAPREPEATMODES
     */
    BITMAPREPEATMODES: Object.freeze({
        NOREPEAT: "no-repeat",
        REPEAT: "repeat",
        REPEATX: "repeat-x",
        REPEATY: "repeat-y"
    }),
    //#endregion
    //#region TEXTSELECTIONMOVES
    /**
     * @type    {Object}        TEXTSELECTIONMOVES
     */
    TEXTSELECTIONMOVES: Object.freeze({
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
    }),
    //#endregion
    //#region JSCSSPROPERTIES
    /**
     * @type    {Object}        JSCSSPROPERTIES
     */
    JSCSSPROPERTIES: Object.freeze({
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
    }),
    //#endregion
    //#region CSSPROPERTIES
    /**
     * @type    {Object}        CSSPROPERTIES
     */
    CSSPROPERTIES: Object.freeze({
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
    }),
    //#endregion
    //#region CSSVALUES
    /**
     * @type    {Object}        CSSVALUES
     */
    CSSVALUES: Object.freeze({
        VISIBLE: "visible",
        HIDDEN: "hidden",
        NORMAL: "normal",
        NONE: "none",
        INLINEBLOCK: "inline-block"
    }),
    //#endregion
    //#region TEXTOVERFLOWS
    TEXTOVERFLOWS: Object.freeze({
        CLIP: "clip",
        ELLIPSIS: "ellipsis"
    }),
    //#endregion TEXTOVERFLOWS
    //#region TEXTTRANSFORM
    TEXTTRANSFORMS: Object.freeze({
        CAPITALIZE: "capitalize",
        UPPERCASE: "uppercase",
        LOWERCASE: "lowercase",
        NONE: "none"
    }),
    //#endregion TEXTTRANSFORM
    //#region TEXTDECORATIONSTYLES
    TEXTDECORATIONSTYLES: Object.freeze({
        SOLID: "solid",
        DOUBLE: "double",
        DOTTED: "dotted",
        DASHED: "dashed",
        WAVY: "wavy",
        NONE: "none"
    }),
    //#endregion TEXTDECORATIONSTYLES
    //#region TEXTDECORATIONS
    TEXTDECORATIONS: Object.freeze({
        UNDERLINE: "underline",
        OVERLINE: "overline",
        LINETHROUGH: "line-through",
        NONE: "none"
    }),
    //#endregion TEXTDECORATIONS
    //#region CSSUNITS
    /**
     * @type    {Object}        CSSUNITS
     */
    CSSUNITS: Object.freeze({
        CM: "cm",
        EM: "em",
        IN: "in",
        MM: "mm",
        PC: "pc",
        PT: "pt",
        PO: "%",
        PX: "px",
        REM: "rem"
    }),
    //#endregion
    //#region ANIMATIONTRIGGERS
    /**
     * @type    {Object}        ANIMATIONTRIGGERS
     */
    ANIMATIONTRIGGERS: Object.freeze({
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
    }),
    //#endregion
    //#region CSSRULETYPES
    /**
     * @type    {Object}        CSSRULETYPES
     */
    CSSRULETYPES: Object.freeze({
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
    }),
    //#endregion
    //#region COLORFORMATS
    /**
     * @type    {Object}        COLORFORMATS
     */
    COLORFORMATS: Object.freeze({
        HSL: "hsl",
        HSV: "hsv"
    }),
    //#endregion
    //#region LANGUAGES
    /**
     * @type    {Object}        LANGUAGES
     */
    LANGUAGES: Object.freeze({
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
    }),
    //#endregion
    //#region SCROLLBARS
    /**
     * @type    {Object}        SCROLLBARS
     */
    SCROLLBARS: Object.freeze({
        NONE: "none",
        HORIZONTAL: "horizontal",
        VERTICAL: "vertical",
        BOTH: "both"
    }),
    //#endregion
    //#region DIRECTIONS
    /**
     * @type    {Object}        DIRECTIONS
     */
    DIRECTIONS: Object.freeze({
        LEFT: "left",
        RIGHT: "right"
    }),
    //#endregion
    //#region CHARCASES
    /**
     * @type    {Object}        CHARCASES
     */
    CHARCASES: Object.freeze({
        NORMAL: "normal",
        LOWERCASE: "lowerCase",
        UPPERCASE: "upperCase"
    }),
    //#endregion
    //#region SORTEDORDERS
    /**
     * @type    {Object}        SORTEDORDERS
     */
    SORTEDORDERS: Object.freeze({
        ASC: "asc",
        DESC: "desc"
    }),
    //#endregion
    /**
     * @type    {Object}        CSSFILES
     */
    CSSFILES: Object.freeze({
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
    }),
    //#endregion
    //#region DISPLAYS
    /**
     * @type    {Object}        DISPLAYS
     */
    DISPLAYS: Object.freeze({
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
    }),
    //#endregion
    //#region PROPERTIESCATEGORIES
    /**
     * @type    {Object}        PROPERTIESCATEGORIES
     */
    PROPERTIESCATEGORIES: Object.freeze({
        ACTION: {
            label: "Action", properties: []
        },
        DATABASE: {
            label: "Database", properties: []
        },
        DRAGDROPDOCKING: {
            label: "Drag, Drop, and Docking", properties: []
        },
        HELPHINTS: {
            label: "Help and Hints", properties: []
        },
        LAYOUT: {
            label: "Layout", properties: []
        },
        LEGACY: {
            label: "Legacy", properties: []
        },
        LINKAGE: {
            label: "Linkage", properties: []
        },
        LOCALE: {
            label: "Locale", properties: []
        },
        LOCALIZABLE: {
            label: "Localizable", properties: []
        },
        VISUAL: {
            label: "Visual", properties: []
        },
        INPUT: {
            label: "Input", properties: []
        },
        MISCELLANEOUS: {
            label: "Miscellaneous", properties: []
        }
    }),
    //#endregion
    //#region THEMES
    /**
     * @type    {Object}        THEMES
     */
    THEMES: Object.freeze({
        BASE: "base"
    }),
    //#endregion
    //#region BINDABLEPROPERTIES
    /**
     * @type    {Object}        BINDABLEPROPERTIES
     */
    BINDABLEPROPERTIES: {},
    //Object.freeze(BINDABLEPROPERTIES);
    //#endregion
    //#region DRAGKINDS
    /**
     * @type    {Object}        DRAGKINDS
     */
    DRAGKINDS: Object.freeze({
        DRAG: "drag",
        DOCK: "dock"
    }),
    //#endregion
    //#region RENDERERS
    /**
     * @type    {Object}        RENDERERS
     */
    RENDERERS: Object.freeze({
        HTML: "html",
        CANVAS: "canvas",
        SVG: "svg"
    }),
    //#endregion
    //#region GRADIENTDIRECTIONS
    /**
     * @type    {Object}        GRADIENTDIRECTIONS
     */
    GRADIENTDIRECTIONS: Object.freeze({
        TORIGHT: "toRight",
        TOBOTTOM: "toBottom",
        TOBOTTOMRIGHT: "toBottomRight"
    })
    //#endregion
});
window.Types = Types;
export { Types, ArithmeticOperations };