import React, { Component } from "react";
import "./grid.css";
import NodeStates from "./node-states";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeState: NodeStates.UNVISITED,
      isStart: false,
      isEnd: false
    };
  }

  /** Make sure not all nodes update every time the grid renders */
  shouldComponentUpdate(nextProps) {
    const hasNodeStateChanged = this.props.nodeState !== nextProps.nodeState;
    const isStartChanged = this.props.isStart !== nextProps.isStart;
    const isEndChanged = this.props.isEnd !== nextProps.isEnd;

    return hasNodeStateChanged || isStartChanged || isEndChanged;
  }

  /** Change State based on property nodeState */
  static getDerivedStateFromProps(nextProps) {
    return {
      nodeState: nextProps.nodeState,
      isStart: nextProps.isStart,
      isEnd: nextProps.isEnd
    };
  }

  render() {
    const { row, col, onMouseDown, onMouseEnter, onMouseUp, onMouseLeave } = this.props;

    if (this.props.isStart) {
      return (
        <div
          id={`${row}:${col}`}
          onMouseUp={() => onMouseUp()}
          onMouseDown={() => onMouseDown()}
          onDragStart={this.preventDragHandler}
          className="StartNode"
        >
          <div id={`${row}inside${col}`}
            className="inside-start"></div>
        </div>
      );
    } else if (this.props.isEnd) {
      return (
        <div
          id={`${row}:${col}`}
          onMouseUp={() => onMouseUp()}
          onMouseDown={() => onMouseDown()}
          onDragStart={this.preventDragHandler}
          className="EndNode"
        >
          <div id={`${row}inside${col}`}
            className="inside-end"></div>
        </div >
      );
    } else if (this.state.nodeState === NodeStates.WALL) {
      return (
        <div
          id={`${row}:${col}`}
          onMouseUp={() => onMouseUp()}
          onMouseDown={() => onMouseDown()}
          onMouseEnter={() => onMouseEnter(row, col)}
          onMouseLeave={() => onMouseLeave(row, col)}
          onDragStart={this.preventDragHandler}
          className="WallNode"
        >
          <div id={`${row}inside${col}`}></div>
        </div>
      );
    } else if (this.state.nodeState === NodeStates.UNVISITED) {
      return (
        <div
          id={`${row}:${col}`}
          onMouseDown={() => onMouseDown(row, col)}
          onMouseUp={() => onMouseUp()}
          onMouseEnter={() => onMouseEnter(row, col)}
          onMouseLeave={() => onMouseLeave(row, col)}
          onDragStart={this.preventDragHandler}
          className="Node"
        >
          <div id={`${row}inside${col}`} className=""></div>
        </div>
      );
    } else if (this.state.nodeState === NodeStates.VISITED) {
      return (
        <div
          id={`${row}:${col}`}
          onMouseUp={() => onMouseUp()}
          onMouseDown={() => onMouseDown()}
          onMouseEnter={() => onMouseEnter(row, col)}
          onMouseLeave={() => onMouseLeave(row, col)}
          onDragStart={this.preventDragHandler}
          className="VisitedNodeNoAnim"
        >
          <div id={`${row}inside${col}`}></div>
        </div>
      );
    } else if (this.state.nodeState === NodeStates.SHORTESTPATH) {
      return (
        <div
          id={`${row}:${col}`}
          onMouseUp={() => onMouseUp()}
          onMouseDown={() => onMouseDown()}
          onMouseEnter={() => onMouseEnter(row, col)}
          onMouseLeave={() => onMouseLeave(row, col)}
          onDragStart={this.preventDragHandler}
          className="ShortestPathNodeNoAnim"
        >
          <div id={`${row}inside${col}`}></div>
        </div>
      );
    } else {
      return <div>no such state</div>;
    }
  }
}
