#!/bin/sh

if [ $1 = --no-error ]
then
	shift 1
else
	set -e
fi

for dir in app functions
do
	(
		cd $dir
		"$@"
	)
done
