#! /bin/bash

# ------------------------------------------------------------------------------------------
# This is a Bash shell script to convert word docs into pdfs. It uses a command line tool called Antiword to read the Word document 
# - and output it to postscript.
# Then it uses ghostscript to convert it to pdf. It also checks the folder every 60 seconds to see if a new file has been added and processes it.
# It's not perfect but mostly works well. Obviously you need to install Antiword and Ghostscript and make sure they are in you Path variable.
# - 100% Microsoft and Adobe free:# Loop through directory (and subdirectorys) and scan/replace string
# Parameter 1: $1 = directory eg. /www/sourcefiles
# Parameter 2: $2 = scan/replace sgtring eg. John ----> Jane
# calling example: /www/systest/system/shell/doc2pdf.sh /www/sourcefiles s/John/Jane/g'
# ------------------------------------------------------------------------------------------

while ((1));
do
	for docfile in *.doc;
	do
		antiword -i O -p letter $docfile | pstopdf -i -o ${docfile%.+([!/])}.pdf;
		rm $docfile
	done
	sleep 60;
done
