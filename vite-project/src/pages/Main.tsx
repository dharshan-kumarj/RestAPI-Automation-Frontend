import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SelectWorkSpace from "../components/SelectWorkSpace";
import TestCases from "../components/TestCases";

function Main() {
    const [token, setToken] = useState("");
    const [searchParams] = useSearchParams();
    const workspace_id = searchParams.get("workspace");
    const [testCases, setTestCases] = useState([
        {
            "case": "check_status_code",
            "data": 400,
            "imp": false
        },
        {
            "case": "check_valid_json",
            "data": null,
            "imp": true
        },
        {
            "case": "response_body_contains_string",
            "data": "token",
            "imp": false
        },
        {
            "case": "check_json_key",
            "data": "token",
            "imp": true
        },
        {
            "case": "check_json_key_value",
            "data": {
                "key": "valid",
                "value": true
            },
            "imp": true
        },
        {
            "case": "validate_response_schema",
            "data": {
                "valid": "",
                "token": ""
            },
            "imp": false
        },
        {
            "case": "set_global_variable_from_response",
            "data": {
                "key": "token",
                "value": "response['token']"
            },
            "chack_previous_case": true,
            "imp": true
        }
    ]);

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
        return (
            <>
                <SelectWorkSpace token={token} />
            </>
        );
    }
    console.log(testCases)
    return (
        <div>
            <h1>Main Component {workspace_id}</h1>
            <TestCases testCases={testCases} setTestCases={setTestCases} />
        </div>
    );
}

export default Main;
