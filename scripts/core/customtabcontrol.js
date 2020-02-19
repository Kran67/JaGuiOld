//#region Imports
import { ThemedControl } from '/scripts/core/themedcontrol.js';
//import { Classes } from '/scripts/core/classes.js';
//import { NotifyEvent } from '/scripts/core/events.js';
import { Tools } from '/scripts/core/tools.js';
import { Css } from '/scripts/core/css.js';
import { Convert } from '/scripts/core/convert.js';
//#endregion Imports
//#region CustomTabControl constants
const _tabStyles = Object.freeze({
    TABS: 'tabs',
    BUTTONS: 'buttons',
    FLATBUTTONS: 'flatButtons'
});
const _tabPositions = Object.freeze({
    TOP: 'top',
    BOTTOM: 'bottom',
    LEFT: 'left',
    RIGHT: 'right'
});
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
            //#region Variables déclaration
            const DIRECTIONS = Types.DIRECTIONS;
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.tabContent = Core.classes.createComponent({
                    class: Core.classes.Layout,
                    owner: this,
                    props: {
                        inForm: false
                    },
                    withTpl: false
                });
                priv.tabs = [];
                priv.btnLeft = Core.classes.createComponent({
                    class: Core.classes.Button,
                    owner: this,
                    props: {
                        inForm: false
                    },
                    withTpl: false
                });
                priv.btnRight = Core.classes.createComponent({
                    class: Core.classes.Button,
                    owner: this,
                    props: {
                        inForm: false
                    },
                    withTpl: false
                });
                priv.tabsHeader = null;
                priv.tabs_Container = null;
                priv.firstVisibleTab = 0;
                priv.lastVisibleTab = 0;
                priv.tabClass = Tab;
                priv.activeTab = null;
                priv.images = null;
                priv.canChange = true;
                priv.showTabsCloseBtn = props.hasOwnProperty('showTabsCloseBtn') ? props.showTabsCloseBtn :false;
                this.addBindableProperties(['activeTab', 'showTabsCloseBtn', 'tabStyle', 'tabPosition']);
                //#region Private
                priv.btnLeft.tag = DIRECTIONS.LEFT;
                priv.btnLeft.onClick.addListener(this.moveTabs);
                priv.btnLeft.canFocused = false;
                priv.btnRight.tag = DIRECTIONS.RIGHT;
                priv.btnRight.onClick.addListener(this.moveTabs);
                priv.btnRight.canFocused = false;
                //priv.tabStyle = _tabStyles.TABS;
                //priv.tabPosition = _tabPositions.TOP;
                this.autoCapture = true;
                this.width = 200;
                this.height = 200;
                //#endregion
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: 'tabStyle',
                    enum: _tabStyles,
                    value: _tabStyles.TABS
                });
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: 'tabPosition',
                    enum: _tabPositions,
                    setter: this._tabPosition,
                    value: _tabPositions.TOP
                });
                this.onChange = new Core.classes.NotifyEvent(this);
                this.canFocused = true;
            }
        }
        //#region constructor
        //#region Getter / Setters
        //#region tabContent
        get tabContent() {
            return internal(this).tabContent;
        }
        set tabContent(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof HTMLElement) {
                if (priv.tabContent !== newValue) {
                    priv.tabContent = newValue;
                }
            }
        }
        //#endregion tabContent
        //#region tabs
        get tabs() {
            return internal(this).tabs;
        }
        //#endregion tabs
        //#region btnLeft
        get btnLeft() {
            return internal(this).btnLeft;
        }
        set btnLeft(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof HTMLElement) {
                if (priv.btnLeft !== newValue) {
                    priv.btnLeft = newValue;
                }
            }
        }
        //#endregion btnLeft
        //#region btnRight
        get btnRight() {
            return internal(this).btnRight;
        }
        set btnRight(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof HTMLElement) {
                if (priv.btnRight !== newValue) {
                    priv.btnRight = newValue;
                }
            }
        }
        //#endregion btnRight
        //#region tabsHeader
        get tabsHeader() {
            return internal(this).tabsHeader;
        }
        set tabsHeader(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof HTMLElement) {
                if (priv.tabsHeader !== newValue) {
                    priv.tabsHeader = newValue;
                }
            }
        }
        //#endregion tabsHeader
        //#region tabs_Container
        get tabs_Container() {
            return internal(this).tabs_Container;
        }
        set tabs_Container(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof HTMLElement) {
                if (priv.tabs_Container !== newValue) {
                    priv.tabs_Container = newValue;
                }
            }
        }
        //#endregion tabs_Container
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
        //#region tabClass
        get tabClass() {
            return internal(this).tabClass;
        }
        set tabClass(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (typeof newValue === Types.CONSTANTS.STRING) {
                if (priv.tabClass !== newValue) {
                    priv.tabClass = newValue;
                }
            }
        }
        //#endregion tabClass
        //#region activeTab
        get activeTab() {
            return internal(this).activeTab;
        }
        set activeTab(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (newValue instanceof Core.classes.Tab) {
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
                        Css.addClass(htmlElement, 'showTabsCloseBtn');
                    } else {
                        Css.removeClass(htmlElement, 'showTabsCloseBtn');
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
        //#region width
        get width() {
            return internal(this).width;
        }
        set width(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.width !== newValue) {
                    priv.width = newValue;
                }
            }
        }
        //#endregion width
        //#region height
        get height() {
            return internal(this).height;
        }
        set height(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.height !== newValue) {
                    priv.height = newValue;
                }
            }
        }
        //#endregion height
        //#region TABSTYLES
        static get TABSTYLES() {
            return internal(this).tabStyles;
        }
        static get TABPOSITIONS() {
            return internal(this).tabPositions;
        }
        //#endregion TABSTYLES
        //#region _tabPosition
        _tabPosition(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            if (Tools.valueInSet(newValue, _tabPositions)) {
                if (priv.tabPosition !== newValue) {
                    priv.tabPosition = newValue;
                    if (priv.tabPosition === _tabPositions.BOTTOM) {
                        Css.addClass(htmlElement, `${tabs}${priv.tabPosition.capitalise()}`);
                    } else {
                        Css.removeClass(htmlElement, 'tabsBottom');
                    }
                }
            }
        }
        //#endregion _tabPosition
        //#endregion
        //#region Methods
        //#region changeActiveTab
        changeActiveTab(tab) {
            if (tab !== this.activeTab) {
                tab.show();
            }
            //if (this.tabsheets.indexOf(this.activeTab)<=this.firstVisibleTab) this.updateTabs(Types.directions.LEFT);
            //if (this.tabsheets.indexOf(this.activeTab)>this.lastVisibleTab) this.updateTabs(Types.directions.RIGHT);
        }
        //#endregion changeActiveTab
        //#region deleteTab
        deleteTab(index) {
            //#region Variables déclaration
            const tabs = this.tabs;
            //#endregion Variables déclaration
            if (index >= 0 && index <= tabs.length - 1) {
                const tab = tabs[index];
                //this.tabContent.removeChild(tab._HTMLPage);
                // supprimer les controles de la page
                this._tab_Container.removeChild(tab.HTMLElement);
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
            const tabs = this.tabs;
            //#endregion Variables déclaration
            if (!caption) {
                caption = `tab${tabs.length + 1}`;
            }
            const tab = Core.classes.createComponent({
                class: Core.classes.Tab,
                owner: this,
                name: caption.firstCharUpper(),
                props: {
                    parentHTML: this.tabs_Container,
                    caption: caption
                },
                withTpl: true
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
            const tabs = this.tabs;
            const tabsContainer = this.tabs_Container;
            //#endregion Variables déclaration
            if (fromIndex >= 0 && fromIndex <= tabs.length - 1 && 
                toIndex >= 0 && toIndex <= tabs.length - 1) {
                const curTab = this.getTab(fromIndex);
                tabs.splice(fromIndex, 1);
                tabs.splice(toIndex, 0, curTab);
                curTab.HTMLElement.remove();
                toIndex++;
                if (toIndex > tabs.length - 1) {
                    tabsContainer.insertBefore(curTab.HTMLElement, this.tabContent);
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
            const tabs = this.tabs;
            let startIndex = this.activeTabIndex;
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
            const tab = this.findNextTab(goForward, checkTabVisible);
            //#endregion Variables déclaration
            if (tab && tab !== this.activeTab && this.canChange) {
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
        getChildsHTMLElement() {
            //#region Variables déclaration
            const htmlElement = this.HTMLElement;
            const tabContent = this.tabContent;
            const btnLeft = this.btnLeft;
            const btnRight = this.btnRight;
            const tabs = this.tabs;
            //#endregion Variables déclaration
            if (htmlElement) {
                const tabsContainer = htmlElement.querySelector('.TabsContainer');
                const nodes = tabsContainer.childNodes;
                nodes.forEach(node => {
                    if (node.nodeType === Types.XMLNODETYPES.ELEMENT_NODE) {
                        let data = node.dataset.class;
                        if (data) {
                            const obj = new Core.classes[data](this);
                            obj.HTMLElement = node;
                            obj.HTMLElementStyle = obj.HTMLElement.style;
                            node.jsObj = obj;
                            data = node.dataset.name;
                            if (data) {
                                obj.name = data;
                            }
                            obj.updateFromHTML();
                            tabs.push(obj);
                        }
                    }
                });
                tabContent.getHTMLElement(htmlElement.lastElementChild.id);
                tabContent.updateFromHTML();
                tabContent.getChildsHTMLElement();
                btnLeft.getHTMLElement(htmlElement.querySelector('.TabControlLeftBtn').id);
                btnLeft.updateFromHTML();
                btnLeft.getChildsHTMLElement();
                btnRight.getHTMLElement(htmlElement.querySelector('.TabControlRightBtn').id);
                btnRight.updateFromHTML();
                btnRight.getChildsHTMLElement();
            }
            this.checkViewBtns();
            this.checkLastVisibleTab();
        }
        //#endregion getChildsHTMLElement
        //#region checkViewBtns
        checkViewBtns() {
            //#region Variables déclaration
            const tabsContainer = this.tabs_Container;
            const btnRight = this.btnRight;
            const btnLeft = this.btnLeft;
            const htmlElement = this.HTMLElement;
            //#endregion Variables déclaration
            btnRight.enabled = (tabsContainer.scrollLeft < tabsContainer.scrollWidth - tabsContainer.offsetWidth);
            btnLeft.enabled = (tabsContainer.scrollLeft > 0);
            Css.removeClass(htmlElement, 'noButtons');
            if (tabsContainer.scrollWidth <= tabsContainer.offsetWidth) {
                btnLeft.visible = false;
                btnRight.visible = false;
                Css.addClass(htmlElement, 'noButtons');
            } else {
                btnLeft.visible = true;
                btnRight.visible = true;
            }
        }
        //#endregion checkViewBtns
        //#region moveTabs
        moveTabs() {
            //#region Variables déclaration
            const DIRECTIONS = Types.DIRECTIONS;
            let owner = this.owner;
            const tabsContainer = owner.tabs_Container;
            //#endregion Variables déclaration
            owner = _owner;
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
            const tabsContainer = this.tabs_Container;
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
            const tabs = this.tabs;
            let i = 0;
            const l = tabs.length;
            const tabsContainer = this.tabs_Container;
            const btnLeft = this.btnLeft;
            //#endregion Variables déclaration
            this.lastVisibleTab = -1;
            for (i = this.firstVisibleTab; i < l; i++) {
                if (tabs[i].HTMLElement.offsetLeft + tabs[i].HTMLElement.offsetWidth + tabsContainer.offsetLeft > btnLeft.offsetLeft) {
                    this.lastVisibleTab = i - 1;
                    break;
                }
            }
            if (this.lastVisibleTab === -1) {
                this.lastVisibleTab = tabs.length - 1;
            }
        }
        //#endregion checkLastVisibleTab
        //#region destroy
        destroy() {
            this.tabs.destroy();
            this.onChange.destroy();
            super.destroy();
        }
        //#endregion destroy
        //#region keyDown
        keyDown() {
            //#region Variables déclaration
            const DIRECTIONS = Types.DIRECTIONS;
            const VKEYSCODES = Keyboard.VKEYSCODES;
            const activeTab = this.activeTab;
            const tabs = this.tabs;
            //#endregion Variables déclaration
            super.keyDown();
            switch (Core.keyboard.keyCode) {
                case VKEYSCODES.VK_LEFT:
                    if (activeTab === tabs.first) {
                        return;
                    }
                    this.selectNextTab(false, true);
                    if (tabs.indexOf(activeTab) < this.firstVisibleTab) {
                        this.updateTabs(DIRECTIONS.LEFT);
                    }
                    break;
                case VKEYSCODES.VK_RIGHT:
                    if (activeTab === tabs.last) {
                        return;
                    }
                    this.selectNextTab(true, true);
                    if (tabs.indexOf(activeTab) > this.lastVisibleTab) {
                        this.updateTabs(DIRECTIONS.RIGHT);
                    }
                    break;
            }
        }
        //#endregion keyDown
        //#region getTabOrderList
        getTabOrderList(list, children) {
            //#region Variables déclaration
            const tabList = this.tabContent.tabList;
            //#endregion Variables déclaration
            if (children) {
                children = true;
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
            tab.onClose.invoke();
            tab.hide();
            this.tabs.remove(tab);
            tab.destroy();
        }
        //#endregion closeTab
        //#region loaded
        loaded() {
            super.loaded();
            this.checkViewBtns();
        }
        //#endregion loaded
        //#endregion
    }
    return CustomTabControl;
    //#region CustomTabControl
})();
//#endregion
//#region CustomTabControl defineProperties
Object.defineProperties(CustomTabControl, {
    'tabs': {
        enumerable: true
    },
    'tabClass': {
        enumerable: true
    },
    'activeTab': {
        enumerable: true
    },
    'images': {
        enumerable: true
    },
    'canChange': {
        enumerable: true
    },
    'showTabsCloseBtn': {
        enumerable: true
    },
    'activeTabIndex': {
        enumerable: true
    },
    'width': {
        enumerable: true
    },
    'height': {
        enumerable: true
    }
});
Object.seal(CustomTabControl);
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, CustomTabControl);
export { CustomTabControl };