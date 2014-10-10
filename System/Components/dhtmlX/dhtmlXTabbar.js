/*
Copyright Scand LLC http://www.scbr.com
To use this component please contact info@scbr.com to obtain license
*/

/*_TOPICS_
@0:Initialization
@1:Visual appearence
@3:Event Handlers
*/


/**
*   @desc:  TabBar Object
*   @param: parentObject - parent html object or id of parent html object
*   @param: mode - tabbar mode - top.bottom,left,right; top is default
*   @param: height - height of tab (basis size)
*   @type: public
*   @topic: 0
*/
function dhtmlXTabBar(parentObject,mode,height)
{
        mode=mode||"top";
        this._mode=mode+"/";


        //get parent object
        if (typeof(parentObject)!="object")
            this.entBox=document.getElementById(parentObject);
        else
            this.entBox=parentObject;

        this.width  = this.entBox.getAttribute("width") || this.entBox.style.width || (window.getComputedStyle?window.getComputedStyle(this.entBox,null)["width"]:(this.entBox.currentStyle?this.entBox.currentStyle["width"]:0));
		if (this.width=="100%")
			this.enableAutoReSize(true);

        if ((!this.width)||(this.width=="auto")||(this.width.indexOf("%")!=-1)||(parseInt(this.width)==0))
                this.width=this.entBox.offsetWidth+"px";

        this.height = this.entBox.getAttribute("height") || this.entBox.style.height || (window.getComputedStyle?window.getComputedStyle(this.entBox,null)["height"]:(this.entBox.currentStyle?this.entBox.currentStyle["height"]:0));
            if ((!this.height)||(this.height.indexOf("%")!=-1)||(this.height=="auto")) this.height=this.entBox.offsetHeight+"px";

        this.activeTab = null;          //initialize activeTab
        this.tabsId = new Object();

        this._align="left";
        this._offset=5;
        this._margin=1;
        this._height=parseInt(height||20);
        this._bMode=(mode=="right"||mode=="bottom");
        this._tabSize='150';
        this._content=new Array();
        this._tbst="win_text";
        // ADDED: Modified styles Milan Zdimal [10/24/2006]
        this._styles={
            winDflt:["p_left.gif","p_middle.gif","p_right.gif","a_left.gif","a_middle.gif","a_right.gif","a_middle.gif",3,3,6,"#F4F3EE","#F0F8FF",false],
            winScarf:["with_bg/p_left.gif","with_bg/p_middle.gif","with_bg/p_right_skos.gif","with_bg/a_left.gif","with_bg/a_middle.gif","with_bg/a_right_skos.gif","with_bg/p_middle_over.gif",7,35,6,false,false,false],
            winBiScarf:["with_bg/p_left_skos.gif","with_bg/p_middle.gif","with_bg/p_right_skos.gif","with_bg/a_left_skos.gif","with_bg/a_middle.gif","with_bg/a_right_skos.gif","with_bg/p_middle_over.gif",18,18,6,false,false,false],
            winRound:["circuses/p_left.gif","circuses/p_middle.gif","circuses/p_right.gif","circuses/a_left.gif","circuses/a_middle.gif","circuses/a_right.gif","circuses/p_middle_over.gif",10,10,6,false,false,false]

        };
        this._createSelf(mode=="right"||mode=="left");            //generate TabBar DOM structure
        this.setStyle("winDflt");
        return this;
}

/**
*   @desc:  set offset before first tab on tabbar
*   @param: offset - offset value
*   @type: public
*   @topic: 1
*/
dhtmlXTabBar.prototype.setOffset = function(offset){
        this._offset=offset;
}
/**
*   @desc:  set align of tabs on tabbar
*   @param: align - left/right for gorizontal tabbar, top/bottom for vertical tabbar
*   @type: public
*   @topic: 1
*/
dhtmlXTabBar.prototype.setAlign = function(align){
        if (align=="top") align="left";
        if (align=="bottom") align="right";
        this._align=align;
}
/**
*   @desc:  set distance between tabs
*   @param: margin - margin value
*   @type: public
*   @topic: 1
*/
dhtmlXTabBar.prototype.setMargin = function(margin){
        this._margin=margin;
}





/**
*   @desc: create DOM Structure
*   @type: private
*   @topic: 0
*/
dhtmlXTabBar.prototype._createSelf = function(vMode)
{
        this._tabAll=document.createElement("DIV");
        this._tabZone=document.createElement("DIV");
        this._conZone=document.createElement("DIV");


        this.entBox.appendChild(this._tabAll);
//#4DTabs:23052006{
if (this._bMode){
        this._tabAll.appendChild(this._conZone);
        this._tabAll.appendChild(this._tabZone);
        }
        else
//#}
        {
        this._tabAll.appendChild(this._tabZone);
        this._tabAll.appendChild(this._conZone);
        }


        this._vMode=vMode;
//#4DTabs:23052006{
        if (vMode){
            this._tabAll.className='dhx_tabbar_zoneV';
            this._setSizes=this._setSizesV;
            this._redrawRow=this._redrawRowV;

            }
        else
//#}
            this._tabAll.className='dhx_tabbar_zone';

//#4DTabs:23052006{
        if (this._bMode)
            this._tabAll.className+='B';
//#}
        this._tabZone.className='dhx_tablist_zone';
        this._conZone.className='dhx_tabcontent_zone';

        this._tabZone.onselectstart = function(){ return false; };
        this._tabAll.onclick = this._onClickHandler;
        this._tabAll.onmouseover = this._onMouseOverHandler;
        if (_isFF)
            this._tabZone.onmouseout = this._onMouseOutHandler;
        else
            this._tabZone.onmouseleave = this._onMouseOutHandler;
        this._tabAll.tabbar=this;

        this._lineA=document.createElement("div");
        this._lineA.className="dhx_tablist_line";

        this._lineA.style[vMode?"left":"top"]=(this._bMode?0:(this._height+2))+"px";
        this._lineA.style[vMode?"height":"width"]=this[vMode?"height":"width"];
//#4DTabs:23052006{
        if(vMode)
            this._conZone.style.height=this.height;
        else
//#}
            this._conZone.style.width=parseInt(this.width)-(_isFF?2:0)+"px";

        this.rows=new Array();
        this.rowscount=1;
        this._createRow();
        this._setSizes();
}

/**
*   @desc:  create DOM structures of tabbar row
*   @type: private
*   @topic: 0
*/
dhtmlXTabBar.prototype._createRow = function(){
    var z=document.createElement("DIV");
    z.className='dhx_tabbar_row';
    this._tabZone.appendChild(z);
        z._rowScroller=document.createElement('DIV');
        z._rowScroller.style.display="none";
        z.appendChild(z._rowScroller);
    this.rows[this.rows.length]=z;
//#4DTabs:23052006{
    if (this._vMode){
        z.style.width=this._height+3+"px";
        z.style.height=parseInt(this.height)+"px";
        if (!this._bMode)
            this.setRowSizesA();
        else
            this.setRowSizesB();
     }
     else
//#}
     {
    z.style.height=this._height+3+"px";
     z.style.width=parseInt(this.width)+"px";
     }

     z.appendChild(this._lineA);
}


dhtmlXTabBar.prototype._removeRow=function(row){
    row.parentNode.removeChild(row);
    var z=new Array();
    for (var i=0; i<this.rows.length; i++)
        if (this.rows[i]!=row) z[z.length]=this.rows[i];

    this.rows=z;
}

/**
*   @desc: fix sizes of tabbar, can be used after changing size of tabbar parent node
*   @type: private
*   @topic: 0
*/
dhtmlXTabBar.prototype._setSizes = function(){

      this._tabAll.height=this.height;
        this._tabAll.width=this.width;

        if (this._tabZone.childNodes.length)
            var z=this._tabZone.lastChild.offsetTop-this._tabZone.firstChild.offsetTop+this._height;
        else
            var z=this._height+(_isIE?5:0);

        var a=z-2;
        this._tabZone.style.height=(a>0?a:0)+"px";
        a=parseInt(this.height)-z-4;
        this._conZone.style.height=(a>0?a:0)+"px";
}
//#4DTabs:23052006{
/**
*   @desc: fix sizes of tabbar, version for vertical toolbar
*   @type: private
*   @topic: 0
*/
dhtmlXTabBar.prototype._setSizesV = function(){
        this._tabAll.height=this.height;
        this._tabAll.width=this.width;

        var z=this._height*this.rows.length;

        if (!this._bMode){
        this._tabZone.style.width=z+3+"px";
        this._conZone.style.width=parseInt(this.width)-z+"px";
        this._conZone.style.left= z+3+"px";
        }
        else{
        this._tabZone.style.width=z+3+"px";
        this._conZone.style.width=parseInt(this.width)-z+"px";
        this._tabZone.style.left=parseInt(this.width)-z+"px";
        }

        this._conZone.style.height=this.height;
        this._tabZone.style.height=this.height;
}


/**
*   @desc: redraw row in tabbar, version for vertical tabbar
*   @param: row - row in question
*   @type: private
*   @topic: 0
*/
dhtmlXTabBar.prototype._redrawRowV=function(row){
        var talign=this._align=="left"?"top":"bottom";
        var count=parseInt(this._offset);
        for (var i=0; i<row.tabCount; i++){
			if (row.childNodes[i].style.display=="none") continue;
            row.childNodes[i]._cInd=i;
            row.childNodes[i].style[talign]=count+"px";
            count+=row.childNodes[i]._offsetSize+parseInt(this._margin);
        }
//#scrollers:23052006{
            if ((row.offsetHeight<count-parseInt(this._margin))||(parseInt(row.childNodes[0].style[this._align=="left"?"top":"bottom"])<0))
                 this._showRowScroller(row);
             else
                 this._hideRowScroller(row);
//#}

};

//#multiline:23052006{
/**
*   @desc: move tab's row to the top
*   @param: tab - tab object
*   @type: private
*   @topic: 0
*/
dhtmlXTabBar.prototype._setTabTop=function(tab){
    if (!this._vMode){
    if (tab.parentNode!=this.rows[0])
        this._tabZone.insertBefore(tab.parentNode,this.rows[0]);
        }

    var j=new Array();
    j[j.length]=tab.parentNode;

    for (var i=0; i<this.rows.length; i++)
        if (this.rows[i]!=tab.parentNode)
            j[j.length]=this.rows[i];
    this.rows=j;

    if (this._vMode) this.setRowSizesB();
    else this.setRowSizesC();

    this.rows[0].appendChild(this._lineA);
}
//#}

/**
*   @desc: set row positions for left mode
*   @param: tab - tab object
*   @type: private
*   @topic: 0
*/
dhtmlXTabBar.prototype.setRowSizesA=function(){
     for (var i=0; i<this.rows.length; i++){
        this.rows[i].style.left=i*this._height+"px";
        this.rows[i].style.zIndex=5+i;
        }
}
/**
*   @desc: set row positions for right
*   @param: tab - tab object
*   @type: private
*   @topic: 0
*/
dhtmlXTabBar.prototype.setRowSizesB=function(){
     for (var i=this.rows.length-1; i>=0; i--){
        this.rows[i].style.left=i*this._height+"px";
        this.rows[i].style.zIndex=15-i;
        }
}
/**
*   @desc: fix zIndex of rows in right mode (is it still necessary???)
*   @param: tab - tab object
*   @type: private
*   @topic: 0
*/
dhtmlXTabBar.prototype.setRowSizesC=function(){
     for (var i=this.rows.length-1; i>=0; i--){
        this.rows[i].style.zIndex=15-i;
        }
}

//#}

//#scrollers:23052006{
/**
*   @desc:  initialize scrollers for the row
*   @param: row - row in question
*   @type: private
*   @topic: 0
*/
dhtmlXTabBar.prototype._initScroller = function(row){
    var z=row._rowScroller;
//#4DTabs:23052006{
    if (this._vMode)
        z.innerHTML="<img src='"+this._imgPath+"scrl_t.gif' style='display:block;'><img src='"+this._imgPath+"scrl_b.gif'>";
    else
//#}
        z.innerHTML="<img src='"+this._imgPath+"scrl_l.gif'><img src='"+this._imgPath+"scrl_r.gif'>";
    if (this._align=="left")
    {
        z.childNodes[1].onclick=this._scrollRight;
        z.childNodes[0].onclick=this._scrollLeft;
    }
    else
    {
        z.childNodes[1].onclick=this._scrollLeft;
        z.childNodes[0].onclick=this._scrollRight;
    }
    z.className='dhx_tablist_scroll';
    z._init=1;
}
/**
*   @desc:  scroll tabbar in left direction
*   @type: private
*   @topic: 0
*/
dhtmlXTabBar.prototype._scrollLeft=function(){
    var that=this.parentNode.parentNode.parentNode.parentNode.tabbar;
    var row=this.parentNode.parentNode;
    if (!row.scrollIndex)
        row.scrollIndex=0;

    row.scrollIndex--;
    if (row.scrollIndex<0) { row.scrollIndex=0; return; }

    var shift=row.childNodes[row.scrollIndex]._offsetSize+that._margin*1;
    that._offset+=shift;
    that._redrawRow(row);
    return shift;
};
/**
*   @desc:  scroll tabbar to specified tab
*   @param: tab - tab in question
*   @type: private
*   @topic: 0
*/
dhtmlXTabBar.prototype._scrollTo=function(tab){  //  if (this._vMode) return 0;
    var that=this;
    var row=tab.parentNode;
    if (!row._rowScroller._init) this._initScroller(row);
//#4DTabs:23052006{
    if (this._vMode)
        var z=parseInt(tab.style[that._align=="left"?"top":"bottom"])+tab._offsetSize-parseInt(that.height);
    else
//#}
        var z=parseInt(tab.style[that._align])+tab._offsetSize-parseInt(that.width);

    while (z>0)
        if (that._align=="left")
            z-=row._rowScroller.childNodes[1].onclick();
        else
            z-=row._rowScroller.childNodes[0].onclick();
//#4DTabs:23052006{
    if (this._vMode)
        var z=parseInt(tab.style[that._align=="left"?"top":"bottom"])-tab._offsetSize;
    else
//#}
        var z=parseInt(tab.style[that._align])-tab._offsetSize;

    while (z<0)
        if (that._align=="left")
            z+=row._rowScroller.childNodes[0].onclick();
        else
            z+=row._rowScroller.childNodes[1].onclick();

};
/**
*   @desc:  scroll tabbar in right direction
*   @type: private
*   @topic: 0
*/
dhtmlXTabBar.prototype._scrollRight=function(){
    var that=this.parentNode.parentNode.parentNode.parentNode.tabbar;
    var row=this.parentNode.parentNode;
    if (row.tabCount-row.scrollIndex<2) return;

    if (!row.scrollIndex)
        row.scrollIndex=0;

    var shift=row.childNodes[row.scrollIndex]._offsetSize+that._margin*1;
    that._offset-=shift;
    that._redrawRow(row);
    row.scrollIndex++;
    return shift;
};
/**
*   @desc: hide scrollers in the row
*   @param: row - row in question
*   @type: private
*   @topic: 0
*/
dhtmlXTabBar.prototype._hideRowScroller = function(row){
    row._rowScroller.style.display='none';
}

/**
*   @desc: enable/disable scrollers ( enabled by default )
*   @param: mode - true/false
*   @type: public
*   @edition: Professional
*   @topic: 0
*/
dhtmlXTabBar.prototype.enableScroll = function(mode){
        this._edscr=(!convertStringToBoolean(mode));
		if(this._edscr)
        	for (var i=0; i<this.rows.length; i++)
		  		this._hideRowScroller(this.rows[i]);
}


/**
*   @desc: show scrollers in the row
*   @param: row - row in question
*   @type: private
*   @topic: 0
*/
dhtmlXTabBar.prototype._showRowScroller = function(row){
	if (this._edscr) return;
//#scrollers:23052006{
    if (!row._rowScroller._init) this._initScroller(row);
    row._rowScroller.style.display='block';
//#}
//#4DTabs:23052006{
    if (this._vMode){
        if (this._align=="left")
            row._rowScroller.style.top=row.scrollTop-38+parseInt(this.height)+"px";
        else
            row._rowScroller.style.top=row.scrollTop+4+"px";
        this._lineA.style.top=row.scrollLeft+"px";
    }
    else
//#}
    {
        if (this._align=="left")
            row._rowScroller.style.left=row.scrollLeft-38+parseInt(this.width)+"px";
        else
            row._rowScroller.style.left=row.scrollLeft+4+"px";
        this._lineA.style.left=row.scrollLeft+"px";
    }

}
//#}
/**
*   @desc: onTab mouse over handler
*   @type: private
*   @topic: 0
*/
dhtmlXTabBar.prototype._onMouseOverHandler=function(e)
{
        if (_isIE)
            var target = event.srcElement;
        else
            var target = e.target;

        target=this.tabbar._getTabTarget(target);
        if (!target)   {
            this.tabbar._hideHover(target); return;
            }

        this.tabbar._showHover(target);

        (e||event).cancelBubble=true;
}
/**
*   @desc: onTab mouse out handler
*   @type: private
*   @topic: 0
*/
dhtmlXTabBar.prototype._onMouseOutHandler=function(e)
{
    this.parentNode.tabbar._hideHover(null); return;
}




/**
*   @desc: onTab Click handler
*   @type: private
*   @topic: 0
*/
dhtmlXTabBar.prototype._onClickHandler=function(e)
{
        if (_isIE)
            var target = event.srcElement;
        else
            var target = e.target;

       if (document.body.onclick) document.body.onclick(e);
       (e||event).cancelBubble=true;


        target=this.tabbar._getTabTarget(target);
        if (!target) return;

        this.tabbar._setTabActive(target);
        return false;
}

/**
*   @desc: return tab object from parentNode collections
*   @param: t - some child node
*   @type: private
*   @topic: 0
*/
dhtmlXTabBar.prototype._getTabTarget=function(t){
    while ((!t.className)||(t.className.indexOf("dhx_tab_element")==-1)){
        if ((t.className)&&(t.className.indexOf("dhx_tabbar_zone")!=-1)) return null;
        t=t.parentNode;
        if (!t) return null;
        }
    return t;
}

/**
*   @desc: redraw row in tabbar
*   @param: row - row in question
*   @type: private
*   @topic: 0
*/
dhtmlXTabBar.prototype._redrawRow=function(row){
        var count=parseInt(this._offset);
        for (var i=0; i<row.tabCount; i++){
			if (row.childNodes[i].style.display=="none") continue;
            row.childNodes[i]._cInd=i;
            row.childNodes[i].style[this._align]=count+"px";
            count+=row.childNodes[i]._offsetSize+parseInt(this._margin);
        }
//#scrollers:23052006{
            if ((row.offsetWidth<count-parseInt(this._margin))||(parseInt(row.childNodes[0].style[this._align])<0))
                 this._showRowScroller(row);
             else
                 this._hideRowScroller(row);
//#}
    };


/**
*   @desc: remove tab from tabbar
*   @param: tab - id of tab
*   @param: mode - if set to true, selection jump from current tab to nearest one
*   @type: public
*   @topic: 1
*/
dhtmlXTabBar.prototype.removeTab = function(tab,mode){
    var tab=this.tabsId[tab];
    if (!tab) return;

	if (this._content[tab.idd]){
		this._content[tab.idd].parentNode.removeChild(this._content[tab.idd]);
	    this._content[tab.idd]=null;
		}

    this._goToAny(tab,mode);

    var row=tab.parentNode;
    row.removeChild(tab);
    row.tabCount--;
    if ((row.tabCount==0)&&(this.rows.length>1))
        this._removeRow(row);
    this.tabsId[tab.idd]=null;
    this._redrawRow(row)
    this._setSizes();
}

dhtmlXTabBar.prototype._goToAny=function(tab,mode){
    if ((this._lastActive)==tab)
        if (convertStringToBoolean(mode)) { if (null===this.goToPrevTab()) if (null===this.goToNextTab()) this._lastActive=null; }
        else this._lastActive=null;
}

/**
*   @desc: add tab to TabBar
*   @param: id - tab id
*   @param: text - tab content
*   @param: size - width(height) of tab
*   @param: position - tab index , optional
*   @param: row - index of row, optional  [only in PRO version]
*   @type: public
*   @topic: 1
*/
dhtmlXTabBar.prototype.addTab = function(id, text, size, position, row){    // return 0;
    row=row||0;
//#multiline:23052006{
    if (this.rows.length<=row)
        for (var i=this.rows.length; i<=row; i++)
            this._createRow();
//#}
    var z=this.rows[row].tabCount||0;
    if ((!position)&&(position!==0))
        position=z;

    // ADDED: Added an id as a param.
    var tab=this._createTab(text, size, id);
    tab.idd=id;
    this.tabsId[id] = tab;

    this.rows[row].insertBefore(tab,this.rows[row].childNodes[position]);

    this.rows[row].tabCount=z+1;
    this._redrawRow(this.rows[row]);
    this._setSizes();
}

/**
*   @desc: showing hover over tab
*   @param: tab - tab in question
*   @type: private
*   @topic: 0
*/
dhtmlXTabBar.prototype._showHover=function(tab){
	if (tab._disabled) return;
    this._hideHover(tab);
    if (tab==this._lastActive) return;
    switch (this._tbst){
        case "win_text":
           tab._lChild.style.backgroundImage='url('+this._imgPath+this._mode+this._styles[this._cstyle][6]+')';
        break;
    }
    this._lastHower=tab;
}
/**
*   @desc: hiding hover over tab
*   @param: tab - tab in question
*   @type: private
*   @topic: 0
*/
dhtmlXTabBar.prototype._hideHover=function(tab){
    if ((!this._lastHower)||(this._lastHower==tab)||(this._lastHower==this._lastActive))
        return;
    switch (this._tbst){
        case "win_text":
               this._lastHower._lChild.style.backgroundImage='url('+this._imgPath+this._mode+this._styles[this._cstyle][1]+')';
        break;
    }
    this._lastHower=null;
}

/**
*   @desc: return tab by it's id
*   @param: tabId - id of searced tab
*   @type: private
*   @topic: 1
*/
dhtmlXTabBar.prototype._getTabById=function(tabId){
    return this.tabsId[tabId];
}

/**
*   @desc: switch tab to active state
*   @param: tabId - id of tab
*   @type: public
*   @topic: 1
*/
dhtmlXTabBar.prototype.setTabActive=function(tabId){
    var tab=this._getTabById(tabId);
    if (tab) this._setTabActive(tab);
}
/**
*   @desc: switch tab to active state
*   @param: tab - tab object
*   @type: private
*   @topic: 0
*/
dhtmlXTabBar.prototype._setTabActive=function(tab){
	if ((tab._disabled)||(tab.style.display=="none")) return false;
    if ((this._onsel)&&(!this._onsel(tab.idd,this._lastActive?this._lastActive.idd:null))) return false;
    if (this._lastActive)
        this._lastActive.className=this._lastActive.className.replace(/dhx_tab_element_active/g,"dhx_tab_element_inactive");
    tab.className=tab.className.replace(/dhx_tab_element_inactive/g,"dhx_tab_element_active");
    if  ((this._lastActive)&&(this._styles[this._cstyle][10]))
        this._lastActive.style.backgroundColor=this._styles[this._cstyle][10];
    if  (this._styles[this._cstyle][11])
        tab.style.backgroundColor=this._styles[this._cstyle][11];

//#4DTabs:23052006{
    if (this._vMode){
      switch (this._tbst){
          case "win_text":
              if (this._lastActive){
              this._lastActive._lChild.style.backgroundImage='url('+this._imgPath+this._mode+this._styles[this._cstyle][1]+')';
              this._lastActive.childNodes[0].childNodes[0].src=this._imgPath+this._mode+this._styles[this._cstyle][0];
              this._lastActive.childNodes[1].childNodes[0].src=this._imgPath+this._mode+this._styles[this._cstyle][2];
              this._lastActive.style.height=parseInt(this._lastActive.style.height)-this._styles[this._cstyle][9]+"px";
              this._lastActive._lChild.style.height=parseInt(this._lastActive._lChild.style.height)-this._styles[this._cstyle][9]+"px";
              this._lastActive.style[this._align=="right"?"marginBottom":"marginTop"]="0px"
              this._lastActive.style.width=this._height+1+"px";
              if (this._bMode)
                  this._lastActive._lChild.style.width=this._height+1+"px";
              }

              tab._lChild.style.backgroundImage='url('+this._imgPath+this._mode+this._styles[this._cstyle][4]+')';
              tab.childNodes[0].childNodes[0].src=this._imgPath+this._mode+this._styles[this._cstyle][3];
              tab.childNodes[1].childNodes[0].src=this._imgPath+this._mode+this._styles[this._cstyle][5];
              tab.style.height=parseInt(tab.style.height)+this._styles[this._cstyle][9]+"px";
              tab._lChild.style.height=parseInt(tab._lChild.style.height)+this._styles[this._cstyle][9]+"px";
              tab.style[this._align=="right"?"marginBottom":"marginTop"]="-3px"
              tab.style.width=this._height+3+"px";
              if (this._bMode)
                  tab._lChild.style.width=this._height+3+"px";
          break;
      }
    }
    else
//#}
    {
      switch (this._tbst){
          case "win_text":
              if (this._lastActive){
              this._lastActive._lChild.style.backgroundImage='url('+this._imgPath+this._mode+this._styles[this._cstyle][1]+')';
              this._lastActive.childNodes[0].childNodes[0].src=this._imgPath+this._mode+this._styles[this._cstyle][0];
              this._lastActive.childNodes[1].childNodes[0].src=this._imgPath+this._mode+this._styles[this._cstyle][2];
              this._lastActive.style.width=parseInt(this._lastActive.style.width)-this._styles[this._cstyle][9]+"px";
              this._lastActive._lChild.style.width=parseInt(this._lastActive._lChild.style.width)-this._styles[this._cstyle][9]+"px";
              this._lastActive.style[this._align=="left"?"marginLeft":"marginRight"]="0px"
              this._lastActive.style.height=this._height+1+"px";
//#4DTabs:23052006{
              if (this._bMode)
                  this._lastActive._lChild.style.height=this._height+1+"px";
//#}
              }

              tab._lChild.style.backgroundImage='url('+this._imgPath+this._mode+this._styles[this._cstyle][4]+')';
              tab.childNodes[0].childNodes[0].src=this._imgPath+this._mode+this._styles[this._cstyle][3];
              tab.childNodes[1].childNodes[0].src=this._imgPath+this._mode+this._styles[this._cstyle][5];
              tab.style.width=parseInt(tab.style.width)+this._styles[this._cstyle][9]+"px";
              tab._lChild.style.width=parseInt(tab._lChild.style.width)+this._styles[this._cstyle][9]+"px";
              tab.style[this._align=="left"?"marginLeft":"marginRight"]="-3px"
              tab.style.height=this._height+3+"px";
//#4DTabs:23052006{
              if (this._bMode)
                  tab._lChild.style.height=this._height+3+"px";
//#}
          break;
      }
    }


//#multiline:23052006{
//#4DTabs:23052006{
    if (this._bMode)
        this._setTabTop(tab);
        else
//#}
    this._setTabBottom(tab);
//#}
//#scrollers:23052006{
    this._scrollTo(tab);
//#}
    this._setContent(tab);


    this._lastActive=tab;
	return true;
}

//#multiline:23052006{
/**
*   @desc: move tab's row to the bottom
*   @param: tab - tab object
*   @type: private
*   @topic: 0
*/
dhtmlXTabBar.prototype._setTabBottom=function(tab){
    if (!this._vMode){
    if (tab.parentNode!=this.rows[this.rows.length-1])
        this._tabZone.appendChild(tab.parentNode);
        }

    var j=new Array();
    for (var i=0; i<this.rows.length; i++)
        if (this.rows[i]!=tab.parentNode)
            j[j.length]=this.rows[i];
    j[j.length]=tab.parentNode;
    this.rows=j;
//#4DTabs:23052006{
    if (this._vMode) this.setRowSizesA();
//#}
    this.rows[this.rows.length-1].appendChild(this._lineA);
}
//#}



/**
*   @desc: create DOM structures of tab
*   @param: text - tab content
*   @param: type - type of tab
*   @param: size - width (height) of the tab
*   @type: private
*   @topic: 0
*/
// ADDED: Added id parameter so we can close the tab [Milan 2006-10-24]
dhtmlXTabBar.prototype._createTab = function(text,size, id){
    var tab=document.createElement("DIV");
    tab.className='dhx_tab_element dhx_tab_element_inactive';
    var thml="";

    switch (this._tbst){
        case 'text':
            thml=text;
        break;
        case 'win_text':
//#4DTabs:23052006{
            if (this._vMode)
            {
            thml='<div style="position:absolute; '+(this._bMode?"right":"left")+':0px; top:0px; height:'+this._styles[this._cstyle][7]+'px; width:'+(this._height+3)+'px;"><img src="'+this._imgPath+this._mode+this._styles[this._cstyle][0]+((this._bMode&&(_isFF||_isOpera))?'" style="position:absolute; right:1px;"':'"')+'></div>';
            thml+='<div style="position:absolute; '+(this._bMode?"right":"left")+':0px; bottom:0px; height:'+this._styles[this._cstyle][8]+'px; width:'+(this._height+3)+'px;"><img src="'+this._imgPath+this._mode+this._styles[this._cstyle][2]+((this._bMode&&(_isFF||_isOpera))?'" style="position:absolute; right:1px;"':'"')+'></div>';
            thml+='<div style="position:absolute; background-repeat: repeat-y; background-image:url('+this._imgPath+this._mode+this._styles[this._cstyle][1]+'); width:'+(this._height)+'px; left:0px; top:'+this._styles[this._cstyle][7]+'px; height:'+(parseInt(size||this._tabSize)-this._styles[this._cstyle][8]-this._styles[this._cstyle][7]+"px")+'">'+text+'</div>';
            }
            else
//#}
            {
            thml='<div style="position:absolute; '+(this._bMode?"bottom":"top")+':0px; left:0px; width:'+this._styles[this._cstyle][7]+'px; height:'+(this._height+3)+'px;"><img src="'+this._imgPath+this._mode+this._styles[this._cstyle][0]+((this._bMode&&_isFF)?'" style="position:absolute; bottom:0px;"':'"')+'></div>';
            thml+='<div style="position:absolute; '+(this._bMode?"bottom":"top")+':0px; right:0px; width:'+this._styles[this._cstyle][8]+'px; height:'+(this._height+3)+'px;"><img src="'+this._imgPath+this._mode+this._styles[this._cstyle][2]+((this._bMode&&_isFF)?'" style="position:absolute; bottom:0px; left:0px;"':'"')+'></div>';
            thml+='<div style="position:absolute; background-repeat: repeat-x; background-image:url('+this._imgPath+this._mode+this._styles[this._cstyle][1]+'); height:'+(this._height+(this._bMode?1:3))+'px; top:0px; left:'+this._styles[this._cstyle][7]+'px; width:'+(parseInt(size||this._tabSize)-this._styles[this._cstyle][8]-this._styles[this._cstyle][7]+"px")+';">';
            thml+='<div id="tabtext'+id+'" style="padding-top:3px;">'+text+'</div>'; // ADDED: Added an id to div  
               try {          
                  if(typeof(oIceTabs.oTabbar) != 'undefined')
                     // ADDED: Added close button to tab [Milan 2006-09-29]
                     thml += '<img src="'+this._imgPath+this._mode+'with_bg/close.gif" class="close" onClick="closeTab(\'' + id + '\')" />'; 
                } catch (ex) {}
            }
            if (!this._styles[this._cstyle][10]) tab.style.backgroundColor='transparent';
            else tab.style.backgroundColor=this._styles[this._cstyle][10];
        break;
        }
    tab.innerHTML=thml;
    tab._lChild=tab.childNodes[tab.childNodes.length-1];


//#4DTabs:23052006{
   if (this._vMode)
        {
        tab.style.height=parseInt(size||this._tabSize)+"px";
        tab.style.width=this._height+1+"px";
        }
    else
//#}
        {

        tab.style.width=parseInt(size||this._tabSize)+"px";
        tab.style.height=this._height+1+"px";
        }

    tab._offsetSize=parseInt(size||this._tabSize);
    return tab;
}

/**
*   @desc: reinitialize  tabbar
*   @type: public
*   @topic: 0
*/
dhtmlXTabBar.prototype.clearAll = function(){
	this._content=new Array();
    this.tabsId=new Array();
    this.rows=new Array();
    this._lastActive=null;
    this._lastHower=null;
    this.entBox.innerHTML="";
    this._createSelf();
    this.setStyle(this._cstyle);
}



/**
*   @desc: reinitialize  tabbar
*   @param: path - path to image folder
*   @type: public
*   @topic: 0
*/
dhtmlXTabBar.prototype.setImagePath = function(path){
    this._imgPath=path;
}




/**
*     @desc: load tabbar from xml string
*     @type: public
*     @param: xmlString - XML string
*     @param: afterCall - function which will be called after xml loading
*     @topic: 0
*/
dhtmlXTabBar.prototype.loadXMLString=function(xmlString,afterCall){
       this.XMLLoader=new dtmlXMLLoaderObject(this._parseXML,this,true,this.no_cashe);
        this.waitCall=afterCall||0;
      this.XMLLoader.loadXMLString(xmlString);
        };
/**
*     @desc: load tabbar from xml file
*     @type: public
*     @param: file - link too XML file
*     @param: afterCall - function which will be called after xml loading
*     @topic: 0
*/
   dhtmlXTabBar.prototype.loadXML=function(file,afterCall){
       this.XMLLoader=new dtmlXMLLoaderObject(this._parseXML,this,true,this.no_cashe);
        this.waitCall=afterCall||0;
      this.XMLLoader.loadXML(file);
    }


    dhtmlXTabBar.prototype._getXMLContent=function(node){
       var text="";
       for (var i=0; i<node.childNodes.length; i++)
            {
                var z=node.childNodes[i];
                text+=(z.nodeValue===null?"":z.nodeValue);
            }
       return text;
    }
/**
*     @desc: parse xml of tabbar
*     @type: private
*     @param: that - tabbar object
*     @param: obj - xmlLoader object
*     @topic: 0
*/
   dhtmlXTabBar.prototype._parseXML=function(that,a,b,c,obj){
   		that.clearAll();
        var selected="";
        if (!obj) obj=that.XMLLoader;

            var atop=obj.getXMLTopNode("tabbar");
          var arows = obj.doXPath("//row",atop);
//#href_support:24052006{
            that._hrfmode=atop.getAttribute("hrefmode")||that._hrfmode;
//#}
//#xml_config:24052006{
            that._margin =atop.getAttribute("margin")||that._margin;
            that._align  =atop.getAttribute("align") ||that._align;
            that._offset =atop.getAttribute("offset")||that._offset;

            var acs=atop.getAttribute("tabstyle");
            if (acs) that.setStyle(acs);

            acs=atop.getAttribute("skinColors");
            if (acs) that.setSkinColors(acs.split(",")[0],acs.split(",")[1]);
//#}
            for (var i=0; i<arows.length; i++){
              var atabs = obj.doXPath("./tab",arows[i]);
                for (var j=0; j<atabs.length; j++){
                    var width=atabs[j].getAttribute("width");
                    var name=that._getXMLContent(atabs[j]);
                    var id=atabs[j].getAttribute("id");
                    that.addTab(id,name,width,"",i);
                    if (atabs[j].getAttribute("selected")) selected=id;

//#href_support:24052006{
                    if (that._hrfmode)
                        that.setContentHref(id,atabs[j].getAttribute("href"));
                    else
//#}
//#content_from_xml:24052006{
                    for (var k=0; k<atabs[j].childNodes.length; k++)
                        if (atabs[j].childNodes[k].tagName=="content")
                            that.setContentHTML(id,that._getXMLContent(atabs[j].childNodes[k]));
//#}


                }
            }
        if (selected) that.setTabActive(selected);
        if (that.dhx_xml_end) that.dhx_xml_end(that);
    }

    /**
    *     @desc: set function called after xml loading/parsing ended
    *     @param: func - event handling function
    *     @type: public
    *     @edition: Professional
    *     @topic: 2
    *     @event:  onXMLLoadingEnd
    *     @eventdesc: event fired simultaneously with ending XML parsing, new items already available in tabbar
    *     @eventparam: tabbar object
    */
   dhtmlXTabBar.prototype.setOnLoadingEnd=function(func){
       if (typeof(func)=="function")
            this.dhx_xml_end=func;
         else
            this.dhx_xml_end=eval(func);
    };

//#href_support:24052006{
/**
*     @desc: forcing to load tab in question
*     @type: public
*     @param: tabId - id of tab in question
*     @param: href - new href, optional
*     @topic: 0
*/
    dhtmlXTabBar.prototype.forceLoad=function(tabId,href){
	    var tab=this.tabsId[tabId];
        if (href) this._hrefs[tabId]=href;
		this._content[tab.idd]._loaded=false;

		this._setContent(tab,this._lastActive.idd!=tabId);
	}

/**
*     @desc: set mode of loading external content
*     @type: public
*     @param: mode - href mode - ifram/iframes/ajax
*     @topic: 0
*/
         dhtmlXTabBar.prototype.setHrefMode=function(mode){
            this._hrfmode=mode;
        }
/**
*     @desc: set content as a href to an external file
*     @type: public
*     @param: href - link too external file
*     @topic: 1
*/
         dhtmlXTabBar.prototype.setContentHref=function(id,href){
            if (!this._hrefs)   this._hrefs=new Array();
            this._hrefs[id]=href;
            switch(this._hrfmode){
                case "iframe":
                        if (!this._glframe){
                            var z=document.createElement("DIV");
                            z.style.width='100%';
                            z.style.height='100%';
                            // ADDED: Added tidy routine onfocus
                            z.innerHTML="<iframe onfocus='oIceTabs.cleanupWindow();' frameborder='0' width='100%' height='100%' src='"+this._imgPath+"blank.html'></iframe>";
                            this._glframe=z.childNodes[0];
                            this._conZone.appendChild(this._glframe);
                            }
                    break;
                case "iframes":
                case "iframes-on-demand":
                            var z=document.createElement("DIV");
                            z.style.width='100%';
                            z.style.height='100%';
                            z.style.display='none';
                            // ADDED: Added tidy routine onfocus
                            z.innerHTML="<iframe onfocus='oIceTabs.cleanupWindow();' frameborder='0' width='100%' height='100%' src='"+this._imgPath+"blank.html'></iframe>";
							if (this._hrfmode=="iframes")
	                            z.childNodes[0].src=href;
                            this.setContent(id,z);
                    break;
                case "ajax":
                case "ajax-html":
                            var z=document.createElement("DIV");
                            z.style.width='100%';
                            z.style.height='100%';
                            this.setContent(id,z);
                    break;
            }
        }

/**
*     @desc: return window of tab content for iframe based tabbar
*     @type: public
*     @param: tab_id - tab id
*     @topic: 1
*/
        dhtmlXTabBar.prototype.tabWindow=function(tab_id){
            if  (this._hrfmode.indexOf("iframe")==0)
                return (this._content[tab_id]?this._content[tab_id].childNodes[0].contentWindow:null);
        }

         dhtmlXTabBar.prototype._ajaxOnLoad=function(obj,a,b,c,loader){
			if (this._hrfmode=="ajax"){
	            var z=loader.getXMLTopNode("content");
				var val=obj[0]._getXMLContent(z);
				}
			else var val=loader.xmlDoc.responseText;

			obj[0]._resolveContent(obj[1],val);
            //#size_adjust:18072006{
                obj[0].adjustSize();
            //#}
        }
		dhtmlXTabBar.prototype._resolveContent=function(id,val){
			var z=val.match(/<script[^>]*>([^<]+)<\/script>/g);
			if (this._content[id]){
				this._content[id].innerHTML=val;
				if (z)
					for (var i=0; i<z.length; i++)
						eval(z[i].replace(/<([/]{0,1})script[^>]*>/g,""));
			}
		}
//#}


/**
*     @desc: set content of tab
*     @type: public
*     @param: id - id of tab
*     @param: nodeId - id of container, or container object
*     @topic: 3
*     @event: onClick
*     @eventdesc: event called when any tab selected
*     @eventparam: id - id of tab
*     @eventreturn: if false returned the selection aborted
*     @event: onClick
*/
    dhtmlXTabBar.prototype.setOnSelectHandler=function(func){
       if (typeof(func)=="function")
            this._onsel=func;
         else
            this._onsel=eval(func);
    }
/**
*     @desc: set content of tab
*     @type: public
*     @param: id - id of tab
*     @param: nodeId - id of container, or container object
*     @topic: 1
*/
    dhtmlXTabBar.prototype.setContent=function(id,nodeId){
        if (typeof(nodeId)=="string")
            nodeId=document.getElementById(nodeId);


		if (this._content[id])
			this._content[id].parentNode.removeChild(this._content[id]);

        this._content[id]=nodeId;
        if (nodeId.parentNode) nodeId.parentNode.removeChild(nodeId);
        nodeId.style.position="absolute";
		if (this._dspN){
    	    nodeId.style.display="none";
	        nodeId.style.visibility="visible";
			}
		else{
	        nodeId.style.visibility="hidden";
    	    nodeId.style.display="block";
			}
        nodeId.style.top="0px";        nodeId.style.top="0px";
        this._conZone.appendChild(nodeId);

        if ((this._lastActive)&&(this._lastActive.idd==id)) this._setContent(this._lastActive);
    }


/**
*     @desc: set content of tab
*     @type: private
*     @param: tab - tab in question
*     @topic: 0
*/
    dhtmlXTabBar.prototype._setContent=function(tab,stelth){
//#href_support:24052006{
        if (this._hrfmode)
           switch(this._hrfmode){
                case "iframe":
                    this._glframe.src=this._hrefs[tab.idd];
                    return;
                break;
                case "iframes":
				case "iframes-on-demand":
					if ((this._hrfmode=="iframes-on-demand")&&(!this._content[tab.idd]._loaded))
						{
							this._content[tab.idd].childNodes[0].src=this._hrefs[tab.idd];
                        	this._content[tab.idd]._loaded="true";
						}
                break;
                case "ajax":
                case "ajax-html":
                    var z=this._content[tab.idd];
                    if (!z._loaded) {
                        z.innerHTML="<div class='dhx_ajax_loader'><img src='"+this._imgPath+"loading.gif' />&nbsp;Loading...</div>";
                        (new dtmlXMLLoaderObject(this._ajaxOnLoad,[this,tab.idd],true,this.no_cashe)).loadXML(this._hrefs[tab.idd]);
                        z._loaded=true;
                        }
                break;
           }
//#}

		if (!stelth){
        if ((this._lastActive)&&(this._content[this._lastActive.idd]))
			if (this._dspN)
	            this._content[this._lastActive.idd].style.display='none';
			else
	            this._content[this._lastActive.idd].style.visibility='hidden';

        if (this._content[tab.idd])
			if (this._dspN)
	            this._content[tab.idd].style.display='block';
			else
	            this._content[tab.idd].style.visibility='';
        }
        //#size_adjust:18072006{
            this.adjustSize();
        //#}
    }
/**
*     @desc: set content of tab, as HTML string
*     @type: public
*     @param: id - id of tab
*     @param: html - html string
*     @topic: 1
*/
    dhtmlXTabBar.prototype.setContentHTML=function(id,html){
        var z=document.createElement("DIV");
        z.style.width="100%";
        z.style.height="100%";
        z.style.overflow="auto";
        z.innerHTML=html;
        this.setContent(id,z);
    }

/**
*     @desc: set style used for tabbar
*     @type: public
*     @param: name - any valid style name
*     @topic: 0
*/
    dhtmlXTabBar.prototype.setStyle=function(name){
        if (this._styles[name]){
                this._cstyle=name;
                if(this._styles[this._cstyle][12])
                    this._conZone.style.backgroundColor=this._styles[this._cstyle][12];
            }
    }


//#trash:19052006{
    dhtmlXTabBar.prototype.allignToContainer=function(id,mode){
        if (id)
            this._conZone.style.display='none';

        if (typeof(id)!="object")
            id=document.getElementById(id);
        if (!id) return;

        this.entBox.style.position='absolute';
        document.body.appendChild(this.entBox);

        switch(mode){
            case "t":
                this.entBox.style.top=getAbsoluteTop(id)-this.entBox.offsetHeight+"px";
                this.entBox.style.left=getAbsoluteLeft(id)-this.entBox.offsetWidth+"px";
            break;
        }
        }

dhtmlXTabBar.prototype.setTabBarStyle = function(name){
    this._tbst=name;
}
//#}

/**
*     @desc: enable/disable content zone (enabled by default)
*     @type: public
*     @param: mode - true/false
*     @topic: 0
*/
    dhtmlXTabBar.prototype.enableContentZone=function(mode){
        this._conZone.style.display=convertStringToBoolean(mode)?"":'none';
        }

/**
*     @desc: enable/disable force hiding mode, solves IE problems with iframes in HTML content, but can cause problems for other dhtmlx components inside tabs
*     @type: public
*     @param: mode - true/false
*     @topic: 0
*/
    dhtmlXTabBar.prototype.enableForceHiding=function(mode){
        this._dspN=convertStringToBoolean(mode);
        }

/**
*     @desc: allow to set skin specific color, must be used AFTER selecting skin
*     @type: public
*     @param: a_tab - color of activ tab
*     @param: p_tab - color of passive tab
*     @param: c_zone - color of content zone  (optional)
*     @topic: 0
*/
    dhtmlXTabBar.prototype.setSkinColors=function(a_tab,p_tab,c_zone){
        this._styles[this._cstyle][10]=p_tab;
        this._styles[this._cstyle][11]=a_tab;
        this._conZone.style.backgroundColor=c_zone||a_tab;
    }

/**
*     @desc: get id of current active tab
*     @type: public
*     @return: id of current active tab
*     @topic: 0
*/
dhtmlXTabBar.prototype.getActiveTab=function(){
    if (this._lastActive) return this._lastActive.idd;
    return null;
}
/**
*     @desc: select tab next to active
*     @type: public
*     @return: id of current active tab
*     @topic: 0
*/
dhtmlXTabBar.prototype.goToNextTab=function(tab){
	var z=tab||this._lastActive;
    if (z){
        if (z.nextSibling.idd){
            if (!this._setTabActive(z.nextSibling))
                return  this.goToNextTab(z.nextSibling);
            return z.nextSibling.idd;
            }
        else
            if (z.parentNode.nextSibling){
                var arow=z.parentNode.nextSibling.childNodes[0];
                if (!this._setTabActive(arow))
					return  this.goToNextTab(arow);
                return arow.idd;
                }
        }
    return null;
}
/**
*     @desc: select tab previous to active
*     @type: public
*     @return: id of current active tab
*     @topic: 0
*/
dhtmlXTabBar.prototype.goToPrevTab=function(tab){
	var z=tab||this._lastActive;
    if (z){
        if (z.previousSibling){
            if (!this._setTabActive(z.previousSibling))
				return this.goToPrevTab(z.previousSibling);
            return this._lastActive.idd;
            }
        else
            if (z.parentNode.previousSibling){
                var arow=z.parentNode.previousSibling.childNodes[arow.tabCount-1];
                if (!this._setTabActive(arow))
					return this.goToPrevTab(arow);
                return arow.idd;
                }
        }
    return null;
}

//#size_adjust:18072006{
/**
*     @desc: enable disable auto adjusting height and width   to inner content
*     @type: public
*     @param: autoWidth - enable/disable auto adjusting width
*     @param: autoHeight - enable/disable auto adjusting height
*     @topic: 0
*/
dhtmlXTabBar.prototype.enableAutoSize=function(autoWidth,autoHeight){
    this._ahdj=convertStringToBoolean(autoHeight);
    this._awdj=convertStringToBoolean(autoWidth);
}


/**
*     @desc: enable / disable auto adjusting height and width   to outer conteiner
*     @type: public
*     @param: mode - enable/disable
*     @topic: 0
*/
dhtmlXTabBar.prototype.enableAutoReSize=function(mode){
    if (convertStringToBoolean(mode)){
    var self=this;
    if(this.entBox.addEventListener){
       if ((_isFF)&&(_FFrv<1.8))
          window.addEventListener("resize",function (){
                        window.setTimeout(function(){ self.adjustOuterSize(); },10);
                        },false);
                else
                    window.addEventListener("resize",function (){  if (self.adjustOuterSize) self.adjustOuterSize(); },false);
       }
    else if (window.attachEvent)
                window.attachEvent("onresize",function(){
                    if (self._resize_timer) window.clearTimeout(self._resize_timer);
                    if (self.adjustOuterSize)
                        self._resize_timer=window.setTimeout(function(){ self.adjustOuterSize(); },500);
                });

      }
}

/**
*     @desc: set control size
*     @type: public
*     @param: width - new width
*     @param: height - new height
*     @param: contentZone - if set to true, than width and height set only to content zone
*     @topic: 0
*/
dhtmlXTabBar.prototype.setSize=function(width,height,contentZone){
    if (contentZone){
        //#4DTabs:23052006{
            if(!this._vMode)
                height+=20;
            else
        //#}
                width+=20;
    }

        this.height=height+"px";
        this.width=width+"px";

        this._lineA.style[this._vMode?"left":"top"]=(this._bMode?0:(this._height+2))+"px";
        this._lineA.style[this._vMode?"height":"width"]=this[this._vMode?"height":"width"];

//#4DTabs:23052006{
        if(this._vMode){
            for (var i=0; i<this.rows.length; i++)
                this.rows[i].style.height=parseInt(this.height)+"px";

            this._conZone.style.height=height;
            }
        else
//#}
           {
            this._conZone.style.width=parseInt(this.width)-(_isFF?2:0)+"px";
            for (var i=0; i<this.rows.length; i++)
                this.rows[i].style.width=parseInt(this.width)+"px";
            }
            for (var i=0; i<this.rows.length; i++)
                this._redrawRow(this.rows[i]);
            this._setSizes();

}

dhtmlXTabBar.prototype.adjustOuterSize=function(){ 
    this.setSize(this.entBox.offsetWidth,this.entBox.offsetHeight,false);
}

dhtmlXTabBar.prototype.adjustSize=function(){
            var flag=false; var x=this._conZone.offsetWidth; var y=this._conZone.offsetHeight;
            if ((this._ahdj)&&(this._conZone.scrollHeight>this._conZone.offsetHeight)){
                y=this._conZone.scrollHeight;
                flag=true;
            }

            if ((this._awdj)&&(this._conZone.scrollWidth>this._conZone.offsetWidth)){
                x=this._conZone.scrollWidth;
                flag=true;
            }
            if (flag) this.setSize(x,y,true);
}
//#}

/**
*   @desc: prevent caching in IE  by adding random seed to URL string
*   @param: mode - enable/disable random seed ( disabled by default )
*   @type: public
*   @topic: 2,9
*/
dhtmlXTabBar.prototype.preventIECashing=function(mode){
    this.no_cashe = convertStringToBoolean(mode);
    if (this.XMLLoader) this.XMLLoader.rSeed=this.no_cashe;
}


/**
*   @desc: remove tab from tabbar
*   @param: tab - id of tab
*   @param: mode - if set to true, selection jump from current tab to nearest one
*   @type: public
*   @topic: 1
*/
dhtmlXTabBar.prototype.hideTab = function(tab,mode){
	    var tab=this.tabsId[tab];
		if (!tab) return;
	    this._goToAny(tab,mode);
		tab.style.display='none';
    var row=tab.parentNode;
    this._redrawRow(row);
}

/**
*   @desc: remove tab from tabbar
*   @param: tab - id of tab
*   @type: public
*   @topic: 1
*/
dhtmlXTabBar.prototype.showTab = function(tab){
	    var tab=this.tabsId[tab];
		if (!tab) return;
		tab.style.display='block';
    var row=tab.parentNode;
    this._redrawRow(row)
}

/**
*   @desc: remove tab from tabbar
*   @param: tab - id of tab
*   @type: public
*   @topic: 1
*/
dhtmlXTabBar.prototype.enableTab = function(tab){
	    var tab=this.tabsId[tab];
		if (!tab) return;
		tab._disabled=false;
		tab.className=(tab.className||"").replace(/dhx_tab_element_disabled/g,"");
}

/**
*   @desc: remove tab from tabbar
*   @param: tab - id of tab
*   @param: mode - if set to true, selection jump from current tab to nearest one
*   @type: public
*   @topic: 1
*/
dhtmlXTabBar.prototype.disableTab = function(tab,mode){
	    var tab=this.tabsId[tab];
		if (!tab) return;
	    this._goToAny(tab,mode);
		tab._disabled=true;
		tab.className+=" dhx_tab_element_disabled";
}
// ADDED: Added prototype for renaming tabs
dhtmlXTabBar.prototype.renameTab=function(id, sText){        
    var oTab = this._getTabById(id);    
    sExtra = (sText.length >= 13) ? '..' : '';                
    oTab.childNodes[2].childNodes[0].innerHTML = sText.substring(0,13) + sExtra;
}

// ADDED: Added function to call close tab
function closeTab(id) {
    oIceTabs.oTabbar.removeTab(id,true);    
}

