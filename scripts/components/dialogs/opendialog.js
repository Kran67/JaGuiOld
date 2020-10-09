//#region Import
import { CommonDialog } from '/scripts/components/dialogs/commondialog.js';
import { Events } from '/scripts/core/events.js';
import { Convert } from '/scripts/core/convert.js';
import { Uri } from '/scripts/core/uri.js';
//#endregion Import
//#region OpenDialog
class OpenDialog extends CommonDialog {
    //#region Private fields
    #form;
    #inputFile;
    #filesFilter;
    #multiple;
    //#endregion Private fields
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            this.#form = document.createElement(core.types.HTMLELEMENTS.FORM);
            this.#inputFile = document.createElement(core.types.HTMLELEMENTS.INPUT);
            this.#filesFilter = props.hasOwnProperty('filesFilter') ? props.filesFilter : String.EMPTY;
            this.#multiple = props.hasOwnProperty('multiple') && core.tools.isBool(props.multiple)
                    ? props.multiple : !1;
            this.#inputFile.type = "file";
            this.#inputFile.multiple = this.#multiple;
            this.#inputFile.owner = this;
            this.#form.appendChild(this.#inputFile);
            Events.bind(this.#inputFile, core.types.HTMLEVENTS.CHANGE, this.handleFileSelection);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region filesFilter
    get filesFilter() {
        return this.#filesFilter;
    }
    set filesFilter(newValue) {
        if (core.tools.isString(newValue) && this.#filesFilter !== newValue) {
            this.#filesFilter = newValue;
            this.#inputFile.setAttribute('accept', newValue);
        }
    }
    //#endregion filesFilter
    //#region multiple
    get multiple() {
        return this.#multiple;
    }
    set multiple(newValue) {
        if (core.tools.isBool(newValue) && this.#multiple !== newValue) {
            this.#multiple = newValue;
            this.#inputFile.setAttribute('multiple', newValue);
        }
    }
    //#endregion multiple
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        super.loaded();
        this.#inputFile.setAttribute('accept', this.#filesFilter);
        this.#inputFile.setAttribute('multiple', this.#multiple);
    }
    //#endregion loaded
    //#region handleFileSelection
    handleFileSelection(evt) {
        //#region Variables déclaration
        const files = evt.target.files;
        const openDlg = evt.target.owner;
        const availableFiles = [];
        const filesFilter = openDlg.filesFilter;
        //#endregion Variables déclaration
        Convert.nodeListToArray(files).forEach(file => {
            if (filesFilter === String.EMPTY) {
                availableFiles.push(file);
            } else if (filesFilter.toLowerCase().indexOf(
                Uri.extractFileExt(file.name).toLowerCase()) > -1) {
                availableFiles.push(file);
            }
        });
        openDlg.#form.reset();
        if (availableFiles.length === 0) {
            core.dialogs.error("At least one selected file is invalid - do not select any folders.<br />Please / reselect and try again.");
            return;
        }
        openDlg.onClose.invoke(availableFiles);
    }
    //#endregion handleFileSelection
    //#region execute
    execute() {
        super.execute();
        this.#inputFile.click();
    }
    //#endregion execute
    //#region destroy
    destroy() {
        Events.unBind(this.#inputFile, core.type.HTMLEVENTS.CHANGE, this.handleFileSelection);
        super.destroy();
    }
    //#endregion destroy
    //#endregion Methods
}
Object.defineProperties(OpenDialog.prototype, {
    'filesFilter': {
        enumerable: !0
    },
    'multiple': {
        enumerable: !0
    }
});
Object.seal(OpenDialog);
core.classes.register(core.types.CATEGORIES.DIALOGS, OpenDialog);
//#region Templates
if (core.isHTMLRenderer) {
    const OpenDialogTpl = "<div id='{internalId}' data-name='{name}' data-class='OpenDialog' class='ShortCutIcon'>\
                       <div class='ShortCutIconImg opendialog'></div>\
                       <div class='ShortCutIconCaption'>{name}</div>\
                       </div>";
    core.classes.registerTemplates([{ Class: OpenDialog, template: OpenDialogTpl }]);
}
//#endregion OpenDialog
export { OpenDialog };