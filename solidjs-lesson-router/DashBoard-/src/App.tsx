import { Router, Route } from "@solidjs/router";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import File from "./pages/File";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Favorites from "./pages/Favorites";
import Trash from "./pages/Trash";
import Share from "./pages/Share";

const App = () => {
  return (
    <Router>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/upload" component={Upload} />
      <Route path="/file" component={File} />
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Register} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/trash" component={Trash} />
      <Route path="/share" component={Share} />
    </Router>
  );
};

export default App;
