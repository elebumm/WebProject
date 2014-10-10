/*
 * Ext JS Library 1.1.1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://www.extjs.com/license
 */

Ext.UpdateManager.defaults.indicatorText="<div class=\"loading-indicator\">Nahrávam...</div>";if(Ext.View){Ext.View.prototype.emptyText=""}if(Ext.grid.Grid){Ext.grid.Grid.prototype.ddText="{0} oznaèených riadkov"}if(Ext.TabPanelItem){Ext.TabPanelItem.prototype.closeText="Zavrie�? túto záloku"}if(Ext.form.Field){Ext.form.Field.prototype.invalidText="Hodnota v tomto poli je nesprávna"}if(Ext.LoadMask){Ext.LoadMask.prototype.msg="Nahrávam..."}Date.monthNames=["Január","Február","Marec","Apr�l","Máj","Jún","Júl","August","September","Október","November","December"];Date.dayNames=["NedeŸa","Pondelok","Utorok","Streda","tvrtok","Piatok","Sobota"];if(Ext.MessageBox){Ext.MessageBox.buttonText={ok:"OK",cancel:"Zrui�?",yes:"�?no",no:"Nie"}}if(Ext.util.Format){Ext.util.Format.date=function(A,B){if(!A){return""}if(!(A instanceof Date)){A=new Date(Date.parse(A))}return A.dateFormat(B||"m/d/R")}}if(Ext.DatePicker){Ext.apply(Ext.DatePicker.prototype,{todayText:"Dnes",minText:"Tento dátum je men� ako minimálny moný dátum",maxText:"Tento dátum je väè� ako maximálny moný dátum",disabledDaysText:"",disabledDatesText:"",monthNames:Date.monthNames,dayNames:Date.dayNames,nextText:"�?al� Mesiac (Control+Doprava)",prevText:"Predch. Mesiac (Control+DoŸava)",monthYearText:"Vyberte Mesiac (Control+Hore/Dole pre posun rokov)",todayTip:"{0} (Medzern�k)",format:"m/d/r"})}if(Ext.PagingToolbar){Ext.apply(Ext.PagingToolbar.prototype,{beforePageText:"Strana",afterPageText:"z {0}",firstText:"Prvá Strana",prevText:"Predch. Strana",nextText:"�?alia Strana",lastText:"Posledná strana",refreshText:"Obnovi�?",displayMsg:"Zobrazujem {0} - {1} z {2}",emptyMsg:"iadne dáta"})}if(Ext.form.TextField){Ext.apply(Ext.form.TextField.prototype,{minLengthText:"Minimálna dåka pre toto pole je {0}",maxLengthText:"Maximálna dåka pre toto pole je {0}",blankText:"Toto pole je povinné",regexText:"",emptyText:null})}if(Ext.form.NumberField){Ext.apply(Ext.form.NumberField.prototype,{minText:"Minimálna hodnota pre toto pole je {0}",maxText:"Maximálna hodnota pre toto pole je {0}",nanText:"{0} je nesprávne è�slo"})}if(Ext.form.DateField){Ext.apply(Ext.form.DateField.prototype,{disabledDaysText:"Zablokované",disabledDatesText:"Zablokované",minText:"Dátum v tomto poli mus� by�? a po {0}",maxText:"Dátum v tomto poli mus� by�? pred {0}",invalidText:"{0} nie je správny dátum - mus� by�? vo formáte {1}",format:"m/d/r"})}if(Ext.form.ComboBox){Ext.apply(Ext.form.ComboBox.prototype,{loadingText:"Nahrávam...",valueNotFoundText:undefined})}if(Ext.form.VTypes){Ext.apply(Ext.form.VTypes,{emailText:"Toto pole mus� by�? e-mailová adresa vo formáte \"user@domain.com\"",urlText:"Toto pole mus� by�? URL vo formáte \"http:/"+"/www.domain.com\"",alphaText:"Toto poŸe moe obsahova�? iba p�smená a znak _",alphanumText:"Toto poŸe moe obsahova�? iba p�smená,è�sla a znak _"})}if(Ext.grid.GridView){Ext.apply(Ext.grid.GridView.prototype,{sortAscText:"Zoradi�? vzostupne",sortDescText:"Zoradi�? zostupne",lockText:"Zamknú�? ståpec",unlockText:"Odomknú�? stŸpec",columnsText:"Ståpce"})}if(Ext.grid.PropertyColumnModel){Ext.apply(Ext.grid.PropertyColumnModel.prototype,{nameText:"Názov",valueText:"Hodnota",dateFormat:"m/j/Y"})}if(Ext.SplitLayoutRegion){Ext.apply(Ext.SplitLayoutRegion.prototype,{splitTip:"Potiahnite pre zmenu rozmeru",collapsibleSplitTip:"Potiahnite pre zmenu rozmeru. Dvojklikom schováte."})};