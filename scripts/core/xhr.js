/**
 *
 */
class Xhr {
    /**
     *
     * @param {Object}      params
     * @param {Boolean}     params.async
     * @param {String}      params.url
     * @param {Function}    params.callback
     * @param {Boolean}     params.xml
     * @param {Object}      params.parameters
     */
    static load(params) {
        const BOOLEAN = Types.CONSTANTS.BOOLEAN;
        const FUNCTION = Types.CONSTANTS.FUNCTION;
        if (typeof params.async !== BOOLEAN) {
            params.async = false;
        }
        if (typeof params.xml !== BOOLEAN) {
            params.xml = false;
        }
        if (!params.callback) {
            params.callback = null;
        }
        const xmlHTTPR = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
        xmlHTTPR.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                if (typeof params.callback === FUNCTION) {
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
        xmlHTTPR.open("GET", params.url, params.async);
        xmlHTTPR.send(null);
        if (!params.async) {
            if (typeof params.callback === FUNCTION) {
                if (!params.xml) {
                    callback(xmlHTTPR.responseText, params.parameters);
                } else {
                    callback(xmlHTTPR.responseXML, params.parameters);
                }
            }
        }
    }
}
export { Xhr };