//#region haiku
Core.themes.haiku = {
    initialized: false,
    Window: {
        WindowLayout: {
            margin: 5
        },
        WindowTitleBar: {
            height: 21,
            WindowButton: {
                maxRestore: {
                    right: null,
                    left: 0,
                    width: 10,
                    height: 10,
                    top: 3
                },
                minimize: {
                    right: null,
                    left: 0,
                    width: 7,
                    height: 7,
                    top: 0
                },
                help: {
                    top: -100
                },
                rollUpDown: {
                    top: -100
                },
                stayOnOff: {
                    top: -100
                },
                right: null,
                left: 0,
                width: 12,
                height: 12,
                top: 0,
                offset: 1,
                ACTIVEBACKCOLOR:[{ offset:0, color:"#FFFCF2" },{ offset:1, color:"#FFCB00" }],
                INACTIVEBACKCOLOR:[{ offset:0, color:"#FBFBFB" },{ offset:1, color:"#E8E8E8" }],
                PRESSEDBACKCOLOR:[{ offset:0, color:"#FFCB00" },{ offset:1, color:"#FFFCF2" }],
                ACTIVEBORDERCOLOR: "#B38F00",
                INACTIVEBORDERCOLOR: "#A3A3A3"
            },
            ACTIVEBACKCOLOR: [{ offset:0, color:"#FFE687"},{ offset:1, color:"#FFCB00" }],
            INACTIVEBACKCOLOR: [{ offset:0, color:"#F6F6F6"},{ offset:1, color:"#E8E8E8" }],
            CAPTIONTEXTCOLOR: "#000",
            FONTFACE: "tahoma",
            FONTSTYLE: "",
            FONTSIZE:10
        },
        WindowContent: {
            BACKCOLOR: "#D8D8D8"
        },
        ACTIVEEDGECOLOR:"#989898",
        BACKCOLOR: "#D0D0D0"
    },
    Button: {
        BACKCOLOR: [{ offset:0, color:"#EBEBEB" },{ offset: 1, color:"#DBDBDB" }],
        HOVEREDBACKCOLOR: [],
        PRESSEDBACKCOLOR: [{ offset:0, color:"#C1C1C1" },{ offset: 1, color:"#C6C6C6" }],
        BORDERCOLOR: "#909090",
        FOCUSEDCOLOR: "#0000E5",
        INNERCOLORS :{ left: "#F7F7F7", top:"#F7F7F7",right:"#C6C6C6", bottom:"#C6C6C6"},
        PRESSEDINNERCOLORS :{ left: "#B8B8B8", top:"#B8B8B8",right:"transparent", bottom:"transparent"},
        OUTERCOLORS :{ left:"#C8C8C8", top:"#C8C8C8" ,right:"#E7E7E7",bottom:"#E7E7E7" }
    },
    SpeedButton: {
        BACKCOLOR: [],
        HOVEREDBACKCOLOR: [],
        PRESSEDBACKCOLOR: [{ offset:0, color:"#C1C1C1" },{ offset: 1, color:"#C6C6C6" }],
        TEXTCOLOR: "#000",
        PRESSEDBORDERCOLOR: "#727272",
        PRESSEDTEXTCOLOR: "#FFF",
        PRESSEDINNERCOLORS :{ left: "#B8B8B8", top:"#B8B8B8",right:"transparent", bottom:"transparent"},
        PRESSEDOUTERCOLORS :{ left:"#C8C8C8", top:"#C8C8C8" ,right:"#E7E7E7",bottom:"#E7E7E7" }
    },
    DEFAULTFONTFACE: "tahoma",
    DEFAULTTEXTCOLOR: "#000",
    images: {},
    fonts: {},
    onThemeChanged: null,
    initialize: function () {
        let ctx = Core.ctx;
        let win = Core.apps.activeApplication.activeWindow;
        win.addCaptionChangedListener(function () {
            let maxRestoreBtn = this.maxRestoreBtn;
            let minimizeBtn = this.minimizeBtn;
            let textW;
            ctx.save();
            textW = int(ctx.measureText(this.caption).width);
            textW += 62;
            ctx.restore();
            maxRestoreBtn.left = textW + 1;
            minimizeBtn.left = textW - 2;
            this.width = textW + 21;
        });
        this.initialized = true;
        Core.loadFonts("../../../../fonts", [
            {
                alias: "tahoma",
                file: "tahoma.ttf"
            }
        ], this, function () {
            win.captionChanged();
        });
    }
};
//#endregion haiku