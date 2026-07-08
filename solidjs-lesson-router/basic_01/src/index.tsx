import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import { lazy } from "solid-js";

import "./index.css";

import Home from "./pages/Home";
//import Users from "./pages/Users";
import NotFound from "./pages/404";

// lazy load ..
const Users  = lazy(() => import("./pages/Users"));
const User1  = lazy(() => import("./pages/User1"));
const User2  = lazy(() => import("./pages/User2"));


/*
render(
  () => (
    <Router>
      <Route path="/users" component={Users} />
      <Route path="/" component={Home} />
    </Router>
  ),
  document.getElementById("app")
);
*/

const App = (props) => (
  <>
    <nav>
      <a class="nav_item" href="/">Home</a>
      <a class="nav_item" href="/users">Users</a>
      <a class="nav_item" href="/users/9999">User1-1</a>
      <a class="nav_item" href="/users/8888">User1-2</a>
      <a class="nav_item" href="/users/8888/gusa">User2</a>
      <a class="nav_item" href="/about">About</a>
    </nav>

    <h1>My Site with lots of pages</h1>
    {props.children}
  </>
);

render(
  () => (
    <Router root={App}>
      <Route path="/users"            component={Users} />
      <Route path="/users/:id"        component={User1} />
      <Route path="/users/:id/:name"  component={User2} />
      <Route path="/" component={Home} />
      <Route path="*404" component={NotFound} />

    </Router>
  ),
  document.getElementById("app")
);

