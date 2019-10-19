import React, { useContext, lazy, Suspense } from "react";
import { useUser } from "reactfire";
import { AppContext } from "./context/AppContext";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useMediaPredicate } from "react-media-hook";

const Home = lazy(() => import("./view-components/Home"));
const Signin = lazy(() => import("./view-components/Signin"));
const Budget = lazy(() => import("./view-components/Budget"));
const LoadingMessage = () => `loading...`;

import Logo from "./partial-components/Logo";
import Sidenav from "./partial-components/Sidenav";
import Topnav from "./partial-components/Topnav";
import Foot from "./partial-components/Foot";

const Frame = () => {
  const context = useContext(AppContext);
  const isMedium = useMediaPredicate("(min-width: 600px)");
  const breakpoint = isMedium ? "medium" : "small";
  const user = useUser();
  return (
    <BrowserRouter>
      <div className={`app-container ${breakpoint} ${context.themeMode}`}>
        <main>
          <header>
            <Logo />
            <Topnav />
            {user && <div>Hello {user.displayName}</div>}
          </header>
          <section>
            <Switch>
              <Suspense fallback={<LoadingMessage />}>
                <Route exact path="/" component={Home} />

                <Route exact path="/budget" component={Budget} />
                <Route exact path="/signin" component={Signin} />
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
