// src/components/Tile.jsx
// -----------------------------------------------------------------------------
// A TILE is the smallest building block: a single square holding one letter.
//
// It is a "presentational" component, meaning it has NO logic of its own. It
// just receives two pieces of information (called "props") from its parent and
// draws itself accordingly:
//   - letter: the character to show ('c', 'r', ...) or empty ''
//   - status: the colour to use ('correct' | 'present' | 'absent') or undefined
// -----------------------------------------------------------------------------

export default function Tile({ letter, status }) {
  const className = ['tile', letter ? 'filled' : '', status || '']
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={className}
      role="gridcell"
      aria-label={status ? `${letter}, ${status}` : letter || 'empty'}
    >
      {letter}
    </div>
  );
}
