//#region Imports
import '/scripts/core/types.js';
import '/scripts/core/classes.js';
import '/scripts/core/browser.js';
import '/scripts/core/keyboard.js';
import '/scripts/core/mouse.js';
import '/scripts/core/ext_array.js';
import '/scripts/core/ext_string.js';
import '/scripts/core/ext_math.js';
import '/scripts/core/ext_date.js';
import '/scripts/core/animatedcursor.js';

import '/scripts/core/looper.js';
import '/scripts/core/events.js';

import '/scripts/core/classes.js';
import '/scripts/core/bindable.js';
import '/scripts/core/component.js';
import '/scripts/core/themedcontrol.js';
import '/scripts/components/control.js';
import '/scripts/core/thememanifest.js';

import '/scripts/core/baseclass.js';
import { Tools } from '/scripts/core/tools.js';
import { Css } from '/scripts/core/css.js';
import { Keyboard } from '/scripts/core/keyboard.js';
//#endregion
/**
 * Class representing an Apps, applications management
 */
let Apps = (() => {
    const _private = new WeakMap();
    const internal = (key) => {
        // Initialize if not created
        if (!_private.has(key)) {
            _private.set(key, {});
        }
        // Return private properties object
        return _private.get(key);
    };
    class Apps {
        /**
         * Create a new instance of Application.
         */
        constructor() {
            const priv = internal(this);
            priv.applications = {};
            priv.activeApplication = null;
            priv.capslock = 'UNKNOWN';
        }
        /**
         * Get the applications list
         */
        get applications() {
            return internal(this).applications;
        }
        /**
         * Get the activeApplication
         * @return  {Application}   the active application
         */
        get activeApplication() {
            return internal(this).activeApplication;
        }
        /**
         * Set the activeApplication
         * @return  {Application}   the active application
         */
        set activeApplication(newValue) {
            const priv = internal(this);
            if (newValue instanceof Core.classes.Application || newValue == null) {
                if (priv.activeApplication !== newValue) {
                    priv.activeApplication = newValue;
                }
            }
        }
        /**
         * Get the capslock
         */
        get capslock() {
            return internal(this).capslock;
        }
        /**
         * Set the capslock
         */
        set capslock(newValue) {
            const priv = internal(this);
            if (Tools.isString(newValue)) {
                priv.capslock = newValue;
            }
        }
        //#region Getter/Setter
        //#endregion
        //#region Methods
        /**
         * Create an application
         * @param {String} appName - The application name
         * @param {String} path - The application path
         */
        async createApp(appClass) {
            //let icon;
            //if (Core.isHTMLRenderer) {
            //    icon = document.getElementById(`${appName}_Icon`);
            //    if (icon) {
            //        //$j.CSS.addClass(icon,"noDisplay");
            //        icon = document.getElementById(Tools.currentProgress);
            //        if (!icon) {
            //            document.body.appendChild(document.createElement("span"));
            //            document.body.lastElementChild.className = `${document.body.className} Control loading_text`;
            //            document.body.lastElementChild.id = "loading_msg";
            //            document.body.lastElementChild.innerHTML = `Loading ${appName} application<br />Please wait...`;
            //        }
            //    }
            //}
            Core.start();
            const currentLocale = `/scripts/locales/${Core.currentLocale}.js`;
            await import(currentLocale);
            this.activeApplication = new appClass;
            document.body.classList.add(this.activeApplication.themeManifest.themeName);
        }
        /**
         * Kill the active application
         */
        killApp() {
            Core.apps.activeApplication.terminate();
        }
        /**
         * General keyDown event
         * @param {keyBoardEventArgs} keyBoardEventArgs - The keyboard event
         */
        keyDown(keyBoardEventArgs) {
            console.log('keyDown');
            let form = null;
            let list = [];
            let obj = null;
            let found = false;
            let curIdx = null;
            let l = null;
            let dealEvent = true;
            let i = null;
            const vKeysCodes = Keyboard.VKEYSCODES;
            if (Core.apps.activeApplication) {
                form = Core.apps.activeApplication.activeWindow;
            }
            Core.keyboard.getKeyboardInfos(event);
            obj = event.target;
            if (obj !== document.body) {
                if (obj.jsObj) {
                    dealEvent = obj.jsObj.stopEvent;
                }
            }
            dealEvent = dealEvent || Core.keyboard.keyCode === vKeysCodes.VK_ALT || Core.keyboard.keyCode === vKeysCodes.VK_TAB || form.mainMenu && form.mainMenu.activeItem;
            if (dealEvent) {
                switch (Core.keyboard.keyCode) {
                    case vKeysCodes.VK_SPACE:
                    case vKeysCodes.VK_RETURN:
                        if (form) {
                            if (form.focusedControl) {
                                form.focusedControl.keyDown();
                            } else {
                                form.keyDown();
                            }
                        }
                        //$j.keyboard.stopEvent();
                        break;
                    case vKeysCodes.VK_TAB:
                        form.closePopups();
                        form.content.getTabOrderList(list, true);
                        if (Core.keyboard.shift) {
                            // second search in first part of list
                            if (form.focusedControl) {
                                curIdx = list.indexOf(form.focusedControl) - 1;
                            } else {
                                curIdx = list.length - 1;
                            }
                            if (curIdx >= 0) {
                                // à remplacer par un filter
                                for (i = curIdx; i >= 0; i--) {
                                    obj = list[i];
                                    if (obj.canFocused && obj.visible && obj.isEnabled) {
                                        obj.setFocus();
                                        found = true;
                                        break;
                                    }
                                }
                            }
                            // first search in last part of list
                            if (!found) {
                                if (list.length > 2 && curIdx < list.length) {
                                    // à remplacer par un filter
                                    for (i = list.length - 1; i > curIdx; i--) {
                                        obj = list[i];
                                        if (obj.canFocused && obj.visible && obj.isEnabled) {
                                            obj.setFocus();
                                            break;
                                        }
                                    }
                                }
                            }
                        } else {
                            if (form.focusedControl) {
                                curIdx = list.indexOf(form.focusedControl) + 1;
                            } else {
                                curIdx = 0;
                            }
                            // first search in last part of list
                            l = list.length;
                            if (list.length > 2 && curIdx < l) {
                                // à remplacer par un filter
                                for (i = curIdx; i < l; i++) {
                                    obj = list[i];
                                    if (obj.canFocused && obj.visible && obj.isEnabled) {
                                        obj.setFocus();
                                        found = true;
                                        break;
                                    }
                                }
                            }
                            // second search in first part of list
                            if (!found) {
                                if (curIdx > 0) {
                                    // à remplacer par un filter
                                    for (i = 0; i < curIdx; i++) {
                                        obj = list[i];
                                        if (obj.canFocused && obj.visible && obj.isEnabled) {
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
                        if (form.mainMenu) {
                            if (form.mainMenu.activeItem) {
                                form.mainMenu.keyDown();
                                break;
                            }
                            if (Core.keyboard.ctrl || Core.keyboard.alt || Core.keyboard.shift) {
                                if (form.mainMenu) form.mainMenu.keyDown();
                            }
                        }
                        if (!form.popups.isEmpty) {
                            if (Core.classes.PopupMenu && form.popups.last instanceof Core.classes.PopupMenu) {
                                form.popups.last.keyDown();
                                break;
                            }
                        }
                        if (form.focusedControl) {
                            form.focusedControl.keyDown();
                        } else {
                            form.keyDown();
                        }
                        //$j.keyboard.stopEvent();
                        break;
                }
                Core.keyboard.stopEvent();
            } else if (form.focusedControl) {
                form.focusedControl.keyDown();
            }
        }
        /**
         * General keyUp event
         * @param {keyBoardEventArgs} keyBoardEventArgs - The keyboard event
         */
        keyUp() {
            console.log('keyUp');
            let form = null;
            const vKeysCodes = Keyboard.VKEYSCODES;
            if (Core.apps.activeApplication) {
                form = Core.apps.activeApplication.activeWindow;
            }
            if (Core.keyboard && form) {
                Core.keyboard.getKeyboardInfos(event);
                switch (Core.keyboard.keyCode) {
                    case vKeysCodes.VK_ALT:
                        if (form.mainMenu) {
                            if (!Core.keyboard.ctrl && !Core.keyboard.shift && !Core.keyboard.meta) {
                                form.mainMenu.keyUp();
                            }
                        }
                        Core.keyboard.stopEvent();
                        break;
                    case vKeysCodes.VK_ESCAPE:
                        // à exporter dans window.js
                        if (form) {
                            if (!form.popups.isEmpty) {
                                let owner = null;
                                owner = form.popups.last.owner.control;
                                if (owner.closeSubMenu) {
                                    owner.closeSubMenu();
                                    owner.active = true;
                                } else {
                                    form.closePopups();
                                }
                            } else {
                                if (form.mainMenu) {
                                    if (form.mainMenu.getActiveItem()) {
                                        form.mainMenu.getActiveItem().active = false;
                                        Css.addClass(form.mainMenu.HTMLElement, 'inactive');
                                    } else {
                                        form.close();
                                    }
                                } else {
                                    form.close();
                                }
                            }
                        }
                        break;
                    case vKeysCodes.VK_SPACE:
                    case vKeysCodes.VK_RETURN:
                        if (form) {
                            if (!form.popups.isEmpty) {
                                form.popups.last.keyUp();
                            } else if (form.focusedControl) {
                                form.focusedControl.keyUp();
                            }
                        }
                        break;
                    case vKeysCodes.VK_TAB:
                        Core.keyboard.stopEvent();
                        break;
                    default:
                        if (form.focusedControl) {
                            form.focusedControl.keyUp();
                        } else {
                            form.keyUp();
                        }
                        break;
                }
            }
        }
        /**
         * General keyPress event
         * @param {keyBoardEventArgs} keyBoardEventArgs - The keyboard event
         */
        keyPress(keyBoardEventArgs) {
            console.log('keyPress');
            let form = null;
            const keyCode = Core.keyboard.keyCode;
            const vKeysCodes = Keyboard.VKEYSCODES;
            if (Core.apps.activeApplication) {
                form = Core.apps.activeApplication.activeWindow;
            }
            if (form) {
                Core.keyboard.getKeyboardInfos(event);
                // test CapsLock
                Core.apps.capslock = 'OFF';
                let shiftOn = false;
                if (Core.keyboard.shift) {
                    shiftOn = Core.keyboard.shift;
                } else if (keyBoardEventArgs.modifiers) {
                    shiftOn = !!(keyBoardEventArgs.modifiers & 4);
                }
                if (keyCode >= vKeysCodes.VK_NUMPAD1 && keyCode <= vKeysCodes.VK_F11 && shiftOn || keyCode >= vKeysCodes.VK_A && 
                    keyCode <= vKeysCodes.VK_Z && !shiftOn) {
                    Core.apps.capslock = 'ON';
                }

                if (form.focusedControl) {
                    form.focusedControl.keyPress();
                } else {
                    form.keyPress();
                }
            }
        }
        renderApplications() {
            const apps = this.applications;
            const keys = Object.keys(apps);
            keys.forEach(key => {
                apps[key].render();
            });
        }
        //#endregion Methods
    }
    return Apps;
})();
//#endregion Apps
Core.apps = new Apps;
Core.classes.register(Types.CATEGORIES.INTERNAL, Apps);
export { Apps };