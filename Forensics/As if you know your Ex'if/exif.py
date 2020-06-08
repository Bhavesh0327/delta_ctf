import pyexifinfo as p
from os import walk
import os
f = []
for (dirpath, dirnames, filenames) in walk("pieces/"):
    f.extend(filenames)
    break

for filename in f:
    d = p.get_json("pieces/"+filename)
    a = (d[0]['SourceFile'])
    b = (d[0]['EXIF:XPosition'])
    c = (d[0]['EXIF:YPosition'])
    os.system('mv pieces/'+filename+ ' pieces/h'+str(c)+'v'+str(b)+'.jpg')
   
os.system('bash merge.sh')
