import "./custom.css";
function Nav() {
  return (
    <>
      <nav className="navbar bl navbar-expand-lg shadow-lg fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold">Rick and Morty</a>
          <div className="d-flex position-relative" role="search">
            <input disabled={true}
            data-bs-toggle="modal" data-bs-target="#searchModal"
              className="form-control me-2"
              type="search"
              placeholder="&nbsp; &nbsp; Search"
              aria-label="Search"
            />
            <span className="position-absolute top-50 start-0 mx-3 translate-middle"><i className="bi bi-search"></i></span>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
