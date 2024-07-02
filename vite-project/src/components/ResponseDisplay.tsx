import React, { useState } from 'react';

const styles = {
  container: {
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
    padding: '20px',
    borderRadius: '5px',
    fontFamily: 'Courier New, Courier, monospace',
  },
  title: {
    color: '#e0e0e0',
    marginBottom: '20px',
  },
  content: {
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '10px 20px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  pre: {
    backgroundColor: '#2c2c2c',
    padding: '10px',
    borderRadius: '5px',
    overflowX: 'auto',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
  },
  tabContainer: {
    display: 'flex',
    borderBottom: '1px solid #444',
    marginBottom: '20px',
  },
  tabButton: {
    padding: '10px 20px',
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
  },
  activeTabButton: {
    backgroundColor: '#2c2c2c',
  },
};

const ResponseDisplay = ({ responseData }) => {
  const [showRaw, setShowRaw] = useState(false);
  
  let statusCode = '';
  let message = '';

  try {
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(responseData, 'text/html');
    statusCode = parsedHtml.title;
    message = parsedHtml.body.textContent;
  } catch (error) {
    console.error('Error parsing HTML:', error);
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Response</h2>
      <div style={styles.content}>
        <p><strong>Status:</strong> {statusCode || 'N/A'}</p>
        <p><strong>Message:</strong> {message || 'N/A'}</p>
      </div>
      <button 
        style={styles.button}
        onClick={() => setShowRaw(!showRaw)}
      >
        {showRaw ? 'Hide' : 'Show'} Raw Response
      </button>
      {showRaw && (
        <pre style={styles.pre}>
          {responseData}
        </pre>
      )}
      <button 
        style={styles.button}
        onClick={() => navigator.clipboard.writeText(responseData)}
      >
        Copy Raw Response
      </button>
    </div>
  );
};

const AIAnalysisDisplay = ({ aiAnalysis }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>AI Analysis</h2>
      <pre style={{
        backgroundColor: '#2c2c2c',
        padding: '15px',
        borderRadius: '5px',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        fontFamily: 'Courier New, monospace',
        fontSize: '14px',
        lineHeight: '1.5',
        overflowX: 'auto',
      }}>
        {typeof aiAnalysis === 'object' ? JSON.stringify(aiAnalysis, null, 2) : aiAnalysis}
      </pre>
    </div>
  );
};

const TestCasesDisplay = ({ testCaseResults }) => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Test Case Results</h2>
      <pre style={styles.pre}>
        {typeof testCaseResults === 'object' ? JSON.stringify(testCaseResults, null, 2) : testCaseResults}
      </pre>
    </div>
  );
};

const ResponseAnalysisDisplay = ({ responseData, aiAnalysis, testCaseResults }) => {
  const [activeTab, setActiveTab] = useState("response");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div style={styles.container}>
      <div style={styles.tabContainer}>
        <button 
          onClick={() => handleTabClick("response")} 
          style={{...styles.tabButton, ...(activeTab === "response" ? styles.activeTabButton : {})}}
        >
          Response
        </button>
        <button 
          onClick={() => handleTabClick("aiAnalysis")} 
          style={{...styles.tabButton, ...(activeTab === "aiAnalysis" ? styles.activeTabButton : {})}}
        >
          AI Analysis
        </button>
        <button 
          onClick={() => handleTabClick("testCases")} 
          style={{...styles.tabButton, ...(activeTab === "testCases" ? styles.activeTabButton : {})}}
        >
          Test Cases
        </button>
      </div>
      {activeTab === "response" && <ResponseDisplay responseData={responseData} />}
      {activeTab === "aiAnalysis" && <AIAnalysisDisplay aiAnalysis={aiAnalysis} />}
      {activeTab === "testCases" && <TestCasesDisplay testCaseResults={testCaseResults} />}
    </div>
  );
};

export default ResponseAnalysisDisplay;
