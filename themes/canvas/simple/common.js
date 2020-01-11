//#region simple
Core.themes.simple = {
    initialized: false,
    DEFAULTFONTFACE: "tahoma",
    DEFAULTTEXTCOLOR: "#000",
    images: {},
    fonts:{},
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
//#endregion simple