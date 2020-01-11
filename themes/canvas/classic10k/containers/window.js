//#region Imports
import { Window } from "../../../../scripts/components/containers/window.js";
import { ArithmeticOperations as AO } from "../../../../scripts/core/types.js";
//#endregion Imports
//#region Window
Core.themes.classic10k.Window = {
    minHeight: 24,
    shapes:[
        {
            type:"rect",
            fillStyle:{
                normal:"#D4D0C8"
            }, 
            strokeStyle:{
                normal:"#3D463D"
            }
        },{
            type:"rectWithBordersColor",
            left:1,
            top:1,
            right:1,
            bottom:1,
            borders:{
                left:"transparent",
                top:"transparent",
                right:"#C0BCAF",
                bottom:"#C0BCAF"
            }
        },{
            type:"rectWithBordersColor",
            left:1,
            top:1,
            right:1,
            bottom:1,
            borders:{
                left:"#ECEAE6",
                top:"#ECEAE6",
                right:"transparent",
                bottom:"transparent"
            }
        },{
            triggers:[
                {
                    prop: "borderStyle", value:[Window.BORDERSTYLES.SINGLE, Window.BORDERSTYLES.SIZEABLE], op: AO.INDEXOF
                }
            ],
            type:"rect",
            left:25,
            top:2,
            height:17,
            right:4,
            strokeStyle:{
                normal:"#4E5961"
            }
        },{
            triggers:[
                {
                    prop: "borderStyle", value:[Window.BORDERSTYLES.SINGLE, Window.BORDERSTYLES.SIZEABLE], op: AO.INDEXOF
                }
            ],
            type:"rect",
            left:27,
            top:4,
            height:13,
            width:1,
            fillStyle:{
                normal:"#4E5961"
            }
        },{
            triggers:[
                {
                    prop: "borderStyle", value:[Window.BORDERSTYLES.SINGLE, Window.BORDERSTYLES.SIZEABLE], op: AO.INDEXOF
                }
            ],
            type:"rect",
            left:29,
            top:4,
            height:13,
            right:6,
            fillStyle:{
                normal:"#65737E"
            },
            strokeStyle:{
                normal:"#4E5961"
            }
        },{
            triggers:[
                {
                    prop: "borderStyle", value:[Window.BORDERSTYLES.SINGLE, Window.BORDERSTYLES.SIZEABLE], op: AO.INDEXOF
                }
            ],
            type:"rect",
            left:24.5,
            top:19,
            height:1,
            right:3.5,
            strokeStyle:{
                normal:"#EBE7DD"
            }
        },{
            triggers:[
                {
                    prop: "borderStyle", value:[Window.BORDERSTYLES.SINGLE, Window.BORDERSTYLES.SIZEABLE], op: AO.INDEXOF
                }
            ],
            type:"rectWithBordersColor",
            left:30,
            top:5,
            right:6,
            height:11,
            borders:{
                left:"#798A97",
                top:"#798A97",
                right:"transparent",
                bottom:"transparent"
            }
        },{
            triggers:[
                {
                    prop: "borderStyle", value:[Window.BORDERSTYLES.SINGLE, Window.BORDERSTYLES.SIZEABLE], op: AO.INDEXOF
                }
            ],
            type:"rect",
            left:"`${priv.width}-20`",
            top:4,
            height:13,
            width:1,
            fillStyle:{
                normal:"#4E5961"
            }
        },{
            triggers:[
                {
                    prop: "borderStyle", value:[Window.BORDERSTYLES.SINGLE, Window.BORDERSTYLES.SIZEABLE], op: AO.INDEXOF
                }
            ],
            type:"rect",
            left:"`${priv.width}-19`",
            top:5,
            height:11,
            width:1,
            fillStyle:{
                normal:"#798A97"
            }
        }
    ]
};
//#endregion Window
//#region WindowTitleBar
Core.themes.classic10k.WindowTitleBar = {
    height:19,
    clipped:false,
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
            y:0,
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
            font:`7pt ${Core.themes.classic10k.DEFAULTFONTFACE}`,
            x:24,
            y:7,
            ref:"form",
            alignWithButtonsAndIcon:true,
            fillStyle:{
                active:"#D4D0C8",
                inactive:"#31383E"
            }
        }
    ]
};
//#endregion
//#region WindowButton
Core.themes.classic10k.WindowButton = {
    left: null,
    right: 4,
    offset: 13,
    top: 2,
    fontSize: 11,
    width: 9,
    height: 9,
    drawCaption:false
};
//#endregion WindowButton
//#region WindowCloseButton
Core.themes.classic10k.WindowCloseButton = {
    clipped:true,
    shapes:[
        {
            type:"drawImg",
            image: "windowbtns",
            x:0,
            y:0,
            width:27,
            height:81,
            hoveredOffset:9,
            pressedOffset:18
        }
    ],
    drawCaption:false
}
//#endregion WindowCloseButton
//#region WindowMaxRestoreButton
Core.themes.classic10k.WindowMaxRestoreButton = {
    clipped:true,
    shapes:[
        {
            type:"drawImg",
            image: "windowbtns",
            x:0,
            y:"`form.isMaximized?18:9`",
            width:27,
            height:81,
            hoveredOffset:9,
            pressedOffset:18
        }
    ],
    drawCaption:false
}
//#endregion WindowMaxRestoreButton
//#region WindowMinimizeButton
Core.themes.classic10k.WindowMinimizeButton = {
    clipped:true,
    shapes:[
        {
            type:"drawImg",
            image: "windowbtns",
            x:0,
            y:"`form.isMinimized?18:27`",
            width:27,
            height:81,
            hoveredOffset:9,
            pressedOffset:18
        }
    ],
    drawCaption:false
}
//#endregion WindowMinimizeButton
//#region WindowHelpButton
Core.themes.classic10k.WindowHelpButton = {
    clipped:true,
    shapes:[
        {
            type:"drawImg",
            image: "windowbtns",
            x:0,
            y:-36,
            width:27,
            height:81,
            hoveredOffset:9,
            pressedOffset:18
        }
    ],
    drawCaption:false
}
//#endregion WindowHelpButton
//#region WindowRollUpDownButton
Core.themes.classic10k.WindowRollUpDownButton = {
    clipped:true,
    shapes:[
        {
            type:"drawImg",
            image: "windowbtns",
            x:0,
            y:"`instance.isRolledUp?54:45`",
            width:27,
            height:81,
            hoveredOffset:9,
            pressedOffset:18
        }
    ],
    drawCaption:false
}
//#endregion WindowRollUpDownButton
//#region WindowStayOnOffButton
Core.themes.classic10k.WindowStayOnOffButton = {
    clipped:true,
    shapes:[
        {
            type:"drawImg",
            image: "windowbtns",
            x:0,
            y:"`instance.isStayOn?72:63`",
            width:27,
            height:81,
            hoveredOffset:9,
            pressedOffset:18
        }
    ],
    drawCaption:false
}
//#endregion WindowStayOnOffButton