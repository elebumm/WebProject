Ext.override(Ext.form.Checkbox, {  
  getResizeEl : function(){
    return this.wrap;
  }
});