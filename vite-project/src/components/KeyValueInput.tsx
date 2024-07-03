import React, { useState, useEffect } from 'react';

const KeyValueInput = ({ initKeyValue, onObjectParsed }) => {
  const [keyValuePairs, setKeyValuePairs] = useState([]);
  const [parsedObject, setParsedObject] = useState({});

  // Initialize state with default initKeyValue if provided
  useEffect(() => {
    if (initKeyValue) {
      const initialPairs = Object.keys(initKeyValue).map(key => ({ key, value: initKeyValue[key], description: '' }));
      setKeyValuePairs(initialPairs);
    }
  }, [initKeyValue]);

  const handleInputChange = (index, field, value) => {
    const newKeyValuePairs = [...keyValuePairs];
    newKeyValuePairs[index][field] = value;
    setKeyValuePairs(newKeyValuePairs);
    handleParse(newKeyValuePairs);
  };

  const handleAddPair = () => {
    setKeyValuePairs([...keyValuePairs, { key: '', value: '', description: '' }]);
  };

  const handleRemovePair = (index) => {
    const newKeyValuePairs = keyValuePairs.filter((_, i) => i !== index);
    setKeyValuePairs(newKeyValuePairs);
    handleParse(newKeyValuePairs);
  };

  const handleParse = (pairs = keyValuePairs) => {
    const obj = {};
    pairs.forEach(pair => {
      if (pair.key) {
        obj[pair.key] = pair.value;
      }
    });
    setParsedObject(obj);
    onObjectParsed(obj);
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

      {Object.keys(parsedObject).length > 0 && (
        <div className="mt-4">
          <h5>Parsed Object:</h5>
          <pre>{JSON.stringify(parsedObject, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default KeyValueInput;
