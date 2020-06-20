export interface Game {
  id: number;
  title: string;
  cover: string;
  url: string;
  meta: GameMeta;
}

export interface GameMetas {
  [id: number]: GameMeta;
}

export interface GameMeta {
  Genre?: { text: string; url: string }[];
  Rating?: { value: number; total: string };
}
