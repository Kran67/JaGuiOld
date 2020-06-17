﻿//#region Import
import { Colors, Color } from '/scripts/core/color.js';
import { GradientPoint } from '/scripts/core/gradient.js';
//#endregion Import
//#region LabelEffects
//#region LabelEffect
class LabelEffect {
    //#region Constructor
    constructor(owner, name) {
        this.owner = owner;
        this.cssName = name;
        this.name = String.uniqueId();
        this.drawBefore = !0;
    }
    //#endregion Constructor
    //#region Methods
    //#region prepare
    prepare() { }
    //#endregion prepare
    //#region update
    update() { }
    //#endregion update
    //#region destroy
    destroy() {
        this.cssName = null;
        this.owner = null;
        delete this.cssName;
        delete this.owner;
    }
    //#endregion destroy
    //#endregion Methods
}
//#endregion LabelEffect
//#region LabelNeonEffect
class LabelNeonEffect extends LabelEffect {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        super(owner, 'neon');
        this.currentTick = 0;
        this.color = Color.parse('#f40');
        if (props.hasOwnProperty('color') && core.tools.isString(props.color)) {
            this.color = Color.parse(props.color);
            this.color.owner = this;
        }
        core.isHTMLRenderer ? this.updateCss() : core.looper.addListener(this);
    }
    //#endregion Constructor
    //#region Methods
    //#region processTick
    processTick(elapsedTime) {
        this.currentTick += elapsedTime;
        this.currentTick > 1500 && (this.currentTick = 0);
        !core.isHTMLRenderer && (core.canvas.needRedraw = !0);
    }
    //#endregion processTick
    //#region update
    updateCss() {
        //#region Variables déclaration
        const root = document.documentElement;
        //#endregion Variables déclaration
        root.style.setProperty('--neon-text-color', this.color.toRGBAString());
    }
    //#endregion update
    //#region destroy
    destroy() {
        this.color.destroy();
        this.color = null;
        this.currentTick = null;
        delete this.color;
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, LabelNeonEffect);
//#endregion LabelNeonEffect
//#region LabelOutlinedEffect
class LabelOutlinedEffect extends LabelEffect {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        super(owner, 'outlined');
        this.color = Colors.BLACK;
        if (props.hasOwnProperty('color') && core.tools.isString(props.color)) {
            this.color = Color.parse(props.color);
            this.color.owner = this;
        }
        core.isHTMLRenderer && this.updateCss();
    }
    //#endregion Constructor
    //#region Methods
    //#region update
    updateCss() {
        //#region Variables déclaration
        const root = document.documentElement;
        //#endregion Variables déclaration
        !this.color.equals(Colors.BLACK) && root.style.setProperty('--outlined-color', this.color.toRGBAString());
    }
    //#endregion update
    //#region destroy
    destroy() {
        this.color.destroy();
        this.color = null;
        delete this.color;
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, LabelOutlinedEffect);
//#endregion LabelOutlinedEffect
//#region LabelEngravedEffect
class LabelEngravedEffect extends LabelEffect {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        super(owner, 'engraved');
    }
    //#endregion Constructor
    //#region Methods
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, LabelEngravedEffect);
//#endregion LabelEngravedEffect
//#region LabelEmbossedEffect
class LabelEmbossedEffect extends LabelEffect {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        super(owner, 'embossed');
    }
    //#endregion Constructor
    //#region Methods
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, LabelEmbossedEffect);
//#endregion LabelEmbossedEffect
//#region LabelRainbowEffect
class LabelRainbowEffect extends LabelEffect {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        super(owner, 'rainbow');
    }
    //#endregion Constructor
    //#region Methods
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, LabelRainbowEffect);
//#endregion LabelRainbowEffect
//#region LabelStickersEffect
class LabelStickersEffect extends LabelEffect {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        super(owner, 'stickers');
    }
    //#endregion Constructor
    //#region Methods
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, LabelStickersEffect);
//#endregion LabelStickersEffect
//#region LabelThicknessEffect
class LabelThicknessEffect extends LabelEffect {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        super(owner, 'thickness');
    }
    //#endregion Constructor
    //#region Methods
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, LabelThicknessEffect);
//#endregion LabelThicknessEffect
//#region LabelNeonlasenterEffect
class LabelNeonlasenterEffect extends LabelEffect {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        super(owner, 'neonlasenter');
        this.color = Color.parse('#28D7FE');
        if (props.hasOwnProperty('color') && core.tools.isString(props.color)) {
            this.color = Color.parse(props.color);
            this.color.owner = this;
        }
        this.colorShadow = Color.parse('#1041FF');
        if (props.colorShadow && core.tools.isString(colorShadow)) {
            this.colorShadow = Color.parse(props.colorShadow);
            this.colorShadow.owner = this;
        }
        core.isHTMLRenderer
            ? this.updateCss()
            : core.loadFonts('../../../fonts', [
                {
                    alias: 'lasenter',
                    file: 'lasenter.ttf'
                }
            ], core.themes[this.owner.app.themeName]);
    }
    //#endregion Constructor
    //#region Methods
    //#region prepare
    prepare() {
        super.prepare();
        this.owner.fontFamily = 'lasenter';
        this.owner.color ? this.owner.color.assign(this.color) : this.owner.color = this.color;
    }
    //#endregion prepare
    //#region update
    updateCss() {
        //#region Variables déclaration
        const root = document.documentElement;
        const htmlElementStyle = this.owner.HTMLElementStyle;
        //#endregion Variables déclaration
        this.prepare();
        root.style.setProperty('--neonlasenter-color1', this.color.toRGBAString());
        root.style.setProperty('--neonlasenter-color2', this.colorShadow.toRGBAString());
        if (core.isHTMLRenderer && htmlElementStyle) {
            htmlElementStyle.color = this.color.toRGBAString();
            htmlElementStyle.fontFamily = this.owner.fontFamily;
        }
    }
    //#endregion update
    //#region destroy
    destroy() {
        this.color.destroy();
        this.color = null;
        this.colorShadow.destroy();
        this.colorShadow = null;
        delete this.color;
        delete this.colorShadow;
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, LabelNeonlasenterEffect);
//#endregion LabelNeonlasenterEffect
//#region LabelFireEffect
class LabelFireEffect extends LabelEffect {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        super(owner, 'fire');
        this.fireDelta = [];
        this.currentTick = 0;
        this.step = 0;
        this.textBrightness = 50;
        this.shadows = [];
        for (let i = 0; i < 6; i++) {
            this.fireDelta[i] = Math.random() * 2 - 1;
        }
        core.looper.addListener(this, 'updateFire');
    }
    //#endregion Constructor
    //#region Methods
    //#region updateFire
    updateFire(elapsedTime) {
        //#region Variables déclaration
        const fireCount = 6;
        const htmlElementStyle = this.owner.HTMLElementStyle;
        const PX = core.types.CSSUNITS.PX;
        const fireDelta = this.fireDelta;
        const step = this.step;
        //#endregion Variables déclaration
        this.currentTick += elapsedTime;
        this.shadows.clear();
        fireDelta[fireCount - step] = Math.random() * 2 - 1;
        for (let i = 0; i < fireCount; i++) {
            const x = Math.round(fireDelta[(i + fireCount - step) % fireCount] * i);
            const y = -2 * i - 1;
            const blur = 2 + i;
            const color = `rgb(255, ${(255 - i * Math.floor(255 / (fireCount - 1)))}, 0)`;
            this.shadows.push(core.isHTMLRenderer
                ? `${x}${PX} ${y}${PX} ${blur}${PX} ${color}`
                : { x: x, y: y, blur: blur, color: color }
            );
        }
        if (core.isHTMLRenderer) {
            htmlElementStyle && (htmlElementStyle.textShadow = this.shadows.join(','));
        } else {
            if (this.currentTick > 64) {
                this.currentTick = 0;
                core.canvas.needRedraw = !0;
            }
        }
        this.step = (step + 1) % fireCount;
    }
    //#endregion updateFire
    //#region destroy
    destroy() {
        core.looper.removeListener(this, 'updateFire');
        this.fireDelta.clear();
        this.currentTick = null;
        this.step = null;
        this.textBrightness = null;
        this.shadows.clear();
        this.currentTick = null;
        this.shadows = null;
        this.fireDelta = null;
        delete this.shadows;
        delete this.fireDelta;
        delete this.textBrightness;
        delete this.step;
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, LabelFireEffect);
//#endregion LabelFireEffect
//#region LabelText3dEffect
class LabelText3dEffect extends LabelEffect {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        super(owner, 'text3d');
    }
    //#endregion Constructor
    //#region Methods
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, LabelText3dEffect);
//#endregion LabelText3dEffect
//#region LabelPrettyshadowEffect
class LabelPrettyshadowEffect extends LabelEffect {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        super(owner, 'prettyshadow');
        this.color = Color.parse('#2196f3');
        if (props.hasOwnProperty('color') && core.tools.isString(props.color)) {
            this.color = Color.parse(props.color);
            this.color.owner = this;
        }
        this.color1 = Color.parse('#0d47a1');
        if (props.hasOwnProperty('color1') && core.tools.isString(props.colorShadow)) {
            this.color1 = Color.parse(props.color1);
            this.color1.owner = this;
        }
        core.isHTMLRenderer && this.updateCss();
    }
    //#endregion Constructor
    //#region Methods
    //#region update
    updateCss() {
        //#region Variables déclaration
        const root = document.documentElement;
        //#endregion Variables déclaration
        root.style.setProperty('--prettyshadow-color1', this.color.toRGBAString());
        root.style.setProperty('--prettyshadow-color2', this.color1.toRGBAString());
    }
    //#endregion update
    //#region destroy
    destroy() {
        this.color.destroy();
        this.color = null;
        this.color1.destroy();
        this.color1 = null;
        delete this.color;
        delete this.color1;
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, LabelPrettyshadowEffect);
//#endregion LabelPrettyshadowEffect
//#region LabelGradientEffect
class LabelGradientEffect extends LabelEffect {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        super(owner, 'gradient');
        this.gradient = [new GradientPoint(0, Colors.WHITE), new GradientPoint(100, Colors.BLACK)];
        if (props.gradient) {
            this.gradient.clear();
            props.gradient.forEach(grad => {
                this.gradient.push(new GradientPoint(grad.offset, Color.parse(grad.color)));
            });
        }
        this.orientation = 90;
    }
    //#endregion Constructor
    //#region Methods
    //#region prepare
    prepare() {
        super.prepare();
        this.owner.color = Colors.TRANSPARENT;
    }
    //#endregion prepare
    //#region update
    update() {
        //#region Variables déclaration
        const htmlElementStyle = this.owner.HTMLElementStyle;
        const s = [];
        //#endregion Variables déclaration
        this.prepare();
        if (htmlElementStyle && core.isHTMLRenderer) {
            this.gradient.forEach(grad => {
                s.length > 0 && s.push(',');
                s.push(`${grad.color.toRGBAString()} ${grad.offset}%`);
            });
            htmlElementStyle.backgroundImage = `linear-gradient(${this.orientation}deg, ${s.join(String.EMPTY)})`;
            htmlElementStyle.color = this.owner.color.toRGBAString();
        }
    }
    //#endregion update
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, LabelGradientEffect);
//#endregion LabelGradientEffect
//#region LabelReflectedEffect
class LabelReflectedEffect extends LabelEffect {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        super(owner, 'reflected');
        this.color = owner.color || Color.parse(getComputedStyle(this.owner.htmlElement).color);
        if (props.hasOwnProperty('color') && core.tools.isString(props.color)) {
            this.color = Color.parse(props.color);
            this.color.owner = this;
        }
        owner.autoSize = !0;
        owner.wordWrap = !1;
        core.isHTMLRenderer && this.updateCss();
    }
    //#endregion Constructor
    //#region Methods
    //#region prepare
    prepare() {
        super.prepare();
        this.color.alpha = 0.75;
    }
    //#endregion prepare
    //#region updateCss
    updateCss() {
        //#region Variables déclaration
        const root = document.documentElement;
        //#endregion Variables déclaration
        if (!this.color.equals(Colors.TRANSPARENT)) {
            this.prepare();
            root.style.setProperty('--reflected-color', this.color.toRGBAString());
        }
    }
    //#endregion updateCss
    //#region update
    update() {
        //#region Variables déclaration
        const htmlElement = this.owner.HTMLElement;
        //#endregion Variables déclaration
        htmlElement && core.isHTMLRenderer && (htmlElement.dataset.text = this.owner.caption);
    }
    //#endregion update
    //#region destroy
    destroy() {
        this.color.destroy();
        this.color = null;
        delete this.color;
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, LabelReflectedEffect);
//#endregion LabelReflectedEffect
//#region LabelShineEffect
class LabelShineEffect extends LabelEffect {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        super(owner, 'shine');
    }
    //#endregion Constructor
    //#region Methods
    //#region update
    update() {
        //#region Variables déclaration
        const htmlElement = this.owner.HTMLElement;
        //#endregion Variables déclaration
        core.isHTMLRenderer && htmlElement && (htmlElement.dataset.text = this.owner.caption);
    }
    //#endregion update
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, LabelShineEffect);
//#endregion LabelShineEffect
//#region LabelCloudyEffect
class LabelCloudyEffect extends LabelEffect {
    //#region Constructor
    constructor(owner, props) {
        //#region Variables déclaration
        //#endregion Variables déclaration
        props = !props ? {} : props;
        super(owner, 'cloudy');
        this.color = this.owner.color ? this.owner.color.clone() : Color.parse(getComputedStyle(this.owner.HTMLElement).color);
        if (props.hasOwnProperty('color') && core.tools.isString(props.color)) {
            this.color = Color.parse(props.color);
            this.color.owner = this;
        }
        this.color2 = this.owner.color ? this.owner.color.clone() : Color.parse(getComputedStyle(this.owner.HTMLElement).color);
        if (props.hasOwnProperty('color2') && core.tools.isString(props.color2)) {
            this.color2 = Color.parse(props.color2);
            this.color2.owner = this;
        }
        this.color3 = this.owner.color ? this.owner.color.clone() : Color.parse(getComputedStyle(this.owner.HTMLElement).color);
        if (props.hasOwnProperty('color3') && core.tools.isString(props.color3)) {
            this.color3 = Color.parse(props.color3);
            this.color3.owner = this;
        }
        core.isHTMLRenderer && this.updateCss();
    }
    //#endregion Constructor
    //#region Methods
    //#region prepare
    prepare() {
        super.prepare();
        this.color.alpha = 0.6;
        this.color2.alpha = 0.4;
        this.color3.alpha = 0.3;
        this.owner.color ? this.owner.color.alpha = 0 : this.owner.color = Colors.TRANSPARENT;
    }
    //#endregion prepare
    //#region update
    updateCss() {
        //#region Variables déclaration
        const root = document.documentElement;
        const htmlElementStyle = this.owner.HTMLElementStyle;
        //#endregion Variables déclaration
        this.prepare();
        root.style.setProperty('--cloudy-color1', this.color.toRGBAString());
        root.style.setProperty('--cloudy-color2', this.color2.toRGBAString());
        root.style.setProperty('--cloudy-color3', this.color3.toRGBAString());
        core.isHTMLRenderer && htmlElementStyle && (htmlElementStyle.color = this.owner.color.toRGBAString());
    }
    //#endregion update
    //#region destroy
    destroy() {
        this.color.destroy();
        this.color2.destroy();
        this.color3.destroy();
        this.color = null;
        this.color2 = null;
        this.color3 = null;
        delete this.color;
        delete this.color2;
        delete this.color3;
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, LabelCloudyEffect);
//#endregion LabelCloudyEffect
//#region LabelBurningEffect
class LabelBurningEffect extends LabelEffect {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        super(owner, 'burning');
    }
    //#endregion Constructor
    //#region Methods
    //#region update
    update() {
        //#region Variables déclaration
        const htmlElement = this.owner.HTMLElement;
        //#endregion Variables déclaration
        core.isHTMLRenderer && htmlElement && (htmlElement.dataset.text = this.owner.caption);
    }
    //#endregion update
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.INTERNAL, LabelBurningEffect);
//#endregion LabelBurningEffect
//#endregion LabelEffects
export { LabelEffect, LabelNeonEffect, LabelOutlinedEffect, LabelEngravedEffect, LabelEmbossedEffect, LabelRainbowEffect, LabelStickersEffect };
export { LabelThicknessEffect, LabelNeonlasenterEffect, LabelFireEffect, LabelText3dEffect, LabelBurningEffect };
export { LabelPrettyshadowEffect, LabelGradientEffect, LabelReflectedEffect, LabelShineEffect, LabelCloudyEffect };
core.locales.addLocaleKeyValues(core.types.LANGUAGES.FR_FR, 'labelEffects', {
    'Neon': 'Néon',
    'Outlined': 'Contour',
    'Engraved': 'Gravé',
    'Embossed': 'Relief',
    'Rainbow': 'Arc en ciel',
    'Stickers': 'Autocollant',
    'Thickness': 'Épaisseur',
    'Neonlasenter': 'Néon laser',
    'Fire': 'Feu',
    'Text3d': 'Texte 3D',
    'Prettyshadow': 'Jolie ombre',
    'Gradient': 'Dégradé',
    'Reflected': 'Réfléchi',
    'Shine': 'Éclat',
    'Cloudy': 'Nuageux',
    'Burning': 'Brûlant'
});
core.locales.addLocaleKeyValues(core.types.LANGUAGES.EN_US, 'labelEffects', {
    'Neon': 'Neon',
    'Outlined': 'Outlined',
    'Engraved': 'Engraved',
    'Embossed': 'Embossed',
    'Rainbow': 'Rainbow',
    'Stickers': 'Stickers',
    'Thickness': 'Thickness',
    'Neonlasenter': 'Neon laser',
    'Fire': 'Fire',
    'Text3d': '3DText',
    'Prettyshadow': 'Pretty shadow',
    'Gradient': 'Gradient',
    'Reflected': 'Reflected',
    'Shine': 'Shine',
    'Cloudy': 'Cloudy',
    'Burning': 'Burning'
});