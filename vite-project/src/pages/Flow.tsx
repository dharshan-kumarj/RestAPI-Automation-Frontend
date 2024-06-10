import React, { ReactNode, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  OnConnect,
  Connection,
  Edge as ReactFlowEdge,
  isNode,
  isEdge,
  ReactFlowProps,
} from 'react-flow-renderer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

interface FlowProps extends ReactFlowProps {
  elements: ReactNode[];
  onElementsRemove: (elementsToRemove: (Node | Edge)[]) => void;
  onConnect: OnConnect;
  minZoom: number;
  maxZoom: number;
  defaultZoom: number;
  className: string;
}

const Flow = () => {
  const [elements, setElements] = useState<(Node | Edge)[]>([]);

  const onElementsRemove = (elementsToRemove: (Node | Edge)[]) =>
    setElements((els) =>
      els.filter((el) => {
        if ('source' in el && 'target' in el) {
          return !elementsToRemove.some((toRemove) => toRemove === el);
        } else {
          return !elementsToRemove.some((toRemove) => {
            if ('id' in toRemove) {
              return toRemove.id === el.id;
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

  const flowProps: FlowProps = {
    elements: elementProps,
    onElementsRemove,
    onConnect,
    minZoom: 0.2,
    maxZoom: 2,
    defaultZoom: 1,
    className: 'bg-dark',
  };

  return (
    <div className="vh-100 bg-dark text-light d-flex flex-column">
      <div className="flex-grow-1 position-relative overflow-hidden">
        <div className="position-absolute top-0 start-0 m-3">
          <button className="btn btn-outline-light text-white btn-sm">
            <i className="bi bi-plus-lg me-1"></i>
            Add blocks
          </button>
        </div>
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
    </div>
  );
};

export default Flow;