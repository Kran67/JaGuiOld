(function () {
    var LabeledMemo = $j.classes.LabeledControl.extend("LabeledMemo", {
        init: function (owner, props) {
            if (owner) {
                this._inherited(owner, props);
                this.memo = $j.classes.createComponent($j.classes.Memo, this, null, { _inForm: false }, false);
                this.memo.canFocused = false;
            }
        },
        //#region Methods
        getChildsHTMLElement: function () {
            if (this._HTMLElement) {
                this._inherited();
                this.memo.getHTMLElement(this._HTMLElement.lastElementChild.id);
                this.memo.getChildsHTMLElement();
                this.memo.updateFromHTML();
            }
        },
        destroy: function () {
            this._inherited();
            this.memo = null;
        },
        getTemplate: function () {
            var html = this._inherited(), a = html.split("{memo}"), tpl;
            tpl = this.memo.getTemplate();
            html = a.join(tpl);
            return html;
        }
        //#endregion
    });
    Object.seal(LabeledMemo);
    $j.classes.register($j.types.categories.EXTENDED, LabeledMemo);
    //#region Template
    if ($j.isHTMLRenderer()) {
        var LabeledMemoTpl = "<div id='{internalId}' data-name='{name}' data-class='LabeledMemo' class='Control LabeledMemo' style='width:205px;height:60px;'>\
                        {label}\
                        {memo}\
                        </div>";
        $j.classes.registerTemplates([{ Class: LabeledMemo, template: LabeledMemoTpl }]);
    }
    //#endregion
})();