//#region Imports
import { Window } from "../../../../scripts/components/containers/window.js";
import { ARITHMETICOPERATIONS as AO } from "../../../../scripts/core/types.js";
//#endregion Imports
//#region Window
Core.themes.carbon.Window = {
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
                active:"#000",
                inactive:"#000",
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
Core.themes.carbon.WindowTitleBar = {
    shapes:[
        {
            triggers:[
                {
                    prop: "borderStyle", value:[Window.BORDERSTYLES.SINGLE, Window.BORDERSTYLES.SIZEABLE], op: AO.INDEXOF, ref : "form"
                }
            ],
            radius:{
                tr:{
                triggers:[
                    { prop:"windowState", value:Window.WINDOWSTATES.MAXIMIZED, op:AO.NOTEQUAL, ref : "form" },
                    { prop:"borderStyle", value:Window.BORDERSTYLES.NONE, op:AO.NOTEQUAL, bExp:AO.AND, ref : "form" }
                ],
                    trueValue:5,
                    falseValue:0
                },
                tl:{
                triggers:[
                    { prop:"windowState", value:Window.WINDOWSTATES.MAXIMIZED, op:AO.NOTEQUAL, ref : "form" },
                    { prop:"borderStyle", value:Window.BORDERSTYLES.NONE, op:AO.NOTEQUAL, bExp:AO.AND, ref : "form" }
                ],
                    trueValue:5,
                    falseValue:0
                },
                bl:0,
                br:0
            },
            type:"roundRect",
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
            font:`10pt ${Core.themes.carbon.DEFAULTFONTFACE}`,
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
Core.themes.carbon.WindowButton = {
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
                normal:[{ offset:0, color:"#505050" },{ offset: 1, color:"#303030" }],
                hovered:[{ offset:0, color:"#707070" },{ offset: 1, color:"#303030" }],
                pressed:[{ offset:0, color:"#404040" },{ offset: 1, color:"#303030" }]
            },
            strokeStyle:{
                normal:"#222"
            }
        }
    ]
};
//#endregion WindowButton
//#region WindowContent
Core.themes.carbon.WindowContent = {
    shapes:[
        { 
            type:"roundRect",
            fillStyle:{
                normal: "#333"
            },
            radius:{
                tl:0,
                tr:0,
                br:{
                    triggers:[
                        { prop:"windowState", value:Window.WINDOWSTATES.MAXIMIZED, op:AO.NOTEQUAL, ref: "form" },
                        { prop:"borderStyle", value:Window.BORDERSTYLES.NONE, op:AO.NOTEQUAL, bExp:AO.AND, ref: "form" }
                    ],
                    trueValue:5,
                    falseValue:0
                },
                bl:{
                    triggers:[
                        { prop:"windowState", value:Window.WINDOWSTATES.MAXIMIZED, op:AO.NOTEQUAL, ref: "form" },
                        { prop:"borderStyle", value:Window.BORDERSTYLES.NONE, op:AO.NOTEQUAL, bExp:AO.AND, ref: "form" }
                    ],
                    trueValue:5,
                    falseValue:0
                }
            }
        }
    ]
};
//#endregion WindowContent