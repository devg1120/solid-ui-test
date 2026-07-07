import { lazy } from "solid-js";
import type { RouteDefinition } from "@solidjs/router";

export const homeRoutes: RouteDefinition[] = [
  {
    path: "/",
    component: lazy(() => import("@pages/landing/home")),
  },
  {
    path: "/services",
    component: lazy(() => import("@pages/landing/services")),
  },
  {
    path: "/tutorial",
    component: lazy(() => import("@pages/landing/tutorial")),
  },
  {
    path: "/contact",
    component: lazy(() => import("@pages/landing/contact")),
  },
  {
    path: "/upload",
    component: lazy(() => import("@pages/landing/upload")),
  },
];

export const notfoundRoute: RouteDefinition = {
  path: "/*all",
  component: lazy(() => import("@pages/error/notfound")),
};
