define(['require'], function (require) {
    //#region Looper
    var looper = {
        listeners: [],
        functions: [],
        fps: 60,
        handle: null,
        paused: false,
        rAF: null,
        isBusy: false,
        //#region Getter/Setter
        setFPS: function (fps) {
            if (typeof fps !== "number") return;
            if (this.fps !== fps)
            {
                this.stop();
                this.fps = fps;
                this.rAF = window.requestAnimationFrameRate(this.fps);
                this.start();
            }
        },
        //#endregion
        start: function () {
            this.handle = this.rAF(this.loop);
        },
        stop: function () {
            if (this.handle !== null) window.cancelAnimationFrameRate(this.handle);
            this.handle = null;
        },
        pause: function () {
        },
        //#region Methods
        loop: function (elapsedTime) {
            var Core = require('core');
            if (Core.looper.paused || Core.looper.isBusy) return;
            if (!Core.looper.handle) return;
            Core.looper.isBusy = true;
            for (var i = 0, l = (Core.looper.listeners ? Core.looper.listeners.length : 0) ; i < l; i++)
            {
                var listener = Core.looper.listeners[i], func = Core.looper.functions[i];
                if (listener)
                {
                    listener[func](elapsedTime);
                }
            }
            Core.looper.isBusy = false;
            Core.looper.rAF(Core.looper.loop);
            //console.log('loop');
        },
        addListener: function (obj, func) {
            if (!obj) return;
            if (this.listeners.indexOf(obj) > -1) return;
            this.removeListener(obj);
            this.listeners.push(obj);
            if (!func) func = "processTick";
            this.functions.push(func);
        },
        removeListener: function (obj) {
            var index = this.listeners.indexOf(obj);
            if (index !== -1)
            {
                this.listeners.splice(index, 1);
                this.functions.splice(index, 1);
            }
        },
        removeAllListeners: function () {
            this.listeners.length = 0;
            //this.functions.length=0;
        }
        //#endregion
    };
    //#endregion
    return looper;
});