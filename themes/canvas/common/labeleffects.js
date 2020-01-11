//#region Imports
import { CANVAS } from "../../../scripts/core/canvas.js";
import { Convert } from "../../../scripts/core/convert.js";
//#endregion Imports
//#region LabelNeonEffect
Core.themes.LabelNeonEffect = {
    //#region render
    render: function (obj, caption, offsetX, offsetY) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        const neoncolor = obj.effect.color.toRGBAString();
        const shadows = [{x:-2.13, y:-2.13, blur:10, color:"#fff" },
            {x:2.13, y:2.13, blur:10, color: "#fff" },
            {x:0, y:0, blur:21, color:neoncolor },
            {x:0, y:0, blur:42, color:neoncolor },
            {x:0, y:0, blur:64, color:neoncolor },
            {x:0, y:0, blur:85, color:neoncolor },
            {x:0, y:0, blur:106, color:neoncolor }];
        const a = shadows.reverse();
        //#endregion Variables déclaration
        ctx.save();
        if (~~obj.effect.currentTick >= 0 && ~~obj.effect.currentTick <= 285 || 
            ~~obj.effect.currentTick >= 315 && ~~obj.effect.currentTick <= 345 ||
            ~~obj.effect.currentTick >= 375 && ~~obj.effect.currentTick <= 810 ||
            ~~obj.effect.currentTick >= 840 && ~~obj.effect.currentTick <= 1500) {
            a.forEach(shadow => {
                ctx.shadowOffsetX = shadow.x;
                ctx.shadowOffsetY = shadow.y;
                ctx.shadowColor = ctx.fillStyle = shadow.color;
                ctx.shadowBlur = shadow.blur;
                ctx.fillText(caption,  0, 0);
            });
        }
        ctx.restore();
    }
    //#endregion render
};
//#endregion LabelNeonEffect
//#region LabelOutlinedEffect
Core.themes.LabelOutlinedEffect = {
    //#region render
    render: function (obj) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        //#endregion Variables déclaration
        ctx.lineWidth = 5;
        ctx.strokeStyle = obj.effect.color.toRGBAString();
    }
    //#endregion render
};
//#endregion LabelOutlinedEffect
//#region LabelEngravedEffect
Core.themes.LabelEngravedEffect = {
    //#region render
    render: function (obj, caption, offsetX, offsetY) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        const c = document.createElement("canvas").getContext("2d");
        //#endregion Variables déclaration
        c.canvas.width = obj.width;
        c.canvas.height = obj.height;
        c.font = ctx.font;
        c.translate(offsetX, offsetY);
        // draw highLight
        c.fillStyle = c.shadowColor = "rgba(255,255,2555,0.75)";
        c.shadowOffsetX = 0;
        c.shadowOffsetY = 2;
        c.fillText(caption,  0, 0);
        // draw dark shadow
        c.shadowBlur = 2; // shadow
        c.fillStyle = c.shadowColor = "rgba(0,0,0,0.75)";
        c.shadowOffsetX = 0;
        c.shadowOffsetY = -2;
        c.fillText(caption, 0, 0);
        c.clearShadow();
        c.fillStyle = "black";
        c.globalCompositeOperation = CANVAS.GLOBALCOMPOSITEOPERATIONS.DESTINATIONOUT;
        c.fillStyle = "red";
        c.fillText(caption, 0, 0);
        ctx.drawImage(c.canvas, -offsetX, -offsetY);
    }
    //#endregion render
};
//#endregion LabelEngravedEffect
//#region LabelEmbossedEffect
Core.themes.LabelEmbossedEffect = {
    //#region render
    render: function (obj, caption, offsetX, offsetY) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        const c = document.createElement("canvas").getContext("2d");
        const offsets = [{ x:2, y:2}, { x:0, y:2}, { x:2, y:0}];
        //#endregion Variables déclaration
        c.canvas.width = obj.width;
        c.canvas.height = obj.height;
        c.font = ctx.font;
        c.translate(offsetX, offsetY);
        c.shadowBlur = 2; // shadow
        // draw dark shadow
        c.fillStyle = c.shadowColor = "#000";
        offsets.forEach(offset => {
            c.shadowOffsetX = offset.x;
            c.shadowOffsetY = offset.y;
            c.fillText(caption,  0, 0);
        });
        // draw highLight
        c.fillStyle = c.shadowColor = "#999";
        offsets.forEach(offset => {
            c.shadowOffsetX = -offset.x;
            c.shadowOffsetY = -offset.y;
            c.fillText(caption,  0, 0);
        });
        c.clearShadow();
        c.fillStyle = "black";
        c.globalCompositeOperation = CANVAS.GLOBALCOMPOSITEOPERATIONS.DESTINATIONOUT;
        c.fillStyle = "red";
        c.fillText(caption, 0, 0);
        ctx.drawImage(c.canvas, -offsetX, -offsetY);
    }
    //#endregion render
};
//#endregion LabelEmbossedEffect
//#region LabelRainbowsEffect
Core.themes.LabelRainbowsEffect = {
    //#region render
    render: function (obj, caption, offsetX, offsetY) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        const shadows = [{ x:-0.2, y:0.2, color: "hsla(7.2, 60%, 45%, 1)" },
            { x:-0.4, y:0.4, color: "hsla(14.4, 60%, 45%, 1) "},
            { x:-0.6, y:0.6, color: "hsla(21.6, 60%, 45%, 1) "},
            { x:-0.8, y:0.8, color: "hsla(28.8, 60%, 45%, 1) "},
            { x:-1, y:1, color: "hsla(36, 60%, 45%, 1) "},
            { x:-1.2, y:1.2, color: "hsla(43.2, 60%, 45%, 1) "},
            { x:-1.4, y:1.4, color: "hsla(50.4, 60%, 45%, 1) "},
            { x:-1.6, y:1.6, color: "hsla(57.6, 60%, 45%, 1) "},
            { x:-1.8, y:1.8, color: "hsla(64.8, 60%, 45%, 1) "},
            { x:-2, y:2, color: "hsla(72, 60%, 45%, 1) "},
            { x:-2.2, y:2.2, color: "hsla(79.2, 60%, 45%, 1) "},
            { x:-2.4, y:2.4, color: "hsla(86.4, 60%, 45%, 1) "},
            { x:-2.6, y:2.6, color: "hsla(93.6, 60%, 45%, 1) "},
            { x:-2.8, y:2.8, color: "hsla(100.8, 60%, 45%, 1) "},
            { x:-3, y:3, color: "hsla(108, 60%, 45%, 1) "},
            { x:-3.2, y:3.2, color: "hsla(115.2, 60%, 45%, 1) "},
            { x:-3.4, y:3.4, color: "hsla(122.4, 60%, 45%, 1) "},
            { x:-3.6, y:3.6, color: "hsla(129.6, 60%, 45%, 1) "},
            { x:-3.8, y:3.8, color: "hsla(136.8, 60%, 45%, 1) "},
            { x:-4, y:4, color: "hsla(144, 60%, 45%, 1) "},
            { x:-4.2, y:4.2, color: "hsla(151.2, 60%, 45%, 1) "},
            { x:-4.4, y:4.4, color: "hsla(158.4, 60%, 45%, 1) "},
            { x:-4.6, y:4.6, color: "hsla(165.6, 60%, 45%, 1) "},
            { x:-4.8, y:4.8, color: "hsla(172.8, 60%, 45%, 1) "},
            { x:-5, y:5, color: "hsla(180, 60%, 45%, 1) "},
            { x:-5.2, y:5.2, color: "hsla(187.2, 60%, 45%, 1) "},
            { x:-5.4, y:5.4, color: "hsla(194.4, 60%, 45%, 1) "},
            { x:-5.6, y:5.6, color: "hsla(201.6, 60%, 45%, 1) "},
            { x:-5.8, y:5.8, color: "hsla(208.8, 60%, 45%, 1) "},
            { x:-6, y:6, color: "hsla(216, 60%, 45%, 1) "},
            { x:-6.2, y:6.2, color: "hsla(223.2, 60%, 45%, 1) "},
            { x:-6.4, y:6.4, color: "hsla(230.4, 60%, 45%, 1) "},
            { x:-6.6, y:6.6, color: "hsla(237.6, 60%, 45%, 1) "},
            { x:-6.8, y:6.8, color: "hsla(244.8, 60%, 45%, 1) "},
            { x:-7, y:7, color: "hsla(252, 60%, 45%, 1) "},
            { x:-7.2, y:7.2, color: "hsla(259.2, 60%, 45%, 1) "},
            { x:-7.4, y:7.4, color: "hsla(266.4, 60%, 45%, 1) "},
            { x:-7.6, y:7.6, color: "hsla(273.6, 60%, 45%, 1) "},
            { x:-7.8, y:7.8, color: "hsla(280.8, 60%, 45%, 1) "},
            { x:-8, y:8, color: "hsla(288, 60%, 45%, 1) "},
            { x:-8.2, y:8.2, color: "hsla(295.2, 60%, 45%, 1) "},
            { x:-8.4, y:8.4, color: "hsla(302.4, 60%, 45%, 1) "},
            { x:-8.6, y:8.6, color: "hsla(309.6, 60%, 45%, 1) "},
            { x:-8.8, y:8.8, color: "hsla(316.8, 60%, 45%, 1) "},
            { x:-9, y:9, color: "hsla(324, 60%, 45%, 1) "},
            { x:-9.2, y:9.2, color: "hsla(331.2, 60%, 45%, 1) "},
            { x:-9.4, y:9.4, color: "hsla(338.4, 60%, 45%, 1) "},
            { x:-9.6, y:9.6, color: "hsla(345.6, 60%, 45%, 1) "},
            { x:-9.8, y:9.8, color: "hsla(352.8, 60%, 45%, 1) "},
            { x:-10, y:10, color: "hsla(360, 60%, 45%, 1) "},
            { x:0, y:0, color: "hsla(0,0%,0%,0) "}];
        const a = shadows.reverse();
        //#endregion Variables déclaration
        ctx.save();
        a.forEach(shadow => {
            ctx.shadowOffsetX = shadow.x;
            ctx.shadowOffsetY = shadow.y;
            ctx.shadowColor = ctx.fillStyle = shadow.color;
            ctx.fillText(caption,  0, 0);
        });
        ctx.restore();
    }
    //#endregion render
};
//#endregion LabelRainbowsEffect
//#region LabelStickersEffect
Core.themes.LabelStickersEffect = {
    //#region render
    render: function (obj, caption, offsetX, offsetY) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        const shadows = [{ x:0, y: 0, color: "#FFD "},
            { x:0, y: 0, color: "#FFD "},
            { x:0, y: 0, color: "#FFD "},
            { x:0, y: 0, color: "#FFD "},
            { x:0, y: 1, color: "#FFD "},
            { x:0, y: 1, color: "#FFD "},
            { x:0, y: -1, color: "#FFD "},
            { x:0, y: -1, color: "#FFD "},
            { x:0, y: 2, color: "#FFD "},
            { x:0, y: 2, color: "#FFD "},
            { x:0, y: -2, color: "#FFD "},
            { x:0, y: -2, color: "#FFD "},
            { x:1, y:0, color: "#FFD "},
            { x:-1, y:0, color: "#FFD "},
            { x:-1, y:0, color: "#FFD "},
            { x:1, y:0, color: "#FFD "},
            { x:1, y:1, color: "#FFD "},
            { x:-1, y:1, color: "#FFD "},
            { x:-1, y:-1, color: "#FFD "},
            { x:1, y:-1, color: "#FFD "},
            { x:1, y:2, color: "#FFD "},
            { x:-1, y:2, color: "#FFD "},
            { x:-1, y:-2, color: "#FFD "},
            { x:1, y:-2, color: "#FFD "},
            { x:2, y:0, color: "#FFD "},
            { x:-2, y:0, color: "#FFD "},
            { x:-2, y:0, color: "#FFD "},
            { x:2, y:0, color: "#FFD "},
            { x:2, y:1, color: "#FFD "},
            { x:-2, y:1, color: "#FFD "},
            { x:-2, y:-1, color: "#FFD "},
            { x:2, y:-1, color: "#FFD "},
            { x:2, y:2, color: "#FFD "},
            { x:-2, y:2, color: "#FFD "},
            { x:-2, y:-2, color: "#FFD "},
            { x:2, y:-2, color: "#FFD "},
            { x:0, y: 0, color: "hsla(0,0%,0%,0) "},
            { x:-4, y:2, blur: 2, color: "#000 "}];
        const a = shadows.reverse();
        //#endregion Variables déclaration
        ctx.save();
        a.forEach(shadow => {
            ctx.shadowOffsetX = shadow.x;
            ctx.shadowOffsetY = shadow.y;
            ctx.shadowBlur = shadow.blur?shadow.blur:0;
            ctx.shadowColor = ctx.fillStyle = shadow.color;
            ctx.fillText(caption,  0, 0);
        });
        ctx.restore();
    }
    //#endregion render
};
//#endregion LabelStickersEffect
//#region LabelThicknessEffect
Core.themes.LabelThicknessEffect = {
    //#region render
    render: function (obj, caption, offsetX, offsetY) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        const shadows = [{ x:0, y:1, color: "#4a6868 "},
            { x:0, y:2, color: "#405959 "},
            { x:0, y:3, color: "#354a4a "},
            { x:0, y:0, color: "transparent "},
            { x:-4, y:4, blur:6, color: "#000 "}];
        const a = shadows.reverse();
        //#endregion Variables déclaration
        ctx.save();
        a.forEach(shadow => {
            ctx.shadowOffsetX = shadow.x;
            ctx.shadowOffsetY = shadow.y;
            ctx.shadowBlur = shadow.blur?shadow.blur:0;
            ctx.shadowColor = ctx.fillStyle = shadow.color;
            ctx.fillText(caption,  0, 0);
        });
        ctx.restore();
    }
    //#endregion render
};
//#endregion LabelThicknessEffect
//#region LabelNeonlasenterEffect
Core.themes.LabelNeonlasenterEffect = {
    //#region render
    render: function (obj, caption, offsetX, offsetY) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        const neoncolor = obj.effect.color.toRGBAString();
        const shadowcolor = obj.effect.colorShadow.toRGBAString();
        const shadows = [{x: 2, y:0, blur:5, color: neoncolor},
            { x: 2, y: 0 , blur:2, color: shadowcolor},
            { x: 2, y: 0 , blur:2, color: shadowcolor},
            { x: 2, y: 0 , blur:15, color: shadowcolor},
            { x: 2, y: 0 , blur:10, color: shadowcolor},
            { x: 2, y: 0 , blur:192, color: shadowcolor}];
        const a = shadows.reverse();
        //#endregion Variables déclaration
        if (Core.themes[obj.app.themeName].fonts[obj.fontFamily].status === "loaded") {
            ctx.save();
            a.forEach(shadow => {
                ctx.shadowOffsetX = shadow.x;
                ctx.shadowOffsetY = shadow.y;
                ctx.shadowBlur = shadow.blur?shadow.blur:0;
                ctx.shadowColor = ctx.fillStyle = shadow.color;
                ctx.fillText(caption,  0, 0);
            });
            ctx.restore();
        }
    }
    //#endregion render
};
//#endregion LabelNeonlasenterEffect
//#region LabelFireEffect
Core.themes.LabelFireEffect = {
    //#region render
    render: function (obj, caption, offsetX, offsetY) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        const a = obj.effect.shadows.reverse();
        //#endregion Variables déclaration
        ctx.save();
        a.forEach(shadow => {
            ctx.shadowOffsetX = shadow.x;
            ctx.shadowOffsetY = shadow.y;
            ctx.shadowColor = ctx.fillStyle = shadow.color;
            ctx.shadowBlur = shadow.blur;
            ctx.fillText(caption,  0, 0);
        });
        ctx.restore();
    }
    //#endregion render
};
//#endregion LabelFireEffect
//#region LabelText3dEffect
Core.themes.LabelText3dEffect = {
    //#region render
    render: function (obj, caption, offsetX, offsetY) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        const shadows = [
            { x:0, y: 1, blur:0, color: "#ccc"},
            { x:0, y: 2, blur:0, color: "#c9c9c9"},
            { x:0, y: 3, blur:0, color: "#bbb"},
            { x:0, y: 4, blur:0, color: "#b9b9b9"},
            { x:0, y: 5, blur:0, color: "#aaa"},
            { x:0, y: 3, blur:5, color: "rgba(0,0,0,1)"},
            { x:0, y: 5, blur:10, color: "rgba(0,0,0,1)"},
            { x:0, y: 10, blur:10, color: "rgba(0,0,0,0.5)"},
            { x:0, y: 20, blur:20, color: "rgba(0,0,0,0.15)"}
        ].reverse();
        //#endregion Variables déclaration
        ctx.save();
        shadows.forEach(shadow => {
            ctx.shadowOffsetX = shadow.x;
            ctx.shadowOffsetY = shadow.y;
            ctx.shadowColor = ctx.fillStyle = shadow.color;
            ctx.shadowBlur = shadow.blur;
            ctx.fillText(caption,  0, 0);
        });
        ctx.restore();
    }
    //#endregion render
};
//#endregion LabelText3dEffect
//#region LabelPrettyshadowEffect
Core.themes.LabelPrettyshadowEffect = {
    //#region render
    render: function (obj, caption, offsetX, offsetY) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        const color = obj.effect.color.toRGBAString();
        const color1 = obj.effect.color1.toRGBAString();
        const shadows = [
            { x:2, y:2, color:color1},
            { x:1, y:1, color:color}
        ];
        //#endregion Variables déclaration
        ctx.save();
        shadows.forEach(shadow => {
            ctx.shadowOffsetX = shadow.x;
            ctx.shadowOffsetY = shadow.y;
            ctx.shadowColor = ctx.fillStyle = shadow.color;
            ctx.fillText(caption,  0, 0);
        });
        ctx.restore();
    }
    //#endregion render
};
//#endregion LabelPrettyshadowEffect
//#region LabelGradientEffect
Core.themes.LabelGradientEffect = {
    //#region render
    render: function (obj, caption, offsetX, offsetY) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        const angle = (obj.effect.orientation - 90) / 180 * Math.PI;

        // calculate gradient line based on angle
        const x2 = Math.cos(angle) * obj.width;
        const y2 = Math.sin(angle) * obj.height;
        const gradient = ctx.createLinearGradient(0,0,x2,y2);
        //#endregion Variables déclaration
        obj.effect.gradient.forEach(grad => {
            gradient.addColorStop(grad.offset / 100, grad.color.toRGBAString());
        });
        ctx.fillStyle = gradient;
    }
    //#endregion render
};
//#endregion LabelGradientEffect
//#region LabelReflectEffect
Core.themes.LabelReflectEffect = {
    //#region render
    render: function (obj, caption, offsetX, offsetY, textM) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        const gradient = ctx.createLinearGradient(0,0,0,textM.actualBoundingBoxAscent - textM.actualBoundingBoxDescent);
        //#endregion Variables déclaration
        gradient.addColorStop(0.1, "rgba(255,0,0,0)");
        gradient.addColorStop(1, obj.effect.color.toRGBAString());
        ctx.save();
        ctx.globalCompositeOperation = "source-over";
        ctx.translate(0, textM.height)
        ctx.scale(1, -1);
        ctx.fillStyle = gradient;
        ctx.fillText(caption, 0, textM.actualBoundingBoxAscent - textM.actualBoundingBoxDescent);
        ctx.restore();
    }
    //#endregion render
};
//#endregion LabelReflectEffect
//#region LabelShineEffect
Core.themes.LabelShineEffect = {
    //#region render
    render: function (obj, caption, offsetX, offsetY) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        //#endregion Variables déclaration
        ctx.save();
        ctx.restore();
    }
    //#endregion render
};
//#endregion LabelShineEffect
//#region LabelCloudyEffect
Core.themes.LabelCloudyEffect = {
    //#region render
    render: function (obj, caption, offsetX, offsetY) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        const shadows = [
            { blur: 5, color: obj.effect.color.toRGBAString() },
            { blur: 15, color: obj.effect.color2.toRGBAString() },
            { blur: 25, color: obj.effect.color3.toRGBAString() },
            { blur: 90, color: obj.effect.color3.toRGBAString() }
        ].reverse();
        //#endregion Variables déclaration
        ctx.save();
        shadows.forEach(shadow => {
            ctx.shadowOffsetX = 10000;
            ctx.shadowOffsetY = 0;
            ctx.shadowBlur = shadow.blur;
            ctx.shadowColor = shadow.color;
            ctx.fillText(caption,-10000,0);
        });
        ctx.restore();
    }
    //#endregion render
};
//#endregion LabelCloudyEffect
//#region LabelBurningEffect
Core.themes.LabelBurningEffect = {
    //#region render
    render: function (obj, caption, offsetX, offsetY) {
        //#region Variables déclaration
        const ctx = Core.ctx;
        const shadows = [
            { y: -1, blur: 2, color: "#fff" },
            { y: -2, blur: 5, color: "#ff0" },
            { y: -10, blur: 10, color: "#ff8000" },
            { y: -18, blur: 20, color: "#f00" }].reverse();
        //#endregion Variables déclaration
        ctx.save();
        shadows.forEach(shadow => {
            ctx.shadowOffsetX = 10000;
            ctx.shadowOffsetY = shadow.y;
            ctx.shadowBlur = shadow.blur;
            ctx.shadowColor = shadow.color;
            ctx.fillText(caption,-10000,0);
        });
        ctx.restore();
    }
    //#endregion render
};
//#endregion LabelBurningEffect