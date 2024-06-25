import React from 'react';

function ResponseDisplay({ data }) {
  if (!data) return <p>Enter the URL and click Send to get a Response.</p>;

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default ResponseDisplay;