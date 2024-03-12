import React, { useEffect, useState } from 'react';
import Board from './components/Board';

const App = () => {
  // patterns
  const patternOne = (j, i, size) => i == size -1;
  const patternTwo = (j, i, size) => i == j;
  const patternThree = (j, i, size) => i == size - j - 1;
  const patternFour = (j, i, size) => j == 0;

  // useStates
  const [colors, setColors] = useState([]);
  const [color, setColor] = useState(null);
  const [loading, setLoading] = useState(true)
  const [savedBoards, setSavedBoards] = useState([]); // data, kolor

  useEffect(() => {
    console.log(123);
    fetch('htpp://127.0.0.1:3000')
    .then(data => data.json())
    .then(data => {
      console.log(data);
      setColors(data);
    })

  }, []);

  useEffect(() => {
    if(colors == []) return;
    setLoading(true);
    setColor(colors[0].id);
  }, [colors]);

  function createTiles(size, pattern) {
    return [...new Array(size)].map((_, j) => {
      return  [...new Array(size)].map((_, i) => {
          return pattern(j, i, size);
      });
    });
  }

  
  function saveBoardCallback(data) {
    setSavedBoards([...savedBoards, structuredClone(data)]);
  }


  const handleinputChange = (e) => {
    setColor(e.target.value);
  }

  return loading ? (
    <>
    <div className='app__wrapper'>
      <select defaultValue={color} onChange={(e) => handleinputChange(e)}>
        {colors.map((opt, i) => {
          return <option value={opt.id} key={i}>{opt.kolor}</option>
        })}
      </select>
      <div className="board__wrapper">
        <Board callback={data => saveBoardCallback(data)} color={colors.filter((c) => c.id == color)[0].kolor} size={5} name={'A'} tilesPre={createTiles(5, patternOne)}/>
        <Board callback={data => saveBoardCallback(data)} color={colors.filter((c) => c.id == color)[0].kolor} size={5} name={'B'} tilesPre={createTiles(5, patternTwo)}/>
        <Board callback={data => saveBoardCallback(data)} color={colors.filter((c) => c.id == color)[0].kolor} size={5} name={'C'} tilesPre={createTiles(5, patternThree)}/>
        <Board callback={data => saveBoardCallback(data)} color={colors.filter((c) => c.id == color)[0].kolor} size={5} name={'C'} tilesPre={createTiles(5, patternFour)}/>
      </div>
      <button onClick={() => setSavedBoards([])}>usuń wszysto</button>
    </div>
    <div className='saved__wrapper'>
      <p>Saved</p> 
      {savedBoards.map((board, id) => {
          return <Board key={id} editable={false} color={board.color} size={5} tilesPre={board.tiles}/>
      })}
    </div>
    </>
  ): <></>
}

export default App