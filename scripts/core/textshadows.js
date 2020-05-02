//#region Import
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
        props.color && core.tools.isString(props.color) ? this.color = Color.parse(props.color) : 1;
        this.blur = props.blur ? props.blur : 0;
    }
    //#endregion Constructor
    //#region Methods
    //#region toCss
    toCss() {
        //#region Variables déclaration
        const PX = core.types.CSSUNITS.PX;
        //#endregion Variables déclaration
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
            core.classes.newCollection(this, this, TextShadowsItem);
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
        this.items = null;
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.seal(TextShadows);
//#endregion TextShadows
export { TextShadows };