import React, { useState, useEffect } from 'react';
import '../KeyValue.css'; // Import the stylesheet

const KeyValueInput = ({ initKeyValue,setResult }) => {
  const [keyValuePairs, setKeyValuePairs] = useState([]);
  const [parsedObject, setParsedObject] = useState({});

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
  };

  const handleAddPair = () => {
    setKeyValuePairs([...keyValuePairs, { key: '', value: '', description: '' }]);
  };

  const handleRemovePair = (index) => {
    const newKeyValuePairs = keyValuePairs.filter((_, i) => i !== index);
    setKeyValuePairs(newKeyValuePairs);
  };

  const handleParse = () => {
    const obj = {};
    keyValuePairs.forEach(pair => {
      if (pair.key) {
        obj[pair.key] = pair.value;
      }
    });
    setResult(obj)
    setParsedObject(obj);
  };

  return (
    <div className="container mt-4">
      <div className='text-end mb-3'>
        <button className="btn btn-secondary mt-2 me-2" onClick={handleAddPair}>Add Pair</button>
        <button className="btn btn-primary mt-2" onClick={handleParse}>Parse</button>
      </div>
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
      
      {Object.keys(parsedObject).length > 0 && (
        <div className="mt-4">
          <h5>Parsed Object:</h5>
          <pre className="pre-custom">{JSON.stringify(parsedObject, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default KeyValueInput;