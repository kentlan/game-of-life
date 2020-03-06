import _ from 'lodash'
import { ROWS_QUANTITY, COLS_QUANTITY, NEIGHBOURS } from '../constants'

export const createInitialGrid = () =>
  Array.from({ length: ROWS_QUANTITY }).map(() =>
    Array.from({ length: COLS_QUANTITY }).map(
      () => Math.round(Math.random()) === 1
    )
  )

export const getAliveNeighboursQuantity = (rowIndex, cellIndex, grid) =>
  NEIGHBOURS.reduce(
    (acc, [dX, dY]) =>
      acc + Number(_.get(grid, `[${rowIndex + dX}][${cellIndex + dY}]`, false)),
    0
  )

export const shouldCellLive = (cell, rowIndex, cellIndex, grid) => {
  const aliveNeighboursQuantity = getAliveNeighboursQuantity(
    rowIndex,
    cellIndex,
    grid
  )
  return cell
    ? aliveNeighboursQuantity >= 2 && aliveNeighboursQuantity <= 3
    : aliveNeighboursQuantity === 3
}

export const calculateNextGridState = grid =>
  grid.map((row, rowIndex) =>
    row.map((cell, cellIndex) =>
      shouldCellLive(cell, rowIndex, cellIndex, grid)
    )
  )
