define(['require', 'core'], function (require, Core) {
    //#region Methods
    function clean(uri) {
        return uri.replace("url(", String.EMPTY).replace(")", String.EMPTY).replace(/"/g, String.EMPTY);
    };
    function split(path, returnLast) {
        var splited = path.split("/");
        if (!returnLast) returnLast = false;
        if (returnLast) return splited[splited.length - 1];
        else return splited;
    };
    function base() {
        var Tools = require("tools");
        var uri = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + "/";
        if (location.href.toLowerCase().indexOf(Tools.getPath("base").toLowerCase()) > -1) uri += Tools.getPath("base") + "/";
        return uri;
    };
    function extractFileName(url) {
        var Tools = require("tools");
        return Tools.uri.split(url, true);
    };
    function extractFileExt(url) {
        return url.split(".").last();
    };
    function getParamValue(param, url) {
        var u = !url ? document.location.href : url, reg = new RegExp('(\\?|&|^)' + param + '=(.*?)(&|$)'), matches = u.match(reg);
        return (matches && matches[2]) ? decodeURIComponent(matches[2]).replace(/\+/g, ' ') : '';
    };
    function convertToRealURI(uri) {
        var newUri, props;
        props = Object.keys(Core.folders);
        for (var i = 0; i < props.length; i++)
        {
            newUri = uri.split(props[i]);
            if (newUri.length > 1) uri = newUri.join(Core.folders[props[i]]);
        }
        return uri;
    };
    //#endregion Methods
    return {
        clean: clean,
        split: split,
        base: base,
        extractFileName: extractFileName,
        extractFileExt: extractFileExt,
        getParamValue: getParamValue,
        convertToRealURI: convertToRealURI
    }
});