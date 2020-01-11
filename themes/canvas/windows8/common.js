Core.themes.windows8 = {
    initialized: false,
    window: {
        WINDOWMINHEIGHT: 28,
        layout: {
            margin: 7,
            clipped:false
        },
        titlebar: {
            height: 24,
            clipped:false,
            buttons: {
                width: 45,
                height: 20,
                left: null,
                right: 0,
                offset: 46,
                top: -6,
                FONTSIZE:8,
                ACTIVEBACKCOLOR:"#63B4FB",
                INACTIVEBACKCOLOR:"#EBEBEB",
                HOVEREDACTIVEBACKCOLOR:"#3665B3",
                PRESSEDACTIVEBACKCOLOR:"#3D6099",
                close: {
                    ACTIVEBACKCOLOR:"#C75050",
                    INACTIVEBACKCOLOR:"#BCBCBC",
                    HOVEREDACTIVEBACKCOLOR:"#E04343",
                    PRESSEDACTIVEBACKCOLOR:"#993D3D"
                }
            },
            CAPTIONTEXTCOLOR: "#000",
            FONTFACE: "SegoeUI",
            FONTSTYLE: "",
            FONTSIZE:10
        },
        ACTIVEEDGECOLOR:"#4C8AC0",
        INACTIVEEDGECOLOR:"#D3D3D3",
        ACTIVEBACKCOLOR: "#63B4FB",
        INACTIVEBACKCOLOR: "#EBEBEB"
    },
    DEFAULTFONTFACE: "SegoeUI",
    DEFAULTTEXTCOLOR: "#000",
    images: {},
    fonts: {},
    onThemeChanged: null,
    initialize: function () {
        this.initialized = true;
        Core.loadFonts("../../../../fonts", [
            {
                alias: "SegoeUI",
                file: "segoeui.ttf"
            }
        ], this);
    }
};