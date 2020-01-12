define(['require'], function (require) {
    //#region Methods
    function _new(name, value, days) {
        var date, expires;
        if (days) {
            date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        else expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    };
    function read(name) {
        var nameEQ = name + "=", ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === String.SPACE) c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    };
    function erase(name) {
        var Core = require("core");
        Core.createCookie(name, String.EMPTY, -1);
    }
    //#endregion Methods
    return {
        _new: _new,
        read: read,
        erase: erase
    }
});