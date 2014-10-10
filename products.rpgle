<%@ language="RPGLE" %>
<%
D startRow       	C           	1
D maxRows         C           	999
D sqlCmd          S      8192 	varying

/free

SetContentType('application/json; charset=utf-8');

sqlCmd = ('                    		+
	SELECT product_id,							+				 
		title,												+
  	platform,											+
  	glanguage,										+
  	developer,										+
  	publisher,										+
  	rating,												+
  	genre,												+
  	price													+
  FROM products										+
  FOR READ ONLY										+
');

SQL_Execute(
	I_EXTJSMETA:
		sqlcmd:
		maxRows:
		startRow
);

*INLR = *ON;
return;
%>
