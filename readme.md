# Let’s Build an App With React (DevReach 2019 Workshop)

This readme.md will serve as your guide to putting our instruction at the React workshop into practice. Each commit to this repository starting with the intial commit will add new instructions to this `readme.md` file. Each commit corresponds with a portion of the workshop and what you will build during that time.

Every portion of this workshop is indicated in this document by a level 2 heading. A new lesson and instruction for each phase of the workshop is added with each commit to this repository. We will start with “Hello React” below. To get the next lesson, simply move to the next commit.

## “Hello React” with Webpack & Babel

Welcome to the 2019 DevReach: “Let’s Build an App With React” workshop. We'll get started building our React toolchain and complete our “Hello React” step of our workshop.

### Create project folders and initialize npm

```bash
mkdir react-devreach
```

```bash
npm init
```

```bash
mkdir app
```

```bash
code .
```

At this point, we will have a `package.json` and our `app` directory only, Let's use VS Code to create the following files in the root directory:

`.gitignore`   `webpack.config.babel.js`

And the following files inside the `app` directory

`index.js`   `index.html`   `App.js`   `App.scss` 

### Dev dependencies for React

I've created three separate commands for installing our dev-dependencies, but feel free to install them all at once.

`npm i --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin`

`npm i --save-dev @babel/core @babel/preset-env @babel/preset-react`

`npm i --save-dev babel-loader node-sass file-loader sass-loader style-loader css-loader url-loader`

### Create build/start scripts to run Webpack & dev-server

```json
"build": "webpack",
"start": "webpack-dev-server --open",
```

### Add Babel & Presets to `package.json`

For more info on Babel and `@babel/preset-env` you can [read this article](https://blog.jakoblind.no/babel-preset-env/). Just know that each plugin is its own npm library and this one, in particular, allows us to transpile ES6 to legacy JS code.

For more info on `@babel/preset-react` again remember that it's just a plugin pointing to a npm library, in this case `preset-react` is a bundle of other libraries like: `@babel/plugin-syntax-jsx`, `@babel/plugin-transform-react-jsx`& `@babel/plugin-transform-react-display-name`. It allows us to use JSX in conjunction with [Webpack](https://webpack.js.org/), [Babel](https://babeljs.io/) & [React]([https://reactjs.org](https://reactjs.org/)) in our project. Even in our “Hello React” initial code below we use JSX, so this is required.

```json
"babel": {
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
},
```

### Regular dependencies we need for “Hello React”

For more info on Normalize (`normalize.css`) you can [read this article](http://nicolasgallagher.com/about-normalize-css/) or [this one](https://medium.com/@elad/normalize-css-or-css-reset-9d75175c5d1e). Just know that Normalize is a modern CSS reset that provides better cross-browser consistency in the default styling of HTML elements.

```bash
npm i --save react react-dom react-router-dom normalize.css
```

### Bootstrap our app and create our first component

Below we walk through the steps to bootstrap our `Index.html` file and get our React app working with our initial `App` component.

#### Index.html

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <title>Todo App</title>
  <link href="http://fonts.googleapis.com/css?family=Lato:200,300,400" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="Description" content="Author: Your Name">
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

#### `index.js` (JS entrypoint/bootstrapper)

```js
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(<App />, document.getElementById("root"));
```

#### `App.js` (Initial Component)

```jsx
import React from 'react';

import 'normalize.css';
import './App.scss';

const App = () => <h1>Hello React</h1>;

export default App;
```

#### App.scss (Ensure transpiling to CSS works)

Why Sass(SCSS) over CSS? This is something we utilize in our project and without Sass we would not be able to easily create our light and dark theme (later on). If you would like to learn more about Sass/SCSS, [check out this article](https://alistapart.com/article/why-sass/).

```scss
body {
  background-color: #222;
}
h1 {
  padding: 0 0 0 1em;
  color: #61dafb;
  font-family: Lato;
}
```

#### `.gitignore` (Files and folders not tracked by git)

For more information on creating a `.gitignore` file and why we need them, see [this article ](https://help.github.com/articles/ignoring-files) for more info.

```
# dependencies
/node_modules

# testing
/coverage

# production
/build

# distribution
/dist

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

With these files in place, let's run our project for the first time and ensure we get our application with no warnings or errors.

```bash
npm run start
```

### Init, Stage and Commit our files

We have reached a stopping point. Our application is working. Let's initialize a git repo and save our first snapshot.

#### Initialize our git repository in place

Ensure our command line is in the root of our project, then run the following commands:

```bash
git init
```

Since we already added our `.gitignore` we will see that our `npm_modules` directory is not being tracked 😉!

#### Go create an empty repository on GitHub

We need an empty repository on GitHub to push this project and its first commit to. Next, we will stage, commit and push to our origin's master:

```bash
git add .
```

```bash
git commit -m "Hello React (Webpack, Babel & React)"
```

```bash
git remote add origin https://github.com/httpJunkie/2019-devreach-react-workshop.git
```

```bash
git push -u origin master
```

### That's it for our “Hello React” portion of the workshop

We have created our own [Webpack](https://webpack.js.org/), [Babel](https://babeljs.io/) & [React]([https://reactjs.org](https://reactjs.org/)) build without using something like Create React App ([CRA](https://github.com/facebook/create-react-app)). We have gone through all the steps for setting up our build toolchain. I prefer this rather than spinning up Create React App for most projects. [CRA](https://github.com/facebook/create-react-app) is a great tool and is amazing to use for demos, hashing out new ideas or components quickly, but I wanted you to walk away with something that you can turn into a production application eventually as well understand how to build your own build chain with only the packages and dependencies were need. At this point, we know everything that is in our `package.json` and why it's there. I have provided links along the way if you want to dive deeper into each one.

We can now proceed with building out our custom React application. Along the way, we will install new dependencies only as we need them.
