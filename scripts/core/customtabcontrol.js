//#region Imports
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { Keyboard } from '/scripts/core/keyboard.js';
import { Mouse } from '/scripts/core/mouse.js';
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
class CustomTabControl extends ThemedControl {
    //#region Private fields
    #firstVisibleTab = 0;
    #lastVisibleTab = 0;
    #tabClass = null;
    #activeTab = null;
    #images = null;
    #canChange = !0;
    #showTabsCloseBtn = !1;
    #centerTabs = !1;
    #tabStyle;
    #tabPosition;
    #tabs = [];
    #btnLeft;
    #btnRight;
    #tabsContainer;
    #tabContent;
    #tabsHeader;
    //#endregion Private fields
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
            this.#tabClass = props.hasOwnProperty('tabClass') ? props.tabClass : Tab,
                this.#activeTab = props.hasOwnProperty('activeTab') ? props.activeTab : null,
                this.#showTabsCloseBtn = props.hasOwnProperty('showTabsCloseBtn') ? props.showTabsCloseBtn : !1,
                this.#centerTabs = props.hasOwnProperty('centerTabs') && core.tools.isBool(props.centerTabs)
                    ? props.centerTabs : !1;
            this.#tabStyle = props.hasOwnProperty('tabStyle') ? props.tabStyle : TABSTYLES.TABS;
            this.addPropertyEnum('tabStyle', TABSTYLES);
            this.#tabPosition = props.hasOwnProperty('tabPosition') ? props.tabPosition : TABPOSITIONS.TOP;
            this.addPropertyEnum('tabPosition', TABPOSITIONS);
            this.#tabs.convertToCollection(owner, Tab);
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
    //#region tabs
    get tabs() {
        return this.#tabs;
    }
    //#endregion tabs
    //#region tabStyle
    get tabStyle() {
        return this.#tabStyle;
    }
    set tabStyle(newValue) {
        core.tools.valueInSet(newValue, TABSTYLES) && this.#tabStyle !== newValue && (this.#tabStyle = newValue);
    }
    //#endregion tabStyle
    //#region tabPosition
    get tabPosition() {
        return this.#tabPosition;
    }
    set tabPosition(newValue) {
        core.tools.valueInSet(newValue, TABPOSITIONS) && this.#tabPosition !== newValue && (this.#tabPosition = newValue);
    }
    //#endregion tabPosition
    //#region centerTabs
    get centerTabs() {
        return this.#centerTabs;
    }
    set centerTabs(newValue) {
        this.#tabsContainer.classList.remove('center');
        core.tools.isBool(newValue) && this.#centerTabs !== newValue && (this.#centerTabs = newValue);
        this.checkTabsPosition();
    }
    //#endregion centerTabs
    //#region tabClass
    get tabClass() {
        return this.#tabClass;
    }
    set tabClass(newValue) {
        newValue instanceof Tab && this.#tabClass !== newValue && (this.#tabClass = newValue);
    }
    //#endregion tabClass
    //#region firstVisibleTab
    get firstVisibleTab() {
        return this.#firstVisibleTab;
    }
    set firstVisibleTab(newValue) {
        core.tools.isNumber(newValue) && this.#firstVisibleTab !== newValue && (this.#firstVisibleTab = newValue);
    }
    //#endregion firstVisibleTab
    //#region lastVisibleTab
    get lastVisibleTab() {
        return this.#lastVisibleTab;
    }
    set lastVisibleTab(newValue) {
        core.tools.isNumber(newValue) && this.#lastVisibleTab !== newValue && (this.#lastVisibleTab = newValue);
    }
    //#endregion lastVisibleTab
    //#region activeTab
    get activeTab() {
        return this.#activeTab;
    }
    set activeTab(newValue) {
        if (newValue instanceof Tab && this.#activeTab !== newValue) {
            this.#activeTab = newValue;
            this.#activeTab.show();
            this.propertyChanged('activeTab');
        }
    }
    //#endregion activeTab
    //#region images
    get images() {
        return this.#images;
    }
    set images(newValue) {
        newValue instanceof core.classes.ImageList && this.#images !== newValue && (this.#images = newValue);
    }
    //#endregion images
    //#region canChange
    get canChange() {
        return this.#canChange;
    }
    set canChange(newValue) {
        core.tools.isBool(newValue) && this.#canChange !== newValue && (this.#canChange = newValue);
    }
    //#endregion canChange
    //#region showTabsCloseBtn
    get showTabsCloseBtn() {
        return this.#showTabsCloseBtn;
    }
    set showTabsCloseBtn(newValue) {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && this.#showTabsCloseBtn !== newValue) {
            this.#showTabsCloseBtn = newValue;
            newValue
                ? htmlElement.classList.add('showTabsCloseBtn')
                : htmlElement.classList.remove('showTabsCloseBtn');
        }
    }
    //#endregion showTabsCloseBtn
    //#region activeTabIndex
    get activeTabIndex() {
        return this.#tabs.indexOf(this.#activeTab);
    }
    set activeTabIndex(index) {
        index >= 0 && index <= this.#tabs.length - 1 && this.#tabs[index].show();
        this.propertyChanged('activeTabIndex');
    }
    //#endregion activeTabIndex
    //#endregion Getters / Setters
    //#region Methods
    //#region checkTabsPosition
    checkTabsPosition() {
        this.#centerTabs && !this.#btnLeft.visible && !this.#btnRight.visible
            && this.#tabsContainer.classList.add('center');
    }
    //#endregion checkTabsPosition
    //#region tabPosition
    tabPosition(newValue) {
        //#region Variables déclaration
        const htmlElement = this.HTMLElement;
        //#endregion Variables déclaration
        if (core.tools.valueInSet(newValue, TABPOSITIONS)) {
            if (this.#tabPosition !== newValue) {
                this.#tabPosition = newValue;
                newValue === TABPOSITIONS.BOTTOM
                    ? htmlElement.classList.add(`tabs${newValue.capitalise()}`)
                    : htmlElement.classList.remove('tabsBottom');
            }
        }
    }
    //#endregion tabPosition
    //#region changeActiveTab
    changeActiveTab(tab) {
        tab !== this.#activeTab && tab.show();
        //if (this.tabsheets.indexOf(this.activeTab)<=this.firstVisibleTab) this.updateTabs(core.types.directions.LEFT);
        //if (this.tabsheets.indexOf(this.activeTab)>this.lastVisibleTab) this.updateTabs(core.types.directions.RIGHT);
    }
    //#endregion changeActiveTab
    //#region deleteTab
    deleteTab(index) {
        //#region Variables déclaration
        const tabs = this.#tabs;
        //#endregion Variables déclaration
        if (index >= 0 && index <= tabs.length - 1) {
            const tab = tabs[index];
            //this.tabContent.removeChild(tab._HTMLPage);
            // supprimer les controles de la page
            this.#tabsContainer.removeChild(tab.HTMLElement);
            tabs.removeAt(index);
            this.checkViewBtns();
        }
    }
    //#endregion deleteTab
    //#region getTab
    getTab(index) {
        //#region Variables déclaration
        const tabs = this.#tabs;
        //#endregion Variables déclaration
        if (index >= 0 || index <= tabs.length - 1) {
            return tabs[index];
        }
    }
    //#endregion getTab
    //#region newTab
    newTab(caption) {
        //#region Variables déclaration
        const tabs = this.#tabs;
        //#endregion Variables déclaration
        !caption && (caption = `tab${tabs.length + 1}`);
        const tab = core.classes.createComponent({
            class: core.classes.Tab,
            owner: this,
            name: caption.firstCharUpper(),
            props: {
                parentHTML: this.#tabsContainer,
                caption: caption
            },
            withTpl: !0
        });
        this.#tabs = [...this.#tabs, tab];
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
        const tabs = this.#tabs;
        const tabsContainer = this.#tabsContainer;
        //#endregion Variables déclaration
        if (fromIndex >= 0 && fromIndex <= tabs.length - 1 &&
            toIndex >= 0 && toIndex <= tabs.length - 1) {
            const curTab = this.getTab(fromIndex);
            tabs.splice(fromIndex, 1);
            tabs.splice(toIndex, 0, curTab);
            curTab.HTMLElement.remove();
            toIndex++;
            toIndex > tabs.length - 1
                ? tabsContainer.insertBefore(curTab.HTMLElement, this.#tabContent)
                : tabsContainer.insertBefore(curTab.HTMLElement, this.getTab(toIndex).HTMLElement);
            this.change();
        }
    }
    //#endregion moveTab
    //#region findNextTab
    findNextTab(goForward, checkTabVisible) {
        //#region Variables déclaration
        const tabs = this.#tabs;
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
        const tab = this.findNextTab(goForward, checkTabVisible);
        //#endregion Variables déclaration
        if (tab && tab !== this.#activeTab && this.canChange) {
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
        const tabs = this.#tabs;
        //#endregion Variables déclaration
        super.getHTMLElement(id);
        const htmlElement = this.HTMLElement;
        if (htmlElement) {
            this.#tabsHeader = htmlElement.querySelector('.TabControlHeader');
            this.#tabsContainer = htmlElement.querySelector('.TabsContainer');
            this.#tabsContainer.addEventListener(core.types.HTMLEVENTS.WHEEL, event => { this.wheel(event); });
            this.#tabsContainer.jsObj = this;
            const nodes = this.#tabsContainer.childNodes;
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
                        //node.jsObj = tab;
                        tabs.push(tab);
                        tab.name === this.#activeTab && (this.#activeTab = tab);
                    }
                }
            });
        }
    }
    //#endregion getChildsHTMLElement
    //#region checkViewBtns
    checkViewBtns() {
        //#region Variables déclaration
        const tabsContainer = this.#tabsContainer;
        const btnRight = this.#btnRight;
        const btnLeft = this.#btnLeft;
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
        switch (this.direction) {
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
        const tabsContainer = this.#tabsContainer;
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
        const tabs = this.#tabs;
        let i = 0;
        const l = tabs.length;
        const tabsContainer = this.#tabsContainer;
        const btnLeft = this.#btnLeft;
        //#endregion Variables déclaration
        this.#lastVisibleTab = -1;
        for (i = this.#firstVisibleTab; i < l; i++) {
            if (tabs[i].HTMLElement.offsetLeft + tabs[i].HTMLElement.offsetWidth + tabsContainer.offsetLeft > btnLeft.offsetLeft) {
                this.#lastVisibleTab = i - 1;
                break;
            }
        }
        this.#lastVisibleTab === -1 && (this.#lastVisibleTab = tabs.length - 1);
    }
    //#endregion checkLastVisibleTab
    //#region destroy
    destroy() {
        this.#tabs.destroy();
        this.#tabs.clear();
        this.#tabs = null;
        this.unBindAndDestroyEvents(['onChange']);
        super.destroy();
    }
    //#endregion destroy
    //#region keyDown
    keyDown() {
        //#region Variables déclaration
        const DIRECTIONS = core.types.DIRECTIONS;
        const VKEYSCODES = Keyboard.VKEYSCODES;
        const activeTab = this.#activeTab;
        const tabs = this.#tabs;
        //#endregion Variables déclaration
        super.keyDown();
        switch (core.keyboard.key) {
            case VKEYSCODES.VK_LEFT:
                if (activeTab === tabs.first) {
                    return;
                }
                this.selectNextTab(!1, !0);
                tabs.indexOf(activeTab) < this.#firstVisibleTab && this.updateTabs(DIRECTIONS.LEFT);
                break;
            case VKEYSCODES.VK_RIGHT:
                if (activeTab === tabs.last) {
                    return;
                }
                this.selectNextTab(!0, !0);
                tabs.indexOf(activeTab) > this.#lastVisibleTab && this.updateTabs(DIRECTIONS.RIGHT);
                break;
        }
    }
    //#endregion keyDown
    //#region getTabOrderList
    getTabOrderList(list, children) {
        //#region Variables déclaration
        const tabList = this.#tabContent.tabList;
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
        tab.onClose.invoke();
        tab.hide();
        this.#tabs.remove(tab);
        tab.destroy();
    }
    //#endregion closeTab
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const DIRECTIONS = core.types.DIRECTIONS;
        let btnLeft, btnRight;
        //#endregion Variables déclaration
        super.loaded();
        btnLeft = core.classes.createComponent({
            class: core.classes.Button,
            owner: this,
            props: {
                inForm: !1,
                parentHTML: this.#tabsHeader,
                cssClasses: 'TabControlLeftBtn',
                canFocused: !1,
                caption: String.EMPTY
            }
        });
        btnLeft.direction = DIRECTIONS.LEFT;
        btnLeft.tabsContainer = this.#tabsContainer;
        btnLeft.onClick.addListener(this.moveTabs);
        btnRight = core.classes.createComponent({
            class: core.classes.Button,
            owner: this,
            props: {
                inForm: !1,
                parentHTML: this.#tabsHeader,
                cssClasses: 'TabControlRightBtn',
                canFocused: !1,
                caption: String.EMPTY
            }
        });
        btnRight.direction = DIRECTIONS.RIGHT;
        btnRight.tabsContainer = this.#tabsContainer;
        btnRight.onClick.addListener(this.moveTabs);
        this.#btnLeft = btnLeft;
        this.#btnRight = btnRight;;
        this.checkViewBtns();
        this.checkLastVisibleTab();
        this.checkTabsPosition();
    }
    //#endregion loaded
    //#region wheel
    wheel(event) {
        core.mouse.getMouseInfos(event);
        core.mouse.preventDefault(event);
        this.setFocus();
        this.selectNextTab(core.mouse.wheelDir === Mouse.MOUSEWHEELDIRS.DOWN, !0);
    }
    //#endregion wheel
    //#endregion Methods
}
Object.seal(CustomTabControl);
Object.defineProperties(CustomTabControl.prototype, {
    'tabClass': {
        enumerable: !0
    },
    'images': {
        enumerable: !0
    },
    'showTabsCloseBtn': {
        enumerable: !0
    },
    'centerTabs': {
        enumerable: !0
    },
    'tabStyle': {
        enumerable: !0
    },
    'tabPosition': {
        enumerable: !0
    }
});
core.classes.register(core.types.CATEGORIES.INTERNAL, CustomTabControl);
//#endregion CustomTabControl
export { CustomTabControl };