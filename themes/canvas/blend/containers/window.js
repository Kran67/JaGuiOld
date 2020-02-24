//#region Imports
import { Window } from "../../../../scripts/components/containers/window.js";
import { ARITHMETICOPERATIONS as AO } from "../../../../scripts/core/types.js";
//#endregion Imports
//#region Window
Core.themes.blend.Window = {
    minHeight:28,
    shapes:[
        {
            type:"roundRect",
            radius:{
                triggers:[
                    { prop:"windowState", value:Window.WINDOWSTATES.MAXIMIZED, op:AO.NOTEQUAL },
                    { prop:"borderStyle", value:Window.BORDERSTYLES.NONE, op:AO.NOTEQUAL, bExp:AO.AND }
                ],
                trueValue:10,
                falseValue:0
            },
            fillStyle:{
                active:"#202020",
                inactive:"#A1A1A1"
            }
        }
    ]
};
//#endregion Window
//#region WindowTitleBar
Core.themes.blend.WindowTitleBar = {
    shapes:[
        {
            triggers:[
                {
                    prop: "borderStyle", value:[Window.BORDERSTYLES.SINGLE, Window.BORDERSTYLES.SIZEABLE], op: AO.INDEXOF
                }
            ],
            radius:{
                tr:5,
                tl:5,
                bl:0,
                br:0
            },
            type:"roundRect",
            fillStyle:{
                gradientDir:Types.GRADIENTDIRECTIONS.TOBOTTOM,
                active:[{ offset:0, color:"#313131" },{ offset: 1, color:"#1D1D1D" }],
                inactive:[{ offset:0, color:"#505050" },{ offset: 1, color:"#505050" }]
            }
        },{
            triggers:[
                {
                    prop: "borderStyle", value:[Window.BORDERSTYLES.SINGLE, Window.BORDERSTYLES.SIZEABLE], op: AO.INDEXOF, ref: "form"
                }
            ],
            type: "drawImg",
            image: "logo",
            align:Types.TEXTALIGNS.RIGHT,
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
            textAlign:Types.TEXTALIGNS.CENTER,
            textBaseline:Types.VERTTEXTALIGNS.MIDDLE,
            alignWithButtonsAndIcon:true,
            font:`10pt ${Core.themes.blend.DEFAULTFONTFACE}`,
            x:24,
            y:11,
            ref:"form",
            fillStyle:{
                active: "#FCFCFC",
                inactive:"#A5A5A5"
            }
        }
    ]
};
//#endregion
//#region WindowButton
Core.themes.blend.WindowButton = {
    width: 18.5,
    height: 18.5,
    left: 0,
    right: null,
    offset: 20,
    top: 1,
    fontSize: 11,
    normalTextColor:"#DEDEDE",
    hoveredTextColor:"#000",
    pressedTextColor:"#000",
    shapes:[
        {
            type:"ellipse",
            fillStyle:{
                normal:"#A5A5A5",
                hovered:"#FFF",
                pressed:"#A5A5A5"
            }
        }
    ]
};
//#endregion WindowButton
//#region WindowContent
Core.themes.blend.WindowContent = {
    shapes:[
        { 
            type:"roundRect",
            fillStyle:{
                normal: "#505050"
            },
            radius:{
                tl:0,
                tr:0,
                br:{
                    triggers:[
                        { prop:"windowState", value:Window.WINDOWSTATES.MAXIMIZED, op:AO.NOTEQUAL, ref: "form" },
                        { prop:"borderStyle", value:Window.BORDERSTYLES.NONE, op:AO.NOTEQUAL, bExp:AO.AND, ref: "form" }
                    ],
                    trueValue:6,
                    falseValue:0
                },
                bl:{
                    triggers:[
                        { prop:"windowState", value:Window.WINDOWSTATES.MAXIMIZED, op:AO.NOTEQUAL, ref: "form" },
                        { prop:"borderStyle", value:Window.BORDERSTYLES.NONE, op:AO.NOTEQUAL, bExp:AO.AND, ref: "form" }
                    ],
                    trueValue:6,
                    falseValue:0
                }
            }
        }
    ]
};
//#endregion WindowContent