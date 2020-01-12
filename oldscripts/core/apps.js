define(['require'], function (require) {
    var apps = {
        applications: {},
        activeApplication: null,
        capslock: "UNKNOWN",
        //#region Methods
        createApp: function (appName, path) {
            var icon;
            if (Core.isHTMLRenderer())
            {
                icon = Core.doc.getElementById(appName + "_Icon");
                if (icon)
                {
                    //$j.CSS.addClass(icon,"noDisplay");
                    icon = Core.doc.getElementById(Tools.currentProgress);
                    if (!icon)
                    {
                        Core.doc.body.appendChild(Core.doc.createElement("span"));
                        Core.doc.body.lastElementChild.className = Core.doc.body.className + " Control loading_text";
                        Core.doc.body.lastElementChild.id = "loading_msg";
                        Core.doc.body.lastElementChild.innerHTML = "Loading " + appName + " application<br />Please wait...";
                    }
                }
            }
            if (!path) path = Core.folders["{APPS}"];
            else if (!path.endsWith("/")) path += "/";
            //Tools.scripts.length = 0;
            //Tools.scripts.idx = 0;
            //if (Core.isHTMLRenderer()) Tools.currentProgress = "progressInner";
            //Tools.uses(path + appName + "/" + appName);
            //Tools.loadScript();
            require([path + appName + "/" + appName], function () {
            });
        },
        killApp: function () {
            Core.apps.activeApplication.terminate();
        },
        keyDown: function (keyBoardEventArgs) {
            var form, list = [], obj, found = false, curIdx, l, obj, dealEvent = true;
            var Types = require("types");
            var Core = require("core");
            var Keyboard = require("keyboard");
            if (Core.apps.activeApplication) form = Core.apps.activeApplication.activeWindow;
            Keyboard.getKeyboardInfos(event);
            obj = event.target;
            if (obj !== Core.doc.body)
            {
                if (obj.jsObj)
                {
                    dealEvent = obj.jsObj._stopEvent;
                }
            }
            dealEvent = dealEvent || Keyboard.keyCode === Types.VKEYSCODES.VK_ALT || Keyboard.keyCode === Types.VKEYSCODES.VK_TAB || (form.mainMenu) && form.mainMenu.getActiveItem();
            if (dealEvent)
            {
                switch (Keyboard.keyCode)
                {
                    case Types.VKEYSCODES.VK_SPACE:
                    case Types.VKEYSCODES.VK_RETURN:
                        if (form)
                        {
                            if (form._focusedControl) form._focusedControl.keyDown();
                            else form.keyDown();
                        }
                        //$j.keyboard.stopEvent();
                        break;
                    case Types.VKEYSCODES.VK_TAB:
                        form.closePopups();
                        form._content.getTabOrderList(list, true);
                        if (Keyboard.shift)
                        {
                            // second search in first part of list
                            if (form._focusedControl) curIdx = list.indexOf(form._focusedControl) - 1;
                            else curIdx = list.length - 1;
                            if (curIdx >= 0)
                            {
                                for (i = curIdx; i >= 0; i--)
                                {
                                    obj = list[i];
                                    if (obj.canFocused && obj.visible && obj.isEnabled())
                                    {
                                        obj.setFocus();
                                        found = true;
                                        break;
                                    }
                                }
                            }
                            // first search in last part of list
                            if (!found)
                            {
                                if ((list.length > 2) && (curIdx < list.length))
                                {
                                    for (i = list.length - 1; i > curIdx; i--)
                                    {
                                        obj = list[i];
                                        if (obj.canFocused && obj.visible && obj.isEnabled())
                                        {
                                            obj.setFocus();
                                            break;
                                        }
                                    }
                                }
                            }
                        } else
                        {
                            if (form._focusedControl) curIdx = list.indexOf(form._focusedControl) + 1;
                            else curIdx = 0;
                            // first search in last part of list
                            l = list.length;
                            if ((list.length > 2) && (curIdx < l))
                            {
                                for (i = curIdx; i < l; i++)
                                {
                                    obj = list[i];
                                    if (obj.canFocused && obj.visible && obj.isEnabled())
                                    {
                                        obj.setFocus();
                                        found = true;
                                        break;
                                    }
                                }
                            }
                            // second search in first part of list
                            if (!found)
                            {
                                if (curIdx > 0)
                                {
                                    for (i = 0; i < curIdx; i++)
                                    {
                                        obj = list[i];
                                        if (obj.canFocused && obj.visible && obj.isEnabled())
                                        {
                                            obj.setFocus();
                                            break;
                                        }
                                    }
                                }
                            }
                        }
                        list.clear();
                        //$j.keyboard.stopEvent();
                        break;
                    default:
                        if (form.mainMenu)
                        {
                            if (form.mainMenu.getActiveItem())
                            {
                                form.mainMenu.keyDown();
                                break;
                            }
                            if (Keyboard.ctrl || Keyboard.alt || Keyboard.shift)
                            {
                                if (form.mainMenu) form.mainMenu.keyDown();
                            }
                        }
                        if (!form._popups.isEmpty())
                        {
                            if (form._popups.last() instanceof Classes.PopupMenu)
                            {
                                form._popups.last().keyDown();
                                break;
                            }
                        }
                        if (form._focusedControl) form._focusedControl.keyDown();
                        else form.keyDown();
                        //$j.keyboard.stopEvent();
                        break;
                }
                Keyboard.stopEvent();
            } else if (form._focusedControl) form._focusedControl.keyDown();
        },
        keyUp: function (keyBoardEventArgs) {
            var form, owner;
            if (Keyboard === undefined) return;
            var Types = require("Types");
            if (Core.apps.activeApplication) form = Core.apps.activeApplication.activeWindow;
            if (!form) return;
            Keyboard.getKeyboardInfos(event);
            switch (Keyboard.keyCode)
            {
                case Types.VKEYSCODES.VK_ALT:
                    if (form.mainMenu)
                    {
                        if (!Keyboard.ctrl && !Keyboard.shift && !Keyboard.meta) form.mainMenu.keyUp();
                    }
                    Keyboard.stopEvent();
                    break;
                case Types.VKEYSCODES.VK_ESCAPE:
                    // à exporter dans window.js
                    if (form)
                    {
                        if (!form._popups.isEmpty())
                        {
                            owner = form._popups.last()._owner._control;
                            if (owner.closeSubMenu)
                            {
                                owner.closeSubMenu();
                                owner.setActive(true);
                            } else form.closePopups();
                        } else
                        {
                            if (form.mainMenu)
                            {
                                if (form.mainMenu.getActiveItem())
                                {
                                    form.mainMenu.getActiveItem().setActive(false);
                                    CSS.removeClass(form.mainMenu._HTMLElement, "isactive");
                                } else form.close();
                            } else form.close();
                        }
                    }
                    break;
                case Types.VKEYSCODES.VK_SPACE:
                case Types.VKEYSCODES.VK_RETURN:
                    if (form)
                    {
                        if (!form._popups.isEmpty()) form._popups.last().keyUp();
                        else if (form._focusedControl) form._focusedControl.keyUp();
                    }
                    break;
                case Types.VKEYSCODES.VK_TAB:
                    Keyboard.stopEvent();
                    break;
                default:
                    if (form._focusedControl) form._focusedControl.keyUp();
                    else form.keyUp();
                    break;
            }
        },
        keyPress: function (keyBoardEventArgs) {
            var form, shifton = false;
            if (Core.apps.activeApplication) form = Core.apps.activeApplication.activeWindow;
            if (!form) return;
            Keyboard.getKeyboardInfos(event);
            // test CapsLock
            Core.apps.capslock = "OFF";
            if (Keyboard.shift) shifton = Keyboard.shift;
            else if (keyBoardEventArgs.modifiers) shifton = !!(keyBoardEventArgs.modifiers & 4);
            if ((Keyboard.keyCode >= Types.VKEYSCODES.VK_NUMPAD1 && Keyboard.keyCode <= Types.VKEYSCODES.VK_F11 && shifton) || (Keyboard.keyCode >= Types.VKEYSCODES.VK_A && Keyboard.keyCode <= Types.VKEYSCODES.VK_Z && !shifton)) Core.apps.capslock = "ON";
        
            if (form._focusedControl) form._focusedControl.keyPress();
            else form.keyPress();
        }
        //#endregion Methods
    };
    //#endregion Apps
    
    return apps;
});