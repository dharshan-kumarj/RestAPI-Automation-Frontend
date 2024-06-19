import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ResponseDisplay from './ResponseDisplay';

function EndPointData({ token, headers, body, testCases }) {
  const [method, setMethod] = useState('POST');
  const [url, setUrl] = useState('http://localhost:8000/fetch-one');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);

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
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error('Failed to send data');
      }

      const data = await response.json();
      setResponseData(data);
      console.log('Response data:', data);
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
    };
  }

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
          
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Data'}
          </button>
        </form>
        {error && <div className="alert alert-danger mt-3">Error: {error.message}</div>}
        {responseData && <ResponseDisplay data={responseData} />}
      </div>
    );
  }

  export default EndPointData;
