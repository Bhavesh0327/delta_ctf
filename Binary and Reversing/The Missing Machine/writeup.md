# Delta CTF 2020: The Missing Machine.


> Find and submit the {flag}
>
> (./file/device)

## Write-up

1. You are given an executable file called `device`. When we try running the executable, we get the output as follows.

```bash
$ ./device
Welcome. Enter password to continue: password 
Access denied.
```

The binary appears to prompt for a password denies access if the given password is incorrect.

2. Using the command `ltrace`, we can trace the function calls that are being made in the executable.

```bash
$ ltrace ./device
printf("Welcome. Enter password to conti"...)                                             = 37
__isoc99_scanf(0x55b3f5644056, 0x7ffea3f30250, 0x7f430ef4bb80, 0Welcome. Enter password to continue: password
)                         = 1
strlen("password")                                                                        = 8
MD5(0x7ffea3f30250, 8, 0x7ffea3f30210, 8)                                                 = 0x7ffea3f30210
sprintf("5f", "%02x", 0x5f)                                                               = 2
strcmp("5f4dcc3b5aa765d61d8327deb882cf99"..., "17fb48bc8ea592166a5664d6d58b740b"...)      = 4
putchar(10, 0, 0x7f430ef4bb80, 0Access denied.
)                                                         = 10
+++ exited (status 0) +++
```

The binary calls a function called MD5, and compares two long strings of random characters. Hence, we can deduce that the program is comparing the input with a hash value.

3. Reversing the hash value `17fb48bc8ea592166a5664d6d58b740b` with any online MD5 hash reversing tool, we get that the password is `larceny`. Entering this password in the binary,

```bash
$ ltrace ./device
printf("Welcome. Enter password to conti"...)                                             = 37
__isoc99_scanf(0x560afee74056, 0x7ffcf7df6670, 0x7efec775fb80, 0Welcome. Enter password to continue: larceny
)                         = 1
strlen("larceny")                                                                         = 7
MD5(0x7ffcf7df6670, 7, 0x7ffcf7df6630, 7)                                                 = 0x7ffcf7df6630
sprintf("17", "%02x", 0x17)                                                               = 2
strcmp("17fb48bc8ea592166a5664d6d58b740b"..., "17fb48bc8ea592166a5664d6d58b740b"...)      = 0
system("cat flag.txt"cat: flag.txt: No such file or directory
 <no return ...>
--- SIGCHLD (Child exited) ---
<... system resumed> )                                                                    = 256
putchar(10, 0x7ffcf7df62f0, 0, 0
)                                                         = 10
+++ exited (status 0) +++
```

The binary makes a system call to print the contents of a file called `flag.txt`.

4. When entering this password on the server, we get the output as follows.

```bash
Welcome. Enter password to continue: larceny
dctf{s3nd_b3tt3r_th13v3s_n3xt_t1m3}
```

Therefore, we find that the flag is dctf{s3nd_b3tt3r_th13v3s_n3xt_t1m3}.
