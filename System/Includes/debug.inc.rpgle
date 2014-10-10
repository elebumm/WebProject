//------------------------------------------------------------------------------------------
// ERROR LOGGING
//name++++++++++..b...................keywords++++++++++++++++++++++++++comments++++++++++++ 
P Debug           B                   
D Debug           PI
D DebugStr                    1000A   value varying        
D DebugError      S               N 
D DebugCRLF       S              2A   inz(x'0d25')
    
/free  
   if GetServerVar('SERVER_JOB_MODE') = '*DEVELOP';
      DebugError = PutStreamString(
                 GetServerVar('SERVER_ROOT_PATH') +
                '/debug/' + GetServerVar('REQUEST_RESOURCE') + 
                '.txt':'a,codepage=1252':DebugStr + DebugCRLF:*ON); 
   endif;
/end-free   
P Debug           E

//------------------------------------------------------------------------------------------
// CLEAR ERROR LOG
//name++++++++++..b...................keywords++++++++++++++++++++++++++comments++++++++++++ 
P ClearDebug      B                   
D ClearDebug      PI
D ClearStr        S              1A   
    
/free  
   if GetServerVar('SERVER_JOB_MODE') = '*DEVELOP';
      DebugError = PutStreamString(
                GetServerVar('SERVER_ROOT_PATH') +
                '/debug/' + GetServerVar('REQUEST_RESOURCE') + 
                '.txt':'w,codepage=1252':ClearStr:*ON); 
   endif;
/end-free   
P ClearDebug      E