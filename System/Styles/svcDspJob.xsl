<?xml version="1.0" ?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" >
  <xsl:output method="html" indent="yes"/>
  <xsl:template match="/">
    <html>
      <head>
        <link href="/System/Styles/IceBreak.css" type="text/css" rel="stylesheet" />
        <link rel="stylesheet" type="text/css" href="/System/Skins/IceBreakAdmin/application.css" />
        <script type="text/javascript" src="/System/Scripts/IceCommon.js"></script>
        <script>openHelp('Display joblog', '/help/Display_joblog.htm');</script>
      </head>
      <body>
        <div id="TitlePane">
          <div id="TitlePane-Text">Current server instance joblog</div>
        </div>
        <img src="/System/images/document_info32.gif" alt="Current server instance joblog" class="TitlePaneIcon" />

        <table width="2000">
          <thead>
            <TR>
              <th width="1%">Message ID</th>
              <th width="80%">Description</th>
              <th width="1%">Message type</th>
              <th width="1%">Severity</th>
              <th width="2%">Sending procedure name</th>
              <th width="2%">Sending module name</th>
              <th width="2%">Sending program name</th>
              <th width="2%">Sending library name</th>
              <th width="2%">Sender statement numbers</th>
              <th width="2%">Receiving procedure name</th>
              <th width="2%">Receiving module name</th>
              <th width="2%">Receiving program name</th>
              <th width="2%">Receiving library name</th>
              <th width="2%">Receiver statement numbers</th>
            </TR>
          </thead>
          <xsl:apply-templates select="errors/error"/>
        </table>
      </body>
    </html>
  </xsl:template>

  <xsl:template match="errors/error">
    <tr>
      <td>
        <xsl:value-of select="msgid" />
      </td>
      <td>
        <xsl:value-of select="desc" />
      </td>
      <td>
        <xsl:value-of select="msgtype" />
      </td>
      <td>
        <xsl:value-of select="severity" />
      </td>
      <td>
        <xsl:value-of select="fromproc" />
      </td>
      <td>
        <xsl:value-of select="frommod" />
      </td>
      <td>
        <xsl:value-of select="frompgm" />
      </td>
      <td>
        <xsl:value-of select="fromlib" />
      </td>
      <td>
        <xsl:value-of select="fromstmt" />
      </td>
      <td>
        <xsl:value-of select="topproc" />
      </td>
      <td>
        <xsl:value-of select="tomod" />
      </td>
      <td>
        <xsl:value-of select="topgm" />
      </td>
      <td>
        <xsl:value-of select="tolib" />
      </td>
      <td>
        <xsl:value-of select="tostmt" />
      </td>
    </tr>
  </xsl:template>
</xsl:stylesheet>