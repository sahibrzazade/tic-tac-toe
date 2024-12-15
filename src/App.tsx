import { useEffect } from "react";

import { useGlobalProvider } from "./context/GlobalProvider";
import Gameboard from "./components/Gameboard";
import Scoreboard from "./components/Scoreboard";

const App = () => {
  return (
    <div className="h-screen bg-slate-900 flex flex-col items-center justify-center">
      <Scoreboard />
      <Gameboard />
    </div>
  );
};

export default App;
