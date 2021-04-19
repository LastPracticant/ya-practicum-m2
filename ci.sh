#!/bin/bash

# ----
# Manual deploy - пример на случай, если потребуется делать deploy вручную
# ----
# docker build -t cr.yandex/crpasb6c8g98nppq2f2v/lp-app:v$1 .
# docker push cr.yandex/crpasb6c8g98nppq2f2v/lp-app:v$1
# ----
# docker build -t lp-app .
# docker tag lp-app cr.yandex/crpasb6c8g98nppq2f2v/lp-app:v$1
# docker push cr.yandex/crpasb6c8g98nppq2f2v/lp-app:v$1
# ----
# ssh yacloud
# docker stop $(docker ps -a -q)
# docker rm $(docker ps -a -q)
# docker rmi $(docker images -q)
# docker pull cr.yandex/crpasb6c8g98nppq2f2v/lp-app:v1
# ----
# docker run -p 8066:5000 -d \ 
# -v ~/.postgresql/:/var/www/cert \ 
# --name lp-app \
# -e POSTGRES_USERNAME='postgres1' \
# -e POSTGRES_PASSWORD='postgres1' \
# -e POSTGRES_DATABASE='postgres1' \
# cr.yandex/crpasb6c8g98nppq2f2v/lp-app:v1

echo "--------- All is done! ---------"

read

