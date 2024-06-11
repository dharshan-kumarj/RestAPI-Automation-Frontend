import React, { useState } from 'react';
import { NodeProps } from 'react-flow-renderer';

const MethodNode = (props: NodeProps) => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');

  const handleMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMethod(e.target.value);
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  return (
    <div style={{ position: 'absolute', left: props.xPos, top: props.yPos }}>
      <div className="bg-light p-3 rounded">
        <div className="mb-3">
          <select
            className="form-select form-select-sm"
            value={method}
            onChange={handleMethodChange}
          >
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="Enter URL"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <div>
          <button className="btn btn-primary btn-sm">Send</button>
        </div>
      </div>
    </div>
  );
};

export default MethodNode;