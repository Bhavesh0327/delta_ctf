#!/bin/bash

startDir='/'
maxPathRange=10
endPath=$startDir

for (( j=1; j<=100; j++ )); do 
for (( i=1; i<=$((1 + RANDOM % $maxPathRange)); i++ )); do
    directory=$(find "$endPath" -maxdepth 1 -type d ! -path "$endPath" -printf "%f\n" | sort -R | head -n 1) 
    if [[ -z $directory ]]; then break; fi
    endPath=$endPath/$directory
done <<< "$directory"
cd "$endPath" && pwd
cp /home/seeker/Fake.png flag.png
endPath=$startDir
done

for (( i=1; i<=$((1 + RANDOM % $maxPathRange)); i++ )); do
    directory=$(find "$endPath" -maxdepth 1 -type d ! -path "$endPath" -printf "%f\n" | sort -R | head -n 1) 
    if [[ -z $directory ]]; then break; fi
    endPath=$endPath/$directory
done <<< "$directory"
cd "$endPath" && pwd
cp /home/seeker/QR.png flag.png
