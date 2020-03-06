// @flow
import _ from 'lodash'
import { NEIGHBOURS } from '../constants'

type gridType = Array<Array<boolean>>

export const getAliveNeighboursQuantity = (
  rowIndex: number,
  cellIndex: number,
  grid: gridType
): number =>
  NEIGHBOURS.reduce(
    (acc, [dX, dY]) =>
      acc + Number(_.get(grid, `[${rowIndex + dX}][${cellIndex + dY}]`, false)),
    0
  )

export const shouldCellLive = (
  cell: boolean,
  rowIndex: number,
  cellIndex: number,
  grid: gridType
): boolean => {
  const aliveNeighboursQuantity = getAliveNeighboursQuantity(
    rowIndex,
    cellIndex,
    grid
  )
  return cell
    ? aliveNeighboursQuantity >= 2 && aliveNeighboursQuantity <= 3
    : aliveNeighboursQuantity === 3
}

export const calculateNextGridState = (grid: gridType): gridType =>
  grid.map((row, rowIndex) =>
    row.map((cell, cellIndex) =>
      shouldCellLive(cell, rowIndex, cellIndex, grid)
    )
  )
