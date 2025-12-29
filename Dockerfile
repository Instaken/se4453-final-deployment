FROM node:20

RUN mkdir /code
WORKDIR /code
COPY package*.json /code/
RUN npm install --production --no-cache && npm cache clean --force
COPY . /code/

# SSH
RUN apt-get update \
    && apt-get install -y --no-install-recommends dialog \
    && apt-get update \
    && apt-get install -y --no-install-recommends openssh-server \
    && mkdir -p /run/sshd \
    && rm -rf /var/lib/apt/lists/*

COPY sshd_config /etc/ssh/
COPY init.sh /usr/local/bin/

RUN chmod u+x /usr/local/bin/init.sh
EXPOSE 8080 2222

ENTRYPOINT ["init.sh"]