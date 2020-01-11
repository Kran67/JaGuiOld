//#region watercolor
Core.themes.watercolor = {
    initialized: false,
    window: {
        layout: {
            margin: { left:5, top:4, right:5, bottom:5 },
            clipped:false
        },
        titlebar: {
            height: 20,
            clipped:false,
            buttons: {
                width: 16,
                height: 16,
                left: null,
                right: 1,
                offset: 18,
                top: -2,
                ACTIVETEXTCOLOR:"#CEDEF7",
                HOVEREDACTIVETEXTCOLOR:"#FFF",
                PRESSEDACTIVETEXTCOLOR:"#CEDEF7",
                INACTIVETEXTCOLOR:"#FFF",
                FONTSIZE:11,
                ACTIVEBACKCOLOR:"#3173D6",
                INACTIVEBACKCOLOR:"#2963B5",
                HOVEREDACTIVEBACKCOLOR:"#3173D6",
                PRESSEDACTIVEBACKCOLOR:"#1052B5",
                ACTIVEBORDERCOLOR: "#86ABE6",
                INACTIVEBORDERCOLOR: "#80A0D1",
                HOVEREDACTIVEBORDERCOLOR: "#CCDCF5",
                PRESSEDACTIVEBORDERCOLOR: "#0D1D36"
            },
            ACTIVEBACKCOLOR: "#5297F9",
            CAPTIONTEXTCOLOR: "#FFF",
            INACTIVECAPTIONTEXTCOLOR: "#7AA1FF",
            FONTFACE: "tahoma",
            FONTSTYLE: "",
            FONTSIZE:10
        },
        content: {
            BACKCOLOR: "#EBEBE4"
        },
        ACTIVEEDGECOLOR:"#7DB1FB",
        INACTIVEEDGECOLOR:"#6896E0",
        ACTIVEBACKCOLOR: "#3573D6",
        INACTIVEBACKCOLOR: "#2C60B2",
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
        Core.loadImages("../../themes/images/watercolor/", [
            "titlebar.png"
        ], this);
        Core.loadFonts("../../../../fonts", [
            {
                alias: "tahoma",
                file: "tahoma.ttf"
            }
        ], this);
    }
};
//#endregion watercolor