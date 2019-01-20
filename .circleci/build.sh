set -e

docker login -u ${DOCKER_USER} -p ${DOCKER_PASS}
docker build . -t nicolastrres/enabler:${CIRCLE_SHA1}
docker push nicolastrres/enabler
