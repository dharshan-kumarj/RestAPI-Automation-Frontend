import React, { useEffect, useState } from "react";
import axios from "axios";

const WorkSpaceDisplay = ({
  token,
  workspace_id,
  setHeaders,
  setBody,
  setTestCases,
  setUrl,
  setMethod,
}) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchWorkspaceData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/get-workspace",
          { workspace_id },
          {
            headers: {
              Token: token,
            },
          }
        );
        if (response.data.valid && response.data.requests) {
          setRequests(response.data.requests);
        }
      } catch (error) {
        console.error("Error fetching workspace data:", error);
      }
    };

    if (token && workspace_id) {
      fetchWorkspaceData();
    }
  }, [token, workspace_id]);

  const handleClick = async (_id) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/get-workspace-details/${workspace_id}/${_id}`,
        {
          headers: {
            Token: token,
          },
        }
      );
      if (response.data.valid && response.data.request_data) {
        const { request_data } = response.data;
        console.log(request_data)
        // Set headers, body, test cases, url, and method here
        setHeaders({ ...request_data.request.headers });
        setBody({ ...request_data.request.body });
        setTestCases([...request_data.request.test_cases]);
        setUrl(request_data.request.url);
        setMethod(request_data.request.method);
      }
    } catch (error) {
      console.error("Error fetching workspace details:", error);
    }
  };

  return (
    <div
      className="card"
      style={{
        position: "fixed",
        top: "20px",
        left: "10px",
        width: "300px",
        height: "400px",
        overflowY: "auto",
      }}
    >
      <div className="card-body">
        <h5 className="card-title">Workspace Paths</h5>
        <ul className="list-group mb-3">
          {requests.map((request, index) => (
            <li
              key={index}
              className="list-group-item"
              onClick={() => handleClick(request._id)}
              style={{ cursor: "pointer" }}
            >
              {request.path}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkSpaceDisplay;
