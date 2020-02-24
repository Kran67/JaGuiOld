//#region Imports
import { Window } from "../../../../scripts/components/containers/window.js";
import { ARITHMETICOPERATIONS as AO } from "../../../../scripts/core/types.js";
//#endregion Imports
//#region Window
Core.themes.clearlooksblue.Window = {
    minHeight: 26,
    shapes:[
        {
            type:"roundRect",
            radius:{
                tl:{
                    triggers:[
                        { prop:"windowState", value:Window.WINDOWSTATES.MAXIMIZED, op:AO.NOTEQUAL },
                        { prop:"borderStyle", value:Window.BORDERSTYLES.NONE, op:AO.NOTEQUAL, bExp:AO.AND }
                    ],
                    trueValue:10,
                    falseValue:0
                },
                tr:{
                    triggers:[
                        { prop:"windowState", value:Window.WINDOWSTATES.MAXIMIZED, op:AO.NOTEQUAL },
                        { prop:"borderStyle", value:Window.BORDERSTYLES.NONE, op:AO.NOTEQUAL, bExp:AO.AND }
                    ],
                    trueValue:10,
                    falseValue:0
                },
                br:0,
                bl:0
            },
            fillStyle:{
                normal:"#EFEBE7",
                shadow:{
                    triggers: [
                        { prop:"windowState", value:Window.WINDOWSTATES.MAXIMIZED, op:AO.NOTEQUAL },
                        { prop:"enabledShadow", op:AO.ISTRUE, bExp:AO.AND }
                    ],
                    trueValue:{
                        blur:5,
                        color:"rgba(0, 0, 0, 0.7)",
                        offsetX:5,
                        offsetY:5
                    }
                }
            }, 
            strokeStyle:{
                triggers:[
                    {
                        prop: "borderStyle", value:Window.BORDERSTYLES.NONE, op: AO.NOTEQUAL
                    }
                ],
                normal:"#000"
            }
        },{
            triggers:[
                {
                    prop: "borderStyle", value:[Window.BORDERSTYLES.SINGLE, Window.BORDERSTYLES.SIZEABLE], op: AO.INDEXOF
                }
            ],
            type:"roundRect",
            radius:{
                tl:{
                    triggers:[
                        { prop:"windowState", value:Window.WINDOWSTATES.MAXIMIZED, op:AO.NOTEQUAL },
                        { prop:"borderStyle", value:Window.BORDERSTYLES.NONE, op:AO.NOTEQUAL, bExp:AO.AND }
                    ],
                    trueValue:10,
                    falseValue:0
                },
                tr:{
                    triggers:[
                        { prop:"windowState", value:Window.WINDOWSTATES.MAXIMIZED, op:AO.NOTEQUAL },
                        { prop:"borderStyle", value:Window.BORDERSTYLES.NONE, op:AO.NOTEQUAL, bExp:AO.AND }
                    ],
                    trueValue:9,
                    falseValue:0
                },
                br:0,
                bl:0
            },
            left:1,
            top:1,
            height:24,
            right:1,
            fillStyle:{
                gradientDir:Types.GRADIENTDIRECTIONS.TOBOTTOM,
                active:[{ offset:0, color:"#99BAE3"}, {offset: 0.5, color: "#8CB0DC" }, {offset: 0.5, color: "#84AAD8" }, {offset: 1, color: "#7AA1D1" }],
                inactive:[{ offset:0, color:"#EDECEB"}, {offset: 1, color: "#DEDBD8" }]
            }
        },{
            triggers:[
                {
                    prop: "borderStyle", value:[Window.BORDERSTYLES.SINGLE, Window.BORDERSTYLES.SIZEABLE], op: AO.INDEXOF
                }
            ],
            type:"rectWithBordersColor",
            left:1,
            top:1,
            bottom:1,
            right:1,
            borders:{
                left:"#FFF",
                top:"transparent",
                right:"#DCD4CC",
                bottom:"#DCD4CC"
            },
            clipping:{
                shape:"rect",
                left:1,
                top:25,
                bottom:1,
                right:1
            }
        },{
            type:"roundRect",
            radius:{
                tl:{
                    triggers:[
                        { prop:"windowState", value:Window.WINDOWSTATES.MAXIMIZED, op:AO.NOTEQUAL },
                        { prop:"borderStyle", value:Window.BORDERSTYLES.NONE, op:AO.NOTEQUAL, bExp:AO.AND }
                    ],
                    trueValue:10,
                    falseValue:0
                },
                tr:{
                    triggers:[
                        { prop:"windowState", value:Window.WINDOWSTATES.MAXIMIZED, op:AO.NOTEQUAL },
                        { prop:"borderStyle", value:Window.BORDERSTYLES.NONE, op:AO.NOTEQUAL, bExp:AO.AND }
                    ],
                    trueValue:9,
                    falseValue:0
                },
                br:0,
                bl:0
            },
            left:0,
            top:0,
            height:25,
            right:1,
            strokeStyle:{
                active:"#455D7C",
                inactive:"#3D3A37"
            }
        },{
            type:"roundRect",
            radius:{
                tl:{
                    triggers:[
                        { prop:"windowState", value:Window.WINDOWSTATES.MAXIMIZED, op:AO.NOTEQUAL },
                        { prop:"borderStyle", value:Window.BORDERSTYLES.NONE, op:AO.NOTEQUAL, bExp:AO.AND }
                    ],
                    trueValue:10,
                    falseValue:0
                },
                tr:{
                    triggers:[
                        { prop:"windowState", value:Window.WINDOWSTATES.MAXIMIZED, op:AO.NOTEQUAL },
                        { prop:"borderStyle", value:Window.BORDERSTYLES.NONE, op:AO.NOTEQUAL, bExp:AO.AND }
                    ],
                    trueValue:9,
                    falseValue:0
                },
                br:0,
                bl:0
            },
            left:1,
            top:1,
            height:23,
            right:1,
            borders:{
                triggers:[
                    { prop:"windowState", value:Window.WINDOWSTATES.MAXIMIZED, op:AO.EQUAL }
                ],
                trueValue:{
                    left:"#9EBDE5",
                    top:"#B2CCED",
                    right:"#9EBDE5",
                    bottom:"transparent"
                },
                falseValue:{
                    left:"#F5F4F4",
                    top:"#F7F7F7",
                    right:"#F5F4F4",
                    bottom:"transparent"
                }
            }
        },{
            type:"rect",
            left:1,
            top:24,
            height:1,
            right:1,
            fillStyle:{
                active:"#4E76A8",
                inactive:"#9A8E7C"
            }
        }
    ]
};
//#endregion Window
//#region WindowTitleBar
Core.themes.clearlooksblue.WindowTitleBar = {
    height:21,
    shapes:[
        {
            triggers:[
                {
                    prop: "borderStyle", value:[Window.BORDERSTYLES.SINGLE, Window.BORDERSTYLES.SIZEABLE], op: AO.INDEXOF, ref: "form"
                }
            ],
            type: "drawImg",
            image: "logo",
            x:2,
            y:2,
            width:16,
            height:16
        },{
            triggers:[
                {
                    prop: "borderStyle", value:[Window.BORDERSTYLES.SINGLE, Window.BORDERSTYLES.SIZEABLE], op: AO.INDEXOF, ref: "form"
                }
            ],
            trueValue:2,
            falseValue:-20,
            type: "drawText",
            textAlign:Types.ALIGNS.CENTER,
            textBaseline:Types.VERTTEXTALIGNS.MIDDLE,
            font:`10pt ${Core.themes.clearlooksblue.DEFAULTFONTFACE}`,
            x:24,
            y:10,
            ref:"form",
            alignWithButtonsAndIcon:true,
            fillStyle:{
                active:"#FFF",
                inactive:"#6A6968",
                shadow:{
                    triggers:[
                        {
                            prop: "activeWindow", op: AO.ISTRUE, ref: "form"
                        }
                    ],
                    trueValue:{
                        blur:5,
                        color:"#000",
                        offsetX:0,
                        offsetY:0
                    }
                }
            }
        }
    ]
};
//#endregion
//#region WindowButton
Core.themes.clearlooksblue.WindowButton = {
    left: null,
    right: 2,
    offset: 20,
    top: 0,
    fontSize: 11,
    width: 18,
    height: 18,
    drawCaption:false,
    shapes:[
        {
            type:"roundRect",
            radius:4,
            fillStyle:{
                gradientDir:Types.GRADIENTDIRECTIONS.TOBOTTOM,
                normal:[{ offset:0, color:"#9EBDE5"}, {offset: 0.45, color: "#91B3DF" }, {offset: 0.45, color: "#86ABD9" }, {offset: 1, color: "#78A0D1" }],
                hovered:[{ offset:0, color:"#A0C1EF"}, {offset: 0.49, color: "#93B8EA" }, {offset: 0.5, color: "#89B2E6" }, {offset: 1, color: "#78A6DE" }],
                pressed:[{ offset:0, color:"#93AED1"}, {offset: 0.5, color: "#87A5CC" }, {offset: 0.5, color: "#7C9EC6" }, {offset: 1, color: "#6C90BD" }]
            },
            strokeStyle:{
                gradientDir:Types.GRADIENTDIRECTIONS.TOBOTTOM,
                normal:[{ offset:0, color:"#82A8D7"}, {offset: 1, color: "#94B6E1" }]
            }
        },{
            type:"roundRect",
            radius:4,
            left:1,
            top:1,
            right:2,
            bottom:2,
            strokeStyle:{
                normal:"#48668A"
            }
        },{
            type:"rect",
            left:4,
            top:2,
            right:4,
            height:1,
            fillStyle:{
                normal:"#B2CCED",
                hovered:"#B3D0F5",
                pressed:"#A5BCD9"
            }
        },{
            type:"rect",
            left:2,
            top:4,
            bottom:4,
            width:1,
            fillStyle:{
                normal:"#9EBDE5",
                hovered:"#A0C1EF",
                pressed:"#93AED1"
            }
        },{
            type:"rect",
            left:15,
            top:4,
            bottom:4,
            width:1,
            fillStyle:{
                normal:"#86ABD9",
                hovered:"#89B2E6",
                pressed:"#7C9EC6"
            }
        },{
            type:"clipRect",
            left:4,
            top:4,
            width:10,
            height:10
        }
    ]
};
//#endregion WindowButton
//#region WindowCloseButton
Core.themes.clearlooksblue.WindowCloseButton = {
    drawCaption:false,
    shapes:[...Core.themes.clearlooksblue.WindowButton.shapes,
        {
            type:"drawImg",
            image: "windowbtns",
            x:4,
            y:4,
            width:20,
            height:80
        }
    ]
};
//#endregion WindowCloseButton
//#region WindowMaxRestoreButton
Core.themes.clearlooksblue.WindowMaxRestoreButton = {
    drawCaption:false,
    shapes:[...Core.themes.clearlooksblue.WindowButton.shapes,
        {
            type:"drawImg",
            image: "windowbtns",
            x:4,
            y:"`form.isMaximized?16:6`",
            width:20,
            height:80
        }
    ]
};
//#endregion WindowMaxRestoreButton
//#region WindowMinimizeButton
Core.themes.clearlooksblue.WindowMinimizeButton = {
    drawCaption:false,
    shapes:[...Core.themes.clearlooksblue.WindowButton.shapes,
        {
            type:"drawImg",
            image: "windowbtns",
            x:4,
            y:"`form.isMinimized?6:26`",
            width:20,
            height:80
        }
    ]
};
//#endregion WindowMinimizeButton
//#region WindowHelpButton
Core.themes.clearlooksblue.WindowHelpButton = {
    drawCaption:false,
    shapes:[...Core.themes.clearlooksblue.WindowButton.shapes,
        {
            type:"drawImg",
            image: "windowbtns",
            x:4,
            y:-36,
            width:20,
            height:80
        }
    ]
};
//#endregion WindowHelpButton
//#region WindowRollUpDownButton
Core.themes.clearlooksblue.WindowRollUpDownButton = {
    drawCaption:false,
    shapes:[...Core.themes.clearlooksblue.WindowButton.shapes,
        {
            type:"drawImg",
            image: "windowbtns",
            x:4,
            y:"`instance.isRolledUp?6:46`",
            width:20,
            height:80
        }
    ]
};
//#endregion WindowRollUpDownButton
//#region WindowStayOnOffButton
Core.themes.clearlooksblue.WindowStayOnOffButton = {
    drawCaption:false,
    shapes:[...Core.themes.clearlooksblue.WindowButton.shapes,
        {
            type:"drawImg",
            image: "windowbtns",
            x:4,
            y:"`instance.isStayOn?66:56`",
            width:20,
            height:80
        }
    ]
};



//#region Window
/*Core.themes.clearlooksblue.Window.render = function (obj) {
    //#region Variables déclaration
    const borderStyle = obj.borderStyle;
    const windowState = obj.windowState;
    const width = obj.contentWidth;
    const height = obj.contentHeight;
    const WINDOWSTATES = Window.WINDOWSTATES;
    const BORDERSTYLES = Window.BORDERSTYLES;
    const themeName = obj.app.themeName;
    const windowTheme = Core.themes[themeName].Window;
    const ctx = Core.ctx;
    const isActiveWindow = obj.activeWindow;
    const offsetY = Window.WINDOWSIZEABLEBORDERSIZE;
    const inactive = !isActiveWindow?"IN":String.EMPTY;
    const cornerRadius = windowState !== WINDOWSTATES.MAXIMIZED && borderStyle !== BORDERSTYLES.NONE ? 9 : 0;
    const gradient = ctx.createLinearGradient(0,0,0,23);
    //#endregion Variables déclaration
    ctx.save();
    // Drop shadow
    if (windowState !== WINDOWSTATES.MAXIMIZED && obj.enabledShadow) {
        ctx.shadowBlur = windowTheme.SHADOWBLUR;
        ctx.shadowOffsetX = ctx.shadowOffsetY = windowTheme.SHADOWOFFSET;
        ctx.shadowColor = windowTheme.SHADOWCOLOR;
    }
    if (borderStyle !== BORDERSTYLES.NONE) {
        ctx.beginPath();
        ctx.roundRect(0.5, 0.5, width - 1, height - 1, { tl:cornerRadius, tr:cornerRadius, br:0, bl:0 });
        ctx.fillStyle = windowTheme.BACKCOLOR;
        ctx.fill();
        ctx.clearShadow();
        ctx.strokeStyle = "#000";
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = `#${(isActiveWindow?"B2CCED":"F7F7F7")}`;
        ctx.roundRect(1.5, 1.5, width - 3, 5, { tl:cornerRadius, tr:cornerRadius, br:0, bl:0});
        ctx.stroke();
        windowTheme.WindowTitleBar[`${inactive}ACTIVEBACKCOLOR`].forEach(cs => {
            gradient.addColorStop(cs.offset, cs.color);
        });
        ctx.fillStyle = gradient;
        ctx.roundRect(2, 2, width - 4, 23, { tl:cornerRadius, tr:cornerRadius, br:0, bl:0});
        ctx.fill();
        ctx.strokeStyle = windowTheme[`${inactive}ACTIVEEDGECOLOR`];
        ctx.beginPath();
        ctx.roundRect(0.5, 0.5, width - 1, 20 + offsetY, { tl:cornerRadius, tr:cornerRadius, br:0, bl:0 });
        ctx.stroke();
        ctx.strokeStyle = "#000";
        ctx.beginPath();
        ctx.moveTo(0, 20.5 + offsetY);
        ctx.lineTo(width, 20.5 + offsetY);
        ctx.stroke();
        ctx.strokeStyle = `#${(isActiveWindow?"4E76A8":"9A8E7C")}`;
        ctx.beginPath();
        ctx.moveTo(1, 20.5 + offsetY);
        ctx.lineTo(width - 1, 20.5 + offsetY);
        ctx.stroke();
        ctx.strokeStyle = `#${(isActiveWindow?"9EBDE5":"F5F4F4")}`;
        ctx.beginPath();
        ctx.moveTo(1.5, 4 + offsetY);
        ctx.lineTo(1.5, 20 + offsetY);
        ctx.moveTo(width - 1.5, 4 + offsetY);
        ctx.lineTo(width - 1.5, 20 + offsetY);
        ctx.stroke();
        ctx.strokeStyle = "#FFF";
        ctx.beginPath();
        ctx.moveTo(1.5, 21 + offsetY);
        ctx.lineTo(1.5, height-1);
        ctx.stroke();
        ctx.strokeStyle = "#DCD4CC";
        ctx.beginPath();
        ctx.moveTo(1, height-1.5);
        ctx.lineTo(width - 1.5, height-1.5);
        ctx.lineTo(width - 1.5, 21.5 + offsetY);
        ctx.stroke();
    } else {
        ctx.beginPath();
        ctx.fillStyle = "#EFEBE7";
        ctx.fillRect(0, 0, width, height);
    }
    ctx.restore();
};
//#endregion Window
//#region WindowTitleBar
Core.themes.clearlooksblue.WindowTitleBar = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const form = obj.form;
        const ctx = Core.ctx;
        const borderStyle = obj.form.borderStyle;
        const BORDERSTYLES = Window.BORDERSTYLES;
        let offsetX = 2;
        let offsetY = 2;
        const logoImg = Core.themes.images.logo;
        const caption = form.caption;
        const isActiveWindow = form.activeWindow;
        const themeName = obj.app.themeName;
        const titleBarTheme = Core.themes[themeName].Window.WindowTitleBar;
        const buttonsTheme = titleBarTheme.WindowButton;
        const PT = Types.CSSUNITS.PT;
        const inactive = !isActiveWindow?"IN":String.EMPTY;
        const width = obj.contentWidth;
        const height = obj.contentHeight;
        let metrics;
        const visibleButtons = form.visibleButtons;
        const btnsSpace = visibleButtons * buttonsTheme.offset;
        //#endregion Variables déclaration

        ctx.save();
        ctx.clipRect(0, 0, width, height);
        if ([BORDERSTYLES.SINGLE, BORDERSTYLES.SIZEABLE].indexOf(borderStyle) > -1) {
            if (logoImg) {
                ctx.drawImage(logoImg, offsetX, offsetY, 16, 16);
            }
        }
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.font = `${titleBarTheme.FONTSTYLE} ${titleBarTheme.FONTSIZE}${PT} ${titleBarTheme.FONTFACE}`;
        if (isActiveWindow) {
            ctx.shadowBlur = titleBarTheme.SHADOWBLUR;
            ctx.shadowColor = titleBarTheme.SHADOWCOLOR;
        }
        ctx.fillStyle = titleBarTheme[`${inactive}ACTIVECAPTIONTEXTCOLOR`];
        metrics = ctx.measureText(caption);
        ctx.fillText(caption, 24 + (obj.contentWidth - 23 - btnsSpace - metrics.width) / 2, 10);
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowTitleBar
//#region WindowButtons
Core.themes.clearlooksblue.WindowCloseButton =
Core.themes.clearlooksblue.WindowMaxRestoreButton =
Core.themes.clearlooksblue.WindowMinimizeButton =
Core.themes.clearlooksblue.WindowHelpButton =
Core.themes.clearlooksblue.WindowRollUpDownButton =
Core.themes.clearlooksblue.WindowStayOnOffButton = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        let offsetX = 0;
        let offsetY = 0;
        const width = obj.width;
        const height = obj.height;
        const themeName = obj.app.themeName;
        let bg = ctx.createLinearGradient(0,0,0,height);
        let color, color2, color3;
        const form = obj.form;
        const windowBtns = Core.themes[themeName].images.windowbtns;
        const classes = Core.classes;
        const isActiveWindow = form.activeWindow;
        const buttonsTheme = Core.themes[themeName].Window.WindowTitleBar.WindowButton;
        const inactive = !isActiveWindow?"IN":String.EMPTY;
        //#endregion Variables déclaration
        ctx.save();
        ctx.clipRect(0, 0, width, height);
        if (!obj.enabled) {
            ctx.globalAlpha = 0.5;
        }
        if (isActiveWindow) {
            ctx.beginPath();
            bg = ctx.createLinearGradient(0, 0, 0, height);
            buttonsTheme.BORDERCOLOR.forEach(cs => {
                bg.addColorStop(cs.offset, cs.color);
            });
            ctx.strokeStyle = bg;
            ctx.roundRect(0, 0, obj.width, obj.height, 6);
            ctx.stroke();
        }
        ctx.strokeStyle = `#${(isActiveWindow?"48668A":"8F8370")}`;
        if (obj.isPressed && isActiveWindow) {
            buttonsTheme.PRESSEDBACKCOLOR.forEach(cs => {
                bg.addColorStop(cs.offset, cs.color);
            });
        } else if (obj.isMouseOver && isActiveWindow) {
            buttonsTheme.HOVEREDBACKCOLOR.forEach(cs => {
                bg.addColorStop(cs.offset, cs.color);
            });
        } else {
            buttonsTheme[`${inactive}ACTIVEBACKCOLOR`].forEach(cs => {
                bg.addColorStop(cs.offset, cs.color);
            });
        }
        if (bg) {
            ctx.beginPath();
            ctx.fillStyle = bg;
            ctx.fillRect(3, 3, width - 6, height-6);
        }
        ctx.beginPath();
        ctx.roundRect(1.5, 1.5, width - 3, height - 3, 4);
        ctx.stroke();
        
        if (obj.isPressed && isActiveWindow) {
            color = "#7C9EC6";
            color2 = "#93AED1";
            color3 = "#A5BCD9";
        } else if (obj.isMouseOver && isActiveWindow) {
            color = "#89B2E6";
            color2 = "#A0C1EF";
            color3 = "#B3D0F5";
        } else {
            color = `#${(isActiveWindow?"86ABD9":"D0C8BB")}`;
            color2 = `#${(isActiveWindow?"9EBDE5":"FFF")}`;
            color3 = `#${(isActiveWindow?"B2CCED":"FFF")}`;
        }
        ctx.strokeStyle = color3;
        ctx.beginPath();
        ctx.moveTo(4, 2.5);
        ctx.lineTo(width - 4, 2.5);
        ctx.stroke();
        ctx.strokeStyle = color2;
        ctx.beginPath();
        ctx.moveTo(2.5, 4);
        ctx.lineTo(2.5, height - 4);
        ctx.stroke();
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(width - 2.5, 4);
        ctx.lineTo(width - 2.5, height - 4);
        ctx.stroke();
        if (obj instanceof classes.WindowMaxRestoreButton) {
            offsetY = form.isMaximized ? 20 : 10;
        } else if (obj instanceof classes.WindowMinimizeButton) {
            offsetY = form.isMinimized ? 10 : 30;
        } else if (obj instanceof classes.WindowHelpButton) {
            offsetY = 40;
        } else if (obj instanceof classes.WindowRollUpDownButton) {
            offsetY = obj.isRolledUp ? 10 : 50;
        } else if (obj instanceof classes.WindowStayOnOffButton) {
            offsetY = obj.isStayOn ? 70 : 60;
        }
        if (!isActiveWindow) {
            offsetX = 10;
        }
        ctx.clipRect(4, 4, 10, 10);
        ctx.translate(4, 4);
        if (windowBtns) {
            ctx.drawImage(windowBtns, -offsetX, -offsetY, 20, 80);
        }
        ctx.restore();
    }
    //#endregion render
};
//#endregion WindowButtons*/