/*
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://www.extjs.com/license
 */

Ext.ComponentMgr=function(){var A=new Ext.util.MixedCollection();return{register:function(B){A.add(B)},unregister:function(B){A.remove(B)},get:function(B){return A.get(B)},onAvailable:function(D,C,B){A.on("add",function(E,F){if(F.id==D){C.call(B||F,F);A.un("add",C,B)}})}}}();Ext.Component=function(A){A=A||{};if(A.tagName||A.dom||typeof A=="string"){A={el:A,id:A.id||A}}this.initialConfig=A;Ext.apply(this,A);this.addEvents({disable:true,enable:true,beforeshow:true,show:true,beforehide:true,hide:true,beforerender:true,render:true,beforedestroy:true,destroy:true});if(!this.id){this.id="ext-comp-"+(++Ext.Component.AUTO_ID)}Ext.ComponentMgr.register(this);Ext.Component.superclass.constructor.call(this);this.initComponent();if(this.renderTo){this.render(this.renderTo);delete this.renderTo}};Ext.Component.AUTO_ID=1000;Ext.extend(Ext.Component,Ext.util.Observable,{hidden:false,disabled:false,rendered:false,disabledClass:"x-item-disabled",allowDomMove:true,hideMode:"display",ctype:"Ext.Component",actionMode:"el",getActionEl:function(){return this[this.actionMode]},initComponent:Ext.emptyFn,render:function(B,A){if(!this.rendered&&this.fireEvent("beforerender",this)!==false){if(!B&&this.el){this.el=Ext.get(this.el);B=this.el.dom.parentNode;this.allowDomMove=false}this.container=Ext.get(B);this.rendered=true;if(A!==undefined){if(typeof A=="number"){A=this.container.dom.childNodes[A]}else{A=Ext.getDom(A)}}this.onRender(this.container,A||null);if(this.cls){this.el.addClass(this.cls);delete this.cls}if(this.style){this.el.applyStyles(this.style);delete this.style}this.fireEvent("render",this);this.afterRender(this.container);if(this.hidden){this.hide()}if(this.disabled){this.disable()}}return this},onRender:function(B,A){if(this.el){this.el=Ext.get(this.el);if(this.allowDomMove!==false){B.dom.insertBefore(this.el.dom,A)}}},getAutoCreate:function(){var A=typeof this.autoCreate=="object"?this.autoCreate:Ext.apply({},this.defaultAutoCreate);if(this.id&&!A.id){A.id=this.id}return A},afterRender:Ext.emptyFn,destroy:function(){if(this.fireEvent("beforedestroy",this)!==false){this.purgeListeners();this.beforeDestroy();if(this.rendered){this.el.removeAllListeners();this.el.remove();if(this.actionMode=="container"){this.container.remove()}}this.onDestroy();Ext.ComponentMgr.unregister(this);this.fireEvent("destroy",this)}},beforeDestroy:function(){},onDestroy:function(){},getEl:function(){return this.el},getId:function(){return this.id},focus:function(A){if(this.rendered){this.el.focus();if(A===true){this.el.dom.select()}}return this},blur:function(){if(this.rendered){this.el.blur()}return this},disable:function(){if(this.rendered){this.onDisable()}this.disabled=true;this.fireEvent("disable",this);return this},onDisable:function(){this.getActionEl().addClass(this.disabledClass);this.el.dom.disabled=true},enable:function(){if(this.rendered){this.onEnable()}this.disabled=false;this.fireEvent("enable",this);return this},onEnable:function(){this.getActionEl().removeClass(this.disabledClass);this.el.dom.disabled=false},setDisabled:function(A){this[A?"disable":"enable"]()},show:function(){if(this.fireEvent("beforeshow",this)!==false){this.hidden=false;if(this.rendered){this.onShow()}this.fireEvent("show",this)}return this},onShow:function(){var A=this.getActionEl();if(this.hideMode=="visibility"){A.dom.style.visibility="visible"}else{if(this.hideMode=="offsets"){A.removeClass("x-hidden")}else{A.dom.style.display=""}}},hide:function(){if(this.fireEvent("beforehide",this)!==false){this.hidden=true;if(this.rendered){this.onHide()}this.fireEvent("hide",this)}return this},onHide:function(){var A=this.getActionEl();if(this.hideMode=="visibility"){A.dom.style.visibility="hidden"}else{if(this.hideMode=="offsets"){A.addClass("x-hidden")}else{A.dom.style.display="none"}}},setVisible:function(A){if(A){this.show()}else{this.hide()}return this},isVisible:function(){return this.getActionEl().isVisible()},cloneConfig:function(B){B=B||{};var C=B.id||Ext.id();var A=Ext.applyIf(B,this.initialConfig);A.id=C;return new this.constructor(A)}});