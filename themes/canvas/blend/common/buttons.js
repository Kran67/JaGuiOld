//#region Imports
import { ArithmeticOperations as AO } from "../../../../scripts/core/types.js";
//#endregion Imports
//#region Button
Core.themes.blend.Button = {
    shapes:[
        { 
            type:"roundRect",
            radius:3,
            fillStyle:{
                gradientDir:Types.GRADIENTDIRECTIONS.TOBOTTOM,
                normal:[{ offset:0, color:"#626262" },{ offset:0.5, color:"#626262" },{ offset: 0.5, color:"#505050" },{ offset: 1, color:"#505050" }],
                hovered:[{ offset:0, color:"#707070" },{ offset: 1, color:"#707070" }],
                pressed:[{ offset:0, color:"#5B5B5B" },{ offset:0.5, color:"#5B5B5B" },{ offset: 0.5, color:"#404040" },{ offset: 1, color:"#404040" }], 
                shadow:{
                    triggers: [
                        { prop:"isFocused", op:AO.ISTRUE }
                    ],
                    trueValue:{
                        blur:6,
                        color:"#F69E2D"
                    }
                },
                iteration:2
            }, 
            strokeStyle:{   
                gradientDir:Types.GRADIENTDIRECTIONS.TOBOTTOM,
                normal:[{ offset:0, color:"#A1A1A1" },{ offset:0.5, color:"#A1A1A1" },{ offset: 0.5, color:"#E0E0E0" },{ offset: 1, color:"#E0E0E0" }]
            }
        }
    ],
    pressedCaptionOffset: { x:1, y:1 }
};
//#endregion Button
//#region SpeedButton
Core.themes.blend.SpeedButton = {
    shapes:[
        { 
            type:"roundRect", 
            radius:11,
            fillStyle:{
                normal:"#606060",
                hovered:"#707070",
                pressed:"#404040"
            }
        }
    ],
    pressedCaptionOffset: { x:1, y:1 }
};
//#endregion SpeedButton