import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const WorkSpaceDisplay = ({
  token,
  workspace_id,
  setHeaders,
  setBody,
  setTestCases,
  setUrl,
  setMethod,
  handleResponse
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
        handleResponse(request_data.response)
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

  const renderFolderStructure = (folder, parentFolder = "", isRoot = true) => {
    return (
      <ul className="list-unstyled mb-0">
        {Object.keys(folder).map((key) => {
          const fullPath = parentFolder ? `${parentFolder}/${key}` : key;
          const folderPath = fullPath.replace(/^\//, '');
          if (folder[key].type === "folder") {
            return (
              <li key={key} className="mb-2">
                <div
                  onClick={() => handleFolderClick(folderPath)}
                  className="d-flex align-items-center"
                  style={{ cursor: "pointer" }}
                >
                  <i className={`bi ${openFolders[folderPath] ? 'bi-folder2-open' : 'bi-folder2'} me-2 text-warning`}></i>
                  <span className="text-light">{key}</span>
                </div>
                {openFolders[folderPath] && (
                  <ul className="list-unstyled ps-3 mt-2">
                    {renderFolderStructure(folder[key].children, folderPath, false)}
                  </ul>
                )}
              </li>
            );
          } else if (folder[key].type === "file") {
            return (
              <li 
                key={key} 
                onClick={() => handleClick(folder[key]._id)}
                style={{ cursor: "pointer" }}
                className="mb-2"
              >
                <div className="d-flex align-items-center">
                  <i className="bi bi-file-earmark me-2 text-info"></i>
                  <span className="text-light">{key}</span>
                </div>
              </li>
            );
          }
          return null;
        })}
      </ul>
    );
  };

  return (
    <div className="card bg-dark text-white shadow-lg mb-4" style={{ borderRadius: 0 }}>
      <div className="card-body p-0">
        <div className="p-3 border-bottom border-secondary">
          <h4 className="card-title mb-0">Workspace Paths</h4>
        </div>
        <div className="workspace-tree p-3" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {renderFolderStructure(folderStructure)}
        </div>
      </div>
    </div>
  );
};

export default WorkSpaceDisplay;