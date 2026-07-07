import logo from "./logo.svg";
import styles from "./App.module.css";
import { Routes, Route, Router } from "@solidjs/router";
import Product from "./pages/product/Product";
import Home from "./pages/home/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Confirmation from "./pages/Confirmation";

import AboutUs from "./pages/aboutus/AboutUs";
function App() {
  return (
    <>
      <header className="header">
        <Navbar />
      </header>

      <Routes>
        <Route path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/audi-q3" component={Product} />
        <Route path="/confirmation" component={Confirmation} />
        <Route path="/aboutus" component={AboutUs} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
