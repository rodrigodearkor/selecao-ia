FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install

EXPOSE 4200

# RUN npm install --silent
# RUN npm install react-scripts@3.4.1 -g --silent
# RUN npm install && npm cache clean --force --loglevel=error

# COPY . .

# EXPOSE 4200

CMD [ "npm", "start" ]