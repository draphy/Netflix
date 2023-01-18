import React, { useEffect, useState } from "react";
import "./RowPost.css";
import axios from "../../axios";
import { imageUrl, API_KEY } from "../../constants/constants";
import YouTube from "react-youtube";

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState("");
  const [view, setView] = useState(false);
  const [prev , setPrev] = useState(0)
  useEffect(() => {
    axios.get(props.url).then((res) => {
      console.log(res.data.results);
      setMovies(res.data.results);
    });
  }, []);

  const opts = {
    height: "500",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  const handelMovie = (id) => {
  
    console.log(id);
 
    axios
      .get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((res) => {
        if (res.data.results.length !== 0) {
          setUrlId(res.data.results[0]);
      
          if (prev === id) {
            setView(false); 
            setPrev(null)
          }  else {
            setView(true);
            setPrev(id)
          }
        } else {
          console.log("Array empty");
          setView(false)
        }
       
      });
  };

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters-wrapper">
        {movies.map((data) => {
          return (
            <div className="poster-card">
              <img
                onClick={() => handelMovie(data.id)}
                className={props.isSmall ? "smallPoster" : "poster"}
                alt="poster"
                src={`${movies ? imageUrl + data.backdrop_path : ""}`}
              />
            </div>
          );
        })}
      </div>
      {view && <YouTube videoId={urlId.key} opts={opts} />}
    </div>
  );
}

export default RowPost;
