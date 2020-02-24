//#region Imports
import { Window } from "../../../../scripts/components/containers/window.js";
import { ARITHMETICOPERATIONS as AO } from "../../../../scripts/core/types.js";
//#endregion Imports
//#region Button
Core.themes.modern.Button = {
    shapes:[
        { 
            type:"roundRect",
            radius:5,
            fillStyle:{
                gradientDir:Types.GRADIENTDIRECTIONS.TOBOTTOM,
                normal:[{ offset:0, color:"#F5F5F5" },{ offset: 1, color:"#D9D9D9" }],
                hovered:[{ offset:0, color:"#D7D7D7" },{ offset: 1, color:"#D9D9D9" }], 
                pressed:[{ offset:0, color:"#464646" },{ offset: 1, color:"#D9D9D9" }], 
                shadow:{
                    triggers: [
                        { prop:"isFocused", op:AO.ISTRUE }
                    ],
                    trueValue:{
                        blur:6,
                        color:"#005ACC"
                    }
                }
            }, 
            strokeStyle:{
                normal:"#B7B7B7"
            }
        }
    ]
};
//#endregion Button
//#region SpeedButton
Core.themes.modern.SpeedButton = {
    shapes:[
        { 
            type:"roundRect", 
            radius:11,
            fillStyle:{
                gradientDir:Types.GRADIENTDIRECTIONS.TOBOTTOM,
                normal:[{ offset:0, color:"#F9F9F9" },{ offset: 1, color:"#CECECE" }],
                hovered:[{ offset:0, color:"#D7D7D7" },{ offset: 1, color:"#D9D9D9" }], 
                pressed:[{ offset:0, color:"#464646" },{ offset: 1, color:"#D9D9D9" }]
            }, 
            strokeStyle:{
                normal:"#ACACAC"
            }
        }
    ]
};
//#endregion SpeedButton