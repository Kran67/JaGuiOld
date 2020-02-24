//#region Imports
import { Window } from "../../../../scripts/components/containers/window.js";
import { ARITHMETICOPERATIONS as AO } from "../../../../scripts/core/types.js";
//#endregion Imports
//#region Button
Core.themes.carbon.Button = {
    clipped:false,
    shapes:[
        { 
            type:"roundRect",
            radius:3,
            fillStyle:{
                gradientDir:Types.GRADIENTDIRECTIONS.TOBOTTOM,
                normal:[{ offset:0, color:"#505050" },{ offset: 1, color:"#303030" }],
                hovered:[{ offset:0, color:"#707070" },{ offset: 1, color:"#303030" }],
                pressed:[{ offset:0, color:"#404040" },{ offset: 1, color:"#303030" }], 
                shadow:{
                    triggers: [
                        { prop:"isFocused", op:AO.ISTRUE }
                    ],
                    trueValue:{
                        blur:6,
                        color:"#F69E2D"
                    }
                }
            }, 
            strokeStyle:{
                normal:"#222"
            }
        }
    ]
};
//#endregion Button
//#region SpeedButton
Core.themes.carbon.SpeedButton = {
    shapes:[
        { 
            type:"roundRect", 
            radius:3,
            fillStyle:{
                gradientDir:Types.GRADIENTDIRECTIONS.TOBOTTOM,
                normal:[{ offset:0, color:"#505050" },{ offset: 1, color:"#303030" }],
                hovered:[{ offset:0, color:"#707070" },{ offset: 1, color:"#303030" }],
                pressed:[{ offset:0, color:"#404040" },{ offset: 1, color:"#303030" }]
            }, 
            strokeStyle:{
                normal:"#404040"
            }
        }
    ]
};
//#endregion SpeedButton