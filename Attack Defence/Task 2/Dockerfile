FROM ubuntu

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update
RUN useradd seeker -m -s /bin/bash
RUN echo seeker:password | chpasswd

WORKDIR /home/seeker
RUN mkdir Desktop Documents Downloads Music Pictures Templates Videos

RUN apt-get install -y cowsay
RUN apt-get install -y fortune

RUN ln -s /usr/games/cowsay /usr/bin/cowsay
RUN ln -s /usr/games/fortune /usr/bin/fortune

RUN echo "alias jigglypuff='command cd'" >> .bashrc
RUN echo "alias gyarados='command ls'" >> .bashrc

RUN echo "alias find='fortune -s | cowsay -f stegosaurus'" >> .bashrc
RUN echo "alias delete='fortune -s | cowsay -f stegosaurus'" >> .bashrc
RUN echo "alias rm='fortune -s | cowsay -f stegosaurus'" >> .bashrc
RUN echo "alias rmdir='fortune -s | cowsay -f stegosaurus'" >> .bashrc
RUN echo "alias touch='fortune -s | cowsay -f stegosaurus'" >> .bashrc
RUN echo "alias cp='fortune -s | cowsay -f stegosaurus'" >> .bashrc
RUN echo "alias mv='fortune -s | cowsay -f stegosaurus'" >> .bashrc
RUN echo "alias cd='fortune -s | cowsay -f stegosaurus'" >> .bashrc
RUN echo "alias ls='fortune -s | cowsay -f stegosaurus'" >> .bashrc

COPY QR.png /etc/apt/sources.list.d/flag.png

RUN apt-get install -y ssh
ENTRYPOINT /bin/bash