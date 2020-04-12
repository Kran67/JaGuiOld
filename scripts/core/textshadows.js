//#region Import
import { Tools } from '/scripts/core/tools.js';
import { Color, Colors } from '/scripts/core/color.js';
import { Point } from '/scripts/core/geometry.js';
//#endregion Import
//#region TextShadowsItem
class TextShadowsItem {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        this.offset = new Point(props.offset.x ? props.offset.x : 0, props.offset.y ? props.offset.y : 0);
        this.color = owner.color;
        if (props.color) {
            if (Tools.isString(props.color)) {
                this.color = Color.parse(props.color);
            }
        }
        this.blur = props.blur ? props.blur : 0;
    }
    //#endregion Constructor
    //#region Methods
    //#region toCss
    toCss() {
        const PX = Types.CSSUNITS.PX;
        return `${this.offset.x}${PX} ${this.offset.y}${PX} ${this.blur}${PX} ${(this.color ? this.color : Colors.BLACK).toRGBAString()}`;
    }
    //#endregion toCss
    //#region destroy
    destroy() {
        this.offset.destroy();
        this.offset = null;
        delete this.offset;
        this.color.destroy();
        this.color = null;
        delete this.color;
        this.blur = null;
        delete this.blur;
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
//#endregion TextShadowsItem
//#region TextShadows
class TextShadows {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            Core.classes.newCollection(this, this, TextShadowsItem);
            if (props.textShadows) {
                props.textShadows.forEach(item => {
                    this.items.push(new TextShadowsItem(owner, item));
                });
            }
        }
    }
    //#endregion Constructor
    //#region Methods
    //#region destroy
    destroy() {
        this.items.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
//#region TextShadows defineProperties
Object.defineProperties(TextShadows, {
    'items': {
        enumerable: !0
    }
});
//#endregion TextShadows defineProperties
//#endregion TextShadows
Object.seal(TextShadows);
export { TextShadows };