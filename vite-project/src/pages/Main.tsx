import Cookies from "js-cookie";
import Reat, { useEffect, createContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SelectWrokSpace from "../components/SelectWorkSpace"

function Main() {
    const [token, setToken] = useState("")
    const [searchParams] = useSearchParams();
    const workspace_id = searchParams.get("workspace");
    const checkToken = async () => {
        const token = Cookies.get("token");

        if (!token) {
            window.location.href = "http://localhost:8000/login";
            return;
        }
        setToken(token)
    };
    useEffect(() => {
        checkToken();
    }, []);
    if (!workspace_id) {
        return <>
                <SelectWrokSpace token={token}/>
            
        </>
    }

    return <><div><h1>Main Component {workspace_id}</h1>


    </div></>
}
export default Main