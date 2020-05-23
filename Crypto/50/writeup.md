By the look of the cipher one can easily say it is a base64 cipher from the "=" padding, so the first step would be to decode that.
Then you would see a bunch a gibberish with some 1111.. at the end, this means the cipher is padded the repeating 1s is the padding for the cipher, so the second step would be to remove the padding
Then you would see a another bunch of gibberish from the name of the question which is "50" we could guess that the characters ASCII values are shited by 50. On Reversing it back you will get the flag.
