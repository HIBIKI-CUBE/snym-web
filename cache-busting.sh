#!/bin/sh
#This script works on BSD systems.

for i in $(cat ./cache-busting_targets.txt)
do
  echo $i"\n"$(grep $i index.html|awk '{match($0, /h=[a-zA-Z0-9]{6}/);print substr($0, RSTART, RLENGTH)}')"\n> "$(sha256sum $i|awk '{print substr($1, 0, 6)}')"\n"
  sed -i '' "s/$(grep $i index.html|awk '{match($0, /h=[a-zA-Z0-9]{6}/);print substr($0, RSTART, RLENGTH)}')/h=$(sha256sum $i|awk '{print substr($1, 0, 6)}')/g" index.html
done