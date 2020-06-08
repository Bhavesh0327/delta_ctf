import pyexifinfo as p
from os import walk
import os
f = []
for (dirpath, dirnames, filenames) in walk("rules/"):
    f.extend(filenames)
    break

for filename in f:
    d = p.get_json("rules/"+filename)
    a = (d[0]['SourceFile'])
    b = (d[0]['EXIF:XPosition'])
    c = (d[0]['EXIF:YPosition'])
    os.system('mv rules/'+filename+ ' rules/h'+str(c)+'v'+str(b)+'.jpg')
   
os.system('bash merge.sh')
