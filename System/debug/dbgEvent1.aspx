<%
/include qasphdr,posix

d i               s             10i 0
/free
setChunked(4096); 
for i = 1 to 10;
  %>Trace <%= %char(%timestamp()) %>
  <%
  responseFlush();
  sleep(1);
endfor; 
return;