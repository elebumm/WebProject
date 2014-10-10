/*
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://www.extjs.com/license
 */

Ext.PagingToolbar=function(B,C,A){Ext.PagingToolbar.superclass.constructor.call(this,B,null,A);this.ds=C;this.cursor=0;this.renderButtons(this.el);this.bind(C)};Ext.extend(Ext.PagingToolbar,Ext.Toolbar,{pageSize:20,displayMsg:"Displaying {0} - {1} of {2}",emptyMsg:"No data to display",beforePageText:"Page",afterPageText:"of {0}",firstText:"First Page",prevText:"Previous Page",nextText:"Next Page",lastText:"Last Page",refreshText:"Refresh",renderButtons:function(A){Ext.PagingToolbar.superclass.render.call(this,A);this.first=this.addButton({tooltip:this.firstText,cls:"x-btn-icon x-grid-page-first",disabled:true,handler:this.onClick.createDelegate(this,["first"])});this.prev=this.addButton({tooltip:this.prevText,cls:"x-btn-icon x-grid-page-prev",disabled:true,handler:this.onClick.createDelegate(this,["prev"])});this.addSeparator();this.add(this.beforePageText);this.field=Ext.get(this.addDom({tag:"input",type:"text",size:"3",value:"1",cls:"x-grid-page-number"}).el);this.field.on("keydown",this.onPagingKeydown,this);this.field.on("focus",function(){this.dom.select()});this.afterTextEl=this.addText(String.format(this.afterPageText,1));this.field.setHeight(18);this.addSeparator();this.next=this.addButton({tooltip:this.nextText,cls:"x-btn-icon x-grid-page-next",disabled:true,handler:this.onClick.createDelegate(this,["next"])});this.last=this.addButton({tooltip:this.lastText,cls:"x-btn-icon x-grid-page-last",disabled:true,handler:this.onClick.createDelegate(this,["last"])});this.addSeparator();this.loading=this.addButton({tooltip:this.refreshText,cls:"x-btn-icon x-grid-loading",handler:this.onClick.createDelegate(this,["refresh"])});if(this.displayInfo){this.displayEl=Ext.fly(this.el.dom.firstChild).createChild({cls:"x-paging-info"})}},updateInfo:function(){if(this.displayEl){var A=this.ds.getCount();var B=A==0?this.emptyMsg:String.format(this.displayMsg,this.cursor+1,this.cursor+A,this.ds.getTotalCount());this.displayEl.update(B)}},onLoad:function(C,B,F){this.cursor=F.params?F.params.start:0;var E=this.getPageData(),A=E.activePage,D=E.pages;this.afterTextEl.el.innerHTML=String.format(this.afterPageText,E.pages);this.field.dom.value=A;this.first.setDisabled(A==1);this.prev.setDisabled(A==1);this.next.setDisabled(A==D);this.last.setDisabled(A==D);this.loading.enable();this.updateInfo()},getPageData:function(){var A=this.ds.getTotalCount();return{total:A,activePage:Math.ceil((this.cursor+this.pageSize)/this.pageSize),pages:A<this.pageSize?1:Math.ceil(A/this.pageSize)}},onLoadError:function(){this.loading.enable()},onPagingKeydown:function(E){var C=E.getKey();var F=this.getPageData();if(C==E.RETURN){var B=this.field.dom.value,D;if(!B||isNaN(D=parseInt(B,10))){this.field.dom.value=F.activePage;return }D=Math.min(Math.max(1,D),F.pages)-1;this.ds.load({params:{start:D*this.pageSize,limit:this.pageSize}});E.stopEvent()}else{if(C==E.HOME||(C==E.UP&&E.ctrlKey)||(C==E.PAGEUP&&E.ctrlKey)||(C==E.RIGHT&&E.ctrlKey)||C==E.END||(C==E.DOWN&&E.ctrlKey)||(C==E.LEFT&&E.ctrlKey)||(C==E.PAGEDOWN&&E.ctrlKey)){var D=(C==E.HOME||(C==E.DOWN&&E.ctrlKey)||(C==E.LEFT&&E.ctrlKey)||(C==E.PAGEDOWN&&E.ctrlKey))?1:F.pages;this.field.dom.value=D;this.ds.load({params:{start:(D-1)*this.pageSize,limit:this.pageSize}});E.stopEvent()}else{if(C==E.UP||C==E.RIGHT||C==E.PAGEUP||C==E.DOWN||C==E.LEFT||C==E.PAGEDOWN){var B=this.field.dom.value,D;var A=(E.shiftKey)?10:1;if(C==E.DOWN||C==E.LEFT||C==E.PAGEDOWN){A*=-1}if(!B||isNaN(D=parseInt(B,10))){this.field.dom.value=F.activePage;return }else{if(parseInt(B,10)+A>=1&parseInt(B,10)+A<=F.pages){this.field.dom.value=parseInt(B,10)+A;D=Math.min(Math.max(1,D+A),F.pages)-1;this.ds.load({params:{start:D*this.pageSize,limit:this.pageSize}})}}E.stopEvent()}}}},beforeLoad:function(){if(this.loading){this.loading.disable()}},onClick:function(E){var D=this.ds;switch(E){case"first":D.load({params:{start:0,limit:this.pageSize}});break;case"prev":D.load({params:{start:Math.max(0,this.cursor-this.pageSize),limit:this.pageSize}});break;case"next":D.load({params:{start:this.cursor+this.pageSize,limit:this.pageSize}});break;case"last":var C=D.getTotalCount();var A=C%this.pageSize;var B=A?(C-A):C-this.pageSize;D.load({params:{start:B,limit:this.pageSize}});break;case"refresh":D.load({params:{start:this.cursor,limit:this.pageSize}});break}},unbind:function(A){A.un("beforeload",this.beforeLoad,this);A.un("load",this.onLoad,this);A.un("loadexception",this.onLoadError,this);this.ds=undefined},bind:function(A){A.on("beforeload",this.beforeLoad,this);A.on("load",this.onLoad,this);A.on("loadexception",this.onLoadError,this);this.ds=A}});