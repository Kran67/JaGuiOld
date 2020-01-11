//#region cruz
Core.themes.cruz = {
    initialized: false,
    Window: {
        WINDOWMINHEIGHT: 24,
        WindowLayout: {
            margin: 3
        },
        WindowTitleBar: {
            height:23,
            WindowButton: {
                width: 19,
                height: 19,
                left: null,
                right: 4,
                offset: 21,
                top: 0
            },
            ACTIVEBACKCOLOR: [{offset:0, color:"#FFF" },{offset:0.45, color:"#FFF" },{offset:0.45, color:"#F6F6F6" },{offset:1, color:"#E3E3E3" }],
            CAPTIONTEXTCOLOR: "#808080",
            SHADOWOFFSET: -2,
            SHADOWCOLOR: "#FFF",
            FONTFACE: "tahoma",
            FONTSTYLE: "bold",
            FONTSIZE:7
        },
        ACTIVEEDGECOLOR:"#000",
        BACKCOLOR: "#E0E0E0",
        SHADOWBLUR:5,
        SHADOWOFFSET: 5,
        SHADOWCOLOR: "rgba(0, 0, 0, 0.7)"
    },
    Button: {
        borderRadius:5,
        BACKCOLOR: [{ offset:0, color:"#EFEBE7" },{ offset: 1, color:"#ECE5DE" }],
        HOVEREDBACKCOLOR: [{ offset:0, color:"#FFFFFE" },{ offset: 1, color:"#F2EBDF" }],
        PRESSEDBACKCOLOR: [{ offset:0, color:"#D0C8C1" },{ offset: 1, color:"#C4BBB3" }],
        BORDERCOLOR: "#8D7A68",
        HOVEREDBORDERCOLOR: "#8D7A68",
        PRESSEDBORDERCOLOR: "#000",
        FOCUSEDBORDERCOLOR: "#000",
        INSETCOLOR: [],
        HOVEREDINSETCOLOR: [{ offset: -1, color: "#ECE4DD" },{ offset: 1, color: "#FFF" }],
        PRESSEDINSETCOLOR: [{ offset: 1, color: "#CCBCAD" },{ offset: -1, color: "#C4BBB2" }],
        HOVEREDBORDERCOLOR: "#8D7A68"
    },
    SpeedButton: {
        BORDERCOLOR: "#C0B5A9"
    },
    DEFAULTFONTFACE: "tahoma",
    DEFAULTTEXTCOLOR: "#000",
    images: {},
    fonts: {},
    onThemeChanged: null,
    initialize: function () {
        this.initialized = true;
        Core.loadImages("../../themes/images/cruz/", [
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
//#endregion cruz