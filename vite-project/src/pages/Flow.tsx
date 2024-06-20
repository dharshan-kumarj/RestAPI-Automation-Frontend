import { useState, useCallback, useRef, memo } from 'react';
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
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

const CustomNode = memo(({ data }: { data: any }) => (
  <>
    <Handle type="target" position={Position.Left} />
    <div style={{ padding: '10px', background: '#f0f0f0', borderRadius: '5px', minWidth: '250px' }}>
      <select defaultValue="GET" style={{ width: '100%', marginBottom: '5px' }}>
        <option value="GET">GET</option>
        <option value="POST">POST</option>
      </select>
      <input type="text" placeholder="URL" style={{ width: '100%', marginBottom: '5px' }} />
      <input type="text" placeholder="Test cases" style={{ width: '70%', marginBottom: '5px' }} />
      <button style={{ width: '28%', marginLeft: '2%' }}>Send()</button>
      <div>
        <button style={{ width: '49%', background: 'green', color: 'white' }}>Success()</button>
        <button style={{ width: '49%', marginLeft: '2%', background: 'red', color: 'white' }}>Failure()</button>
      </div>
    </div>
    <Handle type="source" position={Position.Right} />
  </>
));

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
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const addNewNode = useCallback(() => {
    const newNodeId = `node-${nodeIdCounter.current}`;
    nodeIdCounter.current += 1;

    const newNode: Node = {
      id: newNodeId,
      type: 'custom',
      data: { label: `Node ${newNodeId}` },
      position: { x: 200, y: 50 + (nodes.length - 1) * 150 },
    };

    const newEdge: Edge = {
      id: `edge-${buttonNodeId}-${newNodeId}`,
      source: buttonNodeId,
      target: newNodeId,
    };

    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [...eds, newEdge]);
  }, [nodes]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    if (node.id === buttonNodeId) {
      addNewNode();
    }
  }, [addNewNode]);

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
        style={{ width: '100%', height: '100%', backgroundColor: 'black' }}
      >
        <MiniMap nodeStrokeWidth={3} />
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;