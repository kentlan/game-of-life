import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import _ from 'lodash'
import './style.scss'

const ROWS_QUANTITY = 50
const COLS_QUANTITY = 50
const DELAY = 100
const NEIGHBOURS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
]

const createInitialGrid = () =>
  Array.from({ length: ROWS_QUANTITY }).map(() =>
    Array.from({ length: COLS_QUANTITY }).map(
      () => Math.round(Math.random()) === 1
    )
  )

const getAliveNeighboursQuantity = (rowIndex, cellIndex, grid) =>
  NEIGHBOURS.reduce(
    (acc, [dX, dY]) =>
      acc + Number(_.get(grid, `[${rowIndex + dX}][${cellIndex + dY}]`, false)),
    0
  )

const shouldCellLive = (cell, rowIndex, cellIndex, grid) => {
  const aliveNeighboursQuantity = getAliveNeighboursQuantity(
    rowIndex,
    cellIndex,
    grid
  )
  return cell
    ? aliveNeighboursQuantity >= 2 && aliveNeighboursQuantity <= 3
    : aliveNeighboursQuantity === 3
}

const calculateNextGridState = grid =>
  grid.map((row, rowIndex) =>
    row.map((cell, cellIndex) =>
      shouldCellLive(cell, rowIndex, cellIndex, grid)
    )
  )

const Board = () => {
  const [grid, setGrid] = useState(createInitialGrid)

  useEffect(() => {
    setTimeout(() => {
      setGrid(calculateNextGridState(grid))
    }, DELAY)
  }, [grid])

  return (
    <div className="wrapper">
      <button type="button" onClick={() => calculateNextGridState(grid)} />
      <div className="table">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cellAlive, cellIndex) => (
              <div
                key={cellIndex}
                className={classNames('cell', cellAlive && 'alive')}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Board
