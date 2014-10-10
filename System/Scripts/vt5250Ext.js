/* -----------------------------------------------------------------------------------------------------------------------------------------------------------------------
VT5250 status

•	Genneføre Ftaster direkte igennem til VT api
•	Klassen vt5250 – skal den være en items i stedet?


Jeg har bygget klassen vt5250 og InputFiled

•	vt5250 forventer et window at placeres sig på.
•	

 00100001 x'21 Reverse image
 00100010 x'22 High intensity
 00100100 x'24 Underline
 00100111 x'27 Nondisplay
 00101000 x'28 Blinking field
 00110000 x'30 Column separator

 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */

Ext.ns('ic');

ic.vt5250=Ext.extend(Ext.form.FormPanel,{
  // defaults goes here:
  programName: document.location.pathname,
  iCnt: 0,
  inp: [],
  oCnt: 0,
  out: [],
  winLevel: 0,
  // Override defaults by parsed properties and methods
  initComponent: function() {
    vt=this;
    win=vt.applyToObject;
    /*    Ext.apply(vt, {
    out: []
    }); */
    ic.vt5250.superclass.initComponent.call(vt);
    var map=new Ext.KeyMap(document,[
      {
        key: Ext.EventObject.ENTER,
        fn: function(keycode,e) {
          if(Ext.isIE) {
            e.browserEvent.keyCode=0; // Cheat IE to believe that another key was pressed.
          }
          vt.doRoundtrip('ENTER');
          e.stopEvent();
        }
      }
    ]);
  },
  // ------------------------------------------
  // add an input field to the window"
  addInputField: function(t) {
    vt.inp[vt.iCnt++]=vt.applyToObject.add(t);
    //console.log("iCnt: %s", this.iCnt);
  },
  // ------------------------------------------
  // "home made" classes
  doRoundtrip: function(key) {
    if(vt.applyToObject) {
      win=vt.applyToObject;
    }
    // Convert the store record to form object used in ajax
    var parm=new Object();
    for(fx in vt.inp) {
      var f=vt.inp[fx];
      if(typeof (f.getValue)!="undefined") {
        parm['f'+fx]=vt.inp[fx].getValue();
      }
    }
    parm['key']=key;
    Ext.Ajax.request({
      url: vt.programName,
      method: 'POST',
      params: parm,
      success: function(result,request) {
        eval("var scn = "+result.responseText); // materialize the JSON object

        // Handle all f-keys
        var b=0;
        var buttons=new Array();

        buttons[b++]=new Ext.Button({
          text: 'Enter'
          ,handler: function() {
            vt.doRoundtrip('ENTER')
          }
        });

        for(fx in scn.keys) {
          var key=scn.keys[fx];
          buttons[b++]=new Ext.Button({
            text: key.text
            ,handler: function() {
              vt.doRoundtrip(key.value)
            }
          })
        }

        for(fx in vt.inp) {
          win.remove(vt.inp[fx]);
        }
        vt.iCnt=0;
        vt.inp=[];
        for(fx in vt.out) {
          win.remove(vt.out[fx]);
        }
        vt.out=[];
        vt.oCnt=0;

        win.setTitle(scn.title);

        // Handle all input fields
        for(fx in scn.input) {
          var fld=scn.input[fx];
          if(typeof (fld.col)!="undefined") {
            if(win.fireEvent("onBeforeAddInputField",vt,fld,fx)) {
              // Fires before the field are added. Return false to prevent the field from being added!
              var t=new ic.InputField({
                inputField: fld
                ,fieldCounter: fx
              });
              vt.addInputField(t);
            }
          }
        }
        for(fx in scn.output) {
          var fld=scn.output[fx];
          if(typeof (fld.col)!="undefined") {
            col=fld.col;
            lin=fld.lin;
            var dta=new Array();

            j=0;
            for(i=0;i<fld.len;i++) {
              dta[j++]=fld.dta.substr(i,1);
              if(j>=scn.sizeW) {
                addOutputField(lin++,col,dta);
                col=1;
                j=0;
              }
            }
            if(j>0) {
              addOutputField(lin,col,dta);
            }
          }
        }

        win.doLayout();
  
        if(win.findById('focusField')) {
          win.findById('focusField').focus();
        }
      },
      failure: function(result,request) {
        // error .. TODO
      }
    });

    function addOutputField(lin,col,dta) {
      t={
        xtype: 'label',
        x: col*7,
        y: lin*18,
        text: dta.join(""),
        cls: "text"
      };
      vt.out[vt.oCnt++]=win.add(t);
    }
  }
});

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

ic.InputField=Ext.extend(Ext.form.TextField,{
  // defaults goes here:
  inputType: "text",
  convertToUpperCase: false,

  // Override defaults by parsed properties and methods
  initComponent: Ext.form.TextField.prototype.initComponent.createInterceptor(function() {

    fld=this.inputField;
    fieldCounter=this.fieldCounter;

    xs=this.xScale();
    ys=this.yScale();
    border=2*xs; // todo - find the border size

    // Place the field on the form 

    this.x=fld.col*xs;
    // this.y = fld.lin * ys; CRL was here
    this.y=(fld.lin*ys)-3;
    if(fld.col+fld.len<80) {
      len=fld.len;
    } else {
      len=80-fld.col;
    }

    this.width=len*xs+border;
    this.maxLength=fld.len;
    this.value=fld.dta;

    if(fld.ffw&0x0020) { // Uppercase
      this.style="textTransform: uppercase;" // Style to uppercase
      this.convertToUpperCase=true;
    }


    if(fld.atr==0x27) { // Nondisplay act as a Password field
      this.inputType="password";
    }
    if(this.fn) {
      this.fn.call(fld);
    }
    if(fieldCounter==0) {
      this.id='focusField';
    }
  }),

  // ------------------------------------------
  // Override functions from the original class
  getValue: function() {
    var value=Ext.form.TextField.superclass.getValue.call(this);
    if(this.convertToUpperCase) {
      value=value.toUpperCase();
    }
    return value;
  },

  // ------------------------------------------
  // "home made" functions in the class
  xScale: function() {
    var value='x';
    var hiddenLabel=new Ext.form.Label({
      text: value,
      renderTo: document.body,
      hidden: true,
      //css: metadata.css,
      style: this.style
    });
    var v=Ext.util.TextMetrics.createInstance(hiddenLabel.el);
    return v.getWidth(value);
  },
  yScale: function() {
    return 18;
  }

});
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------