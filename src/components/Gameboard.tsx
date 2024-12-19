import { useGlobalProvider } from "../context/GlobalProvider";

const Gameboard = () => {
  const { boxes, player1, player2, isPlaying, handleClick } =
    useGlobalProvider();
  return (
    <div className="h-[240px] w-[240px] md:h-[420px] md:w-[420px] flex flex-wrap my-8">
      {boxes.map((x, id) => (
        <button
          key={id}
          className={`box h-[80px] w-[80px] md:h-[140px] md:w-[140px] border-none text-6xl md:text-8xl flex items-center justify-center font-light bg-slate-900 transition-all ${
            x.player || isPlaying !== true
              ? "hover:cursor-default hover:bg-slate-900"
              : "hover:cursor-pointer hover:bg-slate-800"
          } `}
          onClick={(event) => handleClick(event, id)}
          disabled={x.player ? true : false || (isPlaying !== true && true)}
        >
          <span
            className={`${x.player === player1 && "text-blue-600"} ${
              x.player === player2 && "text-red-600"
            }`}
          >
            {x.player}
          </span>
        </button>
      ))}
    </div>
  );
};

export default Gameboard;
