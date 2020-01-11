//#region Imports
import { Window } from "../../../../scripts/components/containers/window.js";
import { ArithmeticOperations as AO } from "../../../../scripts/core/types.js";
//#endregion Imports
//#region Window
Core.themes.modern.Window = {
    shapes:[
        {
            type:"rect",
            fillStyle:{
                normal:"#F3F3F3",
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
                active:"#181818",
                inactive:"#BBB"
            }
        },{
            triggers:[
                {
                    prop: "borderStyle", value:[Window.BORDERSTYLES.SINGLE, Window.BORDERSTYLES.SIZEABLE], op: AO.INDEXOF
                }
            ],
            type:"rect",
            left:1,
            top:1,
            right:2,
            height:28,
            fillStyle:{
                gradientDir:Types.GRADIENTDIRECTIONS.TOBOTTOM,
                active:[{ offset:0, color:"#FAFAFA" },{ offset: 1, color:"#BBB" }],
                inactive:[{ offset:0, color:"#FFF" },{ offset: 1, color:"#FFF" }]
            }
        }
    ]
};
//#endregion Window
//#region WindowTitleBar
Core.themes.modern.WindowTitleBar = {
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
            textAlign:Types.ALIGNS.LEFT,
            textBaseline:Types.VERTTEXTALIGNS.MIDDLE,
            font:"10pt tahoma",
            x:24,
            y:11,
            ref:"form",
            fillStyle:{
            }
        }
    ]
};
//#endregion
//#region WindowButton
Core.themes.modern.WindowButton = {
    left: null,
    right: 2,
    offset: 20,
    top: 1,
    fontSize: 11,
    width: 18,
    height: 18,
    normalTextColor:"#121212",
    shapes:[
        {
            type:"ellipse",
            fillStyle:{
                gradientDir:Types.GRADIENTDIRECTIONS.TOBOTTOM,
                normal:[{ offset:0, color:"#F6F6F6" },{ offset: 1, color:"#CDCDCD" }],
                hovered:[{ offset:0, color:"#E1E1E1" },{ offset: 1, color:"#CDCDCD" }],
                pressed:[{ offset:0, color:"#E1E1E1" },{ offset: 1, color:"#CDCDCD" }]
            },
            strokeStyle:{
                normal:"#ACACAC"
            }
        }
    ]
};
//#endregion WindowButton