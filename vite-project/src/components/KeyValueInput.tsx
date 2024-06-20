import React, { useState, useEffect } from 'react';

const KeyValueInput = ({ initObjectParsed, onObjectParsed }) => {
  const [keyValuePairs, setKeyValuePairs] = useState([{ key: '', value: '' }]);
  const [parsedObject, setParsedObject] = useState(null);

  useEffect(() => {
    // Initialize key-value pairs when initObjectParsed changes
    if (initObjectParsed) {
      const pairs = Object.entries(initObjectParsed).map(([key, value]) => ({ key, value }));
      setKeyValuePairs(pairs);
    }
  }, [initObjectParsed]);

  const handleInputChange = (index, field, value) => {
    const newKeyValuePairs = [...keyValuePairs];
    newKeyValuePairs[index][field] = value;
    setKeyValuePairs(newKeyValuePairs);
  };

  const handleAddPair = () => {
    setKeyValuePairs([...keyValuePairs, { key: '', value: '' }]);
  };

  const handleRemovePair = (index) => {
    const newKeyValuePairs = keyValuePairs.filter((_, i) => i !== index);
    setKeyValuePairs(newKeyValuePairs);
  };

  const handleParseObject = () => {
    const obj = {};
    keyValuePairs.forEach(pair => {
      if (pair.key) {
        obj[pair.key] = pair.value;
      }
    });
    setParsedObject(obj);
    onObjectParsed(obj); // Pass the parsed object back to the parent
  };

  return (
    <div className="container mt-4">
      {keyValuePairs.map((pair, index) => (
        <div className="form-row align-items-center mb-2" key={index}>
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
          <div className="col-auto">
            <button className="btn btn-danger" onClick={() => handleRemovePair(index)}>Remove</button>
          </div>
        </div>
      ))}
      <button className="btn btn-secondary mt-2" onClick={handleAddPair}>Add Pair</button>
      <br />
      <button className="btn btn-primary mt-2" onClick={handleParseObject}>Parse Object</button>
      {parsedObject && (
        <pre className="bg-light p-3 mt-3 border rounded">
          {JSON.stringify(parsedObject, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default KeyValueInput;
