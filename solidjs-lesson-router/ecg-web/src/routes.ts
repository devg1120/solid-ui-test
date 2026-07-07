import { lazy } from "solid-js";
import type { RouteDefinition } from "@solidjs/router";

import Home from "./pages/Home";
import AboutData from "./pages/about.data";
import { GuestRoute, UserRoute } from "./utils/RouteGuard";

export const routes: RouteDefinition[] = [
  // Public routes
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about",
    component: lazy(() => import("./pages/About")),
    data: AboutData,
  },
  // Guest-only routes
  {
    path: "",
    component: GuestRoute,
    children: [
      {
        path: "/signin",
        component: lazy(() => import("./pages/SignIn")),
      },
      {
        path: "/signup",
        component: lazy(() => import("./pages/SignUp")),
      },
    ],
  },
  // User-only routes
  {
    path: "",
    // component: UserRoute,
    children: [
      {
        path: "/profile",
        component: lazy(() => import("./pages/Profile")),
      },
    ],
  },
  // Errors
  {
    path: "**",
    component: lazy(() => import("./errors/404")),
  },
];
