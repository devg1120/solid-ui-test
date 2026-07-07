import { Component, For } from "solid-js";
import { A, useRoutes, useLocation } from "@solidjs/router";

import { routes } from "./routes";
import "../assets/style.css";

const App: Component = () => {
  const location = useLocation();
  const Route = useRoutes(routes);

  const navItems = [
    ["/", "Home"],
    ["/about", "About"],
    ["/signin", "Sign In"],
    ["/signup", "Sign Up"],
    ["/profile", "Profile"],
    ["/error", "Error"],
  ];

  return (
    <>
      <nav>
        <ul>
          <For each={navItems}>
            {(item, i) => (
              <li>
                <A href={item[0]} activeClass="nav-link-active" end>
                  {item[1]}
                </A>
              </li>
            )}
          </For>

          <li>
            <span>URL:</span>
            <input type="text" readOnly value={location.pathname} />
          </li>
        </ul>
      </nav>

      <main>
        <Route />
      </main>
    </>
  );
};

export default App;
