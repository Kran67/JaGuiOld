//#region Import
import { Tab } from '/scripts/components/containers/tab.js';
import { Layout } from '/scripts/components/containers/layout.js';
//#endregion Import
//#region TabSheet
const TabSheet = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class TabSheet
    class TabSheet extends Tab {
        //#region constructor
        constructor(owner, props) {
            //#region Variables déclaration
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.HTMLPage = null;
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region HTMLPage
        get HTMLPage() {
            return internal(this).HTMLPage;
        }
        set HTMLPage(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof HTMLElement) {
                if (priv.HTMLPage !== newValue) {
                    priv.HTMLPage = newValue;
                }
            }
        }
        //#endregion HTMLPage
        //#endregion Getters / Setters
        //#region Methods
        //#region show
        show() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (this.enabled) {
                super.show();
                priv.HTMLPage.classList.remove('noDisplay');
            }
        }
        //#endregion show
        //#region hide
        hide() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            super.hide();
            priv.HTMLPage.classList.add('noDisplay');
        }
        //#endregion hide
        //#region loaded
        loaded() {
            super.loaded();
            this.display = Types.CSSVALUES.INLINEBLOCK;
        }
        //#endregion
        //#region destroy
        destroy() {
            super.destroy();
            priv.HTMLPage = null;
        }
        //#endregion destroy
        //#endregion Methods
    }
    return TabSheet;
    //#endregion TabSheet
})();
Object.seal(TabSheet);
Core.classes.register(Types.CATEGORIES.INTERNAL, TabSheet);
//#endregion TabSheet
//#region Pagecontent
const Pagecontent = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class PageContent
    class PageContent extends Layout {
        //#region constructor
        constructor(owner, props) {
            //#region Variables déclaration
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.tab = props.hasOwnProperty('tab')?this.form[props.tab]:null;
            }
        }
        //#endregion constructor
        //#endregion Getters / Setters
        //#region Methods
        //#endregion Methods
    }
    return PageContent;
    //#endregion PageContent
})();
Object.seal(PageContent);
Core.classes.register(Types.CATEGORIES.INTERNAL, PageContent);
//#endregion PageContent

//#endregion Pagecontent
//#region Import
import { CustomTabControl } from '/scripts/core/customtabcontrol.js';
//#endregion Import
//#region PageControl
const PageControl = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region Class PageControl
    class PageControl extends CustomTabControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                props.tabClass = TabSheet;
                super(owner, props);
                const priv = internal(this);
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#endregion Getters / Setters
        //#region Methods
        deleteTab(index) {
            if (index >= 0 && index <= this.tabs.length - 1) {
                const tab = this.tabs[index];
                this.tabContent.removeChild(tab.HTMLPage);
                // supprimer les controles de la page
                super.deleteTab(index);
            }
        }
        newTab(caption) {
            //var tpl, a, div = document.createElement(Types.HTMLELEMENTS.DIV);
            if (!caption) {
                caption = `tab${(this.tabSheets.length + 1)}`;
            }
            const tab = Core.classes.createComponent({
                class: TabSheet,
                owner: this,
                caption: caption.firstCharUpper,
                props: {
                    parentHTML: this.tabSheetsContainer,
                    caption: caption
                },
                withTpl: true
            });
            this.tabSheets.push(tab);
            //let tpl = Core.templates['Page'];
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
        loaded() {
            super.loaded();
            const tabsContent = this.components.find(e => e.name === 'TabContent');
            if (tabsContent) {
                tabsContent.components.forEach(comp => {

                });
            }
        }
        //#endregion Methods
    }
    return PageControl;
    //#endregion PageControl
})();
//#endregion PageControl
Object.seal(PageControl);
Core.classes.register(Types.CATEGORIES.CONTAINERS, PageControl);
//#region Template
if (Core.isHTMLRenderer) {
    const PageControlTpl = ['<jagui-pagecontrol id="{internalId}" data-class="PageControl" data-name="{name}" ',
        'class="Control TabControl PageControl csr_default {theme}"></jagui-pagecontrol>'].join(String.EMPTY);
    const PageContentTpl = "<jagui-page class='Control PageContent {theme}' data-tab='{name}'></jagui-page>";
    Core.classes.registerTemplates([
        { Class: TabSheet, template: Core.templates['Tab'] },
        { Class: PageControl, template: PageControlTpl }, { Class: "PageContent", template: PageContentTpl }
    ]);
}
//#endregion
export { TabSheet, PageControl };

/*(function () {
    //#region PageControl
    var PageControl = $j.classes.CustomTabControl.extend("PageControl", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._tabClass = $j.classes.TabSheet;
                //#endregion
            }
        },
        //#region Setters
        //#endregion
        //#region Methods
        deleteTab: function (index) {
            if (index < 0 || index > this._tabs.length - 1) return null;
            var tab = this._tabs[index];
            this._tabContent.removeChild(tab._HTMLPage);
            // supprimer les controles de la page
            this._inherited(index);
        },
        newTab: function (caption) {
            var tab, tpl, a, div = $j.doc.createElement($j.types.HTMLElements.DIV);
            if (!caption) caption = "tab" + (this._tabSheets.length + 1);
            tab = $j.classes.createComponent($j.classes.TabSheet, this, caption.firstCharUpper(), { "parentHTML": this._tabSheets_Container, "caption": caption }, true);
            this._tabSheets.push(tab);
            tpl = $j.templates["Page"];
            a = tpl.split("{theme}");
            tpl = a.join(this.getThemeName());
            a = tpl.split("{name}");
            tpl = a.join(tab.name);
            div.innerHTML = tpl;
            tab._HTMLPage = div.firstElementChild;
            this._tabContent._HTMLElement.appendChild(div.firstElementChild);
            this.changeActiveTab(tab);
            this.checkViewBtns();
            this.change();
        },
        insertTab:function(tab,index) {
          var tpl,a,div=$j.doc.createElement($j.types.HTMLElements.DIV);
          if (!(tab instanceof $j.classes.TabSheet)) return;
          if (typeof index===_const.NUMBER) {
            if (index<0) index=0;
            else if (index>this._tabSheets.length-1) index=this._tabSheets.length-1;
            this._tabSheets.insert(index,tab);
          } else this._tabSheets.push(tab);
          tab.owner=this;
          tab._pageControl=this;
          if (tab._HTMLPage)) {
            tpl=$j.templates["Page"];
            a=tpl.split("{theme}");
            tpl=a.join(this.getThemeName());
            a=tpl.split("{name}");
            tpl=a.join(tab.name);
            div.innerHTML=tpl;
            this._pageContent.appendChild(div.firstElementChild);
            tab._HTMLPage=this._pageContent.lastElementChild;
          } else this._pageContent.appendChild(tab._HTMLPage);
          this.checkLastVisibleTab();
          this.checkViewBtns();
        },
getChildsHTMLElement: function (id) {
    this._inherited();
    if (this._HTMLElement) {
        nodes = this._tabContent._HTMLElement.childNodes;
        for (i = 0, l = nodes.length; i < l; i++) {
            if (nodes[i].nodeType === $j.types.xmlNodeTypes.ELEMENT_NODE) {
                data = nodes[i].dataset.tab;
                if (data) {
                    tab = this.form[data];
                    if (tab) {
                        if (tab instanceof $j.classes.TabSheet) {
                            tab._HTMLPage = nodes[i];
                            tab._HTMLPage.jsObj = tab;
                            tab.getChildsHTMLElement(tab._HTMLPage, this._tabContent);
                        }
                    }
                }
            }
        }
    }
},
loaded: function () {
    var comp;
    for (var i = 0, l = this._tabContent._components.length; i < l; i++) {
        comp = this._tabContent._components[i];
        comp._tab = comp._HTMLElement.parentNode.jsObj;
    }
    this._inherited();
},
    getChildsControls:function(callback) {
      var i,l,comp,comps;
      comps=this._tabContent._components.sort(function(a,b) {
        var tabA,tabB,pageCtrl,idxA,idxB;
        tabA=a._tab;
        tabB=b._tab;
        pageCtrl=tabA._owner;
        idxA=pageCtrl._tabs.indexOf(tabA);
        idxB=pageCtrl._tabs.indexOf(b._tab);
        console.log();
        return idxA<idxB?-1:idxA>idxB?1:0;
      });
      for (i=0,l=comps.length;i<l;i++) {
        comp=comps[i];
        if (comp instanceof $j.classes.Component) {
          if (callback)) {
            if (typeof callback===_const.FUNCTION) callback(comp);
          }
          if (comp instanceof $j.classes.Control) comp.getChildsControls(callback);
        }
      }
    }
//#endregion
});
//#endregion
Object.seal(PageControl);
$j.classes.register($j.types.categories.INTERNAL, TabSheet);
$j.classes.register($j.types.categories.CONTAINERS, PageControl);
//#region Template
if ($j.isHTMLRenderer()) {
    var TabSheetTpl = "<label id='{internalId}' data-class='TabSheet' data-name='{name}' class='Control Tab TabSheet selected csr_default {theme}'>{caption}</label>",
        PageTpl = "<div class='Control PageContent {theme}' data-tab='{name}'></div>";
    $j.classes.registerTemplates([{ Class: TabSheet, template: TabSheetTpl }, { Class: PageControl, template: $j.templates["CustomTabControl"] }, { Class: "Page", template: PageTpl }]);
}
//#endregion
})();*/