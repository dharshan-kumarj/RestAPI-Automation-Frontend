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
  const [folderStructure, setFolderStructure] = useState({});
  const [openFolders, setOpenFolders] = useState({});

  useEffect(() => {
    const fetchWorkspaceData = async () => {
      try {
        const response = await axios.post(
          "https://api-testing-zelerius.portos.site/get-workspace",
          { workspace_id },
          {
            headers: {
              Token: token,
            },
          }
        );
        if (response.data.valid && response.data.requests) {
          setRequests(response.data.requests);
          const folderStructure = {};
          response.data.requests.forEach((request) => {
            const pathParts = request.path.split("/");
            let currentFolder = folderStructure;
            pathParts.forEach((part, index) => {
              if (index === pathParts.length - 1) {
                currentFolder[part] = { type: "file", _id: request._id };
              } else {
                if (!currentFolder[part]) {
                  currentFolder[part] = { type: "folder", children: {} };
                }
                currentFolder = currentFolder[part].children;
              }
            });
          });
          setFolderStructure(folderStructure);
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
        `https://api-testing-zelerius.portos.site/get-workspace-details/${workspace_id}/${_id}`,
        {
          headers: {
            Token: token,
          },
        }
      );
      if (response.data.valid && response.data.request_data) {
        const { request_data } = response.data;
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

  const handleFolderClick = (folderPath) => {
    setOpenFolders((prevOpenFolders) => ({
      ...prevOpenFolders,
      [folderPath]: !prevOpenFolders[folderPath],
    }));
  };

  const renderFolderStructure = (folder, parentFolder = "") => {
    return (
      <ul className="list-group">
        {Object.keys(folder).map((key) => {
          const fullPath = parentFolder ? `${parentFolder}/${key}` : key;
          const folderPath = fullPath.replace(/^\//, ''); // Remove leading slash if present
          if (folder[key].type === "folder") {
            return (
              <li key={key} className="list-group-item">
                <span
                  onClick={() => handleFolderClick(folderPath)}
                  style={{ cursor: "pointer" }}
                >
                  {openFolders[folderPath] ? "-" : "+"} {key}
                </span>
                {openFolders[folderPath] && renderFolderStructure(folder[key].children, folderPath)}
              </li>
            );
          } else if (folder[key].type === "file") {
            return (
              <li key={key} className="list-group-item" onClick={() => handleClick(folder[key]._id)}>
                <span>{key}</span>
              </li>
            );
          }
          return null; // Handle unexpected types gracefully
        })}
      </ul>
    );
  };

  return (
    <div className="card" 
    // style={{ width: "300px", position: "fixed", top: "20px", left: "10px" }}
    >
      <div className="card-body">
        <h5 className="card-title">Workspace Paths</h5>
        {renderFolderStructure(folderStructure)}
      </div>
    </div>
  );
};

export default WorkSpaceDisplay;
