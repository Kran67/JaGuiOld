//#region blend
Core.themes.blend = {
    initialized: false,
    DEFAULTFONTFACE: "tahoma",
    DEFAULTTEXTCOLOR: "#DEDEDE",
    images: {},
    fonts: {},
    onThemeChanged: null,
    initialize: function () {
        this.initialized = true;
        this.sysMenuPosition = "right";
        Core.loadFonts("../../../../fonts", [
            {
                alias: "tahoma",
                file: "tahoma.ttf"
            }
        ], this);
    }
};
//#endregion blend