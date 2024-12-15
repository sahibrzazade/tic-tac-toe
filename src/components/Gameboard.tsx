import { useGlobalProvider } from "../context/GlobalProvider";

const Gameboard = () => {
  const { boxes, player1, player2, isPlaying, handleClick } =
    useGlobalProvider();
  return (
    <div className="h-[420px] w-[420px] flex flex-wrap my-8">
      {boxes.map((x, id) => (
        <button
          key={id}
          className={`box w-[140px] h-[140px] border-none text-[5rem] flex items-center justify-center font-light bg-slate-900 transition-all ${
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
