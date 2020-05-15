//#region Import
import { ScrollControl } from '/scripts/core/scrollcontrol.js';
import { BaseClass } from '/scripts/core/baseclass.js';
import { Events, NotifyEvent } from '/scripts/core/events.js';
import { Mouse } from '/scripts/core/mouse.js';
import { Keyboard } from '/scripts/core/keyboard.js';
import { Tools } from '/scripts/core/tools.js';
import { Point } from '/scripts/core/geometry.js';
import { Checkbox } from '/scripts/components/common/checkbox.js';
//#endregion Import
//#region TreeViewItem
const TreeViewItem = (() => {
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
    //#region Class CustomButton
    class TreeViewItem extends BaseClass {
        //#region constructor
        constructor(owner, props) {
            //#region Variables déclaration
            //#endregion Variables déclaration
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
                priv.owner = owner;
                priv.parentNodes = [];
                priv.html = null;
                priv.root = null;
                priv.icon = null;
                priv.check = null;
                priv.text = null;
                priv.level = 0;
                priv.checkedChildsNb = 0;
                priv.order = null;
                priv.stopEvent = !0;
                priv.props = {};
                priv.caption = props.hasOwnProperty('caption') ? props.caption : String.EMPTY;
                priv.text = null;
                priv.height = props.hasOwnProperty('height') ? props.height : owner.itemsHeight;
                priv.isChecked = props.hasOwnProperty('isChecked') && Tools.isBool(props.isChecked) ? props.isChecked : !1;
                Tools.addPropertyFromEnum({
                    component: this,
                    propName: 'state',
                    enum: Checkbox.CHECKBOXSTATES,
                    forceUpdate: !0,
                    variable: priv,
                    value: props.hasOwnProperty('state') ? props.state : Checkbox.CHECKBOXSTATES.UNCHECKED
                });
                priv.allowGrayed = props.hasOwnProperty('allowGrayed') && Tools.isBool(props.allowGrayed) ? props.allowGrayed : !1;
                priv.enabled = props.hasOwnProperty('enabled') && Tools.isBool(props.enabled) ? props.enabled : !0;
                priv.expanded = props.hasOwnProperty('expanded') && Tools.isBool(props.expanded) ? props.expanded : !1;
                priv.form = owner.form;
                priv.selected = props.hasOwnProperty('selected') && Tools.isBool(props.selected) ? props.selected : !1;
                priv.visible = props.hasOwnProperty('enabled') && Tools.isBool(props.enabled) ? props.enabled : !0;
                priv.imageIndex = props.hasOwnProperty('imageIndex') && Tools.isNumber(props.imageIndex) ? props.imageIndex : -1;
                priv.image = props.hasOwnProperty('image') ? props.image : String.EMPTY;
                priv.cssImage = props.hasOwnProperty('cssImage') ? props.cssImage : String.EMPTY;
                priv.items = [];
                priv.css = String.EMPTY;
                priv.hitTest = { mouseWheel: !0 };
                priv.onlyRootExpand = props.hasOwnProperty('onlyRootExpand') && Tools.isBool(props.onlyRootExpand) ? props.onlyRootExpand : !0;
                owner.items.push(this);
                if (parentNode) {
                    priv.parentNodes.push.apply(priv.parentNodes, parentNode.parentNodes);
                    priv.parentNodes.push(parentNode);
                    priv.level = parentNode.level + 1;
                    lastItem = parentNode.items.last;
                    if (!lastItem) {
                        lastItem = owner.items.last;
                    }
                    //if (lastItem) {
                    //    priv.top = lastItem.top + lastItem.height;
                    //}
                    parentNode.items.push(this);
                    priv.order = parentNode.order + parentNode.items.indexOf(this).toString();
                } else {
                    priv.order = owner.items.indexOf(this).toString();
                }
                if (owner.allowUpdate) {
                    //owner.updateVScrollBar();
                    owner.draw();
                }
                this.onClick = new NotifyEvent(this);
                this.onDblClick = new NotifyEvent(this);
                this.onDraw = new NotifyEvent(this);
                this.onDestroy = new NotifyEvent(this);
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#region onlyRootExpand
        get onlyRootExpand() {
            return internal(this).onlyRootExpand;
        }
        set onlyRootExpand(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.onlyRootExpand !== newValue) {
                    priv.onlyRootExpand = newValue;
                    this.update();
                }
            }
        }
        //#endregion onlyRootExpand
        //#region isChecked
        get isChecked() {
            return internal(this).isChecked;
        }
        set isChecked(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            const checkboxStates = Checkbox.CHECKBOXSTATES;
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.isChecked !== newValue) {
                    priv.isChecked = newValue;
                    if (priv.isChecked) {
                        priv.state = checkboxStates.CHECKED;
                    } else {
                        priv.state = checkboxStates.UNCHECKED;
                    }
                    this.update();
                    this.updateChildsCheck(priv.isChecked);
                    this.updateParentCheck(priv.isChecked);
                }
            }
        }
        //#endregion isChecked
        //#region enabled
        get enabled() {
            return internal(this).enabled;
        }
        set enabled(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (priv.enabled !== newValue) {
                    priv.enabled = newValue;
                    this.update();
                }
            }
        }
        //#endregion enabled
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
                    priv.owner.refreshInnerHeight();
                }
            }
        }
        //#endregion height
        //#region caption
        get caption() {
            return internal(this).caption;
        }
        set caption(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (priv.caption !== newValue) {
                    priv.caption = newValue;
                    this.update();
                }
            }
        }
        //#endregion caption
        //#region selected
        get selected() {
            return internal(this).selected;
        }
        set selected(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isBool(newValue)) {
                if (!priv.isHeader && priv.enabled) {
                    if (priv.selected !== newValue) {
                        priv.selected = newValue;
                        this.update();
                    }
                }
            }
        }
        //#endregion selected
        get expanded() {
            return internal(this).expanded;
        }
        set expanded(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.expanded = !priv.expanded;
            priv.items.forEach(item => {
                item.visible = priv.expanded;
                item.level = priv.level + 1;
                if (item.html) {
                    item.removeToHTML();
                }
                this.items[i].updateDataSet();
            });
            //this.updateDataSet();
            if (priv.owner.itemIndex > -1) {
                const item = priv.owner.items[priv.owner.itemIndex];
                for (let i = item.parentNodes.length - 1; i >= 0; i--) {
                    if (item.parentNodes[i] === this) {
                        priv.owner.itemIndex = priv.index;
                        break;
                    }
                }
            }
            priv.owner.refreshInnerSize();
        }
        //#region imageIndex
        get imageIndex() {
            return internal(this).imageIndex;
        }
        set imageIndex(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isNumber(newValue)) {
                if (priv.imageIndex !== newValue) {
                    priv.imageIndex = newValue;
                    if (priv.owner.allowUpdate) {
                        this.update();
                    }
                }
            }
        }
        //#endregion imageIndex
        //#region cssImage
        get cssImage() {
            return internal(this).cssImage;
        }
        set cssImage(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (priv.cssImage !== newValue) {
                    priv.cssImage = newValue;
                    if (priv.owner.allowUpdate) {
                        this.update();
                    }
                }
            }
        }
        //#endregion cssImage
        //#region image
        get image() {
            return internal(this).image;
        }
        set image(newValue) {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (Tools.isString(newValue)) {
                if (priv.image !== newValue) {
                    priv.image = newValue;
                    if (priv.owner.allowUpdate) {
                        this.update();
                    }
                }
            }
        }
        //#endregion image
        //#region index
        get index() {
            return internal(this).owner.items.indexOf(this);
        }
        //#endregion index
        //#region enabled
        get enabled() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            return priv.enabled && priv.owner.isEnabled;
        }
        //#endregion enabled
        //#region visible
        get visible() {
            //#region Variables déclaration
            let ret = !0;
            //#endregion Variables déclaration
            for (let i = priv.parentNodes.length - 1; i >= 0; i--) {
                if (!priv.parentNodes[i].expanded) {
                    ret = !1;
                    break;
                }
            }
            return ret && priv.visible;
        }
        //#endregion visible
        //#region expanded
        get expanded() {
            return internal(this).expanded;
        }
        //#endregion expanded
        //#region owner
        get owner() {
            return internal(this).owner;
        }
        //#endregion owner
        //#region asChilds
        get asChilds() {
            return internal(this).items.length > 0;
        }
        //#endregion asChilds
        //#region isEnabled
        get isEnabled() {
            return internal(this).owner.enabled;
        }
        //#endregion isEnabled
        //#endregion Getters / Setters
        //#region Methods
        //#region mouseUp
        mouseUp() {
            internal(this).owner.mouseUp();
        }
        //#endregion mouseUp
        update() {
            //#region Variables déclaration
            const priv = internal(this);
            const PX = Types.CSSUNITS.PX;
            const prop = 'Height';
            const propPos = 'top';
            //#endregion Variables déclaration
            if (priv.html) {
                priv.html.style[`min${prop}`] = `${priv.size}${PX}`;
                priv.html.style[`max${prop}`] = `${priv.size}${PX}`;
                priv.html.style[`${prop.toLowerCase()}`] = `${priv.size}${PX}`;
                if (priv.owner.scrollMode === ScrollControl.SCROLLMODES.VIRTUAL) {
                    priv.html.style[propPos] = `${priv.pos}${PX}`;
                    priv.html.style.position = 'absolute';
                } else {
                    priv.html.style.position = 'static';
                }
                priv.html.classList.remove('disabled', 'TVIHasChild', 'selected');
                if (priv.items.length > 0) {
                    priv.root.classList.add('TVIHasChild');
                    //if (priv.onlyRootExpand) {
                    //    $j.tools.events.bind(this._root, $j.types.mouseEvents.UP, this.expandCollapse);
                    //} else {
                    //    $j.tools.events.bind(this._html, $j.types.mouseEvents.UP, this.expandCollapse);
                    //}
                }
                if (priv.owner.viewCheckboxes) {
                    priv.check.classList.remove('grayed', 'checked');
                    if (priv.check) {
                        priv.check.classList.remove('checked');
                    }
                    if (priv.isChecked) {
                        priv.check.classList.add('checked');
                    } else if (priv.allowGrayed && priv.state === Types.CHECKBOXSTATES.GRAYED) {
                        priv.check.classList.add('grayed');
                    }
                }
                if (!priv.enabled) {
                    priv.html.classList.add('disabled');
                }
                if (priv.selected) {
                    priv.html.classList.add('selected');
                }
                if (!priv.parentNodes.isEmpty) {
                    priv.html.classList.add('isChild');
                }
                priv.root.classList.remvoe('expanded');
                if (priv.expanded) {
                    priv.root.classList.add('expanded');
                }
                if (priv.icon) {
                    priv.icon.classList.add('icon');
                    if (!String.isNullOrEmpty(priv.cssImage)) {
                        priv.icon.classList.add(priv.cssImage);
                        priv.icon.style.backgroundSize = `${priv.size}${PX} ${priv.size}${PX}`;
                    } else if (!String.isNullOrEmpty(priv.image)) {
                        priv.icon.style.backgroundImage = `url(${priv.image})`;
                        priv.icon.style.backgroundSize = `${priv.size}${PX} ${priv.size}${PX}`;
                    } else if (priv.owner.images) {
                        if (priv.imageIndex < priv.owner.images.images.length && priv.imageIndex > -1) {
                            priv.icon.style.backgroundImage = `url(${priv.owner.images.images[priv.imageIndex]})`;
                            priv.icon.style.backgroundSize = `${priv.owner.images.imageWidth}${PX} ${priv.owner.images.imageHeight}${PX}`;
                        }
                    }
                }
            }
        }
        draw() {
            //var span;
            //if (!this._html) {
            //    this._html = $j.doc.createElement($j.types.HTMLElements.DIV);
            //    this._root = $j.doc.createElement($j.types.HTMLElements.DIV);
            //    this._root.jsObj = this;
            //    this._html.appendChild(this._root);
            //    //$j.tools.events.unBind(this._html,$j.types.mouseEvents.CLICK,this.click);
            //    $j.tools.events.bind(this._html, $j.types.mouseEvents.CLICK, this.click);
            //    //$j.tools.events.bind(this._html,$j.types.mouseEvents.DBLCLICK,this.dblClick);
            //    $j.CSS.addClass(this._root, "TreeViewRoot Control");
            //    this._root.style.height = this.height + $j.types.CSSUnits.PX;
            //    this._root.style.lineHeight = this.height + $j.types.CSSUnits.PX;
            //    if (this._owner.viewCheckboxes) {
            //        this._check = $j.doc.createElement($j.types.HTMLElements.DIV);
            //        this._check.jsObj = this;
            //        $j.CSS.addClass(this._check, "CheckboxCheck" + String.SPACE + this._owner.getThemeName() + String.SPACE /+ /"Control");
            //        this._html.appendChild(this._check);
            //    }
            //    if (this._owner.images || this.image !== String.EMPTY || this.cssImage !== String.EMPTY) {
            //        this._icon = $j.doc.createElement($j.types.HTMLElements.DIV);
            //        this._icon.jsObj = this;
            //        this._html.appendChild(this._icon);
            //        this._icon.style.height = this.height + $j.types.CSSUnits.PX;
            //        this._icon.style.lineHeight = this.height + $j.types.CSSUnits.PX;
            //    }
            //    this._text = $j.doc.createElement($j.types.HTMLElements.SPAN);
            //    this._html.dataset.theme = this._owner.getThemeName();
            //    $j.CSS.addClass(this._html, this._owner.getThemeName());
            //    this._html.appendChild(this._text);
            //    this._text.innerHTML = this.text;
            //    this._text.style.height = this.height + $j.types.CSSUnits.PX;
            //    this._text.style.lineHeight = this.height + $j.types.CSSUnits.PX;
            //    this._html.jsObj = this;
            //    $j.CSS.addClass(this._html, this._ClassName + String.SPACE + "Control");
            //    $j.CSS.addClass(this._html, this._owner._ClassName[0] + this._ClassName);
            //    if (!this._parentNodes.isEmpty()) $j.CSS.addClass(this._html, "isChild");
            //    this._owner._content.appendChild(this._html);
            //}
            //if (this._level > 0) {
            //    this._root.style.marginLeft = (this._level * this._owner._offsetLevel) + $j.types.CSSUnits.PX;
            //}
            //this._html.style.transform = "translateY(" + (this._top - this._owner._scrollTop) + $j.types.CSSUnits.PX + ")";
            //this._html.style.height = this.height + $j.types.CSSUnits.PX;
            //$j.CSS.addClass(this._html, this.cssClass);
            //this.update();
            //this.onDraw.invoke(this._html);
        }
        updateChildsCheck(checked) {
            //var item;
            //if (this.items.length > 0) {
            //    for (var i = 0, l = this.items.length; i < l; i++) {
            //        item = this.items[i];
            //        item.isChecked = checked;
            //        if (item._html) {
            //            $j.CSS.removeClass(item._check, "checked");
            //            $j.CSS.removeClass(item._check, "grayed");
            //        }
            //        if (checked) {
            //            item.state = $j.types.checkboxStates.CHECKED;
            //            if (item._html) $j.CSS.addClass(item._check, "checked");
            //        } else {
            //            item.state = $j.types.checkboxStates.UNCHECKED;
            //            if (item._html) $j.CSS.removeClass(item._check, "checked");
            //        }
            //        item.updateDataSet();
            //        item.updateChildsCheck(checked);
            //    }
            //}
        }
        updateParentCheck() {
            //var nbs = 0, p;
            //for (var i = this._parentNodes.length - 1; i >= 0; i--) {
            //    p = this._parentNodes[i];
            //    nbs = p.getNbCheckedChilds();
            //    p.isChecked = false;
            //    if (p._html) {
            //        $j.CSS.removeClass(p._check, "checked");
            //        $j.CSS.removeClass(p._check, "grayed");
            //    }
            //    if (nbs.nbChecked === p.items.length) {
            //        p.state = $j.types.checkboxStates.CHECKED;
            //        p.isChecked = true;
            //        if (p._html) $j.CSS.addClass(p._check, "checked");
            //    } else if (nbs.nbChecked + nbs.nbGrayed !== 0) {
            //        p.state = $j.types.checkboxStates.GRAYED;
            //        if (p._html) $j.CSS.addClass(p._check, "grayed");
            //    }
            //    else if (nbs.nbChecked + nbs.nbGrayed === 0) p.state = $j.types.checkboxStates.UNCHECKED;
            //    p.updateDataSet();
            //}
        }
        getNbCheckedChilds() {
            //var nbC = 0, nbG = 0, item;
            //for (var i = 0, l = this.items.length; i < l; i++) {
            //    item = this.items[i];
            //    if (item.isChecked) nbC++;
            //    else if (item.state === $j.types.checkboxStates.GRAYED) nbG++;
            //}
            //return { "nbChecked": nbC, "nbGrayed": nbG };
        }
        removeToHTML() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            if (priv.html) {
                //$j.tools.events.unBind(this._html, $j.types.mouseEvents.DOWN, this._owner.selectItem);
                //$j.tools.events.unBind(this._html, $j.types.mouseEvents.CLICK, this.click);
                //$j.tools.events.unBind(this._html,$j.types.mouseEvents.DBLCLICK,this.dblClick);
                //$j.tools.events.unBind(this._check, $j.types.mouseEvents.DOWN, this.checkUnCheck);
                priv.html.parentNode.removeChild(priv.html);
                priv.html = null;
                priv.root = null;
                if (priv.icon) {
                    priv.html.removeChild(priv.icon);
                }
                priv.html.removeChild(priv.text);
                priv.owner.HTMLElement.removeChild(priv.html);
                priv.icon = null;
                priv.check = null;
                priv.text = null;
                priv.checkbox = null;
            }
        }
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            this.onDestroy.invoke();
            this.removeToHTML();
            priv.owner.items.remove(this);
            priv.owner = null;
            priv.level = null;
            priv.checkedChildsNb = null;
            priv.text = null;
            priv.caption = null;
            priv.height = null;
            priv.isChecked = null;
            priv.state = null;
            priv.allowGrayed = null;
            priv.enabled = null;
            priv.expanded = null;
            priv.form = null;
            priv.selected = null;
            priv.visible = null;
            priv.items = null;
            priv.hitTest = null;
            priv.parentNodes.destroy();
            priv.parentNodes = null;
            priv.level = null;
            priv.order = null;
            priv.imageIndex = null;
            priv.image = null;
            priv.cssImage = null;
            this.onClick.destroy();
            this.onClick = null;
            this.onDblClick.destroy();
            this.onDblClick = null;
            //this.onDraw.destroy();
            //this.onDraw = null;
            this.onDestroy.destroy();
            this.onDestroy = null;
            super.destroy();
        }
        click() {
            //if (!this.enabled) return;
            //this.onClick.invoke();
        }
        dblClick() {
            //if (!this.enabled) return;
            //this.onDblClick.invoke();
        }
        //#region clone
        clone() {
            return Object.create(this);
        }
        //#endregion clone
        //#endregion Methods
    }
    return TreeViewItem;
    //#endregion TreeViewItem
})();
//#endregion TreeViewItem
//#region TreeView
const TreeView = (() => {
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
    //#region Class TreeView
    class TreeView extends ScrollControl {
        //#region constructor
        constructor(owner, props) {
            props = !props ? {} : props;
            if (owner) {
                super(owner, props);
                const priv = internal(this);
            }
        }
        //#endregion constructor
        //#region Getters / Setters
        //#endregion Getters / Setters
        //#region Methods
        //#endregion Methods
    }
    return TreeView;
    //#endregion TreeView
})();
//#endregion TreeView
Object.seal(TreeView);
Core.classes.register(Types.CATEGORIES.INTERNAL, TreeViewItem);
Core.classes.register(Types.CATEGORIES.COMMON, TreeView);
//#region Templates
if (Core.isHTMLRenderer) {
    const TreeViewTpl = ['<jagui-treeview id="{internalId}" data-class="TreeView" class="Control scrollContent TreeView {theme}">',
        '</jagui-treeview>'].join(String.EMPTY);
    Core.classes.registerTemplates([{ Class: TreeView, template: TreeViewTpl }]);
}
//#endregion
export { TreeViewItem, TreeView };
/*(function () {
    //#region TreeViewItem
    var TreeViewItem = Class.extend("TreeViewItem", {
        init: function (owner, parentNode) {
            var lastItem;
            if (owner) {
                //#region Private
                this._owner = owner;
                this._parentNodes = [];
                this._html = null;
                this._root = null;
                this._icon = null;
                this._check = null;
                this._text = null;
                this._left = 0;
                this._top = 0;
                this._level = 0;
                this._checkedChildsNb = 0;
                this._order = null;
                this._stopEvent = true;
                //#endregion
                this.text = String.EMPTY;
                this.height = owner.itemsHeight;
                this.isChecked = false;
                $j.tools.addPropertyFromSet(this, "state", $j.types.checkboxStates, $j.types.checkboxStates.UNCHECKED);
                this.allowGrayed = false;
                this.enabled = true;
                this.expanded = false;
                this.form = owner.form;
                this.selected = false;
                this.visible = true;
                this.imageIndex = -1;
                this.image = String.EMPTY;
                this.cssImage = String.EMPTY;
                this.items = [];
                this.cssClass = String.EMPTY;
                this.hitTest = { mouseWheel: true };
                this.onlyRootExpand = true;
                owner.items.push(this);
                if (parentNode) {
                    this._parentNodes.push.apply(this._parentNodes, parentNode._parentNodes);
                    this._parentNodes.push(parentNode);
                    this._level = parentNode._level + 1;
                    lastItem = parentNode.items.last();
                    if (!lastItem) lastItem = owner.items.last();
                    if (lastItem) this._top = lastItem._top + lastItem.height;
                    parentNode.items.push(this);
                    this._order = parentNode._order + _conv.intToStr(parentNode.items.indexOf(this));
                } else this._order = _conv.intToStr(owner.items.indexOf(this));
                if (owner._allowUpdate) {
                    owner.updateVScrollBar();
                    owner.draw();
                }
                this.onClick = new $j.classes.NotifyEvent(this);
                this.onDblClick = new $j.classes.NotifyEvent(this);
                this.onDraw = new $j.classes.NotifyEvent(this);
                this.onDestroy = new $j.classes.NotifyEvent(this);
            }
        },
        //#region Setters
        setOnlyRootExpand: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.onlyRootExpand !== newValue) {
                this.onlyRootExpand = newValue;
                this.update();
            }
        },
        setIsChecked: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.isChecked !== newValue) {
                this.isChecked = newValue;
                if (this.isChecked) this.state = $j.types.checkboxStates.CHECKED;
                else this.state = $j.types.checkboxStates.UNCHECKED;
                this.update();
                this.updateChildsCheck(this.isChecked);
                this.updateParentCheck(this.isChecked);
            }
        },
        setEnabled: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.enabled !== newValue) {
                this.enabled = newValue;
                this.update();
            }
        },
        setHeight: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.height !== newValue) {
                this.height = newValue;
                this._owner.refreshInnerHeight();
            }
        },
        setText: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.text !== newValue) {
                this.text = newValue;
                this.update();
            }
        },
        setSelected: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (!this.enabled) return;
            if (this.selected !== newValue) {
                this.selected = newValue;
                this.update();
            }
        },
        setExpanded: function () {
            var i, l;
            if (this.expanded) this.expanded = false;
            else this.expanded = true;
            for (i = 0, l = this.items.length; i < l; i++) {
                this.items[i].visible = this.expanded;
                this.items[i]._level = this._level + 1;
                if (this.items[i]._html) {
                    this.items[i].removeToHTML();
                }
                this.items[i].updateDataSet();
            }
            this.updateDataSet();
            if (this._owner.itemIndex > -1) {
                var item = this._owner.items[this._owner.itemIndex], i;
                for (i = item._parentNodes.length - 1; i >= 0; i--) {
                    if (item._parentNodes[i] === this) {
                        this._owner.setItemIndex(this.getIndex());
                        break;
                    }
                }
            }
            this._owner.refreshInnerHeight();
        },
        setImageIndex: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.imageIndex !== newValue) {
                this.imageIndex = newValue;
                if (this._owner._allowUpdate) {
                    this.update();
                }
            }
        },
        setCssImage: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.cssImage !== newValue) {
                this.cssImage = newValue;
                if (this._owner._allowUpdate) this.update();
            }
        },
        setImage: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.image !== newValue) {
                this.image = newValue;
                if (this._owner._allowUpdate) this.update();
            }
        },
        //#endregion
        //#region Methods
        expandCollapse: function (event) {
            var jsObj = this.jsObj;
            jsObj.setExpanded();
        },
        checkUnCheck: function () {
            var jsObj = this.jsObj;
            if (!jsObj.enabled) return;
            jsObj.setIsChecked(!jsObj.isChecked);
        },
        mouseMove: function () {
            this._owner.mouseMove();
        },
        mouseEnter: $j.tools.emptyFunc,
        mouseLeave: $j.tools.emptyFunc,
        mouseDown: function () {
            this._owner.mouseDown();
        },
        mouseUp: function () {
            this._owner.mouseUp();
        },
        mouseWheel: function () {
            this._owner._VScrollBar.mouseWheel();
        },
        update: function () {
            if (this._html) {
                $j.CSS.removeClass(this._html, "disabled");
                $j.CSS.removeClass(this._html, "selected");
                $j.CSS.removeClass(this._root, "TVIHasChild");
                $j.tools.events.unBind(this._root, $j.types.mouseEvents.UP, this.expandCollapse);
                $j.tools.events.unBind(this._html, $j.types.mouseEvents.UP, this.expandCollapse);
                if (this.items.length > 0) {
                    $j.CSS.addClass(this._root, "TVIHasChild");
                    if (this.onlyRootExpand) $j.tools.events.bind(this._root, $j.types.mouseEvents.UP, this.expandCollapse);
                    else $j.tools.events.bind(this._html, $j.types.mouseEvents.UP, this.expandCollapse);
                }
                if (this._owner.viewCheckboxes) {
                    $j.tools.events.unBind(this._check, $j.types.mouseEvents.DOWN, this.checkUnCheck);
                    $j.tools.events.bind(this._check, $j.types.mouseEvents.DOWN, this.checkUnCheck);
                    $j.CSS.removeClass(this._check, "grayed checked");
                    if (this._check) $j.CSS.removeClass(this._check, "checked");
                    if (this.isChecked) $j.CSS.addClass(this._check, "checked");
                    else if (this.allowGrayed && this.state === $j.types.checkboxStates.GRAYED) $j.CSS.addClass(this._check, "grayed");
                }
                if (this.height !== this._owner.itemsHeight) {
                    this._html.style.height = this.height + $j.types.CSSUnits.PX;
                }
                if (!this.enabled) {
                    $j.CSS.addClass(this._html, "disabled");
                }
                if (this.selected) $j.CSS.addClass(this._html, "selected");
                this._text.innerHTML = this.text;
                if (!this._parentNodes.isEmpty()) $j.CSS.addClass(this._html, "isChild");
                $j.CSS.removeClass(this._root, "expanded");
                if (this.expanded) $j.CSS.addClass(this._root, "expanded");
                $j.tools.events.unBind(this._html, $j.types.mouseEvents.DOWN, this._owner.selectItem);
                $j.tools.events.bind(this._html, $j.types.mouseEvents.DOWN, this._owner.selectItem);
                if (this._owner.images && this.imageIndex > -1 || this.image !== String.EMPTY || this.cssImage != String.EMPTY) {
                    $j.CSS.addClass(this._icon, "icon");
                    if (this.cssImage !== String.EMPTY) {
                        $j.CSS.addClass(this._icon, this.cssImage);
                        this._icon.style.backgroundSize = this._owner.itemsHeight + $j.types.CSSUnits.PX + String.SPACE + this._owner.itemsHeight + $j.types.CSSUnits.PX;
                    } else if (this.image !== String.EMPTY) {
                        this._icon.style.backgroundImage = 'url(' + this.image + ')';
                        this._icon.style.backgroundSize = this._owner.itemsHeight + $j.types.CSSUnits.PX + String.SPACE + this._owner.itemsHeight + $j.types.CSSUnits.PX;
                    } else if (this._owner.images) {
                        if (this.imageIndex < this._owner.images._images.length && this.imageIndex > -1) {
                            this._icon.style.backgroundImage = 'url(' + this._owner.images._images[this.imageIndex] + ')';
                            this._icon.style.backgroundSize = this._owner.images.imageWidth + $j.types.CSSUnits.PX + String.SPACE + this._owner.images.imageHeight + $j.types.CSSUnits.PX;
                        }
                    }
                }
                this.updateDataSet();
            }
        },
        updateDataSet: function () {
            if (!this._html) return;
            this._html.dataset.height = this.height;
            this._html.dataset.ischecked = this.isChecked;
            this._html.dataset.enabled = this.enabled;
            this._html.dataset.idx = this.getIndex();
            this._html.dataset.expanded = this.expanded;
            this._html.dataset.visible = this.visible;
            this._html.dataset.image = this.image;
            this._html.dataset.cssimage = this.cssImage;
            this._html.dataset.imageindex = this.imageIndex;
            if (this._owner.viewCheckboxes) {
                //this._html.dataset.ischecked=this.isChecked;
                this._html.dataset.state = this.state;
                this._html.dataset.allowgrayed = this.allowGrayed;
            }
        },
        getIndex: function () {
            return this._owner.items.indexOf(this);
        },
        isEnabled: function () {
            return this.enabled && this._owner.isEnabled();
        },
        isVisible: function () {
            var ret = true;
            for (var i = this._parentNodes.length - 1; i >= 0; i--) {
                if (!this._parentNodes[i].isExpanded()) {
                    ret = false;
                    break;
                }
            }
            return ret && this.visible;
        },
        isExpanded: function () {
            return this.expanded;
        },
        draw: function () {
            var span;
            if (!this._html) {
                this._html = $j.doc.createElement($j.types.HTMLElements.DIV);
                this._root = $j.doc.createElement($j.types.HTMLElements.DIV);
                this._root.jsObj = this;
                this._html.appendChild(this._root);
                //$j.tools.events.unBind(this._html,$j.types.mouseEvents.CLICK,this.click);
                $j.tools.events.bind(this._html, $j.types.mouseEvents.CLICK, this.click);
                //$j.tools.events.bind(this._html,$j.types.mouseEvents.DBLCLICK,this.dblClick);
                $j.CSS.addClass(this._root, "TreeViewRoot Control");
                this._root.style.height = this.height + $j.types.CSSUnits.PX;
                this._root.style.lineHeight = this.height + $j.types.CSSUnits.PX;
                if (this._owner.viewCheckboxes) {
                    this._check = $j.doc.createElement($j.types.HTMLElements.DIV);
                    this._check.jsObj = this;
                    $j.CSS.addClass(this._check, "CheckboxCheck" + String.SPACE + this._owner.getThemeName() + String.SPACE + "Control");
                    this._html.appendChild(this._check);
                }
                if (this._owner.images || this.image !== String.EMPTY || this.cssImage !== String.EMPTY) {
                    this._icon = $j.doc.createElement($j.types.HTMLElements.DIV);
                    this._icon.jsObj = this;
                    this._html.appendChild(this._icon);
                    this._icon.style.height = this.height + $j.types.CSSUnits.PX;
                    this._icon.style.lineHeight = this.height + $j.types.CSSUnits.PX;
                }
                this._text = $j.doc.createElement($j.types.HTMLElements.SPAN);
                this._html.dataset.theme = this._owner.getThemeName();
                $j.CSS.addClass(this._html, this._owner.getThemeName());
                this._html.appendChild(this._text);
                this._text.innerHTML = this.text;
                this._text.style.height = this.height + $j.types.CSSUnits.PX;
                this._text.style.lineHeight = this.height + $j.types.CSSUnits.PX;
                this._html.jsObj = this;
                $j.CSS.addClass(this._html, this._ClassName + String.SPACE + "Control");
                $j.CSS.addClass(this._html, this._owner._ClassName[0] + this._ClassName);
                if (!this._parentNodes.isEmpty()) $j.CSS.addClass(this._html, "isChild");
                this._owner._content.appendChild(this._html);
            }
            if (this._level > 0) {
                this._root.style.marginLeft = (this._level * this._owner._offsetLevel) + $j.types.CSSUnits.PX;
            }
            this._html.style.transform = "translateY(" + (this._top - this._owner._scrollTop) + $j.types.CSSUnits.PX + ")";
            this._html.style.height = this.height + $j.types.CSSUnits.PX;
            $j.CSS.addClass(this._html, this.cssClass);
            this.update();
            this.onDraw.invoke(this._html);
        },
        updateChildsCheck: function (checked) {
            var item;
            if (this.items.length > 0) {
                for (var i = 0, l = this.items.length; i < l; i++) {
                    item = this.items[i];
                    item.isChecked = checked;
                    if (item._html) {
                        $j.CSS.removeClass(item._check, "checked");
                        $j.CSS.removeClass(item._check, "grayed");
                    }
                    if (checked) {
                        item.state = $j.types.checkboxStates.CHECKED;
                        if (item._html) $j.CSS.addClass(item._check, "checked");
                    } else {
                        item.state = $j.types.checkboxStates.UNCHECKED;
                        if (item._html) $j.CSS.removeClass(item._check, "checked");
                    }
                    item.updateDataSet();
                    item.updateChildsCheck(checked);
                }
            }
        },
        updateParentCheck: function () {
            var nbs = 0, p;
            for (var i = this._parentNodes.length - 1; i >= 0; i--) {
                p = this._parentNodes[i];
                nbs = p.getNbCheckedChilds();
                p.isChecked = false;
                if (p._html) {
                    $j.CSS.removeClass(p._check, "checked");
                    $j.CSS.removeClass(p._check, "grayed");
                }
                if (nbs.nbChecked === p.items.length) {
                    p.state = $j.types.checkboxStates.CHECKED;
                    p.isChecked = true;
                    if (p._html) $j.CSS.addClass(p._check, "checked");
                } else if (nbs.nbChecked + nbs.nbGrayed !== 0) {
                    p.state = $j.types.checkboxStates.GRAYED;
                    if (p._html) $j.CSS.addClass(p._check, "grayed");
                }
                else if (nbs.nbChecked + nbs.nbGrayed === 0) p.state = $j.types.checkboxStates.UNCHECKED;
                p.updateDataSet();
            }
        },
        getNbCheckedChilds: function () {
            var nbC = 0, nbG = 0, item;
            for (var i = 0, l = this.items.length; i < l; i++) {
                item = this.items[i];
                if (item.isChecked) nbC++;
                else if (item.state === $j.types.checkboxStates.GRAYED) nbG++;
            }
            return { "nbChecked": nbC, "nbGrayed": nbG };
        },
        isEnabled: function () {
            return this._owner.enabled;
        },
        removeToHTML: function () {
            if (this._html) {
                $j.tools.events.unBind(this._html, $j.types.mouseEvents.DOWN, this._owner.selectItem);
                $j.tools.events.unBind(this._html, $j.types.mouseEvents.CLICK, this.click);
                //$j.tools.events.unBind(this._html,$j.types.mouseEvents.DBLCLICK,this.dblClick);
                $j.tools.events.unBind(this._check, $j.types.mouseEvents.DOWN, this.checkUnCheck);
                this._html.parentNode.removeChild(this._html);
                this._html = null;
                this._root = null;
                this._icon = null;
                this._check = null;
                this._text = null;
                this._checkbox = null;
            }
        },
        destroy: function () {
            this.onDestroy.invoke();
            this.removeToHTML();
            this._owner.items.remove(this);
            this._owner = null;
            this._left = null;
            this._top = null;
            this._level = null;
            this._checkedChildsNb = null;
            this.text = null;
            this.height = null;
            this.isChecked = null;
            this.state = null;
            this.allowGrayed = null;
            this.enabled = null;
            this.expanded = null;
            this.form = null;
            this.selected = null;
            this.visible = null;
            this.items = null;
            this.hitTest = null;
            this._parentNodes.destroy();
            this._parentNodes = null;
            this._level = null;
            this._order = null;
            this.imageIndex = null;
            this.image = null;
            this.cssImage = null;
            this.onClick.destroy();
            this.onClick = null;
            this.onDblClick.destroy();
            this.onDblClick = null;
            this.onDraw.destroy();
            this.onDraw = null;
            this.onDestroy.destroy();
            this.onDestroy = null;
        },
        asChilds: function () {
            return this.items.length > 0;
        },
        click: function () {
            if (!this.enabled) return;
            this.onClick.invoke();
        },
        dblClick: function () {
            if (!this.enabled) return;
            this.onDblClick.invoke();
        }
        //#endregion
    });
    Object.seal(TreeViewItem);
    //#endregion
    //#region TreeView
    var TreeView = $j.classes.ScrollControl.extend("TreeView", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._content = null;
                this._visibleItems = [];
                this._VScrollBar = $j.classes.createComponent($j.classes.ScrollBar, this, null, { _inForm: false }, false);
                this._VScrollBar.onChange.addListener(this.VScroll);
                this._VScrollBar.setAlign($j.types.aligns.MOSTRIGHT);
                this._HScrollBar = $j.classes.createComponent($j.classes.ScrollBar, this, null, { _inForm: false }, false);
                this._HScrollBar.onChange.addListener(this.HScroll);
                this._HScrollBar.smallChange = this.itemsHeight;
                this._HScrollBar.setAlign($j.types.aligns.MOSTBOTTOM);
                this._scrollTop = 0;
                this._scrollLeft = 0;
                this._innerHeight = 0;
                this._innerWidth = 0;
                this._offsetLevel = 10;
                this._lastDelta = new $j.classes.Point;
                this._downPos = new $j.classes.Point;
                this._currentPos = new $j.classes.Point;
                this._down = false;
                this._HScrollAni = null;
                this._VScrollAni = null;
                this._keyDir = $j.types.directions.LEFT;
                //#endregion
                $j.classes.newCollection(this, this, $j.classes.TreeViewItem);
                this.itemsHeight = 16;
                this.viewCheckboxes = false;
                this.setHitTest(true);
                this.itemIndex = -1;
                this.canFocused = true;
                this.hotTrack = false;
                this.multiSelect = false;
                this.mouseTracking = true;
                this.animated = true;
                this.fullItemWidthExpand = false;
                this.selectedItem = null;
                this.onChange = new $j.classes.NotifyEvent(this);
                this.onSelectItem = new $j.classes.NotifyEvent(this);
                this.onSortItem = new $j.classes.NotifyEvent(this);
                this.sorted = false;
                this.images = null;
            }
        },
        //#region Setters
        setItemsHeight: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.itemsHeight !== newValue) {
                for (var i = 0, l = this.items.length; i < l; i++) {
                    if (this.items[i].height === this.itemsHeight) {
                        this.items[i].height = newValue;
                    }
                }
                this.itemsHeight = newValue;
                this.draw();
            }
        },
        setViewCheckboxes: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.viewCheckboxes !== newValue) {
                this.viewCheckboxes = newValue;
                if (this.viewCheckboxes) this._offsetLevel = 16;
                else this._offsetLevel = 10;
                this.draw();
            }
        },
        setItemIndex: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (newValue > this.items.length) return;
            if (newValue < -1) newValue = -1;
            if (this.itemIndex !== newValue) {
                if (this.itemIndex > -1) this.deselectItemIndex();
                this.itemIndex = newValue;
                if (newValue > -1) {
                    var item = this.items[this.itemIndex];
                    if (item) item.setSelected(true);
                    this.selectedItem = item;
                    this.scrollToItem();
                }
            }
        },
        setFullItemWidthExpand: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.fullItemWidthExpand !== newValue) {
                this.fullItemWidthExpand = newValue;
            }
        },
        setSorted: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.sorted !== newValue) {
                this.sorted = newValue;
                this.refreshInnerHeight();
            }
        },
        //#endregion
        //#region Methods
        updateDataSet: function () {
            this._HTMLElement.dataset.itemsheight = this.itemsHeight;
            this._HTMLElement.dataset.viewcheckboxes = this.viewCheckboxes;
            this._HTMLElement.dataset.itemindex = this.itemIndex;
        },
        getChildsHTMLElement: function () {
            var items = [], item, lastStart = 0, top = null, queue = [], parentItems = [], nodes = [], i, l, data, mat;
            if (this._HTMLElement) {
                this._content = this._HTMLElement.firstElementChild;
                this._content.jsObj = this;
                this._VScrollBar.getHTMLElement(this._HTMLElement.lastElementChild.id);
                this._VScrollBar.getChildsHTMLElement();
                this._VScrollBar.setOrientation($j.types.orientations.VERTICAL);
                this._VScrollBar.updateFromHTML();

                this._HScrollBar._HTMLElement = this._VScrollBar._HTMLElement.previousSibling;
                while (this._HScrollBar._HTMLElement.nodeType !== $j.types.xmlNodeTypes.ELEMENT_NODE) {
                    this._HScrollBar._HTMLElement = this._HScrollBar._HTMLElement.previousSibling;
                }
                this._HScrollBar.getHTMLElement(this._HScrollBar._HTMLElement.id);
                this._HScrollBar.getChildsHTMLElement();
                this._HScrollBar.updateFromHTML();
            }
            // on va chercher les items dans le CDATA
            var cdata = this._content.nextSibling;
            while (cdata && cdata.nodeType !== $j.types.xmlNodeTypes.COMMENT_NODE) {
                cdata = cdata.nextSibling;
            }
            if (cdata) {
                if (cdata.nodeValue !== String.EMPTY && cdata.nodeValue) items = JSON.parse(cdata.nodeValue);
            }
            this._innerHeight = 0;
            this.beginUpdate();
            l = items.length;
            for (i = 0; i < l; i++) queue.push(items[i]);
            while (!queue.isEmpty()) {
                top = queue.shift();
                item = new $j.classes.TreeViewItem(this, top.parent);
                item.text = top.text;
                item.height = top.height;
                item.isChecked = top.isChecked;
                item.enabled = top.enabled;
                item.expanded = top.expanded;
                item.visible = top.visible;
                item.allowGrayed = top.allowgrayed;
                item.isChecked = top.isChecked;
                if (top.imageIndex) item.imageIndex = top.imageIndex;
                item.state = top.state;
                item._top = lastStart;
                if (top.cssImage) item.cssImage = top.cssImage;
                if (top.image) item.image = top.image;
                if (top.parent) {
                    top.parent.items.push(item);
                    if (item.isChecked) top.parent._checkedChildsNb++;
                }
                if (item.visible) {
                    this._innerHeight += item.height;
                    lastStart += item.height;
                }
                l = top.items.length;
                for (i = 0; i < l; i++) {
                    top.items[i].parent = item;
                    queue.insert(i, top.items[i]);
                }
            }
            this._VScrollBar.smallChange = ~~(this._VScrollBar.viewportSize / 5);
            if (this._innerHeight < this._VScrollBar.max) this._innerHeight = this._VScrollBar.max;
            this.endUpdate();
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.viewcheckboxes;
            if (data) this.viewCheckboxes = _conv.strToBool(data);
            data = this._HTMLElement.dataset.itemsheight;
            if (data) this.itemsHeight = ~~data;
            data = this._HTMLElement.dataset.itemindex;
            if (data) this.setItemIndex(~~data);
            data = this._HTMLElement.dataset.fullitemwidthexpand;
            if (data) this.fullItemWidthExpand = _conv.strToBool(data);
            data = this._HTMLElement.dataset.sorted;
            if (data) this.sorted = _conv.strToBool(data);
            if (this.viewCheckboxes) this._offsetLevel = 16;
            else this._offsetLevel = 10;
            this.bindEventToHTML("onChange");
            this.bindEventToHTML("onSelectItem");
        },
        draw: function () {
            var oldVisibleItems = this._visibleItems, item, items, i, il, itemVisible = false, topIndex = 0, top, reelItemWidth = 0;
            if (this._loading || this.form._loading) return;
            if (this.items.isEmpty()) {
                this.clearScrollBarCSS();
                $j.CSS.addClass(this._HTMLElement, "scrollbars-none");
                return;
            }
            items = this.items.filter(function (e, i, a) {
                return e.isVisible();
            });
            this._scrollTop = $j.max($j.min(this._scrollTop, this._innerHeight - this._content.offsetHeight), 0);
            this._visibleItems = [];
            topIndex = ~~(this._scrollTop / this.itemsHeight);
            if (topIndex < 0) topIndex = 0;
            top = items[topIndex]._top;
            this._innerWidth = 0;
            for (i = topIndex; i < items.length; i++) {
                item = items[i];
                if (!item._parentNodes.isEmpty()) {
                    if (!item._parentNodes.first().expanded) continue;
                }
                itemVisible = false;
                if (i > topIndex) item._top = top;
                if ((item._top + item.height >= this._scrollTop) && (item._top <= this._content.offsetHeight + this._scrollTop)) itemVisible = true;
                if (item._top - this._scrollTop > this._content.clientHeight) break;
                itemVisible = itemVisible && item.isVisible();
                if (itemVisible) {
                    item.draw();
                    this._visibleItems.push(item);
                    top += item.height;
                    reelItemWidth = item._html.scrollWidth;
                    if (this._innerWidth < reelItemWidth) this._innerWidth = reelItemWidth;
                }
            }
            for (i = 0, il = oldVisibleItems.length; i < il; i++) {
                item = oldVisibleItems[i];
                if (this._visibleItems.indexOf(item) == -1) {
                    item.removeToHTML();
                }
            }
            this.updateHScrollBar();
        },
        VScroll: function () {
            var treeView = this._owner;
            if (treeView.form._focusedControl !== treeView) treeView.setFocus();
            treeView._scrollTop = treeView._VScrollBar.value;
            treeView.draw();
        },
        HScroll: function () {
            var treeView = this._owner;
            if (treeView.form._focusedControl !== treeView) treeView.setFocus();
            treeView._content.style.marginLeft = (-treeView._HScrollBar.value) + $j.types.CSSUnits.PX;
        },
        selectItem: function (mouseEventArg) {
            var item = this.jsObj;
            item._owner.app.closeAllPopups();
            if (!item.enabled) return;
            if (!item._owner.enabled) return;
            if (item._owner._VScrollAni && item._owner._VScrollAni.running) return;
            if (item._owner._HScrollAni && item._owner._HScrollAni.running) return;
            item._owner.setItemIndex(item._owner.items.indexOf(item));
            if (item._owner.canFocused && !item._owner._isFocused && (item._owner.form._focusedControl !== item._owner)) item._owner.setFocus();
            if (item._owner.onSelectItem.hasListener()) item._owner.onSelectItem.invoke();
            mouseEventArg.stopPropagation();
        },
        deselectItemIndex: function () {
            var item;
            if (this.itemIndex !== -1) {
                item = this.items[this.itemIndex];
                if (item) item.setSelected(false);
            }
        },
        refreshInnerHeight: function () {
            var item, items, lastStart = 0;
            if (this.sorted) {
                this.items.sort(function (a, b) {
                    if (a._owner.onSortItem.hasListener()) return a._owner.onSortItem.invoke(a, b);
                    else return a.text < b.text ? -1 : a.text > b.text ? 1 : 0;
                });
            }
            items = this.items.filter(function (e, i, a) {
                return e.isVisible();
            });
            this._innerHeight = 0;
            for (var i = 0, l = items.length; i < l; i++) {
                item = items[i];
                item._top = lastStart;
                this._innerHeight += item.height;
                lastStart += item.height;
            }
            if (this._allowUpdate) {
                this.updateVScrollBar();
                this.draw();
            }
        },
        deleteItem: function (item) {
            if (!(item instanceof $j.classes.TreeViewItem)) return;
            if (this.items.indexOf(item) === -1) return;
            this.items.remove(item);
            if (this._allowUpdate) this.refreshInnerHeight();
        },
        deleteAt: function (index) {
            var item, lastTop, lastLeft;
            if (index < 0 || index > this.items.length) return;
            item = this.items[index];
            this.items.removeAt(index);
            if (this._allowUpdate) this.refreshInnerHeight();
        },
        moveItem: function (itemToMove, itemBefore) {
            var s, l, i, t, l, start;
            if (!(itemToMove instanceof $j.classes.TreeViewItem)) return;
            if (!(itemBefore instanceof $j.classes.TreeViewItem)) return;
            s = itemToMove.getIndex() - 1;
            l = itemBefore.getIndex() + 1;
            this.items.remove(itemToMove);
            this.items.insert(itemBefore.getIndex() + 1, itemToMove);
            if (l > this.items.length) l = this.items.length;
            start = this.items[s]._top;
            for (i = s; i < l; i++) {
                this.items[i]._top = start;
                start += this.items[i].height;
            }
            if (this._visibleItems.indexOf(itemToMove) > -1) {
                if (this._allowUpdate) this.draw();
            }
        },
        beginUpdate: function () {
            this._allowUpdate = false;
        },
        endUpdate: function () {
            this._allowUpdate = true;
            this.refreshInnerHeight();
        },
        clear: function () {
            var item;
            for (var i = 0, il = this._visibleItems.length; i < il; i++) {
                item = this._visibleItems[i];
                item.destroy();
            }
            this._visibleItems.clear();
            this.items.clear();
        },
        updateVScrollBar: function () {
            var contentW = this._content.offsetWidth;
            if (this._innerHeight > this._content.offsetHeight) {
                if (this._innerWidth <= contentW + this._content.offsetLeft) {
                    this._HTMLElement.dataset.scrollbars = $j.types.scrollbars.VERTICAL;
                    this.clearScrollBarCSS();
                    $j.CSS.addClass(this._HTMLElement, "scrollbars-vertical");
                } else {
                    this._HTMLElement.dataset.scrollbars = $j.types.scrollbars.BOTH;
                    this.clearScrollBarCSS();
                    $j.CSS.addClass(this._HTMLElement, "scrollbars-both");
                }
                this._VScrollBar.setMax(this._innerHeight - this._content.offsetHeight);
                this._VScrollBar.setViewportSize(this._innerHeight);
            } else {
                if (this._innerWidth <= contentW + this._content.offsetLeft) {
                    this._HTMLElement.dataset.scrollbars = $j.types.scrollbars.NONE;
                    this.clearScrollBarCSS();
                    $j.CSS.addClass(this._HTMLElement, "scrollbars-none");
                } else {
                    this._HTMLElement.dataset.scrollbars = $j.types.scrollbars.HORIZONTAL;
                    this.clearScrollBarCSS();
                    $j.CSS.addClass(this._HTMLElement, "scrollbars-horizontal");
                }
                this._VScrollBar.setMax(0);
                this._VScrollBar.setViewportSize(0);
                this._VScrollBar.setValue(0);
            }
        },
        updateHScrollBar: function () {
            var data, contentW = this._content.offsetWidth;
            data = this._HTMLElement.dataset.scrollbars;
            if (this._innerWidth <= contentW + this._content.offsetLeft) {
                if (data === $j.types.scrollbars.BOTH) {
                    this._HTMLElement.dataset.scrollbars = $j.types.scrollbars.VERTICAL;
                    this.clearScrollBarCSS();
                    $j.CSS.addClass(this._HTMLElement, "scrollbars-vertical");
                } else if (data === $j.types.scrollbars.HORIZONTAL) {
                    this._HTMLElement.dataset.scrollbars = $j.types.scrollbars.NONE;
                    this.clearScrollBarCSS();
                    $j.CSS.addClass(this._HTMLElement, "scrollbars-none");
                }
            } else {
                if (data === $j.types.scrollbars.VERTICAL) {
                    this._HTMLElement.dataset.scrollbars = $j.types.scrollbars.BOTH;
                    this.clearScrollBarCSS();
                    $j.CSS.addClass(this._HTMLElement, "scrollbars-both");
                } else if (data === $j.types.scrollbars.NONE) {
                    this._HTMLElement.dataset.scrollbars = $j.types.scrollbars.HORIZONTAL;
                    this.clearScrollBarCSS();
                    $j.CSS.addClass(this._HTMLElement, "scrollbars-horizontal");
                }
                this._HScrollBar.setMax(this._innerWidth);
                this._HScrollBar.setViewportSize(contentW + this._content.offsetLeft);
            }
            if ((data === $j.types.scrollbars.VERTICAL) || (data === $j.types.scrollbars.BOTH)) this.updateVScrollBar();
            if (data === $j.types.scrollbars.NONE) $j.CSS.addClass(this._HTMLElement, "scrollbars-none");
        },
        clearScrollBarCSS: function () {
            $j.CSS.removeClass(this._HTMLElement, "scrollbars-none");
            $j.CSS.removeClass(this._HTMLElement, "scrollbars-horizontal");
            $j.CSS.removeClass(this._HTMLElement, "scrollbars-vertical");
            $j.CSS.removeClass(this._HTMLElement, "scrollbars-both");
        },
        mouseDown: function () {
            this._inherited();
            if ($j.mouse.button === $j.types.mouseButtons.LEFT && this.mouseTracking) {
                this._lastDelta.setValues(0, 0);
                this._downPos.assign($j.mouse.screen);
                this._currentPos.assign($j.mouse.screen);
                this._down = true;
                if (this._VScrollAni && this._VScrollAni.running) this._VScrollAni.stopAtCurrent();
                if (this._HScrollAni && this._HScrollAni.running) this._HScrollAni.stopAtCurrent();
            }
        },
        mouseMove: function () {
            var data;
            this._inherited();
            if (this._down && this.mouseTracking) {
                data = this._HTMLElement.dataset.scrollbars;
                if (data === $j.types.scrollbars.VERTICAL || data === $j.types.scrollbars.BOTH) {
                    this._VScrollBar.setValue(this._VScrollBar.value - ($j.mouse.screen.y - this._currentPos.y));
                    this._lastDelta.y = ($j.mouse.screen.y - this._currentPos.y);
                }
                if (data === $j.types.scrollbars.HORIZONTAL || data === $j.types.scrollbars.BOTH) {
                    this._HScrollBar.setValue(this._HScrollBar.value - ($j.mouse.screen.x - this._currentPos.x));
                    this._lastDelta.x = ($j.mouse.screen.x - this._currentPos.x);
                }
                this._currentPos.assign($j.mouse.screen);
            }
        },
        mouseUp: function () {
            var data;
            this._inherited();
            if (this._down && this.mouseTracking) {
                this._down = false;
                if (this.animated && ((this._lastDelta.x !== 0) || (this._lastDelta.y !== 0))) {
                    data = this._HTMLElement.dataset.scrollbars;
                    if (data === $j.types.scrollbars.VERTICAL || data === $j.types.scrollbars.BOTH) {
                        this.createVScrollAni();
                        if (this._VScrollAni.running) this._VScrollAni.stopAtCurrent();
                        this._VScrollAni.stopValue = this._VScrollBar.value - (this._lastDelta.y * 7);
                        this._VScrollAni.start();
                    }
                    if (data === $j.types.scrollbars.HORIZONTAL || data === $j.types.scrollbars.BOTH) {
                        this.createHScrollAni();
                        if (this._HScrollAni.running) this._HScrollAni.stopAtCurrent();
                        this._HScrollAni.stopValue = this._HScrollBar.value - (this._lastDelta.x * 7);
                        this._HScrollAni.start();
                    }
                }
            }
        },
        createVScrollAni: function () {
            if (!this._VScrollAni) {
                this._VScrollAni = new $j.classes.FloatAnimation(this);
                this._VScrollAni.animationType = $j.types.animationTypes.OUT;
                this._VScrollAni.interpolation = $j.types.interpolationTypes.QUADRATIC;
                this._VScrollAni.duration = 1;
                this._VScrollAni.control = this._VScrollBar;
                this._VScrollAni.propertyName = "value";
                this._VScrollAni.startFromCurrent = true;
                this._VScrollAni.convertToCSS = false;
            }
        },
        createHScrollAni: function () {
            if (!this._HScrollAni) {
                this._HScrollAni = new $j.classes.FloatAnimation(this);
                this._HScrollAni.animationType = $j.types.animationTypes.OUT;
                this._HScrollAni.interpolation = $j.types.interpolationTypes.QUADRATIC;
                this._HScrollAni.duration = 1;
                this._HScrollAni.control = this._HScrollBar;
                this._HScrollAni.propertyName = "value";
                this._HScrollAni.startFromCurrent = true;
                this._HScrollAni.convertToCSS = false;
            }
        },
        destroy: function () {
            this._inherited();
            while (this.items.length > 0) {
                this.items.last().destroy();
            }
            this._content = null;
            this._visibleItems.clear();
            this._visibleItems = null;
            this._VScrollBar = null;
            this._HScrollBar = null;
            this._scrollTop = null;
            this._scrollLeft = null;
            this._innerHeight = null;
            this._innerWidth = null;
            this._offsetLevel = null;
            this._lastDelta.destroy();
            this._lastDelta = null;
            this._downPos.destroy();
            this._downPos = null;
            this._currentPos.destroy();
            this._currentPos = null;
            this._down = null;
            this._HScrollAni = null;
            this._VScrollAni = null;
            this.items.destroy();
            this.items = null;
            this.itemsHeight = null;
            this.viewCheckboxes = null;
            this.itemIndex = null;
            this.canFocused = null;
            this.hotTrack = null;
            this.multiSelect = null;
            this.mouseTracking = null;
            this.animated = null;
            this.onSelectItem.destroy();
            this.onSelectItem = null;
            this.onChange.destroy();
            this.onChange = null;
            this.onSortItem.destroy();
            this.onSortItem = null;
            this.sorted = null;
            this.images = null;
        },
        keyDown: function () {
            this._inherited();
            switch ($j.keyboard.keyCode) {
                case $j.types.VKeysCodes.VK_LEFT:
                case $j.types.VKeysCodes.VK_UP:
                    this._keyDir = $j.types.directions.LEFT;
                    this.setItemIndex(this.itemIndex - 1);
                    break;
                case $j.types.VKeysCodes.VK_RIGHT:
                case $j.types.VKeysCodes.VK_DOWN:
                    this._keyDir = $j.types.directions.RIGHT;
                    this.setItemIndex(this.itemIndex + 1);
                    break;
                case $j.types.VKeysCodes.VK_HOME:
                    this.setItemIndex(0);
                    break;
                case $j.types.VKeysCodes.VK_END:
                    this.setItemIndex(this.items.length - 1);
                    break;
                case $j.types.VKeysCodes.VK_PRIOR:
                    this.setItemIndex(this.itemIndex - ~~(this._content.offsetHeight / this.itemsHeight));
                    break;
                case $j.types.VKeysCodes.VK_NEXT:
                    this.setItemIndex(this.itemIndex + ~~(this._content.offsetHeight / this.itemsHeight));
                    break;
                case $j.types.VKeysCodes.VK_SPACE:
                    var item = this.items[this.itemIndex];
                    if (this.viewCheckboxes) {
                        if (item) item.setIsChecked(!item.isChecked);
                    }
                    break;
            }
        },
        scrollToItem: function () {
            var nbrVisibleItems, base, inVisibleItems, isFirst;
            inVisibleItems = this._visibleItems.indexOf(this.items[this.itemIndex]) === -1 || this._visibleItems.last() === this.items[this.itemIndex];
            isFirst = this._visibleItems.first() === this.items[this.itemIndex] || this._visibleItems.first() === this.items[this.itemIndex + 1];
            if (inVisibleItems && !isFirst) {
                nbrVisibleItems = ~~(this._content.offsetHeight / this.itemsHeight);
                base = ((nbrVisibleItems * this.itemsHeight) - this._content.offsetHeight) + this.itemsHeight;
                this._VScrollBar.setValue(base + ((this.itemIndex - nbrVisibleItems) * this.itemsHeight));
            } else if (isFirst) this._VScrollBar.setValue((this.itemIndex * this.itemsHeight));
        },
        findItem: function (text) {
            var items = this.items.filter(function (e, i, a) {
                return e.text === text;
            });
            if (items.length > 0) return items.first();
            else return null;
        },
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{horizontalScrollBar}"), tpl;
            tpl = this._HScrollBar.getTemplate();
            html = a.join(tpl);
            a = html.split("{verticalScrollBar}"), tpl;
            tpl = this._VScrollBar.getTemplate();
            html = a.join(tpl);
            return html;
        },
        loaded: function () {
            this._inherited();
            this.getImages();
            this.draw();
        },
        getImages: function () {
            var data = this._HTMLElement.dataset.images;
            if (data) {
                if (this.form[data]) {
                    this.images = this.form[data];
                }
            }
        },
        clearSelection: function () {
            this.itemIndex = -1;
            for (var i = 0, l = this.items.length; i < l; i++) {
                this.items[i].setSelected(false);
            }
        }
        //#endregion
    });
    Object.seal(TreeView);
    //#endregion
    $j.classes.register($j.types.categories.INTERNAL, TreeViewItem);
    $j.classes.register($j.types.categories.COMMON, TreeView);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var TreeViewTpl = "<div id='{internalId}' data-name='{name}' data-class='TreeView' class='Control TreeView {theme} scrollbars-vertical' data-scrollbars='vertical' style='width:121px;height:97px;'>\
                     <div class='Control TreeViewContent {theme}'></div>\
                     {horizontalScrollBar}\
                     {verticalScrollBar}\
                     </div>";
        $j.classes.registerTemplates([{ Class: TreeView, template: TreeViewTpl }]);
    }
    //#endregion
})();*/