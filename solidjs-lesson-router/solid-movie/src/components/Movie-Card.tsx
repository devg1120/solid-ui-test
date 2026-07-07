import { Button, Card } from "solid-bootstrap";
import { A } from "@solidjs/router";

const MovieCard = ({ movie }: any) => {
  const { imdbID, Title, Year, Poster } = movie;
  return (
    <Card class="my-2" id={imdbID} style={{ width: "18rem" }}>
      <Card.Img variant="top" class="h-" src={Poster} />
      <Card.Body>
        <Card.Title>{Title}</Card.Title>
        <Card.Text>{Year}</Card.Text>
        <Button variant="primary">
          <A
            class="text-white text-decoration-none"
            href={`/movie-details/${imdbID}`}
          >
            See Details
          </A>
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
