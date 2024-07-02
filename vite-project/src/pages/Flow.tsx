import React, { useState, useCallback, useRef, memo, useEffect } from 'react';
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
  Connection,
  MiniMap,
  Edge,
  Node,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';

const buttonNodeId = 'button-node';

interface CustomNodeData {
  onButtonClick: (id: string, isTrue: boolean) => void;
  updateNodeData: (id: string, newData: Partial<CustomNodeData>) => void;
  method?: string;
  url?: string;
  testCases?: string;
}

const CustomNode = memo(({ data, id }: { data: CustomNodeData; id: string }) => {
  const [method, setMethod] = useState(data.method || 'GET');
  const [url, setUrl] = useState(data.url || '');
  const [testCases, setTestCases] = useState(data.testCases || '');

  const onMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMethod = e.target.value;
    setMethod(newMethod);
    data.updateNodeData(id, { method: newMethod });
  };

  const onUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    data.updateNodeData(id, { url: newUrl });
  };

  const onTestCasesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTestCases = e.target.value;
    setTestCases(newTestCases);
    data.updateNodeData(id, { testCases: newTestCases });
  };

  const onTrueClick = () => {
    data.onButtonClick(id, true);
  };

  const onFalseClick = () => {
    data.onButtonClick(id, false);
  };

  return (
    <div style={{ padding: '10px', background: '#f0f0f0', borderRadius: '5px', minWidth: '250px' }}>
      <Handle type="target" position={Position.Top} />
      <select value={method} onChange={onMethodChange} style={{ width: '100%', marginBottom: '5px' }}>
        <option value="GET">GET</option>
        <option value="POST">POST</option>
      </select>
      <input type="text" value={url} onChange={onUrlChange} placeholder="URL" style={{ width: '100%', marginBottom: '5px' }} />
      <input type="text" value={testCases} onChange={onTestCasesChange} placeholder="Test cases" style={{ width: '70%', marginBottom: '5px' }} />
      <button style={{ width: '28%', marginLeft: '2%' }}>Send()</button>
      <div>
        <button style={{ width: '49%', background: 'green', color: 'white' }} onClick={onTrueClick}>True()</button>
        <button style={{ width: '49%', marginLeft: '2%', background: 'red', color: 'white' }} onClick={onFalseClick}>False()</button>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="source" position={Position.Bottom} id="b" style={{ left: '75%' }} />
    </div>
  );
});

const nodeTypes = {
  custom: CustomNode,
};

const initialNodes: Node[] = [
  {
    id: buttonNodeId,
    type: 'input',
    data: { label: 'Add Block +' },
    position: { x: 50, y: 50 },
    style: {
      background: '#AA14F0',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer'
    },
  },
];

const initialEdges: Edge[] = [];

function generateFlowJSON(nodes: Node[], edges: Edge[]) {
  const nodeMap = new Map(nodes.map(node => [node.id, node]));

  function buildFlowObject(nodeId: string): any {
    const node = nodeMap.get(nodeId);
    if (!node) return null;

    const flowObject: any = {
      tag: node.id,
      request: {
        method: node.data?.method || 'GET',
        url: node.data?.url || '',
        variables: {},
        body: {},
        headers: {}
      },
      testcase: node.data?.testCases ? JSON.parse(node.data.testCases) : [],
      true: {},
      false: {}
    };

    const trueEdge = edges.find(edge => edge.source === nodeId && edge.sourceHandle === 'a');
    const falseEdge = edges.find(edge => edge.source === nodeId && edge.sourceHandle === 'b');

    if (trueEdge) {
      flowObject.true = buildFlowObject(trueEdge.target);
    }
    if (falseEdge) {
      flowObject.false = buildFlowObject(falseEdge.target);
    }

    return flowObject;
  }

  const rootNode = nodes.find(node => node.type === 'custom' || node.type === 'input');
  return { 
    flow: rootNode ? buildFlowObject(rootNode.id) : {},
    global_variable: {}
  };
}

function Flow() {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const nodeIdCounter = useRef(1);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => [...eds, params as Edge]),
    [],
  );

  const updateNodeData = useCallback((nodeId: string, newData: Partial<CustomNodeData>) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node
      )
    );
  }, []);

  const createNewNode = useCallback((parentId: string, isTrue: boolean) => {
    const newNodeId = `node-${nodeIdCounter.current}`;
    nodeIdCounter.current += 1;

    const parentNode = nodes.find(node => node.id === parentId);
    if (!parentNode) return;

    const newNode: Node = {
      id: newNodeId,
      type: 'custom',
      data: { onButtonClick: createNewNode, updateNodeData },
      position: {
        x: (parentNode.position?.x || 0) + (isTrue ? -150 : 150),
        y: (parentNode.position?.y || 0) + 200
      },
    };

    const newEdge: Edge = {
      id: `edge-${parentId}-${newNodeId}`,
      source: parentId,
      target: newNodeId,
      sourceHandle: isTrue ? 'a' : 'b',
      label: isTrue ? 'True' : 'False',
      style: { stroke: isTrue ? 'green' : 'red' },
    };

    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [...eds, newEdge]);
  }, [nodes, updateNodeData]);

  const addNewNode = useCallback(() => {
    const newNodeId = `node-${nodeIdCounter.current}`;
    nodeIdCounter.current += 1;

    const newNode: Node = {
      id: newNodeId,
      type: 'custom',
      data: { onButtonClick: createNewNode, updateNodeData },
      position: { x: 200, y: 50 + nodes.length * 200 },
    };

    setNodes((nds) => [...nds, newNode]);
  }, [nodes, createNewNode, updateNodeData]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    if (node.id === buttonNodeId) {
      addNewNode();
    }
  }, [addNewNode]);

  const logFlowJSON = useCallback(() => {
    const flowJSON = generateFlowJSON(nodes, edges);
    console.log(JSON.stringify(flowJSON, null, 2));
  }, [nodes, edges]);

  useEffect(() => {
    logFlowJSON();
  }, [nodes, edges, logFlowJSON]);

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
      >
        <MiniMap />
        <Controls />
        <Background />
      </ReactFlow>
      <button onClick={logFlowJSON} style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}>
        Generate JSON
      </button>
    </div>
  );
}

export default Flow;
