import React from 'react';

import { useState } from "react";
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
        <div>
            <h1>Test Cases</h1>
            <ul>
                {testCases.map((testCase, index) => (
                    <li key={index} style={{ marginBottom: '10px' }}>
                        <strong>Case:</strong> {testCase.case} <br />
                        <strong>Data:</strong> {JSON.stringify(testCase.data)} <br />
                        <strong>Important:</strong> {testCase.imp ? 'Yes' : 'No'} <br />
                        {testCase.chack_previous_case !== undefined && (
                            <>
                                <strong>Check Previous Case:</strong> {testCase.chack_previous_case ? 'Yes' : 'No'} <br />
                            </>
                        )}
                        <button onClick={() => toggleImportance(index)}>
                            {testCase.imp ? 'Mark as Not Important' : 'Mark as Important'}
                        </button>
                        <button onClick={() => deleteTestCase(index)} style={{ marginLeft: '10px' }}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <div style={{ marginTop: '20px' }}>
                <h2>Add New Test Case</h2>
                <input
                    type="text"
                    name="case"
                    placeholder="Case"
                    value={newTestCase.case}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="data"
                    placeholder="Data (JSON or String)"
                    value={newTestCase.data}
                    onChange={handleInputChange}
                />
                <label>
                    <input
                        type="checkbox"
                        name="imp"
                        checked={newTestCase.imp}
                        onChange={handleInputChange}
                    />
                    Important
                </label>
                <label style={{ marginLeft: '10px' }}>
                    <input
                        type="checkbox"
                        name="chack_previous_case"
                        checked={newTestCase.chack_previous_case}
                        onChange={handleInputChange}
                    />
                    Check Previous Case
                </label>
                <button onClick={addTestCase} style={{ marginLeft: '10px' }}>
                    Add Test Case
                </button>
            </div>
        </div>
    );
}

export default TestCases;
