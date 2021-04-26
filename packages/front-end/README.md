## Docker NGINX

**Run with File DEV**

> docker-compose up --build `run`<br />
> docker-compose down -v --rmi local `stop`<br/>

**Run with File PROD** <br/>

> docker-compose -f docker-compose-prod.yml up --build -d `run`<br />
> docker-compose -f docker-compose-prod.yml down -v --rmi local `stop`

## Download and Installation Environements

> node --version<br />
> npm --version<br />
> git --version

## Dependency

> npm i -g create-react-app

## Create project

> create-react-app doc-num-front

## Download project from GitLab

> git clone http://gitlabpro.k8s.bcaexpertise.org/group-doc-num/doc-num-front.git<br/>
> npm install

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify

# API

### Api Document numérique

https://apps-int.bca.fr/doc-num

### Rechercher tous les documents du dossier par le numéro de mission

GET https://apps-int.bca.fr/doc-num/api/v1/documents/{numMis}
nouveau champs dissociable (true | false)

### Mise à jour des informations de la Photo

POST https://apps-int.bca.fr/doc-num/api/v1/photos

### Mise à jour des informations du document du dossier

POST https://apps-int.bca.fr/doc-num/api/v1/documents

### Dissocier un document du dossier

DELETE https://apps-int.bca.fr/doc-num/api/v1/dossiers/{numDos}/documents/{idDocNum}

### Envoyer des documents pour le dossier par son Numéro de Dossier ou le Numéro de mission

POST https://apps-int.bca.fr/doc-num/api/v1/documents/upload

# Api permettant au client de s'authentifier afin d'utiliser par la suite les Services (Api) proposés par BCA Expertise

https://int4.bca.fr/authentication/

https://int4.bca.fr/authentication/api/v1/oauth
