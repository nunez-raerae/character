import { React, useState } from "react";
import "./layout/custom.css";
import axios from "axios";
import { useQuery } from "react-query";
import { fetchChar, fetchCharLoc } from "./layout/Modal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Masonry from "react-masonry-css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

function App() {
  const breakpointColumnsObj = {
    default: 5,
    1100: 3,
    700: 2,
    500: 2,
  };

  const [page, setpage] = useState(1);
  const baseUrl = "https://rickandmortyapi.com/api/character?page=";

  const Fetch = async ({ queryKey }) => {
    const response = await axios.get(baseUrl + queryKey[1]);
    return response;
  };

  const [Loading, setLoading] = useState(false);

  const [datas, setdatas] = useState([]);
  const [datasLoc, setdatasLoc] = useState([]);

  const handleChar = async (id) => {
    const result = await fetchChar(id);
    setdatas(result.data);
    setLoading(false);
  };

  const handleLoc = async (url) => {
    const result = await fetchCharLoc(url);
    const newval = result.map((val) => {
      return val.data.name;
    });
    setdatasLoc(newval);
    setLoading(false);
  };

  const { isLoading, data } = useQuery(["character", page], Fetch);
  if (isLoading) {
    return (
      <>
        <div>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={true}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </>
    );
  }

  return (
    <>
      <Box
        className="float"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            m: 1,
          },
        }}
      >
        <Fab
          disabled={page === 1}
          onClick={() => {
            setpage(page - 1);
          }}
          className={"m-1 "}
          color="warning"
          aria-label="back"
        >
          <ArrowBackIcon />
        </Fab>
        <Fab
          disabled={page === 42}
          onClick={() => {
            setpage(page + 1);
          }}
          color="warning"
          aria-label="forward"
        >
          <ArrowForwardIcon />
        </Fab>
      </Box>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {data.data.results.map((character) => (
          <div key={character.id} className="card text-bg-dark">
            <LazyLoadImage
              className="w-100 rounded"
              effect="blur"
              src={character.image}
              alt={"..."}
            >
              {/* <img src={character.image} className="rounded" alt="..." /> */}
            </LazyLoadImage>

            <div className="card-body">
              <h5 className="card-title">
                {character.name}{" "}
                <small className="font-monospace">({character.species})</small>
              </h5>
              <button
                onClick={() => {
                  handleChar(character.id);
                  setLoading(true);
                }}
                type="button"
                data-bs-toggle="modal"
                data-bs-target={"#charInfo"}
                className="btn mx-1 btn-sm btn-danger"
              >
                <i className="bi bi-info-circle"></i>
              </button>
              <button
                onClick={() => {
                  //  refetch([character.location.url, character.origin.url])
                  handleLoc([character.location.url, character.origin.url]);
                  setLoading(true);
                }}
                data-bs-toggle="modal"
                data-bs-target={"#charLoc"}
                type="button"
                className="btn mx-1 btn-sm btn-success"
              >
                <i className="bi bi-geo-alt"></i>
              </button>
              <button type="button" className="btn mx-1 btn-sm btn-warning">
                <i className="bi bi-film"></i>
              </button>
            </div>
          </div>
        ))}
      </Masonry>
      <div className="modal fade" id="charInfo" tabIndex={-1}>
        <div className="modal-dialog">
          {!Loading ? (
            <>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={datas.image}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {datas.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <span
                        className={
                          datas.status === "Alive"
                            ? "badge m-1 text-bg-success"
                            : "badge m-1 text-bg-danger"
                        }
                      >
                        <i className="bi bi-activity"></i> {datas.status}
                      </span>
                      <span className="badge m-1 text-bg-warning">
                        <i className="bi bi-virus2"></i> {datas.species}
                      </span>
                      <span className="badge m-1 text-bg-secondary">
                        <i className="bi bi-code-square"></i>{" "}
                        {datas.type ? datas.type : "Unknown"}
                      </span>
                      <span className="badge m-1 text-bg-success">
                        <i className="bi bi-gender-trans"></i> {datas.gender}
                      </span>
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </>
          ) : (
            <Stack spacing={1}>
              {/* For variant="text", adjust the height via font-size */}
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
              {/* For other variants, adjust the size with `width` and `height` */}
              <Skeleton variant="circular" width={40} height={40} />
              <Skeleton variant="rectangular" height={60} />
              <Skeleton variant="rounded" height={60} />
            </Stack>
          )}
        </div>
      </div>

      {/* TODO */}
      <div
        className="modal fade opacity-20"
        id="charLoc"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm">
            <div
              style={{ verticalAlign: "middle" }}
              className="modal-body text-center"
            >
              <div className="card text-bg-dark">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="bi card-img bi-globe-asia-australia"
                  viewBox="0 0 16 16"
                >
                  <path d="m10.495 6.92 1.278-.619a.483.483 0 0 0 .126-.782c-.252-.244-.682-.139-.932.107-.23.226-.513.373-.816.53l-.102.054c-.338.178-.264.626.1.736a.476.476 0 0 0 .346-.027ZM7.741 9.808V9.78a.413.413 0 1 1 .783.183l-.22.443a.602.602 0 0 1-.12.167l-.193.185a.36.36 0 1 1-.5-.516l.112-.108a.453.453 0 0 0 .138-.326ZM5.672 12.5l.482.233A.386.386 0 1 0 6.32 12h-.416a.702.702 0 0 1-.419-.139l-.277-.206a.302.302 0 1 0-.298.52l.761.325Z" />
                  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM1.612 10.867l.756-1.288a1 1 0 0 1 1.545-.225l1.074 1.005a.986.986 0 0 0 1.36-.011l.038-.037a.882.882 0 0 0 .26-.755c-.075-.548.37-1.033.92-1.099.728-.086 1.587-.324 1.728-.957.086-.386-.114-.83-.361-1.2-.207-.312 0-.8.374-.8.123 0 .24-.055.318-.15l.393-.474c.196-.237.491-.368.797-.403.554-.064 1.407-.277 1.583-.973.098-.391-.192-.634-.484-.88-.254-.212-.51-.426-.515-.741a6.998 6.998 0 0 1 3.425 7.692 1.015 1.015 0 0 0-.087-.063l-.316-.204a1 1 0 0 0-.977-.06l-.169.082a1 1 0 0 1-.741.051l-1.021-.329A1 1 0 0 0 11.205 9h-.165a1 1 0 0 0-.945.674l-.172.499a1 1 0 0 1-.404.514l-.802.518a1 1 0 0 0-.458.84v.455a1 1 0 0 0 1 1h.257a1 1 0 0 1 .542.16l.762.49a.998.998 0 0 0 .283.126 7.001 7.001 0 0 1-9.49-3.409Z" />
                </svg>
                <div className="card-img-overlay">
              {!Loading ? (
                <ul className="list-group">
                  <li className="badge m-1 bg-secondary">
                    <i className="bi bi-geo-alt"></i>{datasLoc[0] ? datasLoc[0] : "Unknown Place"}
                  </li>
                  <li className="badge m-1 bg-danger">
                    <i className="bi bi-pin-map"></i>
                    {datasLoc[1] ? datasLoc[1] : "Unknown Place" }
                    {}
                  </li>
                </ul>
              ) : (
                <>
                  <div className="spinner-grow" role="status"></div>
                </>
              )}
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default App;
