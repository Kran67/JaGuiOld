(function () {
    //#region TabSheet
    var TabSheet = $j.classes.Tab.extend("TabSheet", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._HTMLPage = null;
                //#endregion
            }
        },
        //#region Setter
        //#endregion
        //#region Methods
        show: function () {
            if (!this.enabled) return;
            this._inherited();
            $j.CSS.removeClass(this._HTMLPage, "noDisplay");
            //this.hideOrShowChildrens(false);
        },
        hide: function () {
            this._inherited();
            $j.CSS.addClass(this._HTMLPage, "noDisplay");
            //this.hideOrShowChildrens(true);
        },
        //hideOrShowChildrens:function(hide) {
        //  var childs,i,l;
        //  childs=this._HTMLPage.childNodes;
        //  l=childs.length;
        //  for (i=0;i<l;i++) {
        //    if (childs[i].nodeType===$j.types.xmlNodeTypes.ELEMENT_NODE) {
        //      if (childs[i].jsObj)) {
        //        childs[i].jsObj.setVisible(!hide);
        //      }
        //    }
        //  }
        //},
        destroy: function () {
            this._inherited();
            this._HTMLPage = null;
        }
        //#endregion
    });
    Object.seal(TabSheet);
    //#endregion
    //#region PageControl
    var PageControl = $j.classes.CustomTabControl.extend("PageControl", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner) {
                this._inherited(owner, props);
                //#region Private
                this._tabClass = $j.classes.TabSheet;
                //#endregion
            }
        },
        //#region Setters
        //#endregion
        //#region Methods
        deleteTab: function (index) {
            if (index < 0 || index > this._tabs.length - 1) return null;
            var tab = this._tabs[index];
            this._tabContent.removeChild(tab._HTMLPage);
            // supprimer les controles de la page
            this._inherited(index);
        },
        newTab: function (caption) {
            var tab, tpl, a, div = $j.doc.createElement($j.types.HTMLElements.DIV);
            if (!caption) caption = "tab" + (this._tabSheets.length + 1);
            tab = $j.classes.createComponent($j.classes.TabSheet, this, caption.firstCharUpper(), { "parentHTML": this._tabSheets_Container, "caption": caption }, true);
            this._tabSheets.push(tab);
            tpl = $j.templates["Page"];
            a = tpl.split("{theme}");
            tpl = a.join(this.getThemeName());
            a = tpl.split("{name}");
            tpl = a.join(tab.name);
            div.innerHTML = tpl;
            tab._HTMLPage = div.firstElementChild;
            this._tabContent._HTMLElement.appendChild(div.firstElementChild);
            this.changeActiveTab(tab);
            this.checkViewBtns();
            this.change();
        },
        /*insertTab:function(tab,index) {
          var tpl,a,div=$j.doc.createElement($j.types.HTMLElements.DIV);
          if (!(tab instanceof $j.classes.TabSheet)) return;
          if (typeof index===_const.NUMBER) {
            if (index<0) index=0;
            else if (index>this._tabSheets.length-1) index=this._tabSheets.length-1;
            this._tabSheets.insert(index,tab);
          } else this._tabSheets.push(tab);
          tab.owner=this;
          tab._pageControl=this;
          if (tab._HTMLPage)) {
            tpl=$j.templates["Page"];
            a=tpl.split("{theme}");
            tpl=a.join(this.getThemeName());
            a=tpl.split("{name}");
            tpl=a.join(tab.name);
            div.innerHTML=tpl;
            this._pageContent.appendChild(div.firstElementChild);
            tab._HTMLPage=this._pageContent.lastElementChild;
          } else this._pageContent.appendChild(tab._HTMLPage);
          this.checkLastVisibleTab();
          this.checkViewBtns();
        },*/
        getChildsHTMLElement: function (id) {
            this._inherited();
            if (this._HTMLElement) {
                nodes = this._tabContent._HTMLElement.childNodes;
                for (i = 0, l = nodes.length; i < l; i++) {
                    if (nodes[i].nodeType === $j.types.xmlNodeTypes.ELEMENT_NODE) {
                        data = nodes[i].dataset.tab;
                        if (data) {
                            tab = this.form[data];
                            if (tab) {
                                if (tab instanceof $j.classes.TabSheet) {
                                    tab._HTMLPage = nodes[i];
                                    tab._HTMLPage.jsObj = tab;
                                    tab.getChildsHTMLElement(tab._HTMLPage, this._tabContent);
                                }
                            }
                        }
                    }
                }
            }
        },
        loaded: function () {
            var comp;
            for (var i = 0, l = this._tabContent._components.length; i < l; i++) {
                comp = this._tabContent._components[i];
                comp._tab = comp._HTMLElement.parentNode.jsObj;
            }
            this._inherited();
        }/*,
    getChildsControls:function(callback) {
      var i,l,comp,comps;
      comps=this._tabContent._components.sort(function(a,b) {
        var tabA,tabB,pageCtrl,idxA,idxB;
        tabA=a._tab;
        tabB=b._tab;
        pageCtrl=tabA._owner;
        idxA=pageCtrl._tabs.indexOf(tabA);
        idxB=pageCtrl._tabs.indexOf(b._tab);
        console.log();
        return idxA<idxB?-1:idxA>idxB?1:0;
      });
      for (i=0,l=comps.length;i<l;i++) {
        comp=comps[i];
        if (comp instanceof $j.classes.Component) {
          if (callback)) {
            if (typeof callback===_const.FUNCTION) callback(comp);
          }
          if (comp instanceof $j.classes.Control) comp.getChildsControls(callback);
        }
      }
    }*/
        //#endregion
    });
    //#endregion
    Object.seal(PageControl);
    $j.classes.register($j.types.categories.INTERNAL, TabSheet);
    $j.classes.register($j.types.categories.CONTAINERS, PageControl);
    //#region Template
    if ($j.isHTMLRenderer()) {
        var TabSheetTpl = "<label id='{internalId}' data-class='TabSheet' data-name='{name}' class='Control Tab TabSheet selected csr_default {theme}'>{caption}</label>",
            PageTpl = "<div class='Control PageContent {theme}' data-tab='{name}'></div>";
        $j.classes.registerTemplates([{ Class: TabSheet, template: TabSheetTpl }, { Class: PageControl, template: $j.templates["CustomTabControl"] }, { Class: "Page", template: PageTpl }]);
    }
    //#endregion
})();