#!/bin/sh

set -e

for dir in app functions
do
	(
		cd $dir
		"$@"
	)
done
