#/bin/bash

for j in {0..9}
do
	for i in {1..9}
	do
		convert +append rules/h$j\v0.jpg rules/h$j\v$i.jpg rules/h$j\v0.jpg
	done;
done;

for i in {1..9}
do
	convert -append rules/h0v0.jpg rules/h$i\v0.jpg rules/h0v0.jpg
done;
mv rules/h0v0.jpg rules/final.jpg
rm rules/h*
