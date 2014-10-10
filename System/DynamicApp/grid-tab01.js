function application () {
  var selectedId;
  var panelCount = 0;

  Ext.QuickTips.init();
  Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
  Ext.BLANK_IMAGE_URL = '/System/Components/ext-2/resources/images/default/s.gif';
  Ext.data.Connection.prototype.timeout = 60000;

  var ds = new Ext.data.Store({
    proxy: new Ext.data.HttpProxy({
      url: '?func=getRows'
    }),
    reader: new Ext.data.JsonReader({}),
    remoteSort: true
  });

  var cm = new Ext.grid.ColumnModel(gridFields());
  
  cm.defaultSortable = true;
  
  var filterSearch = new Ext.form.TextField({
          id: 'search',
          fieldLabel: 'Search',
          name: 'search',
          enableKeyEvents : true
        });

  var grid = new Ext.grid.GridPanel({
    el:'grid-panel',
    id: getProperty("app.name", "") + '-grid-panel',
    height: getProperty("grid.height", document.body.clientHeight - 2),
    width:  document.body.clientWidth,
    title: getProperty("window.title", ""),
    store: ds,
    cm: cm,
    sm: new Ext.grid.RowSelectionModel({singleSelect:true}),
    enableColLock: false,
    loadMask: true,
    autoSizeColumns: true,
    tbar: new Ext.PagingToolbar({
      pageSize: getProperty("grid.pageSize", 25),
      store: ds,
      displayInfo: true,
      defaultType: 'textfield',
      items: [
        {
          xtype:'tbbutton', 
          cls:  'x-btn-text-icon',
          tooltip: 'Add new record',
          icon: '/system/images/add.gif',
          handler: function(){
            processRow('newRec', 0)
          }
        },
        '-', 
        {xtype:'label', text: 'Search:'},
        filterSearch
      ]  
    })
  });

  if (getProperty("grid.autofit", false)){
    grid.getView().fitColumns.defer(100, grid.getView()); // Autofit columns 
  }

  var rowMenu = new Ext.menu.Menu({
    id: 'rowMenu',
    items: [
     {id: 'editRec', text: 'Edit', cls:'mnu-icon-edit mnu-default', handler:onRowRightClick},
     {id: 'copyRec', text: 'Copy', cls:'mnu-icon-copy', handler:onRowRightClick},
     {id: 'deleteRec', text: 'Delete', cls:'mnu-icon-delete', handler:onRowRightClick}
    ]
  });

  grid.render();

  ds.on('beforeload', function() {
    ds.baseParams = {
      search: filterSearch.getValue(),
      limit: getProperty("grid.pageSize", 25)
    };
  });

  ds.load();
  
  filterSearch.focus();
  filterSearch.on('keypress', function(obj,e) {
    if(e.getKey() == e.ENTER) {
      ds.load();
    }
  });
  
// filterSearch.setValue('anyvalue'); // set default search value
  grid.addListener('rowcontextmenu', onRowMenu);
  grid.addListener('rowdblclick', onRowDbClick);

/*
 * Call backs functions
 */
  function onRowMenu(grid, rowIndex, e) {
    e.stopEvent();
    var coords = e.getXY();
    rowMenu.showAt([coords[0], coords[1]]);
    selectedId = ds.data.items[rowIndex].id;
  }

  function onRowDbClick(grid, rowIndex, e) {
    e.stopEvent();
    selectedId = ds.data.items[rowIndex].id;
    processRow('editRec', selectedId);
  }

  function onRowRightClick(item) {
    switch (item.id) {
      case 'editRec':
      case 'copyRec':
        processRow(item.id, selectedId);
        break;
			case 'deleteRec':
        Ext.MessageBox.confirm('Confirm', 'Er du sikker på at du vil slette standardsteksten ?', function(btn, text){
          if (btn == 'yes'){
            var ts = new Ext.data.Store({
              proxy: new Ext.data.HttpProxy({
                url: '?func=deleteRec&rrn=' + selectedId
								,success:function() {
									ds.load();
								}
              })
            });
            ts.load();
          }
        });
        break;
    }
  }
//' ------------------------------------------------------------------------------------
//' Action - updateRec
//' handle double click
//' user select one of the item and want to update it
//' ------------------------------------------------------------------------------------
  function processRow(func, selectedId) {

    var iofunc =  ( func == 'newRec') ? 'newRec' : 'getRec';
    
    var panelId = getProperty("app.name", "") + '-window-' + panelCount++;
    
    var row_data = new Ext.data.JsonStore({
      url:'?func=' + iofunc + '&rrn=' + selectedId
    });
   
    row_data.on('load', function() {
     
      var tabs = new Ext.TabPanel(tabPanel(row_data.getAt(0), panelId)[0]);
      var form = new Ext.form.FormPanel({
        baseCls: 'x-plain',
        layout:'absolute',
        defaultType: 'textfield',
        items: tabs
      });
      var window = new Ext.Window({
        title: row_data.getAt(0).data[getProperty("panel.title.field")], 
        xid: getProperty("app.name", "") + '-window',
        width: getProperty("window.width", 600),
        height: getProperty("window.height", 600),
        minWidth: getProperty("window.minWidth", 300),
        minHeight: getProperty("window.minHeight", 200),
        layout: 'fit',
        plain:true,
        modal: false,
        autoScroll : true,
        collapsible: true,
        bodyStyle:'padding:5px;',
        buttonAlign:'center',
        items: form,
        buttons: [{
          text: 'Save',
          handler: function() {
            if (form.form.isValid()) {
              var rrn = (func == 'copyRec') ? 0 :selectedId; 
              Ext.Ajax.request({
                url:'?func=post&rrn=' + rrn ,
                method: 'POST',
                params: iceForm2params (form),
                success: function ( response, request ) { 
                  if (Ext.util.JSON.decode(response.responseText).success){
                    window.close();
                    ds.load();
                  } else {
                  
                    // locate the first tab with the field in error
                    var msgList = Ext.util.JSON.decode(response.responseText);
                    var found = false;
                    for(var i = 0, len = msgList.errors.length; i < len && !found ; i++){
                      var fieldInError = form.form.findField(msgList.errors[i].id);
                      if(fieldInError){
                        tabs.items.each(function(t, i){
                          t.items.each(function(f){
                            if (fieldInError.name == f.name){
                              found = true;
                              tabs.activate(i);
                            }
                          });
                        });
                      }
                    }
                    form.form.markInvalid(msgList.errors);
                    form.failureType = Ext.form.Action.SERVER_INVALID;
                  }
                },
                failure: function ( result, request) { 
                  Ext.MessageBox.alert('Message', 'Save failed!');
                }
              });
            }
          } 
        },{
          text: 'Cancel',
          handler: function() {
            window.close();
          }
        }]
      });
      window.show();
    });
    row_data.load();
  };
}
