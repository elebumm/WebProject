<%@ language="RPGLE" %>
<%
H decedit('0.') datFmt(*USA)
D startRow        C                   1
D maxRows         C                   999
D sqlCmd          S           8192    varying

/free
setContentType('application/json; charset=utf-8');

sqlCmd = ('                                            +
	SELECT title,									+
  	platform,										+
  	language,										+
  	developer,										+
  	publisher,
  	rating,											+
  	genre,											+
  	DECIMAL(price, 4, 2) AS price					+
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
