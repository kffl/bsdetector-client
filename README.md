[![Netlify Status](https://api.netlify.com/api/v1/badges/a2cc9469-70cc-49c4-96f5-80ea5168d4cb/deploy-status)](https://app.netlify.com/sites/bsdetector/deploys)

# BSDetector client

_Detector of bad smells in JavaScript code_

## Project description

This is a uni project for Technologies of Software Development course. It's a web app that allows developers to check their JavaScript code for bad smells by performing static code analysis of uploaded code. The project is split into two repositories. This one contains client app built in Vue.js and Vuetify, whereas the backend repo is [here](https://github.com/kffl/bsdetector-server/).

Our MVP would be a web app capable of detecting bad smells in uploaded JavaScript code by performing static code analysis.

A nice-to-have feature that we will possibly try to implement would be integration with GitHub via Oauth or Github Apps API that would allow users to login via GitHub and analyze specified branch of a given GitHub repo.

## CI/CD Pipeline

This project (applies only to the client stored in this repo) achieves CI/CD via Netlify. Upon every commit to production branch, the app is built, tested and deployed [here](https://bsdetector.netlify.com/). Additionally, every PR is built, tested and deployed with a separate url. Tools used for project management are described in [backend repo](https://github.com/kffl/bsdetector-server).

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run tests

#### Unit tests with Jest

```
npm run test:unit
```

#### E2E tests with Cypress

```
npx cypress run
```

Before running E2E tests, make sure that the app is served at the address specified in `cypress.json` (by default `http://localhost:8080`). Also ensure that the backend service is running at the address specified in `.env`.
