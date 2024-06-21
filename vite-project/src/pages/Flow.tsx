import { useState, useCallback, useRef, memo } from 'react';
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

const CustomNode = memo(({ data, id }: { data: any; id: string }) => {
  const onTrueClick = () => {
    data.onButtonClick(id, true);
  };

  const onFalseClick = () => {
    data.onButtonClick(id, false);
  };

  return (
    <div style={{ padding: '10px', background: '#f0f0f0', borderRadius: '5px', minWidth: '250px' }}>
      <Handle type="target" position={Position.Top} />
      <select defaultValue="GET" style={{ width: '100%', marginBottom: '5px' }}>
        <option value="GET">GET</option>
        <option value="POST">POST</option>
      </select>
      <input type="text" placeholder="URL" style={{ width: '100%', marginBottom: '5px' }} />
      <input type="text" placeholder="Test cases" style={{ width: '70%', marginBottom: '5px' }} />
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

  const createNewNode = useCallback((parentId: string, isTrue: boolean) => {
    const newNodeId = `node-${nodeIdCounter.current}`;
    nodeIdCounter.current += 1;

    const parentNode = nodes.find(node => node.id === parentId);
    if (!parentNode) return;

    const newNode: Node = {
      id: newNodeId,
      type: 'custom',
      data: { onButtonClick: createNewNode },
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
  }, [nodes]);

  const addNewNode = useCallback(() => {
    const newNodeId = `node-${nodeIdCounter.current}`;
    nodeIdCounter.current += 1;

    const newNode: Node = {
      id: newNodeId,
      type: 'custom',
      data: { onButtonClick: createNewNode },
      position: { x: 200, y: 50 + nodes.length * 200 },
    };

    setNodes((nds) => [...nds, newNode]);
  }, [nodes, createNewNode]);

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