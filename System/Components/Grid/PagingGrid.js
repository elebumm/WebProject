// --------------------------------------------------------------------------------------
// Copyright:     (c) 2007 System & Method Technology
// Developer:     Milan Zdimal
// 
// 
// --------------------------------------------------------------------------------------

function PagingGrid(shtmlObjectId, type) {

    try {
       type = type.toLowerCase();
       if(type != 'paging')         
            if(type != 'loadall')
               throw new SyntaxError('');
    } catch(ex) {
         alert('Fatal Error\n\nSpecified invalid grid type in the object constructor.\nOptions include: paging/loadall\n\ni.e. var oGrid = new PagingGrid(\'Grid1\', \'loadall\');');
         return;
    }
            
    var that = this;        
    this.oXmlDom = new XmlDom();        
    this.oDataProcessor = new XmlDom(); 
    this.sHref = '';
    this.type = type;                    // paging / loadall    
    this.lastSelectedId = null;
    this.parentId = shtmlObjectId;
    this.iLastRN = 0;               	  // RN of the last record displayed
    this.iLastOffset = 0;                // The pixel position of the last grid element
    this.bIsLoading = false;             // Is XMLDom currently loading?
    this.bIsFirstLoad = true;            // Is first AJAX load?
    this.id = 'gfm' + shtmlObjectId;     // Frame id (IE) & name (Mozilla)    
    this.maxLoadRows = 20;				     // Max number of autoload rows (default 20)
    this.query = '';
    this.eof = false;					     // End of file flag
    this.scrollBarWidth = 8;			     // The width of a scrollbar        
    this.dataprocpgm = null;             // Path to the program that handles calls from DataProcessor (insert/update/delete)        
    
    this.headings = new Array();
    this.bindings = new Array();    
    this.staticHeadings = new Array();
    this.staticBindings = new Array();
    
    this.rowdata = new Array();
    this.datamap = new Object();
    
    this.rowHeight = 17; 
    this.scrollbar_h = 18;
    this.scrollbar_w = 18;
    this.displayRows = 20;              // Default number of rows to display
    this.totalRows = 0;                 // Total rows from ajax call (TOTALRRN)
    this.onEditpgm = '';                // 
    this.width = 650;                   // Default with of grid not including static columns
    this.height = 0;    
    this.key = '';                      // Key field name 
    
    this.isScrolling = false;               
    this.scrollLast = 0;
    this.scrollTimer = 0;
    this.timeoutTime = 300; 			    // Milliseconds before timer timeout
    this.objDate = new Date();
    this.orderby = 'ID';
    this.orderbyindex = null;
    this.ordertoken = 'DESC';            // Can be ASC/DESC
    this.lastorderby = null;
    this.keyindex = null;
    this.oLastSelect = new Array();
    this.oLastSelect[0] = new Object();
    this.oLastSelect[1] = new Object();
    this.lastSelectId = -1;
    this.lastSelectIndex = null;    
    
    this.headImage = new Array();
    this.headImage[0] = new Image();
    this.headImage[1] = new Image();
    
    this.headImage[0].src = 'columnbg.gif';
    this.headImage[1].src = 'columnbg-hover.gif';   
    
    /* Event Handlers*/
    this.__clickFuncHandler = null;
    this.__afterSendDataFuncHandler = null;
    this.__rightclickFuncHandler = null;
    this.__afterXMLLoadFuncHandler = null;
    
    /* Main Objects */
    this.oCorner = null;
    this.oTColumnHeader = null;           // Table Object - Normal headings
    this.oTStaticHeader = null;           // Table Object - Static headings
    this.oHeaderRow = null;
    this.oRowContainer = null;    
    this.oHeaderColumn = null;
    this.oColumnContainer = null;
    this.oBodyContainer = null;
    this.oGridBody = document.createElement('DIV');
    this.oGridData = null; 
    this.DragInfo = document.createElement('DIV');
    this.DragInfo.className = 'DragInfo';
    this.DragInfo.style.right = 0;

    this.oContainer = document.getElementById(shtmlObjectId);
    this.oContainer.className = "dynGrid";
    this.width = this.oContainer.offsetWidth;
       
    EventUtil.addEventHandler(window, "resize", function () {that.__containerBind();});      // Needs to be aligned twice                        
    EventUtil.addEventHandler(window, "resize", function () {that.__containerBind();});  

    // --------------------------------------------------------------------------------------
    this.__containerBind = function (e) {
      this.oTable.style.display = 'none';
      var w = this.oContainer.offsetWidth;
      var h = this.oContainer.offsetHeight;
      this.oTable.style.display = 'block';
      this.oTable.setAttribute('width', w);      
      this.oGridBody.style.width = w - this.oColumnContainer.offsetWidth;  
      this.oHeaderRow.style.width = w - this.scrollbar_w - this.oColumnContainer.offsetWidth; 
      return true;
    }
    
    // --------------------------------------------------------------------------------------
    this.oDataProcessor.onreadystatechange = function () {                                  
        if (that.oDataProcessor.readyState == 4) {     
        	   try {                                                    
                   var key = null;
                   var lstNodes = that.oDataProcessor.documentElement.selectNodes('action');                        
                   
                   try {
                     var action = lstNodes[0].attributes.getNamedItem('action').nodeValue;
                     if(action == '')
                        throw "Invalid action exception";
                   } catch (ex) {
                     alert('Fatal Error: Action not specified in return xml.');
                     return;
                   }
                                      
                  try {                                          
                     var key = lstNodes[0].attributes.getNamedItem('id').nodeValue;
                     if(key == '')
                        throw "Invalid id exception.";                     
                   } catch(ex) {
                     alert('Fatal Error: Id not specified in return xml.');
                     return;
                   }
                   
                   try {
                      var oUserData = new Object();
                      var userdata = that.oDataProcessor.documentElement.selectNodes('action/userdata'); 
                      for(var i=0;i<userdata.length;i++) {                        
                        oUserData[userdata[i].attributes.getNamedItem('name').nodeValue] = userdata[i].text;
                      }
                   } catch (ex) {}                   
                     
              } catch (e) { 
            	   alert("Invalid XML. Check AutoLoading Program!");            	   
            	   that.eof = true; 
            	   return;
           	  }     
           	  
           	  if(that.__afterSendDataFuncHandler)
           	      that.__afterSendDataFuncHandler(key, action, oUserData);
        }                
    }
                                                
    // --------------------------------------------------------------------------------------
    this.oXmlDom.onreadystatechange = function () {
        if (that.oXmlDom.readyState == 4 && !that.eof) {
        	   try {
                   var lstNodes = that.oXmlDom.documentElement.selectNodes('row');                   
               } catch (e) { 
                  alert(e.message);
            	   alert("Invalid XML. Check AutoLoading Program!");
            	   that.eof = true; 
            	   return;
           	   }
            that.__populateGrid(lstNodes, 'ajax');
        }
    }

    // --------------------------------------------------------------------------------------
    this.__populateGrid = function (lstNodes, source) {            
            var key, totalColumns;                        

            if(source == 'cache') {                  
                lstNodes = that.rowdata;
                totalColumns = that.rowdata[0]['celldata'].length;                                                
                lstNodes.sort(that.__customSort);
            }             
            
            for(var i=0; i < lstNodes.length; i++) {
               // Create a new rowdata object if we're not working from cached data               
               if(source == 'ajax' && that.type == 'loadall') {
                  that.appendRow(null, null);
               } else if(source != 'cache' && that.type != 'paging') {                            
                  that.appendRow(null, null);
               }
               
                var staticBindLength = that.staticBindings.length;
               
                // Populate the static column
                for(var x=0; x < staticBindLength; x++) {
             	   var RowTR = that.oStaticGridData.childNodes[0].childNodes[i];
             	   var RowDiv = RowTR.childNodes[x].childNodes[0];
             	   var rowkey, nodevalue = null;        	   

                  var oObjKeyVal = that.__getKeyValueObj(lstNodes[i], source, that.staticBindings[x], x);                  
                  nodevalue = oObjKeyVal['value'];                  
                  
    				   // Insert celldata into storage object    				   
    				   if(source != 'cache') {
                     that.rowdata[that.rowdata.length-1]['celldata'].push(nodevalue);                       
                     that.datamap[that.staticBindings[x].toUpperCase()] = that.rowdata[that.rowdata.length-1]['celldata'].length-1;
                     that.rowdata[that.rowdata.length-1]['key'] = oObjKeyVal['key'];
                     RowTR.id = oObjKeyVal['key'];
                  }
                     
                  RowDiv.innerHTML = nodevalue;            	                	
                }                                
                  
               for(var x=0; x < that.bindings.length; x++) {                                       
                	   var RowTR = that.oGridData.childNodes[0].childNodes[i];
                	   var RowDiv = RowTR.childNodes[x].childNodes[0];
                	   var rowkey, nodevalue = null;

                	   // TODO: Add them same logic for CDATA for static headers
                	   // Retrieve the value from the xml document
                     var oObjKeyVal = that.__getKeyValueObj(lstNodes[i], source, that.bindings[x], x + staticBindLength);
                     rowkey = oObjKeyVal['key'];
                     nodevalue = oObjKeyVal['value'];                                                               
                     RowDiv.innerHTML = (nodevalue == '') ? '&nbsp;' : nodevalue;                                          
                     RowTR.id = rowkey;

       				   // Insert celldata into storage object
       				   if(that.type == 'loadall' && source != 'cache')
                        that.rowdata[that.rowdata.length-1]['celldata'].push(nodevalue); 
                     
                     if(source != 'cache') {                
                        that.rowdata[that.rowdata.length-1]['key'] = rowkey;
                        that.datamap[that.bindings[x].toUpperCase()] = that.rowdata[that.rowdata.length-1]['celldata'].length-1;
                     }

                     if(that.type == 'paging') {                  
                         if(that.totalRows != lstNodes[i].attributes.getNamedItem("TOTALRN").nodeValue) {
                           that.totalRows = lstNodes[i].attributes.getNamedItem("TOTALRN").nodeValue;
                           that.__adjustHeight(that.totalRows);
                         }
                     }
                }
                
                // Set the userdata
                if(source != "cache") {                   
                   for(var x=0; x < lstNodes[i].attributes.length; x++) { 
                     var attributeValue = lstNodes[i].attributes[x].nodeValue;     
                     var attributeName = lstNodes[i].attributes[x].nodeName;  
                     if(attributeValue)                                      
                        that.rowdata[that.rowdata.length-1]['userdata'][attributeName] = attributeValue;
                   }
                }  
                
                // Align height on if static columns are present
                if(that.staticBindings.length > 0)
                  that.__doAlignRowHeight(i);
            }                            
                                                                          
            that.bIsLoading = false;       
			   that.oGridData.style.display = 'block';
			   that.oStaticGridData.style.display = 'block';
            that.__changeRowHighlight(RowDiv);			   			
            that.__doAlignHeadings();    
            that.__containerBind(null);
            
            if(this.__afterXMLLoadFuncHandler)
               this.__afterXMLLoadFuncHandler();
    }
    
    this.__getKeyValueObj = function(lstNode, source, attribute, iterator) {
    	   if(source == 'ajax') {                	                      	      
    	      // An attribute
    	      if(lstNode.attributes.getNamedItem(attribute)) {
    	          nodevalue = lstNode.attributes.getNamedItem(attribute).nodeValue;                	
    	          rowkey = lstNode.attributes.getNamedItem(that.key).nodeValue;                	          
    	      } else {
    	          // CDATA                	          
    	          try {
    	             var Nodes = lstNode.getElementsByTagName(attribute);
    	             nodevalue = Nodes[0].childNodes[0].data
    	             rowkey = lstNode.attributes.getNamedItem(that.key).nodeValue;
    	             Nodes = null;
    	          } catch(ex) {
    	            // Wasn't an attribute or CDATA
    	            alert('Critical error:\nCould not find data element for ' + attribute);
    	          }
    	      } 
    	   } else if (source == 'cache') {
    	      nodevalue = lstNode['celldata'][iterator];
    	      rowkey = lstNode[that.keyindex];                	      
    	   }
    	   
    	   var oObj = new Object();
    	   oObj['key'] = rowkey;
    	   oObj['value'] = nodevalue;
    	   return oObj;
    }
    
    this.__doAlignRowHeight = function (index) {      
      var staticRow = that.oStaticGridData.childNodes[0].childNodes[index];
      var normalRow = that.oGridData.childNodes[0].childNodes[index];      
      var staticDiv = staticRow.childNodes[0];
      var normalDiv = normalRow.childNodes[0];
      
      if(normalDiv.offsetHeight > staticDiv.offsetHeight)
         staticRow.style.height = normalRow.style.height = normalDiv.offsetHeight;
      else
         staticRow.style.height = normalRow.style.height = staticDiv.offsetHeight;
      
    }
    
    this.__doAlignHeadings = function () { 
          
            var twidth = 0;
            //that.oTColumnHeader.width = that.oGridData.offsetWidth;
            that.oTColumnHeader.style.width = 0;            
            that.oGridData.style.width = 0;
            
            for(var i=0; i<that.headings.length; i++) {
				   var HeadingDiv = that.oTColumnHeader.childNodes[0].childNodes[0].childNodes[i].childNodes[0];
				   var RowDiv     = that.oGridData.childNodes[0].childNodes[0].childNodes[i].childNodes[0];
				   
//				       RowDiv.style.border = '1px solid blue';
//				       HeadingDiv.style.border = '1px solid blue';
				   var padding = 0;
					
            	if(RowDiv.offsetWidth < HeadingDiv.offsetWidth) { 
            		w = HeadingDiv.offsetWidth-padding;
        			   RowDiv.style.width = w + 'px';
      			   HeadingDiv.style.width = w + 'px';
           		} else if (RowDiv.offsetWidth > HeadingDiv.offsetWidth) {           		
           			w = RowDiv.offsetWidth-padding;           			    
     			      RowDiv.style.width = w + 'px';
   			      HeadingDiv.style.width = w + 'px';
           		} else {
           		   w = RowDiv.offsetWidth-padding;
           		}            	            		           		
           		           		
           		twidth += w + padding;  
           		if(i==that.headings.length-1) twidth - that.scrollbar_w;
           		this.oTColumnHeader.width = twidth;
            }                                                           
            
            
            
            twidth = 0;            
            if(that.staticHeadings.length) {
               for(var i=0; i<that.staticHeadings.length; i++) {
				   var StaticDiv = that.oTStaticHeader.childNodes[0].childNodes[0].childNodes[i].childNodes[0];		
				   var RowTR = that.oStaticGridData.childNodes[0].childNodes[0];
				   var RowDiv = RowTR.childNodes[i].childNodes[0];			
   				
				   var w = StaticDiv.scrollWidth;
            	   if(RowDiv.scrollWidth < StaticDiv.scrollWidth) { 
            		   w = StaticDiv.scrollWidth;
           			   RowDiv.parentNode.width = w;
         			   StaticDiv.parentNode.width = w;
           			   //RowDiv.style.width = w;
         			   //StaticDiv.style.width = w;
           		   } else if (RowDiv.scrollWidth > StaticDiv.scrollWidth) {
           			   w = RowDiv.scrollWidth;
           			   RowDiv.parentNode.width = w;
         			   StaticDiv.parentNode.width = w;
           			   //RowDiv.style.width = w;
         			   //StaticDiv.style.width = w;
           		   }    
                  
                  twidth += w;        		
               }  
                         
               this.oTStaticHeader.width = twidth;
            }
    }
    
    // --------------------------------------------------------------------------------------
    this.Init = function() {   
       this.width = this.oContainer.offsetWidth;     
       this.oTable = document.createElement('TABLE');
       this.oTable.setAttribute('cellPadding', '0');
       this.oTable.setAttribute('cellSpacing', '0');
       this.oTable.setAttribute('border', '0');
       this.oTable.setAttribute('width', this.width);           
       
       this.oTBody = document.createElement('TBODY');
       this.oTable.appendChild(this.oTBody); 
       
       var otr = document.createElement('TR');
           var otd =  document.createElement('TD');                        
           //otd.setAttribute('height', this.headingHeight);
           this.oCorner = document.createElement('DIV');
           this.oCorner.className = 'HeaderColumn';
           otd.appendChild(this.oCorner);
           otr.appendChild(otd);
           
           var otd =  document.createElement('TD');                        
           this.oHeaderRow = document.createElement('DIV');
           otd.appendChild(this.oHeaderRow); 
           otr.appendChild(otd);
       this.oTBody.appendChild(otr);
       
       var otr = document.createElement('TR');
           var otd =  document.createElement('TD');                        
           this.oHeaderColumn = document.createElement('DIV');
           this.oHeaderColumn.style.height = this.height;
           
           this.oColumnContainer = document.createElement('DIV');        
           this.oColumnContainer.style.height = this.totalRows * this.rowHeight;
           this.oHeaderColumn.appendChild(this.oColumnContainer);
           otd.appendChild(this.oHeaderColumn);
           otr.appendChild(otd);
           
           var otd =  document.createElement('TD');                                        
           this.oGridBody.style.height = this.height;
           
           this.oBodyContainer = document.createElement('DIV');           
           if(this.totalRows)
               this.oGridBody.style.height = this.totalRows * this.rowHeight;          
           else {
//               try {
//               this.oGridBody.style.height = this.oContainer.offsetHeight - 50;          
//               } catch(ex) {}
           }
               
           this.oGridBody.appendChild(this.oBodyContainer);
           otd.appendChild(this.oGridBody);        
           otr.appendChild(otd);    	     
       this.oTBody.appendChild(otr);
               
       this.oContainer.appendChild(this.oTable);  
       //this.oContainer.style.border = '1px solid red';
        
	    this.oCorner.style.overflow = "hidden";	   
       this.oHeaderRow.style.overflow = "hidden";    
       this.oHeaderColumn.style.overflow = "hidden";
       
       this.oGridBody.style.overflowX = "scroll";
       this.oGridBody.style.overflowY = "scroll";
       
       var x = (this.oGridBody.style.overflowX == "scroll") ? 18 : 0;
       this.oHeaderColumn.style.height = this.oGridBody.style.height = parseInt(this.oGridBody.style.height) + x;       

	      /*  ---------------- Grid Data Table ----------------  */		
		   this.oGridData = this.__drawGridRows(this.oBodyContainer, this.headings);
		   this.oStaticGridData = this.__drawGridRows(this.oColumnContainer, this.staticHeadings);
   	    
           this.oContainer.appendChild(this.DragInfo);	   
           this.DragInfo.className = 'DragInfo';
           this.DragInfo.style.width = 120;           
   	    
	       /*  ---------------- Column Headings ----------------  */	    
	       this.oTStaticHeader = this.__drawGridHeadings(this.oCorner, this.staticHeadings, this.staticBindings,'');
	       this.oTStaticHeader.width = '1';
	       this.oTColumnHeader = this.__drawGridHeadings(this.oHeaderRow, this.headings, this.bindings, '', true);
   	    
	       this.Load();
    }     
    
    // --------------------------------------------------------------------------------------
    this.__drawGridRows = function(objAttach, headings) {
         var oTable = document.createElement("TABLE");	    
         var oTBody = document.createElement("TBODY");
         oTable.setAttribute('cellPadding', '0');
         oTable.setAttribute('cellSpacing', '0');
         oTable.setAttribute('border', '0'); 
         oTable.appendChild(oTBody);
	     
	      if(this.type == 'paging') {
            for(var i=1;i<=this.displayRows;i++) {
    		      var oTR = this.__drawRow(headings);
               oTBody.appendChild(oTR); 
               this.__setRowData(oTR, null);
            }
         }
         
         objAttach.appendChild(oTable);
         return oTable;
    }  
    
    this.__drawRow = function (headings) {
      var oTR = document.createElement('TR');		    
      oTR.style.height = this.rowHeight;      

      EventUtil.addEventHandler(oTR, "mouseover", this.__doOnRowMouseOver);
      EventUtil.addEventHandler(oTR, "mouseout", this.__doOnRowMouseOut);		    
      EventUtil.addEventHandler(oTR, "click", this.__onRowClick);            

      for(var x=0;x<headings.length;x++) {
         var otd = document.createElement('TD');               
         var oDiv = document.createElement('DIV');
         //otd.style.border = '1px solid green';
         oDiv.oncontextmenu = this.__rightclickFuncHandler;
         //EventUtil.addEventHandler(oDiv, "contextmenu", this.__rightclickFuncHandler);
         otd.appendChild(oDiv); 
         otd.className = "dynCell";               
         oTR.appendChild(otd);  
      }	
      
      return oTR;
    }
    
    // --------------------------------------------------------------------------------------
    this.__drawGridHeadings = function(objAttach, headings, bindings, w, minus) {
	    var oHeadingTable = document.createElement("TABLE");
	    var oTBody = document.createElement("TBODY");
	    oHeadingTable.setAttribute('cellPadding', '0');
	    oHeadingTable.setAttribute('cellSpacing', '0');
	    oHeadingTable.setAttribute('border', '0'); 
	    oHeadingTable.appendChild(oTBody);	  
	     
	    var row = document.createElement('TR');
	     
	    for(var x=0;x<headings.length;x++) {
	    	   var otd = document.createElement('TD');	    	
	    	   var otd2 = document.createElement('TD');	    
            var oDiv = document.createElement('DIV');            
	    	   oDiv.innerHTML = headings[x];
	    	   oDiv.className = 'HeadingNormal';
            oDiv.id = bindings[x];            
            EventUtil.addEventHandler(oDiv, "mouseover", this.__onHeadingIn);
            EventUtil.addEventHandler(oDiv, "mouseout", this.__onHeadingOut);
            EventUtil.addEventHandler(oDiv, "click", this.__onHeadingClick);   
            EventUtil.addEventHandler(oDiv, "mousemove", this.__onHeadingMove);                                 
    	      otd.appendChild(oDiv);
	         row.appendChild(otd);   	
	    }
	    
	      oTBody.appendChild(row);
   	    
         objAttach.appendChild(oHeadingTable);				
         objAttach.className = 'HeadingNormal';				
         objAttach.style.width = w;
         objAttach.style.overflow = 'hidden';    
         if(minus)    
            objAttach.style.width = parseInt(this.width) - 17;
         
         return oHeadingTable;
    }
    
    
    // --------------------------------------------------------------------------------------
    this.oGridBody.onscroll = function (e) {
         var x = that.oGridBody.scrollTop;
         
         if(that.scrollLast == x) {  // Horizontal scroll   
      	   that.oHeaderRow.scrollLeft = that.oGridBody.scrollLeft;       	      	
      	   return;
         }

         if(that.type == 'paging') {
            that.iLastRN = Math.round(x / that.rowHeight);	           
            that.DragInfo.innerHTML = 'Record <b>' + (that.iLastRN + 1) + '</b> of ' + that.totalRows;
            
            if(!that.isScrolling) {
      	      that.oGridData.style.display = 'none';
      	      that.oStaticGridData.style.display = 'none';
      	      that.DragInfo.style.display = 'block';
               that.DragInfo.style.top = that.oContainer.offsetTop + that.oContainer.offsetHeight - that.DragInfo.offsetHeight - that.scrollbar_h - 5;           
               that.DragInfo.style.left =  that.oContainer.offsetWidth - that.scrollbar_w - that.DragInfo.offsetWidth - 5;
      	      that.isScrolling = true;
      	      var timeoutFunc = function () { that.__checkScroll(); };
      	      that.scrollTimer = setTimeout(timeoutFunc, that.timeoutTime);
      	      timeoutFunc = null;
            	
      	      try {
			         that.oLastSelect[0].className = '';
			         that.oLastSelect[1].className = '';
		         } catch(ex) {}
            }
         }
    } 
    
    // -------------------------------------------------------------------------------------- 
    this.__checkScroll = function() {         
         if(that.scrollLast == that.oGridBody.scrollTop) {
	         var top = that.oHeaderColumn.scrollTop = that.oGridBody.scrollTop;
	         that.DragInfo.style.display = 'none';
	         that.oGridData.style.position = 'relative';
             that.oGridData.style.top = top;		    		    
	         that.oStaticGridData.style.position = 'relative';
             this.oStaticGridData.style.top = top;
             that.isScrolling = false;
             that.Load();
         } else {
	         var timeoutFunc = function () { that.__checkScroll(); };
	         that.scrollTimer = setTimeout(timeoutFunc, that.timeoutTime);		
	         timeoutFunc = null;
	         that.scrollLast = that.oGridBody.scrollTop;
         }
    }             
    
    // --------------------------------------------------------------------------------------
    this.__adjustHeight = function () {
        this.oColumnContainer.style.height = (this.totalRows * this.rowHeight) + this.scrollbar_h;
        this.oBodyContainer.style.height = this.totalRows * this.rowHeight;    	
    }
    
    // --------------------------------------------------------------------------------------
    this.__adjustHeadings = function () {        
        var oColumns = this.oHeaderArea.childNodes[0].childNodes[0].childNodes[0].childNodes;        
        for(i=0;i<oColumns.length;i++) { 
        	try {
	            oColumns[i].setAttribute('width', this.obj.oTBody.childNodes[0].childNodes[i].offsetWidth);
	        } catch(e) {}
        }
    }    
    
    // --------------------------------------------------------------------------------------
    this.__buildQuery = function () {
         this.query =  this.sHref + '?';
         this.query += 'orderby=' + that.orderby;
                  
         if(this.type == 'paging') {
            this.query += '&sort=' + that.ordertoken;
            this.query += '&lastRN=' + that.iLastRN; 
            this.query += '&max=' + that.maxLoadRows;
         }         
         // unique token to prevent cacheing
         this.query += '&token=' + this.objDate.getTime();

         return this.query;
    }  
    
    this.test = function(element, index, array) {
      globalDebug("Element "+index+" contains the value "+element); 
    }
    
    // -------------------------------------------------------------------------------------- 
    this.__buildUpdateQuery = function (id) {
      var query = '';
      var rowid = this.__findRowKey(id);                       
            
      for(var i in this.rowdata[rowid]['celldata'])
            query += escape(i) + '=' + escape(this.rowdata[rowid]['celldata'][i]) + '&';
      
      for(var i in this.rowdata[rowid]['userdata'])
            query += escape(i) + '=' + escape(this.rowdata[rowid]['userdata'][i]) + '&';
      
      return query;
    }
    
    // -------------------------------------------------------------------------------------- 
    this.__isSplitter = function (e) {
      try {         
         if(e.srcElement.className == 'HeadingSplitter') {
	         this.__cancelBubble(e);
            return true;
         }
       } catch(ex) {}
         
       return false;
    }  
    
    // -------------------------------------------------------------------------------------- 
    this.__cancelBubble = function(e) {
      if (!e) var e = window.event;
      e.cancelBubble = true;
      if (e.stopPropagation) e.stopPropagation();
    }
    
    // -------------------------------------------------------------------------------------- 
    this.__onHeadingIn = function(e) { 
         if(that.__isSplitter(e))
            return;
               
 		    try{
	        if(e.srcElement.className != 'HeadingSelect')   
			    e.srcElement.className = 'HeadingHover';
		    } catch (ex) {
	        if(e.target.className != 'HeadingSelect')   
			    e.target.className = 'HeadingHover';
		    }
		    
		   that.__cancelBubble(e); 
    }
    
    this.__onHeadingMove = function(e) {
      var t = (e.target) ? e.target : e.srcElement;
      
      if(e.offsetX <= t.offsetWidth && e.offsetX >= t.offsetWidth-5)
         t.style.cursor = 'e-resize';
      else 
         t.style.cursor = 'default';
    }
    
   // --------------------------------------------------------------------------------------
    this.__onHeadingOut = function(e) { 
         if(that.__isSplitter(e))
            return;
         
    	   try {
		       if(e.srcElement.className != 'HeadingSelect') {  			         
				      e.srcElement.className = 'HeadingNormal';	
				 }
		   } catch (ex) {
		       if(e.target.className != 'HeadingSelect')   	
				   e.target.className = 'HeadingNormal';	
		   }
		   
		   that.__cancelBubble(e);
    }
    
    // --------------------------------------------------------------------------------------
    this.__onHeadingClick = function(e) {    
         if(that.__isSplitter(e))
            return;
               
    	   var e = (e.target) ? e.target : e.srcElement;
    	   var HeadTR = e.parentNode.parentNode;
       	
	       var oHead1 = that.oTStaticHeader.childNodes[0].childNodes[0];
	       var oHead2 = that.oTColumnHeader.childNodes[0].childNodes[0]; 
       
    	   for(var x=0;x<oHead1.childNodes.length;x++)
    		   oHead1.childNodes[x].childNodes[0].className = 'HeadingNormal'
       		
    	   for(var x=0;x<oHead2.childNodes.length;x++)
    		   oHead2.childNodes[x].childNodes[0].className = 'HeadingNormal'
       
         if(that.orderby == e.id) {
            that.ordertoken = (that.ordertoken == 'ASC') ? 'DESC' : 'ASC';                        
         } else {
            that.ordertoken = 'DESC';
         }
       
    	   if(that.orderby[e.name]) {
			   that.orderby = "ID";
		   } else {
			   that.orderby = e.id;
			   e.className = 'HeadingSelect'
		   }		   		   
   		
   		if(that.type == 'paging')
		      that.Load();               // Reload the grid w/ fresh data
		   else {
		   	 
		   	 		   	 
             for(var x=0; x < that.staticBindings.length; x++) {                                   
               if(that.staticBindings[x] == that.key) 
                  that.keyindex = x;   
               
               if(that.staticBindings[x] == that.orderby)              
                  that.orderbyindex = x;
             }
		   		       
             for(var x=0; x < that.bindings.length; x++) {                                   
               if(that.bindings[x] == that.key) 
                  that.keyindex = x + that.staticBindings.length;   
               
               if(that.bindings[x] == that.orderby)              
                  that.orderbyindex = x + that.staticBindings.length;                  
             }
                                      
		      that.__populateGrid(null, 'cache');		   		      
		   }
		      
		   that.__cancelBubble(e);
    }     
    
    // --------------------------------------------------------------------------------------
    this.__onRowClick = function(e) {             
         try {
            that.__doOnRowClick(e);		   
            if (!e) var e = window.event;
            e = (e.target) ? e.target : e.srcElement;	
            var e = (e.parentNode) ? e.parentNode.parentNode : e.parentElement.parentElement;		      
            var id = that.rowdata[e.rowIndex]['key'];
            that.lastSelectedId = id;
            //alert(that.lastSelectedId);
         } catch(ex) {
            return false;
         }
         			   
         if(that.onEditpgm) {
            var pgm = that.onEditpgm + '?id=' + id;		      		      
            if (window.showModalDialog) {
	            window.showModalDialog(pgm,"name","dialogWidth:550px;dialogHeight:350px");
            } else {
	            window.open(pgm,'name','height=400,width=450,toolbar=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no ,modal=yes');
            }
         }
         		   
         if (that.__clickFuncHandler) { 	         
            var result = that.__clickFuncHandler(id);
            if(!result) return false;	         
         }		   
    }       
    
    // --------------------------------------------------------------------------------------
    this.__doOnRowClick = function(e) { 
         if (!e) var e = window.event;	    
         var e = (e.target) ? e.target : e.srcElement;
         var obj = (e.parentNode) ? e.parentNode.parentNode : e.parentElement.parentElement;			

         that.__cancelBubble(e);
         that.__changeRowHighlight(obj, e.id);
    }
    
    // --------------------------------------------------------------------------------------
    this.__changeRowHighlight = function(obj){	
    	   try {
    		   that.oLastSelect[0].className = '';
    		   that.oLastSelect[1].className = '';
    	   } catch(x) {} 

	      try {
            that.lastSelectIndex = obj.rowIndex;
            var obj1 = that.oGridData.childNodes[0].childNodes[obj.rowIndex];
            var obj2 = that.oStaticGridData.childNodes[0].childNodes[obj.rowIndex];
                	 
            that.oLastSelect[0] = obj1; 
            that.oLastSelect[1] = obj2; 
            that.oLastSelect[0].className = 'dynRow-Selected';
            that.oLastSelect[1].className = 'dynRow-Selected';
         } catch(ex) {}
    }
    
    // --------------------------------------------------------------------------------------
    this.__doOnRowMouseOver = function(e) {         
		  if (!e) var e = window.event;	    
		  var e = (e.target) ? e.target : e.srcElement;
		  var obj = (e.parentNode) ? e.parentNode.parentNode : e.parentElement.parentElement;
		
		  if(obj.nodeName != 'TR')				
			  return;
				  
		  var obj1 = that.oGridData.childNodes[0].childNodes[obj.rowIndex];
		  var obj2 = that.oStaticGridData.childNodes[0].childNodes[obj.rowIndex];
  			
       try {	
    	  if(obj1.className == 'dynRow-Selected') 
    		  return; 
    	  else if(obj) { 
    	   if(obj1)
    		  obj1.className = 'dynRow-Hover';
    		
    		if(obj2)
    		  obj2.className = 'dynRow-Hover';
    	  }
    	 } catch (ex) {}
    }
    
    // --------------------------------------------------------------------------------------
    this.__doOnRowMouseOut = function(e) { 
	   if (!e) var e = window.event;	    
		var e = (e.target) ? e.target : e.srcElement;
		var obj = (e.parentNode) ? e.parentNode.parentNode : e.parentElement.parentElement;
		
		var obj1 = that.oGridData.childNodes[0].childNodes[obj.rowIndex];
		var obj2 = that.oStaticGridData.childNodes[0].childNodes[obj.rowIndex];
		
    	try {
    		if(obj1.className != 'dynRow-Selected') { 
    		   if(obj1)
    		      obj1.className = (that.__isEven(obj.rowIndex)) ? 'dynRow-Shade' : 'dynRow-Normal';
    		      
    		   if(obj2)
    		      obj2.className = (that.__isEven(obj.rowIndex)) ? 'dynRow-Shade' : 'dynRow-Normal';
    		}
    	} catch(e) {} 
    }  
    
    // --------------------------------------------------------------------------------------
    this.__customSort = function(a,b) {     
      var index = that.orderbyindex;     
      
      if(that.ordertoken == 'ASC') {  
         if (a['celldata'][index].toUpperCase()<b['celldata'][index].toUpperCase()) return -1;
         if (a['celldata'][index].toUpperCase()>b['celldata'][index].toUpperCase()) return 1;         
      } else {
         if (a['celldata'][index].toUpperCase()<b['celldata'][index].toUpperCase()) return 1;
         if (a['celldata'][index].toUpperCase()>b['celldata'][index].toUpperCase()) return -1;         
      }
      
      return 0;
    }  
    
    // --------------------------------------------------------------------------------------
    this.__changeRowData = function(id, name) {
      var orow = document.getElementById(id);
      var index = null;
      
      for(var i=0;i<this.bindings.length;i++) {             
         if(this.bindings[i] == name) {    
            orow.children[i].children[0].innerHTML = this.rows[id][this.bindings[i]];
            break;
         }
      }    
      
      this.__doAlignHeadings();
    }	
    
    // --------------------------------------------------------------------------------------
    this.__isEven = function(num) {
      if(num%2 == 0) return true;
      else return false;         
    }
        
    // --------------------------------------------------------------------------------------
    this.__findRowKey = function(id) {
      for(var i=0;i<this.rowdata.length;i++) {                  
         if(this.rowdata[i]['key'] == id) {
            return key = i;            
         }
      }
      
      return -1;
    }

    /**
      *     @desc: sets the name of the key field in a table
      *     @parmam: key - key as a string
      *     @type: public
      */ 
    this.setKeyField = function (key) {
	   this.key = key;
    }
    
    /**
      *     @desc: the path to be called for xml data
      *     @parmam: shref - String url location of xml resource
      *     @type: public
      */    
    this.setAutoLoading = function (shref) {                
        this.sHref = shref;
    }
        
    /**
      *     @desc: sets the column text headings
      *     @parmam: headings - Array of heading names
      *     @type: public
      */
    this.setColumnHeadings = function (headings) {
        this.headings = headings;        
    }    
    
    /**
      *     @desc: sets the column names (same name as in table or select statement)
      *     @parmam: headings - Array of heading names
      *     @type: public
      */    
    this.setColumnBindings = function (bindings) {
    
       if(bindings.length != this.headings.length) {
         alert('Fatal Error\nThe number of headings & bindings does not match!');
         return;
       }              
          
	    this.bindings = bindings;
    }
	
    /**
      *     @desc: sets the column text headings
      *     @parmam: headings - Array of heading names
      *     @type: public
      */
    this.setStaticHeadings = function (headings) {
        this.staticHeadings = headings;        
    }    
    
    /**
      *     @desc: sets the column names (same name as in table or select statement)
      *     @parmam: headings - Array of heading names
      *     @type: public
      */    
	  this.setStaticBindings = function (bindings) {
		  this.staticBindings = bindings;		  
	  }	
    
    /**
      *     @desc: sets number of rows to retrieve from server
      *     @parmam: integer - number of rows
      *     @type: public
      */
    this.setMaxAutoLoadRows = function (iRows) {
    	this.displayRows = this.maxLoadRows = parseInt(iRows);
    	this.height = this.rowHeight * this.displayRows;
    }

    /**
      *     @desc: sets the width of the grid
      *     @parmam: width in pixels or %
      *     @type: public
      */    
    this.setGridWidth = function(iWidth) {
    	this.width = iWidth;
    }
    
    /**
      *     @desc: sets the width of the grid
      *     @parmam: width in pixels or %
      *     @type: public
      */    
    this.setGridHeight = function(iHeight) {
    	this.height = iHeight;
    }
    
    /**
      *     @desc: sets teh grid width
      *     @type: public
      */
    this.setGridWidth = function(width) {
	    this.width = width;
    }
    
    /**
      *     @desc: sets the path to a programs that handles calls from DataProcessor
      *     @type: public
      */
    this.setDataProcessor = function(pgm) {
	    this.dataprocpgm = pgm;
    }        
    
    /**
      *     @desc: loads the grid by sending a data request
      *     @type: public
      */
    this.Load = function () {
         //alert(this.__buildQuery());                 
         this.oXmlDom.load(this.__buildQuery());         
            
    }
    
    /**
      *     @desc: 
      *     @type: public
      */
    this.setHeadingText = function (aHtext, aHids) {        
       for(var i=0; i < aHtext.length; i++){  
           this.obj.addHeading(aHtext[i], aHids[i]);
       }
    }
    
    /**
      *     @desc: 
      *     @type: public
      */
    this.setOnEditProgram = function (sPgm) {
    	that.onEditpgm = sPgm;
    }
    
    /**
      *     @desc: 
      *     @type: public
      */
    this.setSortColumn = function (col) {
    	// todo check to see if the col is in bindings var
    	this.orderby = col;
    }  
    
    /**
      *     @desc: 
      *     @type: public
      */
   this.setOnClickHandler = function (func){  
      if (typeof(func)=="function") 
         this.__clickFuncHandler=func; 
      else 
         this.__clickFuncHandler=eval(func);             
   }  
   
    /**
      *     @desc: 
      *     @type: public
      */
   this.setAfterXMLLoadHandler = function(func) {
      if (typeof(func)=="function") 
         this.__afterXMLLoadFuncHandler=func; 
      else 
         this.__afterXMLLoadFuncHandler=eval(func);    
   } 
   
    /**
      *     @desc: 
      *     @type: public
      */
   this.onAfterSendData = function (func){  
      if (typeof(func)=="function") 
         this.__afterSendDataFuncHandler=func; 
      else 
         this.__afterSendDataFuncHandler=eval(func);             
   }            
   
    /**
      *     @desc: 
      *     @type: public
      */
   this.setOnRightClickHandler=function(func){ 
         if (typeof(func)=="function") 
            this.__rightclickFuncHandler=func; 
         else 
            this.__rightclickFuncHandler=eval(func);                          
   };     
   
    /**
      *     @desc: 
      *     @type: public
      */
   this.getSelectedItemId=function(){       
      return this.lastSelectedId;                        
   };      
   
    /**
      *     @desc: 
      *     @type: public
      */
   this.deleteItem=function(id){
   try {
      var oRow = document.getElementById(id);                
             
      try {      
         delete this.rowdata[oRow.rowIndex];                
      } catch(ex) {
         alert('Invalid Id issed to setCellData. Id: ' + id);
      }
      
      alert(oRow + ' ' + id);      
      oRow.removeNode(true);
      } catch(ex) {}
   };      
   
    /**
      *     @desc: Retrieves the innerHTML (text or html) from a grid cell
      *     @type: public
      *     @parmam: Id of row. The value of key field
      *     @parmam: Name of the column. Same name as specified in binding (Case doesn't matter)
      */
   this.getCellData = function (id, name) {
      var key = this.__findRowKey(id);

      try {
         var val = this.rowdata[key]['celldata'][this.datamap[name.toUpperCase()]];         
         if(typeof val === 'undefined')
            throw new Exception('');
            
         return val;                            
      } catch(ex) {
              
         try {            
            var val = this.rowdata[key]['userdata'][name.toUpperCase()];            
            return val;  
         } catch (ex) {}
         
         alert('getCellData: ' + name + ' is not a valid field name.');
         return '';
      }
   }   
   
    /**
      *     @desc: 
      *     @type: public
      */
   this.setCellData = function (id, name, value) {      
         var key;
         
         for(var i=0;i<this.rowdata.length;i++) {                  
            if(this.rowdata[i]['key'] == id) {
               key = i;
               break;
            }
         }   
         
         try {      
            
            var index = this.datamap[name.toUpperCase()];
            if(!index)
               throw new Exception();
            
            this.rowdata[key]['celldata'][index] = value;                                             
            this.__changeRowData(id, name);
            return;
         } catch(ex) {
            try {
               this.rowdata[key]['userdata'][name.toUpperCase()] = value;
               return;
            } catch(ex) {}         
         }       
              
         return;           
   } 
   
    /**
      *     @desc: 
      *     @type: public
      */
   this.selectRow = function(e){         
      this.__onRowClick(e);
   }

    /**
      *     @desc: Sends a GET request using ajax
      *     @type: public
      */
   this.sendUpdate = function(rowid) {      
      if(typeof dataprocpgm !== undefined) {
         var query = this.dataprocpgm + '?' + this.__buildUpdateQuery(rowid);
         globalDebug(query);
         this.oDataProcessor.load(query);
      } else {
         alert('No valid data processor specified. Check the setDataProcessor method.');
      }            
   }
   
    /**
      *     @desc: 
      *     @type: public
      */
   this.appendRow = function (id, select) {
      var index = this.rowdata.length;
      var oRow = this.__drawRow(this.headings); 
      var oStaticRow = this.__drawRow(this.staticHeadings); 
      
      if(this.__isEven(index))
         oRow.className = oStaticRow.className = 'dynRow-Shade';
      
      if(this.staticBindings.length > 0)
         this.oColumnContainer.childNodes[0].childNodes[0].appendChild(oStaticRow);
         
      //oRow.id = id;      
      this.oBodyContainer.childNodes[0].childNodes[0].appendChild(oRow);            
      this.__setRowData(oRow, id, index);
      
      if(select)
         this.__changeRowHighlight(oRow);      
       
      return oRow;     
   }         
   
    /**
      *     @desc: 
      *     @type: public
      */
   this.__setRowData = function(oRow, id, index) {   
      if(index == null)
         index = this.rowdata.length;
      
         this.rowdata[index] = new Object();                  
         this.rowdata[index]['userdata'] = new Object();
         this.rowdata[index]['celldata'] = new Array();
         this.rowdata[index]['obj'] = oRow;
         this.rowdata[index]['key'] = null;         
         if(id != null)
               this.rowdata[index]['key'] = id; 
   }
}      
    

// Temp Functions	
// --------------------------------------------------------------------------------------	
function getProperties(e) {	
	
	var result = '';
	for (var property in e) {
		result += property + ': ' + e[property] + '\n\r';
	}	
	alert(result);	
	//document.getElementById('debug').innerHTML = result;	
}