export default function GameOverModal({ won, solutionWord, onPlayAgain }) {
  return (
    <div className="modal-backdrop">
      <section
        className="game-over-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-over-title"
      >
        <h2 id="game-over-title">{won ? 'Brilliant!' : 'Game over'}</h2>
        <p>{won ? 'You found the word.' : 'The word you were looking for was'}</p>
        <strong className="solution-word">{solutionWord.toUpperCase()}</strong>
        <button className="play-again" type="button" onClick={onPlayAgain}>
          Play Again
        </button>
      </section>
    </div>
  );
}
