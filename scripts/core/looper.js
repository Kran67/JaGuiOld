//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
//#endregion Imports
//#region Looper
const Looper = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) ? _private.set(key, {}) : 1;
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Looper
    class Looper extends BaseClass {
        //#region constructor
        constructor() {
            super();
            const priv = internal(this);
            priv.listeners = {};
            priv.fps = 60;
            priv.handle = null;
            priv.paused = !1;
            priv.rAF = null;
            priv.isBusy = !1;
        }
        //#endregion constructor
        //#region Getter / Setter
        //#region listeners
        get listeners() {
            return internal(this).listeners;
        }
        //#endregion listeners
        //#region functions
        //get functions() {
        //    return internal(this).functions;
        //}
        //#endregion functions
        //#region fps
        get fps() {
            return internal(this).fps;
        }
        set fps(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (core.tools.isNumber(newValue) && priv.fps !== newValue) {
                this.stop();
                priv.fps = newValue;
                //priv.rAF = window.requestAnimationFrameRate(priv.fps);
                this.start();
            }
        }
        //#endregion fps
        //#region handle
        get handle() {
            return internal(this).handle;
        }
        set handle(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.handle !== newValue ? priv.handle = newValue : 1;
        }
        //#endregion handle
        //#region paused
        get paused() {
            return internal(this).paused;
        }
        set paused(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isBool(newValue) && priv.paused !== newValue ? priv.paused = newValue : 1;
        }
        //#endregion paused
        //#region rAF
        get rAF() {
            return internal(this).rAF;
        }
        set rAF(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.rAF !== newValue ? priv.rAF = newValue : 1;
        }
        //#endregion rAF
        //#region isBusy
        get isBusy() {
            return internal(this).isBusy;
        }
        set isBusy(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isBool(newValue) && priv.isBusy !== newValue ? priv.isBusy = newValue : 1;
        }
        //#endregion isBusy
        //#endregion Getter / Setter
        //#region Methods
        //#region start
        start() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.rAF = window.requestAnimationFrameRate(priv.fps);
            priv.handle = priv.rAF(core.looper.loop);
        }
        //#endregion start
        //#region stop
        stop() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.handle !== null ? window.cancelAnimationFrameRate(priv.handle) : 1;
            priv.handle = null;
        }
        //#endregion stop
        //#region pause
        pause() { }
        //#endregion pause
        //#region loop
        loop(elapsedTime) {
            const keys = Object.keys(core.looper.listeners);
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
            const priv = internal(this);
            //#endregion Variables déclaration
            func = func || 'processTick';
            if (!priv.listeners.hasOwnProperty(obj.name)) {
                priv.listeners[obj.name] = { component: obj, functions: [] };
                priv.listeners[obj.name].functions.push(func);
            } else {
                const idx = priv.listeners[obj.name].functions.indexOf(func);
                idx === -1 ? priv.listeners[obj.name].functions.push(func) : 1;
            }
        }
        //#endregion addListener
        //#region removeListener
        removeListener(obj, func) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            func = func || 'processTick';
            if (priv.listeners.hasOwnProperty(obj.name)) {
                const idx = priv.listeners[obj.name].functions.indexOf(func);
                idx > -1 ? priv.listeners[obj.name].functions.removeAt(idx) : 1;
            }
        }
        //#endregion removeListener
        //#region removeAllListeners
        removeAllListeners() {
            //#region Variables déclaration
            const priv = internal(this);
            const keys = Objects.keys(priv.listeners);
            //#endregion Variables déclaration
            keys.forEach(key => {
                priv.listeners[key].functions.length = 0;
                priv.listeners[key].component = null;
            });
            priv.listeners = {};
        }
        //#endregion removeAllListeners
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.listeners.length = 0;
            priv.listeners = null;
            priv.fps = null;
            priv.handle = null;
            priv.paused = null;
            priv.rAF = null;
            priv.isBusy = null;
            super.destroy();
        }
        //#endregion destroy
        //#endregion Methods
    }
    return Looper;
    //#endregion Looper
})();
core.looper = new Looper;
//#endregion Looper
export { Looper };