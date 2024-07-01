import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Zelerius from '../assets/zelerius.svg';

function EndPointData({ method, url, setUrl, setMethod, token, headers, body, testCases, workspace_id, onScriptsClick, onResponse }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [path, setPath] = useState('');

  const handleSaveToWorkspace = async () => {
    if (!path) {
      alert('Please enter a path before saving.');
      return;
    }

    setIsLoading(true);
    setError(null);

    const saveData = {
      workspace_id: workspace_id,
      request: {
        method,
        url,
        headers,
        body,
        test_cases: testCases,
      },
      path: `/${path}`
    };
    console.log(saveData);
    try {
      const response = await fetch('https://api-testing-zelerius.portos.site/save-to-workspace', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Token': token,
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
      const response = await fetch("https://api-testing-zelerius.portos.site/fetch-one", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Token': token,
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Failed to send data');
      }

      const data = await response.json();
      onResponse(data);
    } catch (error) {
      setError(error instanceof Error ? error : new Error('An error occurred'));
      onResponse(null);
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
    } else if (name === 'path') {
      setPath(value);
    }
  };

  const handleSectionClick = (section) => {
    if (section === 'Scripts') {
      onScriptsClick();
    } else {
      alert(`You clicked on ${section}`);
    }
  };

  return (
    <div className="container-fluid bg-dark text-light py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <h1 className="mb-4">
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
                {isLoading ? 'Sending...' : 'Send'}
              </button>
              <button type="button" className="btn btn-success" onClick={handleSaveToWorkspace} disabled={isLoading}>
                Save
              </button>
            </div>
          </form>
          
          <div className="mt-3">
            <button className="btn btn-link text-light" onClick={() => handleSectionClick('Params')}>Params</button>
            <button className="btn btn-link text-light" onClick={() => handleSectionClick('Authorization')}>Authorization</button>
            <button className="btn btn-link text-light" onClick={() => handleSectionClick('Headers')}>Headers</button>
            <button className="btn btn-link text-light" onClick={() => handleSectionClick('Body')}>Body</button>
            <button className="btn btn-link text-light" onClick={() => handleSectionClick('Scripts')}>Test Cases</button>
          </div>

          {error && <div className="alert alert-danger mt-3">Error: {error.message}</div>}
        </div>
      </div>
    </div>
  );
}

export default EndPointData;