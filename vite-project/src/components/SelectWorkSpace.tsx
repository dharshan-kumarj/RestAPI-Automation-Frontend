import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function SelectWorkspace(props) {
    const [workspaceName, setWorkspaceName] = useState('');
    const [workspaceID, setWorkspaceID] = useState('');
    const [workspaces, setWorkspaces] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const token = props.token;

    useEffect(() => {
        const fetchWorkspaces = async () => {
            try {
                const response = await fetch('https://api-testing-zelerius.portos.site/get-all-workspace', {
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
                    console.log(data.workspaces)
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
            const response = await fetch('https://api-testing-zelerius.portos.site/create-workspace', {
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
            if (data.valid) {
                
                setWorkspaces([...workspaces, { _id: data.id, name: workspaceName }]);
                setWorkspaceName('');
                setShowModal(false);
            }
        } catch (error) {
            console.error('Error creating workspace:', error);
        }
    };

    const handleCardClick = (id) => {
        window.location.href = `https://zelerius-api.portos.site/?workspace=${id}`;
    };

    return (
        <>
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Select Workspace</h2>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                        Add Workspace
                    </button>
                </div>

                <div className="row">
                    {workspaces.map((workspace) => (
                        <div className="col-md-4 mb-4" key={workspace._id}>
                            <div className="card" onClick={() => handleCardClick(workspace._id)}>
                                <div className="card-body">
                                    <h5 className="card-title">{workspace.name}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showModal && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Workspace</h5>
                            
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="workspace-name">Workspace Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="workspace-name"
                                        value={workspaceName}
                                        onChange={(e) => setWorkspaceName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={createWorkspace}
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default SelectWorkspace;
