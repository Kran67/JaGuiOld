//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
//#endregion Imports
//#region Looper
class Looper extends BaseClass {
    //#region constructor
    constructor() {
        super();
        core.private(this, {
            listeners: {},
            fps: 60,
            handle: null,
            paused: !1,
            rAF: null,
            isBusy: !1
        });
    }
    //#endregion constructor
    //#region Getter / Setter
    //#region listeners
    get listeners() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    //#endregion listeners
    //#region functions
    //get functions() {
    //    return internal(this).functions;
    //}
    //#endregion functions
    //#region fps
    get fps() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set fps(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        if (core.tools.isNumber(newValue) && priv[propName] !== newValue) {
            this.stop();
            core.private(this, { [propName]: newValue });
            //priv.rAF = window.requestAnimationFrameRate(priv.fps);
            this.start();
        }
    }
    //#endregion fps
    //#region handle
    get handle() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set handle(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        priv[propName] !== newValue && core.private(this, { [propName]: newValue });
    }
    //#endregion handle
    //#region paused
    get paused() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set paused(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        core.tools.isBool(newValue) && priv[propName] !== newValue && core.private(this, { [propName]: newValue });
    }
    //#endregion paused
    //#region rAF
    get rAF() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set rAF(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        priv[propName] !== newValue && core.private(this, { [propName]: newValue });
    }
    //#endregion rAF
    //#region isBusy
    get isBusy() {
        return core.private(this)[core.tools.getPropertyName()];
    }
    set isBusy(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const propName = core.tools.getPropertyName();
        //#endregion Variables déclaration
        core.tools.isBool(newValue) && priv[propName] !== newValue && core.private(this, { [propName]: newValue });
    }
    //#endregion isBusy
    //#endregion Getter / Setter
    //#region Methods
    //#region start
    start() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.rAF = window.requestAnimationFrameRate(priv.fps);
        core.private(this, { handle: priv.rAF(core.looper.loop) });
    }
    //#endregion start
    //#region stop
    stop() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.handle !== null && window.cancelAnimationFrameRate(priv.handle);
        core.private(this, { handle: null });
    }
    //#endregion stop
    //#region pause
    pause() { }
    //#endregion pause
    //#region loop
    loop(elapsedTime) {
        //#region Variables déclaration
        const keys = Object.keys(core.looper.listeners);
        //#endregion Variables déclaration
        if (!core.looper.paused && !core.looper.isBusy && core.looper.handle) {
            core.looper.isBusy = !0;
            keys.forEach(key => {
                const obj = core.looper.listeners[key];
                obj.functions.forEach(func => {
                    obj.component[func](elapsedTime);
                });
            });
            core.looper.isBusy = !1;
            core.looper.rAF(core.looper.loop);
        }
    }
    //#endregion loop
    //#region addListener
    addListener(obj, func) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        func = func || 'processTick';
        if (!priv.listeners.hasOwnProperty(obj.name)) {
            priv.listeners[obj.name] = { component: obj, functions: [] };
            priv.listeners[obj.name].functions.push(func);
        } else {
            const idx = priv.listeners[obj.name].functions.indexOf(func);
            idx === -1 && priv.listeners[obj.name].functions.push(func);
        }
    }
    //#endregion addListener
    //#region removeListener
    removeListener(obj, func) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        func = func || 'processTick';
        if (priv.listeners.hasOwnProperty(obj.name)) {
            const idx = priv.listeners[obj.name].functions.indexOf(func);
            idx > -1 && priv.listeners[obj.name].functions.removeAt(idx);
        }
    }
    //#endregion removeListener
    //#region removeAllListeners
    removeAllListeners() {
        //#region Variables déclaration
        const priv = core.private(this);
        const keys = Objects.keys(priv.listeners);
        //#endregion Variables déclaration
        keys.forEach(key => {
            priv.listeners[key].functions.length = 0;
            priv.listeners[key].component = null;
        });
        core.private(this, { listeners: {} });
    }
    //#endregion removeAllListeners
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.listeners.length = 0;
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
core.looper = new Looper;
//#endregion Looper
export { Looper };