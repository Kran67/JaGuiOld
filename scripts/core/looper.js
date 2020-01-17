//#region Imports
import { BaseClass } from "/scripts/core/baseclass.js";
import { Tools } from "/scripts/core/tools.js";
//#endregion Imports
//#region Looper
const Looper = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
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
            priv.listeners = [];
            priv.functions = [];
            priv.fps = 60;
            priv.handle = null;
            priv.paused = false;
            priv.rAF = null;
            priv.isBusy = false;
        }
        //#endregion constructor
        //#region Getter / Setter
        //#region listeners
        get listeners() {
            return internal(this).listeners;
        }
        //#endregion listeners
        //#region functions
        get functions() {
            return internal(this).functions;
        }
        //#endregion functions
        //#region fps
        get fps() {
            return internal(this).fps;
        }
        set fps(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.fps !== newValue) {
                    this.stop();
                    priv.fps = newValue;
                    //priv.rAF = window.requestAnimationFrameRate(priv.fps);
                    this.start();
                }
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
            if (priv.handle !== newValue) {
                priv.handle = newValue;
            }
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
            if (Tools.isBool(newValue)) {
                if (priv.paused !== newValue) {
                    priv.paused = newValue;
                }
            }
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
            if (priv.rAF !== newValue) {
                priv.rAF = newValue;
            }
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
            if (Tools.isBool(newValue)) {
                if (priv.isBusy !== newValue) {
                    priv.isBusy = newValue;
                }
            }
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
            priv.handle = priv.rAF(Core.looper.loop);
        }
        //#endregion start
        //#region stop
        stop() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.handle !== null) {
                window.cancelAnimationFrameRate(priv.handle);
            }
            priv.handle = null;
        }
        //#endregion stop
        //#region pause
        pause() { }
        //#endregion pause
        //#region loop
        loop(elapsedTime) {
            if (!Core.looper.paused && !Core.looper.isBusy && Core.looper.handle) {
                Core.looper.isBusy = true;
                Core.looper.listeners.forEach((listener, i) => {
                    const func = Core.looper.functions[i];
                    if (listener) {
                        listener[func](elapsedTime);
                    }
                });
                Core.looper.isBusy = false;
                Core.looper.rAF(Core.looper.loop);
            }
        }
        //#endregion loop
        //#region addListener
        addListener(obj, func) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (obj && priv.listeners.indexOf(obj) === -1) {
                priv.removeListener(obj);
                priv.listeners.push(obj);
                if (!func) {
                    func = "processTick";
                }
                priv.functions.push(func);
            }
        }
        //#endregion addListener
        //#region removeListener
        removeListener(obj) {
            //#region Variables déclaration
            const priv = internal(this);
            const index = priv.listeners.indexOf(obj);
            //#endregion Variables déclaration
            if (index !== -1) {
                priv.listeners.splice(index, 1);
                priv.functions.splice(index, 1);
            }
        }
        //#endregion removeListener
        //#region removeAllListeners
        removeAllListeners() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.listeners.length = 0;
            priv.functions.length = 0;
        }
        //#endregion removeAllListeners
        //#endregion Methods
    }
    return Looper;
    //#endregion Looper
})();
//#endregion
Core.looper = new Looper;
export { Looper };