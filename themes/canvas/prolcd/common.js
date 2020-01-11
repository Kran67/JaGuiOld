//#region prolcd
Core.themes.prolcd = {
    initialized: false,
    window: {
        WINDOWMINHEIGHT: 30,
        layout:{
            margin: { left:5, top:4, right:5, bottom:5 }
        },
        titlebar: {
            height: 23,
            buttons: {
                width: 9,
                height: 10,
                left: null,
                right: 9,
                offset: 18,
                top: 5
            },
            BACKCOLOR: [{ offset:0, color:"#F7F7F7" },{ offset:1, color:"#D5D5D5" }],
            ACTIVECAPTIONTEXTCOLOR: "#4F4F4F",
            INACTIVECAPTIONTEXTCOLOR: "#949494",
            FONTFACE: "arial",
            FONTSTYLE: "bold",
            FONTSIZE:8
        },
        content: {
            BACKCOLOR: "#D6D6D5"
        },
        EDGECOLOR:"#989898",
        BACKCOLOR: "#CECECE"
    },
    DEFAULTFONTFACE: "arial",
    DEFAULTTEXTCOLOR: "#000",
    images: {},
    fonts: {},
    onThemeChanged: null,
    initialize: function () {
        this.initialized = true;
        Core.loadImages("../../themes/images/prolcd/", [
            "windowbtns.png"
        ], this);
        Core.loadFonts("../../../../fonts", [
            {
                alias: "arial",
                file: "arial.ttf"
            }
        ], this);
    }
};
//#endregion prolcd