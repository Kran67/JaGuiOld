(function () {
    var RadioGroup = $j.classes.GroupBox.extend("RadioGroup", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                $j.classes.newCollection(this, this, $j.classes.RadioButton);
                this._itemIndex = -1;
                this._columns = 1;
                //#endregion
            }
        },
        //#region Setters
        setItemIndex: function (newValue) {
            var i, l;
            if (typeof newValue !== _const.NUMBER) return;
            if (this.itemIndex !== newValue) {
                this.itemIndex = newValue;
                for (i = 0, l = this.items.length; i < l; i++) {
                    if (i === this.itemIndex) this.items[i].setIsChecked(true);
                    else this.items[i].setIsChecked(false);
                }
            }
        },
        //#endregion
        //#region Methods
        getRadio: function (index) {
            if (index < 0) return null;
            if (index > this.items.length) return null;
            return this.items[index];
        },
        arrangeButtons: function () {
            var i, l, buttonsPerCol, buttonWidth, buttonHeight, topMargin, item;
            if (this._loading || this.form._loading) return;
            if (this.items.length === 0) return;
            if (!this._HTMLElement) return;
            buttonsPerCol = ~~((this.items.length + this._columns - 1) / this._columns);
            buttonWidth = ~~(~~(this._HTMLElement.offsetWidth - 10) / this._columns);
            i = this._HTMLElement.offsetHeight - this._legendObj.offsetHeight - 10;
            buttonHeight = ~~(i / buttonsPerCol);
            topMargin = 16 + (~~(i % buttonsPerCol) / 2);
            for (i = 0, l = this.items.length; i < l; i++) {
                item = this.items[i];
                item.setBounds(~~(~~(i / buttonsPerCol) * buttonWidth + 8), ~~((i % buttonsPerCol) * buttonHeight + topMargin), buttonWidth, buttonHeight);
            }
        },
        getChildsHTMLElement: function () {
            var items, item, tpl;
            this._inherited();
            // on va chercher les items dans le CDATA
            var cdata = this._legendObj.nextSibling;
            while (cdata && cdata.nodeType !== $j.types.xmlNodeTypes.COMMENT_NODE) {
                cdata = cdata.nextSibling;
            }
            if (cdata && cdata.nodeValue !== String.EMPTY && cdata.nodeValue) items = JSON.parse(cdata.nodeValue);
            if (items) {
                for (var i = 0, l = items.length; i < l; i++) {
                    item = $j.classes.createComponent(this.items._itemClass, this, String.EMPTY, {}, false);
                    if (items[i].caption) item.caption = items[i].caption;
                    if (items[i].enabled) item.enabled = items[i].enabled;
                    if (this.itemIndex === i) item.isChecked = true;
                    else if (items[i].isChecked) item.isChecked = items[i].isChecked;
                    tpl = item.getTemplate();
                    this.insertTemplate(tpl);
                    item.getHTMLElement(item._internalId);
                    item.getChildsHTMLElement(item._HTMLElement);
                    item.onClick.addListener(this.changeItemIndex);
                    this.items.push(item);
                }
            }
            this.items.onChange.addListener(this.arrangeButtons);
        },
        changeItemIndex: function () {
            this._owner.itemIndex = this._owner.items.indexOf(this);
        },
        beginUpdate: function () {
            this._allowUpdate = false;
            this.items.beginUpdate();
        },
        endUpdate: function () {
            this._allowUpdate = true;
            this.items.endUpdate();
        },
        loaded: function () {
            this._inherited();
            this.arrangeButtons();
        },
        updateFromHTML: function () {
            var data;
            this._inherited();
            data = this._HTMLElement.dataset.itemindex;
            if (data) this.itemIndex = ~~data;
        }
        //#endregion
    });
    Object.seal(RadioGroup);
    $j.classes.register($j.types.categories.EXTENDED, RadioGroup);
    //#region Templates
    if ($j.isHTMLRenderer()) {
        var RadioGroupTpl = "<fieldset id='{internalId}' data-name='{name}' data-class='RadioGroup' class='Control RadioGroup {theme}' style='width:185px;height:105px;'>\
                       <legend class='Control RadioGroupLegend carbon'>RadioGroup1</legend>\
                       </fieldset>";
        $j.classes.registerTemplates([{ Class: RadioGroup, template: RadioGroupTpl }]);
    }
    //endregion
})();