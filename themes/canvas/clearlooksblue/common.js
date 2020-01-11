//#region clearlooksblue
Core.themes.clearlooksblue = {
    initialized: false,
    /*Window: {
        WINDOWMINHEIGHT: 26,
        WindowTitleBar: {
            height:21,
            WindowButton: {
                width: 18,
                height: 18,
                left: null,
                right: 2,
                offset: 20,
                top: 0,
                FONTSIZE:11,
                ACTIVEBACKCOLOR:[{ offset:0, color:"#9EBDE5"}, {offset: 0.5, color: "#91B3DF" }, {offset: 0.5, color: "#86ABD9" }, {offset: 1, color: "#78A0D1" }],
                INACTIVEBACKCOLOR:[{ offset:0, color:"#F4F2EE"}, {offset: 0.43, color: "#EFECE7" }, {offset: 0.43, color: "#EEEBE6" }, {offset: 1, color: "#E9E5DF" }],
                HOVEREDBACKCOLOR:[{ offset:0, color:"#A0C1EF"}, {offset: 0.49, color: "#93B8EA" }, {offset: 0.5, color: "#89B2E6" }, {offset: 1, color: "#78A6DE" }],
                PRESSEDBACKCOLOR:[{ offset:0, color:"#93AED1"}, {offset: 0.45, color: "#87A5CC" }, {offset: 0.45, color: "#7C9EC6" }, {offset: 1, color: "#6C90BD" }],
                BORDERCOLOR: [{ offset:0, color:"#82A8D7"}, {offset: 1, color: "#94B6E1" }]
            },
            ACTIVEBACKCOLOR: [{ offset:0, color:"#99BAE3"}, {offset: 0.5, color: "#8CB0DC" }, {offset: 0.5, color: "#84AAD8" }, {offset: 1, color: "#7AA1D1" }],
            INACTIVEBACKCOLOR: [{ offset:0, color:"#EDECEB"}, {offset: 0.5, color: "#DEDBD8" }, {offset: 0.5, color: "#84AAD8" }, {offset: 1, color: "#7AA1D1" }],
            ACTIVECAPTIONTEXTCOLOR: "#FFF",
            INACTIVECAPTIONTEXTCOLOR: "#6A6968",
            HORIZALIGN: Types.TEXTALIGNS.CENTER,
            SHADOWBLUR:5,
            SHADOWCOLOR: "#000",
            FONTFACE: "verdana",
            FONTSTYLE: "",
            FONTSIZE:10
        },
        ACTIVEEDGECOLOR:"#455D7C",
        INACTIVEEDGECOLOR:"#3D3A37",
        BACKCOLOR: "#EFEBE7",
        SHADOWBLUR:5,
        SHADOWOFFSET: 5,
        SHADOWCOLOR: "rgba(0, 0, 0, 0.7)"
    },
    Button: {
        borderRadius:3,
        BACKCOLOR: [{ offset:0, color:"#FEFEFE" },{ offset:0.5, color:"#FBFBFB" },{ offset:0.5, color:"#F5F5F4" },{ offset: 1, color:"#E8E7E6" }],
        HOVEREDBACKCOLOR: [{ offset:0, color:"#F3F7FC" },{ offset:0.5, color:"#ECF1F7" },{ offset:0.5, color:"#E5EAF1" },{ offset: 1, color:"#D6DAE1" }],
        PRESSEDBACKCOLOR: [{ offset:0, color:"#C5C2BF" },{ offset: 1, color:"#D5D4D2" }],
        BORDERCOLOR: "#918E8C",
        HOVEREDBORDERCOLOR: "#5B7AA1",
        PRESSEDBORDERCOLOR: "#918E8C",
        HOVEREDOUTSETBORDERCOLOR:"#BACCE2",
        PRESSEDINSETBORDERCOLOR:[{ offset:0, color:"#BFBCBA" },{ offset:1, color:"#9D9A97" }]
    },
    SpeedButton: {
        borderRadius:11,
        BACKCOLOR: [{ offset:0, color:"#FEFEFE" },{ offset:0.5, color:"#FBFBFB" },{ offset:0.5, color:"#F5F5F4" },{ offset: 1, color:"#E8E7E6" }],
        HOVEREDBACKCOLOR: [{ offset:0, color:"#F3F7FC" },{ offset:0.5, color:"#ECF1F7" },{ offset:0.5, color:"#E5EAF1" },{ offset: 1, color:"#D6DAE1" }],
        PRESSEDBACKCOLOR: [{ offset:0, color:"#C5C2BF" },{ offset: 1, color:"#D5D4D2" }],
        HOVEREDOUTSETBORDERCOLOR:"#BACCE2",
        PRESSEDINSETBORDERCOLOR:[{ offset:0, color:"#BFBCBA" },{ offset:1, color:"#9D9A97" }]
    },*/
    DEFAULTFONTFACE: "verdana",
    DEFAULTTEXTCOLOR: "#000",
    images: {},
    fonts: {},
    onThemeChanged: null,
    initialize: function () {
        this.initialized = true;
        Core.loadImages("../../themes/images/clearlooksblue/", [
            "windowbtns.png"
        ], this);
        Core.loadFonts("../../../../fonts", [
            {
                alias: "verdana",
                file: "verdana.ttf"
            }
        ], this);
    }
};
//#endregion clearlooksblue