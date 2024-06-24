import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";
import SelectWorkSpace from "../components/SelectWorkSpace";
import TestCases from "../components/TestCases";
import EndPointData from "../components/EndPointData";
import WorkSpaceDisplay from "../components/WorkSpaceDisplay";
import JsonInput from "../components/JsonInput";
import KeyValueInput from "../components/KeyValueInput";

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

  const handleSaveToWorkspace = async (path: any) => {
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
    setShowScripts(true);
  };

  const handleTestCaseSelect = (testCase: React.SetStateAction<null>) => {
    setSelectedTestCase(testCase);
  };

  return (
    <div style={{ marginLeft: 300, marginRight: 300 }}>
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
      />
      <JsonInput initJson={body} onJsonParsed={setBody} />
      <KeyValueInput headers={headers} onObjectParsed={setHeaders} />
      
      {showScripts && <TestCases testCases={testCases} setTestCases={setTestCases} onTestCaseSelect={undefined} />}
      
            {/* Selected Test Case Display */}
            {selectedTestCase && (
        <div 
          style={{
            position: 'fixed',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '250px',
            padding: '15px',
            backgroundColor: 'black',
            color: 'white',
            border: '1px solid #444',
            borderRadius: '5px',
          }}
        >
          <h6>Selected Test Case:</h6>
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

      {showScripts && (
        <TestCases 
          testCases={testCases} 
          setTestCases={setTestCases} 
          onTestCaseSelect={handleTestCaseSelect}
        />
      )}

      {/* <WorkSpaceDisplay
        token={token}
        workspace_id={workspace_id}
        setHeaders={setHeaders}
        setBody={setBody}
        setTestCases={setTestCases}
        setUrl={setUrl}
        setMethod={setMethod}
      /> */}
    </div>
  );
}

export default Main;