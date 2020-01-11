//#region air
Core.themes.air = {
    initialized: false,
    DEFAULTFONTFACE: "tahoma",
    DEFAULTTEXTCOLOR: "#FFF",
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
//#endregion air