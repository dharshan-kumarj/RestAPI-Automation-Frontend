import React, { useEffect, useState } from "react";
import "../TestCases.css";

const TestCases = ({ testCase, setTestCases }) => {
  const [selectedTestCase, setSelectedTestCase] = useState(null);
  const [testCaseData, setTestCaseData] = useState([]);

  const predefinedTestCases = [
    { case: "Check Status 200", important: true, data: "checks whether the response comes with the status code of 200" },
    { case: "Validation of Response Body", important: false, data: "Compares the actual response body with the expected body content." },
    { case: "Check Valid JSON", important: true, data: "Validates if the response is in JSON format." },
    { case: "Check for Specific Header Elements", important: false, data: "Validates the presence of specific headers in the response." },
    { case: "Check HTML and XML Responses", important: false, data: "Validates if the response is in HTML or XML format." },
    { case: "Check JSON Key-Value Pairs", important: false, data: "Validates specific key-value pairs within the JSON response." },
    { case: "Send Requests and Validate Status Codes", important: false, data: "Sends HTTP requests (GET, POST, PUT, DELETE) and validates response status codes." },
    { case: "Response Body String Validation", important: false, data: "Validates if the response body contains specific strings." },
    { case: "XML to JSON Conversion", important: false, data: "Converts XML responses to JSON format for easier validation." },
    { case: "Set global variable", important: false, data: "Extracts nested elements from JSON responses for validation." },
    { case: "Set global variable from response", important: false, data: "Extracts nested elements from JSON responses for validation." },
  ];

  const handleTestCaseSelect = (testCase) => {
    setSelectedTestCase(testCase);
    const newCase = {
      case: testCase.case.toLowerCase().replace(/ /g, '_'),
      data: null,
      important: testCase.important
    };
    
    if (
      testCase.case === "Set global variable" || 
      testCase.case === "Set global variable from response"
    ) {
      newCase.check_previous_case = false;
    }
    
    setTestCaseData(prevData => [...prevData, newCase]);
  };

  const handleDataChange = (e) => {
    try {
      const updatedData = JSON.parse(e.target.value);
      setTestCaseData(updatedData);
    } catch (error) {
      console.error("Invalid JSON input");
    }
  };

  useEffect(() => {
    // Update the parent component's state whenever testCaseData changes
    setTestCases(testCaseData);
  }, [testCaseData, setTestCases]);

  return (
    <div className="test-cases-container">
      <div className="test-cases-list">
        <h3 className="text-white">Test Cases</h3>
        {predefinedTestCases.map((testCase, index) => (
          <button
            key={index}
            className={`test-case-button ${selectedTestCase === testCase ? 'selected' : ''}`}
            onClick={() => handleTestCaseSelect(testCase)}
          >
            <span className="test-case-number">{index + 1}.</span>
            <span className="test-case-title">{testCase.case}</span>
            {(testCase.case === "Check Status 200" || testCase.case === "Check for Valid JSON") && 
              <span className="important-badge">Important</span>
            }
          </button>
        ))}
      </div>
      <div className="test-case-details">
        <h3 className="text-white">Test Case Details</h3>
        <textarea
          value={JSON.stringify(testCaseData, null, 2)}
          onChange={handleDataChange}
          placeholder="JSON data will appear here..."
        />
      </div>
    </div>
  );
};

export default TestCases;
