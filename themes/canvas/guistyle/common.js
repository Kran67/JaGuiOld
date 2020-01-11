//#region guistyle
Core.themes.guistyle = {
    initialized: false,
    Window: {
        WINDOWMINHEIGHT: 24,
        WindowTitleBar: {
            height: 19,
            WindowButton: {
                width: 15,
                height: 15,
                left: null,
                right: 3,
                offset: 18,
                top: 0,
                ACTIVETEXTCOLOR:"#950600",
                INACTIVETEXTCOLOR:"#AFAFAF",
                HOVEREDACTIVETEXTCOLOR:"#FFF",
                PRESSEDACTIVETEXTCOLOR:"#9D0303",
                FONTSIZE:5,
                BACKCOLOR:[{ offset:0, color:"#FEFAF9"}, { offset:1, color:"#D5D0CF" }],
                HOVEREDBACKCOLOR:[{ offset:0, color:"#FE360D" },{ offset:1, color:"#AA1401" }],
                PRESSEDBACKCOLOR:[{ offset:0, color:"#878787" },{ offset:1, color:"#DADADA" }],
                ACTIVEBORDERCOLOR: [{ offset:0, color:"#D11D05" },{ offset:1, color:"#EE2901" }],
                INACTIVEBORDERCOLOR: [{ offset:0, color:"#BCBCBC" },{ offset:1, color:"#C2C2C2" }]
            },
            ACTIVEBACKCOLOR: [{ offset:0, color:"#FE4914" },{ offset:1, color:"#C81204" }],
            INACTIVEBACKCOLOR: [{ offset:0, color:"#DADADA" },{ offset:1, color:"#B8B8B8" }],
            ACTIVECAPTIONTEXTCOLOR: "#FFF",
            INACTIVECAPTIONTEXTCOLOR: "#808080",
            FONTFACE: "tahoma",
            FONTSTYLE: "bold",
            FONTSIZE:8,
            SHADOWOFFSET: 1,
            ACTIVESHADOWCOLOR: "#7B0000",
            INACTIVESHADOWCOLOR: "#A2A2A2"
        },
        WindowContent: {
            BACKCOLOR: "#EBEBEB"
        },
        ACTIVEEDGECOLOR:"#9C0000",
        INACTIVEEDGECOLOR:"#A2A2A2",
        BACKCOLOR: "#F5F3F6",
        SHADOWBLUR:5,
        SHADOWOFFSET: 5,
        SHADOWCOLOR: "rgba(0, 0, 0, 0.7)"
    },
    Button: {
        BACKCOLOR: [{ offset:0, color:"#EDEDED" },{ offset: 1, color:"#BABABA" }],
        HOVEREDBACKCOLOR: [{ offset:0, color:"#EEE" },{ offset: 1, color:"#BCBCBC" }],
        PRESSEDBACKCOLOR: [{ offset:0, color:"#C5C5C5" },{ offset: 1, color:"#EFEFEF" }],
        EFFECTBACKCOLOR: [{ offset:0, color:"rgba(255,255,255,0)" },{ offset:0.5, color:"#FFF" },{ offset: 1, color:"rgba(255,255,255,0)" }],
        BORDERCOLOR: "#9C0000",
        FOCUSEDBACKCOLOR: [{ offset:0, color:"#FF8B0D" },{ offset: 1, color:"#DC6300" }],
        EDGEBACKCOLOR: [{ offset:0, color:"#FF4518" },{ offset: 1, color:"#C71300" }],
        HOVEREDEDGEBACKCOLOR: [{ offset:0, color:"#FF8A0E" },{ offset: 1, color:"#DC6300" }],
        PRESSEDEDGEBACKCOLOR: [{ offset:0, color:"#C02B0E" },{ offset: 1, color:"#9B1101" }]
    },
    SpeedButton: {
        BACKCOLOR: [],
        HOVEREDBACKCOLOR: [{ offset:0, color:"#F6F6F6" },{ offset: 1, color:"#AEAEAE" }],
        PRESSEDBACKCOLOR: [{ offset:0, color:"#CDCDCD" },{ offset: 1, color:"#F8F8F8" }],
        BORDERCOLOR: "transparent",
        HOVEREDBORDERCOLOR: "#9C9C9C",
        PRESSEDBORDERCOLOR: "#9C9C9C",
        INSETCOLOR: [ { offsetY:1, color:"#FCFCFC" }, {offsetY:-1, color:"#A0A0A0"} ]
    },
    DEFAULTFONTFACE: "tahoma",
    DEFAULTTEXTCOLOR: "#000",
    images: {},
    fonts:{},
    onThemeChanged: null,
    initialize: function () {
        this.initialized = true;
        Core.loadFonts("../../../../fonts", [
            {
                alias: "tahoma",
                file: "tahoma.ttf"
            }
        ], this);
    }
};
//#endregion guistyle