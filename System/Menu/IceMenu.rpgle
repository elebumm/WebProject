<%
     d*name++++++++++etdsfrom+++to/l+++idc.keywords+++++++++++++++++++++++++++++comments++++++++++++
     D DDATE           S               D   inz(*sys)
     D                                     datfmt(*USA)
     D TTIME           S               T   inz(*sys)
     D                                     timfmt(*USA)
     D WEBPROFILE      S            512A   varying
     
     D i               s             10i 0

      /free
       if SesGetVar('ICEMENU_LOGGEDIN') <> 'true';
         ReDirect('/');
         SetBreak (*ON);
         return;
       endif;

       if SesGetVar('ICEMENU_LOGINID') <> *blanks;
         WEBPROFILE = SesGetVar('ICEMENU_LOGINID') + '/';
       endif;

       if SesGetVar('ICEMENU_LOADINGMSG') <> *blanks;
          setMarker('ICEMENU_LOADINGMSG':SesGetVar('ICEMENU_LOADINGMSG'));
       else;
          setMarker('ICEMENU_LOADINGMSG':'Loading ...');
       endif;

       if SesGetVar('ICEMENU_VERSION_INFO') <> *blanks;
          setMarker('VERSION_INFO':SesGetVar('ICEMENU_VERSION_INFO'));
       else;
          setMarker('VERSION_INFO':GetServerVar('SERVER_SOFTWARE'));
       endif;                     

       setMarker('ICEMENU_STARTTABURL':SesGetVar('ICEMENU_STARTTABURL'));
       setMarker('ICEMENU_STARTTABNAME':SesGetVar('ICEMENU_STARTTABNAME'));       
       setMarker('ICEMENU_LOADXML':SesGetVar('ICEMENU_LOADXML'));
       setMarker('ICEMENU_XMLLOADERTYPE':
                     SesGetVar('ICEMENU_XMLLOADERTYPE'));
       setMarker('ICEMENU_ROOTNODENAME':'IceBreak Administration');
       setMarker('ICEMENU_ROOTNODEURL':SesGetVar('ICEMENU_ROOTNODEURL'));
    
       if SesGetVar('ICEMENU_TITLE') <> *blanks;
          setMarker('ICEMENU_TITLE': SesGetVar('ICEMENU_TITLE'));
       else;
        setMarker('ICEMENU_TITLE':'IceBreak Console - Logged in as&nbsp;' +
               WEBPROFILE + GetServerVar('SERVER_SESSION_USERID') +
               ' (' + %char(TTIME) + ' ' + %char(DDATE) +')');
       endif;

       if SesGetVar('ICEMENU_HELPDEFAULTSRC') <> *blanks;
        setMarker('ICEMENU_HELPDEFAULTSRC' :
                                  SesGetVar('ICEMENU_HELPDEFAULTSRC'));
       else;
        setMarker('ICEMENU_HELPDEFAULTSRC' : 'about:blank');
       endif;

       setMarker('ICEMENU_HELPDEFAULTNAME' :
                              SesGetVar('ICEMENU_HELPDEFAULTNAME'));


       ResponseWriteTag('./System/Menu/Interface.html' : '*FIRST');
       // Loop header JS
       i = 1;
       dow SesGetVar('ICEMENU_HEADER_JS-' + %char(i)) > '';      
            ResponseWrite('<script type="text/javascript" src="');
            ResponseWrite(SesGetVar('ICEMENU_HEADER_JS-' + %char(i)));
            ResponseWrite('"></script>');
            i = i + 1;
       enddo;
                     
       ResponseWriteTag('./System/Menu/Interface.html':'ICEMENU_PART_1');
       // Loop header CSS
       i = 1;
       dow SesGetVar('ICEMENU_HEADER_CSS-' + %char(i)) <> *BLANKS;
          ResponseWrite('<link rel="stylesheet" type="text/css" href="');
          ResponseWrite(SesGetVar('ICEMENU_HEADER_CSS-' + %char(i)));
          ResponseWrite('"></link>');
          i = i + 1;
       enddo;
       
       ResponseWriteTag('./System/Menu/Interface.html':'ICEMENU_PART_2');
       // Loop content JS
       i = 1;
       dow SesGetVar('ICEMENU_CONTENT_JS-' + %char(i)) <> *BLANKS;
            ResponseWrite('<script type="text/javascript" src="');
            ResponseWrite(SesGetVar('ICEMENU_CONTENT_JS-' + %char(i)));
            ResponseWrite('"></script>');
            i = i + 1;
       enddo;
       
       if SesGetVar('ICEMENU_NORTH') <> *blanks;
        ResponseWriteTag(SesGetVar('ICEMENU_NORTH'):'*FIRST');
       else;
        ResponseWriteTag('./System/Menu/ICEMENU_NORTH.html':'*FIRST');
       endif;
       
       ResponseWriteTag('./System/Menu/Interface.html':'ICEMENU_NORTH');
       
       ResponseWriteTag('./System/Menu/Interface.html':'ICEMENU_PART_3');
       return;
%>
