import React, { useEffect, useMemo, useState } from 'react'

const winningLines = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
]

function calculateWinner(squares){
  for(const [a,b,c] of winningLines){
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return { winner: squares[a], line: [a,b,c] }
    }
  }
  return null
}

function bestAIMove(squares, ai, human){
  const empty = squares.map((v,i)=> v? null : i).filter(v=> v!==null)
  // 1) Can AI win now?
  for(const i of empty){
    const test = [...squares]; test[i] = ai
    if(calculateWinner(test)) return i
  }
  // 2) Can human win next? Block.
  for(const i of empty){
    const test = [...squares]; test[i] = human
    if(calculateWinner(test)) return i
  }
  // 3) Prefer center, then corners, then sides
  if(empty.includes(4)) return 4
  const corners = [0,2,6,8].filter(i=> empty.includes(i))
  if(corners.length) return corners[Math.floor(Math.random()*corners.length)]
  return empty.length ? empty[Math.floor(Math.random()*empty.length)] : null
}

// PUBLIC_INTERFACE
export default function App(){
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)
  const [mode, setMode] = useState('pvp') // 'pvp' or 'cpu'
  const [aiPlays, setAiPlays] = useState('O') // which side AI plays when cpu mode

  const result = useMemo(()=> calculateWinner(squares), [squares])
  const filled = squares.filter(Boolean).length
  const isDraw = !result && filled === 9
  const current = xIsNext ? 'X' : 'O'

  useEffect(()=>{
    if(mode === 'cpu' && !result && !isDraw){
      const ai = aiPlays
      const human = ai === 'X' ? 'O' : 'X'
      if(current === ai){
        const t = setTimeout(()=>{
          const move = bestAIMove(squares, ai, human)
          if(move !== null){
            const next = [...squares]; next[move] = ai
            setSquares(next)
            setXIsNext(prev => !prev)
          }
        }, 250)
        return ()=> clearTimeout(t)
      }
    }
  }, [mode, aiPlays, current, squares, result, isDraw])

  function handleSquareClick(i){
    if(squares[i] || result) return
    if(mode === 'cpu' && current === aiPlays) return // AI's turn
    const next = [...squares]
    next[i] = current
    setSquares(next)
    setXIsNext(!xIsNext)
  }

  function reset(){
    setSquares(Array(9).fill(null))
    setXIsNext(true)
  }

  function Status(){
    let text = ''
    if(result){ text = `Winner: ${result.winner}` }
    else if(isDraw){ text = 'Draw game' }
    else { text = `Next player: ${current}` }
    return (
      <div className="status" role="status" aria-live="polite">{text}</div>
    )
  }

  function Square({value, onClick, highlight}){
    const cls = `square ${value? value.toLowerCase(): ''}` + (highlight? ' highlight': '')
    return (
      <button className={cls} aria-pressed={!!value} onClick={onClick} disabled={!!value}>
        {value}
      </button>
    )
  }

  function Board(){
    const highlight = result? result.line : []
    return (
      <div className="board">
        {squares.map((val, i)=> (
          <Square key={i} value={val} onClick={()=> handleSquareClick(i)} highlight={highlight.includes(i)} />
        ))}
      </div>
    )
  }

  return (
    <div className="app">
      <div className="card" role="application" aria-label="Tic Tac Toe game">
        <div className="header">
          <div className="title">Tic Tac Toe</div>
          <span className="badge">Ocean Professional</span>
        </div>
        <Status />
        <Board />
        <div className="controls">
          <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
            <button className={`btn outline`} onClick={()=> setMode('pvp')} aria-pressed={mode==='pvp'}>Player vs Player</button>
            <button className={`btn outline`} onClick={()=> setMode('cpu')} aria-pressed={mode==='cpu'}>Play vs Computer</button>
          </div>
          {mode==='cpu' && (
            <div style={{display:'flex', gap:8}}>
              <button className={`btn secondary ${aiPlays==='X'?'active':''}`} onClick={()=> setAiPlays('X')}>AI: X</button>
              <button className={`btn secondary ${aiPlays==='O'?'active':''}`} onClick={()=> setAiPlays('O')}>AI: O</button>
            </div>
          )}
          <button className="btn" onClick={reset}>Reset</button>
        </div>
        <div className="footer">Play a quick game in your browser. Keyboard: Tab to focus, Enter to place.</div>
      </div>
    </div>
  )
}
