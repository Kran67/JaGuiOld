define(['require'], function (require) {
    //#region Methods
    function load(async, url, callback, xml, params) {
        var Types = require("types");
        if (typeof async !== Types.CONSTANTS.BOOLEAN) async = false;
        if (typeof xml !== Types.CONSTANTS.BOOLEAN) xml = false;
        if (!callback) callback = null;
        var xmlHTTPR = (window.ActiveXObject) ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
        xmlHTTPR.onreadystatechange = function () {
            var Types = require("types");
            if ((this.readyState === 4) && (this.status === 200))
            {
                if (typeof callback === Types.CONSTANTS.FUNCTION)
                {
                    if (async)
                    {
                        if (!xml) callback(this.responseText, params);
                        else callback(this.responseXML, params);
                    }
                }
            }
        };
        xmlHTTPR.open("GET", url, async);
        xmlHTTPR.send(null);
        if (!async)
        {
            if (typeof callback === _const.FUNCTION)
            {
                if (!xml) callback(xmlHTTPR.responseText, params);
                else callback(xmlHTTPR.responseXML, params);
            }
        }
    };
    //#endregion Methods
    return {
        load: load
    }
});