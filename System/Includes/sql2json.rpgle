        //------------------------------------------------------------------------------------------
        // Builds a dynamic where clause
        //name++++++++++..b...................keywords++++++++++++++++++++++++++comments++++++++++++
     P Sql2Json        B
     D Sql2Json        PI
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
           ResponseWrite('{"totalrows":"'+%char(Rows)+'","rows":[');
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

          JsonNode = JsonNode + %xlate(JsonUp:JsonLo:sqlvar.sqlname)
                      + ':"' + EncodeJsonStr(CellValue) + '"';

         if (col = cols);
           ResponseWrite(JsonNode + '}');
           JsonNode = '';
           JsonTotal = JsonTotal + 1;
         else;
           JsonNode = JsonNode + ',';
         endif;

       elseif (row = -1 AND JsonSuppress <> *ON);
         ResponseWrite(']}');
       endif;

       /end-free
     P Sql2Json        E
