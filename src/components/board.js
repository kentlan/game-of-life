import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import { DELAY } from '../constants'
import { createInitialGrid, calculateNextGridState } from '../utils'

import './style.scss'

const Board = () => {
  const [grid, setGrid] = useState(createInitialGrid)

  useEffect(() => {
    setTimeout(() => {
      setGrid(calculateNextGridState(grid))
    }, DELAY)
  }, [grid])

  return (
    <div className="wrapper">
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
