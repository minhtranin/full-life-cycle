`🔥 description: Web application as a feeds reader. the app can read feed from multiple sources and store them to database. You can need to fetch from these sources`
``` shell
    https://feedforall.com/sample-feed.xml
    https://feedforall.com/sample.xml
    http://feeds.washingtonpost.com/rss/rss_act-four
    http://feeds.washingtonpost.com/rss/rss_powerpost
```
## Prepare
* Docker Engine release greater than or equal 1.13.0+ (docker-compose 3.0)
## Install
* Get Source Code
``` shell
mkdir ~/workspace
cd ~/workspace
git clone https://github.com/minhtranin/gnvproject.git
```
* grant permission execute these file sh script (optional)
``` shell
sudo chmod +x -R ./gnvproject
```
* start setup enviroment
``` shell
cd ~/workspace/gnvproject
./start.sh
```
* waiting for the image is built finish. Check it on `http://localhost:8888/`. Later run a command which acceppt the feed urls (separated by comma) as argument to grab items from above urls
* the output defined at `~/workspace/gnvproject/application-service/application.log` or command line
``` shell
    ./loaddb.sh https://feedforall.com/sample-feed.xml,https://feedforall.com/sample.xml,http://feeds.washingtonpost.com/rss/rss_act-four,http://feeds.washingtonpost.com/rss/rss_powerpost
```
    OR
``` shell
    ./loaddb.sh https://feedforall.com/sample-feed.xml, https://feedforall.com/sample.xml
```
* at directory gnvproject run test case
``` shell
    ./test.sh
```
## How to use?
* access url `http://localhost:8888/` to get, create, update, delete item
## License
MIT © minhtranin
