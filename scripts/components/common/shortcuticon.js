import { ThemedControl } from '/scripts/core/themedcontrol.js';
//#region ShortCutIcon
class ShortCutIcon extends ThemedControl {
    //#region Getters / Setters
    //#region template
    get template() {
        let html = super.template;
        const a = html.split('{caption}');
        html = a.join(this.name.split('_').first);
        return html;
    }
    //#endregion template
    //#region Getters / Setters
}
Object.seal(ShortCutIcon);
Core.classes.register(Types.CATEGORIES.COMMON, ShortCutIcon);
//#endregion ShortCutIcon
//#region Templates
const ShortCutIconTpl = ['<jagui-icon id="{internalId}"  class="Control {className} {theme}" title="{title}" name="{name}">',
            '<div class="{className}Img themes_Icon"></div>', 
            '<div class="{className}Caption">{caption}</div>', 
        '</jagui-icon>'].join(String.EMPTY);
Core.classes.registerTemplates([
    { Class: ShortCutIcon, template: ShortCutIconTpl }
]);
//#endregion
export { ShortCutIcon };