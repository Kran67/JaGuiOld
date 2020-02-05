//#region Import
import { ThemedControl } from "/scripts/core/themedcontrol.js";
//#endregion Import
//#region Panel
class Panel extends ThemedControl {
    //#region Constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            this.allowRealignChildsOnResize = true;
        }
    }
    //#endregion Constructor
}
//#endregion Panel
Core.classes.register(Types.CATEGORIES.CONTAINERS, Panel);
export { Panel };


/*
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var PanelTpl = "<div id='{internalId}' data-name='{name}' data-class='Panel' class='Control Panel {theme}' style='width:181px;height:41px;'></div>";
        $j.classes.registerTemplates([{ Class: Panel, template: PanelTpl }]);
    }
    //endregion
*/