(function() {
    $j.classes.register($j.types.categories.COLOR,CircleColorPanel);
    CircleColorPanel.inherit($j.classes.Control);
    function CircleColorPanel(owner) {
        if(owner !== null) {
            $j.classes.Control.apply(this,arguments);
            //this.circleHue=$j.classes.CircleHue.create(this);
            //this.circleHue.left=0;
            //this.circleHue.top=0;
            //this.circleHue.width=this.width;
            //this.circleHue.height=this.height;
            //this.circleHue.circleColorPanel=this;
            //this.circleHue.onChange.addListener(this.doHueChange);
            //
            //this.colorQuad=$j.classes.ColorQuad.create(this);
            //this.colorQuad.circleColorPanel=this;
            //this.colorQuad.onChange.addListener(this.doQuadChange);
            //
            //this.colorBox=null;
            //this.width=150;
            //this.height=150;
            //this.color=$j.classes.Color.create(_colors.WHITE);
            //this.onChange=$j.classes.NotifyEvent.create(this);
            //this.constraints.setValues(150,150,150,150);
        }
    }
    //#region Properties
    //CircleColorPanel.prototype.circleHue=null;
    //CircleColorPanel.prototype.colorQuad=null;
    //CircleColorPanel.prototype.colorBox=null;
    //CircleColorPanel.prototype.color=null;
    //#endregion
    //#region Methods
    //CircleColorPanel.prototype.setColor=function(newValue){
    //  if (!(newValue instanceof $j.classes.Color)) return;
    //  var hsl=$j.classes.Color.RGB2HSL(newValue);
    //  this.hueTrack.setValue(hsl.h);
    //  this.colorQuad.onChange.invoke();
    //  hsl=null;
    //};
    //CircleColorPanel.prototype.setColorBox=function(newValue){
    //  if (!(newValue instanceof $j.classes.ColorBox)) return;
    //  if (this.colorBox!==newValue){
    //    this.colorBox=newValue;
    //    this.colorQuad.setColorBox(this.colorBox);
    //  }
    //};
    //CircleColorPanel.prototype.doHueChange=function(){
    //  this.circleColorPanel.colorQuad.setHue(this.hue);
    //};
    //CircleColorPanel.prototype.loaded=function(){
    //  $j.classes.Control.prototype.loaded.apply(this,[]);
    //  if (this.colorBox) {
    //    this.colorQuad.setColorBox(this.colorBox);
    //  }
    //  this.resize();
    //};
    //CircleColorPanel.prototype.setWidth=function(newValue){
    //  if (typeof newValue!==_const.NUMBER) return;
    //  if (newValue!==150) newValue=150;
    //  $j.classes.Control.prototype.setWidth.apply(this,arguments);
    //  this.resizeColorQuad();
    //};
    //CircleColorPanel.prototype.setHeight=function(newValue){
    //  if (typeof newValue!==_const.NUMBER) return;
    //  if (newValue!==150) newValue=150;
    //  $j.classes.Control.prototype.setHeight.apply(this,arguments);
    //  this.resizeColorQuad();
    //};
    //CircleColorPanel.prototype.resizeColorQuad=function(){
    //  this.colorQuad.beginUpdate();
    //  this.colorQuad.setLeft(35);
    //  this.colorQuad.setTop(35);
    //  this.colorQuad.setWidth(this.width-82);
    //  this.colorQuad.setHeight(this.height-82);
    //  this.colorQuad.endUpdate();
    //};
    //CircleColorPanel.prototype.resize=function() {
    //  this.circleHue.left=0;
    //  this.circleHue.top=0;
    //  this.circleHue.width=this.width;
    //  this.circleHue.height=this.height;
    //  this.resizeColorQuad();
    //};
    //CircleColorPanel.prototype.realign=CircleColorPanel.prototype.resize;
    //#endregion
    Object.seal(CircleColorPanel);
})();