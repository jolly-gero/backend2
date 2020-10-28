FROM node:12

# Create app directory
# RUN mkdir -p /usr/src/app
ADD / app
WORKDIR /app

# COPY package.json /usr/src/app
RUN npm install

# COPY . /usr/local/src/controlpane-back

EXPOSE 4000

CMD ["node","BackCTP.js"]