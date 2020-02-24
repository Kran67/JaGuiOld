//#region Imports
import { Window } from "../../../../scripts/components/containers/window.js";
import { ARITHMETICOPERATIONS as AO } from "../../../../scripts/core/types.js";
//#endregion Imports
//#region Window
Core.themes.simple.Window = {
    shapes:[
        {
            type:"rect",
            fillStyle:{
                active:"#9DCBFE",
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
            }, 
            strokeStyle:{
                triggers:[
                    {
                        prop: "borderStyle", value:Window.BORDERSTYLES.NONE, op: AO.NOTEQUAL
                    }
                ],
                normal:"#222"
            }
        }
    ]
};
//#endregion Window
//#region WindowTitleBar
Core.themes.simple.WindowTitleBar = {
    shapes:[
        {
            triggers:[
                {
                    prop: "borderStyle", value:[Window.BORDERSTYLES.SINGLE, Window.BORDERSTYLES.SIZEABLE], op: AO.INDEXOF, ref: "form"
                }
            ],
            type:"rect",
            height:22,
            fillStyle:{
                active:"#E0ECFF",
                inactive:"#F7F7F7"
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
            y:4,
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
            font:"10pt tahoma",
            x:24,
            y:13,
            ref:"form",
            fillStyle:{
                inactive:"#A5A5A5"
            }
        }
    ]
};
//#endregion
//#region WindowButton
Core.themes.simple.WindowButton = {
    left: null,
    right: 2,
    offset: 20,
    top: 4,
    fontSize: 11,
    width: 18,
    height: 18
};
//#endregion WindowButton
//#region WindowContent
Core.themes.simple.WindowContent = {
    shapes:[
        { 
            type:"rect",
            fillStyle:{
                normal: "#F7F7F7"
            }
        }
    ]
};
//#endregion WindowContent