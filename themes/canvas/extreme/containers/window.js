//#region Imports
import { Window } from "../../../../scripts/components/containers/window.js";
import { ARITHMETICOPERATIONS as AO } from "../../../../scripts/core/types.js";
//#endregion Imports
//#region Window
Core.themes.extreme.Window = {
    minHeight: 28,
    shapes:[
        {
            type:"roundRect",
            radius:{
                triggers:[
                    { prop:"windowState", value:Window.WINDOWSTATES.MAXIMIZED, op:AO.NOTEQUAL },
                    { prop:"borderStyle", value:Window.BORDERSTYLES.NONE, op:AO.NOTEQUAL, bExp:AO.AND }
                ],
                trueValue:10,
                falseValue:0,
                storedName: "cornerRadius"
            },
            fillStyle:{
                normal:"#E6E6E6",
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
                active:"#4F4C4B",
                inactive:"#222"
            }
        }
    ]
};
//#endregion Window
//#region WindowTitleBar
Core.themes.extreme.WindowTitleBar = {
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
                inactive:"#A5A5A5"
            }
        }
    ]
};
//#endregion
//#region WindowButton
Core.themes.extreme.WindowButton = {
    left: null,
    right: 2,
    offset: 20,
    top: 1,
    fontSize: 11,
    width: 18,
    height: 18,
    shapes:[
        {
            type:"ellipse",
            fillStyle:{
                gradientDir:Types.GRADIENTDIRECTIONS.TOBOTTOM,
                normal:[{ offset:0, color:"#FBFBFB" },{ offset: 1, color:"#BABABA" }],
                hovered:[{ offset:0, color:"#E1E1E1" },{ offset: 1, color:"#CDCDCD" }],
                pressed:[{ offset:0, color:"#FBFBFB" },{ offset: 1, color:"#BABABA" }]
            },
            strokeStyle:{
                normal:"#AFAFAF"
            }
        }
    ]
};
//#endregion WindowButton