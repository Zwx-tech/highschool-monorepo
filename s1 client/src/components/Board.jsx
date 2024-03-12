import React, { useState } from 'react'

const Board = ({ color="#fff", size, name, tilesPre, editable=true, callback }) => {
    const [tiles, setTiles] = useState(tilesPre);
    
    function handleTileUpdate(j, i) {
        if(!editable) return;

        const temp = [...tiles];
        temp[j][i] = !temp[j][i];
        console.log(temp);
        setTiles(temp);
    }

    return (
    <div className='board'>
        <p>{ name }</p>
        <div className="tile__wrapper">
        {tiles.map((row, i) => {
            return row.map((tile, j) => {
                return <div style={{backgroundColor: color }} className={`tile ${tile ? 'selected' : ''}`} key={size * j + i} onClick={() => handleTileUpdate(i, j)}></div>
            })
        }) }
        </div>
        {
            editable ? <button  onClick={() => callback({color: color, tiles: [...tiles]})}>Zapisz</button> : <></>
        }
    </div>
  )
}

export default Board