import React, { ReactNode, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  OnConnect,
  Connection,
  isNode,
  isEdge,
  ReactFlowProps,
} from 'react-flow-renderer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import MethodNode from './MethodNode';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

interface CustomFlowProps extends ReactFlowProps {
  elements: ReactNode[];
}

const Flow = () => {
  const [elements, setElements] = useState<(Node | Edge)[]>([]);
  const [showModal, setShowModal] = useState(false);
  const handleModal = () => setShowModal(!showModal);

  const onElementsRemove = (elementsToRemove: (Node | Edge)[]) =>
    setElements((els) =>
      els.filter((el) => {
        if ('source' in el && 'target' in el) {
          return !elementsToRemove.some((toRemove) => toRemove === el);
        } else {
          return !elementsToRemove.some((toRemove) => {
            if ('id' in toRemove) {
              return toRemove.id === el.id || (el.type === 'methodNode' && toRemove.id === el.id);
            }
            return false;
          });
        }
      })
    );

  const onConnect: OnConnect = (connection: Connection) => {
    const newEdge: Edge = {
      id: `${connection.source ?? ''}-${connection.target ?? ''}`,
      source: connection.source ?? '',
      target: connection.target ?? '',
      type: 'default',
    };
    setElements((els) => els.concat(newEdge));
  };

  const getElementProps = (element: Node | Edge) => {
    if (isNode(element)) {
      if (element.type === 'methodNode') {
        return (
          <MethodNode
            id={element.id}
            type={element.type}
            data={element.data}
            selected={false}
            isConnectable={true}
            xPos={element.position.x}
            yPos={element.position.y}
            dragging={false}
            zIndex={0}
          />
        );
      }
      return React.createElement('div', {
        id: element.id,
        type: element.type,
        position: element.position,
        data: element.data,
      });
    } else if (isEdge(element)) {
      return React.createElement('div', {
        id: element.id,
        source: element.source,
        target: element.target,
        type: element.type,
      });
    }
  };

  const elementProps: ReactNode[] = elements.map(getElementProps);

  const flowProps: CustomFlowProps = {
    elements: elementProps,
    onConnect,
    minZoom: 0.2,
    maxZoom: 2,
    defaultZoom: 1,
    className: 'bg-dark',
  };

  const handleAddBlock = () => {
    const newNode: Node = {
      id: `methodNode-${elements.length}`,
      type: 'methodNode',
      position: { x: 200, y: 200 }, // Adjust the position as needed
      data: {},
    };
  
    setElements((els) => els.concat(newNode));
    setShowModal(true); // Open the modal when the "Add blocks" button is clicked
  };

  return (
    <div className="vh-100 bg-dark text-light d-flex flex-column">
      <div className="flex-grow-1 position-relative">
      <Button variant="outline-light" className="text-white btn-sm" onClick={handleModal}>
            <i className="bi bi-plus-lg me-1"></i>
            Add blocks
          </Button>
        <ReactFlow {...flowProps}>

          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
      <div className="p-2 bg-dark border-top border-secondary">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <button className="btn btn-outline-secondary btn-sm me-1">
              <i className="bi bi-arrow-counterclockwise"></i>
            </button>
            <button className="btn btn-outline-secondary btn-sm me-1">
              <i className="bi bi-arrow-clockwise"></i>
            </button>
            <button className="btn btn-outline-secondary btn-sm me-1">
              <i className="bi bi-search"></i>
            </button>
            <button className="btn btn-outline-secondary btn-sm me-1">
              <i className="bi bi-zoom-in"></i>
            </button>
            <button className="btn btn-outline-secondary btn-sm">
              <i className="bi bi-zoom-out"></i>
            </button>
          </div>
          <div>
            <button className="btn btn-warning btn-sm me-2">Run</button>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={handleModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Configure HTTP Request</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Render the MethodNode component with the required props */}
        <MethodNode
          id="temp-id"
          type="methodNode"
          data={{}}
          selected={false}
          isConnectable={true}
          xPos={0}
          yPos={0}
          dragging={false}
          zIndex={0}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleModal}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
};

export default Flow;