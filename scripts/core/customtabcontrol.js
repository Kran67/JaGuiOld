import { ThemedControl } from "/scripts/core/themedcontrol.js";
//import { Classes } from "/scripts/core/classes.js";
//import { NotifyEvent } from "/scripts/core/events.js";
import { Tools } from "/scripts/core/tools.js";
import { Css } from "/scripts/core/css.js";
import { Convert } from "/scripts/core/convert.js";
const _tabStyles = Object.freeze({
    TABS: "tabs",
    BUTTONS: "buttons",
    FLATBUTTONS: "flatButtons"
});
const _tabPositions = Object.freeze({
    TOP: "top",
    BOTTOM: "bottom",
    LEFT: "left",
    RIGHT: "right"
});
//#region CustomTabControl
const CustomTabControl = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class CustomTabControl extends ThemedControl {
        constructor(owner, props) {
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
                priv.showTabsCloseBtn = false;
                this.addBindableProperties(["activeTab", "showTabsCloseBtn", "tabStyle", "tabPosition"]);
                //#region Private
                priv.btnLeft.tag = Types.DIRECTIONS.LEFT;
                priv.btnLeft.onClick.addListener(this.moveTabs);
                priv.btnLeft.canFocused = false;
                priv.btnRight.tag = Types.DIRECTIONS.RIGHT;
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
                    propName: "tabStyle",
                    enum: _tabStyles,
                    value: _tabStyles.TABS
                });
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: "tabPosition",
                    enum: _tabPositions,
                    setter: this._tabPosition,
                    value: _tabPositions.TOP
                });
                this.onChange = new Core.classes.NotifyEvent(this);
                this.canFocused = true;
            }
        }
        //#region Setters
        get tabContent() {
            return internal(this).tabContent;
        }
        set tabContent(newValue) {
            const priv = internal(this);
            if (newValue instanceof HTMLElement) {
                if (priv.tabContent !== newValue) {
                    priv.tabContent = newValue;
                }
            }
        }
        get tabs() {
            return internal(this).tabs;
        }
        get btnLeft() {
            return internal(this).btnLeft;
        }
        set btnLeft(newValue) {
            const priv = internal(this);
            if (newValue instanceof HTMLElement) {
                if (priv.btnLeft !== newValue) {
                    priv.btnLeft = newValue;
                }
            }
        }
        get btnRight() {
            return internal(this).btnRight;
        }
        set btnRight(newValue) {
            const priv = internal(this);
            if (newValue instanceof HTMLElement) {
                if (priv.btnRight !== newValue) {
                    priv.btnRight = newValue;
                }
            }
        }
        get tabsHeader() {
            return internal(this).tabsHeader;
        }
        set tabsHeader(newValue) {
            const priv = internal(this);
            if (newValue instanceof HTMLElement) {
                if (priv.tabsHeader !== newValue) {
                    priv.tabsHeader = newValue;
                }
            }
        }
        get tabs_Container() {
            return internal(this).tabs_Container;
        }
        set tabs_Container(newValue) {
            const priv = internal(this);
            if (newValue instanceof HTMLElement) {
                if (priv.tabs_Container !== newValue) {
                    priv.tabs_Container = newValue;
                }
            }
        }
        get firstVisibleTab() {
            return internal(this).firstVisibleTab;
        }
        set firstVisibleTab(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (priv.firstVisibleTab !== newValue) {
                    priv.firstVisibleTab = newValue;
                }
            }
        }
        get lastVisibleTab() {
            return internal(this).lastVisibleTab;
        }
        set lastVisibleTab(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (priv.lastVisibleTab !== newValue) {
                    priv.lastVisibleTab = newValue;
                }
            }
        }
        get tabClass() {
            return internal(this).tabClass;
        }
        set tabClass(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.STRING) {
                if (priv.tabClass !== newValue) {
                    priv.tabClass = newValue;
                }
            }
        }
        get activeTab() {
            return internal(this).activeTab;
        }
        set activeTab(newValue) {
            const priv = internal(this);
            if (newValue instanceof Core.classes.Tab) {
                if (priv.activeTab !== newValue) {
                    priv.activeTab = newValue;
                    priv.activeTab.show();
                }
            }
        }
        get images() {
            return internal(this).images;
        }
        set images(newValue) {
            const priv = internal(this);
            if (newValue instanceof Core.classes.ImageList) {
                if (priv.images !== newValue) {
                    priv.images = newValue;
                }
            }
        }
        get canChange() {
            return internal(this).canChange;
        }
        set canChange(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (priv.canChange !== newValue) {
                    priv.canChange = newValue;
                }
            }
        }
        get showTabsCloseBtn() {
            return internal(this).showTabsCloseBtn;
        }
        set showTabsCloseBtn(newValue) {
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            if (typeof newValue === Types.CONSTANTS.BOOLEAN) {
                if (priv.showTabsCloseBtn !== newValue) {
                    priv.showTabsCloseBtn = newValue;
                    if (newValue) {
                        Css.addClass(htmlElement, "showTabsCloseBtn");
                    } else {
                        Css.removeClass(htmlElement, "showTabsCloseBtn");
                    }
                }
            }
        }
        get activeTabIndex() {
            return internal(this).tabs.indexOf(internal(this).activeTab);
        }
        set activeTabIndex(index) {
            const priv = internal(this);
            if (index >= 0 && index <= priv.tabs.length - 1) {
                priv.tabs[index].show();
                //if (this.tabsheets.indexOf(this.activeTab)<this.firstVisibleTab) this.updateTabs(Types.directions.LEFT);
                //if (this.tabsheets.indexOf(this.activeTab)>this.lastVisibleTab) this.updateTabs(Types.directions.RIGHT);
            }
        }
        get width() {
            return internal(this).width;
        }
        set width(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (priv.width !== newValue) {
                    priv.width = newValue;
                }
            }
        }
        get height() {
            return internal(this).height;
        }
        set height(newValue) {
            const priv = internal(this);
            if (typeof newValue === Types.CONSTANTS.NUMBER) {
                if (priv.height !== newValue) {
                    priv.height = newValue;
                }
            }
        }
        static get TABSTYLES() {
            return internal(this).tabStyles;
        }
        static get TABPOSITIONS() {
            return internal(this).tabPositions;
        }
        _tabPosition(newValue) {
            const priv = internal(this);
            const htmlElement = this.HTMLElement;
            if (Tools.valueInSet(newValue, _tabPositions)) {
                if (priv.tabPosition !== newValue) {
                    priv.tabPosition = newValue;
                    if (priv.tabPosition === _tabPositions.BOTTOM) {
                        Css.addClass(htmlElement, `${tabs}${priv.tabPosition.capitalise()}`);
                    } else {
                        Css.removeClass(htmlElement, "tabsBottom");
                    }
                }
            }
        }
        //#endregion
        //#region Methods
        changeActiveTab(tab) {
            if (tab !== this.activeTab) {
                tab.show();
            }
            //if (this.tabsheets.indexOf(this.activeTab)<=this.firstVisibleTab) this.updateTabs(Types.directions.LEFT);
            //if (this.tabsheets.indexOf(this.activeTab)>this.lastVisibleTab) this.updateTabs(Types.directions.RIGHT);
        }
        deleteTab(index) {
            const tabs = this.tabs;
            if (index >= 0 && index <= tabs.length - 1) {
                const tab = tabs[index];
                //this.tabContent.removeChild(tab._HTMLPage);
                // supprimer les controles de la page
                this._tab_Container.removeChild(tab.HTMLElement);
                tabs.removeAt(index);
                this.checkViewBtns();
            }
        }
        getTab(index) {
            const tabs = this.tabs;
            if (index >= 0 || index <= tabs.length - 1) {
                return tabs[index];
            }
        }
        newTab(caption) {
            const tabs = this.tabs;
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
            //tpl=Core.templates["Page"];
            //a=tpl.split("{theme}");
            //tpl=a.join(this.getThemeName());
            //a=tpl.split("{name}");
            //tpl=a.join(tab.name);
            //div.innerHTML=tpl;
            //tab._HTMLPage=div.firstElementChild;
            //CSS.addClass(tab._HTMLPage,"basecss");
            //this.tabContent.HTMLElement.appendChild(div.firstElementChild);
            this.changeActiveTab(tab);
            this.checkViewBtns();
            this.change();
        }
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
        moveTab(fromIndex, toIndex) {
            const tabs = this.tabs;
            const tabsContainer = this.tabs_Container;
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
        findNextTab(goForward, checkTabVisible) {
            const tabs = this.tabs;
            let startIndex = this.activeTabIndex;
            let result = null;
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
        selectNextTab(goForward, checkTabVisible) {
            const tab = this.findNextTab(goForward, checkTabVisible);
            if (tab && tab !== this.activeTab && this.canChange) {
                this.changeActiveTab(tab);
                this.change();
            }
        }
        change() {
            if (!this.updating) {
                this.onChange.invoke();
            }
        }
        getChildsHTMLElement() {
            const htmlElement = this.HTMLElement;
            const tabContent = this.tabContent;
            const btnLeft = this.btnLeft;
            const btnRight = this.btnRight;
            const tabs = this.tabs;
            if (htmlElement) {
                const tabsContainer = htmlElement.querySelector(".TabsContainer");
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
                btnLeft.getHTMLElement(htmlElement.querySelector(".TabControlLeftBtn").id);
                btnLeft.updateFromHTML();
                btnLeft.getChildsHTMLElement();
                btnRight.getHTMLElement(htmlElement.querySelector(".TabControlRightBtn").id);
                btnRight.updateFromHTML();
                btnRight.getChildsHTMLElement();
            }
            this.checkViewBtns();
            this.checkLastVisibleTab();
        }
        updateFromHTML() {
            super.updateFromHTML();
            //data = this.HTMLElement.dataset.activetab;
            //if (data) this.activeTab = this.form[data];
            //data = this.HTMLElement.dataset.tabsposition;
            //if (data) this.setTabPosition = data;
            //data = this.HTMLElement.dataset.showtabsclosebtn;
            //if (data) this.showTabsCloseBtn = Convert.strToBool(data);
            //if (this._tabPosition!==Types.tabPositions.TOP) CSS.addClass(this.HTMLElement,"tabs"+this._tabPosition.capitalise());
        }
        checkViewBtns() {
            const tabsContainer = this.tabs_Container;
            const btnRight = this.btnRight;
            const btnLeft = this.btnLeft;
            const htmlElement = this.HTMLElement;
            btnRight.enabled = (tabsContainer.scrollLeft < tabsContainer.scrollWidth - tabsContainer.offsetWidth);
            btnLeft.enabled = (tabsContainer.scrollLeft > 0);
            Css.removeClass(htmlElement, "noButtons");
            if (tabsContainer.scrollWidth <= tabsContainer.offsetWidth) {
                btnLeft.visible = false;
                btnRight.visible = false;
                Css.addClass(htmlElement, "noButtons");
            } else {
                btnLeft.visible = true;
                btnRight.visible = true;
            }
        }
        moveTabs() {
            const DIRECTIONS = Types.DIRECTIONS;
            let owner = this.owner;
            const tabsContainer = owner.tabs_Container;
            //enabled = Convert.strToBool(this.HTMLElement.dataset.enabled);
            //if (!enabled) return;
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
        scrollToTab(tab) {
            const tabsContainer = this.tabs_Container;
            const tw = tab.HTMLElement.offsetWidth;
            const tl = tab.HTMLElement.offsetLeft;
            const tcw = tabsContainer.offsetWidth;
            const tcsl = tabsContainer.scrollLeft;
            if (tl + tw - tcsl > tcw) {
                tabsContainer.scrollLeft += tl + tw - tcw;
            } else if (tl < tcsl) {
                tabsContainer.scrollLeft -= tcsl - tl;
            }
            this.checkViewBtns();
        }
        checkLastVisibleTab() {
            const tabs = this.tabs;
            let i = 0;
            const l = tabs.length;
            const tabsContainer = this.tabs_Container;
            const btnLeft = this.btnLeft;
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
        destroy() {
            this.tabs.destroy();
            this.onChange.destroy();
            super.destroy();
        }
        keyDown() {
            const DIRECTIONS = Types.DIRECTIONS;
            const VKEYSCODES = Keyboard.VKEYSCODES;
            const activeTab = this.activeTab;
            const tabs = this.tabs;
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
        getTabOrderList(list, children) {
            const tabList = this.tabContent.tabList;
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
        closeTab(tab) {
            tab.onClose.invoke();
            tab.hide();
            this.tabs.remove(tab);
            tab.destroy();
        }
        loaded() {
            super.loaded();
            this.checkViewBtns();
        }
        //#endregion
    }
    return CustomTabControl;
})();
Object.defineProperties(CustomTabControl, {
    "tabs": {
        enumerable: true
    },
    "tabClass": {
        enumerable: true
    },
    "activeTab": {
        enumerable: true
    },
    "images": {
        enumerable: true
    },
    "canChange": {
        enumerable: true
    },
    "showTabsCloseBtn": {
        enumerable: true
    },
    "activeTabIndex": {
        enumerable: true
    },
    "width": {
        enumerable: true
    },
    "height": {
        enumerable: true
    }
});
Object.seal(CustomTabControl);
//#endregion
Core.classes.register(Types.CATEGORIES.INTERNAL, CustomTabControl);
export { CustomTabControl };