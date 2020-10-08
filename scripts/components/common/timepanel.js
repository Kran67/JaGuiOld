//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { NumberWheel } from '/scripts/components/common/numberwheel.js';
import { ItemsWheel } from '/scripts/core/itemswheel.js';
import { Keyboard } from '/scripts/core/keyboard.js';
//#endregion Import
//#region Class TimePanel
class TimePanel extends ThemedControl {
    //#region Private fields
    #time;
    #use24H;
    #viewSeconds;
    #hours;
    #minutes;
    #seconds;
    #meridiem;
    #isFocused;
    #currentItemWheel;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.width = -1;
            props.heigth = 43;
            props.canFocused = props.hasOwnProperty('canFocused') && core.tools.isBool(props.canFocused)
                ? props.canFocused : !0;
            super(owner, props);
            this.#time = props.hasOwnProperty('time') ? props.time : String.EMPTY;
            this.#use24H = props.hasOwnProperty('use24H') && core.tools.isBool(props.use24H)
                    ? props.use24H : !0;
            this.#viewSeconds = props.hasOwnProperty('viewSeconds')
                    && core.tools.isBool(props.viewSeconds) ? props.viewSeconds : !1;
            this.createEventsAndBind(['onChange'], props);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region time
    get time() {
        return this.#time;
    }
    set time(newValue) {
        //#region Variables déclaration
        const hours = this.#hours;
        const minutes = this.#minutes;
        const seconds = this.#seconds;
        const meridiem = this.#meridiem;
        //#endregion Variables déclaration
        if (core.tools.isString(newValue) && this.#time !== newValue) {
            this.#time = newValue;
            const timeParts = this.#time.split(String.SPACE);
            timeParts[0] = timeParts[0].split(':');
            hours.index = hours.items.indexOf(timeParts[0].first);
            minutes.index = minutes.items.indexOf(timeParts[0][1]);
            timeParts[0].length > 2 && (seconds.index = seconds.items.indexOf(timeParts[0].last));
            timeParts.length > 1 && (meridiem.index = meridiem.items.indexOf(timeParts.last));
        }
    }
    //#endregion time
    //#region use24H
    get use24H() {
        return this.#use24H;
    }
    set use24H(newValue) {
        //#region Variables déclaration
        let max = 23;
        const hours = this.hours;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && this.#use24H !== newValue) {
            this.#use24H = newValue;
            !this.#use24H && (max = 11);
            hours.items.clear();
            hours.max = max;
            //this.update();
        }
    }
    //#endregion use24H
    //#region viewSeconds
    get viewSeconds() {
        return this.#viewSeconds;
    }
    set viewSeconds(newValue) {
        if (core.tools.isBool(newValue) && this.#viewSeconds !== newValue) {
            this.#viewSeconds = newValue;
            this.#seconds.visible = this.#viewSeconds;
        }
    }
    //#endregion viewSeconds
    //#region isFocused
    get isFocused() {
        return this.#isFocused;
    }
    set isFocused(newValue) {
        super.isFocused = newValue;
        if (!this.#currentItemWheel) {
            this.#currentItemWheel = this.#hours;
            this.#hours.HTMLElement.classList.add('focused');
        }
    }
    //#endregion isFocused
    //#region hours
    get hours() {
        return this.#hours;
    }
    //#endregion hours
    //#region minutes
    get minutes() {
        return this.#minutes;
    }
    //#endregion minutes
    //#region seconds
    get seconds() {
        return this.#seconds;
    }
    //#endregion seconds
    //#region meridiem
    get meridiem() {
        return this.#meridiem;
    }
    //#endregion meridiem
    //#endregion Getters / Setters
    //#region Methods
    //#region killFocus
    killFocus() {
        super.killFocus();
        this.#currentItemWheel && this.#currentItemWheel.HTMLElement.classList.remove('focused');
    }
    //#endregion killFocus
    //#region update
    update() {
        this.#seconds.visible = this.#viewSeconds;
        this.#meridiem.visible = !this.#use24H;
    }
    //#endregion update
    //#region change
    change() {
        //#region Variables déclaration
        const owner = this.owner;
        const hr = owner.hours.value;
        const mi = owner.minutes.value;
        const se = owner.seconds.value;
        const me = owner.meridiem.value;
        let val = `${hr}:${mi}`;
        //#endregion Variables déclaration
        owner.viewSeconds && (val += `:${se}`);
        !owner.use24H && me !== String.EMPTY && (val += ` ${me}`);
        owner.time = val;
        !owner.updating && owner.onChange.invoke();
    }
    //#endregion change
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const oldVal = this.#time;
        //#endregion Variables déclaration
        super.loaded();
        this.#hours = core.classes.createComponent({
            class: NumberWheel,
            owner: this,
            props: {
                inForm: !1,
                max: this.#use24H ? 23 : 11
            }
        });
        this.#hours.HTMLElement.classList.add('TimePanel_Hours');
        this.#hours.canFocused = !1;
        this.#hours.onChange.addListener(this.change);
        this.#minutes = core.classes.createComponent({
            class: NumberWheel,
            owner: this,
            props: {
                inForm: !1,
                max: 59
            }
        });
        this.#minutes.HTMLElement.classList.add('TimePanel_Minutes');
        this.#minutes.canFocused = !1;
        this.#minutes.onChange.addListener(this.change);
        this.#seconds = core.classes.createComponent({
            class: NumberWheel,
            owner: this,
            props: {
                inForm: !1,
                max: 59,
                forceDisplayVisibility: !0
            }
        });
        this.#seconds.HTMLElement.classList.add('TimePanel_Seconds');
        this.#seconds.canFocused = !1;
        this.#seconds.onChange.addListener(this.change);
        this.#meridiem = core.classes.createComponent({
            class: ItemsWheel,
            owner: this,
            props: {
                inForm: !1,
                forceDisplayVisibility: !0
            }
        });
        this.#meridiem.HTMLElement.classList.add('TimePanel_Meridiem');
        this.#meridiem.beginUpdate();
        this.#meridiem.items.push("AM");
        this.#meridiem.items.push("PM");
        this.#meridiem.endUpdate();
        this.#meridiem.canFocused = !1;
        this.#meridiem.onChange.addListener(this.change);
        if (this.#time !== String.EMPTY) {
            this.#time = String.EMPTY;
            this.time = oldVal;
        }
        this.update();
    }
    //#endregion loaded
    //#region destroy
    destroy() {
        this.#hours.destroy();
        this.#minutes.destroy();
        this.#seconds.destroy();
        this.#meridiem.destroy();
        this.unBindAndDestroyEvents(['onChange']);
        super.destroy();
    }
    //#endregion destroy
    //#region keyDown
    keyDown() {
        //#region Variables déclaration
        const VKeysCodes = Keyboard.VKEYSCODES;
        let currentItemWheel = this.#currentItemWheel;
        const hours = this.#hours;
        const minutes = this.#minutes;
        const seconds = this.#seconds;
        const meridiem = this.#meridiem;
        let cHtmlElement;
        //#endregion Variables déclaration
        super.keyDown();
        currentItemWheel && currentItemWheel.keyDown();
        cHtmlElement = currentItemWheel.HTMLElement;
        cHtmlElement.classList.remove('focused');
        switch (core.keyboard.key) {
            case VKeysCodes.VK_LEFT:
                if (currentItemWheel === minutes) {
                    currentItemWheel = hours;
                } else if (currentItemWheel === seconds) {
                    currentItemWheel = minutes;
                } else if (currentItemWheel === meridiem) {
                    currentItemWheel = this.#viewSeconds ? seconds : minutes;
                }
                break;
            case VKeysCodes.VK_RIGHT:
                if (currentItemWheel === hours) {
                    currentItemWheel = minutes;
                } else if (currentItemWheel === minutes) {
                    if (this.#viewSeconds) {
                        currentItemWheel = seconds;
                    } else if (!this.#use24H) {
                        currentItemWheel = meridiem;
                    }
                } else if (currentItemWheel === seconds) {
                    !this.#use24H && (currentItemWheel = meridiem);
                }
                break;
        }
        cHtmlElement = currentItemWheel.HTMLElement;
        cHtmlElement.classList.add('focused');
        this.#currentItemWheel = currentItemWheel;
        core.keyboard.stopEvent();
    }
    //#endregion keyDown
    //#endregion Methods
}
Object.defineProperties(TimePanel.prototype, {
    'time': {
        enumerable: !0
    },
    'use24H': {
        enumerable: !0
    },
    'viewSeconds': {
        enumerable: !0
    }
});
Object.seal(TimePanel);
core.classes.register(core.types.CATEGORIES.COMMON, TimePanel);
//#endregion TimePanel
//#endregion
//#region Templates
if (core.isHTMLRenderer) {
    const TimePanelTpl = ['<jagui-timepanel id="{internalId}" data-class="TimePanel" class="Control TimePanel {theme}">',
        '<properties>{ "name": "{name}" }</properties></jagui-timepanel>'].join(String.EMPTY);
    core.classes.registerTemplates([{ Class: TimePanel, template: TimePanelTpl }]);
}
//#endregion
export { TimePanel };