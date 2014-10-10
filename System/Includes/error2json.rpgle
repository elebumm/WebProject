     P WriteJsonError  B
     D WriteJsonError  PI
     D  JsonMarker                 4096    value varying
       /free
        if JsonError = *ON;
            ResponseWrite(',');
        else;
            ResponseWriteTag(JsonFile : 'error-start');
        endif;

        ResponseWriteTag(JsonFile : JsonMarker);

        JsonError = *ON;
       /end-free
     P WriteJsonError  E


     P EndJsonError    B
     D EndJsonError    PI
       /free

        if JsonError = *ON;
           ResponseWriteTag(JsonFile : 'error-end');
         endif;

        JsonError = *OFF;
       /end-free
     P EndJsonError    E

     P MonitorSQL      B
     D SQL_STATE_OK    C                   Const('00000')
     D SQL_NO_ROW      C                   Const('02000')
     D                 DS
     D MsgID                         50A   Varying

      /free
       Select;
         When sqlState = SQL_STATE_OK;
           ResponseWriteTag(JsonFile: 'json-success');
         Other;
           setMarker('sqlState' : sqlState);
           WriteJsonError('error-sql-error');
       EndSL;
      /end-free
     P MonitorSQL      E
