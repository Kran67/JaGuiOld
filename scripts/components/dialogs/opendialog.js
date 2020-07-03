//#region Import
import { CommonDialog } from '/scripts/components/dialogs/commondialog.js';
import { Events } from '/scripts/core/events.js';
import { Convert } from '/scripts/core/convert.js';
import { Uri } from '/scripts/core/uri.js';
//#endregion Import
//#region OpenDialog
class OpenDialog extends CommonDialog {
    //#region constructor
    constructor(owner, props) {
        props = !props ? {} : props;
        if (owner) {
            super(owner, props);
            const priv = core.private(this, {
                form: document.createElement(core.types.HTMLELEMENTS.FORM),
                inputFile: document.createElement(core.types.HTMLELEMENTS.INPUT),
                filesFilter: props.hasOwnProperty('filesFilter') ? props.filesFilter : String.EMPTY,
                multiple: props.hasOwnProperty('multiple') && core.tools.isBool(props.multiple)
                    ? props.multiple : !1
            });
            priv.inputFile.type = "file";
            priv.inputFile.multiple = priv.multiple;
            priv.inputFile.owner = this;
            priv.form.appendChild(priv.inputFile);
            Events.bind(priv.inputFile, core.types.HTMLEVENTS.CHANGE, this.handleFileSelection);
        }
    }
    //#endregion constructor
    //#region Getters / Setters
    //#region filesFilter
    get filesFilter() {
        return core.private(this).filesFilter;
    }
    set filesFilter(newValue) {
        if (core.tools.isString(newValue) && priv.filesFilter !== newValue) {
            priv.filesFilter = newValue;
            priv.inputFile.setAttribute('accept', newValue);
        }
    }
    //#endregion filesFilter
    //#region multiple
    get multiple() {
        return core.private(this).multiple;
    }
    set multiple(newValue) {
        if (core.tools.isBool(newValue) && priv.multiple !== newValue) {
            priv.multiple = newValue;
            priv.inputFile.setAttribute('multiple', newValue);
        }
    }
    //#endregion multiple
    //#endregion Getters / Setters
    //#region Methods
    //#region loaded
    loaded() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        super.loaded();
        priv.inputFile.setAttribute('accept', priv.filesFilter);
        priv.inputFile.setAttribute('multiple', priv.multiple);
    }
    //#endregion loaded
    //#region handleFileSelection
    handleFileSelection(evt) {
        const files = evt.target.files;
        const openDlg = evt.target.owner;
        const availableFiles = [];
        const filesFilter = openDlg.filesFilter;
        Convert.nodeListToArray(files).forEach(file => {
            if (filesFilter === String.EMPTY) {
                availableFiles.push(file);
            } else if (filesFilter.toLowerCase().indexOf(
                Uri.extractFileExt(file.name).toLowerCase()) > -1) {
                availableFiles.push(file);
            }
        });
        openDlg.form.reset();
        if (availableFiles.length === 0) {
            core.dialogs.error("At least one selected file is invalid - do not select any folders.<br />Please / reselect and try again.");
            return;
        }
        openDlg.onClose.invoke(availableFiles);
    }
    //#endregion handleFileSelection
    //#region execute
    execute() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        super.execute();
        priv.inputFile.click();
    }
    //#endregion execute
    //#region destroy
    destroy() {
        //#region Variables déclaration
        const priv = core.private(this);
        //#endregion Variables déclaration
        Events.unBind(priv.inputFile, core.type.HTMLEVENTS.CHANGE, this.handleFileSelection);
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