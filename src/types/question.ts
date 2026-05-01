export type Difficulty = 'easy' | 'medium' | 'hard';

export type Category =
  | 'tone-disconnect'
  | 'misunderstood-romance'
  | 'historical-political'
  | 'drug-references'
  | 'biographical'
  | 'translation-barriers';

export interface AnswerOption {
  id: string;
  text_he: string;
}

export type SourceType =
  | 'wikipedia'
  | 'songfacts'
  | 'genius'
  | 'interview'
  | 'book'
  | 'article'
  | 'official';

export interface Source {
  url: string;
  title: string;
  type: SourceType;
  accessed: string;
}

export interface Question {
  id: string;
  question_he: string;
  category: Category;
  difficulty: Difficulty;
  options: AnswerOption[];
  correctAnswer: string;
  explanation_he: string;
  extendedInfo_he?: string;
  songTitle: string;
  artist: string;
  year: number;
  sources: Source[];
  verified: boolean;
  tags?: string[];
  lyricQuote?: string;
  spotifyId?: string;
  previewUrl?: string;
  deezerId?: number;
  itunesPreviewUrl?: string;
}
