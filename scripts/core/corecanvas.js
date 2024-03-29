﻿//#region PerfGraph
const PerfGraph = class PerfGraph {
    //#region Constructor
    constructor() {
        this.GRAPH_RENDER_FPS = 0;
        this.GRAPH_RENDER_MS = 1;
        this.GRAPH_RENDER_PERCENT = 2;
        this.GRAPH_HISTORY_COUNT = 100;
        this.GPU_QUERY_COUNT = 5;
        this.style = this.GRAPH_RENDER_FPS;
        this.name = '';
        this.values = [];
        this.head = 0;
        this.show = !1;
    }
    //#endregion Constructor
    //#region Methods
    //#region initGraph
    initGraph(style, name) {
        for (let i = 0; i < this.GRAPH_HISTORY_COUNT; i++) {
            this.values[i] = 0;
        }
        this.style = style;
        this.name = name;
    }
    //#endregion initGraph
    //#region updateGraph
    updateGraph(frameTime) {
        this.head = (this.head + 1) % this.GRAPH_HISTORY_COUNT;
        this.values[this.head] = frameTime;
    }
    //#endregion updateGraph
    //#region getGraphAverage
    getGraphAverage() {
        //#region Variables déclaration
        let avg = 0;
        const GRAPH_HISTORY_COUNT = this.GRAPH_HISTORY_COUNT;
        //#endregion Variables déclaration
        for (let i = 0; i < GRAPH_HISTORY_COUNT; i++) {
            avg += this.values[i];
        }
        return avg / GRAPH_HISTORY_COUNT;
    }
    //#endregion getGraphAverage
    //#region renderGraph
    renderGraph(x, y) {
        //#region Variables déclaration
        let str = null;
        let i = 0;
        const fontName = 'serif';
        const ctx = core.perfCanvas.getContext('2d');
        const avg = this.getGraphAverage();
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;
        const GRAPH_HISTORY_COUNT = this.GRAPH_HISTORY_COUNT;
        const GRAPH_RENDER_PERCENT = this.GRAPH_RENDER_PERCENT;
        const GRAPH_RENDER_FPS = this.GRAPH_RENDER_FPS;
        //#endregion Variables déclaration
        ctx.save();
        ctx.clear();
        if (this.show) {
            ctx.beginPath();
            ctx.rect(x, y, w, h);
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(x, y + h);
            if (this.style === GRAPH_RENDER_FPS) {
                for (i = 0; i < GRAPH_HISTORY_COUNT; i++) {
                    let v = 1.0 / (0.00001 + this.values[(this.head + i) % GRAPH_HISTORY_COUNT]);
                    let vx = null;
                    let vy = null;
                    if (v > 80.0) {
                        v = 80.0;
                    }
                    vx = x + (i / (GRAPH_HISTORY_COUNT - 1)) * w;
                    vy = y + h - ((v / 80.0) * h);
                    ctx.lineTo(vx, vy);
                }
            }
            else if (this.style === GRAPH_RENDER_PERCENT) {
                for (i = 0; i < GRAPH_HISTORY_COUNT; i++) {
                    let v = this.values[(this.head + i) % GRAPH_HISTORY_COUNT] * 1.0;
                    let vx = null;
                    let vy = null;
                    if (v > 100.0) {
                        v = 100.0;
                    }
                    vx = x + (i / (GRAPH_HISTORY_COUNT - 1)) * w;
                    vy = y + h - ((v / 100.0) * h);
                    ctx.lineTo(vx, vy);
                }
            }
            else {
                for (i = 0; i < GRAPH_HISTORY_COUNT; i++) {
                    let v = this.values[(this.head + i) % GRAPH_HISTORY_COUNT] * 1000.0;
                    let vx = null;
                    let vy = null;
                    if (v > 20.0) {
                        v = 20.0;
                    }
                    vx = x + (i / (GRAPH_HISTORY_COUNT - 1)) * w;
                    vy = y + h - ((v / 20.0) * h);
                    ctx.lineTo(vx, vy);
                }
            }
            ctx.lineTo(x + w, y + h);
            ctx.fillStyle = 'rgba(255, 192, 0, 0.5)';
            ctx.fill();
            if (this.name[0] !== '\0') {
                ctx.font = `14px ${fontName}`;
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';
                ctx.fillStyle = 'rgba(240, 240, 240, 0.75)';
                ctx.fillText(this.name, x + 3, y + 1);
            }
            if (this.style === GRAPH_RENDER_FPS) {
                ctx.font = `18px ${fontName}`;
                ctx.textAlign = 'right';
                ctx.textBaseline = 'top';
                ctx.fillStyle = 'rgb(240, 240, 240)';
                str = `${(1.0 / avg).toFixed(2)} FPS`;
                ctx.fillText(str, x + w - 3, y + 1);
                ctx.font = `15px ${fontName}`;
                ctx.textAlign = 'right';
                ctx.textBaseline = 'bottom';
                ctx.fillStyle = 'rgba(240, 240, 240, 0.62)';
                str = `${(avg * 1000).toFixed(2)} ms`;
                ctx.fillText(str, x + w - 3, y + h - 1);
            }
            else if (this.style === GRAPH_RENDER_PERCENT) {
                ctx.fontSize(18.0);
                ctx.textAlign = 'right';
                ctx.textBaseline = 'top';
                ctx.fillStyle = 'rgb(240, 240, 240)';
                str = `${(avg * 1.0).toFixed(1)} %`;
                ctx.fillText(str, x + w - 3, y + 1);
            }
            else {
                ctx.font = `18px ${fontName}`;
                ctx.textAlign = 'right';
                ctx.textBaseline = 'top';
                ctx.fillStyle = 'rgb(240, 240, 240)';
                str = `${(avg * 1000).toFixed(2)} ms`;
                ctx.fillText(str, x + w - 3, y + 1);
            }
            ctx.restore();
        }
    }
    //#endregion renderGraph
    //#endregion Methods
};
//#endregion PerfGraph
//#region initCanvas
core.initCanvas = function () {
    //#region Variables déclaration
    const canvas = document.createElement('canvas');
    const buffer = document.createElement('canvas');
    const perfCanvas = document.createElement('canvas');
    const canvasStyle = canvas.style;
    const perfCanvasStyle = perfCanvas.style;
    const fps = new PerfGraph();
    //#endregion Variables déclaration
    isCoreReady = this.apps && this.apps.activeApplication;
    if (isCoreReady) {
        fps.initGraph(fps.GRAPH_RENDER_FPS, 'Frame Time');
        this.canvas = canvas;
        this.canvas.needRedraw = !1;
        this.buffer = buffer;
        this.perfCanvas = perfCanvas;
        this.fps = fps;
        this.metrics = {};
        document.body.appendChild(canvas);
        document.body.appendChild(perfCanvas);
        canvasStyle.position = 'absolute';
        canvasStyle.left = 0;
        canvasStyle.right = 0;
        canvasStyle.top = 0;
        canvasStyle.bottom = 0;
        canvasStyle.width = '100%';
        canvasStyle.height = '100%';
        canvasStyle.zIndex = 1;

        perfCanvasStyle.position = 'absolute';
        perfCanvasStyle.left = '5px';
        perfCanvasStyle.top = '5px';
        perfCanvasStyle.width = '200px';
        perfCanvasStyle.height = '35px';
        perfCanvas.width = 200;
        perfCanvas.height = 35;
        perfCanvasStyle.zIndex = 2;

        buffer.width = canvas.width = window.innerWidth;
        buffer.height = canvas.height = window.innerHeight;
        window.addEventListener('resize', (event) => {
            buffer.width = canvas.width = window.innerWidth;
            buffer.height = canvas.height = window.innerHeight;
        });
        this.ctxC = canvas.getContext('2d');
        this.ctx = buffer.getContext('2d');
        canvas.addEventListener('mousemove', this.internalMouseEvent, !0);
        canvas.addEventListener('mousedown', this.internalMouseEvent, !0);
        canvas.addEventListener('mouseup', this.internalMouseEvent, !0);
        canvas.addEventListener('DOMMouseScroll', this.internalMouseEvent, !0);
        canvas.addEventListener('mousewheel', this.internalMouseEvent, !0);
        canvas.addEventListener('touchstart', this.internalMouseEvent, !0);
        canvas.addEventListener('touchmove', this.internalMouseEvent, !0);
        canvas.addEventListener('touchend', this.internalMouseEvent, !0);
        canvas.addEventListener('dblclick', this.internalMouseEvent, !0);
        //prevt = new Date().getTime() / 1000;
    }
    this.themes.images = {};
    this.loadImages('../../images/', ['logo.png']);
    this.themes.fonts = {};
    this.loadFonts('../../../../fonts', [
        {
            alias: 'jagui',
            file: 'jagui.ttf'
        }
    ]);
    const _fini = () => {
        core.ctx = null;
    };
    if (isCoreReady) {
        //window.requestAnimationFrame(_tick);
        core.looper.addListener(Core, '_tick');
    }
};
//#endregion initCanvas
//#region _tick
core._tick = (time) => {
    //#region Variables déclaration
    const ctx = core.ctx;
    //#endregion Variables déclaration
    if (!ctx) {
        throw new Error();
    }
    core.vars = core.vars || {};
    core.fps.updateGraph(time / 1000);
    // Update and render
    if (core.canvas.needRedraw && !core.canvas.busy) {
        core.canvas.busy = !0;
        core.canvas.needRedraw = !1;
        core.ctxC.clear();
        ctx.clear();
        core.apps.renderApplications();
        core.ctxC.drawImage(core.buffer, 0, 0);
        core.canvas.busy = !1;
    }
    core.fps.renderGraph(0, 0);
    //if (isCoreReady) {
    //    window.requestAnimationFrame(_tick);
    //}
};
//#endregion _tick
//#region loadFonts
core.loadFonts = (path, fonts, callback) => {
    fonts.forEach(font => {
        if (!core.checkFontAvailable(font.alias)) {
            if (!core.themes.fonts[font.alias]) {
                const fontFace = new FontFace(font.alias, `url(${path}/${font.file})`);
                fontFace.load().then((loaded_face) => {
                    // use font here
                    document.fonts.add(loaded_face);
                    core.themes.fonts[font.alias] = loaded_face;
                    if (callback && core.tools.isFunc(callback)) {
                        callback();
                    }
                }).catch((error) => {
                    console.log(`${error} - Could not add font ${font.file}.\n`);
                });
            }
        } else {
            core.themes.fonts[font.alias] = { status: 'loaded' };
            callback && core.tools.isFunc(callback) && callback();
        }
    });
};
//#endregion loadFonts
//#region loadImages
core.loadImages = (path, images) => {
    //#region Variables déclaration
    //#endregion Variables déclaration
    images.forEach(image => {
        const imgName = image.split('.')[0];
        const img = new Image();
        core.themes.images[imgName] = img;
        img.onerror = function () {
            console.log(`Could not load ${image}.`);
        };
        img.src = `${path}${image}`;
    });
};
//#endregion loadImages
//#region deleteImages
core.deleteImages = (theme) => {
    //#region Variables déclaration
    const keys = Object.keys(theme.images);
    //#endregion Variables déclaration
    keys.forEach(key => {
        ctx.deleteImage(theme.images[key]);
        theme.images[key] = null;
        delete theme.images[key];
    });
};
//#endregion deleteImages
Object.defineProperty(Core, 'showFPS', {
    get: function () {
        return this.fps.show;
    },
    set: function (newValue) {
        if (core.tools.isBool(newValue)) {
            this.fps.show = newValue;
        }
    }

});
core.checkFontAvailable = (font) => {
    if (font && font !== '______NONE______') {
        const context = document.createElement('canvas').getContext('2d');
        context.font = `200px ______NONE______`;
        const originalWidth = context.measureText('A').width;
        context.font = `200px ${font.replace(/^\s*['']|['']\s*$/g, String.EMPTY)}`;
        return context.measureText('A').width !== originalWidth;
    }
    return !1;
};
core.internalMouseEvent = function (mouseEventArg) {
    const filterControls = (ctrl) => {
        if (ctrl.isVisible && ctrl instanceof core.classes.Control && ctrl.hitTest.has(mouseEventArg.type)) {
            const bcr = ctrl.getBoundingClientRect();
            if (core.mouse.document.inRect(bcr)) {
                return ctrl;
            }
        }
    };
    const filterWindows = (win) => {
        if (win.visible && win !== this.activeWindow) {
            return win;
        }
    };
    const activeApp = core.apps.activeApplication;
    let activeWin = activeApp.activeWindow;
    const mouseMove = core.types.HTMLEVENTS.MOUSEMOVE;
    mouseEventArg && core.mouse.getMouseInfos(mouseEventArg);
    if (!activeWin) {
        if (core.mouse.button !== core.mouse.MOUSEBUTTONS.NONE) {
            activeApp.activeWindow = activeApp.lastActiveWindow.length ? activeApp.lastActiveWindow.last : activeApp.windows.first;
        } else {
            return;
        }
    }
    activeWin = activeApp.activeWindow;
    const bcr = activeWin.getBoundingClientRect();
    if (core.mouse.document.inRect(bcr)) {
        const ctrls = activeWin.allControls.filterBy(filterControls, activeApp);
        if (ctrls.length > 0) {
            const ctrl = ctrls.slice().reverse().first;
            if (core.mouse.event.type === mouseMove && core.previousHoveredControl !== ctrl) {
                core.previousHoveredControl && core.previousHoveredControl.mouseLeave();
                ctrl.mouseEnter();
            }
            ctrl.dispatchEvent(mouseEventArg);
            core.previousHoveredControl = ctrl;
        } else if (activeWin.visible) {
            core.previousHoveredControl && core.previousHoveredControl.mouseLeave();
            activeWin.dispatchEvent(mouseEventArg);
            core.previousHoveredControl = activeWin;
        }
    } else {
        if (core.previousHoveredControl) {
            core.previousHoveredControl.mouseLeave();
            core.previousHoveredControl = null;
        }
        // on est pas dans la fenêtre active, on va chercher dans les autres fenêtres affichées
        if (activeApp.windows.length > 1 && !activeWin.isModal) {
            const wins = activeApp.windows.filterBy(filterWindows);
            if (wins.length > 0) {
                // TODO
            }
        } else {
            // on à rien trouvé dans les autres fenêtres affichées, on va chercher dans les autres applications
            const appsKey = Object.keys(core.apps.applications);
            appsKey.forEach(app => {
                if (app !== core.apps.activeApplication.name) {
                    // TODO
                }
            });
        }
    }
};
core.onStart = core.initCanvas;