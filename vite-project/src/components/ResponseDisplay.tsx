import React from 'react';

function ResponseDisplay({ data }) {
  return (
    <div className="mt-4">
      <h2>Response Data</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default ResponseDisplay;
