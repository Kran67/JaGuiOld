//#region deanachm
Core.themes.deanachm = {
    initialized: false,
    Window: {
        WINDOWMINHEIGHT: 24,
        WindowTitleBar: {
            height:18,
            WindowButton: {
                width: 15,
                height: 15,
                left: null,
                right: 3,
                offset: 18,
                top: 0,
                FONTSIZE:11,
            },
            ACTIVECAPTIONTEXTCOLOR: "#FFF",
            INACTIVECAPTIONTEXTCOLOR: "#193268",
            FONTFACE: "tahoma",
            FONTSTYLE: "bold",
            FONTSIZE:7,
            SHADOWBLUR:3,
            ACTIVESHADOWCOLOR: "#15336E",
            INACTIVESHADOWCOLOR: "#2B57B2"
        },
        ACTIVEEDGECOLOR:"#16336F",
        INACTIVEEDGECOLOR:"#",
        BACKCOLOR: "#F0F0F0",
        SHADOWBLUR:5,
        SHADOWOFFSET: 5,
        SHADOWCOLOR: "rgba(0, 0, 0, 0.7)"
    },
    Button: {
        borderRadius:6,
        BACKCOLOR: [{ offset:0, color:"#FFF" },{ offset: 0.8, color:"#F0F0F0" },{ offset: 1, color:"#F0F0F0" }],
        SHADOWBACK: { offset:{ x:0, y:1 }, blur: 2, color: "#727282"},
        PRESSEDSHADOWBACK: { offset:{ x:0, y:-1 }, blur: 1, color: "#727282"},
        BORDERCOLOR: [{ offset:0, color:"#CED1E1" },{ offset: 0.8, color:"#A8A8BF" },{ offset: 1, color:"#A8A8BF" }],
        PRESSEDBORDERCOLOR: [{ offset:0, color:"#A8A8BF" },{ offset: 1, color:"#A8A8BF" }]
    },
    SpeedButton: {},
    DEFAULTFONTFACE: "tahoma",
    DEFAULTTEXTCOLOR: "#000",
    images: {},
    fonts: {},
    onThemeChanged: null,
    initialize: function () {
        this.initialized = true;
        Core.loadImages("../../themes/images/deanachm/", [
            "back_buttons.png",
            "windowbtns.png",
            "bottom_right.png",
            "top_right.png"
        ], this);
        Core.loadFonts("../../../../fonts", [
            {
                alias: "tahoma",
                file: "tahoma.ttf"
            }
        ], this);
    }
};
//#endregion deanachm