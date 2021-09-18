# Welcome to splyt-frontend 👋
![Version](https://img.shields.io/badge/version-0.0.0-blue.svg?cacheSeconds=2592000)

> What you see on the computer

## Background

I'm using leaflet to render the map component. I'm also using tailwind for styling. One utility package that I'm using is the query-string package which helps me to build the URL to call the endpoint.

I'm using vite instead of create-react-app. It is much faster because it is using esbuild.

I'm also using absolute imports. You can see this in action when you see this type of imports.

```diff
-import Map from "../../containers/Map";
+import Map from "containers/Map";
```

You can see this setting inside vite.config.ts.

For testing, I'm using jest as the test runner and testing-library to render the components.

Most of the babel packages are used for jest.

## Methodology

### Containers and components

What I like to do is containers should only have code that is related to business and logic. Components should be as dumb as possible i.e. it should just render stuff. Maybe some minor logic.

If you have state or need to fetch data, those piece of code should belong in the container.

I also like to expose functions from the containers as children as functions. You can see this in action for the Map container.

## Install

```sh
npm install
```

## Usage

```sh
npm run start
```

## Run tests

```sh
npm run test
```

## Author

👤 **Kamal Arieff Ahmad Faizel**

* Website: https://kamalarieff.com
* Github: [@kamalarieff](https://github.com/kamalarieff)
* LinkedIn: [@Kamal Arieff](https:\/\/www.linkedin.com\/in\/kamal-arieff-ahmad-faizel-058b0a79\/)

## Show your support

Give a ⭐️ if this project helped you!


***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
