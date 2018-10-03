#!/bin/sh

set -e

mkdir -p tmp
cd tmp

filename=Noto-hinted.zip

if [ ! -r $filename ]
then
	wget https://noto-website-2.storage.googleapis.com/pkgs/Noto-hinted.zip
fi

unzip -o *.zip
cp NotoSansSymbols2-Regular.ttf ../public
