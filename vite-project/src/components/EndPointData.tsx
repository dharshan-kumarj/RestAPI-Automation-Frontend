import React, { useState } from 'react';

function EndPointData() {
  const [method, setMethod] = useState('POST');
  const [url, setUrl] = useState('http://localhost:8000/fetch-one');
  const [headers, setHeaders] = useState({});
  const [body, setBody] = useState({ email: 'sanjaysagarlearn@gmail.com', password: '12345' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const requestData = {
      method,
      url,
      headers,
      body,
      test_cases: [
        {
          case: 'check_status_200',
          data: null,
        },
      ],
    };

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'token':'',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Failed to send data');
      }

      const responseData = await response.json();
      console.log('Response data:', responseData);
    } catch (error: unknown) {
      setError(error instanceof Error ? error : new Error('An error occurred'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'method') {
      setMethod(value);
    } else if (name === 'url') {
      setUrl(value);
    } else if (name === 'email') {
      setBody({ ...body, email: value });
    } else if (name === 'password') {
      setBody({ ...body, password: value });
    }
  };

  return (
    <div>
      <h1>EndPointData</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Method:
            <select name="method" value={method} onChange={handleChange}>
              <option value="POST">POST</option>
              <option value="GET">GET</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            URL:
            <input type="text" name="url" value={url} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input type="email" name="email" value={body.email} onChange={handleChange} />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input type="password" name="password" value={body.password} onChange={handleChange} />
          </label>
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Data'}
        </button>
      </form>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default EndPointData;