import React, { useState } from 'react';

const JsonInput = ({ onJsonParsed }) => {
  const [jsonInput, setJsonInput] = useState('');
  const [parsedJson, setParsedJson] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleParseJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      setParsedJson(parsed);
      setError('');
      onJsonParsed(parsed); // Pass the parsed JSON back to the parent
    } catch (e) {
      setError('Invalid JSON');
      setParsedJson(null);
    }
  };

  return (
    <div className="container mt-4">
      <div className="form-group">
        <label htmlFor="jsonInput">JSON Input</label>
        <textarea
          id="jsonInput"
          className="form-control"
          value={jsonInput}
          onChange={handleInputChange}
          placeholder="Enter JSON here"
          rows={10}
        />
      </div>
      <button className="btn btn-primary" onClick={handleParseJson}>
        Parse JSON
      </button>
      {error && <p className="text-danger mt-2">{error}</p>}
      {parsedJson && (
        <pre className="bg-light p-3 mt-3 border rounded">
          {JSON.stringify(parsedJson, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default JsonInput;
