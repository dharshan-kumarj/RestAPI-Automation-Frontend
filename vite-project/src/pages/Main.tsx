import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
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
  const [headers, setHeaders] = useState({"test55":"hello"});
  const [body, setBody] = useState({});
  const [method, setMethod] = useState("POST");
  const [url, setUrl] = useState("");

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

  return (
    <div style={{ marginLeft: 300, marginRight: 300 }}>
      <h1>Main Component {workspace_id}</h1>
      <JsonInput initJson={body} onJsonParsed={setBody} />
      <KeyValueInput headers={headers} onObjectParsed={setHeaders} />

      <TestCases testCases={testCases} setTestCases={setTestCases} />
      <EndPointData

        method={method}
        url={url}
        setMethod={setMethod}
        setUrl={setUrl}
        token={token}
        headers={headers}
        body={body}
        testCases={testCases}
      />
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
  );
}

export default Main;
