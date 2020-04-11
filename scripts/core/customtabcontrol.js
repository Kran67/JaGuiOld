//#region Imports
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Tab } from '/scripts/components/containers/tab.js';
import { NotifyEvent } from '/scripts/core/events.js';
import { Tools } from '/scripts/core/tools.js';
//#endregion Imports
//#region CustomTabControl constants
//#region TABSTYLES
const TABSTYLES = Object.freeze({
    TABS: 'tabs',
    BUTTONS: 'buttons',
    FLATBUTTONS: 'flatButtons'
});
//#ENDregion TABSTYLES
//#region TABPOSITIONS
const TABPOSITIONS = Object.freeze({
    TOP: 'top',
    BOTTOM: 'bottom',
    LEFT: 'left',
    RIGHT: 'right'
});
//#endregion TABPOSITIONS
//#endregion CustomTabControl constants
//#region CustomTabControl
const CustomTabControl = (() => {
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
    //#region CustomTabControl
    class CustomTabControl extends ThemedControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.firstVisibleTab = 0;
                priv.lastVisibleTab = 0;
                priv.tabClass = props.hasOwnProperty('tabClass')?props.tabClass:Tab;
                priv.activeTab = props.hasOwnProperty('activeTab') ? props.activeTab : null;
                priv.images = null;
                priv.canChange = !0;
                priv.showTabsCloseBtn = props.hasOwnProperty('showTabsCloseBtn') ? props.showTabsCloseBtn : !1;
                this.autoCapture = !0;
                this.width = props.hasOwnProperty('width') ? props.width : 200;
                this.height = props.hasOwnProperty('height') ? props.height : 200;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: 'tabStyle',
                    enum: TABSTYLES,
                    value: props.hasOwnProperty('tabStyle') ? props.tabStyle : TABSTYLES.TABS,
                    variable: priv
                });
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: 'tabPosition',
                    enum: TABPOSITIONS,
                    setter: this.tabPosition,
                    value: props.hasOwnProperty('tabPosition') ? props.tabPosition : TABPOSITIONS.TOP,
                    variable: priv
                });
                this.onChange = new NotifyEvent(this);
                this.canFocused = !0;
                Core.classes.newCollection(this, this, Tab, "tabs");
            }
        }
        //#region constructor
        //#region Getter / Setters
        //#region firstVisibleTab
        get firstVisibleTab() {
            return internal(this).firstVisibleTab;
        }
        set firstVisibleTab(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (priv.firstVisibleTab !== newValue) {
                    priv.firstVisibleTab = newValue;
                }
            }
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
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (priv.lastVisibleTab !== newValue) {
                    priv.lastVisibleTab = newValue;
                }
            }
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
            if (newValue instanceof Tab) {
                if (priv.activeTab !== newValue) {
                    priv.activeTab = newValue;
                    priv.activeTab.show();
                }
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
            if (newValue instanceof Core.classes.ImageList) {
                if (priv.images !== newValue) {
                    priv.images = newValue;
                }
            }
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
            if (Tools.isBool(newValue)) {
                if (priv.canChange !== newValue) {
                    priv.canChange = newValue;
                }
            }
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
            if (Tools.isBool(newValue)) {
                if (priv.showTabsCloseBtn !== newValue) {
                    priv.showTabsCloseBtn = newValue;
                    if (newValue) {
                        htmlElement.classList.add('showTabsCloseBtn');
                    } else {
                        htmlElement.classList.remove('showTabsCloseBtn');
                    }
                }
            }
        }
        //#endregion showTabsCloseBtn
        //#region activeTabIndex
        get activeTabIndex() {
            return internal(this).tabs.indexOf(internal(this).activeTab);
        }
        set activeTabIndex(index) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (index >= 0 && index <= priv.tabs.length - 1) {
                priv.tabs[index].show();
                //if (this.tabsheets.indexOf(this.activeTab)<this.firstVisibleTab) this.updateTabs(Types.directions.LEFT);
                //if (this.tabsheets.indexOf(this.activeTab)>this.lastVisibleTab) this.updateTabs(Types.directions.RIGHT);
            }
        }
        //#endregion activeTabIndex
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
        //#region tabPosition
        tabPosition(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, TABPOSITIONS)) {
                if (priv.tabPosition !== newValue) {
                    priv.tabPosition = newValue;
                    if (priv.tabPosition === TABPOSITIONS.BOTTOM) {
                        htmlElement.classList.add(`${tabs}${priv.tabPosition.capitalise()}`);
                    } else {
                        htmlElement.classList.remove('tabsBottom');
                    }
                }
            }
        }
        //#endregion tabPosition
        //#endregion
        //#region Methods
        //#region changeActiveTab
        changeActiveTab(tab) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (tab !== priv.activeTab) {
                tab.show();
            }
            //if (this.tabsheets.indexOf(this.activeTab)<=this.firstVisibleTab) this.updateTabs(Types.directions.LEFT);
            //if (this.tabsheets.indexOf(this.activeTab)>this.lastVisibleTab) this.updateTabs(Types.directions.RIGHT);
        }
        //#endregion changeActiveTab
        //#region deleteTab
        deleteTab(index) {
            //#region Variables déclaration
            const priv = internal(this);
            const tabs = priv.tabs;
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
            const priv = internal(this);
            const tabs = priv.tabs;
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
            const tabs = priv.tabs;
            //#endregion Variables déclaration
            if (!caption) {
                caption = `tab${tabs.length + 1}`;
            }
            const tab = Core.classes.createComponent({
                class: Core.classes.Tab,
                owner: this,
                name: caption.firstCharUpper(),
                props: {
                    parentHTML: priv.tabsContainer,
                    caption: caption
                },
                withTpl: !0
            });
            tabs.push(tab);
            this.changeActiveTab(tab);
            this.checkViewBtns();
            this.change();
        }
        //#endregion newTab
        /*insertTab:function(tab,index) {
          let tpl,a,div=document.createElement(Types.HTMLElements.DIV);
          if (!(tab instanceof TabSheet)) return;
          if (typeof index===_const.NUMBER) {
            if (index<0) index=0;
            else if (index>this.tabsheets.length-1) index=this.tabsheets.length-1;
            this.tabsheets.insert(index,tab);
          } else this.tabsheets.push(tab);
          tab.owner=this;
          tab._pageControl=this;
          if (tab._HTMLPage)) {
            tpl=Core.templates["Page"];
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
            const tabs = priv.tabs;
            const tabsContainer = priv.tabsContainer;
            //#endregion Variables déclaration
            if (fromIndex >= 0 && fromIndex <= tabs.length - 1 &&
                toIndex >= 0 && toIndex <= tabs.length - 1) {
                const curTab = this.getTab(fromIndex);
                tabs.splice(fromIndex, 1);
                tabs.splice(toIndex, 0, curTab);
                curTab.HTMLElement.remove();
                toIndex++;
                if (toIndex > tabs.length - 1) {
                    tabsContainer.insertBefore(curTab.HTMLElement, priv.tabContent);
                } else {
                    tabsContainer.insertBefore(curTab.HTMLElement, this.getTab(toIndex).HTMLElement);
                }
                this.change();
            }
        }
        //#endregion moveTab
        //#region findNextTab
        findNextTab(goForward, checkTabVisible) {
            //#region Variables déclaration
            const priv = internal(this);
            const tabs = priv.tabs;
            let startIndex = priv.activeTabIndex;
            let result = null;
            //#endregion Variables déclaration
            if (tabs.length !== 0) {
                if (startIndex === -1) {
                    if (goForward) {
                        startIndex = tabs.length - 1;
                    } else {
                        startIndex = 0;
                    }
                }
                let i = startIndex;
                do {
                    if (goForward) {
                        i++;
                        if (i === tabs.length) {
                            i = 0;
                        }
                    } else {
                        if (i === 0) {
                            i = tabs.length;
                        }
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
            if (!this.updating) {
                this.onChange.invoke();
            }
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
                    if (node.nodeType === Types.XMLNODETYPES.ELEMENT_NODE) {
                        let data = node.dataset.class;
                        if (data) {
                            const tab = Core.classes.createComponent({
                                class: Core.classes[data],
                                owner: this,
                                props: {
                                    inForm: !0,
                                    name: node.dataset.name,
                                    caption: node.innerHTML
                                },
                                withTpl: !1,
                                internalId: node.id
                            });
                            node.jsObj = tab;
                            tabs.push(tab);
                            if (tab.name === priv.activeTab) {
                                priv.activeTab = tab;
                            }
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
            const DIRECTIONS = Types.DIRECTIONS;
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
            if (priv.lastVisibleTab === -1) {
                priv.lastVisibleTab = tabs.length - 1;
            }
        }
        //#endregion checkLastVisibleTab
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.tabs.destroy();
            priv.tabs = null;
            this.onChange.destroy();
            super.destroy();
        }
        //#endregion destroy
        //#region keyDown
        keyDown() {
            //#region Variables déclaration
            const priv = internal(this);
            const DIRECTIONS = Types.DIRECTIONS;
            const VKEYSCODES = Keyboard.VKEYSCODES;
            const activeTab = priv.activeTab;
            const tabs = priv.tabs;
            //#endregion Variables déclaration
            super.keyDown();
            switch (Core.keyboard.keyCode) {
                case VKEYSCODES.VK_LEFT:
                    if (activeTab === tabs.first) {
                        return;
                    }
                    this.selectNextTab(!1, !0);
                    if (tabs.indexOf(activeTab) < priv.firstVisibleTab) {
                        this.updateTabs(DIRECTIONS.LEFT);
                    }
                    break;
                case VKEYSCODES.VK_RIGHT:
                    if (activeTab === tabs.last) {
                        return;
                    }
                    this.selectNextTab(!0, !0);
                    if (tabs.indexOf(activeTab) > priv.lastVisibleTab) {
                        this.updateTabs(DIRECTIONS.RIGHT);
                    }
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
            if (children) {
                children = !0;
            }
            if (list) {
                if (tabList) {
                    tabList.forEach(control => {
                        list.push(control);
                        if (children) {
                            control.getTabOrderList(list, children);
                        }
                    });
                }
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
            const DIRECTIONS = Types.DIRECTIONS;
            //#endregion Variables déclaration
            super.loaded();
            priv.btnLeft = Core.classes.createComponent({
                class: Core.classes.Button,
                owner: this,
                props: {
                    inForm: !1,
                    parentHTML: priv.tabsHeader,
                    cssClasses: ' TabControlLeftBtn',
                    canFocused: !1,
                    caption: String.EMPTY
                },
                withTpl: !0
            });
            priv.btnLeft.tag = DIRECTIONS.LEFT;
            priv.btnLeft.tabsContainer = priv.tabsContainer;
            priv.btnLeft.onClick.addListener(this.moveTabs);
            priv.btnRight = Core.classes.createComponent({
                class: Core.classes.Button,
                owner: this,
                props: {
                    inForm: !1,
                    parentHTML: priv.tabsHeader,
                    cssClasses: ' TabControlRightBtn',
                    canFocused: !1,
                    caption: String.EMPTY
                },
                withTpl: !0
            });
            priv.btnRight.tag = DIRECTIONS.RIGHT;
            priv.btnRight.tabsContainer = priv.tabsContainer;
            priv.btnRight.onClick.addListener(this.moveTabs);
            this.checkViewBtns();
            this.checkLastVisibleTab();
        }
        //#endregion loaded
        //#endregion Methods
    }
    return CustomTabControl;
    //#region CustomTabControl
})();
//#region CustomTabControl defineProperties
Object.defineProperties(CustomTabControl, {
    'tabs': {
        enumerable: !0
    },
    'tabClass': {
        enumerable: !0
    },
    'activeTab': {
        enumerable: !0
    },
    'images': {
        enumerable: !0
    },
    'canChange': {
        enumerable: !0
    },
    'showTabsCloseBtn': {
        enumerable: !0
    },
    'activeTabIndex': {
        enumerable: !0
    },
    'width': {
        enumerable: !0
    },
    'height': {
        enumerable: !0
    }
});
Object.seal(CustomTabControl);
//#endregion CustomTabControl defineProperties
Core.classes.register(Types.CATEGORIES.INTERNAL, CustomTabControl);
//#endregion CustomTabControl
export { CustomTabControl };