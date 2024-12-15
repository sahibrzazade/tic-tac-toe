import React from "react";

export type GlobalProviderType = {
  boxes: BoxesType[];
  winnerHistory: string[];
  checkWinner: () => void;
  player1: string;
  player2: string;
  handleClick: (event: React.MouseEvent, id: number) => void;
  handleReset: () => void;
  handleRestart: () => void;
  isPlaying: boolean;
  lastRound: string;
};

export type BoxesType = {
  id: number;
  player: null | string;
};

export type ContextProviderProps = {
  children: React.ReactNode;
};
