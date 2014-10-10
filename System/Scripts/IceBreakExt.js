// This file requires ExtJs and is a helper class for integrating ExtJs and IceBreak
Ext.ns('Ice');  

// extJS overrides :
// Check this for more info: http://extjs.com/forum/showthread.php?t=43231
Ext.form.TriggerField.override({
  afterRender : function(){
    Ext.form.TriggerField.superclass.afterRender.call(this);
    var y;
    if(Ext.isIE && !this.hideTrigger && this.el.getY() != (y = this.trigger.getY())){
        this.el.position();
        this.el.setY(y);
    }
  }
});
  
// Convert string to uppercase
// ---------------------------
function iceToupper (obj) {
  obj.value = obj.value.toUpperCase();
}




// Edit float to string 
// --------------------
function iceEditDec(v , prec, decimalPoint) {

  var dp = (decimalPoint) ? decimalPoint : (1/2).toLocaleString().charAt(1);
  //var dp =(1/2).toLocaleString().charAt(1);
  var thSep = dp  == '.' ? ',' : '.';
  var p = 1;
  var pc = "";
  for (i=0;i < prec; i++){ 
    p *= 10;
    pc = pc + "0";
  }

  v = (Math.round((v-0)*p))/p;
  if (prec == 0) return (String(v));
  v = (v == Math.floor(v)) ? v + '.' + pc : ((v*10 == Math.floor(v*10)) ? v + "0" : v);
  v = String(v);
  var ps = v.split('.');
  var whole = ps[0];
  var sub = ps[1] ? dp + ps[1] : dp + pc;
  var r = /(\d+)(\d{3})/;
  while (r.test(whole)) {
    whole = whole.replace(r, '$1' + thSep  + '$2');
  }
  return whole + sub ;
}
 

// Convert the store record to form object used in ajax (extJs helper)
function iceForm2params(form) {
  var params =  new Object();

  params['decimalPoint'] = (1/2).toLocaleString().charAt(1);

  form.form.items.each(function(field) {
    if (field instanceof Ext.form.DateField && field.getValue() != '') { 	
      params[field.getName()] = field.getValue().dateFormat("Y-m-d");
    } else if (field.items) {
      for (var index in field.items.items) {
        var f = field.items.items[index];
        if (typeof(f) == 'function') continue;
        
        var value = f.getValue();
        if (field.xtype == 'radiogroup') {
          if (value) params[(f.name) ? f.name : f.getName()] = f.inputValue;
        } else {
          params[(f.name) ? f.name : f.getName()] = value;
        }
      }
    } else {                 //if (field instanceof Ext.form.Checkbox) {
      params[(field.name) ? field.name : field.getName()] = field.getValue();
      //params[field.getName()] = field.getValue();
    }
  });
  return params;
}            

Ice.EnumComboBox = Ext.extend(Ext.form.ComboBox, {
  editable: false,
  initComponent:function() {
    Ext.apply(this, {
      store: new Ext.data.SimpleStore ({
        fields: ['key', 'value'],
        data: this.enumData
      }),
      valueField: 'key',
      displayField:'value', 
      mode: 'local',
      typeAhead: true,
      forceSelection: true,
      triggerAction: 'all',
      selectOnFocus:true,
      hiddenName: this.name
    });
    Ice.EnumComboBox.superclass.initComponent.call(this);
  }
});

Ice.AjaxPanel = Ext.extend(Ext.Container, {
	autoEl: 'div',
	listeners: {
		activate: function(p){
			Ext.Ajax.request({
				url: p.url,
				success: function(response) {
					var aj = Ext.decode(response.responseText);
					if (typeof(p.items) == 'undefined') {
						p.add(aj);
					} else {
					  p.removeAll();
						p.add(aj);
					}
					p.doLayout();
				}
			});
		}
	},
  initComponent:function() {
		//Ext.apply(this, {
	  //});
    Ice.AjaxPanel.superclass.initComponent.call(this);
  }
});
Ext.reg('iceAjaxPanel', Ice.AjaxPanel);


Ice.SimpleComboBox = Ext.extend(Ext.form.ComboBox, {
  valueField: 'key',
  displayField:'value', 
  mode: 'local',
  editable: false,
  typeAhead: true,
  forceSelection: true,
  triggerAction: 'all',
  selectOnFocus:true,
  hiddenName: this.name,
  initComponent:function() {
    Ext.apply(this, {
      store: new Ext.data.SimpleStore (this.enumData)
      // ,hiddenName: this.name don't work Ext 2.3, maybe Ext 4.0 CRL 2011.11.17
    });
    Ice.SimpleComboBox.superclass.initComponent.call(this);
  }
});

Ice.AjaxDropdown = Ext.extend(Ext.form.ComboBox, {
	displayField:'value', 
	typeAhead: true,
	mode: 'remote',
	triggerAction: 'all',
	selectOnFocus:true,
	editable: true, // false=Dropdown like, true=ComboBox
	listWidth: this.width,
	url: null,
	name: null,
	queryParam: 'name',
	params: {},
	initComponent:function() {
		Ext.apply(this, {
			hiddenName: this.name,
			valueField: this.name,
			store: new Ext.data.JsonStore({
				baseParams: this.params,
				url: this.url
			}),
			allQuery: this.name
		});
		var recordFormat = Ext.data.Record.create([this.name,'value']);
		eval("var record = new recordFormat({" + this.name + ": this.value, value:this.displayValue})");
		this.store.add(record);
		Ice.AjaxDropdown.superclass.initComponent.call(this);
		if (this.emptyText == undefined){
			if (this.fieldLabel != undefined){
				this.emptyText = 'Select a ' + this.fieldLabel + '...';
			} else {
				this.emptyText = 'Select...';
			}
		}
	}
});
//Ext.reg('ajaxdropdown', Ice.AjaxDropdown);

Ice.AjaxComboBox = Ext.extend(Ext.form.ComboBox, {
  valueField: 'key',
  displayField:'key', 
  hiddenName: this.name,
  typeAhead: true,
  mode: 'remote',
  triggerAction: 'all',
  selectOnFocus:true,
  editable:false, // false=Dropdown like, true=ComboBox
  initComponent:function() {
    Ext.apply(this, {
      store: new Ext.data.JsonStore({
        url: this.programName + '?func=getRows'
      })
    });
    Ice.AjaxComboBox.superclass.initComponent.call(this);
  }
});

Ice.AdvancedComboBox = Ext.extend(Ext.form.ComboBox, {
  minChars : 3,  // character needed to start server search
  displayField:'key',
  forceSelection: true,
  valueField:'key', 
  typeAhead: false,
  pageSize: 10,
  //height:  this.height + 3, // Default because of IE6/IE7 shows af  left/right scroler
  hiddenName: this.name,
  hideTrigger:true,
  tpl: new Ext.XTemplate(
  '<tpl for="."><div class="search-item">',
    '<h3>{key}</h3>',
    '{value}',
    '</div></tpl>'
  ),          
  itemSelector: 'div.search-item',
  initComponent:function() {
    Ext.apply(this, {
      store: new Ext.data.JsonStore({
        url: this.programName + '?func=getRows' + ((this.values) ? "&values=" + this.values:"")  
      })
    });
    this.on("beforequery", function(){
      this.syncSize();
    });
    Ice.AdvancedComboBox.superclass.initComponent.call(this);
  }
});


/**
 * Provides a drop down field with multiple checkboxes
 * @author Tony Landis http://www.tonylandis.com/
 * @copyright Free for all use and modification. The author and copyright must be remain intact here.
 *
 * @class Ice.MultiSelectField
 * @extends Ext.form.TriggerField
 */
Ice.MultiSelectField = Ext.extend(Ext.form.TriggerField,  {

	triggerClass : 'x-form-trigger', 
	defaultAutoCreate : {tag: "input", type: "text", size: "50", autocomplete: "off"},
	readOnly: true, 
	lazyInit : false,
	hiddenValue: '',
	//value: null,
	valueSeparator: ',',
	textSeparator: ';',
	loadingText: 'Loading list...', 
	
	// store defaults
	store: null, 
	mode: 'remote',
	valueField: 'key',
	displayField:'value', 
	hiddenName: 'key',

	
	initComponent : function(){  
		Ice.MultiSelectField.superclass.initComponent.call(this);  

		//auto-configure store from local array data 
		if (Ext.isArray(this.store)) { 
			if (Ext.isArray(this.store[0])){
				this.store = new Ext.data.SimpleStore({
					id: 'key',
					fields: ['key','value'],
					data: this.store
				});
				this.valueField = 'key';
			} else {
				this.store = new Ext.data.Store({
					id: 'value',
					fields: ['value'],
					data: this.store,
					expandData: true
				});
				this.valueField = 'value';
			}
			this.displayField = 'value';
			this.mode = 'local';
		}	 
	}, 
	
	 
	onRender : function(ct, position){ 
		Ice.MultiSelectField.superclass.onRender.call(this, ct, position);
		
		if(this.hiddenName){ 
			this.hiddenField = this.el.insertSibling({tag:'input', type:'hidden', name: this.hiddenName, id: (this.hiddenId||this.hiddenName)},
							'before', true);
			this.hiddenField.value =
					this.hiddenValue !== undefined ? this.hiddenValue :
					this.value !== undefined ? this.value : '';

			// prevent input submission
			this.el.dom.removeAttribute('name');
		}
		
// build the menu
		if(this.menu == null) { 
			this.menu = new Ext.menu.Menu(); 
			this.store.each(function(r) { 
				this.menu.add(
					new Ext.menu.CheckItem({
						text: r.data[this.displayField],
						value: r.data[this.valueField], 
						hideOnClick: false 
					})
				).on('click', this.clickHandler, this);  
			}, this); 
		}

		if(!this.lazyInit){
			 //this.populateList(this.value);
		}else{
				//this.on('focus', this.setValues, this, {single: true});
		} 
	},  
	
	onTriggerClick : function(){ 
		if(this.disabled){
				return;
		} 
		this.menu.show(this.el, "tl-bl?");
		this.populateList(this.value); 
	},    
	 
	validateBlur : function(){ 
		return !this.menu || !this.menu.isVisible();
	},
	 
	getValue : function(){   
		if (this.hiddenField){
			return this.hiddenField.value || "";    	
		} else if (this.valueField){
			return typeof this.value != 'undefined' ? this.value : '';
		} else {
			return Ice.MultiSelectField.superclass.getValue.call(this);
		} 
	},
	
	setValue : function(value, text){ 
		if(text == undefined && value != undefined) {  
			this.setValues(value.split(this.valueSeparator));
			return;
		} 
		if(value==undefined) {
			value='';
			text='';
		}
		
		this.lastSelectionText = text;
		if (this.hiddenField){
			this.hiddenField.value = value;
		}
		Ice.MultiSelectField.superclass.setValue.call(this, text);
		this.value = value;    	
	},
	
	setValues : function(keys){ 
		// assemble full text and hidden value
		var text  = '';
		var value = '';
		for(var i=0; i<keys.length; i++) {
			if(keys[i] != undefined && keys[i] >'') {
				// get the full store object
				var item = this.getRecord(keys[i]);
				if(item != undefined) {	
					value += (value!='' ? this.valueSeparator:'') + item.data[this.valueField] ;
					text += (text!='' ? this.textSeparator:'') + item.data[this.displayField];  
				}
			}
		}
		this.setValue(value,text);   
	},  
	
	selPush : function(key) {   
		// rip current value into array
		var keys = this.value.split(this.valueSeparator);
		var i = keys.length++;
		keys[i] = key; 
		this.setValues(keys);
	},
	
	selDrop : function(key) {
		// rip current value into array
		var keys = this.value.split(this.valueSeparator);
		for(var i=0; i<keys.length; i++) { 
			if(keys[i].toString() == key.toString()) { 
				keys[i]=undefined;
			}
		}  
		this.setValues(keys);
	}, 

	onDestroy : function(){  
		if(this.menu) {
			this.menu.destroy();
		}
		if(this.wrap){
			this.wrap.remove();
		}
		Ice.MultiSelectField.superclass.onDestroy.call(this);
	}, 
	
	clickHandler: function(i,c){ 
		if (i.checked == false){ 
			this.selPush(i.value, i.text); 
		} else { 
			this.selDrop(i.value);
		}
	}, 

	populateList: function(v)  { 
		if (v==undefined || v==null) v=this.value;
		 
		// uncheck everything
		if (this.menu) {
			this.menu.items.each(function(item) {
				item.setChecked(false);
			});
		}  
			
		// populate preset values
		if (v != undefined && v != '' && v!=null) {   
			var sel = v.split(this.valueSeparator); 
			for(i=0; i<sel.length; i++) {  
				try {
					var value = this.getRecord(sel[i]).data[this.valueField];
					this.menu.items.each(function(mi){ 
						if(mi.value == value) mi.setChecked(true); 
					}, this); 
				} catch(e) { }
			} 
		} 
	},

	getRecord: function(key) {
		var record;

		record = this.store.getById(key);
		if(record == undefined) {
			var index = this.store.find(this.valueField || 'key', key);
			if (index > -1) {
				record = this.store.getAt(index);
			}
		}

		return record;
	}
});

Ext.reg('multiselect', Ice.MultiSelectField);

// key array for Ice.Window

Ice.keyMap = new Array();

Ice.keyMap['ENTER']    = [Ext.EventObject.ENTER, false];
Ice.keyMap['F1']       = [Ext.EventObject.F1, false];
Ice.keyMap['F2']       = [Ext.EventObject.F2, false];
Ice.keyMap['F3']       = [Ext.EventObject.F3, false];
Ice.keyMap['F4']       = [Ext.EventObject.F4, false];
Ice.keyMap['F5']       = [Ext.EventObject.F5, false];
Ice.keyMap['F6']       = [Ext.EventObject.F6, false];
Ice.keyMap['F7']       = [Ext.EventObject.F7, false];
Ice.keyMap['F8']       = [Ext.EventObject.F8, false];
Ice.keyMap['F9']       = [Ext.EventObject.F9, false];
Ice.keyMap['F10']      = [Ext.EventObject.F10, false];
Ice.keyMap['F11']      = [Ext.EventObject.F11, false];
Ice.keyMap['F12']      = [Ext.EventObject.F12, false];
Ice.keyMap['F13']      = [Ext.EventObject.F1, true];
Ice.keyMap['F14']      = [Ext.EventObject.F2, true];
Ice.keyMap['F15']      = [Ext.EventObject.F3, true];
Ice.keyMap['F16']      = [Ext.EventObject.F4, true];
Ice.keyMap['F17']      = [Ext.EventObject.F5, true];
Ice.keyMap['F18']      = [Ext.EventObject.F6, true];
Ice.keyMap['F19']      = [Ext.EventObject.F7, true];
Ice.keyMap['F20']      = [Ext.EventObject.F8, true];
Ice.keyMap['F21']      = [Ext.EventObject.F9, true];
Ice.keyMap['F22']      = [Ext.EventObject.F10, true];
Ice.keyMap['F23']      = [Ext.EventObject.F11, true];
Ice.keyMap['F24']      = [Ext.EventObject.F12, true];
Ice.keyMap['ROLLUP']   = [Ext.EventObject.PAGE_DOWN, false];
Ice.keyMap['ROLLDOWN'] = [Ext.EventObject.PAGE_UP, false];
Ice.keyMap['PRINT']    = [Ext.EventObject.PRINT_SCREEN, false];

// Ice.Window - focus first input field and 'key'

Ice.Window = Ext.extend(Ext.Window, {
  modal: true
  // recurse until find an active field, and set focus to it
  ,findFirst: function(item) {
    if (item instanceof Ext.form.Field && !item.hidden && !item.disabled && !item.readOnly) {
      item.focus(false, 50); // delayed focus by 50 ms
      return true;
    }
    if (item.items && item.items.find) {
      return item.items.find(this.findFirst,this);
    }
    return false;
  }
  // set focus to first available field
  ,focusFirst: function(){
    this.items.find(this.findFirst,this)
  }
  ,setButtonKeyMap: function(){
    var window = this;
    buttons = window.buttons;
    for(i=0;i<=buttons.length-1;i++) {
      if (buttons[i].key != undefined) {
        if (Ice.keyMap[buttons[i].key] != undefined) {
          this.key=new Ext.KeyMap(window.id,[{}]);
          this.key.addBinding({
	          key:Ice.keyMap[buttons[i].key][0]
	          ,shift:Ice.keyMap[buttons[i].key][1]
	          ,handler: function(keycode, e) {
		          e.preventDefault();
		          if(Ext.isIE) {
			          e.browserEvent.keyCode=0; // Cheat IE to believe that another key was pressed.
		          }
		          this.handler();
		          e.stopEvent();
	          }
	          ,scope:window.buttons[i].initialConfig
          })
        }
      }
    }
  }  
  // set focus when window is shown
  ,listeners:{
    show: function(window){
      window.focusFirst(window.items)
      window.setButtonKeyMap()
    }
  }
});
Ext.reg('iceWindow', Ice.Window);  


// rcvHttpMsg
//
// "context" is a unique 64 bytes context parameter for which queue to peek messages from. The context can be 
// any char from “A” to “Z” and “a” to “z” and digits from 0 to 9
// 
// On the server side you can post messages to a specific queue context with the 
// build-in IceBreak function sndHttpMsg(msg : context). The message will be 
// encoded and sent in UTF-8 charset. The messages can be up to 32512 bytes long. 
// Or use the OS/400 command SndHttpMsg Msg('Some message') CONTEXT('MyContext')
//
// Sample:
//	iceRcvHttpMsg({
//		context: 'MyContext', 
//		callback: function(msg){
//			Ext.MessageBox.alert('Message from System i', msg);
//		}
//	});

function iceRcvHttpMsg(p){
	Ext.Ajax.request({
		url: '/rcvHttpMsg.$?context=' + p.context + '&timeout=55', // Server side timeout = 55 sec. Always shorter than the client side timeout!!!
		timeout: 115*1000, // 115 sec.
		method: 'POST',
		success: function ( response, request ) { 
			if (response.responseText.length > 0) {
			  p.callback(response.responseText);
			}
			iceRcvHttpMsg(p); // ready for next 
		},	
		failure: function ( result, request) { 
			Ext.MessageBox.alert('Message', 'Error - no message!');
		}
	});	
	return;
}

// ===============================================================
// Save Meta form - must be called with parent object
// ===============================================================
function iceSaveMetaForm(parent) {
  forms = parent.findByType('iceMetaForm');
  for (i = 0;i < forms.length; i++) {
    if (forms[i].getForm().isValid()) {
      forms[i].getForm().baseParams = {func:'save'};
      forms[i].submit();
    }
  }
}

// ===============================================================
// Meta form (Build form config by xml document
// ===============================================================
Ice.MetaForm = Ext.extend(Ext.form.FormPanel,{
  autoInit: true
  ,border: false
  ,focusFirstField: true
  ,frame: true
  //,loadingText: 'Loading...'
  //,savingText: 'Saving...'
  ,buttonMinWidth: 90
  ,columnCount: 1
  ,hasMeta: false
  ,afterMetaChange: Ext.emptyFn
  ,afterUpdate: Ext.emptyFn
  ,applyDefaultValues: function (o) {
    if ('object' !== typeof o) {
      return;
    }
    for (var name in o) {
      if (o.hasOwnProperty(name)) {
        var field = this.form.findField(name);
        if (field) {
          field.defaultValue = o[name];
        }
      }
    }
  }
  ,beforeAction: function (form,action) {
    action.success = function (response) {
      var result = this.processResponse(response);
      if (result === true || !result.success || !result.data) {
        this.failureType = Ext.form.Action.LOAD_FAILURE;
        this.form.afterAction(this,false);
        return;
      }

      this.form.afterAction(this,true);
      this.form.clearInvalid();
      this.form.setValues(result.data);
    };
  }
  ,bind: function (data) {
    this.bindData(data);
  }
  ,bindData: function (data) {
    this.data = data;
    this.form.setValues(this.data);
  }
  ,closeParentWindow: function () {
    if (this.ownerCt && this.ownerCt.isXType('window')) {
      this.ownerCt[this.ownerCt.closeAction]();
    }
  }
  ,findButton: function (name) {
    var btn = null;
    Ext.each(this.buttons,function (b) {
      if (name === b.name) {
        btn = b;
      }
    });
    return btn;
  }
  ,getButtons: function () {
    var buttons = [];
    if (Ext.isArray(this.createButtons)) {
      Ext.each(this.createButtons,function (name) {
        buttons.push(this.getButton(name,{
          handler: this.onButtonClick
          ,scope: this
          ,minWidth: this.buttonMinWidth
          ,name: name
        }));
      },this);
    }
    return buttons;
  }
  ,getOptions: function (o) {
    o = o || {};
    var options = {
      url: this.url
      ,method: this.method || 'POST'
    };
    Ext.apply(options,o);
    var params = this.baseParams ? Ext.ux.util.clone(this.baseParams) : {};
    options.params = Ext.apply(params,o.params);
    return options;
  }
  ,getValues: function () {
    var values = {};
    this.form.items.each(function (f) {
      values[f.name] = f.getValue();
    });
    return values;
  }
  ,initComponent: function () {
    var config = {
      items: this.items || {}
    };
    if ('function' === typeof this.getButton) {
      config.buttons = this.getButtons();
    }

    // apply config
    Ext.apply(this,Ext.apply(this.initialConfig,config));

    // call parent
    Ice.MetaForm.superclass.initComponent.apply(this,arguments);

    // add events
    this.addEvents(
           'beforemetachange'
          ,'metachange'
          ,'beforebuttonclick'
          ,'buttonclick'
      );

    // install event handlers on basic form
    this.form.on({
      beforeaction: { scope: this,fn: this.beforeAction }
          ,actioncomplete: { scope: this,fn: function (form,action) {
            // (re) configure the form if we have (new) metaData
            if ('load' === action.type && action.result.metaData) {
              this.onMetaChange(this,action.result.metaData);
            }
            // update bound data on successful submit
            else if ('submit' === action.type) {
              this.updateBoundData();
            }
          } 
          }
    });
    this.form.trackResetOnLoad = true;

  }
  ,load: function (o) {
    var options = this.getOptions(o);
    if (this.loadingText) {
      options.waitMsg = this.loadingText;
    }
    this.form.load(options);
  }
  ,onButtonClick: function (btn,e) {
    if (false === this.fireEvent('beforebuttonclick',this,btn)) {
      return;
    }
    switch (btn.name) {
      case 'meta':
        this.load({ params: { meta: true} });
        break;

      case 'load':
        this.load({ params: { meta: !this.hasMeta} });
        break;

      case 'defaults':
        this.setDefaultValues();
        break;

      case 'reset':
        this.form.reset();
        break;

      case 'save':
        this.updateBoundData();
        this.submit();
        this.closeParentWindow();
        break;

      case 'ok':
        this.updateBoundData();
        this.closeParentWindow();
        break;

      case 'cancel':
        this.closeParentWindow();
        break;
    }
    this.fireEvent('buttonclick',this,btn);
  }
  ,onMetaChange: function (form,meta) {
    if (false === this.fireEvent('beforemetachange',this,meta)) {
      return;
    }
    this.removeAll();
    this.hasMeta = false;

    // declare varables
    var columns,colIndex,tabIndex,ignore = {};

    // add column layout
    this.add(new Ext.Panel({
      layout: 'column'
          ,anchor: '100%'
          ,border: false
          ,defaults: (function () {
            this.columnCount = meta.formConfig ? meta.formConfig.columnCount || this.columnCount : this.columnCount;
            return Ext.apply({},meta.formConfig || {},{
              columnWidth: 1 / this.columnCount
                  ,autoHeight: true
                  ,border: false
                  ,hideLabel: true
                  ,layout: 'form'
            });
          }).createDelegate(this)()
          ,items: (function () {
            var items = [];
            for (var i = 0;i < this.columnCount;i++) {
              items.push({
                defaults: this.defaults
                      ,listeners: {
                        // otherwise basic form findField does not work
                        add: { scope: this,fn: this.onAdd }
                      }
              });
            }
            return items;
          }).createDelegate(this)()
    }));

    columns = this.items.get(0).items;
    colIndex = 0;
    tabIndex = 1;

    if (Ext.isArray(this.ignoreFields)) {
      Ext.each(this.ignoreFields,function (f) {
        ignore[f] = true;
      });
    }
    // loop through metadata colums or fields
    // format follows grid column model structure
    Ext.each(meta.columns || meta.fields,function (item) {
      if (true === ignore[item.name]) {
        return;
      }
      var config = Ext.apply({},item.editor,{
        name: item.name || item.dataIndex
              ,fieldLabel: item.fieldLabel || item.header
              ,defaultValue: item.defaultValue
              ,xtype: item.editor && item.editor.xtype ? item.editor.xtype : 'textfield'
      });

      // handle regexps
      if (config.editor && config.editor.regex) {
        config.editor.regex = new RegExp(item.editor.regex);
      }

      // to avoid checkbox misalignment
      if ('checkbox' === config.xtype) {
        Ext.apply(config,{
          boxLabel: ' '
          ,checked: item.defaultValue
        });
      }
      if (meta.formConfig.msgTarget) {
        config.msgTarget = meta.formConfig.msgTarget;
      }

      // add to columns on ltr principle
      config.tabIndex = tabIndex++;
      columns.get(colIndex++).add(config);
      colIndex = colIndex === this.columnCount ? 0 : colIndex;

    },this);
    if (this.rendered && 'string' !== typeof this.layout) {
      this.el.setVisible(false);
      this.doLayout();
      this.el.setVisible(true);
    }
    this.hasMeta = true;
    if (this.data) {
      // give DOM some time to settle
      (function () {
        this.form.setValues(this.data);
      } .defer(1,this))
    }
    this.afterMetaChange();
    this.fireEvent('metachange',this,meta);

    // try to focus the first field
    if (this.focusFirstField) {
      var firstField = this.form.items.itemAt(0);
      if (firstField && firstField.focus) {
        var delay = this.ownerCt && this.ownerCt.isXType('window') ? 1000 : 100;
        firstField.focus(firstField.selectOnFocus,delay);
      }
    }
  }
  ,onRender: function () {
    // call parent
    Ice.MetaForm.superclass.onRender.apply(this,arguments);

    this.form.waitMsgTarget = this.el;

    if (this.metaData) {
      this.onMetaChange(this,this.metaData);
      if (this.data) {
        this.bindData(this.data);
      }
    }
    else if (true === this.autoInit) {
      this.load(this.getOptions({ params: { meta: true} }));
    }
    else if ('object' === typeof this.autoInit) {
      this.load(this.autoInit);
    }

  }
  ,removeAll: function () {
    // remove border from header
    var hd = this.body.up('div.x-panel-bwrap').prev();
    if (hd) {
      hd.applyStyles({ border: 'none' });
    }
    // remove form panel items
    this.items.each(this.remove,this);

    // remove basic form items
    this.form.items.clear();
  }
  ,reset: function () {
    this.form.reset();
  }
  ,setDefaultValues: function () {
    this.form.items.each(function (item) {
      item.setValue(item.defaultValue);
    });
  }
  ,submit: function (o) {
    var options = this.getOptions(o);
    if (this.savingText) {
      options.waitMsg = this.savingText;
    }
    this.form.submit(options);
  }
  ,updateBoundData: function () {
    if (this.data) {
      Ext.apply(this.data,this.getValues());
      this.afterUpdate(this,this.data);
    }
  }
  ,beforeDestroy: function () {
    if (this.data) {
      this.data = null;
    }
    Ice.MetaForm.superclass.beforeDestroy.apply(this,arguments);
  }
});
Ext.reg('iceMetaForm',Ice.MetaForm);

// ===============================================================
// Paging grid: Calculate page size automatic
// ===============================================================
Ice.PagingGrid = Ext.extend(Ext.grid.GridPanel, {
  autoScroll : true
  ,autoWidth:true
  ,autoHeight:true
  ,loadMask:false
  ,initComponent:function() {
    // set height values
    this.gridColumnHeaderHeight = (this.gridColumnHeaderHeight) ? this.gridColumnHeaderHeight : (Ext.isIE) ? 54 : 26;
    this.rowHeight = (this.rowHeight) ? this.rowHeight : 22;

    // calculate number of rows
    this.store.on({
      'beforeload' : {
        fn:this.calculatePagingSize
        ,scope:this
      }
    })

    Ice.PagingGrid.superclass.initComponent.apply(this, arguments);
  }
  ,onRender:function() {
    Ice.PagingGrid.superclass.onRender.apply(this, arguments);
  }
  ,calculatePagingSize:function(store) {
    // does the grid lives inside an container ?
    var c = Ext.getCmp(this.containerId);
    if (c == undefined) {
      var h = 0, l = 0;
      // get total body height
      if( typeof( window.innerHeight ) == 'number' ) {  //Non-IE
        h = window.innerHeight;
      } else if(document.documentElement && document.documentElement.clientHeight) {  //IE 6+ in 'standards compliant mode'
        h = document.documentElement.clientHeight;
      } else if(document.body && document.body.clientHeight) { //IE 4 compatible
        h = document.body.clientHeight;  
      }
    } else {
      var size = c.getSize();
      h = size.height;
    }

    var tbH = 0;
    // get bottom toolbar height        
    var tbb = this.getBottomToolbar();
    if (tbb != undefined) {
      var size = tbb.getSize();
      tbH += size.height;        
    }
    // get top toolbar height        
    var ttb = this.getTopToolbar();
    if (ttb != undefined) {
      var size = ttb.getSize();
      tbH += size.height;        
    }

    // calculate page size
    l = Math.ceil((h - tbH - this.gridColumnHeaderHeight) / this.rowHeight);

    // set pagesize for pading grid
    if (tbb != undefined) {
      tbb.pageSize = l;
    }
    if (ttb != undefined) {
      ttb.pageSize = l;
    }

    store.baseParams = {
      limit:l
    }
  }
});
// register xtype
Ext.reg('icePagingGrid', Ice.PagingGrid);


/**
 * Markdown Editor
 */

(function() {

	var defaults = {
		controls: [
			'preview',
			'bold',
			'italic',
			'h1',
			'h2',
			'h3',
			'link',
			'quote',
			'code',
			'image',
			'olist',
			'ulist',
			'sup',
			'hr',
			'undo',
			'redo'	
		]
	}

	var Editor = Ext.extend(Ext.Panel, {

		layout: 'anchor',

		initComponent: function() {
			var me = this;

			function prefix(id) {
				return me.initialConfig.name + '.' + id
			}

			// Set controls config for use in toolbar
			if ( typeof me.initialConfig.controls === 'undefined' ) 
				me.initialConfig.controls = defaults.controls;

			me.add({
				xtype: 'textarea',
				id: prefix('html'),
				name: prefix('html'),
				hidden: true
			},{
				xtype: 'toolbar',
				id: prefix('toolbar'),
				height: 27,
				listeners: {
					'render': function(toolbar) {
						me.addControls(toolbar);
						me.toolbar = toolbar;
					}
				}
			},{
				xtype: 'panel',
				id: prefix('main'),
				anchor: '100% -27',
				autoScroll: true,
				items: [{
					xtype: 'panel',
					id: prefix('preview'),
					cls: 'markdown',
					hidden: true
				},{
					xtype: 'textarea',
					id: prefix('markdown'),
					name: prefix('markdown'),
					value: me.initialConfig.value,
					defaultValue: me.initialConfig.defaultValue,
					width: '100%',
					height: '100%',
					maxLength: me.initialConfig.maxLength || 25000,
					listeners: {
						'render': function(markdown) {

							var mainPanel = me.items.get(prefix('main')),
								preview = mainPanel.items.get(prefix('preview')),
								converter = Markdown.getSanitizingConverter();

							// Create the editor
							var editor = new Markdown.Editor({
								converter: converter, 
								input: markdown.el.dom,
								preview: preview.el.dom,
								hooks: {
									'onPreviewRefresh': function(o) {
										me.items.get(prefix('html')).setRawValue(o.html);
									}
								}
							});

							editor.run();

							me.editor = editor;
							me.converter = converter;
							me.markdown = markdown;

						}
					}
				}]
			});
		},

		addControls: function(tb) {

			var me = this,
				i = 0,
				buttons = me.initialConfig.controls,
				button;

			function prefix(id) {

				return me.initialConfig.name + '.' + id
			}
			function createBtn(id) {
				if ( id == "preview" ) {
					return {
						text: 'Preview',
						enableToggle: true,
						id: prefix(id),
						toggleHandler: function(btn, checked) {
					
							var main = me.items.get(prefix('main')),
								markdown = main.items.get(prefix('markdown')),
								preview = main.items.get(prefix('preview'));

							if ( checked ) {
								markdown.hide();
								preview.show();
								tb.items.each(function(itm) {
									if ( itm !== btn )
										itm.hide();
								});
							}
							else {
								preview.hide();
								markdown.show();
								tb.items.each(function(itm) {
									if ( itm !== btn )
										itm.show();
								});
							}
						}
					};
				}
				else {
					return {
						id: prefix(id),
						cls: 'x-btn-icon markdown-icon markdown-' + id,
						hideMode: 'visibility',
						handler: function() {
							if ( me.getMarkdown().isVisible() )
								me.editor.controls[id]();
						},
						clickEvent: 'mousedown'
					};
				}
			}

			for ( var i = 0; i < buttons.length; i++ ) {
				button = createBtn(buttons[i]);
				tb.add(button);
			}

		},

		getEditor: function() {
			return this.editor;
		},
		getConverter: function() {
			return this.converter;
		},
		getPreview: function() {
			return this.preview;
		},
		getMarkdown: function() {
			return this.markdown;
		},
		getToolbar: function() {
			return this.toolbar;
		},


		refreshPreview: function() {
			this.getEditor().refreshPreview();
		},

		toHtml: function() {
			return this.getEditor().toHtml();
		},
		toMarkdown: function() {
			return this.getEditor().toMarkdown();
		},
		toSource: function() {
			return this.getEditor().toSource();
		}

	});

	Editor.compiler = function(o) {

		getScripts(function() {
			var converter = Markdown.getSanitizingConverter();
			o.callback(converter.makeHtml(o.markdown));
		});

	};

	Ice.markdown = Editor;

	function getScripts(fn) {

		function createScript(url, fn) {
			var s = document.createElement("script");
			s.onload = s.onreadystatechange = fn;
			s.type = "text/javascript";
			document.getElementsByTagName("head")[0].appendChild(s);
			s.src = url;
		}
		
		var checkCount = 0;

		function check() {
			checkCount++;

			if ( checkCount == 2 ) {
				fn(Markdown);
			}
		}

		createScript('/system/scripts/Markdown.Converter.js', function() {
		createScript('/system/scripts/Markdown.Sanitizer.js', check);
		createScript('/system/scripts/Markdown.Editor.js', check);
		});
	}

	Ext.reg('markdownEditor', Editor);

})();