# Bad smells in JS code detector - client

[![Netlify Status](https://api.netlify.com/api/v1/badges/a2cc9469-70cc-49c4-96f5-80ea5168d4cb/deploy-status)](https://app.netlify.com/sites/bsdetector/deploys)

## Project structure

This repo is used for development of the client app of BSDetector (Bad Smells in JS code detector) written in Vue.js. The backend repo is [availiable here](https://github.com/newt0npk/TSD-Project-Backend).

## CI/CD Pipeline

This project (applies only to the client stored in this repo) achieves CI/CD via Netlify. Upon every commit to production branch, the app is built, tested and deployed [here](https://bsdetector.netlify.com/). Additionally, every PR is built, tested and deployed with a separate url. Tools used for project management are described in [backend repo](https://github.com/newt0npk/TSD-Project-Backend).

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
