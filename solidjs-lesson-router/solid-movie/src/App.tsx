import { Routes, Route, A } from "@solidjs/router";
import { Navbar, Container } from "solid-bootstrap";
import type { Component } from "solid-js";
import MovieList from "./components/Movie-List";
import MovieDetails from "./components/Movie-Details";

const App: Component = () => {
  return (
    <Container>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          <A href="/">Solid-Movie</A>
        </Navbar.Brand>
      </Navbar>

      <Routes>
        <Route path="/" component={MovieList} />
        <Route path="/movie-details/:id" component={MovieDetails} />
      </Routes>
    </Container>
  );
};

export default App;
