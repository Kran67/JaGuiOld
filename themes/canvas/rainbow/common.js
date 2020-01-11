//#region Imports
import { Point } from "../../../../scripts/core/geometry.js";
//#endregion Imports
//#region rainbow
Core.themes.rainbow = {
    initialized: false,
    window: {
        titlebar: {
            height:19,
            buttons: {
                width: 14,
                height: 6,
                left: null,
                right: 14,
                offset: 18,
                top: 3,
                ACTIVETEXTCOLOR:"#",
                FONTSIZE:11
            },
            BACKCOLOR: [{ offset:0.00, color:"#213B4C" },
                { offset:0.12, color:"#65818F" },
                { offset:0.25, color:"#80A5B0" },
                { offset:0.36, color:"#9CC1CB" },
                { offset:0.50, color:"#B0CCD8" },
                { offset:0.62, color:"#BBC2D5" },
                { offset:0.75, color:"#C1A9C7" },
                { offset:0.88, color:"#C98BB3" },
                { offset:1.00, color:"#A74C73" }],
            ACTIVECAPTIONTEXTCOLOR: "#000",
            INACTIVECAPTIONTEXTCOLOR: "#737373",
            FONTFACE: "tahoma",
            FONTSTYLE: "",
            FONTSIZE:8
        },
        BACKCOLOR: "#BBB7C6",
        LEFTEDGE:[{ colorStops:[
            { offset:0.00, color:"#1F3342"},
            { offset:0.12, color:"#233846"},
            { offset:0.25, color:"#253D4B"},
            { offset:0.37, color:"#29424F"},
            { offset:0.50, color:"#2C4652"},
            { offset:0.62, color:"#2F4853"},
            { offset:0.75, color:"#324A54"},
            { offset:0.88, color:"#334853"},
            { offset:1.00, color:"#354650"}]},
            {colorStops:[
                { offset:0.00, color:"#243C4C"},
                { offset:0.12, color:"#243C4C"},
                { offset:0.25, color:"#274250"},
                { offset:0.37, color:"#2B4755"},
                { offset:0.50, color:"#2F4D59"},
                { offset:0.62, color:"#324E5A"},
                { offset:0.75, color:"#34505A"},
                { offset:0.88, color:"#374E59"},
                { offset:1.00, color:"#394C57"}]},
            {colorStops:[
                { offset:0.00, color:"#203748"},
                { offset:0.12, color:"#253D4E"},
                { offset:0.25, color:"#294453"},
                { offset:0.37, color:"#2E4C58"},
                { offset:0.50, color:"#31505D"},
                { offset:0.62, color:"#35535E"},
                { offset:0.75, color:"#38545F"},
                { offset:0.88, color:"#3A525D"},
                { offset:1.00, color:"#3D4F5A"}]},
            {colorStops:[
                { offset:0.00, color:"#20384A"},
                { offset:0.12, color:"#264051"},
                { offset:0.25, color:"#2A4857"},
                { offset:0.37, color:"#2F4F5D"},
                { offset:0.50, color:"#345562"},
                { offset:0.62, color:"#395864"},
                { offset:0.75, color:"#3B5964"},
                { offset:0.88, color:"#3E5762"},
                { offset:1.00, color:"#40535E"}]}
        ],
        RIGHTEDGE:[{ colorStops:[
            { offset:0.00, color:"#814260"},
            { offset:0.12, color:"#784759"},
            { offset:0.25, color:"#6F4C54"},
            { offset:0.37, color:"#674E4F"},
            { offset:0.50, color:"#5E514B"},
            { offset:0.62, color:"#565247"},
            { offset:0.75, color:"#515344"},
            { offset:0.88, color:"#4D5142"},
            { offset:1.00, color:"#4B5042"}]},
            {colorStops:[
                { offset:0.00, color:"#8F4769"},
                { offset:0.12, color:"#844C5F"},
                { offset:0.25, color:"#7B515A"},
                { offset:0.37, color:"#715554"},
                { offset:0.50, color:"#67574F"},
                { offset:0.62, color:"#5E584B"},
                { offset:0.75, color:"#575847"},
                { offset:0.88, color:"#525745"},
                { offset:1.00, color:"#505544"}]},
            {colorStops:[
                { offset:0.00, color:"#95486B"},
                { offset:0.12, color:"#8A4D62"},
                { offset:0.25, color:"#80525C"},
                { offset:0.37, color:"#765656"},
                { offset:0.50, color:"#6B5950"},
                { offset:0.62, color:"#625B4B"},
                { offset:0.75, color:"#5B5B49"},
                { offset:0.88, color:"#555946"},
                { offset:1.00, color:"#525745"}]},
            {colorStops:[
                { offset:0.00, color:"#9E496F"},
                { offset:0.12, color:"#924F65"},
                { offset:0.25, color:"#87555D"},
                { offset:0.37, color:"#7B5958"},
                { offset:0.50, color:"#705C52"},
                { offset:0.62, color:"#665E4D"},
                { offset:0.75, color:"#5E5D49"},
                { offset:0.88, color:"#595C46"},
                { offset:1.00, color:"#565A46"}]}
        ],
        BOTTOMEDGE:[{ offset:0.00, color:"#445963" },
            { offset:0.12, color:"#656273"},
            { offset:0.25, color:"#7F667B"},
            { offset:0.37, color:"#936E83"},
            { offset:0.50, color:"#9A7785"},
            { offset:0.62, color:"#92767B"},
            { offset:0.75, color:"#7F7069"},
            { offset:0.88, color:"#6D6954"},
            { offset:1.00, color:"#595C46"}],
        SHADOWBLUR:10,
        SHADOWOFFSET: new Point(0,2),
        SHADOWCOLOR: "rgba(0, 0, 0, 0.9)"
    },
    DEFAULTFONTFACE: "tahoma",
    DEFAULTTEXTCOLOR: "#000",
    images: {},
    fonts: {},
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
//#endregion rainbow