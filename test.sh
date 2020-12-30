set -x
# docker container exec -it application-service -e DB_DATABASE=feedstest
# docker container exec application-service npx mocha
# docker container exec -it application-service -e DB_DATABASE=feeds

docker exec -ti application-service sh -c "npx mocha"