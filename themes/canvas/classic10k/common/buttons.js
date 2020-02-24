//#region Imports
import { Window } from "../../../../scripts/components/containers/window.js";
import { ARITHMETICOPERATIONS as AO } from "../../../../scripts/core/types.js";
//#endregion Imports
//#region Button
Core.themes.classic10k.Button = {
    shapes:[
        { 
            type:"rect",
            fillStyle:{
                normal:"#D4D0C8",
                hovered:"#DBD8D1"
            }, 
            strokeStyle:{
                normal:"#3D463D"
            }
        },{ 
            triggers:[
                {
                    prop: "isPressed", op:AO.ISFALSE
                }
            ],
            type:"rectWithBordersColor",
            left:1,
            top:1,
            right:1,
            bottom:1,
            borders:{
                left:"transparent",
                top:"transparent",
                right:"#C0BCAF",
                bottom:"#C0BCAF"
            }
        },{ 
            triggers:[
                {
                    prop: "isPressed", op:AO.ISFALSE
                }
            ],
            type:"rectWithBordersColor",
            left:1,
            top:1,
            right:1,
            bottom:1,
            borders:{
                left:"#ECEAE6",
                top:"#ECEAE6",
                right:"transparent",
                bottom:"transparent"
            }
        },{ 
            triggers:[
                {
                    prop: "isPressed", op:AO.ISTRUE
                }
            ],
            type:"rectWithBordersColor",
            left:1,
            top:1,
            right:1,
            bottom:1,
            borders:{
                left:"transparent",
                top:"transparent",
                right:"#ECEAE6",
                bottom:"#ECEAE6"
            }
        }
    ],
    pressedCaptionOffset: { x:1, y:1 }
};
//#endregion Button
//#region SpeedButton
Core.themes.classic10k.SpeedButton = {
    shapes:[
        { 
            type:"rect", 
            fillStyle:{
                normal:"#D4D0C8",
                hovered:"#DBD8D1"
            }
        }
    ],
    pressedCaptionOffset: { x:1, y:1 }
};
//#endregion SpeedButton