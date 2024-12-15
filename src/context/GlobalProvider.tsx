import React, { createContext, useContext, useEffect, useState } from "react";

import {
  BoxesType,
  ContextProviderProps,
  GlobalProviderType,
} from "../types/context";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

// context default value

const defaultGlobalProvider: GlobalProviderType = {
  boxes: [],
  winnerHistory: [],
  checkWinner: () => {},
  player1: "X",
  player2: "O",
  handleClick: () => {},
  handleReset: () => {},
  handleRestart: () => {},
  isPlaying: true,
  lastRound: "",
};

const GlobalProvider = createContext<GlobalProviderType>(defaultGlobalProvider);

export const ContextProvider: React.FC<ContextProviderProps> = ({
  children,
}) => {
  // const variables

  const player1 = "X";
  const player2 = "O";
  const winCondition = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

  // state values

  const [boxes, setBoxes] = useState<BoxesType[]>([
    { id: 0, player: null },
    { id: 1, player: null },
    { id: 2, player: null },
    { id: 3, player: null },
    { id: 4, player: null },
    { id: 5, player: null },
    { id: 6, player: null },
    { id: 7, player: null },
    { id: 8, player: null },
  ]);
  const [currentPlayer, setCurrentPlayer] = useState<string>(player1);
  const [winnerHistory, setWinnerHistory] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [lastRound, setLastRound] = useState<string>("");

  // functions

  const handleClick = (event: React.MouseEvent, id: number) => {
    event.preventDefault();
    const box = boxes.find((box) => box.id === id);

    if (box?.player === null) {
      const newBoxes = boxes.map((box) => {
        if (box.id === id && box.player === null) {
          return {
            ...box,
            player: currentPlayer,
          };
        } else {
          return box;
        }
      });
      setBoxes(newBoxes);

      currentPlayer === player1
        ? setCurrentPlayer(player2)
        : setCurrentPlayer(player1);

      if (newBoxes.filter((box) => box.player === null).length === 0) {
        setIsPlaying(false);
        setWinnerHistory([...winnerHistory, "Draw"]);
        setLastRound("Draw");
      }
    }
  };

  const handleRestart = () => {
    setBoxes([
      { id: 0, player: null },
      { id: 1, player: null },
      { id: 2, player: null },
      { id: 3, player: null },
      { id: 4, player: null },
      { id: 5, player: null },
      { id: 6, player: null },
      { id: 7, player: null },
      { id: 8, player: null },
    ]);
    setCurrentPlayer(player1);
    setIsPlaying(true);
  };

  const handleReset = () => {
    setBoxes([
      { id: 0, player: null },
      { id: 1, player: null },
      { id: 2, player: null },
      { id: 3, player: null },
      { id: 4, player: null },
      { id: 5, player: null },
      { id: 6, player: null },
      { id: 7, player: null },
      { id: 8, player: null },
    ]);
    setCurrentPlayer(player1);
    setIsPlaying(true);
    setWinnerHistory([]);
  };

  const checkWinner = () => {
    for (let i = 0; i < winCondition.length; i++) {
      const [x, y, z] = winCondition[i];
      if (
        boxes[x].player &&
        boxes[x].player === boxes[y].player &&
        boxes[y].player === boxes[z].player
      ) {
        setIsPlaying(false);
        setWinnerHistory([...winnerHistory, boxes[x].player]);
        setLastRound(`${boxes[x].player} Won`);
      }
    }
  };

  useEffect(() => {
    checkWinner();
  }, [boxes]);

  // use gsap

  useGSAP(() => {
    if (isPlaying === true) {
      if (currentPlayer === player1) {
        gsap.from(".box", { opacity: 0 });
        gsap.to("#player-1", { opacity: 1 });
        gsap.to("#player-2", { opacity: 0.25 });
      } else if (currentPlayer === player2) {
        gsap.to("#player-2", { opacity: 1 });
        gsap.to("#player-1", { opacity: 0.25 });
      }
    } else {
      gsap.to("#player-1", { opacity: 0.25 });
      gsap.to("#player-2", { opacity: 0.25 });
    }
  }, [currentPlayer]);

  return (
    <GlobalProvider.Provider
      value={{
        boxes,
        winnerHistory,
        checkWinner,
        player1,
        player2,
        handleClick,
        handleReset,
        handleRestart,
        isPlaying,
        lastRound,
      }}
    >
      {children}
    </GlobalProvider.Provider>
  );
};

export const useGlobalProvider = (): GlobalProviderType => {
  const context = useContext(GlobalProvider);

  if (!context) {
    throw new Error("useTheme must be used within a ContextProvider");
  }

  return context;
};
