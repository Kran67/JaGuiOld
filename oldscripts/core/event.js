define(['require'], function (require) {
    //#region Methods
    function bind(object, eventName, callBack) {
        var Types = require("types");
        if (typeof callBack !== Types.CONSTANTS.FUNCTION) return;
        if (!object) return;
        if (typeof eventName !== Types.CONSTANTS.STRING) return;
        object.addEventListener(eventName, callBack, false);
    };
    function unBind(object, eventName, callBack) {
        var Types = require("types");
        var args = arguments;
        if (typeof callBack !== Types.CONSTANTS.FUNCTION) return;
        if (!object) return;
        if (typeof eventName !== Types.CONSTANTS.STRING) return;
        object.removeEventListener(eventName, callBack, false);
    };
    function stop(eventArg) {
        eventArg.cancelBubble = true;
        eventArg.stopPropagation();
        eventArg.preventDefault();
    };
    function whichTransitionEvent() {
        var t, el = $j.doc.createElement('fakeelement'), transitions = {
            'transition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
        }, props;
        props = Object.keys(transitions);
        for (i = 0; i < props.length; i++) {
            if (el.style[props[i]]) return transitions[props[i]];
        }
    };
    function whichAnimationEvent() {
        var t, el = $j.doc.createElement('fakeelement'), transitions = {
            'animation': 'animationend',
            'OAnimation': 'oAnimationEnd',
            'MozAnimation': 'animationend',
            'WebkitAnimation': 'webkitAnimationEnd'
        }, props;
        props = Object.keys(transitions);
        for (i = 0; i < props.length; i++)
        {
            if (el.style[props[i]]) return transitions[props[i]];
        }
    };
    //#endregion Methods
    return {
        bind: bind,
        unBind: unBind,
        stop: stop,
        whichTransitionEvent: whichTransitionEvent,
        whichAnimationEvent: whichAnimationEvent
    }
});