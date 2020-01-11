﻿//#region Imports
//import { NotifyEvent, TimerEvent } from "./events.js";
//import * as convertion from "./convertion.js";
//'Mouse_keyboard': 'mouse_keyboard',
//'Canvas': 'canvas',
//'Classes': 'classes',
//'Colors': 'colors',
//#endregion
//#region requestAnimationFrameRate
/**
 * Add frame rate on requestAnimation
 * @param       {Number}        fps         Number of frame per second
 * @returns     {Function}                  The new requestAnimation
 */
window.requestAnimationFrameRate = function (fps) {
    let period = null
    let starter = null;
    let limit = null;
    let jitter = null;
    const maxFps = 60;
    if (typeof fps !== "number") {
        fps = maxFps;
    } else {
        fps = Math.max(1, Math.min(maxFps, fps));
    }
    period = 1000 / fps;
    jitter = period * 0.1;
    limit = period - jitter;
    return (renderFrameCallBack) => {
        return (() => {
            let handle = null;
            const rAf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame || window.msRequestAnimationFrame;
            const renderer = (time) => {
                starter = starter || time;
                const lastPeriod = time - starter;
                if (lastPeriod < limit) {
                    handle = rAf(renderer);
                } else {
                    renderFrameCallBack(lastPeriod);
                    starter = time;
                }
            };
            handle = rAf(renderer);
            return () => {
                window.cancelAnimationFrame(handle);
            };
        })();
    }
    //return requestAnimationFrameAtFps;
};
/**
 * Cancel a request animation frame rate
 * @param       {Function}      handle      The function to execute
 */
window.cancelAnimationFrameRate = (handle) => {
    handle();
};
//#endregion
//#region core
/**
 * The core of JaGui
 */
window.Core = {
    /**
     * Create a new instance of Core.
     */
    propertiesCategories: {},
    bindableProperties: [],
    themes: {},
    onGetMouseInfos: null,
    doc: document,
    clipboard: null,
    ready: false,
    onStart: null,
    //defaultTheme: "air", /* ok */
    //defaultTheme: "blend", /* ok */
    defaultTheme: "carbon", /* ok */
    //defaultTheme: "classic10k", /* ok */
    /*defaultTheme: "clearlooksblue",*/
    //defaultTheme: "corona12",
    //defaultTheme: "cruz",
    //defaultTheme: "deanachm",
    //defaultTheme: "extreme", /* ok */
    //defaultTheme: "guistyle",
    //defaultTheme: "haiku",
    //defaultTheme: "lunablue",
    //defaultTheme: "lunahomestead",
    //defaultTheme: "lunametallic",
    //defaultTheme: "macos",
    //defaultTheme: "modern", /* ok */
    //defaultTheme: "prolcd",
    //defaultTheme: "rainbow",
    //defaultTheme: "simple", /* ok */
    //defaultTheme: "smoothgnome",
    //defaultTheme: "sustenance",
    //defaultTheme: "ubuntu",
    //defaultTheme: "vista",
    //defaultTheme: "watercolor",
    //defaultTheme: "windows8",
    disableAnimation: false,
    isMouseDown: false,
    windowZIndex: 0,
    currentLocale: null,
    locales: {},
    version: "0.8b",
    /*this.folders = {
        BASE: `JaGui${version}`, GUI: "gui/", CORE: "scripts/core/", COMPONENTS: "gui/components/", COMMON: "gui/components/common/", COLOR: "gui/components/color/",
        CONTAINERS: "gui/components/containers/", DATA: "gui/components/data/", EXTENDED: "gui/components/extended/", EXTRAS: "gui/components/extras/",
        LISTS: "gui/components/lists/", MENUS: "gui/components/menus/", TOOLBARS: "gui/components/toolbars/", NONVISUAL: "gui/components/nonvisual/",
        APPS: "apps/", DEMOS: "demos/", LOCALES: "gui/locales/", CONTROLS: "controls/", CSS: "css/", THEMES: "css/themes/", IMAGES: "images/",
        EFFECTS: "gui/effects/", DIALOGS: "gui/components/dialogs/", ACTIONS: "gui/components/actions/", GUITHEMES: "gui/themes/",
        BASECSSCOMPONENTS: "css/components/base/", THEMESCSSCOMPONENTS: "css/components/themes/", THIRDPARTY: "gui/thirdparty/"
    };
    Object.freeze(this.folders);*/
    rtStyle: null,
    dragWindow: null,
    resizeWindow: null,
    templates: {},
    HTMLParentElement: null,
    previousHoveredControl: null,
    canvas: null,
    //this.windowsHTML = [];
    //this.idx = 0;
    /**
     * Return the current renderer
     * @returns     {String}        The name of the current renderer
     */
    get renderer() { return document.documentElement.dataset.renderer !== undefined ? document.documentElement.dataset.renderer : "html"; },
    /**
     * Check if the current renderer is the HTML renderer
     * @returns     {Boolean}       True if the current renderer is HTML or false
     */
    get isHTMLRenderer() {
        return this.renderer === Types.RENDERERS.HTML;
    },
    /**
     * Check if the current renderer is the canvas renderer
     * @returns     {Boolean}       True if the current renderer is canvas or false
     */
    get isCanvasRenderer() {
        return this.renderer === Types.RENDERERS.CANVAS;
    },
    /**
     * Check if the current renderer is the SVG renderer
     * @returns     {Boolean}       True if the current renderer is SVG or false
     */
    get isSVGRenderer() {
        return this.renderer === Types.RENDERERS.SVG;
    },
    /**
     * Check if the current renderer is the SVG renderer
     * @function registerPropertiesInCategory
     */
    registerPropertiesInCategory() {
        this.classes.registerPropertiesInCategory("ACTION", ["action", "caption", "enabled", "helpContext", "toolTip", "visible"]);
        this.classes.registerPropertiesInCategory("HELPHINTS", ["helpContext", "helpFile", "helpKeyWord", "helpType", "toolTip", "showToolTip", "ownerShowToolTip"]);
        this.classes.registerPropertiesInCategory("LAYOUT", ["align", "anchors", "autosize", "constraints", "height", "left", "margins", "padding", "top", "width", "tabOrder"]);
        this.classes.registerPropertiesInCategory("MISCELLANEOUS", []);
        this.classes.registerPropertiesInCategory("INPUT", ["enabled"]);
        this.classes.registerPropertiesInCategory("DRAGDROPDOCKING", []);
        this.classes.registerPropertiesInCategory("LEGACY", []);
        this.classes.registerPropertiesInCategory("LINKAGE", ["action", "popupMenu"]);
        this.classes.registerPropertiesInCategory("LOCALE", []);
        this.classes.registerPropertiesInCategory("LOCALIZABLE", ["caption", "constraints", "font", "height", "toolTip", "icon", "left", "top", "width"]);
        this.classes.registerPropertiesInCategory("VISUAL", ["align", "cursor", "enabled", "caption", "visible", "width", "top", "left", "height"]);
        this.classes.registerPropertiesInCategory("DATABASE", []);
    },
    /**
     * Start the framework
     * @function start
     */
    start() {
        if (this.ready) {
            return;
        }
        let language = window.navigator.userLanguage || window.navigator.language;
        if (language.indexOf("-") === -1) {
            language = language + "-" + language.toUpperCase();
        }
        this.currentLocale = language;
        if (this.isHTMLRenderer) {
            this.looper.fps = 25;
        }
        this.looper.start();
        this.doc.oncontextmenu = () => { return false; };
        this.doc.addEventListener("keydown", this.apps.keyDown, true);
        this.doc.addEventListener("keyup", this.apps.keyUp, true);
        this.doc.addEventListener("keypress", this.apps.keyPress, true);
        if (Core.isHTMLRenderer) {
            Core.clipboard = document.createElement("textarea");
            Core.clipboard.id = "jaguiClipboard";
            Core.clipboard.value = ".";
            document.body.appendChild(Core.clipboard);
            // création de l'emplacement des css en runtime
            Core.rtStyle = document.createElement("style");
            Core.rtStyle.setAttribute("id", "rtStyle");
            Core.rtStyle.setAttribute("type", "text/css");
            Core.rtStyle.setAttribute("media", "screen");
            document.getElementsByTagName("head")[0].appendChild(Core.rtStyle);
            //let styleSheet = Core.rtStyle.sheet;
            //styleSheet.insertRule(".hidden {display:none !important;}", styleSheet.cssRules.length);
            //return;
        }
        this.registerPropertiesInCategory();
        this.animatedCursor = new Core.classes.AnimatedCursor();
        //    this.doc.addEventListener("DOMContentLoaded",
        //        function () {
        //            require(['Core', 'Tools', 'Classes'], function (Core, Tools, Classes) {
        //                //var logo, waiting, progressOuter, progressInner, text, ie = false;
        //                //var match = navigator.userAgent.match(/(?:MSIE |Trident\/.*; rv:)(\d+)/);
        //                //if (match) ie = match.length > 0;
        //                // on charge le theme par défaut
        //                if ($j.isHTMLRenderer())
        //                {
        //                    Tools.loadTheme($j.defaultTheme);
        //                    Core.clipboard = document.createElement("textarea");
        //                    Core.clipboard.id = "jaguiClipboard";
        //                    Core.clipboard.value = ".";
        //                    document.body.appendChild(Core.clipboard);
        //                }// else this.themes[this.defaultTheme]={};
        //                if (!Tools.HTMLParentElement)
        //                {
        //                    //$j.doc.documentElement.ClassName=$j.defaultTheme+"_body "+$j.defaultTheme+"_default";
        //                    //if (ie) $j.doc.body.setAttribute("data-theme",$j.defaultTheme);
        //                    //else $j.doc.body.dataset.theme=$j.defaultTheme;
        //                    document.body.className += " " + Core.defaultTheme;
        //                }
        //                document.body.className = Core.defaultTheme;
        //                //logo = $j.doc.createElement("span");
        //                //logo.className = "JAGUI";
        //                //logo.innerHTML="D";
        //                //if (!$j.tools.HTMLParentElement) $j.doc.body.appendChild(logo);
        //                //else $j.tools.HTMLParentElement.appendChild(logo);
        //                //if ($j.isHTMLRenderer())
        //                //{
        //                //    waiting = $j.doc.createElement("div");
        //                //    waiting.className = "Control loading " + $j.defaultTheme;
        //                //    waiting.id = "waiting";
        //                //    logo = $j.doc.createElement("div");
        //                //    logo.id = "loading_logo";
        //                //    logo.className = "Control loading_logo rotateAnimation";
        //                //    waiting.appendChild(logo);
        //                //    progressOuter = $j.doc.createElement("div");
        //                //    progressOuter.className = "Control loading_progressOuter " + $j.defaultTheme;
        //                //    progressOuter.id = "progressOuter";
        //                //    progressInner = $j.doc.createElement("div");
        //                //    progressInner.id = "progressInner";
        //                //    progressInner.className = "Control loading_progressInner " + $j.defaultTheme;
        //                //    progressOuter.appendChild(progressInner);
        //                //    waiting.appendChild(progressOuter);
        //                //    text = $j.doc.createElement("div");
        //                //    text.className = "Control loading_text " + $j.defaultTheme;
        //                //    text.id = "file_text";
        //                //    text.value = ".";
        //                //    waiting.appendChild(text);
        //                //    if (!$j.tools.HTMLParentElement) $j.doc.body.appendChild(waiting);
        //                //    else $j.tools.HTMLParentElement.appendChild(waiting);
        //                //    $j.tools.step = ~~(180 / ($j.tools.scripts.length - 1));
        //                //}
        //                //if($j.HTMLParentElement) $j.HTMLParentElement.ClassName=$j.defaultTheme+"_body";
        //                if (Tools.HTMLParentElement)
        //                {
        //                    //if (ie) $j.HTMLParentElement.setAttribute("data-theme",$j.defaultTheme);
        //                    //else $j.HTMLParentElement.dataset.theme=$j.defaultTheme;
        //                    Tools.HTMLParentElement.className += " " + Core.defaultTheme
        //                }
        //                Tools.loadScript();
        //                Tools.afterLoadScripts = function () {
        //                    Tools.xhr.load(true, Tools.uri.base() + Core.folders["{LOCALES}"] + Core.currentLocale + ".json", function (dx, localeName) {
        //                        Core.locales[$j.types.languages[localeName.replace("-", "_")]] = JSON.parse(dx);
        //                    }, false, Core.currentLocale);
        //                    Core.animatedCursor = new Classes.AnimatedCursor();
        //                    Classes.registerPropertiesInCategory("ACTION", ["action", "caption", "enabled", "helpContext", "toolTip", "visible"]);
        //                    Classes.registerPropertiesInCategory("HELPHINTS", ["helpContext", "helpFile", "helpKeyWord", "helpType", "toolTip", "showToolTip", "ownerShowToolTip"]);
        //                    Classes.registerPropertiesInCategory("LAYOUT", ["align", "anchors", "autosize", "constraints", "height", "left", "margins", "padding", "top", "width", "tabOrder"]);
        //                    Classes.registerPropertiesInCategory("MISCELLANEOUS", []);
        //                    Classes.registerPropertiesInCategory("INPUT", ["enabled"]);
        //                    Classes.registerPropertiesInCategory("DRAGDROPDOCKING", []);
        //                    Classes.registerPropertiesInCategory("LEGACY", []);
        //                    Classes.registerPropertiesInCategory("LINKAGE", ["action", "popupMenu"]);
        //                    Classes.registerPropertiesInCategory("LOCALE", []);
        //                    Classes.registerPropertiesInCategory("LOCALIZABLE", ["caption", "constraints", "font", "height", "toolTip", "icon", "left", "top", "width"]);
        //                    Classes.registerPropertiesInCategory("VISUAL", ["align", "cursor", "enabled", "caption", "visible", "width", "top", "left", "height"]);
        //                    Classes.registerPropertiesInCategory("DATABASE", []);
        //                    if (typeof Core.ready === "function") Core.ready();
        //                };
        //            });
        //        }, false
        //    );
        this.ready = true;
        window.activeWindow = null;
        if (this.onStart) {
            this.onStart();
        }
    }
};
//#endregion