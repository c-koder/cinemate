const Movie = ({ movie }) => {
  const formatTime = () => {
    const time = movie.duration.replace(/min/, "");
    return `${Math.floor(time / 60)}h ${time % 60}mins`;
  };

  return (
    <div className="col-md-auto movie-container">
      <div className="menu">
        <i className="bi bi-three-dots-vertical"></i>
      </div>
      <div className="movie-img">
        <img
          src={
            "https://i.ibb.co/FDGqCmM/papers-co-ag74-interstellar-wide-space-film-movie-art-33-iphone6-wallpaper.jpg" ||
            movie.image
          }
        />
      </div>
      <div className="movie-text">
        <h1>{movie.title}</h1>
        <ul className="row">
          {movie.categories.map((category, i) => {
            return <li key={i}>{category.name}</li>;
          })}
        </ul>
        <span className="hstack">
          <h3 style={{ marginRight: 10 }}>{movie.rating}</h3>
          <h3>{movie.type === "Movie" ? formatTime() : movie.duration}</h3>
        </span>
        <div className="hstack action-stack">
          <div className="watch-btn">
            <h3>
              <i className="bi bi-play-fill"></i>WATCH TRAILER
            </h3>
          </div>
          <div className="hstack ms-auto">
            <div className="action-btn">
              <i className="bi bi-bookmark-fill"></i>
            </div>
            <div className="action-btn">
              <i className="bi bi-share-fill"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
