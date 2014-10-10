#!/bin/sh

# ------------------------------------------------------------------------------------------
# Loop through directory (and subdirectorys) and scan/replace string
# Parameter 1: $1 = directory eg. /www/sourcefiles
# Parameter 2: $2 = scan/replace sgtring eg. John ----> Jane
# Palling example: /www/systest/system/shell/replace.sh /www/sourcefiles s/John/Jane/g'
# ------------------------------------------------------------------------------------------

r1() {
  SOURCE_DIR=$1
  for d in $SOURCE_DIR/*; do
    if [ -d $d ]; then
      r1 $d $2 
    else
      echo $d
				CONTENTS=$(cat "$d" | sed $2)
				echo "$CONTENTS" > $d
    fi
  done
}
echo $2
r1 $1 $2
   