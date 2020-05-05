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
        !returnLast && (returnLast = !1);
        return returnLast ? splited[splited.length - 1] : splited;
    }
    //#endregion split
    //#region base
    static base() {
        //#region Variables déclaration
        let uri = `${location.protocol}//${location.hostname}${(location.port ? ':' + location.port : String.EMPTY)}/`;
        //#endregion Variables déclaration
        location.href.toLowerCase().indexOf(core.tools.getPath('base').toLowerCase()) > -1
            && (uri += `${core.tools.getPath('base')}/`);
        return uri;
    }
    //#endregion base
    //#region extractFileName
    static extractFileName(url) {
        return Uri.split(url, !0);
    }
    //#endregion extractFileName
    //#region extractFileExt
    static extractFileExt(url) {
        return url.split('.').last;
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
        const props = Object.keys(core.folders);
        //#endregion Variables déclaration
        props.forEach(prop => {
            const newUri = uri.split(prop);
            newUri.length > 1 && (uri = newUri.join(core.folders[prop]) ;
        });
        return uri;
    }
    //#endregion convertToRealURI
    //#region isBase64URI
    static isBase64URI(uri) {
        const regex = /^data:.+\/(.+);base64,(.*)$/;
        const result = uri.match(regex);
        return result && result.length > 0;
    }
    //#endregion isBase64URI
    //#region isHttpURI
    static isHttpURI(uri) {
        const regex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
        const result = uri.match(regex);
        return result && result.length > 0;
    }
    //#endregion isHttpURI
    //#endregion Methods
}
//#endregion Uri
export { Uri };