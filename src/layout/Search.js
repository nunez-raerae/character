import axios from "axios";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";

function Search() {
  // const [disbtn, setdisbtn] = useState();
  const [Filter, setFilter] = useState("character");
  const [Querys, setQuerys] = useState("name=");
  const [Page, setPage] = useState(1);
  const [Name, seName] = useState("");

  const fechByname = async ({ queryKey }) => {
    // console.log(Filter);
    const baseUrl =
      "https://rickandmortyapi.com/api/" +
      Filter +
      "?page=" +
      Page +
      "&" +
      Querys;
    const response = await axios.get(baseUrl + queryKey[1]);
    return response;
  };

  const { data, isLoading, refetch, isError } = useQuery(
    ["name", Name],
    fechByname,
    {
      enabled: false,
    }
  );

  useEffect(() => {
    if (Page === 1) {
      return;
    }
    refetch();
  }, [Page]);

  const handleEnter = (e) => {
    refetch();
    seName(e);
  };

  const handleLocation = () => {
    setPage(1);
    setFilter(`location`);
    setQuerys(`name=`);
  };

  const handelCharacter = () => {
    setPage(1);
    setFilter(`character`);
    setQuerys(`name=`);
  };

  const handelStatus = () => {
    setPage(1);
    setFilter(`character`);
    setQuerys(`status=`);
  };

  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="searchModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="d-flex p-2 border-danger border rounded m-3 position-relative">
              <i className="bi bi-search mx-2  position-absolute top-50 start-0 translate-middle-y"></i>
              <input
                onKeyUp={(e) => {
                  handleEnter(e.target.value);
                }}
                className="form-control mx-4"
                autoFocus={true}
                type="text"
                placeholder="Search here..."
                aria-label=".form-control-lg example"
              />
              <div className="btn-group">
                <i
                  data-bs-toggle="dropdown"
                  className="bi bi-gear position-absolute top-50 end-0 translate-middle-y"
                ></i>

                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <li>
                      <h6 className="dropdown-header">Filter Settings</h6>
                    </li>

                    <button
                      onClick={(e) => {
                        handleLocation();
                      }}
                      className="dropdown-item"
                      type="button"
                    >
                      Location
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handelCharacter();
                      }}
                      className="dropdown-item"
                      type="button"
                    >
                      Character
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handelStatus();
                      }}
                      className="dropdown-item"
                      type="button"
                    >
                      Status
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="modal-body">
              {(isLoading || isError) && (
                <>
                  <div className="alert alert-danger" role="alert">
                    No results for: {Name}
                  </div>
                </>
              )}
              {data === undefined ? (
                <></>
              ) : (
                <>
                  <div style={{ marginTop: "-15px" }} className="list-group">
                    {data.data.results.map((val) => (
                      <>
                        <a
                          href="#"
                          className="list-group-item list-group-item-action"
                          aria-current="true"
                        >
                          <div
                            key={val.id}
                            className="d-flex w-100 justify-content-between"
                          >
                            <h5 className="mb-1">{val.name}</h5>
                            <small>{val.created}</small>
                          </div>
                        </a>
                      </>
                    ))}{" "}
                  </div>

                  <div className="mt-4 mb-5 position-relative">
                    <button
                      disabled={data.data.info.count === 1 || 1 === Page}
                      onClick={() => {
                        setPage(Page - 1);
                      }}
                      class="bi btn btn-primary bi-arrow-bar-left position-absolute top-50 start-0 translate-middle-y"
                    ></button>
                    <span className="badge text-bg-warning position-absolute top-50 start-50 translate-middle">
                      {Page}
                    </span>
                    <button
                      disabled={
                        data.data.info.count === 1 ||
                        data.data.info.pages === Page
                      }
                      onClick={() => {
                        setPage(Page + 1);
                      }}
                      class="bi btn-primary btn bi-arrow-bar-right position-absolute top-50 end-0 translate-middle-y"
                    ></button>
                  </div>
                </>
              )}
            </div>
            <div className="modal-footer ">
              by: <span className="fw-bold">Indica</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
