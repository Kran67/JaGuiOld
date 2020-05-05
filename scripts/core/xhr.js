/**
 *
 */
//#region Xhr
class Xhr {
    //#region Methods
    /**
     *
     * @param {Object}      params
     * @param {Boolean}     params.async
     * @param {String}      params.url
     * @param {Function}    params.callback
     * @param {Boolean}     params.xml
     * @param {Object}      params.parameters
     */
    //#region load
    static load(params) {
        !core.tools.isBool(params.async) && (params.async = !1);
        !core.tools.isBool(params.xml) && (params.xml = !1);
        !params.callback && (params.callback = null);
        const xmlHTTPR = window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
        xmlHTTPR.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200 && core.tools.isFunc(params.callback) && params.async) {
                !params.xml
                    ? callback(this.responseText, params.parameters)
                    : callback(this.responseXML, params.parameters);
            }
        };
        xmlHTTPR.open('GET', params.url, params.async);
        xmlHTTPR.send(null);
        if (!params.async && core.tools.isFunc(params.callback)) {
            !params.xml
                ? callback(xmlHTTPR.responseText, params.parameters)
                : callback(xmlHTTPR.responseXML, params.parameters);
        }
    }
    //#endregion load
    //#endregion Methods
}
//#endregion Xhr
export { Xhr };