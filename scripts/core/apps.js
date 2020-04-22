//#region Imports
import '/scripts/core/classes.js';
import '/scripts/core/types.js';
import '/scripts/core/tools.js';
import '/scripts/core/baseclass.js';
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

import '/scripts/core/bindable.js';
import '/scripts/core/component.js';
import '/scripts/core/themedcontrol.js';
import '/scripts/components/control.js';
import '/scripts/core/thememanifest.js';

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
    //#region Class Apps
    class Apps {
        /**
         * Create a new instance of Application.
         */
        //#region constructor
        constructor() {
            //#region Properties
            //#region Private Properties
            const priv = internal(this);
            priv.applications = {};
            priv.activeApplication = null;
            priv.capslock = 'UNKNOWN';
            //#endregion Private Properties
            //#region Public Properties
            Object.defineProperties(this, {
                'applications': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).applications;
                    }
                },
                'activeApplication': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).activeApplication;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        newValue instanceof core.classes.Application || newValue == null &&
                            priv.activeApplication !== newValue ?
                            priv.activeApplication = newValue : 1;
                    }
                },
                'capslock': {
                    enumerable: !1,
                    configurable: !0,
                    get: function () {
                        return internal(this).capslock;
                    },
                    set: function (newValue) {
                        //#region Variables déclaration
                        const priv = internal(this);
                        //#endregion Variables déclaration
                        core.tools.isString(newValue) ? priv.capslock = newValue : 1;
                    }
                }
            });
            //#endregion Public Properties
            //#endregion Properties
        }
        //#endregion constructor
        //#region Methods
        /**
         * Create an application
         * @param {String} appName - The application name
         * @param {String} path - The application path
         */
        //#region createApp
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
            core.start();
            const currentLocale = `/scripts/locales/${core.currentLocale}.js`;
            await import(currentLocale);
            this.activeApplication = new appClass;
            document.body.classList.add(this.activeApplication.themeManifest.themeName);
        }
        //#endregion createApp
        /**
         * Kill the active application
         */
        //#region killApp
        killApp() {
            core.apps.activeApplication.terminate();
        }
        //#endregion killApp
        /**
         * General keyDown event
         * @param {keyBoardEventArgs} keyBoardEventArgs - The keyboard event
         */
        //#region keyDown
        keyDown(keyBoardEventArgs) {
            console.log('keyDown');
            //#region Variables déclaration
            let form = null;
            let list = [];
            let obj = null;
            let found = false;
            let curIdx = null;
            let l = null;
            let dealEvent = true;
            let i = null;
            const vKeysCodes = Keyboard.VKEYSCODES;
            const keyboard = core.keyboard;
            const activeApplication = core.apps.activeApplication;
            const classes = core.classes;
            //#endregion Variables déclaration
            activeApplication ? form = activeApplication.activeWindow : 1;
            keyboard.getKeyboardInfos(event);
            obj = event.target;
            obj !== document.body && obj.jsObj ? dealEvent = obj.jsObj.stopEvent : 1;
            dealEvent = dealEvent || keyboard.keyCode === vKeysCodes.VK_ALT || keyboard.keyCode === vKeysCodes.VK_TAB || form.mainMenu && form.mainMenu.activeItem;
            if (dealEvent) {
                switch (keyboard.keyCode) {
                    case vKeysCodes.VK_SPACE:
                    case vKeysCodes.VK_RETURN:
                        form ? form.focusedControl ? form.focusedControl.keyDown() : form.keyDown() : 1;
                        break;
                    case vKeysCodes.VK_TAB:
                        form.closePopups();
                        form.content.getTabOrderList(list, true);
                        if (keyboard.shift) {
                            // second search in first part of list
                            form.focusedControl ? curIdx = list.indexOf(form.focusedControl) - 1 : curIdx = list.length - 1;
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
                            if (!found && list.length > 2 && curIdx < list.length) {
                                // à remplacer par un filter
                                for (i = list.length - 1; i > curIdx; i--) {
                                    obj = list[i];
                                    if (obj.canFocused && obj.visible && obj.isEnabled) {
                                        obj.setFocus();
                                        break;
                                    }
                                }
                            }
                        } else {
                            form.focusedControl ? curIdx = list.indexOf(form.focusedControl) + 1 : curIdx = 0;
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
                            if (!found && curIdx > 0) {
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
                        list.clear();
                        //$j.keyboard.stopEvent();
                        break;
                    default:
                        if (form.mainMenu) {
                            if (form.mainMenu.activeItem) {
                                form.mainMenu.keyDown();
                                break;
                            }
                            (keyboard.ctrl || keyboard.alt || keyboard.shift) && form.mainMenu
                                ? form.mainMenu.keyDown()
                                : 1;
                        }
                        if (!form.popups.isEmpty && classes.PopupMenu && form.popups.last instanceof classes.PopupMenu) {
                            form.popups.last.keyDown();
                            break;
                        }
                        form.focusedControl ? form.focusedControl.keyDown() : form.keyDown();
                        break;
                }
                keyboard.stopEvent();
            } else if (form.focusedControl) {
                form.focusedControl.keyDown();
            }
        }
        //#endregion keyDown
        /**
         * General keyUp event
         * @param {keyBoardEventArgs} keyBoardEventArgs - The keyboard event
         */
        //#region keyUp
        keyUp() {
            //#region Variables déclaration
            let form = null;
            const vKeysCodes = Keyboard.VKEYSCODES;
            const keyboard = core.keyboard;
            const activeApplication = core.apps.activeApplication;
            //#endregion Variables déclaration
            activeApplication ? form = activeApplication.activeWindow : 1;
            if (keyboard && form) {
                keyboard.getKeyboardInfos(event);
                switch (keyboard.keyCode) {
                    case vKeysCodes.VK_ALT:
                        form.mainMenu && !keyboard.ctrl && !keyboard.shift && !keyboard.meta ?
                            form.mainMenu.keyUp() : 1;
                        keyboard.stopEvent();
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
                            !form.popups.isEmpty
                                ? form.popups.last.keyUp()
                                : form.focusedControl
                                    ? form.focusedControl.keyUp()
                                    : 1;
                        }
                        break;
                    case vKeysCodes.VK_TAB:
                        keyboard.stopEvent();
                        break;
                    default:
                        form.focusedControl ? form.focusedControl.keyUp() : form.keyUp();
                        break;
                }
            }
        }
        //#endregion keyUp
        /**
         * General keyPress event
         * @param {keyBoardEventArgs} keyBoardEventArgs - The keyboard event
         */
        //#region keyPress
        keyPress(keyBoardEventArgs) {
            //#region Variables déclaration
            let form = null;
            const keyboard = core.keyboard;
            const keyCode = keyboard.keyCode;
            const vKeysCodes = Keyboard.VKEYSCODES;
            const apps = core.apps;
            const activeApplication = apps.activeApplication;
            //#endregion Variables déclaration
            activeApplication ? form = activeApplication.activeWindow : 1;
            if (form) {
                keyboard.getKeyboardInfos(event);
                // test CapsLock
                apps.capslock = 'OFF';
                let shiftOn = false;
                keyboard.shift
                    ? shiftOn = keyboard.shift
                    : keyBoardEventArgs.modifiers
                        ? shiftOn = !!(keyBoardEventArgs.modifiers & 4)
                        : 1;
                keyCode >= vKeysCodes.VK_NUMPAD1 && keyCode <= vKeysCodes.VK_F11 && shiftOn || keyCode >= vKeysCodes.VK_A &&
                    keyCode <= vKeysCodes.VK_Z && !shiftOn ? apps.capslock = 'ON' : 1;

                form.focusedControl ? form.focusedControl.keyPress() : form.keyPress();
            }
        }
        //#endregion keyPress
        //#region renderApplications
        renderApplications() {
            //#region Variables déclaration
            const apps = this.applications;
            const keys = Object.keys(apps);
            //#endregion Variables déclaration
            keys.forEach(key => {
                apps[key].render();
            });
        }
        //#endregion renderApplications
        //#region destroy
        destroy() {
            //#region Variables déclaration
            const priv = internal(this);
            //#endregion Variables déclaration
            priv.activeApplication = null;
            priv.applications.clear();
            priv.applications = null;
            priv.capslock = 'UNKNOWN';
            delete this.activeApplication;
            delete this.applications;
            delete this.capslock;
        }
        //#endregion destroy
        //#endregion Methods
    }
    return Apps;
    //#endregion Class Apps
})();
core.apps = new Apps;
core.classes.register(core.types.CATEGORIES.INTERNAL, Apps);
//#endregion Apps
export { Apps };