#Pull base image
FROM node:16.13.1-alpine3.15
#set working dir 
WORKDIR /src/app 
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install app dependencies 
COPY package.json ./
COPY yarn.lock ./
RUN yarn 

#add application 
COPY . ./
#start app 
CMD ["yarn", "start"]