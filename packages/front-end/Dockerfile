FROM node:15 as build
WORKDIR /app
COPY package.json ./
RUN yarn

COPY . ./

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
ARG REACT_APP_API
ENV REACT_APP_API $REACT_APP_API

RUN yarn build

FROM nginx:1.19-alpine
COPY --from=build /app/build /usr/share/nginx/html/bca-admin
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
RUN ls -la /usr/share/nginx/html/bca-admin/
EXPOSE 3333
CMD ["nginx", "-g", "daemon off;"]