//#region Imports
import { BaseClass } from '/scripts/core/baseclass.js';
//#endregion Imports
//#region Looper
class Looper extends BaseClass {
    //#region Private fields
    #listeners = {};
    #fps = 60;
    #handle = null;
    #paused = !1;
    #rAF = null;
    #isBusy = !1;
    //#endregion Private fields
    //#region Getter / Setter
    //#region listeners
    get listeners() {
        return this.#listeners;
    }
    //#endregion listeners
    //#region functions
    //get functions() {
    //    return internal(this).functions;
    //}
    //#endregion functions
    //#region fps
    get fps() {
        return this.#fps;
    }
    set fps(newValue) {
        if (core.tools.isNumber(newValue) && this.#fps !== newValue) {
            this.stop();
            this.#fps = newValue;
            //this.#rAF = window.requestAnimationFrameRate(this.#fps);
            this.start();
        }
    }
    //#endregion fps
    //#region handle
    get handle() {
        return this.#handle;
    }
    set handle(newValue) {
        this.#handle !== newValue && (this.#handle = newValue);
    }
    //#endregion handle
    //#region paused
    get paused() {
        return this.#paused;
    }
    set paused(newValue) {
        core.tools.isBool(newValue) && this.#paused !== newValue && (this.#paused = newValue);
    }
    //#endregion paused
    //#region rAF
    get rAF() {
        return this.#rAF;
    }
    set rAF(newValue) {
        this.#rAF !== newValue && (this.#rAF = newValue);
    }
    //#endregion rAF
    //#region isBusy
    get isBusy() {
        return this.#isBusy;
    }
    set isBusy(newValue) {
        core.tools.isBool(newValue) && this.#isBusy !== newValue && (this.#isBusy = newValue);
    }
    //#endregion isBusy
    //#endregion Getter / Setter
    //#region Methods
    //#region start
    start() {
        this.#rAF = window.requestAnimationFrameRate(this.#fps);
        this.#handle = this.#rAF(core.looper.loop);
    }
    //#endregion start
    //#region stop
    stop() {
        this.#handle !== null && window.cancelAnimationFrameRate(this.#handle);
        this.#handle = null;
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
        func = func || 'processTick';
        if (obj.name) {
            if (!this.#listeners.hasOwnProperty(obj.name)) {
                this.#listeners[obj.name] = { component: obj, functions: [] };
                this.#listeners[obj.name].functions.push(func);
            } else {
                const idx = this.#listeners[obj.name].functions.indexOf(func);
                idx === -1 && this.#listeners[obj.name].functions.push(func);
            }
        }
    }
    //#endregion addListener
    //#region removeListener
    removeListener(obj, func) {
        func = func || 'processTick';
        if (this.#listeners.hasOwnProperty(obj.name)) {
            const idx = this.#listeners[obj.name].functions.indexOf(func);
            idx > -1 && this.#listeners[obj.name].functions.removeAt(idx);
            this.#listeners[obj.name].component = null;
            this.#listeners[obj.name] = null;
            delete this.#listeners[obj.name];
        }
    }
    //#endregion removeListener
    //#region removeAllListeners
    removeAllListeners() {
        //#region Variables déclaration
        const keys = Objects.keys(this.#listeners);
        //#endregion Variables déclaration
        keys.forEach(key => {
            this.#listeners[key].functions.length = 0;
            this.#listeners[key].component = null;
        });
        this.#listeners = {};
    }
    //#endregion removeAllListeners
    //#region destroy
    destroy() {
        this.#listeners.length = 0;
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
core.looper = new Looper;
//#endregion Looper
export { Looper };