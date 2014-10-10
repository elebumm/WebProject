/*
 * Intended Library: Ext JS Library 1.1
 * Copyright(c) 2007, System & Method Technologies
 * Developer: Milan Zdimal
 * 
 * http://www.icebreak.org
 */

var IceBreak = function(){
    var config;
    var layout, statusPanel, south, previewBody, feedPanel;
    var grid, ds, sm;
    var addFeed, currentItem, tpl;
    var seed = 0;
    var sDefaultTabName, sDefaultTabUrl;
    var treeCMenu, root, nodePath;
             
    return {
        init : function(){
        	Ext.BLANK_IMAGE_URL = '../Components/ext-1.1.1/resources/images/default/s.gif';
        		
            Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
            this.config = loadConfigParams(); 
            
            if(typeof(IceMenu_LayoutConfig) != "undefined") {
                this.layoutConfig = IceMenu_LayoutConfig;
            } else {
                this.layoutConfig = {
                    north: {
                        split:false,
                        initialSize: 53,
                        titlebar: false
                    },
                    west: {
                        split:true,
                        initialSize: '20%', // Bent was here
                        minSize: 175,
                        maxSize: 400,
                        titlebar: true,
                        collapsible: true,
                        animate: true,
                        autoScroll:false,
                        useShim:true,
                        cmargins: {top:0,bottom:2,right:2,left:2}
                    },
                    east: {
                        split:true,
                        initialSize: '20%', // Bent was here
                        minSize: 175,
                        titlebar: true,
                        collapsible: true,
                        animate: true,
                        autoScroll:true,
                        useShim:true,
                        collapsed:true,
                        cmargins: {top:0,bottom:0,right:2,left:2}
                    },
                    center: {
                        titlebar: false,
                        autoScroll:false,
                        tabPosition: 'top',
                        closeOnTab: true,
                        alwaysShowTabs: true,
                        resizeTabs: true
                    }
                };   
            }      

            IceBreak.layout = new Ext.BorderLayout(document.body, this.layoutConfig);                       
            IceBreak.layout.beginUpdate();
            IceBreak.layout.add('north', new Ext.ContentPanel('header'));
            
//            statusPanel = new Ext.ContentPanel('status');
//            south = IceBreak.layout.getRegion('south');
//            south.add(statusPanel);
            
            var feedtb = new Ext.Toolbar('myfeeds-tb');
            feedtb.add( {
              id:'add-feed-btn',
              icon: 'images/refresh.gif',
              cls: 'x-btn-text-icon',
              text: 'Refresh Item',
              handler: this.onTreeRefresh,
              tooltip: 'Refresh the selected menu item.'
            });            
            
            var innerLayout = new Ext.BorderLayout('east-border-layout', {
                north: {
                  split: false,
                  initialSize: 33,
                  titlebar: false,
                  collapsible: false
                },
                center: {
                  autoScroll:true
                }
            });
            
            this.helpFrame = Ext.DomHelper.append(document.body, {
					            tag: 'iframe', 
					            frameBorder: 0, 
					            src: this.config.HelpDefaultSrc
				            });
            				
            this.cboHelpTopics = new Ext.form.ComboBox({
            triggerAction: 'all',
            displayField:'topic',
            valueField: 'topic',
            lazyRender: true,
            mode: 'local',
            selectOnFocus: true,
            editable: false,
            listWidth: 250,
            resizable:true,
            anchor: '100%', 
            store: new Ext.data.SimpleStore({
                fields: ['topic', 'href'],
                data: []
            })});
            
			this.cboHelpTopics.on('select', function(cbo, rec, index) {
						var cpyRec = rec.copy();
						IceBreak.helpFrame.src = rec.get('href');
						
						cbo.store.remove(rec);
						cbo.store.insert(0, cpyRec); 
			});						
	    		  								
            this.helpToolbar = new Ext.Toolbar('tb-help', [
			            'Topic History:',
					            this.cboHelpTopics
            ]);
	    		  								
            var helpPanel = new Ext.ContentPanel(this.helpFrame, {title: 'Help & Documentation', fitToFrame:true, closable:false});      	    		              
            helpPanel.on('resize', function(panel, width, height) {
                                        IceBreak.cboHelpTopics.setSize(width-75, 30);
                                });
	    		              
            innerLayout.add('north', new Ext.ContentPanel('east-north', {toolbar: this.helpToolbar}));
            innerLayout.add('center', helpPanel);
            
            IceBreak.layout.add('west', new Ext.ContentPanel('feeds', {title: 'Navigation', fitToFrame:true, toolbar: feedtb, resizeEl:'myfeeds-body'}));
            
            IceBreak.layout.add('east', new Ext.NestedLayoutPanel(innerLayout, {title: 'Help &amp; Documentation'}));           
            
            // the inner layout houses the grid panel and the preview panel
            var innerLayout = new Ext.BorderLayout('main', {
                south: {
                    split:true,
                    initialSize: 250,
                    minSize: 100,
                    maxSize: 400,
                    autoScroll:false,
                    collapsible:true,
                    titlebar: true, 
                    animate: true,
                    cmargins: {top:2,bottom:0,right:0,left:0}
                },
                center: {
                    autoScroll:false,
                    titlebar:false
                }
            });             
            
            if(this.config.HelpDefaultSrc != "" || this.config.HelpDefaultSrc != "about:blank") {
	            this.onOpenHelpTopic(this.config.HelpDefaultName, this.config.HelpDefaultSrc)
            }

            var Tree = Ext.tree;
            this.loader = new Tree.TreeLoader({ 
                dataUrl: this.config.XmlLoader,
                  requestMethod: 'GET'
            });

            this.loader.on("beforeload", function(treeLoader, node) {
            this.baseParams.rid = node.attributes.rid;
            this.baseParams.type = node.attributes.type;
            this.baseParams.groupid = node.attributes.groupid;
            }, this.loader); 

            if(this.config.XmlLoaderType == 'dynamic') {
            this.loader.on("afterload", function(obj, node, response) {
	               IceBreak.TreeSorter.doSort(node);
            });
            }
              
            //------------------------------------------------------------------		    
            this.tree = new Tree.TreePanel('myfeeds-body', {
                animate:true, 
                loader: this.loader,   
                rootVisible: false,
                enableDD: true,
                containerScroll: true
            });		    

            this.root = new Tree.AsyncTreeNode({
                text: this.config.RootNodeName,
                link: this.config.RootNodeUrl,
                draggable:false,
                id:'-1'   
            });

            if(this.config.XmlLoaderType == 'dynamic') {		     
                var TreeSorter = new Ext.tree.TreeSorter(this.tree, {folderSort: true});
            }
				    
            this.tree.on('contextmenu',this.onTreeContext);
            this.tree.on('click',this.onTreeClick); 	 
            this.tree.setRootNode(this.root);		    		
            this.tree.render();
            this.root.expand();  

            this.treeCMenu = new Ext.menu.Menu({
                id:'copyCtx',
                items: [{
                        id:'refresh',
                         handler: this.onTreeRefresh,
                        text:'Refresh',
                        icon: 'images/refresh.gif' 
                    },{
                        id:'opennewtab',
                        handler: this.__onOpenNewTab,
                        text: 'Open in New Tab',
                        icon: 'images/program_run_tab.gif'
                    }]
            }); 	
                        
            this.showDefaultTab();                        
            var lv = innerLayout.add('center', new Ext.ContentPanel('feed-grid', {title: 'Feed Articles', fitToFrame:true}));            

//            innerLayout.restoreState();
//            IceBreak.layout.restoreState();
            IceBreak.layout.endUpdate();   		            
            	
            this.onLoad();
            this.unmask.defer(100);
        },  
	    
        onTreeRefresh : function() {
            var node;
            
            if(IceBreak.config.XmlLoaderType == 'dynamic') {	
	            try {
	                node = IceBreak.tree.getSelectionModel().getSelectedNode();
	                node.reload();
	            } catch(ex) {
	            	try {
	                IceBreak.nodePath = node.getPath();                
	                IceBreak.root.reload(reselectNode);
	               } catch(ex) {
	               		alert('Please select an item to refresh.');
	               }
	            }
            } else { 
	            	try {
	            		node = IceBreak.tree.getSelectionModel().getSelectedNode();
	                IceBreak.nodePath = node.getPath();                
	                IceBreak.root.reload(reselectNode);
	               } catch(ex) {
	                	IceBreak.root.reload();
	               }
            } 
        },       
                     
        onOpenNewTab : function(title, link) {           
        	IceBreak.treeCMenu.hide();
            createNewTab(title, link);
        },
        
        __onOpenNewTab : function() {
          var title = IceBreak.tree.getSelectionModel().getSelectedNode().text;
          var link = IceBreak.tree.getSelectionModel().getSelectedNode().attributes.link;            
        	IceBreak.treeCMenu.hide();
         createNewTab(title, link);
        },
        
        onTreeClick : function(node, e) { 
        	IceBreak.treeCMenu.hide();          
            if(node.attributes.link) {
            		if(node.attributes.target == '_blank') {
				            IceBreak.windowopen(node.id, node.attributes.link);
            		} else if(IceBreak.layout.getRegion("center").hasPanel(0)) {                
                    var activeiFrame = IceBreak.layout.getRegion("center").getActivePanel().getEl().dom;  
                    IceBreak.layout.getRegion("center").getActivePanel().setTitle((node.attributes.title) ? node.attributes.title : node.text);
                    activeiFrame.src = node.attributes.link;                
                } else {
                    createNewTab(node.text, node.attributes.link); 
                }
            }
        },
        
        onTreeContext : function(node , e){                
            node.select();
            IceBreak.treeCMenu.items.get('opennewtab')[
            			node.attributes.link && node.attributes.target != '_blank' ? 'enable' : 'disable']();
            
            IceBreak.treeCMenu.showAt(e.getXY());
            e.stopEvent(); 
        },
        
        onLoad : function(){
//            statusPanel.getEl().addClass('done');
//            statusPanel.setContent('Done.');
        },
        
        logoff : function(){
            Ext.Ajax.request({
                url: 'signoff.rpgle',
                callback: function(options, success, response) {
                    location.replace('/index.rpgle');                          
                }
            });
        },
                
        showDefaultTab : function(){         
            createNewTab(this.config.StartTabName, this.config.StartTabUrl);    	
        },    
        
        onOpenHelpTopic : function(name, url) {
            IceBreak.helpFrame.src = url;
            IceBreak.cboHelpTopics.store.insert(0, new Ext.data.Record({topic: name, href: url})); 
            IceBreak.cboHelpTopics.select(0, true);
            IceBreak.cboHelpTopics.setValue(name);            
            //IceBreak.layout.getRegion('east').expand();
        },
                
		windowopen : function (name, url, width, height, toolbar, location, directories, status, menubar, scrollbars, copyhistory, resizable) {
		  width = (width) ? width : 500;
		  height = (height) ? height: 500;            
		  toolbar = (toolbar) ? toolbar : 'yes';
		  location = (location) ? location : 'yes';
		  directories = (directories) ? directories : 'yes';
		  status = (status) ? status : 'yes';
		  menubar = (menubar) ? menubar : 'yes';
		  scrollbars = (scrollbars) ? scrollbars : 'yes';
		  copyhistory = (copyhistory) ? copyhistory : 'no';
		  resizable = (resizable) ? resizable : 'yes';
		   
		  window.open(url, null,
             'width = ' + width + ',' +
             'height = ' + height + ',' +
             'toolbar = ' + toolbar + ',' +
             'location = ' + location + ',' + 
             'directories = ' + directories + ',' + 
             'status = ' + status + ',' + 
             'menubar = ' + menubar + ',' + 
             'scrollbars = ' + scrollbars + ',' +
             'copyhistory =' + copyhistory + ',' + 
             'resizable = ' + resizable + '');
		},
				
		unmask : function() {
			var mask = Ext.get('loading-mask');
			var msg = Ext.get('loading-msg');
			if(mask && msg) {
				mask.shift({
					xy:msg.getXY() 
					, width:msg.getWidth()
					, height:msg.getHeight()
					, remove: true
					, duration: 1.6
					, opacity: 0.3
					, easing: 'bounceOut'
					, callback: function(){Ext.fly(msg).remove();}
				});
			}
		}        
    };
    
    function createNewTab(title, link) {
        var iframe = Ext.DomHelper.append(document.body, {tag: 'iframe', frameBorder: 0, src: link});
        // Only works in IE.
        Ext.get(iframe).on('focus', cleanupWindow);
        var panel = new Ext.ContentPanel(iframe, {title: title, fitToFrame:true, closable:true});                
        IceBreak.layout.add('center', panel);
    }
    
    function reselectNode() {                   
        IceBreak.tree.selectPath(IceBreak.nodePath);
    }
    
    function cleanupWindow() {
    	try {    	
        IceBreak.treeCMenu.hide();
      } catch(ex) {}
    }        
    
}();
Ext.onReady(IceBreak.init, IceBreak);

/*window.onbeforeunload = function () {
    //Ext.Ajax.request({
        //url: 'SesEnd.rpgle'
    });	    
}*/

String.prototype.ellipse = function(maxLength){
    if(this.length > maxLength){
        return this.substr(0, maxLength-3) + '...';
    }
    return this;
};

