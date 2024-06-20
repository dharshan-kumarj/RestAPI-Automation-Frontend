import React, { useState, useEffect } from 'react';

function SelectWorkspace(props) {
    const [workspaceName, setWorkspaceName] = useState('');
    const [workspaceID, setWorkspaceID] = useState('');
    const [workspaces, setWorkspaces] = useState([]);
    const token = props.token;

    useEffect(() => {
        const fetchWorkspaces = async () => {
            try {
                const response = await fetch('http://localhost:8000/get-all-workspace', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Token': token
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                if (data.valid) {
                    setWorkspaces(data.workspaces);
                }
            } catch (error) {
                console.error('Error fetching workspaces:', error);
            }
        };

        fetchWorkspaces();
    }, [token]);
    
    const createWorkspace = async () => {
        try {
            const response = await fetch('http://localhost:8000/create-workspace', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Token': token
                },
                body: JSON.stringify({ name: workspaceName })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
        } catch (error) {
            console.error('Error creating workspace:', error);
        }
    };

    return (
        <>
            <div>Select Workspace</div>
            <input
                type="text"
                className='workspace-name'
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
            />
            <button onClick={createWorkspace}>Create Workspace</button>

            <div>
                <label htmlFor="workspace-select">Select Workspace:</label>
                <select id="workspace-select" onChange={(e) => setWorkspaceID(e.target.value)}>
                    <option value="">Select a workspace</option>
                    {workspaces.map((workspace) => (
                        <option key={workspace._id} value={workspace._id}>
                            {workspace.name}
                        </option>
                    ))}
                </select>
                <button onClick={()=>{window.location.href = "http://localhost:5173/?workspace="+workspaceID}}>open</button>
            </div>
        </>
    );
}

export default SelectWorkspace;
