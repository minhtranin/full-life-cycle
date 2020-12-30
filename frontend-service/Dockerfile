FROM node:10 as builder
LABEL maintainer="minhtran.in@outlook.com"
ENV TZ=Asia/Saigon
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
WORKDIR /frontend-service
COPY package*.json ./

RUN npm install --no-optional

# production
COPY . .

RUN npm run build

FROM nginx:1.17.1-alpine-perl
RUN apk add bash

WORKDIR /frontend-service
COPY --from=builder /frontend-service/docker_start.sh .
COPY --from=builder /frontend-service/dist ./dist
COPY --from=builder /frontend-service/docker/config-nginx.conf /etc/nginx/conf.d/config-nginx.conf

EXPOSE 80
CMD ["bash", "./docker_start.sh"]

