import { useGlobalProvider } from "../context/GlobalProvider";

const Scoreboard = () => {
  const {
    player1,
    player2,
    handleRestart,
    handleReset,
    isPlaying,
    lastRound,
    winnerHistory,
  } = useGlobalProvider();

  const getScore = (player: string) =>
    winnerHistory.filter((winner: string) => winner === player).length;

  return (
    <>
      <div className="flex flex-row">
        <span
          id="player-1"
          className="mx-3 text-blue-600 text-5xl relative"
          style={{
            textShadow: "0 0 3px blue, 0 0 3px darkblue",
          }}
        >
          {player1}
        </span>
        <div className="flex items-center text-white text-3xl">
          <span>{getScore(player1)}</span>
          <span>:</span>
          <span>{getScore(player2)}</span>
        </div>
        <div>
          <span
            id="player-2"
            className="mx-3 text-red-600 text-5xl"
            style={{
              textShadow: "0 0 3px red, 0 0 3px darkred",
            }}
          >
            {player2}
          </span>
        </div>
      </div>

      <div className="my-3">
        <button
          className="w-[100px] h-[40px] border-solid border-2 border-white text-white bg-slate-900 rounded-xl mx-3 hover:cursor-pointer hover:scale-110 transition-all"
          onClick={handleRestart}
        >
          Restart
        </button>
        <button
          id="reset-btn"
          className="w-[100px] h-[40px] border-solid border-2 border-white text-white bg-red-500 rounded-xl mx-3 hover:cursor-pointer hover:scale-110 transition-all"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      {isPlaying !== true && lastRound && (
        <h3 className="text-5xl text-white">{lastRound}</h3>
      )}
    </>
  );
};

export default Scoreboard;
