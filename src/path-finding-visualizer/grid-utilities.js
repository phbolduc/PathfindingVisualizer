import NodeStates from "./node-states";

export const createGrid = (
  rowCount,
  colCount,
  startNodeIndex,
  endNodeIndex
) => {
  let grid = [];
  for (let i = 0; i < rowCount; i++) {
    let row = [];

    for (let j = 0; j < colCount; j++) {
      row.push(createNode(i, j, startNodeIndex, endNodeIndex));
    }
    grid.push(row);
  }
  return grid;
};

export const createNode = (row, col, startNodeIndex, endNodeIndex) => {
  let isStart = false;
  let isEnd = false;

  if (row === startNodeIndex.row && col === startNodeIndex.col) isStart = true;
  else if (row === endNodeIndex.row && col === endNodeIndex.col) isEnd = true;

  return {
    row,
    col,
    isStart: isStart,
    isEnd: isEnd,
    distance: Infinity,
    gCost: 0,
    hCost: 0,
    previousState: NodeStates.UNVISITED,
    closed: false,
    previousNode: null,
    nodeState: NodeStates.UNVISITED,
  };
};

export const setNodeInGrid = (grid, row, col, nodeState) => {
  const node = grid[row][col];

  const newNode = {
    ...node,
    previousNodeState: nodeState,
    nodeState: nodeState,
  };
  grid[row][col] = newNode;
  return grid;
};

export const setStartNode = (grid, row, col, startNodeIndex) => {
  const newGrid = grid;
  const node = newGrid[row][col];

  const previousState = node.nodeState;

  const newStartNode = {
    ...node,
    previousState: previousState,
    isStart: true,
  };

  newGrid[row][col] = newStartNode;
  newGrid[startNodeIndex.row][startNodeIndex.col].isStart = false;
  document.getElementById(
    `${startNodeIndex.row}:${startNodeIndex.col}`
  ).className = getClassFromState(grid[startNodeIndex.row][startNodeIndex.col].previousState);

  document.getElementById(`${row}:${col}`)
    .firstElementChild.className = "inside-start"

  document.getElementById(`${startNodeIndex.row}:${startNodeIndex.col}`)
    .firstElementChild.className = ""

  startNodeIndex.row = row;
  startNodeIndex.col = col;

  return newGrid;
};

export const setEndNode = (grid, row, col, endNodeIndex) => {
  const newGrid = grid;
  const node = newGrid[row][col];

  const previousState = node.nodeState;

  const newEndNode = {
    ...node,
    nodeState: NodeStates.UNVISITED,
    previousState: previousState,
    isEnd: true,
  };

  newGrid[row][col] = newEndNode;
  newGrid[endNodeIndex.row][endNodeIndex.col].isEnd = false;
  document.getElementById(`${endNodeIndex.row}:${endNodeIndex.col}`).className =
    getClassFromState(grid[endNodeIndex.row][endNodeIndex.col].previousState);

  document.getElementById(`${row}:${col}`)
    .firstElementChild.className = "inside-end"

  document.getElementById(`${endNodeIndex.row}:${endNodeIndex.col}`)
    .firstElementChild.className = ""

  endNodeIndex.row = row;
  endNodeIndex.col = col;

  return newGrid;
};

export const replaceGrid = (grid, startNodeIndex, endNodeIndex) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j].nodeState === NodeStates.WALL) {
        grid[i][j] = createNode(i, j, startNodeIndex, endNodeIndex);
        grid[i][j].nodeState = NodeStates.WALL;
        grid[i][j].closed = false;
      } else {
        grid[i][j] = createNode(i, j, startNodeIndex, endNodeIndex);
      }
    }
  }
  return grid;
};

export const clearVisitedNodes = (grid, startNodeIndex, endNodeIndex) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const node = document.getElementById(`${i}:${j}`);

      if (i === startNodeIndex.row && j === startNodeIndex.col) {
        node.className = "StartNode";
        continue;
      }
      if (i === endNodeIndex.row && j === endNodeIndex.col) {
        node.className = "EndNode";
        continue;
      }
      if (grid[i][j].nodeState === NodeStates.WALL) {
        continue;
      } else {
        node.className = "Node";
      }
    }
  }
};

export const clearWallNodes = (grid, startNodeIndex, endNodeIndex) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const node = document.getElementById(`${i}:${j}`);

      if (i === startNodeIndex.row && j === startNodeIndex.col) {
        node.className = "StartNode";
        continue;
      }
      if (i === endNodeIndex.row && j === endNodeIndex.col) {
        node.className = "EndNode";
        continue;
      }
      if (grid[i][j].nodeState === NodeStates.WALL) {
        node.className = "Node";
      } else {
        node.className = "Node";
      }
    }
  }
}

const getClassFromState = (state) => {
  if (state === NodeStates.UNVISITED) return "Node"
  if (state === NodeStates.VISITED) return "VisitedNodeNoAnim"
  if (state === NodeStates.WALL) return "WallNode"
  if (state === NodeStates.SHORTESTPATH) return "ShortestPathNodeNoAnim"
}