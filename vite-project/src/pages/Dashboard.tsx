import { useState , useEffect} from "react";
import zelerius from "../assets/zelerius.svg";
import world from "../assets/dashboard/world.svg";
import save from "../assets/dashboard/save.svg";
import copy from "../assets/dashboard/copy.svg";
import search from "../assets/dashboard/search.svg";
import CheckboxInput from "../source/checkbox";

function Dashboard() {
  const [username, setUsername] = useState("");
  const [selectedOption, setSelectedOption] = useState("Get");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState({});
  const [body, setBody] = useState({});
  const [responseData, setResponseData] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getCookie("token");
        if (token) {
          const response = await fetch("http://localhost:8000/profile", {
            method: "POST",
            headers: {
              "Token": token,
            },
          });

          if (response.ok) {
            const data = await response.json();
            if (data.valid) {
              setUsername(data.username);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts && parts.length === 2) {
      const cookieValue = parts.pop()?.split(";").shift();
      return cookieValue || "";
    }
    return "";
  };

  const handleSendRequest = async () => {
    const requestData = {
      method: selectedOption,
      url: url,
      headers: headers || {},
      body: body || {},
    };

    // Check if requestData is not empty or null
    if (Object.keys(requestData).length === 0 || !requestData) {
      console.error("Request data is empty or null");
      return;
    }

    console.log("Request data being sent to the server:", requestData);

    try {
      const token = getCookie("token"); // Get the token here

      if (!token) {
        console.error("Token is missing");
        return;
      }

      const response = await fetch("http://localhost:8000/fetch-one", {
        method: "POST",
        headers: {
          "Token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response data:", data);
        setResponseData(JSON.stringify(data, null, 2)); // Set the response data in the state
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
        setResponseData(JSON.stringify(errorData, null, 2)); // Set the error data in the state
      }
    } catch (error: any) {
      console.error("Error:", error);
      setResponseData(error.toString()); // Set the error message in the state
    }
  };


  return (
    <>
      <main style={{ backgroundColor: "#000000" }}>
        <div className="container-fluid p-5">
          <div className="row">
            <div className="col-auto">
              <div
                className="d-flex align-items-center mb-3 border-bottom border-danger pb-3"
                style={{ width: "310px" }}
              >
                <div className="col-auto me-3">
                  <img src={zelerius} alt="Logo" />
                </div>
                <div className="col-12">
                  <h1 className="text-start" style={{ color: "#FD6262" }}>
                    Zelerius API
                  </h1>
                </div>
                <div className="position-absolute " style={{ top: 70, right: 70 }}>
                  {username && <span className="fs-2" style={{ color: "#FD6262" }}>{username}</span>}
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center pt-2">
            <div className="btn-group me-3">
              <button
                type="button"
                style={{ backgroundColor: "#1ECD45" }}
                className="btn dropdown-toggle px-5"
                data-bs-toggle="dropdown"
                aria-expanded="true"
              >
                <span className="me-2">
                <i className="fa fa-download"></i>
                </span>
                <span className="pl-2">{selectedOption}</span>
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item px-5"
                    href="#"
                    onClick={() => setSelectedOption("Get")}
                  >
                    Get
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item px-5"
                    href="#"
                    onClick={() => setSelectedOption("Post")}
                  >
                    Post
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item px-5"
                    href="#"
                    onClick={() => setSelectedOption("Put")}
                  >
                    Put
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item px-5"
                    href="#"
                    onClick={() => setSelectedOption("Delete")}
                  >
                    Delete
                  </a>
                </li>
              </ul>
            </div>
            <div className="ms-4 me-4 d-flex">
            <input
                className="form-control border border-white me-3"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{
                  resize: "none",
                  backgroundColor: "#000000",
                  color: "white",
                  width: "800px",
                }}
              />
              <button
                type="button"
                className="btn px-5 ms-4 me-4"
                style={{ backgroundColor: "#FD6262" }}
                onClick={handleSendRequest}
              >
                Send
              </button>
            </div>
          </div>
          <div className="d-flex align-items-center pt-5">
              <span className="fs-5 text-wrap me-2 rounded px-3 py-1" style={{ backgroundColor: "#242424", color: "#D9D9D9",marginLeft: '50px'}}>
                Parameters
              </span>
              <span className="fs-5 mx-5" style={{ color: "#D9D9D9" }}>
                Headers
              </span>
              <span>
              <span className="fs-5 mx-5 px-2" style={{ color: "#D9D9D9" }}>
                  Body
              </span>
              </span>
              <span className="mx-5 fs-5" style={{ color: "#D9D9D9" }}>
                Cookies
              </span>
          </div>
          <div className="d-flex flex-column align-items-center">
              <table
                className="table table-bordered rounded-bottom"
                style={{
                  backgroundColor: "#242424",
                  color: "#D9D9D9",
                  borderColor: "#000000",
                }}
              >
                <thead>
                  <tr>
                    <th className="px-1" style={{ backgroundColor: "#242424" }}></th>
                    <th className="px-4 fs-5" style={{ backgroundColor: "#242424", color: "#D9D9D9" }}>
                      Key
                    </th>
                    <th className="px-4 fs-5" style={{ backgroundColor: "#242424", color: "#D9D9D9" }}>
                      Value
                    </th>
                    <th className="px-4 fs-5" style={{ backgroundColor: "#242424", color: "#D9D9D9" }}>
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-2 custom-checkbox" style={{ backgroundColor: "#242424" }}>
                    <CheckboxInput checked={true} onChange={() => {}}  />
                    </td>
                    <td className="px-4 fs-6" style={{ backgroundColor: "#242424", color: "#D9D9D9" }}>
                      Data 1
                    </td>
                    <td className="px-4 fs-6" style={{ backgroundColor: "#242424", color: "#D9D9D9" }}>
                      Data 2
                    </td>
                    <td className="px-4 fs-6" style={{ backgroundColor: "#242424", color: "#D9D9D9" }}>
                      Data 3
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 custom-checkbox" style={{ backgroundColor: "#242424" }}>
                    <CheckboxInput checked={true} onChange={() => {}}  />
                    </td>
                    <td className="px-4 fs-6" style={{ backgroundColor: "#242424", color: "#D9D9D9" }}>
                      Data 1
                    </td>
                    <td className="px-4 fs-6" style={{ backgroundColor: "#242424", color: "#D9D9D9" }}>
                      Data 2
                    </td>
                    <td className="px-4 fs-6" style={{ backgroundColor: "#242424", color: "#D9D9D9" }}>
                      Data 3
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 custom-checkbox" style={{ backgroundColor: "#242424" }}>
                    <CheckboxInput checked={true} onChange={() => {}}  />
                    </td>
                    <td className="px-4 fs-6" style={{ backgroundColor: "#242424", color: "#D9D9D9" }}>
                      Data 1
                    </td>
                    <td className="px-4 fs-6" style={{ backgroundColor: "#242424", color: "#D9D9D9" }}>
                      Data 2
                    </td>
                    <td className="px-4 fs-6" style={{ backgroundColor: "#242424", color: "#D9D9D9" }}>
                      Data 3
                    </td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>
            <div className="">
              <div className="d-flex align-items-center">
                <span
                  className="fs-5 text-wrap  mx-5 me-2 rounded px-3 py-1"
                  style={{
                    backgroundColor: "#242424",
                    color: "#D9D9D9",
                    marginLeft: "10px",
                  }}
                >
                  Body
                </span>
                <span className="fs-5 mx-5" style={{ color: "#D9D9D9" }}>
                  Cookies
                </span>
                <span>
                  <span className="fs-5 mx-5 px-2" style={{ color: "#D9D9D9" }}>
                    Headers
                  </span>
                  <img src={world} alt="Logo" style={{ marginLeft: '880px' ,width:"30px"}} />
                  {/* Add three words here */}
                  <span className="mx-4" style={{ color: "#27874E" }}>200 OK</span>
                  <span className="mx-4" style={{ color: "#27874E" }}>315 ms</span>
                  <span className="mx-4" style={{ color: "#27874E" }}>941 B</span>
                  {/* Add another SVG icon here */}
                  <img src={save} alt="Logo"  style={{  marginLeft: '10px',width:"30px"}} />
                </span>
              </div>
              <div className="d-flex align-items-center">
                <div
                  style={{
                    backgroundColor: "#242424",
                    color: "#D9D9D9",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    marginRight: "10px",
                    flex: 1,
                    minHeight: "400px",
                    position: "relative", // Add position relative
                  }}
                >
                  {/* Buttons on the top left */}
                  <div
                    style={{
                      position: "absolute", // Add position absolute for the buttons
                      top: "18px", // Adjust the top position
                      left: "12px", // Adjust the left position
                    }}
                  >
                    <button className="btn" style={{  backgroundColor: "#FD6262" ,marginLeft: '10px'}}>Pretty</button>
                    <button className="btn btn-secondary mr-5" style={{  marginLeft: '20px'}}>Raw</button>
                    <button className="btn btn-secondary" style={{  marginLeft: '20px'}}>Preview</button>
                  </div>

                  {/* SVG icons on the top right */}
                  <div
                    style={{
                      position: "absolute", // Add position absolute for the SVG icons
                      top: "18px", // Adjust the top position
                      right: "12px", // Adjust the right position
                    }}
                  >
                    <button className="btn btn-outline-light" style={{  marginLeft: '20px',marginRight:'30px'}}>JSON</button>
                    <img src={copy} alt="Logo"  style={{  marginLeft: '10px',width:"30px",marginRight:'30px'}} />
                    <img src={search} alt="Logo"  style={{  marginLeft: '10px',width:"30px",marginRight:'20px'}} />
                  </div>
                      <textarea
                    style={{
                      width: "100%",
                      height: "80%",
                      minHeight: "400px",
                      resize: "none",
                      backgroundColor: "#242424",
                      color: "#D9D9D9",
                      border: "none",
                      padding: "30px",
                    }}
                    value={responseData}
                    readOnly
                  />
                </div>
              </div>
            </div>
        </div>
      </main>
      <script src="//code.tidio.co/jah8n20377uaxc630anmdjo8am9ggiso.js" async></script>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
        crossOrigin="anonymous"
      ></script>
    </>
  );
}

export default Dashboard;