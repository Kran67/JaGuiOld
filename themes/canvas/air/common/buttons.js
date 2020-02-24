//#region Imports
import { Window } from "../../../../scripts/components/containers/window.js";
import { ARITHMETICOPERATIONS as AO } from "../../../../scripts/core/types.js";
//#endregion Imports
//#region Button - SpeedButton
Core.themes.air.Button = 
Core.themes.air.SpeedButton = {
    shapes:[
        { 
            type:"rect",
            fillStyle:{
                gradientDir:Types.GRADIENTDIRECTIONS.TOBOTTOM,
                normal:[{ offset:0, color:"#494949" },{ offset: 1, color:"#4A4A4A" }],
                shadow:{
                    triggers: [
                        { prop:"isFocused", op:AO.ISTRUE }
                    ],
                    trueValue:{
                        blur:8,
                        color:"#65C8E0"
                    }
                },
                iteration:3
            }, 
            strokeStyle:{
                normal:"#515151"
            }
        },{
            type:"rect",
            left:1,
            top:1,
            right:2,
            bottom:2,
            strokeStyle:{
                normal:"#1C1C1C"
            }
        },
        {
            type:"rect",
            left:2,
            top:2,
            right:3,
            bottom:3,
            strokeStyle:{
                normal:"#6A6A6A"
            }
        }
    ],
    pressedCaptionOffset: { x:1, y:1 }
};
//#endregion Button - SpeedButton