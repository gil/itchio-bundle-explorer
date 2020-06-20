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
  Rating?: { value: number; total: string };
  Genre?: { text: string; url: string }[];
  Platforms: { text: string; url: string }[];
}
