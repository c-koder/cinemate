import { useEffect } from "react";
import axios from "axios";
import { PORT } from "./constants/Port";

const App = () => {
  useEffect(() => {
    axios.get(`${PORT}/movies/`).then((response) => {
      console.log(response);
    });
  }, []);

  return <div className="App"></div>;
};

export default App;
