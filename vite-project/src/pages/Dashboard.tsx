import { useState } from "react";
import zelerius from "../assets/zelerius.svg";

function Dashboard() {
  return (
    <>
      <main style={{ backgroundColor: "#000000" }}>
        <div className="container p-5">
          <div className="row">
            <div className="col-auto">
              <div
                className="d-flex align-items-center mb-3 border-bottom border-danger pb-3"
                style={{ width: "310px" }}
              >
                <div className="col-auto me-3">
                  <img src={zelerius} alt="Logo" />
                </div>
                <div className="col">
                  <h1 className="text-start" style={{ color: "#FD6262" }}>
                    Zelerius API
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center pt-5">
            <div className="btn-group me-3">
              <button
                type="button"
                style={{ backgroundColor: "#1ECD45" }}
                className="btn dropdown-toggle px-5"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="me-2">
                <i className="fa fa-download"></i>
                </span>
                <span className="pl-2">Get</span>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item px-5" href="#">
                    Post
                  </a>
                </li>
              </ul>
            </div>
            <div className="ms-4 me-4 d-flex">
              <textarea
                className="form-control border border-white me-3"
                rows={1}
                style={{
                  resize: "none",
                  backgroundColor: "#000000",
                  color: "white",
                  width: "800px",
                }}
              ></textarea>
              <button
                type="button"
                className="btn px-5 ms-4 me-4"
                style={{ backgroundColor: "#FD6262" }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </main>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
        crossOrigin="anonymous"
      ></script>
    </>
  );
}

export default Dashboard;