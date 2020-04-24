import { ThemedControl } from '/scripts/core/themedcontrol.js';
//#region ShortCutIcon
class ShortCutIcon extends ThemedControl {
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            //#region Private
            //#endregion
            //delete this.properties.tabOrder;
        }
    }
    get template() {
        let html = super.template;
        const a = html.split('{caption}');
        html = a.join(this.name.split('_').first);
        return html;
    }
}
Object.seal(ShortCutIcon);
//#endregion
//#region Templates
const ShortCutIconTpl = ['<jagui-icon id="{internalId}"  class="Control {className} {theme}" title="{title}" name="{name}">',
            '<div class="{className}Img themes_Icon"></div>', 
            '<div class="{className}Caption">{caption}</div>', 
        '</jagui-icon>'].join(String.EMPTY);
Core.classes.register(Types.CATEGORIES.COMMON, ShortCutIcon);
Core.classes.registerTemplates([
    { Class: ShortCutIcon, template: ShortCutIconTpl }
]);
//#endregion
export { ShortCutIcon };