import { CSSProperties, MouseEventHandler } from "react";

import { Meme } from "./meme";

export type MemeViewCardProps = {
  meme: Meme;
  key?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  style?: CSSProperties;
}

export type MemeEditCardProps = {
  meme: Meme;
  style?: CSSProperties;
}