export interface Game {
  id: number;
  title: string;
  cover: string;
  short_text: string;
  url: string;
  price: string;
  user: { name: string };
  meta: GameMeta;
}

export interface GameMetas {
  [id: number]: GameMeta;
}

export interface GameMeta {
  Updated?: string;
  Status?: { value: number; total: string };
  Rating?: { value: number; total: string };
  Genre?: { text: string; url: string }[];
  Platforms?: { text: string; url: string }[];
  'Average session'?: { text: string; url: string }[];
  Tags?: { text: string; url: string }[];
  Multiplayer?: { text: string; url: string }[];
  'Made with'?: { text: string; url: string }[];
  Languages?: { text: string; url: string }[];
}
