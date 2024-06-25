// TestCases.jsx
import React, { useState } from "react";
import "../TestCases.css";

const TestCases = () => {
  const [selectedTestCase, setSelectedTestCase] = useState(null);
  const [testCaseData, setTestCaseData] = useState([]);

  const predefinedTestCases = [
    { case: "Check Status 200", important: true, data: "checks whether the response comes with the status code of 200" },
    { case: "Validation of Response Body", important: true, data: "Compares the actual response body with the expected body content." },
    { case: "Check for Valid JSON", important: true, data: "Validates if the response is in JSON format." },
    { case: "Check for Specific Header Elements", important: false, data: "Validates the presence of specific headers in the response." },
    { case: "Check HTML and XML Responses", important: false, data: "Validates if the response is in HTML or XML format." },
    { case: "Check JSON Key-Value Pairs", important: true, data: "Validates specific key-value pairs within the JSON response." },
    { case: "Send Requests and Validate Status Codes", important: true, data: "Sends HTTP requests (GET, POST, PUT, DELETE) and validates response status codes." },
    { case: "Response Body String Validation", important: false, data: "Validates if the response body contains specific strings." },
    { case: "XML to JSON Conversion", important: false, data: "Converts XML responses to JSON format for easier validation." },
    { case: "Nested Element Extraction", important: true, data: "Extracts nested elements from JSON responses for validation." },
  ];

  const handleTestCaseSelect = (testCase) => {
    setSelectedTestCase(testCase);
    const newCase = {
      case: testCase.case.toLowerCase().replace(/ /g, '_'),
      data: null,
      important: true
    };
    setTestCaseData(prevData => [...prevData, newCase]);
  };

  const handleDataChange = (e) => {
    try {
      const updatedData = JSON.parse(e.target.value);
      setTestCaseData(updatedData);
    } catch (error) {
      // If JSON is invalid, don't update the state
      console.error("Invalid JSON input");
    }
  };

  return (
    <div className="test-cases-container">
      <div className="test-cases-list">
        <h3>Test Cases:</h3>
        {predefinedTestCases.map((testCase, index) => (
          <button
            key={index}
            className={`test-case-button ${selectedTestCase === testCase ? 'selected' : ''}`}
            onClick={() => handleTestCaseSelect(testCase)}
          >
            {index + 1}. {testCase.case}
          </button>
        ))}
      </div>
      <div className="test-case-details">
        <h3>Test Case Details</h3>
        <textarea
          value={JSON.stringify(testCaseData, null, 2)}
          onChange={handleDataChange}
          style={{
            width: '100%',
            height: '500px',
            resize: 'none',
            fontFamily: 'monospace',
          }}
        />
      </div>
    </div>
  );
};

export default TestCases;