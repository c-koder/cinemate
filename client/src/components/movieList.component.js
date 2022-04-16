import Movie from "./movie.component";

const MovieList = ({ movies }) => {
  const arrayChunk = (movies, n) => {
    const array = movies.slice();
    const chunks = [];
    while (array.length) chunks.push(array.splice(0, n));
    return chunks;
  };

  return (
    <div className="container">
      {arrayChunk(movies, 3).map((row, i) => {
        return (
          <div key={i} className="row justify-content-center">
            {row.map((movie, i) => {
              return <Movie key={movie.id} movie={movie} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default MovieList;
