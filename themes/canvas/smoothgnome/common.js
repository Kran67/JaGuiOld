//#region smoothgnome
Core.themes.smoothgnome = {
    initialized: false,
    window: {
        WINDOWMINHEIGHT: 26,
        content: {
            margin: { left: 1, top:1, right: 0, bottom:0}
        },
        titlebar: {
            height: 20,
            buttons: {
                width: 14,
                height: 14,
                left: null,
                right: 5,
                offset: 18,
                top: 1,
                ACTIVETEXTCOLOR:"#",
                FONTSIZE:11,
                BACKCOLOR:{ start:"#", end:"#" },
                HOVEREDBACKCOLOR:{ start:"#", end:"#" },
                PRESSEDBACKCOLOR:{ start:"#", end:"#" },
                ACTIVEBORDERCOLOR: "#",
                INACTIVEBORDERCOLOR: "#"
            },
            BACKCOLOR: [{ offset:0, color:"#B0BFCF" }, { offset:1, color:"#758FAC"} ],
            ACTIVECAPTIONTEXTCOLOR: "#FFF",
            INACTIVECAPTIONTEXTCOLOR: "#8C8B88",
            FONTFACE: "tahoma",
            FONTSTYLE: "bold",
            FONTSIZE:8,
            SHADOWCOLOR: "#6683A3",
            SHADOWBLUR: 5
        },
        EDGECOLOR:"#000",
        BACKCOLOR: "#EAE8E3",
        SHADOWBLUR:5,
        SHADOWOFFSET: 5,
        SHADOWCOLOR: "rgba(0, 0, 0, 0.7)"
    },
    DEFAULTFONTFACE: "tahoma",
    DEFAULTTEXTCOLOR: "#000",
    images: {},
    fonts: {},
    onThemeChanged: null,
    initialize: function () {
        this.initialized = true;
        Core.loadImages("../../themes/images/smoothgnome/", [
            "windowbtns.png"
        ], this);
        Core.loadFonts("../../../../fonts", [
            {
                alias: "tahoma",
                file: "tahoma.ttf"
            }
        ], this);
    }
};
//#endregion smoothgnome