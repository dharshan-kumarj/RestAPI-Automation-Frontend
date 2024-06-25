// TestCases.jsx
import React, { useState } from "react";
import "../TestCases.css";

const TestCases = () => {
  const [selectedTestCase, setSelectedTestCase] = useState(null);

  const predefinedTestCases = [
    { case: "Validation of Response Schema", important: true, data: "Extracts and compares the structure of the actual response against the expected schema." },
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
        {selectedTestCase ? (
          <div>
            <h4>{selectedTestCase.case}</h4>
            <p><strong>Description:</strong> {selectedTestCase.data}</p>
            <p><strong>Important:</strong> {selectedTestCase.important ? 'Yes' : 'No'}</p>
          </div>
        ) : (
          <p>Select a test case to view details</p>
        )}
      </div>
    </div>
  );
};

export default TestCases;