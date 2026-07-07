/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";
import App from "./app";
import { AuthProvider } from "./utils/AuthContext";

const rootElem = document.getElementById("root");

if (import.meta.env.DEV && !(rootElem instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?"
  );
}

const Root = () => {
  return (
    <Router>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Router>
  );
};

render(() => <Root />, rootElem);
