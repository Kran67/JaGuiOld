//#region corona12
Core.themes.corona12 = {
    initialized: false,
    Window: {
        WINDOWMINHEIGHT:28,
        WINDOWMINWIDTH:170,
        WindowLayout: {
            margin:5
        },
        WindowTitleBar: {
            height:22,
            WindowButton: {
                width: 18,
                height: 18,
                left: null,
                right: 2,
                offset: 20,
                top: 3,
                ACTIVETEXTCOLOR:"#586485",
                FONTSIZE:11,
                HOVEREDBACKCOLOR:[{ offset:0, color:"#FFFFFE" }, { offset:0.55, color:"#B2C6E3" }, { offset:0.6, color:"#B1C6E4" }, { offset:1, color:"#D1E7FF" }],
                PRESSEDBACKCOLOR:"#BFD2EA"
            },
            ACTIVECAPTIONTEXTCOLOR: "#FFF",
            INACTIVECAPTIONTEXTCOLOR: "#91A2D2",
            FONTFACE: "tahoma",
            FONTSTYLE: "",
            FONTSIZE:10,
            SHADOWOFFSET: 2,
            SHADOWCOLOR: "#505E96"
        },
        BACKCOLOR: "#BFD2EA",
        SHADOWBLUR:5,
        SHADOWOFFSET: 5,
        SHADOWCOLOR: "rgba(0, 0, 0, 0.7)"
    },
    Button: {
        borderRadius:4,
        BACKCOLOR: { direction: "to bottom", colorStops:[{ offset:0, color:"#FDFDFD" },{ offset: 1, color:"#C9D9EA" }]},
        HOVEREDBACKCOLOR: { direction: "to bottom", colorStops:[{ offset:0, color:"#FDFDFD" },{ offset: 1, color:"#CEDCEC" }]},
        PRESSEDBACKCOLOR: { direction: "to bottom", colorStops:[{ offset:0, color:"#B7C3D5" },{ offset: 1, color:"#FFF" }]},
        PADDINGCOLOR: { direction: "to bottom", colorStops:[{ offset:0, color:"#F9FAFB" },{ offset: 1, color:"#C6D7E7" }]},
        HOVEREDPADDINGCOLOR: { direction: "to bottom", colorStops:[{ offset:0, color:"#CCF1C0" },{ offset: 1, color:"#95DD7C" }]},
        PRESSEDPADDINGCOLOR: { direction: "to bottom", colorStops:[{ offset:0, color:"#BDCBDA" },{ offset: 1, color:"#FFF" }]},
        BORDERCOLOR: { direction: "to bottom right", colorStops:[{ offset:0, color:"#CBD7E2" },{ offset: 1, color:"#98A5B3" }]},
        HOVEREDBORDERCOLOR: { direction: "to bottom", colorStops:[{ offset:0, color:"#DCE8DA" },{ offset: 1, color:"#7DC366" }]},
        PRESSEDBORDERCOLOR: { direction: "to bottom", colorStops:[{ offset:0, color:"#98A5B3" },{ offset: 1, color:"#CBD7E2" }]},
        FOCUSEDBACKCOLOR: { direction: "to bottom", colorStops:[{ offset:0, color:"#FDFDFD" },{ offset: 1, color:"#C9D9EA" }]},
        FOCUSEDPADDINGCOLOR: { direction: "to bottom", colorStops:[{ offset:0, color:"#DBFFD9" },{ offset: 1, color:"#D2FFD4" }]},
        FOCUSEDBORDERCOLOR: { direction: "to bottom", colorStops:[{ offset:0, color:"#C0FFCC" },{ offset: 1, color:"#C0FFCC" }]}
    },
    SpeedButton: {
        borderRadius:4,
        BACKCOLOR: [{ offset:0, color:"#505050" },{ offset: 1, color:"#303030" }],
        HOVEREDBACKCOLOR: [{ offset:0, color:"#707070" },{ offset: 1, color:"#303030" }],
        PRESSEDBACKCOLOR: [{ offset:0, color:"#404040" },{ offset: 1, color:"#303030" }],
        BORDERCOLOR: "#404040"
    },
    DEFAULTFONTFACE: "tahoma",
    DEFAULTTEXTCOLOR: "#000",
    images: {},
    fonts: {},
    onThemeChanged: null,
    initialize: function () {
        this.initialized = true;
        Core.loadImages("../../themes/images/corona12/", [
            "left_titlebar.png",
            "titlebar.png",
            "wave_titlebar.png",
            "right_titlebar.png"
        ], this);
        Core.loadFonts("../../../../fonts", [
            {
                alias: "tahoma",
                file: "tahoma.ttf"
            }
        ], this);
    }
};
//#endregion corona12