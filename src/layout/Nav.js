import "./custom.css";
function Nav({data}) {
  const handleDead = () => {
    alert()
  };

  return (
    <>
      <nav className="navbar bl navbar-expand-lg shadow-lg fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold">Rick and Morty</a>
          <div className="d-flex position-relative" role="search">
            <input
              disabled={true}
              data-bs-toggle="modal"
              data-bs-target="#searchModal"
              className="form-control me-2"
              type="search"
              placeholder="&nbsp; &nbsp; Search"
              aria-label="Search"
            />
            <span className="position-absolute top-50 start-0 mx-3 translate-middle">
              <i className="bi bi-search"></i>
            </span>

            <div className="dropdown dropstart">
              <i
                data-bs-toggle="dropdown"
                className="bi bi-filter-circle-fill m-2"
              ></i>
              <ul className="dropdown-menu">
                <li>
                  <button onClick={()=>{
                    handleDead()
                  }} className="dropdown-item">
                    Dead
                  </button>
                </li>
                <li>
                  <button className="dropdown-item">
                    Alive
                  </button>
                </li>
                <li>
                  <button className="dropdown-item">
                   Unknown
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
