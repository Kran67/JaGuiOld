(function () {
    "use strict";
    var GradientEdit = $j.classes.GraphicControl.extend("GradientEdit", {
        init: function (owner, props) {
            props = !props ? {} : props;
            if (owner !== null) {
                this._inherited(owner, props);
                //#region Privates
                this._currentPoint = -1;
                this._gradientArea = null;
                this._colorStopsArea = null;
                this._downOffset = null;
                //#endregion Privates
                this.gradient = new $j.classes.Gradient(this);
                this.width = 200;
                this.height = 20;
                this.autoCapture = true;
                this.setHitTest(true);
                this.colorQuad = null;
                this.alphaSlider = null;
            }
        },
        //#region Setters
        setColorQuad: function (newValue) {
            if (!(newValue instanceof $j.classes.ColorQuad)) return;
            if (this.colorQuad !== null) this.colorQuad.removeListener(this.onChangeColorQuad);
            if (this.colorQuad !== newValue) {
                this.colorQuad = newValue;
                this.colorQuad.gradientEdit = this;
            }
        },
        //#endregion
        //#region Methods
        getChildsHTMLElement: function () {
            var data;
            this._gradientArea = this._HTMLElement.firstElementChild;
            this._gradientArea.jsObj = this;
            $j.tools.events.bind(this._gradientArea, $j.types.mouseEvents.DOWN, this.addColorStop);
            this._colorStopsArea = this._HTMLElement.lastElementChild;
            this._colorStopsArea.jsObj = this;
            var childs = this._colorStopsArea.childNodes;
            this.gradient.items.clear();
            for (var i = 0, l = childs.length; i < l; i++) {
                if (childs[i].nodeType === $j.types.xmlNodeTypes.ELEMENT_NODE) {
                    data = ($j.browser.ie) ? childs[i].getAttribute("data-offset") : childs[i].dataset.offset;
                    var grad = new $j.classes.GradientPoint(data / 100, _colors.parse(getComputedStyle(childs[i]).backgroundColor));
                    grad._HTMLElement = childs[i];
                    grad._HTMLElement.jsObj = this;
                    grad._HTMLElement.gradItem = grad;
                    $j.tools.events.bind(grad._HTMLElement, $j.types.mouseEvents.DOWN, this.selectPoint);
                    $j.tools.events.bind(grad._HTMLElement, $j.types.mouseEvents.MOVE, this.movePoint);
                    this.gradient.items.push(grad);
                }
            }
        },
        selectPoint: function (event) {
            var grdEdit = this.jsObj, gradItem = this.gradItem, point;
            $j.mouse.getMouseInfos(event);
            if ($j.mouse.button == $j.types.mouseButtons.LEFT) {
                if (grdEdit._currentPoint !== -1) {
                    if ($j.browser.ie) grdEdit.gradient.items[grdEdit._currentPoint]._HTMLElement.setAttribute("data-selected", false);
                    else grdEdit.gradient.items[grdEdit._currentPoint]._HTMLElement.dataset.selected = false;
                }
                grdEdit._currentPoint = grdEdit.gradient.items.indexOf(gradItem);
                if ($j.browser.ie) this.setAttribute("data-selected", true);
                else this.dataset.selected = true;
                point = grdEdit.documentToClient();
                grdEdit._downOffset = point.x;
                grdEdit.form._capturedControl = grdEdit;
                if (grdEdit.colorQuad !== null) {
                    //grdEdit.colorQuad.lastPt.setValues(0,0);
                    //grdEdit.colorQuad.setHue(grdEdit.gradient.items[grdEdit._currentPoint].color.hue);
                }
            } else if ($j.mouse.button == $j.types.mouseButtons.RIGHT) grdEdit.removePoint(gradItem);
            $j.mouse.stopEvent(event);
        },
        removePoint: function (gradItem) {
            $j.tools.events.unBind(gradItem._HTMLElement, $j.types.mouseEvents.DOWN, this.selectPoint);
            $j.tools.events.unBind(gradItem._HTMLElement, $j.types.mouseEvents.MOVE, this.movePoint);
            gradItem._HTMLElement.jsObj = null;
            this._colorStopsArea.removeChild(gradItem._HTMLElement);
            this.gradient.items.removeAt(this.gradient.items.indexOf(gradItem));
            var data = ($j.browser.ie) ? gradItem._HTMLElement.getAttribute("data-selected") : gradItem._HTMLElement.dataset.selected;
            if (data === "true") {
                this._currentPoint = this._currentPoint - 1;
                if (this._currentPoint < 0) this._currentPoint = 0;
                if ($j.browser.ie) this.gradient.items[this._currentPoint]._HTMLElement.setAttribute("data-selected", true);
                else this.gradient.items[this._currentPoint]._HTMLElement.dataset.selected = true;
            }
            //this.doChanged(this);
            gradItem._HTMLElement = null;
            this.update();
        },
        movePoint: function (event) {
            var point, obj = this.jsObj, offset, lastLeft;
            $j.mouse.getMouseInfos(event);
            var data = ($j.browser.ie) ? this.getAttribute("data-selected") : this.dataset.selected;
            if (data === null || !(_conv.strToBool(data))) return;
            if ($j.mouse.button == $j.types.mouseButtons.LEFT) {
                point = obj.documentToClient();
                offset = point.x - obj._downOffset;
                lastLeft = this.offsetLeft + offset;
                if (lastLeft < 0) lastLeft = 0;
                if (lastLeft > obj._colorStopsArea.offsetWidth - _const.COLORPICKSIZE) lastLeft = obj._colorStopsArea.offsetWidth - _const.COLORPICKSIZE;
                this.style[$j.types.jsCSSProperties.LEFT] = lastLeft + $j.types.CSSUnits.PX;
                obj._downOffset = point.x;
                $j.mouse.stopEvent(event);
                obj.gradient.items[obj._currentPoint].offset = point.x / (obj._gradientArea.offsetWidth + 10);
                //move right
                if (obj._currentPoint < obj.gradient.items.length - 1)
                    if (obj.gradient.items[obj._currentPoint].offset > obj.gradient.items[obj._currentPoint + 1].offset) {
                        obj.gradient.items.swap(obj._currentPoint, obj._currentPoint + 1);
                        obj._currentPoint++;
                    }
                //move left
                if (obj._currentPoint > 0)
                    if (obj.gradient.items[obj._currentPoint].offset < obj.gradient.items[obj._currentPoint - 1].offset) {
                        obj.gradient.items.swap(obj._currentPoint, obj._currentPoint - 1);
                        obj._currentPoint--;
                    }
                obj.update();
            }
        },
        mouseMove: function () {
            if ($j.mouse.button === $j.types.mouseButtons.LEFT) {
                if (this._currentPoint > -1) {
                    console.log("ok");
                    var gradDom = this.gradient.items[this._currentPoint]._HTMLElement;
                    this.movePoint.apply(gradDom, [$j.mouse.event]);
                } else this._inherited();
            }
        },
        mouseDown: function () {
            if ($j.mouse.button === $j.types.mouseButtons.LEFT) {
                if (this._currentPoint !== -1) {
                    if ($j.browser.ie) this.gradient.items[this._currentPoint]._HTMLElement.setAttribute("data-selected", false);
                    else this.gradient.items[this._currentPoint]._HTMLElement.dataset.selected = false;
                }
                this._currentPoint = -1;
            }
        },
        addColorStop: function (event) {
            $j.mouse.getMouseInfos(event);
            var grdEdit = this.jsObj, newOffset, colorPickSize = _const.COLORPICKSIZE, newColor, i, l, gradDOM, left;
            if ($j.mouse.button == $j.types.mouseButtons.LEFT) {
                left = $j.mouse.target.x;
                newOffset = ((left - colorPickSize) / (this.offsetWidth - (colorPickSize * 2)));
                console.log(left + "/" + newOffset);
                if (newOffset < 0) newOffset = 0;
                if (newOffset > 1) newOffset = 1;
                newColor = grdEdit.gradient.interpolateColor(newOffset);
                for (i = 1, l = grdEdit.gradient.items.length; i < l; i++) {
                    if (newOffset < grdEdit.gradient.items[i].offset) {
                        if (grdEdit._currentPoint !== -1) {
                            if ($j.browser.ie) grdEdit.gradient.items[grdEdit._currentPoint]._HTMLElement.setAttribute("data-selected", false);
                            else grdEdit.gradient.items[grdEdit._currentPoint]._HTMLElement.dataset.selected = false;
                        }
                        var grad = new $j.classes.GradientPoint(newOffset, newColor);
                        grdEdit.gradient.items.add(grad);
                        grdEdit.gradient.items.sort(function (a, b) { return a.offset > b.offset; });
                        gradDOM = $j.doc.createElement($j.types.HTMLElements.DIV);
                        gradDOM.ClassName = "ColorPickerIndicator";
                        gradDOM.style[$j.types.jsCSSProperties.BACKGROUNDCOLOR] = grad.color.toARGBString();
                        gradDOM.style[$j.types.jsCSSProperties.LEFT] = left + $j.types.CSSUnits.PX;
                        if ($j.browser.ie) gradDOM.setAttribute("data-offset", newOffset * 100);
                        else gradDOM.dataset.offset = newOffset * 100;
                        //gradDOM.dataset.selected=true;
                        if ($j.browser.ie) gradDOM.setAttribute("data-index", i);
                        else gradDOM.dataset.index = i;
                        grad._HTMLElement = gradDOM;
                        gradDOM.jsObj = grdEdit;
                        gradDOM.gradItem = grad;
                        $j.tools.events.bind(gradDOM, $j.types.mouseEvents.DOWN, grdEdit.selectPoint);
                        $j.tools.events.bind(gradDOM, $j.types.mouseEvents.MOVE, grdEdit.movePoint);
                        grdEdit._colorStopsArea.appendChild(gradDOM);
                        //grdEdit.currentPoint=i;
                        grad = null;
                        grdEdit.update();
                        break;
                    }
                }
            }
            $j.mouse.stopEvent(event);
        },
        update: function () {
            var i, l, gradient = [];
            for (i = 0, l = this.gradient.items.length; i < l; i++) {
                var grad = this.gradient.items[i];
                gradient.push(grad.color.toRGBHexString() + String.SPACE + ~~(grad.offset * 100) + (grad.offset !== 0 ? "%" : String.EMPTY));
            }
            if (this._gradientArea !== null) this._gradientArea.style[$j.types.jsCSSProperties.BACKGROUNDIMAGE] = $j.browser.getVendorPrefix($j.types.CSSProperties.LINEARGRADIENT) + "linear-gradient(left," + gradient.join(",") + ")";
        },
        //GradientEdit.prototype.setGradient=function(newValue){
        //  if (!(newValue instanceof $j.classes.Gradient)) return;
        //  if (this.gradient!==newValue) this.gradient.assign(newValue);
        //};
        //GradientEdit.prototype.setCurrentPoint=function(newValue){
        //  if (typeof newValue!==_const.NUMBER)return;
        //  if (this.currentPoint!==newValue){
        //    this.currentPoint=newValue;
        //    //if (typeof this.onSelectPoint===_const.FUNCTION) this.onSelectPoint(this);
        //    this.onSelectPoint.invoke();
        //    if (this.colorPicker && (this.currentPoint>=0)) this.colorPicker.setColor(this.gradient.items[this.currentPoint].color);
        //  }
        //};
        //GradientEdit.prototype.setOnSelectPoint=function(newValue){
        //  if (typeof newValue!==_const.FUNCTION) return;
        //  if (this.onSelectPoint!==newValue) this.onSelectPoint=newValue;
        //};
        //GradientEdit.prototype.setColorPicker=function(newValue){
        //  if (!(newValue instanceof $j.classes.ColorPicker)) return;
        //  if (this.colorPicker!==newValue) {
        //    this.colorPicker=newValue;
        //    if (this.colorPicker && (this.currentPoint>=0)) this.colorPicker.setColor(this.gradient.items[this.currentPoint].color);
        //  }
        //};
        //GradientEdit.prototype.pointRect=function(p){
        //  var result=$j.classes.Rect.create(),colorPickSize=_const.COLORPICKSIZE;
        //  if ((p>=0) && (p<this.gradient.items.length))
        //  result.setLeft(colorPickSize+(this.gradient.items[p].offset*(this.width-(colorPickSize*2))));
        //  result.setTop(this.height-colorPickSize);
        //  result.setRight(colorPickSize+(this.gradient.items[p].offset*(this.width-(colorPickSize*2))));
        //  result.setBottom(this.height);
        //  result.inflate(colorPickSize/2,0);
        //  return result;
        //};
        //GradientEdit.prototype.doChanged=function(s){
        //  //if (typeof this.onChanged===_const.FUNCTION) this.onChanged(this);
        //  //s.onChanged.invoke();
        //  s.updateGradient();
        //};
        //GradientEdit.prototype.mouseDown=function(mouseButton,point){
        //  var newOffset,newColor,colorPickSize=_const.COLORPICKSIZE,i,l;
        //  $j.classes.GraphicControl.prototype.mouseDown.apply(this,arguments);
        //  this.moving=false;
        //  if (mouseButton===$j.types.mouseButtons.LEFT){
        //    // add new point
        //    if ((point.y>0) && (point.y<this.height-colorPickSize)) {
        //      newOffset=((point.x-colorPickSize)/(this.width-(colorPickSize*2)));
        //      if (newOffset<0) newOffset=0;
        //      if (newOffset>1) newOffset=1;
        //      newColor=this.gradient.interpolateColor(newOffset);
        //      for (i=1,l=this.gradient.items.length;i<l;i++){
        //        if (newOffset<this.gradient.items[i].offset){
        //          var grad=$j.classes.GradientPoint.create(newOffset,newColor);
        //          this.gradient.items.add(grad);
        //          this.gradient.items.sort(function(a,b){return a.offset>b.offset;});
        //          this.currentPoint=this.gradient.items.indexOf(grad);
        //          grad=null;
        //          this.redraw();
        //          this.doChanged(this);
        //          break;
        //        }
        //      }
        //    } else {
        //      // select point
        //      for (i=0,l=this.gradient.items.length;i<l;i++)
        //        if (point.inRect(this.pointRect(i))) {
        //          this.currentPoint=i;
        //          this.onSelectPoint.invoke();
        //          this.moving=true;
        //          this.redraw();
        //          break;
        //        }
        //    }
        //  }
        //};
        //GradientEdit.prototype.mouseMove=function(mouseButton,point){
        //  $j.classes.GraphicControl.prototype.mouseMove.apply(this,arguments);
        //  var colorPickSize=_const.COLORPICKSIZE;
        //  if (mouseButton===$j.types.mouseButtons.LEFT){
        //    if (this.moving){
        //      this.currentPointInvisible=((point.y<-10)||(point.y>this.height+10)) && (this.gradient.items.length>1) &&
        //        (this.currentPoint!==0)&&(this.currentPoint!==this.gradient.items.length-1);
        //      // move
        //      this.gradient.items[this.currentPoint].setOffset(((point.x-colorPickSize)/(this.width-(colorPickSize*2))));
        //      if (this.gradient.items[this.currentPoint].offset<0) this.gradient.items[this.currentPoint].setOffset(0);
        //      if (this.gradient.items[this.currentPoint].offset>1) this.gradient.items[this.currentPoint].setOffset(1);
        //      //move right
        //      if (this.currentPoint<this.gradient.items.length-1)
        //        if (this.gradient.items[this.currentPoint].offset>this.gradient.items[this.currentPoint+1].offset){
        //          this.gradient.items.swap(this.currentPoint,this.currentPoint+1);
        //          this.currentPoint++;
        //        }
        //      //move left
        //      if (this.currentPoint>0)
        //        if (this.gradient.items[this.currentPoint].offset<this.gradient.items[this.currentPoint-1].offset){
        //          this.gradient.items.swap(this.currentPoint,this.currentPoint-1);
        //          this.currentPoint--;
        //        }
        //      this.redraw();
        //      this.doChanged(this);
        //    }
        //  }
        //};
        //GradientEdit.prototype.mouseUp=function(mouseButton,point){
        //  $j.classes.GraphicControl.prototype.mouseUp.apply(this,arguments);
        //  this.currentPointInvisible=false;
        //  if (this.moving){
        //    if ((point.y>this.height+10)&&(this.gradient.items.length>1)) {
        //      this.gradient.items.removeAt(this.currentPoint);
        //      this.currentPoint=this.currentPoint-1;
        //      if (this.currentPoint<0) this.currentPoint=0;
        //      this.redraw();
        //      this.doChanged(this);
        //      this.moving=false;
        //      return;
        //    }
        //  }
        //  this.moving=false;
        //};
        //GradientEdit.prototype.updateGradient=function(){
        //  if (this.colorPicker && (this.currentPoint>=0)) this.colorPicker.setColor(this.gradient.items[this.currentPoint].color);
        //};
        //GradientEdit.prototype.draw=function(/*ctx*/){
        //  if ((this.width===0)||(this.height===0)) return;
        //  if (this.form._loading||this.form._creating) return;
        //  var lr=this.localRect(),colorPickSize=_const.COLORPICKSIZE,r=$j.classes.Rect.create(),i,l;
        //  this.ctx.save();
        //  // draw back
        //  var _ctx,c=$j.doc.createElement("canvas");
        //  c.width=20;
        //  c.height=20;
        //  _ctx=c.getContext("2d");
        //  _ctx.globalAlpha*=this.opacity;
        //  _ctx.fillStyle=_colors.WHITE.toARGBString();
        //  _ctx.fillRect(0,0,c.width,c.height);
        //  _ctx.fillStyle="#D3D3D3";
        //  _ctx.fillRect(0,0,10,10);
        //  _ctx.fillRect(0,10,10,10);
        //  //ctx.globalAlpha*=this.opacity;
        //  this.ctx.fillStyle=this.ctx.createPattern(c,$j.types.canvas.patternRepeats.REPEAT);
        //  this.ctx.fillRect(lr.left+colorPickSize,lr.top,lr.width()-(colorPickSize*2),lr.height()-colorPickSize);
        //  var gradient=this.ctx.createLinearGradient(lr.left+colorPickSize,lr.top,lr.width()-(colorPickSize*0.5)+1,lr.top);
        //  for (i=0,l=this.gradient.items.length;i<l;i++) gradient.addColorStop(this.gradient.items[i].offset,this.gradient.items[i].color.toARGBString());
        //  this.ctx.fillStyle=gradient;
        //  this.ctx.fillRect(lr.left+colorPickSize,lr.top,lr.width()-(colorPickSize*2),lr.height()-colorPickSize);
        //  gradient=null;
        //  // points
        //  for (i=0,l=this.gradient.items.length;i<l;i++){
        //    if (this.currentPointInvisible && (i===this.currentPoint)) continue;
        //    r.assign(this.pointRect(i));
        //    r.inflate(-1,-1);
        //    this.ctx.strokeStyle="#757575";
        //    this.ctx.fillStyle=this.gradient.items[i].color.toARGBString();
        //    this.ctx.drawEllipse(r,0);
        //    // color
        //    if (this.currentPoint===i){
        //      r.inflate(1,1);
        //      this.ctx.strokeStyle=_colors.WHITE.toARGBString();
        //      this.ctx.drawEllipse(r,0);
        //    }
        //  }
        //  this.ctx.restore();
        //};
        realign: $j.tools.emptyFunc,
        updateFromHTML: function () {
            this._inherited();
            var data = ($j.browser.ie) ? this._HTMLElement.getAttribute("data-colorquad") : this._HTMLElement.dataset.colorquad;
            if (data !== null) this.setColorQuad(this.form[data]);
        },
        changeCurrentPointColor: function (color) {
            if (this.currentPoint !== -1) {
                this.gradient.items[this._currentPoint].color.assign(color);
                this.gradient.items[this._currentPoint]._HTMLElementStyle.backgroundColor = color.toARGBString();
                this.update();
            }
        }
        //#endregion
    });
    Object.seal(GradientEdit);
    $j.classes.register($j.types.categories.COLOR, GradientEdit);
})();