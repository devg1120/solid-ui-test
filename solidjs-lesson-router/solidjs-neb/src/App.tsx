import ErrorLayout from "@layouts/error.layout";
import HomeLayout from "@layouts/home.layout";
import { Router, Route, RouteSectionProps } from "@solidjs/router";
import { Component } from "solid-js";
import { homeRoutes, notfoundRoute } from "./route";

const HomeWrapper = (props: RouteSectionProps) => {
  return <HomeLayout>{props.children}</HomeLayout>;
};

const ErrorWrapper = (props: RouteSectionProps) => {
  return <ErrorLayout>{props.children}</ErrorLayout>;
};

const App: Component = () => {
  return (
    <Router>
      <Route component={ErrorWrapper}>
        <Route path={notfoundRoute.path} component={notfoundRoute.component} />
      </Route>
      <Route component={HomeWrapper}>
        {homeRoutes.map((route) => (
          <Route path={route.path} component={route.component} />
        ))}
      </Route>
    </Router>
  );
};

export default App;
