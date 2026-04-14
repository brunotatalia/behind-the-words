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

export interface Question {
  id: string;
  question_he: string;
  category: Category;
  difficulty: Difficulty;
  options: AnswerOption[];
  correctAnswer: string;
  explanation_he: string;
  songTitle: string;
  artist: string;
  year: number;
  tags?: string[];
  lyricQuote?: string;
  spotifyId?: string;
  previewUrl?: string;
  deezerId?: number;
}
