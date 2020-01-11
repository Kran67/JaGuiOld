//#region PerfGraph
const PerfGraph = class PerfGraph {
    //#region Constructor
    constructor() {
        this.GRAPH_RENDER_FPS = 0;
        this.GRAPH_RENDER_MS = 1;
        this.GRAPH_RENDER_PERCENT = 2;
        this.GRAPH_HISTORY_COUNT = 100;
        this.GPU_QUERY_COUNT = 5;
        this.style = this.GRAPH_RENDER_FPS;
        this.name = "";
        this.values = [];
        this.head = 0;
        this.show = false;
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
        //#endregion Variables déclaration
        for (let i = 0; i < this.GRAPH_HISTORY_COUNT; i++) {
            avg += this.values[i];
        }
        return avg / this.GRAPH_HISTORY_COUNT;
    }
    //#endregion getGraphAverage
    //#region renderGraph
    renderGraph(x, y) {
        //#region Variables déclaration
        let str = null;
        let i = 0;
        const fontName = "serif";
        const ctx = Core.perfCanvas.getContext("2d");
        //#endregion Variables déclaration
        const avg = this.getGraphAverage();
        const w = ctx.canvas.width;
        const h = ctx.canvas.height;
        ctx.save();
        ctx.clear();
        if (this.show) {
            ctx.beginPath();
            ctx.rect(x, y, w, h);
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fill();
            ctx.beginPath();
            ctx.moveTo(x, y + h);
            if (this.style === this.GRAPH_RENDER_FPS) {
                for (i = 0; i < this.GRAPH_HISTORY_COUNT; i++) {
                    let v = 1.0 / (0.00001 + this.values[(this.head + i) % this.GRAPH_HISTORY_COUNT]);
                    let vx = null;
                    let vy = null;
                    if (v > 80.0) {
                        v = 80.0;
                    }
                    vx = x + (i / (this.GRAPH_HISTORY_COUNT - 1)) * w;
                    vy = y + h - ((v / 80.0) * h);
                    ctx.lineTo(vx, vy);
                }
            }
            else if (this.style === this.GRAPH_RENDER_PERCENT) {
                for (i = 0; i < this.GRAPH_HISTORY_COUNT; i++) {
                    let v = this.values[(this.head + i) % this.GRAPH_HISTORY_COUNT] * 1.0;
                    let vx = null;
                    let vy = null;
                    if (v > 100.0) {
                        v = 100.0;
                    }
                    vx = x + (i / (this.GRAPH_HISTORY_COUNT - 1)) * w;
                    vy = y + h - ((v / 100.0) * h);
                    ctx.lineTo(vx, vy);
                }
            }
            else {
                for (i = 0; i < this.GRAPH_HISTORY_COUNT; i++) {
                    let v = this.values[(this.head + i) % this.GRAPH_HISTORY_COUNT] * 1000.0;
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
            ctx.fillStyle = "rgba(255, 192, 0, 0.5)";
            ctx.fill();
            if (this.name[0] !== '\0') {
                ctx.font = `14px ${fontName}`;
                ctx.textAlign = "left";
                ctx.textBaseline = "top";
                ctx.fillStyle = "rgba(240, 240, 240, 0.75)";
                ctx.fillText(this.name, x + 3, y + 1);
            }
            if (this.style === this.GRAPH_RENDER_FPS) {
                ctx.font = `18px ${fontName}`;
                ctx.textAlign = "right";
                ctx.textBaseline = "top";
                ctx.fillStyle = "rgb(240, 240, 240)";
                str = `${(1.0 / avg).toFixed(2)} FPS`;
                ctx.fillText(str, x + w - 3, y + 1);
                ctx.font = `15px ${fontName}`;
                ctx.textAlign = "right";
                ctx.textBaseline = "bottom";
                ctx.fillStyle = "rgba(240, 240, 240, 0.62)";
                str = `${(avg * 1000).toFixed(2)} ms`;
                ctx.fillText(str, x + w - 3, y + h - 1);
            }
            else if (this.style === this.GRAPH_RENDER_PERCENT) {
                ctx.fontSize(18.0);
                ctx.textAlign = "right";
                ctx.textBaseline = "top";
                ctx.fillStyle = "rgb(240, 240, 240)";
                str = `${(avg * 1.0).toFixed(1)} %`;
                ctx.fillText(str, x + w - 3, y + 1);
            }
            else {
                ctx.font = `18px ${fontName}`;
                ctx.textAlign = "right";
                ctx.textBaseline = "top";
                ctx.fillStyle = "rgb(240, 240, 240)";
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
Core.initCanvas = function () {
    //#region Variables déclaration
    const canvas = document.createElement("canvas");
    const buffer = document.createElement("canvas");
    const perfCanvas = document.createElement("canvas");
    const canvasStyle = canvas.style;
    const perfCanvasStyle = perfCanvas.style;
    const fps = new PerfGraph();
    //let prevt = 0.0;
    //#endregion Variables déclaration
    isCoreReady = this.apps && this.apps.activeApplication;
    if (isCoreReady) {
        fps.initGraph(fps.GRAPH_RENDER_FPS, "Frame Time");
        this.canvas = canvas;
        this.canvas.needRedraw = false;
        this.buffer = buffer;
        this.perfCanvas = perfCanvas;
        this.fps = fps;
        this.metrics = {};
        document.body.appendChild(canvas);
        document.body.appendChild(perfCanvas);
        //canvas.tabIndex = 1;
        canvasStyle.position = "absolute";
        canvasStyle.left = 0;
        canvasStyle.right = 0;
        canvasStyle.top = 0;
        canvasStyle.bottom = 0;
        canvasStyle.width = "100%";
        canvasStyle.height = "100%";
        canvasStyle.zIndex = 1;

        perfCanvasStyle.position = "absolute";
        perfCanvasStyle.left = "5px";
        perfCanvasStyle.top = "5px";
        perfCanvasStyle.width = "200px";
        perfCanvasStyle.height = "35px";
        perfCanvas.width = 200;
        perfCanvas.height = 35;
        perfCanvasStyle.zIndex = 2;

        buffer.width = canvas.width = window.innerWidth;
        buffer.height = canvas.height = window.innerHeight;
        window.addEventListener("resize", (event) => {
            buffer.width = canvas.width = window.innerWidth;
            buffer.height = canvas.height = window.innerHeight;
        });
        this.ctxC = canvas.getContext("2d");
        this.ctx = buffer.getContext("2d");
        canvas.addEventListener("mousemove", this.internalMouseEvent, true);
        canvas.addEventListener("mousedown", this.internalMouseEvent, true);
        canvas.addEventListener("mouseup", this.internalMouseEvent, true);
        canvas.addEventListener("DOMMouseScroll", this.internalMouseEvent, true);
        canvas.addEventListener("mousewheel", this.internalMouseEvent, true);
        canvas.addEventListener("touchstart", this.internalMouseEvent, true);
        canvas.addEventListener("touchmove", this.internalMouseEvent, true);
        canvas.addEventListener("touchend", this.internalMouseEvent, true);
        canvas.addEventListener("dblclick", this.internalMouseEvent, true);
        //prevt = new Date().getTime() / 1000;
    }
    this.themes.images = {};
    this.loadImages("../../images/", ["logo.png"]);
    this.themes.fonts = {};
    this.loadFonts("../../../../fonts", [
        {
            alias: "jagui",
            file: "jagui.ttf"
        }
    ]);
    const _fini = () => {
        Core.ctx = null;
    };
    if (isCoreReady) {
        //window.requestAnimationFrame(_tick);
        Core.looper.addListener(Core, "_tick");
    }
};
//#endregion initCanvas
//#region _tick
Core._tick = (time) => {
    //#region Variables déclaration
    const ctx = Core.ctx;
    //#endregion Variables déclaration
    if (!ctx) {
        throw new Error();
    }
    if (!Core.vars) {
        Core.vars = {};
    }
    Core.fps.updateGraph(time / 1000);
    // Update and render
    if (Core.canvas.needRedraw && !Core.canvas.busy) {
        Core.canvas.busy = true;
        Core.canvas.needRedraw = false;
        Core.ctxC.clear();
        ctx.clear();
        Core.apps.renderApplications();
        Core.ctxC.drawImage(Core.buffer, 0, 0);
        Core.canvas.busy = false;
    }
    Core.fps.renderGraph(0, 0);
    //if (isCoreReady) {
    //    window.requestAnimationFrame(_tick);
    //}
};
//#endregion _tick
//#region loadFonts
Core.loadFonts = (path, fonts, callback) => {
    fonts.forEach(font => {
        if (!Core.checkFontAvailable(font.alias)) {
            if (!Core.themes.fonts[font.alias]) {
                const fontFace = new FontFace(font.alias, `url(${path}/${font.file})`);
                fontFace.load().then((loaded_face) => {
                    // use font here
                    document.fonts.add(loaded_face);
                    Core.themes.fonts[font.alias] = loaded_face;
                    if (callback && typeof callback === Types.CONSTANTS.FUNCTION) {
                        callback();
                    }
                }).catch((error) => {
                    console.log(`${error} - Could not add font ${font.file}.\n`);
                });
            }
        } else {
            Core.themes.fonts[font.alias] = { status: "loaded" };
            if (callback && typeof callback === Types.CONSTANTS.FUNCTION) {
                callback();
            }
        }
    });
};
//#endregion loadFonts
//#region loadImages
Core.loadImages = (path, images) => {
    //#region Variables déclaration
    //#endregion Variables déclaration
    images.forEach(image => {
        const imgName = image.split(".")[0];
        const img = new Image();
        Core.themes.images[imgName] = img;
        img.onerror = function () {
            console.log(`Could not load ${image}.`);
        };
        img.src = `${path}${image}`;
    });
};
//#endregion loadImages
//#region deleteImages
Core.deleteImages = (theme) => {
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
Object.defineProperty(Core, "showFPS", {
    get: function () {
        return this.fps.show;
    },
    set: function (newValue) {
        if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
            this.fps.show = newValue;
        }
    }

});
Core.checkFontAvailable = (font) => {
    if (font && font !== "______NONE______") {
        const context = document.createElement("canvas").getContext("2d");
        context.font = `200px ______NONE______`;
        const originalWidth = context.measureText("A").width;
        context.font = `200px ${font.replace(/^\s*['"]|['"]\s*$/g, String.EMPTY)}`;
        return context.measureText("A").width !== originalWidth;
    }
    return false;
};
Core.internalMouseEvent = function (mouseEventArg) {
    const filterControls = (ctrl) => {
        if (ctrl.isVisible && ctrl instanceof Core.classes.Control && ctrl.hitTest.has(mouseEventArg.type)) {
            const bcr = ctrl.getBoundingClientRect();
            if (Core.mouse.document.inRect(bcr)) {
                return ctrl;
            }
        }
    };
    const filterWindows = (win) => {
        if (win.visible && win !== this.activeWindow) {
            return win;
        }
    };
    const activeApp = Core.apps.activeApplication;
    let activeWin = activeApp.activeWindow;
    const mouseMove = Types.HTMLEVENTS.MOUSEMOVE;
    if (mouseEventArg) {
        Core.mouse.getMouseInfos(mouseEventArg);
    }
    if (!activeWin) {
        if (Core.mouse.button !== Core.mouse.constructor.MOUSEBUTTONS.NONE) {
            activeApp.activeWindow = activeApp.lastActiveWindow.length ? activeApp.lastActiveWindow.last : activeApp.windows.first;
        } else {
            return;
        }
    }
    activeWin = activeApp.activeWindow;
    const bcr = activeWin.getBoundingClientRect();
    if (Core.mouse.document.inRect(bcr)) {
        const ctrls = activeWin.allControls.filterBy(filterControls, activeApp);
        if (ctrls.length > 0) {
            const ctrl = ctrls.slice().reverse().first;
            if (Core.mouse.event.type === mouseMove && Core.previousHoveredControl !== ctrl) {
                if (Core.previousHoveredControl) {
                    Core.previousHoveredControl.mouseLeave();
                }
                ctrl.mouseEnter();
            }
            ctrl.dispatchEvent(mouseEventArg);
            Core.previousHoveredControl = ctrl;
        } else if (activeWin.visible) {
            if (Core.previousHoveredControl) {
                Core.previousHoveredControl.mouseLeave();
            }
            activeWin.dispatchEvent(mouseEventArg);
            Core.previousHoveredControl = activeWin;
        }
    } else {
        if (Core.previousHoveredControl) {
            Core.previousHoveredControl.mouseLeave();
            Core.previousHoveredControl = null;
        }
        // on est pas dans la fenêtre active, on va chercher dans les autres fenêtres affichées
        if (activeApp.windows.length > 1 && !activeWin.isModal) {
            const wins = activeApp.windows.filterBy(filterWindows);
            if (wins.length > 0) {
                // TODO
            }
        } else {
            // on à rien trouvé dans les autres fenêtres affichées, on va chercher dans les autres applications
            const appsKey = Object.keys(Core.apps.applications);
            appsKey.forEach(app => {
                if (app !== Core.apps.activeApplication.name) {
                    // TODO
                }
            });
        }
    }
};
Core.onStart = Core.initCanvas;