//#region lunahomestead
Core.themes.lunahomestead = {
    /*
     * WINDOWS COLORS
     * ACTIVETEXTCOLOR = voir image
     * INACTIVETEXTCOLOR = voir image
     * INACTIVEPRESSEDTEXTCOLOR = voir image
     * ACTIVEPRESSEDTEXTCOLOR = voir image
     * ACTIVECAPTIONCOLOR = ActiveCaption
     * CAPTIONTEXTCOLOR = CaptionText
     * INACTIVECAPTIONTEXTCOLOR = InactiveCaptionText
     * TEXTSHADOWOFFSET = TextShadowOffset
     * TEXTSHADOWCOLOR = TextShadowColor
     * BACKCOLOR = EdgeFillColor
     */
    initialized: false,
    Window: {
        WINDOWMINHEIGHT:34,
        WindowTitleBar: {
            height:26,
            WindowButton: {
                width: 21,
                height: 21,
                left: null,
                right: 3,
                offset: 23,
                top: 2,
                ACTIVETEXTCOLOR:"#FFF",
                ACTIVEPRESSEDTEXTCOLOR:"#DCE8CB",
                INACTIVETEXTCOLOR:"#FFF",
                INACTIVEPRESSEDTEXTCOLOR:"#DCE8CB",
                FONTSIZE:11,
                close: {
                    ACTIVEPRESSEDTEXTCOLOR:"#DF9A88",
                    INACTIVEPRESSEDTEXTCOLOR:"#DF9A88"
                }
            },
            ACTIVECAPTIONTEXTCOLOR: "#FFF",
            INACTIVECAPTIONTEXTCOLOR: "#FFF",
            TEXTSHADOWOFFSET: 1,
            TEXTSHADOWCOLOR: "#41400A",
            FONTFACE: "tahoma",
            FONTSTYLE: "bold",
            FONTSIZE:10
        },
        BACKCOLOR: "#ECE9D8"
    },
    Button: {
        borderRadius:3,
        innerBorderSize: 2,
        BACKCOLOR: [{ offset:0, color:"#FEFFF2" },{ offset: 1, color:"#F4EFDC" }],
        PRESSEDBACKCOLOR: [{ offset:0, color:"#EEE6D2" },{ offset: 1, color:"#ECE4CE" }],
        INNERBORDER: [{ offset:0, color:"#FEFEF4" },{ offset: 1, color:"#E4D2BA" }],
        HOVEREDINNERBORDER: [{ offset:0, color:"#FCC595" },{ offset: 1, color:"#CF7225" }],
        FOCUSEDINNERBORDER: [{ offset:0, color:"#C2D18F" },{ offset: 1, color:"#A8A766" }],
        BORDERCOLOR: "#376206",
        SHADOWCOLOR: "#ECE9DA",
        SHADOWBLUR: 1
    },
    SpeedButton: {
        borderRadius:3,
        HOVEREDBACKCOLOR: [{ offset:0, color:"#FEFEFD" },{ offset: 1, color:"#D7D2C6" }],
        PRESSEDBACKCOLOR: [{ offset:0, color:"#DCDAD1" },{ offset: 1, color:"#EBEAE5" }],
        BORDERCOLOR: "transparent",
        HOVEREDBORDERCOLOR: "#CECEC3",
        PRESSEDBORDERCOLOR: "#9D9D92",
        PRESSEDTEXTCOLOR: "#FFF"
    },
    DEFAULTFONTFACE: "tahoma",
    DEFAULTTEXTCOLOR: "#000",
    images: {},
    fonts: {},
    onThemeChanged: null,
    initialize: function () {
        this.initialized = true;
        Core.loadImages("../../themes/images/lunahomestead/", [
            "titlebar.png",
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
//#endregion lunahomestead