//#region Imports
import { Action } from '/scripts/components/actions/action.js';
import { CommonDialogAction } from '/scripts/components/actions/stdactions.js';
//#endregion
//#region TabAction
class TabAction extends Action {};
Object.seal(TabAction);
//#endregion TabAction
//#region PreviousTab
class PreviousTab extends TabAction {};
Object.seal(PreviousTab);
//#endregion PreviousTab
//#region OpenPicture
class OpenPicture extends CommonDialogAction {};
Object.seal(OpenPicture);
//#endregion OpenPicture
//#region SavePicture
class SavePicture extends CommonDialogAction {};
Object.seal(SavePicture);
//#endregion SavePicture
//#region ListControlAction
class ListControlAction extends Action {};
Object.seal(ListControlAction);
//#endregion ListControlAction
//#region ListControlSelectAll
class ListControlSelectAll extends ListControlAction {};
Object.seal(ListControlSelectAll);
//#endregion ListControlSelectAll
//#region ListControlClearSelection
class ListControlClearSelection extends ListControlAction {};
Object.seal(ListControlClearSelection);
//#endregion ListControlClearSelection
//#region ListControlDeleteSelection
class ListControlDeleteSelection extends ListControlAction {};
Object.seal(ListControlDeleteSelection);
//#endregion ListControlDeleteSelection
//#region ListBoxCopySelection
class ListBoxCopySelection extends ListControlAction {};
Object.seal(ListBoxCopySelection);
//#endregion ListBoxCopySelection
//#region ListControlMoveSelection
class ListControlMoveSelection extends ListControlAction {};
Object.seal(ListControlMoveSelection);
//#endregion ListControlMoveSelection
core.classes.register(core.types.CATEGORIES.INTERNAL, TabAction, ListControlAction);
core.classes.register(core.types.CATEGORIES.ACTIONS, PreviousTab, NextTab, OpenPicture, SavePicture, ListControlSelectAll, ListControlClearSelection,
    ListControlDeleteSelection, ListBoxCopySelection, ListControlMoveSelection);