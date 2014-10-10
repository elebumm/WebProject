<%
d
d bool            s               n                                        indicator field
d pXml            s               *

/free
  pXml = reqXmlPtr();
  type = reqXmlGteValue('/debug/event@type'); 
  select;
    when type = 'ADDBREAKPOINT';
      QteAddBreakpoint();
    when type = 'RemoveBreakpoint'
      QteRemoveBreakpoint();
    when type = 'RemoveAllBreakpoints';
      QteRemoveAllBreakpoints();
    when type = 'Step';
      QteStep();
  end    
  
%><debug><event type="ok"/></debug><%
return;

Begsr StartDebugger;
  
  vQteStartSourceDebug("*LIBL     DBGREQ     ": apierr);
  
  
EndSr;

Begsr EndDebugger;
  QteEndSourceDebug(apierr);
EndSr;


/*'





*/