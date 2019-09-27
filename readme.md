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

## Creating a Semantic and Responsive Frame

We want to create a frame for our application to live in. Also, we know that we are going to use KendoReact components and icons in our app, so before we get too far, lets add the package and style we need for that.

```bash
npm i @progress/kendo-theme-material
```

That package gives us a stylesheet we can use and we need to put it into the `App.js` file, right between our `normalize.css` import and our `App.scss` imports. The order is important, we want our `App.scss` to override it if needed:

```jsx
import 'normalize.css';
import '@progress/kendo-theme-material/dist/all.css';
import './App.scss';
```

We need a component `Frame.js`. It's going to contain the shell of our application consisting of an outer `div` tag called `app-container` and inside of that, a semantic HTML structure:

```jsx
<div className={`app-container`}>
  <main>
    <header></header>
    <section></section>
    <footer></footer>
  </main>
</div>
```

The `<main>` contains header, section and footer semantic tags and a `Sidenav`.
The `<header>` will contain a `Logo` and `Topnav` component.
The `<section>` will be used to load our React Router and it's routing.
The `<footer>` will contain one component called `Footer`.

We can see the semantic tags mixed with our React Components below:

```jsx
<div className={`app-container`}>
  <main>
    <header>
      <Logo />
      <Topnav />
    </header>
    <section>
      {/* Routes Load Here */}
    </section>
    <footer>
      <Foot />
    </footer>
  </main>
  <Sidenav />
</div>
```

We will use a combination of Flexbox and CSS Grid styles in conjunction with these semantic HTML tags to create a solid layout. Before we add those styles, let's get the files we need set up, and the navigation working and switching routes.

### The Frame

Create a new file in the `app` directory called `Frame.js`.

### Create Sub-Directories For Components

Inside `app` directory, create two sub-directories: `partial-components` and `view-components`.

### Create View Component Files

Inside the `view-components` directory create two files: `Home.js` and `Todos.js`.

### Create Partial-View Component Files

Inside the `partial-components` directory create seven files: `Logo.js`, `Menu.js`, `Foot.js`, `Sidenav.js`, `Sidenav.scss`, `Topnav.js`, and `Topnav.scss`.

### Filling in the Blanks

The code and contents we will need for each file we just created:

#### `Home.js` (View Component)

```jsx
import React from 'react';

const Home = () => {
  document.title = `Home Page`;
  return (
    <div className="view-home">
      <h1>Home Page</h1>
    </div>
  )
}

export default Home;
```

#### `Todos.js` (View Component)

```jsx
import React from 'react';

const Todos = () => {
  document.title = `Todo's Page`;
  return (
    <div className="view-home">
      <h1>Todo's Page</h1>
    </div>
  )
}

export default Todos;
```

#### `Logo.js` (Partial-View Component)

```jsx
import React from 'react';

const Logo = () => {
  return (
    <div className="logo">
      <span className="k-icon k-i-check"></span> <span>the-todo.co</span>
    </div>
  )
}

export default Logo;
```

#### `Menu.js` (Partial-View Component)

```jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
  return (
    <ul>
      <li className="link">
        <NavLink tabIndex="2" exact activeClassName="active" to="/">Home</NavLink>
      </li>
      <li className="link">
        <NavLink tabIndex="3" activeClassName="active" to="/todos">To Do's</NavLink>
      </li>
      <li className="link">
        <a tabIndex="4" href="https://github.com/httpJunkie/2019-devreach-react-workshop">
          Source Code <span className="k-icon k-i-hyperlink-open-sm"></span>
        </a>
      </li>
      <li className="menu"><span className="k-icon k-i-menu"></span></li>
    </ul>
  )
}

export default Menu;
```

Notice how the `Topnav.js` and `Sidenav.js` files below are nearly identical. They both simply import the menu (component reuse). Their styles (SCSS) will make them different laying out horizontally (Topnav) vs vertically (Sidenav).

#### `Topnav.js` (Partial-View Component)

```jsx
import React from 'react';
import './Topnav.scss';

import Menu from './Menu';

const Topnav = () => {
  return (
    <div className={`topnav`}>
      <Menu />
    </div>
  )
}

export default Topnav;
```

#### `Topnav.scss` (Stylesheet)

```scss
.topnav {
  width: 70%;
  display: flex;
  justify-content: flex-end;
}
  
.topnav ul { padding: 0; }
.topnav ul { display: flex; margin: 0; }
.topnav ul li { list-style-type: none; }
.topnav ul > li:not(:last-child) { margin-right: 15px; }
.topnav ul > li a { color: #212529; }

.topnav ul > li.menu { cursor: pointer; cursor: hand; }
```

#### `Sidenav.js` (Partial-View Component)

```jsx
import React from 'react';
import './Sidenav.scss';

import Menu from './Menu';

const Sidenav = () => {
  return (
    <div className={`sidenav`}>
      <Menu />
    </div>
  )
}

export default Sidenav;
```

#### `Sidenav.scss` (Stylesheet)

```scss
.sidenav ul {
  display: flex;
  flex-direction: column;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0;
  margin-inline-end: 0;
  padding-inline-start: 0;
}
.sidenav li {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 60px;
}
.sidenav li > a {
  margin-left: 1em;
}
.sidenav li:last-child {
  display: none;
}

.active {
  font-weight: bold;
}

.sidenav {
  background-color: #EFEFEF;
  color: #222222;
}
.sidenav li {
  border-bottom: 1px solid #555555;
}
```

#### `Foot.js` (Partial-View Component)

```jsx
import React from 'react';

const Foot = () => {
  
  return (
    <div className="foot">
      The Todo Company 2020
    </div>
  );
}

export default Foot;
```

Now that we have each of those files created, let's put it all together in our `Frame.js` including our routing and everything we need to lazy load our view-components, etc...

#### `Frame.js`

```jsx
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Home = lazy(() => import('./view-components/Home'));
const Todos = lazy(() => import('./view-components/Todos'));
const LoadingMessage = () => `loading...`;

import Logo from "./partial-components/Logo";
import Sidenav from "./partial-components/Sidenav";
import Topnav from "./partial-components/Topnav";
import Foot from "./partial-components/Foot";

const Frame = () => {
  return (
    <BrowserRouter>
      <div className={`app-container`}>
        <main>
          <header>
            <Logo />
            <Topnav />
          </header>
          <section>
            <Switch>
              <Suspense fallback={<LoadingMessage />}>
                <Route exact path="/" component={Home} />
                <Route exact path="/todos" component={Todos} />
              </Suspense>
              <Route render={() => <h2>404 Page Not Found</h2>} />
            </Switch>
          </section>
          <footer>
            <Foot />
          </footer>
        </main>
        <Sidenav />
      </div>
    </BrowserRouter>
  );
};

export default Frame;
```

We will now need to add the `Frame` component to our `App` component:

#### `App.js` (Load Our Frame)

```jsx
import React from 'react';

import 'normalize.css';
import '@progress/kendo-theme-material/dist/all.css';
import './App.scss';

import Frame from './Frame';

const App = () => <Frame />;

export default App;
```

At this point our app is working, we have the classes and styles for our imported components, but we need to add styles to our `App.scss` page that use flexbox and CSS Grid to position our header, section, footer and logo, navigation and some basic text and link styles. Replace what is in the `App.scss` page with the following:

#### `App.scss` (Stylesheet)

```scss
.app-container {
  display: flex;
  height: 100vh;
  font-family: "Lato", sans-serif;
  text-rendering: optimizeLegibility !important;
  -webkit-font-smoothing: antialiased !important;
}

p {
  font-size: 1em;
  max-width: 80%;
}

a {
  color: inherit;
  text-decoration: none;
  margin-bottom: 0.25em;
}
a {
  background-image: linear-gradient(currentColor, currentColor);
  background-position: 0% 100%;
  background-repeat: no-repeat;
  background-size: 0% 4px;
  background-position-y: 1.1em;
  transition: background-size cubic-bezier(0, 0.5, 0, 1) 0.3s;
}
a:hover,
a:visited:hover,
a:active:hover {
  text-decoration: none;
  background-size: 100% 4px;
}
a:focus,
a:visited {
  text-decoration: none;
  background-size: 0% 4px;
}
.k-grid-header-wrap a {
  background-image: none;
  background-position: 0;
  background-repeat: no-repeat;
  background-size: auto;
  background-position-y: auto;
  transition: none;
}
a:active {
  background-color: 555;
}

main {
  width: 100%;
  display: grid;
  grid-template-rows: 60px auto 50px;
}

/* Side Navigation */
.sidenav {
  min-width: 150px;
  height: 100vh;
}

/* Top Navigation */
header {
  display: flex;
  height: 60px;
  font-size: 18px;
}
.logo {
  width: 50%;
  margin: 1em;
  font-size: 20px;
}
.topnav {
  width: 50%;
  margin: 1.2em;
}

/* Content Section */
section {
  border-top: 1px solid #010101;
  background-color: #fff;
  height: calc(100% - 2em);
  padding: 1em;
}

/* Footer */
footer {
  height: 50px;
}
footer div {
  margin-left: 1em;
  margin-top: 1em;
}
```

### A Walkthrough Each File and Styles

I know that we have added a lot of styles blindly, so let's take some time in our workshop to go over the structure and what exactly all of this is doing.

*Take 10 mins for Eric to walk through the application and explain what is going on*

This concludes building our Frame. We also still need to do more, for instance, we need to be able to open and close the Sidenav, switch from the menu-icon to links in the Topnav based on the browser width, add styles to our app-container's classes based on what the browser width is (small vs medium), and set state when our Sidenav is open or closed.

Run `npm start` and your app should look like this:

![](https://imgur.com/V35aYJW.jpg)

In our next section, we will make the frame responsive and get a crash course in React Hooks and Context API in order to help us keep track of the global state values and update our components based on it.

## Creating a Semantic and Responsive Frame (Part 2)

Let's install and use our first React Hook in this project called [react-media-hook](https://www.npmjs.com/package/react-media-hook):

```bash
npm i react-media-hook
```

It has two APIs we can try: `useMedia('(min-width: 600px)')` will recieve an object similar to using [matchMedia()](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia#JavaScript) in JavaScript:

```js
import { useMedia } from "react-media-hook";
const matchMediaObject = useMedia('(min-width: 600px)');
```

In this case, `matchMediaObject` could equal something like:

```json
{
  matches: true
  media: "(min-width: 600px)"
}
```

This is a bit overkill and we just need that true value. So we can instead try `useMediaPredicate('(min-width: 600px)')` which will return `true` or `false` based on our media query passed in:

```js
import { useMediaPredicate } from "react-media-hook";
const isMedium = useMediaPredicate('(min-width: 600px)');
```

For our needs, `useMediaPredicate` will work, as we just want `isMedium` to be `true` when our browser surpasses 600 pixels and `false` when less than 600 pixels.

We'll use that `true` or `false` value to add a `'small'` or `'medium'` class to our `app-container` div inside `Frame.js`.

let's import `useMediaPredicate` into `Frame.js` just below our `react-router` import:

```js
import { useMediaPredicate } from "react-media-hook";
```

Then, above our return statement in the same file, add:

```js
const isMedium = useMediaPredicate("(min-width: 600px)");
const breakpoint = isMedium ? "medium" : "small";
```

Next, add a class to the `app-container` div using  `${breakpoint}` inside our string interpolation:

```jsx
<div className={`app-container ${breakpoint}`}>
```

To see this working, run the project and inspect the `app-container` div with F12 (dev tools). Watch the class name change as we resize the browser encountering that 600-pixel threshold.

![](https://imgur.com/gMqqo7n.gif)

With that in place, let's hide the top navigation links and show the menu button on small and visa versa on medium. To do this, replace the last line of `Topnav.scss`:

```scss
.topnav ul > li.menu { cursor: pointer; cursor: hand; }
```

With the following:

```scss
.app-container.small .topnav ul > li.link { display: none; }
.app-container.medium .topnav ul > li.link { display: auto; }

.app-container .topnav ul > li.menu { cursor: pointer; cursor: hand; }
.app-container.small .topnav ul > li.menu { display: auto; }
.app-container.medium .topnav ul > li.menu { display: none; }
```

Next, append the following code to the end of the `Sidenav.scss` file:

```scss
.app-container.small .sidenav { display: auto; }
.app-container.medium .sidenav { display: none; }
```

This is a good start, and since we don't want the `Sidenav` panel open if there is enough room to display our menu in the `Topnav`, we will enable a default ensuring the `Sidenav` is closed initially (even on small). Next we will create a global state object with `useState` (a built in React Hook) and the Context API.

### Adding Context to Our App

Create a file that will have our Context API Provider. We will use Hooks in conjunction to set the values inside the provider (`useState`) as well as to access that context throughout our app using `useContext`.

Create a folder called `context` inside the `app` directory. Then, inside create the file: `AppContext.js`. Copy in the following code:

```js
import React, { useState, createContext } from 'react';

const AppContext = createContext();

const AppProvider = props => {
  const [appData, setApp] = useState({
    navOpen: false,
    toggleSidenav: value => setApp(data => (
      { ...data, navOpen: value }
    )),
  });
  
  return <AppContext.Provider value={appData}>{props.children}</AppContext.Provider>
}

export { AppContext, AppProvider };
```

In this file we import `useState` and `createContext`. Next, we create a context instance named `AppContext`. We then set up an `AppProvider` using the render props pattern. We declare a Hook with `useState`, pass in an object with properties, defaults and methods. In this case, the object has a property named `navOpen`, and a method called `toggleSidenav()` which can be used to modify the state of `navOpen`.

Our `AppProvider`works by returning an `<AppContext.Provider>` component with access to our `appData` state object. It receives that state as props, and gives its children access to it.

### Provide Context to Our Entire App

Next, we need to have access to this state in many places in our app. We want any component to be able to have access to its data, so we need to place the `<AppProvider>` component at the highest level in our component tree. To wrap all components, we must place it in the `App.js` file.

Add the following import to the `App.js` file:

```jsx
import { AppProvider } from "./context/AppContext";
```

And replace the line:

```js
const App = () => <Frame />;
```

With the following:

```jsx
const App = () => {
  return(
    <AppProvider>
      <Frame />
    </AppProvider>
  )
};
```

This will give any component in our application access to our context by wrapping the `<Frame>` component with the `<AppProvider>` component by way of render props.

### Consuming Context in Our App

We want to import our `AppContext` into our `Menu.js` file and our `Sidenav.js` file and consume it with `useContext`.

#### `Menu.js`

Import `useContext` and the `AppContext` from the provider:

```jsx
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AppContext } from "../context/AppContext";
```

Just above the return statement, we will add our context with a call to `useContext`:

```jsx
const context = useContext(AppContext);
```

We tap into that context and change the state of `navOpen` when clicking the menu icon or pressing Enter upon focus.

Replace the last `<li></li>` with:

```jsx
      <li className="menu">
        <span className="k-icon k-i-menu"
          onKeyPress={event => {
            if (event.key === "Enter") {
              context.toggleSidenav(!context.navOpen);
            }
          }}
          onClick={() => {
            context.toggleSidenav(!context.navOpen);
          }}
        ></span>
      </li>
```

#### `Sidenav.js`

Import `useContext` and the `AppContext` from the provider:

```jsx
import React, { useContext } from 'react';
import { AppContext } from "../context/AppContext";
```

Just above the return statement, we will add our context with a call to `useContext`:

```jsx
const context = useContext(AppContext);
```

Last, we alter the className of the parent div with `'show'` or `'hide'` based on the value of the `context.navOpen`:

```jsx
<div className={`sidenav ${context.navOpen ? 'show' : 'hide'}`}>
  <Menu />
</div>
```

#### `App.scss`

We also need to update a section of `App.scss`. Look for a comment: `/* Side navigation */` and replace it and it's following style with:

```scss
/* Side Navigation */
.sidenav,
.sidenav.show {
  min-width: 150px;
  height: 100vh;
}
.sidenav.hide {
  display: none;
}
```

Now when we click on the menu icon, it will set the state to it's oposite value, and our `Sidenav` component will re-render the new class and the CSS will hide or show the sidenav panel.

![](https://imgur.com/g7z7f89.gif)

This concludes our "Creating a Semantic and Responsive Frame (Part 2)" section. Next, we will round out our frame by adding a theme toggle using the [Kendo UI Sass Theme Builder](https://themebuilder.telerik.com/kendo-ui), another piece of global state to track `'light'` and `'dark'` and add a KendoReact `Switch` component in the footer to toggle on the fly between light and dark mode.
