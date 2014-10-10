/*
Copyright Scand LLC http://www.scbr.com
This version of Software is free for using in non-commercial applications.
For commercial use please contact info@scbr.com to obtain license
*/



function dataProcessor(serverProcessorURL){
    this.serverProcessor = serverProcessorURL;
	this.obj = null;
	this.mandatoryFields = new Array(0);//array of fields which should be varified (indexes of columns as indexes) with corresponding verificators (as values)
	this.updatedRows = new Array(0);//array of rows which are(were) updated
	this.autoUpdate = true;//if rows should be send to server automaticaly (based on cell edit finished)
	this.updateMode = "cell";
    this._waitMode=0;
    this._tMode="GET";
    return this;
    }

	/**
	* 	@desc: select GET or POST transaction model
	*	@param: mode - GET/POST
	*	@type: public
	*/
	dataProcessor.prototype.setTransactionMode = function(mode){
        this._tMode=mode;
    }


	/**
	*     @desc: set function called after row updated
	*     @param: func - event handling function (or its name)
	*     @type: public
	*     @topic: 10
	*	  @event: onAfterUpdate
	*     @eventdesc: Event raised after row updated on server side
	*     @eventparam:  ID of clicked row
	*     @eventparam:  type of command
	*     @eventparam:  new Id, for _insert_ command
	*/
	dataProcessor.prototype.setOnAfterUpdate = function(ev){
        if (typeof(ev)!="function") ev=eval(ev);
        this._afterUEvent=ev;
	}


                  
	/**
	* 	@desc: get state of updating
	*	@returns:   true - all in sync with server, false - some items not updated yet.
	*	@type: public;
	*/
	dataProcessor.prototype.getSyncState = function(){
		for(var i=0;i<this.updatedRows.length;i++)
				if(this.updatedRows[i])
                    return false;
        return true;
	}

	/**
	* 	@desc: get state of updating
	*	@returns:   true - all in sync with server, false - some items not updated yet.
	*	@type: public;
	*/
	dataProcessor.prototype.enableDebug = function(mode){
		this._debug=convertStringToBoolean(mode);
	}

	/**
	* 	@desc: set if rows should be send to server automaticaly
	*	@param: mode - "row" - based on row selection changed, "cell" - based on cell editing finished, "off" - manual data sending
	*	@type: public;
	*/
	dataProcessor.prototype.setUpdateMode = function(mode){
		if(mode=="cell")
			this.autoUpdate = true;
		else{
			this.autoUpdate = false;
		}
		this.updateMode = mode;
	}


	dataProcessor.prototype.findRow = function(pattern){
    	for(var i=0;i<this.updatedRows.length;i++){
		    if(pattern==this.updatedRows[i])
	    			return i;
    	}
	    return -1;
    }

	/**
	* 	@desc: mark row as updated/normal. check mandatory fields,initiate autoupdate (if turned on)
	*	@param: rowId - id of row to set update-status for
	*	@param: state - true for "updated", false for "not updated"
	*	@param: forceUpdate - true to force immediately sync row in question with server
	*	@type: public;
	*/
	dataProcessor.prototype.setUpdated = function(rowId,state,forceUpdate){
		var rowInArray = this.findRow(rowId)
		if(rowInArray==-1)
			rowInArray = this.updatedRows.length;
		if(state){
			this.updatedRows[rowInArray] = rowId;
			//this.setRowTextBold(rowId);
			this.setRowTextNormal(rowId);
			this.checkBeforeUpdate(rowId,this.autoUpdate||forceUpdate);
		}else{
			this.updatedRows[rowInArray] = null;
			this.setRowTextNormal(rowId);			
			//this.grid.setUserData(rowId,"!nativeeditor_status","")
			//var nstatus = this.grid.getUserData(rowId,"!nativeeditor_status")
			//if(nstatus=="deleted")
			//	this.grid.deleteRow(rowId)
		}

	}

    dataProcessor.prototype.setUpdatedTM = function(rowId,state){
        this._lccm=true;

        if (this._waitMode){
           this.autoUpdate=false;
           this.setUpdated(rowId,true);
           this.autoUpdate=true;
           }
        else
           this.setUpdated(rowId,true)

    }

    dataProcessor.prototype.setRowTextBold=function(rowId){
        if (this.obj.mytype=="tree")
            this.obj.setItemStyle(rowId,"font-weight:bold;");
        else
            this.obj.setRowTextBold(rowId);
    };
    dataProcessor.prototype.setRowTextNormal=function(rowId){
        if (this.obj.mytype=="tree")
            this.obj.setItemStyle(rowId,"font-weight:normal;");
        else
            this.obj.setRowTextNormal(rowId);
    };
	/**
	* 	@desc: check mandatory fields and varify values of cells, initiate update (if specified)
	*	@param: rowId - id of row to set update-status for
	*	@param: updateFl - true to start update process
	*	@type: public;
	*/
	dataProcessor.prototype.checkBeforeUpdate = function(rowId,updateFl){
		var fl = true;
		var mandExists = false;
		for(var i=0;i<this.mandatoryFields.length;i++){
			if(this.mandatoryFields[i]){
				mandExists = true;
				var val = this.obj.cells(rowId,i).getValue()
				var colName = this.obj.getHeaderCol(i)
				if((typeof(this.mandatoryFields[i])=="function" && this.mandatoryFields[i](val,colName)) || (typeof(this.mandatoryFields[i])!="function" && val.toString()._dhx_trim()!="")){
					this.obj.cells(rowId,i).cell.style.borderColor = "";
				}else{
					fl = false;
					this.obj.cells(rowId,i).cell.style.borderColor = "red";
				}
			}
		}
		if((fl || !mandExists) && updateFl)//if all mandatory fields are ok or there were no mandatory fields
		{
			this.sendData(rowId);
		}
	}
	/**
	* 	@desc: send row(s) values to server
	*	@param: rowId - id of row which data to send. If not specified, then all "updated" rows will be send
	*	@type: public;
	*/
	dataProcessor.prototype.sendData = function(rowId){
		if(rowId){//send some row, not all
			//[send data to server]
			try {
                var a1=this._getRowData(rowId);
                var a2=new dtmlXMLLoaderObject(this.afterUpdate,this,true);
                
                var a3=this.serverProcessor+((this.serverProcessor.indexOf("?")!=-1)?"&":"?");
                
                globalDebug(a1);                
                
				if ((this.onBUpd)&&(!this.onBUpd(rowId,this.obj.getUserData(rowId,"!nativeeditor_status")||"updated"))) return false;

				if (this._debug)
					alert("Send data to server \n URL:"+a3+"\n Data:"+a1);
                if (this._tMode!="POST")
                   a2.loadXML(a3+a1);
                else
                   a2.loadXML(a3,true,a1);

              this._waitMode++;
           } catch(ex) {}
		}else{//send all rows one by one
			for(var i=0;i<this.updatedRows.length;i++){
				if(this.updatedRows[i]){
					this.checkBeforeUpdate(this.updatedRows[i],true)
				}
			}
		}
	}

	/**
	* 	@desc: define custom actions
	*	@param: name - name of action, same as value of action attribute
	*	@param: handler - custom function, which receives a XMl response content for action
	*	@type: private
	*/
	dataProcessor.prototype.defineAction = function(name,handler){
        if (!this._uActions) this._uActions=new Array();
            this._uActions[name]=handler;
    }


	/**
*     @desc: set function called before server request send ( can be used for including custom client server transport system)
*     @param: func - event handling function
*     @type: public
*     @topic: 0
*     @event: onBeforeUpdate
*     @eventdesc:  Event occured in moment before data sent to server
*     @eventparam: ID of item which need to be updated
*     @eventparam: type of operation
*     @eventreturns: false to block default sending routine
*/
	dataProcessor.prototype.setOnBeforeUpdateHandler=function(func){  if (typeof(func)=="function") this.onBUpd=func; else this.onBUpd=eval(func);  };

	/**
*     @desc: used in combination with setOnBeforeUpdateHandler to create custom client-server transport system
*     @param: sid - id of item before update
*     @param: tid - id of item after up0ate
*     @param: action - action name
*     @type: public
*     @topic: 0
*/
	dataProcessor.prototype.afterUpdateCallback=function(sid,tid,action){
	           this.setUpdated(sid,false);

	               switch (action){
	                   case "insert":
	                       if (tid!=sid){
	                         if (this.obj.mytype=="tree")
	                          this.obj.changeItemId(sid,tid);
	                         else
	                          this.obj.changeRowId(sid,tid);
	                         sid=tid;
	                       }
	                       break;
	                   case "delete":
	                       if (this.obj.mytype=="tree"){
	                        // ADDED: Milan Zdimal - 03/23/2007
	                        // Reversed the order of events. Now we first call _afterUEvent before actually deleting node to preserve userdata	                        	                        
	                        this.obj.deleteItem(sid);
	                        // END ADDED	                        
   
	                        var userdata = new Object();
                            userdata['type'] = oTreeA.getUserData(tid, "type");
                            userdata['superId'] = oTreeA.getUserData(tid, "super");
                            userdata['rid'] = oTreeA.getUserData(tid, "rid");
                            userdata['refresh'] = oTreeA.getUserData(tid, "refresh");
                            userdata['check'] = oTreeA.getUserData(tid, "check");
                            userdata['purge'] = oTreeA.getUserData(tid, "purge"); 
	                        
	                        if (this._afterUEvent)
	                            this._afterUEvent(sid,action,tid, userdata);
	                            
	                        return;
	                        }
	                       else
	                        this.obj.deleteRow(sid);
	                       break;
	               }
	               
	               var z=this.obj.getUserData(sid,"!nativeeditor_status",'');
	               if (z!="deleted")
	           this.obj.setUserData(sid,"!nativeeditor_status",'');

	        if (this._lccm) {
	            for(var i=0;i<this.updatedRows.length;i++)
	            	if (this.updatedRows[i]){
	        			this.obj.setUserData(this.updatedRows[i],"!nativeeditor_status","inserted");
	        		    this.setUpdated(this.updatedRows[i],true);
	                    break;
	                    }
			}

	          if (this._afterUEvent)
	              this._afterUEvent(sid,action,tid);
	 };

	/**
	* 	@desc: response from server
	*	@param: xml - XMLLoader object with response XML
	*	@type: private
	*/
	dataProcessor.prototype.afterUpdate = function(that,b,c,d,xml){
		if (that._debug)
			alert("XML status: "+(xml.xmlDoc.responseXML?"correct":"incorrect")+"\nServer response: \n"+xml.xmlDoc.responseText);
			
		  var atag=xml.getXMLTopNode("data");      
        that._waitMode--;
        var i=0;
        while ((atag.childNodes[i])&&((!atag.childNodes[i].tagName)||(atag.childNodes[i].tagName!="action"))) i++; 
        atag=atag.childNodes[i];
        
        try{
        var action = atag.getAttribute("type");
        var sid = atag.getAttribute("sid");
        var tid = atag.getAttribute("tid");
        } catch(ex) {
            //alert('Invalid XML returned. Expecting, action, sid, tid. Attributes not found.');
        }
   
        // ADDED: Milan Zdimal 03/22
        globalDebug('--- Entering Load XML Userdata ---');
        try {
           for (var a=0;a<atag.childNodes.length; a++) {
               var name = atag.childNodes[a].getAttribute("name");  
               that.obj.setUserData(tid,name,atag.childNodes[a].text);
               that.obj.setUserData(sid,name,atag.childNodes[a].text);
               globalDebug('setUserData: ' + tid +','+name+','+atag.childNodes[a].text);
               globalDebug('getUserData: ' + that.obj.getUserData(tid,name));
           }
        } catch(ex) {
         globalDebug('XML Userdata Exception: ' + ex.message);         
        }
        // end ADDED
                

	   if ((that._uActions)&&(that._uActions[action])&&(!that._uActions[action](atag))) return false;
		return that.afterUpdateCallback(sid,tid,action);
	}
	
	// ADDED: Milan Zdimal 03/22
	dataProcessor.prototype._xmlUserData = function(xml, name) {
	   try {
		   var temp = xml.getElementsByTagName(name);		   
		   return temp[0].text;
      } catch (ex) {}
      
      return '';
	}
	// end ADDED

	/**
	* 	@desc: get all row related data
	*	@param: rowId - id of row in question
	*	@type: private
	*/
	dataProcessor.prototype._getRowData = function(rowId){
        if (this.obj.mytype=="tree"){
           var z=this.obj._globalIdStorageFind(rowId);
           
           //ADDED: Milan Zdimal - Added IF
//           try {
//              if(z.parentObject) {
                  var z2=z.parentObject;

                 var i=0;
                 for (i=0; i<z2.childsCount; i++)
                     if (z2.childNodes[i]==z) break;
//              }
//           } catch(ex) {
//            // Parent object does not exist
//           }
           // END ADDED

           var str="tr_id="+escape(z.id);
           str+="&tr_pid="+escape(z2.id);
           str+="&tr_order="+i;
           str+="&tr_text="+escape(z.span.innerHTML);

            z2=(z._userdatalist||"").split(",");
            for (i=0; i<z2.length; i++)
                str+="&"+escape(z2[i])+"="+escape(z.userData["t_"+z2[i]]);

        }
        else
        {
           var str="gr_id="+escape(rowId);
           var r=this.obj.getRowById(rowId);

           for (var i=0; i<r.childNodes.length; i++)
               {
			   if (this.obj._c_order)
			   		var i_c=this.obj._c_order[i];
			   else
				   	var i_c=i;

			   var c=this.obj.cells(r.idd,i);
               str+="&c"+i_c+"="+escape(c.getValue());
               }
           var data=this.obj.UserData[rowId];
           if (data){
               for (var j=0; j<data.keys.length; j++)
                   str+="&"+data.keys[j]+"="+escape(data.values[j]);
           }
        }
           return str;

	}

	/**
	* 	@desc: specify column which value should be varified before sending to server
	*	@param: ind - column index (0 based)
	*	@param: verifFunction - function (object) which should verify cell value (if not specified, then value will be compared to empty string). Two arguments will be passed into it: value and column name
	*	@type: public;
	*/
	dataProcessor.prototype.setVerificator = function(ind,verifFunction){
		if(verifFunction){
			this.mandatoryFields[ind] = verifFunction;
		}else
			this.mandatoryFields[ind] = true;
	}
	/**
	* 	@desc: remove column from list of those which should be verified
	*	@param: ind - column Index (0 based)
	*	@type: public;
	*/
	dataProcessor.prototype.clearVerificator = function(ind){
		this.mandatoryFields[ind] = false;
	}
	
	/**
	* 	@desc: initializes data-processor
	*	@param: anObj - dhtmlxGrid object to attach this data-processor to
	*	@type: public;
	*/
	dataProcessor.prototype.init = function(anObj){
		this.obj = anObj;
        this.obj.lWin=(new Date()).valueOf()+"-"+Math.random(1000)+"-"+(anObj.entBox||anObj.parentObject).id;
		var self = this;
        if (this.obj.mytype=="tree"){
            if (this.obj.setOnEditHandler)
    		this.obj.setOnEditHandler(function(state,id){
                if (state==3)
                    self.setUpdated(id,true)
                return true;
                });

            this.obj.setDropHandler(function(id,id_2,id_3,tree_1,tree_2){
                    if (tree_1==tree_2)
                self.setUpdated(id,true);
            });
    		this.obj._onrdlh=function(rowId){
                var z=self.obj.getUserData(rowId,"!nativeeditor_status");
    			if (z=="deleted")
    				return true;
    			self.obj.setUserData(rowId,"!nativeeditor_status","deleted");
    			self.setUpdated(rowId,true)
    			self.obj.setItemStyle(rowId,"text-decoration : line-through;");
    			return false;
    		};
    		this.obj._onradh=function(rowId){
    			self.obj.setUserData(rowId,"!nativeeditor_status","inserted");
    			self.setUpdatedTM(rowId,true)
    		};
        }
        else{
      		this.obj.setOnEditCellHandler(function(state,id,index){
      			var cell = self.obj.cells(id,index)
      			if(state==0){

      			}else if(state==1){
					if(cell.isCheckbox()){
      					self.setUpdated(id,true)
      				}
      			}else if(state==2){
      				if(cell.wasChanged()){
						self.setUpdated(id,true)
      				}
      			}
                return true;
      		})
      		this.obj.setOnRowSelectHandler(function(rowId){
      			if(self.updateMode=="row")
      				self.sendData();
                    return true;
      		});
      		this.obj.setOnEnterPressedHandler(function(rowId,celInd){
      			if(self.updateMode=="row")
      				self.sendData();
                    return true;
      		});
      		this.obj.setOnBeforeRowDeletedHandler(function(rowId){
                var z=self.obj.getUserData(rowId,"!nativeeditor_status");
    			if (z=="inserted") {  self.setUpdated(rowId,false);		return true; }
    			if (z=="deleted")  {    				                return true; }


      			self.obj.setUserData(rowId,"!nativeeditor_status","deleted");
      			self.obj.setRowTextStyle(rowId,"text-decoration : line-through;");
      			self.setUpdated(rowId,true);
      			return false;
      		});
      		this.obj.setOnRowAddedHandler(function(rowId){
      			self.obj.setUserData(rowId,"!nativeeditor_status","inserted");
      			self.setUpdated(rowId,true)
                return true;
      		});

        }
	}
	
	
	function getProperties(e) {			   
	   for (var property in e) {
		   result += property + ': ' + e[property] + '\n';
	   }	
	   alert(result);	
	   //document.getElementById('debug').innerHTML = result;	
   }


