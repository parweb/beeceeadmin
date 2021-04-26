#!/bin/sh

ROOT=/opt/bcaexpertise/data/BCA_Project/doc-num-front
cd $ROOT/

VERSION=$(grep version $ROOT/package.json | cut -c 15- | rev | cut -c 3- | rev)
sed -ie "s#V\(.*\)<#V$VERSION<#g" "$ROOT/packages/front-end/src/components/page/Page.js"

docker-compose down
docker-compose up -d --build -V