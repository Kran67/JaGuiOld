//#region Imports
import { Tools } from '/scripts/core/tools.js';
//#endregion Imports
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
        if (!Tools.isBool(params.async)) {
            params.async = false;
        }
        if (!Tools.isBool(params.xml)) {
            params.xml = false;
        }
        if (!params.callback) {
            params.callback = null;
        }
        const xmlHTTPR = window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
        xmlHTTPR.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                if (Tools.isFunc(params.callback)) {
                    if (params.async) {
                        if (!params.xml) {
                            callback(this.responseText, params.parameters);
                        } else {
                            callback(this.responseXML, params.parameters);
                        }
                    }
                }
            }
        };
        xmlHTTPR.open('GET', params.url, params.async);
        xmlHTTPR.send(null);
        if (!params.async) {
            if (Tools.isFunc(params.callback)) {
                if (!params.xml) {
                    callback(xmlHTTPR.responseText, params.parameters);
                } else {
                    callback(xmlHTTPR.responseXML, params.parameters);
                }
            }
        }
    }
    //#endregion load
    //#endregion Methods
}
//#endregion Xhr
export { Xhr };