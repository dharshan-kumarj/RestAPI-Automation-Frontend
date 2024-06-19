import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TestCases = ({ testCases, setTestCases }) => {
  const [newTestCase, setNewTestCase] = useState({
    "case": "",
    "data": "",
    "imp": false,
    "chack_previous_case": false
  });

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
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const addTestCase = () => {
    if (newTestCase.case.trim() === "") return;

    const formattedTestCase = {
      ...newTestCase,
      data: parseData(newTestCase.data)
    };

    setTestCases([...testCases, formattedTestCase]);
    setNewTestCase({
      "case": "",
      "data": "",
      "imp": false,
      "chack_previous_case": false
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

  return (
    <div className="card" style={{ position: 'fixed', top: '20px', right: '20px', width: '300px', height: '400px', overflowY: 'auto' }}>
      <div className="card-body">
        <h5 className="card-title">Test Cases</h5>
        <ul className="list-group mb-3">
          {testCases.map((testCase, index) => (
            <li key={index} className="list-group-item">
              <strong>Case:</strong> {testCase.case} <br />
              <strong>Data:</strong> {JSON.stringify(testCase.data)} <br />
              <strong>Important:</strong> {testCase.imp ? 'Yes' : 'No'} <br />
              {testCase.chack_previous_case !== undefined && (
                <>
                  <strong>Check Previous Case:</strong> {testCase.chack_previous_case ? 'Yes' : 'No'} <br />
                </>
              )}
              <button className="btn btn-sm btn-primary mr-2" onClick={() => toggleImportance(index)}>
                {testCase.imp ? 'Unmark Important' : 'Mark Important'}
              </button>
              <button className="btn btn-sm btn-danger" onClick={() => deleteTestCase(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        <h6>Add New Test Case</h6>
        <div className="form-group">
          <input
            type="text"
            name="case"
            className="form-control"
            placeholder="Case"
            value={newTestCase.case}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="data"
            className="form-control"
            placeholder="Data (JSON or String)"
            value={newTestCase.data}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            name="imp"
            className="form-check-input"
            checked={newTestCase.imp}
            onChange={handleInputChange}
          />
          <label className="form-check-label">Important</label>
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            name="chack_previous_case"
            className="form-check-input"
            checked={newTestCase.chack_previous_case}
            onChange={handleInputChange}
          />
          <label className="form-check-label">Check Previous Case</label>
        </div>
        <button className="btn btn-primary" onClick={addTestCase}>
          Add Test Case
        </button>
      </div>
    </div>
  );
}

export default TestCases;
