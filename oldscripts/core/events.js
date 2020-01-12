define(['core', 'types'], function (Core, Types) {
    //#region NotifyEvent
    var NotifyEvent = Core.Class.extend("NotifyEvent", {
        init: function (sender) {
            this.stopPropagation = false;
            this.listeners = [];
            this.sender = sender;
        },
        //#region Methods
        addListener: function (f, d) {
            if (typeof f !== Types.CONSTANTS.FUNCTION) return;
            if (typeof d !== Types.CONSTANTS.NUMBER) d = 0;
            this.listeners.push({ func: f, delay: d });
        },
        removeListener: function (f) {
            if (typeof f !== Types.CONSTANTS.FUNCTION) return;
            for (var i = 0, l = this.listeners.length; i < l; i++)
            {
                if (this.listeners[i].func === f)
                {
                    this.listeners[i].func = null;
                    this.listeners.removeAt(i);
                    break;
                }
            }
        },
        copyListenerTo: function (listener) {
            if (!listener) return;
            for (var i = 0, l = this.listeners.length; i < l; i++)
            {
                if (typeof this.listeners[i].func) listener.addListener(this.listeners[i].func, this.listeners[i].delay);
            }
        },
        invoke: function () {
            var func, delay;
            if (!this.hasListener()) return;
            if (this.stopPropagation) return;
            for (var i = 0, l = this.listeners.length; i < l; i++)
            {
                func = this.listeners[i].func;
                delay = this.listeners[i].delay;
                if (delay > 0) setTimeout((function (sender, args) { func.apply(sender, args); })(this.sender, arguments), delay);
                else return func.apply(this.sender, arguments);
            }
        },
        hasListener: function () {
            return this.listeners.length > 0;
        },
        clearListeners: function () {
            for (var i = 0, l = this.listeners.length; i < l; i++)
            {
                if (typeof this.listeners[i].func) this.removeListener(this.listeners[i].func);
            }
            this.listeners.length = 0;
        },
        destroy: function () {
            this.stopPropagation = null;
            this.listeners.destroy();
            this.listeners = null;
            this.sender = null;
        }
        //#endregion
    });
    //#endregion
    //#region TimerEvent
    var TimerEvent = NotifyEvent.extend("TimerEvent", {
        init: function (sender) {
            this._inherited(sender);
            Core.looper.addListener(this, "_onTimerEvent");
        },
        //#region Methods
        _onTimerEvent: function () { }
        //#endregion
    });
    //#endregion
    return {
        NotifyEvent: NotifyEvent,
        TimerEvent: TimerEvent
    }
});