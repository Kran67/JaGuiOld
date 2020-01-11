//#region Imports
import { Window } from "../../../../scripts/components/containers/window.js";
import { ArithmeticOperations as AO } from "../../../../scripts/core/types.js";
//#endregion Imports
//#region Button
Core.themes.extreme.Button = 
Core.themes.extreme.SpeedButton = {
    shapes:[
        { 
            type:"roundRect",
            radius:5,
            fillStyle:{
                gradientDir:Types.GRADIENTDIRECTIONS.TOBOTTOM,
                normal:[{ offset:0, color:"#FBFBFB " },{ offset: 1, color:"#BABABA" }], 
                shadow:{
                    triggers: [
                        { prop:"isFocused", op:AO.ISTRUE }
                    ],
                    trueValue:{
                        blur:8,
                        color:"#3D74B3"
                    }
                }
            }, 
            strokeStyle:{
                normal:"#525252"
            }
        },{ 
            type:"roundRect",
            radius:5,
            strokeStyle:{
                clipped:true,
                normal:"#525252",
                shadow:{
                    triggers: [
                        { prop:"isFocused", op:AO.ISTRUE }
                    ],
                    trueValue:{
                        blur:6,
                        color:"#000"
                    }
                },
                iteration:2
            }
        }
    ],
    pressedCaptionOffset: { x:1, y:1 }
};
//#endregion Button
//#region SpeedButton
Core.themes.extreme.SpeedButton = {
    shapes:[
        { 
            type:"roundRect",
            radius:11,
            fillStyle:{
                gradientDir:Types.GRADIENTDIRECTIONS.TOBOTTOM,
                normal:[{ offset:0, color:"#FBFBFB " },{ offset: 1, color:"#BABABA" }]
            }, 
            strokeStyle:{
                normal:"#525252"
            }
        }
    ],
    pressedCaptionOffset: { x:1, y:1 }
};
//#endregion SpeedButton