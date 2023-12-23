FROM node:alpine                  
WORKDIR /app  
COPY package*.json .
RUN npm install -g @nestjs/cli
RUN npm ci
COPY . /app 
CMD ["npm","run","start:dev"]
