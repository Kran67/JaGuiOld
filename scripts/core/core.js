//#region requestAnimationFrameRate
/**
 * Add frame rate on requestAnimation
 * @param       {Number}        fps         Number of frame per second
 * @returns     {Function}                  The new requestAnimation
 */
window.requestAnimationFrameRate = function (fps) {
    let period = null;
    let starter = null;
    let limit = null;
    let jitter = null;
    const maxFps = 60;
    if (typeof fps !== 'number') {
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
    name: 'JaGui',
    propertiesCategories: {},
    bindableProperties: [],
    themes: {},
    onGetMouseInfos: null,
    doc: document,
    clipboard: null,
    ready: false,
    onStart: null,
    //defaultTheme: 'air', /* ok */
    //defaultTheme: 'blend', /* ok */
    defaultTheme: 'carbon', /* ok */
    //defaultTheme: 'classic10k', /* ok */
    /*defaultTheme: 'clearlooksblue',*/
    //defaultTheme: 'corona12',
    //defaultTheme: 'cruz',
    //defaultTheme: 'deanachm',
    //defaultTheme: 'extreme', /* ok */
    //defaultTheme: 'guistyle',
    //defaultTheme: 'haiku',
    //defaultTheme: 'lunablue',
    //defaultTheme: 'lunahomestead',
    //defaultTheme: 'lunametallic',
    //defaultTheme: 'macos',
    //defaultTheme: 'modern', /* ok */
    //defaultTheme: 'prolcd',
    //defaultTheme: 'rainbow',
    //defaultTheme: 'simple', /* ok */
    //defaultTheme: 'smoothgnome',
    //defaultTheme: 'sustenance',
    //defaultTheme: 'ubuntu',
    //defaultTheme: 'vista',
    //defaultTheme: 'watercolor',
    //defaultTheme: 'windows8',
    disableAnimation: false,
    isMouseDown: false,
    windowZIndex: 0,
    currentLocale: null,
    locales: {
        translateConstant: (app, key) => {
            const c = Core.locales[app.locale];
            if (c) {
                if (c.constantMessages[key]) {
                    return c.constantMessages[key];
                }
            }
            return null;
        }
    },
    version: '0.8b',
    /*this.folders = {
        BASE: `JaGui${version}`, GUI: 'gui/', CORE: 'scripts/core/', COMPONENTS: 'gui/components/', COMMON: 'gui/components/common/', COLOR: 'gui/components/color/',
        CONTAINERS: 'gui/components/containers/', DATA: 'gui/components/data/', EXTENDED: 'gui/components/extended/', EXTRAS: 'gui/components/extras/',
        LISTS: 'gui/components/lists/', MENUS: 'gui/components/menus/', TOOLBARS: 'gui/components/toolbars/', NONVISUAL: 'gui/components/nonvisual/',
        APPS: 'apps/', DEMOS: 'demos/', LOCALES: 'gui/locales/', CONTROLS: 'controls/', CSS: 'css/', THEMES: 'css/themes/', IMAGES: 'images/',
        EFFECTS: 'gui/effects/', DIALOGS: 'gui/components/dialogs/', ACTIONS: 'gui/components/actions/', GUITHEMES: 'gui/themes/',
        BASECSSCOMPONENTS: 'css/components/base/', THEMESCSSCOMPONENTS: 'css/components/themes/', THIRDPARTY: 'gui/thirdparty/'
    };
    Object.freeze(this.folders);*/
    rtStyle: null,
    dragWindow: null,
    resizeWindow: null,
    templates: {},
    HTMLParentElement: null,
    previousHoveredControl: null,
    canvas: null,
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
        this.classes.registerPropertiesInCategory('ACTION', ['action', 'caption', 'enabled', 'helpContext', 'toolTip', 'visible']);
        this.classes.registerPropertiesInCategory('HELPHINTS', ['helpContext', 'helpFile', 'helpKeyWord', 'helpType', 'toolTip', 'showToolTip', 'ownerShowToolTip']);
        this.classes.registerPropertiesInCategory('LAYOUT', ['align', 'anchors', 'autosize', 'constraints', 'height', 'left', 'margins', 'padding', 'top', 'width', 'tabOrder']);
        this.classes.registerPropertiesInCategory('MISCELLANEOUS', []);
        this.classes.registerPropertiesInCategory('INPUT', ['enabled']);
        this.classes.registerPropertiesInCategory('DRAGDROPDOCKING', []);
        this.classes.registerPropertiesInCategory('LEGACY', []);
        this.classes.registerPropertiesInCategory('LINKAGE', ['action', 'popupMenu']);
        this.classes.registerPropertiesInCategory('LOCALE', []);
        this.classes.registerPropertiesInCategory('LOCALIZABLE', ['caption', 'constraints', 'font', 'height', 'toolTip', 'icon', 'left', 'top', 'width']);
        this.classes.registerPropertiesInCategory('VISUAL', ['align', 'cursor', 'enabled', 'caption', 'visible', 'width', 'top', 'left', 'height']);
        this.classes.registerPropertiesInCategory('DATABASE', []);
    },
    /**
     * Start the framework
     * @function start
     */
    start() {
        if (!Core.ready) {
            let language = window.navigator.userLanguage || window.navigator.language;
            if (language.indexOf('-') === -1) {
                language = language + '-' + language.toUpperCase();
            }
            Core.currentLocale = language;
            if (Core.isHTMLRenderer) {
                Core.looper.fps = 25;
            }
            Core.looper.start();
            document.oncontextmenu = () => { return false; };
            document.addEventListener('keydown', Core.apps.keyDown, true);
            document.addEventListener('keyup', Core.apps.keyUp, true);
            document.addEventListener('keypress', Core.apps.keyPress, true);
            if (Core.isHTMLRenderer) {
                Core.clipboard = document.createElement('textarea');
                Core.clipboard.id = 'jaguiClipboard';
                Core.clipboard.value = '.';
                document.body.appendChild(Core.clipboard);
                // création de l'emplacement des css en runtime
                Core.rtStyle = document.createElement('style');
                Core.rtStyle.setAttribute('id', 'rtStyle');
                Core.rtStyle.setAttribute('type', 'text/css');
                Core.rtStyle.setAttribute('media', 'screen');
                document.getElementsByTagName('head')[0].appendChild(Core.rtStyle);
                //let styleSheet = Core.rtStyle.sheet;
                //styleSheet.insertRule('.hidden {display:none !important;}', styleSheet.cssRules.length);
                //return;
            }
            Core.registerPropertiesInCategory();
            Core.animatedCursor = new Core.classes.AnimatedCursor();
            document.addEventListener('DOMContentLoaded', () => {
                const logo = document.createElement('span');
                logo.className = 'logo JAGUI';
                if (!Core.HTMLParentElement) {
                    document.body.appendChild(logo);
                }
                else {
                    Core.HTMLParentElement.appendChild(logo);
                }
            });
            window.addEventListener('resize', () => {
                const applicationsKeys = Object.keys(Core.apps.applications);
                applicationsKeys.forEach(key => {
                    Core.apps.applications[key].windows.forEach(win => {
                        if (win.windowState === Core.classes.Window.WINDOWSTATES.MAXIMIZED) {
                            win.width = window.innerWidth;
                            win.height = window.innerHeight;
                            win.resize();
                        }
                    });
                });
            });
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
            Core.ready = true;
            window.activeWindow = null;
            if (Core.onStart) {
                Core.onStart();
            }
        }
    }
};
//#endregion