git tag --delete v$1
git push --delete origin v$1

npm version $1

git push
git push --tags

zipper="../zipper"
root="$zipper/$1_$2"

echo $root

mkdir -p $root
cp docker-compose.yaml $root
cp package.json $root
cp -R packages $root

rm "$root/packages/.DS_Store"
rm "$root/packages/back-end/.DS_Store"
rm "$root/packages/front-end/.DS_Store"

rm "$root/packages/back-end/.env"
rm "$root/packages/back-end/.gitignore"
rm -Rf "$root/packages/back-end/.vercel"
rm -Rf "$root/packages/back-end/node_modules"

rm "$root/packages/front-end/.env"
rm "$root/packages/front-end/.eslintrc"
rm "$root/packages/front-end/.gitignore"
rm "$root/packages/front-end/.prettierrc.json"
rm "$root/packages/front-end/Dockerfile-prod"
rm "$root/packages/front-end/README.md"
rm -Rf "$root/packages/front-end/build"
rm -Rf "$root/packages/front-end/coverage"
rm -Rf "$root/packages/front-end/e2e"
rm -Rf "$root/packages/front-end/node_modules"

sed -ie "s#PSQL_DEV_1.bcaexpertise.org:5447#PSQL_VAL_REC.bcaexpertise.org:5447#g" "$root/docker-compose.yaml"

sed -ie "s#https://apps-int.bca.fr/doc-num-front/api#https://apps-rec.bca.fr/doc-num-front/api#g" "$root/docker-compose.yaml"

sed -ie "s#https://apps-int.bca.fr/doc-num-front/api#https://apps-rec.bca.fr/doc-num-front/api#g" "$root/docker-compose.yaml"
sed -ie "s#https://apps-int.bca.fr/doc-num/api/v1#https://apps-rec.bca.fr/doc-num/api/v1#g" "$root/docker-compose.yaml"
sed -ie "s#https://int4.bca.fr/authentication/api/v1#https://rec4.bca.fr/authentication/api/v1#g" "$root/docker-compose.yaml"
# sed -ie "s#http://ies-calc-01.bcaexpertise.org:4327/bca-sign/v1/BCAGDOC#https://apps-rec.bca.fr/bca-sign/v1/BCAGDOC#g" "$root/docker-compose.yaml"
sed -ie "s#http://ies-calc-01.bcaexpertise.org:4327/bca-sign/v1/BCAGDOC#https://apps-rec.bca.fr/bca-sign/v1/BCAGDOC#g" "$root/docker-compose.yaml"
sed -ie "s#https://bca-e-api-xps-b2b-int.de-c1.cloudhub.io/api/v1#https://bca-e-api-xps-b2b-uat.de-c1.cloudhub.io/api/v1#g" "$root/docker-compose.yaml"
sed -ie "s#/Users/parweb/Sites/bbbcccaaa/docnum/packages/back-end/tmp/#/app/tmp/#g" "$root/docker-compose.yaml"

sed -ie "s#6001:3500#6010:3500#g" "$root/docker-compose.yaml"
sed -ie "s#_VERSION_#$1#g" "$root/packages/front-end/src/components/page/Page.js"

rm "$root/docker-compose.yamle"
rm "$root/packages/front-end/src/components/page/Page.jse"

pg_dump --clean --column-inserts -h PSQL_DEV_1.bcaexpertise.org -p 5447 -U BCAGDOC bcagdoc > $root.sql

zip -r $root.zip $root > /dev/null 2>&1
open $zipper