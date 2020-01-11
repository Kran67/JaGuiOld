//#region vista
Core.themes.vista = {
    initialized: false,
    window: {
        clipped: false,
        WINDOWMINHEIGHT: 34,
        layout: {
            margin: 8,
            clipped: false
        },
        titlebar: {
            height: 26,
            clipped: false,
            buttons: {
                clipped: false,
                close: {
                    width: 43,
                    top: -8,
                    right: -1,
                    left: null,
                    height: 18,
                    SHADOWCOLOR: "#FA9277"
                },
                width: 26,
                left: null,
                right: 16,
                offset: 25,
                top: -8,
                height: 18,
                FONTSIZE:11,
                SHADOWCOLOR: "#69D0FB"
            },
            ACTIVECAPTIONTEXTCOLOR: "#000",
            INACTIVECAPTIONTEXTCOLOR: "rgba(0,0,0,0.75)",
            SHADOWCOLOR: "#FFF",
            FONTFACE: "SegoeUI",
            FONTSTYLE: "",
            FONTSIZE:10
        },
        EDGECOLOR:"#343434",
        BACKCOLOR: "#FFF",
        SHADOWBLUR:15,
        SHADOWCOLOR: "#000"
    },
    DEFAULTFONTFACE: "SegoeUI",
    DEFAULTTEXTCOLOR: "#000",
    images: {},
    fonts: {},
    onThemeChanged: null,
    initialize: function () {
        this.initialized = true;
        Core.loadImages("../../themes/images/vista/", [
            "titlebar.png",
            "windowbtns.png",
            "windowbackbtns.png"
        ], this);
        Core.loadFonts("../../../../fonts", [
            {
                alias: "SegoeUI",
                file: "segoeui.ttf"
            }
        ], this);
    }
};
//#endregion vista