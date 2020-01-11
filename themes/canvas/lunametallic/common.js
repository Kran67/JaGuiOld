//#region Imports
import { Colors } from "../../../scripts/core/color.js";
import { Point } from "../../../scripts/core/geometry.js";
//#endregion Imports
//#region lunametallic
Core.themes.lunametallic = {
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
                ACTIVETEXTCOLOR:"#252536",
                ACTIVEPRESSEDTEXTCOLOR:"#252536",
                INACTIVETEXTCOLOR:"#94949C",
                INACTIVEPRESSEDTEXTCOLOR:"#252536",
                FONTSIZE:11,
                TEXTSHADOWOFFSET: new Point(-1,1),
                TEXTSHADOWCOLOR: "#FFF",
                close: {
                    ACTIVEPRESSEDTEXTCOLOR:"#FFF",
                    INACTIVEPRESSEDTEXTCOLOR:"#FFF"
                }
            },
            ACTIVECAPTIONTEXTCOLOR: "#0E1010",
            INACTIVECAPTIONTEXTCOLOR: "#FFF",
            TEXTSHADOWOFFSET: new Point(1,1),
            TEXTSHADOWCOLOR: "#C7C2D1",
            FONTFACE: "tahoma",
            FONTSTYLE: "bold",
            FONTSIZE:10
        },
        BACKCOLOR: "#ECE9D8"
    },
    Button: {
        borderRadius:3,
        innerBorderSize: 2,
        BACKCOLOR: [{ offset:0, color:"#FDFDFD" },{ offset: 1, color:"#CDCDDF" }],
        PRESSEDBACKCOLOR: [{ offset:0, color:"#B6B5C8" },{ offset: 1, color:"#FCFCFD" }],
        INNERBORDER: [{ offset:0, color:"#F00" },{ offset: 1, color:"#F00" }],
        HOVEREDINNERBORDER: [{ offset:0, color:"#FFEEC9" },{ offset: 1, color:"#E69A06" }],
        FOCUSEDINNERBORDER: [{ offset:0, color:"#CDE6FF" },{ offset: 1, color:"#6A83EE" }],
        BORDERCOLOR: "#003C74",
        SHADOWCOLOR: "#D2CECB",
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
        Core.loadImages("../../themes/images/lunametallic/", [
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
//#endregion lunametallic