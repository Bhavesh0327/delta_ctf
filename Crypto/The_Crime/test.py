import os
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from base64 import b64decode,b64encode
from binascii import hexlify,unhexlify

backend = default_backend()
key = b"this is a secret not to revealed"
print(b64encode(key))

iv = bytearray([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16])
print(b64encode(iv))

cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=backend)

encryptor = cipher.encryptor()
msg = b"dctf{it is too late now and go to the dungeon before it is dark}"
ct = encryptor.update(msg) + encryptor.finalize()
cipher_text = hexlify(ct);
print(cipher_text)

# Manipulating the cipher
# new_cipher_text = "ae"
new_cipher_text = cipher_text[0:30]
new_cipher_text = new_cipher_text + "ae"
new_cipher_text = new_cipher_text + cipher_text[32:]
new_ct = unhexlify(new_cipher_text)
print(new_cipher_text)

new_cipher = Cipher(algorithms.AES(key),modes.CBC(iv),backend=backend)

decryptor = new_cipher.decryptor()
print((decryptor.update(new_ct) + decryptor.finalize()))

