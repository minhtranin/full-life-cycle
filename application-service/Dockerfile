FROM node:10-alpine
LABEL maintainer "minhtran.in@outlook.com"
# Set /app as workdir
# ARG=$
WORKDIR /application-service
COPY package*.json ./
RUN npm i -q --no-optional
# ENV NODE_ENV=developer
COPY . .
EXPOSE 8000
CMD ["npm","start"]

