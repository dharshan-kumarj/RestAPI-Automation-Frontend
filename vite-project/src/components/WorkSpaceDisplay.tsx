// WorkSpaceDisplay.js (or WorkSpaceDisplay.tsx)
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const WorkSpaceDisplay = ({ token, workspace_id }) => {
  const [storagePaths, setStoragePaths] = useState([]);

  useEffect(() => {
    const fetchWorkspaceData = async () => {
      try {
        const response = await axios.post('http://localhost:8000/get-workspace', 
          { workspace_id },
          {
            headers: {
              Token: token,
            },
          }
        );
        if (response.data.valid && response.data.workspace_id) {
          const paths = response.data.workspace_id.storage.map(item => item.path);
          setStoragePaths(paths);
        }
      } catch (error) {
        console.error('Error fetching workspace data:', error);
      }
    };

    if (token && workspace_id) {
      fetchWorkspaceData();
    }
  }, [token, workspace_id]);

  return (
    <div className="card" style={{ position: 'fixed', top: '20px', left: '10px', width: '300px', height: '400px', overflowY: 'auto' }}>
      <div className="card-body">
        <h5 className="card-title">Workspace Storage Paths</h5>
        <ul className="list-group mb-3">
          {storagePaths.map((path, index) => (
            <li key={index} className="list-group-item">
              {path}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkSpaceDisplay;
