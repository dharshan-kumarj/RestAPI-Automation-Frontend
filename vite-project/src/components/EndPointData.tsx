import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ResponseDisplay from './ResponseDisplay';

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
    <div className="container mt-5">
      <h1 className="mb-4">EndPoint Data</h1>
      <form onSubmit={handleSubmit} className="border p-4 shadow-sm bg-white">
        <div className="form-group mb-3">
          <label htmlFor="method">Method</label>
          <select
            id="method"
            name="method"
            className="form-control"
            value={method}
            onChange={handleChange}
          >
            <option value="POST">POST</option>
            <option value="GET">GET</option>
          </select>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="url">URL</label>
          <input
            type="text"
            id="url"
            name="url"
            className="form-control"
            value={url}
            onChange={handleChange}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="path">Save as</label>
          <input
            type="text"
            id="path"
            name="path"
            className="form-control"
            value={path}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Data'}
        </button>
        <button type="button" className="btn btn-success" onClick={handleSaveToWorkspace} disabled={isLoading}>
          Save to Workspace
        </button>
      </form>
      {error && <div className="alert alert-danger mt-3">Error: {error.message}</div>}
      {responseData && <ResponseDisplay data={responseData} />}
    </div>
  );
}

export default EndPointData;
