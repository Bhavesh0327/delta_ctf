from base64 import b64encode

def rotate(cipher):
    return "".join([chr(ord(ch)+50) for ch in cipher])

def padding(cipher):
    length = 50
    padding_length = 50 - (len(cipher)%50)
    return cipher+"".join(['1' for i in range(padding_length)])

print(b64encode(padding(rotate("dctf{The_Sky_Is_Blue}"))))
