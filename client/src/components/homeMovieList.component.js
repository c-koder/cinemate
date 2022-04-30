import HomeMovie from "./homeMovie.component";

const HomeMovieList = ({ movies, perRow }) => {
  const arrayChunk = (movies, n) => {
    const array = movies.slice();
    const chunks = [];
    while (array.length) chunks.push(array.splice(0, n));
    return chunks;
  };

  return (
    <div>
      {arrayChunk(movies, perRow).map((row, i) => {
        return (
          <div key={i} className="row justify-content-center">
            {row.map((movie, i) => {
              return <HomeMovie key={movie.id} movie={movie} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default HomeMovieList;
