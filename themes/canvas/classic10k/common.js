//#region classic10k
Core.themes.classic10k = {
    initialized: false,
    DEFAULTFONTFACE: "verdana",
    DEFAULTTEXTCOLOR: "#000",
    images: {},
    fonts:{},
    onThemeChanged: null,
    initialize: function () {
        this.initialized = true;
        Core.loadImages("../../themes/images/classic10k/", [
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
//#endregion classic10k