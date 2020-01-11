//#region sustenance
Core.themes.sustenance = {
    initialized: false,
    window: {
        WINDOWMINHEIGHT: 32,
        layout: {
            margin: {
                left:5, top:4, right:4, bottom:4
            }
        },
        titlebar: {
            height:24,
            buttons: {
                width: 13,
                height: 13,
                left: null,
                right: 10,
                offset: 21,
                top: 4,
                close: {
                    width: 20,
                    height: 20,
                    left: null,
                    right: 5,
                    top: 1
                }
            },
            BACKCOLOR: [{ offset:0, color:"#77B1EC" },{ offset:1, color:"#245EDE" }],
            ACTIVECAPTIONTEXTCOLOR: "#FFF",
            INACTIVECAPTIONTEXTCOLOR: "#92B5EF",
            FONTFACE: "tahoma",
            FONTSTYLE: "bold",
            FONTSIZE:8,
            SHADOWOFFSET: 1,
            SHADOWCOLOR: "#0C214E"
        },
        EDGECOLOR:"#1C3F8B",
        BACKCOLOR: "#EDECE1",
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
        Core.loadImages("../../themes/images/sustenance/", [
            "closebackbutton.png",
            "leftbackbuttons.png",
            "rightbackbuttons.png",
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
//#endregion sustenance