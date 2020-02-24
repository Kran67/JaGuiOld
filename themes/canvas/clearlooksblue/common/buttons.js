//#region Imports
import { ARITHMETICOPERATIONS as AO } from "../../../../scripts/core/types.js";
//#endregion Imports
//#region Button
Core.themes.clearlooksblue.Button = {
    clipped:false,
    shapes:[
        { 
            type:"roundRect",
            radius:2,
            fillStyle:{
                gradientDir:Types.GRADIENTDIRECTIONS.TOBOTTOM,
                normal:[{ offset:0, color:"#FEFEFE" },{ offset:0.5, color:"#FBFBFB" },{ offset:0.5, color:"#F5F5F4" },{ offset: 1, color:"#E8E7E6" }],
                hovered:[{ offset:0, color:"#F3F7FC" },{ offset:0.5, color:"#ECF1F7" },{ offset:0.5, color:"#E5EAF1" },{ offset: 1, color:"#D6DAE1" }],
                pressed:[{ offset:0, color:"#C5C2BF" },{ offset: 1, color:"#D5D4D2" }],
                focused:[{ offset:0, color:"#F3F7FC" },{ offset:0.5, color:"#ECF1F7" },{ offset:0.5, color:"#E5EAF1" },{ offset: 1, color:"#D6DAE1" }]
            }, 
            strokeStyle:{
                normal:"#918E8C",
                pressed:"#918E8C"
            }
        },{
            triggers: [
                { prop:"isFocused", op:AO.ISTRUE },
                { prop:"isMouseOver", op:AO.ISTRUE, bExp:AO.OR }
            ],
            type:"roundRect",
            radius:3,
            left:-1,
            top:-1,
            right:0,
            bottom:0,
            strokeStyle:{
                normal:"#BACCE2"
            }
        },{
            triggers: [
                { prop:"isFocused", op:AO.ISTRUE },
                { prop:"isMouseOver", op:AO.ISTRUE, bExp:AO.OR }
            ],
            type:"roundRect",
            radius:3,
            strokeStyle:{
                normal:"#5B7AA1"
            }
        }
    ],
    pressedCaptionOffset: { x:1, y:1 }
};
//#endregion Button
//#region SpeedButton
Core.themes.clearlooksblue.SpeedButton = {
    shapes:[
        { 
            type:"roundRect", 
            radius:10,
            fillStyle:{
                gradientDir:Types.GRADIENTDIRECTIONS.TOBOTTOM,
                normal:[{ offset:0, color:"#FEFEFE" },{ offset:0.5, color:"#FBFBFB" },{ offset:0.5, color:"#F5F5F4" },{ offset: 1, color:"#E8E7E6" }],
                hovered:[{ offset:0, color:"#F3F7FC" },{ offset:0.5, color:"#ECF1F7" },{ offset:0.5, color:"#E5EAF1" },{ offset: 1, color:"#D6DAE1" }],
                pressed:[{ offset:0, color:"#C5C2BF" },{ offset: 1, color:"#D5D4D2" }],
            }
        },{
            triggers: [
                { prop:"isFocused", op:AO.ISTRUE },
                { prop:"isMouseOver", op:AO.ISTRUE, bExp:AO.OR },
                { prop:"isPressed", op:AO.ISFALSE, bExp:AO.AND }
            ],
            type:"roundRect",
            radius:12,
            left:-1,
            top:-1,
            right:0,
            bottom:0,
            strokeStyle:{
                normal:"#BACCE2"
            }
        },{
            triggers: [
                { prop:"isPressed", op:AO.ISTRUE }
            ],
            type:"roundRect",
            radius:12,
            strokeStyle:{
                gradientDir:Types.GRADIENTDIRECTIONS.TOBOTTOM,
                normal:[{ offset:0, color:"#BFBCBA" },{ offset:1, color:"#9D9A97" }]
            }
        }
    ],
    pressedCaptionOffset: { x:1, y:1 }
};
//#endregion SpeedButton
//#region Button
/*Core.themes.clearlooksblue.SpeedButton.render =
Core.themes.clearlooksblue.Button.render = function (obj) {
    //#region Variables déclaration
    const ctx = Core.ctx;
    const width = obj.width;
    const height = obj.height;
    let grad = ctx.createLinearGradient(0,0,0,height);
    const themeName = obj.app.themeName;
    const buttonTheme = Core.themes[themeName][obj.constructor.name];
    const pressedHovered = obj.isPressed?"PRESSED":obj.isMouseOver||obj.isFocused?"HOVERED":String.EMPTY;
    //#endregion Variables déclaration
    ctx.save();
    if (!obj.enabled) {
        ctx.globalAlpha = 0.5;
    }
    ctx.beginPath();
    buttonTheme[`${pressedHovered}BACKCOLOR`].forEach(cs => {
        grad.addColorStop(cs.offset, cs.color);
    });
    ctx.fillStyle = grad;
    ctx.roundRect(0.5, 0.5, width-1, height-1, buttonTheme.borderRadius);
    ctx.fill();
    if (!(obj instanceof Core.classes.SpeedButton)) {
        ctx.strokeStyle = buttonTheme[`${pressedHovered}BORDERCOLOR`];
        ctx.stroke();
    }
    ctx.beginPath();
    if (obj.isPressed) {
        grad = ctx.createLinearGradient(0,0,0,height);
        buttonTheme.PRESSEDINSETBORDERCOLOR.forEach(cs => {
            grad.addColorStop(cs.offset, cs.color);
        });
        ctx.strokeStyle = grad;
        ctx.roundRect(1, 1, width-2, height-2, buttonTheme.borderRadius-1);
    } else if (obj.isFocused || obj.isMouseOver) {
        ctx.roundRect(-0.5, -0.5, width+1, height+1, buttonTheme.borderRadius+1);
        ctx.strokeStyle = buttonTheme.HOVEREDOUTSETBORDERCOLOR;
    }
    ctx.stroke();

    Core.themes.CaptionControl.render(obj);
    ctx.restore();
};
//#endregion Button*/