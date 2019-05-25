FROM node:10
WORKDIR /app
COPY . /app
RUN rm -rf /app/node_modules
RUN npm install -g yarn
RUN yarn install --production
