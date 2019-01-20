FROM node:10.0.0
MAINTAINER Nicolas Agustin <nicolastrres@gmail.com>

ENV APP /enabler
WORKDIR $APP

COPY package.json      $APP
COPY yarn.lock         $APP
RUN yarn install --pure-lockfile

COPY bin                $APP/bin
COPY controllers        $APP/controllers
COPY database           $APP/database
COPY repositories       $APP/repositories
COPY routes             $APP/routes
COPY app.js             $APP
COPY constants.js       $APP
COPY platformsh.js      $APP

COPY tests              $APP/tests
COPY .eslintrc.yml       $APP

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && yarn start