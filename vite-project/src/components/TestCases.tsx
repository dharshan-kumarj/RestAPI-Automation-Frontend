import React, { useEffect, useState } from "react";

const TestCases = ({ testCases, setTestCases, onTestCaseSelect }) => {
  const [newTestCase, setNewTestCase] = useState({
    case: "",
    data: "",
    imp: false,
    chack_previous_case: false,
  });

  const predefinedTestCases = [
    { case: "Check status 200" },
    { case: "Check valid JSON" },
    { case: "Check valid string" },
  ];

  useEffect(() => {
    setNewTestCase({
      case: "",
      data: "",
      imp: false,
      chack_previous_case: false,
    });
  }, [testCases]);

  const toggleImportance = (index) => {
    const updatedTestCases = testCases.map((testCase, i) =>
      i === index ? { ...testCase, imp: !testCase.imp } : testCase
    );
    setTestCases(updatedTestCases);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTestCase({
      ...newTestCase,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const addTestCase = () => {
    if (newTestCase.case.trim() === "") return;

    const formattedTestCase = {
      ...newTestCase,
      data: parseData(newTestCase.data),
    };

    setTestCases([...testCases, formattedTestCase]);
    setNewTestCase({
      case: "",
      data: "",
      imp: false,
      chack_previous_case: false,
    });
  };

  const deleteTestCase = (index) => {
    const updatedTestCases = testCases.filter((_, i) => i !== index);
    setTestCases(updatedTestCases);
  };

  const parseData = (data) => {
    try {
      return JSON.parse(data);
    } catch {
      return data;
    }
  };

  const handleTestCaseClick = (testCase) => {
    onTestCaseSelect(testCase);
  };

  return (
    <div
      className="card"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        width: "300px",
        height: "400px",
        overflowY: "auto",
        backgroundColor: "black",
        color: "white",
      }}
    >
      <div className="card-body">
        <h5 className="card-title" style={{ color: "white" }}>Test Cases</h5>
        
        {/* Predefined Test Cases */}
        <ul className="list-group mb-3">
          {predefinedTestCases.map((testCase, index) => (
            <li 
              key={index} 
              className="list-group-item" 
              style={{ 
                backgroundColor: "black", 
                color: "#6c757d",
                border: "1px solid #444",
                cursor: "pointer"
              }}
              onClick={() => handleTestCaseClick(testCase)}
            >
              {testCase.case}
            </li>
          ))}
        </ul>

        {/* User-added Test Cases */}
        <ul className="list-group mb-3">
          {testCases.map((testCase, index) => (
            <li 
              key={index} 
              className="list-group-item" 
              style={{ 
                backgroundColor: "black", 
                color: "white", 
                border: "1px solid #444",
                cursor: "pointer"
              }}
              onClick={() => handleTestCaseClick(testCase)}
            >
              <strong>Case:</strong> {testCase.case} <br />
              <strong>Important:</strong> {testCase.imp ? "Yes" : "No"} <br />
              {testCase.chack_previous_case !== undefined && (
                <>
                  <strong>Check Previous Case:</strong>{" "}
                  {testCase.chack_previous_case ? "Yes" : "No"} <br />
                </>
              )}
              <button
                className="btn btn-sm btn-outline-primary mr-2 mt-2"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleImportance(index);
                }}
              >
                {testCase.imp ? "Unmark Important" : "Mark Important"}
              </button>
              <button
                className="btn btn-sm btn-outline-danger mt-2"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTestCase(index);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        <h6 style={{ color: "white" }}>Add New Test Case</h6>
        <div className="form-group">
          <input
            type="text"
            name="case"
            className="form-control bg-dark text-white"
            placeholder="Case Name"
            value={newTestCase.case}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <textarea
            name="data"
            className="form-control bg-dark text-white"
            placeholder="Data (JSON or Text)"
            value={newTestCase.data}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label style={{ color: "white" }}>
            <input
              type="checkbox"
              name="imp"
              checked={newTestCase.imp}
              onChange={handleInputChange}
            />{" "}
            Important
          </label>
        </div>
        <div className="form-group">
          <label style={{ color: "white" }}>
            <input
              type="checkbox"
              name="chack_previous_case"
              checked={newTestCase.chack_previous_case}
              onChange={handleInputChange}
            />{" "}
            Check Previous Case
          </label>
        </div>
        <button className="btn btn-primary" onClick={addTestCase}>
          Add Test Case
        </button>
      </div>
    </div>
  );
};

export default TestCases;