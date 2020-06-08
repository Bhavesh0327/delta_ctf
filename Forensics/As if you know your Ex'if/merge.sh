#/bin/bash

for j in {0..9}
do
	for i in {1..9}
	do
		convert +append pieces/h$j\v0.jpg pieces/h$j\v$i.jpg pieces/h$j\v0.jpg
	done;
done;

for i in {1..9}
do
	convert -append pieces/h0v0.jpg pieces/h$i\v0.jpg pieces/h0v0.jpg
done;
mv pieces/h0v0.jpg pieces/final.jpg
rm pieces/h*
