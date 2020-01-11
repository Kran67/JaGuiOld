import { BaseClass } from "/scripts/core/baseclass.js";
//#region Looper
const Looper = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class Looper extends BaseClass {
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
        //#region Getter/Setter
        get listeners() {
            return internal(this).listeners;
        }
        get functions() {
            return internal(this).functions;
        }
        get fps() {
            return internal(this).fps;
        }
        set fps(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (priv.fps !== newValue) {
                    this.stop();
                    priv.fps = newValue;
                    //priv.rAF = window.requestAnimationFrameRate(priv.fps);
                    this.start();
                }
            }
        }
        get handle() {
            return internal(this).handle;
        }
        set handle(newValue) {
            if (internal(this).handle !== newValue) {
                internal(this).handle = newValue;
            }
        }
        get paused() {
            return internal(this).paused;
        }
        set paused(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (priv.paused !== newValue) {
                    priv.paused = newValue;
                }
            }
        }
        get rAF() {
            return internal(this).rAF;
        }
        set rAF(newValue) {
            const priv = internal(this);
            if (priv.rAF !== newValue) {
                priv.rAF = newValue;
            }
        }
        get isBusy() {
            return internal(this).isBusy;
        }
        set isBusy(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (priv.isBusy !== newValue) {
                    priv.isBusy = newValue;
                }
            }
        }
        //#endregion
        //#region Methods
        start() {
            const priv = internal(this);
            priv.rAF = window.requestAnimationFrameRate(priv.fps);
            this.handle = priv.rAF(this.loop);
        }
        stop() {
            const handle = this.handle;
            if (handle !== null) {
                window.cancelAnimationFrameRate(handle);
            }
            this.handle = null;
        }
        pause() { }
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
                //console.log('loop');
            }
        }
        addListener(obj, func) {
            if (obj && this.listeners.indexOf(obj) === -1) {
                this.removeListener(obj);
                this.listeners.push(obj);
                if (!func) {
                    func = "processTick";
                }
                this.functions.push(func);
            }
        }
        removeListener(obj) {
            const listeners = this.listeners;
            const index = listeners.indexOf(obj);
            if (index !== -1) {
                listeners.splice(index, 1);
                this.functions.splice(index, 1);
            }
        }
        removeAllListeners() {
            this.listeners.length = 0;
            this.functions.length = 0;
        }
        //#endregion
    }
    return Looper;
})();
//#endregion
Core.looper = new Looper;
export { Looper };