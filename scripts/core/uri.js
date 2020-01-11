import { Tools } from "/scripts/core/tools.js";
/**
 *
 */
class Uri {
    //#region Methods
    static clean(uri) {
        return uri.replace("url(", String.EMPTY).replace(")", String.EMPTY).replace(/"/g, String.EMPTY);
    }
    static split(path, returnLast) {
        const splited = path.split("/");
        if (!returnLast) {
            returnLast = false;
        }
        if (returnLast) {
            return splited[splited.length - 1];
        } else {
            return splited;
        }
    }
    static base() {
        let uri = location.protocol + "//" + location.hostname + (location.port ? ":" + location.port : String.EMPTY) + "/";
        if (location.href.toLowerCase().indexOf(Tools.getPath("base").toLowerCase()) > -1) {
            uri += Tools.getPath("base") + "/";
        }
        return uri;
    }
    static extractFileName(url) {
        return Uri.split(url, true);
    }
    static extractFileExt(url) {
        return url.split(".").last;
    }
    static getParamValue(param, url) {
        const u = !url ? document.location.href : url;
        const reg = new RegExp(`(\\?|&|^)${param}=(.*?)(&|$)`);
        const matches = u.match(reg);
        return matches && matches[2] ? decodeURIComponent(matches[2]).replace(/\+/g, String.SPACE) : String.EMPTY;
    }
    static convertToRealURI(uri) {
        const props = Object.keys(Core.folders);
        props.forEach(prop => {
            const newUri = uri.split(prop);
            if (newUri.length > 1) {
                uri = newUri.join(Core.folders[prop]);
            }
        });
        return uri;
    }
    //#endregion Methods
}
export { Uri };