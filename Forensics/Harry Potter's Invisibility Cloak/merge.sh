#/bin/bash

for j in {0..9}
do
	for i in {1..19}
	do
		convert +append h-$j\v-0.jpg h-$j\v-$i.jpg h-$j\v-0.jpg
	done;
done;

for i in {1..9}
do
	convert -append h-0v-0.jpg h-$i\v-0.jpg h-0v-0.jpg
done;
mv h-0v-0.jpg final.jpg
