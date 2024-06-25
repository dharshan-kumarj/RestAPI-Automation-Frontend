import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";
import SelectWorkSpace from "../components/SelectWorkSpace";
import TestCases from "../components/TestCases";
import EndPointData from "../components/EndPointData";
import WorkSpaceDisplay from "../components/WorkSpaceDisplay";
import JsonInput from "../components/JsonInput";
import KeyValueInput from "../components/KeyValueInput";
import ResponseDisplay from "../components/ResponseDisplay";

function Main() {
  const [token, setToken] = useState("");
  const [searchParams] = useSearchParams();
  const workspace_id = searchParams.get("workspace");
  const [testCases, setTestCases] = useState([]);
  const [headers, setHeaders] = useState({});
  const [body, setBody] = useState({});
  const [method, setMethod] = useState("POST");
  const [url, setUrl] = useState("");
  const [showScripts, setShowScripts] = useState(false);
  const [selectedTestCase, setSelectedTestCase] = useState(null);
  const [responseData, setResponseData] = useState(null);

  console.log("testcases", testCases);
  console.log("headers", headers);
  console.log("body", body);
  console.log("method", method);
  console.log("url", url);

  const checkToken = async () => {
    const token = Cookies.get("token");
    if (!token) {
      window.location.href = "http://localhost:5173/login";
      return;
    }
    setToken(token);
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (!workspace_id) {
    return <SelectWorkSpace token={token} />;
  }

  const handleSaveToWorkspace = async (path) => {
    const saveData = {
      workspace_id: workspace_id,
      request: {
        method: method,
        url: url,
        headers: headers,
        body: body,
        test_cases: testCases,
      },
      path: path,
    };

    try {
      const response = await fetch("http://localhost:8000/save-to-workspace", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
        body: JSON.stringify(saveData),
      });

      if (!response.ok) {
        throw new Error("Failed to save to workspace");
      }

      alert("Saved to workspace successfully!");
    } catch (error) {
      console.error("Error saving to workspace:", error);
      alert("Failed to save to workspace");
    }
  };

  const handleScriptsClick = () => {
    setShowScripts(!showScripts);
  };

  const handleTestCaseSelect = (testCase) => {
    setSelectedTestCase(testCase);
  };

  const handleResponse = (data) => {
    setResponseData(data);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', marginLeft: 300, marginRight: 300 }}>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <h1>Main Component {workspace_id}</h1>
        <EndPointData
          method={method}
          url={url}
          setMethod={setMethod}
          setUrl={setUrl}
          token={token}
          headers={headers}
          body={body}
          testCases={testCases}
          workspace_id={workspace_id}
          onScriptsClick={handleScriptsClick}
          onResponse={handleResponse}
        />

        {showScripts ? (
          <div style={{ marginTop: 20 }}>
            <div style={{ display: 'flex', minHeight: '400px', border: '1px solid #ccc' }}>
              <div style={{ 
                width: '300px', 
                backgroundColor: '#f0f0f0', 
                borderRight: '1px solid #ccc',
                padding: '20px'
              }}>
                <h2>Test Case Details</h2>
                {selectedTestCase && (
                  <div>
                    <p><strong>Case:</strong> {selectedTestCase.case}</p>
                    {selectedTestCase.data && (
                      <p><strong>Data:</strong> {JSON.stringify(selectedTestCase.data)}</p>
                    )}
                    {selectedTestCase.imp !== undefined && (
                      <p><strong>Important:</strong> {selectedTestCase.imp ? "Yes" : "No"}</p>
                    )}
                    {selectedTestCase.chack_previous_case !== undefined && (
                      <p><strong>Check Previous Case:</strong> {selectedTestCase.chack_previous_case ? "Yes" : "No"}</p>
                    )}
                  </div>
                )}
              </div>
              
              <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                <h2>Test Cases</h2>
                <TestCases 
                  testCases={testCases} 
                  setTestCases={setTestCases} 
                  onTestCaseSelect={handleTestCaseSelect}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <JsonInput initJson={body} onJsonParsed={setBody} />
            <KeyValueInput headers={headers} onObjectParsed={setHeaders} />
          </>
        )}

        <WorkSpaceDisplay
          token={token}
          workspace_id={workspace_id}
          setHeaders={setHeaders}
          setBody={setBody}
          setTestCases={setTestCases}
          setUrl={setUrl}
          setMethod={setMethod}
        />
      </div>

      <div style={{ height: '300px', borderTop: '1px solid #ccc', overflowY: 'auto' }}>
        <h2>Response</h2>
        <ResponseDisplay data={responseData} />
      </div>
    </div>
  );
}

export default Main;