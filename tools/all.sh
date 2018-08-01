#!/bin/sh

set -e

for dir in ssr functions
do
	(
		cd $dir
		"$@"
	)
done
