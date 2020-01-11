//#region ubuntu
Core.themes.ubuntu = {
    initialized: false,
    window: {
        WINDOWMINHEIGHT: 28,
        titlebar: {
            height:23,
            buttons: {
                width: 16,
                height: 16,
                left: null,
                right: 8,
                offset: 20,
                top: 2,
                ACTIVETEXTCOLOR:"#3A3935",
                FONTSIZE:9,
                BACKCOLOR:[{ offset:0, color:"#94938E" },{ offset:1, color:"#5A5955" }],
                HOVEREDBACKCOLOR:[{ offset:0, color:"#D8D9D9" },{ offset:1, color:"#9E9E9E" }],
                PRESSEDBACKCOLOR:[{ offset:0, color:"#787770" },{ offset:1, color:"#7E7D76" }],
                CLOSEBACKCOLOR:[{ offset:0, color:"#F79674" },{ offset:1, color:"#DF5106" }],
                CLOSEHOVEREDBACKCOLOR:[{ offset:0, color:"#FAA589" },{ offset:1, color:"#E45306" }],
                CLOSEPRESSEDBACKCOLOR:[{ offset:0, color:"#EA6F3B" },{ offset:1, color:"#ED7443" }],
                SHADOWOFFSETY:1,
                SHADOWCOLOR: "#7E7D76"
            },
            ACTIVEBACKCOLOR: [{ offset:0, color:"#3E3D39"},{ offset:1, color:"#A1998E" }],
            INACTIVEBACKCOLOR: [{ offset:0, color:"#3F3E3A"},{ offset:1, color:"#C2B9B1" }],
            ACTIVECAPTIONTEXTCOLOR: "#DFDBD2",
            INACTIVECAPTIONTEXTCOLOR: "#807D78",
            FONTFACE: "ubuntu",
            FONTSTYLE: "bold",
            FONTSIZE:10,
            SHADOWBLUR:2,
            SHADOWCOLOR: "#000"
        },
        BACKCOLOR: "#F2F1F0",
        SHADOWBLUR:5,
        SHADOWOFFSET: 5,
        SHADOWCOLOR: "rgba(0, 0, 0, 0.7)"
    },
    DEFAULTFONTFACE: "ubuntu",
    DEFAULTTEXTCOLOR: "#000",
    images: {},
    fonts: {},
    onThemeChanged: null,
    initialize: function () {
        this.initialized = true;
        Core.loadImages("../../themes/images/ubuntu/", [
            "left.png",
            "right.png"
        ], this);
        Core.loadFonts("../../../../fonts", [
            {
                alias: "ubuntu",
                file: "ubuntu-r.ttf"
            }
        ], this);
    }
};
//#region ubuntu