//#region Imports
import { Window } from "../../../../scripts/components/containers/window.js";
import { ArithmeticOperations as AO } from "../../../../scripts/core/types.js";
//#endregion Imports
//#region Window
Core.themes.air.Window = {
    shapes:[
        {
            type:"rect",
            fillStyle:{
                active:"rgba(28, 28, 28, 0.9)",
                inactive:"#222",
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
            }
        }
    ]
};
//#endregion Window
//#region WindowTitleBar
Core.themes.air.WindowTitleBar = {
    shapes:[
        {
            triggers:[
                {
                    prop: "borderStyle", value:[Window.BORDERSTYLES.SINGLE, Window.BORDERSTYLES.SIZEABLE], op: AO.INDEXOF, ref: "form"
                }
            ],
            type:"rect",
            fillStyle:{
                active:"#000",
                inactive:"#505050"
            }
        },{
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
            textAlign:Types.ALIGNS.LEFT,
            textBaseline:Types.VERTTEXTALIGNS.MIDDLE,
            font:`10pt ${Core.themes.air.DEFAULTFONTFACE}`,
            x:24,
            y:11,
            ref:"form",
            fillStyle:{
                active:"#FFF",
                inactive:"#202020"
            }
        }
    ]
};
//#endregion WindowTitleBar
//#region WindowButton
Core.themes.air.WindowButton = {
    width: 19,
    height: 19,
    left: null,
    right: 2,
    offset: 20,
    top: 0,
    fontSize: 11,
    normalTextColor:"#FFF",
    hoveredTextColor:"#000",
    pressedTextColor:"#FFF",
    shapes:[
        {
            type:"ellipse",
            fillStyle:{
                gradientDir:Types.GRADIENTDIRECTIONS.TOBOTTOM,
                normal:"#686868",
                hovered:"#FFF",
                pressed:"#686868",
            }
        }
    ]
};
//#endregion WindowButton
//#region WindowContent
Core.themes.air.WindowContent = {
    shapes:[
        { 
            type:"rect",
            fillStyle:{
                normal: "#505050"
            }
        }
    ]
};
//#endregion WindowContent