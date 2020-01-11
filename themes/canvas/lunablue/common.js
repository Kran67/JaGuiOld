//#region lunablue
Core.themes.lunablue = {
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
                ACTIVEPRESSEDTEXTCOLOR:"#78A2D8",
                INACTIVETEXTCOLOR:"#FFF",
                INACTIVEPRESSEDTEXTCOLOR:"#97B0E2",
                FONTSIZE:11,
                close: {
                    ACTIVEPRESSEDTEXTCOLOR:"#DF9A87",
                    INACTIVEPRESSEDTEXTCOLOR:"#CBADBA"
                }
            },
            ACTIVECAPTIONTEXTCOLOR: "#FFF",
            INACTIVECAPTIONTEXTCOLOR: "#D8E4F8",
            TEXTSHADOWOFFSET: 1,
            TEXTSHADOWCOLOR: "#0A1883",
            FONTFACE: "tahoma",
            FONTSTYLE: "bold",
            FONTSIZE:10
        },
        BACKCOLOR: "#ECE9D8"
    },
    Button: {
        borderRadius:3,
        innerBorderSize: 2,
        BACKCOLOR: [{ offset:0, color:"#FFF" },{ offset: 1, color:"#ECE9D8" }],
        PRESSEDBACKCOLOR: [{ offset:0, color:"#E5E4DD" },{ offset: 1, color:"#E2E2DA" }],
        INNERBORDER: [{ offset:0, color:"#FEFEFE" },{ offset: 1, color:"#D7D1C7" }],
        HOVEREDINNERBORDER: [{ offset:0, color:"#FFEEC9" },{ offset: 1, color:"#E69A06" }],
        FOCUSEDINNERBORDER: [{ offset:0, color:"#CDE6FF" },{ offset: 1, color:"#6A83EE" }],
        BORDERCOLOR: "#003C74",
        SHADOWCOLOR: "#E0DCC9",
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
        Core.loadImages("../../themes/images/lunablue/", [
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
//#endregion lunablue