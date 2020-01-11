//#region Imports
import { Point } from "../../../../scripts/core/geometry.js";
//#endregion Imports
//#region macos
Core.themes.macos = {
    initialized: false,
    Window: {
        WindowTitleBar: {
            height: 23,
            WindowButton: {
                width: 14,
                height: 15,
                left: 4,
                right: null,
                offset: 21,
                top: 3,
                ACTIVETEXTCOLOR:"#",
                FONTSIZE:11
            },
            ACTIVEBACKCOLOR: [{ offset:0, color:"#D0D0D0"}, { offset:1, color:"#BFBFBF" }],
            INACTIVEBACKCOLOR: [{ offset:0, color:"#BDC1C5"}, { offset:1, color:"#ADB0B4" }],
            ACTIVECAPTIONTEXTCOLOR: "#00",
            INACTIVECAPTIONTEXTCOLOR: "#7D7F81",
            FONTFACE: "tahoma",
            FONTSTYLE: "",
            FONTSIZE:10,
            SHADOWOFFSET: 1,
            SHADOWCOLOR: "#D8DDE1"
        },
        WindowContent: {
            BACKCOLOR: "#E8E8E8"
        },
        EDGECOLOR:"#C1C1C1",
        BACKCOLOR: "#C3C3C3",
        SHADOWBLUR:10,
        SHADOWOFFSET: new Point(0,2),
        SHADOWCOLOR: "#000"
    },
    Button: {
        borderRadius:12,
        BACKGROUND: { color:"#F8F9F7", image:[
            { direction:"right", colorstops:[{ offset:0, color:"#D8D8D8" }, { offset:80, color:"#F8F9F7"}, { offset:80, color:"rgba(248,249,247,0)"}, { offset:-80, color:"rgba(248,249,247,0)"}, { offset:-80, color:"#F8F9F7"}, { offset:1, color:"#D8D8D8"}]},
            { direction:"bottom", colorstops:[{ offset:0, color:"rgba(136,136,138,0.5)"}, { offset:100, color:"rgba(136,136,138,0)" }]}
            ],
            HALO: {
                left: 6,
                top: 1,
                height: 7,
                right: 6,
                image: [{ color: "rgba(249,249,249,0.7)", offset: 0}, { color: "rgba(249,249,249,0.7)", offset: 1}],
                borderRadius: { tl:5, tr:5, bl:3, br:3 }
            }
        },
        HOVEREDBACKGROUND: { color:"#8DC0F5", image:[
            { direction:"right", colorstops:[{ offset:0, color:"#3D87D7" }, { offset:80, color:"#8DC0F5"}, { offset:80, color:"rgba(141,192,245,0)"}, { offset:-80, color:"rgba(141,192,245,0)"}, { offset:-80, color:"#8DC0F5"}, { offset:1, color:"#3D87D7"}]},
            { direction:"bottom", colorstops:[{ offset:0, color:"rgba(38,38,86,0.4)"}, { offset:40, color:"rgba(33,52,166,0.8)" }, { offset:100, color:"rgba(127,183,241,0)" }]}
            ],
            HALO: {
                left: 6,
                top: 1,
                height: 7,
                right: 6,
                image: [{ color: "#DDE3F9", offset: 0}, { color: "#92C4F9", offset: 1}],
                borderRadius: { tl:5, tr:5, bl:3, br:3 }
            }
        },
        PRESSEDBACKGROUND: [],
        BORDERCOLOR: "#88888A",
        HOVEREDBORDERCOLOR: { left:"#3F608B", top:"#272761", right:"#3C638E", bottom:"#5B777C" },
        PRESSEDBORDERCOLOR: { left:"#425C7F", top:"#292950", right:"#3F5F81", bottom:"#596F73" },
        SHADOWCOLOR: "#A7ACB4",
        SHADOWBLUR: 2,
        SHADOWOFFSET: { x:0, y:1 }
    },
    SpeedButton: {
        borderRadius:3,
        BACKCOLOR: [{ offset:0, color:"#505050" },{ offset: 1, color:"#303030" }],
        HOVEREDBACKCOLOR: [{ offset:0, color:"#707070" },{ offset: 1, color:"#303030" }],
        PRESSEDBACKCOLOR: [{ offset:0, color:"#404040" },{ offset: 1, color:"#303030" }],
        BORDERCOLOR: "#404040"
    },
    DEFAULTFONTFACE: "tahoma",
    DEFAULTTEXTCOLOR: "#000",
    images: {},
    fonts:{},
    onThemeChanged: null,
    initialize: function () {
        this.initialized = true;
        Core.loadImages("../../themes/images/macos/", [
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
//#endregion macos