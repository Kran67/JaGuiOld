define(['require'], function (require) {
    var fontsInfos = {};
    //#region Methods
    function getTextHeight(text, font) {
        var d, H = 0;
        var Classes = require("Classes");
        var Types = require("Types");
        var Core = require("Types");
        if (typeof text !== Types.CONSTANTS.STRING) return;
        if (font) {
            if (!(font instanceof Classes.Font)) return;
        }
        d = Core.doc.createElement("div");
        //$j.CSS.addClass(d,"basecss");
        //d.style.position="absolute";
        if (font) font.toCss(d);
        d.innerHTML = text;
        Core.doc.documentElement.appendChild(d);
        H = d.offsetHeight - 1;
        Core.doc.documentElement.removeChild(d);
        return H;
    };
    function getCharWidth(font, char) {
        var Font = require("font");
        return Font.fontsInfos[font.family].sizes[font.size].chars[char.charCodeAt(0)];
    }
    //#endregion Methods
    return {
        fontsInfos: fontsInfos,
        getTextHeight: getTextHeight,
        getCharWidth: getCharWidth
    }
});