(function() {
    $j.classes.register($j.types.categories.COLOR,CircleHue);
    CircleHue.inherit($j.classes.GraphicControl);
    function CircleHue(owner) {
        if(owner !== null) {
            $j.classes.GraphicControl.apply(this,arguments);
            //this.autoCapture=true;
            //this.hue=0;
            //this.handle={x:0,y:0};
            //this.onChange=$j.classes.NotifyEvent.create(this);
            //this.setHitTest(true);
        }
    }
    //#region Properties
    //CircleHue.prototype.colorBitmap=null;
    //CircleHue.prototype.hue=null;
    //CircleHue.prototype.handle=null;
    //#endregion
    //#region Methods
    //CircleHue.prototype.setHue=function(newValue){
    //  newValue=+newValue;
    //  if (isNaN(newValue)) newValue=0;
    //  if (newValue<0) newValue=0;
    //  if (newValue>1) newValue=1;
    //  if (this.hue!==newValue){
    //    this.hue=newValue;
    //    this.onChange.invoke();
    //    if (this._allowUpdate) this.update();
    //    this.redraw();
    //  }
    //};
    //CircleHue.prototype.changeHandle=function(point){
    //  if (this._isPressed) {
    //    this.handle.x=point.x;
    //    this.handle.y=point.y;
    //    this.handle.x-=this.width/2;
    //    this.handle.y-=this.height/2;
    //    this.hue=$j.atan2(this.handle.x,-this.handle.y)/6.28;
    //    if (this.hue<0) this.hue+=1;
    //    this.onChange.invoke();
    //    if (this._allowUpdate) this.update();
    //    this.redraw();
    //  }
    //};
    //CircleHue.prototype.mouseDown=function(mouseButton,point){
    //  $j.classes.GraphicControl.prototype.mouseDown.apply(this,arguments);
    //  this.changeHandle(point);
    //};
    //CircleHue.prototype.mouseMove=function(mouseButton,point){
    //  $j.classes.GraphicControl.prototype.mouseMove.apply(this,arguments);
    //  this.changeHandle(point);
    //};
    //CircleHue.prototype.draw=function(/*ctx*/){
    //  if ((this.width===0)||(this.height===0)) return;
    //  if (this.form._loading||this.form._creating) return;
    //  var c,colorPickSize2,r,angle,left,top,w2=~~(this.width/2),h2=~~(this.height/2),newColor;
    //  this.gradientCenter=$j.classes.Point.create(w2,h2);
    //  colorPickSize2=_const.COLORPICKSIZE/2;
    //  c=$j.tools.colors.HSL2RGB(this.hue*360,100,100);
    //  if (!this.colorBitmap) {
    //    this.colorBitmap=$j.doc.createElement("canvas");
    //    this.colorBitmap.width=this.width;
    //    this.colorBitmap.height=this.height;
    //    if (this.colorBitmap){
    //      var bmpCtx=this.colorBitmap.getContext("2d"),imageData;
    //      imageData=bmpCtx.createImageData(this.colorBitmap.width,this.colorBitmap.height);
    //      bmpCtx.save();
    //      for (var y=0;y<this.colorBitmap.height;y++) {
    //        for (var x=0;x<this.colorBitmap.width;x++) {
    //          var result=this.angularGradient($j.classes.Point.create(x,y));
    //          this.setPixel(imageData,x,y,result);
    //        }
    //      }
    //      bmpCtx.restore();
    //      bmpCtx.putImageData(imageData,0,0);
    //      bmpCtx.save();
    //      bmpCtx.lineWidth=2;
    //      bmpCtx.strokeStyle="silver";
    //      bmpCtx.globalCompositeOperation=$j.types.canvas.globalCompositeOperations.DESTINATIONOUT;
    //      bmpCtx.beginPath();
    //      bmpCtx.arc(w2,h2,w2-20,0,2*Math.PI,false);
    //      bmpCtx.fill();
    //      bmpCtx.globalCompositeOperation=$j.types.canvas.globalCompositeOperations.SOURCEOVER;
    //      bmpCtx.stroke();
    //      bmpCtx.restore();
    //    }
    //  }
    //  angle=this.hue*6.28;
    //  left=$j.round($j.sin(angle)*(w2-11)+w2);
    //  top=$j.round(-$j.cos(angle)*(w2-11)+w2);
    //  newColor=$j.tools.colors.HSL2RGB(this.hue,1,0.5);
    //  this.ctx.save();
    //  this.ctx.save();
    //  this.ctx.beginPath();
    //  this.ctx.arc(w2,h2,w2,0,2*Math.PI,false);
    //  this.ctx.clip();
    //  this.ctx.translate(w2,h2);
    //  this.ctx.rotate(-_conv.deg2Rad(30));
    //  this.ctx.drawImage(this.colorBitmap,-w2,-h2);
    //  this.ctx.restore();
    //  this.ctx.lineWidth=2;
    //  this.ctx.strokeStyle="silver";
    //  this.ctx.beginPath();
    //  this.ctx.arc(w2,h2,w2-1,0,2*Math.PI,false);
    //  this.ctx.stroke();
    //  r=$j.classes.Rect.create(left-colorPickSize2,top-colorPickSize2,left+colorPickSize2,top+colorPickSize2);
    //  this.ctx.lineWidth=1;
    //  this.ctx.fillStyle=_colors.TRANSPARENT.toARGBString();
    //  this.ctx.strokeStyle=_colors.WHITE.toARGBString();
    //  this.ctx.drawEllipse(r,0);
    //  r.inflate(-1,-1);
    //  this.ctx.strokeStyle=_colors.BLACK.toARGBString();
    //  this.ctx.drawEllipse(r,0);
    //  r.inflate(-1,-1);
    //  this.ctx.fillStyle=c.toARGBString();
    //  this.ctx.strokeStyle=_colors.TRANSPARENT.toARGBString();
    //  this.ctx.drawEllipse(r,0);
    //  this.ctx.restore();
    //};
    //CircleHue.prototype.angularGradient=function(point) {
    //  var dir,angle,angleRatio,index,leftColor,rightColor,lerpFac,colors;
    //  colors=[[0,1,0,1],
    //          [0,1,1,1],
    //          [0,0,1,1],
    //          [1,0,1,1],
    //          [1,0,0,1],
    //          [1,1,0,1]];
    //  // figure out angle
    //  dir=point.subtract(this.gradientCenter);
    //  angle=$j.atan2(dir.y,dir.x);
    //  // wrap around as positive
    //  if (dir.y<0) angle+=2*Math.PI;
    //  // map to [0, 1] range
    //  angle/=(2*Math.PI);
    //  // figure out which segments to interpolate
    //  angleRatio=angle*colors.length;
    //  index=$j.floor(angleRatio);
    //  leftColor=index===0?colors[colors.length-1]:colors[index-1];
    //  rightColor=colors[index];
    //  // figure out interpolation factor
    //  lerpFac=angleRatio%1;
    //  return this.lerp(leftColor,rightColor,lerpFac);
    //};
    //CircleHue.prototype.setPixel=function(imageData,x,y,rgba) {
    //  var index=(x+y*imageData.width)*4;
    //  for (var i=0;i<4;i++) {
    //    imageData.data[index+i]=rgba[i]*255;
    //  }
    //};
    //CircleHue.prototype.lerp=function(a,b,fac) {
    //  var ret=[];
    //  if(a===b) return a;
    //  for (var i=0;i<$j.min(a.length,b.length);i++) {
    //    ret[i]=a[i]*(1-fac)+b[i]*fac;
    //  }
    //  return ret;
    //};
    //CircleHue.prototype.setWidth=function(newValue){
    //  var oldWidth=this.width;
    //  if (oldWidth===newValue) return;
    //  $j.classes.GraphicControl.prototype.setWidth.apply(this,arguments);
    //  destroy(this.colorBitmap);
    //  this.colorBitmap=null;
    //};
    //CircleHue.prototype.setHeight=function(newValue){
    //  var oldHeight=this.height;
    //  if (oldHeight===newValue) return;
    //  $j.classes.GraphicControl.prototype.setHeight.apply(this,arguments);
    //  destroy(this.colorBitmap);
    //  this.colorBitmap=null;
    //};
    //CircleHue.prototype.realign=$j.tools.emptyFunc;
    //CircleHue.prototype.mouseWheel=function(wheelDir,wheelDelta,mouseButton,point) {
    //  var newHue=this.hue+(-wheelDelta/50);
    //  if (newHue<0) newHue=1-newHue;
    //  else if (newHue>1) newHue=newHue-1;
    //  this.setHue(newHue);
    //}
    //#endregion
    Object.seal(CircleHue);
})();