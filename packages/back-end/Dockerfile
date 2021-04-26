FROM node:15

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update && apt-get -y install \
    unoconv \
    ffmpeg \
    imagemagick \
    curl \
    xvfb \
    locales \
    psmisc \
    fonts-opensymbol \
    libreoffice-impress \
    libreoffice \
    libreoffice-writer \
    libreoffice-common \
    libfontconfig \
    ttf-wqy-zenhei \
    hyphen-af \
    hyphen-en-us \
    fonts-dejavu \
    fonts-dejavu-core \
    fonts-dejavu-extra \
    fonts-droid-fallback \
    fonts-dustin \
    fonts-f500 \
    fonts-fanwood \
    fonts-freefont-ttf \
    fonts-liberation \
    fonts-lmodern \
    fonts-lyx \
    fonts-sil-gentium \
    fonts-texgyre \
    fonts-tlwg-purisa \
    fonts-opensymbol \
    fonts-arphic-ukai \
    fonts-arphic-uming \
    fonts-indic \
    ghostscript-x \
    libpng-dev \
    build-essential xorg libssl-dev libxrender-dev wget \
    wkhtmltopdf \
    libemail-outlook-message-perl \
    libemail-localdelivery-perl

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json /app/package.json
RUN yarn

COPY . ./

ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL

ENV PATH /app/node_modules/.bin:$PATH

RUN npx prisma generate

EXPOSE 3500

ENTRYPOINT libreoffice --headless --nologo --nofirststartwizard --accept="socket,host=0.0.0.0,port=8100;urp" & /usr/bin/unoconv --listener --server=0.0.0.0 --port=2002 & yarn start