import '/scripts/core/apps.js';

import { Application } from '/scripts/core/application.js';
import { fr_FR } from '../locales/fr-FR.js';
import { en_US } from '../locales/en-US.js';
import { Window1 } from './window1.js';
//import { Window2 } from "./window2.js";
//import { BorderDialog } from "./borderdialog.js";
//import { BorderNone } from "./bordernone.js";
//import { BorderSingle } from "./bordersingle.js";
//import { BorderSizeable } from "./bordersizeable.js";
//import { BorderSizeToolWin } from "./bordersizetoolwin.js";
//import { BorderToolWindow } from "./bordertoolwindow.js";
class Controls extends Application {
    constructor() {
        const LANGUAGES = Types.LANGUAGES;
        super('controls');
        //#region Locales
        this.locales[LANGUAGES.FR_FR] = fr_FR;
        this.locales[LANGUAGES.EN_US] = en_US;
        this.locale = LANGUAGES.FR_FR;
        //#endregion
        this.windowsClass.Window1 = Window1;
        this.initialize();
    }
}
export { Controls };