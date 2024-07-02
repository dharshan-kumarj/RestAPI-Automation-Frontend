import React, { useState, useEffect } from 'react';

const KeyValueInput = ({ headers, onObjectParsed }) => {
  const [keyValuePairs, setKeyValuePairs] = useState([]);

  // Initialize state with default headers if provided
  useEffect(() => {
    if (headers) {
      const initialPairs = Object.keys(headers).map(key => ({ key, value: headers[key], description: '' }));
      setKeyValuePairs(initialPairs);
    }
  }, [headers]);

  // Update parsed object whenever keyValuePairs changes
  useEffect(() => {
    const obj = {};
    keyValuePairs.forEach(pair => {
      if (pair.key) {
        obj[pair.key] = pair.value;
      }
    });
    console.log("Updated Object:", obj);
    onObjectParsed(obj);
  }, [keyValuePairs, onObjectParsed]);

  const handleInputChange = (index, field, value) => {
    const newKeyValuePairs = [...keyValuePairs];
    newKeyValuePairs[index][field] = value;
    setKeyValuePairs(newKeyValuePairs);
  };

  const handleAddPair = () => {
    setKeyValuePairs([...keyValuePairs, { key: '', value: '', description: '' }]);
  };

  const handleRemovePair = (index) => {
    const newKeyValuePairs = keyValuePairs.filter((_, i) => i !== index);
    setKeyValuePairs(newKeyValuePairs);
  };



  return (
    <div className="container mt-4">
      {keyValuePairs.map((pair, index) => (
        <div className="form-row align-items-center mb-2" key={index}>
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Key"
                value={pair.key}
                onChange={(e) => handleInputChange(index, 'key', e.target.value)}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Value"
                value={pair.value}
                onChange={(e) => handleInputChange(index, 'value', e.target.value)}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={pair.description}
                onChange={(e) => handleInputChange(index, 'description', e.target.value)}
              />
            </div>
            <div className="col-auto">
              <button className="btn btn-danger" onClick={() => handleRemovePair(index)}>Remove</button>
            </div>
          </div>
        </div>
      ))}
      <button className="btn btn-secondary mt-2" onClick={handleAddPair}>Add Pair</button>
      <br />
    </div>
  );
};

export default KeyValueInput;
