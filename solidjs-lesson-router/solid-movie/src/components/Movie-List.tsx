import { createSignal, createEffect, For } from "solid-js";
import { Col, Form, Spinner, Row } from "solid-bootstrap";
import MovieCard from "./Movie-Card";

const apiKey = import.meta.env.VITE_API_KEY;

const MovieList = () => {
  // The initial value is the parameter used to construct the Signal,
  // and the return values are an array with two functions a getter and a setter.
  //  The first returned value is not the value itself, but rather a getter, a function that returns the current value.
  const [movies, setMovies] = createSignal([]);
  const [searchWord, setSearchWord] = createSignal("snow");
  const [loading, setLoading] = createSignal(false);

  const handleSearch = (event: any) => {
    setSearchWord(event.target.value);
  };
  // fetching data entails sending asynchronous queries to a remote API or server,
  // that are subsequently used to update the user interface (UI).
  createEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?s=${searchWord()}&page=1&type=movie&apikey=${apiKey}`
      );
      const data = await res.json();
      setMovies(data.Search);
      setLoading(false);
    };

    getMovies();
  });

  return (
    <>
      <header class="text-center">
        <h1>Movie List</h1>
      </header>

      <section>
        <Form.Group class="mb-3">
          <Form.Control
            type="search"
            placeholder="Search movie"
            value={searchWord()}
          />
        </Form.Group>
      </section>

      <section>
        {loading() && (
          <div class="text-center">
            <Spinner animation="border" role="status" variant="primary">
              <span class="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}

        {movies() && movies().length > 0 ? (
          <Row>
            <For each={movies()}>
              {(movie: { imdbID: any }) => (
                <Col sm={12} md={3}>
                  <MovieCard key={movie.imdbID} movie={movie} ref={movie} />
                </Col>
              )}
            </For>
          </Row>
        ) : (
          <p>No movies found for the given search query.</p>
        )}
      </section>
    </>
  );
};

export default MovieList;
