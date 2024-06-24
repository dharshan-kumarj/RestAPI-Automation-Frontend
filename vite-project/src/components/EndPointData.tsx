import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ResponseDisplay from './ResponseDisplay';
import Zelerius from '../assets/zelerius.svg';

function EndPointData({ method, url,setUrl,setMethod, token, headers, body, testCases,workspace_id }) {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [path, setPath] = useState(''); // State to store the user input for path

  const handleSaveToWorkspace = async () => {
    if (!path) {
      alert('Please enter a path before saving.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const saveData = {
      workspace_id: workspace_id, // Replace with actual workspace_id
      request: {
        method,
        url,
        headers,
        body,
        test_cases: testCases,
      },
      path: `/${path}` // Prepend '/' to path
    };
    console.log(saveData)
    try {
      const response = await fetch('http://localhost:8000/save-to-workspace', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Token': token,
         // Assuming headers is an object with additional headers
        },
        body: JSON.stringify(saveData),
      });

      if (!response.ok) {
        throw new Error('Failed to save data to workspace');
      }

      const data = await response.json();
      console.log('Saved to workspace:', data);
      alert('Data saved to workspace successfully!');
    } catch (error) {
      setError(error instanceof Error ? error : new Error('An error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const requestData = {
      method,
      url,
      headers,
      body,
      test_cases: testCases,
    };

    try {
      const response = await fetch("http://localhost:8000/fetch-one", {
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
          'Token': token,
           // Assuming headers is an object with additional headers
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Failed to send data');
      }

      const data = await response.json();
      setResponseData(data);
    } catch (error) {
      setError(error instanceof Error ? error : new Error('An error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'method') {
      setMethod(value);
    } else if (name === 'url') {
      setUrl(value);
    }else if (name=='path'){
      setPath(value)
    }
  };

  return (
    <div className="container-fluid bg-dark text-light py-3">
    <div className="row justify-content-center">
      <div className="col-12 col-md-10 col-lg-8">
        <h1 className="mb-4">
          {/* <svg width="24" height="24" className="me-2">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="currentColor"/>
          </svg> */}
           <img src={Zelerius} className='me-2' alt="Logo" />
          Zelerius API
        </h1>
        <form onSubmit={handleSubmit} className="mb-3">
        <div className="d-flex align-items-center mb-3">
          <div className="me-2">
            <select
              className="btn btn-success dropdown-toggle"
              id="method"
              name="method"
              value={method}
              onChange={handleChange}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="DELETE">DELETE</option>
              <option value="PUT">PUT</option>
            </select>
          </div>
          <input 
            type="text" 
            className="form-control bg-dark text-light border-white" 
            id="url" 
            name="url" 
            value={url} 
            onChange={handleChange}
            style={{ borderColor: 'white' }}
          />
        </div>
        <div className="mb-3 position-relative">
          <input 
            type="text" 
            className="form-control bg-dark text-white"
            id="path" 
            name="path" 
            value={path} 
            onChange={handleChange}
            placeholder="Enter name to save"
            style={{ paddingLeft: '80px' }}
          />
          <span 
            className="position-absolute bg-white text-dark"
            style={{ 
              left: '5px', 
              top: '30%', 
              transform: 'translateY(-50%)',
              padding: '2px 8px',
              borderRadius: '6px',
              fontSize: '14px',
              pointerEvents: 'none'
            }}
          >
            Save as:
          </span>
          <small className="form-text text-muted">
            Enter a name to save this endpoint for future use in your workspace.
          </small>
        </div>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <button type="submit" className="btn btn-danger" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send Data'}
            </button>
            <button type="button" className="btn btn-success" onClick={handleSaveToWorkspace} disabled={isLoading}>
              Save to Workspace
            </button>
          </div>
        </form>
        {error && <div className="alert alert-danger mt-3">Error: {error.message}</div>}
        {responseData && <ResponseDisplay data={responseData} />}
      </div>
    </div>
  </div>
  );
}

export default EndPointData;
