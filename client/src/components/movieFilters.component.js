import { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import MovieSizeDropdown from "./movieFilterDropdown.component";

const MovieFilters = (props) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0 });

  const viewAnim = {
    visible: {
      opacity: 1,
      transform: "translateX(0px)",
      transition: { duration: 0.4 },
    },
    hidden: {
      opacity: 0,
      transform: "translateX(-50px)",
    },
  };

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={viewAnim}
      className="col-md-auto min-vh-100 filter-container"
    >
      <div className="vstack">
        <span style={{ color: "var(--light)", fontSize: 20 }}>
          Filter Options
        </span>
        <hr
          style={{
            background: "var(--light)",
            padding: "0.5px 0px",
            margin: 0,
            borderRadius: 20,
            opacity: 0.5,
          }}
        />
        <span>Genre</span>
        <ul className="side-dropdown">
          {props.genres.map((value) => {
            return (
              <li
                className={props.genre.name === value.name ? "selected" : ""}
                key={value.id}
                onClick={() => props.setGenre(value)}
              >
                {value.name}
              </li>
            );
          })}
        </ul>
        <hr
          style={{
            background: "var(--light-rgb)",
            padding: "0.5px 0px",
            borderRadius: 20,
            opacity: 0.5,
            margin: 0,
          }}
        />
        <span>Order By</span>
        <ul className="side-dropdown">
          {props.orderBys.map((value) => {
            return (
              <li
                className={props.orderBy.name === value.name ? "selected" : ""}
                key={value.id}
                onClick={() => props.setOrderBy(value)}
              >
                {value.name}
              </li>
            );
          })}
        </ul>
        <hr
          style={{
            background: "var(--light)",
            padding: "0.5px 0px",
            margin: 0,
            borderRadius: 20,
            opacity: 0.5,
          }}
        />
        <div className="dropdown filter-dropdown">
          <span>Rating</span>
          <button
            className="primary-btn filter-btn hstack"
            id="movieSizeDropdown"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {props.ratedBy.name}
            <i className="bi bi-filter-right ms-auto"></i>
          </button>
          <MovieSizeDropdown
            values={props.ratedBys}
            setValue={props.setRatedBy}
          />
        </div>
        <div className="dropdown filter-dropdown">
          <span>Year</span>
          <button
            className="primary-btn filter-btn hstack"
            id="movieSizeDropdown"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {props.year.name}
            <i className="bi bi-filter-right ms-auto"></i>
          </button>
          <MovieSizeDropdown values={props.years} setValue={props.setYear} />
        </div>
        <div className="dropdown filter-dropdown">
          <span>Items to show</span>
          <button
            className="primary-btn filter-btn hstack"
            id="movieSizeDropdown"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {props.pageSize.name}
            <i className="bi bi-filter-right ms-auto"></i>
          </button>
          <MovieSizeDropdown
            values={props.pageSizes}
            setValue={props.setPageSize}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default MovieFilters;
