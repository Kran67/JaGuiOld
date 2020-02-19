//#region Imports
import { Tools } from '/scripts/core/tools.js';
//#endregion Imports
/**
 *
 */
//#region Uri
class Uri {
    //#region Methods
    //#region clean
    static clean(uri) {
        return uri.replace('url(', String.EMPTY).replace(')', String.EMPTY).replace(/"/g, String.EMPTY);
    }
    //#endregion clean
    //#region split
    static split(path, returnLast) {
        //#region Variables déclaration
        const splited = path.split('/');
        //#endregion Variables déclaration
        if (!returnLast) {
            returnLast = false;
        }
        if (returnLast) {
            return splited[splited.length - 1];
        } else {
            return splited;
        }
    }
    //#endregion split
    //#region base
    static base() {
        //#region Variables déclaration
        let uri = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : String.EMPTY) + '/';
        //#endregion Variables déclaration
        if (location.href.toLowerCase().indexOf(Tools.getPath('base').toLowerCase()) > -1) {
            uri += Tools.getPath('base') + '/';
        }
        return uri;
    }
    //#endregion base
    //#region extractFileName
    static extractFileName(url) {
        return Uri.split(url, true);
    }
    //#endregion extractFileName
    //#region extractFileExt
    static extractFileExt(url) {
        return url.split(".").last;
    }
    //#endregion extractFileExt
    //#region getParamValue
    static getParamValue(param, url) {
        //#region Variables déclaration
        const u = !url ? document.location.href : url;
        const reg = new RegExp(`(\\?|&|^)${param}=(.*?)(&|$)`);
        const matches = u.match(reg);
        //#endregion Variables déclaration
        return matches && matches[2] ? decodeURIComponent(matches[2]).replace(/\+/g, String.SPACE) : String.EMPTY;
    }
    //#endregion getParamValue
    //#region convertToRealURI
    static convertToRealURI(uri) {
        //#region Variables déclaration
        const props = Object.keys(Core.folders);
        //#endregion Variables déclaration
        props.forEach(prop => {
            const newUri = uri.split(prop);
            if (newUri.length > 1) {
                uri = newUri.join(Core.folders[prop]);
            }
        });
        return uri;
    }
    //#endregion convertToRealURI
    //#endregion Methods
}
//#endregion Uri
export { Uri };