// src/components/Row.jsx
// -----------------------------------------------------------------------------
// A ROW is a horizontal line of 5 Tiles — one attempt at guessing the word.
//
// A row can be in one of THREE states, and this component handles all three:
//   1. PAST guess (already submitted) -> show the coloured letters.
//   2. The CURRENT row (being typed)  -> show typed letters, no colours yet.
//   3. A FUTURE, empty row            -> show 5 blank tiles.
// -----------------------------------------------------------------------------

import Tile from './Tile';
export default function Row({ guess, evaluation, letters, tileCount }) {
  return (
    <div className="row" role="row">
      {Array.from({ length: tileCount }).map((_, index) => (
        <Tile
          key={index}
          letter={guess ? guess[index] : letters[index] || ''}
          status={evaluation?.[index]?.status}
        />
      ))}
    </div>
  );
}
