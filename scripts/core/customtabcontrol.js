//#region Imports
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Keyboard } from '/scripts/core/keyboard.js';
import { Tab } from '/scripts/components/containers/tab.js';
//#endregion Imports
//#region CustomTabControl constants
//#region TABSTYLES
const TABSTYLES = Object.freeze(Object.seal({
    TABS: 'tabs',
    BUTTONS: 'buttons',
    FLATBUTTONS: 'flatButtons'
}));
//#endregion TABSTYLES
//#region TABPOSITIONS
const TABPOSITIONS = Object.freeze(Object.seal({
    TOP: 'top',
    BOTTOM: 'bottom',
    LEFT: 'left',
    RIGHT: 'right'
}));
//#endregion TABPOSITIONS
//#endregion CustomTabControl constants
//#region CustomTabControl
const CustomTabControl = (() => {
    //#region Private
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        !_private.has(key) && _private.set(key, {});
        // Return private properties object
        return _private.get(key);
    };
    //#endregion Private
    //#region CustomTabControl
    class CustomTabControl extends ThemedControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                props.autoCapture = !0;
                props.canFocused = !0;
                !props.hasOwnProperty('width') && (props.width = 200);
                !props.hasOwnProperty('height') && (props.height = 200);
                super(owner, props);
                //#region Properties
                //#region Private Properties
                const priv = internal(this);
                priv.firstVisibleTab = 0;
                priv.lastVisibleTab = 0;
                priv.tabClass = props.hasOwnProperty('tabClass') ? props.tabClass : Tab;
                priv.activeTab = props.hasOwnProperty('activeTab') ? props.activeTab : null;
                priv.images = null;
                priv.canChange = !0;
                priv.showTabsCloseBtn = props.hasOwnProperty('showTabsCloseBtn') ? props.showTabsCloseBtn : !1;
                core.tools.addPropertyFromEnum({
                    component: this,
                    propName: 'tabStyle',
                    enum: TABSTYLES,
                    value: props.hasOwnProperty('tabStyle') ? props.tabStyle : TABSTYLES.TABS,
                    variable: priv
                });
                core.tools.addPropertyFromEnum({
                    component: this,
                    propName: 'tabPosition',
                    enum: TABPOSITIONS,
                    setter: this.tabPosition, // à voir
                    value: props.hasOwnProperty('tabPosition') ? props.tabPosition : TABPOSITIONS.TOP,
                    variable: priv
                });
                priv.centerTabs = props.hasOwnProperty('centerTabs') && core.tools.isBool(props.centerTabs)
                    ? props.centerTabs : !1;
                //#endregion Private Properties
                //#region Public Properties
                core.classes.newCollection(this, this, Tab, "tabs");
                //#endregion Public Properties
                //#endregion Properties
                this.createEventsAndBind(['onChange', 'canFocused'], props);
            }
        }
        //#endregion constructor
        //#region Statics
        //#region TABSTYLES
        static get TABSTYLES() {
            return TABSTYLES;
        }
        //#endregion TABSTYLES
        //#region TABPOSITIONS
        static get TABPOSITIONS() {
            return TABPOSITIONS;
        }
        //#endregion TABPOSITIONS
        //#endregion Statics
        //#region Getters / Setters
        //#region centerTabs
        get centerTabs() {
            return internal(this).centerTabs;
        }
        set centerTabs(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.tabsContainer.classList.remove('center');
            core.tools.isBool(newValue) && priv.centerTabs !== newValue && (priv.centerTabs = newValue);
            this.checkTabsPosition();
        }
        //#endregion centerTabs
        //#region tabClass
        get tabClass() {
            return internal(this).tabClass;
        }
        set tabClass(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            newValue instanceof Tab && priv.tabClass !== newValue && (priv.tabClass = newValue);
        }
        //#endregion tabClass
        //#region firstVisibleTab
        get firstVisibleTab() {
            return internal(this).firstVisibleTab;
        }
        set firstVisibleTab(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isNumber(newValue) && priv.firstVisibleTab !== newValue && (priv.firstVisibleTab = newValue);
        }
        //#endregion firstVisibleTab
        //#region lastVisibleTab
        get lastVisibleTab() {
            return internal(this).lastVisibleTab;
        }
        set lastVisibleTab(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isNumber(newValue) && priv.lastVisibleTab !== newValue && (priv.lastVisibleTab = newValue);
        }
        //#endregion lastVisibleTab
        //#region activeTab
        get activeTab() {
            return internal(this).activeTab;
        }
        set activeTab(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Tab && priv.activeTab !== newValue) {
                priv.activeTab = newValue;
                priv.activeTab.show();
            }
        }
        //#endregion activeTab
        //#region images
        get images() {
            return internal(this).images;
        }
        set images(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            newValue instanceof core.classes.ImageList && priv.images !== newValue && (priv.images = newValue);
        }
        //#endregion images
        //#region canChange
        get canChange() {
            return internal(this).canChange;
        }
        set canChange(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            core.tools.isBool(newValue) && priv.canChange !== newValue && (priv.canChange = newValue);
        }
        //#endregion canChange
        //#region showTabsCloseBtn
        get showTabsCloseBtn() {
            return internal(this).showTabsCloseBtn;
        }
        set showTabsCloseBtn(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (core.tools.isBool(newValue) && priv.showTabsCloseBtn !== newValue) {
                priv.showTabsCloseBtn = newValue;
                newValue
                    ? htmlElement.classList.add('showTabsCloseBtn')
                    : htmlElement.classList.remove('showTabsCloseBtn');
            }
        }
        //#endregion showTabsCloseBtn
        //#region activeTabIndex
        get activeTabIndex() {
            return this.tabs.indexOf(internal(this).activeTab);
        }
        set activeTabIndex(index) {
            index >= 0 && index <= this.tabs.length - 1 && this.tabs[index].show();
        }
        //#endregion activeTabIndex
        //#endregion Getters / Setters
        //#region Methods
        //#region checkTabsPosition
        checkTabsPosition() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.centerTabs && !priv.btnLeft.visible && !priv.btnRight.visible
                && priv.tabsContainer.classList.add('center');
        }
        //#endregion checkTabsPosition
        //#region tabPosition
        tabPosition(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (core.tools.valueInSet(newValue, TABPOSITIONS)) {
                if (priv.tabPosition !== newValue) {
                    priv.tabPosition = newValue;
                    priv.tabPosition === TABPOSITIONS.BOTTOM
                        ? htmlElement.classList.add(`tabs${priv.tabPosition.capitalise()}`)
                        : htmlElement.classList.remove('tabsBottom');
                }
            }
        }
        //#endregion tabPosition
        //#region changeActiveTab
        changeActiveTab(tab) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            tab !== priv.activeTab && tab.show();
            //if (this.tabsheets.indexOf(this.activeTab)<=this.firstVisibleTab) this.updateTabs(core.types.directions.LEFT);
            //if (this.tabsheets.indexOf(this.activeTab)>this.lastVisibleTab) this.updateTabs(core.types.directions.RIGHT);
        }
        //#endregion changeActiveTab
        //#region deleteTab
        deleteTab(index) {
            //#region Variables déclaration
            const priv = internal(this);
            const tabs = this.tabs;
            //#endregion Variables déclaration
            if (index >= 0 && index <= tabs.length - 1) {
                const tab = tabs[index];
                //this.tabContent.removeChild(tab._HTMLPage);
                // supprimer les controles de la page
                priv.tabContainer.removeChild(tab.HTMLElement);
                tabs.removeAt(index);
                this.checkViewBtns();
            }
        }
        //#endregion deleteTab
        //#region getTab
        getTab(index) {
            //#region Variables déclaration
            const tabs = this.tabs;
            //#endregion Variables déclaration
            if (index >= 0 || index <= tabs.length - 1) {
                return tabs[index];
            }
        }
        //#endregion getTab
        //#region newTab
        newTab(caption) {
            //#region Variables déclaration
            const priv = internal(this);
            const tabs = this.tabs;
            //#endregion Variables déclaration
            !caption && (caption = `tab${tabs.length + 1}`);
            const tab = core.classes.createComponent({
                class: core.classes.Tab,
                owner: this,
                name: caption.firstCharUpper(),
                props: {
                    parentHTML: priv.tabsContainer,
                    caption: caption
                },
                withTpl: !0
            });
            this.tabs = [...this.tabs, tab];
            this.changeActiveTab(tab);
            this.checkViewBtns();
            this.change();
        }
        //#endregion newTab
        /*insertTab:function(tab,index) {
          let tpl,a,div=document.createElement(core.types.HTMLElements.DIV);
          if (!(tab instanceof TabSheet)) return;
          if (typeof index===_const.NUMBER) {
            if (index<0) index=0;
            else if (index>this.tabsheets.length-1) index=this.tabsheets.length-1;
            this.tabsheets.insert(index,tab);
          } else this.tabsheets.push(tab);
          tab.owner=this;
          tab._pageControl=this;
          if (tab._HTMLPage)) {
            tpl=core.templates["Page"];
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
        },*/
        //#region moveTab
        moveTab(fromIndex, toIndex) {
            //#region Variables déclaration
            const priv = internal(this);
            const tabs = this.tabs;
            const tabsContainer = priv.tabsContainer;
            //#endregion Variables déclaration
            if (fromIndex >= 0 && fromIndex <= tabs.length - 1 &&
                toIndex >= 0 && toIndex <= tabs.length - 1) {
                const curTab = this.getTab(fromIndex);
                tabs.splice(fromIndex, 1);
                tabs.splice(toIndex, 0, curTab);
                curTab.HTMLElement.remove();
                toIndex++;
                toIndex > tabs.length - 1
                    ? tabsContainer.insertBefore(curTab.HTMLElement, priv.tabContent)
                    : tabsContainer.insertBefore(curTab.HTMLElement, this.getTab(toIndex).HTMLElement);
                this.change();
            }
        }
        //#endregion moveTab
        //#region findNextTab
        findNextTab(goForward, checkTabVisible) {
            //#region Variables déclaration
            const tabs = this.tabs;
            let startIndex = this.activeTabIndex;
            let result = null;
            //#endregion Variables déclaration
            if (tabs.length !== 0) {
                if (startIndex === -1) {
                    startIndex = goForward ? tabs.length - 1 : 0;
                }
                let i = startIndex;
                do {
                    if (goForward) {
                        i++;
                        i === tabs.length && (i = 0);
                    } else {
                        i === 0 && (i = tabs.length);
                        i--;
                    }
                    result = tabs[i];
                    if (!checkTabVisible || result.visible) {
                        return result;
                    }
                }
                while (i === startIndex);
            }
            return result;
        }
        //#endregion findNextTab
        //#region selectNextTab
        selectNextTab(goForward, checkTabVisible) {
            //#region Variables déclaration
            const priv = internal(this);
            const tab = this.findNextTab(goForward, checkTabVisible);
            //#endregion Variables déclaration
            if (tab && tab !== priv.activeTab && this.canChange) {
                this.changeActiveTab(tab);
                this.change();
            }
        }
        //#endregion selectNextTab
        //#region change
        change() {
            !this.updating && this.onChange.invoke();
        }
        //#endregion change
        //#region getChildsHTMLElement
        getHTMLElement(id) {
            //#region Variables déclaration
            const priv = internal(this);
            const tabs = this.tabs;
            //#endregion Variables déclaration
            super.getHTMLElement(id);
            const htmlElement = this.HTMLElement;
            if (htmlElement) {
                priv.tabsHeader = htmlElement.querySelector('.TabControlHeader');
                priv.tabsContainer = htmlElement.querySelector('.TabsContainer');
                const nodes = priv.tabsContainer.childNodes;
                nodes.forEach(node => {
                    if (node.nodeType === core.types.XMLNODETYPES.ELEMENT_NODE) {
                        let data = node.dataset.class;
                        if (data) {
                            const tab = core.classes.createComponent({
                                class: core.classes[data],
                                owner: this,
                                props: {
                                    inForm: !0,
                                    caption: node.innerHTML
                                },
                                name: node.dataset.name,
                                withTpl: !1,
                                internalId: node.id
                            });
                            node.jsObj = tab;
                            tabs.push(tab);
                            tab.name === priv.activeTab && (priv.activeTab = tab);
                        }
                    }
                });
            }
        }
        //#endregion getChildsHTMLElement
        //#region checkViewBtns
        checkViewBtns() {
            //#region Variables déclaration
            const priv = internal(this);
            const tabsContainer = priv.tabsContainer;
            const btnRight = priv.btnRight;
            const btnLeft = priv.btnLeft;
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            btnRight.enabled = (tabsContainer.scrollLeft < tabsContainer.scrollWidth - tabsContainer.offsetWidth);
            btnLeft.enabled = (tabsContainer.scrollLeft > 0);
            htmlElement.classList.remove('noButtons');
            if (tabsContainer.scrollWidth <= tabsContainer.offsetWidth) {
                btnLeft.visible = !1;
                btnRight.visible = !1;
                htmlElement.classList.add('noButtons');
            } else {
                btnLeft.visible = !0;
                btnRight.visible = !0;
            }
        }
        //#endregion checkViewBtns
        //#region moveTabs
        moveTabs() {
            //#region Variables déclaration
            const DIRECTIONS = core.types.DIRECTIONS;
            const tabsContainer = this.tabsContainer;
            const owner = this.owner;
            //#endregion Variables déclaration
            owner.checkLastVisibleTab();
            const firstVisibleTabWidth = owner.tabs[owner.firstVisibleTab].HTMLElement.offsetWidth;
            switch (this.tag) {
                case DIRECTIONS.LEFT:
                    tabsContainer.scrollLeft -= firstVisibleTabWidth;
                    owner.firstVisibleTab--;
                    break;
                case DIRECTIONS.RIGHT:
                    tabsContainer.scrollLeft += firstVisibleTabWidth;
                    owner.firstVisibleTab++;
                    break;
            }
            owner.checkViewBtns();
            owner.change();
        }
        //#endregion moveTabs
        //#region scrollToTab
        scrollToTab(tab) {
            //#region Variables déclaration
            const priv = internal(this);
            const tabsContainer = priv.tabsContainer;
            const tw = tab.HTMLElement.offsetWidth;
            const tl = tab.HTMLElement.offsetLeft;
            const tcw = tabsContainer.offsetWidth;
            const tcsl = tabsContainer.scrollLeft;
            //#endregion Variables déclaration
            if (tl + tw - tcsl > tcw) {
                tabsContainer.scrollLeft += tl + tw - tcw;
            } else if (tl < tcsl) {
                tabsContainer.scrollLeft -= tcsl - tl;
            }
            this.checkViewBtns();
        }
        //#endregion scrollToTab
        //#region checkLastVisibleTab
        checkLastVisibleTab() {
            //#region Variables déclaration
            const priv = internal(this);
            const tabs = this.tabs;
            let i = 0;
            const l = tabs.length;
            const tabsContainer = priv.tabsContainer;
            const btnLeft = priv.btnLeft;
            //#endregion Variables déclaration
            priv.lastVisibleTab = -1;
            for (i = priv.firstVisibleTab; i < l; i++) {
                if (tabs[i].HTMLElement.offsetLeft + tabs[i].HTMLElement.offsetWidth + tabsContainer.offsetLeft > btnLeft.offsetLeft) {
                    priv.lastVisibleTab = i - 1;
                    break;
                }
            }
            priv.lastVisibleTab === -1 && (priv.lastVisibleTab = tabs.length - 1);
        }
        //#endregion checkLastVisibleTab
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            this.tabs.destroy();
            this.tabs.clear();
            this.tabs = null;
            delete this.tabs;
            priv.firstVisibleTab = null;
            priv.lastVisibleTab = null;
            priv.tabClass = null;
            priv.activeTab = null;
            priv.images = null;
            priv.canChange = null;
            priv.showTabsCloseBtn = null;
            priv.tabStyle = null;
            priv.tabPosition = null;
            this.unBindAndDestroyEvents(['onChange']);
            super.destroy();
        }
        //#endregion destroy
        //#region keyDown
        keyDown() {
            //#region Variables déclaration
            const priv = internal(this);
            const DIRECTIONS = core.types.DIRECTIONS;
            const VKEYSCODES = Keyboard.VKEYSCODES;
            const activeTab = priv.activeTab;
            const tabs = this.tabs;
            //#endregion Variables déclaration
            super.keyDown();
            switch (core.keyboard.keyCode) {
                case VKEYSCODES.VK_LEFT:
                    if (activeTab === tabs.first) {
                        return;
                    }
                    this.selectNextTab(!1, !0);
                    tabs.indexOf(activeTab) < priv.firstVisibleTab && this.updateTabs(DIRECTIONS.LEFT);
                    break;
                case VKEYSCODES.VK_RIGHT:
                    if (activeTab === tabs.last) {
                        return;
                    }
                    this.selectNextTab(!0, !0);
                    tabs.indexOf(activeTab) > priv.lastVisibleTab && this.updateTabs(DIRECTIONS.RIGHT);
                    break;
            }
        }
        //#endregion keyDown
        //#region getTabOrderList
        getTabOrderList(list, children) {
            //#region Variables déclaration
            const priv = internal(this);
            const tabList = priv.tabContent.tabList;
            //#endregion Variables déclaration
            children && (children = !0);
            if (list && tabList) {
                tabList.forEach(control => {
                    list.push(control);
                    children && control.getTabOrderList(list, children);
                });
            }
        }
        //#endregion getTabOrderList
        //#region closeTab
        closeTab(tab) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            tab.onClose.invoke();
            tab.hide();
            priv.tabs.remove(tab);
            tab.destroy();
        }
        //#endregion closeTab
        //#region loaded
        loaded() {
            //#region Variables déclaration
            const priv = internal(this);
            const DIRECTIONS = core.types.DIRECTIONS;
            //#endregion Variables déclaration
            super.loaded();
            priv.btnLeft = core.classes.createComponent({
                class: core.classes.Button,
                owner: this,
                props: {
                    inForm: !1,
                    parentHTML: priv.tabsHeader,
                    cssClasses: 'TabControlLeftBtn',
                    canFocused: !1,
                    caption: String.EMPTY
                }
            });
            priv.btnLeft.tag = DIRECTIONS.LEFT;
            priv.btnLeft.tabsContainer = priv.tabsContainer;
            priv.btnLeft.onClick.addListener(this.moveTabs);
            priv.btnRight = core.classes.createComponent({
                class: core.classes.Button,
                owner: this,
                props: {
                    inForm: !1,
                    parentHTML: priv.tabsHeader,
                    cssClasses: 'TabControlRightBtn',
                    canFocused: !1,
                    caption: String.EMPTY
                }
            });
            priv.btnRight.tag = DIRECTIONS.RIGHT;
            priv.btnRight.tabsContainer = priv.tabsContainer;
            priv.btnRight.onClick.addListener(this.moveTabs);
            this.checkViewBtns();
            this.checkLastVisibleTab();
            this.checkTabsPosition();
        }
        //#endregion loaded
        //#endregion Methods
    }
    return CustomTabControl;
    //#region CustomTabControl
})();
Object.seal(CustomTabControl);
core.classes.register(core.types.CATEGORIES.INTERNAL, CustomTabControl);
//#endregion CustomTabControl
export { CustomTabControl };