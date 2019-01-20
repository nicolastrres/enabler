set -e

echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin

docker build . -t nicolastrres/enabler:${CIRCLE_SHA1}
docker push nicolastrres/enabler
