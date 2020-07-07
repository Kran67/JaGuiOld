
/*
//TODO : finir MenuItem
(function () {
    //#region MenuItem
    var MenuItem = $j.classes.Component.extend('MenuItem', {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private properties
                this._owner = owner;
                this._internalId = String.uniqueId();
                this._inMainMenu = false;
                this._parentPopupMenu = null;
                this._htmlCaption = null;
                this._htmlShortcut = null;
                this._htmlHasSubMenu = null;
                //#endregion
                this.caption = String.EMPTY;
                this.shortcut = String.EMPTY;
                this.enabled = true;
                this.visible = true;
                this.isChecked = false;
                this.isRadioItem = false;
                this.groupIndex = 0;
                this.imageIndex = -1;
                this.hint = String.EMPTY;
                $j.classes.newCollection(this, this, $j.classes.MenuItem);
                this.onClick = new $j.classes.NotifyEvent(this);
                this.autoCheck = false;
                this.popupMenu = null;
                this.form = owner.form;
                this.active = false;
                this.action = null;
            }
        },
        //#region Setters
        setCaption: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.caption !== newValue) {
                this.caption = newValue;
            }
        },
        setShortcut: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.shortcut !== newValue) {
                this.shortcut = newValue;
            }
        },
        setEnabled: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.enabled !== newValue) {
                this.enabled = newValue;
            }
        },
        setVisible: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.visible !== newValue) {
                this.visible = newValue;
            }
        },
        setIsChecked: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.isChecked !== newValue) {
                if (newValue) this.isChecked = newValue;
                var list = this._owner.items, c = 0, cc = 0;
                if (this.isRadioItem) {
                    for (var i = 0, l = list.length; i < l; i++)
                        if (list[i] instanceof $j.classes.MenuItem && (list[i] !== this) && (list[i].groupIndex === this.groupIndex) && list[i].isRadioItem) {
                            if (list[i].isChecked) cc++;
                            if (newValue) list[i].setIsChecked(false);
                            $j.CSS.removeClass(list[i]._HTMLElement, 'ischecked');
                            c++;
                            if (this.isChecked) $j.CSS.addClass(list[i]._HTMLElement, 'ischecked');
                            else $j.CSS.removeClass(list[i]._HTMLElement, 'ischecked');
                        }
                    list = null;
                    // check
                    if (!newValue && (c === 0)) return;
                    if (!newValue && (cc === 0)) return;
                }
                this.isChecked = newValue;
                if (this.isRadioItem) {
                    if (this.isChecked) $j.CSS.addClass(this._HTMLElement, 'ischecked');
                    else $j.CSS.removeClass(this._HTMLElement, 'ischecked');
                }
            }
        },
        setIsRadioItem: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.isRadioItem !== newValue) {
                this.isRadioItem = newValue;
            }
        },
        setGroupItem: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.groupIndex !== newValue) {
                this.groupIndex = newValue;

            }
        },
        setImageIndex: function (newValue) {
            if (typeof newValue !== _const.NUMBER) return;
            if (this.imageIndex !== newValue) {
                this.imageIndex = newValue;
                //if (this.imageIndex!==-1) {
                //  if (this._HTMLElement)) {
                //    if (this.action)) {
                //      if (this.action._owner.imageList)) {
                //        this._htmlCaption.style.backgroundImage="url("+this.action._owner.imageList.getImage(this.imageIndex)+")";
                //      }
                //    }
                //  }
                //}
            }
        },
        setHint: function (newValue) {
            if (typeof newValue !== _const.STRING) return;
            if (this.hint !== newValue) {
                this.hint = newValue;

            }
        },
        setAutoCheck: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.autoCheck !== newValue) {
                this.autoCheck = newValue;
            }
        },
        setActive: function (newValue) {
            if (typeof newValue !== _const.BOOLEAN) return;
            if (this.active !== newValue) {
                this.active = newValue;
                if (this._HTMLElement) {
                    this._HTMLElement.dataset.active = newValue;
                    if (this.active) $j.CSS.addClass(this._HTMLElement, 'active');
                    else $j.CSS.removeClass(this._HTMLElement, 'active');
                }
            }
        },
        setAction: function (newValue) {
            if (!(newValue instanceof $j.classes.Action)) return;
            if (this.action !== newValue) {
                if (this.action instanceof $j.classes.Action) this.action.unRegisterChanges(this);
                this.action = newValue;
                this.action.registerChanges(this);
                //this.action.updateTarget(this);
            }
        },
        //#endregion
        //#region Methods
        insert: function (index, item) {
        },
        delete: function (index) {
        },
        clear: function () {
            var i, l;
            l = this.items.length - 1;
            for (i = l; i >= 0; i--) {
                this.items[i].clear();
                this.items[i].destroy();
            }
            this.items.clear();
            this.destroySubMenu();
            if (this._htmlHasSubMenu) {
                this._htmlHasSubMenu.dataset.visible = false;
            }
        },
        find: function (caption) {
            var i, l;
            if (typeof caption !== _const.STRING) return;
            caption = caption.split(_const.HOTKEYPREFIX).join(String.EMPTY);
            l = this.items.length;
            for (i = 0; i < l; i++) {
                if (caption === this.items[i].caption.split(_const.HOTKEYPREFIX).join(String.EMPTY)) {
                    return this.items[i];
                }
            }
            return null;
        },
        indexOf: function (item) {
            return this.items.indexOf(item);
        },
        isLine: function () {
            return this.caption === _const.LINECAPTION;
        },
        insertNewLine: function (before, item) {
            if (before) before = false;
            if (before) this.insertNewLineBefore(item);
            else this.insertNewLineAfter(item);
        },
        insertNewLineBefore: function (item) {
        },
        insertNewLineAfter: function (item) {
        },
        add: function (item) {
        },
        addItemsFromArray: function (itemsArray) {
        },
        removeItem: function (item) {
            if (!(item instanceof $j.classes.MenuItem)) return;
            if (this.items.indexOf(item) === -1) return;
            this.item.remove(item);
        },
        showSubMenu: function () {
            var left = 0, top = 0, r;
            //if (!this.popupMenu)) {
            if (this._owner instanceof $j.classes.MainMenu) {
                r = this._HTMLElement.getBoundingClientRect();
                left = r.left;
                top = r.top + this._owner._HTMLMenu.offsetHeight;
            } else {
                left = this._parentPopupMenu._popupBox._HTMLElement.offsetLeft + this._HTMLElement.offsetWidth;
                top = this._parentPopupMenu._popupBox._HTMLElement.offsetTop + this._HTMLElement.offsetTop;
            }
            this.popupMenu = $j.classes.createComponent($j.classes.PopupMenu, this, null, null, false);
            if (this._owner instanceof $j.classes.MainMenu) {
                if (this._owner.images instanceof $j.classes.ImageList) this.popupMenu.images = this._owner.images;
            } else {
                this.popupMenu.images = this._parentPopupMenu.images;
                this.popupMenu._zIndex = this._parentPopupMenu._zIndex + 1;
            }
            this.popupMenu._control = this;
            this.popupMenu.items = this.items;
            for (var i = 0, l = this.items.length; i < l; i++) {
                if (this.items[i]._loading) this.items[i].loaded();
            }
            this.popupMenu.show(left, top);
            //}
            this.setActive(true);
        },
        text: function () {
            return $j.tools.text.replace(this.caption, _const.HOTKEYPREFIX, String.EMPTY);
        },
        captionToHTML: function () {
            var idx = this.caption.indexOf(_const.HOTKEYPREFIX);
            if (idx > -1) return this.caption.substr(0, idx) + '<u class="ShortCutLetter">' + this.caption.substr(idx + 1, 1) + '</u>' + this.caption.substr(idx + 2, this.caption.length - idx + 2);
            else return this.caption;
        },
        htmlClick: function (mouseEventArg) {
            var jsObj = this.jsObj;
            if (!jsObj.enabled) return;
            jsObj.click();
            $j.mouse.stopEvent(mouseEventArg);
        },
        click: function () {
            if (this._inMainMenu) {
                if (!this.form.mainMenu._isActive) {
                    this.form.mainMenu._isActive = true;
                }
                this.app.closeAllPopups();
            }
            this.form.app.activeWindow = this.form;
            if (this.items.length > 0) {
                if (!this.popupMenu) this.showSubMenu();
            } else {
                if (this.form) {
                    this.form.closePopups();
                    if (this.form.mainMenu) this.form.mainMenu._isActive = false;
                    if (this.autoCheck) {
                        if (this.action) this.action.setIsChecked(!this.action.isChecked);
                        else this.setIsChecked(!this.isChecked);
                    }
                }
                if (this.onClick.hasListener()) this.onClick.invoke();
                else if (this.action) this.action.execute();
            }
            if (this.enabled && this.visible) {
                if (this.form._statusBar) {
                    if (this.form._statusBar.autoHint) {
                        this.form._statusBar.setSimplePanel(false);
                    }
                }
            }
        },
        getTemplate: function () {
            var html, a, theme = this.form.getThemeName(), popupMenu = null, imgList = null;
            if (this.caption === _const.LINECAPTION) {
                html = $j.templates['MenuItemSep'];
            } else {
                html = this._inherited();
                a = html.split('{caption}');
                html = a.join(this.captionToHTML());
                a = html.split('{asChilds}');
                if (this.items.length > 0 && !this._inMainMenu) html = a.join('true');
                else html = a.join('false');
                a = html.split('{shortcut}');
                if (this._inMainMenu) html = a.join(String.EMPTY);
                else html = a.join(this.shortcut);
            }
            a = html.split('{internalId}')
            html = a.join(this._internalId);
            a = html.split('{theme}');
            html = a.join(theme);
            if (this._owner instanceof $j.classes.PopupMenu) popupMenu = this._owner;
            else if (this._owner.popupMenu instanceof $j.classes.PopupMenu) popupMenu = this._owner.popupMenu;
            else if (this._owner instanceof $j.classes.MainMenu) popupMenu = this._owner;
            a = html.split('{icon}');
            if (popupMenu.images) {
                if (this.imageIndex > -1) {
                    if (popupMenu.images._images[this.imageIndex]) {
                        imgList = popupMenu.images;
                        //html=a.join("style='background-image:url(\""+popupMenu.images.getImages(this.imageIndex)+"\");background-size:"+
                        //  popupMenu.images.imageWidth+$j.types.CSSUnits.PX+String.SPACE+popupMenu.images.imageHeight+$j.types.CSSUnits.PX+"'");
                    }
                }
            } else if (this.action) {
                if (this.action._owner.imageList) {
                    imgList = this.action._owner.imageList;
                    //html=a.join("style='background-image:url(\""+this.action._owner.imageList.getImage(this.imageIndex)+"\");background-size:"+
                    //    this.action._owner.imageList.imageWidth+$j.types.CSSUnits.PX+String.SPACE+this.action._owner.imageList.imageHeight+$j.types.CSSUnits.PX+"'");
                }
            }
            if (imgList) {
                html = a.join("style='background-image:url(\"" + imgList.getImage(this.imageIndex) + "\");background-size:" +
                    imgList.imageWidth + $j.types.CSSUnits.PX + String.SPACE + imgList.imageHeight + $j.types.CSSUnits.PX + "'");
            } else html = a.join(String.EMPTY);
            if (this.shortcut !== String.EMPTY) {
                html = html.replace('Ctrl', "<span class='ctrl'></span>");
                html = html.replace('Alt', "<span class='alt'></span>");
                html = html.replace('Shift', "<span class='shift'></span>");
                html = html.replace('Sys', "<span class='sys'></span>");
            }
            return html;
        },
        closeSubMenu: function () {
            if (this.popupMenu) {
                this.popupMenu.close();
                this.popupMenu = null;
            }
            this.setActive(false);
        },
        HTMLMouseEnter: function (mouseEventArg) {
            var jsObj = this.jsObj, popupMenu, i, items, l;
            //activeMenuItem=jsObj._owner.getActiveItem();
            //if (activeMenuItem)) activeMenuItem.setActive(false);
            if (jsObj._inMainMenu && jsObj.form.mainMenu._isActive) {
                if (!jsObj.active) {
                    jsObj.form.closePopups();
                    jsObj.form._lastSelectedMenuItem = null;
                    jsObj.showSubMenu();
                }
            } else if (jsObj.form._lastSelectedMenuItem) {
                if (jsObj.form._lastSelectedMenuItem.items.length > 0) {
                    if (jsObj.form._lastSelectedMenuItem.popupMenu) {
                        if (jsObj.form._lastSelectedMenuItem.popupMenu !== jsObj._parentPopupMenu) {
                            jsObj.form._lastSelectedMenuItem.closeSubMenu();
                            jsObj.form._lastSelectedMenuItem.setActive(false);
                        }
                    }
                }
                i = jsObj.form._popups.length - 1;
                if (jsObj.form._popups.length > 0) {
                    if (jsObj !== jsObj.form._popups.last()._owner._control) {
                        if (jsObj.form._popups.indexOf(jsObj._parentPopupMenu._popupBox) > -1) {
                            while (jsObj.form._popups[i] !== jsObj._parentPopupMenu._popupBox) {
                                if (jsObj.form._popups[i]) {
                                    if (jsObj.form._popups[i]._owner._control instanceof $j.classes.Control) jsObj.form._popups[i].destroy();
                                    else jsObj.form._popups[i]._owner._control.closeSubMenu();
                                    jsObj.form._popups.removeAt(i);
                                }
                                i--;
                            }
                        }
                    }
                }
                if (jsObj._parentPopupMenu) {
                    items = jsObj._parentPopupMenu.items.filter(function (el) {
                        return el.active;
                    });
                }
            }
            if (!jsObj.popupMenu && jsObj.items.length > 0) {
                if (!jsObj._inMainMenu) jsObj.showSubMenu();
            }
            if (jsObj.enabled && jsObj.visible) {
                if (jsObj.hint !== String.EMPTY) {
                    if (jsObj.form._statusBar) {
                        if (jsObj.form._statusBar.autoHint) {
                            jsObj.form._statusBar.setSimplePanel(true);
                            jsObj.form._statusBar.setSimpleText(jsObj.hint.split('|').last());
                        }
                    }
                }
            }
        },
        HTMLMouseLeave: function (mouseEventArg) {
            var jsObj = this.jsObj;
            if (jsObj) jsObj.form._lastSelectedMenuItem = jsObj;
            if (jsObj.enabled && jsObj.visible) {
                if (jsObj.form._statusBar) {
                    if (jsObj.form._statusBar.autoHint) {
                        jsObj.form._statusBar.setSimplePanel(false);
                    }
                }
            }
        },
        destroy: function () {
            //if (!this._HTMLElement)) return;
            //for (var i=0,l=this.items.length;i<l;i++) {
            //  this.items[i].destroy();
            //  this.items[i]=null;
            //}
            this.action.removeTarget(this);
            while (this.items.length > 0) {
                this.items.last().destroy();
                this.items.pop();
            }
            this._inherited();
            this.items.destroy();
            this.items = null;
            //this._HTMLElement.jsObj=null;
            if (this._HTMLElement) {
                if (this.active && this.popupMenu) this.closeSubMenu();
                $j.tools.events.unBind(this._HTMLElement, $j.types.mouseEvents.CLICK, this.htmlClick);
                $j.tools.events.unBind(this._HTMLElement, $j.types.mouseEvents.ENTER, this.HTMLMouseEnter);
                $j.tools.events.unBind(this._HTMLElement, $j.types.mouseEvents.LEAVE, this.HTMLMouseLeave);
                if (this._htmlCaption) this._htmlCaption.remove();
                if (this._htmlShortcut) this._htmlShortcut.remove();
                if (this._htmlHasSubMenu) this._htmlHasSubMenu.remove();
                if (this.popupMenu) this.popupMenu.destroy();
                this._htmlCaption = null;
                this._htmlShortcut = null;
                this._htmlHasSubMenu = null;
                this.popupMenu = null;
                this._parentPopupMenu = null;
                this._HTMLElement.parentNode.removeChild(this._HTMLElement);
            }
            this._HTMLElement = null;
            this.action = null;
        },
        isEnabled: function () {
            return this._owner.enabled;
        },
        getChildsHTMLElement: function () {
            if (this._HTMLElement) {
                this._htmlCaption = this._HTMLElement.firstElementChild;
                this._htmlShortcut = this._htmlCaption.nextSibling;
                while (this._htmlShortcut.nodeType !== $j.types.xmlNodeTypes.ELEMENT_NODE) {
                    this._htmlShortcut = this._htmlShortcut.nextSibling;
                }
                this._htmlHasSubMenu = this._HTMLElement.lastElementChild;
            }
        },
        getActiveItem: function () {
            var activeMenuItem;
            activeMenuItem = this.items.filter(function (e, i, a) {
                return (e.enabled && e.visible && e.active);
            });
            return activeMenuItem.isEmpty() ? null : activeMenuItem.first();
        }
        //#endregion
    });
    //#endregion
    //#region MainMenu
    var MainMenu = $j.classes.Component.extend('MainMenu', {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._isActive = false;
                this._menuItems = [];
                this._HTMLMenu = $j.doc.createElement($j.types.HTMLElements.DIV);
                $j.CSS.addClass(this._HTMLMenu, 'Control MainMenu ' + this.form.getThemeName());
                //#endregion
                //this.items=[];
                $j.classes.newCollection(this, this, $j.classes.MenuItem);
                this.images = null;
            }
        },
        //#region Methods
        getChildsHTMLElement: function () {
            var items = [], item, queue = [], parent = null, nodes = [], i, l, cdata, top, data, node, idx;
            // on va chercher les items dans le CDATA
            cdata = this._HTMLElement.childNodes[0];
            if (cdata) {
                while (cdata && (cdata.nodeType !== $j.types.xmlNodeTypes.COMMENT_NODE)) {
                    cdata = cdata.nextSibling;
                }
                if (cdata) {
                    if (cdata.nodeValue !== String.EMPTY && cdata.nodeValue) items = JSON.parse(cdata.nodeValue);
                }
            }
            l = items.length;
            i = 0;
            Array.prototype.push.apply(nodes, items);
            while (!nodes.isEmpty()) {
                node = nodes.shift();
                item = new $j.classes.MenuItem((!parent) ? this : parent);
                if (node.name) item.name = node.name;
                if (node.caption) item.caption = node.caption;
                if (node.shortcut) item.shortcut = node.shortcut;
                if (node.enabled) item.enabled = node.enabled;
                if (node.visible) item.visible = node.visible;
                if (node.imageIndex) item.imageIndex = node.imageIndex;
                if (node.isChecked) item.isChecked = node.isChecked;
                if (node.autoCheck) item.autoCheck = node.autoCheck;
                if (node.isRadioItem) item.isRadioItem = node.isRadioItem;
                if (node.hint) item.hint = node.hint;
                if (node.action) item.action = node.action;
                if (node.onClick) {
                    if (typeof this.form[node.onClick] === _const.FUNCTION) item.onClick.addListener(this.form[node.onClick]);
                    else if (typeof node.onClick === _const.STRING) {
                        if (node.onClick !== String.EMPTY) item.onClick.addListener(new Function(node.onClick));
                    }
                }
                item.form = this.form;
                if (item.name !== String.EMPTY) item.form[item.name] = item;
                if (parent) parent.items.push(item);
                else {
                    this.items.push(item);
                    item._inMainMenu = true;
                }
                this._menuItems.push(item);
                if (node.items) {
                    if (node.items.length > 0) {
                        if (nodes.length > 0) queue.push({ 'parent': parent, 'items': nodes });
                        parent = item;
                        nodes = node.items;
                    }
                }
                if (nodes.isEmpty() && !queue.isEmpty()) {
                    nodes = queue.pop();
                    parent = nodes.parent;
                    nodes = nodes.items;
                }
            }
            this.form._layout._HTMLElement.appendChild(this._HTMLMenu);
        },
        generateItems: function () {
            var i, l, tpl, tmpDiv = $j.doc.createElement($j.types.HTMLElements.DIV);
            l = this.items.length;
            for (i = 0; i < l; i++) {
                if (this.items[i]._HTMLElement) {
                    this.items[i]._htmlCaption.remove();
                    this.items[i]._htmlCaption = null;
                    this.items[i]._htmlShortcut.remove();
                    this.items[i]._htmlShortcut = null;
                    this.items[i]._htmlHasSubMenu.remove();
                    this.items[i]._htmlHasSubMenu = null;
                    this.items[i]._HTMLElement.remove();
                    this.items[i]._HTMLElement = null;
                    $j.tools.events.unBind(this.items[i]._HTMLElement, $j.types.mouseEvents.CLICK, this.items[i].htmlClick);
                    $j.tools.events.unBind(this.items[i]._HTMLElement, $j.types.mouseEvents.ENTER, this.items[i].HTMLMouseEnter);
                    $j.tools.events.unBind(this.items[i]._HTMLElement, $j.types.mouseEvents.LEAVE, this.items[i].HTMLMouseLeave);
                }
            }
            for (i = 0; i < l; i++) {
                tpl = this.items[i].getTemplate();
                tmpDiv.innerHTML = tpl;
                this._HTMLMenu.appendChild(tmpDiv.firstElementChild);
                this.items[i].getHTMLElement(this.items[i]._internalId);
                this.items[i].getChildsHTMLElement();
                $j.CSS.addClass(this.items[i]._HTMLElement, 'inMainMenu');
                $j.CSS.addClass(this.items[i]._htmlCaption, 'inMainMenu');
                $j.CSS.addClass(this.items[i]._htmlShortcut, 'inMainMenu');
                $j.CSS.addClass(this.items[i]._htmlHasSubMenu, 'nochilds inMainMenu');
                $j.tools.events.bind(this.items[i]._HTMLElement, $j.types.mouseEvents.CLICK, this.items[i].htmlClick);
                $j.tools.events.bind(this.items[i]._HTMLElement, $j.types.mouseEvents.ENTER, this.items[i].HTMLMouseEnter);
                $j.tools.events.bind(this.items[i]._HTMLElement, $j.types.mouseEvents.LEAVE, this.items[i].HTMLMouseLeave);
            }
        },
        loaded: function () {
            this._inherited();
            this.getImages();
            this.generateItems();
            if (!this._loading && !this.form._loading) {
                if (!this.form.mainMenu) this.form.mainMenu = this;
                //if (!this.form.isBorderNone()) this._HTMLMenu.style.top=this.form._titleBar._HTMLElement.offsetHeight+$j.types.CSSUnits.PX;
                //this.form.resizeContent();
            }
        },
        destroy: function () {
            this._inherited();
            this.images = null;
            this.items.destroy();
            this.items = null;
            this._menuItems.clear();
            this._menuItems.destroy();
            this._menuItems = null;
            this._HTMLMenu = null;
        },
        getImages: function () {
            var data = this._HTMLElement.dataset.images;
            if (data) {
                if (this.form[data]) {
                    this.images = this.form[data];
                }
            }
        },
        isEnabled: function () {
            return this.enabled;
        },
        getActiveItem: function () {
            var activeMenuItem;
            activeMenuItem = this.items.filter(function (e, i, a) {
                return (e.enabled && e.visible && e.active);
            });
            return activeMenuItem.isEmpty() ? null : activeMenuItem.first();
        },
        getItemIndex: function (item) {
            return this.items.indexOf(item);
        },
        keyDown: function () {
            var activeMenuItem, idx, items, shortcut = String.EMPTY;
            activeMenuItem = this.getActiveItem();
            switch ($j.keyboard.keyCode) {
                case $j.types.VKeysCodes.VK_LEFT:
                case $j.types.VKeysCodes.VK_RIGHT:
                    if (!this.form._popups.isEmpty()) this.form._popups.last().keyDown();
                    else if (activeMenuItem) {
                        activeMenuItem.setActive(false);
                        idx = this.getItemIndex(activeMenuItem);
                        if ($j.keyboard.keyCode === $j.types.VKeysCodes.VK_RIGHT) idx++;
                        else idx--;
                        if (idx > this.items.length - 1) idx = 0;
                        if (idx < 0) idx = this.items.length - 1;
                        this.items[idx].setActive(true);
                    }
                    break;
                case $j.types.VKeysCodes.VK_DOWN:
                case $j.types.VKeysCodes.VK_UP:
                    if (!this.form._popups.isEmpty()) this.form._popups.last().keyDown();
                    else if (activeMenuItem) {
                        if (activeMenuItem.items.length > 0) {
                            if (!activeMenuItem.popupMenu) {
                                activeMenuItem.showSubMenu();
                                //if (activeMenuItem.items.first())) activeMenuItem.items.first().setActive(true);
                                if (!activeMenuItem.items.isEmpty()) {
                                    items = activeMenuItem.items.filter(function (e, i, a) {
                                        return (e.enabled && e.visible && !e.isLine());
                                    });
                                    if (items) {
                                        if (!items.isEmpty()) items.first().setActive(true);
                                    }
                                }
                            } else activeMenuItem.popupMenu.keyDown();
                        }
                    }
                    break;
                default:
                    //check if keydown is shortCut
                    // test ctrl key first
                    if ($j.keyboard.ctrl) shortcut += 'Ctrl';
                    if ($j.keyboard.alt) {
                        if (!shortcut.isEmpty()) shortcut += '+';
                        shortcut += 'Alt';
                    }
                    if ($j.keyboard.shift) {
                        if (!shortcut.isEmpty()) shortcut += '+';
                        shortcut += 'Shift';
                    }
                    if (!shortcut.isEmpty() && !$j.keyboard.keyChar.isEmpty()) shortcut += '+';
                    shortcut += $j.keyboard.keyChar.toUpperCase();
                    var menuItems = this._menuItems.filter(function (e, i, a) {
                        return (e.shortcut === shortcut);
                    });
                    if (menuItems.length > 0) menuItems.first().click();
                    break;
            }
        },
        keyUp: function () {
            var activeMenuItem, idx;
            activeMenuItem = this.getActiveItem();
            switch ($j.keyboard.keyCode) {
                case $j.types.VKeysCodes.VK_ALT:
                    if (activeMenuItem) {
                        activeMenuItem.setActive(false);
                        $j.CSS.removeClass(this._HTMLElement, 'isactive');
                        $j.CSS.removeClass(this._htmlCaption.firstElementChild, 'isactive');
                        this.form.closePopups();
                    } else {
                        if (!this.items.isEmpty()) {
                            items = this.items.filter(function (e, i, a) {
                                return (e.enabled && e.visible && !e.isLine());
                            });
                            if (items) {
                                if (!items.isEmpty()) items.first().setActive(true);
                            }
                        }
                        $j.CSS.addClass(this._HTMLElement, 'isactive');
                        $j.CSS.addClass(this._htmlCaption.firstElementChild, 'isactive');
                    }
                    break;
                case $j.types.VKeysCodes.VK_RETURN:
                case $j.types.VKeysCodes.VK_ENTER:
                    if (!this.form._popups.isEmpty()) this.form._popups.last().keyDown();
                    $j.keyboard.stopEvent();
                    break;
            }
        }
        //#endregion
    });
    Object.seal(MainMenu);
    //#endregion
    //#region PopupMenu
    var PopupMenu = $j.classes.Component.extend('PopupMenu', {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._popupBox = null;
                //#endregion
                this.images = null;
                //this.items=[];
                $j.classes.newCollection(this, this, $j.classes.MenuItem);
                this.onShow = new $j.classes.NotifyEvent(this);
            }
        },
        //#region Methods
        getChildsHTMLElement: function () {
            var items = [], item, queue = [], parent = null, nodes = [], i, l, cdata, node;
            if (this._HTMLElement) {
                // on va chercher les items dans le CDATA
                cdata = this._HTMLElement.childNodes;
                for (var i = 0, l = cdata.length; i < l; i++) {
                    if (cdata[i].nodeType === $j.types.xmlNodeTypes.COMMENT_NODE) {
                        if (cdata[i].nodeValue !== String.EMPTY && cdata[i].nodeValue) {
                            items = JSON.parse(cdata[i].nodeValue);
                            break;
                        }
                    }
                }
                l = items.length;
                i = 0;
                Array.prototype.push.apply(nodes, items);
                while (!nodes.isEmpty()) {
                    node = nodes.shift();
                    item = new $j.classes.MenuItem((!parent) ? this : parent);
                    item.name = node.name;
                    item.caption = node.caption;
                    item.shortcut = node.shortcut;
                    item.enabled = node.enabled;
                    item.visible = node.visible;
                    item.imageIndex = node.imageIndex;
                    if (node.isChecked) item.isChecked = node.isChecked;
                    if (node.autoCheck) item.autoCheck = node.autoCheck;
                    if (node.isRadioItem) item.isRadioItem = node.isRadioItem;
                    if (node.action) item.action = node.action;
                    if (node.onClick) {
                        if (typeof this.form[node.onClick] === _const.FUNCTION) item.onClick.addListener(this.form[node.onClick]);
                        else if (typeof node.onClick === _const.STRING) {
                            if (node.onClick !== String.EMPTY) item.onClick.addListener(new Function(node.onClick));
                        }
                    }
                    item.form = this.form;
                    if (item.name !== String.EMPTY) item.form[item.name] = item;
                    if (parent) parent.items.push(item);
                    else this.items.push(item);
                    if (node.items) {
                        if (node.items.length > 0) {
                            queue.push({ 'parent': parent, 'items': nodes });
                            parent = item;
                            nodes = node.items;
                        }
                    }
                    if (nodes.isEmpty() && !queue.isEmpty()) {
                        nodes = queue.pop();
                        parent = nodes.parent;
                        nodes = nodes.items;
                    }
                }
            }
        },
        loaded: function () {
            this.getImages();
            this._inherited();
        },
        getImages: function () {
            var data = this._HTMLElement.dataset.images;
            if (data) {
                if (this.form[data]) {
                    this.images = this.form[data];
                }
            }
        },
        destroy: function () {
            if (!this.form) return;
            this.close();
            this._inherited();
            this._control = null;
            this._popupBox = null;
            if (this.onShow) this.onShow.destroy(); this.onShow = null;
        },
        show: function (x, y) {
            var paddingTop = 0;
            this.onShow.invoke();
            this._popupBox = $j.classes.createComponent($j.classes.PopupMenuBox, this, null, { parentHTML: $j.doc.body });
            if (this._control) this._popupBox._control = this._control;
            else this._popupBox._control = this;
            if (this._control instanceof $j.classes.MenuItem && !this._control._inMainMenu) {
                paddingTop = parseInt(getComputedStyle(this._popupBox._HTMLElement.firstElementChild, null).paddingTop, 10);
            }
            y -= paddingTop;
            this._popupBox.show(x, y);
        },
        close: function () {
            if (this._popupBox) {
                this._popupBox.close();
                this._popupBox.destroy();
            }
            this._popupBox = null;
        },
        getItemIndex: function (item) {
            return this.items.indexOf(item);
        },
        getActiveItem: function () {
            var activeMenuItem;
            activeMenuItem = this.items.filter(function (e, i, a) {
                return (e.enabled && e.visible && e.active);
            });
            return activeMenuItem.isEmpty() ? null : activeMenuItem.first();
        },
        updateFromHTML: function () {
            this._inherited();
            this.bindEventToHTML("onShow");
        }
        //#endregion
    });
    //#endregion
    //#region PopupMenuBox
    var PopupMenuBox = $j.classes.PopupBox.extend('PopupMenuBox', {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                this._direction = $j.types.directions.RIGHT;
                this._zIndex = 10000;
            }
        },
        //#region Methods
        getTemplate: function () {
            var html = this._inherited(), a = html.split('{items}'), item, tpl;
            for (var i = 0, l = this._owner.items.length; i < l; i++) {
                item = this._owner.items[i];
                tpl = item.getTemplate();
                a.insert(a.length - 1, tpl);
            }
            html = a.join(String.EMPTY);
            return html;
        },
        destroy: function () {
            if (!this.form) return;
            this._inherited();
        },
        keyDown: function () {
            var activeMenuItem, idx, oldActiveMenuItem, items, form;
            activeMenuItem = this._owner.getActiveItem();
            this._inherited();
            form = this.form;
            switch ($j.keyboard.keyCode) {
                case $j.types.VKeysCodes.VK_LEFT:
                    if (activeMenuItem) {
                        if (activeMenuItem._owner.popupMenu) {
                            activeMenuItem._owner.closeSubMenu();
                            activeMenuItem._owner.setActive(true);
                            if (activeMenuItem._owner._owner === form.mainMenu) {
                                if (form.mainMenu.getActiveItem()) {
                                    form.mainMenu.keyDown();
                                    activeMenuItem = form.mainMenu.getActiveItem();
                                    activeMenuItem.showSubMenu();
                                    if (!activeMenuItem.items.isEmpty()) {
                                        items = activeMenuItem.items.filter(function (e, i, a) {
                                            return (e.enabled && e.visible && !e.isLine());
                                        });
                                        if (items) {
                                            if (!items.isEmpty()) items.first().setActive(true);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    break;
                case $j.types.VKeysCodes.VK_RIGHT:
                    if (activeMenuItem) {
                        if (activeMenuItem.items.length > 0) {
                            if (!activeMenuItem.popupMenu) {
                                activeMenuItem.showSubMenu();
                                if (!activeMenuItem.items.isEmpty()) {
                                    items = activeMenuItem.items.filter(function (e, i, a) {
                                        return (e.enabled && e.visible && !e.isLine());
                                    });
                                    if (items) {
                                        if (!items.isEmpty()) items.first().setActive(true);
                                    }
                                }
                            }
                        } else if (this.form.mainMenu.getActiveItem()) {
                            idx = form.mainMenu.getItemIndex(this.form.mainMenu.getActiveItem());
                            form.closePopups();
                            form.mainMenu.items[idx].setActive(true);
                            form.mainMenu.keyDown();
                            activeMenuItem = form.mainMenu.getActiveItem();
                            activeMenuItem.showSubMenu();
                            if (!activeMenuItem.items.isEmpty()) {
                                items = activeMenuItem.items.filter(function (e, i, a) {
                                    return (e.enabled && e.visible && !e.isLine());
                                });
                                if (items) {
                                    if (!items.isEmpty()) items.first().setActive(true);
                                }
                            }
                        }
                    }
                    break;
                case $j.types.VKeysCodes.VK_DOWN:
                case $j.types.VKeysCodes.VK_UP:
                    if (!activeMenuItem) {
                        if ($j.keyboard.keyCode === $j.types.VKeysCodes.VK_DOWN) {
                            if (!this._owner.items.isEmpty()) {
                                items = this._owner.items.filter(function (e, i, a) {
                                    return (e.enabled && e.visible && !e.isLine());
                                });
                                if (items) {
                                    if (!items.isEmpty()) items.first().setActive(true);
                                }
                            }
                        } else this._owner.items.last().setActive(true);
                    } else {
                        activeMenuItem.setActive(false);
                        idx = this._owner.getItemIndex(activeMenuItem);
                        if ($j.keyboard.keyCode === $j.types.VKeysCodes.VK_DOWN) idx++;
                        else idx--;
                        if (idx > this._owner.items.length - 1) idx = 0;
                        if (idx < 0) idx = this._owner.items.length - 1;
                        if (this._owner.items[idx].isLine() || !this._owner.items[idx].enabled) {
                            while (this._owner.items[idx].isLine() || !this._owner.items[idx].enabled) {
                                if ($j.keyboard.keyCode === $j.types.VKeysCodes.VK_DOWN) idx++;
                                else idx--;
                            }
                        }
                        if (idx > this._owner.items.length - 1) idx = 0;
                        if (idx < 0) idx = this._owner.items.length - 1;
                        this._owner.items[idx].setActive(true);
                    }
                    break;
            }
        },
        keyUp: function () {
            var activeMenuItem, idx;
            activeMenuItem = this._owner.getActiveItem();
            this._inherited();
            switch ($j.keyboard.keyCode) {
                case $j.types.VKeysCodes.VK_RETURN:
                case $j.types.VKeysCodes.VK_ENTER:
                    if (activeMenuItem) activeMenuItem.click();
                    if (!activeMenuItem.items.isEmpty()) {
                        items = activeMenuItem.items.filter(function (e, i, a) {
                            return (e.enabled && e.visible && !e.isLine());
                        });
                        if (items) {
                            if (!items.isEmpty()) items.first().setActive(true);
                        }
                    }
                    break;
            }
        },
        close: function () {
            for (var i = 0, l = this._owner.items.length; i < l; i++) {
                var item = this._owner.items[i];
                item.setActive(false);
                if (item._HTMLElement) {
                    item._HTMLElement.jsObj = null;
                    $j.tools.events.unBind(item._HTMLElement, $j.types.mouseEvents.CLICK, item.click);
                    $j.tools.events.unBind(item._HTMLElement, $j.types.mouseEvents.ENTER, item.HTMLMouseEnter);
                    $j.tools.events.unBind(item._HTMLElement, $j.types.mouseEvents.LEAVE, item.HTMLMouseLeave);
                    if (!item.isLine()) {
                        item._HTMLElement.removeChild(item._htmlCaption);
                        item._HTMLElement.removeChild(item._htmlHasSubMenu);
                        item._HTMLElement.removeChild(item._htmlShortcut);
                    }
                    item._parentPopupMenu = null;
                    item._HTMLElement.parentNode.removeChild(item._HTMLElement);
                    item._HTMLElement = null;
                }
            }
            if (this._control) $j.CSS.removeClass(this._control._HTMLElement, 'opened');
            if (this._HTMLElement) {
                if (this._HTMLElement.firstElementChild) this._HTMLElement.removeChild(this._HTMLElement.firstElementChild);
                this._HTMLElement.parentNode.removeChild(this._HTMLElement);
                this._HTMLElement = null;
            }
            if (this.form._popups) this.form._popups.remove(this);
        },
        show: function (x, y) {
            this._inherited(x, y);
            this._direction = $j.types.directions.RIGHT;
            for (var i = 0, l = this._owner.items.length; i < l; i++) {
                var item = this._owner.items[i];
                item._HTMLElement = $j.doc.getElementById(item._internalId);
                item._HTMLElement.jsObj = item;
                item._HTMLElement.dataset.ischecked = item.isChecked;
                item._HTMLElement.dataset.isradioitem = item.isRadioItem;
                item._parentPopupMenu = this._owner;
                if (item.caption !== _const.LINECAPTION) {
                    item._htmlCaption = item._HTMLElement.firstElementChild;
                    item._htmlShortcut = item._htmlCaption.nextSibling;
                    while (item._htmlShortcut.nodeType !== $j.types.xmlNodeTypes.ELEMENT_NODE) {
                        item._htmlShortcut = item._htmlShortcut.nextSibling;
                    }
                    item._htmlHasSubMenu = item._HTMLElement.lastElementChild;
                }
                $j.tools.events.bind(item._HTMLElement, $j.types.mouseEvents.CLICK, item.htmlClick);
                $j.tools.events.bind(item._HTMLElement, $j.types.mouseEvents.ENTER, item.HTMLMouseEnter);
                $j.tools.events.bind(item._HTMLElement, $j.types.mouseEvents.LEAVE, item.HTMLMouseLeave);
                if (item.isChecked) $j.CSS.addClass(item._HTMLElement, 'ischecked');
                if (item.isRadioItem) $j.CSS.addClass(item._HTMLElement, 'isradioitem');
                if (!item.enabled) $j.CSS.addClass(item._HTMLElement, 'disabled');
                if (!item.visible) $j.CSS.addClass(item._HTMLElement, 'noDisplay');
                if (item.items.length === 0) $j.CSS.addClass(item._htmlHasSubMenu, 'nochilds');
                $j.CSS.addClass(item._HTMLElement, this.form.getThemeName());
            }
            if (this._HTMLElement.offsetTop + this._HTMLElement.offsetHeight > $j.doc.body.offsetHeight) {
                if (this._control instanceof $j.classes.MenuItem) {
                    this._HTMLElementStyle.top = (this._HTMLElement.offsetTop - this._HTMLElement.offsetHeight + this._control._HTMLElement.offsetHeight) + $j.types.CSSUnits.PX;
                } else this._HTMLElementStyle.top = ($j.doc.body.offsetHeight - this._HTMLElement.offsetHeight - 5) + $j.types.CSSUnits.PX;
            }
            if (!(this._control instanceof $j.classes.MenuItem)) {
                if (this._HTMLElement.offsetLeft + this._HTMLElement.offsetWidth > $j.doc.body.offsetWidth) {
                    this._HTMLElementStyle.left = '0';
                    this._HTMLElementStyle.left = ($j.doc.body.offsetWidth - this._HTMLElement.offsetWidth - 5) + $j.types.CSSUnits.PX;
                    this._direction = $j.types.directions.LEFT;
                }
            } else {
                if (this._control._parentPopupMenu) this._direction = this._control._parentPopupMenu._popupBox._direction;
                if (this._HTMLElement.offsetLeft + this._HTMLElement.offsetWidth > $j.doc.body.offsetWidth) this._direction = $j.types.directions.LEFT;
                // on part de droite à gauche
                if (this._direction === $j.types.directions.LEFT) {
                    this._HTMLElementStyle.left = '0';
                    this._HTMLElementStyle.left = (this._control._parentPopupMenu._popupBox._HTMLElement.offsetLeft - this._HTMLElement.offsetWidth) + $j.types.CSSUnits.PX;
                }
            }
            this._HTMLElementStyle.zIndex = this._zIndex;
            $j.CSS.addClass(this._HTMLElement, 'animated fadeIn');
        }
        //#endregion
    });
    //#endregion
    $j.classes.register($j.types.categories.MENUS, MainMenu, PopupMenu);
    $j.classes.register($j.types.categories.INTERNAL, MenuItem, PopupMenuBox);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var MainMenuTpl = "<div id='{internalId}' data-name='{name}' data-class='MainMenu' class='ShortCutIcon'>\
                     <div class='ShortCutIconImg mainmenu'></div>\
                     <div class='ShortCutIconCaption'>{name}</div>\
                     </div>",
            PopupMenuTpl = "<div id='{internalId}' data-name='{name}' data-class='PopupMenu' class='ShortCutIcon'>\
                      <div class='ShortCutIconImg popupmenu'></div>\
                      <div class='ShortCutIconCaption'>{name}</div>\
                      </div>",
            MenuItemTpl = "<div id='{internalId}' class='Control MenuItem {theme}'>\
                     <span class='MenuItemCaption {theme}' {icon}>{caption}</span>\
                     <span class='MenuItemShortCut {theme}'>{shortcut}</span>\
                     <span class='MenuItemHasSubMenu {theme}' data-visible='{asChilds}'></span>\
                     </div>",
            PopupMenuBoxTpl = "<div id='{internalId}' data-name='{name}' data-class='PopupMenuBox' class='Control PopupMenuBox PopupBox csr_default animated {theme}'>\
                         <div class='Control subMenu {theme}'>\
                         {items}\
                         </div></div>",
            MenuItemSepTpl = "<div id='{internalId}' class='Control MenuItemSep {theme}'></div>";
        $j.classes.registerTemplates([{ Class: MenuItem, template: MenuItemTpl }, { Class: MainMenu, template: MainMenuTpl },
        { Class: 'MenuItemSep', template: MenuItemSepTpl },
        { Class: PopupMenuBox, template: PopupMenuBoxTpl },
        { Class: PopupMenu, template: PopupMenuTpl }]);
    }
    //#endregion
    })();
    */