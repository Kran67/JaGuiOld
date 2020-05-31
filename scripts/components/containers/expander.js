//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Mouse } from '/scripts/core/mouse.js';
//#endregion Import
//#region Class Expander
class Expander extends ThemedControl {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.allowRealignChildsOnResize = !0;
            super(owner, props);
            core.private(this, {
                header: null,
                headerCaption: null,
                lastHeight: props.hasOwnProperty('height') ? props.height : 0,
                expanded: props.hasOwnProperty('expanded') ? props.expanded : !1,
                checked: props.hasOwnProperty('checked') ? props.checked : !1,
                caption: props.hasOwnProperty('caption') ? props.caption : this.name,
                viewCheck: props.hasOwnProperty('viewCheck') && core.tools.isBool(props.viewCheck)
                    ? props.viewCheck : !0
            });
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region viewCheck
    get viewCheck() {
        return core.private(this).viewCheck;
    }
    set viewCheck(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && priv.viewCheck !== newValue) {
            priv.viewCheck = newValue;
            this.update();
        }
    }
    //#endregion viewCheck
    //#region caption
    get caption() {
        return core.private(this).caption;
    }
    set caption(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isString(newValue) && priv.caption !== newValue) {
            priv.caption = newValue;
            this.update();
        }
    }
    //#endregion caption
    //#region expanded
    get expanded() {
        return core.private(this).expanded;
    }
    set expanded(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && priv.expanded !== newValue) {
            priv.expanded = newValue;
            this.update();
        }
    }
    //#endregion expanded
    //#region viewCheck
    get viewCheck() {
        return core.private(this).viewCheck;
    }
    set viewCheck(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && priv.viewCheck !== newValue) {
            priv.viewCheck = newValue;
            this.update();
        }
    }
    //#endregion viewCheck
    //#region checked
    get checked() {
        return core.private(this).checked;
    }
    set checked(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && priv.checked !== newValue) {
            priv.checked = newValue;
            this.update();
        }
    }
    //#endregion checked
    //#endregion Getters / Setters
    //#region Methods
    //#region expendCollapse
    expandCollapse() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.expanded = !priv.expanded;
        this.update();
    }
    //#endregion expendCollapse
    //#region update
    update() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        const htmlElementStyle = this.HTMLElementStyle;
        //const bHTMLElement = priv.button.HTMLElement;
        const PX = core.types.CSSUNITS.PX;
        //#endregion Variables déclaration
        htmlElement.classList.remove('expanded');
        htmlElement.classList.remove('viewCheck');
        htmlElement.classList.remove('checked');
        if (priv.expanded) {
            htmlElementStyle.height = `${priv.lastHeight}${PX}`;
            htmlElement.classList.add('expanded');
        } else {
            htmlElement.offsetHeight > priv.headerHeight
                && (htmlElementStyle.height = `${priv.headerHeight + 2}${PX}`);
        }
        if (priv.viewCheck) {
            htmlElement.classList.add('viewCheck');
            priv.checked && htmlElement.classList.add('checked');
        }
        htmlElement.dataset.caption = priv.caption;
        this.components.forEach(comp => {
            comp.enabled = priv.checked;
        });
    }
    //#endregion update
    //#region check
    check() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.checked = !priv.checked;
        this.update();
    }
    //#endregion check
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.container.destroy();
        super.destroy();
    }
    //#endregion destroy
    //#region getTabOrderList
    getTabOrderList(list, children) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        const tabList = priv.container.tabList;
        children && (children = !0);
        if (list && tabList) {
            tabList.forEach(tab => {
                list.push(tab);
                children && tab.getTabOrderList(list, children);
            });
        }
    }
    //#endregion getTabOrderList
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
        const htmlElement = this.HTMLElement;
        const cStyle = getComputedStyle(htmlElement);
        //#endregion Variables déclaration
        super.loaded();
        priv.headerHeight = parseFloat(cStyle.getPropertyValue(`--${this.themeName}-header-height`));
        priv.arrowPos = new core.classes.Point(parseFloat(cStyle.getPropertyValue(`--${this.themeName}-arrow-left`)),
            parseFloat(cStyle.getPropertyValue(`--${this.themeName}-arrow-top`)));
        priv.arrowSize = new core.classes.Point(parseFloat(cStyle.getPropertyValue(`--${this.themeName}-arrow-width`)),
            parseFloat(cStyle.getPropertyValue(`--${this.themeName}-arrow-height`)));
        priv.checkPos = {
            left: parseFloat(cStyle.getPropertyValue(`--${this.themeName}-check-left`)),
            width: parseFloat(cStyle.getPropertyValue(`--${this.themeName}-check-width`))
        };
        this.update();
    }
    //#endregion loaded
    //#region loaded
    mouseDown() {
        //#region Variables déclaration
        const priv = core.private(this);
        const target = core.mouse.target;
        //#endregion Variables déclaration
        if (this.enabled) {
            super.mouseDown();
            if (core.mouse.button === Mouse.MOUSEBUTTONS.LEFT && target.y < priv.headerHeight) {
                target.x >= priv.checkPos.left && target.x <= priv.checkPos.left + priv.checkPos.width
                    && priv.viewCheck ? this.check() : this.expandCollapse();
            }
        }
    }
    //#endregion loaded
    //#endregion Methods
}
core.classes.register(core.types.CATEGORIES.CONTAINERS, Expander);
//#endregion Expander
//#region Template
if (core.isHTMLRenderer) {
    const ExpanderTpl = ['<jagui-expander id="{internalId}" data-class="Expander" class="Control Expander {theme}">',
        '<properties>{ "name": "{name}", "width": 130, "height": 100 }</properties></jagui-expander>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: Expander, template: ExpanderTpl }]);
}
//#endregion
export { Expander };