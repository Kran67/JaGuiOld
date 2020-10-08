//#region Import
import { Tab } from '/scripts/components/containers/tab.js';
import { Layout } from '/scripts/components/containers/layout.js';
import { CustomTabControl } from '/scripts/core/customtabcontrol.js';
//#endregion Import
//#region Class TabSheet
class TabSheet extends Tab {
    //#region Private fields
    #HTMLPage = null;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region HTMLPage
    get HTMLPage() {
        return this.#HTMLPage;
    }
    set HTMLPage(newValue) {
        newValue instanceof PageContent && this.#HTMLPage !== newValue && (this.#HTMLPage = newValue);
    }
    //#endregion HTMLPage
    //#endregion Getters / Setters
    //#region Methods
    //#region show
    show() {
        if (this.enabled) {
            super.show();
            this.#HTMLPage.visible = !0;
        }
    }
    //#endregion show
    //#region hide
    hide() {
        super.hide();
        this.#HTMLPage.visible = !1;
    }
    //#endregion hide
    //#region loaded
    loaded() {
        super.loaded();
        this.display = core.types.CSSVALUES.INLINEBLOCK;
    }
    //#endregion
    //#endregion Methods
}
Object.seal(TabSheet);
core.classes.register(core.types.CATEGORIES.INTERNAL, TabSheet);
//#endregion TabSheet
//#region Class PageContent
class PageContent extends Layout {
    //#region Private fields
    #tab;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            this.#tab = props.hasOwnProperty('tab') ? this.form[props.tab] : null;
        }
    }
    //#endregion constructor
    //#endregion Getters / Setters
    get tab() {
        return this.#tab;
    }
    //#region Methods
    //#endregion Methods
}
Object.seal(PageContent);
core.classes.register(core.types.CATEGORIES.INTERNAL, PageContent);
//#endregion PageContent
//#region Class PageControl
class PageControl extends CustomTabControl {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.tabClass = TabSheet;
            super(owner, props);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#endregion Getters / Setters
    //#region Methods
    //#region deleteTab
    deleteTab(index) {
        if (index >= 0 && index <= this.tabs.length - 1) {
            const tab = this.tabs[index];
            this.tabsContent.removeChild(tab.HTMLPage);
            // supprimer les controles de la page
            super.deleteTab(index);
        }
    }
    //#endregion deleteTab
    //#region newTab
    newTab(caption) {
        //var tpl, a, div = document.createElement(core.types.HTMLELEMENTS.DIV);
        !caption && (caption = `tab${(this.tabSheets.length + 1)}`);
        const tab = core.classes.createComponent({
            class: TabSheet,
            owner: this,
            caption: caption.firstCharUpper,
            props: {
                parentHTML: this.tabSheetsContainer,
                caption: caption
            }
        });
        this.tabSheets.push(tab);
        //let tpl = core.templates['Page'];
        //a = tpl.split('{theme}');
        //tpl = a.join(this.themeName);
        //a = tpl.split('{name}');
        //tpl = a.join(tab.name);
        //div.innerHTML = tpl;
        tab.HTMLPage = tab.HTMLElement;
        this.changeActiveTab(tab);
        this.checkViewBtns();
        this.change();
    }
    //#endregion newTab
    //#region loaded
    loaded() {
        super.loaded();
        const tabsContent = this.components.find(e => e.name === 'TabContent');
        if (tabsContent) {
            tabsContent.realignChilds();
            tabsContent.components.forEach(comp => {
                if (comp.tab) {
                    comp.tab.HTMLPage = comp;
                    comp.visible = comp.tab === this.activeTab;
                }
            });
        }
    }
    //#endregion loaded
    //#endregion Methods
}
Object.seal(PageControl);
core.classes.register(core.types.CATEGORIES.CONTAINERS, PageControl);
//#endregion PageControl
//#region Template
if (core.isHTMLRenderer) {
    const PageControlTpl = ['<jagui-pagecontrol id="{internalId}" data-class="PageControl" ',
        'class="Control TabControl PageControl csr_default {theme}">',
        '<jagui-tabcontrolheader class="TabControlHeader {theme}">',
        '<jagui-tabscontainer class="TabsContainer {theme}">',
        '</jagui-tabscontainer>',
        '</jagui-tabcontrolheader>',
        '</jagui-pagecontrol>'].join(String.EMPTY);
    const PageContentTpl = '<jagui-pagecontent data-class="PageContent" class="PageContent {theme}"></jagui-pagecontent>';
    core.classes.registerTemplates([
        { Class: TabSheet, template: core.templates['Tab'] },
        { Class: PageControl, template: PageControlTpl }, { Class: "PageContent", template: PageContentTpl }
    ]);
}
//#endregion Template
export { TabSheet, PageControl, PageContent };