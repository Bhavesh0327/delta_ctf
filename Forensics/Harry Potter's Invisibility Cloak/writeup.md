# Delta CTF 2020: Harry Potter and the Invisibility Cloak.


> Find and submit the {flag}
>
> (./file/chall.zip)

## Write-up

1. You are given a normal zip file "chall.zip" which has a folder named "horcruxes". This folder has 200 random images inside it.

```bash
$ ls horcruxes/
h-0v-0.jpg   h-2v-0.jpg   h-4v-0.jpg   h-6v-0.jpg   h-8v-0.jpg
h-0v-10.jpg  h-2v-10.jpg  h-4v-10.jpg  h-6v-10.jpg  h-8v-10.jpg
h-0v-11.jpg  h-2v-11.jpg  h-4v-11.jpg  h-6v-11.jpg  h-8v-11.jpg
h-0v-12.jpg  h-2v-12.jpg  h-4v-12.jpg  h-6v-12.jpg  h-8v-12.jpg
h-0v-13.jpg  h-2v-13.jpg  h-4v-13.jpg  h-6v-13.jpg  h-8v-13.jpg
h-0v-14.jpg  h-2v-14.jpg  h-4v-14.jpg  h-6v-14.jpg  h-8v-14.jpg
h-0v-15.jpg  h-2v-15.jpg  h-4v-15.jpg  h-6v-15.jpg  h-8v-15.jpg
h-0v-16.jpg  h-2v-16.jpg  h-4v-16.jpg  h-6v-16.jpg  h-8v-16.jpg
h-0v-17.jpg  h-2v-17.jpg  h-4v-17.jpg  h-6v-17.jpg  h-8v-17.jpg
h-0v-18.jpg  h-2v-18.jpg  h-4v-18.jpg  h-6v-18.jpg  h-8v-18.jpg
h-0v-19.jpg  h-2v-19.jpg  h-4v-19.jpg  h-6v-19.jpg  h-8v-19.jpg
h-0v-1.jpg   h-2v-1.jpg   h-4v-1.jpg   h-6v-1.jpg   h-8v-1.jpg
h-0v-2.jpg   h-2v-2.jpg   h-4v-2.jpg   h-6v-2.jpg   h-8v-2.jpg
h-0v-3.jpg   h-2v-3.jpg   h-4v-3.jpg   h-6v-3.jpg   h-8v-3.jpg
h-0v-4.jpg   h-2v-4.jpg   h-4v-4.jpg   h-6v-4.jpg   h-8v-4.jpg
h-0v-5.jpg   h-2v-5.jpg   h-4v-5.jpg   h-6v-5.jpg   h-8v-5.jpg
h-0v-6.jpg   h-2v-6.jpg   h-4v-6.jpg   h-6v-6.jpg   h-8v-6.jpg
h-0v-7.jpg   h-2v-7.jpg   h-4v-7.jpg   h-6v-7.jpg   h-8v-7.jpg
h-0v-8.jpg   h-2v-8.jpg   h-4v-8.jpg   h-6v-8.jpg   h-8v-8.jpg
h-0v-9.jpg   h-2v-9.jpg   h-4v-9.jpg   h-6v-9.jpg   h-8v-9.jpg
h-1v-0.jpg   h-3v-0.jpg   h-5v-0.jpg   h-7v-0.jpg   h-9v-0.jpg
h-1v-10.jpg  h-3v-10.jpg  h-5v-10.jpg  h-7v-10.jpg  h-9v-10.jpg
h-1v-11.jpg  h-3v-11.jpg  h-5v-11.jpg  h-7v-11.jpg  h-9v-11.jpg
h-1v-12.jpg  h-3v-12.jpg  h-5v-12.jpg  h-7v-12.jpg  h-9v-12.jpg
h-1v-13.jpg  h-3v-13.jpg  h-5v-13.jpg  h-7v-13.jpg  h-9v-13.jpg
h-1v-14.jpg  h-3v-14.jpg  h-5v-14.jpg  h-7v-14.jpg  h-9v-14.jpg
h-1v-15.jpg  h-3v-15.jpg  h-5v-15.jpg  h-7v-15.jpg  h-9v-15.jpg
h-1v-16.jpg  h-3v-16.jpg  h-5v-16.jpg  h-7v-16.jpg  h-9v-16.jpg
h-1v-17.jpg  h-3v-17.jpg  h-5v-17.jpg  h-7v-17.jpg  h-9v-17.jpg
h-1v-18.jpg  h-3v-18.jpg  h-5v-18.jpg  h-7v-18.jpg  h-9v-18.jpg
h-1v-19.jpg  h-3v-19.jpg  h-5v-19.jpg  h-7v-19.jpg  h-9v-19.jpg
h-1v-1.jpg   h-3v-1.jpg   h-5v-1.jpg   h-7v-1.jpg   h-9v-1.jpg
h-1v-2.jpg   h-3v-2.jpg   h-5v-2.jpg   h-7v-2.jpg   h-9v-2.jpg
h-1v-3.jpg   h-3v-3.jpg   h-5v-3.jpg   h-7v-3.jpg   h-9v-3.jpg
h-1v-4.jpg   h-3v-4.jpg   h-5v-4.jpg   h-7v-4.jpg   h-9v-4.jpg
h-1v-5.jpg   h-3v-5.jpg   h-5v-5.jpg   h-7v-5.jpg   h-9v-5.jpg
h-1v-6.jpg   h-3v-6.jpg   h-5v-6.jpg   h-7v-6.jpg   h-9v-6.jpg
h-1v-7.jpg   h-3v-7.jpg   h-5v-7.jpg   h-7v-7.jpg   h-9v-7.jpg
h-1v-8.jpg   h-3v-8.jpg   h-5v-8.jpg   h-7v-8.jpg   h-9v-8.jpg
h-1v-9.jpg   h-3v-9.jpg   h-5v-9.jpg   h-7v-9.jpg   h-9v-9.jpg
```
Each image has some useless picture.
Notice that each image's name has 2 values i.e. 'h' and 'v', giving horizontal and vertical value of each part. That means these are chunks of a bigger image broken into pieces.

2. Now we need to find a method to combine these images to form the final image. You can use image magick to do this. I combined all the commands in 'merge.sh' file. Just run the bash script to combine the images into a final image.

3. Unfortunately it is not the flag. Although it says "ls -a" is the magic spell u need. Actually your flag is hidden in the same folder named '.h-10v-20.txt', not visible directly because it is a hidden file. This txt file has the flag 

dctf{h@rry_p011er_@nd_1he_sys1em_@dm!n!s1r@10r}

