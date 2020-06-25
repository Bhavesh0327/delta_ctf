To solve this question it is essential to understand the working of AES decryption

in the decryption step the previous block of cipher is used and for that first block the iv is used

https connections are considered realatively safe cause it is tough to forge the tls signature so the key and the algorithm used should be correct

so the http message this has high chance of being changed or manipulated so as iv and the cipher is send in the message we should assume they are maipulated.

Now, how will I know what is manipulated?

-> First decrypt it normally with the algorithm,iv,key,cipher given you would get a 64-bit message
-> AES uses 16-byte block to decrypt and from 32-bytes onwards the message looks fine this is a indication that the cipher has been manipulated only in the first block(as manipulating the second block will lead to weird message in the third block)
-> Now look at the last byte of the second block it is the only letter in that block which doesn't fit in the message it will probably look like '?' this means that in the cipher's first block's last byte there has been a bit flipping attack.
-> Brute-force that 1 byte which is just 2^8 combinations and one for one combination the first block and the second block message will make sense with which you have found the flag.Yay!.

Now if you are probably wondering the IV could have been changed right?

-> Yes the IV could have been changed as it was send through http but the fact that when we found the right byte in the second block's last byte and it gives a sensible message in the first message in the first block it ensures that iv has not been manipulated
