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

## Getting Started with ESLint

We need to install and initialize ESLint. All the steps I'm about to perform and more info [can be found here](https://eslint.org/docs/user-guide/getting-started). But I have modified those instructions to make sure we have everything we need to make ESLint work with React as we need additional packages for our Webpack/Babel/React build.

```bash
npm i --save-dev eslint babel-eslint eslint-watch eslint-plugin-react
```

Next, we need a `.eslintrc` file which will serve as our configuration, let's create a file in the root directory of our project and add the following contents to it:

```json
{
  "plugins": [
    "react"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true
  },
  "extends": [],
  "rules": {
    "semi": ["error", "always"],
    "quotes": ["error", "double"]
  },
  "settings": {
    "react": {
      "version": "16.9"
    }
  }
}
```

This is as close to the default `.eslintrc` file that is put in new projects when running ESLint's initialization command, but we have slightly modified it to work with our Webpack/Babel/React project.

Before we can run our linter, we need to add a `lint` and `lint:fix` script to our `package.json` just above the test script:

```json
    "lint": "eslint app --ext .js,.jsx",
    "lint:fix": "eslint --fix app --ext .js,.jsx",
```

Again, they are made to work specifically with React hence the `.js` and `.jsx` file extensions. Now let's run our linter.

```bash
npm run lint
```

Right away we get some errors, this is great, it means our linter is working. But as a team, let's assume that we do not want to follow the double quote rule and we only want to follow the semi-colon rule. Let's make the following changes to the `.eslintrc` file:

```json
    "semi": ["warn", "always"],
    "quotes": ["off", "double"]
```

When you get nothing back from the linter, you know that you have no errors and warnings. We can turn off the quotes rule as shown above or completely remove it, I'm going to opt for removing it. If you would like to test the linter one more time, try removing some semi-colons and running it again.

### Adding linting for React Hooks

Some rules that we may want to apply are not built into ESLint because they are framework specific. If we want to apply the suggested rules for using Hooks, we need to add a new package that can be used as a plugin, we already have one plugin added and set up for JSX, but let's show how to add another one.

Let's install the package we need:

```bash
npm i --save-dev eslint-plugin-react-hooks
```
First we will add `react-hooks` to the plugin section the `.eslintrc` file:

```json
    "react",
    "react-hooks"
```

then, we will add the rule to the rules section the `.eslintrc` file:

```json
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
```

To check the plugin is working, replace the first line in `App.js` with:

```jsx
import React, { useEffect } from 'react';
useEffect(() => {
  console.log("This should trigger our Hooks rule");
});
```

Run our linter again and you should get a warning:

```bash
7:3  error  React Hook "useEffect" cannot be called at the top level...
```

Change the code in `App.js` back to the way it was (discard changes in git). We will surely run into more Hooks warnings and errors as we get further into the course.

To use our `react` plugin, we can look at the [docs here]() and see that we could use a rule for no duplicate props:

```json
  "rules": {
    "react/jsx-no-duplicate-props": "error"
  },
```

We could then go into our `index.js` file and add some duplicate props to see it in action:

```jsx
ReactDOM.render(<App isTrue={true} isTrue={false} />, document.getElementById("root"));
```

And we get the following error:

```bash
6:36  error  No duplicate props allowed...
```

Feel free to remove that one if you like, but at least we know how to browse the rules now and apply them!

Something to be aware of is the React version in your `.eslintrc` file, ensure that it matches the version of React you have installed:

```json
 "settings": {
    "react": {
      "version": "16.9"
    }
  }
```

Finally, we could set up linting to run on build or start script, or add a VS Code plugin to give us hints while we code. I'll leave exploring that up to you!

This concludes the linting section of the workshop, you now have the tools so you and your team can determine what plugins and rules you want to use!
