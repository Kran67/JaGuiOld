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
    fps = typeof fps !== 'number' ? maxFps : Math.max(1, Math.min(maxFps, fps));
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
//#region Core
/**
 * The core of JaGui
 */
class Core {
    //#region constructor
    constructor() {
        this.name = 'JaGui';
        this.propertiesCategories = {};
        this.bindableProperties = [];
        this.themes = {};
        this.onGetMouseInfos = null;
        this.clipboard = null;
        this.ready = !1;
        this.onStart = null;
        //this.defaultTheme= 'air';
        //this.defaultTheme= 'blend';
        this.defaultTheme = 'carbon';
        //this.defaultTheme= 'classic10k'; 
        //this.defaultTheme= 'clearlooksblue';
        //this.defaultTheme= 'corona12';
        //this.defaultTheme= 'cruz';
        //this.defaultTheme= 'deanachm';
        //this.defaultTheme= 'extreme';
        //this.defaultTheme= 'guistyle';
        //this.defaultTheme= 'haiku';
        //this.defaultTheme= 'lunablue';
        //this.defaultTheme= 'lunahomestead';
        //this.defaultTheme= 'lunametallic';
        //this.defaultTheme= 'macos';
        //this.defaultTheme= 'modern';
        //this.defaultTheme= 'prolcd';
        //this.defaultTheme= 'rainbow';
        //this.defaultTheme= 'simple';
        //this.defaultTheme= 'smoothgnome';
        //this.defaultTheme= 'sustenance';
        //this.defaultTheme= 'ubuntu';
        //this.defaultTheme= 'vista';
        //this.defaultTheme= 'watercolor';
        //this.defaultTheme= 'windows8';
        this.disableAnimation = !1;
        this.isMouseDown = !1;
        this.windowZIndex = 0;
        this.currentLocale = 'en_US';
        this.locales = {
            translateConstant: (locale, key) => {
                const c = core.locales[locale];
                return c && c.constantMessages[key] ? c.constantMessages[key] : null;
            },
            addLocale: (locale, key, value) => {
                const c = core.locales[locale];
                c[key] = value;
            }
        };
        this.version = '0.8b';
        this.rtStyle = null;
        this.dragWindow = null;
        this.resizeWindow = null;
        this.templates = {};
        this.HTMLParentElement = null;
        this.previousHoveredControl = null;
        this.canvas = null;
        window.int = v => {
            v = parseInt(v, 10);
            return isNaN(v) ? 0 : v;
        };
        window.float = v => {
            v = parseFloat(v);
            return isNaN(v) ? 0.0 : v;
        };
    }
    //#endregion constructor
    //#region Getters / Setters
    /**
     * Return the current renderer
     * @returns     {String}        The name of the current renderer
     */
    get renderer() { return document.documentElement.dataset.renderer !== undefined 
        ? document.documentElement.dataset.renderer : 'html'; }
    /**
     * Check if the current renderer is the HTML renderer
     * @returns     {Boolean}       true if the current renderer is HTML or false
     */
    get isHTMLRenderer() {
        return this.renderer === core.types.RENDERERS.HTML;
    }
    /**
     * Check if the current renderer is the canvas renderer
     * @returns     {Boolean}       true if the current renderer is canvas or false
     */
    get isCanvasRenderer() {
        return this.renderer === core.types.RENDERERS.CANVAS;
    }
    /**
     * Check if the current renderer is the SVG renderer
     * @returns     {Boolean}       true if the current renderer is SVG or false
     */
    get isSVGRenderer() {
        return this.renderer === core.types.RENDERERS.SVG;
    }
    //#endregion Getters / Setters
    //#region Methods
    /**
     * Check if the current renderer is the SVG renderer
     * @function registerPropertiesInCategory
     */
    registerPropertiesInCategory() {
        this.classes.registerPropertiesInCategory('ACTION', ['action', 'caption', 'enabled', 'helpContext', 'toolTip', 'visible']);
        this.classes.registerPropertiesInCategory('HELPHINTS', 
            ['helpContext', 'helpFile', 'helpKeyWord', 'helpType', 'toolTip', 'showToolTip', 'ownerShowToolTip']);
        this.classes.registerPropertiesInCategory('LAYOUT', 
            ['align', 'anchors', 'autosize', 'constraints', 'height', 'left', 'margins', 'padding', 'top', 'width', 'tabOrder']);
        this.classes.registerPropertiesInCategory('MISCELLANEOUS', []);
        this.classes.registerPropertiesInCategory('INPUT', ['enabled']);
        this.classes.registerPropertiesInCategory('DRAGDROPDOCKING', []);
        this.classes.registerPropertiesInCategory('LEGACY', []);
        this.classes.registerPropertiesInCategory('LINKAGE', ['action', 'popupMenu']);
        this.classes.registerPropertiesInCategory('LOCALE', []);
        this.classes.registerPropertiesInCategory('LOCALIZABLE', 
            ['caption', 'constraints', 'font', 'height', 'toolTip', 'icon', 'left', 'top', 'width']);
        this.classes.registerPropertiesInCategory('VISUAL', 
            ['align', 'cursor', 'enabled', 'caption', 'visible', 'width', 'top', 'left', 'height']);
        this.classes.registerPropertiesInCategory('DATABASE', []);
    }
    /**
     * Start the framework
     * @function start
     */
    start() {
        if (!core.ready) {
            let language = window.navigator.userLanguage || window.navigator.language;
            language.indexOf('-') === -1
                ? language = language + '-' + language.toUpperCase() : 1;
            core.currentLocale = language;
            core.isHTMLRenderer ? core.looper.fps = 25 : 1;
            core.looper.start();
            document.oncontextmenu = () => { return !1; };
            document.addEventListener('keydown', core.apps.keyDown, !0);
            document.addEventListener('keyup', core.apps.keyUp, !0);
            document.addEventListener('keypress', core.apps.keyPress, !0);
            if (core.isHTMLRenderer) {
                core.clipboard = document.createElement('textarea');
                core.clipboard.id = 'jaguiClipboard';
                core.clipboard.value = '.';
                document.body.appendChild(core.clipboard);
                // création de l'emplacement des css en runtime
                core.rtStyle = document.createElement('style');
                core.rtStyle.setAttribute('id', 'rtStyle');
                core.rtStyle.setAttribute('type', 'text/css');
                core.rtStyle.setAttribute('media', 'screen');
                document.getElementsByTagName('head')[0].appendChild(core.rtStyle);
                //let styleSheet = core.rtStyle.sheet;
                //styleSheet.insertRule('.hidden {display:none !important;}', styleSheet.cssRules.length);
                //return;
            }
            core.registerPropertiesInCategory();
            core.animatedCursor = new core.classes.AnimatedCursor();
            document.addEventListener('DOMContentLoaded', () => {
                const logo = document.createElement('span');
                logo.className = 'logo JAGUI';
                !core.HTMLParentElement ? document.body.appendChild(logo) : core.HTMLParentElement.appendChild(logo);
            });
            window.addEventListener('resize', () => {
                const applicationsKeys = Object.keys(core.apps.applications);
                applicationsKeys.forEach(key => {
                    core.apps.applications[key].windows.forEach(win => {
                        if (win.windowState === core.classes.Window.WINDOWSTATES.MAXIMIZED) {
                            win.width = window.innerWidth;
                            win.height = window.innerHeight;
                            win.resize();
                        }
                    });
                });
            });
            core.ready = !0;
            window.activeWindow = null;
            core.onStart && core.onStart();
        }
    }
    //#endregion Methods
};
window.core = new Core;
//#endregion Core