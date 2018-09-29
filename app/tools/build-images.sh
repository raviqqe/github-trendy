#!/bin/sh

for size in 16 32 128 144 152 512
do
  inkscape --export-width $size --export-height $size \
           --export-png public/icon-$size.png \
           public/icon.svg
done
