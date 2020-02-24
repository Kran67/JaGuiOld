//#region Imports
import { Window } from "../../../../scripts/components/containers/window.js";
import { ARITHMETICOPERATIONS as AO } from "../../../../scripts/core/types.js";
//#endregion Imports
//#region Button
Core.themes.simple.Button = {
    shapes:[
        { 
            type:"roundRect",
            radius:3,
            fillStyle:{
                gradientDir:Types.GRADIENTDIRECTIONS.TOBOTTOM,
                normal:[{ offset:0, color:"#F9F9F9" },{ offset: 1, color:"#E3E3E3" }],
                pressed:[{ offset:0, color:"#DDD" },{ offset: 1, color:"#F5F5F5" }], 
            }, 
            strokeStyle:{
                normal:"#BBB"
            }
        },{ 
            triggers: [
                { prop:"isFocused", op:AO.ISTRUE }
            ],
            type:"roundRect",
            radius:3,
            strokeStyle:{
                normal:"#6694E3"
            }
        }
    ],
    pressedCaptionOffset: { x:1, y:1 }
};
//#endregion Button
//#region SpeedButton
Core.themes.simple.SpeedButton = {
    shapes:[
        { 
            type:"roundRect", 
            radius:3,
            fillStyle:{
                gradientDir:Types.GRADIENTDIRECTIONS.TOBOTTOM,
                normal:[{ offset:0, color:"#F9F9F9" },{ offset: 1, color:"#E3E3E3" }],
                pressed:[{ offset:0, color:"#DDD" },{ offset: 1, color:"#F5F5F5" }]
            }, 
            strokeStyle:{
                normal:"#DDD",
                hovered:"#939393",
                pressed:"#939393"
            }
        }
    ],
    pressedCaptionOffset: { x:1, y:1 }
};
//#endregion SpeedButton