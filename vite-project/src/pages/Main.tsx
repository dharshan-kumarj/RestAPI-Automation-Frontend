import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";
import SelectWorkSpace from "../components/SelectWorkSpace";
import TestCases from "../components/TestCases";
import EndPointData from "../components/EndPointData";
import WorkSpaceDisplay from "../components/WorkSpaceDisplay";
import JsonInput from "../components/JsonInput";
import KeyValueInput from "../components/KeyValueInput";
import ResponseAnalysisDisplay from "../components/ResponseDisplay";
import UserBar from "../components/UserBar";

interface TestCase {
  case: string;
  data?: any;
  imp?: boolean;
  check_previous_case?: boolean;
}

const Resizer = ({ onResize }) => (
  <div
    style={{
      height: '8px',
      cursor: 'row-resize',
      backgroundColor: '#e0e0e0',
      borderTop: '1px solid #ccc',
      borderBottom: '1px solid #ccc',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onMouseDown={onResize}
  >
    <div style={{
      width: '30px',
      height: '4px',
      backgroundColor: '#888',
      borderRadius: '2px',
    }} />
  </div>
);

const HorizontalResizer = ({ onResize }) => (
  <div
    style={{
      width: '8px',
      cursor: 'col-resize',
      backgroundColor: '#e0e0e0',
      borderLeft: '1px solid #ccc',
      borderRight: '1px solid #ccc',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onMouseDown={onResize}
  >
    <div style={{
      height: '30px',
      width: '4px',
      backgroundColor: '#888',
      borderRadius: '2px',
    }} />
  </div>
);

function Main() {
  const [token, setToken] = useState<string>("");
  const [searchParams] = useSearchParams();
  const workspace_id = searchParams.get("workspace");
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [headers, setHeaders] = useState<Record<string, string>>({});
  const [params, setParams] = useState<Record<string, string>>({});
  const [body, setBody] = useState<Record<string, any>>({});
  const [method, setMethod] = useState<string>("POST");
  const [url, setUrl] = useState<string>("");
  const [responseData, setResponseData] = useState<any>(null);
  const [aiAnalysis, setAiAnalysis] = useState<string>("");
  const [testCaseResults, setTestCaseResults] = useState<any>(null);
  const [responseAreaHeight, setResponseAreaHeight] = useState(400);
  const [workspaceWidth, setWorkspaceWidth] = useState(300);
  const contentRef = useRef(null);
  const [currentSection, setCurrentSection] = useState<string>("");

  const styles = {
    mainContainer: {
      display: 'flex',
      flexDirection: 'column' as 'column',
      height: '100vh',
      marginLeft: 300,
      marginRight: 300,
    },
    contentArea: {
      flex: 1,
      overflowY: 'auto' as 'auto',
      minHeight: '200px',
    },
    responseArea: {
      height: `${responseAreaHeight}px`,
      backgroundColor: '#1e1e1e',
      color: 'white',
      overflowY: 'auto' as 'auto',
    },
    workspaceDisplay: {
      width: `${workspaceWidth}px`,
      overflowY: 'auto' as 'auto',
    },
  };

  const checkToken = async () => {
    const token = Cookies.get("token");
    if (!token) {
      window.location.href = "https://zelerius-api.portos.site/login";
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




  const handleResponse = (data: any) => {
    setResponseData(data.response);
    setAiAnalysis(typeof data.ai_analysis === 'object'
      ? JSON.stringify(data.ai_analysis, null, 2)
      : data.ai_analysis);
    setTestCaseResults(data.test_result);
  };

  const handleVerticalResize = (mouseDownEvent) => {
    mouseDownEvent.preventDefault();
    const startPosition = mouseDownEvent.clientY;
    const startHeight = responseAreaHeight;

    function onMouseMove(mouseMoveEvent) {
      const containerHeight = contentRef.current.offsetHeight;
      const deltaY = startPosition - mouseMoveEvent.clientY;
      const newHeight = Math.min(
        Math.max(100, startHeight + deltaY),
        containerHeight - 200
      );
      setResponseAreaHeight(newHeight);
    }

    function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handleHorizontalResize = (mouseDownEvent) => {
    mouseDownEvent.preventDefault();
    const startPosition = mouseDownEvent.clientX;
    const startWidth = workspaceWidth;

    function onMouseMove(mouseMoveEvent) {
      const containerWidth = contentRef.current.offsetWidth;
      const deltaX = mouseMoveEvent.clientX - startPosition;
      const newWidth = Math.min(
        Math.max(100, startWidth + deltaX),
        containerWidth - 200
      );
      setWorkspaceWidth(newWidth);
    }

    function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  console.log("Key Value headers", headers)
  return (
    <>
      <div className="bg-dark">
        <UserBar />
        <div className="row" style={{ overflowX: "hidden" }}>
          <div className="col-3" style={styles.workspaceDisplay}>
            <WorkSpaceDisplay
              token={token}
              workspace_id={workspace_id}
              setHeaders={setHeaders}
              setBody={setBody}
              setTestCases={setTestCases}
              setUrl={setUrl}
              setMethod={setMethod}
              handleResponse={handleResponse}
            />
          </div>

          <HorizontalResizer onResize={handleHorizontalResize} />

          <div className="col">
            <div style={{}} ref={contentRef}>
              <div
                style={{ ...styles.contentArea, height: `calc(100vh - ${responseAreaHeight}px - 8px)` }}>
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
                  params={params}
                  onResponse={handleResponse}
                  setCurrentSection={setCurrentSection}
                />

                {currentSection === 'TestCases' ? (
                  <div style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex', minHeight: '400px', border: '1px solid #ccc' }}>
                      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                        <TestCases
                          testCase={testCases}
                          setTestCases={setTestCases}
                        // onTestCaseSelect={handleTestCaseSelect}
                        />
                      </div>
                    </div>
                  </div>
                ) : currentSection === 'Body' ? (
                  <div style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex', minHeight: '400px', border: '1px solid #ccc' }}>
                      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                        <JsonInput
                          initJson={body}
                          onJsonParsed={setBody}
                        />
                      </div>
                    </div>
                  </div>
                ) : currentSection === 'Headers' ? (
                  <div style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex', minHeight: '400px', border: '1px solid #ccc' }}>
                      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                        <KeyValueInput
                          initKeyValue={headers}
                          setResult={setHeaders}
                        />
                      </div>
                    </div>
                  </div>
                ) : currentSection === 'Params' ? (
                  <div style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex', minHeight: '400px', border: '1px solid #ccc' }}>
                      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
                        <KeyValueInput
                          initKeyValue={params}
                          setResult={setParams}
                        />
                      </div>
                    </div>
                  </div>
                ) : null}

              </div>

              <Resizer onResize={handleVerticalResize} />

              <div style={styles.responseArea}>
                <ResponseAnalysisDisplay
                  responseData={responseData}
                  aiAnalysis={aiAnalysis}
                  testCaseResults={testCaseResults}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;