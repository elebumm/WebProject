        //------------------------------------------------------------------------------------------
        // Builds a dynamic where clause
        //name++++++++++..b...................keywords++++++++++++++++++++++++++comments++++++++++++
     P Sql2JsonTree    B
     D Sql2JsonTree    PI
     d  CellValue                  4096    varying
     d  Row                          10i 0 value
     d  Rows                         10i 0 value
     d  Col                          10i 0 value
     d  Cols                         10i 0 value
     d  SqlVar                             likeds(I_sqlvar)
     D CellVal         S           8098A   varying

       /free

       if (row = 0);
         if (col = 1 AND JsonSuppress <> *ON);
           ResponseWrite('[');
         endif;

       elseif (row > 0);
         if JsonSuppress = *ON AND JsonTotal > 0 AND
           row = 1 AND col = 1;
           ResponseWrite(',');
         endif;

         if (col = 1);
           if (row > 1);
              JsonNode = JsonNode + ',';
           endif;
              JsonNode = JsonNode + '{';
         endif;

         if sqlvar.sqlname = 'XMLSRC' AND CellValue <> '*DEFAULT';
            JsonXmlSrc = *ON;
         elseif sqlvar.sqlname = 'CHILDREN';
           if num(CellValue) > 0;
             JsonChild = *ON;
           endif;
         elseif sqlvar.sqlname = 'ID';
          JsonNode = JsonNode + %xlate(up:lo:sqlvar.sqlname)
                      + ':"' + EncodeJsonStr(CellValue) + '"';
          JsonNode = JsonNode + ',rid: "' +
                      EncodeJsonStr(CellValue) + '"';
         elseif sqlvar.sqlname = 'ICON';
          JsonNode = JsonNode + %xlate(up:lo:sqlvar.sqlname)+ ':"'
                +'/images/tree/' + EncodeJsonStr(CellValue) + '"';
         else;
          JsonNode = JsonNode + %xlate(up:lo:sqlvar.sqlname)
                      + ':"' + EncodeJsonStr(CellValue) + '"';
         endif;



         if (col = cols);
           if JsonXmlSrc = *ON OR JsonChild = *ON;
             JsonNode = JsonNode + 'leaf:false, cls:''folder''';
           else;
             JsonNode = JsonNode + 'leaf:true, cls:''file''';
           endif;

           ResponseWrite(JsonNode + '}');
           JsonNode = '';
           JsonTotal = JsonTotal + 1;
           JsonChild = *OFF;
           JsonXmlSrc = *OFF;
         else;
           JsonNode = JsonNode + ',';
         endif;

       elseif (row = -1 AND JsonSuppress <> *ON);
         ResponseWrite(']');
       endif;

       /end-free
     P Sql2JsonTree    E
