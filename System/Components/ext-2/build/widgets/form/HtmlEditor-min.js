/*
 * Ext JS Library 2.3.0
 * Copyright(c) 2006-2009, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */


Ext.form.HtmlEditor=Ext.extend(Ext.form.Field,{enableFormat:true,enableFontSize:true,enableColors:true,enableAlignments:true,enableLists:true,enableSourceEdit:true,enableLinks:true,enableFont:true,createLinkText:'Please enter the URL for the link:',defaultLinkValue:'http:/'+'/',fontFamilies:['Arial','Courier New','Tahoma','Times New Roman','Verdana'],defaultFont:'tahoma',defaultValue:Ext.isOpera?'&nbsp;':'&#8203;',actionMode:'wrap',validationEvent:false,deferHeight:true,initialized:false,activated:false,sourceEditMode:false,onFocus:Ext.emptyFn,iframePad:3,hideMode:'offsets',defaultAutoCreate:{tag:"textarea",style:"width:500px;height:300px;",autocomplete:"off"},initComponent:function(){this.addEvents('initialize','activate','beforesync','beforepush','sync','push','editmodechange')},createFontOptions:function(){var buf=[],fs=this.fontFamilies,ff,lc;for(var i=0,len=fs.length;i<len;i++){ff=fs[i];lc=ff.toLowerCase();buf.push('<option value="',lc,'" style="font-family:',ff,';"',(this.defaultFont==lc?' selected="true">':'>'),ff,'</option>');}
return buf.join('');},createToolbar:function(editor){var tipsEnabled=Ext.QuickTips&&Ext.QuickTips.isEnabled();function btn(id,toggle,handler){return{itemId:id,cls:'x-btn-icon x-edit-'+id,enableToggle:toggle!==false,scope:editor,handler:handler||editor.relayBtnCmd,clickEvent:'mousedown',tooltip:tipsEnabled?editor.buttonTips[id]||undefined:undefined,tabIndex:-1};}
var tb=new Ext.Toolbar({renderTo:this.wrap.dom.firstChild});tb.el.on('click',function(e){e.preventDefault();});if(this.enableFont&&!Ext.isSafari2){this.fontSelect=tb.el.createChild({tag:'select',cls:'x-font-select',html:this.createFontOptions()});this.fontSelect.on('change',function(){var font=this.fontSelect.dom.value;this.relayCmd('fontname',font);this.deferFocus();},this);tb.add(this.fontSelect.dom,'-');}
if(this.enableFormat){tb.add(btn('bold'),btn('italic'),btn('underline'));}
if(this.enableFontSize){tb.add('-',btn('increasefontsize',false,this.adjustFont),btn('decreasefontsize',false,this.adjustFont));}
if(this.enableColors){tb.add('-',{itemId:'forecolor',cls:'x-btn-icon x-edit-forecolor',clickEvent:'mousedown',tooltip:tipsEnabled?editor.buttonTips.forecolor||undefined:undefined,tabIndex:-1,menu:new Ext.menu.ColorMenu({allowReselect:true,focus:Ext.emptyFn,value:'000000',plain:true,selectHandler:function(cp,color){this.execCmd('forecolor',Ext.isWebKit||Ext.isIE?'#'+color:color);this.deferFocus();},scope:this,clickEvent:'mousedown'})},{itemId:'backcolor',cls:'x-btn-icon x-edit-backcolor',clickEvent:'mousedown',tooltip:tipsEnabled?editor.buttonTips.backcolor||undefined:undefined,tabIndex:-1,menu:new Ext.menu.ColorMenu({focus:Ext.emptyFn,value:'FFFFFF',plain:true,allowReselect:true,selectHandler:function(cp,color){if(Ext.isGecko){this.execCmd('useCSS',false);this.execCmd('hilitecolor',color);this.execCmd('useCSS',true);this.deferFocus();}else{this.execCmd(Ext.isOpera?'hilitecolor':'backcolor',Ext.isWebKit||Ext.isIE?'#'+color:color);this.deferFocus();}},scope:this,clickEvent:'mousedown'})});}
if(this.enableAlignments){tb.add('-',btn('justifyleft'),btn('justifycenter'),btn('justifyright'));}
if(!Ext.isSafari2){if(this.enableLinks){tb.add('-',btn('createlink',false,this.createLink));}
if(this.enableLists){tb.add('-',btn('insertorderedlist'),btn('insertunorderedlist'));}
if(this.enableSourceEdit){tb.add('-',btn('sourceedit',true,function(btn){this.toggleSourceEdit(btn.pressed);}));}}
this.tb=tb;},getDocMarkup:function(){return'<html><head><style type="text/css">body{border:0;margin:0;padding:3px;height:98%;cursor:text;}</style></head><body></body></html>';},getEditorBody:function(){return this.doc.body||this.doc.documentElement;},getDoc:function(){return Ext.isIE?this.getWin().document:(this.iframe.contentDocument||this.getWin().document);},getWin:function(){return Ext.isIE?this.iframe.contentWindow:window.frames[this.iframe.name];},onRender:function(ct,position){Ext.form.HtmlEditor.superclass.onRender.call(this,ct,position);this.el.dom.style.border='0 none';this.el.dom.setAttribute('tabIndex',-1);this.el.addClass('x-hidden');if(Ext.isIE){this.el.applyStyles('margin-top:-1px;margin-bottom:-1px;')}
this.wrap=this.el.wrap({cls:'x-html-editor-wrap',cn:{cls:'x-html-editor-tb'}});this.createToolbar(this);this.tb.items.each(function(item){if(item.itemId!='sourceedit'){item.disable();}});var iframe=document.createElement('iframe');iframe.name=Ext.id();iframe.frameBorder='0';iframe.src=Ext.isIE?Ext.SSL_SECURE_URL:"javascript:;";this.wrap.dom.appendChild(iframe);this.iframe=iframe;this.monitorTask=Ext.TaskMgr.start({run:this.checkDesignMode,scope:this,interval:100});if(!this.width){var sz=this.el.getSize();this.setSize(sz.width,this.height||sz.height);}},initFrame:function(){Ext.TaskMgr.stop(this.monitorTask);this.doc=this.getDoc();this.win=this.getWin();this.doc.open();this.doc.write(this.getDocMarkup());this.doc.close();var task={run:function(){if(this.doc.body||this.doc.readyState=='complete'){Ext.TaskMgr.stop(task);this.doc.designMode="on";this.initEditor.defer(10,this);}},interval:10,duration:10000,scope:this};Ext.TaskMgr.start(task);},checkDesignMode:function(){if(this.wrap&&this.wrap.dom.offsetWidth){var doc=this.getDoc();if(!doc){return;}
if(!doc.editorInitialized||String(doc.designMode).toLowerCase()!='on'){this.initFrame();}}},onResize:function(w,h){Ext.form.HtmlEditor.superclass.onResize.apply(this,arguments);if(this.el&&this.iframe){if(typeof w=='number'){var aw=w-this.wrap.getFrameWidth('lr');this.el.setWidth(this.adjustWidth('textarea',aw));this.iframe.style.width=Math.max(aw,0)+'px';}
if(typeof h=='number'){var ah=h-this.wrap.getFrameWidth('tb')-this.tb.el.getHeight();this.el.setHeight(this.adjustWidth('textarea',ah));this.iframe.style.height=Math.max(ah,0)+'px';if(this.doc){this.getEditorBody().style.height=Math.max((ah-(this.iframePad*2)),0)+'px';}}}},toggleSourceEdit:function(sourceEditMode){if(sourceEditMode===undefined){sourceEditMode=!this.sourceEditMode;}
this.sourceEditMode=sourceEditMode===true;var btn=this.tb.items.get('sourceedit');if(btn.pressed!==this.sourceEditMode){btn.toggle(this.sourceEditMode);return;}
if(this.sourceEditMode){this.tb.items.each(function(item){if(item.itemId!='sourceedit'){item.disable();}});this.syncValue();this.iframe.className='x-hidden';this.el.removeClass('x-hidden');this.el.dom.removeAttribute('tabIndex');this.el.focus();}else{if(this.initialized){this.tb.items.each(function(item){item.enable();});}
this.pushValue();this.iframe.className='';this.el.addClass('x-hidden');this.el.dom.setAttribute('tabIndex',-1);this.deferFocus();}
var lastSize=this.lastSize;if(lastSize){delete this.lastSize;this.setSize(lastSize);}
this.fireEvent('editmodechange',this,this.sourceEditMode);},createLink:function(){var url=prompt(this.createLinkText,this.defaultLinkValue);if(url&&url!='http:/'+'/'){this.relayCmd('createlink',url);}},adjustSize:Ext.BoxComponent.prototype.adjustSize,getResizeEl:function(){return this.wrap;},getPositionEl:function(){return this.wrap;},initEvents:function(){this.originalValue=this.getValue();},markInvalid:Ext.emptyFn,clearInvalid:Ext.emptyFn,setValue:function(v){Ext.form.HtmlEditor.superclass.setValue.call(this,v);this.pushValue();},cleanHtml:function(html){html=String(html);if(html.length>5){if(Ext.isWebKit){html=html.replace(/\sclass="(?:Apple-style-span|khtml-block-placeholder)"/gi,'');}}
if(html==this.defaultValue){html='';}
return html;},syncValue:function(){if(this.initialized){var bd=this.getEditorBody();var html=bd.innerHTML;if(Ext.isWebKit){var bs=bd.getAttribute('style');var m=bs.match(/text-align:(.*?);/i);if(m&&m[1]){html='<div style="'+m[0]+'">'+html+'</div>';}}
html=this.cleanHtml(html);if(this.fireEvent('beforesync',this,html)!==false){this.el.dom.value=html;this.fireEvent('sync',this,html);}}},getValue:function(){this[this.sourceEditMode?'pushValue':'syncValue']();return Ext.form.HtmlEditor.superclass.getValue.call(this);},pushValue:function(){if(this.initialized){var v=this.el.dom.value;if(!this.activated&&v.length<1){v=this.defaultValue;}
if(this.fireEvent('beforepush',this,v)!==false){this.getEditorBody().innerHTML=v;if(Ext.isGecko){var d=this.doc,mode=d.designMode.toLowerCase();d.designMode=mode.toggle('on','off');d.designMode=mode;}
this.fireEvent('push',this,v);}}},deferFocus:function(){this.focus.defer(10,this);},focus:function(){if(this.win&&!this.sourceEditMode){this.win.focus();}else{this.el.focus();}},initEditor:function(){try{var dbody=this.getEditorBody();var ss=this.el.getStyles('font-size','font-family','background-image','background-repeat');ss['background-attachment']='fixed';dbody.bgProperties='fixed';Ext.DomHelper.applyStyles(dbody,ss);if(this.doc){try{Ext.EventManager.removeAll(this.doc);}catch(e){}}
this.doc=this.getDoc();Ext.EventManager.on(this.doc,{'mousedown':this.onEditorEvent,'dblclick':this.onEditorEvent,'click':this.onEditorEvent,'keyup':this.onEditorEvent,buffer:100,scope:this});if(Ext.isGecko){Ext.EventManager.on(this.doc,'keypress',this.applyCommand,this);}
if(Ext.isIE||Ext.isWebKit||Ext.isOpera){Ext.EventManager.on(this.doc,'keydown',this.fixKeys,this);}
this.initialized=true;this.fireEvent('initialize',this);this.doc.editorInitialized=true;this.pushValue();}catch(e){}},onDestroy:function(){if(this.monitorTask){Ext.TaskMgr.stop(this.monitorTask);}
if(this.rendered){Ext.destroy(this.tb);if(this.wrap){this.wrap.dom.innerHTML='';this.wrap.remove();}}
if(this.el){this.el.removeAllListeners();this.el.remove();}
if(this.doc){try{Ext.EventManager.removeAll(this.doc);for(var prop in this.doc){delete this.doc[prop];}}catch(e){}}
this.purgeListeners();},onFirstFocus:function(){this.activated=true;this.tb.items.each(function(item){item.enable();});if(Ext.isGecko){this.win.focus();var s=this.win.getSelection();if(!s.focusNode||s.focusNode.nodeType!=3){var r=s.getRangeAt(0);r.selectNodeContents(this.getEditorBody());r.collapse(true);this.deferFocus();}
try{this.execCmd('useCSS',true);this.execCmd('styleWithCSS',false);}catch(e){}}
this.fireEvent('activate',this);},adjustFont:function(btn){var adjust=btn.itemId=='increasefontsize'?1:-1;var v=parseInt(this.doc.queryCommandValue('FontSize')||2,10);if((Ext.isWebKit&&!Ext.isSafari2)||Ext.isAir){if(v<=10){v=1+adjust;}else if(v<=13){v=2+adjust;}else if(v<=16){v=3+adjust;}else if(v<=18){v=4+adjust;}else if(v<=24){v=5+adjust;}else{v=6+adjust;}
v=v.constrain(1,6);}else{if(Ext.isSafari){adjust*=2;}
v=Math.max(1,v+adjust)+(Ext.isSafari?'px':0);}
this.execCmd('FontSize',v);},onEditorEvent:function(e){this.updateToolbar();},updateToolbar:function(){if(!this.activated){this.onFirstFocus();return;}
var btns=this.tb.items.map,doc=this.doc;if(this.enableFont&&!Ext.isSafari2){var name=(this.doc.queryCommandValue('FontName')||this.defaultFont).toLowerCase();if(name!=this.fontSelect.dom.value){this.fontSelect.dom.value=name;}}
if(this.enableFormat){btns.bold.toggle(doc.queryCommandState('bold'));btns.italic.toggle(doc.queryCommandState('italic'));btns.underline.toggle(doc.queryCommandState('underline'));}
if(this.enableAlignments){btns.justifyleft.toggle(doc.queryCommandState('justifyleft'));btns.justifycenter.toggle(doc.queryCommandState('justifycenter'));btns.justifyright.toggle(doc.queryCommandState('justifyright'));}
if(!Ext.isSafari2&&this.enableLists){btns.insertorderedlist.toggle(doc.queryCommandState('insertorderedlist'));btns.insertunorderedlist.toggle(doc.queryCommandState('insertunorderedlist'));}
Ext.menu.MenuMgr.hideAll();this.syncValue();},relayBtnCmd:function(btn){this.relayCmd(btn.itemId);},relayCmd:function(cmd,value){(function(){this.focus();this.execCmd(cmd,value);this.updateToolbar();}).defer(10,this);},execCmd:function(cmd,value){this.doc.execCommand(cmd,false,value===undefined?null:value);this.syncValue();},applyCommand:function(e){if(e.ctrlKey){var c=e.getCharCode(),cmd;if(c>0){c=String.fromCharCode(c);switch(c){case'b':cmd='bold';break;case'i':cmd='italic';break;case'u':cmd='underline';break;}
if(cmd){this.win.focus();this.execCmd(cmd);this.deferFocus();e.preventDefault();}}}},insertAtCursor:function(text){if(!this.activated){return;}
if(Ext.isIE){this.win.focus();var r=this.doc.selection.createRange();if(r){r.collapse(true);r.pasteHTML(text);this.syncValue();this.deferFocus();}}else if(Ext.isGecko||Ext.isOpera){this.win.focus();this.execCmd('InsertHTML',text);this.deferFocus();}else if(Ext.isWebKit){this.execCmd('InsertText',text);this.deferFocus();}},fixKeys:function(){if(Ext.isIE){return function(e){var k=e.getKey(),r;if(k==e.TAB){e.stopEvent();r=this.doc.selection.createRange();if(r){r.collapse(true);r.pasteHTML('&nbsp;&nbsp;&nbsp;&nbsp;');this.deferFocus();}}else if(k==e.ENTER){r=this.doc.selection.createRange();if(r){var target=r.parentElement();if(!target||target.tagName.toLowerCase()!='li'){e.stopEvent();r.pasteHTML('<br />');r.collapse(false);r.select();}}}};}else if(Ext.isOpera){return function(e){var k=e.getKey();if(k==e.TAB){e.stopEvent();this.win.focus();this.execCmd('InsertHTML','&nbsp;&nbsp;&nbsp;&nbsp;');this.deferFocus();}};}else if(Ext.isWebKit){return function(e){var k=e.getKey();if(k==e.TAB){e.stopEvent();this.execCmd('InsertText','\t');this.deferFocus();}};}}(),getToolbar:function(){return this.tb;},buttonTips:{bold:{title:'Bold (Ctrl+B)',text:'Make the selected text bold.',cls:'x-html-editor-tip'},italic:{title:'Italic (Ctrl+I)',text:'Make the selected text italic.',cls:'x-html-editor-tip'},underline:{title:'Underline (Ctrl+U)',text:'Underline the selected text.',cls:'x-html-editor-tip'},increasefontsize:{title:'Grow Text',text:'Increase the font size.',cls:'x-html-editor-tip'},decreasefontsize:{title:'Shrink Text',text:'Decrease the font size.',cls:'x-html-editor-tip'},backcolor:{title:'Text Highlight Color',text:'Change the background color of the selected text.',cls:'x-html-editor-tip'},forecolor:{title:'Font Color',text:'Change the color of the selected text.',cls:'x-html-editor-tip'},justifyleft:{title:'Align Text Left',text:'Align text to the left.',cls:'x-html-editor-tip'},justifycenter:{title:'Center Text',text:'Center text in the editor.',cls:'x-html-editor-tip'},justifyright:{title:'Align Text Right',text:'Align text to the right.',cls:'x-html-editor-tip'},insertunorderedlist:{title:'Bullet List',text:'Start a bulleted list.',cls:'x-html-editor-tip'},insertorderedlist:{title:'Numbered List',text:'Start a numbered list.',cls:'x-html-editor-tip'},createlink:{title:'Hyperlink',text:'Make the selected text a hyperlink.',cls:'x-html-editor-tip'},sourceedit:{title:'Source Edit',text:'Switch to source editing mode.',cls:'x-html-editor-tip'}}});Ext.reg('htmleditor',Ext.form.HtmlEditor);