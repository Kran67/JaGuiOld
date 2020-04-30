(function () {
    "use strict";
    /********************************/
    /*                              */
    /*          ACTIONLIST          */
    /*                              */
    /********************************/
    //#region ActionList
    var ActionList = $j.classes.Component.extend("ActionList", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                $j.classes.newCollection(this, this, $j.classes.Action, "actions");
                this.onChange = new $j.classes.NotifyEvent(this);
                this.onExecute = new $j.classes.NotifyEvent(this);
                this.onUpdate = new $j.classes.NotifyEvent(this);
                this.imageList = null;
            }
        },
        //#region Setters
        setAction: function (index, newValue) {
            if (index < 0 || index > this.actions.length - 1) return;
            if (!(newValue instanceof $j.classes.Action)) return;
            if (this.actions[index]) {
                if (this.actions[index] instanceof $j.classes.Action) {
                    this.actions[index].destroy();
                    this.actions[index] = newValue;
                }
            }
        },
        setImageList: function (newValue) {
        },
        //#endregion
        //#region Methods
        getAction: function (index) {
            if (index < 0 || index > this.actions.length - 1) return null;
            return this.actions[index];
        },
        addAction: function (action) {
            if (!(action instanceof $j.classes.Action)) return;
            if (this.actions.indexOf(action) === -1) this.actions.push(action);
        },
        removeAction: function (action) {
            if (!(action instanceof $j.classes.Action)) return;
            if (this.actions.indexOf(action) > -1) this.actions.remove(action);
        },
        destroy: function () {
            var act;
            while (this.actions.length > 0) {
                act = this.actions.pop();
                act.destroy();
            }
            this._inherited();
        },
        updateFromHTML: function () {
            // on va chercher les items dans le CDATA
            var cdata = this._HTMLElement.childNodes, act, datas;
            for (var i = 0, l = cdata.length; i < l; i++) {
                if (cdata[i].nodeType === $j.types.xmlNodeTypes.COMMENT_NODE) {
                    if (cdata[i].nodeValue && cdata[i].nodeValue !== String.EMPTY) {
                        datas = JSON.parse(cdata[i].nodeValue);
                        for (var i = 0, l = datas.length; i < l; i++) {
                            act = new $j.classes[datas[i].class](this, datas[i]);
                            this.actions.push(act);
                        }
                    }
                }
            }
            // on va chercher l'imageList
            datas = this._HTMLElement.dataset.imagelist;
            if (datas) {
                if (this.form[datas]) this.imageList = this.form[datas];
                else if (typeof datas === _const.STRING) {
                    if (datas.contains(".")) {
                        datas = datas.split(".");
                        if (this.app[datas.first()]) {
                            datas = this.app[datas.first()][datas.last()];
                            if (datas) {
                                this.setImageList(datas);
                            }
                        }
                    }
                }
            }
        },
        executeAction: function (action) {
            if (!(action instanceof $j.classes.Action)) return;
            action.execute();
        }
        //#endregion
    });
    Object.seal(ActionList);
    //#endregion
    $j.classes.register($j.types.categories.COMMON, ActionList);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var ActionListTpl = "<div id='{internalId}' data-name='{name}' data-class='ActionList' class='Control ShortCutIcon' style=''>\
                       <div class='Control ShortCutIconImg actionlist'></div>\
                       <div class='Control ShortCutIconCaption'>{name}</div>\
                       </div>";
        $j.classes.registerTemplates([{ Class: ActionList, template: ActionListTpl }]);
    }
    //#endregion
})();