//#region Import
import { ThemedControl } from '/scripts/core/themedcontrol.js';
import { NumberWheel } from '/scripts/components/common/numberwheel.js';
import { ItemsWheel } from '/scripts/core/itemswheel.js';
import { Keyboard } from '/scripts/core/keyboard.js';
//#endregion Import
//#region Class TimePanel
class TimePanel extends ThemedControl {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            props.width = -1;
            props.heigth = 43;
            props.canFocused = props.hasOwnProperty('canFocused') && core.tools.isBool(props.canFocused)
                ? props.canFocused : !0;
            super(owner, props);
            core.private(this, {
                currentItemWheel: null,
                time: props.hasOwnProperty('time') ? props.time : String.EMPTY,
                use24H: props.hasOwnProperty('use24H') && core.tools.isBool(props.use24H)
                    ? props.use24H : !0,
                viewSeconds: props.hasOwnProperty('viewSeconds')
                    && core.tools.isBool(props.viewSeconds) ? props.viewSeconds : !1
            });
            this.createEventsAndBind(['onChange'], props);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region time
    get time() {
        return core.private(this).time;
    }
    set time(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        const hours = priv.hours;
        const minutes = priv.minutes;
        const seconds = priv.seconds;
        const meridiem = priv.meridiem;
        //#endregion Variables déclaration
        if (core.tools.isString(newValue) && priv.time !== newValue) {
            priv.time = newValue;
            const timeParts = priv.time.split(String.SPACE);
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
        return core.private(this).use24H;
    }
    set use24H(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        let max = 23;
        const hours = this.hours;
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && priv.use24H !== newValue) {
            priv.use24H = newValue;
            !priv.use24H && (max = 11);
            hours.items.clear();
            hours.max = max;
            //this.update();
        }
    }
    //#endregion use24H
    //#region viewSeconds
    get viewSeconds() {
        return core.private(this).viewSeconds;
    }
    set viewSeconds(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        if (core.tools.isBool(newValue) && priv.viewSeconds !== newValue) {
            priv.viewSeconds = newValue;
            priv.seconds.visible = priv.viewSeconds;
        }
    }
    //#endregion viewSeconds
    //#region isFocused
    get isFocused() {
        return core.private(this).isFocused;
    }
    set isFocused(newValue) {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        super.isFocused = newValue;
        if (!priv.currentItemWheel) {
            priv.currentItemWheel = priv.hours;
            priv.hours.HTMLElement.classList.add('focused');
        }
    }
    //#endregion isFocused
    //#region hours
    get hours() {
        return core.private(this).hours;
    }
    //#endregion hours
    //#region minutes
    get minutes() {
        return core.private(this).minutes;
    }
    //#endregion minutes
    //#region seconds
    get seconds() {
        return core.private(this).seconds;
    }
    //#endregion seconds
    //#region meridiem
    get meridiem() {
        return core.private(this).meridiem;
    }
    //#endregion meridiem
    //#endregion Getters / Setters
    //#region Methods
    killFocus() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        super.killFocus();
        priv.currentItemWheel && priv.currentItemWheel.HTMLElement.classList.remove('focused');
    }
    update() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.seconds.visible = priv.viewSeconds;
        priv.meridiem.visible = !priv.use24H;
    }
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
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
        const oldVal = priv.time;
        //#endregion Variables déclaration
        super.loaded();
        priv.hours = core.classes.createComponent({
            class: NumberWheel,
            owner: this,
            props: {
                inForm: !1,
                max: priv.use24H ? 23 : 11
            }
        });
        priv.hours.HTMLElement.classList.add('TimePanel_Hours');
        priv.hours.canFocused = !1;
        priv.hours.onChange.addListener(this.change);
        priv.minutes = core.classes.createComponent({
            class: NumberWheel,
            owner: this,
            props: {
                inForm: !1,
                max: 59
            }
        });
        priv.minutes.HTMLElement.classList.add('TimePanel_Minutes');
        priv.minutes.canFocused = !1;
        priv.minutes.onChange.addListener(this.change);
        priv.seconds = core.classes.createComponent({
            class: NumberWheel,
            owner: this,
            props: {
                inForm: !1,
                max: 59,
                forceDisplayVisibility: !0
            }
        });
        priv.seconds.HTMLElement.classList.add('TimePanel_Seconds');
        priv.seconds.canFocused = !1;
        priv.seconds.onChange.addListener(this.change);
        priv.meridiem = core.classes.createComponent({
            class: ItemsWheel,
            owner: this,
            props: {
                inForm: !1,
                forceDisplayVisibility: !0
            }
        });
        priv.meridiem.HTMLElement.classList.add('TimePanel_Meridiem');
        priv.meridiem.beginUpdate();
        priv.meridiem.items.push("AM");
        priv.meridiem.items.push("PM");
        priv.meridiem.endUpdate();
        priv.meridiem.canFocused = !1;
        priv.meridiem.onChange.addListener(this.change);
        if (priv.time !== String.EMPTY) {
            priv.time = String.EMPTY;
            this.time = oldVal;
        }
        this.update();
    }
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        priv.hours.destroy();
        priv.minutes.destroy();
        priv.seconds.destroy();
        priv.meridiem.destroy();
        this.unBindAndDestroyEvents(['onChange']);
        super.destroy();
    }
    keyDown() {
        //#region Variables déclaration
        const priv = core.private(this);
        const VKeysCodes = Keyboard.VKEYSCODES;
        let currentItemWheel = priv.currentItemWheel;
        const hours = priv.hours;
        const minutes = priv.minutes;
        const seconds = priv.seconds;
        const meridiem = priv.meridiem;
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
                    currentItemWheel = priv.viewSeconds ? seconds : minutes;
                }
                break;
            case VKeysCodes.VK_RIGHT:
                if (currentItemWheel === hours) {
                    currentItemWheel = minutes;
                } else if (currentItemWheel === minutes) {
                    if (priv.viewSeconds) {
                        currentItemWheel = seconds;
                    } else if (!priv.use24H) {
                        currentItemWheel = meridiem;
                    }
                } else if (currentItemWheel === seconds) {
                    !priv.use24H && (currentItemWheel = meridiem);
                }
                break;
        }
        cHtmlElement = currentItemWheel.HTMLElement;
        cHtmlElement.classList.add('focused');
        priv.currentItemWheel = currentItemWheel;
    }
    //#endregion Methods
}
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