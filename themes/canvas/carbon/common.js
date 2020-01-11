//#region Imports
//#endregion Imports
//#region carbon
Core.themes.carbon = {
    initialized: false,
    DEFAULTFONTFACE: "tahoma",
    DEFAULTTEXTCOLOR: "#E0E0E0",
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
//#endregion carbon