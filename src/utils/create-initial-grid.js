// @flow
import { ROWS_QUANTITY, COLS_QUANTITY } from '../constants'

const createInitialGrid = () =>
  Array.from({ length: ROWS_QUANTITY }).map<void>(() =>
    Array.from({ length: COLS_QUANTITY }).map<void>(
      () => Math.round(Math.random()) === 1
    )
  )

export default createInitialGrid
