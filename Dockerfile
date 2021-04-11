FROM alpine

RUN apk add --update nodejs npm

WORKDIR /var/www

COPY package*.json ./
RUN npm install

COPY ./utils/wait-for.sh wait-for.sh
RUN chmod +x wait-for.sh

COPY . .

RUN npm run build

EXPOSE 5000

# TODO: если останется время, сделать раздел "Обратная связь", 
# в таком случае будет подкючен Mongo, старт сервиса будет перенесен
# в docker-compose.yaml, в сервис lp-app нужно будет добавить команду:
# command: ./wait-for.sh mongo:27017 -- npm run heroku-start
CMD npm run heroku-start